import type { NextRequest } from "next/server";
import { deliverEnquiry } from "@/lib/server/email";
import {
  createRequestId,
  enforceRateLimit,
  getClientIdentifier,
  isAllowedOrigin,
  jsonResponse,
  rateLimitHeaders,
  readJsonBody,
  releaseDuplicate,
  reserveDuplicate,
  safeErrorResponse,
  safeServerLog,
} from "@/lib/server/security";
import { validateEnquiry } from "@/lib/server/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const requestId = createRequestId();

  if (!isAllowedOrigin(request)) {
    return jsonResponse({ ok: false, message: "This request is not allowed.", requestId }, 403);
  }

  const identifier = getClientIdentifier(request);
  const rateLimit = await enforceRateLimit("enquiries", identifier, 4, 10 * 60_000);
  const limitHeaders = rateLimitHeaders(rateLimit);
  if (!rateLimit.allowed) {
    return jsonResponse(
      { ok: false, message: "Too many submissions. Please try again later.", requestId },
      429,
      limitHeaders,
    );
  }

  const body = await readJsonBody(request, 16_384);
  if (!body.ok) {
    return jsonResponse({ ok: false, message: body.message, requestId }, body.status, limitHeaders);
  }

  const validation = validateEnquiry(body.value);
  if (!validation.ok) {
    return jsonResponse({ ok: false, message: validation.message, requestId }, 400, limitHeaders);
  }

  const enquiry = validation.data;
  const elapsed = Date.now() - enquiry.startedAt;
  if (elapsed < 750) {
    return jsonResponse({ ok: false, message: "Please check the form and try again.", requestId }, 400, limitHeaders);
  }

  const fingerprint = [identifier, enquiry.type, enquiry.email, enquiry.mobile, enquiry.product, enquiry.context].join("|");
  const reserved = await reserveDuplicate("enquiry", fingerprint, 120);
  if (!reserved) {
    return jsonResponse(
      { ok: false, message: "This enquiry was already submitted. Please wait before trying again.", requestId },
      409,
      limitHeaders,
    );
  }

  try {
    const delivery = await deliverEnquiry(enquiry);
    if (!delivery.ok) {
      await releaseDuplicate("enquiry", fingerprint);
      safeServerLog("warn", "enquiry_delivery_failed", requestId, { reason: delivery.reason });
      return jsonResponse(
        { ok: false, message: "Automatic delivery failed. Your enquiry brief has been preserved below so you can still send it to Urechem.", requestId },
        503,
        limitHeaders,
      );
    }

    return jsonResponse(
      { ok: true, message: "Enquiry sent successfully ✓", requestId },
      200,
      limitHeaders,
    );
  } catch (error) {
    safeServerLog("error", "enquiry_unhandled_failure", requestId, {
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return safeErrorResponse(requestId);
  }
}
