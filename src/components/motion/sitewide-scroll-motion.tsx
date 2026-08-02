"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type MotionKind = "heading" | "copy" | "card" | "image" | "control";

const EASING = "cubic-bezier(0.16, 1, 0.3, 1)";
const TARGET_ATTRIBUTE = "data-site-motion-target";
const DONE_ATTRIBUTE = "data-site-motion-done";

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
  const assignedParent = element.parentElement?.closest<HTMLElement>(`[${TARGET_ATTRIBUTE}]`);
  return Boolean(assignedParent);
}

function registerTarget(
  registered: HTMLElement[],
  element: HTMLElement,
  kind: MotionKind,
  delay: number,
  direction = 1,
) {
  if (
    element.hasAttribute(TARGET_ATTRIBUTE) ||
    isInsideAssignedTarget(element) ||
    element.closest("[data-no-site-motion]") ||
    element.closest("[aria-hidden='true']") ||
    element.hidden
  ) {
    return;
  }

  element.setAttribute(TARGET_ATTRIBUTE, kind);
  element.dataset.siteMotionDelay = String(Math.min(delay, 320));
  element.dataset.siteMotionDirection = String(direction);
  registered.push(element);
}

function keyframesFor(kind: MotionKind, direction: number): Keyframe[] {
  switch (kind) {
    case "heading":
      return [
        {
          opacity: 0.18,
          transform: "translate3d(0, 76px, 0) rotateX(8deg)",
          filter: "blur(8px)",
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
          opacity: 0.2,
          transform: "translate3d(0, 72px, 0) scale(0.93) rotateX(8deg)",
          filter: "blur(8px)",
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
          opacity: 0.2,
          transform: `translate3d(${direction * 64}px, 22px, 0) scale(0.95)`,
          filter: "blur(8px) saturate(0.82)",
        },
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0) scale(1)",
          filter: "blur(0px) saturate(1)",
        },
      ];
    case "control":
      return [
        { opacity: 0.28, transform: "translate3d(0, 30px, 0) scale(0.96)" },
        { opacity: 1, transform: "translate3d(0, 0, 0) scale(1)" },
      ];
    case "copy":
    default:
      return [
        { opacity: 0.28, transform: "translate3d(0, 34px, 0)", filter: "blur(5px)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)", filter: "blur(0px)" },
      ];
  }
}

function durationFor(kind: MotionKind) {
  if (kind === "heading") return 980;
  if (kind === "card") return 940;
  if (kind === "image") return 1020;
  if (kind === "control") return 760;
  return 820;
}

function addImageSweep(element: HTMLElement, delay: number, animations: Animation[]) {
  if (!element.matches("figure, picture")) return;

  const previousPosition = element.style.position;
  const computedPosition = window.getComputedStyle(element).position;
  if (computedPosition === "static") element.style.position = "relative";

  const sweep = document.createElement("span");
  sweep.setAttribute("aria-hidden", "true");
  Object.assign(sweep.style, {
    position: "absolute",
    inset: "-6% auto -6% 0",
    width: "56%",
    zIndex: "40",
    pointerEvents: "none",
    background: "linear-gradient(110deg, #082f67 0%, #2563eb 52%, #67e8f9 100%)",
    boxShadow: "0 0 48px rgba(37, 99, 235, 0.34)",
    transform: "translateX(-170%) skewX(-12deg)",
  });
  element.appendChild(sweep);

  const animation = sweep.animate(
    [
      { transform: "translateX(-170%) skewX(-12deg)", opacity: 0.96 },
      { transform: "translateX(255%) skewX(-12deg)", opacity: 0 },
    ],
    {
      delay: delay + 40,
      duration: 1040,
      easing: EASING,
      fill: "both",
    },
  );

  animations.push(animation);
  animation.onfinish = () => {
    animation.cancel();
    sweep.remove();
    if (computedPosition === "static") element.style.position = previousPosition;
  };
}

export function SitewideScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    // The homepage already has its own hand-tuned Framer Motion sequences.
    if (pathname === "/") return;

    const root = document.getElementById("main-content");
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const registered: HTMLElement[] = [];
    const animations: Animation[] = [];
    const sections = Array.from(root.querySelectorAll<HTMLElement>("section"));

    sections.forEach((section, sectionIndex) => {
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
          registerTarget(registered, element, "card", cardIndex * 85);
          cardIndex += 1;
        });

      section.querySelectorAll<HTMLElement>("figure, picture").forEach((element) => {
        const direction = (sectionIndex + imageIndex) % 2 === 0 ? 1 : -1;
        registerTarget(registered, element, "image", imageIndex * 90, direction);
        imageIndex += 1;
      });

      section.querySelectorAll<HTMLElement>("img, video").forEach((element) => {
        if (element.closest("figure, picture")) return;
        const direction = (sectionIndex + imageIndex) % 2 === 0 ? 1 : -1;
        registerTarget(registered, element, "image", imageIndex * 90, direction);
        imageIndex += 1;
      });

      section.querySelectorAll<HTMLElement>("h1, h2, h3").forEach((element) => {
        registerTarget(registered, element, "heading", headingIndex * 65);
        headingIndex += 1;
      });

      section.querySelectorAll<HTMLElement>("p, ul, ol, blockquote").forEach((element) => {
        registerTarget(registered, element, "copy", 70 + copyIndex * 45);
        copyIndex += 1;
      });

      section
        .querySelectorAll<HTMLElement>("button, form, a[class*='inline-flex']")
        .forEach((element) => {
          registerTarget(registered, element, "control", 110 + controlIndex * 55);
          controlIndex += 1;
        });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          if (element.hasAttribute(DONE_ATTRIBUTE)) {
            observer.unobserve(element);
            return;
          }

          const kind = (element.getAttribute(TARGET_ATTRIBUTE) || "copy") as MotionKind;
          const delay = Number(element.dataset.siteMotionDelay || 0);
          const direction = Number(element.dataset.siteMotionDirection || 1);

          element.setAttribute(DONE_ATTRIBUTE, "true");
          observer.unobserve(element);

          const animation = element.animate(keyframesFor(kind, direction), {
            delay,
            duration: durationFor(kind),
            easing: EASING,
            fill: "both",
          });

          animations.push(animation);
          if (kind === "image") addImageSweep(element, delay, animations);

          animation.onfinish = () => {
            // Return control to the page's original CSS after reaching the same
            // final visual state. This prevents stale transforms or layout bugs.
            animation.cancel();
          };
        });
      },
      {
        rootMargin: "0px 0px 18% 0px",
        threshold: 0.01,
      },
    );

    registered.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      registered.forEach((element) => {
        element.removeAttribute(TARGET_ATTRIBUTE);
        element.removeAttribute(DONE_ATTRIBUTE);
        delete element.dataset.siteMotionDelay;
        delete element.dataset.siteMotionDirection;
      });
    };
  }, [pathname]);

  return null;
}
