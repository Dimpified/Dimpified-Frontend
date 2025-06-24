import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import AddTeamModal from "./AddTeamMemberModal";
import ViewTeamProfileModal from "./ViewProfileModal";
import { ButtonSmallPurple } from "../../../component/Buttons";
import api from "../../../api/DashboardApi";
import { showToast } from "../../../component/ShowToast";
import { useSelector } from "react-redux";

const TeamList = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [search, setSearch] = useState("");
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null); // ✅ For View Modal

  useEffect(() => {
    getTeamMembers();
  }, [ecosystemDomain, accessToken, refreshToken]);

  const getTeamMembers = async () => {
    if (!accessToken || !refreshToken) return;
    setIsLoading(true);
    try {
      const response = await api.creatorGetAddedTeamMember({
        ecosystemDomain,
        accessToken,
        refreshToken,
      });
      const members = response.data.teamMembers || [];
      setTeamMembers(members);
    } catch (error) {
      console.error("Could not get team members:", error);
      showToast({
        message: "Failed to load team members. Please try again.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      member.email?.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (_id) => {
    setSelectedIds((prev) =>
      prev.includes(_id)
        ? prev.filter((selectedId) => selectedId !== _id)
        : [...prev, _id]
    );
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = filteredMembers.map((member) => member._id);
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;
    setIsLoading(true);
    try {
      const response = await api.creatorDeleteTeamMember({
        ecosystemDomain,
        accessToken,
        refreshToken,
        ids: selectedIds,
      });
      setTeamMembers(
        teamMembers.filter((member) => !selectedIds.includes(member._id))
      );
      setSelectedIds([]);
      showToast(response.data.message, "success");
    } catch (error) {
      console.error("Error deleting team members:", error);
      showToast({
        message:
          error.response?.data?.message || "Failed to delete team members.",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    getTeamMembers();
    setSearch("");
  };

  const handleViewProfile = (member) => {
    setSelectedMember(member);
  };

  return (
    <div className="p-6 w-full mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <ButtonSmallPurple
            className="text-sm sm:text-base px-3 py-1 sm:px-4 sm:py-2"
            onClick={() => setIsModalOpen(true)}
            disabled={isLoading}
          >
            + Add Team
          </ButtonSmallPurple>
          <FaTrash
            className={`text-lg cursor-pointer transition-colors ${
              selectedIds.length === 0 || isLoading
                ? "text-gray-500 opacity-50 cursor-not-allowed"
                : "text-gray-500 hover:text-red-500"
            }`}
            onClick={selectedIds.length > 0 && !isLoading ? handleDelete : null}
            aria-disabled={selectedIds.length === 0 || isLoading}
          />
        </div>
      </div>

      {/* Search Input */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold whitespace-nowrap">
          {teamMembers.length} Team Members
        </h2>
        <div className="relative flex-grow mx-4">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            placeholder="Search by name or email"
            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        {isLoading ? (
          <div className="text-center p-4">Loading...</div>
        ) : (
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3">
                  <input
                    type="checkbox"
                    onChange={toggleSelectAll}
                    checked={
                      filteredMembers.length > 0 &&
                      selectedIds.length === filteredMembers.length
                    }
                    disabled={isLoading || filteredMembers.length === 0}
                  />
                </th>
                <th className="p-3">S/N</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone Number</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.length > 0 ? (
                filteredMembers.map((member, index) => (
                  <tr
                    key={member._id}
                    className="border-b hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(member._id)}
                        onChange={() => toggleSelect(member._id)}
                        disabled={isLoading}
                      />
                    </td>
                    <td className="p-3">{String(index + 1).padStart(2, "0")}</td>
                    <td className="p-3">{member.fullName || "N/A"}</td>
                    <td className="p-3">{member.email || "N/A"}</td>
                    <td className="p-3">{member.phoneNumber || "N/A"}</td>
                    <td className="p-3">
                      <button
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                        onClick={() => handleViewProfile(member)}
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-500">
                    {search ? "No results found" : "No team members added yet"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add Team Modal */}
      {isModalOpen && <AddTeamModal onClose={handleModalClose} />}

      {/* View Profile Modal */}
      {selectedMember && (
        <ViewTeamProfileModal
          onClose={() => setSelectedMember(null)}
          teamMember={selectedMember}
          services={selectedMember.services || []}
        />
      )}
    </div>
  );
};

export default TeamList;
