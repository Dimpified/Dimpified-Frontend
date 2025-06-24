import { LongInputWithPlaceholder } from "../../../component/Inputs";
import React, { useState } from "react";
import { FiCamera } from "react-icons/fi";
import api from "../../../api/DashboardApi";
import { useSelector } from "react-redux";
import { showToast } from "../../../component/ShowToast";

const AddCustomerModal = ({ onClose, setCustomers, getAllCustomers }) => {
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    address: "",
    profileImage: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profileImage: URL.createObjectURL(file) });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await api.creatorAddCustomer({
        ecosystemDomain,
        accessToken,
        refreshToken,
        fullName: formData.name,
        phoneNumber: formData.phone,
        email: formData.email,
        gender: formData.gender || "Nil",
        address: formData.address || "Not Available",
        dob: formData.dob ? new Date(formData.dob) : Date.now(),
      });

    //   setCustomers((prev) => [...prev, response.data.customer]); // Ensure correct API response key
    showToast("Customer Added Successfully", "success");
      onClose();
      getAllCustomers();
    } catch (error) {
      console.error("Could not add customer:", error);
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4 backdrop-blur-md">
      <div className="bg-white w-full max-w-xl rounded-lg shadow-lg overflow-hidden">
        {/* Modal Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-2xl font-bold">Add Customer</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl">
            &times;
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <p className="text-gray-500 mb-6">
            Manage your Customer’s personal profile
          </p>

          {/* Profile Image Upload */}
          <div className="relative flex justify-center mb-6">
            <label htmlFor="profileUpload" className="relative cursor-pointer">
              <input
                type="file"
                id="profileUpload"
                className="hidden"
                onChange={handleImageUpload}
              />
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center relative">
                {formData.profileImage ? (
                  <img
                    src={formData.profileImage}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xl font-semibold text-gray-600">F</span>
                )}
                <div className="absolute bottom-0 right-0 bg-gray-300 p-1 rounded-full">
                  <FiCamera size={14} className="text-gray-600" />
                </div>
              </div>
            </label>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium">
                Full Name <span className="text-ter7">*</span>
              </label>
              <LongInputWithPlaceholder
              placeholder="Enter Customer Full Name"
                type="text"
                name="name"
                className="w-full border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required={true} 
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Gender </label>
              <select
                name="gender"
                className="w-full border border-gray-300 p-2 rounded"
                onChange={handleChange}
              >
                <option value="">--Select--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Date of Birth
              </label>
              <LongInputWithPlaceholder
              
                type="date"
                name="dob"
                className="w-full border border-gray-300 p-2 rounded"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">
                Phone Number <span className="text-ter7">*</span>
              </label>
              <div className="flex border border-gray-300 p-2 rounded items-center">
                <span className="text-gray-600 pr-2">+234</span>
                <LongInputWithPlaceholder
                placeholder="Enter Customer Phone Number"
                  type="text"
                  name="phone"
                  className="w-full outline-none"
                  onChange={handleChange}
                  required={true} 
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email <span className="text-ter7">*</span></label>
              <LongInputWithPlaceholder
              placeholder="Enter Customer Email"
                type="email"
                name="email"
                className="w-full border border-gray-300 p-2 rounded"
                onChange={handleChange}
                required={true} 
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Address</label>
              <LongInputWithPlaceholder
              placeholder="Enter Customer Address"
                type="address"
                name="address"
                className="w-full border border-gray-300 p-2 rounded"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 border-t flex justify-end">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Customer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCustomerModal;
