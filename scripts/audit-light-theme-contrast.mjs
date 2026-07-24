import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const roots = ["src/app", "src/components"];
const extensions = new Set([".ts", ".tsx", ".css"]);
const riskyTokenPattern = /text-(?:white|slate-(?:50|100|200|300|400)|cyan-(?:50|100|200|300)|sky-(?:50|100|200|300)|blue-(?:50|100|200|300)|teal-(?:50|100|200|300)|turquoise-(?:50|100|200|300)|amber-(?:50|100|200))(?:\/[0-9]+)?/g;

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const resolved = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await collectFiles(resolved));
    } else if (extensions.has(path.extname(entry.name))) {
      files.push(resolved);
    }
  }

  return files;
}

const files = (await Promise.all(roots.map(collectFiles))).flat();
const contrastCssPath = "src/app/light-contrast.css";
const contrastCss = await readFile(contrastCssPath, "utf8");
const layout = await readFile("src/app/layout.tsx", "utf8");

if (!layout.includes('import "./light-contrast.css"')) {
  console.error("Light-theme contrast stylesheet is not imported by the root layout.");
  process.exit(1);
}

const occurrences = new Map();

for (const file of files) {
  const source = await readFile(file, "utf8");
  for (const match of source.matchAll(riskyTokenPattern)) {
    if (file === contrastCssPath) continue;
    const token = match[0].split("/")[0];
    const locations = occurrences.get(token) ?? new Set();
    locations.add(file);
    occurrences.set(token, locations);
  }
}

const uncovered = [];
for (const [token, locations] of [...occurrences.entries()].sort(([a], [b]) => a.localeCompare(b))) {
  if (!contrastCss.includes(token)) {
    uncovered.push({ token, locations: [...locations].sort() });
  }
}

if (uncovered.length > 0) {
  console.error("Uncovered pale text utilities found in the white theme:");
  for (const item of uncovered) {
    console.error(`- ${item.token}: ${item.locations.join(", ")}`);
  }
  process.exit(1);
}

console.log(`Light-theme contrast coverage passed for ${files.length} source files.`);
console.log(`Covered ${occurrences.size} legacy pale text utility groups.`);
