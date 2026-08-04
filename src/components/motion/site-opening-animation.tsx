"use client";

import { gsap } from "gsap";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

const SESSION_KEY = "urechem-opening-animation-played";
const INTRO_WATCHDOG_MS = 2600;

function OpeningDroplet() {
  return (
    <svg aria-hidden="true" className="urechem-opening__droplet-svg" focusable="false" viewBox="0 0 120 160">
      <defs>
        <linearGradient id="urechem-opening-drop-blue" x1="24" x2="96" y1="22" y2="148" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2563eb" />
          <stop offset="0.5" stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id="urechem-opening-drop-shine" x1="36" x2="61" y1="55" y2="121" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.78" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M60 3C51 24 18 60 18 99C18 133 36 157 60 157C84 157 102 133 102 99C102 60 69 24 60 3Z" fill="url(#urechem-opening-drop-blue)" />
      <path d="M43 58C34 72 29 89 31 104C33 120 40 132 51 139C44 124 43 109 47 94C50 81 56 71 63 62C56 57 49 56 43 58Z" fill="url(#urechem-opening-drop-shine)" />
      <ellipse cx="48" cy="52" fill="#ffffff" opacity="0.44" rx="6" ry="11" transform="rotate(28 48 52)" />
    </svg>
  );
}

export function SiteOpeningAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dropletRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<SVGRectElement>(null);
  const revealRef = useRef<SVGCircleElement>(null);
  const liquidRef = useRef<SVGCircleElement>(null);
  const rippleRef = useRef<SVGCircleElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<ReturnType<typeof gsap.timeline> | null>(null);
  const completedRef = useRef(false);
  const startedRef = useRef(false);
  const restoreOverflowRef = useRef<() => void>(() => undefined);

  const complete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;

    const html = document.documentElement;
    const revealTargets = Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-urechem-logo-mark], [data-urechem-logo-name], [data-urechem-logo-tagline], [data-hero-intro]",
      ),
    );

    html.removeAttribute("data-urechem-intro-active");
    restoreOverflowRef.current();
    if (revealTargets.length) {
      gsap.set(revealTargets, { clearProps: "opacity,transform,visibility" });
    }
    setIsVisible(false);
  }, []);

  const skip = useCallback(() => {
    timelineRef.current?.kill();
    const overlay = overlayRef.current;

    if (!overlay) {
      complete();
      return;
    }

    gsap.to(overlay, {
      duration: 0.12,
      ease: "power1.out",
      opacity: 0,
      pointerEvents: "none",
      onComplete: complete,
    });
  }, [complete]);

  useLayoutEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;

    html.setAttribute("data-urechem-intro-active", "true");
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    restoreOverflowRef.current = () => {
      html.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };

    let cancelled = false;
    let startFrame = 0;
    const watchdogTimer = window.setTimeout(complete, INTRO_WATCHDOG_MS);

    const run = () => {
      if (cancelled) return;

      try {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const introMode = new URLSearchParams(window.location.search).get("intro");
        const explicitForce = introMode === "force";
        const explicitSkip = introMode === "skip";
        const automatedReview = navigator.webdriver && !explicitForce;

        let alreadyPlayed = false;
        try {
          alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === "true";
        } catch {
          alreadyPlayed = false;
        }

        const fullAnimation =
          explicitForce || (!reducedMotion && !automatedReview && !explicitSkip && !alreadyPlayed);

        if (fullAnimation) {
          try {
            sessionStorage.setItem(SESSION_KEY, "true");
          } catch {
            // The animation can still run when session storage is unavailable.
          }
        }

        const overlay = overlayRef.current;
        const droplet = dropletRef.current;
        const trail = trailRef.current;
        const cover = coverRef.current;
        const reveal = revealRef.current;
        const liquid = liquidRef.current;
        const ripple = rippleRef.current;
        const splash = splashRef.current;

        if (!overlay || !droplet || !trail || !cover || !reveal || !liquid || !ripple || !splash) {
          complete();
          return;
        }

        const logoMark = document.querySelector<HTMLElement>("[data-urechem-logo-mark]");
        const logoName = document.querySelector<HTMLElement>("[data-urechem-logo-name]");
        const logoTagline = document.querySelector<HTMLElement>("[data-urechem-logo-tagline]");
        const logoTargets = [logoMark, logoName, logoTagline].filter(
          (target): target is HTMLElement => target !== null,
        );

        if (!fullAnimation) {
          if (logoTargets.length) {
            gsap.set(logoTargets, { opacity: 1, visibility: "visible" });
          }
          gsap.to(overlay, {
            duration: reducedMotion ? 0.08 : 0.16,
            ease: "power1.out",
            opacity: 0,
            pointerEvents: "none",
            onComplete: complete,
          });
          return;
        }

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const impactX = viewportWidth / 2;
        const dropletHeight = droplet.getBoundingClientRect().height || 92;
        const impactY = viewportHeight / 2 + dropletHeight * 0.46;
        const maximumRadius =
          Math.max(
            Math.hypot(impactX, impactY),
            Math.hypot(viewportWidth - impactX, impactY),
            Math.hypot(impactX, viewportHeight - impactY),
            Math.hypot(viewportWidth - impactX, viewportHeight - impactY),
          ) * 1.08;

        const targetRect = logoMark?.getBoundingClientRect();
        const dropletSize = Math.max(60, Math.min(92, viewportWidth * 0.07));
        const targetDropletWidth = targetRect ? targetRect.width * 0.52 : dropletSize * 0.48;
        const targetScale = Math.max(0.28, targetDropletWidth / dropletSize);
        const targetX = targetRect ? targetRect.left + targetRect.width / 2 - viewportWidth / 2 : 0;
        const targetY = targetRect
          ? targetRect.top + targetRect.height * 0.54 - viewportHeight / 2
          : -viewportHeight * 0.42;

        gsap.set(overlay, { opacity: 1 });
        gsap.set(cover, { opacity: 1 });
        gsap.set(droplet, {
          opacity: 1,
          scaleX: 0.8,
          scaleY: 1.2,
          transformOrigin: "50% 55%",
          x: 0,
          y: -viewportHeight * 0.6,
        });
        gsap.set(trail, { opacity: 0, scaleY: 0.25, transformOrigin: "50% 100%" });
        gsap.set(reveal, { attr: { cx: impactX, cy: impactY, r: 0 } });
        gsap.set(liquid, { attr: { cx: impactX, cy: impactY, r: 4 }, opacity: 0 });
        gsap.set(ripple, { attr: { cx: impactX, cy: impactY, r: 8 }, opacity: 0 });
        gsap.set(splash, {
          autoAlpha: 0,
          left: impactX,
          top: impactY,
          scale: 0.18,
          transformOrigin: "50% 50%",
          xPercent: -50,
          yPercent: -50,
        });
        if (logoTargets.length) {
          gsap.set(logoTargets, { opacity: 0, visibility: "visible" });
        }

        const timeline = gsap.timeline({
          defaults: { overwrite: "auto" },
          onComplete: complete,
        });
        timelineRef.current = timeline;

        timeline
          .to(trail, { duration: 0.12, ease: "power1.out", opacity: 0.28, scaleY: 1 }, 0.04)
          .to(droplet, { duration: 0.48, ease: "power2.in", scaleX: 0.92, scaleY: 1.08, y: 0 }, 0.04)
          .to(trail, { duration: 0.1, ease: "power1.in", opacity: 0, scaleY: 0.4 }, 0.43)
          .to(droplet, { duration: 0.07, ease: "power2.out", scaleX: 1.3, scaleY: 0.7, y: 4 }, 0.52)
          .to(droplet, { duration: 0.11, ease: "back.out(2)", scaleX: 0.97, scaleY: 1.03, y: -2 }, 0.59)
          .to(splash, { autoAlpha: 0.76, duration: 0.14, ease: "power2.out", scale: 1 }, 0.54)
          .to(splash, { autoAlpha: 0, duration: 0.22, ease: "power1.out", scale: 1.3 }, 0.68)
          .to(ripple, { attr: { r: 82 }, duration: 0.32, ease: "power2.out", opacity: 0.4, strokeWidth: 1 }, 0.55)
          .to(ripple, { attr: { r: 138 }, duration: 0.26, ease: "power1.out", opacity: 0 }, 0.82)
          .to(liquid, { attr: { r: maximumRadius * 0.98 }, duration: 0.64, ease: "power3.inOut", opacity: 0.18 }, 0.6)
          .to(reveal, { attr: { r: maximumRadius * 1.08 }, duration: 0.68, ease: "power3.inOut" }, 0.6)
          .to(liquid, { duration: 0.25, ease: "power2.out", opacity: 0 }, 1.06)
          .to(cover, { duration: 0.1, opacity: 0 }, 1.18)
          .to(
            droplet,
            {
              duration: 0.34,
              ease: "power3.inOut",
              scale: targetScale,
              x: targetX,
              y: targetY,
            },
            1.02,
          )
          .to(droplet, { duration: 0.1, ease: "power1.out", opacity: 0 }, 1.34);

        if (logoMark) {
          timeline.to(logoMark, { duration: 0.1, ease: "power1.out", opacity: 1 }, 1.33);
        }
        if (logoName) {
          timeline.fromTo(
            logoName,
            { opacity: 0, x: -10 },
            { duration: 0.22, ease: "power3.out", opacity: 1, x: 0 },
            1.34,
          );
        }
        if (logoTagline) {
          timeline.fromTo(
            logoTagline,
            { opacity: 0, y: 5 },
            { duration: 0.2, ease: "power2.out", opacity: 1, y: 0 },
            1.4,
          );
        }

        timeline.to(
          overlay,
          {
            duration: 0.16,
            ease: "power1.out",
            opacity: 0,
            pointerEvents: "none",
          },
          1.5,
        );
      } catch {
        complete();
      }
    };

    const handleResize = () => {
      if (timelineRef.current && !completedRef.current) skip();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    startFrame = window.requestAnimationFrame(run);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(startFrame);
      window.clearTimeout(watchdogTimer);
      window.removeEventListener("resize", handleResize);
      timelineRef.current?.kill();
      restoreOverflowRef.current();
      html.removeAttribute("data-urechem-intro-active");
    };
  }, [complete, skip]);

  if (!isVisible) return null;

  return (
    <div className="urechem-opening" ref={overlayRef}>
      <svg aria-hidden="true" className="urechem-opening__liquid" preserveAspectRatio="none">
        <defs>
          <linearGradient id="urechem-liquid-blue" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#2563eb" />
            <stop offset="0.52" stopColor="#0ea5e9" />
            <stop offset="1" stopColor="#22d3ee" />
          </linearGradient>
          <filter id="urechem-liquid-edge" height="160%" width="160%" x="-30%" y="-30%">
            <feTurbulence baseFrequency="0.012 0.018" numOctaves="2" result="noise" seed="17" type="fractalNoise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="24" xChannelSelector="R" yChannelSelector="B" />
          </filter>
          <mask id="urechem-site-reveal">
            <rect fill="white" height="100%" width="100%" />
            <circle cx="50%" cy="50%" fill="black" filter="url(#urechem-liquid-edge)" r="0" ref={revealRef} />
          </mask>
        </defs>

        <rect fill="#ffffff" height="100%" mask="url(#urechem-site-reveal)" ref={coverRef} width="100%" />
        <circle cx="50%" cy="50%" fill="url(#urechem-liquid-blue)" filter="url(#urechem-liquid-edge)" opacity="0" r="4" ref={liquidRef} />
        <circle cx="50%" cy="50%" fill="none" opacity="0" r="8" ref={rippleRef} stroke="#38bdf8" strokeWidth="6" />
      </svg>

      <div aria-hidden="true" className="urechem-opening__splash" ref={splashRef}>
        <svg className="urechem-opening__splash-svg" focusable="false" viewBox="0 0 120 60">
          <ellipse cx="60" cy="32" fill="#0ea5e9" opacity="0.42" rx="44" ry="7" />
          <circle cx="34" cy="14" fill="#2563eb" r="4.5" />
          <circle cx="86" cy="12" fill="#22d3ee" r="4" />
          <circle cx="22" cy="34" fill="#0ea5e9" r="3" />
          <circle cx="98" cy="33" fill="#2563eb" r="2.6" />
        </svg>
      </div>

      <div aria-hidden="true" className="urechem-opening__trail" ref={trailRef} />
      <div aria-hidden="true" className="urechem-opening__droplet" ref={dropletRef}>
        <OpeningDroplet />
      </div>

      <span className="sr-only" role="status">Opening Urechem Chemicals</span>
    </div>
  );
}
