import "server-only";
import { getDb } from "@/lib/db";
import {
  BUSINESS,
  DEFAULT_HERO_HEADLINE,
  DEFAULT_HERO_SUBHEAD,
  DEFAULT_TESTIMONIALS,
  type Testimonial,
} from "@/lib/content";

/** The resolved, render-ready site content (defaults already applied). */
export type ResolvedSettings = {
  phone: string;
  email: string;
  phoneHref: string;
  mailtoHref: string;
  heroHeadline: string;
  heroSubhead: string;
  testimonials: Testimonial[];
};

/** The raw editable values (blank = "use default"), for the CMS form. */
export type RawSettings = {
  phone: string;
  email: string;
  heroHeadline: string;
  heroSubhead: string;
  testimonials: Testimonial[];
};

const SETTINGS_ID = 1;

function telHref(phone: string): string {
  return "tel:+1" + phone.replace(/\D/g, "");
}

function parseTestimonials(json: string): Testimonial[] {
  try {
    const parsed = JSON.parse(json || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((t) => t && typeof t.quote === "string" && t.quote.trim())
      .map((t) => ({
        quote: String(t.quote),
        attribution: String(t.attribution ?? ""),
      }));
  } catch {
    return [];
  }
}

/** Read the raw editable settings row (creating defaults if none exists). */
export async function getRawSettings(): Promise<RawSettings> {
  const db = await getDb();
  const row = await db.siteSettings.findUnique({ where: { id: SETTINGS_ID } });
  return {
    phone: row?.phone ?? "",
    email: row?.email ?? "",
    heroHeadline: row?.heroHeadline ?? "",
    heroSubhead: row?.heroSubhead ?? "",
    testimonials: parseTestimonials(row?.testimonials ?? "[]"),
  };
}

/**
 * Read settings with all defaults applied — this is what the public pages
 * server-render. A blank stored field falls back to the built-in copy.
 */
export async function getResolvedSettings(): Promise<ResolvedSettings> {
  let raw: RawSettings;
  try {
    raw = await getRawSettings();
  } catch {
    // If the database is unavailable at render time, fall back to defaults so
    // the marketing site still renders.
    raw = {
      phone: "",
      email: "",
      heroHeadline: "",
      heroSubhead: "",
      testimonials: [],
    };
  }

  const phone = raw.phone.trim() || BUSINESS.defaultPhone;
  const email = raw.email.trim() || BUSINESS.defaultEmail;
  const cmsTestimonials = raw.testimonials.filter((t) => t.quote.trim());

  return {
    phone,
    email,
    phoneHref: telHref(phone),
    mailtoHref: "mailto:" + email,
    heroHeadline: raw.heroHeadline.trim() || DEFAULT_HERO_HEADLINE,
    heroSubhead: raw.heroSubhead.trim() || DEFAULT_HERO_SUBHEAD,
    testimonials: cmsTestimonials.length ? cmsTestimonials : DEFAULT_TESTIMONIALS,
  };
}

/** Persist edited settings (admin CMS). Empty strings mean "use default". */
export async function updateSettings(input: RawSettings): Promise<void> {
  const db = await getDb();
  const testimonials = JSON.stringify(
    input.testimonials
      .map((t) => ({
        quote: (t.quote ?? "").trim(),
        attribution: (t.attribution ?? "").trim(),
      }))
      .filter((t) => t.quote),
  );
  const data = {
    phone: input.phone.trim(),
    email: input.email.trim(),
    heroHeadline: input.heroHeadline.trim(),
    heroSubhead: input.heroSubhead.trim(),
    testimonials,
  };
  await db.siteSettings.upsert({
    where: { id: SETTINGS_ID },
    create: { id: SETTINGS_ID, ...data },
    update: data,
  });
}

/** Reset all site content back to the original built-in copy. */
export async function resetSettings(): Promise<void> {
  const db = await getDb();
  await db.siteSettings
    .delete({ where: { id: SETTINGS_ID } })
    .catch(() => undefined);
}
