import type { ValidatedEnquiry } from "@/lib/server/validation";

type DeliveryResult =
  | { ok: true; providerMessageId?: string }
  | { ok: false; reason: "not_configured" | "provider_error" };

function safeSubjectPart(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 120);
}

function buildEnquiryBrief(enquiry: ValidatedEnquiry) {
  return [
    "URECHEM ENQUIRY",
    `Type: ${enquiry.type}`,
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Mobile: ${enquiry.mobile}`,
    `Product: ${enquiry.product || "Not specified"}`,
    "",
    "Customer enquiry / technical context:",
    enquiry.context,
    "",
    "Please review this enquiry and confirm the appropriate next step.",
  ].join("\n");
}

export async function deliverEnquiry(enquiry: ValidatedEnquiry): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = process.env.URECHEM_ENQUIRY_EMAIL?.trim();
  const from = process.env.URECHEM_FROM_EMAIL?.trim();

  if (!apiKey || !recipient || !from) {
    console.warn("[urechem] enquiry_delivery_not_configured", {
      hasApiKey: Boolean(apiKey),
      hasRecipient: Boolean(recipient),
      hasFrom: Boolean(from),
    });
    return { ok: false, reason: "not_configured" };
  }

  const brief = buildEnquiryBrief(enquiry);
  const subjectPart = safeSubjectPart(enquiry.product || enquiry.type || enquiry.name);
  const subject = `New Website Enquiry — ${subjectPart}`;

  const text = [
    "New website enquiry received by Urechem Chemicals.",
    "",
    brief,
    "",
    `Reply directly to this email to contact ${enquiry.name} at ${enquiry.email}.`,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: enquiry.email,
        subject,
        text,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      console.warn("[urechem] enquiry_provider_error", {
        provider: "resend",
        status: response.status,
        statusText: response.statusText.slice(0, 120),
      });
      return { ok: false, reason: "provider_error" };
    }

    const payload = (await response.json().catch(() => null)) as { id?: unknown } | null;
    return {
      ok: true,
      providerMessageId: typeof payload?.id === "string" ? payload.id : undefined,
    };
  } catch (error) {
    console.warn("[urechem] enquiry_provider_request_failed", {
      provider: "resend",
      error: error instanceof Error ? error.name : "UnknownError",
    });
    return { ok: false, reason: "provider_error" };
  }
}
