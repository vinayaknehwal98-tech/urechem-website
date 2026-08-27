import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="relative sticky top-0 z-40 overflow-visible border-b border-sky-200/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(239,248,255,0.68))] shadow-[0_5px_22px_rgba(14,116,144,0.08)] backdrop-blur-xl before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_7%_50%,rgba(56,189,248,0.18)_0,rgba(56,189,248,0.08)_8%,transparent_19%),radial-gradient(circle_at_93%_45%,rgba(37,99,235,0.13)_0,rgba(37,99,235,0.05)_9%,transparent_20%),radial-gradient(circle_at_24%_18%,rgba(255,255,255,0.72)_0,transparent_17%),radial-gradient(circle_at_76%_80%,rgba(125,211,252,0.10)_0,transparent_20%)] before:content-[''] after:pointer-events-none after:absolute after:inset-x-[12%] after:bottom-0 after:h-px after:bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.38),rgba(37,99,235,0.24),transparent)] after:content-['']">
      <Container className="relative z-10 grid h-[4.75rem] grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-4 lg:gap-6">
        <Link
          aria-label="Urechem Chemicals home"
          className="relative inline-flex min-w-0 items-center rounded-full border border-white/75 bg-white/30 px-2 py-1.5 shadow-[0_6px_20px_rgba(14,116,144,0.06)] backdrop-blur-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 sm:px-3"
          href="/"
        >
          <BrandLogo priority />
        </Link>

        <DesktopNavigation />

        <div className="relative z-30 flex items-center gap-2 sm:gap-3">
          <ButtonLink
            aria-label="Talk to a Urechem consultant"
            className="hidden xl:inline-flex"
            href="/consultant"
            size="sm"
          >
            <MessageSquareText aria-hidden="true" className="h-4 w-4" />
            Consultant
          </ButtonLink>
          <MobileNavigation />
        </div>
      </Container>
    </header>
  );
}
