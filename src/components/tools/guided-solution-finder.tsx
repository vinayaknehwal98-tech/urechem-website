"use client";

import Link from "next/link";
import { ArrowRight, Beaker, SearchCheck, ShieldCheck } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { analyzeTechnicalChallenge } from "@/lib/solution-engine";

const suggestions = [
  "Closed-cell roof insulation for a commercial building",
  "High-resilience moulded foam for automotive seating",
  "Water ingress through a concrete construction joint",
  "Faster-curing adhesive or sealant formulation",
];

export function GuidedSolutionFinder({ compact = false }: { compact?: boolean }) {
  const [value, setValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState("");
  const analysis = useMemo(
    () => (submittedValue ? analyzeTechnicalChallenge(submittedValue) : null),
    [submittedValue],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextValue = value.trim();
    if (nextValue) {
      setSubmittedValue(nextValue);
    }
  };

  return (
    <div className="rounded-[var(--radius-lg)] border border-cyan-200/20 bg-navy-900/82 p-4 shadow-[var(--shadow-deep)] sm:p-6">
      <form className="grid gap-4" onSubmit={handleSubmit}>
        <label className="grid gap-2 font-semibold text-cyan-50" htmlFor={compact ? "compact-guided-challenge" : "guided-challenge"}>
          Describe the result, material or project condition
          <textarea
            className={`${compact ? "min-h-28" : "min-h-36"} w-full resize-y rounded-[var(--radius-md)] border border-white/12 bg-navy-950/72 p-4 font-normal leading-7 text-white outline-none placeholder:text-slate-400 focus:border-cyan-200 focus:ring-4 focus:ring-cyan-300/12`}
            id={compact ? "compact-guided-challenge" : "guided-challenge"}
            onChange={(event) => {
              setValue(event.target.value);
              if (submittedValue) setSubmittedValue("");
            }}
            placeholder="Example: We need closed-cell insulation for a concrete roof exposed to heat and moisture."
            required
            value={value}
          />
        </label>

        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => (
            <button
              className="rounded-full border border-white/12 bg-white/[0.05] px-3 py-2 text-left text-xs font-semibold text-slate-200 transition hover:border-cyan-200/60 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
              key={suggestion}
              onClick={() => {
                setValue(suggestion);
                setSubmittedValue("");
              }}
              type="button"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <Button className="w-full sm:w-fit" disabled={!value.trim()} type="submit">
          <SearchCheck aria-hidden="true" className="size-4" />
          Find relevant pathways
        </Button>
      </form>

      {analysis ? (
        <section aria-live="polite" className="mt-6 border-t border-white/10 pt-6">
          <div className="flex items-start gap-3">
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-turquoise-300" />
            <div>
              <h2 className="text-xl font-semibold text-white">Preliminary pathway analysis</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                These routes are based on keywords and catalog relationships. They are not final product selection or engineering approval.
              </p>
            </div>
          </div>

          {analysis.ureshieldMatch ? (
            <article className="mt-5 rounded-[var(--radius-md)] border border-blue-300/30 bg-blue-400/10 p-4">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">Water control signal</p>
              <h3 className="mt-2 text-lg font-semibold text-white">Review the UreShield pathway</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                The brief mentions waterproofing, leakage, injection, grouting, membrane or polyurea requirements.
              </p>
              <Link
                className="mt-4 inline-flex items-center gap-2 font-semibold text-cyan-100 underline decoration-cyan-300/40 underline-offset-4"
                href="/products/ureshield-waterproofing-grouting-systems"
              >
                Open UreShield
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </article>
          ) : null}

          <div className="mt-5 grid gap-4 lg:grid-cols-3">
            {analysis.pathways.map((pathway) => (
              <article className="rounded-[var(--radius-md)] border border-white/10 bg-white/[0.045] p-4" key={pathway.applicationSlug}>
                <Beaker aria-hidden="true" className="size-5 text-cyan-200" />
                <h3 className="mt-4 text-lg font-semibold text-white">{pathway.applicationName}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{pathway.reason}</p>
                {pathway.familyNames.length ? (
                  <p className="mt-3 text-xs leading-5 text-slate-400">
                    Relevant families: {pathway.familyNames.join(", ")}
                  </p>
                ) : null}
                <Link
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100"
                  href={pathway.applicationHref}
                >
                  Explore pathway
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </article>
            ))}
          </div>

          <Link
            className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-cyan-300/80 bg-cyan-300 px-5 font-semibold text-navy-950 transition hover:bg-white"
            href={`/contact?type=Consultation%20request&context=${encodeURIComponent(submittedValue)}`}
          >
            Send this challenge for expert review
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </section>
      ) : null}
    </div>
  );
}
