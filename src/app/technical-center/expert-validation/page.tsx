import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ValidationNote } from "@/components/catalog/cards";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = { title: "Expert Validation" };

export default function Page() {
  const reviewInputs = [
    "Application and end-use context",
    "Substrate or material compatibility",
    "Operating environment and exposure",
    "Processing or installation constraints",
    "Target performance and acceptance criteria",
    "Required technical, safety or compliance documents",
  ];

  return (
    <Container className="py-16 sm:py-20">
      <SectionLabel>Technical Center</SectionLabel>
      <h1 className="mt-5 text-4xl font-black tracking-[-0.04em] sm:text-5xl">Expert validation</h1>
      <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">Turn preliminary catalog guidance into a reviewable application brief for qualified Urechem stakeholders.</p>
      <div className="mt-6"><ValidationNote /></div>
      <section className="mt-10 rounded-[var(--radius-lg)] border border-white/10 bg-navy-900/80 p-5 shadow-[var(--shadow-soft)] sm:p-7">
        <h2 className="text-2xl font-semibold text-white">Information to prepare</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {reviewInputs.map((item) => (
            <li className="flex items-start gap-3 rounded-[var(--radius-md)] border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-200" key={item}>
              <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-turquoise-300" />
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/technical-brief-builder">
            Build review brief
            <ArrowRight aria-hidden="true" className="size-4" />
          </ButtonLink>
          <ButtonLink href="/contact?type=Consultation%20request" variant="secondary">
            Request expert review
          </ButtonLink>
        </div>
      </section>
    </Container>
  );
}
