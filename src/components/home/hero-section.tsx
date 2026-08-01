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
    text: "Application-focused chemistry.",
  },
  {
    icon: ShieldCheck,
    label: "Validation-aware",
    text: "Specialist-reviewed pathways.",
  },
  {
    icon: Boxes,
    label: "Supply connected",
    text: "Support from development to supply.",
  },
];

const introContainer = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
    },
  },
};

const introItem = {
  hidden: { opacity: 0, y: 16 },
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
        className="absolute inset-0 -z-20 bg-[linear-gradient(90deg,rgba(3,16,29,0.7)_0%,rgba(3,16,29,0.5)_40%,rgba(3,16,29,0.12)_72%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,rgba(3,16,29,0.06)_0%,transparent_56%,rgba(3,16,29,0.28)_100%)]"
      />

      <Container className="flex flex-col justify-start pb-14 pt-10 sm:pb-16 sm:pt-14 md:min-h-[calc(100dvh-4.5rem)] md:justify-center md:py-20">
        <motion.div
          animate="visible"
          className="relative z-10 w-full max-w-3xl md:-translate-y-5"
          initial={shouldReduceMotion ? false : "hidden"}
          variants={introContainer}
        >
          <motion.p
            className="hero-eyebrow text-xs font-bold uppercase tracking-[0.28em] sm:text-sm"
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            variants={introItem}
          >
            <span className="inline-flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-9 bg-cyan-300" />
              URECHEM CHEMICALS
            </span>
          </motion.p>

          <motion.h1
            className="hero-white mt-5 max-w-[23rem] text-[clamp(2.4rem,8.5vw,3rem)] font-bold leading-[1.02] tracking-[-0.04em] sm:max-w-3xl sm:text-[clamp(3.25rem,4.9vw,4.8rem)] sm:leading-[0.98]"
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            variants={introItem}
          >
            Intelligent chemistry for better polyurethane solutions.
          </motion.h1>

          <motion.div
            aria-hidden="true"
            className="mt-6 h-px w-16 origin-left bg-cyan-300"
            transition={{ delay: 0.15, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            variants={{ hidden: { opacity: 0, scaleX: 0 }, visible: { opacity: 1, scaleX: 1 } }}
          />

          <motion.p
            className="hero-white mt-5 text-lg font-semibold sm:text-xl"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            variants={introItem}
          >
            We deliver what we promise.
          </motion.p>

          <motion.p
            className="hero-description mt-3 max-w-xl text-base leading-7 sm:text-lg sm:leading-8"
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            variants={introItem}
          >
            Advanced polyurethane systems, specialty chemicals and technical support engineered around real-world applications.
          </motion.p>
        </motion.div>
      </Container>

      <Container className="relative z-10 hidden pb-9 md:block">
        <div className="grid border-t border-white/20 pt-5 md:grid-cols-3">
          {proofPoints.map((item, index) => (
            <motion.div
              className={`flex items-start gap-3 py-2 ${index > 0 ? "md:border-l md:border-white/15 md:pl-6" : ""}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              key={item.label}
              transition={{ delay: 0.4 + index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            >
              <item.icon aria-hidden="true" className="hero-cyan mt-0.5 h-4 w-4 shrink-0" />
              <div>
                <h2 className="hero-white text-sm font-semibold">{item.label}</h2>
                <p className="hero-muted mt-1 text-sm">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      <style jsx global>{`
        .minimal-hero .hero-white {
          color: #ffffff !important;
        }

        .minimal-hero .hero-eyebrow,
        .minimal-hero .hero-cyan {
          color: #a5f3fc !important;
        }

        .minimal-hero .hero-description {
          color: rgba(255, 255, 255, 0.82) !important;
        }

        .minimal-hero .hero-muted {
          color: rgba(255, 255, 255, 0.66) !important;
        }

        .minimal-hero h1 {
          text-shadow: 0 2px 18px rgba(2, 18, 36, 0.38);
        }
      `}</style>
    </section>
  );
}
