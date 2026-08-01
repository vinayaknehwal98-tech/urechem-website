import { ValidationNote } from "@/components/catalog/cards";
import { UrechemAiAssistant } from "@/components/tools/urechem-ai-assistant";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = { title: "Ask Urechem AI" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Guided technical discovery</SectionLabel>
      <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-0.04em] text-white sm:text-5xl">Ask Urechem AI</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
        Ask a direct question about an application, product-family pathway or technical document. The assistant responds conversationally using Urechem&apos;s published catalog relationships.
      </p>
      <div className="mt-6"><ValidationNote /></div>
      <div className="mt-8"><UrechemAiAssistant /></div>
    </Container>
  );
}
