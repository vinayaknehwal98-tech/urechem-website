"use client";

import { gsap } from "gsap";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

const SESSION_KEY = "urechem-opening-animation-played";

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
      // Loading is sufficient when decoding is unavailable.
    }
  });

  await Promise.race([
    Promise.allSettled([...imagePromises, document.fonts?.ready ?? Promise.resolve()]),
    delay(1500),
  ]);
}

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
    const logoMark = document.querySelector<HTMLElement>("[data-urechem-logo-mark]");
    const logoName = document.querySelector<HTMLElement>("[data-urechem-logo-name]");
    const logoTagline = document.querySelector<HTMLElement>("[data-urechem-logo-tagline]");
    const heroElements = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-intro]"));
    const revealTargets = [logoMark, logoName, logoTagline, ...heroElements].filter(
      (target): target is HTMLElement => target !== null,
    );

    html.removeAttribute("data-urechem-intro-active");
    restoreOverflowRef.current();
    if (revealTargets.length) gsap.set(revealTargets, { clearProps: "opacity,transform,visibility" });
    setIsVisible(false);
  }, []);

  const skip = useCallback(() => {
    timelineRef.current?.kill();
    if (!overlayRef.current) {
      complete();
      return;
    }
    gsap.to(overlayRef.current, {
      duration: 0.22,
      ease: "power1.out",
      opacity: 0,
      onComplete: complete,
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
    const watchdogTimer = window.setTimeout(complete, 5500);

    const run = async () => {
      try {
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const introMode = new URLSearchParams(window.location.search).get("intro");
        const explicitForce = introMode === "force";
        const automatedReview = navigator.webdriver && !explicitForce;
        const explicitSkip = introMode === "skip";
        const alreadyPlayed = sessionStorage.getItem(SESSION_KEY) === "true";
        const fullAnimation = explicitForce || (!reducedMotion && !automatedReview && !explicitSkip && !alreadyPlayed);

        if (fullAnimation) sessionStorage.setItem(SESSION_KEY, "true");
        await preloadOpeningAssets();
        if (cancelled) return;

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

        const splashCrown = splash.querySelector<SVGEllipseElement>("[data-splash-crown]");
        const splashParticles = Array.from(splash.querySelectorAll<SVGCircleElement>("[data-splash-particle]"));
        const logoMark = document.querySelector<HTMLElement>("[data-urechem-logo-mark]");
        const logoName = document.querySelector<HTMLElement>("[data-urechem-logo-name]");
        const logoTagline = document.querySelector<HTMLElement>("[data-urechem-logo-tagline]");
        const logoTargets = [logoMark, logoName, logoTagline].filter((target): target is HTMLElement => target !== null);
        const heroElements = Array.from(document.querySelectorAll<HTMLElement>("[data-hero-intro]"));
        const revealTargets = [...logoTargets, ...heroElements];

        if (!fullAnimation) {
          if (revealTargets.length) gsap.set(revealTargets, { opacity: 1, visibility: "visible" });
          gsap.to(overlay, {
            duration: reducedMotion ? 0.18 : 0.34,
            ease: "power1.out",
            opacity: 0,
            onComplete: complete,
            pointerEvents: "none",
          });
          return;
        }

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const impactX = viewportWidth / 2;
        const impactY = viewportHeight / 2;
        const maximumRadius = Math.max(
          Math.hypot(impactX, impactY),
          Math.hypot(viewportWidth - impactX, impactY),
          Math.hypot(impactX, viewportHeight - impactY),
          Math.hypot(viewportWidth - impactX, viewportHeight - impactY),
        ) * 1.08;

        const targetRect = logoMark?.getBoundingClientRect();
        const dropletSize = Math.max(60, Math.min(92, viewportWidth * 0.07));
        const targetDropletWidth = targetRect ? targetRect.width * 0.52 : dropletSize * 0.48;
        const targetScale = Math.max(0.28, targetDropletWidth / dropletSize);
        const targetX = targetRect ? targetRect.left + targetRect.width / 2 - impactX : 0;
        const targetY = targetRect ? targetRect.top + targetRect.height * 0.54 - impactY : -viewportHeight * 0.42;

        // The droplet element is centered. Its lower tip must land on the impact point,
        // so the centre stops roughly half a rendered droplet above the ripple origin.
        const dropletTipOffset = Math.max(28, droplet.getBoundingClientRect().height * 0.46);
        const impactDropY = -dropletTipOffset;
        const splashBaselinePercent = -61.25; // SVG crown is at y=49 in an 80-high viewBox.

        gsap.set(overlay, { opacity: 1 });
        gsap.set(droplet, {
          opacity: 1,
          scaleX: 0.72,
          scaleY: 1.3,
          transformOrigin: "50% 92%",
          x: impactX - viewportWidth / 2,
          y: -viewportHeight * 0.62,
        });
        gsap.set(trail, {
          opacity: 0,
          scaleY: 0.2,
          transformOrigin: "50% 100%",
          left: impactX,
          top: impactY,
          xPercent: -50,
          yPercent: -100,
        });
        gsap.set(reveal, { attr: { cx: impactX, cy: impactY, r: 0 } });
        gsap.set(liquid, { attr: { cx: impactX, cy: impactY, r: 4 }, opacity: 0 });
        gsap.set(ripple, { attr: { cx: impactX, cy: impactY, r: 8 }, opacity: 0 });
        gsap.set(splash, {
          autoAlpha: 1,
          left: impactX,
          top: impactY,
          xPercent: -50,
          yPercent: splashBaselinePercent,
        });
        if (splashCrown) gsap.set(splashCrown, { opacity: 0, scaleX: 0.15, scaleY: 0.2, transformOrigin: "50% 50%" });
        gsap.set(splashParticles, { opacity: 0, scale: 0.25, x: 0, y: 0, transformOrigin: "50% 50%" });
        if (logoTargets.length) gsap.set(logoTargets, { opacity: 0, visibility: "visible" });
        if (heroElements.length) gsap.set(heroElements, { opacity: 0, y: 26 });

        const repelX = (target: HTMLElement) => {
          const rect = target.getBoundingClientRect();
          const dx = rect.left + rect.width / 2 - impactX;
          const dy = rect.top + rect.height / 2 - impactY;
          const length = Math.hypot(dx, dy) || 1;
          return (dx / length) * Math.min(42, viewportWidth * 0.035);
        };
        const repelY = (target: HTMLElement) => {
          const rect = target.getBoundingClientRect();
          const dx = rect.left + rect.width / 2 - impactX;
          const dy = rect.top + rect.height / 2 - impactY;
          const length = Math.hypot(dx, dy) || 1;
          return (dy / length) * Math.min(42, viewportWidth * 0.035);
        };

        const timeline = gsap.timeline({ defaults: { overwrite: "auto" } });
        timelineRef.current = timeline;

        timeline
          .to(trail, { duration: 0.18, ease: "power1.out", opacity: 0.35, scaleY: 1 }, 0.16)
          .to(droplet, { duration: 0.82, ease: "power3.in", scaleX: 0.9, scaleY: 1.14, y: impactDropY }, 0.14)
          .to(trail, { duration: 0.14, ease: "power1.in", opacity: 0, scaleY: 0.35 }, 0.82)
          .to(droplet, { duration: 0.075, ease: "power3.out", scaleX: 1.58, scaleY: 0.48, y: impactDropY + dropletTipOffset * 0.2 }, 0.96)
          .to(droplet, { duration: 0.09, ease: "power2.out", scaleX: 1.05, scaleY: 0.78, y: impactDropY - 2 }, 1.035)
          .to(droplet, { duration: 0.11, ease: "power1.out", opacity: 0, scaleX: 1.75, scaleY: 0.2, y: impactDropY + 4 }, 1.09);

        if (splashCrown) {
          timeline
            .to(splashCrown, { duration: 0.12, ease: "power3.out", opacity: 0.8, scaleX: 1, scaleY: 1 }, 0.985)
            .to(splashCrown, { duration: 0.38, ease: "power2.out", opacity: 0, scaleX: 1.42, scaleY: 0.5 }, 1.12);
        }

        splashParticles.forEach((particle, index) => {
          const endX = Number(particle.dataset.x ?? 0);
          const endY = Number(particle.dataset.y ?? -30);
          const rotation = Number(particle.dataset.rotation ?? (index % 2 ? 18 : -18));
          timeline
            .to(particle, { duration: 0.045, opacity: 1, scale: 1, ease: "power1.out" }, 1 + index * 0.008)
            .to(particle, { duration: 0.42 + index * 0.018, x: endX, y: endY, rotation, ease: "power2.out" }, 1.01 + index * 0.006)
            .to(particle, { duration: 0.2, opacity: 0, scale: 0.45, ease: "power1.in" }, 1.28 + index * 0.012);
        });

        timeline
          .to(ripple, { attr: { r: 90 }, duration: 0.48, ease: "power3.out", opacity: 0.58, strokeWidth: 2 }, 1.04)
          .to(ripple, { attr: { r: 165 }, duration: 0.52, ease: "power2.out", opacity: 0 }, 1.36);

        if (revealTargets.length) {
          timeline
            .to(revealTargets, {
              duration: 0.2,
              ease: "power2.out",
              x: (index, target) => repelX(target as HTMLElement),
              y: (index, target) => repelY(target as HTMLElement),
              scale: 1.025,
              stagger: 0.012,
            }, 1.09)
            .to(revealTargets, {
              duration: 0.62,
              ease: "elastic.out(1, 0.58)",
              x: 0,
              y: 0,
              scale: 1,
              stagger: 0.018,
            }, 1.3);
        }

        timeline
          .to(liquid, { attr: { r: maximumRadius * 0.98 }, duration: 1.08, ease: "power3.inOut", opacity: 0.2 }, 1.13)
          .to(reveal, { attr: { r: maximumRadius }, duration: 1.16, ease: "power3.inOut" }, 1.13)
          .to(liquid, { duration: 0.52, ease: "power2.out", opacity: 0 }, 1.86)
          .to(cover, { duration: 0.2, opacity: 0 }, 2.16)
          .to(droplet, {
            duration: 0.58,
            ease: "power3.inOut",
            opacity: 1,
            rotation: 0,
            scale: targetScale,
            x: targetX,
            y: targetY,
          }, 2.18)
          .to(droplet, { duration: 0.16, ease: "power1.out", opacity: 0 }, 2.65);

        if (logoMark) timeline.to(logoMark, { duration: 0.16, ease: "power1.out", opacity: 1 }, 2.65);
        if (logoName) timeline.fromTo(logoName, { opacity: 0, x: -12 }, { duration: 0.42, ease: "power3.out", opacity: 1, x: 0 }, 2.68);
        if (logoTagline) timeline.fromTo(logoTagline, { opacity: 0, y: 6 }, { duration: 0.36, ease: "power2.out", opacity: 1, y: 0 }, 2.84);
        if (heroElements.length) timeline.to(heroElements, { duration: 0.64, ease: "power3.out", opacity: 1, stagger: 0.075, y: 0 }, 2.44);
        timeline.to(overlay, { duration: 0.26, ease: "power1.out", opacity: 0, onComplete: complete, pointerEvents: "none" }, 3.05);
      } catch {
        complete();
      }
    };

    const handleResize = () => {
      if (timelineRef.current && !completedRef.current) skip();
    };

    window.addEventListener("resize", handleResize, { passive: true });
    void run();

    return () => {
      cancelled = true;
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
            <circle cx="0" cy="0" fill="black" filter="url(#urechem-liquid-edge)" r="0" ref={revealRef} />
          </mask>
        </defs>
        <rect fill="#ffffff" height="100%" mask="url(#urechem-site-reveal)" ref={coverRef} width="100%" />
        <circle cx="0" cy="0" fill="url(#urechem-liquid-blue)" filter="url(#urechem-liquid-edge)" opacity="0" r="4" ref={liquidRef} />
        <circle cx="0" cy="0" fill="none" opacity="0" r="8" ref={rippleRef} stroke="#38bdf8" strokeWidth="6" />
      </svg>

      <div aria-hidden="true" className="urechem-opening__splash" ref={splashRef}>
        <svg className="urechem-opening__splash-svg" focusable="false" viewBox="0 0 120 80">
          <ellipse cx="60" cy="49" data-splash-crown fill="#0ea5e9" opacity="0" rx="42" ry="8" />
          <circle cx="60" cy="46" data-rotation="-4" data-splash-particle data-x="0" data-y="-56" fill="#38bdf8" r="5.5" />
          <circle cx="57" cy="47" data-rotation="-20" data-splash-particle data-x="-24" data-y="-46" fill="#0ea5e9" r="4.6" />
          <circle cx="63" cy="47" data-rotation="22" data-splash-particle data-x="25" data-y="-45" fill="#22d3ee" r="4.4" />
          <circle cx="54" cy="49" data-rotation="-34" data-splash-particle data-x="-46" data-y="-29" fill="#2563eb" r="3.8" />
          <circle cx="66" cy="49" data-rotation="35" data-splash-particle data-x="47" data-y="-27" fill="#0ea5e9" r="3.6" />
          <circle cx="52" cy="50" data-rotation="-48" data-splash-particle data-x="-62" data-y="-12" fill="#38bdf8" r="2.8" />
          <circle cx="68" cy="50" data-rotation="48" data-splash-particle data-x="63" data-y="-10" fill="#2563eb" r="2.7" />
          <circle cx="58" cy="49" data-rotation="-12" data-splash-particle data-x="-13" data-y="-32" fill="#7dd3fc" r="2.5" />
          <circle cx="62" cy="49" data-rotation="14" data-splash-particle data-x="14" data-y="-31" fill="#67e8f9" r="2.4" />
        </svg>
      </div>

      <div aria-hidden="true" className="urechem-opening__trail" ref={trailRef} />
      <div aria-hidden="true" className="urechem-opening__droplet" ref={dropletRef}><OpeningDroplet /></div>
      <span className="sr-only" role="status">Loading Urechem Chemicals</span>
    </div>
  );
}
