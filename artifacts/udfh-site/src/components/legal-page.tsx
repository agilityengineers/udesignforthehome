import { Link } from "wouter";
import { PageHeader } from "@/components/page-header";
import { BUSINESS } from "@/lib/content";

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2.5">
      <h2 className="m-0 font-serif text-[26px] font-semibold">{heading}</h2>
      <div className="m-0 text-[15px] leading-[1.75] text-[var(--color-body-ink)] [&_a]:text-[var(--color-accent)] [&_a:hover]:text-[var(--color-ink)]">
        {children}
      </div>
    </div>
  );
}

export function LegalPage({
  title,
  effectiveDate,
  children,
}: {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader />
      <main className="mx-auto flex max-w-prose flex-col gap-8 px-6 pb-20 pt-14 sm:gap-9 sm:px-8 sm:pb-28 sm:pt-20">
        <div className="flex flex-col gap-3">
          <p className="eyebrow">Legal</p>
          <h1 className="m-0 font-serif text-[clamp(36px,5vw,52px)] font-medium leading-[1.1]">
            {title}
          </h1>
          <p className="m-0 text-[13px] text-[var(--color-muted)]">
            Effective date: {effectiveDate}
          </p>
        </div>
        {children}
      </main>
      <footer className="bg-[var(--color-footer-ink)] px-6 py-10 text-[color-mix(in_srgb,var(--color-cream)_65%,transparent)] sm:px-12">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-6">
          <p className="m-0 text-xs tracking-[0.08em]">{BUSINESS.legalBlurb}</p>
          <div className="flex gap-6 text-xs">
            <Link href="/terms" className="text-[color-mix(in_srgb,var(--color-cream)_75%,transparent)] transition-colors hover:text-[var(--color-cream)]">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-[color-mix(in_srgb,var(--color-cream)_75%,transparent)] transition-colors hover:text-[var(--color-cream)]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
