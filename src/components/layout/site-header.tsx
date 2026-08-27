import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="relative sticky top-0 z-40 overflow-visible border-b border-sky-200/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(239,248,255,0.82))] shadow-[0_6px_24px_rgba(14,116,144,0.10)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_10%_50%,rgba(56,189,248,0.13),transparent_25%),radial-gradient(circle_at_82%_10%,rgba(59,130,246,0.10),transparent_28%),linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)] before:content-['']">
      <Container className="relative z-10 grid h-[4.75rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-4 lg:gap-6">
        <Link
          aria-label="Urechem Chemicals home"
          className="relative inline-flex min-w-0 items-center rounded-full border border-white/80 bg-white/35 px-2 py-1.5 shadow-[0_6px_20px_rgba(14,116,144,0.08)] backdrop-blur-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:px-3"
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
