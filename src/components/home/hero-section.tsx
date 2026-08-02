"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Container } from "@/components/ui/container";

const HERO_VIDEO_FULL_HD =
  "https://videos.pexels.com/video-files/9339478/9339478-hd_1920_1080_24fps.mp4";

const HERO_VIDEO_HD =
  "https://videos.pexels.com/video-files/9339478/9339478-hd_1280_720_24fps.mp4";

const HERO_POSTER =
  "https://images.pexels.com/videos/9339478/pexels-photo-9339478.jpeg?auto=compress&fit=crop&w=2200";

const processSteps = ["Formulate", "Validate", "Deliver"];

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
    <section className="minimal-hero relative isolate -mt-16 overflow-hidden border-b border-blue-100 bg-slate-100 pt-16 md:mt-0 md:min-h-[calc(100dvh-4.5rem)] md:pt-0">
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

      <Container className="flex min-h-[38rem] items-center py-16 sm:min-h-[42rem] md:min-h-[calc(100dvh-4.5rem)] md:py-24">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-cyan-300" />
            <p className="hero-eyebrow text-[0.7rem] font-semibold uppercase tracking-[0.3em] sm:text-xs">
              URECHEM CHEMICALS
            </p>
          </div>

          <h1 className="hero-title max-w-[20rem] text-[clamp(2.35rem,8.5vw,3rem)] font-semibold leading-[1.02] tracking-[-0.035em] sm:max-w-2xl sm:text-[clamp(3.25rem,4.6vw,4.5rem)] sm:leading-[0.98]">
            Intelligent chemistry for better polyurethane solutions.
          </h1>

          <p className="hero-tagline mt-6 text-base font-semibold sm:text-lg">
            We deliver what we promise.
          </p>

          <p className="hero-description mt-3 max-w-lg text-sm leading-6 sm:text-base sm:leading-7">
            Advanced polyurethane systems, specialty chemicals and technical support for real-world applications.
          </p>

          <div className="hero-process mt-10 grid max-w-xl grid-cols-3 border-y border-white/25">
            {processSteps.map((step, index) => (
              <div
                className={`py-4 ${index > 0 ? "border-l border-white/20 pl-5 sm:pl-6" : "pr-4"}`}
                key={step}
              >
                <span className="hero-step-number block text-[0.62rem] font-semibold tracking-[0.24em]">
                  0{index + 1}
                </span>
                <span className="hero-step-label mt-1.5 block text-xs font-medium uppercase tracking-[0.16em] sm:text-sm">
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <style jsx global>{`
        @media (max-width: 767px) {
          body:has(.minimal-hero) > header {
            background: transparent !important;
            border-bottom-color: transparent !important;
            box-shadow: none !important;
          }
        }

        .minimal-hero .hero-title {
          color: #ffffff !important;
          text-shadow: 0 3px 18px rgba(2, 15, 28, 0.26);
        }

        .minimal-hero .hero-eyebrow,
        .minimal-hero .hero-tagline,
        .minimal-hero .hero-step-number {
          color: #a5f3fc !important;
        }

        .minimal-hero .hero-description {
          color: rgba(255, 255, 255, 0.78) !important;
        }

        .minimal-hero .hero-step-label {
          color: rgba(255, 255, 255, 0.94) !important;
        }
      `}</style>
    </section>
  );
}
