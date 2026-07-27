"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  DEFAULT_HERO_HEADLINE,
  DEFAULT_HERO_SUBHEAD,
  BUSINESS,
} from "@/lib/content";
import type { RawSettings } from "@/lib/settings";
import { parseVideoUrl } from "@/lib/video";

/**
 * Site Content (CMS) tab. Edits the SiteSettings store; blank fields fall back
 * to the original copy. Save → PUT /api/admin/settings; Reset → DELETE.
 */
export function ContentTab({
  initial,
  onSaved,
}: {
  initial: RawSettings;
  onSaved: () => void;
}) {
  const [settings, setSettings] = useState<RawSettings>(initial);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const t = [0, 1, 2].map((i) => settings.testimonials[i] ?? { quote: "", attribution: "" });

  // Live feedback for the hero video URL.
  const trimmedVideoUrl = settings.heroVideoUrl.trim();
  const parsedVideo = trimmedVideoUrl ? parseVideoUrl(trimmedVideoUrl) : null;
  const videoInvalid = trimmedVideoUrl !== "" && !parsedVideo;
  const videoHintMessage = !trimmedVideoUrl
    ? "Paste a YouTube or Vimeo link. It autoplays muted and loops, with player controls. Leave blank to keep the image hero."
    : videoInvalid
      ? "Couldn’t detect a YouTube or Vimeo link — the hero will use the image layout until this is a valid URL."
      : `${parsedVideo!.provider === "youtube" ? "YouTube" : "Vimeo"} video detected. ✓`;

  function setTestimonial(i: number, patch: { quote?: string; attribution?: string }) {
    setSettings((prev) => {
      const next = [0, 1, 2].map(
        (j) => prev.testimonials[j] ?? { quote: "", attribution: "" },
      );
      next[i] = { ...next[i], ...patch };
      return { ...prev, testimonials: next };
    });
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaved(true);
        onSaved();
      }
    } finally {
      setSaving(false);
    }
  }

  async function onReset() {
    if (!confirm("Reset all site content to the original copy?")) return;
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", { method: "DELETE" });
      if (res.ok) {
        setSettings({
          phone: "",
          email: "",
          heroHeadline: "",
          heroSubhead: "",
          heroStyle: "image",
          heroVideoUrl: "",
          testimonials: [],
        });
        setSaved(true);
        onSaved();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-prose flex-col gap-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="m-0 font-serif text-[28px] font-semibold">Site Content</h2>
        {saved && (
          <span className="text-[13px] font-semibold text-accent">
            Saved — the site is updated.
          </span>
        )}
      </div>

      {/* Contact Information */}
      <Card
        title="Contact Information"
        hint="Shown in the booking section and footer on the home page."
      >
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4">
          <label className="flex flex-col gap-1.5">
            <Label>Phone</Label>
            <Input
              value={settings.phone}
              onChange={(e) => {
                setSettings((p) => ({ ...p, phone: e.target.value }));
                setSaved(false);
              }}
              placeholder={BUSINESS.defaultPhone}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <Label>Email</Label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) => {
                setSettings((p) => ({ ...p, email: e.target.value }));
                setSaved(false);
              }}
              placeholder={BUSINESS.defaultEmail}
            />
          </label>
        </div>
      </Card>

      {/* Hero */}
      <Card
        title="Hero"
        hint="The first thing visitors see. Leave the text fields blank to use the original wording."
      >
        <label className="flex flex-col gap-1.5">
          <Label>Hero Style</Label>
          <select
            value={settings.heroStyle}
            onChange={(e) => {
              setSettings((p) => ({
                ...p,
                heroStyle: e.target.value === "video" ? "video" : "image",
              }));
              setSaved(false);
            }}
            className="border border-ink/25 bg-transparent px-4 py-[14px] text-sm text-ink outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <option value="image">Image — full-screen background (current)</option>
            <option value="video">
              Video — two-column, copy left + video right
            </option>
          </select>
        </label>

        {settings.heroStyle === "video" && (
          <label className="flex flex-col gap-1.5">
            <Label>Video URL (YouTube or Vimeo)</Label>
            <Input
              value={settings.heroVideoUrl}
              onChange={(e) => {
                setSettings((p) => ({ ...p, heroVideoUrl: e.target.value }));
                setSaved(false);
              }}
              placeholder="https://www.youtube.com/watch?v=…  or  https://vimeo.com/…"
            />
            {videoHintMessage && (
              <span
                className={`text-xs ${
                  videoInvalid ? "text-danger" : "text-muted"
                }`}
              >
                {videoHintMessage}
              </span>
            )}
          </label>
        )}

        <label className="flex flex-col gap-1.5">
          <Label>Headline</Label>
          <Input
            value={settings.heroHeadline}
            onChange={(e) => {
              setSettings((p) => ({ ...p, heroHeadline: e.target.value }));
              setSaved(false);
            }}
            placeholder={DEFAULT_HERO_HEADLINE}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <Label>Supporting Line</Label>
          <Textarea
            rows={2}
            value={settings.heroSubhead}
            onChange={(e) => {
              setSettings((p) => ({ ...p, heroSubhead: e.target.value }));
              setSaved(false);
            }}
            placeholder={DEFAULT_HERO_SUBHEAD}
          />
        </label>
      </Card>

      {/* Testimonials */}
      <Card
        title="Testimonials"
        hint={`Three cards in the “In Their Words” section. Blank quotes keep the current examples.`}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="flex flex-col gap-2.5 border-t border-ink/10 pt-4"
          >
            <label className="flex flex-col gap-1.5">
              <Label>{`Testimonial ${i + 1} — Quote`}</Label>
              <Textarea
                rows={2}
                value={t[i].quote}
                onChange={(e) => setTestimonial(i, { quote: e.target.value })}
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <Label>Attribution</Label>
              <Input
                value={t[i].attribution}
                onChange={(e) =>
                  setTestimonial(i, { attribution: e.target.value })
                }
                placeholder="First Name · Neighborhood"
              />
            </label>
          </div>
        ))}
      </Card>

      <div className="flex items-center gap-3.5">
        <button
          type="submit"
          disabled={saving}
          className="cursor-pointer border-none bg-accent px-8 py-[15px] text-xs font-semibold uppercase tracking-wide text-cream transition-colors hover:bg-ink disabled:opacity-70"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={saving}
          className="cursor-pointer border border-ink/30 bg-transparent px-6 py-[15px] text-xs uppercase tracking-wide text-muted transition-colors hover:border-ink hover:text-ink disabled:opacity-70"
        >
          Reset to Original
        </button>
      </div>
      <p className="m-0 text-xs text-muted text-pretty">
        Edits apply to the public site immediately. Contact details also feed the
        Terms and Privacy pages.
      </p>
    </form>
  );
}

function Card({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[18px] bg-cream p-8">
      <h3 className="m-0 font-serif text-xl font-semibold">{title}</h3>
      <p className="m-0 text-[13px] text-muted">{hint}</p>
      {children}
    </div>
  );
}
