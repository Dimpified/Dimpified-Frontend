import React, { useEffect, useState } from "react";
import templates from "../../../component/Templates";
import { Heading, Text } from "../../../component/Text";
import { ButtonSmallPurple, ButtonSmallWhite } from "../../../component/Buttons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const groupByCategory = (templates) => {
  return templates.reduce((acc, template) => {
    const { category } = template;
    acc[category] = acc[category] || [];
    acc[category].push(template);
    return acc;
  }, {});
};

const SelectTemplate = ({ onBack, onNext }) => {
  const navigate = useNavigate();
  const [subCategory, setSubCategory] = useState(null);
  const userStep = useSelector((state) => state.auth?.user?.step);

  useEffect(() => {
    setSubCategory(sessionStorage.getItem("subCategory"));
    if (userStep === 5 || userStep === 4) navigate("/");
  }, [userStep, navigate]);

  const handleSubmit = (id) => {
    sessionStorage.setItem("templateId", id);
    navigate("/auth/preview-template")
  };

  // Filter templates based on subCategory
  const filteredTemplates = templates.filter((template) =>
    subCategory ? template.category === subCategory : true
  );

  const groupedTemplates = groupByCategory(filteredTemplates);

  return (
    
    <div className="h-screen pb-20">
      <div className="w-full p-4">
       
      </div>
      <Heading
        level={2}
          size="3xl"
           weight='600'
           color="[#9768fe]"
        className="justify-center mt-4"
      >
        You're almost done
      </Heading>
      <Heading
        level={3}
        size="3xl"
           weight='600'
        className=" justify-center  text-[#2d1c4d] mt-10"
      >
        Select Website Design
      </Heading>
      <Text className="text-gray-500 text-[16px] mt-3 mb-4">
        Select and Preview your preferred website design
      </Text>

      {/* Templates Section */}
      <div className="space-y-8 overflow-y-auto mt-10 h-full pb-36">

        {/* Grouped Templates */}
        {Object.entries(groupedTemplates).map(([category, categoryTemplates]) => (
          <div key={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryTemplates.map((template) => (
                <div
                  key={template.id}
                  className="border rounded-lg overflow-hidden shadow-lg"
                >
                  <img
                    src={template.image}
                    alt={template.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <Heading
                      level={3}
                      size="lg"
                      className="text-[20px]"
                      color="primary8"
                    >
                      {template.title}
                    </Heading>
                    <Text className="text-[16px]" color="primary8">
                      {template.description}
                    </Text>
                    <ButtonSmallPurple
                      className="mt-2 px-4 py-2 bg-primary3 text-white rounded"
                      onClick={() => handleSubmit(template.id)}
                    >
                      Select
                    </ButtonSmallPurple>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectTemplate;