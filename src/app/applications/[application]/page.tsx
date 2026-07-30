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
            className="application-background-motion absolute inset-0 -z-30 bg-cover"
            style={{
              backgroundImage: `url(${background.src})`,
              backgroundPosition: background.position,
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20"
            style={{
              background:
                "linear-gradient(90deg, rgba(255,255,255,0.94) 0%, rgba(255,255,255,0.82) 44%, rgba(245,250,255,0.58) 72%, rgba(238,247,255,0.46) 100%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 82% 22%, rgba(14,165,233,0.19), transparent 28%), radial-gradient(circle at 16% 84%, rgba(37,99,235,0.13), transparent 31%)",
            }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 -z-20 h-80 bg-gradient-to-t from-white/95 via-white/55 to-transparent"
          />
        </>
      ) : null}

      <Container className="relative z-10 py-16 sm:py-20">
        <div className="max-w-4xl">
          <SectionLabel>Catalog intelligence</SectionLabel>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">{item.name}</h1>
          <p className="mt-4 max-w-3xl text-slate-300">{item.summary}</p>
        </div>

        <div className="mt-6"><ValidationNote /></div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href={`/contact?type=Consultation%20request&context=${encodeURIComponent(`Application review: ${item.name}`)}`}>Discuss this application</ButtonLink>
          <ButtonLink href="/innovation-rd" variant="secondary">Innovation & R&D route</ButtonLink>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <section
            className="rounded-[var(--radius-lg)] border border-blue-200/70 p-5 shadow-[var(--shadow-soft)] backdrop-blur-md"
            style={{ background: "rgba(255,255,255,0.76)" }}
          >
            <h2 className="font-semibold">Common inputs</h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">{item.needs.map((need) => <li key={need}>• {need}</li>)}</ul>
          </section>
          <section
            className="rounded-[var(--radius-lg)] border border-blue-200/70 p-5 shadow-[var(--shadow-soft)] backdrop-blur-md md:col-span-2"
            style={{ background: "rgba(255,255,255,0.76)" }}
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
