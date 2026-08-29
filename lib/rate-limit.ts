import { Redis } from '@upstash/redis'

const redisUrl = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

if (!redisUrl || !redisToken) {
  throw new Error('Persistent rate limiting is not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.')
}

const redis = new Redis({ url: redisUrl, token: redisToken })

type RateLimitResult = {
  allowed: boolean
  remaining: number
  retryAfterSeconds: number
}

export async function enforceRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const bucketKey = `urechem:ratelimit:${key}`
  const count = await redis.incr(bucketKey)

  if (count === 1) {
    await redis.expire(bucketKey, windowSeconds)
  }

  const allowed = count <= limit
  const remaining = Math.max(0, limit - count)

  if (allowed) {
    return { allowed, remaining, retryAfterSeconds: 0 }
  }

  const ttl = await redis.ttl(bucketKey)
  return {
    allowed: false,
    remaining: 0,
    retryAfterSeconds: Math.max(1, ttl),
  }
}
