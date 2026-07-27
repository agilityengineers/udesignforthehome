import { Router } from "express";
import { SESSION_COOKIE, SESSION_MAX_AGE, createSessionToken, verifyPassword } from "../lib/auth.js";

const router = Router();

router.post("/admin/login", async (req, res) => {
  const body = req.body as Record<string, unknown>;
  const password = String(body["password"] ?? "");
  if (!verifyPassword(password)) {
    res.status(401).json({ error: "That password isn't right. Try again." });
    return;
  }
  const token = await createSessionToken();
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env["NODE_ENV"] === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE * 1000,
  });
  res.json({ ok: true });
});

router.post("/admin/logout", (_req, res) => {
  res.cookie(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env["NODE_ENV"] === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  res.json({ ok: true });
});

export default router;
