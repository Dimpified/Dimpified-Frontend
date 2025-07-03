import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../features/authentication";
import { useNavigate } from "react-router-dom";
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

const creatorSteps = [
  {
    label: "Overview",
    link: "/creator/dashboard/overview",
    icon: OverviewImg,
  },
  {
    label: "Booking",
    link: "/creator/dashboard/booking",
    icon: BookingImg,
    isActive: (pathname) =>
      pathname === "/creator/dashboard/booking-time-off" ||
      pathname === "/creator/dashboard/booking",
  },
  {
    label: "Payment",
    link: "/creator/dashboard/payments",
    icon: PaymentImg,
  },
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
  {
    label: "Teams",
    link: "/creator/dashboard/teams",
    icon: ProfileImg,
  },
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
  {
    label: "Profile",
    link: "/creator/dashboard/profile",
    icon: ProfileImg,
  },
];

const teamMemberSteps = [
  {
    label: "Overview",
    link: "/creator/dashboard/overview",
    icon: OverviewImg,
  },
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

  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isResSidebarOpen, setResIsSidebarOpen] = useState(false);

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
    navigate("/");
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
              <Link
                to={step.link}
                key={index}
                className={`flex items-center w-full p-2 transition-all duration-300 ${
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
              </Link>
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
                  className="text-sec6 hover:text-primary5"
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

              {/* Notification Dropdown */}
              {isNotificationOpen && (
                <div className="absolute right-0 top-12 bg-white shadow-lg border border-gray-200 rounded-lg w-80 p-4 z-50">
                  <div className="flex justify-between items-center border-b pb-2 mb-2">
                    <h3 className="text-lg font-semibold">Notifications</h3>
                    <button
                      onClick={toggleNotification}
                      className="text-gray-500 text-xl"
                      aria-label="Close Notifications"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="border-b py-4">
                    <p className="text-gray-700 font-semibold mb-2">Today</p>
                    {notifications.length === 0 ? (
                      <p className="text-gray-500 text-center">
                        No new notifications
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {notifications
                          .slice(0, 3)
                          .map((notification, index) => (
                            <div
                              key={index}
                              className="flex items-start space-x-2"
                            >
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                className="w-5 h-5 text-gray-600 mt-1"
                              />
                              <div className="flex-1">
                                <p className="font-semibold">
                                  {notification.type}
                                </p>
                                <p className="text-[12px] text-gray-500">
                                  {truncateMessage(notification.message)}
                                </p>
                              </div>
                              <p className="text-xs text-gray-400 whitespace-nowrap">
                                {getRelativeTime(notification.date)}
                              </p>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                  <Link
                    to="/creator/dashboard/notification"
                    className="block text-center text-purple-500 mt-3"
                  >
                    View all notifications
                  </Link>
                </div>
              )}
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
                      { to: "/creator/dashboard/Team-profile", label: "Profile" },
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
                    <Link to={to} onClick={toggleResSidebar} className="block">
                      {label}
                    </Link>
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
          {children}
        </div>
      </div>
    </div>
  );
};

export default CreatorDashboardLayout;
