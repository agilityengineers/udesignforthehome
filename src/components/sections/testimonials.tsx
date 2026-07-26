import type { Testimonial } from "@/lib/content";

/**
 * "In Their Words" — warm-sand section, 3 CMS-driven quote cards.
 *
 * TODO (client owes copy — see README): replace the default placeholder quotes
 * and neighborhoods with real client testimonials (editable in Admin → Site
 * Content).
 */
export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section
      aria-label="Testimonials"
      className="bg-sand px-6 py-[104px] sm:px-12"
    >
      <div className="mx-auto flex max-w-content flex-col gap-14">
        <p className="eyebrow text-center">In Their Words</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10">
          {testimonials.map((t, i) => (
            <figure
              key={i}
              className="m-0 flex flex-col gap-[18px] bg-cream px-9 py-10"
            >
              <blockquote className="m-0 font-serif text-[21px] italic leading-[1.5] text-pretty">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="text-[13px] uppercase tracking-[0.1em] text-muted">
                {t.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
