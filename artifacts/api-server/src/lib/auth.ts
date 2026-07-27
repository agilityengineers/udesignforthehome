/**
 * HMAC-signed cookie auth for the single admin user.
 * Uses Web Crypto (crypto.subtle) — works in Node 18+.
 */

export const SESSION_COOKIE = "udfh_admin";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

const encoder = new TextEncoder();

function buf(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(input: string): Uint8Array {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(padded + "=".repeat((4 - (padded.length % 4)) % 4));
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function getSecret(): string {
  const secret = process.env["SESSION_SECRET"];
  if (!secret) {
    throw new Error(
      "SESSION_SECRET environment variable is not set. " +
        "Set it to a random 32+ character string before starting the server.",
    );
  }
  return secret;
}

async function importKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    buf(encoder.encode(secret)),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}

function timingSafeEqual(a: string, b: string): boolean {
  const aBytes = encoder.encode(a);
  const bBytes = encoder.encode(b);
  if (aBytes.length !== bBytes.length) return false;
  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) diff |= (aBytes[i] ?? 0) ^ (bBytes[i] ?? 0);
  return diff === 0;
}

export function verifyPassword(password: string): boolean {
  const expected = process.env["ADMIN_PASSWORD"] || "";
  if (!expected) return false;
  return timingSafeEqual(password, expected);
}

export async function createSessionToken(): Promise<string> {
  const payload = { role: "admin", exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS };
  const payloadJson = JSON.stringify(payload);
  const payloadB64 = base64UrlEncode(encoder.encode(payloadJson));
  const key = await importKey(getSecret());
  const sig = await crypto.subtle.sign("HMAC", key, buf(encoder.encode(payloadB64)));
  const sigB64 = base64UrlEncode(new Uint8Array(sig));
  return `${payloadB64}.${sigB64}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payloadB64, sigB64] = parts;
  if (!payloadB64 || !sigB64) return false;
  try {
    const key = await importKey(getSecret());
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      buf(base64UrlDecode(sigB64)),
      buf(encoder.encode(payloadB64)),
    );
    if (!valid) return false;
    const payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadB64))) as {
      role?: string;
      exp?: number;
    };
    if (payload.role !== "admin") return false;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}

export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;
