import { notFound } from "next/navigation";
import { FamilyLinks, IndustryLinks, ValidationNote } from "@/components/catalog/cards";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { applications, getApplication } from "@/data/catalog";

const THERMAL_INSULATION_BACKGROUND =
  "https://images.unsplash.com/photo-1768321917437-1f1f6ae2ad28?auto=format&fit=crop&fm=jpg&q=86&w=2400";

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

  const hasThermalInsulationBackground = item.slug === "thermal-insulation";

  return (
    <div className="relative isolate overflow-hidden">
      {hasThermalInsulationBackground ? (
        <>
          <div
            aria-hidden="true"
            className="thermal-insulation-background-zoom absolute inset-0 -z-30 bg-cover bg-[center_44%] md:bg-[center_48%]"
            style={{ backgroundImage: `url(${THERMAL_INSULATION_BACKGROUND})` }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.93) 0%, rgba(255,255,255,0.78) 46%, rgba(255,255,255,0.52) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 82% 24%, rgba(14,165,233,0.16), transparent 28%), radial-gradient(circle at 18% 82%, rgba(37,99,235,0.12), transparent 30%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-20 h-72 bg-gradient-to-t from-white/90 via-white/50 to-transparent"
          />
        </>
      ) : null}

      <Container className="relative z-10 py-16 sm:py-20">
        <SectionLabel>Catalog intelligence</SectionLabel>
        <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">{item.name}</h1>
        <p className="mt-4 max-w-3xl text-slate-300">{item.summary}</p>
        <div className="mt-6"><ValidationNote /></div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/contact?type=Consultation%20request&context=${encodeURIComponent(`Application review: ${item.name}`)}`}>Discuss this application</ButtonLink>
          <ButtonLink href="/innovation-rd" variant="secondary">Innovation & R&D route</ButtonLink>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <section className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.035] p-5 shadow-[var(--shadow-soft)] backdrop-blur-sm">
            <h2 className="font-semibold">Common inputs</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">{item.needs.map((need) => <li key={need}>• {need}</li>)}</ul>
          </section>
          <section className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.035] p-5 shadow-[var(--shadow-soft)] backdrop-blur-sm md:col-span-2">
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
  );
}
