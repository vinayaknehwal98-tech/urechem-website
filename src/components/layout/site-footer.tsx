import Link from "next/link";
import {
  ArrowRight,
  Droplets,
  Headphones,
  Mail,
  Sparkles,
} from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { Container } from "@/components/ui/container";
import { footerGroups, legalLinks } from "@/data/navigation";

const footerActions = [
  {
    label: "Technical enquiry",
    href: "/contact?type=Consultation%20request",
    icon: Mail,
  },
  {
    label: "Speak to an expert",
    href: "/contact?type=Consultation%20request",
    icon: Headphones,
  },
  {
    label: "Ask Urechem AI",
    href: "/ask-urechem-ai",
    icon: Sparkles,
  },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative isolate overflow-hidden border-t border-blue-100 text-slate-700"
      style={{
        background:
          "radial-gradient(circle at 7% 12%,rgba(14,165,233,0.12),transparent 22rem),radial-gradient(circle at 94% 18%,rgba(37,99,235,0.10),transparent 24rem),linear-gradient(180deg,#eef6fb 0%,#e7f1f7 100%)",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-10 h-40 w-40 rounded-full border border-blue-300/25"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-12 top-24 h-52 w-52 rounded-full border border-cyan-300/20"
      />

      <Container className="relative py-12 sm:py-16">
        <div className="grid gap-x-10 gap-y-12 xl:grid-cols-[1.15fr_1.15fr_0.9fr_0.95fr_0.9fr]">
          <section className="max-w-sm">
            <Link
              className="group inline-flex rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
              href="/"
            >
              <BrandLogo className="h-14 w-[13rem] sm:h-16 sm:w-[15rem]" />
            </Link>

            <div className="relative mt-7 flex h-36 w-full max-w-[16rem] items-center justify-center overflow-hidden rounded-[1.4rem] border border-blue-200/80 bg-white/72 shadow-[0_18px_45px_rgba(30,64,175,0.10)]">
              <div className="absolute -left-8 -top-8 h-24 w-24 rounded-full bg-cyan-200/40" />
              <div className="absolute -bottom-10 -right-10 h-32 w-32 rounded-full bg-blue-200/35" />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-blue-700 shadow-[0_16px_34px_rgba(29,78,216,0.28)]">
                <Droplets aria-hidden="true" className="h-9 w-9 text-white" />
              </span>
              <span className="absolute left-8 top-7 h-3 w-3 rounded-full bg-cyan-400" />
              <span className="absolute right-10 top-8 h-4 w-4 rounded-full bg-blue-300" />
              <span className="absolute bottom-7 left-12 h-2.5 w-2.5 rounded-full bg-blue-400" />
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-600">
              Technical polyurethane and specialty-chemical solutions for application problem-solving, formulation support, validation and supply.
            </p>
          </section>

          {footerGroups.map((group) => (
            <section className="min-w-0" key={group.title}>
              <h2 className="text-base font-black tracking-[-0.015em] text-blue-950">{group.title}</h2>
              <div className="mt-3 h-0.5 w-10 rounded-full bg-blue-600" />
              <ul className="mt-5 grid gap-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      className="group flex items-start gap-2 text-sm leading-6 text-slate-600 transition duration-200 hover:translate-x-0.5 hover:text-blue-800 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                      href={link.href}
                    >
                      <ArrowRight
                        aria-hidden="true"
                        className="mt-1.5 h-3.5 w-3.5 shrink-0 text-blue-500 transition-transform duration-200 group-hover:translate-x-0.5"
                      />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-blue-200/80 pt-7 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {footerActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  className="group inline-flex min-h-11 items-center gap-2 rounded-full border border-blue-200 bg-white/72 px-4 text-sm font-bold text-blue-950 shadow-[0_8px_22px_rgba(30,64,175,0.08)] transition duration-200 hover:-translate-y-0.5 hover:border-blue-400 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                  href={action.href}
                  key={action.label}
                >
                  <Icon aria-hidden="true" className="h-4 w-4 text-blue-600" />
                  {action.label}
                </Link>
              );
            })}
          </div>

          <p className="text-sm font-black tracking-[0.08em] text-blue-800">WE DELIVER WHAT WE PROMISE.</p>
        </div>

        <div className="mt-7 flex flex-col gap-4 border-t border-blue-200/80 pt-5 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
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
