import type { Testimonial } from "@/lib/content";

export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section aria-label="Testimonials" className="bg-[var(--color-sand)] px-6 py-[104px] sm:px-12">
      <div className="mx-auto flex max-w-content flex-col gap-14">
        <p className="eyebrow text-center">In Their Words</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10">
          {testimonials.map((t, i) => (
            <figure key={i} className="m-0 flex flex-col gap-[18px] bg-[var(--color-cream)] px-9 py-10">
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
