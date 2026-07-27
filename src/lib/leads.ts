import "server-only";
import { getDb } from "@/lib/db";
import { LEAD_STATUSES, type LeadStatus } from "@/lib/content";

export type LeadInput = {
  name: string;
  email: string;
  phone?: string;
  zip?: string;
  projectType?: string;
  message?: string;
};

export type LeadRecord = {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  projectType: string;
  message: string;
  status: LeadStatus;
  notes: string;
  createdAt: string; // ISO
  dateLabel: string; // pre-formatted (Eastern time) for the CRM, hydration-safe
};

export type LeadStats = {
  total: number;
  newCount: number;
  thisWeek: number;
  topProject: string;
};

function isStatus(value: string): value is LeadStatus {
  return (LEAD_STATUSES as readonly string[]).includes(value);
}

// Deterministic formatting (fixed to the business's Eastern timezone) so the
// label is identical on the server and after client hydration.
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function serialize(row: {
  id: string;
  name: string;
  email: string;
  phone: string;
  zip: string;
  projectType: string;
  message: string;
  status: string;
  notes: string;
  createdAt: Date;
}): LeadRecord {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    zip: row.zip,
    projectType: row.projectType,
    message: row.message,
    status: isStatus(row.status) ? row.status : "New",
    notes: row.notes,
    createdAt: row.createdAt.toISOString(),
    dateLabel: dateFormatter.format(row.createdAt),
  };
}

/** Create a lead from the public booking form. */
export async function createLead(input: LeadInput): Promise<LeadRecord> {
  const db = await getDb();
  const row = await db.lead.create({
    data: {
      name: input.name.trim(),
      email: input.email.trim(),
      phone: (input.phone ?? "").trim(),
      zip: (input.zip ?? "").trim(),
      projectType: (input.projectType ?? "").trim(),
      message: (input.message ?? "").trim(),
      status: "New",
      notes: "",
    },
  });
  return serialize(row);
}

/** List leads, newest first, optionally filtered by status. */
export async function listLeads(filter?: string): Promise<LeadRecord[]> {
  const db = await getDb();
  const where =
    filter && filter !== "All" && isStatus(filter) ? { status: filter } : {};
  const rows = await db.lead.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return rows.map(serialize);
}

/** Aggregate stats for the CRM stat cards (computed over ALL leads). */
export async function getLeadStats(): Promise<LeadStats> {
  const db = await getDb();
  const rows = await db.lead.findMany({
    select: { status: true, projectType: true, createdAt: true },
  });
  const weekAgo = Date.now() - 7 * 86_400_000;
  const counts: Record<string, number> = {};
  let newCount = 0;
  let thisWeek = 0;
  for (const r of rows) {
    if (r.status === "New") newCount += 1;
    if (r.createdAt.getTime() > weekAgo) thisWeek += 1;
    if (r.projectType) counts[r.projectType] = (counts[r.projectType] ?? 0) + 1;
  }
  const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];
  return {
    total: rows.length,
    newCount,
    thisWeek,
    topProject: top ? top[0] : "—",
  };
}

/** Update a lead's status and/or notes (admin). */
export async function updateLead(
  id: string,
  patch: { status?: string; notes?: string },
): Promise<LeadRecord | null> {
  const db = await getDb();
  const data: { status?: string; notes?: string } = {};
  if (patch.status !== undefined && isStatus(patch.status)) {
    data.status = patch.status;
  }
  if (patch.notes !== undefined) {
    data.notes = patch.notes;
  }
  try {
    const row = await db.lead.update({ where: { id }, data });
    return serialize(row);
  } catch {
    return null;
  }
}

/** Delete a lead (admin). Returns true if a row was removed. */
export async function deleteLead(id: string): Promise<boolean> {
  const db = await getDb();
  try {
    await db.lead.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
