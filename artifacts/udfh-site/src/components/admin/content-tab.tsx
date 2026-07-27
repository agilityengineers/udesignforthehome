import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { DEFAULT_HERO_HEADLINE, DEFAULT_HERO_SUBHEAD, BUSINESS } from "@/lib/content";
import type { Testimonial } from "@/lib/content";
import { parseVideoUrl } from "@/lib/video";

export type RawSettings = {
  phone: string;
  email: string;
  heroHeadline: string;
  heroSubhead: string;
  heroStyle: string;
  heroVideoUrl: string;
  testimonials: Testimonial[];
};

export function ContentTab({ initial, onSaved }: { initial: RawSettings; onSaved: () => void }) {
  const [settings, setSettings] = useState<RawSettings>(initial);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const t = [0, 1, 2].map((i) => settings.testimonials[i] ?? { quote: "", attribution: "" });

  const trimmedVideoUrl = settings.heroVideoUrl.trim();
  const parsedVideo = trimmedVideoUrl ? parseVideoUrl(trimmedVideoUrl) : null;
  const videoInvalid = trimmedVideoUrl !== "" && !parsedVideo;
  const videoHintMessage = !trimmedVideoUrl
    ? "Paste a YouTube or Vimeo link. Leave blank to use the image hero."
    : videoInvalid
      ? "Couldn't detect a YouTube or Vimeo link — the hero will use the image layout."
      : `${parsedVideo!.provider === "youtube" ? "YouTube" : "Vimeo"} video detected. ✓`;

  function setTestimonial(i: number, patch: { quote?: string; attribution?: string }) {
    setSettings((prev) => {
      const next = [0, 1, 2].map((j) => prev.testimonials[j] ?? { quote: "", attribution: "" });
      next[i] = { ...next[i]!, ...patch };
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
      if (res.ok) { setSaved(true); onSaved(); }
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
        setSettings({ phone: "", email: "", heroHeadline: "", heroSubhead: "", heroStyle: "image", heroVideoUrl: "", testimonials: [] });
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
        {saved && <span className="text-[13px] font-semibold text-[var(--color-accent)]">Saved — the site is updated.</span>}
      </div>

      <Card title="Contact Information" hint="Shown in the booking section and footer on the home page.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <Label>Phone</Label>
            <Input
              value={settings.phone}
              onChange={(e) => { setSettings((p) => ({ ...p, phone: e.target.value })); setSaved(false); }}
              placeholder={BUSINESS.defaultPhone}
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <Label>Email</Label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) => { setSettings((p) => ({ ...p, email: e.target.value })); setSaved(false); }}
              placeholder={BUSINESS.defaultEmail}
            />
          </label>
        </div>
      </Card>

      <Card title="Hero Section" hint="The headline and paragraph shown on the home page hero.">
        <label className="flex flex-col gap-1.5">
          <Label>Headline</Label>
          <Input
            value={settings.heroHeadline}
            onChange={(e) => { setSettings((p) => ({ ...p, heroHeadline: e.target.value })); setSaved(false); }}
            placeholder={DEFAULT_HERO_HEADLINE}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <Label>Sub-headline</Label>
          <Textarea
            rows={2}
            value={settings.heroSubhead}
            onChange={(e) => { setSettings((p) => ({ ...p, heroSubhead: e.target.value })); setSaved(false); }}
            placeholder={DEFAULT_HERO_SUBHEAD}
          />
        </label>
        <div className="flex flex-col gap-1.5">
          <Label>Hero Style</Label>
          <div className="flex gap-6">
            {(["image", "video"] as const).map((style) => (
              <label key={style} className="flex cursor-pointer items-center gap-2 text-sm capitalize">
                <input
                  type="radio"
                  name="heroStyle"
                  value={style}
                  checked={settings.heroStyle === style}
                  onChange={() => { setSettings((p) => ({ ...p, heroStyle: style })); setSaved(false); }}
                  className="accent-[var(--color-accent)]"
                />
                {style}
              </label>
            ))}
          </div>
        </div>
        {settings.heroStyle === "video" && (
          <label className="flex flex-col gap-1.5">
            <Label>Video URL (YouTube or Vimeo)</Label>
            <Input
              type="url"
              value={settings.heroVideoUrl}
              onChange={(e) => { setSettings((p) => ({ ...p, heroVideoUrl: e.target.value })); setSaved(false); }}
              placeholder="https://www.youtube.com/watch?v=…"
            />
            <span className={`text-[12px] ${videoInvalid ? "text-[var(--color-danger)]" : "text-[var(--color-muted)]"}`}>
              {videoHintMessage}
            </span>
          </label>
        )}
      </Card>

      <Card title="Testimonials" hint="Up to 3 client quotes. Leave blank to use the originals.">
        {t.map((testimonial, i) => (
          <div key={i} className="flex flex-col gap-3 border-t border-[color-mix(in_srgb,var(--color-ink)_10%,transparent)] pt-4 first:border-0 first:pt-0">
            <Label>Quote {i + 1}</Label>
            <Textarea
              rows={2}
              value={testimonial.quote}
              onChange={(e) => setTestimonial(i, { quote: e.target.value })}
              placeholder="What the client said…"
            />
            <label className="flex flex-col gap-1.5">
              <Label>Attribution</Label>
              <Input
                value={testimonial.attribution}
                onChange={(e) => setTestimonial(i, { attribution: e.target.value })}
                placeholder="First Name · Neighborhood"
              />
            </label>
          </div>
        ))}
      </Card>

      <div className="flex flex-wrap items-center gap-3.5">
        <button
          type="submit"
          disabled={saving}
          className="cursor-pointer border-none bg-[var(--color-accent)] px-8 py-[15px] text-xs font-semibold uppercase tracking-wide text-[var(--color-cream)] transition-colors hover:bg-[var(--color-ink)] disabled:opacity-70"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onReset}
          disabled={saving}
          className="cursor-pointer border border-[color-mix(in_srgb,var(--color-ink)_30%,transparent)] bg-transparent px-6 py-[15px] text-xs uppercase tracking-wide text-[var(--color-muted)] transition-colors hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] disabled:opacity-70"
        >
          Reset to Original
        </button>
      </div>
      <p className="m-0 text-xs text-[var(--color-muted)]">
        Edits apply to the public site immediately. Contact details also feed the Terms and Privacy
        pages.
      </p>
    </form>
  );
}

function Card({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-[18px] bg-[var(--color-cream)] p-6 sm:p-8">
      <h3 className="m-0 font-serif text-xl font-semibold">{title}</h3>
      <p className="m-0 text-[13px] text-[var(--color-muted)]">{hint}</p>
      {children}
    </div>
  );
}
