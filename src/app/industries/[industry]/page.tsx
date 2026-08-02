import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, FlaskConical, Layers3, ShieldCheck } from "lucide-react";
import { ValidationNote } from "@/components/catalog/cards";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { getApplication, getFamily, getIndustry, industries } from "@/data/catalog";
import { industryDetails } from "@/data/industry-details";

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
  const detail = industryDetails[item.slug];
  if (!detail) notFound();
  const applications = item.applicationSlugs.map(getApplication).filter(Boolean);
  const families = item.familySlugs.map(getFamily).filter(Boolean);

  return (
    <main className="industry-page bg-white">
      <section className="relative isolate overflow-hidden">
        <div aria-hidden="true" className="industry-hero-bg absolute inset-0 -z-30 bg-cover" style={{ backgroundImage: `url(${detail.heroImage})`, backgroundPosition: detail.heroPosition }} />
        <div aria-hidden="true" className="absolute inset-0 -z-20 bg-gradient-to-r from-slate-950/90 via-slate-950/62 to-slate-950/20" />
        <Container className="relative z-10 py-14 sm:py-20">
          <SectionLabel>Industry solution pathway</SectionLabel>
          <h1 className="industry-hero-title mt-5 text-4xl font-black tracking-[-0.045em] sm:text-6xl">{item.name}</h1>
          <p className="industry-hero-copy mt-5 max-w-3xl text-base leading-7 sm:text-lg sm:leading-8">{detail.overview}</p>
          <div className="mt-6"><ValidationNote /></div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={`/consultant?context=${encodeURIComponent(`Industry review: ${item.name}`)}`}>Discuss this industry pathway</ButtonLink>
            <ButtonLink href="/products" variant="secondary">Explore product families</ButtonLink>
          </div>
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            <section className="industry-glass rounded-2xl border p-5 backdrop-blur-md">
              <p className="industry-label text-xs font-black uppercase tracking-[0.2em]">Typical applications</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">{detail.useCases.map((value) => <div className="industry-pill flex gap-2 rounded-xl border px-3 py-3 text-sm font-semibold" key={value}><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" /><span>{value}</span></div>)}</div>
            </section>
            <section className="industry-glass rounded-2xl border p-5 backdrop-blur-md">
              <p className="industry-label text-xs font-black uppercase tracking-[0.2em]">Key review points</p>
              <div className="mt-4 flex flex-wrap gap-2">{detail.reviewPoints.map((value) => <span className="industry-chip rounded-full border px-3 py-2 text-sm" key={value}>{value}</span>)}</div>
            </section>
          </div>
        </Container>
      </section>

      <section className="border-b border-slate-200 py-16 sm:py-20">
        <Container><div className="grid items-center gap-10 lg:grid-cols-2">
          <div><SectionLabel>Industry context</SectionLabel><h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">Common challenges in {item.name.toLowerCase()}</h2><p className="mt-4 text-base leading-7 text-slate-600">Clear operating conditions and measurable targets help technical teams select the right pathway without premature assumptions.</p><div className="mt-8 grid gap-3 sm:grid-cols-2">{detail.challenges.map((value) => <article className="group flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md" key={value}><ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" /><p className="text-sm font-semibold leading-6 text-slate-700">{value}</p></article>)}</div></div>
          <figure className="group relative overflow-hidden rounded-2xl border border-slate-200 shadow-[0_24px_70px_rgba(15,23,42,0.16)]"><img alt={detail.imageAlt} className="h-[30rem] w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" src={detail.image} /><figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/95 to-transparent p-6 pt-24"><p className="text-xs font-black uppercase tracking-[0.2em] text-cyan-300">Project context matters</p><p className="mt-2 text-sm leading-6 text-white">{detail.imageCaption}</p></figcaption></figure>
        </div></Container>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20"><Container><div className="mx-auto max-w-3xl text-center"><SectionLabel>Application map</SectionLabel><h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">Relevant application pathways</h2></div><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{applications.map((application) => application ? <a className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl" href={`/applications/${application.slug}`} key={application.slug}><Layers3 className="h-6 w-6 text-blue-700" /><h3 className="mt-5 text-xl font-black text-slate-950">{application.name}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{application.summary}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">Explore pathway <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span></a> : null)}</div></Container></section>

      <section className="py-16 sm:py-20"><Container><SectionLabel>Product-family routes</SectionLabel><h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">Commonly evaluated families</h2><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">{families.map((family) => family ? <a className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1.5 hover:border-blue-200 hover:shadow-xl" href={`/products/${family.slug}`} key={family.slug}><FlaskConical className="h-6 w-6 text-indigo-700" /><p className="mt-5 text-xs font-black uppercase tracking-[0.17em] text-blue-700">{family.shortName}</p><h3 className="mt-2 text-xl font-black text-slate-950">{family.name}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{family.positioning}</p><div className="mt-5 border-t border-slate-200 pt-4 text-sm font-semibold text-slate-500">{family.products.length} catalog product{family.products.length === 1 ? "" : "s"}</div></a> : null)}</div></Container></section>

      <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20"><Container><div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]"><div><SectionLabel>Evaluation workflow</SectionLabel><h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">From industry need to validated pathway</h2><p className="mt-4 text-base leading-7 text-slate-600">Share the application, substrate, operating conditions, target properties, process method, scale and documentation needs.</p></div><div className="grid gap-4">{detail.workflow.map(([number,title,description]) => <article className="group flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 transition hover:translate-x-1 hover:border-blue-200 hover:shadow-lg" key={number}><span className="industry-step flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-700 text-base font-black">{number}</span><div><h3 className="text-lg font-black text-slate-950">{title}</h3><p className="mt-1 text-sm leading-6 text-slate-600">{description}</p></div></article>)}</div></div></Container></section>

      <section className="py-16 sm:py-20"><Container><div className="mx-auto max-w-3xl text-center"><SectionLabel>Technical support</SectionLabel><h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-slate-950 sm:text-4xl">Support around the selected pathway</h2></div><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">{detail.support.map((value,index) => <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl" key={value}>{index % 2 ? <FileText className="h-6 w-6 text-blue-700" /> : <ClipboardCheck className="h-6 w-6 text-blue-700" />}<p className="mt-5 text-sm font-bold leading-6 text-slate-800">{value}</p></article>)}</div></Container></section>

      <section className="industry-cta border-t border-slate-800 bg-slate-950 py-14"><Container className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center"><div><p className="industry-cta-label text-xs font-black uppercase tracking-[0.2em]">{item.name} enquiry</p><h2 className="industry-cta-title mt-3 text-2xl font-black sm:text-3xl">Bring your operating context, process and performance target.</h2><p className="industry-cta-copy mt-3 max-w-3xl text-sm leading-6">Urechem can route the requirement toward the most relevant application and product-family review.</p></div><ButtonLink href={`/consultant?context=${encodeURIComponent(`Detailed ${item.name} application review`)}`}>Start technical discussion</ButtonLink></Container></section>

      <style>{`@keyframes industry-drift{0%,100%{transform:scale(1.03)}50%{transform:scale(1.07) translate3d(-.5%,-.4%,0)}}.industry-hero-bg{animation:industry-drift 20s ease-in-out infinite}.industry-hero-title{color:#fff!important;text-shadow:0 4px 22px rgba(2,18,36,.72)}.industry-hero-copy{color:#e2e8f0!important}.industry-glass{background:rgba(2,6,23,.7)!important;border-color:rgba(255,255,255,.26)!important}.industry-label{color:#67e8f9!important}.industry-pill,.industry-chip{background:rgba(255,255,255,.95)!important;border-color:rgba(255,255,255,.75)!important;color:#0f172a!important}.industry-pill span{color:#0f172a!important}.industry-pill svg{color:#0284c7!important}.industry-step{color:#fff!important}.industry-cta-label{color:#67e8f9!important}.industry-cta-title{color:#fff!important}.industry-cta-copy{color:#cbd5e1!important}@media(prefers-reduced-motion:reduce){.industry-hero-bg{animation:none}}`}</style>
    </main>
  );
}
