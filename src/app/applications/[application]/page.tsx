import { notFound } from "next/navigation";
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

  return (
    <div className="relative isolate min-h-[680px] overflow-hidden">
      {background ? (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-30 bg-cover"
            style={{
              backgroundImage: `url(${background.src})`,
              backgroundPosition: background.position,
            }}
          />
        </>
      ) : null}

      <Container className="relative z-10 py-16 sm:py-20">
        <div className="transparent-media-copy max-w-4xl">
          <SectionLabel>Catalog intelligence</SectionLabel>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">{item.name}</h1>
          <p className="mt-4 max-w-3xl text-slate-300">{item.summary}</p>
        </div>

        <div className="transparent-media-copy mt-6"><ValidationNote /></div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/consultant?context=${encodeURIComponent(`Application review: ${item.name}`)}`}>Discuss this application</ButtonLink>
          <ButtonLink href="/innovation-rd" variant="secondary">Innovation & R&D route</ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <section
            className="transparent-media-copy rounded-[var(--radius-lg)] border border-white/70 bg-transparent p-5 shadow-[var(--shadow-soft)]"
          >
            <h2 className="font-semibold">Common inputs</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">{item.needs.map((need) => <li key={need}>• {need}</li>)}</ul>
          </section>
          <section
            className="transparent-media-copy rounded-[var(--radius-lg)] border border-white/70 bg-transparent p-5 shadow-[var(--shadow-soft)] md:col-span-2"
          >
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
