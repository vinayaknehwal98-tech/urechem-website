import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";

const root = process.cwd();
const textExtensions = new Set([".js", ".jsx", ".mjs", ".cjs", ".ts", ".tsx", ".json", ".yml", ".yaml", ".md", ".txt"]);
const ignoredDirectories = new Set([".git", "node_modules", ".next", "out", "coverage", "review-screenshots"]);
const findings = [];

const secretPatterns = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/g],
  ["OpenAI-style secret", /\bsk-(?:proj-)?[A-Za-z0-9_-]{20,}\b/g],
  ["Google API key", /\bAIza[0-9A-Za-z_-]{30,}\b/g],
  ["GitHub token", /\bgh[pousr]_[A-Za-z0-9]{30,}\b/g],
  ["AWS access key", /\bAKIA[0-9A-Z]{16}\b/g],
  ["Slack token", /\bxox[baprs]-[A-Za-z0-9-]{20,}\b/g],
  ["Stripe live key", /\b(?:sk|rk)_live_[A-Za-z0-9]{16,}\b/g],
];

const dangerousPatterns = [
  ["dangerouslySetInnerHTML", /\bdangerouslySetInnerHTML\b/g],
  ["innerHTML assignment", /\.innerHTML\s*=/g],
  ["eval", /\beval\s*\(/g],
  ["dynamic Function", /\bnew\s+Function\s*\(/g],
];

function walk(directory) {
  const entries = [];
  if (!existsSync(directory)) return entries;

  for (const name of readdirSync(directory)) {
    if (ignoredDirectories.has(name)) continue;
    const path = join(directory, name);
    const stats = statSync(path);
    if (stats.isDirectory()) entries.push(...walk(path));
    else if (textExtensions.has(extname(name)) || name === ".gitignore" || name === ".env.example") entries.push(path);
  }
  return entries;
}

function scanText(label, text, includeDangerousSinks) {
  for (const [name, pattern] of secretPatterns) {
    pattern.lastIndex = 0;
    if (pattern.test(text)) findings.push(`${label}: possible ${name}`);
  }

  if (includeDangerousSinks) {
    for (const [name, pattern] of dangerousPatterns) {
      pattern.lastIndex = 0;
      if (pattern.test(text)) findings.push(`${label}: unsafe code sink (${name})`);
    }
  }
}

for (const path of walk(root)) {
  const file = relative(root, path);
  const text = readFileSync(path, "utf8");
  scanText(file, text, file.startsWith("src/"));

  if (/^[\s\S]*?["']use client["'];/.test(text)) {
    for (const serverOnlyName of ["RESEND_API_KEY", "UPSTASH_REDIS_REST_TOKEN", "UPSTASH_REDIS_REST_URL", "URECHEM_ENQUIRY_EMAIL"]) {
      const directReference = new RegExp(String.raw`process\.env\.${serverOnlyName}\b`);
      if (directReference.test(text)) findings.push(`${file}: server-only environment name referenced by client code`);
    }
  }

  if (/NEXT_PUBLIC_[A-Z0-9_]*(?:KEY|TOKEN|SECRET|PASSWORD)/.test(text)) {
    findings.push(`${file}: secret-like NEXT_PUBLIC_ environment variable`);
  }
}

const staticDirectory = join(root, ".next", "static");
if (existsSync(staticDirectory)) {
  const protectedEnvironmentVariables = [
    "RESEND_API_KEY",
    "UPSTASH_REDIS_REST_TOKEN",
    "UPSTASH_REDIS_REST_URL",
    "URECHEM_ENQUIRY_EMAIL",
    "URECHEM_FROM_EMAIL",
  ];

  for (const path of walk(staticDirectory)) {
    const file = relative(root, path);
    const text = readFileSync(path, "utf8");
    scanText(file, text, false);
    for (const name of protectedEnvironmentVariables) {
      const value = process.env[name];
      if (value && value.length >= 8 && text.includes(value)) findings.push(`${file}: contains server-only value from ${name}`);
    }
  }
}

try {
  const history = execFileSync("git", ["log", "-p", "--all", "--", ".", ":(exclude)package-lock.json"], {
    cwd: root,
    encoding: "utf8",
    maxBuffer: 64 * 1024 * 1024,
  });
  scanText("git history", history, false);
} catch (error) {
  console.warn("Security audit: Git history scan was skipped.", error instanceof Error ? error.message : "Unknown error");
}

if (findings.length) {
  console.error("Security audit failed:");
  for (const finding of [...new Set(findings)]) console.error(`- ${finding}`);
  process.exit(1);
}

console.log("Security audit passed: no high-confidence secrets or unsafe execution sinks detected.");
