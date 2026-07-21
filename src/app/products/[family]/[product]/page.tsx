import { notFound } from "next/navigation";
import { AppLinks, DocumentStatus, ValidationNote } from "@/components/catalog/cards";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
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
    <Container className="py-16 sm:py-20">
      <SectionLabel>{productFamily.name}</SectionLabel>
      <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">{item.name}</h1>
      <p className="mt-4 max-w-3xl text-slate-300">{item.description}</p>
      <div className="mt-6"><ValidationNote /></div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href="/contact">Request product review</ButtonLink>
        <ButtonLink href="/products/compare" variant="secondary">Add to comparison workflow</ButtonLink>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <DocumentStatus />
        <div className="rounded-lg border border-white/10 bg-navy-900 p-4">
          <h2 className="font-semibold">Application review context</h2>
          <div className="mt-3"><AppLinks slugs={item.applications.length ? item.applications : productFamily.applications} /></div>
          <p className="mt-4 text-sm text-slate-400">Performance data and application suitability are reviewed for each enquiry.</p>
        </div>
      </div>
    </Container>
  );
}
