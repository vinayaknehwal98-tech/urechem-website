"use client";

import { ArrowRight, Beaker, Boxes, MessageSquareText, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MolecularBackground } from "@/components/visuals/molecular-background";

const proofPoints = [
  {
    icon: Beaker,
    label: "Formulation-led",
    text: "Application problems translated into polyurethane and specialty-chemical pathways.",
  },
  {
    icon: ShieldCheck,
    label: "Validation-aware",
    text: "Technical recommendations stay provisional until reviewed by qualified specialists.",
  },
  {
    icon: Boxes,
    label: "Supply connected",
    text: "Research, development, implementation support, quality validation and supply in one journey.",
  },
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const enter = (delay: number, distance = 28) => ({
    animate: { opacity: 1, y: 0 },
    initial: shouldReduceMotion ? false : { opacity: 0, y: distance },
    transition: { delay, duration: 0.72, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section className="relative isolate min-h-[calc(100dvh-4.5rem)] overflow-hidden bg-navy-950">
      <MolecularBackground />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_18%,rgba(37,99,235,0.32),transparent_31%),radial-gradient(circle_at_82%_18%,rgba(34,211,238,0.2),transparent_30%),linear-gradient(135deg,rgba(4,17,31,0.98),rgba(8,42,76,0.95)_52%,rgba(4,17,31,0.99))]" />
      <div className="absolute inset-0 -z-10 opacity-[0.2] [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-gradient-to-t from-navy-950 to-transparent" />

      <Container className="flex min-h-[calc(100dvh-4.5rem)] flex-col justify-center py-12 sm:py-16 lg:py-20">
        <div className="relative z-10 w-full">
          <motion.p className="text-sm font-black uppercase tracking-[0.22em] text-cyan-200" {...enter(0.08, 18)}>
            URECHEM CHEMICAL
          </motion.p>
          <motion.h1
            className="mt-6 w-full text-balance text-[clamp(3.4rem,7.4vw,7.8rem)] font-black leading-[0.86] tracking-[-0.055em] text-white"
            {...enter(0.16, 42)}
          >
            Intelligent chemistry for better polyurethane solutions.
          </motion.h1>
          <motion.p className="mt-7 text-2xl font-black text-cyan-100 sm:text-3xl" {...enter(0.3)}>
            We deliver what we promise.
          </motion.p>
          <motion.p className="mt-5 max-w-3xl text-pretty text-lg leading-8 text-slate-200 sm:text-xl" {...enter(0.38)}>
            Advanced polyurethane systems, specialty chemicals and technical support engineered around real-world applications.
          </motion.p>

          <motion.div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" {...enter(0.46)}>
            <ButtonLink href="/ai-solution-finder" size="lg">
              Describe Your Challenge
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
            <ButtonLink href="/contact?type=Consultation%20request" size="lg" variant="secondary">
              <MessageSquareText aria-hidden="true" className="h-4 w-4" />
              Talk to a Consultant
            </ButtonLink>
            <ButtonLink href="/products" size="lg" variant="ghost">
              Explore Products
            </ButtonLink>
          </motion.div>
        </div>
      </Container>

      <Container className="relative z-10 pb-10">
        <div className="grid gap-3 border-t border-white/10 pt-6 md:grid-cols-3">
          {proofPoints.map((item, index) => (
            <motion.article
              className="rounded-[var(--radius-md)] border border-white/10 bg-white/[0.05] p-4 shadow-[var(--shadow-soft)] backdrop-blur-sm"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              key={item.label}
              transition={{ delay: index * 0.08, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ amount: 0.25, once: true }}
              whileHover={shouldReduceMotion ? undefined : { borderColor: "rgba(103,232,249,0.34)", y: -5 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <item.icon aria-hidden="true" className="h-5 w-5 text-cyan-200" />
              <h2 className="mt-3 text-sm font-semibold text-white">{item.label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
