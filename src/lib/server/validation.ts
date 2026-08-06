const enquiryTypes = [
  "General enquiry",
  "TDS request",
  "SDS request",
  "COA request",
  "Compliance request",
  "Processing guide request",
  "Sample request",
  "Quotation request",
  "Site visit request",
  "Consultation request",
] as const;

export type EnquiryType = (typeof enquiryTypes)[number];

export type ValidatedEnquiry = {
  type: EnquiryType;
  name: string;
  email: string;
  mobile: string;
  product: string;
  context: string;
  startedAt: number;
};

type ValidationResult<T> =
  | { ok: true; data: T }
  | { ok: false; message: string };

const documentRequestTypes = new Set<EnquiryType>([
  "TDS request",
  "SDS request",
  "COA request",
  "Compliance request",
  "Processing guide request",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return null;
  const cleaned = value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/\r\n?/g, "\n")
    .trim();
  return cleaned.length <= maxLength ? cleaned : null;
}

function hasOnlyKeys(record: Record<string, unknown>, allowed: string[]) {
  const allowedSet = new Set(allowed);
  return Object.keys(record).every((key) => allowedSet.has(key));
}

export function validateAiRequest(value: unknown): ValidationResult<{ question: string }> {
  if (!isRecord(value) || !hasOnlyKeys(value, ["question"])) {
    return { ok: false, message: "Please enter a valid technical question." };
  }

  const question = cleanText(value.question, 1_200);
  if (!question || question.length < 1) {
    return { ok: false, message: "Please enter a technical question." };
  }

  return { ok: true, data: { question } };
}

export function validateEnquiry(value: unknown): ValidationResult<ValidatedEnquiry> {
  const allowedKeys = ["type", "name", "email", "mobile", "product", "context", "website", "startedAt"];
  if (!isRecord(value) || !hasOnlyKeys(value, allowedKeys)) {
    return { ok: false, message: "Please check the enquiry details and try again." };
  }

  const website = cleanText(value.website ?? "", 200);
  if (website === null || website.length > 0) {
    return { ok: false, message: "The enquiry could not be submitted." };
  }

  const type = cleanText(value.type, 64);
  const name = cleanText(value.name, 100);
  const email = cleanText(value.email, 254)?.toLowerCase() ?? null;
  const mobile = cleanText(value.mobile, 24);
  const product = cleanText(value.product ?? "", 160);
  const context = cleanText(value.context, 4_000);
  const startedAt = typeof value.startedAt === "number" ? Math.trunc(value.startedAt) : NaN;

  if (!type || !enquiryTypes.includes(type as EnquiryType)) {
    return { ok: false, message: "Please select a valid enquiry type." };
  }
  if (!name || name.length < 2) {
    return { ok: false, message: "Please enter your name." };
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  if (!mobile || !/^\+?[0-9 ()-]{7,24}$/.test(mobile)) {
    return { ok: false, message: "Please enter a valid mobile number." };
  }
  if (product === null) {
    return { ok: false, message: "The product name is too long." };
  }
  if (documentRequestTypes.has(type as EnquiryType) && !product) {
    return { ok: false, message: "Please enter the product for this document request." };
  }
  if (!context || context.length < 10) {
    return { ok: false, message: "Please add a little more technical context." };
  }
  if (!Number.isFinite(startedAt) || startedAt <= 0 || startedAt > Date.now() + 60_000) {
    return { ok: false, message: "Please refresh the page and try again." };
  }

  return {
    ok: true,
    data: {
      type: type as EnquiryType,
      name,
      email,
      mobile: mobile.replace(/\s+/g, " "),
      product,
      context,
      startedAt,
    },
  };
}
