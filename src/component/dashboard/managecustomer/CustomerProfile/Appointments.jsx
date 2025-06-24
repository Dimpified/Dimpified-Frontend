import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../../../api/DashboardApi";

const Appointments = ({ onClose, customer }) => {
  const [filter, setFilter] = useState("All"); // Track active filter
  const [loading, setLoading] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    getACustomersAppointment();
  }, [ecosystemDomain, accessToken, refreshToken]);

  const getACustomersAppointment = async () => {
    setLoading(true);
    try {
      if (!accessToken || !refreshToken) return;
      const response = await api.creatorGetACustomerAppointment({
        ecosystemDomain,
        email: customer.email,
        accessToken,
        refreshToken,
      });

      if (response.data) {
        setAppointments(response.data.all || []); // Store all appointments
      }
    } catch (error) {
      console.error("Could not fetch customer appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filter appointments based on selected tab
  const filteredAppointments = appointments.filter((appointment) => {
    if (filter === "All") return true;
    return filter === "Completed"
      ? appointment.status === "Completed"
      : appointment.status === "Pending";
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem);

  // Handle Page Change
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const nextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center overflow-y-auto px-4">
      {/* Back Button */}
      <button
        className="absolute top-4 left-4 bg-purple-500 text-white px-4 py-2 rounded"
        onClick={onClose}
      >
        ← Back
      </button>

      <h1 className="text-xl font-bold mt-10">Appointments</h1>

      {/* Tabs for Filtering */}
      <div className="flex gap-4 mt-4">
        {["All", "Completed", "Pending"].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              filter === tab ? "bg-purple-500 text-white" : "border"
            }`}
            onClick={() => {
              setFilter(tab);
              setCurrentPage(1); // Reset to first page on filter change
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Appointment List */}
      <div className="mt-6 w-full max-w-md">
        {loading ? (
          <p className="text-gray-500 text-center mt-6">Loading appointments...</p>
        ) : currentItems.length > 0 ? (
          currentItems.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white shadow-md p-4 rounded-lg mb-4"
            >
              <h2 className="font-semibold">{appointment.service}</h2>
              <p className="text-gray-500">
                📅 {new Date(appointment.date).toDateString()} • 🕒 {appointment.time}
              </p>
              <p className="text-purple-500 text-right font-bold">₦{appointment.price.toLocaleString()}</p>

              {/* Status */}
              <div className="mt-2">
                <p
                  className={`text-center border-t pt-2 ${
                    appointment.status === "Completed"
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {appointment.status}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-6">
            No {filter.toLowerCase()} appointments
          </p>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            ← Prev
          </button>
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Appointments;
