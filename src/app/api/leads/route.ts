import { NextResponse } from "next/server";
import { createLead } from "@/lib/leads";
import { notifyNewLead } from "@/lib/email";

/**
 * Public booking endpoint. Persists a lead from the marketing site's booking
 * form and fires the (currently no-op) email notification hook.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();

  // Server-side mirror of the form's HTML validation.
  if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "A name and a valid email are required." },
      { status: 422 },
    );
  }

  try {
    const lead = await createLead({
      name,
      email,
      phone: String(body.phone ?? ""),
      zip: String(body.zip ?? ""),
      projectType: String(body.projectType ?? ""),
      message: String(body.message ?? ""),
    });
    await notifyNewLead(lead);
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("Failed to create lead", err);
    return NextResponse.json(
      { error: "Could not save your request. Please try again." },
      { status: 500 },
    );
  }
}
