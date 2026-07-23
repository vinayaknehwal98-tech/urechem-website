import Link from "next/link";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = { title: "Legal Notice" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Legal notice</h1>
      <div className="mt-8 max-w-4xl space-y-8 text-base leading-8 text-slate-300">
        <section>
          <h2 className="text-2xl font-semibold text-white">Website operator</h2>
          <p className="mt-3">This website is operated for Urechem Chemicals as a public product-discovery and technical-enquiry resource.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white">Technical content</h2>
          <p className="mt-3">Product names and reference descriptors are presented from supplied project materials. Current specifications, documents, availability and application suitability must be confirmed directly with Urechem before use.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white">Contact</h2>
          <p className="mt-3">For website, commercial or technical enquiries, use the <Link className="font-semibold text-cyan-100 underline underline-offset-4" href="/contact">Urechem contact pathway</Link>.</p>
        </section>
      </div>
    </Container>
  );
}
