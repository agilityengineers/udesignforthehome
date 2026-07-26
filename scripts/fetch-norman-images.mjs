// Downloads the real Norman® product imagery referenced in the design files and
// self-hosts it under public/images/norman/, converting to optimized JPEG.
//
//   node scripts/fetch-norman-images.mjs
//
// Run this locally (or in CI) where normanusa.com is reachable — in the build
// sandbox that host is blocked by network policy, so the repo ships with
// generated placeholders instead (see generate-placeholders.mjs). This script
// overwrites those placeholders with the genuine photos.
//
// NOTE: confirm the dealer's image-use rights before publishing (see README).
// The Willa portrait entry pulls an Unsplash placeholder — replace with a real
// portrait when the client provides one.
//
// Requires the `sharp` dev dependency (already installed).

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { IMAGES, DIMENSIONS } from "./image-manifest.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "images", "norman");

const onlyPlaceholders = process.argv.includes("--skip-unsplash");

async function download(url) {
  const res = await fetch(url, {
    headers: {
      // Some CDNs require a UA + referer for hotlink-style requests.
      "User-Agent":
        "Mozilla/5.0 (compatible; UDFH-asset-fetch/1.0; +https://udesignforthehome.com)",
      Referer: "https://normanusa.com/",
      Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  let ok = 0;
  const failures = [];

  for (const img of IMAGES) {
    if (img.unsplash && onlyPlaceholders) continue;
    const dest = path.join(OUT_DIR, img.file);
    const dims = DIMENSIONS[img.shape] ?? DIMENSIONS.card;
    try {
      const buf = await download(img.url);
      // Normalize to a consistent JPEG at the frame's aspect (cover crop).
      const out = await sharp(buf)
        .resize(dims.width, dims.height, { fit: "cover", position: "attention" })
        .jpeg({ quality: 86, progressive: true })
        .toBuffer();
      await writeFile(dest, out);
      ok++;
      console.log(`✓ ${img.file}`);
    } catch (err) {
      failures.push({ file: img.file, url: img.url, error: String(err) });
      console.warn(`✗ ${img.file} — ${err instanceof Error ? err.message : err}`);
    }
  }

  console.log(`\nDownloaded ${ok}/${IMAGES.length} images to ${path.relative(process.cwd(), OUT_DIR)}`);
  if (failures.length) {
    console.log(
      "\nSome downloads failed (host blocked, moved, or rate-limited). The " +
        "existing placeholder stays in place for each. Retry, or drop a real " +
        "photo in manually:",
    );
    for (const f of failures) console.log(`  - ${f.file}  ←  ${f.url}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
