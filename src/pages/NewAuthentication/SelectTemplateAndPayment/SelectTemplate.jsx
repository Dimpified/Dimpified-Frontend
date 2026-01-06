import React, { useEffect } from "react";
import templates from "../../../component/Templates";
import { Heading, Text } from "../../../component/Text";
import { ButtonSmallPurple } from "../../../component/Buttons";
import { useNavigate } from "react-router-dom";

// Find template with ID 51
const template51 = templates.find((template) => template.id === 51);

const SelectTemplate = ({ onBack, onNext }) => {
  const navigate = useNavigate();

  // Set templateId to 51 on component mount
  useEffect(() => {
    sessionStorage.setItem("templateId", "51");
  }, []);

  const handleSubmit = () => {
    navigate("/auth/preview-template");
  };

  return (
    <div className="h-screen pb-20">
      <div className="w-full p-4">
        {onBack && (
          <button
            onClick={onBack}
            className="text-purple-600 text-sm hover:border-primary3 hover:border hover:p-1 hover:rounded-md transition-all duration-300"
          >
            {"< "}Back
          </button>
        )}
      </div>
      <Heading
        level={2}
        size="3xl"
        weight="600"
        color="[#9768fe]"
        className="justify-center mt-4"
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
      <Text className="text-gray-500 text-[16px] mt-3 mb-4">
        Preview your selected website design
      </Text>

      {/* Template 51 Information */}
      <div className="space-y-8 overflow-y-auto mt-10 h-full pb-36">
        <div className="border rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
          {template51.image ? (
            <img
              src={template51.image}
              alt={template51.title}
              className="w-full h-40 object-cover"
            />
          ) : (
            <div className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
          <div className="p-4">
            <Heading
              level={3}
              size="lg"
              className="text-[20px]"
              color="primary8"
            >
              {template51.title}
            </Heading>
            <Text className="text-[16px]" color="primary8">
              {template51.description}
            </Text>
            <ButtonSmallPurple
              className="mt-2 px-4 py-2 bg-primary3 text-white rounded"
              onClick={handleSubmit}
            >
              Preview Template
            </ButtonSmallPurple>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTemplate;