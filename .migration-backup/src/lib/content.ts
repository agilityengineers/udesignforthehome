/**
 * Single source of truth for the site's real, shippable copy and structured
 * content (product data, service-area, defaults). All strings here are the
 * client-approved copy transcribed from the design handoff — do not replace
 * with placeholders.
 */

export const BUSINESS = {
  name: "U Design For The Home",
  owner: "Willa Parsons",
  subtitle: "Willa Parsons · Window Treatments",
  tagline:
    "Design-led window treatments, brought to your door. Fredericksburg, VA and 100 miles around.",
  city: "Fredericksburg",
  region: "VA",
  defaultPhone: "(540) 429-5241",
  defaultEmail: "udesignforthehome@gmail.com",
  legalBlurb:
    "U Design For The Home · Serving Fredericksburg & the Mid-Atlantic · Registered Dealer & Insured",
} as const;

/** The three approved hero headline options (CMS can override entirely). */
export const HERO_HEADLINES = {
  "way-you-live":
    "Custom Window Treatments, Designed for the Way You Actually Live.",
  "begin-with-light": "Every Room Begins with Light. Let’s Get Yours Right.",
  "showroom-comes-to-you":
    "The Showroom Comes to You. The Design Comes from a Designer.",
} as const;

export const DEFAULT_HERO_HEADLINE = HERO_HEADLINES["way-you-live"];

export const DEFAULT_HERO_SUBHEAD =
  "An interior designer’s eye, a mobile showroom that comes to your door, and a Product Guarantee on every custom install.";

export type Testimonial = { quote: string; attribution: string };

/** Default testimonials — TODO: replace with real client quotes (see README). */
export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "She held four fabrics up to our bay window at five in the evening and said, ‘this one.’ She was right.",
    attribution: "Margaret · Old Town Alexandria",
  },
  {
    quote:
      "We closed on a Friday and had shades in every room before the movers left. With three kids, that mattered.",
    attribution: "David · Stafford",
  },
  {
    quote:
      "The COA paperwork alone would have taken me months. Willa handled all of it and the shutters look original to the house.",
    attribution: "Eleanor · Fredericksburg Historic District",
  },
];

/** "The Willa Difference" pillars. */
export const PILLARS = [
  {
    numeral: "01",
    title: "Designer-Led, Not Dealer-Led",
    body: "Every recommendation starts with your room, your light, your life. Not a sales quota.",
  },
  {
    numeral: "02",
    title: "Showroom-in-a-Van",
    body: "We bring full-size samples to your home, so you see every fabric in your actual light.",
  },
  {
    numeral: "03",
    title: "Product Guarantee",
    body: "We measure. We install. If anything is off, we make it right at no cost to you.",
  },
  {
    numeral: "04",
    title: "Made in the USA, In 15 Days",
    body: "US-based fabrication, professionally installed within 15 business days of your order.",
  },
] as const;

/** Alternating image/text rows in "Products & Services". */
export const PRODUCT_ROWS = [
  {
    eyebrow: "Hard Window Treatments",
    title: "Shutters and blinds with real presence",
    body: "Plantation shutters in hardwood or polymer, and custom blinds in wood, composite, or aluminum. These are the treatments you touch every day, so they should feel substantial in the hand and sit perfectly square in the frame.",
    href: "/hard-window-treatments",
    linkLabel: "Learn More",
    image: "/images/norman/home-hard.jpg",
    alt: "Plantation shutters in a bright living room",
  },
  {
    eyebrow: "Soft Window Treatments",
    title: "Fabric is where a room gets its voice",
    body: "Roller, cellular, Roman, woven wood, and sheer shades. And for the rooms that deserve it: layered drapery, valances, and cornices. This is the luxury tier, and it is where we do our favorite work.",
    href: "/soft-window-treatments",
    linkLabel: "Learn More",
    image: "/images/norman/home-soft.jpg",
    alt: "Layered drapery and Roman shades in warm light",
  },
  {
    eyebrow: "Motorization & Smart Home",
    title: "Shades that know your schedule",
    body: "Lutron, Somfy, and Zigbee-integrated treatments that respond to your voice, your calendar, or the angle of the sun. Morning light without leaving bed. Privacy at dusk without a thought.",
    href: "/motorization",
    linkLabel: "Learn More",
    image: "/images/norman/home-motor.jpg",
    alt: "Motorized shades mid-descent in a modern great room",
  },
  {
    eyebrow: "Design Consultation",
    title: "Swatches mean nothing until they meet your light",
    body: "An in-home session covering color, fabric, and light planning, with real samples viewed in your actual rooms at the times of day you live in them. This is where the right answer becomes obvious.",
    href: "#consultation",
    linkLabel: "Book a Consultation",
    image: "/images/norman/home-consult.jpg",
    alt: "Willa holding fabric swatches to a client window",
  },
] as const;

/** "Who We Serve" cards (charcoal section). */
export const NICHES = [
  {
    title: "Historic Home Owners",
    body: "Fredericksburg’s historic district. Old Town Alexandria. We handle Certificate of Appropriateness review as a concierge service and replicate period shutters with historical accuracy, so your windows honor the house.",
  },
  {
    title: "HOA Communities",
    body: "Stafford, Fairfax, and Loudoun. Dual-sided shades give you the interior fabric you love while the street sees the neutral backing your covenant requires. Everyone’s happy, including the board.",
  },
  {
    title: "Military & Government Families",
    body: "Relocating to Quantico, Fort Belvoir, or the DC region? Our Rapid-Install program puts custom treatments in your home within 15 business days, fabricated in the US. Bare windows shouldn’t be part of the move.",
  },
  {
    title: "Interior Designers & Realtors",
    body: "Our trade program covers measure and install so your design ships flawless. Realtors: the New Move-In Shading Voucher makes a closing gift your clients actually use.",
  },
] as const;

/** "Our Process" steps. */
export const PROCESS = [
  {
    step: "Step One",
    title: "Discover",
    body: "A short phone consult. We listen first: your rooms, your light, your budget, your timeline.",
  },
  {
    step: "Step Two",
    title: "Design",
    body: "The showroom comes to you. Real samples, held to your window, in your afternoon light.",
  },
  {
    step: "Step Three",
    title: "Craft",
    body: "Custom fabrication by US workrooms we trust, built to the measurements we took ourselves.",
  },
  {
    step: "Step Four",
    title: "Install",
    body: "Our own installers, not subcontractors. Backed by the Product Guarantee.",
  },
] as const;

/** Service-area localities (also used in JSON-LD LocalBusiness areaServed). */
export const SERVICE_AREA = [
  "Fredericksburg",
  "Spotsylvania",
  "Stafford",
  "Fairfax",
  "Loudoun",
  "Prince William",
  "Alexandria",
  "Arlington",
  "Richmond metro",
  "select DC-adjacent Maryland",
] as const;

/** Project-type options for the booking form select. */
export const PROJECT_TYPES = [
  "Plantation Shutters",
  "Blinds & Shades",
  "Drapery & Soft Treatments",
  "Motorization & Smart Home",
  "Not Sure Yet — Let’s Talk",
] as const;

/** Lead pipeline statuses and their design-token colors. */
export const LEAD_STATUSES = ["New", "Contacted", "Scheduled", "Completed"] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const STATUS_COLORS: Record<LeadStatus, string> = {
  New: "#7D8471", // sage
  Contacted: "#A8894C", // brass
  Scheduled: "#B26E4B", // terracotta
  Completed: "#9A9182", // muted gray
};
