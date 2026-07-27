import { BookingForm } from "@/components/booking-form";
import type { ResolvedSettings } from "@/lib/settings";

/** Final CTA (#consultation) — charcoal section with contact info + booking form. */
export function FinalCta({ settings }: { settings: ResolvedSettings }) {
  return (
    <section
      id="consultation"
      aria-label="Book a consultation"
      className="bg-ink px-6 py-28 text-cream sm:px-12"
    >
      <div className="mx-auto grid max-w-content-narrow grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-[72px]">
        <div className="flex flex-col gap-6">
          <h2 className="m-0 font-serif text-[clamp(34px,4vw,52px)] font-medium leading-[1.15] text-cream text-balance">
            Your home deserves more than off-the-shelf.
          </h2>
          <p className="m-0 max-w-[440px] text-base leading-[1.7] text-cream/75 text-pretty">
            Tell us a little about your project. Willa or a member of her team
            will call within one business day to set up your in-home visit.
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <a
              href={settings.phoneHref}
              className="font-serif text-2xl text-cream transition-colors hover:text-accent"
            >
              {settings.phone}
            </a>
            <a
              href={settings.mailtoHref}
              className="text-sm tracking-[0.06em] text-cream/75 transition-colors hover:text-accent"
            >
              {settings.email}
            </a>
          </div>
        </div>
        <BookingForm />
      </div>
    </section>
  );
}
