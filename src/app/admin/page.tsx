import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import { getLeadStats, listLeads } from "@/lib/leads";
import { getRawSettings } from "@/lib/settings";
import { isAdminAuthenticated } from "@/lib/session";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  // Middleware already gates this route; re-check as defense in depth.
  if (!(await isAdminAuthenticated())) redirect("/admin/login");

  const [leads, stats, settings] = await Promise.all([
    listLeads("All"),
    getLeadStats(),
    getRawSettings(),
  ]);

  return (
    <AdminDashboard
      initialLeads={leads}
      initialStats={stats}
      initialSettings={settings}
    />
  );
}
