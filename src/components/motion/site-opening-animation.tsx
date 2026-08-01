"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";

const SESSION_KEY = "urechem-opening-animation-played";
const GSAP_CDN = "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js";

type TweenVars = Record<string, unknown>;

type GsapTimeline = {
  fromTo: (target: unknown, fromVars: TweenVars, toVars: TweenVars, position?: number | string) => GsapTimeline;
  kill: () => void;
  set: (target: unknown, vars: TweenVars, position?: number | string) => GsapTimeline;
  to: (target: unknown, vars: TweenVars, position?: number | string) => GsapTimeline;
};

type GsapApi = {
  set: (target: unknown, vars: TweenVars) => void;
  timeline: (vars?: TweenVars) => GsapTimeline;
  to: (target: unknown, vars: TweenVars) => unknown;
};

declare global {
  interface Window {
    gsap?: GsapApi;
    __urechemGsapPromise?: Promise<GsapApi | null>;
  }
}

function loadGsap() {
  if (window.gsap) return Promise.resolve(window.gsap);
  if (window.__urechemGsapPromise) return window.__urechemGsapPromise;

  window.__urechemGsapPromise = new Promise<GsapApi | null>((resolve) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GSAP_CDN}"]`);
    if (existing) {
      existing.addEventListener("load", () => resolve(window.gsap ?? null), { once: true });
      existing.addEventListener("error", () => resolve(null), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = GSAP_CDN;
    script.addEventListener("load", () => resolve(window.gsap ?? null), { once: true });
    script.addEventListener("error", () => resolve(null), { once: true });
    document.head.appendChild(script);
  });

  return window.__urechemGsapPromise;
}

function delay(milliseconds: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));
}

async function preloadOpeningAssets() {
  const priorityImages = Array.from(
    document.querySelectorAll<HTMLImageElement>('img[fetchpriority="high"], img[src*="urechem-mark"]'),
  );

  const imagePromises = priorityImages.map(async (image) => {
    if (!image.complete) {
      await new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });
    }

    try {
      await image.decode();
    } catch {
      // A loaded image may reject decode in some browsers; loading is sufficient.
    }
  });

  await Promise.race([
    Promise.allSettled([
      ...imagePromises,
      document.fonts?.ready ?? Promise.resolve(),
    ]),
    delay(1500),
  ]);
}

function deviceNeedsSkipOption() {
  const navigatorWithHints = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };

  return Boolean(
    navigatorWithHints.connection?.saveData ||
      (navigatorWithHints.deviceMemory && navigatorWithHints.deviceMemory <= 4) ||
      navigator.hardwareConcurrency <= 4,
  );
}

function OpeningDroplet() {
  return (
    <svg
      aria-hidden="true"
      className="urechem-opening__droplet-svg"
      focusable="false"
      viewBox="0 0 120 160"
    >
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
      <path
        d="M60 3C51 24 18 60 18 99C18 133 36 157 60 157C84 157 102 133 102 99C102 60 69 24 60 3Z"
        fill="url(#urechem-opening-drop-blue)"
      />
      <path
        d="M43 58C34 72 29 89 31 104C33 120 40 132 51 139C44 124 43 109 47 94C50 81 56 71 63 62C56 57 49 56 43 58Z"
        fill="url(#urechem-opening-drop-shine)"
      />
      <ellipse cx="48" cy="52" fill="#ffffff" opacity="0.44" rx="6" ry="11" transform="rotate(28 48 52)" />
    </svg>
  );
}

export function SiteOpeningAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const dropletRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<SVGRectElement>(null);
  const revealRef = useRef<SVGCircleElement>(null);
  const liquidRef = useRef<SVGCircleElement>(null);
  const rippleRef = useRef<SVGCircleElement>(null);
  const splashRef = useRef<SVGGElement>(null);
  const timelineRef = useRef<GsapTimeline | null>(null);
  const completedRef = useRef(false);
  const startedRef = useRef(false);
  const restoreOverflowRef = useRef<() => void>(() => undefined);

  const complete = useCallback((gsap?: GsapApi | null) => {
    if (completedRef.current) return;
    completedRef.current = true;

    const html = document.documentElement;
    const logoMark = document.querySelector<HTMLElement>("[data-urechem-logo-mark]");
    const logoName = document.querySelector<HTMLElement>("[data-urechem-logo-name]");
    const logoTagline = document.querySelector<HTMLElement>("[data-urechem-logo-tagline]");
    const heroElements = document.querySelectorAll<HTMLElement>("[data-hero-intro]");

    html.removeAttribute("data-urechem-intro-active");
    restoreOverflowRef.current();

    if (gsap) {
      gsap.set([logoMark, logoName, logoTagline, heroElements], { clearProps: "opacity,transform,visibility" });
    }

    setIsVisible(false);
  }, []);

  const skip = useCallback(() => {
    const gsap = window.gsap;
    timelineRef.current?.kill();

    if (!overlayRef.current || !gsap) {
      complete(gsap);
      return;
    }

    gsap.to(overlayRef.current, {
      duration: 0.22,
      ease: "power1.out",
      opacity: 0,
      onComplete: () => complete(gsap),
      pointerEvents: "none",
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
    const slowDevice = deviceNeedsSkipOption();
    const skipTimer = window.setTimeout(() => setShowSkip(true), slowDevice ? 0 : 650);

    const run = async () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const automatedReview = navigator.webdriver;
      const explicitSkip = new URLSearchParams(window.location.search).get("intro") === "skip";
      const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === "true";
      const fullAnimation = !reducedMotion && !automatedReview && !explicitSkip && !alreadyPlayed;

      if (fullAnimation) sessionStorage.setItem(SESSION_KEY, "true");

      const [gsap] = await Promise.all([loadGsap(), preloadOpeningAssets()]);
      if (cancelled) return;

      if (!gsap || !overlayRef.current) {
        window.setTimeout(() => complete(gsap), reducedMotion ? 120 : 420);
        return;
      }

      const overlay = overlayRef.current;
      const logoMark = document.querySelector<HTMLElement>("[data-urechem-logo-mark]");
      const logoName = document.querySelector<HTMLElement>("[data-urechem-logo-name]");
      const logoTagline = document.querySelector<HTMLElement>("[data-urechem-logo-tagline]");
      const heroElements = document.querySelectorAll<HTMLElement>("[data-hero-intro]");

      if (!fullAnimation) {
        gsap.set([logoMark, logoName, logoTagline, heroElements], { opacity: 1, visibility: "visible" });
        gsap.to(overlay, {
          duration: reducedMotion ? 0.18 : 0.34,
          ease: "power1.out",
          opacity: 0,
          onComplete: () => complete(gsap),
          pointerEvents: "none",
        });
        return;
      }

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const maximumRadius = Math.hypot(viewportWidth, viewportHeight) * 0.58;
      const targetRect = logoMark?.getBoundingClientRect();
      const dropletSize = Math.max(60, Math.min(92, viewportWidth * 0.07));
      const targetDropletWidth = targetRect ? targetRect.width * 0.52 : dropletSize * 0.48;
      const targetScale = Math.max(0.28, targetDropletWidth / dropletSize);
      const targetX = targetRect ? targetRect.left + targetRect.width / 2 - viewportWidth / 2 : 0;
      const targetY = targetRect
        ? targetRect.top + targetRect.height * 0.54 - viewportHeight / 2
        : -viewportHeight * 0.42;

      gsap.set(overlay, { opacity: 1 });
      gsap.set(dropletRef.current, {
        opacity: 1,
        scaleX: 0.78,
        scaleY: 1.22,
        transformOrigin: "50% 55%",
        x: 0,
        y: -viewportHeight * 0.62,
      });
      gsap.set(trailRef.current, { opacity: 0, scaleY: 0.25, transformOrigin: "50% 100%" });
      gsap.set(revealRef.current, { attr: { r: 0 } });
      gsap.set(liquidRef.current, { attr: { r: 4 }, opacity: 0 });
      gsap.set(rippleRef.current, { attr: { r: 8 }, opacity: 0 });
      gsap.set(splashRef.current, { opacity: 0, scale: 0.18, transformOrigin: "50% 50%" });
      gsap.set([logoMark, logoName, logoTagline], { opacity: 0, visibility: "visible" });
      gsap.set(heroElements, { opacity: 0, y: 26 });

      const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });
      timelineRef.current = timeline;

      timeline
        .to(trailRef.current, { duration: 0.2, ease: "power1.out", opacity: 0.3, scaleY: 1 }, 0.18)
        .to(
          dropletRef.current,
          {
            duration: 0.78,
            ease: "power2.in",
            scaleX: 0.9,
            scaleY: 1.12,
            y: 0,
          },
          0.18,
        )
        .to(trailRef.current, { duration: 0.16, ease: "power1.in", opacity: 0, scaleY: 0.4 }, 0.78)
        .to(dropletRef.current, { duration: 0.09, ease: "power2.out", scaleX: 1.3, scaleY: 0.7, y: 4 }, 0.96)
        .to(dropletRef.current, { duration: 0.18, ease: "back.out(2)", scaleX: 0.96, scaleY: 1.04, y: -3 }, 1.05)
        .to(splashRef.current, { duration: 0.24, ease: "power2.out", opacity: 0.78, scale: 1 }, 0.98)
        .to(splashRef.current, { duration: 0.4, ease: "power1.out", opacity: 0, scale: 1.32 }, 1.2)
        .to(rippleRef.current, { attr: { r: 84 }, duration: 0.58, ease: "power2.out", opacity: 0.42, strokeWidth: 1 }, 1.01)
        .to(rippleRef.current, { attr: { r: 142 }, duration: 0.46, ease: "power1.out", opacity: 0 }, 1.46)
        .to(liquidRef.current, { attr: { r: maximumRadius * 0.98 }, duration: 1.12, ease: "power3.inOut", opacity: 0.2 }, 1.12)
        .to(revealRef.current, { attr: { r: maximumRadius * 1.08 }, duration: 1.18, ease: "power3.inOut" }, 1.12)
        .to(liquidRef.current, { duration: 0.54, ease: "power2.out", opacity: 0 }, 1.86)
        .to(coverRef.current, { duration: 0.2, opacity: 0 }, 2.16)
        .to(
          dropletRef.current,
          {
            duration: 0.58,
            ease: "power3.inOut",
            rotation: 0,
            scale: targetScale,
            x: targetX,
            y: targetY,
          },
          2.18,
        )
        .to(logoMark, { duration: 0.16, ease: "power1.out", opacity: 1 }, 2.65)
        .to(dropletRef.current, { duration: 0.16, ease: "power1.out", opacity: 0 }, 2.65)
        .fromTo(
          logoName,
          { opacity: 0, x: -12 },
          { duration: 0.42, ease: "power3.out", opacity: 1, x: 0 },
          2.68,
        )
        .fromTo(
          logoTagline,
          { opacity: 0, y: 6 },
          { duration: 0.36, ease: "power2.out", opacity: 1, y: 0 },
          2.84,
        )
        .to(
          heroElements,
          {
            duration: 0.64,
            ease: "power3.out",
            opacity: 1,
            stagger: 0.075,
            y: 0,
          },
          2.44,
        )
        .to(
          overlay,
          {
            duration: 0.26,
            ease: "power1.out",
            opacity: 0,
            onComplete: () => complete(gsap),
            pointerEvents: "none",
          },
          3.05,
        );
    };

    const handleResize = () => {
      if (timelineRef.current && !completedRef.current) skip();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    void run();

    return () => {
      cancelled = true;
      window.clearTimeout(skipTimer);
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
        <circle
          cx="50%"
          cy="50%"
          fill="url(#urechem-liquid-blue)"
          filter="url(#urechem-liquid-edge)"
          opacity="0"
          r="4"
          ref={liquidRef}
        />
        <circle
          cx="50%"
          cy="50%"
          fill="none"
          opacity="0"
          r="8"
          ref={rippleRef}
          stroke="#38bdf8"
          strokeWidth="6"
        />
        <g className="urechem-opening__splash" ref={splashRef}>
          <ellipse cx="50%" cy="50%" fill="#0ea5e9" opacity="0.42" rx="44" ry="7" />
          <circle cx="47.4%" cy="48.2%" fill="#2563eb" r="4.5" />
          <circle cx="52.8%" cy="47.9%" fill="#22d3ee" r="4" />
          <circle cx="45.6%" cy="50.6%" fill="#0ea5e9" r="3" />
          <circle cx="54.4%" cy="50.4%" fill="#2563eb" r="2.6" />
        </g>
      </svg>

      <div aria-hidden="true" className="urechem-opening__trail" ref={trailRef} />
      <div aria-hidden="true" className="urechem-opening__droplet" ref={dropletRef}>
        <OpeningDroplet />
      </div>

      <span className="sr-only" role="status">Loading Urechem Chemicals</span>
      {showSkip ? (
        <button className="urechem-opening__skip" onClick={skip} type="button">
          Skip intro
        </button>
      ) : null}
    </div>
  );
}
