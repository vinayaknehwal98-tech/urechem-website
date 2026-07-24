"use client";

import { motion, useReducedMotion } from "framer-motion";

export function GroutingApplicationVisual() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative isolate overflow-hidden rounded-[var(--radius-lg)] border border-cyan-100/20 bg-[linear-gradient(145deg,rgba(14,116,144,0.28),rgba(30,64,175,0.15),rgba(255,255,255,0.05))] p-5 shadow-[var(--shadow-deep)] sm:p-7">
      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-300/15 blur-3xl motion-safe:animate-pulse" />
      <motion.svg
        aria-labelledby="grouting-visual-title grouting-visual-description"
        className="relative h-auto w-full"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        role="img"
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        viewBox="0 0 720 500"
        whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      >
        <title id="grouting-visual-title">Injection grouting application diagram</title>
        <desc id="grouting-visual-description">
          A stylised underground structure showing water paths, cracks and controlled resin injection into the surrounding ground.
        </desc>
        <defs>
          <linearGradient id="ground-layer" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#164e63" />
            <stop offset="1" stopColor="#0f172a" />
          </linearGradient>
          <linearGradient id="resin-line" x1="0" x2="1">
            <stop offset="0" stopColor="#67e8f9" />
            <stop offset="1" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        <rect fill="url(#ground-layer)" height="430" rx="38" width="680" x="20" y="35" />
        <g fill="none" stroke="#94a3b8" strokeOpacity="0.26" strokeWidth="2">
          <path d="M30 130C160 90 260 165 390 112s220-42 300-8" />
          <path d="M30 365c115-58 240 12 355-25s210-38 305 18" />
        </g>

        <path d="M250 405V205c0-95 70-143 110-143s110 48 110 143v200" fill="#e2e8f0" stroke="#f8fafc" strokeWidth="8" />
        <path d="M300 405V210c0-58 34-91 60-91s60 33 60 91v195" fill="#082f49" stroke="#67e8f9" strokeOpacity="0.45" strokeWidth="5" />

        <motion.path
          animate={shouldReduceMotion ? undefined : { pathLength: [0.2, 1, 0.2], opacity: [0.35, 1, 0.35] }}
          d="m205 122 48 44-36 42 57 54-44 51"
          fill="none"
          stroke="#38bdf8"
          strokeLinecap="round"
          strokeWidth="8"
          transition={{ duration: 4.8, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.path
          animate={shouldReduceMotion ? undefined : { pathLength: [1, 0.25, 1], opacity: [0.4, 1, 0.4] }}
          d="m512 95-42 57 44 42-58 58 50 60"
          fill="none"
          stroke="#38bdf8"
          strokeLinecap="round"
          strokeWidth="8"
          transition={{ duration: 5.4, ease: "easeInOut", repeat: Infinity }}
        />

        <g fill="none" stroke="url(#resin-line)" strokeLinecap="round" strokeWidth="10">
          <motion.path
            animate={shouldReduceMotion ? undefined : { pathLength: [0, 1] }}
            d="M360 255 225 315"
            initial={shouldReduceMotion ? undefined : { pathLength: 0 }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2 }}
          />
          <motion.path
            animate={shouldReduceMotion ? undefined : { pathLength: [0, 1] }}
            d="M360 285 510 325"
            initial={shouldReduceMotion ? undefined : { pathLength: 0 }}
            transition={{ delay: 0.5, duration: 1.8, repeat: Infinity, repeatDelay: 1.2 }}
          />
          <motion.path
            animate={shouldReduceMotion ? undefined : { pathLength: [0, 1] }}
            d="M360 225 515 175"
            initial={shouldReduceMotion ? undefined : { pathLength: 0 }}
            transition={{ delay: 1, duration: 1.8, repeat: Infinity, repeatDelay: 1.2 }}
          />
        </g>

        <g fill="#a5f3fc" stroke="#ecfeff" strokeWidth="3">
          <motion.circle animate={shouldReduceMotion ? undefined : { r: [12, 20, 12] }} cx="225" cy="315" r="14" transition={{ duration: 3.2, repeat: Infinity }} />
          <motion.circle animate={shouldReduceMotion ? undefined : { r: [14, 23, 14] }} cx="510" cy="325" r="16" transition={{ delay: 0.7, duration: 3.5, repeat: Infinity }} />
          <motion.circle animate={shouldReduceMotion ? undefined : { r: [10, 18, 10] }} cx="515" cy="175" r="12" transition={{ delay: 1.1, duration: 3, repeat: Infinity }} />
        </g>

        <g fill="#e0f2fe" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="700">
          <text x="54" y="72">WATER PATH</text>
          <text x="505" y="72">FRACTURED GROUND</text>
          <text textAnchor="middle" x="360" y="455">CONTROLLED INJECTION PATHWAY</text>
        </g>
      </motion.svg>
      <p className="relative mt-4 text-center text-sm leading-6 text-cyan-50/85">
        The visual represents enquiry framing only; injection pressure, resin behaviour, hole pattern and sequence require project engineering.
      </p>
    </div>
  );
}
