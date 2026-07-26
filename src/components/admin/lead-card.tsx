"use client";

import { LEAD_STATUSES, STATUS_COLORS, type LeadStatus } from "@/lib/content";
import type { LeadRecord } from "@/lib/leads";

/** A single lead in the CRM: status pipeline, contact grid, message, notes. */
export function LeadCard({
  lead,
  onStatusChange,
  onNotesBlur,
  onDelete,
}: {
  lead: LeadRecord;
  onStatusChange: (id: string, status: LeadStatus) => void;
  onNotesBlur: (id: string, notes: string) => void;
  onDelete: (id: string) => void;
}) {
  const color = STATUS_COLORS[lead.status];
  const noteId = `note-${lead.id}`;

  return (
    <div
      className="flex flex-col gap-4 bg-cream px-8 py-7"
      style={{ borderLeft: `3px solid ${color}` }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-baseline gap-3.5">
          <span className="font-serif text-2xl font-semibold">{lead.name}</span>
          <span className="text-xs text-muted">{lead.dateLabel}</span>
        </div>
        <div className="flex items-center gap-2.5">
          <label htmlFor={`status-${lead.id}`} className="sr-only">
            Lead status
          </label>
          <select
            id={`status-${lead.id}`}
            value={lead.status}
            onChange={(e) =>
              onStatusChange(lead.id, e.target.value as LeadStatus)
            }
            className="border bg-transparent px-2.5 py-[7px] text-xs font-semibold outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            style={{ borderColor: color, color }}
          >
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s} className="text-ink">
                {s}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => onDelete(lead.id)}
            aria-label={`Delete lead from ${lead.name}`}
            className="cursor-pointer border-none bg-transparent p-[7px] text-xs text-muted transition-colors hover:text-danger"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
        <Field label="Email">
          <a
            href={`mailto:${lead.email}`}
            className="break-all text-sm text-accent hover:text-ink"
          >
            {lead.email || "—"}
          </a>
        </Field>
        <Field label="Phone">
          {lead.phone ? (
            <a href={`tel:${lead.phone}`} className="text-sm text-accent hover:text-ink">
              {lead.phone}
            </a>
          ) : (
            <span className="text-sm">—</span>
          )}
        </Field>
        <Field label="ZIP">
          <span className="text-sm">{lead.zip || "—"}</span>
        </Field>
        <Field label="Project Type">
          <span className="text-sm">{lead.projectType || "—"}</span>
        </Field>
      </div>

      {lead.message && (
        <div className="flex flex-col gap-1 border-t border-ink/10 pt-3.5">
          <FieldLabel>What they&rsquo;re looking for</FieldLabel>
          <p className="m-0 text-sm leading-[1.65] text-body-ink text-pretty">
            {lead.message}
          </p>
        </div>
      )}

      <div className="flex flex-col gap-1.5 border-t border-ink/10 pt-3.5">
        <label htmlFor={noteId} className="text-[10px] uppercase tracking-[0.18em] text-muted">
          Your Notes{" "}
          <span className="tracking-normal text-muted-gray normal-case">
            (saved automatically)
          </span>
        </label>
        <textarea
          id={noteId}
          rows={2}
          defaultValue={lead.notes}
          placeholder="e.g. Left voicemail 7/26, call back Tuesday…"
          onBlur={(e) => {
            if (e.target.value !== lead.notes) onNotesBlur(lead.id, e.target.value);
          }}
          className="resize-y border border-ink/20 bg-transparent px-3 py-2.5 text-[13px] leading-[1.5] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </div>
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-[10px] uppercase tracking-[0.18em] text-muted">
      {children}
    </span>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[3px]">
      <FieldLabel>{label}</FieldLabel>
      {children}
    </div>
  );
}
