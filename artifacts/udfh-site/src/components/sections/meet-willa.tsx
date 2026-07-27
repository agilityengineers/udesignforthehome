import { CoverImage } from "@/components/cover-image";

export function MeetWilla() {
  return (
    <section aria-label="Meet Willa" className="border-t border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] px-6 py-[104px] sm:px-12">
      <div className="mx-auto grid max-w-content-narrow grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-[72px]">
        <CoverImage
          src="/images/norman/willa-portrait.jpg"
          alt="Portrait of Willa Parsons in natural light in a client's home"
          wrapperClassName="h-[520px] w-full max-w-[420px] justify-self-center"
        />
        <div className="flex max-w-[520px] flex-col gap-5">
          <p className="eyebrow">Meet Willa</p>
          <h2 className="m-0 font-serif text-[clamp(30px,3.6vw,42px)] font-medium leading-[1.2]">
            &ldquo;I kept watching good rooms get let down at the window.&rdquo;
          </h2>
          <p className="m-0 text-base leading-[1.75] text-[var(--color-muted)]">
            Willa Parsons spent years as an interior designer before she narrowed her focus to
            windows. She saw the same story over and over: clients who cared about their homes,
            handed off to franchises and big-box counters that sold from a catalog and measured in a
            hurry.
          </p>
          <p className="m-0 text-base leading-[1.75] text-[var(--color-muted)]">
            So she built the company she wished her clients had. A designer at your door. Samples in
            your light. Measurements she stands behind. Your home is the point; she&rsquo;s just
            here to get the light right.
          </p>
          <p className="m-0 font-serif text-[22px] italic text-[var(--color-ink)]">
            &mdash; Willa Parsons, Founder
          </p>
        </div>
      </div>
    </section>
  );
}
