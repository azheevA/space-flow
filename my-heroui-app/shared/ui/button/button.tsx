"use client";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import clsx from "clsx";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger" | "classic";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  asChild?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

const baseStyles =
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-tr from-[#FF1CF7] to-[#b249f8] text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary:
    "bg-gradient-to-r from-cyan-500 to-violet-600 text-gray-900 hover:bg-gray-300 focus:ring-gray-400",
  outline:
    "border border-gray-300 text-gray-900 hover:bg-gray-100 focus:ring-gray-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  classic: "bg-black text-white focus:ring-white border border-white",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      asChild = false,
      iconLeft,
      iconRight,
      className,
      disabled,
      ...rest
    } = props;

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        disabled={!asChild ? disabled || loading : undefined}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...rest}
      >
        {loading && (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        )}

        {!loading && iconLeft && (
          <span className="flex items-center">{iconLeft}</span>
        )}

        <span>{children}</span>

        {!loading && iconRight && (
          <span className="flex items-center">{iconRight}</span>
        )}
      </Comp>
    );
  },
);

Button.displayName = "Button";
