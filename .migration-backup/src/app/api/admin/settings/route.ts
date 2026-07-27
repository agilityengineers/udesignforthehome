import { NextResponse } from "next/server";
import { resetSettings, updateSettings } from "@/lib/settings";
import type { Testimonial } from "@/lib/content";
import { isAdminAuthenticated } from "@/lib/session";

/** PUT — save edited site content (CMS). Empty fields fall back to defaults. */
export async function PUT(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const rawTestimonials = Array.isArray(body.testimonials)
    ? body.testimonials
    : [];
  const testimonials: Testimonial[] = rawTestimonials
    .slice(0, 3)
    .map((t) => {
      const obj = (t ?? {}) as Record<string, unknown>;
      return {
        quote: String(obj.quote ?? ""),
        attribution: String(obj.attribution ?? ""),
      };
    });

  await updateSettings({
    phone: String(body.phone ?? ""),
    email: String(body.email ?? ""),
    heroHeadline: String(body.heroHeadline ?? ""),
    heroSubhead: String(body.heroSubhead ?? ""),
    heroStyle: body.heroStyle === "video" ? "video" : "image",
    heroVideoUrl: String(body.heroVideoUrl ?? ""),
    testimonials,
  });

  return NextResponse.json({ ok: true });
}

/** DELETE — reset all site content to the original built-in copy. */
export async function DELETE() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await resetSettings();
  return NextResponse.json({ ok: true });
}
