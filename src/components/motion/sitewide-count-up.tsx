"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const statisticPattern = /^(\s*)(\d[\d,]*(?:\.\d+)?)([+%])(\s*)$/;
const candidateSelector = "p, span, strong, h2, h3, h4";
const numberFormatters = new Map<number, Intl.NumberFormat>();

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function formatNumber(value: number, decimals: number) {
  let formatter = numberFormatters.get(decimals);
  if (!formatter) {
    formatter = new Intl.NumberFormat("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
    numberFormatters.set(decimals, formatter);
  }

  return formatter.format(value);
}

function getAnimationDuration(target: number, isAboutNumbersMetric: boolean) {
  if (isAboutNumbersMetric) {
    if (target <= 10) return 3200;
    if (target <= 30) return 3400;
    if (target <= 60) return 3600;
    if (target <= 200) return 3800;
    return 4200;
  }

  return Math.min(2300, 1500 + Math.log10(Math.max(target, 1) + 1) * 185);
}

export function SitewideCountUp() {
  const pathname = usePathname();

  useEffect(() => {
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const activeFrames = new Set<number>();
    const activeTimers = new Set<number>();

    const requestTrackedFrame = (callback: FrameRequestCallback) => {
      let frameId = 0;
      frameId = window.requestAnimationFrame((time) => {
        activeFrames.delete(frameId);
        callback(time);
      });
      activeFrames.add(frameId);
      return frameId;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const element = entry.target as HTMLElement;
          const rect = entry.boundingClientRect;
          const visiblyInsideViewport =
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.08 &&
            rect.top < window.innerHeight &&
            rect.bottom > 0;

          if (!visiblyInsideViewport) continue;

          observer.unobserve(element);

          const target = Number(element.dataset.countTarget ?? "0");
          const suffix = element.dataset.countSuffix ?? "";
          const decimals = Number(element.dataset.countDecimals ?? "0");
          const delay = Number(element.dataset.countDelay ?? "0");
          const isAboutNumbersMetric = pathname === "/about" && Boolean(element.closest("#numbers"));
          const shouldShowEveryInteger = isAboutNumbersMetric && decimals === 0 && target <= 200;
          const duration = getAnimationDuration(target, isAboutNumbersMetric);

          const timer = window.setTimeout(() => {
            activeTimers.delete(timer);
            const startedAt = performance.now();

            const animate = (now: number) => {
              const progress = Math.min((now - startedAt) / duration, 1);
              const animatedProgress = shouldShowEveryInteger ? progress : easeOutCubic(progress);
              const rawValue = target * animatedProgress;
              const displayedValue =
                decimals > 0
                  ? rawValue
                  : shouldShowEveryInteger
                    ? Math.min(target, Math.floor(rawValue))
                    : Math.round(rawValue);

              element.textContent = `${formatNumber(displayedValue, decimals)}${suffix}`;

              if (progress < 1) {
                requestTrackedFrame(animate);
              } else {
                element.textContent = `${formatNumber(target, decimals)}${suffix}`;
                element.dataset.urechemCountUp = "complete";
              }
            };

            requestTrackedFrame(animate);
          }, delay);

          activeTimers.add(timer);
        }
      },
      {
        threshold: [0, 0.08, 0.2],
        rootMargin: "0px",
      },
    );

    const registerStatistics = () => {
      const root = document.getElementById("main-content");
      if (!root) return;

      const candidates = Array.from(root.querySelectorAll<HTMLElement>(candidateSelector));
      let statisticIndex = 0;

      for (const element of candidates) {
        if (element.dataset.urechemCountUp) continue;
        if (element.children.length > 0) continue;
        if (element.closest("header, footer, [role='dialog'], [aria-hidden='true']")) continue;

        const originalText = element.textContent ?? "";
        const match = originalText.match(statisticPattern);
        if (!match) continue;

        const numericText = match[2];
        const target = Number(numericText.replace(/,/g, ""));
        if (!Number.isFinite(target)) continue;

        const decimalPart = numericText.split(".")[1];
        const decimals = decimalPart?.length ?? 0;
        const suffix = match[3];
        const isAboutNumbersMetric = pathname === "/about" && Boolean(element.closest("#numbers"));
        const staggerStep = isAboutNumbersMetric ? 110 : 70;
        const maximumDelay = isAboutNumbersMetric ? 330 : 210;

        element.dataset.urechemCountUp = shouldReduceMotion ? "complete" : "ready";
        element.dataset.countTarget = String(target);
        element.dataset.countSuffix = suffix;
        element.dataset.countDecimals = String(decimals);
        element.dataset.countDelay = String(Math.min((statisticIndex % 4) * staggerStep, maximumDelay));
        element.style.fontVariantNumeric = "tabular-nums";
        element.setAttribute("aria-label", originalText.trim());

        if (!shouldReduceMotion) {
          element.textContent = `${formatNumber(0, decimals)}${suffix}`;
          observer.observe(element);
        }

        statisticIndex += 1;
      }
    };

    requestTrackedFrame(registerStatistics);

    for (const delay of [180, 650]) {
      const timer = window.setTimeout(() => {
        activeTimers.delete(timer);
        registerStatistics();
      }, delay);
      activeTimers.add(timer);
    }

    return () => {
      observer.disconnect();
      for (const frameId of activeFrames) window.cancelAnimationFrame(frameId);
      for (const timerId of activeTimers) window.clearTimeout(timerId);
      activeFrames.clear();
      activeTimers.clear();
    };
  }, [pathname]);

  return null;
}
