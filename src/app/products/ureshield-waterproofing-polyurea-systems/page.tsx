import { ArrowRight, CheckCircle2, Droplets, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { ureshieldProducts, ureshieldReferenceNote } from "@/data/ureshield";
import { getProductBackground } from "@/data/product-backgrounds";

const REMOVED_URESHIELD_PRODUCTS = new Set([
  "UreShield DrucPietra",
  "UreShield Druc Pietra V.SF 1",
  "UreShield DrucHyd 2C",
]);

export const metadata = {
  title: "UreShield Waterproofing & Polyurea Systems",
  description:
    "Explore UreShield polyurethane membranes and polyurea coatings for waterproofing and durable surface protection.",
};

export default function Page() {
  const visibleProducts = ureshieldProducts.filter(
    (product) => !REMOVED_URESHIELD_PRODUCTS.has(product.name),
  );
  const background = getProductBackground("ureshield-waterproofing-polyurea-systems");

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
              "linear-gradient(90deg,rgba(248,251,255,0.98) 0%,rgba(248,251,255,0.93) 38%,rgba(239,246,255,0.70) 62%,rgba(3,20,38,0.38) 82%,rgba(3,20,38,0.56) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(circle at 78% 36%,rgba(14,165,233,0.22),transparent 27rem),radial-gradient(circle at 15% 86%,rgba(37,99,235,0.11),transparent 24rem)",
          }}
        />

        <Container className="relative w-full">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center xl:gap-16">
            <div>
              <SectionLabel>Urechem Chemicals</SectionLabel>
              <h1 className="mt-6 max-w-5xl text-balance text-5xl font-black leading-[0.96] tracking-[-0.05em] text-slate-950 sm:text-6xl lg:text-7xl">
                UreShield waterproofing and polyurea systems
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-700">
                Polyurethane membranes and polyurea coatings for waterproofing and durable surface protection across construction and industrial applications.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact?type=Consultation%20request&product=UreShield" size="lg">
                  Discuss a UreShield requirement
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/products/compare" size="lg" variant="secondary">
                  Compare systems
                </ButtonLink>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/45 bg-white/72 p-6 shadow-[0_28px_90px_rgba(2,18,36,0.24)] backdrop-blur-md sm:p-8">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-700 shadow-lg">
                <ShieldCheck aria-hidden="true" className="h-7 w-7 text-white" />
              </span>
              <p className="mt-5 text-sm font-black uppercase tracking-[0.16em] text-blue-700">Reference boundary</p>
              <p className="mt-3 leading-7 text-slate-700">{ureshieldReferenceNote}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fbff,#eaf4ff)] py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <SectionLabel>UreShield range</SectionLabel>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-blue-950 sm:text-5xl">
              Waterproofing membranes and polyurea protection systems
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2" data-catalog="waterproofing-polyurea-only">
            {visibleProducts.map((product) => (
              <article className="overflow-hidden rounded-[var(--radius-lg)] border border-blue-200 bg-white shadow-[0_18px_55px_rgba(30,64,175,0.09)]" key={product.slug}>
                <div className="border-b border-blue-100 bg-blue-50 p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <Droplets aria-hidden="true" className="h-7 w-7 text-blue-700" />
                    <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.13em] text-blue-800">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-blue-950 sm:text-3xl">{product.name}</h3>
                  <p className="mt-3 leading-7 text-slate-700">{product.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.features.map((feature) => (
                      <span className="rounded-full bg-blue-950 px-3 py-1.5 text-xs font-bold text-white" key={feature}>
                        {feature}
                      </span>
                    ))}
                  </div>
                  <ButtonLink className="mt-6" href={`/contact?type=TDS%20request&product=${encodeURIComponent(product.name)}`} size="sm">
                    Ask for TDS
                    <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </ButtonLink>
                </div>

                <div className="grid gap-7 p-6 sm:p-7 md:grid-cols-2">
                  <div>
                    <h4 className="font-black text-blue-950">Benefits</h4>
                    <ul className="mt-4 grid gap-3">
                      {product.benefits.map((benefit) => (
                        <li className="flex gap-3 text-sm leading-6 text-slate-700" key={benefit}>
                          <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-black text-blue-950">Applications</h4>
                    <ul className="mt-4 grid gap-3">
                      {product.applications.map((application) => (
                        <li className="flex gap-3 text-sm leading-6 text-slate-700" key={application}>
                          <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
                          {application}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.08)] sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Technical validation required</p>
              <h2 className="mt-2 text-2xl font-black text-blue-950">Discuss the substrate, exposure, installation method and required performance.</h2>
            </div>
            <ButtonLink className="mt-5 sm:mt-0" href="/contact?type=Consultation%20request" size="lg">
              Talk to a consultant
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
