"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { applicationCategories } from "@/data/homepage";
import { HomeSection } from "./home-section";

export function ApplicationDiscoverySection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <HomeSection
      className="bg-[linear-gradient(180deg,rgba(4,17,31,0.98),rgba(7,26,45,0.94))]"
      eyebrow="Application discovery"
      id="applications"
      intro="Move from desired result to relevant product-family pathways without treating preliminary guidance as final engineering approval."
      title="Explore chemistry through the result you need."
    >
      <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {applicationCategories.map((application, index) => (
          <motion.div
            className="h-full"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97, y: 28 }}
            key={application.title}
            transition={{ delay: (index % 4) * 0.07, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ amount: 0.2, once: true }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
          >
            <Link
              className="group relative flex h-full min-h-80 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-white/[0.045] p-5 pb-16 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/34 hover:bg-cyan-300/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
              href={application.href}
            >
              <div className="absolute inset-x-4 top-4 h-24 rounded-full border border-cyan-200/12 opacity-45 [transform:rotate(var(--tilt))]" style={{ "--tilt": `${(index % 4) * 9 - 12}deg` } as React.CSSProperties} />
              <div className="absolute right-5 top-5 font-mono text-xs text-slate-400">{String(index + 1).padStart(2, "0")}</div>
              <application.icon aria-hidden="true" className="relative h-7 w-7 text-cyan-200" />
              <h3 className="relative mt-8 text-xl font-black text-white">{application.title}</h3>
              <p className="relative mt-3 text-sm leading-6 text-slate-300">{application.description}</p>
              <div className="relative mt-auto flex flex-wrap gap-2 pt-5">
                {application.families.map((family) => (
                  <span
                    className="rounded-[var(--radius-sm)] border border-white/10 bg-white/[0.06] px-2.5 py-1.5 text-xs font-semibold text-cyan-50"
                    key={family}
                  >
                    {family}
                  </span>
                ))}
              </div>
              <span className="absolute bottom-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-button)] border border-white/10 bg-white/[0.06] text-cyan-100 transition group-hover:border-cyan-200/50 group-hover:bg-cyan-300/12">
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </HomeSection>
  );
}
