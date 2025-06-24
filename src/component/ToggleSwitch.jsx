import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../api/DashboardApi";
import { showToast } from "../component/ShowToast";
import { setEcosystemStatus } from "../features/ecosystemStatus"; // Adjust the import path

const ToggleSwitch = () => {
  const dispatch = useDispatch();
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const creatorId = useSelector((state) => state.auth.user?.creatorId);
  const newStatus = useSelector((state) => state.ecosystemStatus.status); // Redux status

  const [isLoading, setIsLoading] = useState(false);

  const toggleEcosystem = async () => {
    if (isLoading) return; // Prevent multiple clicks

    setIsLoading(true);
    const updatedStatus = newStatus === "live" ? "private" : "live"; // Toggle logic

    try {
      const response = await api.creatorEcosystemSwitchOnOff({
        creatorId,
        ecosystemDomain,
        accessToken,
        refreshToken,
        status: updatedStatus,
      });

      if (response.data.message === "Ecosystem status updated successfully") {
        dispatch(setEcosystemStatus(updatedStatus)); // Update Redux state
        showToast(`Ecosystem turned ${updatedStatus} successfully`, "success");
      } else {
        showToast("Failed to toggle ecosystem", "error");
      }
    } catch (error) {
      console.error("Could not toggle ecosystem:", error);
      showToast("Failed to toggle ecosystem", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <span
        className={`text-lg font-semibold transition ${
          newStatus === "live" ? "text-green-600" : "text-gray-500"
        }`}
      >
        Your Ecosystem is {newStatus === "live" ? "live" : "private"}
      </span>
      <button
        onClick={toggleEcosystem}
        disabled={isLoading}
        className={`relative w-14 h-7 flex items-center rounded-full p-1 transition duration-300 shadow-inner focus:outline-none ${
          newStatus === "live" ? "bg-green-500" : "bg-gray-400"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <div
          className={`w-6 h-6 bg-white rounded-full shadow-md transform transition duration-300 ${
            newStatus === "live" ? "translate-x-6" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
