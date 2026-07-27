import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";
import { BUSINESS } from "@/lib/content";

export function LoginForm() {
  const [, setLocation] = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: fd.get("password") }),
      });
      if (!res.ok) throw new Error("wrong");
      setLocation("/admin");
    } catch {
      setError(true);
      setSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-ink)] p-8">
      <form
        onSubmit={onSubmit}
        className="flex w-full max-w-[400px] flex-col gap-5 bg-[var(--color-cream)] px-12 py-14"
      >
        <div className="flex flex-col gap-1 text-center">
          <span className="font-serif text-[26px] font-semibold">{BUSINESS.name}</span>
          <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-muted)]">
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
          className="border-[color-mix(in_srgb,var(--color-ink)_30%,transparent)]"
        />
        {error && (
          <p className="m-0 text-[13px] text-[var(--color-danger)]" role="alert">
            That password isn&rsquo;t right. Try again.
          </p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="cursor-pointer border-none bg-[var(--color-accent)] p-3.5 text-xs font-semibold uppercase tracking-wide text-[var(--color-cream)] transition-colors hover:bg-[var(--color-ink)] disabled:opacity-70"
        >
          {submitting ? "Signing in…" : "Sign In"}
        </button>
        <a href="/" className="text-center text-xs text-[var(--color-accent)] hover:text-[var(--color-ink)]">
          &larr; Back to site
        </a>
      </form>
    </div>
  );
}
