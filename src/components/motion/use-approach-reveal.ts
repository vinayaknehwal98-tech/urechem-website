"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type RevealCallback = () => void;

const pendingReveals = new Map<Element, RevealCallback>();
let sharedObserver: IntersectionObserver | null = null;

function releaseObserverWhenIdle() {
  if (pendingReveals.size > 0 || !sharedObserver) return;
  sharedObserver.disconnect();
  sharedObserver = null;
}

function getSharedObserver() {
  if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return null;
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;

        const reveal = pendingReveals.get(entry.target);
        if (!reveal) continue;

        pendingReveals.delete(entry.target);
        sharedObserver?.unobserve(entry.target);
        reveal();
      }

      releaseObserverWhenIdle();
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0,
    },
  );

  return sharedObserver;
}

function registerReveal(node: Element, reveal: RevealCallback) {
  pendingReveals.set(node, reveal);

  const observer = getSharedObserver();
  if (!observer) {
    pendingReveals.delete(node);
    reveal();
    return;
  }

  observer.observe(node);
}

function unregisterReveal(node: Element) {
  pendingReveals.delete(node);
  sharedObserver?.unobserve(node);
  releaseObserverWhenIdle();
}

export function useApproachReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(Boolean(shouldReduceMotion));

  useLayoutEffect(() => {
    if (shouldReduceMotion) {
      setIsVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) {
      setIsVisible(true);
      return;
    }

    const bounds = node.getBoundingClientRect();
    if (bounds.top <= window.innerHeight && bounds.bottom >= 0) {
      setIsVisible(true);
      return;
    }

    let cancelled = false;

    registerReveal(node, () => {
      if (!cancelled) setIsVisible(true);
    });

    return () => {
      cancelled = true;
      unregisterReveal(node);
    };
  }, [shouldReduceMotion]);

  return {
    ref,
    isVisible,
    shouldReduceMotion: Boolean(shouldReduceMotion),
  };
}
