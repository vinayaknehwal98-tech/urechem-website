"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

export function Reveal({ children, className, delay = 0, distance = 34 }: RevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const safeDistance = Math.min(Math.max(distance * 0.3, 6), 12);

  return (
    <motion.div
      className={cn(className)}
      initial={shouldReduceMotion ? false : { opacity: 0.94, y: safeDistance }}
      transition={{ delay, duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.12, once: true }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
