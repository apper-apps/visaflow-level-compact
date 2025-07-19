import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { cn } from "@/utils/cn";

const ValidationMessage = ({ validation, onBypass, showBypass = true }) => {
  const { field, message, severity } = validation;
  
  const severityConfig = {
    error: {
      icon: "AlertCircle",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      iconColor: "text-red-500",
      textColor: "text-red-800"
    },
    warning: {
      icon: "AlertTriangle",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
      iconColor: "text-amber-500",
      textColor: "text-amber-800"
    }
  };
  
  const config = severityConfig[severity] || severityConfig.error;
  
  return (
    <div className={cn(
      "flex items-start space-x-3 p-4 rounded-lg border",
      config.bgColor,
      config.borderColor
    )}>
      <ApperIcon 
        name={config.icon} 
        className={cn("w-5 h-5 mt-0.5", config.iconColor)} 
      />
      <div className="flex-1">
        <p className={cn("text-sm font-medium", config.textColor)}>
          {message}
        </p>
        {field && (
          <p className="text-xs text-slate-600 mt-1">
            Field: {field}
          </p>
        )}
      </div>
      {showBypass && validation.allowBypass && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onBypass?.(validation)}
          className="text-xs"
        >
          Continue Anyway
        </Button>
      )}
    </div>
  );
};

export default ValidationMessage;