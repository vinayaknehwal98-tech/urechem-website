import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "@playwright/test";

function readArg(name, fallback = undefined) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

const baseUrl = readArg("url");
const label = readArg("label", "measurement");
const outputPath = readArg("output", `performance-results/${label}.json`);
const repeats = Number(readArg("repeats", "2"));

if (!baseUrl) {
  throw new Error("Missing required --url argument.");
}

const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

const scenarios = [
  { name: "home-opening", path: "/?intro=force", viewports: ["desktop", "mobile"], action: "opening" },
  { name: "home-scroll", path: "/?intro=skip", viewports: ["desktop", "mobile"], action: "scroll" },
  { name: "products-scroll", path: "/products", viewports: ["desktop", "mobile"], action: "scroll" },
  {
    name: "product-detail-scroll",
    path: "/products/uretherm-spray-foam-systems/uretherm-spray-foam-systems-gt-40",
    viewports: ["desktop", "mobile"],
    action: "scroll",
  },
  { name: "about-scroll", path: "/about", viewports: ["desktop", "mobile"], action: "scroll" },
  { name: "applications-scroll", path: "/applications", viewports: ["mobile"], action: "scroll" },
  { name: "industries-scroll", path: "/industries", viewports: ["mobile"], action: "scroll" },
  { name: "ai-finder", path: "/ai-solution-finder", viewports: ["desktop", "mobile"], action: "ai" },
  { name: "mobile-navigation", path: "/products", viewports: ["mobile"], action: "navigation" },
];

function metricValue(metrics, name) {
  return metrics.find((metric) => metric.name === name)?.value ?? 0;
}

function percentile(values, percentileValue) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.ceil((percentileValue / 100) * sorted.length) - 1);
  return sorted[Math.max(0, index)];
}

function median(values) {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const midpoint = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0
    ? (sorted[midpoint - 1] + sorted[midpoint]) / 2
    : sorted[midpoint];
}

function round(value, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

async function installObservers(page) {
  await page.addInitScript(() => {
    const state = {
      cls: 0,
      events: [],
      frames: [],
      lcp: 0,
      longTasks: [],
    };

    Object.defineProperty(window, "__urechemPerformance", {
      configurable: false,
      enumerable: false,
      value: state,
      writable: false,
    });

    const observe = (type, callback, options = {}) => {
      try {
        const observer = new PerformanceObserver((list) => callback(list.getEntries()));
        observer.observe({ type, buffered: true, ...options });
      } catch {
        // Unsupported performance entry types are reported as zero rather than failing the audit.
      }
    };

    observe("largest-contentful-paint", (entries) => {
      for (const entry of entries) state.lcp = Math.max(state.lcp, entry.startTime);
    });

    observe("layout-shift", (entries) => {
      for (const entry of entries) {
        if (!entry.hadRecentInput) state.cls += entry.value;
      }
    });

    observe("longtask", (entries) => {
      for (const entry of entries) {
        state.longTasks.push({ duration: entry.duration, startTime: entry.startTime });
      }
    });

    observe(
      "event",
      (entries) => {
        for (const entry of entries) {
          if (entry.interactionId) {
            state.events.push({ duration: entry.duration, interactionId: entry.interactionId });
          }
        }
      },
      { durationThreshold: 16 },
    );

    const trackFrame = (time) => {
      state.frames.push(time);
      window.requestAnimationFrame(trackFrame);
    };
    window.requestAnimationFrame(trackFrame);
  });
}

async function resetInteractionWindow(page) {
  return page.evaluate(() => {
    const state = window.__urechemPerformance;
    state.frames.length = 0;
    state.events.length = 0;
    state.longTasks.length = 0;
    return performance.now();
  });
}

async function performScroll(page) {
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        const start = performance.now();
        const duration = 2800;
        const maxScroll = Math.max(
          0,
          document.documentElement.scrollHeight - window.innerHeight,
          document.body.scrollHeight - window.innerHeight,
        );

        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 0.5 - Math.cos(Math.PI * progress) / 2;
          window.scrollTo(0, maxScroll * eased);
          if (progress < 1) window.requestAnimationFrame(step);
          else resolve();
        };

        window.requestAnimationFrame(step);
      }),
  );
  await page.waitForTimeout(250);
}

async function performAiInteraction(page) {
  const textarea = page.locator("textarea").first();
  await textarea.fill("Closed-cell roof insulation for a commercial building");

  const responsePromise = page.waitForResponse(
    (response) =>
      response.url().endsWith("/api/ai/solution") &&
      response.request().method() === "POST",
    { timeout: 15_000 },
  );
  await page.getByRole("button", { name: /find relevant pathways/i }).click();
  const response = await responsePromise;
  if (response.status() >= 400) {
    throw new Error(`AI interaction returned HTTP ${response.status()}.`);
  }
  await page.waitForTimeout(350);
}

async function performNavigationInteraction(page) {
  await page.getByRole("button", { name: /open navigation menu/i }).click();
  await page.waitForTimeout(180);
  await page.getByRole("button", { name: /close navigation menu/i }).click();
  await page.waitForTimeout(180);
}

async function collectBrowserMetrics(page, cdp, beforeMetrics, actionStartedAt) {
  await page.waitForTimeout(120);
  const afterMetrics = (await cdp.send("Performance.getMetrics")).metrics;

  const browser = await page.evaluate((startedAt) => {
    const state = window.__urechemPerformance;
    const paintEntries = performance.getEntriesByType("paint");
    const fcp = paintEntries.find((entry) => entry.name === "first-contentful-paint")?.startTime ?? 0;
    const navigation = performance.getEntriesByType("navigation")[0];
    const relevantFrames = state.frames.filter((time) => time >= startedAt);
    const frameIntervals = relevantFrames.slice(1).map((time, index) => time - relevantFrames[index]);
    const longTasks = state.longTasks.filter((entry) => entry.startTime >= startedAt);
    const interactions = new Map();

    for (const entry of state.events) {
      interactions.set(
        entry.interactionId,
        Math.max(interactions.get(entry.interactionId) ?? 0, entry.duration),
      );
    }

    const scripts = performance
      .getEntriesByType("resource")
      .filter((entry) => entry.initiatorType === "script");

    return {
      cls: state.cls,
      domContentLoaded: navigation?.domContentLoadedEventEnd ?? 0,
      fcp,
      frameIntervals,
      inp: interactions.size ? Math.max(...interactions.values()) : 0,
      jsDecodedBytes: scripts.reduce((total, entry) => total + (entry.decodedBodySize || 0), 0),
      jsTransferBytes: scripts.reduce((total, entry) => total + (entry.transferSize || 0), 0),
      lcp: state.lcp,
      loadEvent: navigation?.loadEventEnd ?? 0,
      longTasks,
    };
  }, actionStartedAt);

  const frameIntervals = browser.frameIntervals;
  const meanFrameInterval = frameIntervals.length
    ? frameIntervals.reduce((sum, value) => sum + value, 0) / frameIntervals.length
    : 0;
  const tbt = browser.longTasks.reduce(
    (total, entry) => total + Math.max(0, entry.duration - 50),
    0,
  );

  return {
    cls: round(browser.cls, 4),
    domContentLoadedMs: round(browser.domContentLoaded),
    droppedFrames: frameIntervals.filter((interval) => interval > 25).length,
    fcpMs: round(browser.fcp),
    fps: round(meanFrameInterval ? 1000 / meanFrameInterval : 0),
    inpMs: round(browser.inp),
    jsDecodedBytes: browser.jsDecodedBytes,
    jsHeapUsedBytes: round(metricValue(afterMetrics, "JSHeapUsedSize"), 0),
    jsTransferBytes: browser.jsTransferBytes,
    layoutDurationMs: round(
      (metricValue(afterMetrics, "LayoutDuration") - metricValue(beforeMetrics, "LayoutDuration")) *
        1000,
    ),
    lcpMs: round(browser.lcp),
    loadEventMs: round(browser.loadEvent),
    longTaskCount: browser.longTasks.length,
    longTaskDurationMs: round(
      browser.longTasks.reduce((total, entry) => total + entry.duration, 0),
    ),
    p95FrameIntervalMs: round(percentile(frameIntervals, 95)),
    recalcStyleDurationMs: round(
      (metricValue(afterMetrics, "RecalcStyleDuration") -
        metricValue(beforeMetrics, "RecalcStyleDuration")) *
        1000,
    ),
    scriptDurationMs: round(
      (metricValue(afterMetrics, "ScriptDuration") - metricValue(beforeMetrics, "ScriptDuration")) *
        1000,
    ),
    taskDurationMs: round(
      (metricValue(afterMetrics, "TaskDuration") - metricValue(beforeMetrics, "TaskDuration")) *
        1000,
    ),
    tbtMs: round(tbt),
  };
}

async function runScenario(browser, scenario, viewportName, repeat) {
  const context = await browser.newContext({
    reducedMotion: "no-preference",
    serviceWorkers: "block",
    viewport: viewports[viewportName],
  });
  const page = await context.newPage();
  await installObservers(page);

  const findings = [];
  page.on("console", (message) => {
    if (message.type() === "error") findings.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => findings.push(`pageerror: ${error.message}`));
  page.on("requestfailed", (request) => {
    if (!request.url().startsWith(baseUrl)) return;
    const reason = request.failure()?.errorText ?? "unknown request failure";
    if (!reason.includes("ERR_ABORTED")) {
      findings.push(`requestfailed: ${request.method()} ${request.url()} (${reason})`);
    }
  });

  const cdp = await context.newCDPSession(page);
  await cdp.send("Performance.enable");
  const beforeMetrics = (await cdp.send("Performance.getMetrics")).metrics;

  const response = await page.goto(`${baseUrl}${scenario.path}`, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  if (!response || response.status() >= 400) {
    throw new Error(`${scenario.name} returned HTTP ${response?.status() ?? "no response"}.`);
  }

  let actionStartedAt = 0;

  if (scenario.action === "opening") {
    actionStartedAt = 0;
    await page.waitForTimeout(3800);
  } else {
    await page.waitForTimeout(900);
    actionStartedAt = await resetInteractionWindow(page);

    if (scenario.action === "scroll") await performScroll(page);
    if (scenario.action === "ai") await performAiInteraction(page);
    if (scenario.action === "navigation") await performNavigationInteraction(page);
  }

  const metrics = await collectBrowserMetrics(page, cdp, beforeMetrics, actionStartedAt);
  await context.close();

  return {
    findings,
    metrics,
    repeat,
    scenario: scenario.name,
    viewport: viewportName,
  };
}

function aggregateRuns(runs) {
  const grouped = new Map();

  for (const run of runs) {
    const key = `${run.scenario}:${run.viewport}`;
    const group = grouped.get(key) ?? [];
    group.push(run);
    grouped.set(key, group);
  }

  const summaries = [];
  for (const [key, group] of grouped) {
    const [scenario, viewport] = key.split(":");
    const metricNames = Object.keys(group[0].metrics);
    const metrics = {};

    for (const metricName of metricNames) {
      metrics[metricName] = round(median(group.map((run) => run.metrics[metricName])), 4);
    }

    summaries.push({
      findings: [...new Set(group.flatMap((run) => run.findings))],
      metrics,
      scenario,
      viewport,
    });
  }

  return summaries.sort((a, b) =>
    `${a.scenario}:${a.viewport}`.localeCompare(`${b.scenario}:${b.viewport}`),
  );
}

await fs.mkdir(path.dirname(outputPath), { recursive: true });

const browser = await chromium.launch({
  args: ["--disable-dev-shm-usage", "--no-sandbox"],
  headless: true,
});

const runs = [];
try {
  for (const scenario of scenarios) {
    for (const viewportName of scenario.viewports) {
      for (let repeat = 1; repeat <= repeats; repeat += 1) {
        runs.push(await runScenario(browser, scenario, viewportName, repeat));
      }
    }
  }
} finally {
  await browser.close();
}

const report = {
  generatedAt: new Date().toISOString(),
  label,
  repeats,
  runs,
  summaries: aggregateRuns(runs),
  url: baseUrl,
};

await fs.writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Wrote ${outputPath}`);
