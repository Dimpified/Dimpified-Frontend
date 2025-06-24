import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import api from "../../../api/DashboardApi";
import axios from "axios";
import { showToast } from "../../../component/ShowToast";
import { LongInputWithPlaceholder } from "../../../component/Inputs";

const AddTeamMemberModal = ({ onClose, getTeamMembers }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const creatorId = useSelector((state) => state.auth.user?.creatorId);
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  console.log(accessToken, refreshToken)

  const [formData, setFormData] = useState({
    fullName: "",
    gender: "",
    phoneNumber: "",
    email: "",
    services: [], // Will store service IDs
    ecosystemDomain,
    creatorId,
    accessToken,
    refreshToken

  });

  useEffect(() => {
    const getServiceDetails = async () => {
      if (!accessToken || !refreshToken) return;
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${ecosystemDomain}`
        );
        const allServices = response.data.flatMap((item) => item.services);
        setServices(allServices);
        
      } catch (error) {
       showToast(error.response?.data?.message || "Failed to load services", "error");
      } finally {
        setIsLoading(false);
      }
    };
    getServiceDetails();
  }, [accessToken, refreshToken, ecosystemDomain]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!accessToken || !refreshToken) return;

    setIsLoading(true); // Start loading

    try {
      const response = await api.creatorAddTeamMember(formData);
      console.log("Form Data Submitted:", formData);

      showToast(response.data.message, "success");

      onClose();
      
    } catch (error) {
      console.error("Error submitting team member:", error);

      // Show error toast using your ShowToast component
      showToast(error.message || "Failed to add team member. Please try again.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center backdrop-blur-lg px-2 lg:px-0">
      <div className="bg-white p-4 lg:p-12 rounded-lg w-full max-w-3xl h-[90vh] overflow-y-auto">
        {/* Back Button */}
        <button
          className="bg-primary3 text-white px-4 py-2 rounded mb-4 flex items-center"
          onClick={onClose}
          disabled={isLoading} // Disable while loading
        >
          ← Back
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4">Add Team Member</h2>

        {/* Profile Section */}
        <div>
          <div className="flex items-center gap-4 w-full my-10">
            <h3 className="text-lg font-semibold mb-2 pb-1">Profile</h3>
            <hr className="flex-grow h-[2px] bg-black ml-2" />
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-white text-2xl">
              F
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 my-16">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <LongInputWithPlaceholder
              placeholder={"Enter Team Full Name"}
                type="text"
                name="fullName"
                className="w-full p-2 border rounded "
                value={formData.fullName}
                onChange={handleInputChange}
                disabled={isLoading} // Disable while loading
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                name="gender"
                className="w-full p-2 border rounded"
                value={formData.gender}
                onChange={handleInputChange}
                disabled={isLoading} // Disable while loading
              >
                <option value="">-- Select --</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <LongInputWithPlaceholder
              placeholder={"Enter Team Phone Number"}
                type="text"
                name="phoneNumber"
                className="w-full p-2 border rounded"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                disabled={isLoading} // Disable while loading
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <LongInputWithPlaceholder
              placeholder={"Enter Team Email"}
                type="email"
                name="email"
                className="w-full p-2 border rounded"
                value={formData.email}
                onChange={handleInputChange}
                disabled={isLoading} // Disable while loading
              />
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-6">
          <div className="flex items-center gap-4 w-full mt-10">
            <h3 className="text-lg font-semibold mb-2 pb-1">Services</h3>
            <hr className="flex-grow h-[2px] bg-black ml-2" />
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Choose the services this team member provides
          </p>

          <div className="space-y-2">
            {services.map((service) => (
              <div
                key={service._id}
                className="flex justify-between items-center space-y-4"
              >
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 w-5 h-5 border-purple-500"
                    checked={formData.services.includes(service._id)}
                    onChange={() => handleServiceChange(service._id)}
                    disabled={isLoading} // Disable while loading
                  />
                  {service.name}
                </label>
                <span>N{service.price} {service.priceFormat === "Fixed" ? "" : "per hour"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            onClick={onClose}
            disabled={isLoading} // Disable while loading
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:bg-purple-300"
            onClick={handleSubmit}
            disabled={isLoading} // Disable while loading
          >
            {isLoading ? "Adding..." : "Add Team Member"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTeamMemberModal;