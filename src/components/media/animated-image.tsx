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
  const imageY = useTransform(scrollYProgress, [0, 1], [-18, 18]);

  return (
    <motion.figure
      className={cn(
        "group relative isolate overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-navy-900 shadow-[var(--shadow-deep)]",
        className,
      )}
      initial={shouldReduceMotion ? false : { opacity: 0.96, scale: 0.988, y: 8 }}
      ref={ref}
      transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ amount: 0.12, once: true }}
      whileHover={shouldReduceMotion ? undefined : { scale: 1.008, y: -3 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
    >
      <motion.div className="absolute -inset-y-6 inset-x-0" style={shouldReduceMotion ? undefined : { y: imageY }}>
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
      <div className={cn("absolute inset-0 bg-gradient-to-t from-navy-950/62 via-transparent to-white/[0.04]", overlayClassName)} />
      <motion.div
        aria-hidden="true"
        animate={shouldReduceMotion ? undefined : { x: ["-140%", "360%"] }}
        className="absolute inset-y-0 left-0 w-1/4 -skew-x-12 bg-gradient-to-r from-transparent via-cyan-100/8 to-transparent"
        transition={{ delay: 1.2, duration: 8, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
      />
    </motion.figure>
  );
}
