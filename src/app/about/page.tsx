import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Beaker,
  Boxes,
  CheckCircle2,
  ClipboardCheck,
  Compass,
  FlaskConical,
  Handshake,
  HeartHandshake,
  Lightbulb,
  Microscope,
  PackageCheck,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";
import { AnimatedImage } from "@/components/media/animated-image";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";

export const metadata = {
  title: "About Urechem",
  description:
    "Meet Urechem Chemicals: a research-led polyurethane and specialty-chemical solutions partner supporting projects from problem identification to delivery.",
};

type IconItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const metrics = [
  { value: "40+", label: "Projects successfully executed" },
  { value: "50+", label: "Projects delivered on time" },
  { value: "28+", label: "Brands owned by Urechem Chemicals" },
  { value: "20,000+", label: "Man-hours invested in R&D" },
  { value: "150+", label: "Years of cumulative experience" },
  { value: "25+", label: "Experienced professionals" },
  { value: "6+", label: "Industries served with expertise" },
  { value: "20%", label: "Increased profits for clients" },
];

const commitments: IconItem[] = [
  {
    title: "Commitment",
    description:
      "High-quality, cost-effective and safety-enhancing solutions for sub-surface and specialist PU projects.",
    icon: ShieldCheck,
  },
  {
    title: "Strong relationships",
    description:
      "Trust-based, long-term collaboration with clients and vendor partners.",
    icon: Handshake,
  },
  {
    title: "Pride and growth",
    description:
      "We take pride in the achievements of our people, clients and partners—and keep raising the standard together.",
    icon: Sparkles,
  },
  {
    title: "Agility and focus",
    description:
      "Motivated, customer-centric teams move quickly from a defined problem to an effective technical route.",
    icon: Zap,
  },
  {
    title: "Integrity and fairness",
    description:
      "Transparent, fair and excellence-led conduct across every client, partner and employee relationship.",
    icon: BadgeCheck,
  },
];

const values: IconItem[] = [
  {
    title: "Focused leadership",
    description: "Create clarity, align the team and enable people to perform at their best.",
    icon: Target,
  },
  {
    title: "Strategic thinking",
    description: "Make deliberate choices that connect technical effort to meaningful client value.",
    icon: Compass,
  },
  {
    title: "Innovation",
    description: "Turn research, insight and experimentation into useful solutions for real applications.",
    icon: Lightbulb,
  },
  {
    title: "Agility",
    description: "Learn quickly, adapt with purpose and respond decisively as project needs change.",
    icon: Zap,
  },
  {
    title: "Dependability",
    description: "Build trust through consistent follow-through, technical discipline and responsible delivery.",
    icon: HeartHandshake,
  },
];

const services: IconItem[] = [
  {
    title: "Understand your need",
    description: "We begin with the application, constraints and outcome you need to achieve.",
    icon: SearchCheck,
  },
  {
    title: "Qualified site visits",
    description: "Trained technical professionals evaluate the conditions surrounding the problem.",
    icon: Users,
  },
  {
    title: "Custom solution design",
    description: "A solution route is shaped around the specific issue rather than a standard catalogue answer.",
    icon: FlaskConical,
  },
  {
    title: "Product solution and supply",
    description: "The selected chemistry is connected to a practical and coordinated supply pathway.",
    icon: Boxes,
  },
  {
    title: "Applicator methodology",
    description: "We develop a clear application method supported by current tools and software.",
    icon: ClipboardCheck,
  },
  {
    title: "Structured quality control",
    description: "267 checkpoints and 24 checklists help keep quality visible throughout the process.",
    icon: CheckCircle2,
  },
  {
    title: "On-site technical support",
    description: "Application and technical guidance continues where it matters most—at the site.",
    icon: Beaker,
  },
  {
    title: "Always available",
    description: "Urechem support is available 24 hours a day, 7 days a week, 365 days a year.",
    icon: PackageCheck,
  },
];

const workflow = [
  {
    title: "Client problem identified",
    description: "Understand the issue, operating context and performance requirements.",
  },
  {
    title: "Research and solution search",
    description: "Explore relevant chemistry routes and solution references from across the world.",
  },
  {
    title: "Raw-material procurement",
    description: "Source the inputs required for the selected technical direction.",
  },
  {
    title: "Customized product development",
    description: "Formulate and test candidate products around the client application.",
  },
  {
    title: "Third-party testing",
    description: "Support independent testing where it is required for the project.",
  },
  {
    title: "Certification and compliance",
    description: "Address relevant standards and project-specific compliance steps where applicable.",
  },
  {
    title: "Client sample approval",
    description: "Submit candidate samples for client review, validation and feedback.",
  },
  {
    title: "Final product delivery",
    description: "Deliver the approved product route with implementation coordination.",
  },
];

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <Reveal className="max-w-3xl">
      <SectionLabel>{eyebrow}</SectionLabel>
      <h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? <p className="mt-5 text-lg leading-8 text-slate-300">{description}</p> : null}
    </Reveal>
  );
}

export default function Page() {
  return (
    <div className="overflow-hidden">
      <section className="relative isolate border-b border-white/8 py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_12%_18%,rgba(34,211,238,0.16),transparent_28%),radial-gradient(circle_at_88%_76%,rgba(45,212,191,0.1),transparent_28%)]" />
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-14">
            <Reveal>
              <SectionLabel>About Urechem</SectionLabel>
              <h1 className="mt-5 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl lg:text-6xl">
                Technical chemistry connected to real applications.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Urechem Chemicals develops high-performance polyurethane and specialty-chemical solutions for
                projects across India, including ground-support and sub-surface applications. We connect application
                problem-solving, formulation development, implementation support, quality validation and supply in
                one technical partnership.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg">
                  Discuss a Project
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/technical-center" size="lg" variant="secondary">
                  Explore Technical Center
                </ButtonLink>
              </div>
            </Reveal>

            <div className="relative">
              <AnimatedImage
                alt="Urechem technical team reviewing polyurethane and construction material samples"
                className="min-h-[28rem]"
                imageClassName="object-[58%_center]"
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                src="/images/urechem-team.webp"
              />
              <Reveal
                className="relative -mt-16 ml-4 max-w-sm rounded-[var(--radius-lg)] border border-cyan-200/20 bg-navy-950/92 p-5 shadow-[var(--shadow-deep)] backdrop-blur sm:ml-auto sm:mr-6"
                delay={0.16}
                distance={20}
              >
                <p className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
                  Our direction
                </p>
                <p className="mt-2 text-lg font-black leading-7 text-white">
                  To be a globally preferred partner for specialty-chemical solutions.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[linear-gradient(180deg,rgba(7,26,45,0.92),rgba(4,17,31,1))] py-16 sm:py-20" id="numbers">
        <Container>
          <div className="grid items-end gap-6 lg:grid-cols-[1fr_0.72fr]">
            <SectionHeading
              description="A combined measure of the projects, research effort, professional experience and sector reach behind Urechem's technical work."
              eyebrow="Urechem in numbers"
              title="Experience you can see. Delivery you can measure."
            />
            <Reveal className="lg:pb-2 lg:text-right" delay={0.08}>
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.14em] text-turquoise-300">
                Trusted by India&apos;s leading brands
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-400">The pinnacle of PU solutions.</p>
            </Reveal>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, index) => (
              <Reveal
                className="group min-h-44 bg-navy-900/95 p-6 transition duration-300 hover:bg-cyan-300/[0.07]"
                delay={Math.min(index * 0.04, 0.24)}
                distance={24}
                key={metric.label}
              >
                <p className="font-mono text-3xl font-black tracking-[-0.04em] text-cyan-100 sm:text-4xl">
                  {metric.value}
                </p>
                <div className="mt-5 h-px w-10 bg-turquoise-300/70 transition-all duration-300 group-hover:w-16" />
                <p className="mt-4 text-sm font-semibold leading-6 text-slate-200">{metric.label}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_86%_20%,rgba(34,211,238,0.1),transparent_30%)]" />
        <Container className="relative">
          <div className="grid items-stretch gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <AnimatedImage
              alt="Polyurethane and specialty material samples prepared for technical review"
              className="min-h-[30rem]"
              imageClassName="object-[50%_center]"
              sizes="(min-width: 1024px) 54vw, 100vw"
              src="/images/product-sample-library.webp"
            />
            <Reveal className="flex flex-col justify-center rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.045] p-7 shadow-[var(--shadow-soft)] sm:p-10">
              <div className="grid h-12 w-12 place-items-center rounded-[var(--radius-md)] border border-cyan-200/18 bg-cyan-300/10 text-cyan-100">
                <ShieldCheck aria-hidden="true" className="h-6 w-6" />
              </div>
              <SectionLabel className="mt-7 w-fit">Safety and innovation</SectionLabel>
              <h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">
                Safety is at the heart of everything we do.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Each product is engineered with precision to support the protection and efficiency of end users.
                Our innovation extends across sectors, helping us respond to diverse client needs with relevant,
                application-focused solutions.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3">
                <div className="rounded-[var(--radius-md)] border border-white/10 bg-navy-950/55 p-4">
                  <Microscope aria-hidden="true" className="h-5 w-5 text-cyan-200" />
                  <p className="mt-3 text-sm font-bold text-white">Research-led</p>
                </div>
                <div className="rounded-[var(--radius-md)] border border-white/10 bg-navy-950/55 p-4">
                  <ShieldCheck aria-hidden="true" className="h-5 w-5 text-turquoise-300" />
                  <p className="mt-3 text-sm font-bold text-white">Safety-focused</p>
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-y border-white/8 bg-navy-900/68 py-16 sm:py-20 lg:py-24" id="mission">
        <Container>
          <SectionHeading
            description="Our mission is expressed through the way we build solutions, relationships and teams—not only through the products we supply."
            eyebrow="Vision and mission"
            title="Five commitments guide every engagement."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {commitments.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal
                  className={`rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.04] p-6 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-cyan-300/[0.065] ${
                    index < 3 ? "lg:col-span-2" : "lg:col-span-3"
                  }`}
                  delay={index * 0.05}
                  distance={24}
                  key={item.title}
                >
                  <div className="grid h-11 w-11 place-items-center rounded-[var(--radius-md)] bg-cyan-300/10 text-cyan-100">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24" id="values">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
            <div>
              <SectionHeading
                description="These values shape how we lead, decide, create, adapt and deliver."
                eyebrow="Core values"
                title="The standard behind the science."
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {values.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Reveal
                    className={`relative overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(255,255,255,0.018))] p-6 ${
                      index === values.length - 1 ? "sm:col-span-2" : ""
                    }`}
                    delay={index * 0.05}
                    distance={22}
                    key={item.title}
                  >
                    <span className="absolute right-4 top-2 font-mono text-5xl font-black text-white/[0.035]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon aria-hidden="true" className="h-6 w-6 text-turquoise-300" />
                    <h3 className="mt-5 text-xl font-black text-white">{item.title}</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">{item.description}</p>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative border-y border-white/8 bg-[linear-gradient(180deg,rgba(7,26,45,0.96),rgba(4,17,31,0.98))] py-16 sm:py-20 lg:py-24" id="services">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_82%,rgba(45,212,191,0.09),transparent_28%),radial-gradient(circle_at_90%_12%,rgba(34,211,238,0.1),transparent_26%)]" />
        <Container className="relative">
          <SectionHeading
            description="Support begins before a material is selected and continues through application, quality control and delivery."
            eyebrow="Services we offer"
            title="From understanding the need to supporting the site."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {services.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal
                  className="group relative min-h-64 overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-navy-950/58 p-6 shadow-[var(--shadow-soft)] transition duration-300 hover:border-cyan-200/28 hover:bg-white/[0.055]"
                  delay={Math.min(index * 0.04, 0.24)}
                  distance={24}
                  key={item.title}
                >
                  <span className="absolute right-5 top-4 font-mono text-xs font-bold text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="grid h-12 w-12 place-items-center rounded-full border border-cyan-200/16 bg-cyan-300/9 text-cyan-100 transition duration-300 group-hover:scale-110 group-hover:bg-cyan-300/14">
                    <Icon aria-hidden="true" className="h-5 w-5" />
                  </div>
                  <h3 className="mt-7 text-xl font-black leading-7 text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20 lg:py-24" id="workflow">
        <Container>
          <SectionHeading
            description="A disciplined route takes every engagement from a clearly defined challenge to an approved, coordinated product delivery."
            eyebrow="Project workflow"
            title="Eight stages. One connected technical journey."
          />

          <div className="relative mt-12">
            <div className="absolute bottom-0 left-[1.35rem] top-0 w-px bg-gradient-to-b from-cyan-200/55 via-turquoise-300/35 to-transparent lg:left-1/2 lg:-translate-x-1/2" />
            <div className="space-y-5">
              {workflow.map((stage, index) => (
                <Reveal
                  className={`relative pl-16 lg:w-[calc(50%_-_2.5rem)] lg:pl-0 ${
                    index % 2 === 0 ? "lg:mr-auto" : "lg:ml-auto"
                  }`}
                  delay={Math.min(index * 0.04, 0.2)}
                  distance={22}
                  key={stage.title}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-8 hidden h-px w-10 bg-cyan-200/32 lg:block ${
                      index % 2 === 0 ? "-right-10" : "-left-10"
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute top-[1.62rem] hidden h-3 w-3 rounded-full border border-cyan-100 bg-navy-950 shadow-[0_0_18px_rgba(34,211,238,0.45)] lg:block ${
                      index % 2 === 0 ? "-right-[2.9rem]" : "-left-[2.9rem]"
                    }`}
                  />
                  <span className="absolute left-0 top-3 grid h-11 w-11 place-items-center rounded-full border border-cyan-200/24 bg-navy-900 font-mono text-xs font-black text-cyan-100 shadow-[var(--shadow-cyan)] lg:hidden">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <article className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.045] p-6 shadow-[var(--shadow-soft)]">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.14em] text-cyan-100">
                      Stage {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-xl font-black text-white">{stage.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-300">{stage.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-24">
        <Container>
          <Reveal className="relative overflow-hidden rounded-[var(--radius-lg)] border border-cyan-200/18 bg-[radial-gradient(circle_at_82%_20%,rgba(34,211,238,0.18),transparent_30%),linear-gradient(135deg,rgba(7,26,45,0.98),rgba(9,33,57,0.96))] p-7 shadow-[var(--shadow-deep)] sm:p-10 lg:p-12">
            <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full border border-cyan-200/10" />
            <div className="absolute -right-2 top-8 h-32 w-32 rounded-full border border-turquoise-300/10" />
            <div className="relative max-w-3xl">
              <SectionLabel>Start a conversation</SectionLabel>
              <h2 className="mt-5 text-3xl font-black tracking-[-0.035em] text-white sm:text-4xl">
                Bring us the challenge. We&apos;ll help structure the technical path.
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-300">
                Share the application, material, operating environment and performance goal with Urechem&apos;s
                technical team.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact" size="lg">
                  Speak to an Expert
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
                <ButtonLink href="/ai-solution-finder" size="lg" variant="secondary">
                  Build a Technical Brief
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
