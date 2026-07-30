import { notFound } from "next/navigation";
import { AppLinks, DocumentStatus, ValidationNote } from "@/components/catalog/cards";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getFamily, getProduct, productFamilies } from "@/data/catalog";
import { getProductBackground } from "@/data/product-backgrounds";

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

  const background = getProductBackground(productFamily.slug);

  return (
    <>
      <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden border-b border-blue-100 py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="application-background-motion absolute inset-0 -z-30 bg-cover"
          style={{
            backgroundImage: `url(${background.src})`,
            backgroundPosition: background.position,
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20"
          style={{
            background:
              "linear-gradient(90deg,rgba(248,251,255,0.98) 0%,rgba(248,251,255,0.94) 40%,rgba(239,246,255,0.72) 66%,rgba(3,20,38,0.38) 84%,rgba(3,20,38,0.54) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 80% 34%,rgba(14,165,233,0.18),transparent 25rem),radial-gradient(circle at 15% 88%,rgba(37,99,235,0.10),transparent 24rem)",
          }}
        />

        <Container className="relative w-full">
          <div className="max-w-4xl">
            <SectionLabel>{productFamily.name}</SectionLabel>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-black leading-[0.96] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
              {item.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">{item.description}</p>

            <div className="mt-6 max-w-3xl rounded-2xl border border-blue-200/80 bg-white/78 p-4 shadow-[0_14px_40px_rgba(30,64,175,0.10)] backdrop-blur-md">
              <ValidationNote />
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={`/contact?type=TDS%20request&product=${encodeURIComponent(item.name)}`}>Ask for TDS</ButtonLink>
              <ButtonLink href={`/contact?type=Consultation%20request&product=${encodeURIComponent(item.name)}`} variant="secondary">
                Request product review
              </ButtonLink>
              <ButtonLink
                href={`/products/compare?product=${encodeURIComponent(`${item.familySlug}:${item.slug}`)}`}
                variant="secondary"
              >
                Add to comparison
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fbff,#eaf4ff)] py-16 sm:py-20">
        <Container>
          {Object.keys(item.compareAttributes).length > 0 ? (
            <section className="rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.08)] sm:p-8">
              <h2 className="text-3xl font-black text-blue-950">Reference profile</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600">
                Confirmed descriptors from the supplied product reference. Final processing guidance and suitability require technical review.
              </p>
              <dl className="mt-7 grid gap-4 sm:grid-cols-2">
                {Object.entries(item.compareAttributes).map(([label, value]) => (
                  <div className="rounded-[var(--radius-md)] border border-blue-100 bg-blue-50/70 p-4" key={label}>
                    <dt className="text-sm font-black text-blue-800">{label}</dt>
                    <dd className="mt-2 text-sm leading-6 text-slate-700">{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <DocumentStatus />
            <div className="rounded-[var(--radius-lg)] border border-blue-200 bg-white p-5 shadow-[0_18px_55px_rgba(30,64,175,0.08)]">
              <h2 className="font-black text-blue-950">Application review context</h2>
              <div className="mt-3"><AppLinks slugs={item.applications.length ? item.applications : productFamily.applications} /></div>
              <p className="mt-4 text-sm leading-6 text-slate-600">Performance data and application suitability are reviewed for each enquiry.</p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
