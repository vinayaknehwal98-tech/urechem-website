import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="relative sticky top-0 z-40 overflow-visible border-b border-blue-100/90 bg-[radial-gradient(circle_at_7%_50%,rgba(56,189,248,0.13)_0_2px,transparent_2.5px),radial-gradient(circle_at_14%_28%,rgba(37,99,235,0.08)_0_1.5px,transparent_2px),radial-gradient(circle_at_92%_48%,rgba(56,189,248,0.14)_0_2px,transparent_2.5px),radial-gradient(circle_at_84%_78%,rgba(37,99,235,0.07)_0_1.5px,transparent_2px),linear-gradient(115deg,#ffffff_0%,#fafdff_38%,#f2f8ff_72%,#ffffff_100%)] shadow-[0_1px_0_rgba(37,99,235,0.08),0_14px_34px_rgba(15,23,42,0.08)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-[linear-gradient(90deg,#0f4cbd_0%,#38bdf8_38%,#2563eb_72%,#0f4cbd_100%)] before:content-[''] after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_25%_50%,transparent_0_30%,rgba(186,230,253,0.12)_31%,transparent_55%),radial-gradient(circle_at_76%_45%,transparent_0_24%,rgba(147,197,253,0.10)_25%,transparent_50%)] after:content-['']">
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
