import type { Metadata } from "next";
import { LeadCaptureFlyer } from "@/components/layout/lead-capture-flyer";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Urechem Chemicals | Polyurethane Intelligence",
  description:
    "Technical polyurethane and specialty-chemical solutions for application problem-solving, formulation development and implementation support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <SiteHeader />
        <LeadCaptureFlyer />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
