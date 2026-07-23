import { AnimatedImage } from "@/components/media/animated-image";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = { title: "About Urechem" };

export default function Page() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <div>
          <SectionLabel>About Urechem</SectionLabel>
          <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Technical chemistry connected to real applications.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-300">Urechem is positioned as a polyurethane and specialty-chemical solutions partner for application problem-solving, formulation development, implementation support, quality validation and supply.</p>
        </div>
        <AnimatedImage
          alt="Urechem chemists and application engineers collaborating over polyurethane material samples"
          className="min-h-96"
          imageClassName="object-[65%_center]"
          sizes="(min-width: 1024px) 58vw, 100vw"
          src="/images/urechem-team.webp"
        />
      </div>
    </Container>
  );
}
