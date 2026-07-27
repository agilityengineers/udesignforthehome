"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PROJECT_TYPES } from "@/lib/content";

type Status = "idle" | "submitting" | "sent" | "error";

/**
 * Booking form. HTML-validates required name/email, POSTs to /api/leads (which
 * persists the lead + fires the notification hook), then swaps to a thank-you
 * panel — matching the prototype's submit behavior.
 */
export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      zip: String(fd.get("zip") ?? ""),
      projectType: String(fd.get("project") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    setStatus("submitting");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col justify-center gap-4 border border-cream/25 p-12">
        <h3 className="m-0 font-serif text-[30px] font-medium text-cream">
          Thank you.
        </h3>
        <p className="m-0 text-[15px] leading-[1.7] text-cream/75">
          We&rsquo;ve got your note. Expect a call from Willa&rsquo;s team within
          one business day to find a time that works.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} aria-label="Booking form" className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input required name="name" placeholder="Name" aria-label="Name" variant="onDark" />
        <Input
          required
          type="email"
          name="email"
          placeholder="Email"
          aria-label="Email"
          variant="onDark"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input type="tel" name="phone" placeholder="Phone" aria-label="Phone" variant="onDark" />
        <Input name="zip" placeholder="ZIP" aria-label="ZIP code" variant="onDark" />
      </div>
      <select
        name="project"
        aria-label="Project type"
        defaultValue=""
        className="border border-cream/35 bg-ink px-4 py-[14px] text-sm text-cream outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <option value="">Project type…</option>
        {PROJECT_TYPES.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <Textarea
        name="message"
        rows={4}
        placeholder="Tell us about your windows…"
        aria-label="Message"
        variant="onDark"
      />
      {status === "error" && (
        <p className="m-0 text-sm text-cream/90" role="alert">
          Something went wrong sending your request. Please call{" "}
          <a href="tel:+15404295241" className="underline">
            (540) 429-5241
          </a>{" "}
          or try again.
        </p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="cursor-pointer border-none bg-accent p-4 text-[13px] font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-cream hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream disabled:opacity-70"
      >
        {status === "submitting" ? "Sending…" : "Book Your In-Home Consultation"}
      </button>
    </form>
  );
}
