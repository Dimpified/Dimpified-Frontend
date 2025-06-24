import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import api from "../../../api/DashboardApi";
import { useSelector } from "react-redux";
import { showToast } from "../../../component/ShowToast";

const ComposeModal = ({ onClose, ticketDetails, ticket, getTicketDetails }) => {
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [replyMessage, setReplyMessage] = useState("");

  const handleSubmit = async () => {
    if (!replyMessage.trim()) {
      showToast("Reply message cannot be empty", "error");
      return;
    }

    setLoading(true);
    try {
      if (!accessToken || !refreshToken) return;
      const response = await api.creatorReplySupport({
        ecosystemDomain,
        ticketId: ticket,
        replyMessage,
        accessToken,
        refreshToken,
      });
      showToast(response.data.message, "success");
      onClose();
      getTicketDetails();
    } catch (error) {
      console.error(error);
      showToast(error.message || "Error submitting reply", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center p-4 backdrop-blur-lg">
      <div className="relative bg-white p-6 rounded-lg w-full max-w-3xl lg:h-[60vh] h-[80vh] shadow-lg flex flex-col overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 bg-gray-300 rounded-full p-1 text-gray-600 hover:bg-gray-400"
          onClick={onClose}
        >
          <IoClose size={18} />
        </button>

        {/* Input Fields Container */}
        <div className="flex flex-col">
          {/* To Field (Read-Only) */}
          <div className="border-b border-gray-300 pb-2">
            <label className="text-gray-500 text-sm">To</label>
            <input
              type="text"
              value={ticketDetails?.EcosystemUser?.username || ""}
              readOnly
              className="w-full text-gray-700 bg-gray-100 cursor-not-allowed outline-none border-none focus:ring-0"
            />
          </div>

          {/* Subject Field (Read-Only) */}
          <div className="border-b border-gray-300 pb-2 mt-3">
            <label className="text-gray-500 text-sm">Subject</label>
            <input
              type="text"
              value={ticketDetails?.reason || ""}
              readOnly
              className="w-full text-gray-700 bg-gray-100 cursor-not-allowed outline-none border-none focus:ring-0"
            />
          </div>
        </div>

        {/* Message Box */}
        <textarea
          className="flex-grow py-4 w-full text-gray-700 outline-none border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 resize-none mt-3 p-2"
          placeholder="Type your message..."
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
        ></textarea>

        {/* Bottom Action Section */}
        <div className="flex justify-end items-center mt-4">
          {/* Send Button */}
          <button
            onClick={handleSubmit}
            disabled={loading || !replyMessage.trim()}
            className={`flex items-center bg-purple-500 text-white px-4 py-2 rounded-full shadow-md transition ${
              loading || !replyMessage.trim()
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-purple-600"
            }`}
          >
            {loading ? "Sending..." : "Send"} <FaPaperPlane className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeModal;
