import { NextResponse } from "next/server";
import { deleteLead, updateLead } from "@/lib/leads";
import { isAdminAuthenticated } from "@/lib/session";

/** PATCH — update a lead's status and/or notes. */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  let body: { status?: unknown; notes?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const patch: { status?: string; notes?: string } = {};
  if (typeof body.status === "string") patch.status = body.status;
  if (typeof body.notes === "string") patch.notes = body.notes;

  const updated = await updateLead(id, patch);
  if (!updated) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, lead: updated });
}

/** DELETE — remove a lead. */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const ok = await deleteLead(id);
  if (!ok) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
