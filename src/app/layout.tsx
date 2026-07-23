import type { Metadata } from "next";
import { LeadCaptureFlyer } from "@/components/layout/lead-capture-flyer";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://urechem-website.vercel.app"),
  title: {
    default: "Urechem Chemicals | We deliver what we promise",
    template: "%s | Urechem Chemicals",
  },
  description:
    "Technical polyurethane and specialty-chemical solutions for application problem-solving, formulation development and implementation support.",
  applicationName: "Urechem Chemicals",
  keywords: [
    "polyurethane systems",
    "spray foam",
    "polyol",
    "MDI",
    "waterproofing",
    "polyurea",
    "specialty chemicals",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Urechem Chemicals",
    title: "Urechem Chemicals | We deliver what we promise",
    description:
      "Technical polyurethane and specialty-chemical solutions for real-world applications.",
    images: [{ url: "/brand/urechem-logo.png", alt: "Urechem Chemicals" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Urechem Chemicals | We deliver what we promise",
    description:
      "Technical polyurethane and specialty-chemical solutions for real-world applications.",
    images: ["/brand/urechem-logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-md bg-white px-4 py-3 font-semibold text-blue-950 shadow-lg transition focus:translate-y-0"
          href="#main-content"
        >
          Skip to main content
        </a>
        <SiteHeader />
        <LeadCaptureFlyer />
        <main className="flex-1" id="main-content" tabIndex={-1}>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
