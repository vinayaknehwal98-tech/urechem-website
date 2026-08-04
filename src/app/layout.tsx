import type { Metadata } from "next";
import { LeadCaptureFlyer } from "@/components/layout/lead-capture-flyer";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteMotionTempo } from "@/components/motion/site-motion-tempo";
import { SiteOpeningAnimation } from "@/components/motion/site-opening-animation";
import { SitewideCountUp } from "@/components/motion/sitewide-count-up";
import { SitewideScrollMotion } from "@/components/motion/sitewide-scroll-motion";
import "./globals.css";
import "./light-contrast.css";
import "./tpu-contrast.css";
import "./opening-animation.css";
import "./proof-backdrop.css";
import "./scrollbar-fix.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://urechem-website.vercel.app"),
  title: {
    default: "Urechem Chemicals | We deliver what we promise",
    template: "%s | Urechem Chemicals",
  },
  description:
    "Technical polyurethane and specialty-chemical solutions for application problem-solving, formulation development and implementation support.",
  applicationName: "Urechem Chemicals",
  icons: {
    icon: "/brand/urechem-logo.png",
    apple: "/brand/urechem-logo.png",
  },
  keywords: [
    "polyurethane systems",
    "spray foam",
    "polyol",
    "MDI",
    "waterproofing",
    "polyurea",
    "thermoplastic polyurethane",
    "specialty chemicals",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Urechem Chemicals",
    title: "Urechem Chemicals | We deliver what we promise",
    description:
      "Technical polyurethane and specialty-chemical solutions for real-world applications.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Urechem Chemicals — The pinnacle of polyurethane solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Urechem Chemicals | We deliver what we promise",
    description:
      "Technical polyurethane and specialty-chemical solutions for real-world applications.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link crossOrigin="anonymous" href="https://images.pexels.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://videos.pexels.com" rel="preconnect" />
        <link crossOrigin="anonymous" href="https://images.unsplash.com" rel="preconnect" />
        <link href="https://images.pexels.com" rel="dns-prefetch" />
        <link href="https://videos.pexels.com" rel="dns-prefetch" />
        <link href="https://images.unsplash.com" rel="dns-prefetch" />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-white px-4 py-3 font-semibold text-blue-950 shadow-lg transition focus:translate-y-0"
          href="#main-content"
        >
          Skip to main content
        </a>
        <noscript><style>{`.urechem-opening{display:none!important}`}</style></noscript>
        <SiteOpeningAnimation />
        <SiteMotionTempo />
        <SiteHeader />
        <LeadCaptureFlyer />
        <SitewideCountUp />
        <SitewideScrollMotion>{children}</SitewideScrollMotion>
        <SiteFooter />
      </body>
    </html>
  );
}
