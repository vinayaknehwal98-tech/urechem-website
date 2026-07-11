import { notFound } from "next/navigation";
import { FamilyLinks, IndustryLinks, ValidationNote } from "@/components/catalog/cards";
import { Container } from "@/components/ui/container";
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
    <Container className="py-16">
      <h1 className="text-4xl font-semibold">{item.name}</h1>
      <p className="mt-4 max-w-3xl text-slate-300">{item.summary}</p>
      <div className="mt-6"><ValidationNote /></div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <section className="rounded-lg border border-white/10 p-5">
          <h2 className="font-semibold">Common inputs</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">{item.needs.map((need) => <li key={need}>• {need}</li>)}</ul>
        </section>
        <section className="rounded-lg border border-white/10 p-5 md:col-span-2">
          <h2 className="font-semibold">Relevant families</h2>
          <div className="mt-3"><FamilyLinks slugs={item.familySlugs} /></div>
          <h2 className="mt-6 font-semibold">Related industries</h2>
          <div className="mt-3"><IndustryLinks slugs={item.industrySlugs} /></div>
        </section>
      </div>
    </Container>
  );
}
