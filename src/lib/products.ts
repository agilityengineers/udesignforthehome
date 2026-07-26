/**
 * Structured content for the three product detail pages. Copy is transcribed
 * verbatim from the design handoff. Image paths point at self-hosted Norman®
 * assets under /public/images/norman (see scripts/fetch-norman-images.mjs).
 */

export type ProductItem = {
  name: string;
  image: string;
  alt: string;
  body: string;
};

export type ProductPage = {
  slug: string;
  metaTitle: string;
  eyebrow: string;
  h1: string;
  intro: string;
  heroImage: string;
  heroAlt: string;
  items: ProductItem[];
  ctaH2: string;
  ctaBody: string;
};

export const HARD_WINDOW_TREATMENTS: ProductPage = {
  slug: "hard-window-treatments",
  metaTitle: "Shutters & Blinds · U Design For The Home",
  eyebrow: "Hard Window Treatments",
  h1: "Shutters and blinds, built like furniture.",
  intro:
    "These are the treatments you touch every morning. As a registered Norman® dealer, we bring their full shutter and blind collection to your door, hold the samples in your light, and stand behind every measurement with our Product Guarantee.",
  heroImage: "/images/norman/hard-hero.jpg",
  heroAlt: "Norman shutters in a bright bathroom",
  ctaH2: "See them in your own light before you decide.",
  ctaBody:
    "The showroom comes to you. Willa brings the samples, takes the measurements, and the Product Guarantee covers the rest.",
  items: [
    {
      name: "Normandy® Shutters",
      image: "/images/norman/hard-normandy.jpg",
      alt: "Normandy hardwood plantation shutters",
      body: "100% premium hardwood from sustainably farmed forests. The right choice for historic homes and specialty shapes, French doors included.",
    },
    {
      name: "Woodlore® Plus Shutters",
      image: "/images/norman/hard-woodlore-plus.jpg",
      alt: "Woodlore Plus composite shutters",
      body: "A hybrid wood composite that will not chip or crack over time, with a waterproof option for baths and kitchens.",
    },
    {
      name: "Brightwood™ Shutters",
      image: "/images/norman/hard-brightwood.jpg",
      alt: "Brightwood painted wood shutters",
      body: "The luxury of painted wood shutters, priced for whole-house projects. Our most requested finish for newer homes.",
    },
    {
      name: "Ultimate™ Normandy® Wood Blinds",
      image: "/images/norman/hard-normandy-blind.jpg",
      alt: "Ultimate Normandy real wood blinds in an office",
      body: "Real wood blinds cut from the same hardwood as Normandy shutters, in a deep range of paints and stains.",
    },
    {
      name: "Ultimate™ Faux Wood Blinds",
      image: "/images/norman/hard-faux-wood.jpg",
      alt: "Ultimate faux wood blinds",
      body: "The smoothest-operating blind on the market, with light control and privacy that punch well above the price.",
    },
    {
      name: "CityLights™ Aluminum Blinds",
      image: "/images/norman/hard-citylights.jpg",
      alt: "CityLights aluminum blinds in a modern space",
      body: "Crisp, durable aluminum for modern spaces. Exceptional light control in a slim profile.",
    },
  ],
};

export const SOFT_WINDOW_TREATMENTS: ProductPage = {
  slug: "soft-window-treatments",
  metaTitle: "Shades & Drapery · U Design For The Home",
  eyebrow: "Soft Window Treatments",
  h1: "Fabric is where a room gets its voice.",
  intro:
    "Shades, sheers, and Romans from the Norman® collection, chosen with real swatches held to your window at the hour you actually live in the room. This is where we do our favorite work.",
  heroImage: "/images/norman/soft-hero.jpg",
  heroAlt: "Centerpiece Roman shades in a warm living room",
  ctaH2: "Swatches mean nothing until they meet your light.",
  ctaBody:
    "Willa brings the fabric collection to your home and holds each one to your window. The right answer becomes obvious.",
  items: [
    {
      name: "Centerpiece™ Roman Shades",
      image: "/images/norman/soft-centerpiece.jpg",
      alt: "Centerpiece Roman shades",
      body: "Soft, luxury fabrics with exquisite tailoring. The spirit of custom drapery in a sleeker profile.",
    },
    {
      name: "PerfectSheer™ Shades",
      image: "/images/norman/soft-perfectsheer.jpg",
      alt: "PerfectSheer layered sheer shades",
      body: "Banded, layered sheers that turn afternoon light into something worth watching.",
    },
    {
      name: "SmartDrape®",
      image: "/images/norman/soft-smartdrape.jpg",
      alt: "SmartDrape soft architectural shades",
      body: "Soft like drapery, delicately architectural. Walk through it even while it is closed — made for sliding doors.",
    },
    {
      name: "Soluna™ Roller Shades",
      image: "/images/norman/soft-soluna.jpg",
      alt: "Soluna roller shades",
      body: "A rainbow of fabrics in a clean modern line, with cordless PrecisionLift or motorized control.",
    },
    {
      name: "Portrait™ Honeycomb Shades",
      image: "/images/norman/soft-portrait.jpg",
      alt: "Portrait honeycomb cellular shades",
      body: "Over 500 fabrics and cellular insulation that earns its keep every season. Streamlined, made for every window.",
    },
    {
      name: "SmartFold™ Shades",
      image: "/images/norman/soft-smartfold.jpg",
      alt: "SmartFold sculpted fabric shades",
      body: "Sculpted fabric folds with effortless control. Modern elegance, quietly done.",
    },
  ],
};

export const MOTORIZATION: ProductPage = {
  slug: "motorization",
  metaTitle: "Motorization & Smart Home · U Design For The Home",
  eyebrow: "Motorization & Smart Home",
  h1: "Shades that know your schedule.",
  intro:
    "Morning light without leaving bed. Privacy at dusk without a thought. We design and install Norman® motorized treatments that respond to your voice, your calendar, or the angle of the sun — and integrate with the smart home you already have.",
  heroImage: "/images/norman/motor-hero.jpg",
  heroAlt: "Motorized roller shades with remote control",
  ctaH2: "Let’s plan your rooms around the sun.",
  ctaBody:
    "Willa maps your light, recommends the right motorization for each window, and our installers handle the setup end to end.",
  items: [
    {
      name: "Norman® Smart Motorization",
      image: "/images/norman/motor-smart.jpg",
      alt: "Norman Smart Motorization with SmartDial",
      body: "Quiet, energy-efficient motors with a safe charging wand. Schedule your shades or ask your voice assistant.",
    },
    {
      name: "AutoWand™ Motorization",
      image: "/images/norman/motor-autowand.jpg",
      alt: "AutoWand motorized wand control",
      body: "One-touch motorized control in a simple wand. An easy upgrade for everyday rooms.",
    },
    {
      name: "PerfectTilt™ G4 Motorized Shutters",
      image: "/images/norman/motor-perfecttilt.jpg",
      alt: "PerfectTilt G4 motorized shutters controlled by phone",
      body: "Tilt every louver in the house from your phone, or let the app follow the sun for you.",
    },
    {
      name: "Motorized Shades",
      image: "/images/norman/motor-shades.jpg",
      alt: "Motorized roller shades",
      body: "Rollers, honeycombs, and Romans with the cords designed out. Ideal for tall and hard-to-reach windows.",
    },
  ],
};

export const PRODUCT_PAGES: ProductPage[] = [
  HARD_WINDOW_TREATMENTS,
  SOFT_WINDOW_TREATMENTS,
  MOTORIZATION,
];
