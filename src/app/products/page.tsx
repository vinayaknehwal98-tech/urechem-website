import { ProductFinder } from "@/components/catalog/product-finder";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = { title: "Products | Urechem Chemicals" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Product catalog</SectionLabel>
      <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Structured product-family discovery</h1>
      <p className="mt-4 max-w-3xl text-slate-300">Browse confirmed Urechem product names and families with clear boundaries around specifications, documents and suitability claims.</p>
      <div className="mt-10"><ProductFinder /></div>
    </Container>
  );
}
