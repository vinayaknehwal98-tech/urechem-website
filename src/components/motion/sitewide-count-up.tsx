"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const statisticPattern = /^(\s*)(\d[\d,]*(?:\.\d+)?)([+%])(\s*)$/;
const candidateSelector = "p, span, strong, h2, h3, h4";

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function formatNumber(value: number, decimals: number) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

export function SitewideCountUp() {
  const pathname = usePathname();

  useEffect(() => {
    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const activeFrames = new Set<number>();
    const activeTimers = new Set<number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;

          const element = entry.target as HTMLElement;
          observer.unobserve(element);

          const target = Number(element.dataset.countTarget ?? "0");
          const suffix = element.dataset.countSuffix ?? "";
          const decimals = Number(element.dataset.countDecimals ?? "0");
          const delay = Number(element.dataset.countDelay ?? "0");
          const duration = Math.min(2300, 1500 + Math.log10(Math.max(target, 1) + 1) * 185);

          const timer = window.setTimeout(() => {
            activeTimers.delete(timer);
            const startedAt = performance.now();

            const animate = (now: number) => {
              const progress = Math.min((now - startedAt) / duration, 1);
              const easedProgress = easeOutCubic(progress);
              const rawValue = target * easedProgress;
              const displayedValue = decimals > 0 ? rawValue : Math.round(rawValue);

              element.textContent = `${formatNumber(displayedValue, decimals)}${suffix}`;

              if (progress < 1) {
                const frame = window.requestAnimationFrame(animate);
                activeFrames.add(frame);
              } else {
                element.textContent = `${formatNumber(target, decimals)}${suffix}`;
                element.dataset.urechemCountUp = "complete";
              }
            };

            const frame = window.requestAnimationFrame(animate);
            activeFrames.add(frame);
          }, delay);

          activeTimers.add(timer);
        }
      },
      {
        threshold: 0.28,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    const registerStatistics = () => {
      const candidates = Array.from(document.querySelectorAll<HTMLElement>(candidateSelector));
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

        element.dataset.urechemCountUp = shouldReduceMotion ? "complete" : "ready";
        element.dataset.countTarget = String(target);
        element.dataset.countSuffix = suffix;
        element.dataset.countDecimals = String(decimals);
        element.dataset.countDelay = String(Math.min((statisticIndex % 8) * 85, 425));
        element.style.fontVariantNumeric = "tabular-nums";
        element.setAttribute("aria-label", originalText.trim());

        if (!shouldReduceMotion) {
          element.textContent = `${formatNumber(0, decimals)}${suffix}`;
          observer.observe(element);
        }

        statisticIndex += 1;
      }
    };

    const frame = window.requestAnimationFrame(registerStatistics);
    activeFrames.add(frame);

    const delayedScans = [180, 650].map((delay) => {
      const timer = window.setTimeout(registerStatistics, delay);
      activeTimers.add(timer);
      return timer;
    });

    return () => {
      observer.disconnect();
      for (const frameId of activeFrames) window.cancelAnimationFrame(frameId);
      for (const timerId of activeTimers) window.clearTimeout(timerId);
      delayedScans.forEach((timerId) => window.clearTimeout(timerId));
    };
  }, [pathname]);

  return null;
}
