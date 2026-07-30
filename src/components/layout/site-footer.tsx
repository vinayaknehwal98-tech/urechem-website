import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  BrainCircuit,
  Building2,
  FileText,
  FlaskConical,
  Headphones,
  Layers3,
  Mail,
  ShieldCheck,
  Sparkles,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Container } from "@/components/ui/container";
import { footerGroups, legalLinks } from "@/data/navigation";

const footerGroupIcons: Record<string, LucideIcon> = {
  "Product families": Boxes,
  Applications: Layers3,
  "Technical Center": FileText,
  Company: UsersRound,
};

const orbitLinks = [
  {
    label: "Products",
    text: "Explore the range",
    href: "/products",
    icon: Boxes,
    position: "left-[7%] top-[16%]",
  },
  {
    label: "Applications",
    text: "Start with the need",
    href: "/applications",
    icon: Layers3,
    position: "right-[5%] top-[18%]",
  },
  {
    label: "Innovation",
    text: "Build a new pathway",
    href: "/innovation-rd",
    icon: FlaskConical,
    position: "bottom-[12%] left-[8%]",
  },
  {
    label: "Expert support",
    text: "Discuss the challenge",
    href: "/contact?type=Consultation%20request",
    icon: Headphones,
    position: "bottom-[10%] right-[5%]",
  },
] as const;

const trustHighlights = [
  { title: "Application first", text: "Context before product selection", icon: ShieldCheck },
  { title: "Research led", text: "Innovation backed by technical work", icon: FlaskConical },
  { title: "Expert reviewed", text: "Guidance when decisions matter", icon: Headphones },
  { title: "Industry ready", text: "Solutions for demanding environments", icon: Building2 },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative isolate overflow-hidden border-t border-cyan-200/20"
      style={{
        background:
          "radial-gradient(circle at 12% 8%,rgba(34,211,238,0.18),transparent 24rem),radial-gradient(circle at 88% 20%,rgba(37,99,235,0.24),transparent 28rem),linear-gradient(145deg,#020817 0%,#061a31 44%,#082f49 72%,#0b4a6f 100%)",
        color: "#ffffff",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full border border-cyan-200/15 motion-safe:animate-[spin_32s_linear_infinite]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-28 -top-24 h-96 w-96 rounded-full border border-blue-300/15 motion-safe:animate-[spin_38s_linear_infinite_reverse]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px,rgba(186,230,253,0.32) 1px,transparent 0)",
          backgroundSize: "28px 28px",
          maskImage: "linear-gradient(180deg,black 0%,transparent 68%)",
        }}
      />

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] w-full opacity-35"
        preserveAspectRatio="none"
        viewBox="0 0 1600 540"
      >
        <defs>
          <linearGradient id="footer-network-line" x1="0" x2="1">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="0.45" stopColor="#67e8f9" stopOpacity="0.65" />
            <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#footer-network-line)" strokeWidth="1.5">
          <path d="M-40 390 C250 210 440 510 720 275 S1190 70 1640 250" />
          <path d="M-60 450 C270 275 470 575 800 330 S1280 160 1660 340" />
          <path d="M210 35 L360 150 L530 75 L700 205 L920 95 L1115 215 L1375 75" />
        </g>
        <g fill="#67e8f9">
          <circle cx="210" cy="35" r="5" />
          <circle cx="360" cy="150" r="7" />
          <circle cx="530" cy="75" r="5" />
          <circle cx="700" cy="205" r="8" />
          <circle cx="920" cy="95" r="6" />
          <circle cx="1115" cy="215" r="8" />
          <circle cx="1375" cy="75" r="5" />
        </g>
      </svg>

      <Container className="relative py-12 sm:py-16 lg:py-20">
        <section className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div>
            <Link
              className="group inline-flex rounded-2xl border border-white/15 bg-white/95 px-4 py-3 shadow-[0_16px_50px_rgba(14,165,233,0.18)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_65px_rgba(14,165,233,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              href="/"
            >
              <BrandLogo className="h-12 w-[12rem] sm:h-14 sm:w-[14rem]" />
            </Link>

            <div className="mt-9 inline-flex items-center gap-2 rounded-full border border-cyan-200/25 bg-cyan-200/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] backdrop-blur-md">
              <Sparkles aria-hidden="true" className="h-4 w-4" style={{ color: "#67e8f9" }} />
              <span style={{ color: "#cffafe" }}>Urechem technical network</span>
            </div>

            <h2
              className="mt-6 max-w-4xl text-balance text-4xl font-black leading-[0.96] tracking-[-0.055em] sm:text-6xl lg:text-7xl"
              style={{ color: "#ffffff" }}
            >
              The next solution starts with the
              <span
                className="block bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(90deg,#67e8f9,#60a5fa 48%,#c4b5fd)" }}
              >
                right chemistry.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 sm:text-lg" style={{ color: "#cbd5e1" }}>
              From real-world application challenges to validated polyurethane and specialty-chemical pathways, Urechem helps structure the technical next step.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl px-6 font-black shadow-[0_18px_45px_rgba(14,165,233,0.28)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(14,165,233,0.42)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                href="/contact?type=Consultation%20request"
                style={{ background: "linear-gradient(105deg,#67e8f9,#38bdf8)", color: "#082f49" }}
              >
                <Mail aria-hidden="true" className="h-5 w-5" />
                Start a technical enquiry
                <ArrowRight aria-hidden="true" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/8 px-6 font-bold backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/50 hover:bg-white/14 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                href="/ask-urechem-ai"
                style={{ color: "#ffffff" }}
              >
                <BrainCircuit aria-hidden="true" className="h-5 w-5" style={{ color: "#67e8f9" }} />
                Ask Urechem AI
              </Link>
            </div>
          </div>

          <div
            className="relative min-h-[440px] overflow-hidden rounded-[2rem] border border-cyan-100/20 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.34)] backdrop-blur-xl sm:p-8"
            style={{ background: "linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.035))" }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 50% 48%,rgba(34,211,238,0.22),transparent 25%),radial-gradient(circle at 82% 12%,rgba(96,165,250,0.18),transparent 24%)",
              }}
            />

            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: "#67e8f9" }}>
                  Choose your route
                </p>
                <h3 className="mt-2 text-2xl font-black" style={{ color: "#ffffff" }}>
                  One challenge. Multiple technical pathways.
                </h3>
              </div>
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/25 bg-cyan-200/10 sm:flex">
                <FlaskConical aria-hidden="true" className="h-6 w-6" style={{ color: "#67e8f9" }} />
              </span>
            </div>

            <div className="relative mt-7 hidden h-[300px] lg:block">
              <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-cyan-200/25 motion-safe:animate-[spin_26s_linear_infinite]" />
              <div className="absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/20 motion-safe:animate-[spin_18s_linear_infinite_reverse]" />
              <div
                className="absolute left-1/2 top-1/2 flex h-32 w-32 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-cyan-100/35 text-center shadow-[0_0_55px_rgba(34,211,238,0.24)]"
                style={{ background: "linear-gradient(145deg,rgba(103,232,249,0.23),rgba(37,99,235,0.26))" }}
              >
                <Sparkles aria-hidden="true" className="h-7 w-7" style={{ color: "#a5f3fc" }} />
                <span className="mt-2 text-sm font-black tracking-[0.14em]" style={{ color: "#ffffff" }}>
                  URECHEM
                </span>
                <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.12em]" style={{ color: "#bae6fd" }}>
                  technical core
                </span>
              </div>

              {orbitLinks.map((item) => {
                const OrbitIcon = item.icon;
                return (
                  <Link
                    className={`group absolute ${item.position} w-40 rounded-2xl border border-white/15 bg-slate-950/55 p-4 shadow-[0_16px_38px_rgba(0,0,0,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-cyan-200/45 hover:bg-slate-900/75`}
                    href={item.href}
                    key={item.label}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-200/10 ring-1 ring-cyan-200/20">
                      <OrbitIcon aria-hidden="true" className="h-5 w-5" style={{ color: "#67e8f9" }} />
                    </span>
                    <p className="mt-3 text-sm font-black" style={{ color: "#ffffff" }}>{item.label}</p>
                    <p className="mt-1 text-xs leading-5" style={{ color: "#94a3b8" }}>{item.text}</p>
                    <ArrowRight aria-hidden="true" className="mt-3 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" style={{ color: "#67e8f9" }} />
                  </Link>
                );
              })}
            </div>

            <div className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:hidden">
              {orbitLinks.map((item) => {
                const OrbitIcon = item.icon;
                return (
                  <Link
                    className="group rounded-2xl border border-white/15 bg-slate-950/45 p-4 backdrop-blur-xl transition duration-300 hover:border-cyan-200/45 hover:bg-slate-900/70"
                    href={item.href}
                    key={item.label}
                  >
                    <OrbitIcon aria-hidden="true" className="h-5 w-5" style={{ color: "#67e8f9" }} />
                    <p className="mt-3 font-black" style={{ color: "#ffffff" }}>{item.label}</p>
                    <p className="mt-1 text-xs leading-5" style={{ color: "#94a3b8" }}>{item.text}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <section
          className="mt-12 overflow-hidden rounded-[2rem] border border-white/10 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl"
          style={{ background: "rgba(2,8,23,0.52)" }}
        >
          <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-6 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: "#67e8f9" }}>Explore Urechem</p>
              <h3 className="mt-2 text-2xl font-black sm:text-3xl" style={{ color: "#ffffff" }}>Everything important, one step away.</h3>
            </div>
            <p className="max-w-xl text-sm leading-6" style={{ color: "#94a3b8" }}>
              Browse product families, application routes, technical resources and company information without losing the context of your original challenge.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4">
            {footerGroups.map((group, index) => {
              const GroupIcon = footerGroupIcons[group.title] ?? Boxes;
              return (
                <div
                  className={`group relative p-6 transition duration-300 hover:bg-white/[0.045] sm:p-7 ${index > 0 ? "border-t border-white/10 sm:[&:nth-child(even)]:border-l xl:border-l xl:border-t-0" : ""}`}
                  key={group.title}
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-200/20 bg-cyan-200/10 transition duration-300 group-hover:scale-105 group-hover:bg-cyan-200/15">
                      <GroupIcon aria-hidden="true" className="h-5 w-5" style={{ color: "#67e8f9" }} />
                    </span>
                    <span className="text-4xl font-black tracking-[-0.05em]" style={{ color: "rgba(103,232,249,0.16)" }}>
                      0{index + 1}
                    </span>
                  </div>
                  <h4 className="mt-5 text-lg font-black" style={{ color: "#ffffff" }}>{group.title}</h4>
                  <div className="mt-3 h-px w-full bg-gradient-to-r from-cyan-300/70 via-blue-400/25 to-transparent" />
                  <ul className="mt-5 grid gap-3">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          className="group/link flex items-start gap-2 text-sm leading-6 transition duration-300 hover:translate-x-1"
                          href={link.href}
                          style={{ color: "#cbd5e1" }}
                        >
                          <ArrowRight aria-hidden="true" className="mt-1.5 h-3.5 w-3.5 shrink-0" style={{ color: "#38bdf8" }} />
                          <span className="group-hover/link:text-cyan-100">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        <section className="mt-6 grid overflow-hidden rounded-[1.5rem] border border-white/10 sm:grid-cols-2 xl:grid-cols-4" style={{ background: "rgba(255,255,255,0.055)" }}>
          {trustHighlights.map((item, index) => {
            const HighlightIcon = item.icon;
            return (
              <div
                className={`flex items-center gap-4 px-5 py-5 transition duration-300 hover:bg-white/[0.045] ${index > 0 ? "border-t border-white/10 sm:[&:nth-child(even)]:border-l xl:border-l xl:border-t-0" : ""}`}
                key={item.title}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-200/20 bg-cyan-200/10">
                  <HighlightIcon aria-hidden="true" className="h-5 w-5" style={{ color: "#67e8f9" }} />
                </span>
                <div>
                  <p className="text-sm font-black" style={{ color: "#ffffff" }}>{item.title}</p>
                  <p className="mt-1 text-xs leading-5" style={{ color: "#94a3b8" }}>{item.text}</p>
                </div>
              </div>
            );
          })}
        </section>

        <div className="mt-8 flex flex-col gap-5 border-t border-white/10 pt-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p style={{ color: "#94a3b8" }}>&copy; {year} Urechem Chemicals. All rights reserved.</p>
          <nav aria-label="Legal links" className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                className="transition duration-300 hover:text-cyan-200"
                href={link.href}
                key={link.href}
                style={{ color: "#cbd5e1" }}
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
