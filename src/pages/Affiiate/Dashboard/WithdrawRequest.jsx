import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { showToast } from "../../../component/ShowToast";
import StatRightChart from "../../../component/affiliate/charts/StatRightChart";
import Pagination from "../../../component/affiliate/elements/Pagination";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { ButtonSmallPurple } from "../../../component/Buttons";
import { Heading, TextSpan } from "../../../component/Text";
import { numberWithCommas } from "../../../data/utils";
import api from "../../../api/Afiliate";
import { LoadingSmall } from "../../../component/LoadingSpinner";

const WithdrawPayment = () => {
  const { ecosystemDomain } = useParams();
  const [withdrawalBlock, setWithdrawalBlock] = useState({});
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Cloading, setCloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(15);

  const creatorId = useSelector((state) => state.auth.user?.data?.AffiliateId);

  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchWithdrawalRequests = async () => {
      try {
        const response = await api.affiliateFetchWithdrawalRequests(
          accessToken,
          refreshToken,
          creatorId
        );
        setWithdrawalRequests(response.data.withdrawalRequests || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching withdrawal requests:", error);
        setLoading(false);
      }
    };

    fetchWithdrawalRequests();

    const fetchWithdrawalBlock = async () => {
      try {
        const response = await api.affiliateFetchWithdrawalBlock(
          accessToken,
          refreshToken,
          creatorId
        );
        setWithdrawalBlock(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching withdrawal requests:", error);
        setLoading(false);
      }
    };

    fetchWithdrawalBlock();
  }, [ecosystemDomain]);

  // Handle action (e.g., mark request as completed)
  // const handleAction = async (id) => {
  //   const rowIndex = withdrawalRequests.findIndex((row) => row.id === id);
  //   if (rowIndex !== -1) {
  //     try {
  //       const updatedData = [...withdrawalRequests];
  //       updatedData[rowIndex].Cloading = true;
  //       setWithdrawalRequests(updatedData);

  //       const response = await authFetch.post(
  //         `${import.meta.env.VITE_API_URL}/admin-mark-payment-request`,
  //         {
  //           requestId: id,
  //           status: "true",
  //         }
  //       );
  //       showToast(response.data.message);
  //     } catch (error) {
  //       showToast(error.response?.data?.message || "Error updating status");
  //     } finally {
  //       const updatedData = [...withdrawalRequests];
  //       updatedData[rowIndex].Cloading = false;
  //       setWithdrawalRequests(updatedData);
  //     }
  //   }
  // };

  // Function to handle sharing the onboard link
  const user = useSelector((state) => state.auth.user);

  // Use optional chaining and default values
  const affiliateId = user?.data?.affiliateId || null;
  const handleShare = async () => {
    try {
      const response = await api.affiliateHandleShare({
        affiliateId,
      });
    } catch (error) {
      console.log("handleShare error", error);
    }
  };

  // Get current requests for pagination
  const indexOfLastRequest = currentPage * itemsPerPage;
  const indexOfFirstRequest = indexOfLastRequest - itemsPerPage;
  const currentRequests = withdrawalRequests.slice(
    indexOfFirstRequest,
    indexOfLastRequest
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 md:py-10">
      <div className="mx-auto px-4 py-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="border-b pb-4 mb-4 flex justify-between items-center">
          <div className="mb-3 lg:mb-0">
            <Heading
              level="5"
              className="mb-2"
              size="2xl"
              color="black"
              weight="font-bold"
              font="font-body"
              lineHeight="leading-7"
            >
              Withdraw Payment
            </Heading>
          </div>
          {/* Share Onboard Link Button */}
          <div className="text-right mb-4">
            <ButtonSmallPurple
              className="px-4 py-2 bg-primary3 text-white rounded hover:bg-primary4"
              onClick={handleShare}
              disabled={!creatorId}
              width="20"
            >
              <FontAwesomeIcon icon={faShareAlt} className="xl:mr-2" />
              <span className="hidden xl:inline-block">Share Onboard Link</span>
            </ButtonSmallPurple>
          </div>
        </div>

        {loading ? (
          <LoadingSmall />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatRightChart
                title="Total"
                value={withdrawalBlock.totalWithdrawals || "0"}
                summary="Number of sales"
                summaryIcon="up"
                showSummaryIcon
                classValue="mb-4"
                chartName="UserChart"
              />
              <StatRightChart
                title="Completed"
                value={withdrawalBlock.completedWithdrawals || "0"}
                summary="Number of pending"
                summaryIcon="down"
                showSummaryIcon
                classValue="mb-4"
                chartName="VisitorChart"
              />
              <StatRightChart
                title="Pending"
                value={withdrawalBlock.pendingWithdrawals || "0"}
                summary="Students"
                summaryIcon="up"
                showSummaryIcon
                classValue="mb-4"
                chartName="BounceChart"
              />
              <StatRightChart
                title="Month Withdraws"
                value={withdrawalBlock.currentMonthWithdrawals || "0"}
                summary="Instructor"
                summaryIcon="up"
                showSummaryIcon
                classValue="mb-4"
                chartName="AverageVisitTimeChart"
              />
            </div>

            <div className="bg-white rounded shadow mt-4">
              <div className="px-6 py-4 border-b">
                <Heading
                  level="3"
                  className="mb-2"
                  size="lg"
                  color="black"
                  weight="font-semibold"
                  font="font-body"
                  lineHeight="leading-7"
                >
                  Withdraw Request
                </Heading>
              </div>
              <div className="grid grid-cols-1 p-4 overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-200">
                  <thead className="font-body bg-gray-50">
                    <tr className="text-left">
                      <th className="px-4 py-2 border border-gray-200">ID</th>
                      <th className="px-4 py-2 border border-gray-200">
                        Amount (₦)
                      </th>
                      <th className="px-4 py-2 border border-gray-200">
                        Bank Details
                      </th>
                      <th className="px-4 py-2 border border-gray-200">Date</th>
                      <th className="px-4 py-2 border border-gray-200">
                        Status
                      </th>
                      {/* <th className="px-4 py-2">Action</th> */}
                    </tr>
                  </thead>
                  <tbody className="font-sans">
                    {currentRequests.map((request) => (
                      <tr key={request.id} className="hover:bg-gray-100">
                        <td className="border px-4 py-2">#00{request.id}AWR</td>
                        <td className="border px-4 py-2">
                          ₦{numberWithCommas(request.amount)}
                        </td>
                        <td className="border px-4 py-2">
                          <TextSpan>
                            {request.AffiliateAccount.accountNumber}
                          </TextSpan>
                          <br />
                          <TextSpan>
                            {request.AffiliateAccount.accountName}
                          </TextSpan>
                          <br />
                          <TextSpan>
                            {request.AffiliateAccount.bankName}
                          </TextSpan>
                        </td>
                        <td className="border px-4 py-2">
                          {new Date(request.requestedAt).toLocaleString()}
                        </td>
                        <td className="border px-4 py-2">
                          <TextSpan
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              request.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {request.status}
                          </TextSpan>
                        </td>
                        {/* Uncomment if you have actions */}
                        {/* <td className="border px-4 py-2">
            {request.status !== "completed" ? (
              <button
                onClick={() => handleAction(request.id)}
                className={`bg-green-500 text-white px-3 py-1 rounded ${
                  request.Cloading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={request.Cloading}
              >
                {request.Cloading ? "Processing" : "Completed"}
              </button>
            ) : (
              <button
                disabled
                className="bg-green-500 text-white px-3 py-1 rounded opacity-50 cursor-not-allowed"
              >
                Completed
              </button>
            )}
          </td> */}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!loading && withdrawalRequests.length === 0 && (
                  <div className="mt-5">No withdrawal requests found.</div>
                )}
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={withdrawalRequests.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WithdrawPayment;
