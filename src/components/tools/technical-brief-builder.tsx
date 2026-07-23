"use client";

import Link from "next/link";
import { Check, Clipboard, FileText } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

type BriefState = {
  application: string;
  substrate: string;
  environment: string;
  performanceGoal: string;
  process: string;
  documents: string;
};

const initialState: BriefState = {
  application: "",
  substrate: "",
  environment: "",
  performanceGoal: "",
  process: "",
  documents: "",
};

export function TechnicalBriefBuilder() {
  const [form, setForm] = useState(initialState);
  const [isReady, setIsReady] = useState(false);
  const [copied, setCopied] = useState(false);

  const brief = useMemo(
    () =>
      [
        "URECHEM TECHNICAL ENQUIRY BRIEF",
        `Application: ${form.application || "Not provided"}`,
        `Substrate / material: ${form.substrate || "Not provided"}`,
        `Operating environment: ${form.environment || "Not provided"}`,
        `Performance goal: ${form.performanceGoal || "Not provided"}`,
        `Process / installation constraints: ${form.process || "Not provided"}`,
        `Required documents: ${form.documents || "Not provided"}`,
        "",
        "Preliminary brief only. Final product selection requires Urechem technical validation.",
      ].join("\n"),
    [form],
  );

  const update = (field: keyof BriefState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setIsReady(false);
    setCopied(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsReady(true);
  };

  const copyBrief = async () => {
    await navigator.clipboard.writeText(brief);
    setCopied(true);
  };

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <form className="grid gap-5 rounded-[var(--radius-lg)] border border-white/10 bg-navy-900/80 p-5 shadow-[var(--shadow-soft)] sm:p-6" onSubmit={handleSubmit}>
        <BriefField label="Application or end use" required value={form.application} onChange={(value) => update("application", value)} />
        <BriefField label="Substrate or material" required value={form.substrate} onChange={(value) => update("substrate", value)} />
        <BriefField label="Operating environment" value={form.environment} onChange={(value) => update("environment", value)} />
        <BriefField label="Required performance" required value={form.performanceGoal} onChange={(value) => update("performanceGoal", value)} />
        <BriefField label="Process or installation constraints" multiline value={form.process} onChange={(value) => update("process", value)} />
        <BriefField label="Documents needed" value={form.documents} onChange={(value) => update("documents", value)} />
        <Button type="submit">
          <FileText aria-hidden="true" className="size-4" />
          Build technical brief
        </Button>
      </form>

      <section aria-live="polite" className="rounded-[var(--radius-lg)] border border-cyan-200/16 bg-white/[0.045] p-5 shadow-[var(--shadow-deep)] sm:p-6">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-cyan-100">Generated brief</p>
        {isReady ? (
          <>
            <pre className="mt-4 whitespace-pre-wrap rounded-[var(--radius-md)] border border-white/10 bg-navy-950/72 p-4 font-sans text-sm leading-7 text-slate-200">
              {brief}
            </pre>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <Button onClick={copyBrief} variant="secondary">
                {copied ? <Check aria-hidden="true" className="size-4" /> : <Clipboard aria-hidden="true" className="size-4" />}
                {copied ? "Copied" : "Copy brief"}
              </Button>
              <Link
                className="inline-flex min-h-11 items-center justify-center rounded-[var(--radius-button)] border border-cyan-300/80 bg-cyan-300 px-5 text-sm font-semibold text-navy-950 transition hover:bg-white"
                href={`/contact?type=Consultation%20request&context=${encodeURIComponent(brief)}`}
              >
                Continue to enquiry
              </Link>
            </div>
          </>
        ) : (
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Complete the fields to create a structured brief you can copy or send to the Urechem team.
          </p>
        )}
      </section>
    </div>
  );
}

function BriefField({
  label,
  multiline = false,
  onChange,
  required = false,
  value,
}: {
  label: string;
  multiline?: boolean;
  onChange: (value: string) => void;
  required?: boolean;
  value: string;
}) {
  const className =
    "w-full rounded-[var(--radius-md)] border border-white/12 bg-navy-950/72 px-4 py-3 font-normal text-white outline-none placeholder:text-slate-500 focus:border-cyan-200 focus:ring-4 focus:ring-cyan-300/12";

  return (
    <label className="grid gap-2 text-sm font-semibold text-cyan-50">
      {label}
      {multiline ? (
        <textarea className={`${className} min-h-28 resize-y`} onChange={(event) => onChange(event.target.value)} required={required} value={value} />
      ) : (
        <input className={className} onChange={(event) => onChange(event.target.value)} required={required} value={value} />
      )}
    </label>
  );
}
