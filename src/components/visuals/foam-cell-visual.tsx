"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { PointerEvent } from "react";

const cells = [
  "M167.6 69.5C217.9 54.3 269.6 75.1 292.6 116.2C315.5 157.3 309.7 218.7 271.4 249.4C233.2 280.1 162.5 280.2 117.3 245.8C72.2 211.4 52.6 142.6 81.7 104.1C101.9 77.4 133.7 79.8 167.6 69.5Z",
  "M385.9 63.2C430.8 66.1 479.4 100.3 490.5 142.8C501.6 185.4 475.2 236.2 430.8 250.1C386.3 264 323.8 240.9 300.4 199.5C277 158 292.7 98.2 327.9 75.4C345.7 63.9 365.8 61.9 385.9 63.2Z",
  "M142.8 270.9C188.9 266.8 238.2 293.1 248.3 335.8C258.5 378.5 229.4 437.6 184.7 450.3C140 463 79.7 429.3 60.7 384.4C41.7 339.5 64 283.5 99.2 270.7C113.7 265.5 128.3 272.2 142.8 270.9Z",
  "M364.8 293.1C415.7 287.1 466.1 321.9 472.6 369.3C479.1 416.7 441.7 476.7 389.6 484.4C337.5 492.1 270.8 447.4 263.9 398.2C257 349 309.9 295.4 364.8 293.1Z",
  "M267.8 202.7C301.8 194.5 344.3 209.8 361.8 241.2C379.3 272.6 371.8 320.1 338.1 339.7C304.4 359.3 244.6 351 217.8 317.4C191 283.8 197.2 224.8 230.6 207.6C241.8 201.8 254.8 205.8 267.8 202.7Z",
];

const bonds = [
  [118, 124, 226, 214],
  [226, 214, 332, 174],
  [332, 174, 441, 142],
  [159, 346, 268, 286],
  [268, 286, 390, 383],
  [242, 130, 276, 242],
  [408, 102, 328, 262],
];

const nodes = [
  [118, 124],
  [226, 214],
  [332, 174],
  [441, 142],
  [159, 346],
  [268, 286],
  [390, 383],
  [242, 130],
  [328, 262],
];

export function FoamCellVisual() {
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 75, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 75, damping: 22 });
  const nearX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const nearY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const farX = useTransform(smoothX, [-0.5, 0.5], [8, -8]);
  const farY = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || event.pointerType !== "mouse") {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <div
      aria-hidden="true"
      className="relative mx-auto aspect-square w-full max-w-[32rem] overflow-hidden rounded-[var(--radius-lg)] border border-cyan-200/12 bg-[linear-gradient(145deg,rgba(255,255,255,0.055),rgba(34,211,238,0.035)_42%,rgba(4,17,31,0.44))] shadow-[var(--shadow-deep)]"
      onPointerMove={handlePointerMove}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_22%,rgba(34,211,238,0.22),transparent_31%),radial-gradient(circle_at_70%_70%,rgba(45,212,191,0.18),transparent_34%),linear-gradient(180deg,rgba(203,213,225,0.055),transparent_38%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.18)_1px,transparent_0)] [background-size:18px_18px]" />
      <svg className="absolute inset-0 h-full w-full" fill="none" viewBox="0 0 540 440" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="foam-stroke" x1="40" x2="480" y1="44" y2="386">
            <stop stopColor="#e0faff" stopOpacity="0.72" />
            <stop offset="0.48" stopColor="#22d3ee" stopOpacity="0.42" />
            <stop offset="1" stopColor="#2dd4bf" stopOpacity="0.18" />
          </linearGradient>
          <radialGradient id="foam-membrane" cx="50%" cy="50%" r="50%">
            <stop stopColor="#67e8f9" stopOpacity="0.13" />
            <stop offset="0.62" stopColor="#2dd4bf" stopOpacity="0.045" />
            <stop offset="1" stopColor="#04111f" stopOpacity="0.02" />
          </radialGradient>
        </defs>
        <motion.g style={shouldReduceMotion ? undefined : { x: farX, y: farY }}>
          {bonds.map(([x1, y1, x2, y2], index) => (
            <motion.line
              animate={shouldReduceMotion ? undefined : { opacity: [0.12, 0.34, 0.16] }}
              key={`${x1}-${y1}-${x2}-${y2}`}
              stroke="#67e8f9"
              strokeLinecap="round"
              strokeOpacity="0.22"
              strokeWidth="1"
              transition={{ duration: 7.5, repeat: Infinity, repeatType: "mirror", delay: index * 0.15 }}
              x1={x1}
              x2={x2}
              y1={y1}
              y2={y2}
            />
          ))}
          {nodes.map(([cx, cy], index) => (
            <motion.circle
              animate={shouldReduceMotion ? undefined : { opacity: [0.38, 0.86, 0.46], r: [3.5, 5.6, 4] }}
              cx={cx}
              cy={cy}
              fill="#67e8f9"
              key={`${cx}-${cy}`}
              r="4"
              transition={{ duration: 5.5, repeat: Infinity, repeatType: "mirror", delay: index * 0.12 }}
            />
          ))}
        </motion.g>
        <motion.g style={shouldReduceMotion ? undefined : { x: nearX, y: nearY }}>
          {cells.map((path, index) => (
            <motion.path
              animate={shouldReduceMotion ? undefined : { pathLength: [0.88, 1, 0.92], opacity: [0.5, 0.88, 0.58] }}
              d={path}
              fill="url(#foam-membrane)"
              key={path}
              stroke="url(#foam-stroke)"
              strokeWidth={index === 4 ? "1.4" : "2"}
              transition={{ duration: 8 + index, repeat: Infinity, repeatType: "mirror", delay: index * 0.28 }}
            />
          ))}
        </motion.g>
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy-950/62 to-transparent" />
    </div>
  );
}
