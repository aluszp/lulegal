import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Slot } from "radix-ui"

/* Lu Legal category tags (Figma: tag, 691:4415). Square, Manrope
   SemiBold, uppercase. As a link (<Badge asChild><a/></Badge>) they get
   the hover of the design.
   - card: on blog cards – sky with navy text, 16px, 10% tracking; coral on hover
   - post: in a post's hero – coral with white text, 20px, 5% tracking;
           lighter coral on hover */
const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center whitespace-nowrap font-semibold uppercase transition-colors duration-300 ease-out outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
  {
    variants: {
      variant: {
        card: "bg-sky px-2 py-1 text-[13px] tracking-[0.1em] text-navy md:text-sm lg:text-base [a]:hover:bg-coral [a]:hover:text-white",
        post: "bg-coral px-3 py-1.5 text-base tracking-[0.05em] text-white md:text-lg lg:text-xl [a]:hover:bg-coral-hover",
      },
    },
    defaultVariants: {
      variant: "card",
    },
  }
)

function Badge({
  className,
  variant = "card",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
