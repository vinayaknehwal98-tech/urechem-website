"use client";

import Link from "next/link";
import { ArrowRight, Beaker, SearchCheck, ShieldCheck } from "lucide-react";
import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { analyzeTechnicalChallenge } from "@/lib/solution-engine";

const suggestions = [
  "Closed-cell roof insulation for a commercial building",
  "High-resilience moulded foam for automotive seating",
  "Water ingress through a concrete construction joint",
  "Faster-curing adhesive or sealant formulation",
];

export function GuidedSolutionFinder({ compact = false }: { compact?: boolean }) {
  const challengeId = useId();
  const challengeRef = useRef<HTMLTextAreaElement>(null);
  const resultRef = useRef<HTMLElement>(null);
  const [value, setValue] = useState("");
  const [submission, setSubmission] = useState<{ value: string; version: number } | null>(null);
  const submittedValue = submission?.value ?? "";
  const analysis = useMemo(
    () => (submittedValue ? analyzeTechnicalChallenge(submittedValue) : null),
    [submittedValue],
  );
  const hasTechnicalMatch = Boolean(
    analysis && (analysis.ureshieldMatch || analysis.pathways.length > 0),
  );
  const hasValue = value.trim().length > 0;

  useEffect(() => {
    if (!submission) return;

    const frame = window.requestAnimationFrame(() => {
      const shouldScroll = window.matchMedia("(max-width: 1023px)").matches;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (shouldScroll) {
        resultRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
      }
      resultRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [submission]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextValue = value.trim();

    if (!nextValue) {
      challengeRef.current?.focus();
      return;
    }

    setSubmission((current) => ({
      value: nextValue,
      version: (current?.version ?? 0) + 1,
    }));
  };

  const chooseSuggestion = (suggestion: string) => {
    setValue(suggestion);
    setSubmission(null);

    window.requestAnimationFrame(() => {
      challengeRef.current?.focus();
      challengeRef.current?.setSelectionRange(suggestion.length, suggestion.length);
    });
  };

  return (
    <div className="rounded-[var(--radius-lg)] border border-cyan-200/20 bg-navy-900/82 p-4 shadow-[var(--shadow-deep)] sm:p-6">
      <form className="grid gap-4" noValidate onSubmit={handleSubmit}>
        <label className="grid gap-2 font-semibold text-cyan-50" htmlFor={challengeId}>
          Describe the result, material or project condition
          <textarea
            aria-describedby={`${challengeId}-hint`}
            className={`${compact ? "min-h-28" : "min-h-36"} w-full resize-y rounded-[var(--radius-md)] border border-white/12 bg-navy-950/72 p-4 font-normal leading-7 text-white outline-none placeholder:text-slate-400 focus:border-cyan-200 focus:ring-4 focus:ring-cyan-300/12`}
            id={challengeId}
            name="technical-challenge"
            onChange={(event) => {
              setValue(event.target.value);
              if (submission) setSubmission(null);
            }}
            placeholder="Example: We need closed-cell insulation for a concrete roof exposed to heat and moisture."
            ref={challengeRef}
            value={value}
          />
        </label>

        <p className="text-xs leading-5 text-slate-400" id={`${challengeId}-hint`}>
          Include the application, substrate or material, environment and performance goal for a more useful match.
        </p>

        <div aria-label="Example technical challenges" className="flex flex-wrap gap-2">
          {suggestions.map((suggestion) => {
            const isSelected = value === suggestion;

            return (
              <button
                aria-pressed={isSelected}
                className={`rounded-full border px-3 py-2 text-left text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 ${
                  isSelected
                    ? "border-cyan-200 bg-cyan-300/18 text-white shadow-[0_0_0_3px_rgba(103,232,249,0.08)]"
                    : "border-white/12 bg-white/[0.05] text-slate-200 hover:border-cyan-200/60 hover:bg-cyan-300/10"
                }`}
                key={suggestion}
                onClick={(event) => {
                  event.preventDefault();
                  chooseSuggestion(suggestion);
                }}
                type="button"
              >
                {suggestion}
              </button>
            );
          })}
        </div>

        <Button className="w-full sm:w-fit" disabled={!hasValue} type="submit">
          <SearchCheck aria-hidden="true" className="size-4" />
          Find relevant pathways
        </Button>
      </form>

      {analysis ? (
        <section
          aria-live="polite"
          className="mt-6 scroll-mt-28 border-t border-white/10 pt-6 outline-none"
          ref={resultRef}
          tabIndex={-1}
        >
          <div className="flex items-start gap-3">
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-turquoise-300" />
            <div>
              <h2 className="text-xl font-semibold text-white">
                {hasTechnicalMatch ? "Preliminary pathway analysis" : "Add a little more technical detail"}
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                {hasTechnicalMatch
                  ? `${analysis.pathways.length} relevant ${analysis.pathways.length === 1 ? "pathway" : "pathways"} found from the published catalog. These are not final product selection or engineering approval.`
                  : "I could not identify a reliable catalog pathway from that message, so no product route has been guessed."}
              </p>
            </div>
          </div>

          {hasTechnicalMatch ? (
            <>
              {analysis.ureshieldMatch ? (
                <article className="mt-5 rounded-[var(--radius-md)] border border-blue-300/30 bg-blue-400/10 p-4">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">Water control signal</p>
                  <h3 className="mt-2 text-lg font-semibold text-white">Review the UreShield pathway</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    The brief mentions waterproofing, leakage, injection, grouting, membrane or polyurea requirements.
                  </p>
                  <Link
                    className="mt-4 inline-flex items-center gap-2 font-semibold text-cyan-100 underline decoration-cyan-300/40 underline-offset-4"
                    href="/products/ureshield-waterproofing-polyurea-systems"
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
                      <div className="mt-3 flex flex-wrap gap-2" aria-label="Relevant product families">
                        {pathway.familyNames.map((familyName, index) => (
                          <Link
                            className="rounded-full border border-cyan-200/20 bg-cyan-300/8 px-2.5 py-1 text-xs font-semibold text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/14"
                            href={pathway.familyHrefs[index]}
                            key={pathway.familyHrefs[index]}
                          >
                            {familyName}
                          </Link>
                        ))}
                      </div>
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
                href={`/consultant?context=${encodeURIComponent(submittedValue)}`}
              >
                Send this challenge for expert review
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </>
          ) : (
            <div className="mt-5 rounded-[var(--radius-md)] border border-blue-200/70 bg-blue-50/80 p-4 text-sm leading-6 text-slate-700">
              Include the application, substrate or material, operating environment and the result you need. For example: “Closed-cell insulation for a concrete roof exposed to heat and moisture.”
            </div>
          )}
        </section>
      ) : null}
    </div>
  );
}
