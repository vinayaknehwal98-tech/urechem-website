import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { primaryNavigation } from "@/data/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/94 shadow-[0_1px_0_rgba(30,64,175,0.08),0_16px_44px_rgba(15,23,42,0.08)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/86">
      <Container className="grid h-18 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 lg:gap-6">
        <Link
          className="group flex min-w-0 items-center gap-3 rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          href="/"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-[var(--radius-sm)] border border-blue-700 bg-blue-700 text-sm font-black text-white shadow-[0_10px_28px_rgba(29,78,216,0.25)] transition group-hover:bg-blue-800">
            U
          </span>
          <span className="min-w-0">
            <span className="block text-lg font-black leading-none text-blue-950">URECHEM CHEMICAL</span>
            <span className="mt-1 block text-xs font-bold text-blue-700">We deliver what we promise</span>
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center justify-between gap-1 px-2 lg:flex xl:px-5">
          {primaryNavigation.map((item) => (
            <Link
              className="rounded-[var(--radius-sm)] px-2.5 py-2 text-[0.8125rem] font-semibold text-slate-700 transition hover:bg-blue-50 hover:text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 xl:px-3 xl:text-sm"
              href={item.href}
              key={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink className="hidden xl:inline-flex" href="/contact?type=Consultation%20request" size="sm">
            <MessageSquareText aria-hidden="true" className="h-4 w-4" />
            Consultant
          </ButtonLink>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
