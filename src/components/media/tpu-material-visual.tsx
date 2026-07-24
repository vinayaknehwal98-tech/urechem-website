"use client";

import { motion, useReducedMotion } from "framer-motion";

export function TpuMaterialVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative isolate overflow-hidden rounded-[var(--radius-lg)] border border-cyan-100/20 bg-[linear-gradient(145deg,rgba(37,99,235,0.25),rgba(8,47,73,0.42),rgba(255,255,255,0.05))] p-5 shadow-[var(--shadow-deep)] sm:p-7">
      <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-blue-400/15 blur-3xl motion-safe:animate-pulse" />
      <motion.svg
        aria-labelledby="tpu-visual-title tpu-visual-description"
        className="relative h-auto w-full"
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
            <stop offset="0" stopColor="#67e8f9" />
            <stop offset="0.5" stopColor="#3b82f6" />
            <stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
          <linearGradient id="tpu-core" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#e0f2fe" />
            <stop offset="1" stopColor="#94a3b8" />
          </linearGradient>
        </defs>

        <motion.g
          animate={shouldReduceMotion ? undefined : { rotate: 360 }}
          style={{ transformOrigin: "350px 270px" }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        >
          <circle cx="350" cy="270" fill="none" r="150" stroke="url(#tpu-wheel)" strokeWidth="68" />
          <circle cx="350" cy="270" fill="url(#tpu-core)" r="76" stroke="#f8fafc" strokeWidth="8" />
          <g fill="#dbeafe" opacity="0.75">
            <circle cx="350" cy="111" r="10" />
            <circle cx="509" cy="270" r="10" />
            <circle cx="350" cy="429" r="10" />
            <circle cx="191" cy="270" r="10" />
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
          stroke="#a5f3fc"
          strokeLinecap="round"
          strokeWidth="12"
          transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
        />
        <g fill="#ecfeff" stroke="#0ea5e9" strokeWidth="4">
          <circle cx="65" cy="120" r="17" />
          <circle cx="245" cy="120" r="17" />
          <circle cx="425" cy="120" r="17" />
          <circle cx="605" cy="120" r="17" />
        </g>

        <g fill="#e0f2fe" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700" textAnchor="middle">
          <text x="115" y="468">ABRASION</text>
          <text x="270" y="468">FLEXIBILITY</text>
          <text x="445" y="468">CHEMICAL</text>
          <text x="600" y="468">CUSTOMISATION</text>
        </g>
      </motion.svg>
      <p className="relative mt-4 text-center text-sm leading-6 text-cyan-50/85">
        TPU type, hardness, additive package and processing route must be matched to the final part and service environment.
      </p>
    </div>
  );
}
