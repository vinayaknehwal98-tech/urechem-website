import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-blue-100 bg-white/94 shadow-[0_1px_0_rgba(30,64,175,0.08),0_16px_44px_rgba(15,23,42,0.08)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/86">
      <Container className="grid h-18 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 lg:gap-6">
        <Link
          aria-label="Urechem Chemicals home"
          className="group inline-flex min-w-0 items-center rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          href="/"
        >
          <BrandLogo animateDrop priority />
        </Link>

        <DesktopNavigation />

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
