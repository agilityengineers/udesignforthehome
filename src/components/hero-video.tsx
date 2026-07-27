"use client";

import { useEffect, useState } from "react";
import type { VideoEmbed } from "@/lib/video";

/**
 * 16:9 hero video embed (YouTube/Vimeo). Autoplays muted + looped with native
 * controls by default, but:
 *   - honors prefers-reduced-motion (no autoplay — the visitor presses play),
 *   - only mounts the iframe after hydration, showing a poster first, so there's
 *     no SSR/client mismatch and the heavy embed never blocks first paint.
 */
export function HeroVideo({
  embed,
  title,
}: {
  embed: VideoEmbed;
  title: string;
}) {
  const [mounted, setMounted] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    setMounted(true);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  return (
    <div className="relative aspect-video w-full overflow-hidden border border-cream/15 bg-ink">
      {mounted ? (
        <iframe
          src={reduced ? embed.plainUrl : embed.autoplayUrl}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      ) : (
        // Poster shown during SSR / before hydration.
        <div className="absolute inset-0 flex items-center justify-center bg-ink">
          <span
            aria-hidden
            className="flex h-16 w-16 items-center justify-center rounded-full border border-cream/40 text-cream/80"
          >
            <svg width="20" height="24" viewBox="0 0 20 24" fill="currentColor">
              <path d="M0 0 L20 12 L0 24 Z" />
            </svg>
          </span>
          <span className="sr-only">Loading video…</span>
        </div>
      )}
    </div>
  );
}
