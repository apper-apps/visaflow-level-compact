const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ApplicationService {
  async validateApplication(applicationData) {
    await delay(1500);
    
    const errors = [];
    
    // Required field validation
    if (!applicationData.fullName?.trim()) {
      errors.push({
        field: "fullName",
        message: "Full name is required",
        severity: "error",
        allowBypass: true
      });
    }
    
    if (!applicationData.dateOfBirth) {
      errors.push({
        field: "dateOfBirth",
        message: "Date of birth is required",
        severity: "error",
        allowBypass: true
      });
    }
    
    if (!applicationData.passportNumber?.trim()) {
      errors.push({
        field: "passportNumber",
        message: "Passport number is required",
        severity: "error",
        allowBypass: true
      });
    }
    
    if (!applicationData.email?.trim()) {
      errors.push({
        field: "email",
        message: "Email address is required",
        severity: "error",
        allowBypass: true
      });
    } else if (!this.isValidEmail(applicationData.email)) {
      errors.push({
        field: "email",
        message: "Please provide a valid email address",
        severity: "error",
        allowBypass: true
      });
    }
    
    if (!applicationData.employerName?.trim()) {
      errors.push({
        field: "employerName",
        message: "Employer name is required",
        severity: "error",
        allowBypass: true
      });
    }
    
    if (!applicationData.jobTitle?.trim()) {
      errors.push({
        field: "jobTitle",
        message: "Job title is required",
        severity: "error",
        allowBypass: true
      });
    }
    
    // Format validation
    if (applicationData.phone && !this.isValidAustralianPhone(applicationData.phone)) {
      errors.push({
        field: "phone",
        message: "Please provide a valid Australian phone number",
        severity: "warning",
        allowBypass: true
      });
    }
    
    // Age validation
    if (applicationData.dateOfBirth) {
      const age = this.calculateAge(applicationData.dateOfBirth);
      if (age < 18) {
        errors.push({
          field: "dateOfBirth",
          message: "Applicant must be at least 18 years old",
          severity: "error",
          allowBypass: true
        });
      }
      if (age > 45) {
        errors.push({
          field: "dateOfBirth",
          message: "Age may affect visa eligibility - review required",
          severity: "warning",
          allowBypass: true
        });
      }
    }
    
    // Document validation
    if (!applicationData.documents || applicationData.documents.length === 0) {
      errors.push({
        field: "documents",
        message: "At least one supporting document is required",
        severity: "error",
        allowBypass: true
      });
    }
    
    const hasPassportDoc = applicationData.documents?.some(doc => doc.type === "passport");
    if (!hasPassportDoc) {
      errors.push({
        field: "documents",
        message: "Passport copy is required",
        severity: "error",
        allowBypass: true
      });
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      status: errors.length === 0 ? "validated" : "requires_review"
    };
  }
  
  async submitApplication(applicationData) {
    await delay(1000);
    
    const submittedApplication = {
      ...applicationData,
      status: "submitted",
      submittedAt: new Date().toISOString()
    };
    
    return {
      success: true,
      application: submittedApplication,
      referenceNumber: `VF${Date.now().toString().slice(-6)}`
    };
  }
  
  async approveApplication(applicationData) {
    await delay(800);
    
    const approvedApplication = {
      ...applicationData,
      status: "approved",
      approvedAt: new Date().toISOString()
    };
    
    return {
      success: true,
      application: approvedApplication
    };
  }
  
  async generatePDF(applicationData) {
    await delay(2000);
    
    // Simulate PDF generation
    const pdfData = {
      fileName: `VISA_482_${applicationData.fullName?.replace(/\s+/g, "_")}_${Date.now()}.pdf`,
      size: "2.4 MB",
      pages: 8,
      generatedAt: new Date().toISOString(),
      downloadUrl: "#" // In real app, this would be a blob URL
    };
    
    return {
      success: true,
      pdf: pdfData
    };
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  isValidAustralianPhone(phone) {
    // Australian phone number formats
    const phoneRegex = /^(\+61|0)[2-9]\d{8}$/;
    const cleanPhone = phone.replace(/\s+/g, "");
    return phoneRegex.test(cleanPhone);
  }
  
  calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }
}

export default new ApplicationService();