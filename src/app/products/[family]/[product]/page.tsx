import { notFound } from "next/navigation";
import { AppLinks, DocumentStatus, ValidationNote } from "@/components/catalog/cards";
import { Container } from "@/components/ui/container";
import { getFamily, getProduct, productFamilies } from "@/data/catalog";

export function generateStaticParams() {
  return productFamilies.flatMap((family) => family.products.map((product) => ({ family: family.slug, product: product.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ family: string; product: string }> }) {
  const { family, product } = await params;
  const item = getProduct(family, product);
  return { title: item ? `${item.name} | Urechem Products` : "Product | Urechem Products" };
}

export default async function Page({ params }: { params: Promise<{ family: string; product: string }> }) {
  const { family, product } = await params;
  const item = getProduct(family, product);
  const productFamily = getFamily(family);
  if (!item || !productFamily) notFound();

  return (
    <Container className="py-16">
      <p className="font-mono text-sm uppercase tracking-[0.25em] text-cyan-300">{productFamily.name}</p>
      <h1 className="mt-4 text-4xl font-semibold">{item.name}</h1>
      <p className="mt-4 max-w-3xl text-slate-300">{item.description}</p>
      <div className="mt-6"><ValidationNote /></div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <DocumentStatus />
        <div className="rounded-lg border border-white/10 bg-navy-900 p-4">
          <h2 className="font-semibold">Application review context</h2>
          <div className="mt-3"><AppLinks slugs={item.applications.length ? item.applications : productFamily.applications} /></div>
          <p className="mt-4 text-sm text-slate-400">Additional technical properties require qualified Urechem review before publication or use in product selection.</p>
        </div>
      </div>
    </Container>
  );
}
