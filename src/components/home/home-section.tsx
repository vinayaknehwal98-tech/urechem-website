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
const sectionViewport = { amount: 0.05, margin: "0px 0px 18% 0px", once: true } as const;

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
        initial={shouldReduceMotion ? false : { opacity: 0.2, scaleX: 0.04 }}
        transition={{ duration: 0.95, ease: revealEase }}
        viewport={sectionViewport}
        whileInView={shouldReduceMotion ? undefined : { opacity: 0.85, scaleX: 1 }}
      />

      <Container className="relative z-10">
        <div className="mb-8 max-w-3xl">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0.18, x: -48 }}
            transition={{ duration: 0.82, ease: revealEase }}
            viewport={sectionViewport}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
          >
            <SectionLabel>{eyebrow}</SectionLabel>
          </motion.div>

          <div className="mt-5 overflow-hidden pb-2">
            <motion.h2
              className="text-balance text-4xl font-black leading-tight text-blue-950 sm:text-5xl"
              initial={shouldReduceMotion ? false : { opacity: 0.18, y: 58, rotateX: 8 }}
              style={{ transformPerspective: 900, transformOrigin: "left bottom" }}
              transition={{ delay: 0.04, duration: 0.9, ease: revealEase }}
              viewport={sectionViewport}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, rotateX: 0 }}
            >
              {title}
            </motion.h2>
          </div>

          {intro ? (
            <motion.p
              className="mt-4 text-lg leading-8 text-slate-600"
              initial={shouldReduceMotion ? false : { opacity: 0.22, y: 30 }}
              transition={{ delay: 0.11, duration: 0.78, ease: revealEase }}
              viewport={sectionViewport}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              {intro}
            </motion.p>
          ) : null}
        </div>

        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0.24, y: 48, scale: 0.972 }}
          transition={{ delay: 0.08, duration: 0.9, ease: revealEase }}
          viewport={sectionViewport}
          whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
        >
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
