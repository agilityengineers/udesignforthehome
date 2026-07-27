import { Link } from "wouter";
import { BUSINESS } from "@/lib/content";
import type { ResolvedSettings } from "@/lib/settings";

/** Landing-page footer (charcoal). Contact info is CMS-driven. */
export function SiteFooter({ settings }: { settings: ResolvedSettings }) {
  return (
    <footer className="bg-[var(--color-footer-ink)] px-6 pb-10 pt-16 text-[color-mix(in_srgb,var(--color-cream)_65%,transparent)] sm:px-12">
      <div className="mx-auto flex max-w-content flex-col gap-10">
        <div className="flex flex-wrap items-start justify-between gap-12">
          <div className="flex max-w-[320px] flex-col gap-2">
            <span className="font-serif text-[22px] font-semibold text-[var(--color-cream)]">
              {BUSINESS.name}
            </span>
            <p className="m-0 text-[13px] leading-[1.6]">{BUSINESS.tagline}</p>
          </div>
          <div className="flex flex-col gap-2 text-[13px]">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-cream)_45%,transparent)]">
              Contact
            </span>
            <a href={settings.phoneHref} className="text-[color-mix(in_srgb,var(--color-cream)_75%,transparent)] transition-colors hover:text-[var(--color-cream)]">
              {settings.phone}
            </a>
            <a href={settings.mailtoHref} className="text-[color-mix(in_srgb,var(--color-cream)_75%,transparent)] transition-colors hover:text-[var(--color-cream)]">
              {settings.email}
            </a>
          </div>
          <div className="flex flex-col gap-2 text-[13px]">
            <span className="text-[11px] uppercase tracking-[0.2em] text-[color-mix(in_srgb,var(--color-cream)_45%,transparent)]">
              Follow
            </span>
            <a href="#" className="text-[color-mix(in_srgb,var(--color-cream)_75%,transparent)] transition-colors hover:text-[var(--color-cream)]">Instagram</a>
            <a href="#" className="text-[color-mix(in_srgb,var(--color-cream)_75%,transparent)] transition-colors hover:text-[var(--color-cream)]">Pinterest</a>
            <a href="#" className="text-[color-mix(in_srgb,var(--color-cream)_75%,transparent)] transition-colors hover:text-[var(--color-cream)]">Houzz</a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-[color-mix(in_srgb,var(--color-cream)_10%,transparent)] pt-6">
          <p className="m-0 text-xs tracking-[0.08em] text-[color-mix(in_srgb,var(--color-cream)_40%,transparent)]">
            {BUSINESS.legalBlurb}
          </p>
          <div className="flex gap-6 text-xs">
            <Link href="/terms" className="text-[color-mix(in_srgb,var(--color-cream)_55%,transparent)] transition-colors hover:text-[var(--color-cream)]">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-[color-mix(in_srgb,var(--color-cream)_55%,transparent)] transition-colors hover:text-[var(--color-cream)]">
              Privacy Policy
            </Link>
            <Link href="/admin" className="text-[color-mix(in_srgb,var(--color-cream)_35%,transparent)] transition-colors hover:text-[var(--color-cream)]">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
