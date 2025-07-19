import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(({ 
  type = "text",
  className,
  error,
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        "w-full px-4 py-3 border border-slate-300 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:bg-slate-50 disabled:text-slate-500",
        error && "border-red-500 focus:ring-red-500 focus:border-red-500",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";

export default Input;