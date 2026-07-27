import { Router } from "express";
import { createLead } from "../lib/leads.js";

const router = Router();

router.post("/leads", async (req, res) => {
  const body = req.body as Record<string, unknown>;
  const name = String(body["name"] ?? "").trim();
  const email = String(body["email"] ?? "").trim();
  if (!name || !email) {
    res.status(400).json({ error: "Name and email are required." });
    return;
  }
  try {
    await createLead({
      name,
      email,
      phone: String(body["phone"] ?? ""),
      zip: String(body["zip"] ?? ""),
      projectType: String(body["projectType"] ?? ""),
      message: String(body["message"] ?? ""),
    });
    res.status(201).json({ ok: true });
  } catch (err) {
    req.log.error({ err }, "Failed to create lead");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
