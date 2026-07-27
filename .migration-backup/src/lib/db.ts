import { PrismaClient } from "@prisma/client";

/**
 * Prisma client factory that works in two environments from one codebase:
 *
 *  - Local / Node (dev, `next build`, tests): a plain SQLite file via
 *    DATABASE_URL ("file:./dev.db"). No adapter, no Cloudflare packages needed.
 *
 *  - Cloudflare Workers (production via @opennextjs/cloudflare): the D1 binding
 *    "DB" through the Prisma D1 driver adapter. The Cloudflare-only packages
 *    (@opennextjs/cloudflare, @prisma/adapter-d1) are imported *dynamically*,
 *    behind the CF_WORKERS flag and with webpack/turbopack ignore hints, so a
 *    local build never needs them installed. Install them at deploy time —
 *    see DEPLOYMENT.md.
 */

// Cache the client on globalThis in dev to avoid exhausting connections during
// Next.js hot-reload. On Workers each isolate gets its own instance.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

async function createPrismaClient(): Promise<PrismaClient> {
  // Cloudflare Workers path — enabled by setting CF_WORKERS=1 in wrangler vars.
  if (process.env.CF_WORKERS === "1") {
    // Dynamic, bundler-ignored imports: only resolved inside the Cloudflare
    // build where these packages are installed (see DEPLOYMENT.md). The
    // @ts-ignore keeps the local typecheck/build green without them present.
    // @ts-ignore optional dependency present only in the Cloudflare build
    const { getCloudflareContext } = await import(/* webpackIgnore: true */ "@opennextjs/cloudflare");
    // @ts-ignore optional dependency present only in the Cloudflare build
    const { PrismaD1 } = await import(/* webpackIgnore: true */ "@prisma/adapter-d1");
    const { env } = getCloudflareContext();
    const adapter = new PrismaD1((env as Record<string, unknown>).DB);
    return new PrismaClient({ adapter });
  }

  // Local / Node path: standard file-based SQLite via DATABASE_URL.
  return new PrismaClient();
}

// Lazily initialize a single shared client.
let clientPromise: Promise<PrismaClient> | undefined;

export function getDb(): Promise<PrismaClient> {
  if (globalForPrisma.prisma) return Promise.resolve(globalForPrisma.prisma);
  if (!clientPromise) {
    clientPromise = createPrismaClient().then((client) => {
      if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;
      return client;
    });
  }
  return clientPromise;
}
