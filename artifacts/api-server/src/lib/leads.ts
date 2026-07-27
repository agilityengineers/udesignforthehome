import { db } from "@workspace/db";
import { leadsTable } from "@workspace/db";
import { eq, desc } from "drizzle-orm";
import { randomUUID } from "crypto";

const LEAD_STATUSES = ["New", "Contacted", "Scheduled", "Completed"] as const;
type LeadStatus = (typeof LEAD_STATUSES)[number];

function isStatus(value: string): value is LeadStatus {
  return (LEAD_STATUSES as readonly string[]).includes(value);
}

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
  createdAt: string;
  dateLabel: string;
};

export type LeadStats = {
  total: number;
  newCount: number;
  thisWeek: number;
  topProject: string;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/New_York",
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

function serialize(row: typeof leadsTable.$inferSelect): LeadRecord {
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

function generateId(): string {
  // cuid-like unique ID using crypto.randomUUID
  return "c" + randomUUID().replace(/-/g, "").slice(0, 24);
}

export async function createLead(input: LeadInput): Promise<LeadRecord> {
  const rows = await db
    .insert(leadsTable)
    .values({
      id: generateId(),
      name: input.name.trim(),
      email: input.email.trim(),
      phone: (input.phone ?? "").trim(),
      zip: (input.zip ?? "").trim(),
      projectType: (input.projectType ?? "").trim(),
      message: (input.message ?? "").trim(),
      status: "New",
      notes: "",
    })
    .returning();
  return serialize(rows[0]!);
}

export async function listLeads(filter?: string): Promise<LeadRecord[]> {
  const rows = await db.select().from(leadsTable).orderBy(desc(leadsTable.createdAt));
  if (filter && filter !== "All" && isStatus(filter)) {
    return rows.filter((r) => r.status === filter).map(serialize);
  }
  return rows.map(serialize);
}

export async function getLeadStats(): Promise<LeadStats> {
  const rows = await db
    .select({ status: leadsTable.status, projectType: leadsTable.projectType, createdAt: leadsTable.createdAt })
    .from(leadsTable);

  const weekAgo = Date.now() - 7 * 86_400_000;
  const counts: Record<string, number> = {};
  let newCount = 0;
  let thisWeek = 0;

  for (const r of rows) {
    if (r.status === "New") newCount += 1;
    if (r.createdAt.getTime() > weekAgo) thisWeek += 1;
    if (r.projectType) counts[r.projectType] = (counts[r.projectType] ?? 0) + 1;
  }

  const top = Object.entries(counts).sort((a, b) => b[1]! - a[1]!)[0];
  return { total: rows.length, newCount, thisWeek, topProject: top ? top[0] : "—" };
}

export async function updateLead(
  id: string,
  patch: { status?: string; notes?: string },
): Promise<LeadRecord | null> {
  const data: { status?: string; notes?: string } = {};
  if (patch.status !== undefined && isStatus(patch.status)) data.status = patch.status;
  if (patch.notes !== undefined) data.notes = patch.notes;
  if (Object.keys(data).length === 0) {
    const existing = await db.select().from(leadsTable).where(eq(leadsTable.id, id));
    return existing[0] ? serialize(existing[0]) : null;
  }
  const rows = await db.update(leadsTable).set(data).where(eq(leadsTable.id, id)).returning();
  return rows[0] ? serialize(rows[0]) : null;
}

export async function deleteLead(id: string): Promise<boolean> {
  const rows = await db.delete(leadsTable).where(eq(leadsTable.id, id)).returning({ id: leadsTable.id });
  return rows.length > 0;
}
