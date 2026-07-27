import { useState } from "react";
import { Link, useLocation } from "wouter";
import { LeadsTab, type LeadStats } from "@/components/admin/leads-tab";
import { ContentTab, type RawSettings } from "@/components/admin/content-tab";
import { LeadCard, type LeadRecord } from "@/components/admin/lead-card";
import { BUSINESS, type LeadStatus } from "@/lib/content";

type Tab = "leads" | "content";
type Filter = "All" | LeadStatus;

export function AdminDashboard({
  initialLeads,
  initialStats,
  initialSettings,
}: {
  initialLeads: LeadRecord[];
  initialStats: LeadStats;
  initialSettings: RawSettings;
}) {
  const [, setLocation] = useLocation();
  const [tab, setTab] = useState<Tab>("leads");
  const [leads, setLeads] = useState<LeadRecord[]>(initialLeads);
  const [stats, setStats] = useState<LeadStats>(initialStats);
  const [filter, setFilter] = useState<Filter>("All");

  async function refresh() {
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      if (res.ok) {
        const data = (await res.json()) as { leads: LeadRecord[]; stats: LeadStats };
        setLeads(data.leads);
        setStats(data.stats);
      }
    } catch { /* keep current view on network error */ }
  }

  async function patchLead(id: string, patch: { status?: string; notes?: string }) {
    await fetch(`/api/admin/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
  }

  async function onStatusChange(id: string, status: LeadStatus) {
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
    setLocation("/admin/login");
  }

  const onLeads = tab === "leads";

  return (
    <div className="min-h-screen bg-[var(--color-sand)]">
      <header className="flex flex-wrap items-center justify-between gap-3 bg-[var(--color-ink)] px-4 py-5 text-[var(--color-cream)] sm:gap-4 sm:px-12">
        <div className="flex flex-col gap-0.5">
          <span className="font-serif text-xl font-semibold text-[var(--color-cream)]">
            {BUSINESS.name}
          </span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-[color-mix(in_srgb,var(--color-cream)_60%,transparent)]">
            Admin Dashboard
          </span>
        </div>
        <nav className="flex flex-wrap items-center gap-x-2 gap-y-1" aria-label="Admin sections">
          <TabButton active={onLeads} onClick={() => setTab("leads")}>Leads</TabButton>
          <TabButton active={!onLeads} onClick={() => setTab("content")}>Site Content</TabButton>
          <Link
            href="/"
            className="px-3.5 py-[9px] text-[11px] uppercase tracking-wide text-[color-mix(in_srgb,var(--color-cream)_70%,transparent)] transition-colors hover:text-[var(--color-cream)]"
          >
            View Site
          </Link>
          <button
            type="button"
            onClick={logout}
            className="cursor-pointer border-none bg-transparent px-1.5 py-[9px] text-[11px] uppercase tracking-wide text-[color-mix(in_srgb,var(--color-cream)_50%,transparent)] transition-colors hover:text-[var(--color-cream)]"
          >
            Sign Out
          </button>
        </nav>
      </header>

      <main className="px-6 py-10 sm:px-12">
        <div className="mx-auto max-w-content">
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
            <ContentTab initial={initialSettings} onSaved={refresh} />
          )}
        </div>
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
      className={`cursor-pointer border-none px-4 py-[9px] text-[11px] uppercase tracking-wide transition-colors ${
        active
          ? "bg-[var(--color-cream)] text-[var(--color-ink)]"
          : "bg-transparent text-[color-mix(in_srgb,var(--color-cream)_65%,transparent)] hover:text-[var(--color-cream)]"
      }`}
    >
      {children}
    </button>
  );
}
