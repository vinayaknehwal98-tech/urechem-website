import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Building2,
  FileText,
  FlaskConical,
  Headphones,
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
  Applications: FlaskConical,
  "Technical Center": FileText,
  Company: UsersRound,
};

const footerActions = [
  {
    label: "Submit an enquiry",
    href: "/contact",
    icon: Mail,
    primary: true,
  },
  {
    label: "Speak to a technical expert",
    href: "/contact?type=Consultation%20request",
    icon: Headphones,
    primary: false,
  },
  {
    label: "Ask Urechem AI",
    href: "/ask-urechem-ai",
    icon: Sparkles,
    primary: false,
  },
] as const;

const trustHighlights = [
  {
    title: "Engineered solutions",
    text: "Built around real applications",
    icon: ShieldCheck,
  },
  {
    title: "Innovation backed",
    text: "Research-led product development",
    icon: FlaskConical,
  },
  {
    title: "Expert support",
    text: "Technical guidance when needed",
    icon: Headphones,
  },
  {
    title: "Cross-industry delivery",
    text: "Solutions for demanding sectors",
    icon: Building2,
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate overflow-hidden border-t border-blue-100 bg-white text-slate-600 shadow-[0_-22px_70px_rgba(30,64,175,0.08)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(circle at 8% 12%, rgba(14,165,233,0.12), transparent 24rem), radial-gradient(circle at 92% 16%, rgba(37,99,235,0.10), transparent 25rem), linear-gradient(180deg,#ffffff 0%,#f8fbff 58%,#eef6ff 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 -z-10 h-72 w-[42rem] opacity-50"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(37,99,235,0.18) 1px, transparent 0)",
          backgroundSize: "20px 20px",
          maskImage: "linear-gradient(135deg, transparent 4%, black 56%, transparent 100%)",
        }}
      />

      <Container className="py-10 sm:py-14">
        <section
          className="relative overflow-hidden rounded-[1.35rem] border border-blue-300/30 px-6 py-7 shadow-[0_22px_70px_rgba(30,64,175,0.18)] sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-10"
          style={{
            background: "linear-gradient(120deg,#082f73 0%,#1455d9 55%,#0ea5e9 125%)",
            color: "#ffffff",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-28 h-72 w-72 rounded-full border border-white/20"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 right-40 h-72 w-72 rounded-full bg-cyan-200/15 blur-3xl"
          />
          <div className="relative max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: "#bae6fd" }}>
              Start with the application
            </p>
            <h2 className="mt-3 text-2xl font-black tracking-[-0.03em] sm:text-3xl" style={{ color: "#ffffff" }}>
              Need the right polyurethane or specialty-chemical pathway?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 sm:text-base" style={{ color: "#dbeafe" }}>
              Share the substrate, environment, process and performance target. Our team will help structure the next technical step.
            </p>
          </div>
          <div className="relative mt-6 flex shrink-0 flex-wrap gap-3 lg:mt-0 lg:justify-end">
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 font-black text-blue-800 shadow-lg transition duration-300 hover:-translate-y-0.5 hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href="/contact?type=Consultation%20request"
            >
              Discuss a requirement
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/35 bg-white/10 px-5 font-bold backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              href="/products"
              style={{ color: "#ffffff" }}
            >
              Explore products
            </Link>
          </div>
        </section>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_2.45fr] xl:items-stretch">
          <section className="rounded-[1.25rem] border border-blue-200/80 bg-white/88 p-6 shadow-[0_18px_55px_rgba(30,64,175,0.10)] backdrop-blur-md sm:p-7">
            <Link
              className="group inline-flex items-center rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
              href="/"
            >
              <BrandLogo />
            </Link>
            <p className="mt-6 max-w-md text-sm leading-7 text-slate-600">
              Urechem is a technical polyurethane and specialty-chemical solutions partner for application problem-solving, formulation development, implementation support, quality validation and supply.
            </p>

            <div className="mt-6 grid gap-3">
              {footerActions.map((action) => {
                const ActionIcon = action.icon;
                return (
                  <Link
                    className={`group flex min-h-12 items-center gap-3 rounded-xl border px-4 font-bold transition duration-300 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${
                      action.primary
                        ? "border-blue-700 shadow-[0_12px_28px_rgba(29,78,216,0.22)]"
                        : "border-blue-200 bg-white hover:border-blue-400 hover:bg-blue-50"
                    }`}
                    href={action.href}
                    key={action.label}
                    style={
                      action.primary
                        ? { background: "linear-gradient(105deg,#1d4ed8,#075fd7)", color: "#ffffff" }
                        : { color: "#172554" }
                    }
                  >
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                      style={{
                        background: action.primary ? "rgba(255,255,255,0.16)" : "#eff6ff",
                        color: action.primary ? "#ffffff" : "#1d4ed8",
                      }}
                    >
                      <ActionIcon aria-hidden="true" className="h-4.5 w-4.5" />
                    </span>
                    <span className="flex-1">{action.label}</span>
                    <ArrowRight
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/75 p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-700 shadow-lg" style={{ color: "#ffffff" }}>
                <ShieldCheck aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-black text-blue-950">Technical clarity before selection</p>
                <p className="mt-1 text-xs leading-5 text-slate-600">Application context first. Product pathway second.</p>
              </div>
            </div>
          </section>

          <section className="rounded-[1.25rem] border border-blue-200/80 bg-white/88 p-5 shadow-[0_18px_55px_rgba(30,64,175,0.10)] backdrop-blur-md sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {footerGroups.map((group) => {
                const GroupIcon = footerGroupIcons[group.title] ?? Boxes;
                return (
                  <div
                    className="group rounded-2xl border border-transparent p-4 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/65 hover:shadow-[0_16px_38px_rgba(30,64,175,0.10)]"
                    key={group.title}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 ring-1 ring-blue-100 transition duration-300 group-hover:bg-blue-700 group-hover:text-white group-hover:shadow-lg">
                        <GroupIcon aria-hidden="true" className="h-5 w-5" />
                      </span>
                      <h2 className="text-sm font-black text-blue-950">{group.title}</h2>
                    </div>
                    <div className="mt-4 h-0.5 w-9 rounded-full bg-blue-600 transition-all duration-300 group-hover:w-16" />
                    <ul className="mt-5 grid gap-3">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            className="group/link flex items-start gap-2 text-sm leading-6 text-slate-600 transition hover:text-blue-800 focus-visible:rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                            href={link.href}
                          >
                            <ArrowRight
                              aria-hidden="true"
                              className="mt-1.5 h-3.5 w-3.5 shrink-0 text-blue-500 transition-transform duration-300 group-hover/link:translate-x-0.5"
                            />
                            <span>{link.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        <section className="mt-6 grid overflow-hidden rounded-[1.15rem] border border-blue-200 bg-[linear-gradient(100deg,#f8fbff,#eaf4ff)] shadow-[0_16px_45px_rgba(30,64,175,0.08)] sm:grid-cols-2 xl:grid-cols-4">
          {trustHighlights.map((item, index) => {
            const HighlightIcon = item.icon;
            return (
              <div
                className={`flex items-center gap-4 px-5 py-5 ${index > 0 ? "border-t border-blue-200 sm:border-t-0 sm:[&:nth-child(odd)]:border-l xl:border-l" : ""}`}
                key={item.title}
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-blue-700 shadow-[0_8px_20px_rgba(30,64,175,0.10)] ring-1 ring-blue-100">
                  <HighlightIcon aria-hidden="true" className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-black text-blue-950">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-600">{item.text}</p>
                </div>
              </div>
            );
          })}
        </section>
      </Container>

      <div style={{ background: "linear-gradient(100deg,#082f73,#0f4ed0 62%,#0369a1)", color: "#ffffff" }}>
        <Container className="flex flex-col gap-4 py-5 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p style={{ color: "#dbeafe" }}>&copy; {year} Urechem Chemicals. All rights reserved.</p>
          <nav aria-label="Legal links" className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                className="transition hover:opacity-75 focus-visible:rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                href={link.href}
                key={link.href}
                style={{ color: "#ffffff" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </Container>
      </div>
    </footer>
  );
}
