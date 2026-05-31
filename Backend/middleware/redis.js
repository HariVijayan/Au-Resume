import { createClient } from "redis";

let client = null;
let connectPromise = null;

const getRedisClient = async () => {
  // If already connected, return immediately
  if (client?.isOpen) return client;

  // If connection attempt in progress, wait for it (singleton pattern)
  // This prevents race condition where concurrent calls create multiple clients
  if (connectPromise) return connectPromise;

  // Wrap connection in a promise and store it to prevent concurrent connection attempts
  connectPromise = (async () => {
    try {
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
      client.on("connect", () => console.log("[Redis] Connection established"));
      client.on("end", () => {
        console.warn("[Redis] Connection ended unexpectedly");
        client = null;
        connectPromise = null;
      });
      client.on("close", () => console.warn("[Redis] Connection closed"));

      await client.connect();
      console.log("[Redis] Connected.");
      return client;
    } catch (err) {
      console.error("[Redis] Connection failed:", err.message);
      client = null;
      connectPromise = null;
      throw err;
    }
  })();

  return connectPromise;
};

// Health check helper
const isRedisHealthy = () => client?.isOpen ?? false;

// Call during graceful shutdown before process.exit()
const closeRedisClient = async () => {
  if (client?.isOpen) {
    await client.quit();
    console.log("[Redis] Connection closed.");
    client = null;
    connectPromise = null;
  }
};

export { getRedisClient, closeRedisClient, isRedisHealthy };
