import type { Metadata } from "next";
import { BUSINESS, SERVICE_AREA } from "@/lib/content";

/**
 * Canonical site URL. Set NEXT_PUBLIC_SITE_URL in production (e.g. the
 * Cloudflare/custom domain) so Open Graph URLs and JSON-LD resolve absolutely.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://udesignforthehome.com";

const DEFAULT_DESCRIPTION =
  "Designer-led custom window treatments for Fredericksburg, Northern Virginia, and the DC region. Mobile showroom, Product Guarantee, installed in 15 business days.";

/** Build per-page metadata with sensible Open Graph / Twitter defaults. */
export function buildMetadata(opts: {
  title: string;
  description?: string;
  path?: string;
  titleAbsolute?: boolean;
}): Metadata {
  const description = opts.description ?? DEFAULT_DESCRIPTION;
  const url = SITE_URL + (opts.path ?? "/");
  const title = opts.titleAbsolute
    ? { absolute: opts.title }
    : opts.title;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      siteName: BUSINESS.name,
      title: opts.title,
      description,
      url,
      locale: "en_US",
      images: [
        {
          url: "/images/norman/hero.jpg",
          width: 1440,
          height: 1200,
          alt: `${BUSINESS.name} — custom window treatments`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description,
      images: ["/images/norman/hero.jpg"],
    },
  };
}

/**
 * JSON-LD LocalBusiness schema, including the full service-area list from the
 * design handoff. Rendered in the landing page <head> via a <script> tag.
 */
export function localBusinessJsonLd(opts: {
  phone: string;
  email: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS.name,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    telephone: opts.phone,
    email: opts.email,
    image: `${SITE_URL}/images/norman/hero.jpg`,
    priceRange: "$$-$$$",
    founder: {
      "@type": "Person",
      name: BUSINESS.owner,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fredericksburg",
      addressRegion: "VA",
      addressCountry: "US",
    },
    areaServed: SERVICE_AREA.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    knowsAbout: [
      "Plantation Shutters",
      "Window Blinds",
      "Roman Shades",
      "Drapery",
      "Motorized Window Treatments",
      "Norman USA window treatments",
    ],
    slogan: "The showroom comes to you. The design comes from a designer.",
  };
}
