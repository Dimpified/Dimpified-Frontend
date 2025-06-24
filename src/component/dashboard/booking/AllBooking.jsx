import React, { useState } from "react";
import { Heading, Text } from "../../Text";
import { showToast } from "../../../component/ShowToast";
import api from "../../../api/DashboardApi";
import { useSelector } from "react-redux";

const AllBooking = ({ bookingDetails, getBookingActivities }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedBookings, setCheckedBookings] = useState({});
  const [markAsCompletedLoading, setMarkAsCompletedLoading] = useState(false);
  const itemsPerPage = 5;
  const { accessToken, refreshToken } = useSelector((state) => state.auth);


  // Function to format date to "10 Oct 2024"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const MarkAsCompleted = async (bookingId) => {
    setMarkAsCompletedLoading(true);
    try {
      const response = await api.creatorMarkBooking({
        bookingId: bookingId,
        accessToken,
        refreshToken
      });
      showToast("Marked as completed", "success");
      getBookingActivities();

      setCheckedBookings((prev) => ({
        ...prev,
        [bookingId]: true,
      }));
    } catch (error) {
      console.error("Could not mark booking as completed:", error);
      showToast(
        error?.response?.data?.message || "Failed to mark as completed",
        "error"
      );
    } finally {
      setMarkAsCompletedLoading(false);
    }
  };

  // Pagination logic
  const totalItems = bookingDetails?.allBookings?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookingDetails?.allBookings?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  // Handle "Done" button click
  const handleMarkAsCompleted = (bookingId) => {
    MarkAsCompleted(bookingId);
  };

  return (
    <div className="w-full my-10 bg-primary1 shadow-md rounded-2xl overflow-hidden">
      <Heading level={2} weight="font-bold" className="text-2xl font-bold mb-4 px-4">
        All Bookings
      </Heading>

      <div className="flex-1 overflow-x-auto mx-3">
        {totalItems === 0 ? (
          <div className="flex justify-center items-center p-10">
            <Text className="text-gray-500">No recent activities found.</Text>
          </div>
        ) : (
          <div className="w-full max-w-6xl lg:max-w-5xl">
            <table className="min-w-full bg-primary1 border border-sec1 table-auto">
              <thead className="bg-gray-100">
                <tr className="border-b-2">
                  {[
                    "ID",
                    "Customer Name",
                    "Service",
                    "Date",
                    "Time",
                    "Location",
                    "Amount",
                    "Payment",
                    "Status",
                    "✔",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      className="py-4 px-2 text-left whitespace-nowrap font-semibold"
                      scope="col"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentBookings?.map((activity) => {
                  const isChecked =
                    checkedBookings[activity.bookingId] ||
                    activity.status === "Completed";

                  return (
                    <tr
                      key={activity.bookingId}
                      className="hover:bg-sec1 transition-colors duration-150"
                    >
                      <td className="py-4 px-4 border-b whitespace-nowrap">
                        {activity.bookingId}
                      </td>
                      <td className="py-4 px-4 border-b whitespace-nowrap">
                        {activity.name}
                      </td>
                      <td className="py-4 px-4 border-b whitespace-nowrap">
                        {activity.service}
                      </td>
                      <td className="py-4 px-4 border-b whitespace-nowrap">
                        {formatDate(activity.date)}
                      </td>
                      <td className="py-4 px-4 border-b whitespace-nowrap">
                        {activity.time}
                      </td>
                      <td className="py-4 px-4 border-b whitespace-nowrap">
                        {activity.bookingType}
                      </td>
                      <td className="py-4 px-4 border-b whitespace-nowrap">
                        {activity.price}
                      </td>
                      <td className="py-4 px-4 border-b whitespace-nowrap">
                        {activity.paymentStatus}
                      </td>
                      <td className="py-4 px-4 border-b whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              activity.status === "Pending"
                                ? "bg-yellow-500"
                                : "bg-green-700"
                            }`}
                            aria-hidden="true"
                          ></span>
                          <span
                            className={`font-semibold ${
                              activity.status === "Pending"
                                ? "text-yellow-500"
                                : "text-green-500"
                            }`}
                          >
                            {activity.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 border-b text-center whitespace-nowrap">
                        <input
                          type="checkbox"
                          className="w-5 h-5 cursor-pointer rounded text-purple-600 focus:ring-purple-500"
                          checked={isChecked}
                          readOnly
                          aria-label={`Mark booking ${activity.bookingId} as completed`}
                        />
                      </td>
                      <td className="py-4 px-4 border-b text-center whitespace-nowrap">
                        <button
                          className={`px-4 py-2 rounded-lg text-white font-medium transition-colors duration-150 ${
                            isChecked || markAsCompletedLoading
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                          }`}
                          onClick={() => handleMarkAsCompleted(activity._id)}
                          disabled={isChecked || markAsCompletedLoading}
                          aria-label={`Complete booking ${activity._id}`}
                        >
                          {markAsCompletedLoading ? "Loading..." : "Done"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination controls */}
      {totalItems > 0 && (
        <div className="flex justify-center my-4">
          <button
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 text-white"
            }`}
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            {"<"}
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-sec1"
              }`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === totalPages
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-primary3 text-white"
            }`}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AllBooking;