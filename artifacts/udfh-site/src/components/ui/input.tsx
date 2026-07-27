import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "onLight" | "onDark";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "onLight", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full border bg-transparent px-4 py-[14px] text-sm outline-none transition-colors placeholder:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]",
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
Input.displayName = "Input";

export { Input };
