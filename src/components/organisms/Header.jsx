import { useLocation } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import ProgressBar from "@/components/molecules/ProgressBar";

const Header = () => {
  const location = useLocation();
  
  const steps = [
    { id: "home", title: "Start", path: "/" },
    { id: "selection", title: "Select Visa", path: "/visa-selection" },
    { id: "application", title: "Application", path: "/application" },
    { id: "validation", title: "Validation", path: "/validation-review" },
    { id: "review", title: "Review", path: "/application-review" },
    { id: "document", title: "Generate", path: "/document-generation" }
  ];
  
  const getCurrentStep = () => {
    const path = location.pathname;
    if (path === "/") return 1;
    if (path === "/visa-selection") return 2;
    if (path.startsWith("/application")) return 3;
    if (path === "/validation-review") return 4;
    if (path === "/application-review") return 5;
    if (path === "/document-generation") return 6;
    return 1;
  };
  
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <ApperIcon name="FileCheck" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">VisaFlow Pro</h1>
                <p className="text-xs text-slate-500">Immigration Automation Platform</p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <ApperIcon name="Shield" className="w-4 h-4" />
              <span>Demo Mode</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <ApperIcon name="Clock" className="w-4 h-4" />
              <span>Auto-save enabled</span>
            </div>
          </div>
        </div>
        
        {location.pathname !== "/" && (
          <div className="pb-4">
            <ProgressBar steps={steps} currentStep={getCurrentStep()} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;