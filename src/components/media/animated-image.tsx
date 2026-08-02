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
const imageViewport = { amount: 0.1, margin: "0px 0px -4% 0px", once: true } as const;

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
      initial={shouldReduceMotion ? false : { opacity: 0.68, x: 34, y: 14, scale: 0.985 }}
      transition={{ duration: 0.72, ease: revealEase }}
      viewport={imageViewport}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.006 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0, y: 0, scale: 1 }}
    >
      <Image
        alt={alt}
        className={cn(
          "object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]",
          imageClassName,
        )}
        fill
        priority={priority}
        sizes={sizes}
        src={src}
      />

      <div className={cn("absolute inset-0 bg-gradient-to-t from-blue-950/24 via-transparent to-white/[0.06]", overlayClassName)} />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-[42%] -skew-x-12 bg-gradient-to-r from-blue-800 via-blue-500 to-cyan-200"
        initial={shouldReduceMotion ? false : { x: "-125%", opacity: 0.82 }}
        transition={{ delay: 0.04, duration: 0.78, ease: revealEase }}
        viewport={imageViewport}
        whileInView={shouldReduceMotion ? undefined : { x: "265%", opacity: 0 }}
      />
    </motion.figure>
  );
}
