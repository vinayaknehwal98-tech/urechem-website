const redisUrl = process.env.UPSTASH_REDIS_REST_URL
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN

if (!redisUrl || !redisToken) {
  throw new Error('Persistent rate limiting is not configured. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.')
}

type RateLimitResult = {
  allowed: boolean
  remaining: number
  retryAfterSeconds: number
}

async function redisCommand<T>(path: string): Promise<T> {
  const response = await fetch(`${redisUrl}/${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${redisToken}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Persistent rate limiter returned HTTP ${response.status}.`)
  }

  const payload = (await response.json()) as { result: T }
  return payload.result
}

export async function enforceRateLimit(
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const bucketKey = `urechem:ratelimit:${key}`
  const encodedKey = encodeURIComponent(bucketKey)
  const count = await redisCommand<number>(`incr/${encodedKey}`)

  if (count === 1) {
    await redisCommand<number>(`expire/${encodedKey}/${windowSeconds}`)
  }

  const allowed = count <= limit
  const remaining = Math.max(0, limit - count)

  if (allowed) {
    return { allowed, remaining, retryAfterSeconds: 0 }
  }

  const ttl = await redisCommand<number>(`ttl/${encodedKey}`)
  return {
    allowed: false,
    remaining: 0,
    retryAfterSeconds: Math.max(1, ttl),
  }
}
