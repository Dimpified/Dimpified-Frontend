// import node module libraries
import { Fragment } from "react";
import { Menu } from "react-feather";
import { Link } from "react-router-dom";
import Logo from "../../LandingPages/images/dimp-blue.png";

// import sub components
import QuickMenu from "../../../layout/affliateLayout/AgentQuickMenu";

const HeaderDefault = (props) => {
  return (
    <Fragment>
      <nav className="bg-white border-b shadow-md w-full">
        <div className="flex justify-between items-center w-full px-4 py-2">
          <div className="flex items-center">
            {/* Conditionally render the Menu icon based on showMenu state on larger screens */}
            {props.data.showMenu ? (
              <Link
                id="nav-toggle"
                to="#"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link behavior
                  props.data.SidebarToggleMenu(); // Call the toggle function
                }}
                className="hidden md:block text-gray-700 hover:text-gray-900"
              >
                <Menu size="18px" />{" "}
                {/* Show the icon only when the sidebar is open */}
              </Link>
            ) : (
              <div>
                <img
                  src={Logo}
                  alt="Logo"
                  className={`hidden md:block h-10 w-auto`}
                />
              </div>
            )}

            {/* Always show the Menu icon on small screens */}
            <Link
              id="nav-toggle-mobile"
              to="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                props.data.SidebarToggleMenu(); // Call the toggle function
              }}
              className="md:hidden text-gray-700 hover:text-gray-900"
            >
              <Menu size="24px" />{" "}
            </Link>
            <div>
              <img
                src={Logo}
                alt="Logo"
                className={`md:hidden h-9 w-auto ml-2`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <QuickMenu />
          </div>
        </div>
      </nav>
    </Fragment>
  );
};

export default HeaderDefault;
