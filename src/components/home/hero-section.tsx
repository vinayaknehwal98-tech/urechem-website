"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container } from "@/components/ui/container";

const HERO_VIDEO_FULL_HD =
  "https://videos.pexels.com/video-files/9339478/9339478-hd_1920_1080_24fps.mp4";

const HERO_VIDEO_HD =
  "https://videos.pexels.com/video-files/9339478/9339478-hd_1280_720_24fps.mp4";

const HERO_POSTER =
  "https://images.pexels.com/videos/9339478/pexels-photo-9339478.jpeg?auto=compress&fit=crop&w=2200";

const HERO_COMPLETE_ATTRIBUTE = "data-urechem-hero-intro-complete";
const HERO_COMPLETE_EVENT = "urechem:hero-intro-complete";
const HERO_SEQUENCE_DURATION_MS = 2300;

const processSteps = ["Formulate", "Validate", "Deliver"];
const heroTitleWords = "Intelligent chemistry for better polyurethane solutions.".split(" ");
const revealEase = [0.22, 1, 0.36, 1] as const;

const titleContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.07,
    },
  },
};

const titleWordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 34,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "none",
    transition: {
      duration: 0.72,
      ease: revealEase,
    },
  },
};

const supportingCopyVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.64,
      ease: revealEase,
    },
  }),
};

const processContainerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.28,
      duration: 0.68,
      ease: revealEase,
    },
  },
};

const processStepVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 1.44 + index * 0.12,
      duration: 0.56,
      ease: revealEase,
    },
  }),
};

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoIsPlaying, setVideoIsPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [heroCanAnimate, setHeroCanAnimate] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      const frame = window.requestAnimationFrame(() => setHeroCanAnimate(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const html = document.documentElement;
    let introObserver: MutationObserver | null = null;
    let frame = 0;

    const revealHero = () => {
      frame = window.requestAnimationFrame(() => setHeroCanAnimate(true));
    };

    if (html.hasAttribute("data-urechem-intro-active")) {
      introObserver = new MutationObserver(() => {
        if (!html.hasAttribute("data-urechem-intro-active")) {
          introObserver?.disconnect();
          revealHero();
        }
      });

      introObserver.observe(html, {
        attributes: true,
        attributeFilter: ["data-urechem-intro-active"],
      });
    } else {
      revealHero();
    }

    return () => {
      introObserver?.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [shouldReduceMotion]);

  useEffect(() => {
    const html = document.documentElement;
    html.removeAttribute(HERO_COMPLETE_ATTRIBUTE);

    if (!heroCanAnimate) {
      return () => html.removeAttribute(HERO_COMPLETE_ATTRIBUTE);
    }

    let timer = 0;

    const markHeroComplete = () => {
      html.setAttribute(HERO_COMPLETE_ATTRIBUTE, "true");
      window.dispatchEvent(new Event(HERO_COMPLETE_EVENT));
    };

    timer = window.setTimeout(markHeroComplete, shouldReduceMotion ? 0 : HERO_SEQUENCE_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
      html.removeAttribute(HERO_COMPLETE_ATTRIBUTE);
    };
  }, [heroCanAnimate, shouldReduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    const section = sectionRef.current;
    if (!video || !section || shouldReduceMotion || videoFailed) return;

    const html = document.documentElement;
    let cancelled = false;
    let isInViewport = true;
    let playFrame = 0;
    let introObserver: MutationObserver | null = null;

    const playVideo = () => {
      if (
        cancelled ||
        document.hidden ||
        !isInViewport ||
        html.hasAttribute("data-urechem-intro-active")
      ) {
        return;
      }

      void video.play().catch(() => {
        if (!cancelled) setVideoFailed(true);
      });
    };

    const schedulePlay = () => {
      window.cancelAnimationFrame(playFrame);
      playFrame = window.requestAnimationFrame(playVideo);
    };

    const viewportObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewport = Boolean(entry?.isIntersecting);

        if (isInViewport) {
          schedulePlay();
        } else {
          window.cancelAnimationFrame(playFrame);
          video.pause();
        }
      },
      { threshold: 0 },
    );
    viewportObserver.observe(section);

    if (html.hasAttribute("data-urechem-intro-active")) {
      introObserver = new MutationObserver(() => {
        if (!html.hasAttribute("data-urechem-intro-active")) {
          introObserver?.disconnect();
          schedulePlay();
        }
      });

      introObserver.observe(html, {
        attributes: true,
        attributeFilter: ["data-urechem-intro-active"],
      });
    } else {
      schedulePlay();
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        window.cancelAnimationFrame(playFrame);
        video.pause();
      } else if (isInViewport) {
        schedulePlay();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(playFrame);
      introObserver?.disconnect();
      viewportObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.pause();
    };
  }, [shouldReduceMotion, videoFailed]);

  const animationState = heroCanAnimate ? "visible" : "hidden";

  return (
    <section
      className="minimal-hero relative isolate overflow-hidden border-b border-blue-100 bg-slate-100 md:min-h-[calc(100dvh-4.5rem)]"
      data-urechem-hero-section
      ref={sectionRef}
    >
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
          preload="metadata"
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
          <motion.h1
            animate={animationState}
            aria-label="Intelligent chemistry for better polyurethane solutions."
            className="hero-title max-w-[20rem] text-[clamp(2.35rem,8.5vw,3rem)] font-semibold leading-[1.02] tracking-[-0.035em] sm:max-w-2xl sm:text-[clamp(3.25rem,4.6vw,4.5rem)] sm:leading-[0.98]"
            initial={shouldReduceMotion ? false : "hidden"}
            variants={titleContainerVariants}
          >
            {heroTitleWords.map((word, index) => (
              <motion.span
                aria-hidden="true"
                className="mr-[0.22em] inline-block will-change-transform last:mr-0"
                key={`${word}-${index}`}
                variants={titleWordVariants}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            animate={animationState}
            className="hero-tagline mt-6 text-base font-semibold sm:text-lg"
            custom={0.92}
            initial={shouldReduceMotion ? false : "hidden"}
            variants={supportingCopyVariants}
          >
            We deliver what we promise.
          </motion.p>

          <motion.p
            animate={animationState}
            className="hero-description mt-3 max-w-lg text-sm leading-6 sm:text-base sm:leading-7"
            custom={1.08}
            initial={shouldReduceMotion ? false : "hidden"}
            variants={supportingCopyVariants}
          >
            Advanced polyurethane systems, specialty chemicals and technical support for real-world applications.
          </motion.p>

          <motion.div
            animate={animationState}
            className="hero-process mt-10 grid max-w-xl grid-cols-3 border-y border-white/25"
            initial={shouldReduceMotion ? false : "hidden"}
            variants={processContainerVariants}
          >
            {processSteps.map((step, index) => (
              <motion.div
                className={`py-4 ${index > 0 ? "border-l border-white/20 pl-5 sm:pl-6" : "pr-4"}`}
                custom={index}
                key={step}
                variants={processStepVariants}
              >
                <span className="hero-step-number block text-[0.62rem] font-semibold tracking-[0.24em]">
                  0{index + 1}
                </span>
                <span className="hero-step-label mt-1.5 block text-xs font-medium uppercase tracking-[0.16em] sm:text-sm">
                  {step}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Container>

      <style jsx global>{`
        html {
          scrollbar-width: none !important;
        }

        html::-webkit-scrollbar,
        body::-webkit-scrollbar {
          display: none !important;
          width: 0 !important;
          height: 0 !important;
        }

        .minimal-hero .hero-title {
          color: #ffffff !important;
          text-shadow: 0 3px 18px rgba(2, 15, 28, 0.26);
        }

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
