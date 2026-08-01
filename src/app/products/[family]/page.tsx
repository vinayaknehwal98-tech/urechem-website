import Link from "next/link";
import { notFound } from "next/navigation";
import { AppLinks, DocumentStatus, ValidationNote } from "@/components/catalog/cards";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getFamily, productFamilies, relatedFamilies } from "@/data/catalog";
import { getProductBackground } from "@/data/product-backgrounds";

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

  const background = getProductBackground(productFamily.slug);

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
            <SectionLabel>{productFamily.shortName}</SectionLabel>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-black leading-[0.96] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
              {productFamily.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">{productFamily.description}</p>

            <div className="mt-6 max-w-3xl rounded-2xl border border-white/70 bg-transparent p-4 shadow-[0_14px_40px_rgba(2,18,36,0.16)]">
              <ValidationNote />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={`/consultant?product=${encodeURIComponent(productFamily.name)}`}>
                Start a technical enquiry
              </ButtonLink>
              <ButtonLink href="/products/compare" variant="secondary">
                Compare products
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fbff,#eaf4ff)] py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <SectionLabel>Available pathways</SectionLabel>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-blue-950 sm:text-5xl">
              Product identifiers within the {productFamily.shortName} range
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">{productFamily.positioning}</p>
          </div>

          <section className="mt-10 grid gap-5 md:grid-cols-2">
            {productFamily.products.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${productFamily.slug}/${product.slug}`}
                className="group rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.08)] transition duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-[0_24px_70px_rgba(30,64,175,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
              >
                <h3 className="text-xl font-black text-blue-950">{product.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{product.description}</p>
                <span className="mt-5 inline-flex text-sm font-black text-blue-700 transition group-hover:translate-x-1">
                  View product →
                </span>
              </Link>
            ))}
          </section>

          <section className="mt-10 grid gap-6 md:grid-cols-2">
            <DocumentStatus />
            <div className="rounded-[var(--radius-lg)] border border-blue-200 bg-white p-5 shadow-[0_18px_55px_rgba(30,64,175,0.08)]">
              <h3 className="font-black text-blue-950">Relevant applications</h3>
              <div className="mt-3"><AppLinks slugs={productFamily.applications} /></div>
            </div>
          </section>

          <h2 className="mt-12 text-2xl font-black text-blue-950">Related families</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {relatedFamilies(productFamily.slug).map((related) => (
              <Link
                className="rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-bold text-blue-800 transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50"
                key={related.slug}
                href={`/products/${related.slug}`}
              >
                {related.name}
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
