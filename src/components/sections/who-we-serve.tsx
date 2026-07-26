import { NICHES } from "@/lib/content";

/** "Who We Serve" — charcoal section, 4 cards in a 1px-hairline-gap grid. */
export function WhoWeServe() {
  return (
    <section
      aria-label="Who We Serve"
      className="bg-ink px-6 py-[104px] text-cream sm:px-12"
    >
      <div className="mx-auto flex max-w-content flex-col gap-16">
        <div className="max-w-[640px]">
          <p className="eyebrow mb-3.5">Who We Serve</p>
          <h2 className="m-0 font-serif text-[clamp(32px,4vw,48px)] font-medium leading-[1.15] text-cream text-balance">
            We know this region, house by house.
          </h2>
        </div>
        {/* 1px gap tinted with the dark hairline color shows through as borders */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-px bg-cream/15">
          {NICHES.map((niche) => (
            <div
              key={niche.title}
              className="flex flex-col gap-3.5 bg-ink px-9 py-10"
            >
              <h3 className="m-0 font-serif text-2xl font-semibold text-cream">
                {niche.title}
              </h3>
              <p className="m-0 text-sm leading-[1.7] text-cream/70 text-pretty">
                {niche.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
