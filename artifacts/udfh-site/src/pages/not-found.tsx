import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[var(--color-cream)] px-6 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-serif text-[clamp(36px,5vw,56px)] font-medium leading-[1.1]">
        Page Not Found
      </h1>
      <p className="text-[var(--color-muted)]">
        This page doesn&rsquo;t exist or has moved.
      </p>
      <Link
        href="/"
        className="border-b border-[var(--color-accent)] pb-0.5 text-[13px] font-semibold uppercase tracking-wide text-[var(--color-accent)] transition-colors hover:text-[var(--color-ink)]"
      >
        Back to Home
      </Link>
    </div>
  );
}
