import { AnimatedImage } from "@/components/media/animated-image";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = { title: "Innovation and R&D | Urechem Chemicals" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[0.84fr_1.16fr]">
        <div>
          <SectionLabel>Innovation & R&amp;D</SectionLabel>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Formulation work structured around the application.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Urechem frames formulation work through problem identification, research, raw-material alignment, custom development, testing, compliance review, sample approval and delivery.</p>
        </div>
        <AnimatedImage
          alt="Polyurethane formulation specialists testing and reviewing foam samples"
          className="min-h-96"
          imageClassName="object-[45%_center]"
          sizes="(min-width: 1024px) 58vw, 100vw"
          src="/images/formulation-lab.webp"
        />
      </div>
    </Container>
  );
}
