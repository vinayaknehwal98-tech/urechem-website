import Link from "next/link";
import {
  ArrowRight,
  Boxes,
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

const proofPoints = [
  { label: "Application first", icon: ShieldCheck },
  { label: "Research led", icon: FlaskConical },
  { label: "Expert reviewed", icon: Headphones },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative isolate overflow-hidden border-t border-cyan-200/20"
      style={{
        background:
          "radial-gradient(circle at 8% 5%,rgba(34,211,238,0.12),transparent 22rem),radial-gradient(circle at 92% 18%,rgba(59,130,246,0.14),transparent 24rem),linear-gradient(135deg,#03101e 0%,#071a2d 58%,#0b2840 100%)",
        color: "#ffffff",
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px,rgba(186,230,253,0.24) 1px,transparent 0)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(180deg,black 0%,transparent 72%)",
        }}
      />

      <Container className="relative py-10 sm:py-12">
        <section
          className="grid gap-7 rounded-[1.5rem] border border-cyan-100/15 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] backdrop-blur-sm sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center"
          style={{
            background:
              "linear-gradient(110deg,rgba(255,255,255,0.08),rgba(255,255,255,0.025))",
          }}
        >
          <div className="max-w-3xl">
            <div className="inline-flex rounded-xl bg-white px-3 py-2 shadow-[0_12px_35px_rgba(14,165,233,0.16)]">
              <BrandLogo className="h-11 w-[11.5rem] sm:h-12 sm:w-[13rem]" />
            </div>
            <p
              className="mt-6 text-xs font-black uppercase tracking-[0.19em]"
              style={{ color: "#67e8f9" }}
            >
              Start with the application
            </p>
            <h2
              className="mt-3 max-w-2xl text-3xl font-black leading-tight tracking-[-0.035em] sm:text-4xl"
              style={{ color: "#ffffff" }}
            >
              Let&apos;s find the right chemistry for your next challenge.
            </h2>
            <p className="mt-4 max-w-2xl leading-7" style={{ color: "#cbd5e1" }}>
              Share the substrate, process, environment and performance target. Urechem will help structure the right technical pathway.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-5 font-black shadow-[0_14px_35px_rgba(14,165,233,0.26)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(14,165,233,0.38)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              href="/contact?type=Consultation%20request"
              style={{ background: "linear-gradient(105deg,#67e8f9,#38bdf8)", color: "#082f49" }}
            >
              <Mail aria-hidden="true" className="h-4.5 w-4.5" />
              Start an enquiry
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/18 px-5 font-bold transition duration-300 hover:-translate-y-0.5 hover:border-cyan-200/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              href="/ask-urechem-ai"
              style={{ background: "rgba(255,255,255,0.055)", color: "#ffffff" }}
            >
              <Sparkles aria-hidden="true" className="h-4.5 w-4.5" style={{ color: "#67e8f9" }} />
              Ask Urechem AI
            </Link>
          </div>
        </section>

        <div className="mt-9 grid gap-9 lg:grid-cols-[0.78fr_2.22fr]">
          <section>
            <p
              className="text-xs font-black uppercase tracking-[0.18em]"
              style={{ color: "#67e8f9" }}
            >
              Urechem Chemicals
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.025em]" style={{ color: "#ffffff" }}>
              Technical clarity before product selection.
            </h3>
            <p className="mt-4 max-w-md text-sm leading-7" style={{ color: "#94a3b8" }}>
              Polyurethane and specialty-chemical solutions supported by application context, formulation work, validation and expert review.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {proofPoints.map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    className="inline-flex items-center gap-2 rounded-full border border-cyan-100/15 px-3 py-2 text-xs font-bold"
                    key={item.label}
                    style={{ background: "rgba(255,255,255,0.045)", color: "#dbeafe" }}
                  >
                    <Icon aria-hidden="true" className="h-3.5 w-3.5" style={{ color: "#67e8f9" }} />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </section>

          <nav aria-label="Footer navigation" className="grid gap-x-8 gap-y-8 sm:grid-cols-2 xl:grid-cols-4">
            {footerGroups.map((group) => {
              const Icon = footerGroupIcons[group.title] ?? Boxes;
              return (
                <section className="min-w-0" key={group.title}>
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-100/15"
                      style={{ background: "rgba(103,232,249,0.08)" }}
                    >
                      <Icon aria-hidden="true" className="h-4.5 w-4.5" style={{ color: "#67e8f9" }} />
                    </span>
                    <h3 className="font-black" style={{ color: "#ffffff" }}>
                      {group.title}
                    </h3>
                  </div>
                  <div className="mt-4 h-px w-full" style={{ background: "rgba(186,230,253,0.13)" }} />
                  <ul className="mt-4 grid gap-2.5">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          className="group flex items-start gap-2 text-sm leading-6 transition duration-200 hover:translate-x-0.5 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                          href={link.href}
                          style={{ color: "#aebdce" }}
                        >
                          <ArrowRight
                            aria-hidden="true"
                            className="mt-1.5 h-3.5 w-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                            style={{ color: "#38bdf8" }}
                          />
                          <span className="transition-colors duration-200 group-hover:text-cyan-100">{link.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </nav>
        </div>

        <div
          className="mt-10 flex flex-col gap-4 border-t pt-5 text-sm sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "rgba(186,230,253,0.13)", color: "#94a3b8" }}
        >
          <p>&copy; {year} Urechem Chemicals. All rights reserved.</p>
          <nav aria-label="Legal links" className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                className="transition hover:text-cyan-100 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
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
