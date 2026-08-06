"use client";

const storageKey = "urechem-consultation-prefill-v1";

type ConsultationPrefill = {
  name?: string;
  email?: string;
  mobile?: string;
  context?: string;
};

function clean(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.slice(0, maxLength) : undefined;
}

export function saveConsultationPrefill(value: ConsultationPrefill) {
  try {
    window.sessionStorage.setItem(storageKey, JSON.stringify({
      name: clean(value.name, 100),
      email: clean(value.email, 254),
      mobile: clean(value.mobile, 24),
      context: clean(value.context, 4_000),
    }));
  } catch {
    // Navigation continues when storage is unavailable; the user can re-enter details.
  }
}

export function takeConsultationPrefill(): ConsultationPrefill | null {
  try {
    const raw = window.sessionStorage.getItem(storageKey);
    window.sessionStorage.removeItem(storageKey);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Record<string, unknown>;
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;

    return {
      name: clean(parsed.name, 100),
      email: clean(parsed.email, 254),
      mobile: clean(parsed.mobile, 24),
      context: clean(parsed.context, 4_000),
    };
  } catch {
    return null;
  }
}
