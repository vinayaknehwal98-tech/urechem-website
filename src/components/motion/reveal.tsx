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

export function Reveal({ children, className, delay = 0, distance = 54 }: RevealProps) {
  const { ref, isVisible, shouldReduceMotion } = useApproachReveal<HTMLDivElement>();
  const safeDistance = Math.min(Math.max(distance, 28), 72);
  const safeDelay = Math.min(Math.max(delay, 0), 0.08);
  const hiddenState = {
    opacity: 0,
    y: safeDistance,
    scale: 0.988,
    filter: "blur(6px)",
  };

  return (
    <motion.div
      animate={
        shouldReduceMotion || isVisible
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: ["blur(6px)", "blur(0px)", "none"],
            }
          : hiddenState
      }
      className={cn(className)}
      initial={shouldReduceMotion ? false : hiddenState}
      ref={ref}
      transition={{
        delay: safeDelay,
        opacity: { duration: 0.5, ease: revealEase },
        y: { duration: 0.72, ease: revealEase },
        scale: { duration: 0.72, ease: revealEase },
        filter: { duration: 0.22, ease: "easeOut", times: [0, 0.65, 1] },
      }}
    >
      {children}
    </motion.div>
  );
}
