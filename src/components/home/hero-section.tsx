"use client";

import Image from "next/image";
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

  return (
    <section className="relative isolate min-h-[calc(100dvh-4.5rem)] overflow-hidden border-b border-blue-100 bg-white">
      <motion.div
        animate={shouldReduceMotion ? undefined : { scale: [1.02, 1.055, 1.02], x: [0, -8, 0] }}
        className="absolute inset-0 -z-20"
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
      >
        <Image
          alt="Large specialty-chemical processing facility operating at dusk"
          className="object-cover object-center"
          fill
          priority
          quality={88}
          sizes="100vw"
          src="https://images.unsplash.com/photo-1777915627530-fc3decb749cf?auto=format&fit=crop&fm=jpg&q=82&w=2400"
        />
      </motion.div>
      <MolecularBackground />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(255,255,255,0.99)_0%,rgba(255,255,255,0.97)_43%,rgba(248,251,255,0.83)_70%,rgba(239,246,255,0.48)_100%)]" />
      <div className="absolute inset-0 -z-10 opacity-[0.24] [background-image:radial-gradient(circle_at_1px_1px,rgba(37,99,235,0.24)_1px,transparent_0)] [background-size:24px_24px]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-gradient-to-t from-white to-transparent" />

      <Container className="flex min-h-[calc(100dvh-4.5rem)] flex-col justify-center py-12 sm:py-16 lg:py-20">
        <div className="relative z-10 w-full">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-blue-700" data-hero-intro>
            URECHEM CHEMICAL
          </p>
          <h1
            className="mt-6 w-full max-w-6xl text-balance text-[clamp(3.4rem,7.4vw,7.8rem)] font-black leading-[0.86] tracking-[-0.055em] text-blue-950"
            data-hero-intro
          >
            Intelligent chemistry for better polyurethane solutions.
          </h1>
          <p className="mt-7 text-2xl font-black text-sky-700 sm:text-3xl" data-hero-intro>
            We deliver what we promise.
          </p>
          <p className="mt-5 max-w-3xl text-pretty text-lg leading-8 text-slate-700 sm:text-xl" data-hero-intro>
            Advanced polyurethane systems, specialty chemicals and technical support engineered around real-world applications.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap" data-hero-intro>
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
          </div>
        </div>
      </Container>

      <Container className="relative z-10 pb-10">
        <div className="grid gap-3 border-t border-blue-200/70 pt-6 md:grid-cols-3">
          {proofPoints.map((item, index) => (
            <motion.article
              className="rounded-[var(--radius-md)] border border-blue-100 bg-white/90 p-4 shadow-[var(--shadow-soft)] backdrop-blur-md"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              key={item.label}
              transition={{ delay: index * 0.08, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ amount: 0.25, once: true }}
              whileHover={shouldReduceMotion ? undefined : { borderColor: "rgba(14,165,233,0.4)", y: -5 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <item.icon aria-hidden="true" className="h-5 w-5 text-sky-600" />
              <h2 className="mt-3 text-sm font-semibold text-blue-950">{item.label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
