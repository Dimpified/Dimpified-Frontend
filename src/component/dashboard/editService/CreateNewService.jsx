import React, { useState } from "react";
import { LongInputWithPlaceholder } from "../../../component/Inputs";
import {
  ButtonSmallPurple,
  ButtonSmallWhite,
} from "../../../component/Buttons";
import { useImageUploader } from "../../../helper/UploadImage";
import { Spinner } from "flowbite-react";
import axios from "axios";
import { showToast } from "../../../component/ShowToast";
import CreatorDashboardLayout from "../../../layout/Creator/CreatorDashboardLayout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NewServiceForm = () => {
  const navigate = useNavigate();
  const {
    fileInputRefs,
    handleEditImageClick,
    handleImageChange,
    loadingImage,
  } = useImageUploader();
  const creatorId = useSelector((state) => state.auth?.user?.creatorId);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain?.domain);

  const [formData, setFormData] = useState({
    name: "",
    shortDescription: "",
    serviceImage: "",
    price: "",
    currency: "NGN",
    format: "Onsite",
    deliveryTime: 30, // Default to 30 minutes as a number
  });
  const [imageUrl, setImageUrl] = useState("");
  const [isCustomDuration, setIsCustomDuration] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "deliveryTime") {
      if (value === "custom") {
        setIsCustomDuration(true);
        setFormData({
          ...formData,
          deliveryTime: "", // Clear until custom value is entered
        });
      } else {
        setIsCustomDuration(false);
        setFormData({
          ...formData,
          deliveryTime: parseInt(value, 10) || 30, // Convert to number
        });
      }
    } else if (name === "customDeliveryTime") {
      setFormData({
        ...formData,
        deliveryTime: parseInt(value, 10) || "", // Convert to number, allow empty for invalid
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleImageUpload = async (e) => {
    const newImageUrl = await handleImageChange(e, "service", "image");
    if (newImageUrl) {
      setImageUrl(newImageUrl);
      setFormData((prevData) => ({
        ...prevData,
        serviceImage: newImageUrl,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct the services array with a single service object
    const service = {
      name: formData.name,
      shortDescription: formData.shortDescription,
      price: parseFloat(formData.price) || 0, // Ensure price is a number
      deliveryTime: parseInt(formData.deliveryTime, 10) || 30, // Ensure deliveryTime is a number
      priceFormat: "Fixed",
      serviceImage: formData.serviceImage,
    };

    // API payload
    const payload = {
      creatorId,
      ecosystemDomain,
      category: "Personal Care Service",
      subCategory: "Barber Shop",
      prefix: "I will",
      header: formData.name, // For backward compatibility, if API expects header
      description: formData.shortDescription, // For backward compatibility
      format: formData.format,
      currency: formData.currency,
      services: [service],
      accessToken,
      refreshToken,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-service`,
        payload,
        
      );
      showToast("Service created successfully", "success");
      navigate("/creator/dashboard/edit-service");
      // Reset form
      setFormData({
        name: "",
        shortDescription: "",
        serviceImage: "",
        price: "",
        currency: "NGN",
        format: "Onsite",
        deliveryTime: 30,
      });
      setImageUrl("");
      setIsCustomDuration(false);
    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to create service",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Predefined duration options
  const durationOptions = [
    { value: 30, label: "30 minutes" },
    { value: 60, label: "60 minutes" },
    { value: 90, label: "90 minutes" },
    { value: 120, label: "120 minutes" },
    { value: 150, label: "150 minutes" },
    { value: 180, label: "180 minutes" },
    { value: "custom", label: "Custom" },
  ];

  return (
    <CreatorDashboardLayout>
      <div className="mt-6 bg-white lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-6 lg:grid-cols-1"
        >
          <div>
            <label
              htmlFor="serviceName"
              className="font-semibold text-primary4"
            >
              Service Name
            </label>
            <LongInputWithPlaceholder
              id="serviceName"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Braided hair style"
              className="mt-2 block w-full border-ter11 rounded-md shadow-sm px-3 py-2 focus:ring-primary3 focus:border-primary3"
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="description"
                className="font-semibold text-primary4"
              >
                Brief Description
              </label>
              <textarea
                id="description"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows={5}
                placeholder="Stylish low cut with a touch of afro."
                className="mt-2 block w-full border-ter11 rounded-md shadow-sm border px-3 py-2 focus:ring-primary3 focus:border-primary3"
              />
            </div>
            <div>
              <label htmlFor="image" className="font-semibold text-primary4">
                Upload Image
              </label>
              <div className="flex flex-col justify-center items-center mt-2">
                <LongInputWithPlaceholder
                  type="text"
                  value={imageUrl}
                  readOnly
                  className="w-full border-ter11 rounded-md shadow-sm px-3 py-2 mb-2 focus:ring-primary3 focus:border-primary3"
                />
                <div className="flex w-full justify-center items-center border-dashed border-2 border-ter11 rounded-md h-20">
                  <input
                    type="file"
                    ref={(el) => (fileInputRefs.current["service-image"] = el)}
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    className="text-primary3"
                    onClick={() => handleEditImageClick("service", "image")}
                  >
                    {loadingImage ? (
                      <Spinner
                        aria-label="Uploading New Service Image..."
                        size="xl"
                        color="info"
                      />
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 mx-auto"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 5h18M3 10h18M3 15h18M3 20h18"
                          />
                        </svg>
                        <p className="text-center mt-2">Upload New Image</p>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="font-semibold text-primary4">
                Service Pricing
              </label>
              <LongInputWithPlaceholder
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                type="text"
                placeholder="20,000"
                className="mt-2 block w-full border-ter11 rounded-md shadow-sm px-3 py-2 focus:ring-primary3 focus:border-primary3"
              />
            </div>
            <div>
              <label htmlFor="currency" className="font-semibold text-primary4">
                Service Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="mt-2 block w-full border-ter11 border rounded-md shadow-sm px-3 py-2 focus:ring-primary3 focus:border-primary3"
              >
                <option value="NGN">₦</option>
              </select>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="font-semibold text-primary4">
                Service Location
              </label>
              <select
                id="location"
                name="format"
                value={formData.format}
                onChange={handleChange}
                className="mt-2 block w-full border-ter11 border rounded-md shadow-sm px-3 py-2 focus:ring-primary3 focus:border-primary3"
              >
                <option value="Onsite">Onsite</option>
                <option value="Home Service">Home Service</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="deliveryTime"
                className="font-semibold text-primary4"
              >
                Duration (in minutes)
              </label>
              <select
                id="deliveryTime"
                name="deliveryTime"
                value={isCustomDuration ? "custom" : formData.deliveryTime}
                onChange={handleChange}
                className="mt-2 block w-full border-ter11 border rounded-md shadow-sm px-3 py-2 focus:ring-primary3 focus:border-primary3"
              >
                {durationOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {isCustomDuration && (
                <LongInputWithPlaceholder
                  id="customDeliveryTime"
                  name="customDeliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  type="number"
                  placeholder="Enter custom duration (in minutes)"
                  className="mt-2 block w-full border-ter11 rounded-md shadow-sm px-3 py-2 focus:ring-primary3 focus:border-primary3"
                />
              )}
              <p className="text-sm text-gray-500 mt-1">
                Duration is in minutes
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <ButtonSmallWhite
              type="button"
              onClick={() =>
                setFormData({
                  name: "",
                  shortDescription: "",
                  serviceImage: "",
                  price: "",
                  currency: "NGN",
                  format: "Onsite",
                  deliveryTime: 30,
                })
              }
              className="text-primary3 py-2 px-6 rounded border border-primary3 hover:bg-primary3 hover:text-primary1 transition-all"
            >
              Reset
            </ButtonSmallWhite>
            <ButtonSmallPurple
              type="submit"
              disabled={isSubmitting}
              className={`bg-primary3 text-primary1 py-2 px-6 rounded hover:bg-primary3 transition-all ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? "Creating..." : "Create Service"}
            </ButtonSmallPurple>
          </div>
        </form>
      </div>
    </CreatorDashboardLayout>
  );
};

export default NewServiceForm;
