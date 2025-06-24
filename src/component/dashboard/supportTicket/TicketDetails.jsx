import { useEffect, useState, useCallback, memo } from "react";
import { FaPaperPlane } from "react-icons/fa";
import ComposeModal from "./ComposeModal";
import ForwardModal from "./ForwardModal"; // Import ForwardModal
import { useSelector } from "react-redux";
import api from "../../../api/DashboardApi";

const TicketDetails = ({ ticket, onClose }) => {
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [isForwardOpen, setIsForwardOpen] = useState(false); // Forward Modal state
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [ticketDetails, setTicketDetails] = useState(null);

  const getTicketDetails = useCallback(async () => {
    setLoading(true);
    try {
      if (!accessToken || !refreshToken) return;
      const response = await api.creatorGetASupport({
        ticketId: ticket,
        accessToken,
        refreshToken,
      });
      setTicketDetails(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [ticket, accessToken, refreshToken]);

  useEffect(() => {
    getTicketDetails();
  }, [getTicketDetails]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!ticketDetails) {
    return <p className="text-center">No details available for this ticket.</p>;
  }

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg w-full mx-auto">
      {/* Ticket Title */}
      <h2 className="text-lg sm:text-2xl font-bold text-purple-600 mb-4">
        {ticketDetails.reason}
      </h2>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3 sm:gap-0">
        <button
          className={`flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-2 rounded-lg shadow-md w-full sm:w-auto justify-center 
      ${
        ticketDetails.status === "completed"
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-purple-500 text-white"
      }`}
          onClick={() => setIsComposeOpen(true)}
          disabled={ticketDetails.status === "completed"}
        >
          <FaPaperPlane /> Reply
        </button>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            className="bg-gray-200 text-black px-3 py-1 sm:px-4 sm:py-2 rounded-lg w-full sm:w-auto"
            onClick={onClose}
          >
            Return
          </button>
        </div>
      </div>

      {/* User Message */}
      <div className="bg-purple-500 text-white font-semibold p-3 rounded-t-lg flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <span>{ticketDetails?.EcosystemUser?.username || "User"}</span>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mt-2 sm:mt-0">
          {/* <button
            className="bg-white text-purple-600 px-3 py-1 text-sm rounded-lg shadow-md w-full sm:w-auto"
            onClick={() => setIsForwardOpen(true)} // Open Forward Modal
          >
            Forward Message ➡
          </button> */}
          <span className="text-sm">
            {new Date(ticketDetails.createdAt).toLocaleString()}
          </span>
        </div>
      </div>
      <div className="border border-gray-300 p-4 rounded-b-lg bg-gray-50 text-sm sm:text-base">
        <p className="mt-2">{ticketDetails.message}</p>
      </div>

      {/* Admin Message */}
      {/* Admin Message (Only show if response exists) */}
      {ticketDetails.response && (
        <>
          <div className="bg-yellow-300 text-black font-semibold p-3 rounded-t-lg flex justify-between items-center mt-4">
            <span>Admin Reply</span>
            <span className="text-sm">
              {ticketDetails.updatedAt
                ? new Date(ticketDetails.updatedAt).toLocaleString()
                : "Not responded yet"}
            </span>
          </div>
          <div className="border border-gray-300 p-4 rounded-b-lg bg-gray-50 text-sm sm:text-base">
            <p className="mt-2">{ticketDetails.response}</p>
          </div>
        </>
      )}

      {/* Compose & Forward Modals */}
      {isComposeOpen && (
        <ComposeModal
          onClose={() => setIsComposeOpen(false)}
          ticketDetails={ticketDetails}
          ticket={ticket}
          getTicketDetails={getTicketDetails}
          
        />
      )}
      {isForwardOpen && (
        <ForwardModal onClose={() => setIsForwardOpen(false)} />
      )}
    </div>
  );
};

export default memo(TicketDetails);
