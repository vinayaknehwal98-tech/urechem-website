import type { ValidatedEnquiry } from "@/lib/server/validation";

type DeliveryResult =
  | { ok: true; providerMessageId?: string }
  | { ok: false; reason: "not_configured" | "provider_error" };

function safeSubjectPart(value: string) {
  return value.replace(/[\r\n]+/g, " ").slice(0, 120);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEnquiryBrief(enquiry: ValidatedEnquiry) {
  return [
    "URECHEM WEBSITE",
    "",
    enquiry.type === "Consultation request" ? "NEW CONSULTATION REQUEST" : "NEW WEBSITE ENQUIRY",
    "",
    `Type: ${enquiry.type}`,
    `Name: ${enquiry.name}`,
    `Company / Organization: ${enquiry.company || "Not specified"}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.mobile}`,
    `Industry / Application: ${enquiry.industry || "Not specified"}`,
    `Product / Chemical: ${enquiry.product || "Not specified"}`,
    `Quantity / Specification: ${enquiry.quantity || "Not specified"}`,
    "",
    enquiry.type === "Consultation request" ? "Project / technical challenge:" : "Customer enquiry / technical context:",
    enquiry.context,
    "",
    `Submitted: ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}`,
    "",
    "Please review this request and confirm the appropriate next step.",
  ].join("\n");
}

function buildHtml(enquiry: ValidatedEnquiry) {
  const title = enquiry.type === "Consultation request" ? "New Consultation Request" : "New Website Enquiry";
  const contextLabel = enquiry.type === "Consultation request" ? "Project / technical challenge" : "Customer enquiry / technical context";
  const rows = [
    ["Request type", enquiry.type],
    ["Name", enquiry.name],
    ["Company / Organization", enquiry.company || "Not specified"],
    ["Email", enquiry.email],
    ["Phone", enquiry.mobile],
    ["Industry / Application", enquiry.industry || "Not specified"],
    ["Product / Chemical", enquiry.product || "Not specified"],
    ["Quantity / Specification", enquiry.quantity || "Not specified"],
  ];

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f3f7fb;font-family:Arial,Helvetica,sans-serif;color:#16324a;">
    <div style="max-width:680px;margin:32px auto;padding:0 16px;">
      <div style="background:#0a2944;border-radius:18px 18px 0 0;padding:24px 28px;color:#fff;">
        <div style="font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#7dd3fc;">Urechem Website</div>
        <h1 style="margin:8px 0 0;font-size:25px;line-height:1.25;color:#fff;">${escapeHtml(title)}</h1>
      </div>
      <div style="background:#fff;border:1px solid #dbe8f3;border-top:0;border-radius:0 0 18px 18px;padding:28px;">
        <table role="presentation" style="width:100%;border-collapse:collapse;">
          <tbody>
            ${rows
              .map(
                ([label, value]) =>
                  `<tr><td style="width:35%;padding:11px 12px 11px 0;border-bottom:1px solid #e8eef4;font-size:13px;font-weight:700;color:#5b6b7a;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:11px 0;border-bottom:1px solid #e8eef4;font-size:14px;color:#16324a;vertical-align:top;">${escapeHtml(value)}</td></tr>`,
              )
              .join("")}
          </tbody>
        </table>
        <h2 style="margin:26px 0 10px;font-size:16px;color:#0a2944;">${escapeHtml(contextLabel)}</h2>
        <div style="white-space:pre-wrap;background:#f7fbff;border:1px solid #dbe8f3;border-radius:12px;padding:16px;font-size:14px;line-height:1.7;color:#334155;">${escapeHtml(enquiry.context)}</div>
        <p style="margin:22px 0 0;font-size:12px;line-height:1.6;color:#718096;">Submitted ${escapeHtml(new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }))}. Reply to this email to contact ${escapeHtml(enquiry.name)} directly.</p>
      </div>
    </div>
  </body>
</html>`;
}

export async function deliverEnquiry(enquiry: ValidatedEnquiry): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const recipient = process.env.URECHEM_ENQUIRY_EMAIL?.trim();
  const from = process.env.URECHEM_FROM_EMAIL?.trim() || "Urechem Chemicals <sales@urechem.co.in>";

  if (!apiKey || !recipient) {
    console.warn("[urechem] enquiry_delivery_not_configured", {
      hasApiKey: Boolean(apiKey),
      hasRecipient: Boolean(recipient),
    });
    return { ok: false, reason: "not_configured" };
  }

  const brief = buildEnquiryBrief(enquiry);
  const subjectPart = safeSubjectPart(enquiry.product || enquiry.name || enquiry.type);
  const subjectPrefix = enquiry.type === "Consultation request" ? "New Consultation Request" : "New Website Enquiry";
  const subject = `${subjectPrefix} — ${subjectPart}`;

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
        html: buildHtml(enquiry),
        text: brief,
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
