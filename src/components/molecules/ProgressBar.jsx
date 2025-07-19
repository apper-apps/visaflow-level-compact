import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const ProgressBar = ({ steps, currentStep }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isLast = index === steps.length - 1;
          
          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                    isCompleted && "bg-success-500 text-white",
                    isActive && "bg-primary-500 text-white ring-4 ring-primary-100",
                    !isCompleted && !isActive && "bg-slate-200 text-slate-500"
                  )}
                >
                  {isCompleted ? (
                    <ApperIcon name="Check" size={16} />
                  ) : (
                    stepNumber
                  )}
                </div>
                <div className="mt-2 text-center">
                  <p className={cn(
                    "text-xs font-medium",
                    isActive && "text-primary-600",
                    isCompleted && "text-success-600",
                    !isCompleted && !isActive && "text-slate-500"
                  )}>
                    {step.title}
                  </p>
                </div>
              </div>
              
              {!isLast && (
                <div
                  className={cn(
                    "flex-1 h-0.5 mx-4 transition-all duration-300",
                    isCompleted ? "bg-success-500" : "bg-slate-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;