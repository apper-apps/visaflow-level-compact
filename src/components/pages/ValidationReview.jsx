import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ValidationMessage from "@/components/molecules/ValidationMessage";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import useApplicationData from "@/hooks/useApplicationData";
import applicationService from "@/services/api/applicationService";

const ValidationReview = () => {
  const navigate = useNavigate();
  const { applicationData, updateApplicationData } = useApplicationData();
  const [validationResult, setValidationResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bypassedErrors, setBypassedErrors] = useState([]);
  
  useEffect(() => {
    if (!applicationData.submittedAt) {
      navigate("/application/482");
      return;
    }
    
    const validateApplication = async () => {
      try {
        setLoading(true);
        setError("");
        
        const result = await applicationService.validateApplication(applicationData);
        setValidationResult(result);
        
        updateApplicationData({
          validationErrors: result.errors,
          status: result.isValid ? "validated" : "requires_review"
        });
        
      } catch (err) {
        setError("Validation service is currently unavailable. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    validateApplication();
  }, [applicationData, updateApplicationData, navigate]);
  
  const handleBypassError = (validation) => {
    setBypassedErrors(prev => [...prev, validation.field]);
    toast.info(`Validation bypassed for ${validation.field} (Demo Mode)`);
  };
  
  const handleProceedToReview = () => {
    const remainingErrors = validationResult.errors.filter(
      error => !bypassedErrors.includes(error.field)
    );
    
    if (remainingErrors.length > 0) {
      toast.warning("Please address all validation issues or bypass them to continue");
      return;
    }
    
    updateApplicationData({
      status: "ready_for_review",
      validationBypass: bypassedErrors.length > 0 ? bypassedErrors : null
    });
    
    toast.success("Validation complete - proceeding to review");
    navigate("/application-review");
  };
  
  const handleEditApplication = () => {
    navigate("/application/482");
  };
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Validating Application
          </h1>
          <p className="text-lg text-slate-600">
            Our system is checking your application for completeness and accuracy...
          </p>
        </div>
        <Card className="p-8">
          <Loading />
          <div className="text-center mt-6">
            <p className="text-slate-600">This may take a few moments...</p>
          </div>
        </Card>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Error 
          title="Validation Failed"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }
  
  const errorCount = validationResult?.errors?.filter(e => e.severity === "error")?.length || 0;
  const warningCount = validationResult?.errors?.filter(e => e.severity === "warning")?.length || 0;
  const remainingIssues = validationResult?.errors?.filter(e => !bypassedErrors.includes(e.field)) || [];
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Application Validation Results
        </h1>
        <p className="text-lg text-slate-600">
          Review the validation results below. For demonstration purposes, 
          you can bypass any issues to continue the process.
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card className={`p-6 ${
          validationResult?.isValid 
            ? "bg-gradient-to-r from-success-50 to-green-50 border-success-200" 
            : "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200"
        }`}>
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              validationResult?.isValid 
                ? "bg-success-500" 
                : "bg-amber-500"
            }`}>
              <ApperIcon 
                name={validationResult?.isValid ? "CheckCircle" : "AlertTriangle"} 
                className="w-6 h-6 text-white" 
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {validationResult?.isValid 
                  ? "Application Passed Validation ✓" 
                  : "Issues Found in Application"
                }
              </h3>
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="AlertCircle" className="w-4 h-4 text-red-500" />
                  <span className="text-slate-700">{errorCount} Errors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="AlertTriangle" className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-700">{warningCount} Warnings</span>
                </div>
                {bypassedErrors.length > 0 && (
                  <div className="flex items-center space-x-2">
                    <ApperIcon name="SkipForward" className="w-4 h-4 text-blue-500" />
                    <span className="text-slate-700">{bypassedErrors.length} Bypassed</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-slate-600">
              <ApperIcon name="Settings" className="w-4 h-4" />
              <span>Demo Mode</span>
            </div>
          </div>
        </Card>
      </motion.div>
      
      {validationResult?.errors && validationResult.errors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              Validation Issues
            </h3>
            <div className="space-y-4">
              {validationResult.errors.map((validation, index) => (
                <ValidationMessage
                  key={index}
                  validation={validation}
                  onBypass={handleBypassError}
                  showBypass={!bypassedErrors.includes(validation.field)}
                />
              ))}
            </div>
          </Card>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-8"
      >
        <Card className="p-6 bg-slate-50">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <ApperIcon name="Info" className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900 mb-2">
                Demo Mode Information
              </h4>
              <p className="text-slate-600 text-sm mb-3">
                In this demonstration, validation errors do not prevent you from proceeding. 
                In a production environment, critical errors would need to be resolved before advancement.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  Validation Bypass Available
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  Demo Environment
                </span>
                <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                  Educational Purpose
                </span>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="flex items-center justify-between"
      >
        <Button
          variant="secondary"
          onClick={handleEditApplication}
        >
          <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
          Edit Application
        </Button>
        
        <div className="flex space-x-3">
          <Button
            variant="primary"
            onClick={handleProceedToReview}
            disabled={remainingIssues.length > 0}
            className={remainingIssues.length === 0 
              ? "bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700" 
              : ""
            }
          >
            {remainingIssues.length === 0 ? (
              <>
                <ApperIcon name="ArrowRight" className="w-4 h-4 mr-2" />
                Proceed to Review
              </>
            ) : (
              <>
                <ApperIcon name="Clock" className="w-4 h-4 mr-2" />
                Address Issues First
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ValidationReview;