import { Router } from "express";
import { requireAdmin } from "../middleware/admin-auth.js";
import { listLeads, getLeadStats, updateLead, deleteLead } from "../lib/leads.js";

const router = Router();

router.get("/admin/leads", requireAdmin, async (req, res) => {
  try {
    const [leads, stats] = await Promise.all([listLeads("All"), getLeadStats()]);
    res.json({ leads, stats });
  } catch (err) {
    req.log.error({ err }, "Failed to list leads");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.patch("/admin/leads/:id", requireAdmin, async (req, res) => {
  const { id } = req.params as { id: string };
  const body = req.body as Record<string, unknown>;
  const patch: { status?: string; notes?: string } = {};
  if (typeof body["status"] === "string") patch.status = body["status"];
  if (typeof body["notes"] === "string") patch.notes = body["notes"];
  try {
    const updated = await updateLead(id, patch);
    if (!updated) {
      res.status(404).json({ error: "Lead not found" });
      return;
    }
    res.json({ ok: true, lead: updated });
  } catch (err) {
    req.log.error({ err }, "Failed to update lead");
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/admin/leads/:id", requireAdmin, async (req, res) => {
  const { id } = req.params as { id: string };
  try {
    const ok = await deleteLead(id);
    if (!ok) {
      res.status(404).json({ error: "Lead not found" });
      return;
    }
    res.json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to delete lead");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
