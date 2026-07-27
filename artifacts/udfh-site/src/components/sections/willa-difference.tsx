import { PILLARS } from "@/lib/content";

export function WillaDifference() {
  return (
    <section
      aria-label="The Willa Difference"
      className="border-b border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] px-6 py-14 sm:px-12 sm:py-[72px]"
    >
      <div className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-8 sm:gap-12">
        {PILLARS.map((pillar) => (
          <div key={pillar.numeral} className="flex flex-col gap-3">
            <span className="font-serif text-[30px] italic text-[var(--color-accent)]">
              {pillar.numeral}
            </span>
            <h3 className="m-0 font-serif text-[22px] font-semibold">{pillar.title}</h3>
            <p className="m-0 text-sm leading-[1.65] text-[var(--color-muted)]">{pillar.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
