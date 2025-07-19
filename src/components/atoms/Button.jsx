import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ 
  children, 
  variant = "primary", 
  size = "md", 
  className,
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-98";
  
  const variants = {
    primary: "bg-primary-500 hover:bg-primary-600 text-white focus:ring-primary-500 shadow-sm hover:shadow-md",
    secondary: "bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 focus:ring-slate-500 shadow-sm hover:shadow-md",
    outline: "border-2 border-primary-500 text-primary-500 hover:bg-primary-50 focus:ring-primary-500",
    ghost: "text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:ring-slate-500",
    danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 shadow-sm hover:shadow-md"
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm rounded-md",
    md: "px-6 py-3 text-sm rounded-lg",
    lg: "px-8 py-4 text-base rounded-lg"
  };
  
  return (
    <button
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;