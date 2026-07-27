import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  createSessionToken,
  verifyPassword,
} from "@/lib/auth";

/** Admin login: validate the password and set the signed session cookie. */
export async function POST(req: Request) {
  let body: { password?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const password = String(body.password ?? "");
  if (!verifyPassword(password)) {
    return NextResponse.json(
      { error: "That password isn’t right. Try again." },
      { status: 401 },
    );
  }

  const token = await createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
