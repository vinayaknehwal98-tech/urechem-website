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
const imageViewport = { amount: 0.05, margin: "0px 0px 16% 0px", once: true } as const;

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
      initial={shouldReduceMotion ? false : { opacity: 0.18, x: 62, y: 20, scale: 0.95 }}
      transition={{ duration: 0.92, ease: revealEase }}
      viewport={imageViewport}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.008, y: -2 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
    >
      <motion.div
        className="absolute inset-0"
        initial={shouldReduceMotion ? false : { scale: 1.1 }}
        transition={{ duration: 1.2, ease: revealEase }}
        viewport={imageViewport}
        whileInView={shouldReduceMotion ? undefined : { scale: 1 }}
      >
        <Image
          alt={alt}
          className={cn(
            "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]",
            imageClassName,
          )}
          fill
          priority={priority}
          sizes={sizes}
          src={src}
        />
      </motion.div>

      <div className={cn("absolute inset-0 bg-gradient-to-t from-blue-950/26 via-transparent to-white/[0.06]", overlayClassName)} />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-3 left-0 z-20 w-[54%] -skew-x-12 bg-gradient-to-r from-blue-950 via-blue-600 to-cyan-200 shadow-[0_0_44px_rgba(37,99,235,0.3)]"
        initial={shouldReduceMotion ? false : { x: "-130%", opacity: 0.96 }}
        transition={{ delay: 0.03, duration: 0.94, ease: revealEase }}
        viewport={imageViewport}
        whileInView={shouldReduceMotion ? undefined : { x: "235%", opacity: 0 }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-30 w-[16%] -skew-x-12 bg-gradient-to-r from-transparent via-white/55 to-transparent"
        initial={shouldReduceMotion ? false : { x: "-180%", opacity: 0 }}
        transition={{ delay: 0.22, duration: 0.82, ease: revealEase }}
        viewport={imageViewport}
        whileInView={shouldReduceMotion ? undefined : { x: "640%", opacity: [0, 1, 0] }}
      />
    </motion.figure>
  );
}
