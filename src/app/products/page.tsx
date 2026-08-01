import { ArrowRight, ShieldCheck } from "lucide-react";
import { ProductFinder } from "@/components/catalog/product-finder";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getProductBackground } from "@/data/product-backgrounds";

export const metadata = { title: "Products" };

export default function Page() {
  const background = getProductBackground("catalog");

  return (
    <>
      <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden border-b border-blue-100 py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 bg-cover"
          style={{
            backgroundImage: `url(${background.src})`,
            backgroundPosition: background.position,
          }}
        />
        <Container className="relative w-full">
          <div className="transparent-media-copy max-w-4xl">
            <SectionLabel>Product catalog</SectionLabel>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-black leading-[0.96] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
              Structured product-family discovery
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
              Browse the combined Urechem product range with clear boundaries around specifications, documents and application suitability.
            </p>

            <article className="mt-7 max-w-3xl rounded-2xl border border-white/70 bg-transparent p-5 shadow-[0_16px_45px_rgba(2,18,36,0.16)] sm:p-6">
              <ShieldCheck aria-hidden="true" className="h-7 w-7 text-blue-700" />
              <p className="mt-4 text-sm font-black uppercase tracking-[0.16em] text-blue-700">Combined technical range</p>
              <h2 className="mt-2 text-2xl font-black text-blue-950 sm:text-3xl">Explore the complete Urechem product universe</h2>
              <p className="mt-3 leading-7 text-slate-700">
                Review spray foam, MDI, polyols, PPG, flexible systems, PU membranes, polyurea, TPU and formulation-support pathways compiled from the full supplied reference set.
              </p>
            </article>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/products/complete-range" size="lg">
                View complete range
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/products/ureshield-waterproofing-polyurea-systems" size="lg" variant="secondary">
                Explore UreShield
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fbff,#eaf4ff)] py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <SectionLabel>Find the right route</SectionLabel>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-blue-950 sm:text-5xl">
              Start with the application, performance target and document need
            </h2>
          </div>
          <div className="mt-10"><ProductFinder /></div>
        </Container>
      </section>
    </>
  );
}
