import type { Metadata } from "next";
import { ProductPage } from "@/components/product-page";
import { HARD_WINDOW_TREATMENTS } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Shutters & Blinds",
  description:
    "Plantation shutters and custom blinds in wood, composite, and aluminum — Normandy®, Woodlore® Plus, Brightwood™, and more from Norman® USA, measured and installed with our Product Guarantee.",
  path: "/hard-window-treatments",
});

export default function HardWindowTreatmentsPage() {
  return <ProductPage data={HARD_WINDOW_TREATMENTS} />;
}
