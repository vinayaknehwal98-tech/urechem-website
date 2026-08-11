import Link from "next/link";
import { ArrowRight, FlaskConical, Mail, Phone, Sparkles } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Container } from "@/components/ui/container";
import { footerGroups, legalLinks } from "@/data/navigation";

const trustPoints = ["Application-led", "Expert reviewed", "Quality focused"] as const;
const URECHEM_PHONE = "+91-8882132954";
const URECHEM_EMAIL = "sales@urechem.co.in";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-[#ded6c8]" style={{ background: "#f4efe6" }}>
      <section
        className="relative isolate overflow-hidden"
        style={{ background: "linear-gradient(120deg,#061525 0%,#0a2944 72%,#0d3b58 100%)" }}
      >
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-30"
          preserveAspectRatio="none"
          viewBox="0 0 1600 260"
        >
          <g fill="none" stroke="rgba(122,218,255,0.45)" strokeWidth="1.5">
            <path d="M-40 210 C220 40 420 250 680 100 S1130 15 1640 150" />
            <path d="M130 30 L330 125 L510 52 L735 165 L980 60 L1190 150 L1475 38" />
          </g>
          <g fill="#65d5f7">
            <circle cx="130" cy="30" r="5" />
            <circle cx="330" cy="125" r="7" />
            <circle cx="510" cy="52" r="5" />
            <circle cx="735" cy="165" r="7" />
            <circle cx="980" cy="60" r="6" />
            <circle cx="1190" cy="150" r="7" />
            <circle cx="1475" cy="38" r="5" />
          </g>
        </svg>

        <Container className="relative grid gap-7 py-9 sm:py-11 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10">
                <FlaskConical aria-hidden="true" className="h-5 w-5" style={{ color: "#7dd3fc" }} />
              </span>
              <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: "#f4b942" }}>
                Technical partnership
              </p>
            </div>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em] sm:text-4xl" style={{ color: "#ffffff" }}>
              Tell us what needs to perform.
            </h2>
            <p className="mt-3 max-w-2xl leading-7" style={{ color: "#cbd5e1" }}>
              Share the application, substrate, process and performance target. We will help map the right technical route.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 font-black shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(0,0,0,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href="/consultant"
              style={{ background: "#f4b942", color: "#071a2d" }}
            >
              <Mail aria-hidden="true" className="h-4.5 w-4.5" />
              Discuss a requirement
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border px-6 font-bold backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href="/ask-urechem-ai"
              style={{ borderColor: "rgba(255,255,255,0.22)", background: "rgba(255,255,255,0.07)", color: "#ffffff" }}
            >
              <Sparkles aria-hidden="true" className="h-4.5 w-4.5" style={{ color: "#7dd3fc" }} />
              Ask Urechem AI
            </Link>
          </div>
        </Container>
      </section>

      <Container className="relative py-11 sm:py-14">
        <div className="grid gap-x-12 gap-y-11 xl:grid-cols-[1.35fr_repeat(4,minmax(0,1fr))]">
          <section className="max-w-sm">
            <Link
              className="group inline-flex rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0a2944]"
              href="/"
            >
              <BrandLogo className="h-14 w-[13rem] sm:h-16 sm:w-[15rem]" />
            </Link>
            <p className="mt-6 text-sm leading-7 text-[#596273]">
              Technical polyurethane and specialty-chemical solutions for application problem-solving, formulation support, validation and supply.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {trustPoints.map((point) => (
                <span
                  className="rounded-full border px-3 py-1.5 text-xs font-bold"
                  key={point}
                  style={{ borderColor: "#d8cfbf", background: "rgba(255,255,255,0.56)", color: "#16324a" }}
                >
                  {point}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-2 text-sm">
              <a className="inline-flex items-center gap-2 font-bold text-[#16324a] hover:text-blue-700" href={`tel:${URECHEM_PHONE.replace(/[^+0-9]/g, "")}`}>
                <Phone aria-hidden="true" className="h-4 w-4" />
                {URECHEM_PHONE}
              </a>
              <a className="inline-flex items-center gap-2 font-bold text-[#16324a] hover:text-blue-700" href={`mailto:${URECHEM_EMAIL}`}>
                <Mail aria-hidden="true" className="h-4 w-4" />
                {URECHEM_EMAIL}
              </a>
            </div>

            <p className="mt-7 text-sm font-black uppercase tracking-[0.13em]" style={{ color: "#b7791f" }}>
              We deliver what we promise.
            </p>
          </section>

          {footerGroups.map((group, groupIndex) => (
            <section className="min-w-0" key={group.title}>
              <div className="flex items-center gap-3">
                <span className="text-xs font-black tabular-nums" style={{ color: "#c78a24" }}>
                  0{groupIndex + 1}
                </span>
                <h2 className="font-black tracking-[-0.015em]" style={{ color: "#071a2d" }}>
                  {group.title}
                </h2>
              </div>
              <div className="mt-4 h-px w-full" style={{ background: "linear-gradient(90deg,#c78a24,rgba(199,138,36,0.10))" }} />
              <ul className="mt-5 grid gap-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="group flex items-start gap-2 text-sm leading-6 transition duration-200 hover:translate-x-0.5 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0a2944]"
                      href={link.href}
                      style={{ color: "#5f6774" }}
                    >
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-1.5 h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                        style={{ color: "#c78a24" }}
                      />
                      <span className="transition-colors duration-200 group-hover:text-[#071a2d]">{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t pt-5 text-sm sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "#d8cfbf", color: "#747b86" }}>
          <p>&copy; {year} Urechem Chemicals. All rights reserved.</p>
          <nav aria-label="Legal links" className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                className="transition hover:text-[#071a2d] focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0a2944]"
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
