export type ProductItem = {
  name: string;
  image: string;
  alt: string;
  body: string;
};

export type ProductDetail = {
  term: string;
  body: string;
};

export type ProductStep = {
  title: string;
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
  /** Optional heading shown above the item grid. */
  itemsEyebrow?: string;
  itemsH2?: string;
  /** Optional note shown with the item grid, e.g. that photos are representative. */
  imageNote?: string;
  items: ProductItem[];
  /** Optional "Finishes & Details" band. */
  details?: {
    eyebrow: string;
    h2: string;
    body: string;
    images: { src: string; alt: string }[];
    specs: ProductDetail[];
  };
  /** Optional "How It Works" steps. */
  steps?: {
    eyebrow: string;
    h2: string;
    items: ProductStep[];
  };
  /** Footer credit line; defaults to the Norman credit. Pass null for none. */
  imageCredit?: string | null;
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

export const CLOSETS_AND_STORAGE: ProductPage = {
  slug: "closets-and-storage",
  metaTitle: "Closets & Custom Storage · U Design For The Home",
  eyebrow: "Closets & Custom Storage",
  h1: "A place for everything, built to fit your home.",
  intro:
    "We design custom closets, garages, pantries, and home offices with the same eye we bring to your windows. Every system is measured in your home, made to the inch, and installed by our team, so the room works as well as it looks.",
  heroImage: "/images/storage/hero.png",
  heroAlt: "Custom walk-in closet with a center island in warm oak and soft white",
  ctaH2: "Let's design the room you'll open every day.",
  ctaBody:
    "Book one visit for both. Willa can measure your windows and your closets in the same appointment, and bring finish samples for each.",
  itemsEyebrow: "Rooms We Design",
  itemsH2: "Storage for every room that holds your day together.",
  imageNote:
    "The photos on this page show the style of work we do. They are not finished client projects. Every system we build is designed with you during your consultation, around your rooms, your measurements, and the way you live, so your finished space will be uniquely yours.",
  items: [
    {
      name: "Walk-In Closets",
      image: "/images/storage/walk-in.png",
      alt: "Walk-in closet with double hanging, shoe shelves, drawers, and a bench",
      body: "Double-hang, long-hang, shelving, and drawers laid out around how you dress. Add an island, a bench, or lighting that turns on with the door.",
    },
    {
      name: "Reach-In Closets",
      image: "/images/storage/reach-in.png",
      alt: "Reach-in closet with a white organizer system",
      body: "The everyday closet, reworked so nothing gets lost in the back. Often double the usable space of a single rod and shelf.",
    },
    {
      name: "Garage Storage",
      image: "/images/storage/garage.png",
      alt: "Garage with wall-to-wall cabinets, wall panels, and a workbench",
      body: "Cabinets, slatwall, and overhead racks that clear the floor and leave room for the car. Built to handle tools, gear, and the seasons.",
    },
    {
      name: "Home Offices",
      image: "/images/storage/office.png",
      alt: "Built-in home office with a desk and floor-to-ceiling shelving",
      body: "Desks, file drawers, and shelving sized to your room and the way you work. Cable management is designed in from the start.",
    },
    {
      name: "Pantries",
      image: "/images/storage/pantry.png",
      alt: "Walk-in pantry with adjustable shelves and pull-out baskets",
      body: "Adjustable shelves, pull-out baskets, and spice racks that put every can and canister in sight. Small pantries see the biggest change.",
    },
    {
      name: "Laundry Rooms",
      image: "/images/storage/laundry.png",
      alt: "Laundry room with sage cabinets and a wood folding counter",
      body: "Cabinets above, a folding counter between, and hampers that hide away. A hardworking room that finally has a plan.",
    },
    {
      name: "Mudrooms & Entryways",
      image: "/images/storage/mudroom.png",
      alt: "Mudroom with built-in lockers, hooks, and a bench",
      body: "Cubbies, hooks, and a bench at the door, one per person. Backpacks, boots, and keys land in the same place every day.",
    },
    {
      name: "Wall Beds",
      image: "/images/storage/wall-bed.png",
      alt: "Guest room with an open fold-down wall bed and built-in shelving",
      body: "A full guest room that folds into the wall when you need the space back. Pairs well with an office or a media room.",
    },
    {
      name: "Entertainment Centers",
      image: "/images/storage/media-wall.webp",
      alt: "Built-in entertainment wall with shelving and lower cabinets",
      body: "Built-in wall units for the TV, books, and everything that collects around them. Doors and drawers keep the clutter out of view.",
    },
  ],
  details: {
    eyebrow: "Finishes & Details",
    h2: "The finishing touches you notice every morning.",
    body: "We bring finish samples to your consultation alongside your fabric and shutter samples, so the closet, the windows, and the room are chosen together.",
    images: [
      { src: "/images/storage/detail-finishes.webp", alt: "Wood-grain cabinet finish samples" },
      { src: "/images/storage/detail-hardware.webp", alt: "Brass drawer pull and a velvet-lined jewelry drawer" },
      { src: "/images/storage/detail-lighting.webp", alt: "LED lighting under a closet shelf" },
    ],
    specs: [
      { term: "Finishes", body: "Wood-grain and solid colors, from pale oak to deep walnut and painted white." },
      { term: "Doors & Fronts", body: "Shaker, flat, and framed glass doors, with soft-close hinges and drawer glides." },
      { term: "Hardware", body: "Knobs and pulls in brushed brass, nickel, and matte black." },
      { term: "Lighting", body: "Integrated LED strips and rod lights that switch on with the door." },
      { term: "Accessories", body: "Belt and tie racks, valet rods, velvet-lined jewelry drawers, and pull-out hampers." },
      { term: "Countertops", body: "Tops for islands, desks, and laundry folding stations." },
    ],
  },
  steps: {
    eyebrow: "How It Works",
    h2: "From the first measurement to the last shelf pin.",
    items: [
      { title: "In-Home Consultation", body: "We visit, measure, and talk through what the space needs to hold and how you use it." },
      { title: "Design", body: "You see a layout drawn to your room's dimensions, with finishes and accessories chosen together." },
      { title: "Made to Order", body: "Every panel is cut to your measurements. Nothing is off the shelf." },
      { title: "Installation", body: "Our installers fit the system, level every shelf, and leave the room clean." },
    ],
  },
  imageCredit:
    "Images are representative of style. Final designs are created with each client during consultation.",
};
