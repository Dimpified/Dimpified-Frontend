// import node module libraries
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

// import sub components
import NavbarVertical from "./AgentNavbarVertical";
import HeaderDefault from "./AgentHeaderDefault";

const AffliateDashboardIndex = (props) => {
  const { className } = props;
  const [showMenu, setShowMenu] = useState(false);

  const toggleSidebar = () => {
    setShowMenu((prev) => !prev); // Toggle menu state
  };

  return (
    <div className="flex h-[100dvh]">
      {/* Sidebar */}
      <div
        className={`${
          showMenu ? "md:w-64" : "md:w-16"
        } transition-all`}
      >
        <NavbarVertical showMenu={showMenu} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <HeaderDefault
          data={{
            showMenu: showMenu,
            SidebarToggleMenu: toggleSidebar,
          }}
        />

        {/* Main Content */}
        <div
          className={`container-fluid ${className || ""} p-4 overflow-y-auto`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AffliateDashboardIndex;
