import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/legal-page";
import { getResolvedSettings } from "@/lib/settings";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy",
  description:
    "How U Design For The Home collects, uses, shares, and protects your personal information, and the choices you have.",
  path: "/privacy",
});

// Reads CMS contact settings, so render at request time.
export const dynamic = "force-dynamic";

export default async function PrivacyPage() {
  const settings = await getResolvedSettings();
  return (
    <LegalPage title="Privacy Policy" effectiveDate="July 26, 2026">
      <LegalSection heading="1. What We Collect">
        When you request a consultation or contact us, we collect the information
        you provide: name, email address, phone number, ZIP code, project
        details, and anything you include in your message. During in-home visits
        we may record window measurements, photos of the work area, and design
        preferences to fulfill your order.
      </LegalSection>
      <LegalSection heading="2. How We Use It">
        We use your information to schedule consultations, prepare quotes, place
        and fulfill orders, coordinate installation, honor warranties and our
        Product Guarantee, and respond to your questions. With your consent, we
        may send occasional updates about our services. We do not sell your
        personal information.
      </LegalSection>
      <LegalSection heading="3. Who We Share It With">
        We share information only as needed to serve you: with manufacturers and
        fabricators to produce your order, with our installers to complete your
        project, and with service providers who help us run the business
        (scheduling, payments, email). Each is limited to using your information
        for that purpose. We may also disclose information when required by law.
      </LegalSection>
      <LegalSection heading="4. Cookies & Analytics">
        Our website may use cookies and basic analytics to understand how visitors
        use the site and improve it. You can disable cookies in your browser
        settings; the site will still work.
      </LegalSection>
      <LegalSection heading="5. How Long We Keep It">
        We keep project records, including measurements and order details, for as
        long as needed to honor warranties and our Product Guarantee. Inquiry
        information that does not become a project is deleted within a reasonable
        period.
      </LegalSection>
      <LegalSection heading="6. Your Choices">
        You may ask us to access, correct, or delete the personal information we
        hold about you, or to stop marketing communications, at any time. Email{" "}
        <a href={settings.mailtoHref}>{settings.email}</a> and we will respond
        promptly. Virginia residents may have additional rights under the Virginia
        Consumer Data Protection Act.
      </LegalSection>
      <LegalSection heading="7. Security & Children">
        We take reasonable measures to protect your information, though no method
        of transmission or storage is completely secure. Our services are intended
        for adults; we do not knowingly collect information from children under
        13.
      </LegalSection>
      <LegalSection heading="8. Changes & Contact">
        We may update this policy from time to time; the effective date above
        reflects the latest revision. Questions? Reach us at{" "}
        <a href={settings.mailtoHref}>{settings.email}</a> or{" "}
        <a href={settings.phoneHref}>{settings.phone}</a>.
      </LegalSection>
    </LegalPage>
  );
}
