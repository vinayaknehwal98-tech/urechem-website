"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { SectionLabel } from "@/components/ui/section-label";
import { cn } from "@/lib/utils";

type HomeSectionProps = {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

const revealEase = [0.16, 1, 0.3, 1] as const;
const sectionViewport = {
  amount: 0.08,
  margin: "0px 0px -18% 0px",
  once: true,
} as const;

export function HomeSection({ eyebrow, title, intro, children, className, id }: HomeSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "relative scroll-mt-24 overflow-hidden border-t border-blue-100 bg-white py-16 sm:py-20",
        className,
      )}
      id={id}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-full origin-left bg-gradient-to-r from-blue-700 via-cyan-400 to-transparent"
        initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 1.72, ease: revealEase }}
        viewport={sectionViewport}
        whileInView={shouldReduceMotion ? undefined : { opacity: 0.8, scaleX: 1 }}
      />

      <Container className="relative z-10">
        <motion.div
          className="mb-8 max-w-3xl"
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 76,
                  scale: 0.975,
                  filter: "blur(10px)",
                }
          }
          transition={{ duration: 1.72, ease: revealEase }}
          viewport={sectionViewport}
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }
          }
        >
          <SectionLabel>{eyebrow}</SectionLabel>
          <h2
            className="mt-5 text-balance text-4xl font-black leading-tight sm:text-5xl"
            style={{ color: "#172554", WebkitTextFillColor: "#172554" }}
          >
            {title}
          </h2>
          {intro ? <p className="mt-4 text-lg leading-8 text-slate-600">{intro}</p> : null}
        </motion.div>

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 92,
                  scale: 0.976,
                  filter: "blur(11px)",
                }
          }
          transition={{ delay: 0.32, duration: 1.92, ease: revealEase }}
          viewport={sectionViewport}
          whileInView={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  filter: "blur(0px)",
                }
          }
        >
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
