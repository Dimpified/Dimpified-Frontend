import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdPerson, IoMdMenu, IoMdClose } from "react-icons/io"; // Menu and close icons
import Logo from "../../../src/assets/DIMP logo colored.png";
import { ButtonSmallPurple, ButtonSmallWhite } from "../Buttons";
import { TextSpan } from "../Text";

const NavbarComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to toggle the mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white px-8 py-2 shadow-md fixed w-full z-20">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/affiliate" className="flex items-center">
          <img
            src={Logo}
            width="100"
            height="50"
            className="inline-block"
            alt="dimp logo"
          />
          <TextSpan className="ml-2 text-lg font-semibold font-body">
            Affiliate Program
          </TextSpan>
        </Link>

        {/* Desktop buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <ButtonSmallPurple
                width="20px"
                onClick={() => navigate("/affiliate/auth?tab=register")}
                type="button"
                className="bg-primary3 text-white px-4 py-2 rounded hover:bg-primary4"
              >
                Sign Up
              </ButtonSmallPurple>
              <ButtonSmallWhite
                width="20px"
                onClick={() => navigate("/affiliate/auth?tab=signIn")}
                type="button"
                className="bg-primary1 text-primary3 px-4 py-2 rounded hover:bg-primary5"
              >
                Sign In
              </ButtonSmallWhite>
            </>
          ) : (
            <Link to="/affiliate/profile">
              <IoMdPerson size={30} />
            </Link>
          )}
        </div>

        {/* Mobile menu icon */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            {menuOpen ? <IoMdClose size={30} /> : <IoMdMenu size={30} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden mt-2 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col items-center space-y-4 py-4">
            {!isAuthenticated ? (
              <>
                <ButtonSmallPurple
                  width="20px"
                  onClick={() => {
                    navigate("/affiliate/auth?tab=register");
                    setMenuOpen(false);
                  }}
                  type="button"
                  className="bg-primary3 text-white px-4 py-2 rounded hover:bg-primary4"
                >
                  Sign Up
                </ButtonSmallPurple>
                <ButtonSmallWhite
                  width="20px"
                  onClick={() => {
                    navigate("/affiliate/auth?tab=signIn");
                    setMenuOpen(false);
                  }}
                  type="button"
                  className="bg-primary1 text-primary3 px-4 py-2 rounded hover:bg-primary5"
                >
                  Sign In
                </ButtonSmallWhite>
              </>
            ) : (
              <Link to="/affiliate/profile">
                <IoMdPerson size={30} />
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarComponent;
