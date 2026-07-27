# Deploying to Cloudflare (first-time guide)

This app runs on **Cloudflare Workers** via the [OpenNext Cloudflare adapter](https://opennext.js.org/cloudflare),
with **Cloudflare D1** (a serverless, SQLite-compatible database) for storage.
It's the natural home for a "SQLite via Prisma" app because D1 _is_ SQLite — the
Prisma schema is identical between local development and production.

> **Why not a plain SQLite file?** Cloudflare's platform has no persistent
> writable disk, so a `file:./dev.db` would be wiped on every deploy/restart.
> D1 gives you the same SQLite semantics with durable, serverless storage.
> (Alternatives if you ever outgrow D1: [Turso](https://turso.tech) libSQL, or
> Neon/Supabase Postgres — each is a one-file swap in `src/lib/db.ts`.)

Everything below is a one-time setup. After it, deploying is a single command.

---

## 0. Prerequisites

- A [Cloudflare account](https://dash.cloudflare.com/sign-up) (free tier is fine).
- Node 18+ and this repo cloned locally.
- Install the base app deps: `npm install`.

## 1. Install the Cloudflare tooling

These are **not** in the base `package.json` (to keep local installs lean), so
add them when you're ready to deploy:

```bash
npm install -D @opennextjs/cloudflare wrangler
npm install @prisma/adapter-d1
```

Then log in to Cloudflare:

```bash
npx wrangler login
```

## 2. Create the D1 database

```bash
npx wrangler d1 create udfh-db
```

Copy the `database_id` it prints and paste it into **`wrangler.jsonc`** →
`d1_databases[0].database_id` (replacing `PASTE_YOUR_D1_DATABASE_ID_HERE`).

## 3. Create the database schema in D1

The Prisma migration SQL in `prisma/migrations/` is plain SQLite DDL, so it
applies straight to D1. Apply it to the **local** D1 emulator and the **remote**
database:

```bash
# find the migration file name (e.g. 20260726231703_init)
ls prisma/migrations

# apply to the remote (production) D1 database
npx wrangler d1 execute udfh-db --remote \
  --file=./prisma/migrations/<TIMESTAMP>_init/migration.sql

# (optional) apply to the local emulator for `wrangler dev`
npx wrangler d1 execute udfh-db --local \
  --file=./prisma/migrations/<TIMESTAMP>_init/migration.sql
```

> When you later change `prisma/schema.prisma`, create a new migration locally
> with `npm run db:migrate`, then apply the newly generated
> `prisma/migrations/<TIMESTAMP>_.../migration.sql` to D1 the same way.

## 4. Set the secrets

`ADMIN_PASSWORD` gates `/admin`; `AUTH_SECRET` signs the admin session cookie.
Generate a strong secret and set both as Worker secrets (never commit them):

```bash
# generate a good AUTH_SECRET
openssl rand -base64 32

npx wrangler secret put ADMIN_PASSWORD   # paste Willa's real admin password
npx wrangler secret put AUTH_SECRET      # paste the random value above
```

`CF_WORKERS=1` and `NEXT_PUBLIC_SITE_URL` are already set as non-secret `vars`
in `wrangler.jsonc` — update the URL once you have your domain.

## 5. Generate Cloudflare types (optional but recommended)

```bash
npx wrangler types
```

This writes `cloudflare-env.d.ts` describing the `DB` binding for TypeScript.

## 6. Preview locally on the Workers runtime

```bash
npm run cf:preview     # builds with OpenNext + runs `wrangler dev`
```

Visit the printed URL. This runs the exact Workers build against the **local** D1
database. (Plain `npm run dev` still works too and uses the local SQLite file —
use whichever is convenient.)

## 7. Deploy

```bash
npm run cf:deploy      # builds with OpenNext + `wrangler deploy`
```

Wrangler prints your `*.workers.dev` URL. Open `/` to see the site and `/admin`
to sign in with `ADMIN_PASSWORD`.

## 8. Connect it to GitHub (recommended)

Two good options:

- **Push-to-deploy via Workers Builds / Pages:** In the Cloudflare dashboard →
  Workers & Pages → create an application → connect this GitHub repo. Set the
  build command to `npx opennextjs-cloudflare build` and the deploy command to
  `npx wrangler deploy`. Add the same D1 binding and secrets in the dashboard.
  Every push to your production branch then deploys automatically.
- **GitHub Actions:** run `npm ci && npm run cf:deploy` with a
  `CLOUDFLARE_API_TOKEN` secret. (Ask and I can add a ready-made workflow file.)

## 9. Custom domain

In the Worker's **Settings → Domains & Routes**, add `udesignforthehome.com`
(and `www`). Update `NEXT_PUBLIC_SITE_URL` in `wrangler.jsonc` to the final
domain so Open Graph URLs, the sitemap, and JSON-LD resolve correctly, then
redeploy.

---

## How the code adapts to each environment

- **`src/lib/db.ts`** builds the Prisma client one of two ways:
  - Local/Node (`npm run dev`, `next build`): a plain SQLite file via
    `DATABASE_URL`.
  - Cloudflare (`CF_WORKERS=1`): the `DB` D1 binding through
    `@prisma/adapter-d1`. Those packages are imported dynamically and are only
    needed in the Cloudflare build.
- **Auth** (`src/lib/auth.ts`, `src/middleware.ts`) uses the Web Crypto API only,
  so it runs on the Workers/Edge runtime with no Node crypto dependency.
- **Images** are self-hosted under `public/images/` and served unoptimized
  (`next.config.mjs`), so no external image-optimization service is required.

## Email notifications (still a TODO)

Booking submissions are always saved to the database and shown in the admin. To
also email Willa on each new lead, wire up a provider in `src/lib/email.ts`
(Resend recommended) and set `RESEND_API_KEY` + `NOTIFY_EMAIL` as Worker
secrets. See the comments in that file.

## Troubleshooting

- **`D1_ERROR: no such table`** — you didn't apply the migration to that D1
  instance. Re-run step 3 for `--remote` (and/or `--local`).
- **Admin always redirects to login** — `AUTH_SECRET` differs between requests
  (e.g. not set). Set it once with `wrangler secret put AUTH_SECRET`.
- **Build can't find `@opennextjs/cloudflare`** — run the step 1 install.
- **`nodejs_compat` error** — keep the `compatibility_flags` in `wrangler.jsonc`.
