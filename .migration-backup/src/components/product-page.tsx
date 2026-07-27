import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { CoverImage } from "@/components/cover-image";
import { BUSINESS } from "@/lib/content";
import type { ProductPage as ProductPageData } from "@/lib/products";

/**
 * Shared product detail layout: intro split, product grid, single
 * conversion-focused charcoal CTA, Norman-credit footer. Deliberately no deeper
 * navigation — the only CTA is booking.
 */
export function ProductPage({ data }: { data: ProductPageData }) {
  return (
    <>
      <PageHeader />
      <main>
        {/* Intro split */}
        <section aria-label="Introduction" className="px-6 pb-[72px] pt-24 sm:px-12">
          <div className="mx-auto grid max-w-content-narrow grid-cols-[repeat(auto-fit,minmax(320px,1fr))] items-center gap-16">
            <div className="flex flex-col gap-5">
              <p className="eyebrow">{data.eyebrow}</p>
              <h1 className="m-0 font-serif text-[clamp(36px,4.5vw,56px)] font-medium leading-[1.1] text-balance">
                {data.h1}
              </h1>
              <p className="m-0 text-base leading-[1.75] text-muted text-pretty">
                {data.intro}
              </p>
            </div>
            <CoverImage
              src={data.heroImage}
              alt={data.heroAlt}
              wrapperClassName="h-[420px] w-full"
              sizes="(max-width: 768px) 100vw, 550px"
              priority
            />
          </div>
        </section>

        {/* Product grid */}
        <section aria-label="Collection" className="px-6 pb-24 pt-8 sm:px-12">
          <div className="mx-auto grid max-w-content-narrow grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-10 gap-y-12">
            {data.items.map((item) => (
              <div key={item.name} className="flex flex-col gap-3.5">
                <CoverImage
                  src={item.image}
                  alt={item.alt}
                  wrapperClassName="h-[280px] w-full"
                  sizes="(max-width: 768px) 100vw, 340px"
                />
                <h3 className="m-0 font-serif text-2xl font-semibold">
                  {item.name}
                </h3>
                <p className="m-0 text-sm leading-[1.7] text-muted text-pretty">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Single charcoal CTA */}
        <section
          aria-label="Book a consultation"
          className="bg-ink px-6 py-24 text-center text-cream sm:px-12"
        >
          <div className="mx-auto flex max-w-[680px] flex-col items-center gap-6">
            <h2 className="m-0 font-serif text-[clamp(30px,4vw,46px)] font-medium leading-[1.15] text-cream text-balance">
              {data.ctaH2}
            </h2>
            <p className="m-0 text-base leading-[1.7] text-cream/75 text-pretty">
              {data.ctaBody}
            </p>
            <Link
              href="/#consultation"
              className="bg-accent px-9 py-4 text-[13px] font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-cream hover:text-ink"
            >
              Book Your In-Home Consultation
            </Link>
          </div>
        </section>
      </main>

      <footer className="bg-footer-ink px-6 py-10 text-cream/65 sm:px-12">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-6">
          <p className="m-0 text-xs tracking-[0.08em]">{BUSINESS.legalBlurb}</p>
          <p className="m-0 text-[11px] text-cream/40">
            Product imagery courtesy of Norman&reg; USA
          </p>
        </div>
      </footer>
    </>
  );
}
