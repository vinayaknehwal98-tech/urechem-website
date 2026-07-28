import { readFile, readdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";

const roots = ["src", "public"];
const rootFiles = ["next.config.ts", "next.config.js"];
const textExtensions = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".mjs",
  ".cjs",
  ".json",
  ".md",
  ".mdx",
  ".txt",
  ".html",
  ".css",
  ".scss",
  ".xml",
  ".svg",
  ".webmanifest",
  ".yml",
  ".yaml",
]);

const replacements = [
  [/\bURECHEM CHEMICAL(?:'S|’S)\b/g, "URECHEM CHEMICALS'"],
  [/\bUrechem Chemical(?:'s|’s)\b/g, "Urechem Chemicals'"],
  [/\burechem chemical(?:'s|’s)\b/g, "urechem chemicals'"],
  [/\bURECHEM CHEMICAL\b(?!S)/g, "URECHEM CHEMICALS"],
  [/\bUrechem Chemical\b(?!s)/g, "Urechem Chemicals"],
  [/\burechem chemical\b(?!s)/g, "urechem chemicals"],
];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(path)));
    } else if (entry.isFile() && textExtensions.has(extname(entry.name).toLowerCase())) {
      files.push(path);
    }
  }

  return files;
}

const files = [];

for (const root of roots) {
  try {
    files.push(...(await collectFiles(root)));
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

for (const rootFile of rootFiles) {
  try {
    await readFile(rootFile, "utf8");
    files.push(rootFile);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

const changedFiles = [];

for (const file of [...new Set(files)].sort()) {
  const original = await readFile(file, "utf8");
  const normalized = replacements.reduce(
    (content, [pattern, replacement]) => content.replace(pattern, replacement),
    original,
  );

  if (normalized !== original) {
    await writeFile(file, normalized, "utf8");
    changedFiles.push(file);
  }
}

if (changedFiles.length > 0) {
  console.log(`Normalized Urechem Chemicals branding in ${changedFiles.length} file(s):`);
  for (const file of changedFiles) console.log(`- ${file}`);
} else {
  console.log("Urechem Chemicals branding is already normalized.");
}
