import { cp, mkdir, readdir, rm, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(repoRoot, ".cloudflare-dist");

const publicEntries = [
  "_redirects",
  "assets",
  "daikichi",
  "index.html",
  "kaitoridaikichi",
  "robots.txt",
  "script.js",
  "sitemap.xml",
  "style.css",
];

await rm(outputDir, { force: true, recursive: true });
await mkdir(outputDir, { recursive: true });

async function copyPublicEntry(source, target) {
  const sourceStat = await stat(source);

  if (!sourceStat.isDirectory()) {
    await cp(source, target, { force: true });
    return;
  }

  await mkdir(target, { recursive: true });

  for (const entry of await readdir(source, { withFileTypes: true })) {
    if (entry.name.startsWith(".")) {
      continue;
    }

    await copyPublicEntry(join(source, entry.name), join(target, entry.name));
  }
}

for (const entry of publicEntries) {
  await copyPublicEntry(join(repoRoot, entry), join(outputDir, entry));
}
