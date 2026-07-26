import { PILLARS } from "@/lib/content";

/** "The Willa Difference" — 4-column auto-fit grid of pillars. */
export function WillaDifference() {
  return (
    <section
      aria-label="The Willa Difference"
      className="border-b border-ink/10 px-6 py-[72px] sm:px-12"
    >
      <div className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-12">
        {PILLARS.map((pillar) => (
          <div key={pillar.numeral} className="flex flex-col gap-3">
            <span className="font-serif text-[30px] italic text-accent">
              {pillar.numeral}
            </span>
            <h3 className="m-0 font-serif text-[22px] font-semibold">
              {pillar.title}
            </h3>
            <p className="m-0 text-sm leading-[1.65] text-muted text-pretty">
              {pillar.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
