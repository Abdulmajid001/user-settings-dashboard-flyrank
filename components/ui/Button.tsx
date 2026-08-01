import * as React from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", isLoading, children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]"
    
    const variants = {
      default: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-md shadow-violet-500/20 hover:shadow-violet-500/40 border border-transparent",
      destructive: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
      outline: "border-2 border-slate-200 bg-transparent hover:border-violet-200 hover:bg-violet-50 text-slate-900 dark:border-slate-800 dark:hover:bg-slate-800 dark:text-slate-100",
      secondary: "bg-violet-100 text-violet-900 hover:bg-violet-200 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-violet-800",
      ghost: "hover:bg-violet-100 hover:text-violet-900 dark:hover:bg-slate-800 dark:hover:text-slate-100 text-slate-700",
      link: "text-violet-600 underline-offset-4 hover:underline",
    }

    const sizes = {
      default: "h-11 px-6 py-2",
      sm: "h-9 rounded-md px-4",
      lg: "h-12 rounded-xl px-8",
      icon: "h-11 w-11",
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
