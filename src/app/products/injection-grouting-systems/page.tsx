import { ArrowRight, CheckCircle2, Droplets, ShieldAlert } from "lucide-react";
import { GroutingApplicationVisual } from "@/components/media/grouting-application-visual";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { injectionGroutingProfiles, injectionGroutingSourceNote } from "@/data/injection-grouting";

export const metadata = {
  title: "Injection Grouting Systems",
  description:
    "Explore Urechem Chemicals enquiry pathways for polyurethane and polyurea-silicate injection grouting, water stopping, void filling, ground consolidation and slab stabilisation.",
};

export default function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-cyan-200/15 bg-[linear-gradient(135deg,#03101e,#09263e_55%,#075985)] py-18 sm:py-24">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.32)_1px,transparent_0)] [background-size:26px_26px]" />
        <Container className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <SectionLabel>Ground support and water control</SectionLabel>
              <h1 className="mt-6 max-w-5xl text-balance text-5xl font-black leading-[0.98] tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl">
                Injection grouting systems
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">
                Source-backed polyurethane and polyurea-silicate pathways for water stopping, crack and joint sealing, void filling, soil and rock consolidation, slab lifting and structural stabilisation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href="/contact?type=Consultation%20request&product=Injection%20grouting%20systems" size="lg">
                  Discuss a grouting requirement
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/technical-brief-builder" size="lg" variant="secondary">
                  Build a technical brief
                </ButtonLink>
              </div>
            </div>
            <GroutingApplicationVisual />
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,#f8fbff,#eaf4ff)] py-16 sm:py-20">
        <Container>
          <div className="rounded-[var(--radius-lg)] border border-amber-200 bg-amber-50 p-5 text-sm leading-7 text-amber-950 sm:p-6">
            <div className="flex gap-3">
              <ShieldAlert aria-hidden="true" className="mt-1 h-5 w-5 shrink-0" />
              <p>
                <strong>Public naming boundary:</strong> {injectionGroutingSourceNote}
              </p>
            </div>
          </div>

          <div className="mt-12 max-w-4xl">
            <SectionLabel>Reference profiles</SectionLabel>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.035em] text-blue-950 sm:text-5xl">
              Match chemistry and reaction behaviour to the site condition
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-700">
              The profiles below preserve distinct technical information from the supplied source without presenting unapproved grade names, certifications or engineering design values as final Urechem claims.
            </p>
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-2">
            {injectionGroutingProfiles.map((profile) => (
              <article
                className="overflow-hidden rounded-[var(--radius-lg)] border border-blue-200 bg-white shadow-[0_18px_55px_rgba(30,64,175,0.08)]"
                key={profile.code}
              >
                <div className="border-b border-blue-100 bg-[linear-gradient(135deg,#eff6ff,#ecfeff)] p-6 sm:p-7">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <Droplets aria-hidden="true" className="h-7 w-7 text-blue-700" />
                    <span className="rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-black uppercase tracking-[0.13em] text-blue-800">
                      {profile.components}
                    </span>
                  </div>
                  <h3 className="mt-5 text-2xl font-black text-blue-950 sm:text-3xl">{profile.code}</h3>
                  <p className="mt-3 font-semibold leading-7 text-blue-900">{profile.chemistry}</p>
                  <dl className="mt-5 grid gap-3 text-sm leading-6 text-slate-700 sm:grid-cols-2">
                    <div className="rounded-2xl border border-blue-100 bg-white p-4">
                      <dt className="font-black text-blue-950">Response</dt>
                      <dd className="mt-1">{profile.response}</dd>
                    </div>
                    <div className="rounded-2xl border border-blue-100 bg-white p-4">
                      <dt className="font-black text-blue-950">Cured profile</dt>
                      <dd className="mt-1">{profile.curedProfile}</dd>
                    </div>
                  </dl>
                </div>

                <div className="grid gap-7 p-6 sm:p-7 md:grid-cols-2">
                  <div>
                    <h4 className="font-black text-blue-950">Reference benefits</h4>
                    <ul className="mt-4 grid gap-3">
                      {profile.benefits.map((benefit) => (
                        <li className="flex gap-3 text-sm leading-6 text-slate-700" key={benefit}>
                          <CheckCircle2 aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-black text-blue-950">Application pathways</h4>
                    <ul className="mt-4 grid gap-3">
                      {profile.applications.map((application) => (
                        <li className="flex gap-3 text-sm leading-6 text-slate-700" key={application}>
                          <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-blue-700" />
                          {application}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="border-t border-amber-200 bg-amber-50 px-6 py-4 text-sm leading-6 text-amber-950 sm:px-7">
                  <strong>Validation required:</strong> {profile.validationNote}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-[var(--radius-lg)] border border-blue-200 bg-white p-6 shadow-[0_18px_55px_rgba(30,64,175,0.08)] sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.16em] text-blue-700">Selection inputs</p>
              <h2 className="mt-2 max-w-3xl text-2xl font-black text-blue-950 sm:text-3xl">
                Share the substrate, crack width, water flow, pressure, temperature, access and injection equipment.
              </h2>
            </div>
            <ButtonLink className="mt-6 shrink-0 sm:mt-0" href="/contact?type=TDS%20request&product=Injection%20grouting%20systems" size="lg">
              Ask for technical documents
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
