import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

/* Lu Legal input fields (Figma: Input field, 786:6305). 56px tall, a
   single underline, Manrope Medium 20px (18 tablet, 16 mobile). The
   underline turns coral on hover and focus, and focus lightens the fill.
   - dark:  on navy (the contact form) – white at 10%, white underline
   - light: on sky (the blog search) – white at 60%, navy underline */
const inputVariants = cva(
  "block h-14 w-full min-w-0 rounded-none border-0 border-b px-4 py-3.5 text-base font-medium transition-[background-color,border-color] duration-200 ease-out outline-none hover:border-coral focus-visible:border-coral disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive md:text-lg lg:text-xl",
  {
    variants: {
      tone: {
        dark: "border-white bg-white/10 text-white placeholder:text-white/60 focus-visible:bg-white/20",
        light:
          "border-navy bg-white/60 text-navy placeholder:text-muted-foreground focus-visible:bg-white/80",
      },
    },
    defaultVariants: {
      tone: "dark",
    },
  }
)

function Input({
  className,
  type,
  tone,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ tone }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
