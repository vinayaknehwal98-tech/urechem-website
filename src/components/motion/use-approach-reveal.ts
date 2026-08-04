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
      rootMargin: "0px 0px 10% 0px",
      threshold: 0.01,
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

function isNearViewport(node: Element) {
  const bounds = node.getBoundingClientRect();
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  return bounds.top <= viewportHeight * 1.1 && bounds.bottom >= -viewportHeight * 0.1;
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

    if (isNearViewport(node)) {
      setIsVisible(true);
      return;
    }

    let cancelled = false;
    let revealed = false;

    const reveal = () => {
      if (cancelled || revealed) return;
      revealed = true;
      unregisterReveal(node);
      setIsVisible(true);
    };

    registerReveal(node, reveal);

    const frameId = window.requestAnimationFrame(() => {
      if (isNearViewport(node)) reveal();
    });

    const fallbackId = window.setTimeout(() => {
      if (isNearViewport(node)) reveal();
    }, 450);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(fallbackId);
      unregisterReveal(node);
    };
  }, [shouldReduceMotion]);

  return {
    ref,
    isVisible,
    shouldReduceMotion: Boolean(shouldReduceMotion),
  };
}
