import * as React from "react";
import { cn } from "@/lib/utils";

/** Uppercase, tracked field label matching the CMS form styling. */
const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-[11px] uppercase tracking-[0.16em] text-muted",
      className,
    )}
    {...props}
  />
));
Label.displayName = "Label";

export { Label };
