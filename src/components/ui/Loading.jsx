import { cn } from "@/utils/cn";

const Loading = ({ variant = "skeleton", className }) => {
  if (variant === "spinner") {
    return (
      <div className={cn("flex items-center justify-center p-8", className)}>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  // Skeleton loader for forms
  return (
    <div className={cn("animate-pulse space-y-6", className)}>
      <div className="space-y-4">
        <div className="h-4 bg-slate-200 rounded w-1/4"></div>
        <div className="h-12 bg-slate-200 rounded"></div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="h-12 bg-slate-200 rounded"></div>
      </div>
      <div className="space-y-4">
        <div className="h-4 bg-slate-200 rounded w-1/5"></div>
        <div className="h-12 bg-slate-200 rounded"></div>
      </div>
      <div className="flex space-x-4">
        <div className="h-12 bg-slate-200 rounded flex-1"></div>
        <div className="h-12 bg-slate-200 rounded w-32"></div>
      </div>
    </div>
  );
};

export default Loading;