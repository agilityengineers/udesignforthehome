import { cn } from "@/lib/utils";

/**
 * Self-hosted image rendered edge-to-edge inside a sized frame (object-fit: cover).
 * Replaces next/image with a standard <img> tag.
 */
export function CoverImage({
  src,
  alt,
  wrapperClassName,
  priority = false,
}: {
  src: string;
  alt: string;
  wrapperClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-[var(--color-sand)]", wrapperClassName)}>
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}
