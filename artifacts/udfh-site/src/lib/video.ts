export type VideoProvider = "youtube" | "vimeo";

export type ParsedVideo = {
  provider: VideoProvider;
  id: string;
  hash?: string;
};

export type VideoEmbed = {
  provider: VideoProvider;
  autoplayUrl: string;
  plainUrl: string;
};

export function parseVideoUrl(rawUrl: string): ParsedVideo | null {
  let url: URL;
  try {
    url = new URL(rawUrl.trim());
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "");
  const parts = url.pathname.split("/").filter(Boolean);

  if (host === "youtube.com" || host === "youtu.be" || host === "youtube-nocookie.com") {
    const id =
      url.searchParams.get("v") ||
      (host === "youtu.be" ? parts[0] : null) ||
      (parts[0] === "embed" ? parts[1] : null) ||
      (parts[0] === "shorts" ? parts[1] : null);
    if (id) return { provider: "youtube", id };
  }

  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const numeric = parts.find((p) => /^\d+$/.test(p));
    if (numeric) {
      const afterId = parts[parts.indexOf(numeric) + 1];
      const hash =
        url.searchParams.get("h") ||
        (afterId && /^[A-Za-z0-9]+$/.test(afterId) ? afterId : undefined);
      return { provider: "vimeo", id: numeric, hash: hash || undefined };
    }
  }

  return null;
}

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
  const base = `https://player.vimeo.com/video/${v.id}`;
  const h = v.hash ? `&h=${v.hash}` : "";
  return {
    provider: "vimeo",
    autoplayUrl: `${base}?autoplay=1&muted=1&loop=1&controls=1&playsinline=1${h}`,
    plainUrl: `${base}?controls=1&playsinline=1${h}`,
  };
}

export function videoEmbedFromUrl(url: string): VideoEmbed | null {
  const parsed = parseVideoUrl(url);
  return parsed ? buildVideoEmbed(parsed) : null;
}
