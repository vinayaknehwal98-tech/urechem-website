"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { AnimatedImage } from "@/components/media/animated-image";
import { ButtonLink } from "@/components/ui/button";
import { pathways } from "@/data/homepage";
import { HomeSection } from "./home-section";

const pathwayImages = [
  {
    src: "/images/formulation-lab.webp",
    alt: "Polyurethane formulation specialists reviewing a foam sample in a laboratory",
  },
  {
    src: "/images/ureshield-waterproofing.webp",
    alt: "Construction specialists inspecting a seamless waterproofing membrane",
  },
  {
    src: "/images/foam-manufacturing.webp",
    alt: "Quality specialist inspecting flexible polyurethane foam production",
  },
];

export function PathwaysSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <HomeSection
      className="bg-[linear-gradient(180deg,rgba(4,17,31,1),rgba(7,26,45,0.96))]"
      eyebrow="Choose your path"
      id="choose-your-path"
      title="Start with what you know."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {pathways.map((pathway, index) => (
          <motion.article
            className="group relative min-h-80 overflow-hidden rounded-[var(--radius-lg)] border border-cyan-200/14 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(11,40,64,0.58)_45%,rgba(4,17,31,0.9))] shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-cyan-200/36 hover:shadow-[0_26px_90px_rgba(0,0,0,0.36),0_0_42px_rgba(34,211,238,0.1)]"
            initial={shouldReduceMotion ? false : { opacity: 0.94, y: 10 }}
            key={pathway.title}
            transition={{ delay: index * 0.09, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ amount: 0.2, once: true }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(34,211,238,0.18),transparent_30%)] opacity-0 transition duration-300 group-hover:opacity-100" />
            <div className="absolute right-5 top-5 z-10 rounded-full border border-white/12 bg-navy-950/64 px-2 py-1 font-mono text-xs text-cyan-100">
              0{index + 1}
            </div>
            <AnimatedImage
              alt={pathwayImages[index].alt}
              className="h-44 rounded-none border-0 border-b border-white/10 shadow-none"
              imageClassName={index === 0 ? "object-[center_45%]" : "object-center"}
              sizes="(min-width: 1024px) 33vw, 100vw"
              src={pathwayImages[index].src}
            />
            <div className="relative p-6">
              <pathway.icon aria-hidden="true" className="h-8 w-8 text-cyan-200" />
              <h3 className="mt-7 text-2xl font-black text-white">{pathway.title}</h3>
              <p className="mt-4 text-base leading-7 text-slate-300">{pathway.text}</p>
              <div className="mt-8">
                <ButtonLink href={pathway.href} variant={index === 0 ? "primary" : "secondary"}>
                  {pathway.cta}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan-200/55 to-transparent" />
          </motion.article>
        ))}
      </div>
    </HomeSection>
  );
}
