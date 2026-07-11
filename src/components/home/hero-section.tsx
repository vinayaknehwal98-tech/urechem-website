import { ArrowRight, Beaker, Boxes, ShieldCheck } from "lucide-react";
import { AiChallengeInput } from "@/components/home/ai-challenge-input";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { FoamCellVisual } from "@/components/visuals/foam-cell-visual";
import { MolecularBackground } from "@/components/visuals/molecular-background";

const proofPoints = [
  {
    icon: Beaker,
    label: "Formulation-led",
    text: "Application problems translated into polyurethane and specialty-chemical pathways.",
  },
  {
    icon: ShieldCheck,
    label: "Validation-aware",
    text: "Technical recommendations stay provisional until reviewed by qualified specialists.",
  },
  {
    icon: Boxes,
    label: "Supply connected",
    text: "Research, development, implementation support, quality validation and supply in one journey.",
  },
];

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100dvh-4.5rem)] overflow-hidden bg-navy-950">
      <MolecularBackground />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.16),transparent_29%),radial-gradient(circle_at_78%_12%,rgba(45,212,191,0.11),transparent_30%),radial-gradient(circle_at_54%_86%,rgba(103,232,249,0.08),transparent_32%),linear-gradient(135deg,rgba(4,17,31,0.97),rgba(7,26,45,0.94)_50%,rgba(4,17,31,0.99))]" />
      <div className="absolute inset-0 -z-10 opacity-[0.22] [background-image:radial-gradient(circle_at_1px_1px,rgba(203,213,225,0.28)_1px,transparent_0)] [background-size:22px_22px]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-navy-950 to-transparent" />

      <Container className="grid min-h-[calc(100dvh-4.5rem)] items-center gap-8 py-8 lg:grid-cols-[1.08fr_0.82fr] lg:py-9 xl:gap-10">
        <div className="relative z-10 max-w-[58rem]">
          <SectionLabel>AI-assisted polyurethane solutions</SectionLabel>
          <h1 className="mt-5 max-w-[46rem] text-balance text-[clamp(2.65rem,3.45vw,3.75rem)] font-black leading-[0.99] text-white">
            Intelligent chemistry for better polyurethane performance.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-lg leading-8 text-slate-200 sm:text-xl">
            Advanced polyurethane systems, specialty chemicals and technical support engineered around real-world
            applications.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/ai-solution-finder" size="lg">
              Describe Your Challenge
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/products" size="lg" variant="secondary">
              Explore Products
            </ButtonLink>
          </div>

          <div className="mt-5 max-w-3xl">
            <AiChallengeInput />
          </div>
        </div>

        <div className="relative z-10 hidden lg:block">
          <FoamCellVisual />
        </div>
      </Container>

      <Container className="relative z-10 pb-10">
        <div className="grid gap-3 border-t border-white/10 pt-6 md:grid-cols-3">
          {proofPoints.map((item) => (
            <article
              className="rounded-[var(--radius-md)] border border-white/10 bg-white/[0.04] p-4 shadow-[var(--shadow-soft)]"
              key={item.label}
            >
              <item.icon aria-hidden="true" className="h-5 w-5 text-cyan-200" />
              <h2 className="mt-3 text-sm font-semibold text-white">{item.label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
