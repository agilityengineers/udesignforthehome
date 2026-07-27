import { useEffect, useRef, useState } from "react";
import type { VideoEmbed } from "@/lib/video";

/**
 * 16:9 iframe embed for the hero video layout.
 * Uses the autoplay URL when prefers-reduced-motion is not set.
 */
export function HeroVideo({ embed, title }: { embed: VideoEmbed; title: string }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const src = prefersReducedMotion ? embed.plainUrl : embed.autoplayUrl;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ paddingBottom: "56.25%" /* 16:9 */ }}
    >
      <iframe
        ref={iframeRef}
        src={src}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  );
}
