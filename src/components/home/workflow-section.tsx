"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HomeSection } from "@/components/home/home-section";
import { AnimatedImage } from "@/components/media/animated-image";
import { workflowStages } from "@/data/homepage";

export function WorkflowSection() {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 35%"],
  });
  const pathScale = useTransform(scrollYProgress, [0, 1], [0.08, 1]);
  const particleY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <HomeSection
      className="bg-[radial-gradient(circle_at_18%_24%,rgba(34,211,238,0.12),transparent_32%),linear-gradient(180deg,rgba(4,17,31,0.99),rgba(7,26,45,0.94))]"
      eyebrow="Eight-stage workflow"
      id="workflow"
      intro="A readable project journey from challenge definition to delivery. Certification and compliance references remain project-specific unless verified."
      title="From technical challenge to validated delivery."
    >
      <AnimatedImage
        alt="A technical team coordinating the safe inspection and delivery of an approved chemical system"
        className="mb-10 h-72 sm:h-80"
        imageClassName="object-[center_52%]"
        sizes="100vw"
        src="/images/project-delivery.webp"
      />
      <div className="relative" ref={ref}>
        <div className="absolute left-4 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
          <motion.div
            className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-cyan-200 via-turquoise-300 to-transparent"
            style={shouldReduceMotion ? undefined : { scaleY: pathScale }}
          />
          <motion.div
            className="absolute -left-2 top-0 h-4 w-4 rounded-full bg-cyan-200 shadow-[0_0_26px_rgba(34,211,238,0.55)]"
            style={shouldReduceMotion ? undefined : { y: particleY }}
          />
        </div>

        <div className="grid gap-4 pl-12 md:pl-0">
          {workflowStages.map((stage, index) => (
            <motion.article
              className={`relative rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.045] p-5 shadow-[var(--shadow-soft)] md:grid md:w-[calc(50%_-_2rem)] md:grid-cols-[4rem_1fr] md:gap-5 ${
                index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
              }`}
              initial={shouldReduceMotion ? false : { opacity: 0.94, x: index % 2 === 0 ? -10 : 10 }}
              key={stage.title}
              transition={{ delay: Math.min(index * 0.04, 0.24), duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ amount: 0.22, once: true }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
            >
              <span
                aria-hidden="true"
                className={`absolute top-7 hidden h-px w-8 bg-cyan-200/36 md:block ${
                  index % 2 === 0 ? "-right-8" : "-left-8"
                }`}
              />
              <span
                aria-hidden="true"
                className="absolute -left-[2.55rem] top-6 h-3 w-3 rounded-full border border-cyan-100 bg-navy-950 shadow-[0_0_16px_rgba(34,211,238,0.42)] md:hidden"
              />
              <div className="font-mono text-sm font-semibold text-cyan-100">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <h3 className="text-xl font-black text-white">{stage.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{stage.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </HomeSection>
  );
}
