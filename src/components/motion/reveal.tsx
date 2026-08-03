"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

const revealEase = [0.22, 1, 0.36, 1] as const;
const revealViewport = {
  amount: 0.01,
  margin: "0px 0px 18% 0px",
  once: true,
} as const;

export function Reveal({ children, className, delay = 0, distance = 54 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const safeDistance = Math.min(Math.max(Math.round(distance * 0.34), 10), 24);
  const safeDelay = Math.min(Math.max(delay, 0), 0.14);

  return (
    <motion.div
      className={cn(className)}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0.88,
              y: safeDistance,
            }
      }
      transition={{ delay: safeDelay, duration: 0.48, ease: revealEase }}
      viewport={revealViewport}
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
    >
      {children}
    </motion.div>
  );
}
