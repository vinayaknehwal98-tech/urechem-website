import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import { chromium } from "@playwright/test";

function readArg(name, fallback = undefined) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

const baselineUrl = readArg("baseline-url");
const candidateUrl = readArg("candidate-url");
const outputDirectory = readArg("output", "performance-results/visual-regression");

if (!baselineUrl || !candidateUrl) {
  throw new Error("Both --baseline-url and --candidate-url are required.");
}

const viewports = {
  desktop: { width: 1440, height: 900 },
  mobile: { width: 390, height: 844 },
};

const routes = [
  ["home", "/?intro=skip"],
  ["products", "/products"],
  [
    "product-detail",
    "/products/uretherm-spray-foam-systems/uretherm-spray-foam-systems-gt-40",
  ],
  ["about", "/about"],
  ["applications", "/applications"],
  ["industries", "/industries"],
  ["ai-solution-finder", "/ai-solution-finder"],
  ["ask-urechem-ai", "/ask-urechem-ai"],
  ["contact", "/contact"],
  ["consultant", "/consultant"],
];

async function waitForStablePage(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const maximumScroll = Math.max(
      0,
      document.documentElement.scrollHeight - window.innerHeight,
      document.body.scrollHeight - window.innerHeight,
    );
    const steps = Math.max(1, Math.ceil(maximumScroll / Math.max(window.innerHeight, 1)));

    for (let step = 0; step <= steps; step += 1) {
      window.scrollTo(0, Math.min(maximumScroll, step * window.innerHeight));
      await new Promise((resolve) => window.setTimeout(resolve, 50));
    }
    window.scrollTo(0, 0);
  });

  await page
    .waitForFunction(
      () => Array.from(document.images).every((image) => image.complete),
      { timeout: 10_000 },
    )
    .catch(() => undefined);

  await page.waitForTimeout(1200);
}

async function capture(browser, baseUrl, route, viewport, options = {}) {
  const context = await browser.newContext({
    reducedMotion: options.reducedMotion ?? "reduce",
    serviceWorkers: "block",
    viewport,
  });
  const page = await context.newPage();

  if (options.freezeMedia) {
    await page.route("**/*.mp4", (route) => route.abort());
  }

  const findings = [];
  page.on("console", (message) => {
    if (message.type() === "error") findings.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => findings.push(`pageerror: ${error.message}`));

  const response = await page.goto(`${baseUrl}${route}`, {
    waitUntil: "domcontentloaded",
    timeout: 30_000,
  });
  if (!response || response.status() >= 400) {
    throw new Error(`${route} returned HTTP ${response?.status() ?? "no response"}.`);
  }

  if (options.waitMs) {
    await page.waitForTimeout(options.waitMs);
  } else {
    await waitForStablePage(page);
  }

  const screenshot = await page.screenshot({
    animations: "allow",
    fullPage: options.fullPage ?? true,
  });

  await context.close();
  return { findings, screenshot };
}

function compareImages(baselineBuffer, candidateBuffer) {
  const baseline = PNG.sync.read(baselineBuffer);
  const candidate = PNG.sync.read(candidateBuffer);

  if (baseline.width !== candidate.width || baseline.height !== candidate.height) {
    return {
      diff: null,
      differingPixels: baseline.width * baseline.height,
      height: candidate.height,
      ratio: 1,
      width: candidate.width,
    };
  }

  const diff = new PNG({ width: baseline.width, height: baseline.height });
  const differingPixels = pixelmatch(
    baseline.data,
    candidate.data,
    diff.data,
    baseline.width,
    baseline.height,
    {
      includeAA: false,
      threshold: 0.1,
    },
  );

  return {
    diff: PNG.sync.write(diff),
    differingPixels,
    height: baseline.height,
    ratio: differingPixels / (baseline.width * baseline.height),
    width: baseline.width,
  };
}

await fs.mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({
  args: ["--disable-dev-shm-usage", "--no-sandbox"],
  headless: true,
});

const results = [];
const failures = [];

try {
  for (const [name, route] of routes) {
    for (const [viewportName, viewport] of Object.entries(viewports)) {
      const baseline = await capture(browser, baselineUrl, route, viewport);
      const candidate = await capture(browser, candidateUrl, route, viewport);
      const comparison = compareImages(baseline.screenshot, candidate.screenshot);
      const prefix = `${name}-${viewportName}`;

      await fs.writeFile(
        path.join(outputDirectory, `${prefix}-baseline.png`),
        baseline.screenshot,
      );
      await fs.writeFile(
        path.join(outputDirectory, `${prefix}-candidate.png`),
        candidate.screenshot,
      );
      if (comparison.diff) {
        await fs.writeFile(path.join(outputDirectory, `${prefix}-diff.png`), comparison.diff);
      }

      const baselineFindings = new Set(baseline.findings);
      const newFindings = candidate.findings.filter(
        (finding) => !baselineFindings.has(finding),
      );

      const result = {
        differingPixels: comparison.differingPixels,
        height: comparison.height,
        name,
        newFindings,
        ratio: comparison.ratio,
        route,
        viewport: viewportName,
        width: comparison.width,
      };
      results.push(result);

      if (comparison.ratio > 0.001) {
        failures.push(
          `${prefix}: ${(comparison.ratio * 100).toFixed(4)}% of pixels differ.`,
        );
      }
      for (const finding of newFindings) failures.push(`${prefix}: ${finding}`);
    }
  }

  for (const [viewportName, viewport] of Object.entries(viewports)) {
    const route = "/?intro=force";
    const baseline = await capture(browser, baselineUrl, route, viewport, {
      freezeMedia: true,
      fullPage: false,
      reducedMotion: "no-preference",
      waitMs: 3400,
    });
    const candidate = await capture(browser, candidateUrl, route, viewport, {
      freezeMedia: true,
      fullPage: false,
      reducedMotion: "no-preference",
      waitMs: 3400,
    });
    const comparison = compareImages(baseline.screenshot, candidate.screenshot);
    const prefix = `opening-complete-${viewportName}`;

    await fs.writeFile(
      path.join(outputDirectory, `${prefix}-baseline.png`),
      baseline.screenshot,
    );
    await fs.writeFile(
      path.join(outputDirectory, `${prefix}-candidate.png`),
      candidate.screenshot,
    );
    if (comparison.diff) {
      await fs.writeFile(path.join(outputDirectory, `${prefix}-diff.png`), comparison.diff);
    }

    results.push({
      differingPixels: comparison.differingPixels,
      height: comparison.height,
      name: "opening-complete",
      newFindings: [],
      ratio: comparison.ratio,
      route,
      viewport: viewportName,
      width: comparison.width,
    });

    if (comparison.ratio > 0.003) {
      failures.push(
        `${prefix}: ${(comparison.ratio * 100).toFixed(4)}% of pixels differ.`,
      );
    }
  }
} finally {
  await browser.close();
}

const markdown = [
  "# Visual regression comparison",
  "",
  "| Page/state | Viewport | Dimensions | Differing pixels | Difference |",
  "|---|---:|---:|---:|---:|",
  ...results.map(
    (result) =>
      `| ${result.name} | ${result.viewport} | ${result.width}×${result.height} | ${result.differingPixels} | ${(result.ratio * 100).toFixed(4)}% |`,
  ),
  "",
  failures.length
    ? `**Failed:** ${failures.length} visual regression finding(s).`
    : "**Passed:** no material visual regression or new browser error was detected.",
  ...(failures.length ? ["", ...failures.map((failure) => `- ${failure}`)] : []),
  "",
].join("\n");

await fs.writeFile(path.join(outputDirectory, "summary.md"), markdown);
await fs.writeFile(
  path.join(outputDirectory, "summary.json"),
  `${JSON.stringify({ failures, passed: failures.length === 0, results }, null, 2)}\n`,
);

console.log(markdown);
if (failures.length) process.exitCode = 1;
