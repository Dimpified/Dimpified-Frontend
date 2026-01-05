import React, { useState } from "react";
import { Menu, X, Calendar, Briefcase, User, LogOut } from "lucide-react";
import Logo from "../../assets/NewAuthImage/NewLogo.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/authentication";
const FreeDashboardLayout = ({ children }) => {
  const creatorName = useSelector(
    (state) => state.auth.user?.fullName || "Creator"
  );
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get initials from creator name
  const getInitials = (name) => {
    if (!name || name === "Creator") return "CU";
    const nameParts = name.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0].substring(0, 2).toUpperCase();
    }
    return (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
  };

  const menuItems = [
    { label: "Overview", icon: Menu, path: "/free/creator/dashboard/overview" },
    {
      label: "Bookings",
      icon: Calendar,
      path: "/free/creator/dashboard/bookings",
    },
    {
      label: "Manage Service",
      icon: Briefcase,
      path: "/free/creator/dashboard/manage-service",
    },
    { label: "Profile", icon: User, path: "/free/creator/dashboard/profile" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };
  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:flex flex-col bg-[#F4F1FF] border-r border-[#BBB2B2] transition-all duration-300 p-2 w-64">
        {/* Logo */}
        <div className="py-6 px-4 flex justify-start">
          <div className="bg-[#fff] p-2">
            <Link to="/">
              <img
                src={Logo}
                alt="Logo"
                className="transition-all duration-300 w-40"
              />
            </Link>
          </div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-4 space-y-5">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? "bg-[#9F68FE] text-[#fff]"
                  : "text-[#364153] hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {isMobileSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <div
            className="w-64 h-full bg-[#F4F1FF]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex items-center justify-between">
              <div className="bg-[#fff] p-2">
                <Link to="/">
                  <img src={Logo} alt="Logo" className="w-20" />
                </Link>
              </div>
              <button onClick={() => setIsMobileSidebarOpen(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="px-4 space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === item.path
                      ? "bg-[#9F68FE] text-[#fff]"
                      : "text-[#364153] hover:bg-gray-100"
                  }`}
                  onClick={() => setIsMobileSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-8"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b border-gray-200 px-6 py-6 flex items-center justify-between">
          <button
            className="lg:hidden"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="hidden lg:block">
            {/* Empty div for spacing on desktop */}
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden sm:block font-medium text-gray-700">
              {creatorName}
            </span>
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
              {getInitials(creatorName)}
            </div>
          </div>
        </header>

        {/* Page Content - Children */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default FreeDashboardLayout;
