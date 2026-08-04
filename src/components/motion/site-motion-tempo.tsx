"use client";

import { useEffect } from "react";

const CONTENT_PLAYBACK_RATE = 1.2;
const MIN_REVEAL_DURATION_MS = 380;
const MAX_REVEAL_DURATION_MS = 2200;
const SCROLL_SCAN_INTERVAL_MS = 120;
const SCROLL_SETTLE_MS = 180;

function animationTarget(animation: Animation) {
  const effect = animation.effect;
  if (!(effect instanceof KeyframeEffect)) return null;
  return effect.target instanceof Element ? effect.target : null;
}

function isContentReveal(animation: Animation) {
  const effect = animation.effect;
  if (!(effect instanceof KeyframeEffect)) return false;

  const timing = effect.getTiming();
  const duration = timing.duration;
  const iterations = timing.iterations;

  return (
    typeof duration === "number" &&
    duration >= MIN_REVEAL_DURATION_MS &&
    duration <= MAX_REVEAL_DURATION_MS &&
    iterations === 1
  );
}

function applyContentPace(animation: Animation) {
  if (animation.playbackRate === 0 || animation.playbackRate === CONTENT_PLAYBACK_RATE) return;

  try {
    animation.updatePlaybackRate(CONTENT_PLAYBACK_RATE);
  } catch {
    animation.playbackRate = CONTENT_PLAYBACK_RATE;
  }
}

export function SiteMotionTempo() {
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;

    const processed = new WeakSet<Animation>();
    const waitingByTarget = new Map<Element, Set<Animation>>();
    let scanFrame = 0;
    let scanTimer = 0;
    let settleTimer = 0;
    let lastScanAt = 0;

    const releaseTarget = (target: Element) => {
      const animations = waitingByTarget.get(target);
      if (!animations) return;

      waitingByTarget.delete(target);
      revealObserver.unobserve(target);

      animations.forEach((animation) => {
        if (animation.playState === "finished" || animation.playState === "idle") return;
        applyContentPace(animation);
        animation.play();
      });
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) releaseTarget(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.02,
      },
    );

    const scanAnimations = () => {
      scanFrame = 0;
      lastScanAt = performance.now();

      main.getAnimations({ subtree: true }).forEach((animation) => {
        if (processed.has(animation) || !isContentReveal(animation)) return;

        const target = animationTarget(animation);
        if (!target || target.closest("[data-motion-tempo-ignore]")) return;

        processed.add(animation);
        applyContentPace(animation);

        const revealTarget = target.closest("section, article, figure, [data-site-motion-target]") ?? target;
        const bounds = revealTarget.getBoundingClientRect();
        const isBelowRevealLine = bounds.top > window.innerHeight * 0.9;

        if (isBelowRevealLine && animation.playState === "running") {
          animation.pause();
          const waiting = waitingByTarget.get(revealTarget) ?? new Set<Animation>();
          waiting.add(animation);
          waitingByTarget.set(revealTarget, waiting);
          revealObserver.observe(revealTarget);
        }
      });
    };

    const requestScan = () => {
      if (scanFrame) return;
      scanFrame = window.requestAnimationFrame(scanAnimations);
    };

    const scheduleScan = () => {
      if (scanTimer) return;

      const elapsed = performance.now() - lastScanAt;
      const delay = Math.max(0, SCROLL_SCAN_INTERVAL_MS - elapsed);
      scanTimer = window.setTimeout(() => {
        scanTimer = 0;
        requestScan();
      }, delay);
    };

    const handleViewportActivity = () => {
      scheduleScan();
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(requestScan, SCROLL_SETTLE_MS);
    };

    const handleAnimationStart = (event: AnimationEvent) => {
      if (event.target instanceof Element && main.contains(event.target)) scheduleScan();
    };

    const mutationObserver = new MutationObserver(scheduleScan);
    mutationObserver.observe(main, { childList: true, subtree: true });

    window.addEventListener("scroll", handleViewportActivity, { passive: true });
    window.addEventListener("resize", handleViewportActivity, { passive: true });
    document.addEventListener("animationstart", handleAnimationStart, true);

    requestScan();
    settleTimer = window.setTimeout(requestScan, SCROLL_SETTLE_MS);

    return () => {
      window.cancelAnimationFrame(scanFrame);
      window.clearTimeout(scanTimer);
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", handleViewportActivity);
      window.removeEventListener("resize", handleViewportActivity);
      document.removeEventListener("animationstart", handleAnimationStart, true);
      mutationObserver.disconnect();
      revealObserver.disconnect();

      waitingByTarget.forEach((animations) => {
        animations.forEach((animation) => {
          if (animation.playState === "paused") animation.play();
        });
      });
      waitingByTarget.clear();
    };
  }, []);

  return null;
}
