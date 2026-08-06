const baseUrl = process.env.SMOKE_BASE_URL ?? "http://127.0.0.1:3000";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function request(path, init) {
  return fetch(`${baseUrl}${path}`, { redirect: "manual", ...init });
}

const home = await request("/");
assert(home.ok, `Home page failed with ${home.status}`);
for (const header of [
  "content-security-policy",
  "strict-transport-security",
  "x-content-type-options",
  "referrer-policy",
  "permissions-policy",
  "x-frame-options",
]) {
  assert(home.headers.has(header), `Missing security header: ${header}`);
}
assert(!home.headers.has("x-powered-by"), "Technology-identifying X-Powered-By header is present");

const methodCheck = await request("/api/ai/solution");
assert(methodCheck.status === 405, `AI endpoint GET should return 405, received ${methodCheck.status}`);

const validAi = await request("/api/ai/solution", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ question: "Closed-cell roof insulation" }),
});
assert(validAi.status === 200, `Valid AI request failed with ${validAi.status}`);
const validAiPayload = await validAi.json();
assert(validAiPayload.analysis && Array.isArray(validAiPayload.analysis.pathways), "AI response shape is invalid");

const unknownField = await request("/api/ai/solution", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ question: "roof insulation", unexpected: true }),
});
assert(unknownField.status === 400, `Unknown AI field should return 400, received ${unknownField.status}`);

const wrongType = await request("/api/ai/solution", {
  method: "POST",
  headers: { "content-type": "text/plain" },
  body: "roof insulation",
});
assert(wrongType.status === 415, `Wrong content type should return 415, received ${wrongType.status}`);

const oversized = await request("/api/ai/solution", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ question: "x".repeat(9_000) }),
});
assert(oversized.status === 413, `Oversized AI request should return 413, received ${oversized.status}`);

let sawAiRateLimit = false;
for (let attempt = 0; attempt < 10; attempt += 1) {
  const response = await request("/api/ai/solution", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ question: `roof insulation ${attempt}` }),
  });
  if (response.status === 429) {
    sawAiRateLimit = true;
    assert(response.headers.has("retry-after"), "Rate-limited response is missing Retry-After");
    break;
  }
}
assert(sawAiRateLimit, "AI rate limit did not return HTTP 429");

const crossSite = await request("/api/enquiries", {
  method: "POST",
  headers: { "content-type": "application/json", origin: "https://attacker.example" },
  body: "{}",
});
assert(crossSite.status === 403, `Cross-site enquiry should return 403, received ${crossSite.status}`);

const startedAt = Date.now() - 3_000;
const enquiry = {
  type: "General enquiry",
  name: "Security Test",
  email: "security-test@example.com",
  mobile: "+91 99999 99999",
  product: "",
  context: "Testing the secured website enquiry submission endpoint.",
  website: "",
  startedAt,
};

const honeypot = await request("/api/enquiries", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ ...enquiry, website: "bot.example" }),
});
assert(honeypot.status === 400, `Honeypot should return 400, received ${honeypot.status}`);

const validEnquiry = await request("/api/enquiries", {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify(enquiry),
});
assert([200, 503].includes(validEnquiry.status), `Valid enquiry reached unexpected status ${validEnquiry.status}`);
const enquiryPayload = await validEnquiry.json();
assert(typeof enquiryPayload.message === "string", "Enquiry response is missing a safe user message");
assert(!JSON.stringify(enquiryPayload).includes("RESEND_API_KEY"), "Enquiry response exposed an environment-variable name");

let sawFormRateLimit = false;
for (let attempt = 0; attempt < 5; attempt += 1) {
  const response = await request("/api/enquiries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...enquiry, email: `security-${attempt}@example.com`, startedAt: Date.now() - 3_000 }),
  });
  if (response.status === 429) {
    sawFormRateLimit = true;
    assert(response.headers.has("retry-after"), "Form rate-limited response is missing Retry-After");
    break;
  }
}
assert(sawFormRateLimit, "Enquiry rate limit did not return HTTP 429");

console.log("Security smoke tests passed.");
