import Link from "next/link";
import { CoverImage } from "@/components/cover-image";

/**
 * Hero — full-viewport, charcoal base, bottom-weighted gradient, CMS-driven
 * headline + subhead.
 *
 * TODO (client owes footage — see README): production should swap the static
 * background image for real video via
 *   <video autoPlay muted loop playsInline poster="…">
 * (custom drapery, motorized shades opening, in-home consult). Autoplay must be
 * disabled under prefers-reduced-motion. Until footage is delivered we show the
 * Norman® PerfectSheer™ still.
 */
export function Hero({
  headline,
  subhead,
}: {
  headline: string;
  subhead: string;
}) {
  return (
    <section
      aria-label="Hero"
      className="relative h-screen min-h-[640px] bg-ink"
    >
      <CoverImage
        src="/images/norman/hero.jpg"
        alt="Norman PerfectSheer sheer shades filtering golden-hour light in a living room"
        wrapperClassName="absolute inset-0"
        sizes="100vw"
        priority
      />
      {/* Bottom-weighted gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(26,23,18,0.82) 0%, rgba(26,23,18,0.35) 45%, rgba(26,23,18,0.25) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-6 pb-24 sm:px-12">
        <div className="flex max-w-[880px] flex-col items-center gap-6 text-center">
          <p className="m-0 text-xs uppercase tracking-widest text-cream/85">
            Fredericksburg &nbsp;•&nbsp; Northern Virginia &nbsp;•&nbsp;
            Design-Led Window Treatments
          </p>
          <h1 className="m-0 font-serif text-[clamp(38px,5.4vw,72px)] font-medium leading-[1.08] text-cream text-balance">
            {headline}
          </h1>
          <p className="m-0 max-w-[560px] text-[17px] leading-[1.6] text-cream/85 text-pretty">
            {subhead}
          </p>
          <div className="pointer-events-auto mt-2 flex flex-wrap justify-center gap-4">
            <Link
              href="#consultation"
              className="bg-accent px-8 py-[15px] text-[13px] font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Book Your In-Home Consultation
            </Link>
            <Link
              href="#work"
              className="border border-cream/60 px-8 py-[15px] text-[13px] uppercase tracking-wide text-cream transition-colors hover:bg-cream/10"
            >
              See Our Product
            </Link>
          </div>
        </div>
      </div>
      {/* Animated scroll cue — disabled under prefers-reduced-motion via globals.css */}
      <div className="pointer-events-none absolute bottom-7 left-1/2 -translate-x-1/2">
        <svg
          width="18"
          height="28"
          viewBox="0 0 18 28"
          className="motion-safe:animate-scrollCue"
          aria-hidden
        >
          <path
            d="M9 4 v18 M4 17 l5 6 5-6"
            fill="none"
            stroke="rgba(250,247,241,0.8)"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
