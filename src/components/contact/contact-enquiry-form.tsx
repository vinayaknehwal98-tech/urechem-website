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
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "enquiry";
}

const enquiryProductOptions = [
  ...products.map((product) => product.name),
  ...tpuPathways.map((pathway) => pathway.name),
];

const emptyForm = {
  type: "General enquiry" as EnquiryType,
  name: "",
  company: "",
  email: "",
  mobile: "",
  industry: "",
  product: "",
  quantity: "",
  context: "",
};

export function ContactEnquiryForm({ fixedType }: ContactEnquiryFormProps = {}) {
  const searchParams = useSearchParams();
  const isConsultation = fixedType === "Consultation request";
  const startedAtRef = useRef(0);
  const [isPrepared, setIsPrepared] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent" | "failed">("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [form, setForm] = useState(() => ({
    type: fixedType ?? normaliseEnquiryType(searchParams.get("type")),
    name: (searchParams.get("name") ?? "").slice(0, 100),
    company: (searchParams.get("company") ?? "").slice(0, 160),
    email: (searchParams.get("email") ?? "").slice(0, 254),
    mobile: (searchParams.get("mobile") ?? "").slice(0, 24),
    industry: (searchParams.get("industry") ?? "").slice(0, 160),
    product: (searchParams.get("product") ?? "").slice(0, 160),
    quantity: (searchParams.get("quantity") ?? "").slice(0, 120),
    context: (searchParams.get("context") ?? "").slice(0, 4000),
  }));
  const enquiryEmail = process.env.NEXT_PUBLIC_URECHEM_ENQUIRY_EMAIL?.trim();
  const productRequired = documentRequestTypes.includes(form.type);

  useEffect(() => {
    startedAtRef.current = Date.now();
    if (!isConsultation) return;

    const prefill = takeConsultationPrefill();
    if (!prefill) return;

    const frame = window.requestAnimationFrame(() => {
      setForm((current) => ({
        ...current,
        name: current.name || prefill.name || "",
        email: current.email || prefill.email || "",
        mobile: current.mobile || prefill.mobile || "",
        context: current.context || prefill.context || "",
      }));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isConsultation]);

  const enquiryBrief = useMemo(
    () => [
      "URECHEM WEBSITE",
      "",
      form.type === "Consultation request" ? "NEW CONSULTATION REQUEST" : "NEW WEBSITE ENQUIRY",
      "",
      `Type: ${form.type}`,
      `Name: ${form.name}`,
      `Company / Organization: ${form.company || "Not specified"}`,
      `Email: ${form.email}`,
      `Phone: ${form.mobile}`,
      `Industry / Application: ${form.industry || "Not specified"}`,
      `Product / Chemical: ${form.product || "Not specified"}`,
      `Quantity / Specification: ${form.quantity || "Not specified"}`,
      "",
      form.type === "Consultation request" ? "Project / technical challenge:" : "Customer enquiry / technical context:",
      form.context,
      "",
      "Please review this enquiry and confirm the appropriate next step.",
    ].join("\n"),
    [form],
  );

  const updateField = (field: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (submitState !== "idle") {
      setSubmitState("idle");
      setSubmitMessage("");
      setIsPrepared(false);
    }
  };

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
        setSubmitMessage(payload.message || "Something went wrong while sending your enquiry. Please try again.");
        return;
      }

      setSubmitState("sent");
      setSubmitMessage(payload.message || "Your enquiry was sent successfully.");
      setForm({ ...emptyForm, type: fixedType ?? "General enquiry" });
      startedAtRef.current = Date.now();
    } catch {
      setSubmitState("failed");
      setSubmitMessage("Something went wrong while sending your enquiry. Please check your connection and try again.");
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
              onChange={(event) => updateField("type", normaliseEnquiryType(event.target.value))}
            >
              {enquiryTypes.map((type) => <option key={type}>{type}</option>)}
            </select>
          </label>
        )}

        <label className="grid gap-2 font-bold text-blue-950">
          Name
          <input autoComplete="name" className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" maxLength={100} minLength={2} name="name" required value={form.name} onChange={(event) => updateField("name", event.target.value)} />
        </label>

        <label className="grid gap-2 font-bold text-blue-950">
          Company / Organization <span className="text-xs font-normal text-slate-500">Optional</span>
          <input autoComplete="organization" className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" maxLength={160} name="company" value={form.company} onChange={(event) => updateField("company", event.target.value)} />
        </label>

        <label className="grid gap-2 font-bold text-blue-950">
          Email address
          <input autoComplete="email" className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" maxLength={254} name="email" required type="email" value={form.email} onChange={(event) => updateField("email", event.target.value)} />
        </label>

        <label className="grid gap-2 font-bold text-blue-950">
          Phone / Mobile
          <input autoComplete="tel" className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" inputMode="tel" maxLength={24} minLength={7} name="mobile" pattern="[+0-9 ()-]{7,24}" required type="tel" value={form.mobile} onChange={(event) => updateField("mobile", event.target.value)} />
        </label>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 font-bold text-blue-950">
          Industry / Application <span className="text-xs font-normal text-slate-500">Optional</span>
          <input className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" maxLength={160} name="industry" placeholder="e.g. construction, footwear, automotive" value={form.industry} onChange={(event) => updateField("industry", event.target.value)} />
        </label>

        <label className="grid gap-2 font-bold text-blue-950">
          Product / Chemical
          <input aria-describedby="product-help" className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" list="urechem-product-options" maxLength={160} name="product" placeholder="Enter or select the product or chemical" required={productRequired} value={form.product} onChange={(event) => updateField("product", event.target.value)} />
          <datalist id="urechem-product-options">
            {enquiryProductOptions.map((product) => <option key={product} value={product} />)}
          </datalist>
          <span className="text-xs font-normal text-slate-500" id="product-help">Required for TDS, SDS, COA, compliance and processing-guide requests.</span>
        </label>
      </div>

      <label className="grid gap-2 font-bold text-blue-950">
        Quantity / Requirement / Specification <span className="text-xs font-normal text-slate-500">Optional</span>
        <input className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" maxLength={120} name="quantity" placeholder="e.g. 500 kg/month, 20 drums, or required specification" value={form.quantity} onChange={(event) => updateField("quantity", event.target.value)} />
      </label>

      <label className="grid gap-2 font-bold text-blue-950">
        {isConsultation ? "Requirement details / Technical challenge" : "Message / Requirement details"}
        <textarea aria-describedby="technical-context-help" className="min-h-36 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 p-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" maxLength={4000} minLength={10} name="context" placeholder={isConsultation ? "Describe the application, material, operating environment, performance goal and support you need." : "Describe your application, requirement, performance goal and any project constraints."} required value={form.context} onChange={(event) => updateField("context", event.target.value)} />
        <span className="text-xs font-normal text-slate-500" id="technical-context-help">Do not include passwords, payment details or unrelated confidential information.</span>
      </label>

      <button className="inline-flex h-12 items-center justify-center rounded-[var(--radius-button)] border border-blue-700 bg-blue-700 px-6 font-bold text-[color:#fff] transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-70" disabled={submitState === "sending"} type="submit">
        {submitState === "sending" ? "Sending…" : isConsultation ? "Send consultation request" : "Send enquiry"}
      </button>

      {isPrepared ? (
        <section aria-live="polite" className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-4 text-blue-950">
          <div className="flex items-start gap-3">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <div>
              <h2 className="font-bold">{submitState === "sent" ? "Enquiry Sent Successfully" : submitState === "failed" ? "Unable to Send Enquiry" : "Sending your enquiry…"}</h2>
              <p className="mt-1 text-sm leading-6">
                {submitState === "sent"
                  ? "Thank you for contacting Urechem. Our team will get back to you shortly."
                  : submitState === "failed"
                    ? submitMessage
                    : "Your enquiry is being securely sent to the Urechem enquiry inbox. Please keep this page open until the send completes."}
              </p>
            </div>
          </div>

          {submitState === "failed" ? (
            <>
              <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-[var(--radius-sm)] border border-blue-200 bg-white p-4 font-sans text-sm leading-6 text-slate-700">{enquiryBrief}</pre>
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {enquiryEmail ? (
                  <a className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-blue-700 bg-blue-700 px-4 text-sm font-bold text-[color:#fff] transition hover:bg-blue-800" href={`mailto:${enquiryEmail}?subject=${encodeURIComponent(`New Website Enquiry — ${form.product || form.type}`)}&body=${encodeURIComponent(enquiryBrief)}`}>
                    <Mail aria-hidden="true" className="size-4" />
                    Email Urechem
                  </a>
                ) : null}
                <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-blue-300 bg-white px-4 text-sm font-bold text-blue-950 transition hover:bg-blue-100" onClick={copyBrief} type="button">
                  {copyState === "copied" ? <Check aria-hidden="true" className="size-4" /> : <Clipboard aria-hidden="true" className="size-4" />}
                  {copyState === "copied" ? "Copied" : copyState === "failed" ? "Copy failed" : "Copy brief"}
                </button>
                <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-blue-300 bg-white px-4 text-sm font-bold text-blue-950 transition hover:bg-blue-100" onClick={downloadBrief} type="button">
                  <Download aria-hidden="true" className="size-4" />
                  Download brief
                </button>
              </div>
              {copyState === "failed" ? <p className="mt-3 text-xs leading-5 text-red-700">Clipboard access was blocked by the browser. Use “Download brief” or manually select the prepared text.</p> : null}
            </>
          ) : null}

          {submitState === "sent" ? (
            <button className="mt-4 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-button)] border border-blue-300 bg-white px-4 text-sm font-bold text-blue-950 transition hover:bg-blue-100" onClick={() => { setSubmitState("idle"); setIsPrepared(false); setSubmitMessage(""); }} type="button">
              Send another enquiry
            </button>
          ) : null}
        </section>
      ) : null}
    </form>
  );
}
