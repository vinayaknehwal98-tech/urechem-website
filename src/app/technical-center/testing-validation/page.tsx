import { ArrowRight, Beaker, CheckCircle2, ClipboardCheck, FlaskConical } from "lucide-react";
import { ValidationNote } from "@/components/catalog/cards";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = { title: "Testing and Validation" };

export default function Page() {
  const stages = [
    [ClipboardCheck, "Define the requirement", "Capture the application, substrate, environment, processing method and target performance."],
    [FlaskConical, "Select the evaluation route", "Identify the sample, formulation, compatibility or application trial that requires review."],
    [Beaker, "Review evidence", "Assess available reference data and agree which measurements or documents are relevant."],
    [CheckCircle2, "Validate before use", "Confirm the selected route with qualified Urechem stakeholders before implementation."],
  ] as const;

  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Technical Center</SectionLabel>
      <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Testing and validation</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">Prepare the information needed for a controlled sample, formulation, compatibility or application review.</p>
      <div className="mt-6"><ValidationNote /></div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {stages.map(([Icon, title, description], index) => (
          <article className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-5 shadow-[var(--shadow-soft)]" key={title}>
            <div className="flex items-center justify-between gap-4">
              <Icon aria-hidden="true" className="size-6 text-cyan-200" />
              <span className="font-mono text-xs text-cyan-100">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
          </article>
        ))}
      </div>
      <ButtonLink className="mt-8" href="/technical-brief-builder" size="lg">
        Build a technical brief
        <ArrowRight aria-hidden="true" className="size-4" />
      </ButtonLink>
    </Container>
  );
}
