import { Suspense } from "react";
import { ValidationNote } from "@/components/catalog/cards";
import { DocumentRequestFinder } from "@/components/tools/document-request-finder";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = { title: "Assisted Document Search" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Technical Center</SectionLabel>
      <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Assisted document search</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">Search the structured catalog by product name, family or application language, then request the correct document type.</p>
      <div className="mt-6"><ValidationNote /></div>
      <Suspense fallback={<div className="mt-8 min-h-80 animate-pulse rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04]" />}>
        <DocumentRequestFinder />
      </Suspense>
    </Container>
  );
}
