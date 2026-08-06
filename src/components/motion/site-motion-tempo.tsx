"use client";

import { useEffect } from "react";

const CONTENT_PLAYBACK_RATE = 1.2;
const MIN_REVEAL_DURATION_MS = 380;
const MAX_REVEAL_DURATION_MS = 2200;
const INITIAL_SETTLE_MS = 180;
const PROXIMITY_FOLLOW_UP_MS = 80;
const PROXIMITY_SELECTOR = "section, article, figure, [data-no-site-motion]";
const MOTION_SCAN_EVENT = "urechem:motion-scan-request";

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
    let disposed = false;
    let scanFrame = 0;
    const scanTimers = new Set<number>();
    const observedProximityTargets = new WeakSet<Element>();

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

    const processAnimation = (animation: Animation) => {
      if (disposed || processed.has(animation) || !isContentReveal(animation)) return;

      const target = animationTarget(animation);
      if (!target || !main.contains(target) || target.closest("[data-motion-tempo-ignore]")) return;

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
    };

    const scanAnimations = () => {
      scanFrame = 0;
      if (disposed) return;
      main.getAnimations({ subtree: true }).forEach(processAnimation);
    };

    const requestScan = () => {
      if (disposed || scanFrame) return;
      scanFrame = window.requestAnimationFrame(scanAnimations);
    };

    const requestFollowUpScan = (delay: number) => {
      const timer = window.setTimeout(() => {
        scanTimers.delete(timer);
        requestScan();
      }, delay);
      scanTimers.add(timer);
    };

    const proximityObserver = new IntersectionObserver(
      (entries) => {
        let shouldScan = false;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          proximityObserver.unobserve(entry.target);
          shouldScan = true;
        }

        if (shouldScan) {
          requestScan();
          requestFollowUpScan(PROXIMITY_FOLLOW_UP_MS);
        }
      },
      {
        rootMargin: "15% 0px 15% 0px",
        threshold: 0.01,
      },
    );

    const registerProximityTargets = (root: Element) => {
      const targets = [
        ...(root.matches(PROXIMITY_SELECTOR) ? [root] : []),
        ...Array.from(root.querySelectorAll(PROXIMITY_SELECTOR)),
      ];

      for (const target of targets) {
        if (observedProximityTargets.has(target)) continue;
        observedProximityTargets.add(target);
        proximityObserver.observe(target);
      }
    };

    const handleAnimationActivity = (event: AnimationEvent | TransitionEvent) => {
      if (event.target instanceof Element && main.contains(event.target)) requestScan();
    };

    const mutationObserver = new MutationObserver((records) => {
      let addedContent = false;

      for (const record of records) {
        for (const node of record.addedNodes) {
          if (
            !(node instanceof Element) ||
            node.closest("[aria-hidden='true']") ||
            node.hasAttribute("data-site-motion-sweep")
          ) {
            continue;
          }

          addedContent = true;
          registerProximityTargets(node);
        }
      }

      if (addedContent) requestScan();
    });
    mutationObserver.observe(main, { childList: true, subtree: true });

    document.addEventListener("animationstart", handleAnimationActivity, true);
    document.addEventListener("transitionrun", handleAnimationActivity, true);
    window.addEventListener(MOTION_SCAN_EVENT, requestScan);

    registerProximityTargets(main);
    requestScan();
    requestFollowUpScan(INITIAL_SETTLE_MS);

    return () => {
      disposed = true;
      window.cancelAnimationFrame(scanFrame);
      scanTimers.forEach((timer) => window.clearTimeout(timer));
      scanTimers.clear();
      document.removeEventListener("animationstart", handleAnimationActivity, true);
      document.removeEventListener("transitionrun", handleAnimationActivity, true);
      window.removeEventListener(MOTION_SCAN_EVENT, requestScan);
      mutationObserver.disconnect();
      proximityObserver.disconnect();
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
