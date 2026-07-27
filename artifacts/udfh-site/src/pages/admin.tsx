import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { AdminDashboard } from "@/components/admin/admin-dashboard";
import type { LeadRecord } from "@/components/admin/lead-card";
import type { LeadStats } from "@/components/admin/leads-tab";
import type { RawSettings } from "@/components/admin/content-tab";

type LoadState = "loading" | "ready" | "unauth";

export default function AdminPage() {
  const [, setLocation] = useLocation();
  const [state, setState] = useState<LoadState>("loading");
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [stats, setStats] = useState<LeadStats>({ total: 0, newCount: 0, thisWeek: 0, topProject: "—" });
  const [settings, setSettings] = useState<RawSettings>({
    phone: "",
    email: "",
    heroHeadline: "",
    heroSubhead: "",
    heroStyle: "image",
    heroVideoUrl: "",
    testimonials: [],
  });

  useEffect(() => {
    async function load() {
      try {
        const [leadsRes, settingsRes] = await Promise.all([
          fetch("/api/admin/leads"),
          fetch("/api/admin/settings"),
        ]);

        if (leadsRes.status === 401) {
          setLocation("/admin/login");
          return;
        }

        const leadsData = (await leadsRes.json()) as { leads: LeadRecord[]; stats: LeadStats };
        const settingsData = (await settingsRes.json()) as RawSettings;

        setLeads(leadsData.leads);
        setStats(leadsData.stats);
        setSettings(settingsData);
        setState("ready");
      } catch {
        setLocation("/admin/login");
      }
    }
    void load();
  }, [setLocation]);

  if (state === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[var(--color-sand)]">
        <p className="font-serif text-xl italic text-[var(--color-muted)]">Loading…</p>
      </div>
    );
  }

  return (
    <AdminDashboard
      initialLeads={leads}
      initialStats={stats}
      initialSettings={settings}
    />
  );
}
