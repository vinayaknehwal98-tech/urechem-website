import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="relative sticky top-0 z-40 overflow-hidden border-b border-sky-200/70 bg-[radial-gradient(ellipse_at_0%_50%,rgba(14,165,233,0.34)_0%,rgba(56,189,248,0.18)_18%,transparent_46%),radial-gradient(ellipse_at_100%_35%,rgba(37,99,235,0.30)_0%,rgba(96,165,250,0.16)_20%,transparent_48%),radial-gradient(circle_at_55%_120%,rgba(14,165,233,0.16)_0%,transparent_35%),linear-gradient(110deg,rgba(239,250,255,0.94)_0%,rgba(255,255,255,0.78)_42%,rgba(240,249,255,0.90)_100%)] shadow-[0_10px_40px_rgba(14,116,144,0.12)] backdrop-blur-xl before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-[linear-gradient(90deg,#075985_0%,#38bdf8_20%,#ffffff_42%,#2563eb_64%,#38bdf8_82%,#075985_100%)] before:content-[''] after:pointer-events-none after:absolute after:-bottom-10 after:left-[18%] after:h-24 after:w-[64%] after:rounded-[50%] after:bg-[radial-gradient(ellipse,rgba(56,189,248,0.25)_0%,rgba(125,211,252,0.13)_38%,transparent_72%)] after:blur-xl after:content-['']">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-80">
        <span className="absolute -left-8 top-1/2 h-20 w-40 -translate-y-1/2 rounded-full border border-white/70 bg-white/20 blur-[1px]" />
        <span className="absolute left-[24%] top-2 h-2 w-2 rounded-full bg-sky-300/70 shadow-[0_0_18px_rgba(56,189,248,0.9)]" />
        <span className="absolute left-[27%] bottom-2 h-1.5 w-1.5 rounded-full bg-blue-300/60" />
        <span className="absolute right-[20%] top-2 h-1.5 w-1.5 rounded-full bg-sky-300/70" />
        <span className="absolute right-[-20px] top-1/2 h-24 w-52 -translate-y-1/2 rounded-full border border-sky-200/60 bg-sky-100/20 blur-[1px]" />
      </div>

      <Container className="relative z-10 grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 sm:h-18 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-4 lg:gap-6">
        <Link
          aria-label="Urechem Chemicals home"
          className="group relative inline-flex min-w-0 items-center rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
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
