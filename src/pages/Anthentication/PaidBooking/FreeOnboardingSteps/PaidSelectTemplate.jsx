import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PaidOnboardingLayout from "./PaidOnboardingLayout";
import templates from "../../../../component/Templates";
import { Heading, Text } from "../../../../component/Text";
import { ButtonSmallPurple } from "../../../../component/Buttons";

// Find template with ID 51
const template51 = templates.find((template) => template.id === 51);

const PaidSelectTemplate = ({ onBack }) => {
  const navigate = useNavigate();

  // Set templateId to 51 on mount
  useEffect(() => {
    sessionStorage.setItem("templateId", "51");
  }, []);

  const handleSubmit = () => {
    navigate("/paid/auth/preview-template");
  };

  return (
    <PaidOnboardingLayout currentStep={6} rightImage={null}>
      {/* Headings */}
      <Heading
        level={2}
        size="4xl"
        weight="600"
        color="[#9768fe]"
        className=" text-[#9F68FE] justify-center mt-4"
      >
        You're almost done
      </Heading>

      <Heading
        level={3}
        size="3xl"
        weight="600"
        className="justify-center text-[#2d1c4d] mt-10"
      >
        Your Website Design
      </Heading>

      <Text className="text-gray-500 text-[16px] mt-3 mb-6">
        Preview your selected website design
      </Text>

      {/* Template Card */}
      <div className="flex mt-8 overflow-y-auto pb-24">
        <div className="border rounded-lg overflow-hidden shadow-lg max-w-md w-full">
          {template51?.image ? (
            <img
              src={template51.image}
              alt={template51.title}
              className="w-full h-48 object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}

          <div className="p-5">
            <Heading
              level={3}
              size="lg"
              className="text-[20px]"
              color="primary8"
            >
              {template51?.title}
            </Heading>

            <Text className="text-[16px] mt-2" color="primary8">
              {template51?.description}
            </Text>

            <ButtonSmallPurple className="mt-4 w-full" onClick={handleSubmit}>
              Preview Template
            </ButtonSmallPurple>
          </div>
        </div>
      </div>
    </PaidOnboardingLayout>
  );
};

export default PaidSelectTemplate;
