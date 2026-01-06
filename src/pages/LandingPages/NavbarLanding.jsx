import { useState } from "react";
import Logo from "./images/dimp-blue.png";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NavbarLanding = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false); // Hamburger menu toggle state
  const [dropdownOpen, setDropdownOpen] = useState({
    features: false,
    useCases: false,
    support: false,
  });

  const handleMouseEnter = (dropdown) => {
    setDropdownOpen((prev) => ({ ...prev, [dropdown]: true }));
  };

  const handleMouseLeave = (dropdown) => {
    setDropdownOpen((prev) => ({ ...prev, [dropdown]: false }));
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleDropdown = (dropdown) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const handleSignUp = () => {
    if (location.pathname === "/barbers") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Barber Shop");
      navigate("/auth/personal-information");
    } else if (location.pathname === "/hairdressers") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Hair Salon");
      navigate("/auth/personal-information");
    } else if (location.pathname === "/makeup") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Makeup Artist Services");
      navigate("/auth/personal-information");
    } else if (location.pathname === "/nails") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Nail Salon");
      navigate("/auth/personal-information");
    } else if (location.pathname === "/gym") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem(
        "SubCategory",
        "Personal Training and Fitness Coaching"
      );
      navigate("/auth/personal-information");
    } else if (location.pathname === "/spa") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Spa and Wellness Center");
      navigate("/auth/personal-information");
    } else {
      sessionStorage.removeItem("Category");
      sessionStorage.removeItem("SubCategory");
      navigate("/auth/personal-information");
    }
  };

  return (
    <nav className="font-sen bg-white px-6 py-2 fixed top-0 left-0 w-full z-50">
      <div className="flex flex-wrap items-center justify-between lg:px-24 py-1">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img src={Logo} className="h-6" alt="Logo" />
        </Link>
        <div className="flex items-center md:order-2 space-x-1 md:space-x-3 rtl:space-x-reverse">
          <Link
            to="/auth/login"
            className="btn btn-outline-primary md:block hidden text-primary3 text-sm px-4 py-2 md:px-5 md:py-2.5 rounded-lg flex items-center justify-between border-2 border-primary3 hover:bg-primary3 hover:text-white transition"
          >
            Sign In
          </Link>
          <button
            onClick={handleSignUp}
            className="md:block hidden bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ff8201]  hover:bg-gradient-to-l from-[#4f2683]  via-[#9966cc] to-[#ff8201]  text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Sign Up
          </button>
          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-8000 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-primary3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
        {/* Mobile menu that slides in from the left */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:hidden overflow-x-auto`}
        >
          <div className="flex justify-end p-4">
            <button
              onClick={toggleMenu}
              type="button"
              className="text-primary3 hover:text-gray-800 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col px-4 space-y-4 font-medium">
            <li>
              <Link
                to="/merchants#features"
                onClick={() => {
                  scrollToElement("features");
                  toggleMenu();
                }}
                className="block py-2 text-gray-800 hover:text-primary3"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={toggleMenu}
                className="block py-2 text-gray-800 hover:text-primary3"
              >
                About Dimpified
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={() => toggleDropdown("useCases")}
                className="flex items-center justify-between w-full py-2 font-medium text-gray-800 hover:text-primary3"
              >
                Use Cases
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {dropdownOpen.useCases && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <Link
                      to="/barbers"
                      onClick={toggleMenu}
                      className="block py-1 text-gray-800 hover:text-primary3"
                    >
                      Barbers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/hairdressers"
                      onClick={toggleMenu}
                      className="block py-1 text-gray-800 hover:text-primary3"
                    >
                      Hairdressers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/makeup"
                      onClick={toggleMenu}
                      className="block py-1 text-gray-800 hover:text-primary3"
                    >
                      Make-Up Artists
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/nails"
                      onClick={toggleMenu}
                      className="block py-1 text-gray-800 hover:text-primary3"
                    >
                      Nail Salons
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/gym"
                      onClick={toggleMenu}
                      className="block py-1 text-gray-800 hover:text-primary3"
                    >
                      Gym and Fitness Centers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/spa"
                      onClick={toggleMenu}
                      className="block py-1 text-gray-800 hover:text-primary3"
                    >
                      Spa and Wellness Centers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/usecases"
                      onClick={toggleMenu}
                      className="block py-1 text-gray-800 hover:text-primary3"
                    >
                      More usecases...
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <Link
                to="/pricing"
                onClick={toggleMenu}
                className="block py-2 text-gray-800 hover:text-primary3"
              >
                Pricing
              </Link>
            </li>
            <li className="relative">
              <button
                onClick={() => toggleDropdown("support")}
                className="flex items-center justify-between w-full py-2 font-medium text-gray-800 hover:text-primary3"
              >
                Support
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              {dropdownOpen.support && (
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <Link
                      to="/help"
                      onClick={toggleMenu}
                      className="block py-1 text-gray-800 hover:text-primary3"
                    >
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/merchants/onboarding"
                      onClick={toggleMenu}
                      className="block py-1 text-gray-800 hover:text-primary3"
                    >
                      Merchants Onboarding
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/barbers/onboarding"
                      className="text-gray-8000 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                    >
                      Barbers Onboarding
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/hairdressers/onboarding"
                      className="text-gray-8000 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                    >
                      Hairdressers Onboarding
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/makeup/onboarding"
                      className="text-gray-8000 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                    >
                      Make-Up Artist Onboarding
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/spa/onboarding"
                      className="text-gray-8000 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                    >
                      Spa Onboarding
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/nail/onboarding"
                      className="text-gray-8000 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                    >
                      Nail Tech Onboarding
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/gym/onboarding"
                      className="text-gray-8000 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                    >
                      Gym Onboarding
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dentist/onboarding"
                      className="text-gray-8000 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                    >
                      Dentist Onboarding
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li className="mt-4">
              <Link
                to="/auth/login"
                onClick={toggleMenu}
                className="btn btn-outline-primary w-full text-primary3 text-sm px-4 py-3 rounded-lg flex items-center justify-center border border-primary3 hover:bg-primary3 hover:text-white transition"
              >
                Sign In
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  handleSignUp();
                  toggleMenu();
                }}
                className="w-full bg-gradient-to-r from-[#4f2683] via-[#9966cc] to-[#ff8201] hover:bg-gradient-to-l from-[#4f2683] via-[#9966cc] to-[#ff8201] text-white font-medium rounded-lg text-sm px-4 py-3"
              >
                Sign Up
              </button>
            </li>
          </ul>
        </div>
        {/* Desktop menu (unchanged) */}
        <div className="hidden md:flex items-center justify-between w-full md:w-auto md:order-1">
          <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse">
            <li>
              <Link
                to="/merchants#features"
                onClick={() => scrollToElement("features")}
                className="block py-2 px-3 text-gray-800 border-b border-gray-100 hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-primary3 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-gray-800 border-b border-gray-100 hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-primary3 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About Dimpified
              </Link>
            </li>
            <li
              onMouseEnter={() => handleMouseEnter("useCases")}
              onMouseLeave={() => handleMouseLeave("useCases")}
              className="relative"
            >
              <button
                onClick={() => toggleDropdown("useCases")}
                className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-800 border-b border-gray-100 md:w-auto hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-primary3 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Use Cases
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                className={`absolute z-10 grid lg:w-[95vh] lg:grid-cols-3 grid-col-1 w-full gap-4 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-700 transition-all duration-300 ${
                  dropdownOpen.useCases
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
                style={{
                  top: "40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                  <ul className="space-y-4">
                    <li>
                      <Link
                        to="/barbers"
                        className="text-gray-8000 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Barbers
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/hairdressers"
                        className="text-gray-8000 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Hairdressers
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/makeup"
                        className="text-gray-8000 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Make-Up Artists
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                  <ul className="space-y-4">
                    <li>
                      <Link
                        to="/nails"
                        className="text-gray-8000 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Nail Salons
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/gym"
                        className="text-gray-8000 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Gym and Fitness Centers
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dentist"
                        className="text-gray-8000 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Dentists
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="p-4 text-gray-900 md:pb-4 dark:text-white">
                  <ul className="space-y-4">
                    <li>
                      <Link
                        to="/spa"
                        className="text-gray-8000 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Spa and Wellness Centers
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/usecases"
                        className="text-gray-8000 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        More usecases...
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
            <li>
              <Link
                to="/pricing"
                className="block py-2 px-3 text-gray-800 border-b border-gray-100 hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-primary3 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Pricing
              </Link>
            </li>
            <li
              onMouseEnter={() => handleMouseEnter("support")}
              onMouseLeave={() => handleMouseLeave("support")}
              className="relative"
            >
              <button
                onClick={() => toggleDropdown("support")}
                className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-800 border-b border-gray-100 md:w-auto hover:bg-gray-800 md:hover:bg-transparent md:border-0 md:hover:text-primary3 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Support
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                className={`absolute z-10 grid lg:w-[95vh] lg:grid-cols-3 grid-col-1 w-full gap-4 text-sm bg-white border border-gray-100 rounded-lg shadow-md dark:border-gray-700 dark:bg-gray-700 transition-all duration-300 ${
                  dropdownOpen.support
                    ? "opacity-100 visible"
                    : "opacity-0 invisible"
                }`}
                style={{
                  top: "40px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                  <ul className="space-y-4">
                    <li>
                      <Link
                        to="/barbers/onboarding"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Barber's Onboarding
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/hairdressers/onboarding"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Hairdresser's Onboarding
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/makeup/onboarding"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Make-Up Artist's Onboarding
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="p-4 pb-0 text-gray-900 md:pb-4 dark:text-white">
                  <ul className="space-y-4">
                    <li>
                      <Link
                        to="/nails/onboarding"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Nail Tech's Onboarding
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/gym/onboarding"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Gym Owners' Onboarding
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/dentist/onboarding"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Dentists' Onboarding
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="p-4 text-gray-900 md:pb-4 dark:text-white">
                  <ul className="space-y-4">
                    <li>
                      <Link
                        to="/spa/onboarding"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Spa Centre's Onboarbing
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/help"
                        className="text-gray-500 dark:text-gray-400 hover:text-primary3 dark:hover:text-blue-500"
                      >
                        Help Centre
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarLanding;
