import Link from "next/link";
import { CoverImage } from "@/components/cover-image";
import { HeroVideo } from "@/components/hero-video";
import { videoEmbedFromUrl } from "@/lib/video";
import type { HeroStyle } from "@/lib/settings";

const EYEBROW =
  "Fredericksburg  •  Northern Virginia  •  Design-Led Window Treatments";

/**
 * Hero. Two admin-selectable layouts (Admin → Site Content → Hero Style):
 *  - "image": full-viewport charcoal hero with a background image (default).
 *  - "video": compact two-column layout — copy on the left, a 16:9 YouTube/Vimeo
 *    embed on the right, over the dimmed hero photo.
 *
 * If "video" is selected but no valid video URL is set, we fall back to the
 * image hero so the page never breaks.
 *
 * TODO (client owes footage — see README): for the image hero, production may
 * swap the static background for real <video autoPlay muted loop playsInline
 * poster> footage; autoplay must be disabled under prefers-reduced-motion.
 */
export function Hero({
  headline,
  subhead,
  heroStyle = "image",
  heroVideoUrl = "",
}: {
  headline: string;
  subhead: string;
  heroStyle?: HeroStyle;
  heroVideoUrl?: string;
}) {
  const embed = heroStyle === "video" ? videoEmbedFromUrl(heroVideoUrl) : null;

  if (embed) {
    return <VideoHero headline={headline} subhead={subhead} embed={embed} />;
  }
  return <ImageHero headline={headline} subhead={subhead} />;
}

function HeroButtons({ align = "center" }: { align?: "center" | "start" }) {
  return (
    <div
      className={`pointer-events-auto mt-2 flex flex-wrap gap-4 ${
        align === "center" ? "justify-center" : "justify-start"
      }`}
    >
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
  );
}

/** Default full-viewport image hero. */
function ImageHero({ headline, subhead }: { headline: string; subhead: string }) {
  return (
    <section aria-label="Hero" className="relative h-screen min-h-[640px] bg-ink">
      <CoverImage
        src="/images/norman/hero.jpg"
        alt="Norman PerfectSheer sheer shades filtering golden-hour light in a living room"
        wrapperClassName="absolute inset-0"
        sizes="100vw"
        priority
      />
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
          <p className="m-0 text-xs uppercase tracking-widest text-cream/85">{EYEBROW}</p>
          <h1 className="m-0 font-serif text-[clamp(38px,5.4vw,72px)] font-medium leading-[1.08] text-cream text-balance">
            {headline}
          </h1>
          <p className="m-0 max-w-[560px] text-[17px] leading-[1.6] text-cream/85 text-pretty">
            {subhead}
          </p>
          <HeroButtons align="center" />
        </div>
      </div>
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

/** Compact two-column hero: copy left, 16:9 video right, over the dimmed photo. */
function VideoHero({
  headline,
  subhead,
  embed,
}: {
  headline: string;
  subhead: string;
  embed: NonNullable<ReturnType<typeof videoEmbedFromUrl>>;
}) {
  return (
    <section aria-label="Hero" className="relative bg-ink">
      <CoverImage
        src="/images/norman/hero.jpg"
        alt=""
        wrapperClassName="absolute inset-0"
        sizes="100vw"
        priority
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(rgba(26,23,18,0.74) 0%, rgba(26,23,18,0.80) 100%)",
        }}
      />
      <div className="relative mx-auto max-w-content px-6 pb-20 pt-40 sm:px-12 lg:pb-28 lg:pt-44">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <p className="m-0 text-xs uppercase tracking-widest text-cream/85">{EYEBROW}</p>
            <h1 className="m-0 font-serif text-[clamp(32px,3.8vw,52px)] font-medium leading-[1.1] text-cream text-balance">
              {headline}
            </h1>
            <p className="m-0 max-w-[520px] text-[17px] leading-[1.6] text-cream/85 text-pretty">
              {subhead}
            </p>
            <HeroButtons align="start" />
          </div>
          <div className="w-full">
            <HeroVideo embed={embed} title={`${headline} — video`} />
          </div>
        </div>
      </div>
    </section>
  );
}
