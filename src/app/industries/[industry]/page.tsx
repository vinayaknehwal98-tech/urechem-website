import { notFound } from "next/navigation";
import { AppLinks, FamilyLinks, ValidationNote } from "@/components/catalog/cards";
import { Container } from "@/components/ui/container";
import { getIndustry, industries } from "@/data/catalog";

export function generateStaticParams() {
  return industries.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const item = getIndustry(industry);
  return { title: item ? `${item.name} | Urechem Industries` : "Industry | Urechem Chemicals" };
}

export default async function Page({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const item = getIndustry(industry);
  if (!item) notFound();

  return (
    <Container className="py-16">
      <h1 className="text-4xl font-semibold">{item.name}</h1>
      <p className="mt-4 max-w-3xl text-slate-300">{item.summary}</p>
      <div className="mt-6"><ValidationNote /></div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <section className="rounded-lg border border-white/10 p-5">
          <h2 className="font-semibold">Common needs</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">{item.needs.map((need) => <li key={need}>• {need}</li>)}</ul>
        </section>
        <section className="rounded-lg border border-white/10 p-5 md:col-span-2">
          <h2 className="font-semibold">Applications</h2>
          <div className="mt-3"><AppLinks slugs={item.applicationSlugs} /></div>
          <h2 className="mt-6 font-semibold">Commonly evaluated families</h2>
          <div className="mt-3"><FamilyLinks slugs={item.familySlugs} /></div>
        </section>
      </div>
    </Container>
  );
}
