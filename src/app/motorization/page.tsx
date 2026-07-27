import type { Metadata } from "next";
import { ProductPage } from "@/components/product-page";
import { MOTORIZATION } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Motorization & Smart Home",
  description:
    "Norman® motorized shades and shutters that respond to your voice, calendar, or the sun — Smart Motorization, AutoWand™, PerfectTilt™ G4 — integrated with your smart home and installed end to end.",
  path: "/motorization",
});

export default function MotorizationPage() {
  return <ProductPage data={MOTORIZATION} />;
}
