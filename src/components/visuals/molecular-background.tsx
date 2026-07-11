"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { PointerEvent } from "react";

const nodes = [
  { cx: 76, cy: 84, r: 6 },
  { cx: 155, cy: 47, r: 4 },
  { cx: 235, cy: 92, r: 7 },
  { cx: 314, cy: 56, r: 5 },
  { cx: 399, cy: 119, r: 6 },
  { cx: 453, cy: 67, r: 4 },
  { cx: 523, cy: 132, r: 7 },
  { cx: 121, cy: 181, r: 5 },
  { cx: 217, cy: 225, r: 8 },
  { cx: 331, cy: 192, r: 5 },
  { cx: 438, cy: 242, r: 6 },
  { cx: 551, cy: 214, r: 5 },
  { cx: 86, cy: 310, r: 8 },
  { cx: 183, cy: 362, r: 5 },
  { cx: 292, cy: 324, r: 7 },
  { cx: 384, cy: 381, r: 5 },
  { cx: 498, cy: 333, r: 8 },
];

const links = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [0, 7],
  [7, 8],
  [8, 9],
  [9, 10],
  [10, 11],
  [7, 12],
  [12, 13],
  [13, 14],
  [14, 15],
  [15, 16],
  [8, 14],
  [10, 16],
];

export function MolecularBackground() {
  const shouldReduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 80, damping: 24 });
  const smoothY = useSpring(pointerY, { stiffness: 80, damping: 24 });
  const translateX = useTransform(smoothX, [-1, 1], [-16, 16]);
  const translateY = useTransform(smoothY, [-1, 1], [-12, 12]);

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
      className="pointer-events-none absolute inset-0 overflow-hidden"
      onPointerMove={handlePointerMove}
    >
      <motion.div
        className="absolute right-[-7rem] top-12 hidden h-[34rem] w-[44rem] opacity-80 md:block"
        style={shouldReduceMotion ? undefined : { x: translateX, y: translateY }}
      >
        <svg className="h-full w-full" fill="none" viewBox="0 0 620 440" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="molecule-line" x1="76" x2="551" y1="84" y2="381">
              <stop stopColor="#22d3ee" stopOpacity="0.2" />
              <stop offset="0.5" stopColor="#2dd4bf" stopOpacity="0.62" />
              <stop offset="1" stopColor="#cbd5e1" stopOpacity="0.18" />
            </linearGradient>
            <radialGradient id="molecule-node" cx="0" cy="0" gradientTransform="translate(0.5 0.5) scale(0.5)" r="1">
              <stop stopColor="#ffffff" />
              <stop offset="0.42" stopColor="#67e8f9" />
              <stop offset="1" stopColor="#0f766e" stopOpacity="0.2" />
            </radialGradient>
          </defs>
          {links.map(([from, to]) => (
            <motion.line
              animate={shouldReduceMotion ? undefined : { opacity: [0.2, 0.72, 0.28] }}
              key={`${from}-${to}`}
              stroke="url(#molecule-line)"
              strokeLinecap="round"
              strokeWidth="1.4"
              transition={{ duration: 7, repeat: Infinity, repeatType: "mirror", delay: from * 0.08 }}
              x1={nodes[from].cx}
              x2={nodes[to].cx}
              y1={nodes[from].cy}
              y2={nodes[to].cy}
            />
          ))}
          {nodes.map((node, index) => (
            <motion.circle
              animate={shouldReduceMotion ? undefined : { scale: [1, 1.26, 1], opacity: [0.62, 1, 0.68] }}
              cx={node.cx}
              cy={node.cy}
              fill="url(#molecule-node)"
              key={`${node.cx}-${node.cy}`}
              r={node.r}
              transition={{ duration: 5.8, repeat: Infinity, repeatType: "mirror", delay: index * 0.12 }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
