"use client";

import { useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";

type MotionKind = "heading" | "copy" | "card" | "image" | "control";

type SitewideScrollMotionProps = {
  children: React.ReactNode;
};

type SavedStyle = {
  backfaceVisibility: string;
  filter: string;
  opacity: string;
  transform: string;
  transformOrigin: string;
  willChange: string;
};

const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const TARGET_ATTRIBUTE = "data-site-motion-target";
const DONE_ATTRIBUTE = "data-site-motion-done";
const SWEEP_ATTRIBUTE = "data-site-motion-sweep";

function isCardCandidate(element: HTMLElement) {
  if (element.tagName === "ARTICLE") return true;

  const classes = element.className;
  if (typeof classes !== "string") return false;

  const hasCardShape = classes.includes("rounded") && classes.includes("border");
  const hasCardContent = Boolean(element.querySelector("h2, h3, h4"));
  const hasCardDepth = classes.includes("shadow") || element.children.length >= 3;

  return hasCardShape && hasCardContent && hasCardDepth;
}

function isInsideAssignedTarget(element: HTMLElement) {
  return Boolean(element.parentElement?.closest<HTMLElement>(`[${TARGET_ATTRIBUTE}]`));
}

function keyframesFor(kind: MotionKind, direction: number): Keyframe[] {
  switch (kind) {
    case "heading":
      return [
        {
          opacity: 0,
          transform: "translate3d(0, 82px, 0) rotateX(8deg)",
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) rotateX(0deg)",
          filter: "blur(0px)",
        },
      ];
    case "card":
      return [
        {
          opacity: 0,
          transform: "translate3d(0, 86px, 0) scale(0.92) rotateX(9deg)",
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) scale(1) rotateX(0deg)",
          filter: "blur(0px)",
        },
      ];
    case "image":
      return [
        {
          opacity: 0,
          transform: `translate3d(${direction * 72}px, 28px, 0) scale(0.94)`,
          filter: "blur(10px) saturate(0.8)",
        },
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) scale(1)",
          filter: "blur(0px) saturate(1)",
        },
      ];
    case "control":
      return [
        { opacity: 0, transform: "translate3d(0, 38px, 0) scale(0.95)" },
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
      ];
    case "copy":
    default:
      return [
        { opacity: 0, transform: "translate3d(0, 44px, 0)", filter: "blur(7px)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)", filter: "blur(0px)" },
      ];
  }
}

function durationFor(kind: MotionKind) {
  if (kind === "heading") return 1520;
  if (kind === "card") return 1460;
  if (kind === "image") return 1620;
  if (kind === "control") return 1220;
  return 1340;
}

function saveStyle(element: HTMLElement): SavedStyle {
  return {
    backfaceVisibility: element.style.backfaceVisibility,
    filter: element.style.filter,
    opacity: element.style.opacity,
    transform: element.style.transform,
    transformOrigin: element.style.transformOrigin,
    willChange: element.style.willChange,
  };
}

function restoreStyle(element: HTMLElement, saved: SavedStyle) {
  element.style.backfaceVisibility = saved.backfaceVisibility;
  element.style.filter = saved.filter;
  element.style.opacity = saved.opacity;
  element.style.transform = saved.transform;
  element.style.transformOrigin = saved.transformOrigin;
  element.style.willChange = saved.willChange;
}

function hideUntilReveal(element: HTMLElement, kind: MotionKind, direction: number) {
  element.style.backfaceVisibility = "hidden";
  element.style.transformOrigin = kind === "heading" ? "left bottom" : "center bottom";
  element.style.willChange = kind === "control" ? "transform, opacity" : "transform, opacity, filter";
  element.style.opacity = "0";

  if (kind === "heading") {
    element.style.transform = "translate3d(0, 82px, 0) rotateX(8deg)";
    element.style.filter = "blur(10px)";
    return;
  }

  if (kind === "card") {
    element.style.transform = "translate3d(0, 86px, 0) scale(0.92) rotateX(9deg)";
    element.style.filter = "blur(10px)";
    return;
  }

  if (kind === "image") {
    element.style.transform = `translate3d(${direction * 72}px, 28px, 0) scale(0.94)`;
    element.style.filter = "blur(10px) saturate(0.8)";
    return;
  }

  if (kind === "control") {
    element.style.transform = "translate3d(0, 38px, 0) scale(0.95)";
    element.style.filter = "none";
    return;
  }

  element.style.transform = "translate3d(0, 44px, 0)";
  element.style.filter = "blur(7px)";
}

function addImageSweep(element: HTMLElement, delay: number, animations: Set<Animation>) {
  if (!element.matches("figure, picture, [data-site-motion-image-shell]")) return;

  const previousPosition = element.style.position;
  const computedPosition = window.getComputedStyle(element).position;
  if (computedPosition === "static") element.style.position = "relative";

  const sweep = document.createElement("span");
  sweep.setAttribute("aria-hidden", "true");
  sweep.setAttribute(SWEEP_ATTRIBUTE, "true");
  Object.assign(sweep.style, {
    position: "absolute",
    inset: "-6% auto -6% 0",
    width: "56%",
    zIndex: "40",
    pointerEvents: "none",
    background: "linear-gradient(110deg, #082f67 0%, #2563eb 52%, #67e8f9 100%)",
    boxShadow: "0 0 48px rgba(37, 99, 235, 0.34)",
    transform: "translate3d(-170%,0,0) skewX(-12deg)",
    willChange: "transform, opacity",
  });
  element.appendChild(sweep);

  const animation = sweep.animate(
    [
      { transform: "translate3d(-170%,0,0) skewX(-12deg)", opacity: 0.96 },
      { transform: "translate3d(255%,0,0) skewX(-12deg)", opacity: 0 },
    ],
    {
      delay: delay + 80,
      duration: 1520,
      easing: EASING,
      fill: "both",
    },
  );

  animations.add(animation);
  animation.onfinish = () => {
    animations.delete(animation);
    animation.cancel();
    sweep.remove();
    if (computedPosition === "static") element.style.position = previousPosition;
  };
}

export function SitewideScrollMotion({ children }: SitewideScrollMotionProps) {
  const pathname = usePathname();
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (pathname === "/") return;

    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let disposed = false;
    let setupFrame = 0;
    let scanFrame = 0;
    let observer: IntersectionObserver | null = null;
    let introObserver: MutationObserver | null = null;
    let contentObserver: MutationObserver | null = null;

    const registered = new Set<HTMLElement>();
    const animations = new Set<Animation>();
    const savedStyles = new Map<HTMLElement, SavedStyle>();

    const play = (element: HTMLElement) => {
      if (disposed || element.hasAttribute(DONE_ATTRIBUTE)) return;

      const kind = (element.getAttribute(TARGET_ATTRIBUTE) || "copy") as MotionKind;
      const delay = Number(element.dataset.siteMotionDelay || 0);
      const direction = Number(element.dataset.siteMotionDirection || 1);
      const saved = savedStyles.get(element) ?? saveStyle(element);

      element.setAttribute(DONE_ATTRIBUTE, "true");
      observer?.unobserve(element);

      const animation = element.animate(keyframesFor(kind, direction), {
        delay,
        duration: durationFor(kind),
        easing: EASING,
        fill: "both",
      });

      animations.add(animation);
      if (kind === "image") addImageSweep(element, delay, animations);

      animation.onfinish = () => {
        animations.delete(animation);
        animation.cancel();
        restoreStyle(element, saved);
      };
    };

    const registerTarget = (
      element: HTMLElement,
      kind: MotionKind,
      delay: number,
      direction = 1,
    ) => {
      if (
        registered.has(element) ||
        element.hasAttribute(TARGET_ATTRIBUTE) ||
        isInsideAssignedTarget(element) ||
        element.closest("[data-no-site-motion]") ||
        element.closest("[aria-hidden='true']") ||
        element.hidden
      ) {
        return;
      }

      savedStyles.set(element, saveStyle(element));
      element.setAttribute(TARGET_ATTRIBUTE, kind);
      element.dataset.siteMotionDelay = String(Math.min(delay, 520));
      element.dataset.siteMotionDirection = String(direction);
      hideUntilReveal(element, kind, direction);
      registered.add(element);
      observer?.observe(element);
    };

    const registerImage = (image: HTMLElement, sectionIndex: number, imageIndex: number) => {
      const direction = (sectionIndex + imageIndex) % 2 === 0 ? 1 : -1;
      const shell = image.closest<HTMLElement>(
        "figure, picture, [class*='overflow-hidden'][class*='rounded']",
      );

      if (shell && !shell.closest(`[${TARGET_ATTRIBUTE}]`) && !shell.closest("[data-no-site-motion]")) {
        shell.setAttribute("data-site-motion-image-shell", "true");
        registerTarget(shell, "image", imageIndex * 120, direction);
        return;
      }

      registerTarget(image, "image", imageIndex * 120, direction);
    };

    const scan = () => {
      scanFrame = 0;
      if (disposed) return;

      const sections = Array.from(root.querySelectorAll<HTMLElement>("section"));

      sections.forEach((section, sectionIndex) => {
        if (section.closest("[data-no-site-motion]")) return;

        let cardIndex = 0;
        let imageIndex = 0;
        let headingIndex = 0;
        let copyIndex = 0;
        let controlIndex = 0;

        section
          .querySelectorAll<HTMLElement>(
            "article, a[class*='rounded'][class*='border'], div[class*='rounded'][class*='border']",
          )
          .forEach((element) => {
            if (!isCardCandidate(element)) return;
            registerTarget(element, "card", cardIndex * 125);
            cardIndex += 1;
          });

        section.querySelectorAll<HTMLElement>("figure, picture").forEach((element) => {
          registerImage(element, sectionIndex, imageIndex);
          imageIndex += 1;
        });

        section.querySelectorAll<HTMLElement>("img, video").forEach((element) => {
          if (element.closest("figure, picture, [data-no-site-motion]")) return;
          registerImage(element, sectionIndex, imageIndex);
          imageIndex += 1;
        });

        section.querySelectorAll<HTMLElement>("h1, h2, h3").forEach((element) => {
          registerTarget(element, "heading", headingIndex * 100);
          headingIndex += 1;
        });

        section.querySelectorAll<HTMLElement>("p, ul, ol, blockquote").forEach((element) => {
          registerTarget(element, "copy", 130 + copyIndex * 72);
          copyIndex += 1;
        });

        section
          .querySelectorAll<HTMLElement>("button, form, a[class*='inline-flex']")
          .forEach((element) => {
            registerTarget(element, "control", 180 + controlIndex * 88);
            controlIndex += 1;
          });
      });
    };

    const scheduleScan = () => {
      if (disposed || scanFrame) return;
      scanFrame = window.requestAnimationFrame(scan);
    };

    const begin = () => {
      if (disposed) return;

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) play(entry.target as HTMLElement);
          }
        },
        {
          rootMargin: "0px 0px -16% 0px",
          threshold: 0.04,
        },
      );

      scan();

      contentObserver = new MutationObserver((records) => {
        const hasRealContentAddition = records.some((record) =>
          Array.from(record.addedNodes).some((node) => {
            if (!(node instanceof HTMLElement)) return false;
            if (node.hasAttribute(SWEEP_ATTRIBUTE) || node.closest(`[${SWEEP_ATTRIBUTE}]`)) return false;
            if (node.closest("[aria-hidden='true']")) return false;
            return true;
          }),
        );

        if (hasRealContentAddition) scheduleScan();
      });
      contentObserver.observe(root, { childList: true, subtree: true });
    };

    const scheduleBegin = () => {
      setupFrame = window.requestAnimationFrame(() => {
        setupFrame = window.requestAnimationFrame(begin);
      });
    };

    if (document.documentElement.hasAttribute("data-urechem-intro-active")) {
      introObserver = new MutationObserver(() => {
        if (!document.documentElement.hasAttribute("data-urechem-intro-active")) {
          introObserver?.disconnect();
          scheduleBegin();
        }
      });
      introObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-urechem-intro-active"],
      });
    } else {
      begin();
    }

    return () => {
      disposed = true;
      window.cancelAnimationFrame(setupFrame);
      window.cancelAnimationFrame(scanFrame);
      observer?.disconnect();
      introObserver?.disconnect();
      contentObserver?.disconnect();
      animations.forEach((animation) => animation.cancel());

      registered.forEach((element) => {
        const saved = savedStyles.get(element);
        if (saved) restoreStyle(element, saved);
        element.removeAttribute(TARGET_ATTRIBUTE);
        element.removeAttribute(DONE_ATTRIBUTE);
        element.removeAttribute("data-site-motion-image-shell");
        delete element.dataset.siteMotionDelay;
        delete element.dataset.siteMotionDirection;
      });
    };
  }, [pathname]);

  return (
    <main className="flex-1" id="main-content" ref={rootRef} tabIndex={-1}>
      {children}
    </main>
  );
}
