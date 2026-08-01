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

const introContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.11,
    },
  },
};

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
    <section className="hero-stage relative isolate overflow-hidden border-b border-blue-100 bg-slate-100 md:min-h-[calc(100dvh-4.5rem)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 overflow-hidden bg-slate-100 bg-cover bg-[70%_center] md:bg-center"
        style={{ backgroundImage: `url(${HERO_POSTER})` }}
      >
        <video
          className={`hero-video-drift h-full w-full object-cover object-[70%_center] [backface-visibility:hidden] transition-opacity duration-700 ease-out md:object-center ${
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
          variants={introContainer}
        >
          <motion.p
            className="hero-eyebrow text-xs font-black uppercase tracking-[0.22em] sm:text-sm sm:tracking-[0.26em]"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            variants={introItem}
          >
            <span className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="hero-label-line h-px w-10 origin-left bg-gradient-to-r from-cyan-300 to-turquoise-300" />
              URECHEM CHEMICALS
            </span>
          </motion.p>

          <motion.h1
            className="hero-white mt-4 max-w-[22rem] text-[clamp(2.35rem,9vw,2.9rem)] font-black leading-[0.96] tracking-[-0.045em] sm:max-w-4xl sm:text-[clamp(3.4rem,5.2vw,5.25rem)] sm:leading-[0.94]"
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            variants={introItem}
          >
            <span className="block">Intelligent chemistry for</span>
            <span className="hero-gradient-text relative mt-1 inline-block pb-1">better polyurethane</span>
            <span className="block">solutions.</span>
          </motion.h1>

          <motion.p
            className="hero-white mt-5 max-w-[24rem] text-lg font-black leading-tight sm:mt-6 sm:max-w-none sm:text-[1.45rem]"
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
            variants={introItem}
          >
            <span className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="hero-pulse-dot h-2.5 w-2.5 rounded-full bg-cyan-300" />
              We deliver what we promise.
            </span>
          </motion.p>

          <motion.p
            className="hero-description mt-3 max-w-xl text-base font-medium leading-7 sm:text-lg sm:leading-8"
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
              className="hero-proof-card rounded-[var(--radius-md)] border border-white/20 bg-slate-950/10 p-4 backdrop-blur-[2px] shadow-[0_10px_32px_rgba(2,18,36,0.12)]"
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              key={item.label}
              transition={{ delay: 0.36 + index * 0.08, duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ amount: 0.25, once: true }}
              whileHover={shouldReduceMotion ? undefined : { borderColor: "rgba(103,232,249,0.5)", y: -5 }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <item.icon aria-hidden="true" className="hero-cyan h-5 w-5" />
              <h2 className="hero-white mt-3 text-sm font-bold">{item.label}</h2>
              <p className="hero-muted mt-2 text-sm font-medium leading-6">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </Container>

      <style jsx global>{`
        .hero-stage .hero-white {
          color: #ffffff !important;
        }

        .hero-stage .hero-eyebrow {
          color: #cffafe !important;
        }

        .hero-stage .hero-description {
          color: rgba(255, 255, 255, 0.88) !important;
        }

        .hero-stage .hero-cyan {
          color: #a5f3fc !important;
        }

        .hero-stage .hero-muted {
          color: rgba(255, 255, 255, 0.72) !important;
        }

        .hero-copy-shadow :is(h1, p) {
          text-shadow: 0 2px 4px rgba(2, 18, 36, 0.72), 0 10px 28px rgba(2, 18, 36, 0.42);
        }

        .hero-gradient-text {
          background: linear-gradient(100deg, #67e8f9 0%, #e0f2fe 38%, #5eead4 68%, #67e8f9 100%);
          background-size: 220% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent !important;
          filter: drop-shadow(0 5px 18px rgba(34, 211, 238, 0.2));
          animation: hero-gradient-shift 6s ease-in-out infinite;
        }

        .hero-gradient-text::after {
          position: absolute;
          right: 0;
          bottom: -0.08em;
          left: 0;
          height: 0.08em;
          border-radius: 999px;
          background: linear-gradient(90deg, rgba(103, 232, 249, 0.15), rgba(94, 234, 212, 0.92), rgba(103, 232, 249, 0.15));
          box-shadow: 0 0 22px rgba(34, 211, 238, 0.38);
          content: "";
          transform: scaleX(0);
          transform-origin: left;
          animation: hero-underline-reveal 900ms cubic-bezier(0.22, 1, 0.36, 1) 720ms forwards;
        }

        .hero-label-line {
          animation: hero-line-reveal 700ms cubic-bezier(0.22, 1, 0.36, 1) 180ms both;
        }

        .hero-pulse-dot {
          box-shadow: 0 0 0 0 rgba(103, 232, 249, 0.55);
          animation: hero-dot-pulse 2.6s ease-out infinite;
        }

        .hero-video-drift {
          transform: scale(1.015) translate3d(0, 0, 0);
          animation: hero-video-drift 18s ease-in-out infinite alternate;
          will-change: transform;
        }

        .hero-sheen {
          animation: hero-sheen-sweep 11s ease-in-out infinite;
        }

        .hero-orbit {
          animation: hero-orbit-spin 16s linear infinite;
        }

        .hero-orbit-dot {
          animation: hero-orbit-dot 5.5s ease-in-out infinite;
        }

        .hero-proof-card {
          color: #ffffff !important;
          transition: background-color 220ms ease, box-shadow 220ms ease;
        }

        .hero-proof-card:hover {
          background-color: rgba(2, 18, 36, 0.2);
          box-shadow: 0 18px 42px rgba(2, 18, 36, 0.22);
        }

        @keyframes hero-gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes hero-underline-reveal {
          to { transform: scaleX(1); }
        }

        @keyframes hero-line-reveal {
          from { opacity: 0; transform: scaleX(0); }
          to { opacity: 1; transform: scaleX(1); }
        }

        @keyframes hero-dot-pulse {
          0% { box-shadow: 0 0 0 0 rgba(103, 232, 249, 0.5); }
          65%, 100% { box-shadow: 0 0 0 12px rgba(103, 232, 249, 0); }
        }

        @keyframes hero-video-drift {
          0% { transform: scale(1.015) translate3d(0, 0, 0); }
          100% { transform: scale(1.055) translate3d(-0.7%, -0.35%, 0); }
        }

        @keyframes hero-sheen-sweep {
          0%, 18% { opacity: 0; transform: translateX(0) rotate(18deg); }
          42% { opacity: 1; }
          70%, 100% { opacity: 0; transform: translateX(720%) rotate(18deg); }
        }

        @keyframes hero-orbit-spin {
          to { transform: rotate(360deg); }
        }

        @keyframes hero-orbit-dot {
          0%, 100% { opacity: 0.45; transform: translateX(-50%) scale(0.8); }
          50% { opacity: 1; transform: translateX(-50%) scale(1.15); }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-stage :is(.hero-gradient-text, .hero-gradient-text::after, .hero-label-line, .hero-pulse-dot, .hero-video-drift, .hero-sheen, .hero-orbit, .hero-orbit-dot) {
            animation: none !important;
          }

          .hero-gradient-text::after {
            transform: scaleX(1);
          }
        }
      `}</style>
    </section>
  );
}
