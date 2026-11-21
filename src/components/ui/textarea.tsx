import * as React from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "cn"

import { inputVariants } from "@/components/ui/input"

/* The input field's look (see input.tsx), 200px tall and resizable
   vertically: "W czym możemy Ci pomóc?" in the contact form. */
function Textarea({
  className,
  tone,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof inputVariants>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(inputVariants({ tone }), "h-[200px] resize-y", className)}
      {...props}
    />
  )
}

export { Textarea }
