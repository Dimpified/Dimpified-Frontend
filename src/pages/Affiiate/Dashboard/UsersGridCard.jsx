import { Fragment, useState, useEffect, useCallback } from "react";
import ReactPaginate from "react-paginate";
import { ChevronLeft, ChevronRight } from "react-feather";
import StatRightChart from "../../../component/affiliate/charts/StatRightChart";
import avatar from "../../../assets/profile.svg";
import { useSelector } from "react-redux";
import AxiosInterceptor from "../../../component/AxiosInterceptor";
import api from "../../../api/Afiliate";
import { Heading, Text, TextSpan } from "../../../component/Text";
import { LoadingSmall } from "../../../component/LoadingSpinner";
import { ShortInputWithPlaceholder } from "../../../component/Inputs";

const UsersGridCard = ({ userDetails }) => {
  const authFetch = AxiosInterceptor();
  const [instructors, setInstructorsList] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    verifiedUsers: 0,
    usersThisMonth: 0,
    uniqueSubscribedUsersCount: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");

  const creatorId = useSelector((state) => state.auth.user?.data?.AffiliateId);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const instructorsPerPage = 8;
  const pagesVisited = pageNumber * instructorsPerPage;
  const pageCount = Math.ceil(instructors.length / instructorsPerPage);

  const changePage = ({ selected }) => setPageNumber(selected);

  const fetchStats = async () => {
    try {
      const response = await api.affiliateFetchStats({
        accessToken,
        refreshToken,
        creatorId,
      });
      setStats(response);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    if (creatorId) {
      fetchStats();
    }
  }, [creatorId]);

  useEffect(() => {
    if (Array.isArray(userDetails)) {
      setInstructorsList(userDetails.slice(0, 500));
      setLoading(false);
    }
  }, [userDetails]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterInstructors(term);
  };

  const filterInstructors = useCallback(
    (term) => {
      const filteredInstructors = userDetails.filter((instructor) =>
        Object.values(instructor)
          .join(" ")
          .toLowerCase()
          .includes(term.toLowerCase())
      );
      setInstructorsList(filteredInstructors.slice(0, 500));
      setPageNumber(0);
    },
    [userDetails]
  );

  const displayInstructors = instructors
    .slice(pagesVisited, pagesVisited + instructorsPerPage)
    .map((instructor) => (
      <div
        className="xl:col-span-3 lg:col-span-6 md:col-span-6 sm:col-span-12"
        key={instructor.id}
      >
        <div className="bg-white shadow rounded p-5 mb-5 h-[500px]">
          <div className="text-center">
            <img
              src={instructor.imageUrl ?? avatar}
              className="rounded-full w-20 h-20 mb-3"
              alt="Instructor Avatar"
            />
            <Heading
              level="4"
              className=""
              size="lg"
              color="black"
              weight="font-semibold"
              font="font-body"
              lineHeight="leading-7"
            >
              {instructor.organizationName}
            </Heading>
          </div>
          <div className="flex justify-between border-b py-2 mt-4">
            <TextSpan
              className=""
              size="base"
              color="black"
              weight="font-normal"
              lineHeight="leading-7"
            >
              Email
            </TextSpan>
            <TextSpan
              className=""
              size="lg"
              color="black"
              weight="font-normal"
              lineHeight="leading-7"
            >
              {instructor.email}
            </TextSpan>
          </div>
          <div className="flex justify-between border-b py-2">
            <Text
              className=""
              size="base"
              color="black"
              weight="font-normal"
              lineHeight="leading-7"
            >
              Date Joined
            </Text>
            <Text
              className=""
              size="base"
              color="black"
              weight="font-normal"
              lineHeight="leading-7"
            >
              {formatDate(instructor.createdAt)}
            </Text>
          </div>
          <div className="flex justify-between border-b py-2">
            <Text
              className=""
              size="base"
              color="black"
              weight="font-normal"
              lineHeight="leading-7"
            >
              Chosen Audience
            </Text>
            <Text
              className=""
              size="base"
              color="black"
              weight="font-normal"
              lineHeight="leading-7"
            >
              {instructor.numberOfTargetAudience ?? 0}
            </Text>
          </div>
          <div className="flex justify-between border-b py-2">
            <Text
              className=""
              size="base"
              color="black"
              weight="font-normal"
              lineHeight="leading-7"
            >
              No of Transactions
            </Text>
            <Text
              className=""
              size="base"
              color="black"
              weight="font-normal"
              lineHeight="leading-7"
            >
              {instructor.transactionNumber}
            </Text>
          </div>
          <div className="flex justify-between border-b py-2">
            <Text
              className=""
              size="base"
              color="black"
              weight="font-normal"
              lineHeight="leading-7"
            >
              Website User Count
            </Text>
            <Text
              className=""
              size="base"
              color="black"
              weight="font-normal"
              lineHeight="leading-7"
            >
              {instructor.userCount}
            </Text>
          </div>
        </div>
      </div>
    ));

  return (
    <Fragment>
      {loading ? (
        <LoadingSmall />
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-12 gap-4 mb-4">
            <div className="xl:col-span-3 lg:col-span-6 md:col-span-12 sm:col-span-12">
              <StatRightChart
                title="Total users"
                value={stats?.totalUsers || "0"}
                summary="Number of sales"
                summaryIcon="up"
                showSummaryIcon
                classValue="mb-4 custom-background"
                chartName="UserChart"
              />
            </div>
            <div className="xl:col-span-3 lg:col-span-6 md:col-span-12 sm:col-span-12">
              <StatRightChart
                title="Verified Users"
                value={stats?.verifiedUsers || "0"}
                summary="Number of pending"
                summaryIcon="down"
                showSummaryIcon
                classValue="mb-4 custom-background"
                chartName="VisitorChart"
              />
            </div>
            <div className="xl:col-span-3 lg:col-span-6 md:col-span-12 sm:col-span-12">
              <StatRightChart
                title="Users this month"
                value={stats?.usersThisMonth || "0"}
                summary="Students"
                summaryIcon="up"
                showSummaryIcon
                classValue="mb-4 custom-background"
                chartName="BounceChart"
              />
            </div>
            <div className="xl:col-span-3 lg:col-span-6 md:col-span-12 sm:col-span-12">
              <StatRightChart
                title="Subscribed Users"
                value={stats?.uniqueSubscribedUsersCount || "0"}
                summary="Instructor"
                summaryIcon="up"
                showSummaryIcon
                classValue="mb-4 custom-background"
                chartName="AverageVisitTimeChart"
              />
            </div>
          </div>

          <div className="mb-4">
            <ShortInputWithPlaceholder
              type="search"
              placeholder="Search Users"
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded px-3 py-2 text-sm w-[300px]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-12 gap-4">
            {displayInstructors.length > 0 ? (
              displayInstructors
            ) : (
              <div className="col-span-12 text-center">
                No matching instructors found.
              </div>
            )}
          </div>

          <ReactPaginate
            previousLabel={<ChevronLeft size="14px" />}
            nextLabel={<ChevronRight size="14px" />}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"flex justify-center mb-0 space-x-2"}
            previousLinkClassName={"rounded border  "}
            nextLinkClassName={"rounded border px-3 py-2"}
            pageClassName={"rounded border px-3 py-2"}
            pageLinkClassName={"rounded border px-3 py-2"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"bg-gray-300"}
          />
        </div>
      )}
    </Fragment>
  );
};

export default UsersGridCard;
