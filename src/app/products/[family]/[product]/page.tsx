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
  return { title: item ? `${item.name} Product` : "Product" };
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
        <ButtonLink href={`/contact?type=TDS%20request&product=${encodeURIComponent(item.name)}`}>Ask for TDS</ButtonLink>
        <ButtonLink href={`/contact?type=Consultation%20request&product=${encodeURIComponent(item.name)}`} variant="secondary">Request product review</ButtonLink>
        <ButtonLink
          href={`/products/compare?product=${encodeURIComponent(`${item.familySlug}:${item.slug}`)}`}
          variant="secondary"
        >
          Add to comparison
        </ButtonLink>
      </div>
      {Object.keys(item.compareAttributes).length > 0 ? (
        <section className="mt-10 rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-5 shadow-[var(--shadow-soft)] sm:p-6">
          <h2 className="text-2xl font-semibold text-white">Reference profile</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
            Confirmed descriptors from the supplied product reference. Final processing guidance and suitability require technical review.
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            {Object.entries(item.compareAttributes).map(([label, value]) => (
              <div className="rounded-[var(--radius-md)] border border-white/10 bg-navy-900/72 p-4" key={label}>
                <dt className="text-sm font-semibold text-cyan-100">{label}</dt>
                <dd className="mt-2 text-sm leading-6 text-slate-300">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}
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
