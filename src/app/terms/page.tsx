import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = { title: "Terms of Use" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Terms of use</h1>
      <div className="mt-8 max-w-4xl space-y-8 text-base leading-8 text-slate-300">
        <section>
          <h2 className="text-2xl font-semibold text-white">General information</h2>
          <p className="mt-3">This website provides product-family discovery, application pathways and structured enquiry tools for Urechem Chemicals. Content may be updated as technical and commercial information is reviewed.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white">No final engineering approval</h2>
          <p className="mt-3">Catalog relationships, comparisons, guided results and generated briefs are preliminary. They do not replace a current technical data sheet, safety data sheet, project-specific assessment or approval by qualified Urechem stakeholders.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white">Safe and suitable use</h2>
          <p className="mt-3">Users must obtain and review current technical, safety, processing and compliance information before purchasing, specifying, handling or applying any product. Product suitability depends on the application, substrate, environment, process and applicable requirements.</p>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-white">Website availability</h2>
          <p className="mt-3">Urechem may revise, suspend or remove website content and tools as information changes. External email or communication services remain subject to the terms of their providers.</p>
        </section>
      </div>
    </Container>
  );
}
