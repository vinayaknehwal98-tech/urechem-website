import { ArrowRight, CheckCircle2, Gauge, Layers3 } from "lucide-react";
import { TpuMaterialVisual } from "@/components/media/tpu-material-visual";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { tpuAdvantages, tpuPathways, tpuSourceNote } from "@/data/tpu-materials";

export const metadata = {
  title: "Thermoplastic Polyurethane Materials",
  description:
    "Explore Urechem Chemicals TPU enquiry pathways across polyester-based, polyether-based and polycaprolactone-based thermoplastic polyurethane materials.",
};

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-cyan-200/15 bg-[linear-gradient(135deg,#03101e,#09263e_55%,#075985)] py-18 sm:py-24">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.32)_1px,transparent_0)] [background-size:26px_26px]" />
        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <SectionLabel>Thermoplastic polyurethane</SectionLabel>
              <h1 className="mt-6 max-w-5xl text-balance text-5xl font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                TPU material pathways
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                A controlled selection route across polyester-based, polyether-based and polycaprolactone-based TPU where strength, flexibility, wear, chemical exposure, temperature and processing all shape the final grade decision.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact?type=Consultation%20request&product=TPU%20materials" size="lg">
                  Discuss a TPU requirement
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/technical-brief-builder" size="lg" variant="secondary">
                  Build a material brief
                </ButtonLink>
              </div>
            </div>
            <TpuMaterialVisual />
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fbff,#eaf4ff)] py-16 sm:py-20">
        <Container>
          <div className="rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.08)] sm:p-8">
            <div className="flex gap-3">
              <Layers3 aria-hidden="true" className="mt-1 h-6 w-6 shrink-0 text-blue-700" />
              <p className="leading-7 text-slate-700">
                <strong className="text-blue-950">Source boundary:</strong> {tpuSourceNote}
              </p>
            </div>
          </div>

          <div className="mt-12 max-w-4xl">
            <SectionLabel>TPU types</SectionLabel>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.035em] text-blue-950 sm:text-5xl">
              Start with the polymer family, then define the service environment
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {tpuPathways.map((pathway) => (
              <article
                className="rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.08)] transition duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_24px_70px_rgba(30,64,175,0.14)] sm:p-7"
                key={pathway.slug}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-950 text-white shadow-lg">
                  <Gauge aria-hidden="true" className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-2xl font-black text-blue-950">{pathway.name}</h3>
                <p className="mt-3 leading-7 text-slate-700">{pathway.positioning}</p>

                <div className="mt-6">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">Reference strengths</p>
                  <ul className="mt-3 grid gap-2.5">
                    {pathway.strengths.map((strength) => (
                      <li className="flex gap-2.5 text-sm leading-6 text-slate-700" key={strength}>
                        <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">Selection questions</p>
                  <ul className="mt-3 grid gap-2 text-sm leading-6 text-blue-950">
                    {pathway.reviewQuestions.map((question) => (
                      <li key={question}>• {question}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-14 grid gap-8 lg:grid-cols-[0.72fr_1fr] lg:items-start">
            <div>
              <SectionLabel>Range advantages</SectionLabel>
              <h2 className="mt-5 text-3xl font-black tracking-[-0.03em] text-blue-950 sm:text-4xl">
                Properties identified in the supplied TPU reference
              </h2>
              <p className="mt-4 leading-7 text-slate-700">
                These are material-selection directions, not guaranteed values for an unspecified grade. Final performance depends on formulation, hardness, additives, processing and test conditions.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {tpuAdvantages.map((advantage) => (
                <div className="flex gap-3 rounded-2xl border border-blue-200 bg-white p-4 shadow-sm" key={advantage}>
                  <CheckCircle2 aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-blue-700" />
                  <p className="text-sm font-semibold leading-6 text-blue-950">{advantage}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.08)] sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Grade selection</p>
              <h2 className="mt-2 max-w-3xl text-2xl font-black text-blue-950 sm:text-3xl">
                Share the part geometry, hardness, wear, chemical, temperature, colour, UV and processing requirements.
              </h2>
            </div>
            <ButtonLink className="mt-6 shrink-0 sm:mt-0" href="/contact?type=TDS%20request&product=TPU%20materials" size="lg">
              Ask for TPU documents
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
