import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";
import process from "node:process";

const root = resolve(process.cwd());
const sourceRoot = join(root, "src");
const publicRoot = join(root, "public");
const codeExtensions = new Set([".ts", ".tsx", ".js", ".jsx", ".mdx"]);
const photographyExtensions = new Set([".webp", ".png", ".jpg", ".jpeg", ".avif"]);
const reusableBrandAsset = /(logo|favicon|icon|mark|watermark|og-image|social-card)/i;

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const absolute = join(directory, entry);
    return statSync(absolute).isDirectory() ? walk(absolute) : [absolute];
  });
}

const references = new Map();
const missing = [];
const sourceFiles = walk(sourceRoot).filter((file) => codeExtensions.has(extname(file)));
const staticImagePattern = /["'`](\/images\/[^"'`)\s?#]+\.(?:webp|png|jpe?g|avif))["'`]/gi;

for (const file of sourceFiles) {
  const source = readFileSync(file, "utf8");
  for (const match of source.matchAll(staticImagePattern)) {
    const imagePath = match[1];
    const usage = relative(root, file).replaceAll("\\", "/");
    const publicFile = join(publicRoot, imagePath.replace(/^\//, ""));

    if (!existsSync(publicFile)) {
      missing.push({ imagePath, usage });
    }

    if (!references.has(imagePath)) references.set(imagePath, []);
    references.get(imagePath).push(usage);
  }
}

const duplicates = [...references.entries()]
  .filter(([imagePath, usages]) => {
    const isPhotography = photographyExtensions.has(extname(imagePath).toLowerCase());
    return isPhotography && !reusableBrandAsset.test(imagePath) && new Set(usages).size > 1;
  })
  .map(([imagePath, usages]) => ({ imagePath, usages: [...new Set(usages)].sort() }));

if (missing.length > 0) {
  console.error("\nMissing static image files:");
  for (const item of missing) console.error(`- ${item.imagePath} referenced by ${item.usage}`);
}

if (duplicates.length > 0) {
  console.error("\nRepeated non-brand photography:");
  for (const item of duplicates) {
    console.error(`- ${item.imagePath}`);
    for (const usage of item.usages) console.error(`  • ${usage}`);
  }
  console.error("\nUse a distinct, context-matched visual for each photographic placement or document an intentional brand-asset exception.");
}

if (missing.length > 0 || duplicates.length > 0) process.exit(1);

console.log(`Image audit passed: ${references.size} static image references checked with no missing files or repeated non-brand photography.`);
