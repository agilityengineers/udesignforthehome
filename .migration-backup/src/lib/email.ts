import "server-only";
import type { LeadRecord } from "@/lib/leads";

/**
 * Booking-form notification hook.
 *
 * TODO (client owes a decision — see README "Remaining TODOs"): the client has
 * not yet chosen an email/CRM provider. Wire this up to Resend (recommended),
 * Formspree, or HubSpot so Willa gets an email the moment a lead comes in.
 *
 * Recommended: Resend. Add RESEND_API_KEY + NOTIFY_EMAIL env vars, then:
 *
 *   import { Resend } from "resend";
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: "U Design For The Home <leads@udesignforthehome.com>",
 *     to: process.env.NOTIFY_EMAIL!,
 *     subject: `New consultation request — ${lead.name}`,
 *     text: formatLead(lead),
 *   });
 *
 * Until then this is a safe no-op: leads are still persisted to the database and
 * always visible in the admin dashboard, so nothing is lost.
 */
export async function notifyNewLead(lead: LeadRecord): Promise<void> {
  if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_EMAIL) {
    // No provider configured yet — leads are captured in the DB / admin regardless.
    if (process.env.NODE_ENV !== "production") {
      console.info(
        `[leads] New lead from ${lead.name} <${lead.email}> — email notifications not configured (see src/lib/email.ts).`,
      );
    }
    return;
  }

  // Provider wiring goes here once the client picks one. Intentionally left as
  // a TODO so we don't ship a half-configured integration.
}
