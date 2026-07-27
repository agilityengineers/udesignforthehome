import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "onLight" | "onDark";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "onLight", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full resize-y border bg-transparent px-4 py-[14px] text-sm leading-[1.5] outline-none transition-colors placeholder:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
          variant === "onDark"
            ? "border-[color-mix(in_srgb,var(--color-cream)_35%,transparent)] text-[var(--color-cream)] placeholder:text-[color-mix(in_srgb,var(--color-cream)_55%,transparent)]"
            : "border-[color-mix(in_srgb,var(--color-ink)_25%,transparent)] text-[var(--color-ink)] placeholder:text-[var(--color-muted)]",
          className,
        )}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
