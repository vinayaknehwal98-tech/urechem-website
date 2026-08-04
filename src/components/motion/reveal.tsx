"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useApproachReveal } from "@/components/motion/use-approach-reveal";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

const revealEase = [0.22, 1, 0.36, 1] as const;
const restingState = {
  opacity: 1,
  y: 0,
  scale: 1,
};

export function Reveal({ children, className, delay = 0, distance = 54 }: RevealProps) {
  const { ref, isVisible, shouldReduceMotion } = useApproachReveal<HTMLDivElement>();
  const safeDistance = Math.min(Math.max(Math.round(distance * 0.34), 10), 24);
  const safeDelay = Math.min(Math.max(delay, 0), 0.14);

  const hiddenState = {
    opacity: 0.88,
    y: safeDistance,
    scale: 0.995,
  };

  return (
    <motion.div
      animate={shouldReduceMotion || isVisible ? restingState : hiddenState}
      className={cn(className)}
      initial={false}
      ref={ref}
      transition={{
        delay: isVisible ? safeDelay : 0,
        duration: 0.52,
        ease: revealEase,
      }}
    >
      {children}
    </motion.div>
  );
}
