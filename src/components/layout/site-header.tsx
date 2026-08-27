import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="relative sticky top-0 z-40 overflow-visible border-b border-sky-200/80 bg-[radial-gradient(ellipse_at_4%_45%,rgba(56,189,248,0.30)_0%,rgba(125,211,252,0.16)_16%,transparent_38%),radial-gradient(ellipse_at_96%_55%,rgba(37,99,235,0.22)_0%,rgba(96,165,250,0.12)_18%,transparent_40%),radial-gradient(circle_at_25%_110%,rgba(14,165,233,0.10)_0%,transparent_25%),radial-gradient(circle_at_75%_-30%,rgba(59,130,246,0.10)_0%,transparent_28%),linear-gradient(135deg,#f4fbff_0%,#ffffff_38%,#f7fbff_62%,#edf7ff_100%)] shadow-[0_1px_0_rgba(37,99,235,0.12),0_14px_34px_rgba(15,23,42,0.10)] before:absolute before:inset-x-0 before:top-0 before:h-[3px] before:bg-[linear-gradient(90deg,#075985_0%,#38bdf8_24%,#2563eb_52%,#38bdf8_78%,#075985_100%)] before:content-[''] after:pointer-events-none after:inset-0 after:absolute after:opacity-70 after:bg-[radial-gradient(circle_at_8%_50%,#38bdf8_0_3px,transparent_4px),radial-gradient(circle_at_12%_28%,#60a5fa_0_2px,transparent_3px),radial-gradient(circle_at_17%_70%,#7dd3fc_0_2px,transparent_3px),radial-gradient(circle_at_84%_30%,#60a5fa_0_2px,transparent_3px),radial-gradient(circle_at_89%_68%,#38bdf8_0_3px,transparent_4px),radial-gradient(circle_at_94%_45%,#7dd3fc_0_2px,transparent_3px),linear-gradient(155deg,transparent 0 43%,rgba(56,189,248,0.08) 43.2% 43.5%,transparent 43.7% 100%)] after:content-['']">
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
