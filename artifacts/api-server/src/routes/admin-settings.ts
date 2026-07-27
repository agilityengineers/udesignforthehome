import { Router } from "express";
import { requireAdmin } from "../middleware/admin-auth.js";
import { getRawSettings, updateSettings, resetSettings } from "../lib/settings.js";
import type { Testimonial } from "../lib/settings.js";

const router = Router();

router.get("/admin/settings", requireAdmin, async (req, res) => {
  try {
    const settings = await getRawSettings();
    res.json(settings);
  } catch (err) {
    req.log.error({ err }, "Failed to get settings");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/admin/settings", requireAdmin, async (req, res) => {
  const body = req.body as Record<string, unknown>;
  const rawTestimonials = Array.isArray(body["testimonials"]) ? body["testimonials"] : [];
  const testimonials: Testimonial[] = rawTestimonials.slice(0, 3).map((t) => {
    const obj = (t ?? {}) as Record<string, unknown>;
    return { quote: String(obj["quote"] ?? ""), attribution: String(obj["attribution"] ?? "") };
  });
  try {
    await updateSettings({
      phone: String(body["phone"] ?? ""),
      email: String(body["email"] ?? ""),
      heroHeadline: String(body["heroHeadline"] ?? ""),
      heroSubhead: String(body["heroSubhead"] ?? ""),
      heroStyle: body["heroStyle"] === "video" ? "video" : "image",
      heroVideoUrl: String(body["heroVideoUrl"] ?? ""),
      testimonials,
    });
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to update settings");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/admin/settings", requireAdmin, async (req, res) => {
  try {
    await resetSettings();
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to reset settings");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
