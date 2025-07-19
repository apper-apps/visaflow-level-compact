import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import useApplicationData from "@/hooks/useApplicationData";

const PortalHome = () => {
  const navigate = useNavigate();
  const { applicationData, clearApplicationData } = useApplicationData();
  
  const hasDraftApplication = applicationData.status === "draft" && applicationData.fullName;
  
  const handleStartNewApplication = () => {
    if (hasDraftApplication) {
      clearApplicationData();
    }
    navigate("/visa-selection");
  };
  
  const handleContinueApplication = () => {
    if (applicationData.visaType) {
      navigate(`/application/${applicationData.visaType}`);
    } else {
      navigate("/visa-selection");
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl mb-6">
          <ApperIcon name="Passport" className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-4">
          Welcome to VisaFlow Pro
        </h1>
        <p className="text-xl text-slate-600 mb-2">
          Streamlined Australian Visa Application Platform
        </p>
        <p className="text-slate-500 max-w-2xl mx-auto">
          Experience our automated immigration process designed for Australian immigration firms. 
          This demo showcases the complete client journey from visa selection to document generation.
        </p>
      </motion.div>
      
      {hasDraftApplication && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6 border-gold-200 bg-gradient-to-r from-gold-50 to-amber-50">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gold-500 rounded-full flex items-center justify-center">
                <ApperIcon name="Clock" className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Continue Your Application
                </h3>
                <p className="text-slate-600 mb-4">
                  You have a draft {applicationData.visaType} application for {applicationData.fullName}. 
                  Would you like to continue where you left off?
                </p>
                <div className="flex space-x-3">
                  <Button onClick={handleContinueApplication} variant="primary">
                    <ApperIcon name="Play" className="w-4 h-4 mr-2" />
                    Continue Application
                  </Button>
                  <Button onClick={handleStartNewApplication} variant="secondary">
                    <ApperIcon name="Plus" className="w-4 h-4 mr-2" />
                    Start New Application
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
      
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="p-8 h-full hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
              <ApperIcon name="Zap" className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Automated Processing
            </h3>
            <p className="text-slate-600 mb-6">
              Our platform automatically validates applications, checks for completeness, 
              and generates official forms ready for submission to the Department of Immigration.
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center space-x-2">
                <ApperIcon name="Check" className="w-4 h-4 text-success-500" />
                <span>Real-time validation</span>
              </li>
              <li className="flex items-center space-x-2">
                <ApperIcon name="Check" className="w-4 h-4 text-success-500" />
                <span>Document verification</span>
              </li>
              <li className="flex items-center space-x-2">
                <ApperIcon name="Check" className="w-4 h-4 text-success-500" />
                <span>Automated form generation</span>
              </li>
            </ul>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="p-8 h-full hover:shadow-lg transition-all duration-300">
            <div className="w-12 h-12 bg-success-100 rounded-xl flex items-center justify-center mb-6">
              <ApperIcon name="UserCheck" className="w-6 h-6 text-success-600" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Client Experience
            </h3>
            <p className="text-slate-600 mb-6">
              Designed with the client in mind, our intuitive interface guides applicants 
              through each step while providing transparency and peace of mind.
            </p>
            <ul className="space-y-2 text-sm text-slate-600">
              <li className="flex items-center space-x-2">
                <ApperIcon name="Check" className="w-4 h-4 text-success-500" />
                <span>Step-by-step guidance</span>
              </li>
              <li className="flex items-center space-x-2">
                <ApperIcon name="Check" className="w-4 h-4 text-success-500" />
                <span>Progress tracking</span>
              </li>
              <li className="flex items-center space-x-2">
                <ApperIcon name="Check" className="w-4 h-4 text-success-500" />
                <span>Auto-save functionality</span>
              </li>
            </ul>
          </Card>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center"
      >
        <Card className="p-8 bg-gradient-to-br from-primary-50 to-blue-50 border-primary-200">
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">
            Ready to Experience the Future of Immigration?
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Start your demo application now and see how we&apos;re revolutionizing 
            the visa application process for immigration firms across Australia.
          </p>
          <Button 
            onClick={handleStartNewApplication}
            variant="primary"
            size="lg"
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700"
          >
            <ApperIcon name="ArrowRight" className="w-5 h-5 mr-2" />
            Start Demo Application
          </Button>
        </Card>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mt-12 text-center text-sm text-slate-500"
      >
        <p className="flex items-center justify-center space-x-2">
          <ApperIcon name="Info" className="w-4 h-4" />
          <span>This is a demonstration platform. No real visa applications will be submitted.</span>
        </p>
      </motion.div>
    </div>
  );
};

export default PortalHome;