import React, { useState, useEffect } from "react";
import api from "../../../../api/DashboardApi";
import { useSelector } from "react-redux";
import { showToast } from "../../../../component/ShowToast";

const CustomerEdit = ({ onClose, customer, getAllCustomers }) => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  // Initialize state with customer data
  const [formData, setFormData] = useState({
    fullName: customer?.username || "",
    gender: customer?.gender || "",
    dob: customer?.dob || "",
    phoneNumber: customer?.phoneNumber || "",
    email: customer?.email || "",
    address: customer?.address || "",
  });

  const [loading, setLoading] = useState(false); // Loading state

  // Update state when customer changes
  useEffect(() => {
    setFormData({
      fullName: customer?.username || "",
      gender: customer?.gender || "",
      dob: customer?.dob || "",
      phoneNumber: customer?.phoneNumber || "",
      email: customer?.email || "",
      address: customer?.address || "",
    });
  }, [customer]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.creatorEditCustomer({
        id: customer.id,
        accessToken,
        refreshToken,
        fullName: formData.fullName,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
        gender: formData.gender || "Not Available",
        address: formData.address || "Not Available",
        dob: formData.dob ? new Date(formData.dob) : "Not Available",
      });

      showToast("Customer Profile Edited Successfully", "success");
      getAllCustomers();
      onClose();
    } catch (error) {
      console.error("Could not edit customer:", error);
      showToast("Failed to edit customer", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center px-4 py-6 overflow-y-auto">
      {/* Back Button */}
      <button className="absolute top-4 left-4 bg-purple-500 text-white px-4 py-2 rounded" onClick={onClose}>
        ← Back
      </button>

      {/* Title */}
      <h1 className="text-xl font-bold mt-12">Edit Customer Details</h1>
      <p className="text-gray-500 text-sm">Manage your client’s personal profile</p>

      {/* Profile Image Section */}
      <div className="my-6 flex flex-col items-center">
        {customer?.imageUrl ? (
          <img src={customer.imageUrl} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
        ) : (
          <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center text-white text-2xl">
            {customer?.username ? customer.username.charAt(0) : "?"}
          </div>
        )}
      </div>

      {/* Form */}
      <div className="w-full max-w-md p-4 bg-gray-50 rounded-lg shadow-md">
        {/* Full Name */}
        <label className="block text-gray-600 mb-1">Full Name</label>
        <input
          type="text"
          name="fullName"
          className="w-full p-2 border rounded mb-3"
          value={formData.fullName}
          onChange={handleChange}
        />

        {/* Gender */}
        <label className="block text-gray-600 mb-1">Gender</label>
        <select name="gender" className="w-full p-2 border rounded mb-3" value={formData.gender} onChange={handleChange}>
          <option value="">--Select--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Others">Others</option>
        </select>

        {/* Date of Birth */}
        <label className="block text-gray-600 mb-1">Date of Birth</label>
        <input
          type="date"
          name="dob"
          className="w-full p-2 border rounded mb-3"
          value={formData.dob}
          onChange={handleChange}
        />

        {/* Phone Number */}
        <label className="block text-gray-600 mb-1">Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          className="w-full p-2 border rounded mb-3"
          value={formData.phoneNumber}
          onChange={handleChange}
        />

        {/* Email */}
        <label className="block text-gray-600 mb-1">Email</label>
        <input
          type="email"
          name="email"
          className="w-full p-2 border rounded mb-3"
          value={formData.email}
          onChange={handleChange}
        />

        {/* Address */}
        <label className="block text-gray-600 mb-1">Address</label>
        <input
          type="text"
          name="address"
          className="w-full p-2 border rounded mb-3"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="px-6 py-2 border rounded" onClick={onClose} disabled={loading}>
          Cancel
        </button>
        <button
          className={`px-6 py-2 rounded text-white ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-500"}`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default CustomerEdit;
