import type { NextRequest } from "next/server";
import { analyzeTechnicalChallenge } from "@/lib/solution-engine";
import {
  createRequestId,
  enforceRateLimit,
  getClientIdentifier,
  isAllowedOrigin,
  jsonResponse,
  rateLimitHeaders,
  readJsonBody,
  safeErrorResponse,
  safeServerLog,
} from "@/lib/server/security";
import { validateAiRequest } from "@/lib/server/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const requestId = createRequestId();

  if (!isAllowedOrigin(request)) {
    return jsonResponse({ ok: false, message: "This request is not allowed.", requestId }, 403);
  }

  const rateLimit = await enforceRateLimit("ai-solution", getClientIdentifier(request), 8, 60_000);
  const limitHeaders = rateLimitHeaders(rateLimit);
  if (!rateLimit.allowed) {
    return jsonResponse(
      { ok: false, message: "Too many requests. Please try again shortly.", requestId },
      429,
      limitHeaders,
    );
  }

  const body = await readJsonBody(request, 8_192);
  if (!body.ok) {
    return jsonResponse({ ok: false, message: body.message, requestId }, body.status, limitHeaders);
  }

  const validation = validateAiRequest(body.value);
  if (!validation.ok) {
    return jsonResponse({ ok: false, message: validation.message, requestId }, 400, limitHeaders);
  }

  try {
    const analysis = analyzeTechnicalChallenge(validation.data.question);
    return jsonResponse({ ok: true, analysis, requestId }, 200, limitHeaders);
  } catch (error) {
    safeServerLog("error", "ai_solution_failed", requestId, {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return safeErrorResponse(requestId);
  }
}
