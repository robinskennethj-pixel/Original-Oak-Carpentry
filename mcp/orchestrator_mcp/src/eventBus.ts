import Redis from "ioredis";

let redis: Redis | null = null;

export async function initEventBus() {
  if (redis) return redis;
  const url = process.env.REDIS_URL || "redis://redis:6379";
  redis = new Redis(url);
  // lightweight health check
  await redis.ping();
  return redis;
}

export async function publish(event: string, payload: any) {
  if (!redis) await initEventBus();
  await redis!.publish(event, JSON.stringify(payload));
}