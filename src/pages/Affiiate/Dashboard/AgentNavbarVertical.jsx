import { Link, useLocation } from "react-router-dom";
import SimpleBar from "simplebar-react";
import Logo from "../../LandingPages/images/dimp-blue.png";
import { DashboardMenu } from "../../../data/affliateData/AffliateDashboardRoutes";
import { Menu, X } from "react-feather"; // X is for the close button on small screens
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const NavbarVertical = ({ showMenu, toggleSidebar }) => {
  const location = useLocation();
  const [openMenuIndex, setOpenMenuIndex] = useState(null); // State to track which menu is open

  const handleMenuToggle = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index); // Toggle the menu
  };

  const handleLinkClick = () => {
    toggleSidebar(); // Close sidebar after link is clicked
  };

  return (
    <div>
      {/* Sidebar for larger screens */}
      <div
        className={`h-screen bg-gray-800 ${
          showMenu ? "w-64" : "w-16 flex flex-col justify-center items-center"
        } transition-all overflow-hidden font-body hidden md:flex`} // Hide on small screens by default
      >
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className={` ${
            showMenu
              ? "hidden"
              : "p-3 text-gray-200 focus:outline-none hover:bg-gray-700 mt-3"
          }`}
        >
          <Menu size="20px" />
        </button>

        {/* Sidebar Content */}
        <SimpleBar className="flex-grow overflow-hidden">
          <div className="flex items-center justify-center p-4">
            <img
              src={Logo}
              alt="Logo"
              className={`${showMenu ? "block" : "hidden"} h-12 w-auto`}
            />
          </div>

          {/* Dashboard Menu */}
          <nav className="flex flex-col mt-6">
            {DashboardMenu.map((menu, index) => {
              const hasChildren = menu.children && menu.children.length > 0;

              return (
                <div key={index} className="mt-4 font-body">
                  <div className="flex items-center">
                    {showMenu ? (
                      <>
                        {/* Title with Link */}
                        <p
                          className={`text-xs font-bold text-gray-400 px-4 uppercase`}
                          onClick={
                            hasChildren
                              ? () => handleMenuToggle(index)
                              : undefined
                          }
                        >
                          {hasChildren ? (
                            <Link className="px-4 py-2 cursor-pointer text-sm font-semibold text-white bg-transparent rounded-lg hover:bg-primary3 hover:text-gray-900 flex items-center">
                              <div className="mr-2">{menu.icon}</div>
                              <div className="flex items-center space-x-2">
                                <div>{menu.title}</div>{" "}
                                <div>
                                  {openMenuIndex ? (
                                    <IoIosArrowUp />
                                  ) : (
                                    <IoIosArrowDown />
                                  )}
                                </div>
                              </div>
                            </Link>
                          ) : (
                            <Link
                              to={menu.link}
                              className={`px-4 py-2 text-sm font-semibold text-white bg-transparent rounded-lg hover:bg-primary3 hover:text-gray-900 flex items-center ${
                                location.pathname === menu.link
                                  ? "bg-gray-200 text-gray-900"
                                  : ""
                              }`}
                            >
                              <div className="mr-2">{menu.icon}</div>
                              <div>{menu.title}</div>
                            </Link>
                          )}
                        </p>
                      </>
                    ) : (
                      // When menu is closed, only show the icon
                      <Link
                        to={menu.link}
                        onClick={() => {
                          if (hasChildren) {
                            handleMenuToggle(index);
                          }
                          handleLinkClick();
                        }}
                        className={`flex items-center justify-center w-full p-2 text-sm font-semibold text-white rounded-lg hover:bg-primary3 ${
                          location.pathname === menu.link ? "bg-primary3" : ""
                        }`}
                      >
                        {menu.icon}
                      </Link>
                    )}
                  </div>
                  {hasChildren && openMenuIndex === index && (
                    <div className="ml-12">
                      {menu.children.map((child, childIndex) => (
                        <div key={childIndex}>
                          <Link
                            to={child.link}
                            onClick={() =>
                              hasChildren
                                ? handleMenuToggle(index)
                                : handleLinkClick()
                            }
                            className={`block w-24 px-4 py-2 text-sm font-semibold text-white bg-transparent rounded-lg hover:bg-primary3 hover:text-gray-900 
                            ${
                              location.pathname === child.link
                                ? "bg-gray-200 text-gray-900"
                                : ""
                            }`}
                          >
                            {child.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </SimpleBar>
      </div>

      {/*Navbar for small screens when showMenu is true */}
      {showMenu && (
        <div className="md:hidden fixed inset-0 bg-gray-900 bg-opacity-75 z-50">
          <div className="flex flex-col h-full w-64 bg-gray-800">
            {/* Close button */}
            <button
              onClick={toggleSidebar}
              className="p-3 text-gray-200 focus:outline-none hover:bg-gray-700 hover:text-primary3 self-end"
            >
              <X size="24px" />
            </button>

            {/* Logo */}
            <div className="flex items-center justify-center p-4">
              <img src={Logo} alt="Logo" className="h-12 w-auto" />
            </div>

            {/* Menu items */}
            <nav className="flex flex-col mt-6">
              {DashboardMenu.map((menu, index) => {
                const hasChildren = menu.children && menu.children.length > 0;

                return (
                  <div key={index} className="mt-4 font-body">
                    <div className="flex items-center">
                      <Link
                        to={menu.link}
                        onClick={() =>
                          hasChildren
                            ? handleMenuToggle(index)
                            : handleLinkClick()
                        }
                        className={`px-4 py-2 text-sm font-semibold text-white bg-transparent rounded-lg hover:bg-primary3 hover:text-gray-900 flex items-center ${
                          location.pathname === menu.link
                            ? "bg-gray-200 text-gray-900"
                            : ""
                        }`}
                      >
                        <div className="mr-2">{menu.icon}</div>
                        <div>{menu.title}</div>
                      </Link>
                    </div>
                    {hasChildren && openMenuIndex === index && (
                      <div className="ml-12">
                        {menu.children.map((child, childIndex) => (
                          <div key={childIndex}>
                            <Link
                              to={child.link}
                              // onClick={handleLinkClick}
                              onClick={() => {
                                if (hasChildren) {
                                  handleMenuToggle(index);
                                }
                                handleLinkClick();
                              }}
                              className={`block w-24 px-4 py-2 text-sm font-semibold text-white bg-transparent rounded-lg hover:bg-primary3 hover:text-gray-900 
                            ${
                              location.pathname === child.link
                                ? "bg-gray-200 text-gray-900"
                                : ""
                            }`}
                            >
                              {child.name}
                            </Link>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarVertical;
