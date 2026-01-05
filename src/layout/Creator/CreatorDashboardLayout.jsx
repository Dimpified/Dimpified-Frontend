import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authentication";
import Logo from "../../assets/DIMP logo colored.png";
import OverviewImg from "../../assets/overview.svg";
import BookingImg from "../../assets/CalendarDots.svg";
import PaymentImg from "../../assets/Payment.svg";
import EditTemplateImg from "../../assets/editTemplate2.svg";
import ProfileImg from "../../assets/profile.svg";
import HelpImg from "../../assets/Help-center.svg";
import logOutImg from "../../assets/SignOut.svg";
import NotificationIcon from "../../assets/notification.svg";
import ThemeSwitchIcon from "../../assets/themeswitch.svg";
import { Heading } from "../../component/Text";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import api from "../../api/DashboardApi";
import Avatar from "../../assets/person.png";
import { ButtonSmallPurple, ButtonSmallWhite } from "../../component/Buttons";

// Subscription Expired Modal Component
const SubscriptionExpiredModal = ({ onClose, onRenew }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg  shadow-lg w-full max-w-2xl">
        <div className="text-center">
          <div className="bg-[#DEDBDB] p-4 w-full inline-block mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Subscription Expired
            </h2>
          </div>
          <div className="p-6">
            <div className="mt-4 text-yellow-500 flex gap-3 items-center justify-center">
              <FontAwesomeIcon icon={faEnvelope} className="text-3xl" />
              <p className="text-sm">Your Subscription Has Expired</p>
            </div>
            <p className="mt-2 text-gray-600 text-sm">
              Your current plan has ended, and access to your dashboard features
              is now limited. Please renew your subscription to continue
              managing your website and services.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <ButtonSmallWhite
                className="px-4 py-2 w-full bg-white border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                onClick={onClose}
              >
                Back
              </ButtonSmallWhite>
              <ButtonSmallPurple
                className="px-4 py-2 w-full bg-purple-600 text-white rounded-md hover:bg-purple-700"
                onClick={onRenew}
              >
                Renew Now
              </ButtonSmallPurple>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const creatorSteps = [
  { label: "Overview", link: "/creator/dashboard/overview", icon: OverviewImg },
  {
    label: "Booking",
    link: "/creator/dashboard/booking",
    icon: BookingImg,
    isActive: (pathname) =>
      pathname === "/creator/dashboard/booking-time-off" ||
      pathname === "/creator/dashboard/booking",
  },
  { label: "Payment", link: "/creator/dashboard/payments", icon: PaymentImg },
  {
    label: "Edit Template",
    link: "/creator/dashboard/edit-template",
    icon: EditTemplateImg,
  },
  {
    label: "Edit Services",
    link: "/creator/dashboard/edit-service",
    icon: EditTemplateImg,
    isActive: (pathname) =>
      pathname === "/creator/dashboard/create-service" ||
      pathname === "/creator/dashboard/created-service" ||
      pathname === "/creator/dashboard/edit-service",
  },
  {
    label: "Manage Customer",
    link: "/creator/dashboard/manage-customer",
    icon: ProfileImg,
  },
  { label: "Teams", link: "/creator/dashboard/teams", icon: ProfileImg },
  {
    label: "Subscription",
    link: "/creator/dashboard/Subscription",
    icon: PaymentImg,
  },
  {
    label: "Support Ticket",
    link: "/creator/dashboard/support-ticket",
    icon: PaymentImg,
  },
  { label: "Profile", link: "/creator/dashboard/profile", icon: ProfileImg },
];

const teamMemberSteps = [
  { label: "Overview", link: "/creator/dashboard/overview", icon: OverviewImg },
  {
    label: "Booking",
    link: "/creator/dashboard/booking",
    icon: BookingImg,
    isActive: (pathname) =>
      pathname === "/creator/dashboard/booking-time-off" ||
      pathname === "/creator/dashboard/booking",
  },
  {
    label: "Profile",
    link: "/creator/dashboard/Team-profile",
    icon: ProfileImg,
  },
];

const CreatorDashboardLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const userImage = useSelector((state) => state.auth.user?.image);
  const userRole = useSelector((state) => state.auth.user?.role);
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
 const status = useSelector((state) => state.auth.user?.status); // Get status from Redux
  const [showModal, setShowModal] = useState(false);
  const [isResSidebarOpen, setResIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Check status on mount and when it changes
    if (status === "inactive") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, [status]);

  useEffect(() => {
    getNotification();
  }, [accessToken, refreshToken, ecosystemDomain]);

  const getNotification = async () => {
    try {
      if (!accessToken || !refreshToken) return;
      const response = await api.creatorNotification({
        ecosystemDomain,
        accessToken,
        refreshToken,
      });
      setNotifications(response.data.message);
    } catch (error) {
      console.error("Could not get notifications:", error);
    }
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleNotification = () => setNotificationOpen(!isNotificationOpen);
  const toggleResSidebar = () => setResIsSidebarOpen(!isResSidebarOpen);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const truncateMessage = (message, maxLength = 60) =>
    message.length > maxLength ? `${message.slice(0, maxLength)}...` : message;

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];
    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count > 0) {
        return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
      }
    }
    return "just now";
  };

  const steps = userRole === "team_member" ? teamMemberSteps : creatorSteps;

  // Handle navigation with status check
  const handleNavigation = (link) => {
    if (
      [
        "/creator/dashboard/edit-template",
        "/creator/dashboard/edit-service",
        "/creator/dashboard/manage-customer",
        "/creator/dashboard/teams",
      ].includes(link)
    ) {
      if (status === "inactive") {
        setShowModal(true);
      } else {
        navigate(link);
      }
    } else {
      navigate(link);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/creator/dashboard/overview"); // Back to overview
  };

  const renewModal = () => {
    setShowModal(false);
    navigate("/creator/dashboard/subscription"); // Go to subscription
  };

  return (
    <div className="flex h-screen overflow-hidden bg-primary1 font-body">
      {/* SIDEBAR */}
      <div
        className={`hidden lg:block transition-all duration-300 p-3 h-screen ${
          isSidebarOpen ? "w-2/12" : "w-20"
        } bg-sec1 border-r border-gray-200 flex flex-col`}
      >
        <div
          className={`pb-6 ${
            isSidebarOpen ? "flex justify-start" : "flex justify-center mt-8"
          }`}
        >
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className={`transition-all duration-300 ${
                isSidebarOpen ? "w-24" : "hidden"
              }`}
            />
          </Link>
        </div>

        <div className="flex-grow flex flex-col items-start space-y-4 overflow-y-auto h-full pb-20 container">
          {steps.map((step, index) => {
            const isActive = step.isActive
              ? step.isActive(location.pathname)
              : location.pathname === step.link;

            return (
              <div
                key={index}
                onClick={() => handleNavigation(step.link)}
                className={`flex items-center w-full p-2 transition-all duration-300 cursor-pointer ${
                  isActive ? "bg-sec6 rounded-lg" : ""
                }`}
              >
                <img
                  src={step.icon}
                  alt={step.label}
                  className={`w-6 h-6 transition-all duration-300 ${
                    isSidebarOpen ? "mr-4" : ""
                  }`}
                />
                {isSidebarOpen && (
                  <Heading
                    level={4}
                    size="lg"
                    lineHeight="leading-1"
                    color={isActive ? "primary4" : "primary4"}
                    className={`font-semibold xl:text-[12px] lg:text-[11px] ${
                      isActive ? "font-bold" : "font-normal"
                    }`}
                  >
                    {step.label}
                  </Heading>
                )}
              </div>
            );
          })}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`flex items-center p-2 text-red-700 transition-all duration-300 w-full ${
              isSidebarOpen ? "justify-start" : "justify-center"
            }`}
          >
            <img src={logOutImg} alt="Logout" className="w-6 h-6 mr-4" />
            {isSidebarOpen && (
              <Heading
                level={4}
                size="lg"
                lineHeight="leading-1"
                className="font-semibold xl:text-[13px] lg:text-[11px]"
              >
                Log Out
              </Heading>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full lg:mx-8 h-screen flex-grow flex flex-col font-body">
        {/* Top Navbar (Large Screens) */}
        <div className="hidden lg:block">
          <div className="w-full flex items-center justify-between bg-white p-4 border-b-2">
            <div className="flex justify-between w-4/12">
              <button
                onClick={toggleSidebar}
                className="flex items-center text-xl"
                aria-label="Toggle Sidebar"
              >
                <i className="fas fa-bars"></i>
              </button>

              {/* Top Nav Links */}
              <div className="flex items-center lg:space-x-4">
                <Link
                  to="/creator/dashboard/watch-demo"
                  className="text-sec6 hover:text-primary5"
                >
                  Watch Demo
                </Link>
                <Link
                  to="/creator/dashboard/help-center"
                  className="text-red-600 hover:text-primary5 font-semibold"
                >
                  Help Desk
                </Link>
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-4 relative">
              <img
                src={NotificationIcon}
                alt="Notifications"
                className="w-6 h-6 cursor-pointer"
                onClick={toggleNotification}
              />
              <img
                src={ThemeSwitchIcon}
                alt="Theme Switch"
                className="w-6 h-6 cursor-pointer"
              />
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
                <img
                  src={userImage || Avatar}
                  alt="User"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="w-full lg:hidden flex items-center justify-between bg-white p-4 border-b-2">
          <Link to="/">
            <img src={Logo} alt="Logo" className="w-24" />
          </Link>
          <button
            onClick={toggleResSidebar}
            className="text-xl"
            aria-label="Toggle Menu"
          >
            <i
              className={`fas ${isResSidebarOpen ? "fa-times" : "fa-bars"}`}
            ></i>
          </button>
        </div>

        {/* Mobile Fullscreen Overlay Menu */}
        {isResSidebarOpen && (
          <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-8 overflow-y-auto">
            <button
              onClick={toggleResSidebar}
              className="absolute top-4 right-4 text-3xl"
              aria-label="Close Menu"
            >
              <i className="fas fa-times"></i>
            </button>
            <nav className="text-center">
              <ul className="text-lg space-y-5">
                {(userRole === "team_member"
                  ? [
                      { to: "/creator/dashboard/overview", label: "Overview" },
                      { to: "/creator/dashboard/booking", label: "Bookings" },
                      {
                        to: "/creator/dashboard/Team-profile",
                        label: "Profile",
                      },
                      {
                        to: "/creator/dashboard/help-center",
                        label: "Help Desk",
                      },
                      {
                        to: "/creator/dashboard/support-ticket",
                        label: "Support Ticket",
                      },
                      {
                        to: "/creator/dashboard/watch-demo",
                        label: "Watch Demo",
                      },
                      {
                        to: "/creator/dashboard/notification",
                        label: "Notification",
                      },
                    ]
                  : [
                      { to: "/creator/dashboard/overview", label: "Overview" },
                      { to: "/creator/dashboard/booking", label: "Bookings" },
                      { to: "/creator/dashboard/payments", label: "Payment" },
                      {
                        to: "/creator/dashboard/edit-template",
                        label: "Edit Website",
                      },
                      {
                        to: "/creator/dashboard/edit-service",
                        label: "Edit Services",
                      },
                      {
                        to: "/creator/dashboard/manage-customer",
                        label: "Manage Customer",
                      },
                      {
                        to: "/creator/dashboard/subscription",
                        label: "Subscription",
                      },
                      { to: "/creator/dashboard/profile", label: "Profile" },
                      {
                        to: "/creator/dashboard/help-center",
                        label: "Help Desk",
                      },
                      {
                        to: "/creator/dashboard/support-ticket",
                        label: "Support Ticket",
                      },
                      {
                        to: "/creator/dashboard/watch-demo",
                        label: "Watch Demo",
                      },
                      {
                        to: "/creator/dashboard/notification",
                        label: "Notification",
                      },
                    ]
                ).map(({ to, label }) => (
                  <li key={to}>
                    <button
                      onClick={() => handleNavigation(to)}
                      className="block"
                    >
                      {label}
                    </button>
                  </li>
                ))}
                <li className="pb-10">
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 font-semibold text-lg"
                    aria-label="Log Out"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        {/* Main Page Content */}
        <div className="flex-grow overflow-y-auto overflow-x-hidden">
          {showModal && (
            <SubscriptionExpiredModal
              onClose={closeModal}
              onRenew={renewModal}
            />
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboardLayout;
