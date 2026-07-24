import { ArrowRight, CheckCircle2, FlaskConical, Layers3, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { completeProductRange } from "@/data/complete-product-range";

export const metadata = {
  title: "Complete Product Range",
  description:
    "Explore the combined Urechem Chemicals range across spray foam, MDI, polyols, PPG, waterproofing, grouting, polyurea, TPU and formulation-support pathways.",
};

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-cyan-200/15 bg-[linear-gradient(135deg,#03101e,#09263e_55%,#075985)] py-18 sm:py-24">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.32)_1px,transparent_0)] [background-size:26px_26px]" />
        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-center">
            <div>
              <SectionLabel>Combined technical range</SectionLabel>
              <h1 className="mt-6 max-w-5xl text-balance text-5xl font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                The complete Urechem product universe
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                One structured pathway across insulation systems, raw materials, formulated polyurethane systems, waterproofing, grouting, polyurea, TPU and processing support—compiled from the complete supplied technical reference set.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/products" size="lg">
                  Use the product finder
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/contact?type=Consultation%20request" size="lg" variant="secondary">
                  Discuss a requirement
                </ButtonLink>
              </div>
            </div>

            <div className="relative isolate overflow-hidden rounded-[var(--radius-lg)] border border-cyan-100/20 bg-white/7 p-6 shadow-[var(--shadow-deep)] backdrop-blur-sm sm:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-300/15 blur-3xl motion-safe:animate-pulse" />
              <svg
                aria-labelledby="complete-range-visual-title complete-range-visual-description"
                className="relative mx-auto h-auto w-full max-w-xl"
                role="img"
                viewBox="0 0 720 520"
              >
                <title id="complete-range-visual-title">Urechem product universe</title>
                <desc id="complete-range-visual-description">
                  A network of unique hexagonal material pathways connected around Urechem technical review.
                </desc>
                <defs>
                  <linearGradient id="range-node" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#67e8f9" />
                    <stop offset="1" stopColor="#2563eb" />
                  </linearGradient>
                  <linearGradient id="range-core" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#e0f2fe" />
                    <stop offset="1" stopColor="#7dd3fc" />
                  </linearGradient>
                </defs>
                <g fill="none" stroke="#67e8f9" strokeOpacity="0.42" strokeWidth="3">
                  <path d="M360 260 170 135M360 260 360 70M360 260 550 135M360 260 615 300M360 260 510 445M360 260 210 445M360 260 105 300" />
                </g>
                <g fill="url(#range-node)" stroke="#cffafe" strokeWidth="3">
                  <path d="m170 78 50 29v58l-50 29-50-29v-58z" />
                  <path d="m360 15 50 29v58l-50 29-50-29V44z" />
                  <path d="m550 78 50 29v58l-50 29-50-29v-58z" />
                  <path d="m615 243 50 29v58l-50 29-50-29v-58z" />
                  <path d="m510 388 50 29v58l-50 29-50-29v-58z" />
                  <path d="m210 388 50 29v58l-50 29-50-29v-58z" />
                  <path d="m105 243 50 29v58l-50 29-50-29v-58z" />
                </g>
                <path d="m360 167 81 47v93l-81 47-81-47v-93z" fill="url(#range-core)" stroke="#fff" strokeWidth="4" />
                <g fill="#fff" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" textAnchor="middle">
                  <text x="170" y="142">SPRAY FOAM</text>
                  <text x="360" y="79">MDI</text>
                  <text x="550" y="142">POLYOLS</text>
                  <text x="615" y="307">MEMBRANES</text>
                  <text x="510" y="452">POLYUREA</text>
                  <text x="210" y="452">TPU + AIDS</text>
                  <text x="105" y="307">GROUTING</text>
                </g>
                <g fill="#082f49" fontFamily="Arial, sans-serif" textAnchor="middle">
                  <text fontSize="25" fontWeight="800" x="360" y="250">URECHEM</text>
                  <text fontSize="17" fontWeight="700" x="360" y="278">TECHNICAL RANGE</text>
                </g>
              </svg>
              <p className="relative mt-5 text-center text-sm leading-6 text-cyan-50/85">
                Each pathway stays connected to application context, document requests and specialist validation rather than unsupported automatic selection.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fbff,#eaf4ff)] py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <SectionLabel>Range architecture</SectionLabel>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.035em] text-blue-950 sm:text-5xl">
              Every supplied product pathway, organised under Urechem
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              Repeated brochure material is consolidated, while distinct product, application and processing information remains visible in the most relevant technical pathway.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {completeProductRange.map((range, index) => (
              <article
                className="group rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.08)] transition duration-300 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_24px_70px_rgba(30,64,175,0.14)] sm:p-7"
                key={range.slug}
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-950 text-white shadow-lg">
                    {index % 3 === 0 ? (
                      <FlaskConical aria-hidden="true" className="h-6 w-6" />
                    ) : index % 3 === 1 ? (
                      <Layers3 aria-hidden="true" className="h-6 w-6" />
                    ) : (
                      <ShieldCheck aria-hidden="true" className="h-6 w-6" />
                    )}
                  </div>
                  <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-black uppercase tracking-[0.13em] text-blue-800">
                    {range.category}
                  </span>
                </div>

                <h3 className="mt-5 text-2xl font-black text-blue-950 sm:text-3xl">{range.name}</h3>
                <p className="mt-3 leading-7 text-slate-700">{range.summary}</p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">Applications</p>
                    <ul className="mt-3 grid gap-2.5">
                      {range.applications.map((application) => (
                        <li className="flex gap-2.5 text-sm leading-6 text-slate-700" key={application}>
                          <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
                          {application}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">Representative pathways</p>
                    <ul className="mt-3 grid gap-2.5">
                      {range.representativeProducts.map((product) => (
                        <li className="text-sm font-semibold leading-6 text-blue-950" key={product}>
                          {product}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
                  <strong>Technical boundary:</strong> {range.reviewNote}
                </div>

                <ButtonLink className="mt-5" href={range.href} size="sm">
                  Explore this pathway
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.08)] sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Need a controlled recommendation?</p>
              <h2 className="mt-2 max-w-3xl text-2xl font-black text-blue-950 sm:text-3xl">
                Share the substrate, environment, process, performance target and required documents.
              </h2>
            </div>
            <ButtonLink className="mt-6 shrink-0 sm:mt-0" href="/technical-brief-builder" size="lg">
              Build a technical brief
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
