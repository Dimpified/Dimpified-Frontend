import React, { useState } from "react";
import BlockedTimeModal from "./BlockTimeModal";
import CreatorDashboardLayout from "../../../../layout/Creator/CreatorDashboardLayout";
import { Heading } from "../../../../component/Text";
import EditTemplateImage from "../../../../assets/EditTemplate.svg";
import { useNavigate } from "react-router-dom";

// General icons for items (unchanged)
const LunchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4 6h16M4 12h16m-7 6h7"
    />
  </svg>
);

const MeetingIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-600"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 20h5v-2a2 2 0 00-2-2h-3m-2-2H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2z"
    />
  </svg>
);

const BlockTime = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [blockedTimes, setBlockedTimes] = useState([
    {
      title: "Lunch",
      duration: "1 Hour",
      date: "Mar 2nd - 14th, 2025",
      icon: <LunchIcon />,
    },
    {
      title: "Meeting",
      duration: "1 Hour",
      date: "Mar 2nd - 14th, 2025",
      icon: <MeetingIcon />,
    },
  ]);

  const handleAddBlockedTime = (newBlockedTime) => {
    const defaultIcon =
      newBlockedTime.title.toLowerCase() === "lunch" ? (
        <LunchIcon />
      ) : (
        <MeetingIcon />
      );
    setBlockedTimes([...blockedTimes, { ...newBlockedTime, icon: defaultIcon }]);
  };

  const handleDelete = (index) => {
    setBlockedTimes(blockedTimes.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    console.log("Edit blocked time at index:", index);
    alert(
      "Edit functionality can be implemented by reopening the modal with pre-filled data."
    );
  };

  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 w-full p-4 sm:p-6 lg:p-10 mx-0 sm:mx-3 rounded-[8px] font-body">
        <Heading className="font-semibold text-xl sm:text-2xl lg:text-[26px] text-primary4">
          Block Time Off
        </Heading>
        <img
          src={EditTemplateImage}
          alt=""
          className="w-24 sm:w-32 pr-4 sm:pr-6 right-0 bottom-0 absolute"
        />
      </div>
      <div className="min-h-screen p-4 sm:p-6 lg:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="flex items-center w-full sm:w-auto">
            <button
              onClick={() => navigate("/creator/dashboard/booking")}
              className="bg-primary3 text-white px-4 py-2 rounded-lg hover:bg-purple-300 w-full sm:w-auto"
            >
              Back
            </button>
          </div>
        </div>

        {/* Blocked Times Section */}
        <div className="w-full mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                Blocked Times Types
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Create and customize blocked times that can be scheduled in the
                calendar.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary3 text-white px-4 py-2 rounded-lg hover:bg-purple-300 w-full sm:w-auto"
            >
              Add
            </button>
          </div>

          {/* Blocked Times List */}
          <div className="space-y-4">
            {blockedTimes.map((blockedTime, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-lg shadow-sm border border-gray-200 gap-4"
              >
                {/* Left: Icon and Title */}
                <div className="flex items-center space-x-4 w-full sm:w-1/4">
                  <div className="flex-shrink-0">{blockedTime.icon}</div>
                  <p className="font-medium text-gray-800 uppercase text-sm sm:text-base">
                    {blockedTime.title}
                  </p>
                </div>

                {/* Middle: Duration and Date */}
                <div className="flex flex-col sm:flex-row sm:space-x-10 w-full sm:w-1/2 gap-4 sm:gap-0">
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Duration</p>
                    <p className="text-sm text-gray-800">
                      {blockedTime.duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase">Date</p>
                    <p className="text-sm text-gray-800">{blockedTime.date}</p>
                  </div>
                </div>

                {/* Right: Edit and Delete Buttons */}
                <div className="flex flex-row sm:flex-col space-x-4 sm:space-x-0 sm:space-y-4 w-full sm:w-auto justify-start sm:justify-end">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-gray-600 hover:text-gray-800 flex items-center text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L15.232 5.232z"
                      />
                    </svg>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="text-red-500 hover:text-red-700 flex items-center text-sm"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4M4 7h16"
                      />
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal */}
        <BlockedTimeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddBlockedTime}
        />
      </div>
    </CreatorDashboardLayout>
  );
};

export default BlockTime;