// Generates branded, correctly-proportioned placeholder images for every asset
// in the manifest, so the site renders faithfully before the real Norman®
// photos are downloaded (see fetch-norman-images.mjs). Placeholders are only
// written when the target file does not already exist, so running the fetch
// script later — or dropping in real photos — is never overwritten here.
//
//   node scripts/generate-placeholders.mjs          # fill missing files
//   node scripts/generate-placeholders.mjs --force  # regenerate all
//
// Requires the `sharp` dev dependency.

import { mkdir, access } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { IMAGES, DIMENSIONS } from "./image-manifest.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "public", "images", "norman");
const force = process.argv.includes("--force");

// Warm, editorial palette matching the design tokens.
const PALETTES = [
  ["#E9E2D4", "#CFC4AF"],
  ["#DED6C6", "#B9AD95"],
  ["#E4DCCB", "#C2B49A"],
  ["#D8CFBD", "#A99C82"],
];

function escapeXml(s) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]),
  );
}

function svgFor({ width, height }, label, seed) {
  const [c1, c2] = PALETTES[seed % PALETTES.length];
  const fontSize = Math.round(Math.min(width, height) * 0.05);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <rect x="${width * 0.06}" y="${height * 0.06}" width="${width * 0.88}" height="${height * 0.88}"
        fill="none" stroke="#2A261F" stroke-opacity="0.14" stroke-width="1.5"/>
  <text x="50%" y="47%" text-anchor="middle" font-family="Georgia, serif" font-style="italic"
        font-size="${fontSize * 1.2}" fill="#2A261F" fill-opacity="0.55">${escapeXml(label)}</text>
  <text x="50%" y="55%" text-anchor="middle" font-family="Arial, sans-serif"
        font-size="${fontSize * 0.55}" letter-spacing="3" fill="#2A261F" fill-opacity="0.4">PLACEHOLDER IMAGE</text>
</svg>`;
}

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  let written = 0;
  let skipped = 0;
  for (let i = 0; i < IMAGES.length; i++) {
    const img = IMAGES[i];
    const dest = path.join(OUT_DIR, img.file);
    if (!force && (await exists(dest))) {
      skipped++;
      continue;
    }
    const dims = DIMENSIONS[img.shape] ?? DIMENSIONS.card;
    const svg = svgFor(dims, img.label, i);
    await sharp(Buffer.from(svg)).jpeg({ quality: 82 }).toFile(dest);
    written++;
  }
  console.log(
    `Placeholders: wrote ${written}, skipped ${skipped} existing → ${path.relative(process.cwd(), OUT_DIR)}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
