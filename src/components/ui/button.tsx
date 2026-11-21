import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

/* Lu Legal buttons (Figma: Button component set, 641:3025). A pill,
   Manrope Medium with 2% tracking; 48px tall with 20px text on desktop,
   44 / 18 on tablet, 40 / 16 on mobile.
   - default: coral, lighter coral (#ff8e7e) on hover ("Napisz do nas")
   - outline: navy outline, filled navy with white text on hover ("Czytaj dalej")
   - inverse: the outline for navy backgrounds (white)
   - link:    plain text link that turns coral on hover (nav, footer)
   - ghost:   kept for shadcn's own parts (e.g. the sheet's close button) */
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-transparent font-medium tracking-[0.02em] whitespace-nowrap transition-[background-color,color,border-color] duration-300 ease-out outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-current disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-coral-hover focus-visible:bg-coral-hover focus-visible:outline-coral",
        outline:
          "border-navy bg-transparent text-navy hover:bg-navy hover:text-white focus-visible:bg-navy focus-visible:text-white",
        inverse:
          "border-white bg-transparent text-white hover:bg-white hover:text-navy focus-visible:bg-white focus-visible:text-navy",
        link: "h-auto rounded-none border-0 px-0 text-current hover:text-coral focus-visible:text-coral",
        ghost: "text-current hover:bg-navy/10",
      },
      size: {
        default:
          "h-10 px-5 text-base md:h-11 md:px-6 md:text-lg lg:h-12 lg:text-xl",
        sm: "h-10 px-5 text-base",
        icon: "size-10",
        "icon-sm": "size-8",
      },
    },
    // a link is just its text: no button height or padding at any size
    compoundVariants: [{ variant: "link", class: "h-auto px-0 md:h-auto md:px-0 lg:h-auto" }],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
