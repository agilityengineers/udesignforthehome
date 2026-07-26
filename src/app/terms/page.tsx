import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { getResolvedSettings } from "@/lib/settings";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service",
  description:
    "The terms governing use of the U Design For The Home website and our window treatment design, measurement, and installation services.",
  path: "/terms",
});

// Reads CMS contact settings, so render at request time.
export const dynamic = "force-dynamic";

export default async function TermsPage() {
  const settings = await getResolvedSettings();
  return (
    <LegalPage title="Terms of Service" effectiveDate="July 26, 2026">
      <LegalSection heading="1. Who We Are">
        U Design For The Home (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) is a
        window treatment consultancy based in Fredericksburg, Virginia, serving
        clients within approximately 100 miles, including Northern Virginia, the
        Richmond metro, and the DC region. We are a registered dealer of window
        treatment products and provide design consultation, measurement, and
        installation services. These Terms govern your use of our website and
        services.
      </LegalSection>
      <LegalSection heading="2. Services">
        We provide in-home design consultations, custom window treatment sales,
        professional measurement, and installation. All products are
        custom-fabricated to order. Estimated timelines, including our
        15-business-day installation target, are good-faith estimates and may
        vary due to fabrication schedules, product availability, or circumstances
        outside our control.
      </LegalSection>
      <LegalSection heading="3. Orders, Deposits & Cancellations">
        Because every order is custom-made, orders cannot be cancelled or refunded
        once fabrication begins. A deposit may be required to place an order; the
        balance is due upon installation unless otherwise agreed in writing.
        Quotes are valid for 30 days from the date issued.
      </LegalSection>
      <LegalSection heading="4. Product Guarantee">
        When we take the measurements and perform the installation, our Product
        Guarantee applies: if a treatment we measured and installed does not fit
        or function as specified, we will correct it at no cost to you. The
        guarantee does not cover customer-supplied measurements, damage after
        installation, misuse, or normal wear. Manufacturer warranties on products
        are provided by the respective manufacturer and pass through to you.
      </LegalSection>
      <LegalSection heading="5. In-Home Visits">
        You agree to provide safe and reasonable access to your home for scheduled
        consultations, measurements, and installations. Please secure pets and
        clear window areas before installation visits. If we cannot access the
        work area at a scheduled time, a rescheduling fee may apply.
      </LegalSection>
      <LegalSection heading="6. Website Use">
        The content on this site, including text, images, and branding, belongs to
        us or our licensors and may not be reproduced without permission. Product
        names and imagery from manufacturers we represent, including Norman&reg;,
        remain the property of their respective owners. You agree not to misuse
        the site or attempt to interfere with its operation.
      </LegalSection>
      <LegalSection heading="7. Limitation of Liability">
        To the fullest extent permitted by Virginia law, our total liability for
        any claim arising from our services is limited to the amount you paid for
        the affected product or service. We are not liable for indirect,
        incidental, or consequential damages. Nothing in these Terms limits rights
        you have under applicable consumer protection law.
      </LegalSection>
      <LegalSection heading="8. Governing Law">
        These Terms are governed by the laws of the Commonwealth of Virginia. Any
        dispute will be resolved in the state or federal courts serving
        Fredericksburg, Virginia.
      </LegalSection>
      <LegalSection heading="9. Changes & Contact">
        We may update these Terms from time to time; the effective date above
        reflects the latest revision. Questions? Reach us at{" "}
        <a href={settings.mailtoHref}>{settings.email}</a> or{" "}
        <a href={settings.phoneHref}>{settings.phone}</a>.
      </LegalSection>
    </LegalPage>
  );
}
