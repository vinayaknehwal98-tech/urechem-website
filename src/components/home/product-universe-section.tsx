"use client";

import Link from "next/link";
import { ArrowUpRight, Atom } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { HomeSection } from "@/components/home/home-section";
import { AnimatedImage } from "@/components/media/animated-image";
import { productFamilies } from "@/data/homepage";
import { cn } from "@/lib/utils";

const accentClasses: Record<string, string> = {
  cyan: "border-sky-300 bg-sky-50 text-slate-950",
  turquoise: "border-teal-300 bg-teal-50 text-slate-950",
  metal: "border-slate-300 bg-slate-100 text-slate-950",
};

export function ProductUniverseSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFamily = productFamilies[activeIndex];
  const shouldReduceMotion = useReducedMotion();

  return (
    <HomeSection
      className="bg-[radial-gradient(circle_at_50%_12%,rgba(14,165,233,0.1),transparent_34%),linear-gradient(180deg,#ffffff,#f3f8ff)]"
      eyebrow="Product universe"
      id="product-universe"
      intro="An intelligent map of Urechem product families. Select a family to reveal only approved descriptions and known product names."
      title="Specialized chemistry. Connected solutions."
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative hidden overflow-hidden rounded-[var(--radius-lg)] border border-blue-100 bg-white p-4 shadow-[var(--shadow-deep)] sm:p-5 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(14,165,233,0.11),transparent_28%),radial-gradient(circle_at_72%_62%,rgba(20,184,166,0.1),transparent_32%)]" />
          <svg
            aria-hidden="true"
            className="absolute inset-0 hidden h-full w-full opacity-60 lg:block"
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 720 520"
          >
            <path d="M96 96L360 96L624 96M96 260L360 260L624 260M96 424L360 424L624 424" stroke="#0ea5e9" strokeOpacity="0.12" />
            <path d="M96 96L360 260L624 96M96 424L360 260L624 424M96 260L360 96L624 260" stroke="#14b8a6" strokeOpacity="0.09" />
          </svg>

          <div className="relative grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {productFamilies.map((family, index) => (
              <button
                className={cn(
                  "group flex min-h-32 w-full flex-col justify-between rounded-[var(--radius-lg)] border bg-white p-4 text-left text-slate-950 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-sky-400 hover:shadow-[0_18px_48px_rgba(30,64,175,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600",
                  activeIndex === index ? accentClasses[family.accent] : "border-blue-100",
                )}
                key={family.name}
                type="button"
                onClick={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <span className="flex items-center gap-2 font-mono text-xs font-semibold uppercase text-sky-700">
                  <Atom aria-hidden="true" className="h-4 w-4" />
                  Family {index + 1}
                </span>
                <span className="mt-5 text-lg font-black text-slate-950">{family.name}</span>
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
                  "rounded-[var(--radius-lg)] border bg-white text-slate-950 shadow-[var(--shadow-soft)]",
                  isOpen ? accentClasses[family.accent] : "border-blue-100",
                )}
                key={family.name}
              >
                <button
                  aria-controls={panelId}
                  aria-expanded={isOpen}
                  className="flex min-h-16 w-full items-center justify-between gap-4 px-4 py-3 text-left font-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
                  type="button"
                  onClick={() => setActiveIndex(index)}
                >
                  <span>{family.name}</span>
                  <span aria-hidden="true" className="font-mono text-sm text-sky-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </button>
                {isOpen ? (
                  <div className="px-4 pb-4" id={panelId}>
                    <p className="text-sm leading-6 text-slate-700">{family.description}</p>
                    {family.products.length > 0 ? (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {family.products.map((product) => (
                          <span
                            className="rounded-[var(--radius-sm)] border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-800"
                            key={product}
                          >
                            {product}
                          </span>
                        ))}
                      </div>
                    ) : null}
                    <Link
                      className="mt-4 inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-cyan-400 bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-navy-950 transition hover:border-cyan-500 hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
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

        <aside className="hidden overflow-hidden rounded-[var(--radius-lg)] border border-blue-100 bg-[linear-gradient(145deg,#ffffff,#eef6ff)] shadow-[var(--shadow-deep)] lg:block">
          <AnimatedImage
            alt="A curated range of polyurethane foams, coated panels, resin samples and laboratory materials"
            className="h-48 rounded-none border-0 border-b border-blue-100 shadow-none"
            sizes="40vw"
            src="/images/product-material-universe.webp"
          />
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 16 }}
              key={activeFamily.name}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.36, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="p-6">
                <p className="font-mono text-xs font-semibold uppercase text-sky-700">Selected family</p>
                <h3 className="mt-4 text-3xl font-black text-slate-950">{activeFamily.name}</h3>
                <p className="mt-4 text-lg leading-8 text-slate-700">{activeFamily.description}</p>
                {activeFamily.products.length > 0 ? (
                  <div className="mt-6">
                    <p className="text-sm font-semibold text-slate-700">Known products</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {activeFamily.products.map((product) => (
                        <span
                          className="rounded-[var(--radius-sm)] border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800"
                          key={product}
                        >
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="mt-6 rounded-[var(--radius-md)] border border-blue-200 bg-blue-50 px-4 py-3 text-sm leading-6 text-slate-700">
                    Performance materials in this family are best explored through a technical enquiry.
                  </p>
                )}
                <Link
                  className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-button)] border border-cyan-400 bg-cyan-300 px-5 py-3 text-sm font-semibold text-navy-950 transition hover:border-cyan-500 hover:bg-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
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
