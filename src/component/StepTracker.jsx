import React from "react";
import PropTypes from "prop-types";
import Logo from "../assets/NewAuthImage/NewLogo.png";

const StepTracker = ({ currentStep, totalSteps }) => {
  const progress = Math.min((currentStep / totalSteps) * 100, 100);

  return (
    <div className="w-full mx-auto mb-8">
      <div className="flex justify-between items-center mb-4">
        <img
          src={Logo}
          alt="Dimpified Logo"
          className="h-10 w-auto object-contain"
        />
       
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-6">
        <div
          className="h-full bg-primary3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
         
      </div>
      <div className="text-primary3 font-medium text-lg justify-end flex mt-4">
          STEP {currentStep}/{totalSteps}
        </div>
    </div>
  );
};

StepTracker.propTypes = {
  currentStep: PropTypes.number.isRequired,
  totalSteps: PropTypes.number.isRequired,
};

export default StepTracker;