import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";

// import custom components
import GridListViewButton from "../../../component/affiliate/elements/GridListViewButton";

// import sub components
import UsersGridView from "./UsersGridCard";
import UsersListItems from "./UsersListItems";

import api from "../../../api/Afiliate";
import { Heading, Text, TextSpan } from "../../../component/Text";
import { ButtonForTabs, ButtonSmallPurple } from "../../../component/Buttons";
import { useNavigate } from "react-router-dom";

const Instructor = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [viewType, setViewType] = useState("grid");
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userId = user?.data?.AffiliateId || "Unknown User";
  const affiliateId = useSelector(
    (state) => state.auth.user?.data?.affiliateId
  );
  const creatorId = user?.data?.AffiliateId || null;

  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const getMyUser = async () => {
    try {
      const response = await api.affiliateGetMyUser({
        userId,
        accessToken,
        refreshToken,
      });
      setUserDetails(response.data.getAllCreator);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getMyUser();
  }, [accessToken, refreshToken]);

  // Function to handle sharing the onboard link
  const handleShare = async () => {
    try {
      const response = await api.affiliateHandleShare({
        creatorId,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      console.log("handleShare error", error);
    }
  };

  return (
    // <Fragment>
    <div className="px-4 sm:px-6 md:px-10 py-6 md:py-10">
      <div className="mx-auto px-4 py-6 bg-white border border-gray-200 rounded-lg shadow-md">
        <div className="border-b pb-4 mb-4 flex justify-between items-center">
          <div>
            <Heading
              level="5"
              className="mb-2 text-lg md:text-2xl"
              size=""
              color="black"
              weight="font-bold"
              font="font-body"
              lineHeight="leading-7"
            >
              My User
              <span className="text-lg text-gray-500">
                ({userDetails.length})
              </span>
            </Heading>
            <nav className="text-sm text-gray-500">
              <ol className="list-reset flex">
                <li>
                  <ButtonForTabs
                    onClick={() => navigate("/affiliate/dashboard/overview")}
                    className="hover:underline"
                    label="Dashboard"
                  />
                </li>
                <li>
                  <span className="mx-2">/</span>
                </li>
                <li>
                  <TextSpan
                    className=""
                    size=""
                    color="primary3"
                    weight="font-normal"
                    lineHeight="leading-none"
                  >
                    My User
                  </TextSpan>
                </li>
              </ol>
            </nav>
          </div>
          <div className="flex space-x-4">
            <GridListViewButton
              keyGrid={() => setViewType("grid")}
              keyList={() => setViewType("list")}
            />
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

        {/* Conditionally render based on the viewType state */}
        <div>
          {viewType === "grid" ? (
            <UsersGridView userDetails={userDetails} />
          ) : (
            <UsersListItems userDetails={userDetails} />
          )}
        </div>
      </div>
    </div>
    // </Fragment>
  );
};

export default Instructor;
