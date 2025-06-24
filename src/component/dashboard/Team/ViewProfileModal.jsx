import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LongInputWithPlaceholder } from "../../../component/Inputs";
import api from "../../../api/DashboardApi";
import { showToast } from "../../../component/ShowToast";

const ViewTeamProfileModal = ({ onClose, teamMember = {} }) => {
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
   const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [teamProfile, setTeamProfile] = useState(null);

  useEffect(() => {
    const fetchTeamProfile = async () => {
      try {
        const res = await api.creatorGetTeamProfile({
          accessToken,
          refreshToken,
          creatorId: teamMember.creatorId,
        });

        const profile = res.data.teamProfile;
        setTeamProfile(profile);

        const assigned = profile.services || [];
        const unassigned = profile.unAssignedServices || [];

        setServices([...assigned, ...unassigned]);
        setSelectedServices(assigned.map((s) => s._id));
      } catch (err) {
        showToast("Failed to load team profile", "error");
      }
    };

    if (teamMember.creatorId) {
      fetchTeamProfile();
    }
  }, [teamMember.creatorId, accessToken, refreshToken]);

  const toggleService = (id) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    try {
      await api.creatorEditTeamMemberServices({
        accessToken,
        refreshToken,
        ecosystemDomain,
        teamMemberId: teamMember.creatorId,
        services: selectedServices,
      });

      showToast("Services updated successfully", "success");
      onClose();
    } catch (err) {
      showToast("Failed to update services", "error");
    }
  };

  if (!teamProfile) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center backdrop-blur-lg px-2 lg:px-0">
      <div className="bg-white p-4 lg:p-12 rounded-lg w-full max-w-3xl h-[90vh] overflow-y-auto">
        {/* Back Button */}
        <button
          className="bg-primary3 text-white px-4 py-2 rounded mb-4 flex items-center"
          onClick={onClose}
        >
          ← Back
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-4">Team Member Profile</h2>

        {/* Profile Section */}
        <div>
          <div className="flex items-center gap-4 w-full my-10">
            <h3 className="text-lg font-semibold mb-2 pb-1">Profile</h3>
            <hr className="flex-grow h-[2px] bg-black ml-2" />
          </div>
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-white text-2xl">
              {teamProfile.fullName?.[0] || "U"}
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 my-16">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <LongInputWithPlaceholder
                value={teamProfile.fullName}
                placeholder="Full Name"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Gender</label>
              <select
                value={teamProfile.gender}
                disabled
                className="w-full p-2 border rounded bg-gray-100 text-gray-600"
              >
                <option value="">--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Phone Number</label>
              <LongInputWithPlaceholder
                value={teamProfile.phoneNumber}
                placeholder="Phone Number"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <LongInputWithPlaceholder
                value={teamProfile.email}
                placeholder="Email"
                disabled
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
            Check the services this team member can offer
          </p>

          <div className="space-y-2">
            {services.map((service) => (
              <div key={service._id} className="flex justify-between items-center">
                <label className="flex items-center text-gray-800">
                  <input
                    type="checkbox"
                    className="mr-2 w-5 h-5"
                    checked={selectedServices.includes(service._id)}
                    onChange={() => toggleService(service._id)}
                  />
                  {service.name}
                </label>
                <span>₦{service.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 gap-4">
          <button
            className="px-4 py-2 border rounded text-gray-600 hover:bg-gray-100"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-primary3 text-white rounded hover:bg-primary4"
            onClick={handleSave}
          >
            Edit Member Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTeamProfileModal;
