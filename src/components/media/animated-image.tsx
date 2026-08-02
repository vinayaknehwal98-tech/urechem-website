"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
const imageViewport = { amount: 0.18, margin: "0px 0px -7% 0px", once: true } as const;

export function AnimatedImage({
  alt,
  className,
  imageClassName,
  overlayClassName,
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  src,
}: AnimatedImageProps) {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [-24, 24]);

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
              opacity: 0.28,
              x: -74,
              y: 34,
              scale: 0.94,
              filter: "blur(10px) saturate(0.78)",
            }
      }
      ref={ref}
      transition={{ duration: 1.08, ease: revealEase }}
      viewport={imageViewport}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.012, y: -4 }}
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
        initial={shouldReduceMotion ? false : { scale: 1.12 }}
        style={shouldReduceMotion ? undefined : { y: imageY }}
        transition={{ duration: 1.45, ease: revealEase }}
        viewport={imageViewport}
        whileInView={shouldReduceMotion ? undefined : { scale: 1 }}
      >
        <Image
          alt={alt}
          className={cn(
            "object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.055]",
            imageClassName,
          )}
          fill
          priority={priority}
          sizes={sizes}
          src={src}
        />
      </motion.div>

      <div className={cn("absolute inset-0 bg-gradient-to-t from-blue-950/30 via-transparent to-white/[0.08]", overlayClassName)} />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-4 left-0 z-20 w-[58%] -skew-x-12 bg-gradient-to-r from-blue-950 via-blue-600 to-cyan-300 shadow-[0_0_60px_rgba(37,99,235,0.38)]"
        initial={shouldReduceMotion ? false : { x: "-125%", opacity: 0.96 }}
        transition={{ delay: 0.04, duration: 1.22, ease: revealEase }}
        viewport={imageViewport}
        whileInView={shouldReduceMotion ? undefined : { x: "225%", opacity: 0.18 }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/5 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent"
        initial={shouldReduceMotion ? false : { x: "-180%", opacity: 0 }}
        transition={{ delay: 0.3, duration: 1.05, ease: "easeInOut" }}
        viewport={imageViewport}
        whileInView={shouldReduceMotion ? undefined : { x: "520%", opacity: [0, 1, 0] }}
      />
    </motion.figure>
  );
}
