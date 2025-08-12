import * as React from "react";
import { cn } from "../utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "error" | "success";
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      className,
      children,
      required = false,
      size = "default",
      variant = "default",
      ...props
    },
    ref
  ) => {
    const sizes = {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    };

    const variants = {
      default: "text-[hsl(var(--color-foreground))]",
      error: "text-[hsl(var(--color-destructive))]",
      success: "text-[hsl(var(--color-primary))]",
    };

    const combinedClassName = cn(
      "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      sizes[size],
      variants[variant],
      className
    );

    return (
      <label className={combinedClassName} ref={ref} {...props}>
        {children}
        {required && (
          <span className="ml-1 text-[hsl(var(--color-destructive))]">*</span>
        )}
      </label>
    );
  }
);

Label.displayName = "Label";

export { Label };
