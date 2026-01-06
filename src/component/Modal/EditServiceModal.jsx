import React, { useState } from "react";
import { Modal } from "flowbite-react";
import { Heading, Text } from "../Text";
import { LongInputWithPlaceholder } from "../Inputs";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import { useImageUploader } from "../../helper/UploadImage";
import { Spinner } from "flowbite-react";

const EditServiceModal = ({ isOpen, onClose, serviceData, handleSave }) => {
  const {
    fileInputRefs,
    handleEditImageClick,
    handleImageChange,
    loadingImage,
  } = useImageUploader();

  // Initialize formData with duration converted to number
  const [formData, setFormData] = useState({
    ...serviceData,
    deliveryTime: parseInt(serviceData.deliveryTime, 10) || 30, // Convert string to number, default to 30 if invalid
  });
  const [imageUrl, setImageUrl] = useState(serviceData.serviceImage);
  const [isCustomDuration, setIsCustomDuration] = useState(
    ![30, 60, 90, 120, 150, 180].includes(formData.deliveryTime) &&
      formData.deliveryTime !== ""
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "deliveryTime") {
      // Handle duration as a number
      if (value === "custom") {
        setIsCustomDuration(true);
        setFormData({
          ...formData,
          deliveryTime: "", // Clear duration until custom value is entered
        });
      } else {
        setIsCustomDuration(false);
        setFormData({
          ...formData,
          deliveryTime: parseInt(value, 10) || 30, // Convert to number, default to 30
        });
      }
    } else if (name === "customDeliveryTime") {
      // Handle custom duration input
      setFormData({
        ...formData,
        deliveryTime: parseInt(value, 10) || "", // Convert to number, allow empty for invalid input
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  // ...existing code...
  const handleImageUpload = async (e) => {
    console.log("file input event:", e);
    const file = e?.target?.files?.[0];
    if (!file) {
      console.warn("No file selected");
      return;
    }

    // show immediate preview while upload happens
    const previewUrl = URL.createObjectURL(file);
    setImageUrl(previewUrl);
    setFormData((prev) => ({
      ...prev,
      serviceImage: previewUrl,
    }));

    try {
      const uploadedUrl = await handleImageChange(e, "service", "image");
      console.log("Uploaded Image URL (from hook):", uploadedUrl);
      if (uploadedUrl) {
        setImageUrl(uploadedUrl);
        setFormData((prevData) => ({
          ...prevData,
          serviceImage: uploadedUrl,
        }));
      } else {
        console.warn(
          "handleImageChange did not return a URL. Keeping preview URL until upload completes or hook exposes the final URL."
        );
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };
  // ...existing code...
  // const handleImageUpload = async (e) => {
  //   console.log("this is event", e);
  //   const newImageUrl = await handleImageChange(e, "service", "image");
  //   console.log("New Image URL:", newImageUrl);
  //   if (newImageUrl) {
  //     setImageUrl(newImageUrl);
  //     setFormData((prevData) => ({
  //       ...prevData,
  //       serviceImage: newImageUrl,
  //     }));
  //   }
  // };

  const handleSubmit = () => {
    // Ensure duration is a number before saving
    const finalFormData = {
      ...formData,
      deliveryTime: parseInt(formData.deliveryTime, 10) || 30, // Ensure number, default to 30 if invalid
    };
    console.log("Final Form Data to Save:", finalFormData);
    handleSave(finalFormData);
    onClose();
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
    <Modal
      show={isOpen}
      onClose={onClose}
      size="2xl"
      className="backdrop-blur-md font-body"
    >
      <Modal.Header className="relative p-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-primary2 font-bold bg-sec2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-primary6"
        >
          ×
        </button>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="bg-sec1 p-5 rounded-xl mb-10">
            <Heading
              level={2}
              size="[24px]"
              weight="font-semibold"
              color="primary2"
              className="text-xl"
            >
              Edit Service
            </Heading>
            <p className="text-base text-ter11">
              Kindly enter the details of the service you want to edit
            </p>
          </div>

          <form className="grid grid-cols-1 gap-6 lg:grid-cols-1">
            <div>
              <label htmlFor="serviceName" className="font-semibold">
                Service Name
              </label>
              <LongInputWithPlaceholder
                id="serviceName"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Braided hair style"
                className="mt-2 block w-full border-ter11 rounded-md shadow-sm px-3 py-2 focus:ring-primary focus:border-primary"
              />
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <label htmlFor="description" className="font-semibold">
                  Brief Description
                </label>
                <textarea
                  id="description"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Stylish low cut with a touch of afro."
                  className="mt-2 block w-full border-ter11 rounded-md shadow-sm border px-3 py-2 focus:ring-primary focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="image" className="font-semibold">
                  Upload Image
                </label>
                <div className="flex flex-col justify-center items-center mt-2">
                  <LongInputWithPlaceholder
                    type="text"
                    value={imageUrl}
                    readOnly
                    className="w-full border-ter11 rounded-md shadow-sm px-3 py-2 mb-2 focus:ring-primary focus:border-primary"
                  />
                  <div className="flex w-full justify-center items-center border-dashed border-2 border-ter11 rounded-md h-20">
                    <input
                      type="file"
                      ref={(el) =>
                        (fileInputRefs.current["service-image"] = el)
                      }
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
                          aria-label="uploading New Service Image..."
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
                <label htmlFor="price" className="font-semibold">
                  Service Pricing
                </label>
                <LongInputWithPlaceholder
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  type="text"
                  placeholder="20,000"
                  className="mt-2 block w-full border-ter11 rounded-md shadow-sm px-3 py-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="currency" className="font-semibold">
                  Service Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  className="mt-2 block w-full border-ter11 border rounded-md shadow-sm px-3 py-2 focus:ring-primary focus:border-primary"
                >
                  <option value="NGN">₦</option>
                </select>
              </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-4">
              <div>
                <label htmlFor="location" className="font-semibold">
                  Service Location
                </label>
                <select
                  id="location"
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  className="mt-2 block w-full border-ter11 border rounded-md shadow-sm px-3 py-2 focus:ring-primary focus:border-primary"
                >
                  <option value="Onsite">Onsite</option>
                  <option value="Home Service">Home Service</option>
                </select>
              </div>

              <div>
                <label htmlFor="deliveryTime" className="font-semibold">
                  Duration (in minutes)
                </label>
                <select
                  id="deliveryTime"
                  name="deliveryTime"
                  value={
                    isCustomDuration ? "custom" : formData.deliveryTime || 30
                  }
                  onChange={handleChange}
                  className="mt-2 block w-full border-ter11 border rounded-md shadow-sm px-3 py-2 focus:ring-primary focus:border-primary"
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
                    className="mt-2 block w-full border-ter11 rounded-md shadow-sm px-3 py-2 focus:ring-primary focus:border-primary"
                  />
                )}
                <p className="text-sm text-gray-500 mt-1">
                  Duration is in minutes
                </p>
              </div>
            </div>
          </form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <div className="flex justify-between w-full">
          <ButtonSmallWhite
            type="button"
            onClick={onClose}
            className="text-primary3 py-2 px-6 rounded border border-primary3 hover:bg-primary3 hover:text-primary1 transition-all"
          >
            Discard
          </ButtonSmallWhite>
          <ButtonSmallPurple
            type="button"
            onClick={handleSubmit}
            className="bg-primary3 text-primary1 ml-2 lg:ml-0 py-2 px-6 rounded hover:bg-primary3 transition-all"
          >
            Save Changes
          </ButtonSmallPurple>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EditServiceModal;
