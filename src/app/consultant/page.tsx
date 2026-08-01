import { Suspense } from "react";
import { CheckCircle2, ClipboardCheck, MessagesSquare } from "lucide-react";
import { ContactEnquiryForm } from "@/components/contact/contact-enquiry-form";
import { AnimatedImage } from "@/components/media/animated-image";
import { Container } from "@/components/ui/container";

export const metadata = { title: "Technical Consultant" };

const consultationSteps = [
  [MessagesSquare, "Describe the challenge", "Share the application, material, environment and performance goal."],
  [ClipboardCheck, "Structure the requirement", "Create a focused consultation brief for the appropriate Urechem team."],
  [CheckCircle2, "Plan expert review", "Use the brief to confirm the suitable technical and validation next step."],
] as const;

export default function Page() {
  return (
    <section className="bg-[linear-gradient(180deg,#f8fbff,#eaf4ff)] py-16 sm:py-20">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">Technical consultation</p>
            <h1 className="mt-4 text-4xl font-black tracking-[-0.04em] text-blue-950 sm:text-5xl">
              Speak with a Urechem consultant.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
              Bring a polyurethane, specialty-chemical or application challenge to a dedicated consultation pathway.
              Your request will be structured for the appropriate technical review.
            </p>

            <div className="mt-8 grid gap-3">
              {consultationSteps.map(([Icon, title, description], index) => (
                <div
                  className="grid grid-cols-[auto_1fr] gap-4 rounded-[var(--radius-md)] border border-blue-100 bg-white/80 p-4 shadow-[0_12px_34px_rgba(30,64,175,0.07)]"
                  key={title}
                >
                  <span className="grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] bg-blue-50 text-blue-700">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-black text-blue-950">
                      <span className="mr-2 font-mono text-xs text-blue-600">0{index + 1}</span>
                      {title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <AnimatedImage
            alt="An application engineer and technical chemist reviewing polyurethane materials at an industrial construction site"
            className="min-h-[28rem]"
            imageClassName="object-center"
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            src="/images/application-engineering.webp"
          />
        </div>

        <div className="mt-12 border-t border-blue-200 pt-10">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-blue-700">Consultation request</p>
            <h2 className="mt-3 text-3xl font-black text-blue-950">Prepare your technical conversation.</h2>
            <p className="mt-3 leading-7 text-slate-700">
              Add enough context for Urechem to understand the requirement before an expert review.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="mt-8 min-h-96 animate-pulse rounded-[var(--radius-lg)] border border-blue-200 bg-white shadow-[0_18px_55px_rgba(30,64,175,0.09)]" />
            }
          >
            <ContactEnquiryForm fixedType="Consultation request" />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
