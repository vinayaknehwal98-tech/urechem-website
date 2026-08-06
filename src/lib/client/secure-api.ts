import type { GuidedAnalysis } from "@/lib/solution-engine";

type ApiErrorPayload = {
  message?: string;
};

async function readPayload(response: Response) {
  try {
    return (await response.json()) as ApiErrorPayload & { analysis?: GuidedAnalysis };
  } catch {
    return {};
  }
}

export async function requestSolution(question: string, signal?: AbortSignal) {
  const response = await fetch("/api/ai/solution", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question }),
    cache: "no-store",
    signal,
  });
  const payload = await readPayload(response);

  if (!response.ok || !payload.analysis) {
    const retryAfter = response.headers.get("retry-after");
    const fallback = response.status === 429
      ? `Too many requests. Please try again${retryAfter ? ` in ${retryAfter} seconds` : " shortly"}.`
      : "Something went wrong. Please try again.";
    throw new Error(payload.message || fallback);
  }

  return payload.analysis;
}
