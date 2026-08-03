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

const revealEase = [0.22, 1, 0.36, 1] as const;
const imageViewport = {
  amount: 0.01,
  margin: "0px 0px 18% 0px",
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
              opacity: 0.78,
              x: -24,
              y: 16,
              scale: 0.985,
            }
      }
      transition={{ duration: 0.62, ease: revealEase }}
      viewport={imageViewport}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.006, y: -2 }}
      whileInView={
        shouldReduceMotion
          ? undefined
          : {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }
      }
    >
      <motion.div
        className="absolute -inset-y-8 inset-x-0"
        initial={shouldReduceMotion ? false : { scale: 1.045 }}
        transition={{ duration: 0.82, ease: revealEase }}
        viewport={imageViewport}
        whileInView={shouldReduceMotion ? undefined : { scale: 1 }}
      >
        <Image
          alt={alt}
          className={cn(
            "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]",
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
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1/5 -skew-x-12 bg-gradient-to-r from-transparent via-white/45 to-transparent"
        initial={shouldReduceMotion ? false : { x: "-180%", opacity: 0 }}
        transition={{ delay: 0.08, duration: 0.78, ease: "easeOut" }}
        viewport={imageViewport}
        whileInView={shouldReduceMotion ? undefined : { x: "520%", opacity: [0, 0.75, 0] }}
      />
    </motion.figure>
  );
}
