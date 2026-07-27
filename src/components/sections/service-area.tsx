import { SERVICE_AREA } from "@/lib/content";

/** "Service Area" — centered, serif interpunct-separated locality list. */
export function ServiceArea() {
  return (
    <section
      aria-label="Service Area"
      className="border-b border-ink/10 px-6 py-[104px] sm:px-12"
    >
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-7 text-center">
        <p className="eyebrow">Service Area</p>
        <h2 className="m-0 font-serif text-[clamp(30px,3.6vw,44px)] font-medium leading-[1.2] text-balance">
          Based in Fredericksburg. At home within 100 miles.
        </h2>
        <p className="m-0 max-w-[680px] font-serif text-[22px] leading-[1.7] text-muted text-pretty">
          {SERVICE_AREA.map((place, i) => (
            <span key={place}>
              {place}
              {i < SERVICE_AREA.length - 1 && (
                <span>&nbsp;&nbsp;·&nbsp;&nbsp;</span>
              )}
            </span>
          ))}
        </p>
        <p className="m-0 text-sm text-muted">
          Not sure if you&rsquo;re in range? Ask. We&rsquo;ve been known to drive
          a little farther for a good window.
        </p>
      </div>
    </section>
  );
}
