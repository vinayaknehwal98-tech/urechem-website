import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, FlaskConical, Layers3, ShieldCheck } from "lucide-react";
import { ValidationNote } from "@/components/catalog/cards";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getApplication, getFamily, getIndustry, industries } from "@/data/catalog";

export function generateStaticParams() {
  return industries.map((industry) => ({ industry: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const item = getIndustry(industry);
  return { title: item ? `${item.name} Industry` : "Industry" };
}

export default async function Page({ params }: { params: Promise<{ industry: string }> }) {
  const { industry } = await params;
  const item = getIndustry(industry);
  if (!item) notFound();

  const applications = item.applicationSlugs.map(getApplication).filter(Boolean);
  const families = item.familySlugs.map(getFamily).filter(Boolean);

  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Industry solution pathway</SectionLabel>
      <div className="mt-5 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <h1 className="max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">{item.name}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">{item.summary}</p>
        </div>
        <div className="rounded-[var(--radius-lg)] border border-blue-100 bg-white p-5 shadow-[var(--shadow-soft)]">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-700">What this page helps with</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Translate application requirements into relevant polyurethane product-family pathways before a detailed technical review.
          </p>
        </div>
      </div>

      <div className="mt-6"><ValidationNote /></div>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={`/consultant?context=${encodeURIComponent(`Industry review: ${item.name}`)}`}>
          Discuss this industry pathway
        </ButtonLink>
        <ButtonLink href="/products" variant="secondary">
          Explore product families
        </ButtonLink>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        <section className="rounded-[var(--radius-lg)] border border-blue-100 bg-white p-6 shadow-[var(--shadow-soft)]">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
          </div>
          <h2 className="mt-5 text-xl font-black text-slate-950">Typical project needs</h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            {item.needs.map((need) => (
              <li className="flex gap-3" key={need}>
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
                <span>{need}</span>
              </li>
            ))}
            <li className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
              <span>Performance targets and service conditions</span>
            </li>
            <li className="flex gap-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" aria-hidden="true" />
              <span>Processing, installation and validation constraints</span>
            </li>
          </ul>
        </section>

        <section className="rounded-[var(--radius-lg)] border border-blue-100 bg-white p-6 shadow-[var(--shadow-soft)] lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700">
              <Layers3 className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-700">Application map</p>
              <h2 className="text-xl font-black text-slate-950">Relevant application pathways</h2>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {applications.map((application) => application ? (
              <a
                className="group rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-lg"
                href={`/applications/${application.slug}`}
                key={application.slug}
              >
                <h3 className="font-black text-slate-950 group-hover:text-blue-800">{application.name}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{application.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-700">
                  Explore pathway <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </a>
            ) : null)}
          </div>
        </section>
      </div>

      <section className="mt-8 rounded-[var(--radius-lg)] border border-blue-100 bg-white p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
            <FlaskConical className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-700">Product-family routes</p>
            <h2 className="text-2xl font-black text-slate-950">Commonly evaluated families</h2>
          </div>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {families.map((family) => family ? (
            <a
              className="group rounded-xl border border-slate-200 p-5 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
              href={`/products/${family.slug}`}
              key={family.slug}
            >
              <p className="text-xs font-black uppercase tracking-[0.16em] text-blue-700">{family.shortName}</p>
              <h3 className="mt-2 text-lg font-black text-slate-950">{family.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{family.positioning}</p>
              <div className="mt-5 flex items-center justify-between border-t border-slate-200 pt-4 text-sm">
                <span className="font-semibold text-slate-500">{family.products.length} catalog product{family.products.length === 1 ? "" : "s"}</span>
                <ArrowRight className="h-4 w-4 text-blue-700 transition group-hover:translate-x-1" aria-hidden="true" />
              </div>
            </a>
          ) : null)}
        </div>
      </section>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <section className="rounded-[var(--radius-lg)] border border-blue-100 bg-white p-6 shadow-[var(--shadow-soft)]">
          <ShieldCheck className="h-6 w-6 text-blue-700" aria-hidden="true" />
          <h2 className="mt-4 font-black text-slate-950">Technical review inputs</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Share substrate, operating conditions, target properties, process method and expected production scale.</p>
        </section>
        <section className="rounded-[var(--radius-lg)] border border-blue-100 bg-white p-6 shadow-[var(--shadow-soft)]">
          <FlaskConical className="h-6 w-6 text-blue-700" aria-hidden="true" />
          <h2 className="mt-4 font-black text-slate-950">Evaluation workflow</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Requirement screening is followed by product-family selection, sample or trial discussion, and controlled validation.</p>
        </section>
        <section className="rounded-[var(--radius-lg)] border border-blue-100 bg-white p-6 shadow-[var(--shadow-soft)]">
          <FileText className="h-6 w-6 text-blue-700" aria-hidden="true" />
          <h2 className="mt-4 font-black text-slate-950">Documentation support</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">TDS, SDS, COA and other documents are reviewed for availability according to the selected product and project stage.</p>
        </section>
      </div>

      <section className="mt-8 rounded-[var(--radius-lg)] bg-blue-950 p-7 text-white shadow-[var(--shadow-deep)] sm:p-9">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Start with your requirement</p>
            <h2 className="mt-3 text-2xl font-black">Need a more specific recommendation for {item.name.toLowerCase()}?</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/75">Provide your application, target performance, processing method and current challenge so the enquiry can be routed to the right technical pathway.</p>
          </div>
          <ButtonLink href={`/consultant?context=${encodeURIComponent(`Detailed ${item.name} application review`)}`}>
            Start technical discussion
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
