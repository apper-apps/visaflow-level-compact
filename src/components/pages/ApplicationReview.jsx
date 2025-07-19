import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import useApplicationData from "@/hooks/useApplicationData";
import applicationService from "@/services/api/applicationService";

const ApplicationReview = () => {
  const navigate = useNavigate();
  const { applicationData, updateApplicationData } = useApplicationData();
  const [isApproving, setIsApproving] = useState(false);
  
  const handleApprove = async () => {
    try {
      setIsApproving(true);
      
      const result = await applicationService.approveApplication(applicationData);
      
      updateApplicationData({
        status: "approved",
        approvedAt: new Date().toISOString()
      });
      
      toast.success("Application approved! Generating final documents...");
      navigate("/document-generation");
      
    } catch (error) {
      toast.error("Failed to approve application. Please try again.");
    } finally {
      setIsApproving(false);
    }
  };
  
  const handleEdit = () => {
    navigate("/application/482");
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    return new Date(dateString).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };
  
  const formatSalary = (salary) => {
    if (!salary) return "Not provided";
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      minimumFractionDigits: 0
    }).format(salary);
  };
  
  const getDocumentsByType = (type) => {
    return applicationData.documents?.filter(doc => doc.type === type) || [];
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Application Review & Approval
        </h1>
        <p className="text-lg text-slate-600">
          Review all submitted information before final approval and document generation
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-8"
      >
        <Card className="p-6 bg-gradient-to-r from-primary-50 to-blue-50 border-primary-200">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
              <ApperIcon name="FileCheck" className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                VISA 482 Application Summary
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-slate-600">Applicant:</span>
                  <p className="font-medium text-slate-900">{applicationData.fullName || "Not provided"}</p>
                </div>
                <div>
                  <span className="text-slate-600">Visa Type:</span>
                  <p className="font-medium text-slate-900">Temporary Skill Shortage (482)</p>
                </div>
                <div>
                  <span className="text-slate-600">Status:</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    <ApperIcon name="Clock" className="w-3 h-3 mr-1" />
                    Pending Approval
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-6 h-full">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <ApperIcon name="User" className="w-5 h-5 mr-2 text-primary-500" />
              Personal Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Full Name:</span>
                <span className="font-medium text-slate-900">{applicationData.fullName || "Not provided"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Date of Birth:</span>
                <span className="font-medium text-slate-900">{formatDate(applicationData.dateOfBirth)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Nationality:</span>
                <span className="font-medium text-slate-900">{applicationData.nationality || "Not provided"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Passport Number:</span>
                <span className="font-medium text-slate-900">{applicationData.passportNumber || "Not provided"}</span>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-6 h-full">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <ApperIcon name="Mail" className="w-5 h-5 mr-2 text-primary-500" />
              Contact Information
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Email:</span>
                <span className="font-medium text-slate-900">{applicationData.email || "Not provided"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Phone:</span>
                <span className="font-medium text-slate-900">{applicationData.phone || "Not provided"}</span>
              </div>
              <div>
                <span className="text-slate-600">Address:</span>
                <div className="mt-1 font-medium text-slate-900">
                  {applicationData.address?.street && (
                    <div>{applicationData.address.street}</div>
                  )}
                  {(applicationData.address?.city || applicationData.address?.state || applicationData.address?.postcode) && (
                    <div>
                      {applicationData.address.city} {applicationData.address.state} {applicationData.address.postcode}
                    </div>
                  )}
                  {!applicationData.address?.street && !applicationData.address?.city && (
                    <div>Not provided</div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="p-6 h-full">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <ApperIcon name="Briefcase" className="w-5 h-5 mr-2 text-primary-500" />
              Employment Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Employer:</span>
                <span className="font-medium text-slate-900">{applicationData.employerName || "Not provided"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Job Title:</span>
                <span className="font-medium text-slate-900">{applicationData.jobTitle || "Not provided"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Start Date:</span>
                <span className="font-medium text-slate-900">{formatDate(applicationData.employmentStartDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Annual Salary:</span>
                <span className="font-medium text-slate-900">{formatSalary(applicationData.salary)}</span>
              </div>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="p-6 h-full">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <ApperIcon name="FileText" className="w-5 h-5 mr-2 text-primary-500" />
              Uploaded Documents
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-slate-600">Passport Copy:</span>
                <div className="mt-1">
                  {getDocumentsByType("passport").length > 0 ? (
                    getDocumentsByType("passport").map(doc => (
                      <div key={doc.id} className="flex items-center space-x-2">
                        <ApperIcon name="Check" className="w-3 h-3 text-success-500" />
                        <span className="font-medium text-slate-900">{doc.fileName}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="X" className="w-3 h-3 text-red-500" />
                      <span className="text-red-600">Not uploaded</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <span className="text-slate-600">Resume/CV:</span>
                <div className="mt-1">
                  {getDocumentsByType("resume").length > 0 ? (
                    getDocumentsByType("resume").map(doc => (
                      <div key={doc.id} className="flex items-center space-x-2">
                        <ApperIcon name="Check" className="w-3 h-3 text-success-500" />
                        <span className="font-medium text-slate-900">{doc.fileName}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="X" className="w-3 h-3 text-red-500" />
                      <span className="text-red-600">Not uploaded</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <span className="text-slate-600">Employment Contract:</span>
                <div className="mt-1">
                  {getDocumentsByType("employment").length > 0 ? (
                    getDocumentsByType("employment").map(doc => (
                      <div key={doc.id} className="flex items-center space-x-2">
                        <ApperIcon name="Check" className="w-3 h-3 text-success-500" />
                        <span className="font-medium text-slate-900">{doc.fileName}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="X" className="w-3 h-3 text-red-500" />
                      <span className="text-red-600">Not uploaded</span>
                    </div>
                  )}
                </div>
              </div>
              
              {getDocumentsByType("supporting").length > 0 && (
                <div>
                  <span className="text-slate-600">Supporting Documents:</span>
                  <div className="mt-1">
                    {getDocumentsByType("supporting").map(doc => (
                      <div key={doc.id} className="flex items-center space-x-2">
                        <ApperIcon name="Check" className="w-3 h-3 text-success-500" />
                        <span className="font-medium text-slate-900">{doc.fileName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </motion.div>
      </div>
      
      {applicationData.validationErrors && applicationData.validationErrors.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mb-8"
        >
          <Card className="p-6 bg-amber-50 border-amber-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <ApperIcon name="AlertTriangle" className="w-5 h-5 mr-2 text-amber-500" />
              Validation Notes
            </h3>
            <p className="text-sm text-slate-600 mb-3">
              The following issues were identified during validation but bypassed for demonstration:
            </p>
            <div className="space-y-2">
              {applicationData.validationErrors.map((error, index) => (
                <div key={index} className="flex items-center space-x-3 text-sm">
                  <ApperIcon name="Info" className="w-4 h-4 text-amber-500" />
                  <span className="text-slate-700">{error.message}</span>
                  {applicationData.validationBypass?.includes(error.field) && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      Bypassed
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="flex items-center justify-between"
      >
        <Button
          variant="secondary"
          onClick={handleEdit}
        >
          <ApperIcon name="Edit" className="w-4 h-4 mr-2" />
          Edit Application
        </Button>
        
        <Button
          variant="primary"
          onClick={handleApprove}
          disabled={isApproving}
          className="bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700"
        >
          {isApproving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Approving...
            </>
          ) : (
            <>
              <ApperIcon name="CheckCircle" className="w-4 h-4 mr-2" />
              Approve & Generate Documents
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
};

export default ApplicationReview;