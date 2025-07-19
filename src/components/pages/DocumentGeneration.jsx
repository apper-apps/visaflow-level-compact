import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import ApperIcon from "@/components/ApperIcon";
import useApplicationData from "@/hooks/useApplicationData";
import applicationService from "@/services/api/applicationService";

const DocumentGeneration = () => {
  const navigate = useNavigate();
  const { applicationData, clearApplicationData } = useApplicationData();
  const [pdfData, setPdfData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  useEffect(() => {
    if (!applicationData.approvedAt) {
      navigate("/application-review");
      return;
    }
    
    const generatePDF = async () => {
      try {
        setLoading(true);
        setError("");
        
        const result = await applicationService.generatePDF(applicationData);
        setPdfData(result.pdf);
        
        toast.success("VISA 482 application form generated successfully!");
        
      } catch (err) {
        setError("Failed to generate PDF document. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    generatePDF();
  }, [applicationData, navigate]);
  
  const handleDownload = () => {
    // In a real app, this would trigger an actual download
    toast.success("PDF download started (Demo Mode)");
  };
  
  const handleStartNewApplication = () => {
    clearApplicationData();
    navigate("/");
  };
  
  const handleViewPortal = () => {
    navigate("/");
  };
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Generating Documents
          </h1>
          <p className="text-lg text-slate-600">
            Creating your VISA 482 application form with submitted information...
          </p>
        </div>
        <Card className="p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            </div>
          </div>
          <div className="text-center space-y-3">
            <p className="text-slate-600">Populating official VISA 482 form...</p>
            <p className="text-slate-600">Validating document structure...</p>
            <p className="text-slate-600">Finalizing PDF generation...</p>
          </div>
        </Card>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Error 
          title="Document Generation Failed"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-success-500 to-success-600 rounded-2xl mb-6">
          <ApperIcon name="FileCheck" className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Documents Generated Successfully!
        </h1>
        <p className="text-lg text-slate-600">
          Your VISA 482 application form is ready for submission to the Department of Immigration
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card className="p-8 bg-gradient-to-br from-success-50 to-green-50 border-success-200">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Generated Document
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="FileText" className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-700">{pdfData?.fileName}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ApperIcon name="HardDrive" className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-700">File Size: {pdfData?.size}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ApperIcon name="BookOpen" className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-700">{pdfData?.pages} pages</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ApperIcon name="Calendar" className="w-5 h-5 text-slate-500" />
                  <span className="text-slate-700">
                    Generated: {new Date(pdfData?.generatedAt).toLocaleDateString("en-AU")}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Application Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Applicant:</span>
                  <span className="font-medium text-slate-900">{applicationData.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Visa Type:</span>
                  <span className="font-medium text-slate-900">482 (TSS)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Employer:</span>
                  <span className="font-medium text-slate-900">{applicationData.employerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Status:</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800">
                    <ApperIcon name="CheckCircle" className="w-3 h-3 mr-1" />
                    Ready for Submission
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-8"
      >
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">
            PDF Document Preview
          </h3>
          <div className="bg-slate-100 rounded-lg p-8 text-center border-2 border-dashed border-slate-300">
            <div className="w-16 h-20 bg-white border border-slate-300 rounded mx-auto mb-4 flex items-center justify-center">
              <ApperIcon name="FileText" className="w-8 h-8 text-slate-400" />
            </div>
            <h4 className="font-medium text-slate-900 mb-2">
              Australian Government Department of Immigration
            </h4>
            <p className="text-sm text-slate-600 mb-1">
              Temporary Skill Shortage (TSS) visa - Subclass 482
            </p>
            <p className="text-xs text-slate-500">
              Application form populated with submitted data
            </p>
          </div>
          <div className="mt-4 flex justify-center">
            <Button onClick={handleDownload} variant="outline">
              <ApperIcon name="Download" className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-8"
      >
        <Card className="p-6 bg-primary-50 border-primary-200">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <ApperIcon name="Lightbulb" className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-slate-900 mb-2">
                What Happens Next?
              </h4>
              <div className="space-y-2 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Check" className="w-4 h-4 text-success-500" />
                  <span>Download and review the generated application form</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Check" className="w-4 h-4 text-success-500" />
                  <span>Submit the form to the Department of Immigration</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Check" className="w-4 h-4 text-success-500" />
                  <span>Track application progress through official channels</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Check" className="w-4 h-4 text-success-500" />
                  <span>Receive notification of decision from immigration department</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center space-y-4"
      >
        <div className="flex justify-center space-x-4">
          <Button onClick={handleDownload} variant="primary" size="lg">
            <ApperIcon name="Download" className="w-5 h-5 mr-2" />
            Download Application Form
          </Button>
          <Button onClick={handleStartNewApplication} variant="secondary" size="lg">
            <ApperIcon name="Plus" className="w-5 h-5 mr-2" />
            Start New Application
          </Button>
        </div>
        
        <p className="text-sm text-slate-500">
          Demo completed successfully! This showcases the complete automation workflow 
          from visa selection to document generation.
        </p>
        
        <Button onClick={handleViewPortal} variant="ghost">
          <ApperIcon name="Home" className="w-4 h-4 mr-2" />
          Return to Portal Home
        </Button>
      </motion.div>
    </div>
  );
};

export default DocumentGeneration;