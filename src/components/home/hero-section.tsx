"use client";

import { useEffect, useRef, useState } from "react";
import { Beaker, Boxes, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";
import { MolecularBackground } from "@/components/visuals/molecular-background";

const HERO_VIDEO =
  "https://videos.pexels.com/video-files/9339478/9339478-uhd_3840_2160_24fps.mp4";

const HERO_POSTER =
  "https://images.pexels.com/videos/9339478/pexels-photo-9339478.jpeg?auto=compress&fit=crop&w=2200";

const proofPoints = [
  {
    icon: Beaker,
    label: "Formulation-led",
    text: "Application problems translated into polyurethane and specialty-chemical pathways.",
  },
  {
    icon: ShieldCheck,
    label: "Validation-aware",
    text: "Technical recommendations stay provisional until reviewed by qualified specialists.",
  },
  {
    icon: Boxes,
    label: "Supply connected",
    text: "Research, development, implementation support, quality validation and supply in one journey.",
  },
];

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || shouldReduceMotion || videoFailed) return;

    const html = document.documentElement;
    let cancelled = false;
    let introObserver: MutationObserver | null = null;

    const playVideo = () => {
      if (cancelled || document.hidden || html.hasAttribute("data-urechem-intro-active")) return;

      void video.play().catch(() => {
        if (!cancelled) setVideoFailed(true);
      });
    };

    if (html.hasAttribute("data-urechem-intro-active")) {
      introObserver = new MutationObserver(() => {
        if (!html.hasAttribute("data-urechem-intro-active")) {
          introObserver?.disconnect();
          window.requestAnimationFrame(playVideo);
        }
      });
      introObserver.observe(html, { attributes: true, attributeFilter: ["data-urechem-intro-active"] });
    } else {
      window.requestAnimationFrame(playVideo);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        playVideo();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      introObserver?.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.pause();
    };
  }, [shouldReduceMotion, videoFailed]);

  return (
    <section className="relative isolate overflow-hidden border-b border-blue-100 bg-white md:min-h-[calc(100dvh-4.5rem)]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-30 h-[36%] min-h-64 overflow-hidden bg-slate-100 bg-cover bg-[82%_center] md:inset-0 md:h-auto md:min-h-0 md:bg-[72%_center]"
        style={{ backgroundImage: `url(${HERO_POSTER})` }}
      >
        <video
          className={`h-full w-full object-cover object-[82%_center] [backface-visibility:hidden] [filter:saturate(.78)_brightness(1.08)_contrast(.92)] [transform:translateZ(0)] transition-opacity duration-700 ease-out md:object-[72%_center] ${
            videoIsPlaying && !videoFailed && !shouldReduceMotion ? "opacity-100" : "opacity-0"
          }`}
          disablePictureInPicture
          loop
          muted
          onError={() => setVideoFailed(true)}
          onPlaying={() => setVideoIsPlaying(true)}
          playsInline
          poster={HERO_POSTER}
          preload="metadata"
          ref={videoRef}
          tabIndex={-1}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,255,255,0.995)_58%,rgba(255,255,255,0.94)_72%,rgba(248,251,255,0.72)_88%,rgba(239,246,255,0.42)_100%)] md:bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.997)_40%,rgba(255,255,255,0.988)_55%,rgba(248,251,255,0.92)_65%,rgba(239,246,255,0.56)_77%,rgba(239,246,255,0.16)_90%,rgba(239,246,255,0.04)_100%)]" />
      <div className="absolute inset-0 -z-20 hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.10)_0%,rgba(255,255,255,0.04)_58%,rgba(255,255,255,0.86)_100%)] md:block" />
      <div className="hidden md:block">
        <MolecularBackground />
      </div>
      <div className="absolute inset-0 -z-10 opacity-[0.06] [background-image:radial-gradient(circle_at_1px_1px,rgba(37,99,235,0.20)_1px,transparent_0)] [background-size:26px_26px] md:opacity-[0.12]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-white via-white/80 to-transparent md:h-52" />

      <Container className="flex flex-col justify-start pb-14 pt-9 sm:pb-16 sm:pt-12 md:min-h-[calc(100dvh-4.5rem)] md:justify-center md:py-16">
        <div className="relative z-10 w-full max-w-5xl md:-translate-y-6">
          <p className="text-xs font-black uppercase tracking-[0.21em] text-blue-700 sm:text-sm sm:tracking-[0.24em]" data-hero-intro>
            URECHEM CHEMICAL
          </p>
          <h1
            className="mt-3 max-w-[20rem] text-[clamp(2.3rem,10vw,2.8rem)] font-black leading-[0.94] tracking-[-0.042em] text-blue-950 sm:mt-4 sm:max-w-5xl sm:text-[clamp(3.1rem,5.7vw,6.15rem)] sm:leading-[0.9] sm:tracking-[-0.052em]"
            data-hero-intro
          >
            Intelligent chemistry for better polyurethane solutions.
          </h1>
          <p className="mt-4 max-w-[22rem] text-xl font-black leading-tight text-sky-700 sm:mt-5 sm:max-w-none sm:text-3xl" data-hero-intro>
            We deliver what we promise.
          </p>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-700 sm:mt-4 sm:text-lg sm:leading-8" data-hero-intro>
            Advanced polyurethane systems, specialty chemicals and technical support engineered around real-world applications.
          </p>
        </div>
      </Container>

      <Container className="relative z-10 hidden pb-10 md:block">
        <div className="grid gap-3 border-t border-blue-200/70 pt-6 md:grid-cols-3">
          {proofPoints.map((item, index) => (
            <motion.article
              className="rounded-[var(--radius-md)] border border-blue-100 bg-white/90 p-4 shadow-[var(--shadow-soft)] backdrop-blur-md"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              key={item.label}
              transition={{ delay: index * 0.08, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ amount: 0.25, once: true }}
              whileHover={shouldReduceMotion ? undefined : { borderColor: "rgba(14,165,233,0.4)", y: -5 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <item.icon aria-hidden="true" className="h-5 w-5 text-sky-600" />
              <h2 className="mt-3 text-sm font-semibold text-blue-950">{item.label}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
