"use client";

import { useEffect, useRef, useState } from "react";
import { Beaker, Boxes, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";

const HERO_VIDEO_FULL_HD =
  "https://videos.pexels.com/video-files/9339478/9339478-hd_1920_1080_24fps.mp4";

const HERO_VIDEO_HD =
  "https://videos.pexels.com/video-files/9339478/9339478-hd_1280_720_24fps.mp4";

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

const introItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

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
    <section className="relative isolate overflow-hidden border-b border-blue-100 bg-slate-100 md:min-h-[calc(100dvh-4.5rem)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 overflow-hidden bg-slate-100 bg-cover bg-[70%_center] md:bg-center"
        style={{ backgroundImage: `url(${HERO_POSTER})` }}
      >
        <video
          className={`hero-video-drift h-full w-full object-cover object-[70%_center] [backface-visibility:hidden] [transform:translateZ(0)] transition-opacity duration-700 ease-out md:object-center ${
            videoIsPlaying && !videoFailed && !shouldReduceMotion ? "opacity-100" : "opacity-0"
          }`}
          disablePictureInPicture
          loop
          muted
          onError={() => setVideoFailed(true)}
          onPlaying={() => setVideoIsPlaying(true)}
          playsInline
          poster={HERO_POSTER}
          preload="none"
          ref={videoRef}
          tabIndex={-1}
        >
          <source media="(min-width: 1024px)" src={HERO_VIDEO_FULL_HD} type="video/mp4" />
          <source src={HERO_VIDEO_HD} type="video/mp4" />
        </video>
      </div>

      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(2,18,36,0.72)_0%,rgba(2,18,36,0.54)_38%,rgba(2,18,36,0.16)_68%,transparent_88%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(2,18,36,0.08)_0%,transparent_48%,rgba(2,18,36,0.38)_100%)]" />
      <div aria-hidden="true" className="hero-sheen absolute -inset-y-1/2 left-[-22%] -z-10 w-[18%] rotate-[18deg] bg-gradient-to-r from-transparent via-cyan-200/10 to-transparent blur-2xl" />

      <div aria-hidden="true" className="pointer-events-none absolute right-[7%] top-[18%] -z-10 hidden h-48 w-48 rounded-full border border-cyan-200/15 lg:block">
        <span className="hero-orbit absolute inset-4 rounded-full border border-white/10" />
        <span className="hero-orbit-dot absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-cyan-300/70 shadow-[0_0_24px_rgba(103,232,249,0.75)]" />
      </div>

      <Container className="flex flex-col justify-start pb-14 pt-9 sm:pb-16 sm:pt-12 md:min-h-[calc(100dvh-4.5rem)] md:justify-center md:py-16">
        <motion.div
          animate="visible"
          className="hero-copy-shadow relative z-10 w-full max-w-4xl md:-translate-y-6"
          initial={shouldReduceMotion ? false : "hidden"}
          transition={{ delayChildren: 0.08, staggerChildren: 0.11 }}
        >
          <motion.p
            className="text-xs font-black uppercase tracking-[0.22em] text-cyan-100 sm:text-sm sm:tracking-[0.26em]"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            variants={introItem}
          >
            <span className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="hero-label-line h-px w-10 origin-left bg-gradient-to-r from-cyan-300 to-turquoise-300" />
              URECHEM CHEMICALS
            </span>
          </motion.p>

          <motion.h1
            className="mt-4 max-w-[22rem] text-[clamp(2.35rem,9vw,2.9rem)] font-black leading-[0.96] tracking-[-0.045em] text-white sm:max-w-4xl sm:text-[clamp(3.4rem,5.2vw,5.25rem)] sm:leading-[0.94]"
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            variants={introItem}
          >
            <span className="block">Intelligent chemistry for</span>
            <span className="hero-gradient-text relative mt-1 inline-block pb-1">better polyurethane</span>
            <span className="block">solutions.</span>
          </motion.h1>

          <motion.p
            className="mt-5 max-w-[24rem] text-lg font-black leading-tight text-white sm:mt-6 sm:max-w-none sm:text-[1.45rem]"
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            variants={introItem}
          >
            <span className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="hero-pulse-dot h-2.5 w-2.5 rounded-full bg-cyan-300" />
              We deliver what we promise.
            </span>
          </motion.p>

          <motion.p
            className="mt-3 max-w-xl text-base font-medium leading-7 text-white/88 sm:text-lg sm:leading-8"
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            variants={introItem}
          >
            Advanced polyurethane systems, specialty chemicals and technical support engineered around real-world applications.
          </motion.p>
        </motion.div>
      </Container>

      <Container className="relative z-10 hidden pb-10 md:block">
        <div className="grid gap-3 border-t border-white/25 pt-6 md:grid-cols-3">
          {proofPoints.map((item, index) => (
            <motion.article
              className="rounded-[var(--radius-md)] border border-white/20 bg-slate-950/10 p-4 text-white backdrop-blur-[2px] shadow-[0_10px_32px_rgba(2,18,36,0.12)]"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              key={item.label}
              transition={{ delay: 0.36 + index * 0.08, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ amount: 0.25, once: true }}
              whileHover={shouldReduceMotion ? undefined : { borderColor: "rgba(103,232,249,0.5)", y: -5 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <item.icon aria-hidden="true" className="h-5 w-5 text-cyan-200" />
              <h2 className="mt-3 text-sm font-bold text-white">{item.label}</h2>
              <p className="mt-2 text-sm font-medium leading-6 text-white/72">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
