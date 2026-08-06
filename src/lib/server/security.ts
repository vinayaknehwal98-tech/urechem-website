import { createHash, randomUUID } from "node:crypto";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

type JsonReadResult =
  | { ok: true; value: unknown }
  | { ok: false; status: 400 | 413 | 415; message: string };

type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
  resetAt: number;
};

type MemoryBucket = {
  count: number;
  expiresAt: number;
};

const memoryBuckets = new Map<string, MemoryBucket>();
const memoryReservations = new Map<string, number>();
let warnedAboutMemoryLimiter = false;

const SAFE_ERROR_MESSAGE = "Something went wrong. Please try again.";

function hash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

function pruneMemoryState(now: number) {
  if (memoryBuckets.size > 2_000) {
    for (const [key, bucket] of memoryBuckets) {
      if (bucket.expiresAt <= now) memoryBuckets.delete(key);
    }
  }

  if (memoryReservations.size > 2_000) {
    for (const [key, expiresAt] of memoryReservations) {
      if (expiresAt <= now) memoryReservations.delete(key);
    }
  }
}

function getRedisConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

async function redisCommand(command: Array<string | number>) {
  const config = getRedisConfig();
  if (!config) return null;

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
    signal: AbortSignal.timeout(2_500),
  });

  if (!response.ok) {
    throw new Error(`Redis request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as { result?: unknown };
  return payload.result ?? null;
}

function memoryRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  pruneMemoryState(now);
  const current = memoryBuckets.get(key);
  const bucket = !current || current.expiresAt <= now
    ? { count: 0, expiresAt: now + windowMs }
    : current;

  bucket.count += 1;
  memoryBuckets.set(key, bucket);

  const retryAfterSeconds = Math.max(1, Math.ceil((bucket.expiresAt - now) / 1_000));

  return {
    allowed: bucket.count <= limit,
    limit,
    remaining: Math.max(0, limit - bucket.count),
    retryAfterSeconds,
    resetAt: bucket.expiresAt,
  };
}

export function createRequestId() {
  return randomUUID();
}

export function safeServerLog(
  level: "warn" | "error",
  event: string,
  requestId: string,
  details: Record<string, string | number | boolean | null> = {},
) {
  const entry = { event, requestId, ...details };
  if (level === "error") console.error("[urechem]", entry);
  else console.warn("[urechem]", entry);
}

export function getClientIdentifier(request: NextRequest) {
  // Vercel overwrites forwarding headers at its trusted edge. Outside Vercel,
  // do not trust caller-supplied proxy headers; use a coarse anonymous key.
  const forwarded = process.env.VERCEL === "1"
    ? (request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for"))
        ?.split(",")[0]
        ?.trim()
    : null;
  const userAgent = request.headers.get("user-agent")?.slice(0, 256) ?? "unknown";
  const source = forwarded || `anonymous:${request.nextUrl.origin}:${userAgent}`;
  return hash(source);
}

export function isAllowedOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  const allowedOrigins = new Set<string>([
    request.nextUrl.origin,
    "https://urechem-website.vercel.app",
    ...(process.env.URECHEM_ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean),
  ]);

  if (origin) return allowedOrigins.has(origin);

  // Non-browser clients may omit Origin. Browser cross-site requests normally
  // include both Origin and Sec-Fetch-Site, so reject an explicit cross-site signal.
  return !fetchSite || fetchSite === "same-origin" || fetchSite === "same-site" || fetchSite === "none";
}

export async function readJsonBody(request: NextRequest, maxBytes: number): Promise<JsonReadResult> {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    return { ok: false, status: 415, message: "Please send a JSON request." };
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    return { ok: false, status: 413, message: "The request is too large." };
  }

  const raw = await request.text();
  if (new TextEncoder().encode(raw).byteLength > maxBytes) {
    return { ok: false, status: 413, message: "The request is too large." };
  }

  try {
    return { ok: true, value: JSON.parse(raw) as unknown };
  } catch {
    return { ok: false, status: 400, message: "The request could not be read." };
  }
}

export function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
  extraHeaders: HeadersInit = {},
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
      ...extraHeaders,
    },
  });
}

export function safeErrorResponse(requestId: string, status = 500) {
  return jsonResponse({ ok: false, message: SAFE_ERROR_MESSAGE, requestId }, status);
}

export async function enforceRateLimit(
  scope: string,
  identifier: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  const key = `urechem:rate:${scope}:${identifier}`;
  const script = [
    "local current = redis.call('INCR', KEYS[1])",
    "if current == 1 then redis.call('PEXPIRE', KEYS[1], ARGV[1]) end",
    "local ttl = redis.call('PTTL', KEYS[1])",
    "return {current, ttl}",
  ].join("\n");

  try {
    const result = await redisCommand(["EVAL", script, 1, key, windowMs]);
    if (Array.isArray(result) && result.length >= 2) {
      const count = Number(result[0]);
      const ttl = Math.max(1, Number(result[1]));
      const now = Date.now();
      return {
        allowed: count <= limit,
        limit,
        remaining: Math.max(0, limit - count),
        retryAfterSeconds: Math.max(1, Math.ceil(ttl / 1_000)),
        resetAt: now + ttl,
      };
    }
  } catch (error) {
    safeServerLog("warn", "rate_limit_store_unavailable", "system", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
  }

  if (!warnedAboutMemoryLimiter) {
    warnedAboutMemoryLimiter = true;
    safeServerLog("warn", "rate_limit_memory_fallback", "system", {
      production: process.env.NODE_ENV === "production",
    });
  }

  return memoryRateLimit(key, limit, windowMs);
}

export function rateLimitHeaders(result: RateLimitResult) {
  return {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(Math.ceil(result.resetAt / 1_000)),
    ...(result.allowed ? {} : { "Retry-After": String(result.retryAfterSeconds) }),
  };
}

export async function reserveDuplicate(
  scope: string,
  fingerprint: string,
  ttlSeconds: number,
) {
  const key = `urechem:duplicate:${scope}:${hash(fingerprint)}`;

  try {
    const result = await redisCommand(["SET", key, "1", "NX", "EX", ttlSeconds]);
    if (result !== null) return result === "OK";
  } catch (error) {
    safeServerLog("warn", "duplicate_store_unavailable", "system", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
  }

  const now = Date.now();
  pruneMemoryState(now);
  const existing = memoryReservations.get(key);
  if (existing && existing > now) return false;
  memoryReservations.set(key, now + ttlSeconds * 1_000);
  return true;
}

export async function releaseDuplicate(scope: string, fingerprint: string) {
  const key = `urechem:duplicate:${scope}:${hash(fingerprint)}`;

  try {
    const result = await redisCommand(["DEL", key]);
    if (result !== null) return;
  } catch (error) {
    safeServerLog("warn", "duplicate_release_store_unavailable", "system", {
      error: error instanceof Error ? error.name : "UnknownError",
    });
  }

  memoryReservations.delete(key);
}
