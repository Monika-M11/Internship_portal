import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
const buttonVariants = cva(
  `
    inline-flex items-center justify-center gap-2
    whitespace-nowrap rounded-xl
    text-sm font-medium
    transition-all duration-300
    disabled:pointer-events-none
    disabled:opacity-50
    shrink-0
    outline-none
    focus-visible:ring-2
    focus-visible:ring-offset-2
  `,
  {
    variants: {
      variant: {

        // ─────────────────────────────
        // PRIMARY
        // ─────────────────────────────
        default: `
        bg-[#6B3F69]
  hover:bg-[#5A3559]
  text-white
  shadow-sm
  hover:shadow-md
        `,

        // ─────────────────────────────
        // DESTRUCTIVE
        // ─────────────────────────────
        destructive: `
          bg-[#FFE4E6]
          text-[#E11D48]
          hover:bg-[#FFD5DB]
        `,

        // ─────────────────────────────
        // OUTLINE
        // ─────────────────────────────
        outline: `
          border
          bg-white
         border-[#CBD5E1]
         hover:bg-[#F8FAFC]
          text-[#0F172A]
        `,

        // ─────────────────────────────
        // SECONDARY
        // ─────────────────────────────
        secondary: `
          bg-[#DBEAFE]
          text-[#1D4ED8]
          hover:bg-[#BFDBFE]
          
        `,

        // ─────────────────────────────
        // GHOST
        // ─────────────────────────────
        ghost: `
          text-[#0F172A]
          hover:bg-[#F8FAFC]
        `,

        // ─────────────────────────────
        // LINK
        // ─────────────────────────────
        link: `
          text-[#2563EB]
          underline-offset-4
          hover:underline
        `,
      },

      size: {
        default: `
          h-10
          px-5
          py-2
          text-[15px]
        `,

        sm: `
          h-9
          px-4
          text-sm
        `,

        lg: `
          h-11
          px-7
          text-base
        `,

        icon: `
          size-10
        `,
      },
    },

    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)


function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
