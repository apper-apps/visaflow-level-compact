import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import FileUpload from "@/components/molecules/FileUpload";
import ApperIcon from "@/components/ApperIcon";
import useApplicationData from "@/hooks/useApplicationData";

const ApplicationForm = () => {
  const { visaType } = useParams();
  const navigate = useNavigate();
  const { applicationData, updateApplicationData } = useApplicationData();
  const [activeSection, setActiveSection] = useState("personal");
  const [formData, setFormData] = useState(applicationData);
  const [documents, setDocuments] = useState(applicationData.documents || []);
  
  useEffect(() => {
    if (!visaType || visaType !== "482") {
      navigate("/visa-selection");
      return;
    }
    
    if (!applicationData.visaType) {
      updateApplicationData({ visaType: "482" });
    }
  }, [visaType, applicationData.visaType, navigate, updateApplicationData]);
  
  const handleInputChange = (field, value) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    updateApplicationData(updatedData);
  };
  
  const handleAddressChange = (field, value) => {
    const updatedAddress = { ...formData.address, [field]: value };
    const updatedData = { ...formData, address: updatedAddress };
    setFormData(updatedData);
    updateApplicationData(updatedData);
  };
  
  const handleDocumentUpload = (type, files) => {
    const newDocuments = files.map(file => ({
      id: Date.now() + Math.random(),
      type,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date().toISOString()
    }));
    
    const updatedDocuments = [...documents.filter(doc => doc.type !== type), ...newDocuments];
    setDocuments(updatedDocuments);
    updateApplicationData({ ...formData, documents: updatedDocuments });
    
    toast.success(`${files.length} file(s) uploaded successfully`);
  };
  
  const handleSubmit = () => {
    const requiredFields = [
      "fullName", "dateOfBirth", "nationality", "passportNumber", 
      "email", "employerName", "jobTitle"
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field]?.trim());
    
    if (missingFields.length > 0) {
      toast.warning("Please fill in all required fields before submitting");
return;
  }
  
  updateApplicationData({ ...formData, status: "pending_review", submittedAt: new Date().toISOString() });
  toast.success("Application submitted for review");
  navigate("/application-review");
};
  
  const sections = [
    { id: "personal", title: "Personal Details", icon: "User" },
    { id: "contact", title: "Contact Information", icon: "Mail" },
    { id: "employment", title: "Employment Details", icon: "Briefcase" },
    { id: "documents", title: "Documents", icon: "FileText" }
  ];
  
  const renderPersonalSection = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Full Name"
          required
          value={formData.fullName || ""}
          onChange={(e) => handleInputChange("fullName", e.target.value)}
          placeholder="Enter your full legal name"
        />
        <FormField
          label="Date of Birth"
          type="date"
          required
          value={formData.dateOfBirth || ""}
          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Nationality"
          required
          value={formData.nationality || ""}
          onChange={(e) => handleInputChange("nationality", e.target.value)}
          placeholder="Enter your nationality"
        />
        <FormField
          label="Passport Number"
          required
          value={formData.passportNumber || ""}
          onChange={(e) => handleInputChange("passportNumber", e.target.value)}
          placeholder="Enter passport number"
        />
      </div>
    </div>
  );
  
  const renderContactSection = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Email Address"
          type="email"
          required
          value={formData.email || ""}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder="your.email@example.com"
        />
        <FormField
          label="Phone Number"
          type="tel"
          value={formData.phone || ""}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          placeholder="+61 400 000 000"
        />
      </div>
      <div>
        <h4 className="text-lg font-semibold text-slate-900 mb-4">Australian Address</h4>
        <div className="space-y-4">
          <FormField
            label="Street Address"
            value={formData.address?.street || ""}
            onChange={(e) => handleAddressChange("street", e.target.value)}
            placeholder="Enter street address"
          />
          <div className="grid md:grid-cols-3 gap-4">
            <FormField
              label="City"
              value={formData.address?.city || ""}
              onChange={(e) => handleAddressChange("city", e.target.value)}
              placeholder="City"
            />
            <FormField
              label="State"
              value={formData.address?.state || ""}
              onChange={(e) => handleAddressChange("state", e.target.value)}
              placeholder="State"
            />
            <FormField
              label="Postcode"
              value={formData.address?.postcode || ""}
              onChange={(e) => handleAddressChange("postcode", e.target.value)}
              placeholder="0000"
            />
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderEmploymentSection = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Employer Name"
          required
          value={formData.employerName || ""}
          onChange={(e) => handleInputChange("employerName", e.target.value)}
          placeholder="Enter employer company name"
        />
        <FormField
          label="Job Title"
          required
          value={formData.jobTitle || ""}
          onChange={(e) => handleInputChange("jobTitle", e.target.value)}
          placeholder="Your position title"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          label="Employment Start Date"
          type="date"
          value={formData.employmentStartDate || ""}
          onChange={(e) => handleInputChange("employmentStartDate", e.target.value)}
        />
        <FormField
          label="Annual Salary (AUD)"
          type="number"
          value={formData.salary || ""}
          onChange={(e) => handleInputChange("salary", e.target.value)}
          placeholder="80000"
        />
      </div>
    </div>
  );
  
  const renderDocumentsSection = () => (
    <div className="space-y-8">
      <div>
        <h4 className="text-lg font-semibold text-slate-900 mb-2">Passport Copy</h4>
        <p className="text-sm text-slate-600 mb-4">Upload a clear copy of your passport photo page</p>
        <FileUpload
          onFileSelect={(files) => handleDocumentUpload("passport", files)}
          acceptedTypes="image/*,application/pdf"
          label="Upload Passport Copy"
        />
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-slate-900 mb-2">Resume/CV</h4>
        <p className="text-sm text-slate-600 mb-4">Upload your current resume or curriculum vitae</p>
        <FileUpload
          onFileSelect={(files) => handleDocumentUpload("resume", files)}
          acceptedTypes="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          label="Upload Resume/CV"
        />
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-slate-900 mb-2">Employment Contract</h4>
        <p className="text-sm text-slate-600 mb-4">Upload your employment contract or job offer letter</p>
        <FileUpload
          onFileSelect={(files) => handleDocumentUpload("employment", files)}
          acceptedTypes="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          label="Upload Employment Contract"
        />
      </div>
      
      <div>
        <h4 className="text-lg font-semibold text-slate-900 mb-2">Supporting Documents</h4>
        <p className="text-sm text-slate-600 mb-4">Upload any additional supporting documents</p>
        <FileUpload
          onFileSelect={(files) => handleDocumentUpload("supporting", files)}
          acceptedTypes="*"
          label="Upload Supporting Documents"
          multiple
        />
      </div>
      
      {documents.length > 0 && (
        <div>
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Uploaded Documents</h4>
          <div className="space-y-2">
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <ApperIcon name="File" className="w-4 h-4 text-slate-500" />
                  <span className="text-sm text-slate-700">{doc.fileName}</span>
                  <span className="text-xs text-slate-500 capitalize">({doc.type})</span>
                </div>
                <span className="text-xs text-slate-500">
                  {new Date(doc.uploadedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
  
  const renderSectionContent = () => {
    switch (activeSection) {
      case "personal": return renderPersonalSection();
      case "contact": return renderContactSection();
      case "employment": return renderEmploymentSection();
      case "documents": return renderDocumentsSection();
      default: return renderPersonalSection();
    }
  };
  
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          VISA 482 Application Form
        </h1>
        <p className="text-lg text-slate-600">
          Temporary Skill Shortage (TSS) visa application
        </p>
      </motion.div>
      
      <div className="grid lg:grid-cols-4 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <Card className="p-4 sticky top-24">
            <h3 className="font-semibold text-slate-900 mb-4">Form Sections</h3>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    activeSection === section.id
                      ? "bg-primary-50 text-primary-700 border-primary-200"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  <ApperIcon name={section.icon} className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
              ))}
            </nav>
            
            <div className="mt-6 p-3 bg-gold-50 rounded-lg border border-gold-200">
              <div className="flex items-center space-x-2 mb-2">
                <ApperIcon name="Save" className="w-4 h-4 text-gold-600" />
                <span className="text-sm font-medium text-gold-800">Auto-save Active</span>
              </div>
              <p className="text-xs text-gold-700">
                Your progress is automatically saved every 30 seconds
              </p>
            </div>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:col-span-3"
        >
          <Card className="p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-2">
                {sections.find(s => s.id === activeSection)?.title}
              </h2>
              <p className="text-slate-600">
                {activeSection === "personal" && "Provide your basic personal information"}
                {activeSection === "contact" && "Enter your contact details and Australian address"}
                {activeSection === "employment" && "Details about your employment in Australia"}
                {activeSection === "documents" && "Upload required supporting documents"}
              </p>
            </div>
            
            {renderSectionContent()}
            
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-200">
              <Button
                variant="secondary"
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection);
                  if (currentIndex > 0) {
                    setActiveSection(sections[currentIndex - 1].id);
                  }
                }}
                disabled={activeSection === "personal"}
              >
                <ApperIcon name="ArrowLeft" className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <div className="flex space-x-3">
                {activeSection !== "documents" ? (
                  <Button
                    variant="primary"
                    onClick={() => {
                      const currentIndex = sections.findIndex(s => s.id === activeSection);
                      if (currentIndex < sections.length - 1) {
                        setActiveSection(sections[currentIndex + 1].id);
                      }
                    }}
                  >
                    Next
                    <ApperIcon name="ArrowRight" className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-success-500 to-success-600 hover:from-success-600 hover:to-success-700"
                  >
                    Submit Application
                    <ApperIcon name="Send" className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ApplicationForm;