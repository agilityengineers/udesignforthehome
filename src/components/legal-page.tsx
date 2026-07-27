import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { BUSINESS } from "@/lib/content";

/** A numbered legal section: serif H2 + long-form body. */
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
      <div className="m-0 text-[15px] leading-[1.75] text-body-ink text-pretty [&_a]:text-accent [&_a:hover]:text-ink">
        {children}
      </div>
    </div>
  );
}

/**
 * Legal page shell — single 760px column, "Legal" eyebrow, H1, effective date,
 * numbered sections, and a footer cross-linking Terms ⇄ Privacy.
 *
 * TODO (client owes review — see README): have an attorney review both legal
 * pages before publishing.
 */
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
      <main className="mx-auto flex max-w-prose flex-col gap-9 px-8 pb-28 pt-20">
        <div className="flex flex-col gap-3">
          <p className="eyebrow">Legal</p>
          <h1 className="m-0 font-serif text-[clamp(36px,5vw,52px)] font-medium leading-[1.1]">
            {title}
          </h1>
          <p className="m-0 text-[13px] text-muted">
            Effective date: {effectiveDate}
          </p>
        </div>
        {children}
      </main>
      <footer className="bg-footer-ink px-6 py-10 text-cream/65 sm:px-12">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-6">
          <p className="m-0 text-xs tracking-[0.08em]">{BUSINESS.legalBlurb}</p>
          <div className="flex gap-6 text-xs">
            <Link href="/terms" className="text-cream/75 transition-colors hover:text-cream">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-cream/75 transition-colors hover:text-cream">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
