"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

const revealEase = [0.16, 1, 0.3, 1] as const;
const revealViewport = {
  amount: 0.01,
  margin: "0px 0px 45% 0px",
  once: true,
} as const;

export function Reveal({ children, className, delay = 0, distance = 54 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const safeDistance = Math.min(Math.max(distance, 28), 72);
  const safeDelay = Math.min(Math.max(delay, 0), 0.08);

  return (
    <motion.div
      className={cn(className)}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0.42,
              y: safeDistance,
              scale: 0.988,
              filter: "blur(5px)",
            }
      }
      style={
        shouldReduceMotion
          ? undefined
          : {
              backfaceVisibility: "hidden",
              willChange: "transform, opacity, filter",
            }
      }
      transition={{ delay: safeDelay, duration: 0.64, ease: revealEase }}
      viewport={revealViewport}
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
  );
}
