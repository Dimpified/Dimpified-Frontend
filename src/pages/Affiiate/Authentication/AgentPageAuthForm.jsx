import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SignIn from "./SignIn";
import Register from "./Register";
import NavbarComponent from "../../../component/affiliate/Navbar";
import Footer from "../../../component/affiliate/Footer";
import { ButtonForTabs } from "../../../component/Buttons";

const AgentPageAuthForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "signIn";

  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  return (
    <div className="overflow-hidden bg-white shadow-md rounded">
      <NavbarComponent />
      <div className="mt-5 py-20 max-w-screen-lg mx-auto px-4">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <nav className="flex space-x-4">
              <ButtonForTabs
                className={`py-2 px-4 font-medium ${
                  activeTab === "signIn"
                    ? "text-primary3 border-b-2 border-primary3"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("signIn")}
                label="Sign In"
              />
              <ButtonForTabs
                className={`py-2 px-4 font-medium ${
                  activeTab === "register"
                    ? "text-primary3 border-b-2 border-primary3"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveTab("register")}
                label="Register"
              />
            </nav>

            {/* Render the appropriate form based on the active tab */}
            {activeTab === "signIn" && <SignIn />}
            {activeTab === "register" && <Register />}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AgentPageAuthForm;
