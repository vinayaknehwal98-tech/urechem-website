import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="relative sticky top-0 z-40 overflow-hidden border-b border-white/50 bg-[radial-gradient(circle_at_8%_50%,rgba(56,189,248,0.34)_0_2%,transparent_15%),radial-gradient(circle_at_30%_110%,rgba(14,165,233,0.20)_0_3%,transparent_18%),radial-gradient(circle_at_72%_-30%,rgba(96,165,250,0.28)_0_4%,transparent_22%),radial-gradient(circle_at_96%_55%,rgba(37,99,235,0.30)_0_3%,transparent_18%),linear-gradient(115deg,rgba(224,247,255,0.62),rgba(255,255,255,0.30)_42%,rgba(219,242,255,0.56))] shadow-[0_10px_36px_rgba(14,116,144,0.14)] backdrop-blur-md before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-[linear-gradient(90deg,rgba(7,89,133,0.9),rgba(56,189,248,0.95),rgba(255,255,255,0.95),rgba(37,99,235,0.95),rgba(56,189,248,0.95),rgba(7,89,133,0.9))] before:content-[''] after:pointer-events-none after:absolute after:-right-16 after:-top-20 after:h-48 after:w-72 after:rounded-full after:border after:border-white/35 after:bg-white/10 after:blur-sm after:content-['']">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -left-10 top-1/2 h-24 w-48 -translate-y-1/2 rounded-full border border-white/65 bg-white/18 shadow-[inset_0_0_28px_rgba(255,255,255,0.35)]" />
        <span className="absolute left-[7%] top-3 h-2 w-2 rounded-full bg-white/80 shadow-[0_0_16px_rgba(56,189,248,0.95)]" />
        <span className="absolute left-[18%] bottom-3 h-1.5 w-1.5 rounded-full bg-sky-300/75" />
        <span className="absolute left-[31%] top-2 h-1.5 w-1.5 rounded-full bg-blue-300/70" />
        <span className="absolute right-[28%] bottom-2 h-2 w-2 rounded-full bg-white/75 shadow-[0_0_14px_rgba(56,189,248,0.8)]" />
        <span className="absolute right-[12%] top-3 h-1.5 w-1.5 rounded-full bg-sky-300/75" />
        <span className="absolute -right-12 top-1/2 h-24 w-52 -translate-y-1/2 rounded-full border border-sky-100/65 bg-sky-100/15 shadow-[inset_0_0_30px_rgba(125,211,252,0.25)]" />
        <span className="absolute left-[43%] top-1/2 h-px w-28 bg-gradient-to-r from-transparent via-white/55 to-transparent" />
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
