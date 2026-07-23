import { AiChallengeInput } from "@/components/home/ai-challenge-input";
import { ValidationNote } from "@/components/catalog/cards";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = { title: "Describe Your Challenge | Urechem Chemicals" };

export default function Page() {
  return (
    <section className="relative min-h-[calc(100dvh-4.5rem)] overflow-hidden bg-[linear-gradient(135deg,#04111f,#0b2840_60%,#0b4a6f)] py-16 sm:py-20">
      <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] [background-size:24px_24px]" />
      <Container className="relative z-10">
        <SectionLabel>Technical challenge intake</SectionLabel>
        <h1 className="mt-5 max-w-5xl text-balance text-5xl font-black leading-[0.96] text-white sm:text-6xl">
          Describe your application, material or performance challenge.
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">
          Move from desired result to relevant product-family pathways without treating preliminary guidance as final engineering approval.
        </p>

        <div className="mt-10 max-w-5xl">
          <AiChallengeInput />
        </div>

        <div className="mt-6 max-w-5xl">
          <ValidationNote />
        </div>
      </Container>
    </section>
  );
}
