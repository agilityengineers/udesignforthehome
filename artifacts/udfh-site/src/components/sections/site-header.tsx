import { BUSINESS } from "@/lib/content";

/** Landing-page header: absolute over the hero, cream text, ghost CTA. */
export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between gap-2.5 px-4 py-6 sm:gap-3 sm:px-12 sm:py-7">
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="whitespace-nowrap font-serif text-[clamp(15px,4.5vw,22px)] font-semibold tracking-[0.04em] text-[var(--color-cream)]">
          {BUSINESS.name}
        </span>
        <span className="hidden text-[10px] uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--color-cream)_70%,transparent)] sm:block">
          {BUSINESS.subtitle}
        </span>
      </div>
      <a
        href="#consultation"
        className="shrink-0 whitespace-nowrap border border-[color-mix(in_srgb,var(--color-cream)_50%,transparent)] px-3 py-2 text-[11px] uppercase tracking-wide text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)] sm:px-[22px] sm:py-2.5 sm:text-xs"
      >
        <span className="sm:hidden">Book a Visit</span>
        <span className="hidden sm:inline">Book a Consultation</span>
      </a>
    </header>
  );
}
