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

export function Reveal({ children, className, delay = 0, distance = 30 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const safeDistance = Math.min(Math.max(distance, 16), 40);

  return (
    <motion.div
      className={cn(className)}
      initial={shouldReduceMotion ? false : { opacity: 0.7, y: safeDistance }}
      transition={{ delay, duration: 0.66, ease: revealEase }}
      viewport={{ amount: 0.1, margin: "0px 0px -4% 0px", once: true }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
