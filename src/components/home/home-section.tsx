import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils";

type HomeSectionProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export function HomeSection({ eyebrow, title, intro, children, className, id }: HomeSectionProps) {
  return (
    <section
      className={cn("relative scroll-mt-24 overflow-hidden border-t border-white/10 py-20 sm:py-24", className)}
      id={id}
    >
      <Container className="relative z-10">
        <div className="mb-10 max-w-3xl">
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2 className="mt-5 text-balance text-4xl font-black leading-tight text-white sm:text-5xl">{title}</h2>
          {intro ? <p className="mt-4 text-lg leading-8 text-slate-300">{intro}</p> : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
