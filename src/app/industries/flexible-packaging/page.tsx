import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  FlaskConical,
  Layers3,
  Package,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = {
  title: "Flexible Packaging Industry",
  description:
    "Explore Urechem product-family pathways for flexible-packaging adhesive, coating and elastomer requirements.",
};

const useCases = [
  "Flexible-film adhesive formulation",
  "Laminating and bonding pathways",
  "Protective coating requirements",
  "Pouch and multilayer-pack structures",
  "Industrial flexible-packaging applications",
  "Application-specific elastomer development",
];

const reviewPoints = [
  "Film and substrate combination",
  "Adhesion and bond target",
  "Coating or adhesive process",
  "Cure and reactivity requirements",
  "Chemical and service exposure",
  "Required TDS, SDS and compliance review",
];

const challenges = [
  "Maintaining dependable adhesion across different film and substrate combinations",
  "Balancing processing speed with cure and reactivity requirements",
  "Achieving durability through handling, storage and service exposure",
  "Controlling viscosity and coating behaviour for the selected process",
  "Matching flexibility and mechanical response to the final pack structure",
  "Confirming regulatory, documentation and end-use requirements before selection",
];

const workflow = [
  ["01", "Define the pack structure", "Share each film, foil, paper or other substrate in the intended construction."],
  ["02", "Map the process", "Document coating, laminating, mixing, cure, temperature and production conditions."],
  ["03", "Select a chemistry route", "Review ChemNate MDI 2437 and KlayOl PPG pathways against the target properties."],
  ["04", "Validate the application", "Coordinate samples, technical documents, trials and final suitability review."],
] as const;

export default function Page() {
  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden border-b border-blue-100 bg-slate-950">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_72%_38%,rgba(34,211,238,0.24),transparent_28%),radial-gradient(circle_at_92%_78%,rgba(37,99,235,0.24),transparent_32%),linear-gradient(135deg,#020f1c_0%,#062944_54%,#071a32_100%)]"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 opacity-25 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:48px_48px]" />

        <Container className="relative grid min-h-[calc(100svh-5rem)] items-center gap-10 py-16 lg:grid-cols-[1fr_0.82fr] lg:py-24">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/40 bg-white/95 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-800 shadow-xl">
              <Package aria-hidden="true" className="h-4 w-4 text-sky-600" />
              Industry solution pathway
            </div>
            <h1 className="mt-6 text-balance text-5xl font-black leading-[0.95] tracking-[-0.055em] !text-white sm:text-6xl lg:text-7xl">
              Flexible packaging
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 !text-slate-100">
              Flexible-packaging performance depends on the interaction between film structure, adhesive or coating chemistry, cure conditions, adhesion, durability and chemical exposure. Urechem routes these requirements toward source-backed ChemNate MDI and KlayOl PPG formulation pathways.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/consultant?context=Flexible%20packaging%20industry%20review">
                Discuss a packaging requirement
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/applications/adhesives-coatings" variant="secondary">
                Explore adhesives and coatings
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[34rem] rounded-[2rem] border border-white/20 bg-white/[0.08] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.38)] backdrop-blur-md sm:p-8">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
            <div className="relative mx-auto aspect-[4/5] max-w-[18rem]">
              <div className="absolute inset-x-[8%] bottom-[4%] top-[5%] rounded-[2.5rem_2.5rem_1.1rem_1.1rem] border border-white/55 bg-[linear-gradient(145deg,rgba(255,255,255,.92),rgba(186,230,253,.7)_38%,rgba(14,165,233,.5)_100%)] shadow-[0_28px_70px_rgba(2,132,199,.3)]">
                <div className="absolute inset-x-5 top-6 h-px bg-sky-900/30" />
                <div className="absolute inset-x-7 top-10 h-px bg-sky-900/20" />
                <div className="absolute left-1/2 top-[34%] flex h-28 w-28 -translate-x-1/2 items-center justify-center rounded-full border border-blue-200 bg-white/75 shadow-xl backdrop-blur">
                  <Layers3 aria-hidden="true" className="h-12 w-12 text-blue-700" />
                </div>
                <div className="absolute inset-x-7 bottom-12 rounded-xl border border-white/50 bg-slate-950/72 px-4 py-3 text-center text-xs font-black uppercase tracking-[0.16em] !text-white">
                  Adhesion • Durability • Flexibility
                </div>
              </div>
              <div className="absolute inset-x-[15%] bottom-0 h-6 rounded-[50%] bg-slate-950/30 blur-md" />
            </div>
            <p className="relative mt-5 text-center text-sm font-semibold leading-6 !text-slate-100">
              Final product selection depends on the complete packaging structure, processing route and end-use validation.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-200 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <SectionLabel>Industry context</SectionLabel>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
                Packaging structures must be reviewed as a complete system
              </h2>
              <p className="mt-5 text-base leading-7 text-slate-600">
                The supplied product reference identifies flexible packaging as an application pathway for ChemNate MDI 2437 and positions KlayOl PPG grades across adhesives, coatings, sealants and elastomers. These routes are starting points for technical review—not automatic end-use approval.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {challenges.map((challenge) => (
                <article
                  className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-lg"
                  key={challenge}
                >
                  <ShieldCheck aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                  <p className="text-sm font-semibold leading-6 text-slate-700">{challenge}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel>Application map</SectionLabel>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
              Common flexible-packaging review contexts
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {useCases.map((useCase) => (
              <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" key={useCase}>
                <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" />
                <p className="text-sm font-bold leading-6 text-slate-800">{useCase}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionLabel>Product-family routes</SectionLabel>
          <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">
            Source-backed chemistry pathways
          </h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Link
              className="group rounded-[var(--radius-lg)] border border-blue-200 bg-white p-7 shadow-[0_18px_55px_rgba(30,64,175,0.08)] transition hover:-translate-y-1.5 hover:border-blue-400 hover:shadow-xl"
              href="/products/chemnate-mdi-range/chemnate-mdi-range-mdi-2437"
            >
              <FlaskConical aria-hidden="true" className="h-7 w-7 text-blue-700" />
              <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-blue-700">ChemNate MDI range</p>
              <h3 className="mt-2 text-2xl font-black text-slate-950">ChemNate MDI 2437</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                A viscosity- and reactivity-modified MDI identified for adhesive and coating applications, including high-performance flexible-packaging pathways requiring adhesion, durability and chemical resistance.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                Review product
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>

            <Link
              className="group rounded-[var(--radius-lg)] border border-blue-200 bg-white p-7 shadow-[0_18px_55px_rgba(30,64,175,0.08)] transition hover:-translate-y-1.5 hover:border-blue-400 hover:shadow-xl"
              href="/products/klayol-ppg-range"
            >
              <Sparkles aria-hidden="true" className="h-7 w-7 text-sky-700" />
              <p className="mt-5 text-xs font-black uppercase tracking-[0.18em] text-blue-700">KlayOl PPG range</p>
              <h3 className="mt-2 text-2xl font-black text-slate-950">PPG formulation routes</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Polypropylene-glycol grades spanning molecular weights from 400 to 12,000, positioned across coatings, adhesives, sealants and elastomers for application-specific formulation review.
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                Explore PPG grades
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr]">
            <div>
              <SectionLabel>Technical review</SectionLabel>
              <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-slate-950 sm:text-5xl">Information needed before selection</h2>
              <div className="mt-6 flex flex-wrap gap-2">
                {reviewPoints.map((point) => (
                  <span className="rounded-full border border-blue-200 bg-white px-3 py-2 text-sm font-semibold text-blue-800" key={point}>
                    {point}
                  </span>
                ))}
              </div>
            </div>
            <div className="grid gap-4">
              {workflow.map(([number, title, description]) => (
                <article className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm" key={number}>
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-base font-black !text-white">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-lg font-black text-slate-950">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-slate-950 py-14">
        <Container className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] !text-cyan-300">Flexible-packaging enquiry</p>
            <h2 className="mt-3 text-3xl font-black !text-white">Bring the complete structure, process and performance target.</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 !text-slate-300">
              Urechem can route the requirement to the relevant MDI and PPG review, coordinate documents and define the next validation step.
            </p>
          </div>
          <ButtonLink href="/consultant?context=Detailed%20flexible%20packaging%20application%20review">
            Start technical discussion
          </ButtonLink>
        </Container>
      </section>
    </main>
  );
}
