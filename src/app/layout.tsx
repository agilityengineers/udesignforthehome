import type { Metadata } from "next";
import { Cormorant_Garamond, Hanken_Grotesk } from "next/font/google";
import { buildMetadata, SITE_URL } from "@/lib/seo";
import "./globals.css";

// Display / headings — Cormorant Garamond (with italics for numerals & quotes).
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

// Body / UI — Hanken Grotesk.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: "U Design For The Home · Custom Window Treatments, Fredericksburg VA",
    path: "/",
    titleAbsolute: true,
  }),
  title: {
    default:
      "U Design For The Home · Custom Window Treatments, Fredericksburg VA",
    template: "%s · U Design For The Home",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${hanken.variable}`}>
      <body className="bg-cream font-sans text-ink antialiased">{children}</body>
    </html>
  );
}
