import { Link } from "wouter";
import { BUSINESS } from "@/lib/content";

/** Interior-page header: light, hairline border, wordmark + "Back to Home". */
export function PageHeader() {
  return (
    <header className="flex items-center justify-between border-b border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] px-6 py-7 sm:px-12">
      <Link href="/" className="flex flex-col gap-0.5">
        <span className="font-serif text-[22px] font-semibold tracking-[0.04em] text-[var(--color-ink)]">
          {BUSINESS.name}
        </span>
        <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-muted)]">
          {BUSINESS.subtitle}
        </span>
      </Link>
      <Link
        href="/"
        className="w-fit border-b border-[var(--color-accent)] pb-0.5 text-xs uppercase tracking-wide text-[var(--color-accent)] transition-colors hover:text-[var(--color-ink)]"
      >
        Back to Home
      </Link>
    </header>
  );
}
