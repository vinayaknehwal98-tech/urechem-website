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
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundLayout?: "full" | "right-panel";
};

const revealEase = [0.16, 1, 0.3, 1] as const;
const sectionViewport = {
  amount: 0.08,
  margin: "0px 0px -18% 0px",
  once: true,
} as const;

export function HomeSection({
  eyebrow,
  title,
  intro,
  children,
  className,
  id,
  backgroundImage,
  backgroundPosition = "center",
  backgroundLayout = "full",
}: HomeSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "relative scroll-mt-24 overflow-hidden border-t border-blue-100 bg-white py-16 sm:py-20",
        className,
      )}
      id={id}
    >
      {backgroundImage ? (
        backgroundLayout === "right-panel" ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-8 top-5 z-0 hidden h-[29rem] w-[57%] overflow-hidden lg:block"
          >
            <div
              className="absolute -inset-4 scale-[1.04] bg-cover bg-no-repeat opacity-95 blur-[2px] saturate-[1.06]"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition,
              }}
            />

            <div
              className="absolute inset-y-0 left-0 w-[17rem]"
              style={{
                background:
                  "linear-gradient(90deg, #ffffff 0%, rgba(255,255,255,0.97) 15%, rgba(255,255,255,0.82) 36%, rgba(255,255,255,0.46) 62%, rgba(255,255,255,0.12) 84%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-x-0 top-0 h-24"
              style={{
                background:
                  "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.92) 18%, rgba(255,255,255,0.62) 46%, rgba(255,255,255,0.2) 76%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-28"
              style={{
                background:
                  "linear-gradient(0deg, #ffffff 0%, rgba(255,255,255,0.94) 18%, rgba(255,255,255,0.66) 48%, rgba(255,255,255,0.22) 78%, transparent 100%)",
              }}
            />
            <div
              className="absolute inset-y-0 right-0 w-14"
              style={{
                background:
                  "linear-gradient(270deg, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.34) 45%, transparent 100%)",
              }}
            />
            <div
              className="absolute left-0 top-0 h-36 w-48"
              style={{
                background:
                  "radial-gradient(circle at 0% 0%, #ffffff 0%, rgba(255,255,255,0.9) 34%, rgba(255,255,255,0.42) 67%, transparent 100%)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 h-36 w-48"
              style={{
                background:
                  "radial-gradient(circle at 0% 100%, #ffffff 0%, rgba(255,255,255,0.9) 34%, rgba(255,255,255,0.42) 67%, transparent 100%)",
              }}
            />
          </div>
        ) : (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-4 z-0 scale-[1.04] bg-cover bg-no-repeat opacity-90 blur-[2px] saturate-[1.08]"
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundPosition,
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-[1] bg-[linear-gradient(90deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.30)_48%,rgba(255,255,255,0.20)_100%)]"
            />
          </>
        )
      ) : null}

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 h-px w-full origin-left bg-gradient-to-r from-blue-700 via-cyan-400 to-transparent"
        initial={shouldReduceMotion ? false : { opacity: 0, scaleX: 0 }}
        transition={{ duration: 1.42, ease: revealEase }}
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
          transition={{ duration: 1.42, ease: revealEase }}
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
          transition={{ delay: 0.25, duration: 1.58, ease: revealEase }}
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
