import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "onLight" | "onDark";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "onLight", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full resize-y border bg-transparent px-4 py-[14px] text-sm leading-[1.5] outline-none transition-colors placeholder:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
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
Textarea.displayName = "Textarea";

export { Textarea };
