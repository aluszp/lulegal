"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Toggle as TogglePrimitive } from "radix-ui"

/* Lu Legal filter tags (Figma: tag – filter, 691:4415): the blog's
   category filters. Square, navy outline and text, Manrope SemiBold
   16px uppercase with 10% tracking (14 tablet, 13 mobile).
   Hover: coral outline and text. Selected (on): coral fill, sky outline,
   white text. 34px tall on mobile (Figma Mobile / blog), 32 from tablet. */
const toggleVariants = cva(
  "inline-flex items-center justify-center border border-navy bg-transparent px-3 py-[7px] md:py-1.5 text-[13px] font-semibold tracking-[0.1em] whitespace-nowrap text-navy uppercase transition-colors duration-300 ease-out outline-none hover:border-coral hover:text-coral focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-navy disabled:pointer-events-none disabled:opacity-50 data-[state=on]:border-sky data-[state=on]:bg-coral data-[state=on]:text-white md:text-sm lg:text-base",
  {
    variants: {
      variant: {
        default: "",
        outline: "",
      },
      size: {
        default: "",
        sm: "",
        lg: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
