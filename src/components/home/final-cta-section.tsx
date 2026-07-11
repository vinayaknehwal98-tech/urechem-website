import { ArrowRight, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ctaBriefFields } from "@/data/homepage";
import { HomeSection } from "./home-section";

export function FinalCtaSection() {
  return (
    <HomeSection
      className="bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.14),transparent_36%),linear-gradient(180deg,rgba(7,26,45,0.94),rgba(4,17,31,1))]"
      eyebrow="Project brief builder"
      id="final-cta"
      title="Have a polyurethane challenge?"
    >
      <div className="grid items-center gap-8 rounded-[var(--radius-lg)] border border-cyan-200/16 bg-white/[0.045] p-6 shadow-[var(--shadow-deep)] lg:grid-cols-[1fr_0.78fr] lg:p-8">
        <div>
          <p className="max-w-3xl text-xl leading-9 text-slate-200">
            Describe the application, material, environment and performance goal. Urechem&apos;s technical team can
            turn it into a structured project brief.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/ai-solution-finder" size="lg">
              Build My Technical Brief
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/contact" size="lg" variant="secondary">
              Speak to an Expert
            </ButtonLink>
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-300">
            AI-assisted brief creation is preliminary. Final product selection and engineering decisions require
            technical validation.
          </p>
        </div>

        <div className="relative min-h-64 overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-navy-950/62 p-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_38%_30%,rgba(34,211,238,0.24),transparent_30%),radial-gradient(circle_at_74%_70%,rgba(45,212,191,0.18),transparent_34%)]" />
          <div className="relative grid gap-3">
            {ctaBriefFields.map((field, index) => (
              <div
                className="flex items-center gap-3 rounded-[var(--radius-md)] border border-white/10 bg-white/[0.055] px-4 py-3 text-sm font-semibold text-slate-100"
                key={field}
              >
                <span className="grid h-7 w-7 place-items-center rounded-[var(--radius-sm)] bg-cyan-300/12 text-xs text-cyan-100">
                  {index + 1}
                </span>
                {field}
              </div>
            ))}
          </div>
          <Sparkles
            aria-hidden="true"
            className="absolute bottom-5 right-5 h-8 w-8 text-cyan-200 motion-safe:animate-pulse"
          />
        </div>
      </div>
    </HomeSection>
  );
}
