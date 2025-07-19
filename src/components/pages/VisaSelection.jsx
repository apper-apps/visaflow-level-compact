import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import useApplicationData from "@/hooks/useApplicationData";
import visaTypesData from "@/services/mockData/visaTypes.json";

const VisaSelection = () => {
  const navigate = useNavigate();
  const { updateApplicationData } = useApplicationData();
  const [visaTypes, setVisaTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedVisa, setSelectedVisa] = useState("");
  
  useEffect(() => {
    const loadVisaTypes = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setVisaTypes(visaTypesData);
      } catch (err) {
        setError("Failed to load visa types. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    loadVisaTypes();
  }, []);
  
  const handleVisaSelect = (visaType) => {
    setSelectedVisa(visaType.code);
    updateApplicationData({
      visaType: visaType.code,
      visaSubclass: visaType.subclass,
      visaName: visaType.name
    });
    
    toast.success(`Selected ${visaType.name}`);
    navigate(`/application/${visaType.code}`);
  };
  
  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="h-8 bg-slate-200 rounded w-1/3 mb-4 animate-pulse"></div>
          <div className="h-6 bg-slate-200 rounded w-2/3 animate-pulse"></div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <Card className="p-6 h-80">
                <div className="h-6 bg-slate-200 rounded mb-3"></div>
                <div className="h-4 bg-slate-200 rounded mb-4"></div>
                <div className="space-y-2 mb-6">
                  <div className="h-3 bg-slate-200 rounded"></div>
                  <div className="h-3 bg-slate-200 rounded w-4/5"></div>
                  <div className="h-3 bg-slate-200 rounded w-3/5"></div>
                </div>
                <div className="h-10 bg-slate-200 rounded"></div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <Error 
          title="Failed to Load Visa Types"
          message={error}
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }
  
  const featuredVisa = visaTypes.find(visa => visa.featured);
  const otherVisas = visaTypes.filter(visa => !visa.featured);
  
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Select Your Visa Type
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Choose the visa category that best matches your client&apos;s needs. 
          This demo focuses on the VISA 482 application process.
        </p>
      </motion.div>
      
      {featuredVisa && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Card className="p-8 bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
            <div className="flex items-start space-x-6">
              <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center">
                <ApperIcon name="Star" className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="text-2xl font-bold text-slate-900">
                    {featuredVisa.name}
                  </h3>
                  <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured Demo
                  </span>
                </div>
                <p className="text-slate-600 mb-4 text-lg">
                  {featuredVisa.description}
                </p>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Key Requirements:</h4>
                    <ul className="space-y-1 text-sm text-slate-600">
                      {featuredVisa.requirements.map((req, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <ApperIcon name="Check" className="w-4 h-4 text-success-500" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Available Streams:</h4>
                    <ul className="space-y-1 text-sm text-slate-600">
                      {featuredVisa.streams?.map((stream, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <ApperIcon name="ArrowRight" className="w-4 h-4 text-primary-500" />
                          <span>{stream}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    <span className="font-medium">Processing Time:</span> {featuredVisa.processingTime}
                  </div>
                  <Button 
                    onClick={() => handleVisaSelect(featuredVisa)}
                    variant="primary"
                    size="lg"
                    className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
                  >
                    <ApperIcon name="ArrowRight" className="w-5 h-5 mr-2" />
                    Start 482 Application
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-xl font-semibold text-slate-900 mb-6">
          Other Available Visa Types
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherVisas.map((visa, index) => (
            <motion.div
              key={visa.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 * index }}
            >
              <Card hover className="p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-slate-900">
                    Visa {visa.subclass}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    visa.category === "Work" ? "bg-blue-100 text-blue-800" :
                    visa.category === "Permanent" ? "bg-green-100 text-green-800" :
                    visa.category === "Study" ? "bg-purple-100 text-purple-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {visa.category}
                  </span>
                </div>
                <h4 className="font-medium text-slate-800 mb-2">
                  {visa.name}
                </h4>
                <p className="text-sm text-slate-600 mb-4 flex-1">
                  {visa.description}
                </p>
                <div className="text-xs text-slate-500 mb-4">
                  Processing: {visa.processingTime}
                </div>
                <Button 
                  onClick={() => handleVisaSelect(visa)}
                  variant="outline"
                  className="w-full"
                  disabled={visa.code !== "482"}
                >
                  {visa.code === "482" ? "Select This Visa" : "Coming Soon"}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12 text-center"
      >
        <Card className="p-6 bg-slate-50">
          <div className="flex items-center justify-center space-x-2 text-slate-600">
            <ApperIcon name="Info" className="w-5 h-5" />
            <p className="text-sm">
              For this demonstration, only the VISA 482 application process is fully functional. 
              Other visa types will be available in the full platform.
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default VisaSelection;