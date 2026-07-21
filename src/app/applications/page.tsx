import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { FamilyTags } from "@/components/catalog/cards";
import { applications } from "@/data/catalog";

export const metadata = { title: "Applications | Urechem Chemicals" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Catalog intelligence</SectionLabel>
      <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Application-led discovery</h1>
      <p className="mt-4 max-w-3xl text-slate-300">Start from the manufacturing or performance problem, then escalate to expert validation.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {applications.map((application) => (
          <Link key={application.slug} href={`/applications/${application.slug}`} className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/70 hover:bg-cyan-300/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">
            <h2 className="text-xl font-semibold">{application.name}</h2>
            <p className="mt-2 text-sm text-slate-300">{application.summary}</p>
            <div className="mt-4"><FamilyTags slugs={application.familySlugs} /></div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
