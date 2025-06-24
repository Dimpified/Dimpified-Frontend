import { useState, useEffect } from "react";
import TicketDetails from "./TicketDetails";
import api from "../../../api/DashboardApi";
import { useSelector } from "react-redux";
// Import spinner from react-spinners

const ITEMS_PER_PAGE = 5;

const SupportDashboard = ({ onViewTicket }) => {
  const [activeTab, setActiveTab] = useState("read");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const [allSupport, setAllSupport] = useState({ read: [], unread: [] });

  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  // Fetch support metrics
  const getMetrics = async () => {
    setLoading(true);
    try {
      if (!accessToken || !refreshToken) return;
      const response = await api.creatorSupportMetrics({
        ecosystemDomain,
        accessToken,
        refreshToken,
      });
      setMetrics(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all support tickets
  const getAllSupports = async () => {
    setLoading(true);
    try {
      if (!accessToken || !refreshToken) return;
      const response = await api.creatorGetAllSupport({
        ecosystemDomain,
        accessToken,
        refreshToken,
      });
      setAllSupport(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMetrics();
    getAllSupports();
  }, [ecosystemDomain, accessToken, refreshToken]);

  // Determine which tickets to show
  const activeTickets =
    activeTab === "read" ? allSupport.read : allSupport.unread;
  const totalPages = Math.ceil(activeTickets.length / ITEMS_PER_PAGE);
  const paginatedTickets = activeTickets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Format date and time
  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options);
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return { formattedDate, formattedTime };
  };

  return (
    <div className="p-6">
      {/* Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {[
          { title: "Total Request", count: metrics?.totalRequests || 0 },
          { title: "Attended Request", count: metrics?.attendedRequests || 0 },
          {
            title: "Unattended Request",
            count: metrics?.unattendedRequests || 0,
          },
        ].map((box, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg text-center bg-white shadow-md"
          >
            <h3 className="text-gray-500">{box.title}</h3>
            <p className="text-3xl font-bold">{box.count}</p>
          </div>
        ))}
      </div>

      {/* Tabs for Read/Unread Tickets */}
      <div className="flex mb-4 border-b relative">
        <button
          onClick={() => {
            setActiveTab("read");
            setCurrentPage(1);
          }}
          className={`relative flex-1 py-2 text-center text-gray-600 font-medium transition ${
            activeTab === "read" ? "text-gray-900 font-semibold" : ""
          }`}
        >
          Read Tickets
          {activeTab === "read" && (
            <div className="absolute left-0 bottom-0 w-full h-[3px] bg-purple-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => {
            setActiveTab("unread");
            setCurrentPage(1);
          }}
          className={`relative flex-1 py-2 text-center text-gray-600 font-medium transition ${
            activeTab === "unread" ? "text-gray-900 font-semibold" : ""
          }`}
        >
          Unread Tickets
          {activeTab === "unread" && (
            <div className="absolute left-0 bottom-0 w-full h-[3px] bg-purple-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Table displaying tickets */}
      <div className="bg-white p-4 shadow-md rounded-lg">
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table
              id={activeTab === "read" ? "read-table" : "unread-table"}
              className="w-full min-w-[800px] border border-gray-300 rounded-lg"
            >
              <thead className="bg-gray-100">
                <tr className="text-left border-b">
                  <th className="py-3 px-4 whitespace-nowrap">ID</th>
                  <th className="py-3 px-4 whitespace-nowrap">Name</th>
                  <th className="py-3 px-4 whitespace-nowrap">Email</th>
                  <th className="py-3 px-4 whitespace-nowrap">Reason</th>
                  <th className="py-3 px-4 whitespace-nowrap">Status</th>
                  <th className="py-3 px-4 whitespace-nowrap">Date</th>
                  <th className="py-3 px-4 whitespace-nowrap">Time</th>
                  <th className="py-3 px-4 text-center whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedTickets.length > 0 ? (
                  paginatedTickets.map((ticket, index) => {
                    const { formattedDate, formattedTime } = formatDateTime(
                      ticket.createdAt
                    );
                    return (
                      <tr
                        key={ticket.id}
                        className="border-b hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-4">{index + 1}</td>
                        <td className="py-3 px-4">
                          {ticket.EcosystemUser.username}
                        </td>
                        <td className="py-3 px-4 truncate max-w-[200px]">
                          {ticket.EcosystemUser.email}
                        </td>
                        <td className="py-3 px-4 truncate max-w-[250px]">
                          {ticket.reason}
                        </td>
                        <td className="py-3 px-4">{ticket.status}</td>
                        <td className="py-3 px-4">{formattedDate}</td>
                        <td className="py-3 px-4">{formattedTime}</td>
                        <td className="py-3 px-4 text-center">
                          <button
                            className="bg-purple-500 text-white px-4 py-2 rounded shadow-md hover:bg-purple-600 transition"
                            onClick={() => onViewTicket(ticket.id)}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-4 text-gray-500">
                      No tickets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            className={`px-3 py-1 border rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              className={`px-3 py-1 border rounded ${
                currentPage === num ? "bg-purple-500 text-white" : ""
              }`}
              onClick={() => setCurrentPage(num)}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SupportDashboard;
