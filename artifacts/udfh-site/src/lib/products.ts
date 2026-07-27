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
  ctaH2: string;
  ctaBody: string;
  items: ProductItem[];
};

export const HARD_WINDOW_TREATMENTS: ProductPage = {
  slug: "hard-window-treatments",
  metaTitle: "Shutters & Blinds · U Design For The Home",
  eyebrow: "Hard Window Treatments",
  h1: "Shutters and blinds that earn their keep.",
  intro:
    "Plantation shutters in hardwood or polymer, and custom blinds in wood, composite, and aluminum. These are the treatments you interact with every day, so they should feel substantial in the hand and sit perfectly square in the frame. Norman® manufactures ours in the US.",
  heroImage: "/images/norman/hard-hero.jpg",
  heroAlt: "Close-up of Norman plantation shutters in a bay window",
  ctaH2: "Let's find the right treatment for your windows.",
  ctaBody:
    "Willa will bring samples to your home — real louvers in real wood — so you can see exactly how they look in your light before you commit.",
  items: [
    {
      name: "Norman® Woodlore Plus",
      image: "/images/norman/hard-woodlore-plus.jpg",
      alt: "Norman Woodlore Plus composite shutters",
      body: "The composite shutter that outlasts real wood in humid rooms. Warranted for life against warping, cracking, and discoloration.",
    },
    {
      name: "Norman® Normandy Shutters",
      image: "/images/norman/hard-normandy.jpg",
      alt: "Norman Normandy real hardwood shutters",
      body: "Genuine hardwood, finished in 30+ paints and stains. The benchmark for historic-district approvals and period-accurate installs.",
    },
    {
      name: "Norman® Normandy Blinds",
      image: "/images/norman/hard-normandy-blind.jpg",
      alt: "Norman Normandy wood blinds",
      body: "Real hardwood slats with a full spectrum of stains. Classic proportions that hold their look for decades.",
    },
    {
      name: "Norman® Faux Wood Blinds",
      image: "/images/norman/hard-faux-wood.jpg",
      alt: "Norman faux wood blinds in a kitchen",
      body: "The moisture-resistant alternative. Ideal for kitchens and bathrooms where real wood warps.",
    },
    {
      name: "City Lights® Aluminum Blinds",
      image: "/images/norman/hard-citylights.jpg",
      alt: "City Lights slim aluminum blinds",
      body: "Slim-profile aluminum blinds in an industry-leading color range. Precise light control for contemporary rooms.",
    },
    {
      name: "BrightWood® Shutters",
      image: "/images/norman/hard-brightwood.jpg",
      alt: "BrightWood premium shutters",
      body: "A premium alternative to traditional hardwood — lighter, stronger, and optimized for wider louver panels.",
    },
  ],
};

export const SOFT_WINDOW_TREATMENTS: ProductPage = {
  slug: "soft-window-treatments",
  metaTitle: "Shades & Drapery · U Design For The Home",
  eyebrow: "Soft Window Treatments",
  h1: "Fabric is where a room finds its voice.",
  intro:
    "Roller, cellular, Roman, woven wood, and sheer shades. And for the rooms that deserve it: layered drapery, valances, and cornices. This is the luxury tier, and it is where we do our favorite work.",
  heroImage: "/images/norman/soft-hero.jpg",
  heroAlt: "Layered Roman shades in warm linen in a sitting room",
  ctaH2: "Let's pick the fabric that makes your room.",
  ctaBody:
    "The right shade changes the quality of light in a room, not just its privacy. Willa brings every sample in person so you can see the difference before you decide.",
  items: [
    {
      name: "PerfectSheer®",
      image: "/images/norman/soft-perfectsheer.jpg",
      alt: "Norman PerfectSheer sheer shades in warm morning light",
      body: "The fabric softens daylight without blocking it. Adjustable vanes give you privacy without losing the view.",
    },
    {
      name: "CenterPiece®",
      image: "/images/norman/soft-centerpiece.jpg",
      alt: "Norman CenterPiece roller shade in a bedroom",
      body: "A clean roller shade with a hidden cassette and bottom rail. Available in hundreds of fabrics from sheer to blackout.",
    },
    {
      name: "Portrait® Roman Shades",
      image: "/images/norman/soft-portrait.jpg",
      alt: "Norman Portrait Roman shades in a dining room",
      body: "Classic Roman folds in a curated fabric library. Made to the inch, installed level.",
    },
    {
      name: "SmartDrape®",
      image: "/images/norman/soft-smartdrape.jpg",
      alt: "Norman SmartDrape vertical sheer panels",
      body: "Vertical sheer panels with rotating vanes — the floor-to-ceiling alternative to horizontal shadings.",
    },
    {
      name: "SmartFold®",
      image: "/images/norman/soft-smartfold.jpg",
      alt: "Norman SmartFold pleated shades",
      body: "Sculpted fabric folds with effortless control. Modern elegance, quietly done.",
    },
    {
      name: "Soluna® Roller Shades",
      image: "/images/norman/soft-soluna.jpg",
      alt: "Soluna roller shades in a contemporary living room",
      body: "Sun-filtering roller shades designed to balance daylight and glare. Available in openness factors from 1% to 10%.",
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
  ctaH2: "Let's plan your rooms around the sun.",
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
