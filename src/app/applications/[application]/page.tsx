import { notFound } from "next/navigation";
import { CheckCircle2, ClipboardCheck, FileText, Layers3, ShieldCheck, ThermometerSun } from "lucide-react";
import { FamilyLinks, IndustryLinks, ValidationNote } from "@/components/catalog/cards";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { applications, getApplication } from "@/data/catalog";

type ApplicationBackground = {
  src: string;
  position: string;
};

const APPLICATION_BACKGROUNDS: Record<string, ApplicationBackground> = {
  "thermal-insulation": {
    src: "https://images.unsplash.com/photo-1768321917437-1f1f6ae2ad28?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 46%",
  },
  "spray-foam": {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 54%",
  },
  "flexible-moulded-foam": {
    src: "https://images.unsplash.com/photo-1653601983541-a70f6f1e715b?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 52%",
  },
  "automotive-seating": {
    src: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 55%",
  },
  "furniture-bedding": {
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 58%",
  },
  "adhesives-coatings": {
    src: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 48%",
  },
  "construction-systems": {
    src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 48%",
  },
  "custom-formulation": {
    src: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&fm=jpg&q=86&w=2400",
    position: "center 50%",
  },
};

const thermalUseCases = [
  "Roofs, walls and building envelopes",
  "Cold rooms and temperature-controlled spaces",
  "Industrial tanks, vessels and pipelines",
  "Warehouses, sheds and commercial facilities",
  "Sandwich panels and prefabricated systems",
  "Retrofit insulation and energy-upgrade projects",
];

const thermalRequirements = [
  "Thermal efficiency and continuity",
  "Substrate adhesion and compatibility",
  "Moisture and condensation resistance",
  "Dimensional stability over service life",
  "Reliable on-site processing",
  "Durability under operating conditions",
];

const thermalWorkflow = [
  ["01", "Requirement review", "Define the structure, target performance, environment and installation constraints."],
  ["02", "Substrate assessment", "Review the surface type, preparation method, geometry and access conditions."],
  ["03", "Chemistry pathway", "Shortlist suitable polyurethane system and MDI family routes for technical review."],
  ["04", "Validation", "Confirm processing, sample, documentation and project-specific approval requirements."],
];

export function generateStaticParams() {
  return applications.map((application) => ({ application: application.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ application: string }> }) {
  const { application } = await params;
  const item = getApplication(application);
  return { title: item ? `${item.name} Application` : "Application" };
}

export default async function Page({ params }: { params: Promise<{ application: string }> }) {
  const { application } = await params;
  const item = getApplication(application);
  if (!item) notFound();

  const background = APPLICATION_BACKGROUNDS[item.slug];
  const isThermalInsulation = item.slug === "thermal-insulation";

  return (
    <div className="bg-white">
      <div className="relative isolate min-h-[680px] overflow-hidden">
        {background ? (
          <div
            aria-hidden="true"
            className="application-hero-bg absolute inset-0 -z-30 scale-[1.03] bg-cover"
            style={{
              backgroundImage: `url(${background.src})`,
              backgroundPosition: background.position,
            }}
          />
        ) : null}
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-gradient-to-r from-slate-950/75 via-slate-950/35 to-slate-950/10" />

        <Container className="relative z-10 py-16 sm:py-20">
          <div className="transparent-media-copy max-w-4xl">
            <SectionLabel>Catalog intelligence</SectionLabel>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">{item.name}</h1>
            <p className="mt-4 max-w-3xl text-slate-300">{item.summary}</p>
          </div>

          <div className="transparent-media-copy mt-6"><ValidationNote /></div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`/consultant?context=${encodeURIComponent(`Application review: ${item.name}`)}`}>Discuss this application</ButtonLink>
            <ButtonLink href="/innovation-rd" variant="secondary">Innovation & R&amp;D route</ButtonLink>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <section className="transparent-media-copy rounded-[var(--radius-lg)] border border-white/70 bg-slate-950/10 p-5 shadow-[var(--shadow-soft)] backdrop-blur-[2px]">
              <h2 className="font-semibold">Common inputs</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-300">{item.needs.map((need) => <li key={need}>• {need}</li>)}</ul>
            </section>
            <section className="transparent-media-copy rounded-[var(--radius-lg)] border border-white/70 bg-slate-950/10 p-5 shadow-[var(--shadow-soft)] backdrop-blur-[2px] md:col-span-2">
              {item.familySlugs.length > 0 ? (<>
                <h2 className="font-semibold">Relevant families</h2>
                <div className="mt-3"><FamilyLinks slugs={item.familySlugs} /></div>
              </>) : null}
              {item.industrySlugs.length > 0 ? (<>
                <h2 className="mt-6 font-semibold">Related industries</h2>
                <div className="mt-3"><IndustryLinks slugs={item.industrySlugs} /></div>
              </>) : null}
            </section>
          </div>
        </Container>
      </div>

      {isThermalInsulation ? (
        <>
          <section className="border-b border-slate-200 bg-white py-16 sm:py-20">
            <Container>
              <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <SectionLabel>Application scope</SectionLabel>
                  <h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">Where thermal insulation systems are evaluated</h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                    Urechem routes thermal-insulation enquiries through a structured review of the building or equipment, substrate, climate, installation method and performance target before a system pathway is shortlisted.
                  </p>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    {thermalUseCases.map((useCase) => (
                      <div className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md" key={useCase}>
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 transition group-hover:scale-110" />
                        <span className="text-sm font-semibold leading-6 text-slate-700">{useCase}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 shadow-[0_24px_70px_rgba(15,23,42,0.16)]">
                  <img
                    alt="Industrial insulation installed around process equipment and pipelines"
                    className="h-[28rem] w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                    src="https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&fm=jpg&q=85&w=1600"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 to-transparent p-6 pt-20 text-white">
                    <p className="text-sm font-bold uppercase tracking-[0.18em] text-cyan-300">Project context matters</p>
                    <p className="mt-2 max-w-md text-sm leading-6 text-white/85">Different substrates, climates and installation methods can require different system pathways and validation steps.</p>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          <section className="bg-slate-50 py-16 sm:py-20">
            <Container>
              <div className="mx-auto max-w-3xl text-center">
                <SectionLabel>Performance review</SectionLabel>
                <h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">Key requirements considered during selection</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">These factors help technical stakeholders assess whether a spray-applied, panel-based or custom formulation pathway is appropriate.</p>
              </div>
              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {thermalRequirements.map((requirement, index) => {
                  const icons = [ThermometerSun, Layers3, ShieldCheck, ClipboardCheck, CheckCircle2, FileText];
                  const Icon = icons[index];
                  return (
                    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl" key={requirement}>
                      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition duration-300 group-hover:bg-blue-700 group-hover:text-white">
                        <Icon className="h-6 w-6" />
                      </span>
                      <h3 className="mt-5 text-lg font-extrabold text-slate-950">{requirement}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">Reviewed against the project environment, processing conditions and required documentation before final recommendation.</p>
                    </article>
                  );
                })}
              </div>
            </Container>
          </section>

          <section className="bg-white py-16 sm:py-20">
            <Container>
              <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  <SectionLabel>Evaluation workflow</SectionLabel>
                  <h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">From requirement to validated pathway</h2>
                  <p className="mt-4 text-base leading-7 text-slate-600">The process is designed to reduce assumptions and gather the technical information required for a qualified review.</p>
                  <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50 p-6">
                    <h3 className="font-extrabold text-blue-950">Support available</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-700">Product-family guidance, application discussion, TDS/SDS coordination, sample planning and routing to Urechem technical stakeholders.</p>
                  </div>
                </div>
                <div className="grid gap-4">
                  {thermalWorkflow.map(([number, title, description]) => (
                    <article className="group flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 transition duration-300 hover:translate-x-1 hover:border-blue-200 hover:shadow-lg" key={number}>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-black text-white transition group-hover:bg-blue-700">{number}</span>
                      <div>
                        <h3 className="text-lg font-extrabold text-slate-950">{title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </Container>
          </section>

          <section className="border-t border-slate-200 bg-slate-950 py-14 text-white">
            <Container className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Thermal insulation enquiry</p>
                <h2 className="mt-3 text-2xl font-black sm:text-3xl">Bring your substrate, environment and performance target.</h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">Urechem can help route the requirement toward the most relevant system family and technical review process.</p>
              </div>
              <ButtonLink href="/consultant?context=Thermal%20insulation%20project%20review">Start a technical discussion</ButtonLink>
            </Container>
          </section>
        </>
      ) : null}

      <style>{`
        @keyframes application-hero-drift {
          0%, 100% { transform: scale(1.03) translate3d(0, 0, 0); }
          50% { transform: scale(1.07) translate3d(-0.6%, -0.4%, 0); }
        }
        .application-hero-bg { animation: application-hero-drift 18s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .application-hero-bg { animation: none; }
        }
      `}</style>
    </div>
  );
}
