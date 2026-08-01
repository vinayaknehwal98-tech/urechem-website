"use client";

import Link from "next/link";
import { ArrowRight, Bot, FileSearch, RotateCcw, Send, ShieldCheck, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { analyzeTechnicalChallenge } from "@/lib/solution-engine";

const starterQuestions = [
  "Which pathway fits closed-cell roof insulation?",
  "What should I explore for water ingress through concrete?",
  "I need high-resilience foam for automotive seating",
  "How can I request a TDS for a product?",
];

const greetingPattern = /^(?:(?:hi|hello|hey|namaste)(?:\s+(?:there|team))?|good\s+(?:morning|afternoon|evening))[\s!,.?]*$/i;

function isGreeting(value: string) {
  return greetingPattern.test(value.trim());
}

type DocumentIntent = "TDS" | "SDS" | "COA" | "Compliance" | "Processing guide";

function getDocumentIntent(value: string): DocumentIntent | null {
  const normalized = value.toLowerCase();

  if (normalized.includes("tds") || normalized.includes("technical data sheet")) return "TDS";
  if (normalized.includes("sds") || normalized.includes("safety data sheet")) return "SDS";
  if (normalized.includes("coa") || normalized.includes("certificate of analysis")) return "COA";
  if (normalized.includes("compliance") || normalized.includes("certificate")) return "Compliance";
  if (normalized.includes("processing guide") || normalized.includes("processing instructions")) return "Processing guide";

  return null;
}

export function UrechemAiAssistant() {
  const questionId = useId();
  const questionRef = useRef<HTMLTextAreaElement>(null);
  const answerRef = useRef<HTMLElement>(null);
  const [draft, setDraft] = useState("");
  const [request, setRequest] = useState<{ value: string; version: number } | null>(null);
  const question = request?.value ?? "";
  const analysis = useMemo(
    () => (question ? analyzeTechnicalChallenge(question) : null),
    [question],
  );
  const documentIntent = useMemo(() => getDocumentIntent(question), [question]);
  const greeting = Boolean(question && isGreeting(question));
  const needsClarification = Boolean(
    question &&
      analysis &&
      !greeting &&
      !documentIntent &&
      !analysis.ureshieldMatch &&
      analysis.pathways.length === 0,
  );

  useEffect(() => {
    if (!request) return;

    const frame = window.requestAnimationFrame(() => {
      const shouldScroll = window.matchMedia("(max-width: 1023px)").matches;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (shouldScroll) {
        answerRef.current?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "nearest" });
      }
      answerRef.current?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [request]);

  const chooseQuestion = (value: string) => {
    setDraft(value);
    setRequest(null);
    window.requestAnimationFrame(() => questionRef.current?.focus());
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextQuestion = draft.trim();
    if (!nextQuestion) return;

    setRequest((current) => ({
      value: nextQuestion,
      version: (current?.version ?? 0) + 1,
    }));
  };

  const resetAssistant = () => {
    setDraft("");
    setRequest(null);
    window.requestAnimationFrame(() => questionRef.current?.focus());
  };

  return (
    <div className="overflow-hidden rounded-[var(--radius-lg)] border border-cyan-200/20 bg-navy-900/82 shadow-[var(--shadow-deep)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 bg-white/[0.035] px-4 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full border border-cyan-200/25 bg-cyan-300/10 text-cyan-100">
            <Bot aria-hidden="true" className="size-5" />
          </span>
          <div>
            <p className="font-semibold text-white">Urechem catalog assistant</p>
            <p className="text-xs text-slate-400">Published pathways · preliminary guidance</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/8 px-3 py-1.5 text-xs font-semibold text-emerald-100">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-emerald-300" />
          Ready for a question
        </span>
      </div>

      <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[0.82fr_1.18fr] lg:gap-8">
        <form className="grid content-start gap-4" onSubmit={handleSubmit}>
          <label className="grid gap-2 font-semibold text-cyan-50" htmlFor={questionId}>
            Ask about an application, product pathway or technical document
            <textarea
              aria-describedby={`${questionId}-hint`}
              className="min-h-36 w-full resize-y rounded-[var(--radius-md)] border border-white/12 bg-navy-950/72 p-4 font-normal leading-7 text-white outline-none placeholder:text-slate-400 focus:border-cyan-200 focus:ring-4 focus:ring-cyan-300/12"
              id={questionId}
              onChange={(event) => {
                setDraft(event.target.value);
                if (request) setRequest(null);
              }}
              placeholder="Example: Which product family should I explore for roof insulation exposed to heat and moisture?"
              ref={questionRef}
              required
              value={draft}
            />
          </label>

          <p className="text-xs leading-5 text-slate-400" id={`${questionId}-hint`}>
            The assistant uses Urechem&apos;s published catalog relationships and does not replace expert validation.
          </p>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">Try a question</p>
            <div className="grid gap-2">
              {starterQuestions.map((starterQuestion) => (
                <button
                  className="rounded-[var(--radius-sm)] border border-white/10 bg-white/[0.04] px-3 py-2.5 text-left text-sm text-slate-200 transition hover:border-cyan-200/60 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                  key={starterQuestion}
                  onClick={() => chooseQuestion(starterQuestion)}
                  type="button"
                >
                  {starterQuestion}
                </button>
              ))}
            </div>
          </div>

          <Button className="w-full sm:w-fit" disabled={!draft.trim()} type="submit">
            <Send aria-hidden="true" className="size-4" />
            Ask Urechem AI
          </Button>
        </form>

        <div className="min-h-80 rounded-[var(--radius-md)] border border-white/10 bg-navy-950/55 p-4 sm:p-5">
          {analysis && request ? (
            <section
              aria-live="polite"
              className="scroll-mt-28 outline-none"
              ref={answerRef}
              tabIndex={-1}
            >
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-br-sm bg-blue-600 px-4 py-3 text-sm leading-6 text-white">
                {question}
              </div>

              <div className="mt-4 flex gap-3">
                <span className="mt-1 grid size-8 shrink-0 place-items-center rounded-full border border-cyan-200/25 bg-cyan-300/10 text-cyan-100">
                  <Sparkles aria-hidden="true" className="size-4" />
                </span>
                <div className="min-w-0 flex-1 rounded-2xl rounded-tl-sm border border-white/10 bg-white/[0.055] p-4">
                  <p className="font-mono text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
                    {greeting ? "Urechem assistant" : needsClarification ? "More detail needed" : "Preliminary catalog answer"}
                  </p>

                  {greeting ? (
                    <div className="mt-4">
                      <h2 className="text-lg font-semibold text-white">Hi! How can I help?</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        Tell me the application, material, site condition or technical document you need. I&apos;ll help you find the relevant Urechem pathway without guessing a product route.
                      </p>
                    </div>
                  ) : needsClarification ? (
                    <div className="mt-4">
                      <h2 className="text-lg font-semibold text-white">I need a little more technical detail.</h2>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        I could not identify a reliable catalog match from that message, so I have not generated a recommendation.
                      </p>
                      <ul className="mt-3 grid gap-2 text-sm leading-6 text-slate-300 sm:grid-cols-2">
                        <li>• Application or component</li>
                        <li>• Material or substrate</li>
                        <li>• Operating environment</li>
                        <li>• Required performance result</li>
                      </ul>
                    </div>
                  ) : (
                    <>
                      {documentIntent ? (
                        <div className="mt-4 rounded-[var(--radius-sm)] border border-amber-300/25 bg-amber-300/8 p-4">
                          <div className="flex items-start gap-3">
                            <FileSearch aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-amber-200" />
                            <div>
                              <h2 className="font-semibold text-white">Request the current {documentIntent}</h2>
                              <p className="mt-2 text-sm leading-6 text-slate-300">
                                Document availability is confirmed by Urechem for the selected product. Use the document request library to prepare a focused request.
                              </p>
                              <Link
                                className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-amber-100"
                                href={`/technical-center/documents?type=${encodeURIComponent(documentIntent)}`}
                              >
                                Open document requests
                                <ArrowRight aria-hidden="true" className="size-4" />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ) : null}

                      {analysis.ureshieldMatch ? (
                        <div className="mt-4 rounded-[var(--radius-sm)] border border-blue-300/25 bg-blue-400/10 p-4">
                          <h2 className="font-semibold text-white">Start with the UreShield pathway</h2>
                          <p className="mt-2 text-sm leading-6 text-slate-300">
                            Your question contains water-control, membrane, leakage, grouting or polyurea signals. Substrate, water pressure and application method still require technical review.
                          </p>
                          <Link
                            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100"
                            href="/products/ureshield-waterproofing-polyurea-systems"
                          >
                            Explore UreShield
                            <ArrowRight aria-hidden="true" className="size-4" />
                          </Link>
                        </div>
                      ) : null}

                      <div className="mt-4 grid gap-3">
                        {analysis.pathways.map((pathway, pathwayIndex) => (
                          <article className="rounded-[var(--radius-sm)] border border-white/10 bg-navy-950/45 p-4" key={pathway.applicationSlug}>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
                              {pathwayIndex === 0 ? "Best starting route" : "Related route"}
                            </p>
                            <h2 className="mt-2 text-lg font-semibold text-white">{pathway.applicationName}</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-300">{pathway.reason}</p>
                            {pathway.familyNames.length ? (
                              <p className="mt-2 text-xs leading-5 text-slate-400">
                                Relevant families: {pathway.familyNames.join(", ")}
                              </p>
                            ) : null}
                            <Link
                              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-100"
                              href={pathway.applicationHref}
                            >
                              Review this pathway
                              <ArrowRight aria-hidden="true" className="size-4" />
                            </Link>
                          </article>
                        ))}
                      </div>

                      <div className="mt-4 flex items-start gap-2 border-t border-white/10 pt-4 text-xs leading-5 text-slate-400">
                        <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-turquoise-300" />
                        Final product selection, specifications and engineering decisions require review by qualified Urechem stakeholders.
                      </div>

                      <div className="mt-4 flex flex-wrap gap-3">
                        <Link
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-cyan-300/80 bg-cyan-300 px-4 text-sm font-semibold text-navy-950 transition hover:bg-white"
                          href={`/consultant?context=${encodeURIComponent(question)}`}
                        >
                          Ask an expert
                          <ArrowRight aria-hidden="true" className="size-4" />
                        </Link>
                        <button
                          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-[var(--radius-button)] border border-white/15 px-4 text-sm font-semibold text-slate-200 transition hover:border-cyan-200/60 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200"
                          onClick={resetAssistant}
                          type="button"
                        >
                          <RotateCcw aria-hidden="true" className="size-4" />
                          Ask another question
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </section>
          ) : (
            <div className="grid min-h-72 place-items-center text-center">
              <div className="max-w-sm">
                <span className="mx-auto grid size-14 place-items-center rounded-full border border-cyan-200/20 bg-cyan-300/8 text-cyan-100">
                  <Sparkles aria-hidden="true" className="size-6" />
                </span>
                <h2 className="mt-4 text-lg font-semibold text-white">Ask a technical discovery question</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  You will receive catalog-linked application routes, product-family directions and the correct expert-review next step.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
