import Link from "next/link";
import { MessageSquareText } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function SiteHeader() {
  return (
    <header
      className="absolute inset-x-0 top-0 z-40 bg-transparent shadow-none"
      style={{
        position: "absolute",
        insetInline: 0,
        top: 0,
        backgroundColor: "transparent",
        backgroundImage: "none",
        boxShadow: "none",
        border: "none",
        backdropFilter: "none",
        WebkitBackdropFilter: "none",
      }}
    >
      <Container className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-2 bg-transparent sm:h-18 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-4 lg:gap-6">
        <Link
          aria-label="Urechem Chemicals home"
          className="group inline-flex min-w-0 items-center rounded-[var(--radius-sm)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          href="/"
        >
          <BrandLogo priority />
        </Link>

        <DesktopNavigation />

        <div className="flex items-center gap-2 sm:gap-3">
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
