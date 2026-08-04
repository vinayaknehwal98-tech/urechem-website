"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HomeSection } from "@/components/home/home-section";
import { AnimatedImage } from "@/components/media/animated-image";
import { workflowStages } from "@/data/homepage";

const WORKFLOW_BACKGROUND =
  "data:image/webp;base64,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";

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
      backgroundImage={WORKFLOW_BACKGROUND}
      backgroundPosition="center"
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
