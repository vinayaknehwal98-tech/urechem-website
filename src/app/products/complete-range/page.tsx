import { ArrowRight, CheckCircle2, FlaskConical, Layers3, ShieldCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { completeProductRange } from "@/data/complete-product-range";

const PU_FOAM_BACKGROUND =
  "https://images.unsplash.com/photo-1768321917437-1f1f6ae2ad28?auto=format&fit=crop&fm=jpg&q=88&w=2400";

export const metadata = {
  title: "Complete Product Range",
  description:
    "Explore the combined Urechem Chemicals range across spray foam, MDI, polyols, PPG, flexible systems, waterproofing, polyurea, TPU and formulation-support pathways.",
};

export default function Page() {
  return (
    <>
      <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden border-b border-blue-100 py-16 sm:py-20 lg:py-24">
        <div
          aria-hidden="true"
          className="foam-background-zoom absolute inset-0 -z-30 bg-cover bg-center"
          style={{ backgroundImage: `url(${PU_FOAM_BACKGROUND})` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20"
          style={{
            background:
              "linear-gradient(90deg,rgba(248,251,255,0.98) 0%,rgba(248,251,255,0.94) 34%,rgba(239,246,255,0.74) 53%,rgba(3,20,38,0.34) 75%,rgba(3,20,38,0.52) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 76% 46%,rgba(14,165,233,0.22),transparent 23rem),radial-gradient(circle at 18% 86%,rgba(37,99,235,0.10),transparent 24rem)",
          }}
        />

        <Container className="relative w-full">
          <div className="grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-center xl:gap-16">
            <div className="max-w-3xl">
              <SectionLabel>Combined technical range</SectionLabel>
              <h1 className="mt-6 max-w-4xl text-balance text-5xl font-black leading-[0.94] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">
                The complete Urechem product universe
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-700">
                One structured pathway across insulation systems, raw materials, flexible polyurethane systems, waterproofing, polyurea, TPU and processing support—compiled from the supplied technical reference set.
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

            <div className="relative mx-auto flex w-full max-w-[700px] items-center justify-center py-4 lg:py-0">
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[88%] w-[88%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/20 bg-slate-950/25 shadow-[0_30px_100px_rgba(2,18,36,0.30)] backdrop-blur-[2px]"
              />
              <div
                aria-hidden="true"
                className="absolute left-1/2 top-1/2 h-[66%] w-[66%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-100/25"
              />

              <div className="relative z-10 w-full">
                <div className="flex justify-center">
                  <span className="rounded-full border border-white/55 bg-white/88 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-sky-800 shadow-lg backdrop-blur-md">
                    PU chemistry pathways
                  </span>
                </div>

                <svg
                  aria-labelledby="complete-range-visual-title complete-range-visual-description"
                  className="mx-auto mt-3 h-auto w-full drop-shadow-[0_22px_36px_rgba(2,18,36,0.38)]"
                  role="img"
                  viewBox="0 0 720 520"
                >
                  <title id="complete-range-visual-title">Urechem product universe</title>
                  <desc id="complete-range-visual-description">
                    A high-contrast network of product and material pathways connected around Urechem technical review.
                  </desc>
                  <defs>
                    <linearGradient id="range-node" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0" stopColor="#38bdf8" />
                      <stop offset="0.52" stopColor="#2563eb" />
                      <stop offset="1" stopColor="#1e3a8a" />
                    </linearGradient>
                    <linearGradient id="range-core" x1="0" x2="1" y1="0" y2="1">
                      <stop offset="0" stopColor="#ecfeff" />
                      <stop offset="0.55" stopColor="#bae6fd" />
                      <stop offset="1" stopColor="#60a5fa" />
                    </linearGradient>
                    <filter id="node-shadow" x="-40%" y="-40%" width="180%" height="180%">
                      <feDropShadow dx="0" dy="11" floodColor="#020617" floodOpacity="0.45" stdDeviation="9" />
                    </filter>
                    <filter id="node-glow" x="-40%" y="-40%" width="180%" height="180%">
                      <feDropShadow dx="0" dy="0" floodColor="#67e8f9" floodOpacity="0.55" stdDeviation="9" />
                    </filter>
                  </defs>
                  <g fill="none" stroke="#e0f2fe" strokeOpacity="0.82" strokeWidth="4">
                    <path d="M360 260 170 135M360 260 360 70M360 260 550 135M360 260 615 300M360 260 510 445M360 260 210 445M360 260 105 300" />
                  </g>
                  <g fill="url(#range-node)" filter="url(#node-shadow)" stroke="#e0f2fe" strokeWidth="4">
                    <path d="m170 72 56 32v64l-56 32-56-32v-64z" />
                    <path d="m360 7 56 32v64l-56 32-56-32V39z" />
                    <path d="m550 72 56 32v64l-56 32-56-32v-64z" />
                    <path d="m615 237 56 32v64l-56 32-56-32v-64z" />
                    <path d="m510 382 56 32v64l-56 32-56-32v-64z" />
                    <path d="m210 382 56 32v64l-56 32-56-32v-64z" />
                    <path d="m105 237 56 32v64l-56 32-56-32v-64z" />
                  </g>
                  <path
                    d="m360 158 89 51v102l-89 51-89-51V209z"
                    fill="url(#range-core)"
                    filter="url(#node-glow)"
                    stroke="#fff"
                    strokeWidth="5"
                  />
                  <g
                    fill="#ffffff"
                    fontFamily="Arial, sans-serif"
                    fontSize="17"
                    fontWeight="900"
                    letterSpacing="0.4"
                    paintOrder="stroke"
                    stroke="#082f49"
                    strokeWidth="1.8"
                    textAnchor="middle"
                  >
                    <text x="170" y="130">
                      <tspan x="170">SPRAY</tspan>
                      <tspan dy="21" x="170">FOAM</tspan>
                    </text>
                    <text fontSize="20" x="360" y="78">MDI</text>
                    <text x="550" y="141">POLYOLS</text>
                    <text fontSize="15.5" x="615" y="306">MEMBRANES</text>
                    <text fontSize="16" x="510" y="451">POLYUREA</text>
                    <text x="210" y="438">
                      <tspan x="210">TPU +</tspan>
                      <tspan dy="21" x="210">AIDS</tspan>
                    </text>
                    <text fontSize="15.5" x="105" y="289">
                      <tspan x="105">FLEXIBLE</tspan>
                      <tspan dy="21" x="105">SYSTEMS</tspan>
                    </text>
                  </g>
                  <g fill="#082f49" fontFamily="Arial, sans-serif" textAnchor="middle">
                    <text fontSize="31" fontWeight="900" letterSpacing="0.8" x="360" y="250">URECHEM</text>
                    <text fontSize="18" fontWeight="900" letterSpacing="1.2" x="360" y="280">TECHNICAL</text>
                    <text fontSize="18" fontWeight="900" letterSpacing="1.2" x="360" y="302">RANGE</text>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fbff,#eaf4ff)] py-16 sm:py-20">
        <Container>
          <div className="max-w-4xl">
            <SectionLabel>Range architecture</SectionLabel>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.035em] text-blue-950 sm:text-5xl">
              Urechem product pathways, organised for technical discovery
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              Product and processing information is grouped into the most relevant technical pathway so visitors can find the correct family without unsupported recommendations.
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
                Share the application, environment, process, performance target and required documents.
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
