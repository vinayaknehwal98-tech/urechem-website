"use client";

import { useEffect } from "react";

const CONTENT_PLAYBACK_RATE = 1.2;
const MIN_REVEAL_DURATION_MS = 380;
const MAX_REVEAL_DURATION_MS = 2200;

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

function applySlowerPace(animation: Animation) {
  if (animation.playbackRate === 0) return;

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
    let settleTimer = 0;

    const releaseTarget = (target: Element) => {
      const animations = waitingByTarget.get(target);
      if (!animations) return;

      waitingByTarget.delete(target);
      revealObserver.unobserve(target);

      animations.forEach((animation) => {
        if (animation.playState === "finished" || animation.playState === "idle") return;
        applySlowerPace(animation);
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

      document.documentElement.getAnimations({ subtree: true }).forEach((animation) => {
        if (processed.has(animation) || !isContentReveal(animation)) return;

        const target = animationTarget(animation);
        if (!target || !main.contains(target) || target.closest("[data-motion-tempo-ignore]")) return;

        processed.add(animation);
        applySlowerPace(animation);

        const revealTarget =
          target.closest("section, article, figure, [data-site-motion-target]") ?? target;
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

    const scheduleScan = () => {
      if (scanFrame) return;

      scanFrame = window.requestAnimationFrame(() => {
        scanFrame = window.requestAnimationFrame(scanAnimations);
      });

      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(scanAnimations, 180);
    };

    const mutationObserver = new MutationObserver(scheduleScan);
    mutationObserver.observe(main, { childList: true, subtree: true });

    window.addEventListener("scroll", scheduleScan, { passive: true });
    window.addEventListener("resize", scheduleScan, { passive: true });
    document.addEventListener("animationstart", scheduleScan, true);
    document.addEventListener("transitionrun", scheduleScan, true);

    scheduleScan();

    return () => {
      window.cancelAnimationFrame(scanFrame);
      window.clearTimeout(settleTimer);
      window.removeEventListener("scroll", scheduleScan);
      window.removeEventListener("resize", scheduleScan);
      document.removeEventListener("animationstart", scheduleScan, true);
      document.removeEventListener("transitionrun", scheduleScan, true);
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
