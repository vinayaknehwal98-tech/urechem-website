"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type RevealDirection = "up" | "left" | "right" | "image";

const REVEAL_ATTRIBUTE = "data-scroll-reveal";

function isInsideAssignedElement(element: HTMLElement) {
  return Boolean(element.parentElement?.closest(`[${REVEAL_ATTRIBUTE}]`));
}

function assignReveal(element: HTMLElement, direction: RevealDirection, delay = 0) {
  if (
    element.hasAttribute(REVEAL_ATTRIBUTE) ||
    isInsideAssignedElement(element) ||
    element.closest("[aria-hidden='true']") ||
    element.hidden
  ) {
    return;
  }

  element.setAttribute(REVEAL_ATTRIBUTE, direction);
  element.style.setProperty("--reveal-delay", `${Math.min(delay, 420)}ms`);
}

function getDirectChildren(element: Element) {
  return Array.from(element.children).filter(
    (child): child is HTMLElement => child instanceof HTMLElement,
  );
}

function prepareSection(section: HTMLElement, sectionIndex: number) {
  // Keep the initial page hero untouched. The dedicated opening animation remains
  // the first visual moment; reveals begin as visitors move down the page.
  if (sectionIndex === 0 && section.querySelector("h1")) return;

  const grids = Array.from(section.querySelectorAll<HTMLElement>("[class*='grid']"));

  grids.forEach((grid) => {
    if (isInsideAssignedElement(grid)) return;

    const children = getDirectChildren(grid);
    if (children.length < 2) return;

    const isSplitLayout =
      children.length === 2 &&
      children.some((child) => child.matches("figure") || child.querySelector("img, figure"));

    children.forEach((child, index) => {
      if (isSplitLayout) {
        const containsVisual = child.matches("figure") || Boolean(child.querySelector("img, figure"));
        assignReveal(child, containsVisual ? "right" : index === 0 ? "left" : "right", index * 90);
        return;
      }

      assignReveal(child, child.matches("figure") || child.querySelector("img") ? "image" : "up", index * 70);
    });
  });

  section.querySelectorAll<HTMLElement>("article, figure").forEach((element, index) => {
    assignReveal(element, element.matches("figure") ? "image" : "up", index * 65);
  });

  section.querySelectorAll<HTMLElement>("img").forEach((image, index) => {
    if (!image.closest("figure")) assignReveal(image, "image", index * 70);
  });

  section.querySelectorAll<HTMLElement>("h2, h3").forEach((heading, index) => {
    assignReveal(heading, "left", index * 55);
  });

  section.querySelectorAll<HTMLElement>("p, ul, ol").forEach((copy, index) => {
    assignReveal(copy, "up", 70 + index * 45);
  });

  section
    .querySelectorAll<HTMLElement>("button, a[class*='inline-flex'], a[class*='rounded']")
    .forEach((control, index) => assignReveal(control, "up", 110 + index * 45));
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          (entry.target as HTMLElement).classList.add("is-scroll-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -9% 0px",
        threshold: 0.12,
      },
    );

    revealElements.forEach((element) => observer.observe(element));
    document.documentElement.classList.add("scroll-reveal-ready");

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("scroll-reveal-ready");
      revealElements.forEach((element) => {
        element.classList.remove("is-scroll-visible");
        element.removeAttribute(REVEAL_ATTRIBUTE);
        element.style.removeProperty("--reveal-delay");
      });
    };
  }, [pathname]);

  return null;
}
