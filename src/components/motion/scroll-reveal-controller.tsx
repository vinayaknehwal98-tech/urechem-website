"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type RevealDirection =
  | "heading"
  | "label"
  | "copy"
  | "up"
  | "left"
  | "right"
  | "card"
  | "image-left"
  | "image-right";

const REVEAL_ATTRIBUTE = "data-scroll-reveal";
const SECTION_ATTRIBUTE = "data-scroll-section";

function isInsideAssignedElement(element: HTMLElement) {
  return Boolean(element.parentElement?.closest(`[${REVEAL_ATTRIBUTE}]`));
}

function shouldIgnore(element: HTMLElement) {
  return Boolean(
    element.hasAttribute(REVEAL_ATTRIBUTE) ||
      isInsideAssignedElement(element) ||
      element.closest("[aria-hidden='true']") ||
      element.closest("[data-no-scroll-reveal]") ||
      element.hidden,
  );
}

function assignReveal(element: HTMLElement, direction: RevealDirection, delay = 0) {
  if (shouldIgnore(element)) return;

  element.setAttribute(REVEAL_ATTRIBUTE, direction);
  element.style.setProperty("--reveal-delay", `${Math.min(delay, 520)}ms`);
}

function getDirectChildren(element: Element) {
  return Array.from(element.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );
}

function containsVisual(element: HTMLElement) {
  return element.matches("figure, picture, img, video") ||
    Boolean(element.querySelector("figure, picture, img, video"));
}

function imageDirection(element: HTMLElement, sectionIndex: number): RevealDirection {
  const parent = element.parentElement;
  if (parent) {
    const siblings = getDirectChildren(parent);
    const index = siblings.indexOf(element);
    if (index === 0) return "image-left";
    if (index === siblings.length - 1) return "image-right";
  }

  return sectionIndex % 2 === 0 ? "image-right" : "image-left";
}

function prepareSection(section: HTMLElement, sectionIndex: number) {
  // Preserve the existing opening/hero moment. Reference-style motion begins
  // once the visitor starts moving through the page.
  if (sectionIndex === 0 && section.querySelector("h1")) return;

  section.setAttribute(SECTION_ATTRIBUTE, String(sectionIndex));

  const grids = Array.from(section.querySelectorAll<HTMLElement>("[class*='grid']"));

  grids.forEach((grid) => {
    if (isInsideAssignedElement(grid)) return;

    const children = getDirectChildren(grid);
    if (children.length < 2) return;

    const visualChildren = children.filter(containsVisual);
    const isSplitLayout = children.length === 2 && visualChildren.length === 1;

    children.forEach((child, index) => {
      if (isSplitLayout) {
        if (containsVisual(child)) {
          assignReveal(child, index === 0 ? "image-left" : "image-right", index * 110);
        } else {
          assignReveal(child, index === 0 ? "left" : "right", index * 90);
        }
        return;
      }

      assignReveal(
        child,
        containsVisual(child) ? imageDirection(child, sectionIndex) : "card",
        index * 85,
      );
    });
  });

  section.querySelectorAll<HTMLElement>("figure, picture").forEach((visual, index) => {
    assignReveal(visual, imageDirection(visual, sectionIndex), index * 90);
  });

  section.querySelectorAll<HTMLElement>("img, video").forEach((visual, index) => {
    if (!visual.closest("figure, picture")) {
      assignReveal(visual, sectionIndex % 2 === 0 ? "image-right" : "image-left", index * 80);
    }
  });

  section.querySelectorAll<HTMLElement>("article").forEach((card, index) => {
    assignReveal(card, "card", index * 80);
  });

  section.querySelectorAll<HTMLElement>("h2, h3").forEach((heading, index) => {
    assignReveal(heading, "heading", index * 65);
  });

  section.querySelectorAll<HTMLElement>("h4, h5, h6").forEach((heading, index) => {
    assignReveal(heading, "up", index * 55);
  });

  section
    .querySelectorAll<HTMLElement>(
      "[class*='uppercase'][class*='tracking'], [class*='SectionLabel'], [class*='section-label']",
    )
    .forEach((label, index) => assignReveal(label, "label", index * 55));

  section.querySelectorAll<HTMLElement>("p, ul, ol, blockquote").forEach((copy, index) => {
    assignReveal(copy, "copy", 75 + index * 45);
  });

  section
    .querySelectorAll<HTMLElement>(
      "button, a[class*='inline-flex'], a[class*='rounded'], form",
    )
    .forEach((control, index) => assignReveal(control, "up", 120 + index * 50));
}

export function ScrollRevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.getElementById("main-content");
    if (!root) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const sections = Array.from(root.querySelectorAll<HTMLElement>("section"));
    sections.forEach(prepareSection);

    const revealElements = Array.from(
      root.querySelectorAll<HTMLElement>(`[${REVEAL_ATTRIBUTE}]`),
    );

    if (revealElements.length === 0) return;

    document.documentElement.classList.add("scroll-reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const element = entry.target as HTMLElement;
          element.classList.add("is-scroll-visible");
          window.setTimeout(() => element.classList.add("is-scroll-complete"), 1250);
          observer.unobserve(element);
        });
      },
      {
        rootMargin: "0px 0px -7% 0px",
        threshold: 0.14,
      },
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("scroll-reveal-ready");
      sections.forEach((section) => section.removeAttribute(SECTION_ATTRIBUTE));
      revealElements.forEach((element) => {
        element.classList.remove("is-scroll-visible", "is-scroll-complete");
        element.removeAttribute(REVEAL_ATTRIBUTE);
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
