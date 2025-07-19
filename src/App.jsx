import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import PortalHome from "@/components/pages/PortalHome";
import VisaSelection from "@/components/pages/VisaSelection";
import ApplicationForm from "@/components/pages/ApplicationForm";
import ValidationReview from "@/components/pages/ValidationReview";
import ApplicationReview from "@/components/pages/ApplicationReview";
import DocumentGeneration from "@/components/pages/DocumentGeneration";

function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PortalHome />} />
          <Route path="/visa-selection" element={<VisaSelection />} />
          <Route path="/application/:visaType" element={<ApplicationForm />} />
          <Route path="/validation-review" element={<ValidationReview />} />
          <Route path="/application-review" element={<ApplicationReview />} />
          <Route path="/document-generation" element={<DocumentGeneration />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="z-[9999]"
      />
    </div>
  );
}

export default App;