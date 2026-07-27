// Maps each self-hosted image (public/images/norman/<file>) to its source URL
// on normanusa.com (the client is a registered Norman® dealer). Used by
// scripts/fetch-norman-images.mjs to download real assets, and by
// scripts/generate-placeholders.mjs to synthesize stand-ins.
//
// `shape` drives the placeholder aspect ratio: "wide" hero splits, "card"
// product tiles, "portrait" for Willa.

export const IMAGES = [
  // ---- Landing page ----
  { file: "hero.jpg", shape: "wide", label: "Hero · PerfectSheer™",
    url: "https://normanusa.com/app/uploads/2022/05/Right-Image-1440-x-1200-SD.jpg.webp" },
  { file: "home-hard.jpg", shape: "card", label: "Shutters",
    url: "https://normanusa.com/app/uploads/2020/07/510-x-460_Ultra_Shutter_Bathroom.jpg.webp" },
  { file: "home-soft.jpg", shape: "card", label: "Roman Shades",
    url: "https://normanusa.com/app/uploads/2022/05/Right-Image-1440-x-1200-Roman.jpg.webp" },
  { file: "home-motor.jpg", shape: "card", label: "Smart Motorization",
    url: "https://normanusa.com/app/uploads/2023/01/510-x-460_NormanSmartMotorization-HC-3.jpg.webp" },
  { file: "home-consult.jpg", shape: "card", label: "Fabric Collection",
    url: "https://normanusa.com/app/uploads/2022/05/InnovationSection-510-x-460_Fabrics.jpg.webp" },
  // Willa portrait — an Unsplash placeholder in the design (client owes a real
  // portrait). Kept separate so it isn't mistaken for a Norman asset.
  { file: "willa-portrait.jpg", shape: "portrait", label: "Willa Parsons — portrait (placeholder)",
    url: "https://images.unsplash.com/photo-1473252812967-d565c3607e28?q=80&w=1200&auto=format&fit=crop",
    unsplash: true },

  // ---- Hard Window Treatments ----
  { file: "hard-hero.jpg", shape: "wide", label: "Shutters",
    url: "https://normanusa.com/app/uploads/2020/07/510-x-460_Ultra_Shutter_Bathroom.jpg.webp" },
  { file: "hard-normandy.jpg", shape: "card", label: "Normandy® Shutters",
    url: "https://normanusa.com/app/uploads/2020/03/SHUTTER-Normandy.jpg" },
  { file: "hard-woodlore-plus.jpg", shape: "card", label: "Woodlore® Plus",
    url: "https://normanusa.com/app/uploads/2020/03/SHUTTER-Woodlore-Plus.jpg" },
  { file: "hard-brightwood.jpg", shape: "card", label: "Brightwood™",
    url: "https://normanusa.com/app/uploads/2023/01/510-x-460_Brightwood.jpg.webp" },
  { file: "hard-normandy-blind.jpg", shape: "card", label: "Normandy® Wood Blinds",
    url: "https://normanusa.com/app/uploads/2022/05/510x460-Normandy-blind-office.jpg.webp" },
  { file: "hard-faux-wood.jpg", shape: "card", label: "Faux Wood Blinds",
    url: "https://normanusa.com/app/uploads/2022/01/510-X-460-Thumbnail-Image-Ultimate-FW-Blinds.jpg.webp" },
  { file: "hard-citylights.jpg", shape: "card", label: "CityLights™ Aluminum",
    url: "https://normanusa.com/app/uploads/2023/06/510x460-Thumbnails-Citylight-Aluminum-Blinds-1.jpg.webp" },

  // ---- Soft Window Treatments ----
  { file: "soft-hero.jpg", shape: "wide", label: "Centerpiece™ Roman",
    url: "https://normanusa.com/app/uploads/2022/05/Right-Image-1440-x-1200-Roman.jpg.webp" },
  { file: "soft-centerpiece.jpg", shape: "card", label: "Centerpiece™ Roman",
    url: "https://normanusa.com/app/uploads/2020/05/Aerolite-RomanShade.jpg" },
  { file: "soft-perfectsheer.jpg", shape: "card", label: "PerfectSheer™",
    url: "https://normanusa.com/app/uploads/2020/05/SHADES-PerfectSheer.jpg" },
  { file: "soft-smartdrape.jpg", shape: "card", label: "SmartDrape®",
    url: "https://normanusa.com/app/uploads/2020/05/SHADES-SmartDrape.jpg" },
  { file: "soft-soluna.jpg", shape: "card", label: "Soluna™ Roller",
    url: "https://normanusa.com/app/uploads/2020/03/SHADES-Soluna-Roller.jpg" },
  { file: "soft-portrait.jpg", shape: "card", label: "Portrait™ Honeycomb",
    url: "https://normanusa.com/app/uploads/2020/03/SHADES-HoneyComb.jpg" },
  { file: "soft-smartfold.jpg", shape: "card", label: "SmartFold™",
    url: "https://normanusa.com/app/uploads/2026/03/SmartFold-sm.jpg.webp" },

  // ---- Motorization ----
  { file: "motor-hero.jpg", shape: "wide", label: "Motorized Roller",
    url: "https://normanusa.com/app/uploads/2022/06/510x460_Motorized-Roller-Remote.jpg.webp" },
  { file: "motor-smart.jpg", shape: "card", label: "Smart Motorization",
    url: "https://normanusa.com/app/uploads/2023/01/510-x-460-SmartDialG2-HC-2.jpg.webp" },
  { file: "motor-autowand.jpg", shape: "card", label: "AutoWand™",
    url: "https://normanusa.com/app/uploads/2023/08/510x460-Wand-Motorized.jpg.webp" },
  { file: "motor-perfecttilt.jpg", shape: "card", label: "PerfectTilt™ G4",
    url: "https://normanusa.com/app/uploads/2021/03/1440x1200-Shutter-Phone-ShadeAutoApp-3.jpg.webp" },
  { file: "motor-shades.jpg", shape: "card", label: "Motorized Shades",
    url: "https://normanusa.com/app/uploads/2023/11/510-x-460-SmartDail-ROLLER-2-1.jpg.webp" },
];

export const DIMENSIONS = {
  wide: { width: 1440, height: 1200 },
  card: { width: 1020, height: 920 },
  portrait: { width: 840, height: 1040 },
};
