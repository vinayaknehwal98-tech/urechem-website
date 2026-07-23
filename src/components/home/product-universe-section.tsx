"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Atom } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { HomeSection } from "@/components/home/home-section";
import { productFamilies } from "@/data/homepage";
import { cn } from "@/lib/utils";

const accentClasses: Record<string, string> = {
  cyan: "border-cyan-200/45 bg-cyan-300/12 text-cyan-50",
  turquoise: "border-turquoise-300/45 bg-turquoise-300/12 text-turquoise-50",
  metal: "border-slate-300/32 bg-white/[0.07] text-slate-50",
};

const familyVisuals = [
  "/images/spray-foam-application.webp",
  "/images/formulation-lab.webp",
  "/images/foam-manufacturing.webp",
  "/images/formulation-lab.webp",
  "/images/foam-manufacturing.webp",
  "/images/formulation-lab.webp",
];

export function ProductUniverseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFamily = productFamilies[activeIndex];
  const shouldReduceMotion = useReducedMotion();

  return (
    <HomeSection
      className="bg-[radial-gradient(circle_at_50%_12%,rgba(34,211,238,0.12),transparent_34%),linear-gradient(180deg,rgba(7,26,45,0.96),rgba(4,17,31,0.98))]"
      eyebrow="Product universe"
      id="product-universe"
      intro="An intelligent map of Urechem product families. Select a family to reveal only approved descriptions and known product names."
      title="Specialized chemistry. Connected solutions."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative hidden overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-navy-950/58 p-4 shadow-[var(--shadow-deep)] sm:p-5 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_72%_62%,rgba(45,212,191,0.14),transparent_32%)]" />
          <svg
            aria-hidden="true"
            className="absolute inset-0 hidden h-full w-full opacity-60 lg:block"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 720 520"
          >
            <path d="M96 96L360 96L624 96M96 260L360 260L624 260M96 424L360 424L624 424" stroke="#67e8f9" strokeOpacity="0.14" />
            <path d="M96 96L360 260L624 96M96 424L360 260L624 424M96 260L360 96L624 260" stroke="#5eead4" strokeOpacity="0.1" />
          </svg>

          <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {productFamilies.map((family, index) => (
              <button
                className={cn(
                  "group flex min-h-32 w-full flex-col justify-between rounded-[var(--radius-lg)] border bg-white/[0.055] p-4 text-left shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/42 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200",
                  activeIndex === index ? accentClasses[family.accent] : "border-white/10 text-white",
                )}
                key={family.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="flex items-center gap-2 font-mono text-xs uppercase text-cyan-100/80">
                  <Atom aria-hidden="true" className="h-4 w-4" />
                  Family {index + 1}
                </span>
                <span className="mt-5 text-lg font-black">{family.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 lg:hidden">
          {productFamilies.map((family, index) => {
            const isOpen = activeIndex === index;
            const panelId = `product-family-${index}`;

            return (
              <article
                className={cn(
                  "rounded-[var(--radius-lg)] border bg-white/[0.045] shadow-[var(--shadow-soft)]",
                  isOpen ? accentClasses[family.accent] : "border-white/10 text-white",
                )}
                key={family.name}
              >
                <button
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  className="flex min-h-16 w-full items-center justify-between gap-4 px-4 py-3 text-left font-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                  type="button"
                  onClick={() => setActiveIndex(index)}
                >
                  <span>{family.name}</span>
                  <span aria-hidden="true" className="font-mono text-sm text-cyan-100">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
                {isOpen ? (
                  <div className="px-4 pb-4" id={panelId}>
                    <p className="text-sm leading-6 text-slate-200">{family.description}</p>
                    {family.products.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {family.products.map((product) => (
                          <span
                            className="rounded-[var(--radius-sm)] border border-white/10 bg-white/[0.07] px-2.5 py-1.5 text-xs font-semibold text-cyan-50"
                            key={product}
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <Link
                      className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-cyan-200/24 bg-cyan-300/10 px-4 py-2.5 text-sm font-semibold text-cyan-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                      href={family.href}
                    >
                      Explore family
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>

        <aside className="hidden overflow-hidden rounded-[var(--radius-lg)] border border-cyan-200/16 bg-[linear-gradient(145deg,rgba(11,40,64,0.82),rgba(4,17,31,0.92))] shadow-[var(--shadow-deep)] lg:block">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              key={activeFamily.name}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative h-48 overflow-hidden border-b border-white/10">
                <Image
                  alt={`${activeFamily.name} application and production context`}
                  className="object-cover transition duration-700 hover:scale-105"
                  fill
                  sizes="40vw"
                  src={familyVisuals[activeIndex]}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/76 via-transparent to-transparent" />
              </div>
              <div className="p-6">
                <p className="font-mono text-xs font-semibold uppercase text-cyan-100">Selected family</p>
                <h3 className="mt-4 text-3xl font-black text-white">{activeFamily.name}</h3>
                <p className="mt-4 text-lg leading-8 text-slate-200">{activeFamily.description}</p>
                {activeFamily.products.length > 0 ? (
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-slate-300">Known products</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeFamily.products.map((product) => (
                        <span
                          className="rounded-[var(--radius-sm)] border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-semibold text-cyan-50"
                          key={product}
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="mt-6 rounded-[var(--radius-md)] border border-white/10 bg-white/[0.05] px-4 py-3 text-sm leading-6 text-slate-300">
                    Performance materials in this family are best explored through a technical enquiry.
                  </p>
                )}
                <Link
                  className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-cyan-200/24 bg-cyan-300/10 px-5 py-3 text-sm font-semibold text-cyan-50 transition hover:border-cyan-200/60 hover:bg-cyan-300/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-200"
                  href={activeFamily.href}
                >
                  Explore family
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>
    </HomeSection>
  );
}
