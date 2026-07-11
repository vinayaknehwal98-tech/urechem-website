"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { HomeSection } from "@/components/home/home-section";
import { proofMetrics } from "@/data/homepage";

function useCountUp(target: number, active: boolean) {
  const [value, setValue] = useState(active ? target : 0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active) {
      return;
    }

    if (shouldReduceMotion) {
      return;
    }

    let frame = 0;
    const totalFrames = 42;
    const timer = window.setInterval(() => {
      frame += 1;
      const progress = 1 - Math.pow(1 - frame / totalFrames, 3);
      setValue(Math.round(target * progress));
      if (frame >= totalFrames) {
        window.clearInterval(timer);
        setValue(target);
      }
    }, 28);

    return () => window.clearInterval(timer);
  }, [active, shouldReduceMotion, target]);

  return shouldReduceMotion && active ? target : value;
}

export function ProofExpertiseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25, once: true });

  return (
    <HomeSection
      className="bg-[radial-gradient(circle_at_80%_14%,rgba(45,212,191,0.1),transparent_30%),linear-gradient(180deg,rgba(7,26,45,0.95),rgba(4,17,31,0.98))]"
      eyebrow="Proof and expertise"
      id="proof-expertise"
      title="Research-led. Application-focused."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" ref={ref}>
        {proofMetrics.map((metric) => (
          <MetricCard active={inView} key={metric.label} metric={metric} />
        ))}
      </div>
    </HomeSection>
  );
}

function MetricCard({ active, metric }: { active: boolean; metric: (typeof proofMetrics)[number] }) {
  const value = useCountUp(metric.value, active);

  return (
    <article className="rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.045] p-6 shadow-[var(--shadow-soft)]">
      <p className="font-mono text-sm font-semibold text-cyan-100">
        {value.toLocaleString()}
        {metric.suffix}
      </p>
      <h3 className="mt-3 text-xl font-black text-white">{metric.label}</h3>
    </article>
  );
}
