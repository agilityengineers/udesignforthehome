import Link from "next/link";
import { BUSINESS } from "@/lib/content";
import type { ResolvedSettings } from "@/lib/settings";

/** Landing-page footer (charcoal). Contact info is CMS-driven. */
export function SiteFooter({ settings }: { settings: ResolvedSettings }) {
  return (
    <footer className="bg-footer-ink px-6 pb-10 pt-16 text-cream/65 sm:px-12">
      <div className="mx-auto flex max-w-content flex-col gap-10">
        <div className="flex flex-wrap items-start justify-between gap-12">
          <div className="flex max-w-[320px] flex-col gap-2">
            <span className="font-serif text-[22px] font-semibold text-cream">
              {BUSINESS.name}
            </span>
            <p className="m-0 text-[13px] leading-[1.6]">{BUSINESS.tagline}</p>
          </div>
          <div className="flex flex-col gap-2 text-[13px]">
            <span className="text-[11px] uppercase tracking-[0.2em] text-cream/45">
              Contact
            </span>
            <a href={settings.phoneHref} className="text-cream/75 transition-colors hover:text-cream">
              {settings.phone}
            </a>
            <a href={settings.mailtoHref} className="text-cream/75 transition-colors hover:text-cream">
              {settings.email}
            </a>
          </div>
          <div className="flex flex-col gap-2 text-[13px]">
            <span className="text-[11px] uppercase tracking-[0.2em] text-cream/45">
              Follow
            </span>
            {/* TODO (client owes URLs — see README): real social profile links. */}
            <a href="#" className="text-cream/75 transition-colors hover:text-cream">
              Instagram
            </a>
            <a href="#" className="text-cream/75 transition-colors hover:text-cream">
              Pinterest
            </a>
            <a href="#" className="text-cream/75 transition-colors hover:text-cream">
              Houzz
            </a>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-cream/10 pt-6">
          <p className="m-0 text-xs tracking-[0.08em] text-cream/40">
            {BUSINESS.legalBlurb}
          </p>
          <div className="flex gap-6 text-xs">
            <Link href="/terms" className="text-cream/55 transition-colors hover:text-cream">
              Terms of Service
            </Link>
            <Link href="/privacy" className="text-cream/55 transition-colors hover:text-cream">
              Privacy Policy
            </Link>
            <Link href="/admin" className="text-cream/35 transition-colors hover:text-cream">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
