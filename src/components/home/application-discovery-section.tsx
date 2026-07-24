"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AnimatedImage } from "@/components/media/animated-image";
import { applicationCategories } from "@/data/homepage";
import { HomeSection } from "./home-section";

export function ApplicationDiscoverySection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <HomeSection
      className="bg-[linear-gradient(180deg,#ffffff,#f3f8ff)]"
      eyebrow="Application discovery"
      id="applications"
      intro="Move from desired result to relevant product-family pathways without treating preliminary guidance as final engineering approval."
      title="Explore chemistry through the result you need."
    >
      <AnimatedImage
        alt="An application engineer and technical chemist reviewing polyurethane materials at an industrial construction site"
        className="mb-8 h-72 sm:h-80"
        imageClassName="object-[center_44%]"
        sizes="100vw"
        src="/images/application-engineering.webp"
      />
      <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {applicationCategories.map((application, index) => (
          <motion.div
            className="h-full"
            initial={shouldReduceMotion ? false : { opacity: 0.94, scale: 0.988, y: 10 }}
            key={application.title}
            transition={{ delay: (index % 4) * 0.07, duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ amount: 0.16, once: true }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
          >
            <Link
              className="group relative flex h-full min-h-72 flex-col overflow-hidden rounded-[var(--radius-lg)] border border-blue-100 bg-white shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:border-sky-300 hover:bg-sky-50/60 hover:shadow-[0_20px_55px_rgba(30,64,175,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
              href={application.href}
            >
              <div className="absolute right-4 top-4 z-10 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 font-mono text-xs font-semibold text-blue-700">
                {String(index + 1).padStart(2, "0")}
              </div>
              <div className="relative flex flex-1 flex-col p-5 pb-16">
                <application.icon aria-hidden="true" className="h-7 w-7 text-sky-700" />
                <h3 className="mt-6 text-xl font-black text-slate-950">{application.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{application.description}</p>
                <div className="mt-auto flex flex-wrap gap-2 pt-5">
                  {application.families.map((family) => (
                    <span
                      className="rounded-[var(--radius-sm)] border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-xs font-semibold text-blue-800"
                      key={family}
                    >
                      {family}
                    </span>
                  ))}
                </div>
              </div>
              <span className="absolute bottom-5 right-5 inline-flex h-9 w-9 items-center justify-center rounded-[var(--radius-button)] border border-blue-200 bg-blue-50 text-blue-700 transition group-hover:border-blue-400 group-hover:bg-blue-100 group-hover:text-blue-900">
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </HomeSection>
  );
}
