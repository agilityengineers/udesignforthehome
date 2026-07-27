import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/**
 * Gate the admin dashboard and admin API. Runs on the Edge runtime, so it uses
 * only Web Crypto (via lib/auth). Unauthenticated visitors to /admin are
 * redirected to the login page; unauthenticated admin API calls get a 401.
 * Individual API routes re-check auth server-side as defense in depth.
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isLoginPage = pathname === "/admin/login";
  const isLoginApi = pathname === "/api/admin/login";
  if (isLoginPage || isLoginApi) return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const authed = await verifySessionToken(token);
  if (authed) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", req.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
