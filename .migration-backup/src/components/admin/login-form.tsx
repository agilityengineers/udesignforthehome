"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { BUSINESS } from "@/lib/content";

/**
 * Admin sign-in. Posts to /api/admin/login, which sets the signed session
 * cookie; on success we navigate to the dashboard. Per the brief, the on-screen
 * prototype password hint is intentionally removed for production.
 */
export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    setSubmitting(true);
    setError(false);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setError(true);
        setSubmitting(false);
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError(true);
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink p-8">
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-[400px] flex-col gap-5 bg-cream px-12 py-14"
      >
        <div className="flex flex-col gap-1 text-center">
          <span className="font-serif text-[26px] font-semibold">
            {BUSINESS.name}
          </span>
          <span className="text-[10px] uppercase tracking-eyebrow text-muted">
            Admin Sign-In
          </span>
        </div>
        <Input
          required
          type="password"
          name="password"
          placeholder="Password"
          aria-label="Password"
          autoComplete="current-password"
          className="border-ink/30"
        />
        {error && (
          <p className="m-0 text-[13px] text-danger" role="alert">
            That password isn&rsquo;t right. Try again.
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="cursor-pointer border-none bg-accent p-3.5 text-xs font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-ink disabled:opacity-70"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>
        <Link href="/" className="text-center text-xs text-accent hover:text-ink">
          &larr; Back to site
        </Link>
      </form>
    </div>
  );
}
