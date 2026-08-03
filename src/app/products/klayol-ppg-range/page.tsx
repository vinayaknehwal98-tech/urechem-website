import Link from "next/link";
import { ArrowRight, CheckCircle2, Droplets, FlaskConical, Layers3 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { klayOlPpgOverview, klayOlPpgProducts } from "@/data/klayol-ppg";

export const metadata = {
  title: "KlayOl PPG Range",
  description:
    "Explore Urechem KlayOl polypropylene glycol grades for coatings, adhesives, sealants, elastomers and specialty polyurethane formulation pathways.",
};

export default function Page() {
  return (
    <main className="bg-white">
      <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden border-b border-blue-100 py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1709666414169-654f60926304?auto=format&fit=crop&fm=jpg&q=86&w=2400')",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(2,15,28,0.9)_0%,rgba(2,15,28,0.72)_50%,rgba(2,15,28,0.3)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_35%,rgba(34,211,238,0.2),transparent_34%)]"
        />

        <Container className="relative w-full">
          <div className="max-w-4xl rounded-[2rem] border border-white/20 bg-slate-950/55 p-6 shadow-[0_28px_90px_rgba(2,18,36,0.34)] backdrop-blur-[4px] sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/60 bg-white/95 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-800">
              <Droplets aria-hidden="true" className="h-4 w-4 text-sky-600" />
              Polypropylene glycol range
            </div>
            <h1 className="mt-6 max-w-4xl text-balance text-5xl font-black leading-[0.96] tracking-[-0.05em] !text-white sm:text-6xl lg:text-7xl">
              {klayOlPpgOverview.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 !text-slate-100">{klayOlPpgOverview.description}</p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {klayOlPpgOverview.strengths.map((strength) => (
                <div
                  className="flex gap-3 rounded-xl border border-white/15 bg-slate-950/45 px-4 py-3 text-sm font-semibold leading-6 !text-white"
                  key={strength}
                >
                  <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-cyan-300" />
                  <span>{strength}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="/consultant?product=KlayOl%20PPG%20range">
                Discuss a PPG requirement
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/products/compare" variant="secondary">
                Compare grades
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fbff,#eaf4ff)] py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <SectionLabel>PPG grades</SectionLabel>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] text-blue-950 sm:text-5xl">
              Five molecular-weight pathways from the supplied product references
            </h2>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-700">
              Select a grade to review its reference chemistry, molecular weight, applications and stated benefits. Final suitability, processing and documentation require Urechem technical confirmation.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {klayOlPpgProducts.map((product) => (
              <Link
                className="group overflow-hidden rounded-[var(--radius-lg)] border border-blue-200 bg-white shadow-[0_18px_55px_rgba(30,64,175,0.08)] transition duration-300 hover:-translate-y-1.5 hover:border-blue-400 hover:shadow-[0_26px_72px_rgba(30,64,175,0.16)]"
                href={`/products/klayol-ppg-range/${product.slug}`}
                key={product.slug}
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    alt={product.imageAlt}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    loading="lazy"
                    src={product.image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/72 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 rounded-full border border-white/30 bg-slate-950/65 px-3 py-1.5 text-xs font-black !text-white backdrop-blur-sm">
                    MW {product.molecularWeight}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-sky-700">
                    <FlaskConical aria-hidden="true" className="h-4 w-4" />
                    KlayOl PPG
                  </div>
                  <h3 className="mt-4 text-2xl font-black text-blue-950">{product.name}</h3>
                  <p className="mt-2 text-sm font-semibold text-blue-700">{product.chemistry}</p>
                  <p className="mt-4 text-sm leading-6 text-slate-700">{product.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">
                    View grade
                    <ArrowRight aria-hidden="true" className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <section className="rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.08)] sm:p-8">
              <Layers3 aria-hidden="true" className="h-7 w-7 text-blue-700" />
              <h2 className="mt-5 text-2xl font-black text-blue-950">Primary application routes</h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Coatings", "Adhesives", "Sealants", "Elastomers", "Specialty polyurethane formulations"].map(
                  (application) => (
                    <span
                      className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800"
                      key={application}
                    >
                      {application}
                    </span>
                  ),
                )}
              </div>
            </section>

            <section className="rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.08)] sm:p-8">
              <FlaskConical aria-hidden="true" className="h-7 w-7 text-blue-700" />
              <h2 className="mt-5 text-2xl font-black text-blue-950">Technical-selection note</h2>
              <p className="mt-4 text-sm leading-7 text-slate-700">
                Molecular weight alone does not establish final suitability. Share the target chemistry, viscosity, processing route, substrate, flexibility, adhesion, durability and documentation requirements for grade review.
              </p>
              <ButtonLink className="mt-6" href="/contact?type=TDS%20request&product=KlayOl%20PPG%20range" variant="secondary">
                Ask for PPG documents
              </ButtonLink>
            </section>
          </div>
        </Container>
      </section>
    </main>
  );
}
