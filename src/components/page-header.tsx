import Link from "next/link";
import { BUSINESS } from "@/lib/content";

/** Interior-page header: light, hairline border, wordmark + "Back to Home". */
export function PageHeader() {
  return (
    <header className="flex items-center justify-between border-b border-ink/10 px-6 py-7 sm:px-12">
      <Link href="/" className="flex flex-col gap-0.5">
        <span className="font-serif text-[22px] font-semibold tracking-[0.04em] text-ink">
          {BUSINESS.name}
        </span>
        <span className="text-[10px] uppercase tracking-eyebrow text-muted">
          {BUSINESS.subtitle}
        </span>
      </Link>
      <Link
        href="/"
        className="w-fit border-b border-accent pb-0.5 text-xs uppercase tracking-wide text-accent transition-colors hover:text-ink"
      >
        Back to Home
      </Link>
    </header>
  );
}
