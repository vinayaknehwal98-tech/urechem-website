import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

function readArg(name, fallback = undefined) {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

const baselinePath = readArg("baseline");
const candidatePath = readArg("candidate");
const outputPath = readArg("output", "performance-results/comparison.md");
const bundleBaselinePath = readArg("bundle-baseline");
const bundleCandidatePath = readArg("bundle-candidate");
const lighthouseDirectory = readArg("lighthouse-dir");

if (!baselinePath || !candidatePath) {
  throw new Error("Both --baseline and --candidate are required.");
}

const baseline = JSON.parse(await fs.readFile(baselinePath, "utf8"));
const candidate = JSON.parse(await fs.readFile(candidatePath, "utf8"));

const baselineByKey = new Map(
  baseline.summaries.map((entry) => [`${entry.scenario}:${entry.viewport}`, entry]),
);
const candidateByKey = new Map(
  candidate.summaries.map((entry) => [`${entry.scenario}:${entry.viewport}`, entry]),
);

function round(value, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function deltaPercent(before, after) {
  if (!before) return after ? 100 : 0;
  return ((after - before) / before) * 100;
}

function formatNumber(value, suffix = "") {
  return `${new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value)}${suffix}`;
}

function formatDelta(before, after, lowerIsBetter = true) {
  const delta = deltaPercent(before, after);
  const improved = lowerIsBetter ? delta < 0 : delta > 0;
  const arrow = Math.abs(delta) < 0.01 ? "→" : improved ? "↓" : "↑";
  return `${arrow} ${delta >= 0 ? "+" : ""}${round(delta)}%`;
}

const metricDefinitions = [
  ["fcpMs", "FCP", "ms", true],
  ["lcpMs", "LCP", "ms", true],
  ["inpMs", "INP", "ms", true],
  ["cls", "CLS", "", true],
  ["tbtMs", "TBT", "ms", true],
  ["taskDurationMs", "Main thread", "ms", true],
  ["longTaskCount", "Long tasks", "", true],
  ["fps", "Average FPS", "", false],
  ["p95FrameIntervalMs", "p95 frame interval", "ms", true],
];

const lines = [
  "# Runtime performance comparison",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "| Scenario | Viewport | Metric | Baseline | Candidate | Change |",
  "|---|---:|---|---:|---:|---:|",
];

const failures = [];

for (const [key, beforeEntry] of baselineByKey) {
  const afterEntry = candidateByKey.get(key);
  if (!afterEntry) {
    failures.push(`Missing candidate measurement for ${key}.`);
    continue;
  }

  for (const [metricName, label, suffix, lowerIsBetter] of metricDefinitions) {
    const before = beforeEntry.metrics[metricName] ?? 0;
    const after = afterEntry.metrics[metricName] ?? 0;
    lines.push(
      `| ${beforeEntry.scenario} | ${beforeEntry.viewport} | ${label} | ${formatNumber(
        before,
        suffix,
      )} | ${formatNumber(after, suffix)} | ${formatDelta(before, after, lowerIsBetter)} |`,
    );
  }

  const checks = [
    {
      metric: "taskDurationMs",
      percentage: 15,
      absolute: 15,
      message: "main-thread task duration",
    },
    { metric: "tbtMs", percentage: 20, absolute: 10, message: "total blocking time" },
    { metric: "lcpMs", percentage: 20, absolute: 180, message: "largest contentful paint" },
    { metric: "fcpMs", percentage: 20, absolute: 150, message: "first contentful paint" },
    { metric: "inpMs", percentage: 25, absolute: 24, message: "interaction latency" },
  ];

  for (const check of checks) {
    const before = beforeEntry.metrics[check.metric] ?? 0;
    const after = afterEntry.metrics[check.metric] ?? 0;
    if (
      after - before > check.absolute &&
      deltaPercent(before, after) > check.percentage
    ) {
      failures.push(
        `${key}: ${check.message} regressed from ${before} to ${after}.`,
      );
    }
  }

  const beforeFps = beforeEntry.metrics.fps ?? 0;
  const afterFps = afterEntry.metrics.fps ?? 0;
  if (
    beforeFps - afterFps > 2 &&
    deltaPercent(beforeFps, afterFps) < -8
  ) {
    failures.push(`${key}: average FPS regressed from ${beforeFps} to ${afterFps}.`);
  }

  const beforeCls = beforeEntry.metrics.cls ?? 0;
  const afterCls = afterEntry.metrics.cls ?? 0;
  if (afterCls - beforeCls > 0.02) {
    failures.push(`${key}: CLS regressed from ${beforeCls} to ${afterCls}.`);
  }

  const baselineFindings = new Set(beforeEntry.findings);
  const newFindings = afterEntry.findings.filter((finding) => !baselineFindings.has(finding));
  for (const finding of newFindings) {
    failures.push(`${key}: new browser finding: ${finding}`);
  }
}

let bundleSummary = null;
if (bundleBaselinePath && bundleCandidatePath) {
  const beforeBytes = Number((await fs.readFile(bundleBaselinePath, "utf8")).trim());
  const afterBytes = Number((await fs.readFile(bundleCandidatePath, "utf8")).trim());
  bundleSummary = { beforeBytes, afterBytes, delta: deltaPercent(beforeBytes, afterBytes) };

  lines.push(
    "",
    "## Browser bundle",
    "",
    `- Baseline static chunks: ${formatNumber(beforeBytes, " bytes")}`,
    `- Candidate static chunks: ${formatNumber(afterBytes, " bytes")}`,
    `- Change: ${formatDelta(beforeBytes, afterBytes, true)}`,
  );

  if (afterBytes - beforeBytes > Math.max(4096, beforeBytes * 0.01)) {
    failures.push(`Static browser bundle increased from ${beforeBytes} to ${afterBytes} bytes.`);
  }
}

async function readLighthouseReport(filePath) {
  try {
    const report = JSON.parse(await fs.readFile(filePath, "utf8"));
    return {
      cls: report.audits["cumulative-layout-shift"]?.numericValue ?? 0,
      fcpMs: report.audits["first-contentful-paint"]?.numericValue ?? 0,
      lcpMs: report.audits["largest-contentful-paint"]?.numericValue ?? 0,
      score: (report.categories.performance?.score ?? 0) * 100,
      speedIndexMs: report.audits["speed-index"]?.numericValue ?? 0,
      tbtMs: report.audits["total-blocking-time"]?.numericValue ?? 0,
    };
  } catch {
    return null;
  }
}

const lighthouseSummary = [];
if (lighthouseDirectory) {
  for (const viewport of ["desktop", "mobile"]) {
    const before = await readLighthouseReport(
      path.join(lighthouseDirectory, `baseline-home-${viewport}.json`),
    );
    const after = await readLighthouseReport(
      path.join(lighthouseDirectory, `candidate-home-${viewport}.json`),
    );
    if (!before || !after) continue;

    lighthouseSummary.push({ after, before, viewport });
  }

  if (lighthouseSummary.length) {
    lines.push(
      "",
      "## Lighthouse — homepage",
      "",
      "| Viewport | Metric | Baseline | Candidate | Change |",
      "|---|---|---:|---:|---:|",
    );

    for (const { after, before, viewport } of lighthouseSummary) {
      const lighthouseMetrics = [
        ["score", "Performance score", "", false],
        ["fcpMs", "FCP", "ms", true],
        ["lcpMs", "LCP", "ms", true],
        ["tbtMs", "TBT", "ms", true],
        ["cls", "CLS", "", true],
        ["speedIndexMs", "Speed Index", "ms", true],
      ];

      for (const [metric, label, suffix, lowerIsBetter] of lighthouseMetrics) {
        lines.push(
          `| ${viewport} | ${label} | ${formatNumber(
            before[metric],
            suffix,
          )} | ${formatNumber(after[metric], suffix)} | ${formatDelta(
            before[metric],
            after[metric],
            lowerIsBetter,
          )} |`,
        );
      }
    }
  }
}

lines.push(
  "",
  "## Gate result",
  "",
  failures.length
    ? `**Failed:** ${failures.length} material regression(s) detected.`
    : "**Passed:** no material performance regression or new browser error was detected.",
);

if (failures.length) {
  lines.push("", ...failures.map((failure) => `- ${failure}`));
}

const machineReport = {
  bundle: bundleSummary,
  failures,
  lighthouse: lighthouseSummary,
  passed: failures.length === 0,
};

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, `${lines.join("\n")}\n`);
await fs.writeFile(
  outputPath.replace(/\.md$/i, ".json"),
  `${JSON.stringify(machineReport, null, 2)}\n`,
);

console.log(lines.join("\n"));
if (failures.length) process.exitCode = 1;
