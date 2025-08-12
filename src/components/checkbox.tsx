import * as React from "react";
import { cn } from "../utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  checkboxSize?: "sm" | "default" | "lg";
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      label,
      error,
      helperText,
      checkboxSize = "default",
      disabled,
      ...props
    },
    ref
  ) => {
    const checkboxId = React.useId();

    const sizes = {
      sm: "h-4 w-4",
      default: "h-4 w-4",
      lg: "h-5 w-5",
    };

    const labelSizes = {
      sm: "text-xs",
      default: "text-sm",
      lg: "text-base",
    };

    const baseStyles =
      "peer h-4 w-4 shrink-0 rounded-sm border border-[hsl(var(--color-border))] ring-offset-[hsl(var(--color-background))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[hsl(var(--color-primary))] data-[state=checked]:text-[hsl(var(--color-primary-foreground))] data-[state=checked]:border-[hsl(var(--color-primary))]";

    const combinedClassName = cn(baseStyles, sizes[checkboxSize], className);

    return (
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id={checkboxId}
            className={combinedClassName}
            ref={ref}
            disabled={disabled}
            {...props}
          />

          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                labelSizes[checkboxSize]
              )}
            >
              {label}
            </label>
          )}
        </div>

        {(error || helperText) && (
          <div className="text-sm">
            {error && (
              <p className="text-[hsl(var(--color-destructive))]">{error}</p>
            )}
            {helperText && !error && (
              <p className="text-[hsl(var(--color-muted-foreground))]">
                {helperText}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
