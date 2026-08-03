"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const APPROACH_MARGIN = 360;
const revealCallbacks = new WeakMap<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

function getSharedObserver() {
  if (typeof window === "undefined") return null;

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const reveal = revealCallbacks.get(entry.target);
          reveal?.();
          revealCallbacks.delete(entry.target);
          sharedObserver?.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: `${APPROACH_MARGIN}px 0px ${APPROACH_MARGIN}px 0px`,
        threshold: 0.001,
      },
    );
  }

  return sharedObserver;
}

export function useApproachReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(Boolean(shouldReduceMotion));

  useEffect(() => {
    if (shouldReduceMotion) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let fallbackTimer = 0;

    const reveal = () => {
      window.clearTimeout(fallbackTimer);
      frame = window.requestAnimationFrame(() => setIsVisible(true));
    };

    const bounds = node.getBoundingClientRect();
    const alreadyApproaching =
      bounds.top <= window.innerHeight + APPROACH_MARGIN && bounds.bottom >= -APPROACH_MARGIN;

    if (alreadyApproaching) {
      reveal();
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = getSharedObserver();
    if (!observer) {
      setIsVisible(true);
      return;
    }

    revealCallbacks.set(node, reveal);
    observer.observe(node);

    // Safety net: content must never remain in its hidden/blurred state.
    fallbackTimer = window.setTimeout(reveal, 1800);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(fallbackTimer);
      revealCallbacks.delete(node);
      observer.unobserve(node);
    };
  }, [shouldReduceMotion]);

  return {
    ref,
    isVisible,
    shouldReduceMotion: Boolean(shouldReduceMotion),
  };
}
