import { Fragment } from "react";
import { SERVICE_AREA } from "@/lib/content";

export function ServiceArea() {
  return (
    <section aria-label="Service Area" className="border-b border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] px-6 py-16 sm:px-12 sm:py-24 lg:py-[104px]">
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center sm:gap-7">
        <p className="eyebrow">Service Area</p>
        <h2 className="m-0 font-serif text-[clamp(28px,3.6vw,44px)] font-medium leading-[1.2]">
          Based in Fredericksburg. At home within 100 miles.
        </h2>
        <p className="m-0 flex max-w-[680px] flex-wrap items-center justify-center gap-x-2.5 gap-y-1.5 font-serif text-[18px] leading-[1.5] text-[var(--color-muted)] sm:gap-x-3.5 sm:text-[22px]">
          {SERVICE_AREA.map((place, i) => (
            <Fragment key={place}>
              {i > 0 && (
                <span aria-hidden className="text-[var(--color-muted-gray)]">·</span>
              )}
              <span>{place}</span>
            </Fragment>
          ))}
        </p>
        <p className="m-0 text-sm text-[var(--color-muted)]">
          Not sure if you&rsquo;re in range? Ask. We&rsquo;ve been known to drive a little farther
          for a good window.
        </p>
      </div>
    </section>
  );
}
