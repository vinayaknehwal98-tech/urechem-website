import Link from "next/link";
import { Sparkles } from "lucide-react";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryNavigation } from "@/data/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-cyan-200/10 bg-navy-950/86 shadow-[0_1px_0_rgba(255,255,255,0.04),0_18px_54px_rgba(0,0,0,0.18)] backdrop-blur-xl supports-[backdrop-filter]:bg-navy-950/72">
      <Container className="flex h-18 items-center justify-between gap-4 lg:gap-5">
        <Link
          className="group flex min-w-0 items-center gap-3 rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
          href="/"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-cyan-200/25 bg-cyan-300/10 text-sm font-black text-cyan-100 shadow-[var(--shadow-cyan)] transition group-hover:border-cyan-100/50">
            U
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-black leading-none text-white">URECHEM</span>
            <span className="mt-1 block text-xs font-medium text-cyan-100/80">Polyurethane Intelligence</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1">
          {primaryNavigation.map((item) => (
            <Link
              className="rounded-[var(--radius-sm)] px-2.5 py-2 text-[0.8125rem] font-semibold text-slate-200 transition hover:bg-white/7 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200 xl:px-3 xl:text-sm"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink className="hidden xl:inline-flex" href="/ask-urechem-ai" size="sm">
            <Sparkles aria-hidden="true" className="h-4 w-4" />
            Ask Urechem AI
          </ButtonLink>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
