import { useState } from "react";
import { FaUser, FaBuilding } from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  ButtonForTabs,
  ButtonSmallPurple,
  ButtonSmallWhite,
} from "../../../component/Buttons";
import { Heading } from "../../../component/Text";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Register from "../../NewAuthentication/PersonalInfo/BasicInfo";
import UserLogin from "../../Authentication/RegisterUser/UserLogin";

const AffiliateOnboarding = () => {
  const [userRole, setUserRole] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);
  const AffiliateId = useSelector(
    (state) => state.auth.user?.data?.affiliateId
  );

  const handleRoleSelection = (role) => {
    setUserRole(role);
    setShowSignIn(false); // Hide sign-in when a role is selected
  };

  const handleGoBackToForm = () => {
    setUserRole("");
    setShowSignIn(false); // Reset state to hide sign-in when going back
  };

  const handleShowSignIn = () => {
    setShowSignIn(true);
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 md:py-10">
      <div className="flex items-center justify-center min-h-screen mx-auto px-4 py-6 bg-ter5 border border-gray-200 rounded-lg shadow-md">
        <div className="w-full p-6 bg-white shadow rounded-lg">
          {/* Go Back Icon */}
          {(userRole || showSignIn) && (
            <div className="flex justify-between mb-4">
              <ButtonForTabs
                onClick={handleGoBackToForm}
                className="flex items-center text-gray-700 hover:text-gray-900"
                label={
                  <>
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Go Back
                  </>
                }
              />
              {/* <ButtonSmallPurple
                onClick={handleShowSignIn}
                className="flex items-center text-gray-700 hover:text-gray-900"
                width="w-22"
              >
                Sign In
              </ButtonSmallPurple> */}
            </div>
          )}

          {!userRole && !showSignIn ? (
            <div>
              <Heading
                level="3"
                className="mb-4 text-center"
                size="2xl"
                color="black"
                weight="font-bold"
                font="font-body"
                lineHeight="leading-7"
              >
                Affiliate Onboarding
              </Heading>

              <div className="flex flex-col md:flex-row items-center justify-center mb-4 md:space-x-2">
                <div className="w-full max-w-xs mb-2">
                  <ButtonSmallWhite
                    className={`w-full px-4 py-2 rounded ${
                      userRole === "individual"
                        ? "bg-primary3"
                        : "bg-transparent border border-primary3 text-primary3"
                    }`}
                    onClick={() => handleRoleSelection("individual")}
                  >
                    <FaUser className="mr-2" />
                    Individual
                  </ButtonSmallWhite>
                </div>
                <div className="w-full max-w-xs mb-2">
                  <ButtonSmallWhite
                    className={`w-full px-4 py-2 rounded ${
                      userRole === "enterprise"
                        ? "bg-primary3"
                        : "bg-transparent border border-primary3 text-primary3"
                    }`}
                    onClick={() => handleRoleSelection("enterprise")}
                    disabled
                  >
                    <FaBuilding className="mr-2" />
                    Enterprise
                  </ButtonSmallWhite>
                </div>
              </div>
            </div>
          ) : showSignIn ? (
            <UserLogin />
          ) : (
            <Register
            // userRole={userRole}
            // onGoBack={handleGoBackToForm}
            // affiliateId={AffiliateId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AffiliateOnboarding;
