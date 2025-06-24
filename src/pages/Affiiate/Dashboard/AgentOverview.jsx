import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import StatRightChart from "../../../component/affiliate/charts/StatRightChart";
import TopEcosystem from "./TopEcosystem";
import RecentEcosystem from "./RecentEcosystem";
import api from "../../../api/Afiliate";
import { Heading } from "../../../component/Text";
import { ButtonSmallPurple } from "../../../component/Buttons";
import { LoadingSmall } from "../../../component/LoadingSpinner";

const AffiliateOverview = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [withdrawData, setWithdrawData] = useState(null);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.auth.user);

  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  // Use optional chaining and default values
  const creatorId = user?.data?.AffiliateId || null;
  const affiliateId = user?.data?.affiliateId || null;

  // const AffiliateId = user?.data?.affiliateId || null;

  const handleShare = async () => {
    try {
      const response = await api.affiliateHandleShare({
        affiliateId,
      });
    } catch (error) {
      console.log("handleShare error", error);
    }
  };

  useEffect(() => {
    if (creatorId) {
      fetchDashboardData();
      fetchEarningHistory();
    }
  }, [creatorId]);

  const fetchDashboardData = async () => {
    try {
      const response = await api.affiliateFetchDashboardData({
        creatorId,
        accessToken,
        refreshToken,
      });
      setDashboardData(response.data);
      setLoading(false);
      console.log("dashboard data", response.data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const fetchEarningHistory = async () => {
    try {
      const response = await api.affiliateFetchEarningHistory({
        creatorId,
        accessToken,
        refreshToken,
      });
      setWithdrawData(response.data.affiliateEarningHistory);
      setLoading(false);
      console.log("earningHistory", response.data);
    } catch (error) {
      console.error("Error fetching earning history:", error);
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-10 py-6 md:py-10">
      <div className="mx-auto px-4 py-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <Heading
            level="1"
            className="text-lg md:text-2xl"
            size=""
            color="black"
            weight="font-bold"
            font="font-body"
            lineHeight="leading-7"
          >
            Dashboard
          </Heading>
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

        {loading ? (
          <LoadingSmall />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Link to="/affiliate/dashboard/earning">
                <StatRightChart
                  title="Total Earning History"
                  value={dashboardData?.totalEarningHistory || "0"}
                  summary="Number of earning history"
                  summaryIcon="up"
                  showSummaryIcon
                />
              </Link>
              <Link to="/affiliate/dashboard/overview">
                <StatRightChart
                  title="Total Subscribers"
                  value={dashboardData?.totalSubscribers || "0"}
                  summary="Number of pending"
                  summaryIcon="down"
                  showSummaryIcon
                />
              </Link>
              <Link to="/affiliate/dashboard/my-user">
                <StatRightChart
                  title="Total Users"
                  value={dashboardData?.totalUser || "0"}
                  summary="Students"
                  summaryIcon="up"
                  showSummaryIcon
                />
              </Link>
              <Link to="/affiliate/dashboard/my-user">
                <StatRightChart
                  title="Total Unverified Users"
                  value={dashboardData?.unverifyUsers || "0"}
                  summary="Instructor"
                  summaryIcon="up"
                  showSummaryIcon
                />
              </Link>
            </div>

            <div className="mb-6">
              <div className="bg-white rounded shadow">
                <div className="flex justify-between items-center px-6 py-4 border-b">
                  <Heading
                    level="4"
                    className=""
                    size="lg"
                    color="black"
                    weight="font-semibold"
                    font="font-body"
                    lineHeight="leading-7"
                  >
                    Affiliate Earning History
                  </Heading>

                  {/* <ChartActionMenu /> */}
                </div>
                <div className="p-4 grid grid-cols-1 overflow-x-auto">
                  <table className="min-w-full table-auto border-collapse border border-gray-200">
                    <thead className="font-body bg-gray-50">
                      <tr className="text-left">
                        <th className="p-2 border border-gray-200">ID</th>
                        <th className="p-2 border border-gray-200">Amount</th>
                        <th className="p-2 border border-gray-200">Currency</th>
                        <th className="p-2 border border-gray-200">
                          Plan Type
                        </th>
                        <th className="p-2 border border-gray-200">
                          Size Limit
                        </th>
                        <th className="p-2 border border-gray-200">Interval</th>
                        <th className="p-2 border border-gray-200">Date</th>
                      </tr>
                    </thead>
                    <tbody className="font-sans">
                      {withdrawData && withdrawData.length > 0 ? (
                        withdrawData.map((entry) => (
                          <tr key={entry.id} className="hover:bg-gray-100">
                            <td className="p-2 border border-gray-200">
                              #00{entry.id}AEH
                            </td>
                            <td className="p-2 border border-gray-200">
                              {entry.amount}
                            </td>
                            <td className="p-2 border border-gray-200">
                              {entry.currency}
                            </td>
                            <td className="p-2 border border-gray-200">
                              {entry.planType}
                            </td>
                            <td className="p-2 border border-gray-200">
                              {entry.sizeLimit}
                            </td>
                            <td className="p-2 border border-gray-200">
                              {entry.interval}
                            </td>
                            <td className="p-2 border border-gray-200">
                              {new Date(entry.createdAt).toLocaleString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center font-sans p-4">
                            No earning history found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TopEcosystem title="Last 4 Onboarded Users" />
              <RecentEcosystem title="Last 4 Subscribed Users" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AffiliateOverview;
