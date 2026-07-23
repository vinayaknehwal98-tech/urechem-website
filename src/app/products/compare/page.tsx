import { Suspense } from "react";
import { ProductComparison } from "@/components/catalog/product-comparison";
import { ValidationNote } from "@/components/catalog/cards";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = { title: "Product Comparison" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Catalog intelligence</SectionLabel>
      <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Product comparison</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
        Compare confirmed product roles, chemistry profiles, reference densities, applications and documented benefits for up to three catalog identifiers.
      </p>
      <div className="mt-6"><ValidationNote /></div>
      <Suspense
        fallback={<div className="mt-10 min-h-96 animate-pulse rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04]" />}
      >
        <ProductComparison />
      </Suspense>
    </Container>
  );
}
