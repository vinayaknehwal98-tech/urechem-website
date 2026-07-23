import Link from "next/link";
import { notFound } from "next/navigation";
import { AppLinks, DocumentStatus, ValidationNote } from "@/components/catalog/cards";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getFamily, productFamilies, relatedFamilies } from "@/data/catalog";

export function generateStaticParams() {
  return productFamilies.map((family) => ({ family: family.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ family: string }> }) {
  const { family } = await params;
  const productFamily = getFamily(family);
  return { title: productFamily ? productFamily.name : "Product Family" };
}

export default async function Page({ params }: { params: Promise<{ family: string }> }) {
  const { family } = await params;
  const productFamily = getFamily(family);
  if (!productFamily) notFound();

  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>{productFamily.shortName}</SectionLabel>
      <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">{productFamily.name}</h1>
      <p className="mt-4 max-w-3xl text-slate-300">{productFamily.description}</p>
      <div className="mt-6"><ValidationNote /></div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <ButtonLink href={`/contact?type=Consultation%20request&product=${encodeURIComponent(productFamily.name)}`}>Start a technical enquiry</ButtonLink>
        <ButtonLink href="/products/compare" variant="secondary">Compare products</ButtonLink>
      </div>
      <section className="mt-10 grid gap-4 md:grid-cols-2">
        {productFamily.products.map((product) => (
          <Link key={product.slug} href={`/products/${productFamily.slug}/${product.slug}`} className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-0.5 hover:border-cyan-300/70 hover:bg-cyan-300/8 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p className="mt-2 text-sm text-slate-300">{product.description}</p>
          </Link>
        ))}
      </section>
      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <DocumentStatus />
        <div className="rounded-lg border border-white/10 bg-navy-900 p-4"><h3 className="font-semibold">Relevant applications</h3><div className="mt-3"><AppLinks slugs={productFamily.applications} /></div></div>
      </section>
      <h2 className="mt-12 text-2xl font-semibold">Related families</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {relatedFamilies(productFamily.slug).map((related) => <Link className="rounded-md border border-white/10 px-4 py-2 text-cyan-100" key={related.slug} href={`/products/${related.slug}`}>{related.name}</Link>)}
      </div>
    </Container>
  );
}
