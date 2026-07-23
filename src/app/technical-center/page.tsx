import Link from "next/link";
import { Beaker, FileSearch, FileText, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

const items = [
  ["documents", "Document library", "Search products and prepare requests for current TDS, SDS, COA, compliance information or processing guides.", FileText],
  ["testing-validation", "Testing and validation", "Understand the information Urechem needs to plan sample evaluation, application trials and technical review.", Beaker],
  ["ai-document-search", "Assisted document search", "Use catalog-aware search to identify the relevant product and document request pathway.", FileSearch],
  ["expert-validation", "Expert validation", "Move preliminary guidance into a structured application and suitability review.", ShieldCheck],
] as const;

export const metadata = { title: "Technical Center" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Technical resources</SectionLabel>
      <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Technical Center</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">A controlled front door for document requests, validation workflows and safe assisted discovery.</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {items.map(([href, label, description, Icon]) => (
          <Link key={href} href={`/technical-center/${href}`} className="group rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-6 shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-cyan-300/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">
            <Icon aria-hidden="true" className="size-6 text-cyan-200" />
            <h2 className="mt-4 text-xl font-semibold">{label}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">{description}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
