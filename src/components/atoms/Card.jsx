import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Card = forwardRef(({ 
  children,
  variant = "default",
  hover = false,
  className,
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-xl border transition-all duration-200";
  
  const variants = {
    default: "border-slate-200 shadow-sm",
    elevated: "border-slate-200 shadow-md",
    outlined: "border-slate-300 shadow-none"
  };
  
  const hoverStyles = hover 
    ? "hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 cursor-pointer" 
    : "";
  
  return (
    <div
      ref={ref}
      className={cn(
        baseStyles,
        variants[variant],
        hoverStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;