"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HomeSection } from "@/components/home/home-section";
import { AnimatedImage } from "@/components/media/animated-image";
import { proofMetrics } from "@/data/homepage";

export function ProofExpertiseSection() {
  return (
    <HomeSection
      className="bg-[radial-gradient(circle_at_80%_14%,rgba(45,212,191,0.1),transparent_30%),linear-gradient(180deg,rgba(7,26,45,0.95),rgba(4,17,31,0.98))]"
      eyebrow="Proof and expertise"
      id="proof-expertise"
      title="Research-led. Application-focused."
    >
      <div className="grid items-stretch gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <AnimatedImage
          alt="A technician monitoring polyurethane foam compression testing in a modern materials laboratory"
          className="min-h-96"
          imageClassName="object-[46%_center]"
          sizes="(min-width: 1024px) 44vw, 100vw"
          src="/images/materials-testing.webp"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          {proofMetrics.map((metric, index) => (
            <MetricCard index={index} key={metric.label} metric={metric} />
          ))}
        </div>
      </div>
    </HomeSection>
  );
}

function MetricCard({
  index,
  metric,
}: {
  index: number;
  metric: (typeof proofMetrics)[number];
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.045] p-6 shadow-[var(--shadow-soft)]"
      initial={shouldReduceMotion ? false : { opacity: 0.94, scale: 0.988, y: 10 }}
      transition={{ delay: index * 0.07, duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.16, once: true }}
      whileHover={shouldReduceMotion ? undefined : { borderColor: "rgba(103,232,249,0.34)", scale: 1.018, y: -4 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
    >
      <p className="font-mono text-sm font-semibold text-cyan-100">
        {metric.value.toLocaleString()}
        {metric.suffix}
      </p>
      <h3 className="mt-3 text-xl font-black text-white">{metric.label}</h3>
    </motion.article>
  );
}
