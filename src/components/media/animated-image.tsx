"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type AnimatedImageProps = {
  alt: string;
  className?: string;
  imageClassName?: string;
  overlayClassName?: string;
  priority?: boolean;
  sizes?: string;
  src: string;
};

const revealEase = [0.16, 1, 0.3, 1] as const;
const imageViewport = {
  amount: 0.01,
  margin: "0px 0px 45% 0px",
  once: true,
} as const;

export function AnimatedImage({
  alt,
  className,
  imageClassName,
  overlayClassName,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  src,
}: AnimatedImageProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.figure
      className={cn(
        "group relative isolate overflow-hidden rounded-[var(--radius-lg)] border border-blue-100 bg-white shadow-[var(--shadow-deep)]",
        className,
      )}
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0.36,
              x: -48,
              y: 26,
              scale: 0.965,
              filter: "blur(5px) saturate(0.86)",
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
      transition={{ duration: 0.76, ease: revealEase }}
      viewport={imageViewport}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.01, y: -3 }}
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              filter: "blur(0px) saturate(1)",
            }
      }
    >
      <motion.div
        className="absolute -inset-y-8 inset-x-0"
        initial={shouldReduceMotion ? false : { scale: 1.1 }}
        style={shouldReduceMotion ? undefined : { backfaceVisibility: "hidden", willChange: "transform" }}
        transition={{ duration: 1.02, ease: revealEase }}
        viewport={imageViewport}
        whileInView={shouldReduceMotion ? undefined : { scale: 1 }}
      >
        <Image
          alt={alt}
          className={cn(
            "object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]",
            imageClassName,
          )}
          fill
          priority={priority}
          sizes={sizes}
          src={src}
        />
      </motion.div>

      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-t from-blue-950/30 via-transparent to-white/[0.08]",
          overlayClassName,
        )}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-4 left-0 z-20 w-[42%] -skew-x-12 bg-gradient-to-r from-blue-800/70 via-cyan-300/70 to-transparent"
        initial={shouldReduceMotion ? false : { x: "-130%", opacity: 0.85 }}
        style={shouldReduceMotion ? undefined : { willChange: "transform, opacity" }}
        transition={{ delay: 0.02, duration: 0.88, ease: revealEase }}
        viewport={imageViewport}
        whileInView={shouldReduceMotion ? undefined : { x: "280%", opacity: 0.12 }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/5 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        initial={shouldReduceMotion ? false : { x: "-180%", opacity: 0 }}
        style={shouldReduceMotion ? undefined : { willChange: "transform, opacity" }}
        transition={{ delay: 0.16, duration: 0.78, ease: "easeInOut" }}
        viewport={imageViewport}
        whileInView={shouldReduceMotion ? undefined : { x: "520%", opacity: [0, 1, 0] }}
      />
    </motion.figure>
  );
}
