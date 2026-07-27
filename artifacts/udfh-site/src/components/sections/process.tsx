import { PROCESS } from "@/lib/content";

export function Process() {
  return (
    <section aria-label="Our Process" className="px-6 py-16 sm:px-12 sm:py-24 lg:py-[104px]">
      <div className="mx-auto flex max-w-content flex-col gap-10 sm:gap-16">
        <div className="max-w-[640px]">
          <p className="eyebrow mb-3.5">Our Process</p>
          <h2 className="m-0 font-serif text-[clamp(32px,4vw,48px)] font-medium leading-[1.15]">
            Considered from the first call to the last bracket.
          </h2>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-8 sm:gap-12">
          {PROCESS.map((item) => (
            <div key={item.step} className="flex flex-col gap-3.5 border-t border-[var(--color-accent)] pt-6">
              <span className="font-serif text-base italic text-[var(--color-accent)]">{item.step}</span>
              <h3 className="m-0 font-serif text-[26px] font-semibold">{item.title}</h3>
              <p className="m-0 text-sm leading-[1.7] text-[var(--color-muted)]">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
