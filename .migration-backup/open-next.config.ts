// Configuration for @opennextjs/cloudflare, which adapts the Next.js build to
// run on Cloudflare Workers. Kept minimal — the defaults are correct for this
// app. See https://opennext.js.org/cloudflare and DEPLOYMENT.md.
//
// NOTE: @opennextjs/cloudflare is installed at deploy time (it is not part of
// the base dependencies to keep the local install lean). Run:
//   npm install -D @opennextjs/cloudflare wrangler
//   npm install @prisma/adapter-d1

import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig();
