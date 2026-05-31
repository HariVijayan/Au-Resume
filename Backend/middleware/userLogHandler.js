import AdminLog from "../models/admin/log.js";
import UserLog from "../models/user/log.js";
import { getRedisClient } from "./redis.js";

// ─── Constants ────────────────────────────────────────────────────────────────

const QUEUES = {
  admin: "queue:logs:admin",
  user: "queue:logs:user",
};

const CACHE_PREFIX = "cache:logs";
const CACHE_TTL_SEC = 180; // 3 minutes
const MAX_FETCH = 250;

const LOG_MAX_LEN = 500;
const CONTROL_CHAR_RE = /[\x00-\x1F\x7F]/g;

// Processor constants
const BATCH_SIZE = 50;
const FLUSH_INTERVAL = 30_000; // 30 seconds — larger batches, less frequent
const MAX_QUEUE_LEN = 500; // warn if queue fills up

let processorTimer = null;

// ─── Security helpers ─────────────────────────────────────────────────────────

const extractIp = (req) => {
  const forwarded = req.headers["x-forwarded-for"];
  if (forwarded) return forwarded.split(",")[0].trim().slice(0, 45);
  return req.ip?.slice(0, 45) ?? null;
};

// ─── Cache helpers ────────────────────────────────────────────────────────────

/**
 * Builds a stable, collision-free Redis cache key from query parameters.
 * Keys are sorted alphabetically before serialization so parameter insertion
 * order never causes a spurious cache miss.
 */
const buildCacheKey = (type, params) => {
  const stable = Object.keys(params)
    .sort()
    .reduce((acc, k) => {
      if (params[k] != null) acc[k] = params[k];
      return acc;
    }, {});
  return `${CACHE_PREFIX}:${type}:${JSON.stringify(stable)}`;
};

// ─── writeLog ─────────────────────────────────────────────────────────────────

const writeLog = (adminOrUser, payload) => {
  // Serialize synchronously so bad input surfaces immediately in dev
  const entry = JSON.stringify({
    email: (payload.email ?? "").trim().toLowerCase().slice(0, 254),
    route: (payload.route ?? "").trim().slice(0, 500),
    statusCode: payload.statusCode,
    ip: payload.ip ?? null,
    userAgent: payload.userAgent ?? null,
    timestamp: (payload.timestamp instanceof Date
      ? payload.timestamp
      : new Date()
    ).toISOString(),
    duration:
      typeof payload.duration === "number" && payload.duration >= 0
        ? payload.duration
        : null,
    log: (payload.log ?? "")
      .replace(CONTROL_CHAR_RE, "")
      .trim()
      .slice(0, LOG_MAX_LEN),
  });

  const queueKey = QUEUES[adminOrUser];

  getRedisClient()
    .then(async (redis) => {
      const queueLen = await redis.rPush(queueKey, entry);
      if (queueLen > MAX_QUEUE_LEN) {
        console.warn(
          `[LogService] ${adminOrUser} queue backlog: ${queueLen} entries. ` +
            "Mongo inserts may be falling behind.",
        );
      }
    })
    .catch((redisErr) => {
      console.warn(
        `[LogService] Redis push failed, falling back to direct DB write: ${redisErr.message}`,
      );
      setImmediate(async () => {
        try {
          const parsed = JSON.parse(entry);
          parsed.timestamp = new Date(parsed.timestamp);
          const Model = adminOrUser === "admin" ? AdminLog : UserLog;
          await Model.create(parsed);
        } catch (dbErr) {
          console.error(
            "[LogService] Fallback DB write failed:",
            dbErr.message,
          );
        }
      });
    });
};

// ─── fetchLogs ────────────────────────────────────────────────────────────────

/**
 * Fetches log entries within a date range, capped at 250 most recent entries.
 * Checks Redis cache first; falls back to Mongo on a miss and repopulates cache.
 *
 * Security model:
 *   - Email MUST come from req.user (verified auth token), never from query params.
 *   - Isolation is enforced at two independent layers:
 *       1. Mongo filter  — the DB only returns documents matching that email.
 *       2. Cache key     — email is embedded in the key, so no two users ever
 *                          share a cache entry regardless of date range overlap.
 *
 * @param {"admin"|"user"} adminOrUser
 * @param {Object}      params
 * @param {string}      [params.email]      Required when adminOrUser === "user"
 * @param {string|Date} params.dateStart    Start of range (inclusive)
 * @param {string|Date} params.dateEnd      End of range (inclusive)
 * @returns {Promise<{ data: Array, count: number, capped: boolean, fromCache: boolean }>}
 */
const fetchLogs = async (adminOrUser, { email, dateStart, dateEnd }) => {
  // ── Input validation ──────────────────────────────────────────────────────
  if (!dateStart || !dateEnd)
    throw new Error("dateStart and dateEnd are required.");

  const start = new Date(dateStart);
  const end = new Date(dateEnd);

  if (isNaN(start.getTime()) || isNaN(end.getTime()))
    throw new Error("Invalid date format for dateStart or dateEnd.");
  if (start > end) throw new Error("dateStart must not be after dateEnd.");

  // Prevent full-collection scans from unbounded ranges.
  // 90 days aligns with the TTL index — data beyond this is already deleted.
  const diffDays = (end - start) / (1000 * 60 * 60 * 24);
  if (diffDays > 90) throw new Error("Date range cannot exceed 90 days.");

  if (adminOrUser === "user") {
    if (!email?.trim())
      throw new Error("email is required for user log fetches.");
  }

  // ── Build Mongo filter ────────────────────────────────────────────────────
  const filter = { timestamp: { $gte: start, $lte: end } };
  const safeEmail = email?.trim().toLowerCase();
  if (adminOrUser === "user") filter.email = safeEmail;

  // ── Build cache key ───────────────────────────────────────────────────────
  const cacheParams = {
    adminOrUser,
    dateStart: start.toISOString(),
    dateEnd: end.toISOString(),
  };
  // Email scopes the cache key per user — admins share one key per date range.
  if (adminOrUser === "user") cacheParams.email = safeEmail;
  const cacheKey = buildCacheKey(adminOrUser, cacheParams);

  // ── Cache read ────────────────────────────────────────────────────────────
  try {
    const redis = await getRedisClient();
    const cached = await redis.get(cacheKey);
    if (cached) return { ...JSON.parse(cached), fromCache: true };
  } catch (err) {
    console.warn(
      "[LogService] Cache read failed, falling back to DB:",
      err.message,
    );
  }

  // ── DB query ──────────────────────────────────────────────────────────────
  const Model = adminOrUser === "admin" ? AdminLog : UserLog;
  const data = await Model.find(filter)
    .sort({ timestamp: -1 })
    .limit(MAX_FETCH)
    .lean();

  const result = {
    data,
    count: data.length,
    capped: data.length === MAX_FETCH,
  };

  // ── Cache write ───────────────────────────────────────────────────────────
  try {
    const redis = await getRedisClient();
    await redis.set(cacheKey, JSON.stringify(result), { EX: CACHE_TTL_SEC });
  } catch (err) {
    console.warn("[LogService] Cache write failed:", err.message);
  }

  return { ...result, fromCache: false };
};

// ─── Flush loop ───────────────────────────────────────────────────────────────

const flushQueue = async () => {
  let redis;
  try {
    redis = await getRedisClient();
  } catch (err) {
    console.error("[QueueProcessor] Redis unavailable, skipping flush");
    return;
  }

  for (const [type, queueKey] of Object.entries(QUEUES)) {
    const Model = type === "admin" ? AdminLog : UserLog;

    const queueLen = await redis.lLen(queueKey);
    if (queueLen > MAX_QUEUE_LEN) {
      console.warn(
        `[QueueProcessor] ${type} queue backlog: ${queueLen}. Check if Mongo is slow.`,
      );
    }
    if (queueLen === 0) continue;

    const raw = await redis.lPopCount(queueKey, BATCH_SIZE);
    if (!raw?.length) continue;

    // Parse entries (routes already validated input)
    const entries = raw.map((item) => {
      const entry = JSON.parse(item);
      entry.timestamp = new Date(entry.timestamp);
      return entry;
    });

    try {
      await Model.insertMany(entries, { ordered: false });
    } catch (err) {
      console.error(
        `[QueueProcessor] ${type} logs write failed: ${err.message}`,
      );
    }
  }
};

// ─── Processor Control API ─────────────────────────────────────────────────────

const startQueueProcessor = () => {
  if (processorTimer) return;
  processorTimer = setInterval(flushQueue, FLUSH_INTERVAL);
  processorTimer.unref();
  console.log("[QueueProcessor] Started.");
};

const stopQueueProcessor = async () => {
  if (processorTimer) {
    clearInterval(processorTimer);
    processorTimer = null;
  }
  console.log("[QueueProcessor] Flushing remaining entries before shutdown...");
  await flushQueue();
  console.log("[QueueProcessor] Stopped.");
};

// ─── Exports ──────────────────────────────────────────────────────────────────

export {
  writeLog,
  fetchLogs,
  startQueueProcessor,
  stopQueueProcessor,
  extractIp,
};
