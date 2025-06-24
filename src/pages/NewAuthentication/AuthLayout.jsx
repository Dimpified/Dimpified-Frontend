import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import StepTracker from "../../component/StepTracker";
import Step134 from "../../assets/NewAuthImage/Step134.png";
import Step2 from "../../assets/NewAuthImage/Step2.png";

const AuthLayout = () => {
  const location = useLocation();

  
  const getStepConfig = () => {
    const path = location.pathname;

    if (path.includes("personal-Information"))
      return { step: 1, image: Step134, totalSteps: 9 };
    if (path.includes("email-verification"))
      return { step: 2, image: Step2, totalSteps: 9 };
    if (path.includes("business-type"))
      return { step: 3, image: Step134, totalSteps: 9 };
    if (path.includes("business-info"))
      return { step: 4, image: Step134, totalSteps: 9 };
    if (path.includes("select-template")) return { step: 5, totalSteps: 9 };
    if (path.includes("preview-template")) return { step: 6, totalSteps: 9 };
    if (path.includes("subscriptions")) return { step: 7, totalSteps: 9 };
    if (path.includes("edit-template")) return { step: 8, totalSteps: 9 };
    if (path.includes("preview-edited")) return { step: 9, totalSteps: 9 };

   
    return { step: 1, image: Step134, totalSteps: 9 };
  };

  const { step, image, totalSteps } = getStepConfig();
  const showImage = !!image && step <= 4;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-6 md:py-10 bg-gray-50">
      <div className="w-full max-w-7xl">
        <div className="mb-16">
          <StepTracker currentStep={step} totalSteps={totalSteps} />
        </div>
        <div className="flex flex-col gap-6 md:gap-8 lg:flex-row">
          <div
            className={`w-full ${
              showImage ? "lg:w-1/2" : ""
            } flex flex-col items-center lg:items-start`}
          >
            <div className="w-full">
              <Outlet />
            </div>
          </div>

          {showImage && (
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
              <img
                src={image}
                alt={`Step ${step} illustration`}
                className="w-full max-w-md sm:max-w-lg lg:max-w-xl h-auto object-contain rounded-[20px] sm:rounded-[30px] lg:rounded-[50px]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
