import { ProductComparison } from "@/components/catalog/product-comparison";
import { ValidationNote } from "@/components/catalog/cards";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = { title: "Product Comparison | Urechem Chemicals" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Catalog intelligence</SectionLabel>
      <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Product comparison</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
        Build a focused comparison of up to three catalog identifiers and document-publication status. This workflow does not approve suitability.
      </p>
      <div className="mt-6"><ValidationNote /></div>
      <ProductComparison />
    </Container>
  );
}
