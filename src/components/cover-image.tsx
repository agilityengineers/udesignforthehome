import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Self-hosted image rendered edge-to-edge inside a sized frame (object-fit:
 * cover), matching the design's fixed-height image slots. Replaces the
 * prototype image-slot.js drag-drop mechanism with next/image.
 */
export function CoverImage({
  src,
  alt,
  wrapperClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: {
  src: string;
  alt: string;
  wrapperClassName?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-sand", wrapperClassName)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
    </div>
  );
}
