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

// Start the reveal before the section reaches the visible viewport. This keeps
// the original cinematic movement while preventing a hidden heading from
// looking like extra whitespace during fast scrolling.
const sectionViewport = {
  amount: 0.01,
  margin: "0px 0px 30% 0px",
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
        initial={shouldReduceMotion ? false : { opacity: 0.2, scaleX: 0.08 }}
        transition={{ duration: 1.15, ease: revealEase }}
        viewport={sectionViewport}
        whileInView={shouldReduceMotion ? undefined : { opacity: 0.8, scaleX: 1 }}
      />

      <Container className="relative z-10">
        <div className="mb-8 max-w-3xl">
          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : { opacity: 0.35, x: -46, filter: "blur(7px)" }
            }
            transition={{ duration: 0.82, ease: revealEase }}
            viewport={sectionViewport}
            whileInView={
              shouldReduceMotion
                ? undefined
                : { opacity: 1, x: 0, filter: "blur(0px)" }
            }
          >
            <SectionLabel>{eyebrow}</SectionLabel>
          </motion.div>

          <div className="mt-5 overflow-hidden pb-2">
            <motion.h2
              className="text-balance text-4xl font-black leading-tight text-blue-950 sm:text-5xl"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0.28, y: 82, rotateX: 9, filter: "blur(8px)" }
              }
              style={{ transformPerspective: 1000, transformOrigin: "left bottom" }}
              transition={{ delay: 0.06, duration: 1.02, ease: revealEase }}
              viewport={sectionViewport}
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" }
              }
            >
              {title}
            </motion.h2>
          </div>

          {intro ? (
            <motion.p
              className="mt-4 text-lg leading-8 text-slate-600"
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0.35, y: 38, filter: "blur(6px)" }
              }
              transition={{ delay: 0.15, duration: 0.9, ease: revealEase }}
              viewport={sectionViewport}
              whileInView={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 1, y: 0, filter: "blur(0px)" }
              }
            >
              {intro}
            </motion.p>
          ) : null}
        </div>

        <motion.div
          initial={
            shouldReduceMotion
              ? false
              : { opacity: 0.42, y: 72, scale: 0.985, filter: "blur(9px)" }
          }
          transition={{ delay: 0.12, duration: 1.02, ease: revealEase }}
          viewport={sectionViewport}
          whileInView={
            shouldReduceMotion
              ? undefined
              : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          }
        >
          {children}
        </motion.div>
      </Container>
    </section>
  );
}
