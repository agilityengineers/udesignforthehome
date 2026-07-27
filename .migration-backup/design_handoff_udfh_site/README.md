# Handoff: U Design For The Home — Marketing Site + Admin (CRM/CMS)

## Overview
A high-converting, editorial marketing site for **U Design For The Home** (Willa Parsons) — a design-first, mobile-showroom window treatment consultancy based in Fredericksburg, VA, serving a 100-mile radius (Northern Virginia, Alexandria, Richmond metro, DC suburbs). The company is a **registered Norman® USA dealer**.

The package includes: a landing page, three product detail pages, two legal pages, and a login-gated **Admin Dashboard** that acts as a mini-CRM (leads) and lightweight CMS (site content editing).

## About the Design Files
The files in `design_files/` are **design references created in HTML** — working prototypes showing the intended look and behavior, NOT production code to copy directly. The `.dc.html` files use a proprietary streaming-template runtime (`{{ holes }}`, `<sc-for>`, `<sc-if>`, a `Component extends DCLogic` class per page); read them for exact markup, inline styles, copy, and logic, then **recreate them in the target stack**.

**Target stack (per the original brief):** Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion for tasteful scroll/hover animation. If a different stack already exists in the repo, match it — do not migrate.

## Fidelity
**High-fidelity.** Colors, typography, spacing, copy, and interactions are final and approved by the client. Recreate pixel-perfectly. All copy is real and shippable (client may lightly edit); do not replace with placeholders.

## Design Tokens

### Colors
| Token | Hex | Usage |
|---|---|---|
| Background (cream) | `#FAF7F1` | Page background, light cards, light text on dark |
| Background (warm sand) | `#F2EDE3` | Testimonials section, admin background |
| Ink (charcoal) | `#2A261F` | Body text, dark sections (Who We Serve, CTA, hero base) |
| Footer charcoal | `#221F19` | Footer background |
| Accent (sage) | `#7D8471` | CSS var `--accent`: eyebrows, buttons, links, numerals |
| Accent alt (terracotta) | `#B26E4B` | Alternative accent (tweakable), "Scheduled" status |
| Accent alt (brass) | `#A8894C` | Alternative accent (tweakable), "Contacted" status |
| Muted text | `#6B6357` | Secondary text on light |
| Body text (legal) | `#4A443B` | Long-form paragraph text |
| Muted gray | `#9A9182` | "Completed" status, hints |
| Error/danger | `#A0522D` | Login error, delete hover |
| Text on dark | `rgba(250,247,241,0.6–0.85)` | Varying opacities on charcoal |
| Hairline (light) | `rgba(42,38,31,0.10–0.12)` | Borders on light |
| Hairline (dark) | `rgba(250,247,241,0.12–0.35)` | Borders on dark |

The accent is exposed as a CSS custom property `--accent` and should be a Tailwind theme token. Client-tweakable options: sage `#7D8471`, terracotta `#B26E4B`, brass `#A8894C`.

### Typography
- **Headings / display:** `Cormorant Garamond` (Google Fonts; weights 400/500/600, italic used for step labels, numerals, quotes). H1 hero: `clamp(38px, 5.4vw, 72px)`, weight 500, line-height 1.08. Section H2: `clamp(32px, 4vw, 48px)`, weight 500, line-height 1.15. Card H3: 22–32px, weight 600.
- **Body / UI:** `Hanken Grotesk` (Google Fonts; 400/500/600). Body 14–17px, line-height 1.6–1.75.
- **Eyebrows / buttons:** 11–13px, uppercase, letter-spacing 0.12em–0.3em.
- Use `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs.

### Spacing & shape
- Section padding: 96–112px vertical, 48px horizontal (32px on small screens). Content max-width 1100–1200px.
- **No border radius anywhere. No shadows.** The aesthetic is flat, editorial, hairline-bordered.
- Grids: `repeat(auto-fit, minmax(220–320px, 1fr))` with 40–72px gaps.
- Buttons: solid accent (padding 15–16px × 32–36px) or 1px ghost outline; hover inverts to cream/charcoal.

## Screens / Views

### 1. Landing page (`U Design For The Home.dc.html`)
Semantic landmarks: `<header>` (absolute over hero), `<main>`, `<footer>`.

- **Header** (absolute, z-10 over hero): wordmark stack (serif name + tracked uppercase subtitle "Willa Parsons · Window Treatments") left; ghost "Book a Consultation" button right → scrolls to `#consultation`.
- **Hero** (100vh, min 640px, charcoal base): background image slot (Norman PerfectSheer™ photo currently; production should use `<video autoplay muted loop playsInline poster>` per original brief with TODO for real footage). Bottom-weighted gradient overlay `linear-gradient(to top, rgba(26,23,18,0.82), rgba(26,23,18,0.35) 45%, rgba(26,23,18,0.25))`. Centered stack: eyebrow "Fredericksburg • Northern Virginia • Design-Led Window Treatments"; H1 (CMS-driven, default "Custom Window Treatments, Designed for the Way You Actually Live." — alternates: "Every Room Begins with Light. Let's Get Yours Right." / "The Showroom Comes to You. The Design Comes from a Designer."); subhead; primary button "Book Your In-Home Consultation" + ghost "See Our Product"; animated scroll cue (SVG arrow, 2.4s ease-in-out bounce — disable under `prefers-reduced-motion`).
- **The Willa Difference**: 4-col auto-fit grid. Each pillar: italic serif numeral (01–04, accent), H3, short paragraph. Pillars: Designer-Led, Not Dealer-Led / Showroom-in-a-Van / Product Guarantee / Made in the USA, In 15 Days.
- **Products & Services** (`#work`): section header + 4 alternating image/text rows (alternation done via `direction: rtl` on wrapper, `ltr` restored inside). Image 420px tall, object-fit cover. Each row: eyebrow kicker, serif H3, designer-voiced paragraph, underlined uppercase "Learn More" link → product pages (Design Consultation links to `#consultation`). Images are Norman® product photos (see Assets).
- **Who We Serve** (charcoal section): 4 cards in a 1px-gap grid (gap color = hairline). Historic Home Owners (COA concierge) / HOA Communities (dual-sided shades) / Military & Government Families (Rapid-Install 15 days) / Interior Designers & Realtors (trade program, New Move-In Shading Voucher).
- **Our Process**: 4 columns, each with accent top border, italic serif "Step One…Four", H3 (Discover/Design/Craft/Install), short paragraph.
- **Meet Willa**: 2-col; portrait image (420×520 max) + story with serif pull-quote heading ""I kept watching good rooms get let down at the window."", two paragraphs, italic serif signature.
- **Testimonials** (warm sand bg): centered eyebrow "In Their Words"; 3 quote cards (cream bg, serif italic 21px quote, uppercase attribution). Content is CMS-driven with defaults (Margaret · Old Town Alexandria / David · Stafford / Eleanor · Fredericksburg Historic District). TODO: real quotes.
- **Service Area**: centered; H2 "Based in Fredericksburg. At home within 100 miles."; serif interpunct-separated locality list (Fredericksburg · Spotsylvania · Stafford · Fairfax · Loudoun · Prince William · Alexandria · Arlington · Richmond metro · select DC-adjacent Maryland).
- **Final CTA** (`#consultation`, charcoal): left — H2 "Your home deserves more than off-the-shelf.", supporting line, phone (serif 24px) + email links (CMS-driven). Right — booking form: Name*, Email* (2-col) / Phone, ZIP (2-col) / Project Type select (Plantation Shutters / Blinds & Shades / Drapery & Soft Treatments / Motorization & Smart Home / Not Sure Yet — Let's Talk) / Message textarea / submit button. Inputs: transparent bg, 1px hairline border, cream text, accent focus ring (`outline: 2px solid`, offset 2px). On submit: persist lead + swap form for a thank-you panel ("Thank you. … within one business day").
- **Footer** (`#221F19`): wordmark + tagline, Contact column (phone/email, CMS-driven), Follow column (Instagram, Pinterest, Houzz — placeholder hrefs), bottom hairline row: "U Design For The Home · Serving Fredericksburg & the Mid-Atlantic · Registered Dealer & Insured" + links to Terms, Privacy, and a low-contrast "Admin" link.

### 2–4. Product pages (`Hard Window Treatments`, `Soft Window Treatments`, `Motorization`)
Shared layout: light header with wordmark + "Back to Home"; intro split (eyebrow, serif H1, paragraph, 420px Norman hero image); product grid (auto-fit 300px, image 280px + serif H3 + short paragraph); **single conversion-focused charcoal CTA section** (serif H2, one line, one button "Book Your In-Home Consultation" → home `#consultation`); footer with "Product imagery courtesy of Norman® USA". **Deliberately no deeper navigation — the only CTA is booking.**
- Hard: Normandy®, Woodlore® Plus, Brightwood™ shutters; Ultimate™ Normandy® wood blinds, Ultimate™ faux wood, CityLights™ aluminum.
- Soft: Centerpiece™ Roman, PerfectSheer™, SmartDrape®, Soluna™ roller, Portrait™ honeycomb, SmartFold™.
- Motorization: Norman® Smart Motorization, AutoWand™, PerfectTilt™ G4, Motorized Shades.

### 5–6. Legal pages (`Terms of Service`, `Privacy Policy`)
Single 760px column, numbered serif H2 sections, effective date July 26, 2026. **TODO: attorney review before publishing.** Contact info appears in the final section of each (should also read from CMS in production). Footer cross-links between the two.

### 7. Admin Dashboard (`Admin Dashboard.dc.html`)
- **Login** (full-screen charcoal, centered cream card): password field, error state ("That password isn't right. Try again." in `#A0522D`). Prototype password `willa2026`, session-scoped. **Production: real auth (e.g. NextAuth / Clerk), remove the on-screen password hint.**
- **Shell**: charcoal top bar with wordmark, tab buttons (Leads / Site Content — active tab is cream-filled), "View Site" link, Sign Out.
- **Leads tab (mini-CRM)**:
  - Stat cards: All Leads, New (accent), This Week, Top Project Type.
  - Filter select (All/New/Contacted/Scheduled/Completed) + Refresh.
  - Lead cards: 3px left border in status color (New `#7D8471`, Contacted `#A8894C`, Scheduled `#B26E4B`, Completed `#9A9182`); name + timestamp; status select styled in status color; Delete (confirm dialog); grid of Email (mailto), Phone (tel), ZIP, Project Type; "What they're looking for" message block; auto-saving Notes textarea (saves on blur).
  - Empty state: italic serif "No requests here yet."
- **Site Content tab (CMS)**: card-grouped form — Contact Information (phone, email) / Hero (headline, supporting line) / Testimonials (3 × quote + attribution). Blank field = fall back to original copy. Save Changes → success note "Saved — the site is updated."; Reset to Original (confirm dialog). Edits apply to the landing page immediately.

## Interactions & Behavior
- Smooth in-page scroll to `#consultation` / `#work`; respect `prefers-reduced-motion` (disable scroll cue animation, smooth scroll, video autoplay, and any Framer Motion effects).
- Button hovers invert colors; links darken; all interactive elements have visible accent focus outlines (WCAG AA).
- Booking form: HTML validation (required name/email); submit → store lead `{id, date ISO, name, email, phone, zip, project, message, status:'New', notes:''}` → thank-you panel replaces form.
- Prototype persistence (replace in production): leads in `localStorage['udfh-leads']`, CMS content in `localStorage['udfh-site']`, admin session in `sessionStorage['udfh-admin']`. The landing page re-reads CMS content on `storage` and window `focus` events.
- Image slots (`image-slot.js`) are a prototype-only drag-drop placeholder mechanism — in production use `next/image` with proper `sizes`, lazy loading below the fold, and alt text.

## State Management (production)
- **Leads**: database table (id, created_at, name, email, phone, zip, project_type, message, status enum, notes text). Booking form POSTs via API route; TODO left in prototype for Formspree/Resend/HubSpot — client hasn't chosen; recommend an API route + Resend email notification + DB row.
- **Site content**: settings table or JSON store (phone, email, hero_headline, hero_subhead, testimonials[3]); server-rendered into pages; edited via admin. Legal pages should consume the same contact settings.
- **Auth**: single admin role; protect `/admin` routes with middleware.

## SEO (carry over from original brief)
Meta title/description per page, Open Graph tags, and JSON-LD `LocalBusiness` schema with the service-area counties listed above. Semantic landmarks and heading hierarchy are already modeled in the design files.

## Assets
- **Fonts**: Cormorant Garamond, Hanken Grotesk (Google Fonts).
- **Product imagery**: hotlinked from normanusa.com (client is a registered Norman dealer and prefers Norman imagery). **Production: download and self-host via next/image; confirm dealer image-use rights.** URLs are in the design files.
- **Client to supply**: hero video + poster, Willa portrait (currently an Unsplash placeholder), real testimonial quotes, social profile URLs, form backend choice, final legal review.
- Contact: (540) 429-5241 · udesignforthehome@gmail.com.

## Screenshots
Full-page reference captures in `screenshots/` — treat these as the visual source of truth alongside the HTML source:
- `01-landing-page.png` — full landing page
- `02-hard-window-treatments.png`, `03-soft-window-treatments.png`, `04-motorization.png` — product pages
- `05-terms-of-service.png`, `06-privacy-policy.png` — legal pages
- `07-admin-leads.png` — admin Leads tab (CRM), `08-admin-site-content.png` — admin Site Content tab (CMS)
(The admin login screen isn't captured; its spec is in the Admin section above.)

## Files
- `design_files/U Design For The Home.dc.html` — landing page (hero, pillars, products, niches, process, founder, testimonials, service area, booking form, footer)
- `design_files/Hard Window Treatments.dc.html` / `Soft Window Treatments.dc.html` / `Motorization.dc.html` — product detail pages
- `design_files/Terms of Service.dc.html` / `Privacy Policy.dc.html` — legal pages
- `design_files/Admin Dashboard.dc.html` — login + CRM + CMS
- `design_files/image-slot.js` — prototype image placeholder runtime (do not port; replace with next/image)
