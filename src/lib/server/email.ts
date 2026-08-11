import type { ValidatedEnquiry } from "@/lib/server/validation";

type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "provider_error" };

function safeSubjectPart(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 120);
}

export async function deliverEnquiry(enquiry: ValidatedEnquiry): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = process.env.URECHEM_ENQUIRY_EMAIL?.trim();
  const from = process.env.URECHEM_FROM_EMAIL?.trim();

  // All delivery configuration remains server-side. Never fall back to a
  // source-code API key, sender, or recipient because that would make a
  // configuration mistake look like a successful delivery path.
  if (!apiKey || !recipient || !from) return { ok: false, reason: "not_configured" };

  const text = [
    "URECHEM WEBSITE ENQUIRY",
    `Type: ${enquiry.type}`,
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Mobile: ${enquiry.mobile}`,
    `Product: ${enquiry.product || "Not specified"}`,
    "",
    "Technical context:",
    enquiry.context,
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
        subject: `Urechem ${safeSubjectPart(enquiry.type)}: ${safeSubjectPart(enquiry.product || enquiry.name)}`,
        text,
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      // Do not expose provider response bodies to the browser; the API route
      // records only the safe provider_error category in production logs.
      return { ok: false, reason: "provider_error" };
    }

    return { ok: true };
  } catch {
    return { ok: false, reason: "provider_error" };
  }
}
