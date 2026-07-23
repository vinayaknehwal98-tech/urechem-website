import { notFound } from "next/navigation";
import { AppLinks, FamilyLinks, ValidationNote } from "@/components/catalog/cards";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getIndustry, industries } from "@/data/catalog";

export function generateStaticParams() {
  return industries.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const item = getIndustry(industry);
  return { title: item ? `${item.name} Industry` : "Industry" };
}

export default async function Page({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const item = getIndustry(industry);
  if (!item) notFound();

  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Catalog intelligence</SectionLabel>
      <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">{item.name}</h1>
      <p className="mt-4 max-w-3xl text-slate-300">{item.summary}</p>
      <div className="mt-6"><ValidationNote /></div>
      <div className="mt-8">
        <ButtonLink href={`/contact?type=Consultation%20request&context=${encodeURIComponent(`Industry review: ${item.name}`)}`}>
          Discuss this industry pathway
        </ButtonLink>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <section className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.035] p-5 shadow-[var(--shadow-soft)]">
          <h2 className="font-semibold">Common needs</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">{item.needs.map((need) => <li key={need}>• {need}</li>)}</ul>
        </section>
        <section className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.035] p-5 shadow-[var(--shadow-soft)] md:col-span-2">
          {item.applicationSlugs.length > 0 ? (<>
            <h2 className="font-semibold">Applications</h2>
            <div className="mt-3"><AppLinks slugs={item.applicationSlugs} /></div>
          </>) : null}
          {item.familySlugs.length > 0 ? (<>
            <h2 className="mt-6 font-semibold">Commonly evaluated families</h2>
            <div className="mt-3"><FamilyLinks slugs={item.familySlugs} /></div>
          </>) : null}
        </section>
      </div>
    </Container>
  );
}
