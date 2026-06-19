import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.96]",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:from-violet-700 hover:to-indigo-700 shadow-md hover:shadow-xl hover:shadow-violet-200",
        secondary:
          "bg-violet-50 text-violet-700 hover:bg-violet-100 hover:text-violet-800",
        outline:
          "border-2 border-violet-200 text-violet-700 hover:border-violet-400 hover:bg-violet-50",
        ghost:
          "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
        danger:
          "bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:from-rose-700 hover:to-pink-700 shadow-md hover:shadow-xl hover:shadow-rose-200",
      },
      size: {
        sm: "h-9 px-4 text-xs gap-1.5",
        md: "h-11 px-5 text-sm gap-2",
        lg: "h-13 px-7 text-base gap-2",
        xl: "h-15 px-9 text-lg gap-2.5",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant,
      size,
      isLoading = false,
      fullWidth = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={buttonVariants({
          variant,
          size,
          class: [fullWidth ? "w-full" : "", className].join(" "),
        })}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
