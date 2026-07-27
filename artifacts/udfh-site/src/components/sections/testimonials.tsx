import type { Testimonial } from "@/lib/content";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section aria-label="Testimonials" className="bg-[var(--color-sand)] px-6 py-16 sm:px-12 sm:py-24 lg:py-[104px]">
      <div className="mx-auto flex max-w-content flex-col gap-10 sm:gap-14">
        <p className="eyebrow text-center">In Their Words</p>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <figure key={i} className="m-0 flex flex-col gap-[18px] bg-[var(--color-cream)] px-7 py-8 sm:px-9 sm:py-10">
              <blockquote className="m-0 font-serif text-[21px] italic leading-[1.5]">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="text-[13px] uppercase tracking-[0.1em] text-[var(--color-muted)]">
                {t.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
