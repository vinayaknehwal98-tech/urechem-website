import Link from "next/link";
import { AppTags, FamilyTags } from "@/components/catalog/cards";
import { AnimatedImage } from "@/components/media/animated-image";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { industries } from "@/data/catalog";

export const metadata = { title: "Industries | Urechem Chemicals" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Catalog intelligence</SectionLabel>
      <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Industry pathways</h1>
      <p className="mt-4 max-w-3xl text-slate-300">Navigate by operational context and connect to applications commonly evaluated by similar teams.</p>
      <AnimatedImage
        alt="A modern industrial facility with insulated buildings, process infrastructure and organized logistics"
        className="mt-10 h-72 sm:h-80"
        imageClassName="object-center"
        sizes="100vw"
        src="/images/industrial-facility.webp"
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {industries.map((industry) => (
          <Link key={industry.slug} href={`/industries/${industry.slug}`} className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/70 hover:bg-cyan-300/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">
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
