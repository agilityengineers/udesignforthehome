import { db } from "@workspace/db";
import { siteSettingsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const SETTINGS_ID = 1;

const BUSINESS = {
  defaultPhone: "(540) 429-5241",
  defaultEmail: "udesignforthehome@gmail.com",
};

const DEFAULT_HERO_HEADLINE =
  "Custom Window Treatments, Designed for the Way You Actually Live.";

const DEFAULT_HERO_SUBHEAD =
  "An interior designer's eye, a mobile showroom that comes to your door, and a Product Guarantee on every custom install.";

export type Testimonial = { quote: string; attribution: string };

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote: "She held four fabrics up to our bay window at five in the evening and said, 'this one.' She was right.",
    attribution: "Margaret · Old Town Alexandria",
  },
  {
    quote: "We closed on a Friday and had shades in every room before the movers left. With three kids, that mattered.",
    attribution: "David · Stafford",
  },
  {
    quote: "The COA paperwork alone would have taken me months. Willa handled all of it and the shutters look original to the house.",
    attribution: "Eleanor · Fredericksburg Historic District",
  },
];

export type RawSettings = {
  phone: string;
  email: string;
  heroHeadline: string;
  heroSubhead: string;
  heroStyle: string;
  heroVideoUrl: string;
  testimonials: Testimonial[];
};

export type ResolvedSettings = {
  phone: string;
  email: string;
  phoneHref: string;
  mailtoHref: string;
  heroHeadline: string;
  heroSubhead: string;
  heroStyle: string;
  heroVideoUrl: string;
  testimonials: Testimonial[];
};

function telHref(phone: string): string {
  return "tel:" + phone.replace(/\D/g, "");
}

async function getRaw(): Promise<RawSettings> {
  const rows = await db.select().from(siteSettingsTable).where(eq(siteSettingsTable.id, SETTINGS_ID));
  const row = rows[0];
  if (!row) {
    return {
      phone: "",
      email: "",
      heroHeadline: "",
      heroSubhead: "",
      heroStyle: "image",
      heroVideoUrl: "",
      testimonials: [],
    };
  }
  let testimonials: Testimonial[] = [];
  try {
    testimonials = JSON.parse(row.testimonials) as Testimonial[];
  } catch {
    testimonials = [];
  }
  return {
    phone: row.phone,
    email: row.email,
    heroHeadline: row.heroHeadline,
    heroSubhead: row.heroSubhead,
    heroStyle: row.heroStyle,
    heroVideoUrl: row.heroVideoUrl,
    testimonials,
  };
}

export async function getRawSettings(): Promise<RawSettings> {
  return getRaw();
}

export async function getResolvedSettings(): Promise<ResolvedSettings> {
  const raw = await getRaw();
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
    heroStyle: raw.heroStyle,
    heroVideoUrl: raw.heroVideoUrl.trim(),
    testimonials: cmsTestimonials.length ? cmsTestimonials : DEFAULT_TESTIMONIALS,
  };
}

export async function updateSettings(input: RawSettings): Promise<void> {
  const testimonials = JSON.stringify(
    input.testimonials
      .map((t) => ({ quote: (t.quote ?? "").trim(), attribution: (t.attribution ?? "").trim() }))
      .filter((t) => t.quote),
  );
  const data = {
    phone: input.phone.trim(),
    email: input.email.trim(),
    heroHeadline: input.heroHeadline.trim(),
    heroSubhead: input.heroSubhead.trim(),
    heroStyle: input.heroStyle === "video" ? "video" : "image",
    heroVideoUrl: input.heroVideoUrl.trim(),
    testimonials,
    updatedAt: new Date(),
  };
  const existing = await db.select({ id: siteSettingsTable.id }).from(siteSettingsTable).where(eq(siteSettingsTable.id, SETTINGS_ID));
  if (existing.length > 0) {
    await db.update(siteSettingsTable).set(data).where(eq(siteSettingsTable.id, SETTINGS_ID));
  } else {
    await db.insert(siteSettingsTable).values({ id: SETTINGS_ID, ...data });
  }
}

export async function resetSettings(): Promise<void> {
  await db.delete(siteSettingsTable).where(eq(siteSettingsTable.id, SETTINGS_ID)).catch(() => undefined);
}
