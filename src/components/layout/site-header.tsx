import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="relative sticky top-0 z-40 overflow-hidden border-b border-sky-200/60 bg-white/95 shadow-[0_8px_30px_rgba(14,116,144,0.12)] backdrop-blur-md">
      {/* Static water-glass artwork: deliberately subtle so the navigation stays crisp. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(239,249,255,0.82)_52%,rgba(219,242,255,0.72))]" />

        {/* Flowing water shapes along the top and bottom edges */}
        <svg className="absolute -left-[2%] -top-8 h-28 w-[104%] text-sky-300/35" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none">
          <path d="M0 48C90 8 150 78 245 43C340 8 402 76 495 42C590 8 650 70 745 43C850 12 900 75 1000 43C1095 12 1160 72 1260 40C1340 15 1395 38 1440 20V120H0Z" fill="currentColor" />
          <path d="M0 56C95 22 155 86 250 52C345 18 405 83 500 51C595 20 655 78 750 51C855 20 905 82 1005 50C1100 20 1165 80 1265 49C1345 24 1400 46 1440 29" stroke="rgba(255,255,255,0.9)" strokeWidth="2" />
        </svg>

        <svg className="absolute -bottom-9 -left-[2%] h-28 w-[104%] text-blue-300/30" viewBox="0 0 1440 120" preserveAspectRatio="none" fill="none">
          <path d="M0 70C90 104 155 36 250 70C350 106 410 38 505 73C600 108 660 45 755 72C855 105 915 38 1010 72C1105 105 1170 45 1270 74C1350 97 1400 77 1440 91V120H0Z" fill="currentColor" />
          <path d="M0 67C95 99 160 31 255 66C350 101 415 34 510 69C605 103 665 41 760 68C855 101 920 34 1015 68C1110 101 1175 41 1275 70C1350 92 1405 73 1440 86" stroke="rgba(255,255,255,0.85)" strokeWidth="2" />
        </svg>

        {/* Soft glass pools */}
        <span className="absolute -left-20 top-1/2 h-36 w-72 -translate-y-1/2 rounded-[55%] bg-sky-200/35 blur-2xl" />
        <span className="absolute left-[25%] -top-16 h-36 w-72 rounded-full bg-cyan-200/25 blur-3xl" />
        <span className="absolute right-[20%] -bottom-20 h-44 w-80 rounded-full bg-blue-200/30 blur-3xl" />
        <span className="absolute -right-20 top-1/2 h-40 w-80 -translate-y-1/2 rounded-[55%] bg-blue-300/35 blur-2xl" />

        {/* Tiny bubbles / molecular accents */}
        <span className="absolute left-[7%] top-2 h-2 w-2 rounded-full border border-white bg-sky-300/65 shadow-[0_0_12px_rgba(56,189,248,0.55)]" />
        <span className="absolute left-[18%] bottom-2 h-1.5 w-1.5 rounded-full bg-sky-400/55" />
        <span className="absolute left-[31%] top-3 h-1.5 w-1.5 rounded-full bg-blue-300/60" />
        <span className="absolute right-[29%] bottom-2 h-2 w-2 rounded-full border border-white bg-sky-300/60" />
        <span className="absolute right-[12%] top-3 h-1.5 w-1.5 rounded-full bg-sky-400/55" />
        <span className="absolute right-[4%] top-1/2 h-10 w-10 -translate-y-1/2 rounded-full border border-white/70 bg-white/15 shadow-[inset_0_0_16px_rgba(255,255,255,0.8)]" />
        <span className="absolute right-[6.5%] top-[28%] h-3 w-3 rounded-full border border-sky-200/70 bg-white/30" />
      </div>

      <Container className="relative z-10 grid h-[4.75rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-4 lg:gap-6">
        <Link
          aria-label="Urechem Chemicals home"
          className="relative inline-flex min-w-0 items-center rounded-full border border-white/75 bg-white/45 px-2 py-1.5 shadow-[0_8px_24px_rgba(14,116,144,0.10)] backdrop-blur-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:px-3"
          href="/"
        >
          <BrandLogo priority />
        </Link>

        <DesktopNavigation />

        <div className="relative flex items-center gap-2 sm:gap-3">
          <ButtonLink className="hidden xl:inline-flex" href="/consultant" size="sm">
            <MessageSquareText aria-hidden="true" className="h-4 w-4" />
            Consultant
          </ButtonLink>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
