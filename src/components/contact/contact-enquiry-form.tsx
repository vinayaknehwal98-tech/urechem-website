"use client";

import { Check, CheckCircle2, Clipboard, Download, Mail } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { products } from "@/data/catalog";
import { injectionGroutingProfiles } from "@/data/injection-grouting";
import { tpuPathways } from "@/data/tpu-materials";

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
  ...injectionGroutingProfiles.map((profile) => `Injection grouting ${profile.code}`),
  ...tpuPathways.map((pathway) => pathway.name),
];

export function ContactEnquiryForm() {
  const searchParams = useSearchParams();
  const [isPrepared, setIsPrepared] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [form, setForm] = useState(() => ({
    type: normaliseEnquiryType(searchParams.get("type")),
    name: searchParams.get("name") ?? "",
    email: searchParams.get("email") ?? "",
    mobile: searchParams.get("mobile") ?? "",
    product: searchParams.get("product") ?? "",
    context: searchParams.get("context") ?? "",
  }));
  const enquiryEmail = process.env.NEXT_PUBLIC_URECHEM_ENQUIRY_EMAIL?.trim();
  const productRequired = documentRequestTypes.includes(form.type);

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPrepared(true);
    setCopyState("idle");
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
      <div className="grid gap-5 md:grid-cols-2">
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

        <label className="grid gap-2 font-bold text-blue-950">
          Name
          <input
            autoComplete="name"
            className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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
            name="mobile"
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
        Technical context
        <textarea
          aria-describedby="technical-context-help"
          className="min-h-36 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 p-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          name="context"
          placeholder="Describe the application, substrate, environment, performance goal and project constraints."
          required
          value={form.context}
          onChange={(event) => setForm((current) => ({ ...current, context: event.target.value }))}
        />
        <span className="text-xs font-normal text-slate-500" id="technical-context-help">
          Do not include passwords, payment details or unrelated confidential information.
        </span>
      </label>

      <button className="inline-flex h-12 items-center justify-center rounded-[var(--radius-button)] border border-blue-700 bg-blue-700 px-6 font-bold text-white transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600" type="submit">
        Prepare enquiry
      </button>

      {isPrepared ? (
        <section aria-live="polite" className="rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-4 text-blue-950">
          <div className="flex items-start gap-3">
            <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <div>
              <h2 className="font-bold">Your enquiry brief is ready</h2>
              <p className="mt-1 text-sm leading-6">
                Check the details, then email, copy or download the brief for the approved Urechem contact channel.
              </p>
            </div>
          </div>
          <pre className="mt-4 max-h-72 overflow-auto whitespace-pre-wrap rounded-[var(--radius-sm)] border border-blue-200 bg-white p-4 font-sans text-sm leading-6 text-slate-700">
            {enquiryBrief}
          </pre>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {enquiryEmail ? (
              <a
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-blue-700 bg-blue-700 px-4 text-sm font-bold text-white transition hover:bg-blue-800"
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
