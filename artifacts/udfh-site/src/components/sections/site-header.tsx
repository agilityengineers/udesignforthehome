import { BUSINESS } from "@/lib/content";

/** Landing-page header: absolute over the hero, cream text, ghost CTA. */
export function SiteHeader() {
  return (
    <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-7 sm:px-12">
      <div className="flex flex-col gap-0.5">
        <span className="font-serif text-[22px] font-semibold tracking-[0.04em] text-[var(--color-cream)]">
          {BUSINESS.name}
        </span>
        <span className="text-[10px] uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--color-cream)_70%,transparent)]">
          {BUSINESS.subtitle}
        </span>
      </div>
      <a
        href="#consultation"
        className="border border-[color-mix(in_srgb,var(--color-cream)_50%,transparent)] px-[22px] py-2.5 text-xs uppercase tracking-wide text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
      >
        Book a Consultation
      </a>
    </header>
  );
}
