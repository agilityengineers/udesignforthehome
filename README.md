# U Design For The Home

Marketing site + admin CRM/CMS for **U Design For The Home** — Willa Parsons's
design-led, mobile-showroom window treatment consultancy in Fredericksburg, VA
(a registered Norman® USA dealer serving a 100-mile radius).

Built with **Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui ·
Prisma**. Flat, editorial aesthetic — no border radius, no shadows,
hairline borders, Cormorant Garamond + Hanken Grotesk.

The original design handoff (spec, HTML references, screenshots) lives in
[`design_handoff_udfh_site/`](./design_handoff_udfh_site).

---

## Quick start

```bash
npm install
cp .env.example .env          # then edit ADMIN_PASSWORD / AUTH_SECRET
npm run db:migrate            # creates prisma/dev.db + applies the schema
npm run db:seed               # adds one sample lead so the CRM isn't empty
npm run images:placeholders   # generates local placeholder imagery (see below)
npm run dev                   # http://localhost:3000
```

- Public site: <http://localhost:3000>
- Admin dashboard: <http://localhost:3000/admin>

### Admin login

The admin is gated by a single password (env var `ADMIN_PASSWORD`, default
`willa2026` from `.env.example`). Sign in at **`/admin`**; the session is a
signed, httpOnly cookie (valid 12h) — no on-screen password hint in this build.
Change `ADMIN_PASSWORD` and `AUTH_SECRET` before going live.

---

## What's implemented

**Public**
- **Landing page** — every section is its own component in
  [`src/components/sections/`](./src/components/sections): header, hero, The Willa
  Difference, Products & Services (alternating rows), Who We Serve, Our Process,
  Meet Willa, Testimonials, Service Area, booking CTA, footer.
- **Three product pages** — `/hard-window-treatments`, `/soft-window-treatments`,
  `/motorization` (shared layout, single booking CTA, Norman-credit footer).
- **Legal** — `/terms` and `/privacy` (contact details pulled from the CMS).
- Faithful to the design references: layout, copy, hover/focus states, and
  `prefers-reduced-motion` support (scroll cue, smooth scroll, and transitions
  are all disabled under reduced motion).

**Backend**
- **Prisma** with a `Lead` model (name, email, phone, zip, projectType, message,
  status, notes, createdAt) and a single-row `SiteSettings` store (phone, email,
  hero headline/subhead, 3 testimonials). SQLite locally; **Cloudflare D1** in
  production (same schema).
- Booking form → `POST /api/leads` → persists the lead + fires the notification
  hook, then shows the thank-you panel.
- `SiteSettings` is **server-rendered** into the public pages; blank fields fall
  back to the built-in copy.

**Admin (`/admin`)** — credential auth + middleware-protected routes
- **Leads tab** (mini-CRM): stat cards, status filter, status pipeline
  (New / Contacted / Scheduled / Completed with the design's status colors),
  per-lead auto-saving notes, delete-with-confirm, empty state.
- **Site Content tab** (CMS): edit contact info, hero, and testimonials; Save or
  Reset to Original. Edits apply to the public site immediately.

**SEO**
- Per-page metadata + Open Graph / Twitter tags, `robots.txt`, `sitemap.xml`,
  and **JSON-LD `LocalBusiness`** schema on the landing page including the full
  service-area county list.

**Cloudflare-ready** — OpenNext adapter + D1, Web-Crypto auth, self-hosted
images. See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the first-deploy walkthrough.

---

## Product imagery (important)

The design hotlinks Norman® USA product photos. Per the brief, production should
**self-host** them. The app serves images from `public/images/norman/` via
`next/image`, driven by a manifest at
[`scripts/image-manifest.mjs`](./scripts/image-manifest.mjs).

Because the build environment blocks `normanusa.com`, the repo ships with
generated **placeholder** images so everything renders. To pull the real photos
(run locally, where the host is reachable):

```bash
npm run images:fetch     # downloads & self-hosts the real Norman® assets
```

> ⚠️ Confirm the dealer's image-use rights before publishing. The Willa portrait
> is a placeholder pending a real photo.

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Local dev server (SQLite) |
| `npm run build` | `prisma generate` + production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run db:migrate` / `db:seed` / `db:studio` | Prisma migrate / seed / Studio |
| `npm run images:placeholders` | Generate local placeholder imagery |
| `npm run images:fetch` | Download real Norman® imagery (run where host is reachable) |
| `npm run cf:preview` / `cf:deploy` | Cloudflare preview / deploy (see DEPLOYMENT.md) |

---

## Remaining TODOs (client owes assets / decisions)

These are intentionally left as `TODO` in the code and are the client's to
resolve before launch:

1. **Hero video** — the hero uses a still image; the brief calls for real footage
   (`<video autoPlay muted loop playsInline poster>`), disabled under reduced
   motion. See `src/components/sections/hero.tsx`.
2. **Willa portrait** — replace the placeholder at
   `public/images/norman/willa-portrait.jpg` with a real portrait.
3. **Real testimonials** — the three quotes are approved placeholders; swap for
   real client quotes via **Admin → Site Content** (or in `src/lib/content.ts`).
4. **Email notifications** — the client hasn't chosen a provider. Wire up Resend
   (recommended) in `src/lib/email.ts` and set `RESEND_API_KEY` + `NOTIFY_EMAIL`.
   Until then, leads are still captured in the DB and admin.
5. **Social profile URLs** — footer Instagram/Pinterest/Houzz links are `#`
   placeholders (`src/components/sections/site-footer.tsx`).
6. **Norman® image rights** — confirm dealer usage rights before publishing
   self-hosted product photos.
7. **Legal review** — an attorney should review Terms & Privacy before
   publishing (noted on both pages).
8. **Real Norman® imagery** — run `npm run images:fetch` locally to replace the
   placeholders.

---

## Project structure

```
src/
  app/
    page.tsx                     # landing (composes sections + JSON-LD)
    hard-window-treatments/…     # product pages
    soft-window-treatments/…
    motorization/…
    terms/  privacy/             # legal pages (CMS-driven contact)
    admin/  admin/login/         # dashboard + login
    api/
      leads/                     # public booking (POST)
      admin/leads[/id]/          # CRM read + status/notes/delete (protected)
      admin/settings/            # CMS save/reset (protected)
      admin/login  admin/logout  # auth
    robots.ts  sitemap.ts
  components/
    sections/                    # one file per landing section
    admin/                       # dashboard, leads/content tabs, lead card, login
    ui/                          # shadcn primitives (button, input, textarea, label)
    product-page.tsx  legal-page.tsx  page-header.tsx  cover-image.tsx  booking-form.tsx
  lib/
    db.ts        # Prisma client factory (SQLite local / D1 on Cloudflare)
    leads.ts settings.ts         # data access
    auth.ts session.ts           # Web-Crypto sessions
    content.ts products.ts       # approved copy + structured content
    seo.ts email.ts utils.ts
  middleware.ts                  # gates /admin and /api/admin
prisma/ schema.prisma  seed.ts  migrations/
scripts/ image-manifest.mjs  generate-placeholders.mjs  fetch-norman-images.mjs
wrangler.jsonc  open-next.config.ts   # Cloudflare
```
