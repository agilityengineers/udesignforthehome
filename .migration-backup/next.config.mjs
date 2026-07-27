/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // All product/portrait imagery is self-hosted under /public/images.
    // Pre-sized Norman® assets (510x460, 1440x1200) don't need re-optimization,
    // and unoptimized images keep the Cloudflare Workers build simple (no
    // external image-optimization service required for a first deploy).
    // If you later add Cloudflare Images, remove this and configure a loader.
    unoptimized: true,
  },
};

// Opt-in: when you want `next dev` to expose Cloudflare bindings (D1, etc.)
// via getCloudflareContext(), run with `CF_DEV=1 npm run dev`. Plain
// `npm run dev` stays a pure Node/SQLite path so local development needs no
// wrangler setup. See DEPLOYMENT.md.
if (process.env.CF_DEV === "1") {
  const { initOpenNextCloudflareForDev } = await import("@opennextjs/cloudflare");
  await initOpenNextCloudflareForDev();
}

export default nextConfig;
