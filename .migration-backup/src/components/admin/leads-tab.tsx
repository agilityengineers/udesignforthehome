"use client";

import { LeadCard } from "@/components/admin/lead-card";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/content";
import type { LeadRecord, LeadStats } from "@/lib/leads";

type Filter = "All" | LeadStatus;

/** Leads tab: stat cards, status filter + refresh, and the lead list. */
export function LeadsTab({
  leads,
  stats,
  filter,
  onFilterChange,
  onRefresh,
  onStatusChange,
  onNotesBlur,
  onDelete,
}: {
  leads: LeadRecord[];
  stats: LeadStats;
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  onRefresh: () => void;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onNotesBlur: (id: string, notes: string) => void;
  onDelete: (id: string) => void;
}) {
  const filtered =
    filter === "All" ? leads : leads.filter((l) => l.status === filter);

  return (
    <div className="flex flex-col gap-7">
      {/* Stat cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-5">
        <StatCard label="All Leads" value={stats.total} />
        <StatCard label="New" value={stats.newCount} accent />
        <StatCard label="This Week" value={stats.thisWeek} />
        <StatCard label="Top Project Type" value={stats.topProject} small />
      </div>

      {/* Heading + controls */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="m-0 font-serif text-[28px] font-semibold">
          Consultation Requests
        </h2>
        <div className="flex items-center gap-2.5">
          <label htmlFor="lead-filter" className="sr-only">
            Filter by status
          </label>
          <select
            id="lead-filter"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value as Filter)}
            className="border border-ink/30 bg-cream px-3 py-[9px] text-xs outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <option value="All">All Statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={onRefresh}
            className="cursor-pointer border border-accent bg-transparent px-[18px] py-[9px] text-[11px] uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-cream"
          >
            Refresh
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col gap-2 bg-cream px-8 py-16 text-center">
          <p className="m-0 font-serif text-2xl italic">No requests here yet.</p>
          <p className="m-0 text-sm text-muted">
            When someone submits the booking form on the site, their request
            appears in this list.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {filtered.map((lead) => (
            <LeadCard
              key={lead.id}
              lead={lead}
              onStatusChange={onStatusChange}
              onNotesBlur={onNotesBlur}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  accent = false,
  small = false,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
  small?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5 bg-cream px-6 py-6">
      <span className="text-[11px] uppercase tracking-[0.2em] text-muted">
        {label}
      </span>
      <span
        className={
          small
            ? "pt-2 font-serif text-[22px] font-medium leading-[1.2]"
            : "font-serif text-[40px] font-medium leading-none"
        }
        style={accent ? { color: "var(--accent)" } : undefined}
      >
        {value}
      </span>
    </div>
  );
}
