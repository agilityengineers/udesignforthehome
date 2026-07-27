import type { Request, Response, NextFunction } from "express";
import { SESSION_COOKIE, verifySessionToken } from "../lib/auth.js";

export async function requireAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = (req.cookies as Record<string, string | undefined>)?.[SESSION_COOKIE];
  const authed = await verifySessionToken(token);
  if (!authed) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}
