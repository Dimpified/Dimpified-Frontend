import { useMemo, useState, useEffect, Fragment, useCallback } from "react";
import { useSelector } from "react-redux";
import TanstackTable from "../../../component/affiliate/elements/TanstackTable";
import { numberWithCommas } from "../../../data/utils";
import StatRightChart from "../../../component/affiliate/charts/StatRightChart";
import avatar from "../../../assets/profile.svg";
import AxiosInterceptor from "../../../component/AxiosInterceptor";
import debounce from "lodash.debounce"; // for debouncing search input
import { LoadingSmall } from "../../../component/LoadingSpinner";

const UsersListItems = ({ userDetails }) => {
  const authFetch = AxiosInterceptor();
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [instructors, setInstructorsList] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    usersThisMonth: 0,
    uniqueSubscribedUsersCount: 0,
  });

  const creatorId = useSelector((state) => state.auth.user?.data?.AffiliateId);

  // Fetch stats only once when creatorId is available
  useEffect(() => {
    const fetchStats = async () => {
      if (creatorId && authFetch) {
        try {
          const apiUrl = `${
            import.meta.env.VITE_API_URL
          }/affiliate-onboarded-users-blocks/${creatorId}`;
          const response = await authFetch.get(apiUrl);
          setStats(response.data);
        } catch (error) {
          console.error("Failed to fetch stats:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (creatorId && !stats.totalUsers) {
      fetchStats();
    }
  }, []);

  // Set instructors list when userDetails change
  useEffect(() => {
    if (Array.isArray(userDetails) && userDetails.length > 0) {
      setInstructorsList(userDetails.slice(0, 500));
    }
  }, []);

  // Debounced search filter logic
  const filterInstructors = useCallback(
    debounce((searchTerm) => {
      if (!userDetails) return;
      const filteredInstructors = userDetails.filter((instructor) => {
        const matchesSearchTerm = Object.values(instructor)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        return matchesSearchTerm;
      });
      setInstructorsList(filteredInstructors.slice(0, 500));
    }, 300),
    [userDetails]
  );

  const getSearchTerm = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    filterInstructors(newSearchTerm);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ getValue, row }) => (
          <div className="flex items-center">
            <img
              src={row.original.imageUrl || avatar}
              alt=""
              className="rounded-full w-10 h-10 mr-2"
            />
            <div>
              <h5 className="mb-0">
                {getValue()} {row.original.organizationName}
              </h5>
              <h5 className="mb-0">{row.original.email}</h5>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "Audience",
        header: "Chosen Audience",
        cell: ({ row }) => (
          <h5 className="mb-0">{row.original.numberOfTargetAudience || 0}</h5>
        ),
      },
      {
        accessorKey: "joined",
        header: "Joined",
        cell: ({ row }) => formatDate(row.original.createdAt),
      },
      {
        accessorKey: "websiteCount",
        header: "Website User Count",
        cell: ({ row }) => row.original.userCount,
      },
      {
        accessorKey: "shortcutmenu",
        header: "",
        cell: () => <div>Action Menu Placeholder</div>, // Example action menu placeholder
      },
    ],
    []
  );

  // Utility function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Fragment>
      {loading ? (
        <>
          <LoadingSmall /> Loading....
        </>
      ) : (
        <div className="grid grid-cols-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <StatRightChart
              title="Total users"
              value={numberWithCommas(stats.totalUsers)}
              summary="Number of sales"
              summaryIcon="up"
              showSummaryIcon
              classValue="mb-4"
              chartName="UserChart"
            />
            <StatRightChart
              title="Verified Users"
              value={numberWithCommas(stats.verifiedUsers)}
              summary="Number of pending"
              summaryIcon="down"
              showSummaryIcon
              classValue="mb-4"
              chartName="VisitorChart"
            />
            <StatRightChart
              title="Users This Month"
              value={numberWithCommas(stats.usersThisMonth)}
              summary="Students"
              summaryIcon="up"
              showSummaryIcon
              classValue="mb-4"
              chartName="BounceChart"
            />
            <StatRightChart
              title="Subscribed Users"
              value={numberWithCommas(stats.uniqueSubscribedUsersCount)}
              summary="Instructor"
              summaryIcon="up"
              showSummaryIcon
              classValue="mb-4"
              chartName="AverageVisitTimeChart"
            />
          </div>
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="search"
                placeholder="Search"
                value={searchTerm}
                onChange={getSearchTerm}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 max-w-xs"
              />
            </div>
          </div>

          <TanstackTable columns={columns} data={instructors} />
        </div>
      )}
    </Fragment>
  );
};

export default UsersListItems;
