import { notFound } from "next/navigation";
import { FamilyLinks, IndustryLinks, ValidationNote } from "@/components/catalog/cards";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { applications, getApplication } from "@/data/catalog";

export function generateStaticParams() {
  return applications.map((application) => ({ application: application.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ application: string }> }) {
  const { application } = await params;
  const item = getApplication(application);
  return { title: item ? `${item.name} | Urechem Applications` : "Application | Urechem Chemicals" };
}

export default async function Page({ params }: { params: Promise<{ application: string }> }) {
  const { application } = await params;
  const item = getApplication(application);
  if (!item) notFound();

  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Catalog intelligence</SectionLabel>
      <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">{item.name}</h1>
      <p className="mt-4 max-w-3xl text-slate-300">{item.summary}</p>
      <div className="mt-6"><ValidationNote /></div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/contact">Discuss this application</ButtonLink>
        <ButtonLink href="/innovation-rd" variant="secondary">Innovation & R&D route</ButtonLink>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <section className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.035] p-5 shadow-[var(--shadow-soft)]">
          <h2 className="font-semibold">Common inputs</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">{item.needs.map((need) => <li key={need}>• {need}</li>)}</ul>
        </section>
        <section className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.035] p-5 shadow-[var(--shadow-soft)] md:col-span-2">
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
  );
}
