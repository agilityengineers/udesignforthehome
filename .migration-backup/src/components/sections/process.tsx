import { PROCESS } from "@/lib/content";

/** "Our Process" — 4 columns, each with an accent top border and step label. */
export function Process() {
  return (
    <section aria-label="Our Process" className="px-6 py-[104px] sm:px-12">
      <div className="mx-auto flex max-w-content flex-col gap-16">
        <div className="max-w-[640px]">
          <p className="eyebrow mb-3.5">Our Process</p>
          <h2 className="m-0 font-serif text-[clamp(32px,4vw,48px)] font-medium leading-[1.15] text-balance">
            Considered from the first call to the last bracket.
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-12">
          {PROCESS.map((item) => (
            <div
              key={item.step}
              className="flex flex-col gap-3.5 border-t border-accent pt-6"
            >
              <span className="font-serif text-base italic text-accent">
                {item.step}
              </span>
              <h3 className="m-0 font-serif text-[26px] font-semibold">
                {item.title}
              </h3>
              <p className="m-0 text-sm leading-[1.7] text-muted text-pretty">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
