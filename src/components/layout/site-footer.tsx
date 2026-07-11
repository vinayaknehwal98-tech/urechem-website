import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { footerGroups, legalLinks } from "@/data/navigation";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-navy-950 text-slate-300">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Link
              className="inline-flex items-center gap-3 rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              href="/"
            >
              <span className="grid h-11 w-11 place-items-center rounded-[var(--radius-sm)] border border-cyan-200/25 bg-cyan-300/10 text-sm font-black text-cyan-100 shadow-[var(--shadow-cyan)]">
                U
              </span>
              <span>
                <span className="block text-lg font-black leading-none text-white">URECHEM</span>
                <span className="mt-1 block text-xs font-medium text-cyan-100/80">Polyurethane Intelligence</span>
              </span>
            </Link>
            <p className="mt-6 max-w-md text-sm leading-7">
              Urechem is a technical polyurethane and specialty-chemical solutions partner for application
              problem-solving, formulation development, implementation support, quality validation and supply.
            </p>
            <p className="mt-4 max-w-md rounded-[var(--radius-md)] border border-amber-300/24 bg-amber-300/8 px-4 py-3 text-sm leading-6 text-amber-100">
              Contact details are awaiting client confirmation and should not be published until validated.
            </p>
            <ButtonLink className="mt-6" href="/ask-urechem-ai" variant="secondary">
              <Sparkles aria-hidden="true" className="h-4 w-4" />
              Ask Urechem AI
            </ButtonLink>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <h2 className="font-mono text-xs font-semibold uppercase text-cyan-100">{group.title}</h2>
                <ul className="mt-4 grid gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        className="text-sm leading-6 text-slate-300 transition hover:text-cyan-100 focus-visible:rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                        href={link.href}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {year} Urechem Chemicals. All rights reserved.</p>
          <nav aria-label="Legal links" className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link
                className="transition hover:text-cyan-100 focus-visible:rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
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
