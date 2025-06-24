import React, { useState } from "react";
import { MediumInputWithPlaceholder } from "../../../component/Inputs";
import { ButtonLongPurple } from "../../../component/Buttons";
import { businessTypesData } from "../../../data/data";
import { useSelector } from "react-redux";
import api from "../../../api/authApis";
import { showToast } from "../../../component/ShowToast";
import { useNavigate } from "react-router-dom";

const BusinessType = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [search, setSearch] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
const navigate = useNavigate();
  const creatorId = useSelector((state) => state.auth.user?.creatorId || "0");

  // Filter visible business types (limited to 9)
  const visibleTypes = businessTypesData
    .filter((type) => type.visible)
    .slice(0, 9);

  // All types for the select dropdown (visible and non-visible)
  const allTypes = businessTypesData;

  const handleSelectBusiness = async () => {
    if (!selectedType) {
      showToast("Please select a business type", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.CreatorSelectBusinessType({
        creatorId,
        category: "Personal care services",
        subCategory: selectedType,
      });
      showToast(response.data.message, "success");
      sessionStorage.setItem("subCategory", selectedType);
      navigate("/auth/business-info")
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to select business type",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <div className="w-full p-4">
        <h2 className="text-3xl font-bold text-primary2 mt-4">
          Select your Business Type
        </h2>
        <p className="text-gray-500 mb-4">
          Kindly select from the suggested business type or search in the box
          below
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
          {visibleTypes.length > 0 ? (
            visibleTypes.map((type) => (
              <button
                key={type.name}
                className={`flex items-center justify-center h-12 border rounded ${
                  selectedType === type.name
                    ? "bg-primary3 text-white"
                    : "bg-white text-black"
                }`}
                onClick={() => setSelectedType(type.name)}
                disabled={isSubmitting}
              >
                <span className="mr-2">{type.icon}</span> {type.name}
              </button>
            ))
          ) : (
            <p className="text-gray-500 col-span-3 text-center">
              No visible business types available
            </p>
          )}
        </div>

        <div className="flex gap-3 w-full items-center">
          <hr className="flex-1 bg-[#E5E5E5]" />
          <p className="text-center text-gray-500">Or</p>
          <hr className="flex-1 bg-[#E5E5E5]" />
        </div>

        <select
          value={selectedType || ""}
          onChange={(e) => setSelectedType(e.target.value)}
          className="w-full p-2 border rounded-[10px] mb-4 focus:outline-none focus:ring-2 focus:ring-primary3"
          disabled={isSubmitting}
        >
          <option value="" disabled>
            Select a business type...
          </option>
          {visibleTypes.map((type) => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

        <ButtonLongPurple
          onClick={handleSelectBusiness}
          width="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                ></path>
              </svg>{" "}
              Processing...
            </div>
          ) : (
            "Continue"
          )}
        </ButtonLongPurple>
      </div>
    </div>
  );
};

export default BusinessType;
