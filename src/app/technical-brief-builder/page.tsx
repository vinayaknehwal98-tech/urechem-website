import { ValidationNote } from "@/components/catalog/cards";
import { TechnicalBriefBuilder } from "@/components/tools/technical-brief-builder";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = { title: "Technical Brief Builder" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Structured enquiry</SectionLabel>
      <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Technical brief builder</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">Organize application context, process conditions and performance goals into a concise brief for Urechem review.</p>
      <div className="mt-6"><ValidationNote /></div>
      <TechnicalBriefBuilder />
    </Container>
  );
}
