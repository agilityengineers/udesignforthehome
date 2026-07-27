import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Flat, editorial button. No radius, no shadow (enforced by the Tailwind theme).
 * Variants map to the design's button styles; hovers invert colors.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold uppercase tracking-wide transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
  {
    variants: {
      variant: {
        // Solid accent → inverts to cream/ink on hover.
        accent: "bg-accent text-cream hover:bg-cream hover:text-ink",
        // Solid accent → inverts to ink on hover (admin buttons on sand bg).
        accentInk: "bg-accent text-cream hover:bg-ink",
        // 1px ghost outline on light → fills ink on hover.
        outline:
          "border border-ink/30 text-muted hover:border-ink hover:text-ink bg-transparent",
        // Ghost accent outline (admin "Refresh"): fills accent on hover.
        ghostAccent:
          "border border-accent text-accent bg-transparent hover:bg-accent hover:text-cream",
        // Bare text button (admin "Delete" / "Sign Out").
        text: "bg-transparent text-muted hover:text-ink",
      },
      size: {
        default: "px-8 py-4 text-[13px]",
        sm: "px-5 py-[9px] text-[11px] tracking-wide",
        admin: "px-8 py-[15px] text-xs tracking-wide",
      },
    },
    defaultVariants: {
      variant: "accent",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
