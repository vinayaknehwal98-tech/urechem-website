"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const APPROACH_MARGIN = 520;
const PERIODIC_CHECK_MS = 400;

type RevealCallback = () => void;

const pendingReveals = new Map<Element, RevealCallback>();
let animationFrame = 0;
let periodicCheck = 0;
let monitoring = false;

function stopMonitoring() {
  if (typeof window === "undefined" || !monitoring) return;

  monitoring = false;
  window.removeEventListener("scroll", scheduleRevealCheck);
  window.removeEventListener("resize", scheduleRevealCheck);
  window.clearInterval(periodicCheck);
  periodicCheck = 0;

  if (animationFrame) {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = 0;
  }
}

function runRevealCheck() {
  animationFrame = 0;

  if (typeof window === "undefined") return;

  const viewportHeight = window.innerHeight;

  for (const [node, reveal] of pendingReveals) {
    if (!node.isConnected) {
      pendingReveals.delete(node);
      continue;
    }

    const bounds = node.getBoundingClientRect();
    const isApproaching =
      bounds.top <= viewportHeight + APPROACH_MARGIN && bounds.bottom >= -APPROACH_MARGIN;

    if (!isApproaching) continue;

    pendingReveals.delete(node);
    reveal();
  }

  if (pendingReveals.size === 0) stopMonitoring();
}

function scheduleRevealCheck() {
  if (typeof window === "undefined" || animationFrame) return;
  animationFrame = window.requestAnimationFrame(runRevealCheck);
}

function startMonitoring() {
  if (typeof window === "undefined" || monitoring) return;

  monitoring = true;
  window.addEventListener("scroll", scheduleRevealCheck, { passive: true });
  window.addEventListener("resize", scheduleRevealCheck, { passive: true });
  periodicCheck = window.setInterval(scheduleRevealCheck, PERIODIC_CHECK_MS);
}

function registerReveal(node: Element, reveal: RevealCallback) {
  pendingReveals.set(node, reveal);
  startMonitoring();
  scheduleRevealCheck();
}

function unregisterReveal(node: Element) {
  pendingReveals.delete(node);
  if (pendingReveals.size === 0) stopMonitoring();
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
    if (!node) {
      setIsVisible(true);
      return;
    }

    let cancelled = false;

    const reveal = () => {
      if (cancelled) return;
      setIsVisible(true);
    };

    registerReveal(node, reveal);

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
