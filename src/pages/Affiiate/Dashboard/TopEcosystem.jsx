import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import avatar from "../../../assets/profile.svg";
import api from "../../../api/Afiliate";
import { Heading, Text } from "../../../component/Text";
import { LoadingSmall } from "../../../component/LoadingSpinner";

const TopEcosystem = ({ title }) => {
  const [ecosystems, setEcosystems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get creatorId from Redux store
  const creatorId = useSelector((state) => state.auth.user?.data?.AffiliateId);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchTopEcosystems();
  }, [creatorId]);

  const fetchTopEcosystems = async () => {
    try {
      setLoading(true);
      const response = await api.affiliateFetchTopEcosystems({
        creatorId,
        accessToken,
        refreshToken,
      });
      setEcosystems(response.data.lastFourOnboardedUsers || []);
    } catch (error) {
      console.error("Error fetching top ecosystems:", error);
    } finally {
      setLoading(false);
    }
  };

  const itemStyle = {
    minHeight: "120px",
    display: "flex",
    alignItems: "center",
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <LoadingSmall />
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

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
      <div className="p-4 w-full break-words">
        <ul className="divide-y divide-gray-200">
          {ecosystems.map((ecosystem, index) => (
            <li
              key={ecosystem._id}
              className={`py-4  ${index === 0 ? "pt-0" : ""}`}
              style={itemStyle}
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <img
                    src={
                      ecosystem.imageUrl == null ? avatar : ecosystem.imageUrl
                    }
                    alt={ecosystem.organizationName}
                    className="w-16 h-16 object-cover rounded"
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
                    {ecosystem.organizationName}
                  </Heading>
                  <div className="text-sm">
                    <Text
                      className=""
                      size="base"
                      color="black"
                      weight="font-normal"
                      lineHeight="leading-7"
                    >
                      User Type: {ecosystem.role}
                    </Text>
                    <Text
                      className="flex-wrap"
                      size="base"
                      color="black"
                      weight="font-normal"
                      lineHeight="leading-7"
                    >
                      {ecosystem.email}
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

export default TopEcosystem;
