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

const revealEase = [0.16, 1, 0.3, 1] as const;
const restingState = {
  opacity: 1,
  y: 0,
  scale: 1,
  filter: "none",
};

export function Reveal({ children, className, delay = 0, distance = 54 }: RevealProps) {
  const { ref, isVisible, shouldReduceMotion } = useApproachReveal<HTMLDivElement>();
  const safeDistance = Math.min(Math.max(distance, 24), 68);
  const safeDelay = Math.min(Math.max(delay, 0), 0.36);

  return (
    <motion.div
      animate={
        shouldReduceMotion || !isVisible
          ? restingState
          : {
              opacity: [0.24, 1],
              y: [safeDistance, 0],
              scale: [0.984, 1],
              filter: ["blur(6px)", "blur(0px)", "none"],
            }
      }
      className={cn(className)}
      initial={false}
      ref={ref}
      transition={{
        delay: safeDelay,
        opacity: { duration: 0.82, ease: revealEase, times: [0, 1] },
        y: { duration: 1.12, ease: revealEase, times: [0, 1] },
        scale: { duration: 1.12, ease: revealEase, times: [0, 1] },
        filter: { duration: 0.46, ease: "easeOut", times: [0, 0.72, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}
