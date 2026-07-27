import { NextResponse } from "next/server";
import { getLeadStats, listLeads } from "@/lib/leads";
import { isAdminAuthenticated } from "@/lib/session";

/** GET — all leads (newest first) + aggregate stats, for the CRM. */
export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const [leads, stats] = await Promise.all([listLeads("All"), getLeadStats()]);
  return NextResponse.json({ leads, stats });
}
