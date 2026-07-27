import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold uppercase tracking-wide transition-colors cursor-pointer disabled:pointer-events-none disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        accent: "bg-[var(--color-accent)] text-[var(--color-cream)] hover:bg-[var(--color-cream)] hover:text-[var(--color-ink)]",
        accentInk: "bg-[var(--color-accent)] text-[var(--color-cream)] hover:bg-[var(--color-ink)]",
        outline: "border border-[color-mix(in_srgb,var(--color-ink)_30%,transparent)] text-[var(--color-muted)] hover:border-[var(--color-ink)] hover:text-[var(--color-ink)] bg-transparent",
        ghostAccent: "border border-[var(--color-accent)] text-[var(--color-accent)] bg-transparent hover:bg-[var(--color-accent)] hover:text-[var(--color-cream)]",
        text: "bg-transparent text-[var(--color-muted)] hover:text-[var(--color-ink)]",
        ghost: "bg-transparent text-[var(--color-ink)] hover:bg-[color-mix(in_srgb,var(--color-ink)_8%,transparent)]",
      },
      size: {
        default: "px-8 py-4 text-[13px]",
        sm: "px-5 py-[9px] text-[11px] tracking-wide",
        admin: "px-8 py-[15px] text-xs tracking-wide",
        icon: "h-9 w-9 p-0",
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
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
