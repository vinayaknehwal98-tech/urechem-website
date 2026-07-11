import Link from "next/link";
import { AppTags, FamilyTags } from "@/components/catalog/cards";
import { Container } from "@/components/ui/container";
import { industries } from "@/data/catalog";

export const metadata = { title: "Industries | Urechem Chemicals" };

export default function Page() {
  return (
    <Container className="py-16">
      <h1 className="text-4xl font-semibold">Industry pathways</h1>
      <p className="mt-4 max-w-3xl text-slate-300">Navigate by operational context and connect to applications commonly evaluated by similar teams.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {industries.map((industry) => (
          <Link key={industry.slug} href={`/industries/${industry.slug}`} className="rounded-lg border border-white/10 bg-white/[0.04] p-5 hover:border-cyan-300">
            <h2 className="text-xl font-semibold">{industry.name}</h2>
            <p className="mt-2 text-sm text-slate-300">{industry.summary}</p>
            <div className="mt-4"><AppTags slugs={industry.applicationSlugs} /></div>
            <div className="mt-3"><FamilyTags slugs={industry.familySlugs} /></div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
