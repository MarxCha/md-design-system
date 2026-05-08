"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/*
 * Button matched to pieterkoopt.nl tokens (extracted from Firecrawl branding scrape):
 *   primary:   bg #171C1C, text #D4C6B9, radius ~3px → bumped to 6px for MD DS scale
 *   secondary: bg #7A8B69, text #171C1C
 *
 * shadcn-compatible API (variant, size, asChild) so it slots cleanly into the
 * MD Design System without a custom adapter.
 */

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-button)] text-sm font-medium font-[family-name:var(--font-body)] transition-[background-color,color,box-shadow] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-cream)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-canvas)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-[color:var(--color-ink)] text-[color:var(--color-cream)] hover:bg-[color:var(--color-ink)]/85",
        secondary:
          "bg-[color:var(--color-cream)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-cream-soft)]",
        olive:
          "bg-[color:var(--color-canvas-2)] text-[color:var(--color-ink)] hover:bg-[color:var(--color-canvas-2)]/85",
        ghost:
          "bg-transparent text-[color:var(--color-ink)] hover:bg-[color:var(--color-ink)]/10",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-13 px-8 text-base",
        pill: "h-12 px-7 rounded-[var(--radius-pill)]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
