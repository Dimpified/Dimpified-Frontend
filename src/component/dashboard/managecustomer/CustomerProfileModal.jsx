import React, { useState, useEffect } from "react";
import CustomerEdit from "./CustomerProfile/CustomerEdit";
import Appointments from "./CustomerProfile/Appointments";
import api from "../../../api/DashboardApi";
import { useSelector } from "react-redux";

const CustomerProfileModal = ({ customer, onClose, getAllCustomers }) => {
  const [activeSection, setActiveSection] = useState(null);
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState(null);

  useEffect(() => {
    getACustomers();
  }, [ecosystemDomain, accessToken, refreshToken]);

  const getACustomers = async () => {
    setLoading(true);
    try {
      if (!accessToken || !refreshToken) return;
      const response = await api.creatorGetACustomer({
        accessToken,
        refreshToken,
        id: customer.id,
      });
      setCustomers(response.data.customer);
    } catch (error) {
      console.error("Could not fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    getAllCustomers();
    };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-white flex flex-col items-center justify-center">
      {/* Back Button */}
      <button
        className="absolute top-6 left-6 px-4 py-2 bg-purple-500 text-white rounded-lg"
        onClick={handleClose}
      >
        &larr; Back
      </button>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center">
          <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
          <p className="text-gray-600 mt-2">Loading Customer Details...</p>
        </div>
      )}

      {/* Profile Section */}
      {!loading && !activeSection && customers && (
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-bold">Customer Profile</h1>
          <p className="text-gray-500">
            Manage your Customer’s personal profile
          </p>

          {/* Profile Image */}
          <div className="my-6 relative">
            <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-white text-2xl">
              {customers.username?.charAt(0).toUpperCase()}
            </div>
            {/* Small Camera Icon (for profile editing) */}
            <div className="absolute bottom-0 right-0 bg-white border-2 border-white rounded-full p-1">
              <img src="/camera-icon.png" alt="Edit" className="w-4 h-4" />
            </div>
          </div>
          <h2 className="text-lg font-bold">{customers.username}</h2>
          <p className="text-gray-500">{customers.email}</p>

          {/* Options */}
          <div className="mt-4 w-full max-w-xs">
            <button
              className="w-full flex justify-between py-3 px-4 border-b hover:bg-gray-100"
              onClick={() => setActiveSection("edit")}
            >
              Edit Customer Details <span>&gt;</span>
            </button>

            <button
              className="w-full flex justify-between py-3 px-4 border-b hover:bg-gray-100"
              onClick={() => setActiveSection("appointments")}
            >
              Appointments <span>&gt;</span>
            </button>
{/* 
            <button
              className="w-full flex justify-between py-3 px-4 hover:bg-gray-100"
              onClick={() => setActiveSection("reviews")}
            >
              Reviews <span>&gt;</span>
            </button> */}
          </div>
        </div>
      )}

      {/* Sections */}
      {activeSection === "edit" && (
        <CustomerEdit customer={customers} onClose={() => setActiveSection(null)} getAllCustomers={getACustomers} />
      )}
      {activeSection === "appointments" && (
        <Appointments customer={customers} onClose={() => setActiveSection(null)} />
      )}
    </div>
  );
};

export default CustomerProfileModal;
