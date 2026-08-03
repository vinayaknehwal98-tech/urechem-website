"use client";

import { motion, useReducedMotion } from "framer-motion";

export function TpuMaterialVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative isolate overflow-hidden rounded-[var(--radius-lg)] border border-cyan-100/30 bg-[linear-gradient(145deg,rgba(2,15,28,0.78),rgba(8,47,73,0.7),rgba(15,23,42,0.76))] p-5 shadow-[0_24px_75px_rgba(2,15,28,0.4)] sm:p-7">
      <div className="absolute -left-16 -top-16 h-52 w-52 rounded-full bg-cyan-300/20 blur-3xl motion-safe:animate-pulse" />
      <div className="absolute -bottom-20 -right-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
      <motion.svg
        aria-labelledby="tpu-visual-title tpu-visual-description"
        className="relative h-auto w-full drop-shadow-[0_12px_28px_rgba(0,0,0,0.42)]"
        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97, y: 18 }}
        role="img"
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        viewBox="0 0 720 500"
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
      >
        <title id="tpu-visual-title">Thermoplastic polyurethane material diagram</title>
        <desc id="tpu-visual-description">
          A stylised TPU wheel and flexible polymer chain showing strength, flexibility and material customisation.
        </desc>
        <defs>
          <linearGradient id="tpu-wheel" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#a5f3fc" />
            <stop offset="0.45" stopColor="#38bdf8" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="tpu-core" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#f8fafc" />
            <stop offset="1" stopColor="#94a3b8" />
          </linearGradient>
          <filter id="tpu-glow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="9" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.g
          animate={shouldReduceMotion ? undefined : { rotate: 360 }}
          filter="url(#tpu-glow)"
          style={{ transformOrigin: "350px 270px" }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        >
          <circle cx="350" cy="270" fill="none" r="150" stroke="url(#tpu-wheel)" strokeWidth="68" />
          <circle cx="350" cy="270" fill="url(#tpu-core)" r="76" stroke="#ffffff" strokeWidth="9" />
          <g fill="#ecfeff" opacity="0.95">
            <circle cx="350" cy="111" r="11" />
            <circle cx="509" cy="270" r="11" />
            <circle cx="350" cy="429" r="11" />
            <circle cx="191" cy="270" r="11" />
          </g>
        </motion.g>

        <motion.path
          animate={shouldReduceMotion ? undefined : { d: [
            "M65 120c70-70 110 70 180 0s110 70 180 0 110 70 180 0",
            "M65 120c70 70 110-70 180 0s110-70 180 0 110-70 180 0",
            "M65 120c70-70 110 70 180 0s110 70 180 0 110 70 180 0",
          ] }}
          d="M65 120c70-70 110 70 180 0s110 70 180 0 110 70 180 0"
          fill="none"
          filter="url(#tpu-glow)"
          stroke="#67e8f9"
          strokeLinecap="round"
          strokeWidth="14"
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        />
        <g fill="#ffffff" stroke="#38bdf8" strokeWidth="5">
          <circle cx="65" cy="120" r="18" />
          <circle cx="245" cy="120" r="18" />
          <circle cx="425" cy="120" r="18" />
          <circle cx="605" cy="120" r="18" />
        </g>

        <g fill="#ffffff" fontFamily="Arial, sans-serif" fontSize="19" fontWeight="800" textAnchor="middle">
          <text x="115" y="468">ABRASION</text>
          <text x="270" y="468">FLEXIBILITY</text>
          <text x="445" y="468">CHEMICAL</text>
          <text x="600" y="468">CUSTOMISATION</text>
        </g>
      </motion.svg>
      <p className="relative mt-4 rounded-xl border border-white/10 bg-slate-950/[0.48] px-4 py-3 text-center text-sm font-medium leading-6 text-white/[0.92]">
        TPU type, hardness, additive package and processing route must be matched to the final part and service environment.
      </p>
    </div>
  );
}
