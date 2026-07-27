import { Link } from "wouter";
import { BUSINESS } from "@/lib/content";

/** Interior-page header: light, hairline border, wordmark + "Back to Home". */
export function PageHeader() {
  return (
    <header className="flex items-center justify-between gap-2.5 border-b border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] px-4 py-6 sm:gap-3 sm:px-12 sm:py-7">
      <Link href="/" className="flex min-w-0 flex-col gap-0.5">
        <span className="whitespace-nowrap font-serif text-[clamp(15px,4.5vw,22px)] font-semibold tracking-[0.04em] text-[var(--color-ink)]">
          {BUSINESS.name}
        </span>
        <span className="hidden text-[10px] uppercase tracking-[0.28em] text-[var(--color-muted)] sm:block">
          {BUSINESS.subtitle}
        </span>
      </Link>
      <Link
        href="/"
        className="w-fit shrink-0 whitespace-nowrap border-b border-[var(--color-accent)] pb-0.5 text-[11px] uppercase tracking-wide text-[var(--color-accent)] transition-colors hover:text-[var(--color-ink)] sm:text-xs"
      >
        Back to Home
      </Link>
    </header>
  );
}
