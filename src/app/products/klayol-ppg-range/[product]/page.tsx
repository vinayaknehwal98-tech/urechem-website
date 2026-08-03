import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Droplets, FlaskConical, Gauge, Layers3 } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getKlayOlPpgProduct, klayOlPpgProducts } from "@/data/klayol-ppg";

export function generateStaticParams() {
  return klayOlPpgProducts.map((product) => ({ product: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ product: string }> }) {
  const { product } = await params;
  const item = getKlayOlPpgProduct(product);
  return {
    title: item ? `KlayOl ${item.name}` : "KlayOl PPG Grade",
    description: item?.summary,
  };
}

export default async function Page({ params }: { params: Promise<{ product: string }> }) {
  const { product } = await params;
  const item = getKlayOlPpgProduct(product);
  if (!item) notFound();

  return (
    <main className="bg-white">
      <section className="relative isolate overflow-hidden border-b border-blue-100">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-30 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.image})` }}
        />
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-slate-950/78" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_78%_40%,rgba(34,211,238,0.22),transparent_34%)]"
        />

        <Container className="py-16 sm:py-20 lg:py-24">
          <div className="max-w-4xl rounded-[2rem] border border-white/20 bg-slate-950/58 p-6 shadow-[0_28px_90px_rgba(2,18,36,0.38)] backdrop-blur-[5px] sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-lg border border-cyan-200/60 bg-white/95 px-3 py-2 text-xs font-black uppercase tracking-[0.16em] text-blue-800">
              <Droplets aria-hidden="true" className="h-4 w-4 text-sky-600" />
              KlayOl PPG range
            </div>
            <h1 className="mt-6 text-5xl font-black tracking-[-0.05em] !text-white sm:text-6xl lg:text-7xl">{item.name}</h1>
            <p className="mt-4 text-lg font-semibold !text-cyan-200">{item.chemistry}</p>
            <p className="mt-5 max-w-3xl text-lg leading-8 !text-slate-100">{item.summary}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href={`/contact?type=TDS%20request&product=${encodeURIComponent(`KlayOl ${item.name}`)}`}>
                Ask for TDS
              </ButtonLink>
              <ButtonLink href={`/consultant?product=${encodeURIComponent(`KlayOl ${item.name}`)}`} variant="secondary">
                Request grade review
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fbff,#eaf4ff)] py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
            <section className="rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.08)] sm:p-8">
              <SectionLabel>Reference profile</SectionLabel>
              <dl className="mt-6 grid gap-4">
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <dt className="flex items-center gap-2 text-sm font-black text-blue-800">
                    <Gauge aria-hidden="true" className="h-4 w-4" />
                    Reference molecular weight
                  </dt>
                  <dd className="mt-2 text-3xl font-black text-blue-950">{item.molecularWeight}</dd>
                </div>
                <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <dt className="flex items-center gap-2 text-sm font-black text-blue-800">
                    <FlaskConical aria-hidden="true" className="h-4 w-4" />
                    Chemistry
                  </dt>
                  <dd className="mt-2 text-sm leading-6 text-slate-700">{item.chemistry}</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.08)] sm:p-8">
              <SectionLabel>Stated benefits</SectionLabel>
              <div className="mt-6 grid gap-3">
                {item.benefits.map((benefit) => (
                  <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50/70 p-4" key={benefit}>
                    <CheckCircle2 aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
                    <p className="text-sm font-semibold leading-6 text-slate-700">{benefit}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <section className="mt-6 rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.08)] sm:p-8">
            <div className="flex items-center gap-3">
              <Layers3 aria-hidden="true" className="h-6 w-6 text-blue-700" />
              <h2 className="text-2xl font-black text-blue-950">Application pathways</h2>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {item.applications.map((application) => (
                <span
                  className="rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800"
                  key={application}
                >
                  {application}
                </span>
              ))}
            </div>
            <p className="mt-6 max-w-4xl text-sm leading-7 text-slate-600">
              The supplied presentations provide reference positioning rather than a complete processing specification. Final grade suitability, viscosity, reactivity, dosage, compatibility and documentation must be confirmed through Urechem technical review.
            </p>
          </section>
        </Container>
      </section>
    </main>
  );
}
