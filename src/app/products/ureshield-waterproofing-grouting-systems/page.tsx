import { ArrowRight, CheckCircle2, Droplets, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { ureshieldProducts, ureshieldReferenceNote } from "@/data/ureshield";

export const metadata = {
  title: "UreShield Waterproofing, Grouting & Polyurea Systems | Urechem Chemicals",
  description:
    "Explore UreShield polyurethane membranes, injection grouts and polyurea coatings for waterproofing, consolidation, water control and surface protection.",
};

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-cyan-200/15 bg-[linear-gradient(135deg,#04111f,#0b2840_58%,#0b4a6f)] py-18 sm:py-24">
        <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] [background-size:24px_24px]" />
        <Container className="relative z-10">
          <SectionLabel>Urechem Chemicals</SectionLabel>
          <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.42fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-balance text-5xl font-black leading-[0.98] text-white sm:text-6xl lg:text-7xl">
                UreShield waterproofing, grouting and polyurea systems
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                Polyurethane membranes, injection-grouting systems and polyurea coatings for waterproofing, structural consolidation, void filling, water control and durable surface protection.
              </p>
            </div>
            <div className="rounded-[var(--radius-lg)] border border-cyan-200/20 bg-white/7 p-5 backdrop-blur-sm">
              <ShieldCheck aria-hidden="true" className="h-7 w-7 text-cyan-200" />
              <p className="mt-4 text-sm leading-6 text-slate-200">{ureshieldReferenceNote}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fbff,#eaf4ff)] py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {ureshieldProducts.map((product) => (
              <article className="overflow-hidden rounded-[var(--radius-lg)] border border-blue-200 bg-white shadow-[0_18px_55px_rgba(30,64,175,0.09)]" key={product.slug}>
                <div className="border-b border-blue-100 bg-blue-50 p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <Droplets aria-hidden="true" className="h-7 w-7 text-blue-700" />
                    <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.13em] text-blue-800">
                      {product.category}
                    </span>
                  </div>
                  <h2 className="mt-5 text-2xl font-black text-blue-950 sm:text-3xl">{product.name}</h2>
                  <p className="mt-3 leading-7 text-slate-700">{product.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.features.map((feature) => (
                      <span className="rounded-full bg-blue-950 px-3 py-1.5 text-xs font-bold text-white" key={feature}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-7 p-6 sm:p-7 md:grid-cols-2">
                  <div>
                    <h3 className="font-black text-blue-950">Benefits</h3>
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
                    <h3 className="font-black text-blue-950">Applications</h3>
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
              <h2 className="mt-2 text-2xl font-black text-blue-950">Discuss the substrate, water pressure, installation method and required performance.</h2>
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
