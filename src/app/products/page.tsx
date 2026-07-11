import { ProductFinder } from "@/components/catalog/product-finder";
import { Container } from "@/components/ui/container";

export const metadata = { title: "Products | Urechem Chemicals" };

export default function Page() {
  return (
    <Container className="py-16">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">Product catalog</p>
      <h1 className="mt-4 text-4xl font-semibold">Structured product-family discovery</h1>
      <p className="mt-4 max-w-3xl text-slate-300">Browse confirmed Urechem product names and families with clear boundaries around specifications, documents and suitability claims.</p>
      <div className="mt-10"><ProductFinder /></div>
    </Container>
  );
}
