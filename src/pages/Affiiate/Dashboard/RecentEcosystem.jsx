import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import avatar from "../../../assets/profile.svg";
import api from "../../../api/Afiliate";
import { Heading, Text } from "../../../component/Text";

const RecentEcosystems = ({ title }) => {
  const [ecosystems, setEcosystems] = useState([]);
  const creatorId = useSelector((state) => state.auth.user?.data?.AffiliateId);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  useEffect(() => {
    fetchRecentEcosystems();
  }, [creatorId]);

  const fetchRecentEcosystems = async () => {
    try {
      const response = await api.affiliateFetchRecentEcosystems({
        creatorId,
        accessToken,
        refreshToken,
      });
      setEcosystems(response.data.lastFourSubscribers);
    } catch (error) {
      console.error("Error fetching recent ecosystems:", error);
    }
  };

  return (
    <div className="h-full border rounded-lg shadow-md">
      <div className="flex items-center justify-between bg-gray-100 p-4">
        <Heading
          level="4"
          className="mb-0"
          size="lg"
          color="black"
          weight="font-semibold"
          font="font-body"
          lineHeight="leading-7"
        >
          {title}
        </Heading>
      </div>
      <div className="p-4">
        <ul className="divide-y divide-gray-200">
          {ecosystems.map((ecosystem, index) => (
            <li
              key={ecosystem._id}
              className={`py-4 w-full break-words ${index === 0 ? "pt-0" : ""}`}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <img
                    src={
                      ecosystem.Creator.imageUrl == null
                        ? avatar
                        : ecosystem.Creator.imageUrl
                    }
                    alt={ecosystem.Creator.organizationName}
                    className="w-24 h-24 object-cover rounded"
                  />
                </div>
                <div className="ml-4">
                  <Heading
                    level="5"
                    className=""
                    size="lg"
                    color="black"
                    weight="font-semibold"
                    font="font-body"
                    lineHeight="leading-7"
                  >
                    Name: {ecosystem.Creator.organizationName}
                  </Heading>
                  <div className="text-sm">
                    <Text
                      className=""
                      size="base"
                      color="black"
                      weight="font-normal"
                      lineHeight="leading-7"
                    >
                      Interval: {ecosystem.interval}
                    </Text>
                    <Text
                      className=""
                      size="base"
                      color="black"
                      weight="font-normal"
                      lineHeight="leading-7"
                    >
                      Plan Type: {ecosystem.planType}
                    </Text>
                    <Text
                      className=""
                      size="base"
                      color="black"
                      weight="font-normal"
                      lineHeight="leading-7"
                    >
                      Size Limit: {ecosystem.sizeLimit}
                    </Text>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentEcosystems;
