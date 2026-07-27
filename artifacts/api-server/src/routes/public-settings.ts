import { Router } from "express";
import { getResolvedSettings } from "../lib/settings.js";

const router = Router();

router.get("/settings", async (req, res) => {
  try {
    const settings = await getResolvedSettings();
    res.json(settings);
  } catch (err) {
    req.log.error({ err }, "Failed to get settings");
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
