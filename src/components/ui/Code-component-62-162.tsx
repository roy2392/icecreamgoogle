import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "./utils"

const iceButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-medium font-fredoka transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-lg hover:shadow-xl active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary-hover hover:to-primary shadow-lg shadow-primary/25",
        secondary: "bg-gradient-to-r from-secondary via-accent/50 to-secondary/80 text-secondary-foreground hover:from-secondary/90 hover:to-accent/60 shadow-lg shadow-secondary/20",
        ghost: "bg-gradient-to-r from-accent/20 to-accent/10 text-accent-foreground hover:from-accent/30 hover:to-accent/20 shadow-sm",
        chip: "bg-gradient-to-r from-primary/80 via-accent/60 to-secondary/80 text-white hover:from-primary hover:to-secondary shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 border border-white/20 backdrop-blur-sm"
      },
      size: {
        default: "h-12 px-6 py-3 text-base",
        sm: "h-10 px-4 py-2 text-sm",
        lg: "h-14 px-8 py-4 text-lg",
        icon: "h-12 w-12",
        chip: "h-11 px-5 py-2 text-sm rounded-full"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface IceButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iceButtonVariants> {
  asChild?: boolean
}

const IceButton = React.forwardRef<HTMLButtonElement, IceButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(iceButtonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)
IceButton.displayName = "IceButton"

export { IceButton, iceButtonVariants }