"use client";

import { CheckCircle2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

const enquiryTypes = ["General enquiry", "Sample request", "Quotation request", "Site visit request", "Consultation request"] as const;

export function ContactEnquiryForm() {
  const searchParams = useSearchParams();
  const [isPrepared, setIsPrepared] = useState(false);
  const [form, setForm] = useState(() => ({
    type: searchParams.get("type") ?? "General enquiry",
    name: searchParams.get("name") ?? "",
    email: searchParams.get("email") ?? "",
    mobile: searchParams.get("mobile") ?? "",
    context: "",
  }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPrepared(true);
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
            onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
          >
            {enquiryTypes.map((type) => <option key={type}>{type}</option>)}
          </select>
        </label>

        <label className="grid gap-2 font-bold text-blue-950">
          Name
          <input
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
        Technical context
        <textarea
          className="min-h-36 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 p-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
          name="context"
          placeholder="Describe the application, substrate, environment, performance goal and project constraints."
          value={form.context}
          onChange={(event) => setForm((current) => ({ ...current, context: event.target.value }))}
        />
      </label>

      <button className="inline-flex h-12 items-center justify-center rounded-[var(--radius-button)] border border-blue-700 bg-blue-700 px-6 font-bold text-white transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600" type="submit">
        Review enquiry brief
      </button>

      {isPrepared ? (
        <p aria-live="polite" className="flex items-start gap-3 rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
          <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
          Your enquiry brief is ready. Review the details and continue through the approved Urechem contact channel.
        </p>
      ) : null}
    </form>
  );
}
