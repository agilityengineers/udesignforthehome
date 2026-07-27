import { NICHES } from "@/lib/content";

export function WhoWeServe() {
  return (
    <section aria-label="Who We Serve" className="bg-[var(--color-ink)] px-6 py-[104px] text-[var(--color-cream)] sm:px-12">
      <div className="mx-auto flex max-w-content flex-col gap-16">
        <div className="max-w-[640px]">
          <p className="eyebrow mb-3.5">Who We Serve</p>
          <h2 className="m-0 font-serif text-[clamp(32px,4vw,48px)] font-medium leading-[1.15] text-[var(--color-cream)]">
            We know this region, house by house.
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-px bg-[color-mix(in_srgb,var(--color-cream)_15%,transparent)]">
          {NICHES.map((niche) => (
            <div key={niche.title} className="flex flex-col gap-3.5 bg-[var(--color-ink)] px-9 py-10">
              <h3 className="m-0 font-serif text-2xl font-semibold text-[var(--color-cream)]">
                {niche.title}
              </h3>
              <p className="m-0 text-sm leading-[1.7] text-[color-mix(in_srgb,var(--color-cream)_70%,transparent)]">
                {niche.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
