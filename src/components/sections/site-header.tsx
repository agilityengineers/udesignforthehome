import Link from "next/link";
import { BUSINESS } from "@/lib/content";

/** Landing-page header: absolute over the hero, cream text, ghost CTA. */
export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-7 sm:px-12">
      <div className="flex flex-col gap-0.5">
        <span className="font-serif text-[22px] font-semibold tracking-[0.04em] text-cream">
          {BUSINESS.name}
        </span>
        <span className="text-[10px] uppercase tracking-eyebrow text-cream/70">
          {BUSINESS.subtitle}
        </span>
      </div>
      <Link
        href="#consultation"
        className="border border-cream/50 px-[22px] py-2.5 text-xs uppercase tracking-wide text-cream transition-colors hover:bg-cream hover:text-ink"
      >
        Book a Consultation
      </Link>
    </header>
  );
}
