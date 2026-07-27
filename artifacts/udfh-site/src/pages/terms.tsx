import { useSettings } from "@/hooks/useSettings";
import { LegalPage, LegalSection } from "@/components/legal-page";

export default function TermsPage() {
  const { settings } = useSettings();

  return (
    <LegalPage title="Terms of Service" effectiveDate="July 26, 2026">
      <LegalSection heading="1. Services">
        U Design For The Home (&ldquo;we,&rdquo; &ldquo;our,&rdquo; &ldquo;the Company&rdquo;)
        provides in-home design consultations, measurement, custom fabrication, and installation of
        window treatments in the Fredericksburg, VA region and surrounding areas. These Terms
        govern your use of our website and services.
      </LegalSection>
      <LegalSection heading="2. Consultations &amp; Quotes">
        In-home consultations are provided at no charge. Quotes are valid for 30 days. Prices are
        subject to change until you place an order and pay a deposit. We reserve the right to
        decline any project.
      </LegalSection>
      <LegalSection heading="3. Orders &amp; Payment">
        All custom orders require a 50% deposit before fabrication begins. The balance is due at
        installation. Custom window treatments are made to order and are non-refundable except as
        provided under our Product Guarantee. We accept major credit cards, check, and bank
        transfer.
      </LegalSection>
      <LegalSection heading="4. Product Guarantee">
        If a treatment we supply and install fails due to a defect in materials, fabrication, or
        our installation, we will repair or replace it at no cost to you. This guarantee does not
        cover damage from misuse, accident, pets, unauthorized modifications, or normal wear and
        tear.
      </LegalSection>
      <LegalSection heading="5. Fabrication &amp; Lead Times">
        Most custom orders ship from our US fabrication partners in 10–15 business days. We will
        give you a specific timeline at order confirmation. We are not responsible for delays caused
        by supply shortages, shipping carriers, or events outside our control.
      </LegalSection>
      <LegalSection heading="6. Cancellations &amp; Changes">
        Orders may be cancelled or changed within 24 hours of placement for a full refund of your
        deposit. After fabrication has begun, deposits are non-refundable, and changes may incur
        additional charges.
      </LegalSection>
      <LegalSection heading="7. Limitation of Liability">
        Our liability is limited to the value of the products and services you purchased. We are
        not liable for indirect, incidental, or consequential damages.
      </LegalSection>
      <LegalSection heading="8. Governing Law">
        These Terms are governed by the laws of the Commonwealth of Virginia. Disputes shall be
        resolved in the courts of Spotsylvania County or the Federal District Court for the Eastern
        District of Virginia.
      </LegalSection>
      <LegalSection heading="9. Contact">
        Questions about these Terms? Contact us at{" "}
        <a href={settings.mailtoHref}>{settings.email}</a> or{" "}
        <a href={settings.phoneHref}>{settings.phone}</a>.
      </LegalSection>
    </LegalPage>
  );
}
