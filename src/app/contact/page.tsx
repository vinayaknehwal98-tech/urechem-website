"use client";

import { CheckCircle2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Container } from "@/components/ui/container";

const enquiryTypes = ["General enquiry", "Sample request", "Quotation request", "Site visit request", "Consultation request"] as const;

export default function Page() {
  const searchParams = useSearchParams();
  const [isPrepared, setIsPrepared] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPrepared(true);
  };

  return (
    <section className="bg-[linear-gradient(180deg,#f8fbff,#eaf4ff)] py-16 sm:py-20">
      <Container>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">Urechem Chemicals</p>
        <h1 className="mt-4 text-4xl font-black text-blue-950 sm:text-5xl">Contact Urechem</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
          Submit a structured enquiry so the Urechem team can route your request to the right commercial or technical consultant.
        </p>

        <form className="mt-8 grid gap-5 rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.09)] sm:p-8" onSubmit={handleSubmit}>
          <div className="grid gap-5 md:grid-cols-2">
            <label className="grid gap-2 font-bold text-blue-950">
              Enquiry type
              <select className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" defaultValue={searchParams.get("type") ?? "General enquiry"} name="type">
                {enquiryTypes.map((type) => <option key={type}>{type}</option>)}
              </select>
            </label>

            <label className="grid gap-2 font-bold text-blue-950">
              Name
              <input className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" defaultValue={searchParams.get("name") ?? ""} name="name" required />
            </label>

            <label className="grid gap-2 font-bold text-blue-950">
              Email address
              <input className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" defaultValue={searchParams.get("email") ?? ""} name="email" required type="email" />
            </label>

            <label className="grid gap-2 font-bold text-blue-950">
              Mobile number
              <input className="h-12 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 px-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" defaultValue={searchParams.get("mobile") ?? ""} inputMode="tel" name="mobile" required type="tel" />
            </label>
          </div>

          <label className="grid gap-2 font-bold text-blue-950">
            Technical context
            <textarea className="min-h-36 w-full rounded-[var(--radius-md)] border border-blue-200 bg-blue-50/60 p-3 text-slate-800 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" name="context" placeholder="Describe the application, substrate, environment, performance goal and project constraints." />
          </label>

          <button className="inline-flex h-12 items-center justify-center rounded-[var(--radius-button)] border border-blue-700 bg-blue-700 px-6 font-bold text-white transition hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600" type="submit">
            Prepare enquiry brief
          </button>

          {isPrepared ? (
            <p aria-live="polite" className="flex items-start gap-3 rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950">
              <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
              Your enquiry brief is prepared for Urechem review. Connect the approved email, CRM or form endpoint before production launch to transmit submissions.
            </p>
          ) : null}
        </form>
      </Container>
    </section>
  );
}
