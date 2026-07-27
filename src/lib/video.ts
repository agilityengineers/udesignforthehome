/**
 * Parse a YouTube or Vimeo URL and build privacy-friendly embed URLs for the
 * hero video. Pure functions — safe to import on the server (Hero) and the
 * client (CMS field validation).
 */

export type VideoProvider = "youtube" | "vimeo";

export type ParsedVideo = {
  provider: VideoProvider;
  id: string;
  /** Vimeo private-link hash, if present. */
  hash?: string;
};

export type VideoEmbed = {
  provider: VideoProvider;
  /** Autoplay + muted + loop, with native controls. */
  autoplayUrl: string;
  /** No autoplay (used under prefers-reduced-motion), with native controls. */
  plainUrl: string;
};

const YT_ID = /^[A-Za-z0-9_-]{11}$/;

/** Extract provider + id (+ hash) from a pasted URL. Returns null if unknown. */
export function parseVideoUrl(input: string): ParsedVideo | null {
  const raw = (input || "").trim();
  if (!raw) return null;

  let url: URL;
  try {
    url = new URL(raw.includes("://") ? raw : `https://${raw}`);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "").toLowerCase();
  const parts = url.pathname.split("/").filter(Boolean);

  // --- YouTube ---
  if (host === "youtu.be") {
    const id = parts[0];
    if (id && YT_ID.test(id)) return { provider: "youtube", id };
  }
  if (host === "youtube.com" || host === "youtube-nocookie.com" || host === "m.youtube.com") {
    const v = url.searchParams.get("v");
    if (v && YT_ID.test(v)) return { provider: "youtube", id: v };
    // /embed/<id>, /shorts/<id>, /live/<id>
    const idx = ["embed", "shorts", "live", "v"].indexOf(parts[0]);
    if (idx !== -1 && parts[1] && YT_ID.test(parts[1])) {
      return { provider: "youtube", id: parts[1] };
    }
  }

  // --- Vimeo ---
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    // Grab the first all-numeric path segment as the video id.
    const numeric = parts.find((p) => /^\d+$/.test(p));
    if (numeric) {
      // A hash may follow the id (private link): vimeo.com/<id>/<hash>
      const afterId = parts[parts.indexOf(numeric) + 1];
      const hash =
        url.searchParams.get("h") ||
        (afterId && /^[A-Za-z0-9]+$/.test(afterId) ? afterId : undefined);
      return { provider: "vimeo", id: numeric, hash: hash || undefined };
    }
  }

  return null;
}

/** Build the autoplay and plain embed URLs for a parsed video. */
export function buildVideoEmbed(v: ParsedVideo): VideoEmbed {
  if (v.provider === "youtube") {
    const base = `https://www.youtube-nocookie.com/embed/${v.id}`;
    const common = "controls=1&rel=0&playsinline=1&modestbranding=1";
    return {
      provider: "youtube",
      autoplayUrl: `${base}?autoplay=1&mute=1&loop=1&playlist=${v.id}&${common}`,
      plainUrl: `${base}?${common}`,
    };
  }
  // Vimeo
  const base = `https://player.vimeo.com/video/${v.id}`;
  const h = v.hash ? `&h=${v.hash}` : "";
  return {
    provider: "vimeo",
    autoplayUrl: `${base}?autoplay=1&muted=1&loop=1&controls=1&playsinline=1${h}`,
    plainUrl: `${base}?controls=1&playsinline=1${h}`,
  };
}

/** Convenience: URL string → embed, or null if unrecognized. */
export function videoEmbedFromUrl(url: string): VideoEmbed | null {
  const parsed = parseVideoUrl(url);
  return parsed ? buildVideoEmbed(parsed) : null;
}
