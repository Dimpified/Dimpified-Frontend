import { useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useDispatch, useSelector } from "react-redux";
import Avatar1 from "../../assets/affliate-img/profile-circle.svg";
import { logout } from "../../features/authentication";
import { showToast } from "../../component/ShowToast";
import { Power } from "react-feather";
import { Heading, Text } from "../../component/Text";
import api from "../../api/Afiliate";

const QuickMenu = () => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });
  const isMobile = useMediaQuery({
    query: "(max-width: 1224px)",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    showToast("LogOut Successfully");
    navigate("/affiliate");
  };

  const [image, setImage] = useState(null);

  // State to manage menu visibility
  const [menuVisible, setMenuVisible] = useState(false);

  const user = useSelector((state) => state.auth?.user);
  const username = user?.data?.organizationName || "Unknown User";
  const userImage = image || user?.data?.image || Avatar1;
  const affiliateId = user?.data?.AffiliateId;
  const Email = user?.data?.email || "No email";
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  // Function to toggle the menu visibility
  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
  };

  useEffect(() => {
    const fetchUserImage = async () => {
      try {
        const response = await api.affiliateProfileFetchUserData({
          accessToken,
          refreshToken,
          affiliateId,
        });
        const userData = response.data.affiliateProfile;
        setImage(userData.image || null);
        console.log(userData);
      } catch (error) {
        // console.error("Error fetching user details:", error);
        showToast(error.response?.data?.message);
      }
    };
    if (affiliateId) fetchUserImage();
  }, [affiliateId]);

  return (
    <Fragment>
      <div className="mr-2.5">{/* darkmode */}</div>

      <div className="relative ms-1 list-none">
        <div className="inline-flex rounded-full">
          <div className="relative w-10 h-10" onClick={toggleMenu}>
            <img
              alt="avatar"
              src={userImage}
              className="w-full h-full object-cover rounded-full outline outline-primary3 cursor-pointer"
            />
          </div>
        </div>

        {/* Menu for Desktop */}
        {isDesktop && menuVisible && (
          <ul className="absolute right-2 mt-4 z-20 bg-white border rounded-lg shadow-lg w-auto overflow-hidden">
            <li className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 relative">
                  <img
                    alt="avatar"
                    src={userImage}
                    className="w-full h-full object-cover rounded-full outline outline-primary3"
                  />
                </div>
                <div className="ml-3">
                  <Heading
                    level="5"
                    className="text-base font-medium mb-1"
                    size=""
                    color="black"
                    weight="font-medium"
                    font="font-body"
                    lineHeight="leading-none"
                    htmlFor="bankSelect"
                  >
                    {username}
                  </Heading>
                  <Text className="text-sm text-gray-500">{Email}</Text>
                </div>
              </div>
            </li>
            <hr />
            <li
              className="py-2 px-4 cursor-pointer hover:bg-gray-100"
              onClick={handleLogout}
            >
              <div className="flex items-center font-sans">
                <Power size={16} className="me-2" /> Log Out
              </div>
            </li>
          </ul>
        )}

        {/* Menu for Mobile */}
        {isMobile && menuVisible && (
          <ul className="absolute right-2 mt-4 z-20 bg-white rounded-lg shadow-lg w-auto overflow-hidden">
            <li className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 relative">
                  <img
                    alt="avatar"
                    src={userImage}
                    className="w-full h-full object-cover rounded-full outline outline-primary3"
                  />
                </div>
                <div className="ml-3">
                  <Heading
                    level="5"
                    className="text-base font-medium"
                    size=""
                    color="black"
                    weight="font-medium"
                    font="font-body"
                    lineHeight="leading-none"
                    htmlFor="bankSelect"
                  >
                    {username}
                  </Heading>
                  <Text className="text-sm text-gray-500">{Email}</Text>
                </div>
              </div>
            </li>
            <hr />
            <li
              className="py-2 px-4 cursor-pointer hover:bg-gray-100"
              onClick={handleLogout}
            >
              <div className="flex items-center font-sans">
                <Power size={16} className="me-2" /> Log Out
              </div>
            </li>
          </ul>
        )}
      </div>
    </Fragment>
  );
};

export default QuickMenu;
