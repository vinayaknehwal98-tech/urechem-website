"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";

const HERO_VIDEO_FULL_HD =
  "https://videos.pexels.com/video-files/9339478/9339478-hd_1920_1080_24fps.mp4";

const HERO_VIDEO_HD =
  "https://videos.pexels.com/video-files/9339478/9339478-hd_1280_720_24fps.mp4";

const HERO_POSTER =
  "https://images.pexels.com/videos/9339478/pexels-photo-9339478.jpeg?auto=compress&fit=crop&w=2200";

const capabilities = [
  "Polyurethane systems",
  "Specialty chemicals",
  "Technical support",
];

const introContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.06,
      staggerChildren: 0.09,
    },
  },
};

const introItem = {
  hidden: { opacity: 0, y: 12 },
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

      introObserver.observe(html, {
        attributes: true,
        attributeFilter: ["data-urechem-intro-active"],
      });
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
    <section className="minimal-hero relative isolate overflow-hidden border-b border-blue-100 bg-slate-100 md:min-h-[calc(100dvh-4.5rem)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 overflow-hidden bg-slate-100 bg-cover bg-[70%_center] md:bg-center"
        style={{ backgroundImage: `url(${HERO_POSTER})` }}
      >
        <video
          className={`h-full w-full object-cover object-[70%_center] [backface-visibility:hidden] [transform:translateZ(0)] transition-opacity duration-700 ease-out md:object-center ${
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

      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(2,15,28,0.64)_0%,rgba(2,15,28,0.4)_38%,rgba(2,15,28,0.08)_70%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-52 bg-gradient-to-t from-slate-950/35 to-transparent"
      />

      <Container className="flex min-h-[38rem] items-center pb-40 pt-16 sm:min-h-[42rem] md:min-h-[calc(100dvh-4.5rem)] md:pb-36 md:pt-24">
        <motion.div
          animate="visible"
          className="relative z-10 max-w-2xl"
          initial={shouldReduceMotion ? false : "hidden"}
          variants={introContainer}
        >
          <motion.div
            className="mb-5 flex items-center gap-3"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            variants={introItem}
          >
            <span aria-hidden="true" className="h-px w-8 bg-cyan-300" />
            <p className="hero-eyebrow text-[0.7rem] font-semibold uppercase tracking-[0.3em] sm:text-xs">
              URECHEM CHEMICALS
            </p>
          </motion.div>

          <motion.h1
            className="hero-white max-w-[20rem] text-[clamp(2.35rem,8.5vw,3rem)] font-semibold leading-[1.02] tracking-[-0.035em] sm:max-w-2xl sm:text-[clamp(3.25rem,4.6vw,4.5rem)] sm:leading-[0.98]"
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            variants={introItem}
          >
            Intelligent chemistry for better polyurethane solutions.
          </motion.h1>

          <motion.p
            className="hero-tagline mt-6 text-base font-semibold sm:text-lg"
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            variants={introItem}
          >
            We deliver what we promise.
          </motion.p>

          <motion.p
            className="hero-description mt-3 max-w-lg text-sm leading-6 sm:text-base sm:leading-7"
            transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
            variants={introItem}
          >
            Advanced polyurethane systems, specialty chemicals and technical support for real-world applications.
          </motion.p>
        </motion.div>
      </Container>

      <motion.div
        animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-white/20 bg-slate-950/10 backdrop-blur-[2px]"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
        transition={{ delay: 0.45, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Container className="grid grid-cols-1 divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {capabilities.map((capability, index) => (
            <div
              className="group flex items-center gap-4 py-4 sm:px-5 sm:py-5 first:sm:pl-0 last:sm:pr-0"
              key={capability}
            >
              <span className="hero-index text-[0.65rem] font-semibold tracking-[0.22em]">
                0{index + 1}
              </span>
              <span className="hero-capability text-sm font-medium tracking-wide sm:text-[0.92rem]">
                {capability}
              </span>
              <span
                aria-hidden="true"
                className="ml-auto h-px w-5 origin-right bg-cyan-300/70 transition-transform duration-300 group-hover:scale-x-150"
              />
            </div>
          ))}
        </Container>
      </motion.div>

      <style jsx global>{`
        .minimal-hero .hero-white {
          color: #ffffff !important;
        }

        .minimal-hero .hero-eyebrow,
        .minimal-hero .hero-tagline,
        .minimal-hero .hero-index {
          color: #a5f3fc !important;
        }

        .minimal-hero .hero-description {
          color: rgba(255, 255, 255, 0.78) !important;
        }

        .minimal-hero .hero-capability {
          color: rgba(255, 255, 255, 0.92) !important;
        }
      `}</style>
    </section>
  );
}
