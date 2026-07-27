"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LeadsTab } from "@/components/admin/leads-tab";
import { ContentTab } from "@/components/admin/content-tab";
import { BUSINESS, type LeadStatus } from "@/lib/content";
import type { LeadRecord, LeadStats } from "@/lib/leads";
import type { RawSettings } from "@/lib/settings";

type Tab = "leads" | "content";
type Filter = "All" | LeadStatus;

/** Admin dashboard shell: charcoal top bar with tabs, plus the active tab. */
export function AdminDashboard({
  initialLeads,
  initialStats,
  initialSettings,
}: {
  initialLeads: LeadRecord[];
  initialStats: LeadStats;
  initialSettings: RawSettings;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("leads");
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [stats, setStats] = useState<LeadStats>(initialStats);
  const [filter, setFilter] = useState<Filter>("All");

  async function refresh() {
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as {
          leads: LeadRecord[];
          stats: LeadStats;
        };
        setLeads(data.leads);
        setStats(data.stats);
      }
    } catch {
      /* keep current view on network error */
    }
  }

  async function patchLead(id: string, patch: { status?: string; notes?: string }) {
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
  }

  async function onStatusChange(id: string, status: LeadStatus) {
    // Optimistic update, then reconcile stats from the server.
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    await patchLead(id, { status });
    await refresh();
  }

  async function onNotesBlur(id: string, notes: string) {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, notes } : l)));
    await patchLead(id, { notes });
  }

  async function onDelete(id: string) {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    setLeads((prev) => prev.filter((l) => l.id !== id));
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    await refresh();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  const onLeads = tab === "leads";

  return (
    <div className="min-h-screen bg-sand">
      <header className="flex flex-wrap items-center justify-between gap-4 bg-ink px-6 py-5 text-cream sm:px-12">
        <div className="flex flex-col gap-0.5">
          <span className="font-serif text-xl font-semibold text-cream">
            {BUSINESS.name}
          </span>
          <span className="text-[10px] uppercase tracking-eyebrow text-cream/60">
            Admin Dashboard
          </span>
        </div>
        <nav className="flex items-center gap-2" aria-label="Admin sections">
          <TabButton active={onLeads} onClick={() => setTab("leads")}>
            Leads
          </TabButton>
          <TabButton active={!onLeads} onClick={() => setTab("content")}>
            Site Content
          </TabButton>
          <Link
            href="/"
            className="px-3.5 py-[9px] text-[11px] uppercase tracking-wide text-cream/70 transition-colors hover:text-cream"
          >
            View Site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="cursor-pointer border-none bg-transparent px-1.5 py-[9px] text-[11px] uppercase tracking-wide text-cream/50 transition-colors hover:text-cream"
          >
            Sign Out
          </button>
        </nav>
      </header>

      <main className="mx-auto flex max-w-content flex-col gap-8 px-8 pb-24 pt-10">
        {onLeads ? (
          <LeadsTab
            leads={leads}
            stats={stats}
            filter={filter}
            onFilterChange={setFilter}
            onRefresh={refresh}
            onStatusChange={onStatusChange}
            onNotesBlur={onNotesBlur}
            onDelete={onDelete}
          />
        ) : (
          <ContentTab initial={initialSettings} onSaved={() => router.refresh()} />
        )}
      </main>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`cursor-pointer border border-cream/35 px-5 py-[9px] text-[11px] uppercase tracking-wide transition-colors ${
        active ? "bg-cream text-ink" : "bg-transparent text-cream"
      }`}
    >
      {children}
    </button>
  );
}
