/**
 * Downloads the Magnific-generated images for the Closets & Custom Storage
 * page into artifacts/udfh-site/public/images/storage/.
 *
 * The URLs are signed Magnific links that expire on 2026-10-28. If they have
 * expired, open each creation on magnific.com and download it under the
 * file name listed here.
 */
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://pikaso.cdnpk.net/private/production";
const EXP = "token=exp=1793145600~hmac=";

const IMAGES: Record<string, string> = {
  "hero.png": `${BASE}/5833669484/render.png?${EXP}793e43e8ae8c60b2df26a8ddb0162658d602aadfa2a06ab5bf1c646d665483c2`,
  "walk-in.png": `${BASE}/5833669133/render.png?${EXP}3b7c8af0d4325982632da64e57c4c6ee393f935c47885fe1160178145a26180f`,
  "reach-in.png": `${BASE}/5833669237/render.png?${EXP}983877595e3d4178cdca6e302361ce58011d610849d0ccb1eff157e1bd48ab60`,
  "garage.png": `${BASE}/5833669608/render.png?${EXP}eb9a64477fb747ce3c97a9b11c0c84d336271f076f9d04e49ae63795b836f2a2`,
  "office.png": `${BASE}/5833669400/render.png?${EXP}f502a2f3667af434f15a55b3755daa9438fff4bdcd824f0ed8bf02befd9c6579`,
  "pantry.png": `${BASE}/5833669545/render.png?${EXP}ff2cb26f03dda10e97319201442c865680699c8b18dcc8ba69e53c34d02306de`,
  "laundry.png": `${BASE}/5833669376/render.png?${EXP}ade343873c92f4e65dafeefffceca1188fab937514b24a6af409a655962ee975`,
  "mudroom.png": `${BASE}/5833669998/render.png?${EXP}7248bc0babffe9e6a351a679cac822ac73fcc576c0b08336da752903e9283801`,
  "wall-bed.png": `${BASE}/5833671179/render.png?${EXP}80e3721762521243033b0c30cc37067fbce1b54e3457e38620847cd9e20a112f`,
  "media-wall.png": `${BASE}/5833670636/render.png?${EXP}113c8c8332a42fcdc186142656df67bdab7800469af651de6c7866e8d767c884`,
  "detail-finishes.png": `${BASE}/5833670707/render.png?${EXP}dab4dd23397900f44ed5cad737c7ca4401f87bd54b86f0e1fe8ce54bf8ac8166`,
  "detail-hardware.png": `${BASE}/5833670823/render.png?${EXP}15a5e0d211508bee799a7bda931f49f4dc6ed1700bb125894f6023d852d412e1`,
  "detail-lighting.png": `${BASE}/5833671062/render.png?${EXP}823dcee1abe662a2e0ac7d7fb40e11871fd23ed788c2ca9b8e1dca4b4a8b2d09`,
  "home-row.png": `${BASE}/5833671548/render.png?${EXP}6aac5b19a083d0aab0a5b98251db43364fdae5050194e7ab0d53316153fd16f4`,
};

const outDir = join(
  dirname(fileURLToPath(import.meta.url)),
  "../../artifacts/udfh-site/public/images/storage",
);

await mkdir(outDir, { recursive: true });
let failed = 0;
for (const [name, url] of Object.entries(IMAGES)) {
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`✗ ${name}: HTTP ${res.status}`);
    failed++;
    continue;
  }
  await writeFile(join(outDir, name), Buffer.from(await res.arrayBuffer()));
  console.log(`✓ ${name}`);
}
if (failed) process.exit(1);
