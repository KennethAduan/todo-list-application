import * as React from "react";
import { cn } from "../utils";

export interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "error" | "success";
  inputSize?: "sm" | "default" | "lg";
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      className,
      type = "text",
      error,
      helperText,
      leftIcon,
      rightIcon,
      variant = "default",
      inputSize = "default",
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "flex w-full rounded-md border border-[hsl(var(--color-border))] bg-[hsl(var(--color-background))] text-[hsl(var(--color-foreground))] ring-offset-[hsl(var(--color-background))] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[hsl(var(--color-muted-foreground))] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--color-ring))] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors";

    const variants = {
      default: "focus-visible:border-[hsl(var(--color-ring))]",
      error:
        "border-[hsl(var(--color-destructive))] focus-visible:border-[hsl(var(--color-destructive))] focus-visible:ring-[hsl(var(--color-destructive))]",
      success:
        "border-[hsl(var(--color-primary))] focus-visible:border-[hsl(var(--color-primary))] focus-visible:ring-[hsl(var(--color-primary))]",
    };

    const sizes = {
      sm: "h-8 px-3 text-xs",
      default: "h-10 px-3 py-2 text-sm",
      lg: "h-12 px-4 py-3 text-base",
    };

    const iconSizes = {
      sm: "h-4 w-4",
      default: "h-4 w-4",
      lg: "h-5 w-5",
    };

    const combinedClassName = cn(
      baseStyles,
      variants[variant],
      sizes[inputSize],
      leftIcon && "pl-10",
      rightIcon && "pr-10",
      className
    );

    const iconClassName = cn(
      "absolute top-1/2 -translate-y-1/2 text-[hsl(var(--color-muted-foreground))]",
      iconSizes[inputSize]
    );

    return (
      <div className="w-full space-y-2">
        <div className="relative">
          {leftIcon && (
            <div className={cn(iconClassName, "left-3")}>{leftIcon}</div>
          )}

          <input
            type={type}
            className={combinedClassName}
            ref={ref}
            disabled={disabled}
            {...props}
          />

          {rightIcon && (
            <div className={cn(iconClassName, "right-3")}>{rightIcon}</div>
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

InputField.displayName = "InputField";

export { InputField };
