import { ArrowRight, ShieldCheck } from "lucide-react";
import { ProductFinder } from "@/components/catalog/product-finder";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = { title: "Products | Urechem Chemicals" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Product catalog</SectionLabel>
      <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Structured product-family discovery</h1>
      <p className="mt-4 max-w-3xl text-slate-300">Browse confirmed Urechem product names and families with clear boundaries around specifications, documents and suitability claims.</p>

      <article className="mt-10 grid gap-6 overflow-hidden rounded-[var(--radius-lg)] border border-cyan-200/20 bg-[linear-gradient(135deg,rgba(37,99,235,0.2),rgba(34,211,238,0.08),rgba(255,255,255,0.04))] p-6 shadow-[var(--shadow-soft)] sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <ShieldCheck aria-hidden="true" className="h-7 w-7 text-cyan-200" />
          <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-cyan-100">New product-family pathway</p>
          <h2 className="mt-2 text-3xl font-black text-white">UreShield waterproofing and grouting systems</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-300">Explore PU membranes and injection-grouting products for waterproofing, consolidation, void filling and water-control enquiries.</p>
        </div>
        <ButtonLink href="/products/ureshield-waterproofing-grouting-systems" size="lg">
          Explore UreShield
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </ButtonLink>
      </article>

      <div className="mt-10"><ProductFinder /></div>
    </Container>
  );
}
