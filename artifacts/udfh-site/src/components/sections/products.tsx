import { Link } from "wouter";
import { CoverImage } from "@/components/cover-image";
import { PRODUCT_ROWS } from "@/lib/content";

export function Products() {
  return (
    <section id="work" aria-label="Products & Services" className="px-6 py-16 sm:px-12 sm:py-24 lg:py-[104px]">
      <div className="mx-auto flex max-w-content flex-col gap-16 sm:gap-24 lg:gap-[88px]">
        <div className="max-w-[640px]">
          <p className="eyebrow mb-3.5">Products &amp; Services</p>
          <h2 className="m-0 font-serif text-[clamp(32px,4vw,48px)] font-medium leading-[1.15]">
            Four ways we dress a window. One standard of craft.
          </h2>
        </div>

        {PRODUCT_ROWS.map((row, i) => {
          const imageRight = i % 2 === 1;
          const isAnchor = row.href.startsWith("#");
          return (
            <div key={row.eyebrow} className="grid grid-cols-1 items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-14">
              <CoverImage
                src={row.image}
                alt={row.alt}
                wrapperClassName={`h-[280px] sm:h-[360px] lg:h-[420px] ${imageRight ? "lg:order-2" : ""}`}
              />
              <div className="flex max-w-[480px] flex-col gap-4">
                <p className="eyebrow">{row.eyebrow}</p>
                <h3 className="m-0 font-serif text-[32px] font-medium leading-[1.2]">
                  {row.title}
                </h3>
                <p className="m-0 text-base leading-[1.7] text-[var(--color-muted)]">{row.body}</p>
                {isAnchor ? (
                  <a
                    href={row.href}
                    className="w-fit border-b border-[var(--color-accent)] pb-[3px] text-[13px] font-semibold uppercase tracking-wide text-[var(--color-accent)] transition-colors hover:text-[var(--color-ink)]"
                  >
                    {row.linkLabel}
                  </a>
                ) : (
                  <Link
                    href={row.href}
                    className="w-fit border-b border-[var(--color-accent)] pb-[3px] text-[13px] font-semibold uppercase tracking-wide text-[var(--color-accent)] transition-colors hover:text-[var(--color-ink)]"
                  >
                    {row.linkLabel}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
