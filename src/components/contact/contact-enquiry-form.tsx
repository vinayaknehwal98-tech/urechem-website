"use client";

import { Check, CheckCircle2, Clipboard, Download, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { products } from "@/data/catalog";
import { tpuPathways } from "@/data/tpu-materials";
import { takeConsultationPrefill } from "@/lib/client/consultation-prefill";

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

type EnquiryType = (typeof enquiryTypes)[number];

type ContactEnquiryFormProps = {
  fixedType?: EnquiryType;
};

const documentRequestTypes: EnquiryType[] = [
  "TDS request",
  "SDS request",
  "COA request",
  "Compliance request",
  "Processing guide request",
];

function normaliseEnquiryType(value: string | null): EnquiryType {
  return enquiryTypes.includes(value as EnquiryType) ? (value as EnquiryType) : "General enquiry";
}

function safeFilename(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "enquiry";
}

const enquiryProductOptions = [
  ...products.map((product) => product.name),
  ...tpuPathways.map((pathway) => pathway.name),
];

export function ContactEnquiryForm({ fixedType }: ContactEnquiryFormProps = {}) {
  const searchParams = useSearchParams();
  const isConsultation = fixedType === "Consultation request";
  const startedAtRef = useRef(Date.now());
  const [isPrepared, setIsPrepared] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [form, setForm] = useState(() => ({
    type: fixedType ?? normaliseEnquiryType(searchParams.get("type")),
    name: (searchParams.get("name") ?? "").slice(0, 100),
    email: (searchParams.get("email") ?? "").slice(0, 254),
    mobile: (searchParams.get("mobile") ?? "").slice(0, 24),
    product: (searchParams.get("product") ?? "").slice(0, 160),
    context: (searchParams.get("context") ?? "").slice(0, 4000),
  }));
  const enquiryEmail = process.env.NEXT_PUBLIC_URECHEM_ENQUIRY_EMAIL?.trim();
  const productRequired = documentRequestTypes.includes(form.type);

  useEffect(() => {
    if (!isConsultation) return;
    const prefill = takeConsultationPrefill();
    if (!prefill) return;

    setForm((current) => ({
      ...current,
      name: current.name || prefill.name || "",
      email: current.email || prefill.email || "",
      mobile: current.mobile || prefill.mobile || "",
      context: current.context || prefill.context || "",
    }));
  }, [isConsultation]);

  const enquiryBrief = useMemo(
    () =>
      [
        "URECHEM ENQUIRY",
        `Type: ${form.type}`,
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Mobile: ${form.mobile}`,
        `Product: ${form.product || "Not specified"}`,
        `Technical context: ${form.context || "Not specified"}`,
        "",
        "Please review this enquiry and confirm the appropriate next step.",
      ].join("\n"),
    [form],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (submitState === "sending") return;

    setIsPrepared(true);
    setCopyState("idle");
    setSubmitState("sending");
    setSubmitMessage("");

    try {
      const formData = new FormData(event.currentTarget);
      const website = String(formData.get("website") ?? "");
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          website,
          startedAt: startedAtRef.current,
        }),
        cache: "no-store",
      });
      const payload = (await response.json().catch(() => ({}))) as { message?: string };

      if (!response.ok) {
        setSubmitState("failed");
        setSubmitMessage(payload.message || "Something went wrong. Please try again.");
        return;
      }

      setSubmitState("sent");
      setSubmitMessage(payload.message || "Your enquiry was sent successfully.");
      startedAtRef.current = Date.now();
    } catch {
      setSubmitState("failed");
      setSubmitMessage("Something went wrong. Please try again.");
    }
  };

  const copyBrief = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(enquiryBrief);
      } else {
        const field = document.createElement("textarea");
        field.value = enquiryBrief;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand("copy");
        field.remove();
        if (!copied) throw new Error("Clipboard copy was rejected");
      }
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
  };

  const downloadBrief = () => {
    const url = URL.createObjectURL(new Blob([enquiryBrief], { type: "text/plain;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `urechem-${safeFilename(form.type)}.txt`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
  };

  return (
    <form className="mt-8 grid gap-5 rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.09)] sm:p-8" onSubmit={handleSubmit}>
      <input aria-hidden="true" autoComplete="off" className="hidden" name="website" tabIndex={-1} type="text" />
      <div className="grid gap-5 md:grid-cols-2">
        {fixedType ? (
          <div className="grid content-center gap-1 rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-4 py-3 text-blue-950">
            <span className="text-xs font-black uppercase tracking-[0.14em] text-blue-600">Request type</span>
            <strong>{isConsultation ? "Technical consultation" : fixedType}</strong>
            <input name="type" type="hidden" value={fixedType} />
          </div>
        ) : (
          <label className="grid gap-2 font-bold text-blue-950">
            Enquiry type
            <select
              className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
              name="type"
              value={form.type}
              onChange={(event) => setForm((current) => ({ ...current, type: normaliseEnquiryType(event.target.value) }))}
            >
              {enquiryTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
        )}

        <label className="grid gap-2 font-bold text-blue-950">
          Name
          <input
            autoComplete="name"
            className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            maxLength={100}
            minLength={2}
            name="name"
            required
            value={form.name}
            onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
          />
        </label>

        <label className="grid gap-2 font-bold text-blue-950">
          Email address
          <input
            autoComplete="email"
            className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            maxLength={254}
            name="email"
            required
            type="email"
            value={form.email}
            onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
          />
        </label>

        <label className="grid gap-2 font-bold text-blue-950">
          Mobile number
          <input
            autoComplete="tel"
            className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            inputMode="tel"
            maxLength={24}
            minLength={7}
            name="mobile"
            pattern="[+0-9 ()-]{7,24}"
            required
            type="tel"
            value={form.mobile}
            onChange={(event) => setForm((current) => ({ ...current, mobile: event.target.value }))}
          />
        </label>
      </div>

      <label className="grid gap-2 font-bold text-blue-950">
        Product
        <input
          aria-describedby="product-help"
          className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          list="urechem-product-options"
          maxLength={160}
          name="product"
          placeholder="Enter or select the product or technical pathway"
          required={productRequired}
          value={form.product}
          onChange={(event) => setForm((current) => ({ ...current, product: event.target.value }))}
        />
        <datalist id="urechem-product-options">
          {enquiryProductOptions.map((product) => <option key={product} value={product} />)}
        </datalist>
        <span className="text-xs font-normal text-slate-500" id="product-help">
          A product or pathway is required for TDS, SDS, COA, compliance and processing-guide requests.
        </span>
      </label>

      <label className="grid gap-2 font-bold text-blue-950">
        {isConsultation ? "Project or technical challenge" : "Technical context"}
        <textarea
          aria-describedby="technical-context-help"
          className="min-h-36 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 p-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          maxLength={4000}
          minLength={10}
          name="context"
          placeholder={
            isConsultation
              ? "Describe the application, material, operating environment, performance goal and support you need."
              : "Describe the application, substrate, environment, performance goal and project constraints."
          }
          required
          value={form.context}
          onChange={(event) => setForm((current) => ({ ...current, context: event.target.value }))}
        />
        <span className="text-xs font-normal text-slate-500" id="technical-context-help">
          Do not include passwords, payment details or unrelated confidential information.
        </span>
      </label>

      <button
        className="inline-flex h-12 items-center justify-center rounded-[var(--radius-button)] border border-blue-700 bg-blue-700 px-6 font-bold text-[color:#fff] transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={submitState === "sending"}
        type="submit"
      >
        {submitState === "sending"
          ? "Sending…"
          : isConsultation
            ? "Prepare consultation request"
            : "Prepare enquiry"}
      </button>

      {isPrepared ? (
        <section aria-live="polite" className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-4 text-blue-950">
          <div className="flex items-start gap-3">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <div>
              <h2 className="font-bold">{submitState === "sent" ? "Your enquiry was sent" : "Your enquiry brief is ready"}</h2>
              <p className="mt-1 text-sm leading-6">
                {submitState === "sent"
                  ? submitMessage
                  : "Check the details, then email, copy or download the brief for the approved Urechem contact channel."}
              </p>
              {submitState === "failed" && submitMessage ? (
                <p className="mt-2 text-sm font-semibold leading-6 text-red-700">{submitMessage}</p>
              ) : null}
            </div>
          </div>
          <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-[var(--radius-sm)] border border-blue-200 bg-white p-4 font-sans text-sm leading-6 text-slate-700">
            {enquiryBrief}
          </pre>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {enquiryEmail ? (
              <a
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-blue-700 bg-blue-700 px-4 text-sm font-bold text-[color:#fff] transition hover:bg-blue-800"
                href={`mailto:${enquiryEmail}?subject=${encodeURIComponent(`Urechem ${form.type}: ${form.product || form.name}`)}&body=${encodeURIComponent(enquiryBrief)}`}
              >
                <Mail aria-hidden="true" className="size-4" />
                Email Urechem
              </a>
            ) : null}
            <button
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-blue-300 bg-white px-4 text-sm font-bold text-blue-950 transition hover:bg-blue-100"
              onClick={copyBrief}
              type="button"
            >
              {copyState === "copied" ? <Check aria-hidden="true" className="size-4" /> : <Clipboard aria-hidden="true" className="size-4" />}
              {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy brief"}
            </button>
            <button
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-blue-300 bg-white px-4 text-sm font-bold text-blue-950 transition hover:bg-blue-100"
              onClick={downloadBrief}
              type="button"
            >
              <Download aria-hidden="true" className="size-4" />
              Download brief
            </button>
          </div>
          {copyState === "failed" ? (
            <p className="mt-3 text-xs leading-5 text-red-700">
              Clipboard access was blocked by the browser. Use “Download brief” or manually select the prepared text.
            </p>
          ) : null}
          {!enquiryEmail ? (
            <p className="mt-4 text-xs leading-5 text-slate-600">
              Direct email delivery will be enabled after Urechem confirms the official enquiry inbox.
            </p>
          ) : null}
        </section>
      ) : null}
    </form>
  );
}
