import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  FileText,
  FlaskConical,
  Mail,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Container } from "@/components/ui/container";
import { footerGroups, legalLinks } from "@/data/navigation";

const footerGroupIcons: Record<string, LucideIcon> = {
  "Product families": Boxes,
  Applications: FlaskConical,
  "Technical Center": FileText,
  Company: UsersRound,
};

const trustPoints = ["Application-led", "Expert reviewed", "Quality focused"] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative isolate overflow-hidden border-t border-blue-100 text-slate-700"
      style={{
        background:
          "radial-gradient(circle at 8% 8%,rgba(14,165,233,0.10),transparent 24rem),radial-gradient(circle at 94% 24%,rgba(37,99,235,0.08),transparent 26rem),linear-gradient(180deg,#f8fbff 0%,#eef5fb 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-12 left-1/2 -z-10 -translate-x-1/2 select-none whitespace-nowrap text-[18vw] font-black leading-none tracking-[-0.08em] text-blue-950/[0.025]"
      >
        URECHEM
      </div>

      <Container className="relative py-11 sm:py-14">
        <section className="overflow-hidden rounded-[1.6rem] border border-blue-200/70 bg-white/80 shadow-[0_24px_70px_rgba(30,64,175,0.10)] backdrop-blur-sm">
          <div className="grid gap-7 px-6 py-7 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-blue-700">Technical support</p>
              <h2 className="mt-2 max-w-3xl text-2xl font-black tracking-[-0.035em] text-blue-950 sm:text-3xl">
                Have an application challenge? Start with the context, not the catalogue.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
                Share the substrate, process, environment and performance target. We will help structure the next technical step.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 font-black text-white shadow-[0_14px_34px_rgba(29,78,216,0.24)] transition duration-200 hover:-translate-y-0.5 hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                href="/contact?type=Consultation%20request"
              >
                <Mail aria-hidden="true" className="h-4.5 w-4.5" />
                Start an enquiry
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-5 font-bold text-blue-950 transition duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                href="/ask-urechem-ai"
              >
                <Sparkles aria-hidden="true" className="h-4.5 w-4.5 text-blue-600" />
                Ask Urechem AI
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-12 grid gap-x-10 gap-y-12 xl:grid-cols-[1.35fr_repeat(4,minmax(0,1fr))]">
          <section className="max-w-sm">
            <Link
              className="group inline-flex rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
              href="/"
            >
              <BrandLogo className="h-14 w-[13rem] sm:h-16 sm:w-[15rem]" />
            </Link>

            <div className="relative mt-7 aspect-[4/3] max-w-[18rem] overflow-hidden rounded-[1.5rem] border border-blue-200/80 bg-white/70 shadow-[0_18px_45px_rgba(30,64,175,0.09)]">
              <svg aria-hidden="true" className="h-full w-full" viewBox="0 0 360 270">
                <defs>
                  <linearGradient id="footer-drop-gradient" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#67e8f9" />
                    <stop offset="0.52" stopColor="#38bdf8" />
                    <stop offset="1" stopColor="#1d4ed8" />
                  </linearGradient>
                  <linearGradient id="footer-line-gradient" x1="0" x2="1">
                    <stop offset="0" stopColor="#93c5fd" stopOpacity="0.18" />
                    <stop offset="0.5" stopColor="#2563eb" stopOpacity="0.55" />
                    <stop offset="1" stopColor="#67e8f9" stopOpacity="0.15" />
                  </linearGradient>
                </defs>

                <rect height="270" rx="26" width="360" fill="rgba(255,255,255,0.22)" />
                <g fill="none" stroke="url(#footer-line-gradient)" strokeWidth="2">
                  <path d="M32 198 92 154 148 182 208 126 276 154 330 108" />
                  <path d="M28 78 96 112 156 72 222 96 292 54" />
                  <path d="M96 112 92 154M156 72 148 182M222 96 208 126M292 54 276 154" />
                </g>
                <g fill="#bfdbfe" stroke="#ffffff" strokeWidth="3">
                  <circle cx="32" cy="198" r="8" />
                  <circle cx="92" cy="154" r="10" />
                  <circle cx="148" cy="182" r="7" />
                  <circle cx="208" cy="126" r="9" />
                  <circle cx="276" cy="154" r="8" />
                  <circle cx="330" cy="108" r="6" />
                  <circle cx="28" cy="78" r="7" />
                  <circle cx="96" cy="112" r="8" />
                  <circle cx="156" cy="72" r="6" />
                  <circle cx="222" cy="96" r="8" />
                  <circle cx="292" cy="54" r="6" />
                </g>

                <circle cx="180" cy="136" r="66" fill="#dbeafe" opacity="0.72" />
                <circle cx="180" cy="136" r="51" fill="#eff6ff" opacity="0.92" />
                <path
                  d="M180 78c-19 30-43 54-43 82 0 24 19 43 43 43s43-19 43-43c0-28-24-52-43-82Z"
                  fill="url(#footer-drop-gradient)"
                  stroke="#ffffff"
                  strokeWidth="5"
                />
                <path d="M165 151c3 15 12 24 27 28" fill="none" stroke="#ffffff" strokeLinecap="round" strokeWidth="5" opacity="0.82" />
              </svg>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-600">
              Technical polyurethane and specialty-chemical solutions supported by application context, formulation work and expert validation.
            </p>
          </section>

          {footerGroups.map((group) => {
            const Icon = footerGroupIcons[group.title] ?? Boxes;
            return (
              <section className="min-w-0" key={group.title}>
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-200 bg-white text-blue-700 shadow-[0_8px_20px_rgba(30,64,175,0.08)]">
                    <Icon aria-hidden="true" className="h-4.5 w-4.5" />
                  </span>
                  <h2 className="font-black tracking-[-0.015em] text-blue-950">{group.title}</h2>
                </div>
                <div className="mt-4 h-0.5 w-10 rounded-full bg-blue-600" />
                <ul className="mt-5 grid gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="group flex items-start gap-2 text-sm leading-6 text-slate-600 transition duration-200 hover:translate-x-0.5 hover:text-blue-800 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                        href={link.href}
                      >
                        <ArrowRight aria-hidden="true" className="mt-1.5 h-3.5 w-3.5 shrink-0 text-blue-500 transition-transform duration-200 group-hover:translate-x-0.5" />
                        <span>{link.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-blue-200/80 pt-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2.5">
            {trustPoints.map((point) => (
              <span className="rounded-full border border-blue-200 bg-white/70 px-3.5 py-2 text-xs font-bold text-blue-900" key={point}>
                {point}
              </span>
            ))}
          </div>
          <p className="text-sm font-black uppercase tracking-[0.14em] text-blue-800">We deliver what we promise.</p>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-blue-200/80 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Urechem Chemicals. All rights reserved.</p>
          <nav aria-label="Legal links" className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                className="transition hover:text-blue-800 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}
