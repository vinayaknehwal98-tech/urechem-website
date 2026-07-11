"use client";

import { ArrowRight, LoaderCircle, Sparkles } from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const suggestions = [
  "Closed-cell roof insulation",
  "High-resilience automotive seating",
  "Faster-curing adhesive system",
];

type AnalysisState = "idle" | "analyzing" | "ready";

export function AiChallengeInput() {
  const [value, setValue] = useState("");
  const [state, setState] = useState<AnalysisState>("idle");

  const statusMessage = useMemo(() => {
    if (state === "analyzing") {
      return "Structuring your challenge into application, material and performance signals...";
    }

    if (state === "ready") {
      return "Challenge captured. AI-assisted guidance is preliminary, and final product selection requires technical validation.";
    }

    return "";
  }, [state]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!value.trim()) {
      return;
    }

    setState("analyzing");
    window.setTimeout(() => {
      setState("ready");
    }, 950);
  };

  return (
    <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-cyan-200/24 bg-[linear-gradient(145deg,rgba(7,26,45,0.86),rgba(11,40,64,0.74)_42%,rgba(4,17,31,0.92))] p-3 shadow-[0_22px_80px_rgba(0,0,0,0.38),0_0_44px_rgba(34,211,238,0.08)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/65 to-transparent" />
      <form className="grid gap-2.5" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="challenge-input">
          Describe your application, material or performance challenge
        </label>
        <div className="relative">
          <Sparkles
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-200"
          />
          <textarea
            className="min-h-20 w-full resize-none rounded-[var(--radius-md)] border border-cyan-200/16 bg-navy-950/42 py-4 pl-12 pr-4 text-base font-medium leading-6 text-white outline-none transition placeholder:text-slate-300/72 hover:border-cyan-200/38 hover:bg-navy-950/54 focus:border-cyan-200/78 focus:ring-4 focus:ring-cyan-300/12 sm:min-h-12 sm:py-3"
            id="challenge-input"
            placeholder="Describe your application, material or performance challenge..."
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              if (state !== "idle") {
                setState("idle");
              }
            }}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {suggestions.map((suggestion) => (
              <button
                className="rounded-[var(--radius-sm)] border border-white/12 bg-white/[0.055] px-3 py-1.5 text-left text-xs font-semibold text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition hover:border-cyan-200/48 hover:bg-cyan-300/11 hover:text-cyan-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 sm:py-2"
                key={suggestion}
                type="button"
                onClick={() => {
                  setValue(suggestion);
                  setState("idle");
                }}
              >
                {suggestion}
              </button>
            ))}
          </div>
          <Button
            className="w-full shadow-[0_0_32px_rgba(34,211,238,0.16)] sm:w-auto"
            disabled={!value.trim() || state === "analyzing"}
            type="submit"
          >
            {state === "analyzing" ? (
              <LoaderCircle aria-hidden="true" className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            )}
            Analyze
          </Button>
        </div>
      </form>

      <p className="mt-2.5 px-1 text-xs leading-5 text-slate-300">
        Final product selection requires technical validation by Urechem specialists.
      </p>

      {state !== "idle" ? (
        <div
          aria-live="polite"
          className={cn(
            "mt-2.5 rounded-[var(--radius-md)] border px-4 py-3 text-sm leading-6 transition",
            state === "ready"
              ? "border-turquoise-300/35 bg-turquoise-300/10 text-turquoise-50"
              : "border-cyan-200/24 bg-cyan-300/8 text-cyan-50",
          )}
        >
          {statusMessage}
        </div>
      ) : null}
    </div>
  );
}
