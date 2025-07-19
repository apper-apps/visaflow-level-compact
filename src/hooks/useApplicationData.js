import { useState, useEffect } from "react";

const useApplicationData = () => {
  const [applicationData, setApplicationData] = useState(() => {
    const saved = localStorage.getItem("visaflow-application");
    return saved ? JSON.parse(saved) : {
      visaType: "",
      status: "draft",
      fullName: "",
      dateOfBirth: "",
      nationality: "",
      passportNumber: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        postcode: "",
        country: "Australia"
      },
      employerName: "",
      jobTitle: "",
      employmentStartDate: "",
      salary: "",
      qualifications: [],
      documents: [],
      validationErrors: [],
      createdAt: new Date().toISOString(),
      submittedAt: null,
      approvedAt: null
    };
  });

  const updateApplicationData = (updates) => {
    setApplicationData(prev => {
      const updated = { ...prev, ...updates };
      localStorage.setItem("visaflow-application", JSON.stringify(updated));
      return updated;
    });
  };

  const clearApplicationData = () => {
    localStorage.removeItem("visaflow-application");
    setApplicationData({
      visaType: "",
      status: "draft",
      fullName: "",
      dateOfBirth: "",
      nationality: "",
      passportNumber: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        postcode: "",
        country: "Australia"
      },
      employerName: "",
      jobTitle: "",
      employmentStartDate: "",
      salary: "",
      qualifications: [],
      documents: [],
      validationErrors: [],
      createdAt: new Date().toISOString(),
      submittedAt: null,
      approvedAt: null
    });
  };

  // Auto-save every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (applicationData.status === "draft") {
        localStorage.setItem("visaflow-application", JSON.stringify(applicationData));
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [applicationData]);

  return {
    applicationData,
    updateApplicationData,
    clearApplicationData
  };
};

export default useApplicationData;