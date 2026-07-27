import { CoverImage } from "@/components/cover-image";
import { HeroVideo } from "@/components/hero-video";
import { videoEmbedFromUrl } from "@/lib/video";
import type { HeroStyle } from "@/lib/settings";

const EYEBROW = "Fredericksburg  •  Northern Virginia  •  Design-Led Window Treatments";

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
      <a
        href="#consultation"
        className="bg-[var(--color-accent)] px-8 py-[15px] text-[13px] font-semibold uppercase tracking-wide text-[var(--color-cream)] transition-colors hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]"
      >
        Book Your In-Home Consultation
      </a>
      <a
        href="#work"
        className="border border-[color-mix(in_srgb,var(--color-cream)_60%,transparent)] px-8 py-[15px] text-[13px] uppercase tracking-wide text-[var(--color-cream)] transition-colors hover:bg-[color-mix(in_srgb,var(--color-cream)_10%,transparent)]"
      >
        See Our Product
      </a>
    </div>
  );
}

function ImageHero({ headline, subhead }: { headline: string; subhead: string }) {
  return (
    <section aria-label="Hero" className="relative h-screen min-h-[640px] bg-[var(--color-ink)]">
      <CoverImage
        src="/images/norman/hero.jpg"
        alt="Norman PerfectSheer sheer shades filtering golden-hour light in a living room"
        wrapperClassName="absolute inset-0"
        priority
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(26,23,18,0.82) 0%, rgba(26,23,18,0.35) 45%, rgba(26,23,18,0.25) 100%)",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center px-6 pb-24 sm:px-12">
        <div className="flex max-w-[880px] flex-col items-center gap-6 text-center">
          <p className="m-0 text-xs uppercase tracking-[0.3em] text-[color-mix(in_srgb,var(--color-cream)_85%,transparent)]">
            {EYEBROW}
          </p>
          <h1 className="m-0 font-serif text-[clamp(38px,5.4vw,72px)] font-medium leading-[1.08] text-[var(--color-cream)]">
            {headline}
          </h1>
          <p className="m-0 max-w-[560px] text-[17px] leading-[1.6] text-[color-mix(in_srgb,var(--color-cream)_85%,transparent)]">
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
          className="motion-safe:animate-[scrollCue_2.4s_ease-in-out_infinite]"
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
    <section aria-label="Hero" className="relative bg-[var(--color-ink)]">
      <CoverImage
        src="/images/norman/hero.jpg"
        alt=""
        wrapperClassName="absolute inset-0"
        priority
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "linear-gradient(rgba(26,23,18,0.74) 0%, rgba(26,23,18,0.80) 100%)" }}
      />
      <div className="relative mx-auto max-w-content px-6 pb-20 pt-40 sm:px-12 lg:pb-28 lg:pt-44">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6">
            <p className="m-0 text-xs uppercase tracking-[0.3em] text-[color-mix(in_srgb,var(--color-cream)_85%,transparent)]">
              {EYEBROW}
            </p>
            <h1 className="m-0 font-serif text-[clamp(32px,3.8vw,52px)] font-medium leading-[1.1] text-[var(--color-cream)]">
              {headline}
            </h1>
            <p className="m-0 max-w-[520px] text-[17px] leading-[1.6] text-[color-mix(in_srgb,var(--color-cream)_85%,transparent)]">
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
