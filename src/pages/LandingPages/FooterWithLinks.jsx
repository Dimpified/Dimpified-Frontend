// import node module libraries
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

// import media files
import FooterLogo from "./images/DIMPwhitelogo.png";
import Logo from "./images/dimp-blue.png";
const FooterWithLinks = () => {
  return (
    <Fragment>
      <footer className="pt-10 px-4 bg-primary2 text-white">
        <div className="flex flex-col h-full py-4 px-4 lg:px-24">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-4/12 mb-8">
              {/* about company */}
              <div className="mb-4">
                <img src={FooterLogo} alt="" className="h-8" />
                <div className="mt-4 me-6">
                  <p>
                    Dimpified for business is an online business software that
                    provides essential internet infrastructure for commerce,
                    offering trusted tools to start, scale, market, and run a
                    service-based business of any size.
                  </p>
                  {/* social media */}
                  <div className="flex space-x-4 text-xl mt-4">
                    <Link
                      to="https://www.linkedin.com/company/gfa-technologies/mycompany/"
                      className="text-gray-200 hover:text-sec10"
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      to="https://www.facebook.com/getfundedafricaoffical/"
                      className="text-gray-200 hover:text-sec10"
                    >
                      <FaFacebook />
                    </Link>
                    <Link
                      to="https://x.com/gfunded_africa"
                      className="text-gray-200 hover:text-sec10"
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      to="https://www.instagram.com/gfatechnologies/"
                      className="text-gray-200 hover:text-sec10"
                    >
                      <FaInstagram />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/12 mb-8">
              <h6 className="mb-2 text-gray-400">COMPANY</h6>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-gray-200 hover:text-sec10">
                    For Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/pricing"
                    className="text-gray-200 hover:text-sec10"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://media.getfundedafrica.com/"
                    className="text-gray-200 hover:text-sec10"
                  >
                    Our Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className="text-gray-200 hover:text-sec10"
                  >
                    Our Team
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="https://gfa-tech.com/company/career/index.html"
                    className="text-gray-200 hover:text-sec10"
                  >
                    Careers
                  </Link>
                </li> */}
              </ul>
            </div>

            <div className="w-full lg:w-2/12 mb-8">
              <h6 className="mb-2 text-gray-400">SUPPORT</h6>
              <ul className="space-y-2">
                {/* <li>
                  <Link to="#" className="text-gray-200 hover:text-sec10">
                    Dimpified Ecosystem School
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-gray-200 hover:text-sec10">
                    Developer Program
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="/affiliate"
                    className="text-gray-200 hover:text-sec10"
                  >
                    Affiliate Program
                  </Link>
                </li>
                {/* <li>
                  <Link to="#" className="text-gray-200 hover:text-sec10">
                    Builder Program
                  </Link>
                </li> */}
                <li>
                  <Link to="/help" className="text-gray-200 hover:text-sec10">
                    Help Center
                  </Link>
                </li>
                
              </ul>
            </div>

            <div className="w-full lg:w-4/12 mb-8">
              {/* contact info */}
              <div className="mb-4">
                <h6 className="mb-2 text-gray-400">GET IN TOUCH</h6>
                <p>
                  2nd Floor, Wing-C, <br /> Ogun Tech Hub, Abeokuta
                </p>
                <p className="mb-1">
                  Email:{" "}
                  <Link
                    to="mailto:hello@dimpified.com"
                    className="text-white hover:text-sec10"
                  >
                    hello@dimpified.com
                  </Link>
                </p>
                <p>
                  Phone:{" "}
                  <span className="text-white font-semibold">
                    +234 70 8916 7952
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="py-6 mt-8 px-4 sm:px-6 lg:px-8 border-t border-gray-900">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-sm text-white text-center md:text-left">
                © {new Date().getFullYear()} Dimpified Technologies Limited. All Rights Reserved
              </span>

              <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                <Link
                  className="text-sm text-white hover:text-primary3 transition-colors duration-200 whitespace-nowrap"
                  to="/terms-of-service"
                >
                  Terms of Service
                </Link>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <Link
                  className="text-sm text-white hover:text-primary3 transition-colors duration-200 whitespace-nowrap"
                  to="/privacy-policy"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-300 hidden sm:inline">|</span>
                <Link
                  className="text-sm text-white hover:text-primary3 transition-colors duration-200 whitespace-nowrap"
                  to="/refund-policy"
                >
                  Refund Policy
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};
const CustomerFooter = () => {
  return (
    <Fragment>
      <footer className="pt-10 px-4 bg-gray-100 text-black">
        <div className="flex flex-col h-full py-4 px-4 lg:px-24">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-4/12 mb-8">
              {/* about company */}
              <div className="mb-4">
                <img src={Logo} alt="" className="h-6" />
                <div className="mt-4 me-6">
                  <p>
                    Instantly book personal and wellness services from the
                    convenience of your space.
                  </p>
                  {/* social media */}
                  <div className="flex space-x-4 text-xl mt-4">
                    <Link
                      to="https://www.linkedin.com/company/gfa-technologies/mycompany/"
                      className="text-black hover:text-sec10"
                    >
                      <FaLinkedin />
                    </Link>
                    <Link
                      to="https://www.facebook.com/getfundedafricaoffical/"
                      className="text-black hover:text-sec10"
                    >
                      <FaFacebook />
                    </Link>
                    <Link
                      to="https://x.com/gfunded_africa"
                      className="text-black hover:text-sec10"
                    >
                      <FaTwitter />
                    </Link>
                    <Link
                      to="https://www.instagram.com/gfatechnologies/"
                      className="text-black hover:text-sec10"
                    >
                      <FaInstagram />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-3/12 mb-8">
              <h6 className="mb-2 font-semibold text-gray-800">
                Book Appointments
              </h6>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/barbers-near-me"
                    className="text-black hover:text-sec10"
                  >
                    Barber
                  </Link>
                </li>
                <li>
                  <Link
                    to="/hairdressers-near-me"
                    className="text-black hover:text-sec10"
                  >
                    Hair Stylist
                  </Link>
                </li>
                <li>
                  <Link
                    to="/makeup-near-me"
                    className="text-black hover:text-sec10"
                  >
                    Make-Up Artist
                  </Link>
                </li>
                <li>
                  <Link
                    to="/nailtechs-near-me"
                    className="text-black hover:text-sec10"
                  >
                    Nail Technicians
                  </Link>
                </li>
                <li>
                  <Link
                    to="/spa-near-me"
                    className="text-black hover:text-sec10"
                  >
                    Spa and Wellness Centres
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full lg:w-2/12 mb-8">
              <h6 className="mb-2 font-semibold text-gray-800">Company</h6>
              <ul className="space-y-2">
                <li>
                  <Link to="/merchants" className="text-black hover:text-sec10">
                    Dimpified For Business
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-black hover:text-sec10">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://media.getfundedafrica.com/"
                    className="text-black hover:text-sec10"
                  >
                    Our Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="/team"
                    className="text-black hover:text-sec10"
                  >
                    Our Team
                  </Link>
                </li>
                {/* <li>
                  <Link
                    to="https://gfa-tech.com/company/career/index.html"
                    className="text-black hover:text-sec10"
                  >
                    Careers
                  </Link>
                </li> */}
              </ul>
            </div>

            <div className="w-full lg:w-3/12 mb-8">
              {/* contact info */}
              <div className="mb-4">
                <h6 className="mb-2 font-semibold text-gray-800">Contact</h6>
                <p>
                  2nd Floor, Wing-C, <br /> Ogun Tech Hub, Abeokuta
                </p>
                <p className="mb-1">
                  Email:{" "}
                  <Link
                    to="mailto:hello@dimpified.com"
                    className="text-black hover:text-sec10"
                  >
                    hello@dimpified.com
                  </Link>
                </p>
                <p>
                  Phone:{" "}
                  <span className="text-black font-semibold">
                    +234 70 8916 7952
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="py-6 mt-8 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <span className="text-sm text-black text-center md:text-left">
                © {new Date().getFullYear()} Dimpified Technologies Limited. All Rights Reserved
              </span>

              <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2">
                <Link
                  className="text-sm text-black hover:text-primary3 transition-colors duration-200 whitespace-nowrap"
                  to="/terms-of-service"
                >
                  Terms of Service
                </Link>
                <span className="text-gray-900 hidden sm:inline">|</span>
                <Link
                  className="text-sm text-black hover:text-primary3 transition-colors duration-200 whitespace-nowrap"
                  to="/privacy-policy"
                >
                  Privacy Policy
                </Link>
                <span className="text-gray-900 hidden sm:inline">|</span>
                <Link
                  className="text-sm text-black hover:text-primary3 transition-colors duration-200 whitespace-nowrap"
                  to="/refund-policy"
                >
                  Refund Policy
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export { CustomerFooter, FooterWithLinks };
