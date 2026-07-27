import type { Metadata } from "next";
import { ProductPage } from "@/components/product-page";
import { SOFT_WINDOW_TREATMENTS } from "@/lib/products";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Shades & Drapery",
  description:
    "Roller, cellular, Roman, sheer, and woven shades plus layered drapery — Centerpiece™ Roman, PerfectSheer™, SmartDrape®, and more, chosen with real swatches in your light.",
  path: "/soft-window-treatments",
});

export default function SoftWindowTreatmentsPage() {
  return <ProductPage data={SOFT_WINDOW_TREATMENTS} />;
}
