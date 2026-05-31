# Redis Architecture Analysis - Comprehensive Report

## Executive Summary

Your Redis architecture has a solid foundation with good patterns (Lua locks, exponential backoff, graceful shutdown), but contains **4 critical issues** that need immediate fixing.

---

## Critical Issues

### 🔴 Issue #1: Broken Import Paths in `userLogQueueProcessor.js` (WILL CRASH)

**Location:** Lines 2-3

**Current Code:**

```javascript
import AdminLog from "../models/adminLog.model.js";
import UserLog from "../models/userLog.model.js";
import { getRedisClient } from "../config/redis.js";
```

**Problem:**

- Files don't exist at those paths
- Actual files: `../models/admin/log.js` and `../models/user/log.js`
- Redis file is at `./redis.js` (same middleware directory), not `../config/redis.js`
- This will cause immediate runtime failure: `MODULE_NOT_FOUND`

**Fix:**

```javascript
import AdminLog from "../models/admin/log.js";
import UserLog from "../models/user/log.js";
import { getRedisClient } from "./redis.js";
```

---

### 🔴 Issue #2: Double `app.listen()` Call in `server.js` (PORT CONFLICT)

**Location:** Lines 142 and 157

**Current Code:**

```javascript
// Line 142 - PROBLEMATIC
app.listen(port, () => {
  console.log(`Server started running at port number ${port} successfully.`);
  scheduleLogRotation();
});

// ... later ...

const start = async () => {
  // ... async init ...

  // Line 157 - INTENDED LISTEN
  const server = app.listen(PORT, () =>
    console.log(`[Server] Listening on :${PORT}`),
  );
```

**Problem:**

- First listen() at line 142 runs synchronously before `start()` completes
- Second listen() attempts same port (or different if PORT env is set)
- Results in: `Error: listen EADDRINUSE: address already in use :::5000`
- First listen() has no graceful shutdown attached
- Logs and queue processor not initialized when first listen occurs

**Fix:**

- Delete lines 142-145 entirely
- Keep only the listen() inside `start()`

---

### 🔴 Issue #3: Client Singleton Race Condition in `redis.js`

**Location:** Lines 5-7

**Current Code:**

```javascript
const getRedisClient = async () => {
  if (client?.isOpen) return client;

  client = createClient({ ... });
  // ...
  await client.connect();
```

**Problem:**

- If `getRedisClient()` is called twice concurrently before `client.connect()` completes:
  - First call: `client` is null, creates new client, waits on `connect()`
  - Second call: `client` is still not `.isOpen`, creates ANOTHER client
  - Results in: **Multiple Redis clients created, connections leak, race conditions**
- No await between check and create - window of vulnerability
- Can happen during startup when both `writeLog()` and `startQueueProcessor()` call it

**Fix:**
Use a Promise singleton pattern:

```javascript
let client = null;
let connectPromise = null;

const getRedisClient = async () => {
  if (client?.isOpen) return client;

  // Ensure only one connection attempt in flight
  if (connectPromise) return connectPromise;

  connectPromise = (async () => {
    client = createClient({
      url: process.env.REDIS_URL ?? "redis://localhost:6379",
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 8) {
            console.error("[Redis] Max reconnect attempts reached.");
            return new Error("Redis reconnect limit reached");
          }
          return Math.min(retries * 250, 3000);
        },
      },
    });

    client.on("error", (err) => console.error("[Redis] Error:", err.message));
    client.on("reconnecting", () => console.warn("[Redis] Reconnecting..."));
    client.on("end", () => {
      console.warn("[Redis] Connection ended unexpectedly");
      client = null;
      connectPromise = null;
    });

    await client.connect();
    console.log("[Redis] Connected.");
    return client;
  })();

  return connectPromise;
};
```

---

### 🔴 Issue #4: Missing Trust Proxy Configuration in `server.js`

**Location:** Before `cors()` middleware

**Problem:**

- `userLogHandler.js` has comprehensive documentation about trust proxy
- `extractIp()` relies on it to get real client IP from X-Forwarded-For
- Without `app.set("trust proxy", 1)`, `req.ip` always returns proxy IP
- Security issue: Can't track real user IPs in logs
- `extractIp()` fallback won't help if proxy doesn't send X-Forwarded-For

**Current (Wrong):**

```javascript
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
```

**Fix:**

```javascript
// BEFORE cors middleware
app.set("trust proxy", 1);

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
```

**Why it matters:**

- Your logs won't have real client IPs if behind proxy (Docker, nginx, AWS ALB, etc.)
- Makes security auditing impossible
- Rate limiting won't work correctly across real clients

---

## Medium Priority Issues

### 🟡 Missing Connection State Tracking

**Location:** `redis.js`

**Issue:** Only `error` and `reconnecting` listeners; missing:

- `connect` event (to confirm successful connection)
- `close` event (unexpected disconnection)
- `end` event (graceful shutdown)
- Connection state variable to expose status to routes

**Impact:** Can't reliably detect connection problems, routes may fail silently

**Recommendation:** Add event listeners and expose connection status:

```javascript
client.on("connect", () => console.log("[Redis] Connection established"));
client.on("end", () => {
  console.warn("[Redis] Connection ended");
  client = null;
  connectPromise = null;
});
client.on("close", () => console.warn("[Redis] Connection closed"));

// Add a healthcheck export
export const isRedisHealthy = () => client?.isOpen ?? false;
```

---

## Architecture Strengths ✅

| Component             | Pattern                        | Benefit                                                    |
| --------------------- | ------------------------------ | ---------------------------------------------------------- |
| **Lock Release**      | Lua script (Redlock)           | Prevents accidental lock deletion if ownership transferred |
| **Reconnection**      | Exponential backoff (max 3s)   | Prevents Redis connection storms                           |
| **Queue Failure**     | Fallback to direct Mongo write | Logs never silently dropped                                |
| **Cache Strategy**    | Sorted parameter keys          | No spurious cache misses                                   |
| **Input Validation**  | Per-entry, not batch           | One bad entry doesn't corrupt batch                        |
| **Graceful Shutdown** | Ordered sequence               | No data loss on SIGTERM/SIGINT                             |
| **TTL Indexes**       | 5-year expiration              | Auto cleanup of old logs                                   |
| **Async Logging**     | Redis queue + batch processor  | Non-blocking log writes                                    |

---

## Data Flow Overview

```
Route Handler
    │
    ├──→ writeLog(type, payload)
    │        │
    │        ├─ Validate & sanitize
    │        ├─ getRedisClient() [QUEUE WRITE]
    │        │   └─ redis.rPush(queue:logs:type, entry)
    │        │       [Falls back to direct Mongo write if Redis fails]
    │        │
    │        └─ Response sent immediately (async)
    │
    └──→ fetchLogs(type, params)
         │
         ├─ buildCacheKey(sorted params)
         ├─ getRedisClient() [CACHE READ]
         │   └─ redis.get(cache:logs:...) → Return if hit
         │
         ├─ Model.find() [DB MISS]
         │   └─ Sort desc by timestamp
         │   └─ Limit MAX_FETCH (250)
         │
         └─ redis.set(cache, result, EX:180s)

Background: Queue Processor (every 5 seconds)
    │
    ├─ acquireLock() [Lua check-then-set]
    │
    ├─ For each queue type:
    │   ├─ redis.lPopCount(queue, 50) [Atomic pop]
    │   ├─ Validate each entry
    │   ├─ Model.insertMany(valid, {ordered:false})
    │   └─ Re-queue on failure (3 retries)
    │
    └─ releaseLock() [Lua check-then-delete]

Shutdown Sequence:
    SIGTERM → server.close()
           → stopQueueProcessor() [Final flush]
           → mongoose.disconnect()
           → closeRedisClient()
           → process.exit(0)
```

---

## Redis Key Namespace Reference

| Key Pattern          | Type          | TTL  | Purpose                           |
| -------------------- | ------------- | ---- | --------------------------------- |
| `queue:logs:admin`   | List          | None | Admin log queue for batch writing |
| `queue:logs:user`    | List          | None | User log queue for batch writing  |
| `lock:log-processor` | String        | 30s  | Distributed lock (Redlock)        |
| `cache:logs:...`     | String (JSON) | 3min | Cached log fetch results          |

---

## Environment Variables Required

```bash
REDIS_URL=redis://localhost:6379      # Redis connection string
MONGO_URI=mongodb://...               # MongoDB connection
PORT=5000                             # Server port (default 5000)
SUPERADMIN_EMAIL=...
SUPERADMIN_PASSWORD=...
```

---

## Recommendations

### Immediate (Do Before Production)

1. ✅ Fix broken imports in `userLogQueueProcessor.js`
2. ✅ Remove double `app.listen()` in `server.js`
3. ✅ Fix client singleton race condition in `redis.js`
4. ✅ Add `app.set("trust proxy", 1)` in `server.js`

### Short Term (Next Sprint)

1. Add Redis health check endpoint (`/health/redis`)
2. Add Prometheus metrics for queue depth and flush duration
3. Add alert when queue depth exceeds 5000 for > 5 minutes
4. Document expected behavior under various Redis failure scenarios

### Long Term (Before Scaling)

1. Consider BullMQ instead of manual queue + locks (handles distributed scenarios better)
2. Add circuit breaker pattern for Redis operations
3. Implement cache invalidation events from routes
4. Add Redis cluster support detection

---

## Testing Checklist

After fixes, verify:

- [ ] Server starts without "EADDRINUSE" error
- [ ] First request works (Redis + Mongo both accessed)
- [ ] Queue processor flushes logs to Mongo every 5 seconds
- [ ] Multiple concurrent requests create only ONE Redis client
- [ ] Redis disconnect → fallback to direct Mongo write
- [ ] Redis reconnect successful (check logs)
- [ ] Admin + user logs have different index strategies
- [ ] Cache TTL works (log fetch cached for 3 minutes)
- [ ] SIGTERM gracefully flushes queue before exit
- [ ] Real client IPs captured in logs (test from proxy)
