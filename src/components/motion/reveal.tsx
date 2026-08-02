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

export function Reveal({ children, className, delay = 0, distance = 54 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const safeDistance = Math.min(Math.max(distance, 28), 86);

  return (
    <motion.div
      className={cn(className)}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0.38,
              y: safeDistance,
              scale: 0.988,
              filter: "blur(8px)",
            }
      }
      transition={{ delay, duration: 0.96, ease: revealEase }}
      viewport={{ amount: 0.14, margin: "0px 0px -7% 0px", once: true }}
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
