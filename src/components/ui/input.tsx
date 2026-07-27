import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Flat input: 1px hairline border, transparent background, accent focus ring.
 * Pass `variant="onDark"` for inputs over the charcoal booking section.
 */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "onLight" | "onDark";
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = "onLight", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "w-full border bg-transparent px-4 py-[14px] text-sm outline-none transition-colors placeholder:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          variant === "onDark"
            ? "border-cream/35 text-cream placeholder:text-cream/55"
            : "border-ink/25 text-ink placeholder:text-muted",
          className,
        )}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
