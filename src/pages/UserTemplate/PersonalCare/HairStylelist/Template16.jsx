import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFax,
} from "react-icons/fa";
import { HairSalon } from "../../../../data/Services";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

// App Component
const SecondStylist = ({ details, subdomain, userDetails }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [services, setServices] = useState([]);
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    const getServiceeDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`
        );
        const allServices = response.data.flatMap((item) => item.services);
        const userCurrency = response.data.flatMap((item) => item.currency);
          setCurrency(userCurrency);
        setServices(allServices);
      } catch (error) {
        console.log("not working", error);
      } finally {
        console.log("finish loading");
      }
    };
    getServiceeDetails();
  }, []);

  const sanitizeContent = (html) => {
    return sanitizeHtml(html, {
      allowedTags: [],
      allowedAttributes: {},
    });
  };
  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  const testimonials = [
    {
      id: 1,
      image: details && details.Reviews.image1,
      name: details && details.Reviews.header1,
      role: details && details.Reviews.title1,
      comment: details && details.Reviews.summary1,
    },
    {
      id: 2,
      image: details && details.Reviews.image2,
      name: details && details.Reviews.header2,
      role: details && details.Reviews.title2,
      comment: details && details.Reviews.summary2,
    },
    {
      id: 3,
      image: details && details.Reviews.image3,
      name: details && details.Reviews.header3,
      role: details && details.Reviews.title3,
      comment: details && details.Reviews.summary3,
    },
  ];

  // Simulate tab refresh effect
  const [loading, setLoading] = useState(false);

  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  const handleArrowClick = (direction) => {
    if (direction === "left") {
      setCurrentTestimonialIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    } else if (direction === "right") {
      setCurrentTestimonialIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const currentTestimonial = testimonials[currentTestimonialIndex];

  return (
    <div className="font-jak">
      <header>
        {/* Navigation Menu */}
        <div className="bg-white shadow">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <a href="index.html" className="inline-block">
                <img
                  src={details && details.navbar.logo}
                  alt="logo"
                  className="h-10"
                />
              </a>
            </div>

            {/* Navigation Links */}
            <nav className="hidden md:block">
              <ul className="flex space-x-6 text-sm font-medium">
                <li>
                  <a
                    href="#about"
                    className="hover:underline uppercase text-[#6D4032] font-bold"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#featured"
                    className="hover:underline uppercase text-[#6D4032] font-bold"
                  >
                    Featured
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:underline uppercase text-[#6D4032] font-bold"
                  >
                    Our Services
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    className="hover:underline uppercase text-[#6D4032] font-bold"
                  >
                    Gallery
                  </a>
                </li>
              </ul>
            </nav>

            {/* Mobile Menu */}
            <div className="block md:hidden">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <i className="fa fa-bars text-gray-700 text-2xl"></i>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Content */}
          {isMobileMenuOpen && (
            <nav className="md:hidden bg-white border-t border-gray-200">
              <ul className="space-y-4 px-4 py-4 text-sm font-medium">
                <li>
                  <a
                    href="#about"
                    className="hover:underline uppercase text-[#6D4032] font-bold"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#featured"
                    className="hover:underline uppercase text-[#6D4032] font-bold"
                  >
                    Featured
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:underline uppercase text-[#6D4032] font-bold"
                  >
                    Our Services
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    className="hover:underline uppercase text-[#6D4032] font-bold"
                  >
                    Gallery
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </header>
      <div
        id="home"
        className="relative bg-gradient-to-r from-[#E9D6BE] to-[#E7CDBA]"
      >
        <div className=" px-2 py-8 flex flex-col md:flex-row md:px-32 justify-between items-center">
          {/* Left Section */}
          <div className="space-y-4 flex flex-col  md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl font-Prata md:text-6xl font-semibold text-[#7C503B] italic leading-none">
            {sanitizeContent(details && details.hero.title1)}
            </h1>
            <h2 className="text-4xl font-Prata md:text-8xl font-bold text-black leading-snug">
            {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}{" "}
              <br />
              {sanitizeContent(details && details.hero.title2)}
            </h2>
            <p className="text-gray-700 text-lg tracking-wide">
            {sanitizeContent(details && details.hero.summary1)}
            </p>
            <div className="flex  space-x-4">
              <button
                onClick={handleModalOpen}
                className="bg-[#6D4032] text-white px-8 py-3 rounded-full hover:bg-[#5A3426] transition"
              >
                Book Appointment
              </button>
            </div>
            {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
                information={services}
                subdomain={subdomain}
                serviceCurrency={currency}
              />
            )}
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 hidden md:block relative">
            <img
              src={details && details.hero.backgroundImage1}
              alt="Surprising Hair Color"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
      <section id="about" className="relative bg-white py-12">
        {/* Container */}
        <div className="px-4  py-6 md:px-32 flex flex-wrap items-center">
          {/* Image Section */}
          <div className="w-full md:w-5/12 px-4 relative">
            <div className="bg-gradient-to-r from-[#e5d0b6] to-[#f7f3ec] p-2">
              <img
                src={details && details.aboutUs.image1}
                alt="About Us"
                className="w-full h-auto object-cover"
              />
            </div>
            <h4 className="absolute font-bold -left-12 top-1/2 transform -rotate-90 text-brown-700 text-xl tracking-wider">
            {sanitizeContent(details && details.aboutUs.title1)}
            </h4>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-6/12 py-6 px-4">
            <div>
              <h2 className="text-4xl font-Prata font-bold text-[#5e3824] mb-4">
              {sanitizeContent(details && details.aboutUs.title2)}
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {sanitizeContent(details && details.aboutUs.text1)}
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-10">
              {sanitizeContent(details && details.aboutUs.text2)}
              </p>
              <a
                href="#services"
                className="bg-[#5e3824] text-white py-4 px-6 rounded-full uppercase tracking-widest hover:bg-[#4c2f1f] transition"
              >
                Our Services
              </a>
            </div>
          </div>
        </div>
      </section>
      <section
        className="py-10 px-4 bg-gradient-to-r from-[#E9D6BE] to-[#E7CDBA]"
        id="featured"
      >
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-4xl font-Prata font-bold  text-[#5e2f1e]">
            Featured Services
          </h2>
          <h5 className="text-gray-600 text-lg">For the best hair treatment</h5>
        </div>

        {/* Product Container */}
        <div className="relative">
          {/* Product Cards */}
          <div className="flex flex-wrap gap-6 justify-center px-4">
            {services.slice(0, 4).map((service, index) => (
              <div
                key={index}
                className="w-full max-w-[250px]hover:shadow-lg sm:w-[45%] md:w-[30%] lg:w-[20%]"
              >
                {/* Product Image */}
                <div className="relative">
                  <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-full h-100 object-cover"
                  />
                  {service.name && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs rounded">
                      {service.name}
                    </div>
                  )}
                  {/* Icons */}
                  <div className="absolute inset-0 flex justify-center items-end gap-4 pb-4 opacity-0 hover:opacity-100 transition">
                    <button
                      onClick={handleModalOpen}
                      className="bg-[#6D4032] text-white px-8 py-3 rounded-full hover:bg-[#5A3426] transition"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-4 text-center">
                  <h6 className="font-semibold text-gray-700">
                    {service.shortDescription}
                  </h6>
                  <h6 className="text-gray-500">
                    <span className="text-red-500 font-bold">
                      #{service.price}
                    </span>
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Title Section */}
          <div className="text-center mb-10">
            <h5 className="text-[#b6784f] font-serif italic">Work</h5>
            <h2 className="text-4xl font-Prata font-bold text-[#5e2f1e]">
            {sanitizeContent(details && details.Statistics.section1header)}
            </h2>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left Side - Tabular Icons */}
            <div className="w-full">
              <table className="w-full border-collapse">
                <tbody>
                  {/* Row 1 */}
                  <tr>
                    <td className="border-t-0 border-l-0 p-6 text-center border-r border-b border-[#E9D6BE]">
                      <div className="text-4xl mb-2 text-[#e6b272]">🧖</div>
                      <p className="text-[#b6784f] capitalize font-medium">
                      {sanitizeContent(
                          details && details.Statistics.section1paragraphy
                        )}
                      </p>
                    </td>
                    <td className="p-6 text-center border-b border-[#E9D6BE]">
                      <div className="text-4xl mb-2 text-[#b6784f]">💨</div>
                      <p className="text-[#b6784f] capitalize font-medium">
                      {sanitizeContent(
                          details && details.Statistics.section1span
                        )}
                      </p>
                    </td>
                    <td className="border-t-0 border-r-0 p-6 text-center border-l border-b border-[#E9D6BE]">
                      <div className="text-4xl mb-2 text-[#b6784f]">✂️</div>
                      <p className="text-[#b6784f] capitalize font-medium">
                      {sanitizeContent(
                          details && details.Statistics.section1icon
                        )}
                      </p>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr>
                    <td className="border-b-0 border-l-0 p-6 text-center border-r border-t border-[#E9D6BE]">
                      <div className="text-4xl mb-2 text-[#b6784f]">💇</div>
                      <p className="text-[#b6784f] capitalize font-medium">
                      {sanitizeContent(
                          details && details.Statistics.section2header
                        )}
                      </p>
                    </td>
                    <td className="p-6 text-center border-t border-[#E9D6BE]">
                      <div className="text-4xl mb-2 text-[#b6784f]">💨</div>
                      <p className="text-[#b6784f] capitalize font-medium">
                      {sanitizeContent(
                          details && details.Statistics.section2paragraphy
                        )}
                      </p>
                    </td>
                    <td className="border-b-0 border-r-0 p-6 text-center border-l border-t border-[#E9D6BE]">
                      <div className="text-4xl mb-2 text-[#b6784f]">🧖</div>
                      <p className="text-[#b6784f] capitalize font-medium">
                      {sanitizeContent(
                          details && details.Statistics.section2span
                        )}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Right Side - Working Hours */}
            <div className="px-4">
              <ul className="space-y-4 text-[#b6784f]">
                <li className="flex justify-between border-b pb-2 border-[#E9D6BE]">
                  <span className="capitalize font-medium text-[#b6784f]">
                  {sanitizeContent(details && details.LargeCta.header2)}
                  </span>
                  <span className="font-semibold text-[#b6784f]">
                  {sanitizeContent(
                      details && details.Statistics.section3header
                    )}
                  </span>
                </li>
                <li className="flex justify-between border-b pb-2 border-[#E9D6BE]">
                  <span className="capitalize font-medium text-[#b6784f]">
                  {sanitizeContent(
                      details && details.Statistics.section3paragraphy
                    )}
                  </span>
                  <span className="font-semibold text-[#b6784f]">
                  {sanitizeContent(
                      details && details.Statistics.section3span
                    )}
                  </span>
                </li>
                <li className="flex justify-between border-b pb-2 border-[#E9D6BE]">
                  <span className="capitalize font-medium text-[#b6784f]">
                  {sanitizeContent(
                      details && details.Statistics.section4header
                    )}
                  </span>
                  <span className="font-semibold text-[#b6784f]">
                  {sanitizeContent(
                      details && details.Statistics.section4paragraphy
                    )}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="capitalize font-medium text-[#b6784f]">
                  {sanitizeContent(
                      details && details.Statistics.section4span
                    )}
                  </span>
                  <span className="font-semibold text-[#b6784f]">{sanitizeContent(details && details.LargeCta.header3)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section
        className="relative py-16 px-4 bg-gradient-to-r from-[#E9D6BE] to-[#E7CDBA] overflow-hidden"
        id="services"
      >
        <div className="max-w-7xl mx-auto px-4  grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-Prata font-bold text-[#5e2f1e]">
            {sanitizeContent(details && details.Vision.visiomheader)}
            </h2>
            <p className="text-gray-700 text-lg leading-loose pb-16">
            {sanitizeContent(details && details.Vision.visionsummary)}
            </p>
            {""}
            <a
              href="#prices"
              className="bg-[#5e2f1e] text-white py-3 px-6 mt-16 uppercase font-medium rounded-full"
            >
              {sanitizeContent(details && details.Vision.impactheader)}
            </a>
          </div>

          {/* Right Side: Before/After Slider */}
          <div className="relative w-full">
            <div
              className="relative overflow-hidden"
              style={{ height: "500px" }}
            >
              {/* Before Image */}
              <img
                src={details && details.Vision.impactsummary}
                alt="Before"
                className="w-full h-full object-cover"
              />
              {/* After Image with slider */}
              <div
                className="absolute top-0 left-1/2 w-1/2 h-full overflow-hidden"
                style={{ clipPath: "inset(0 0 0 0)" }}
              ></div>

              {/* Slider Handle */}
              <div className="absolute top-0 left-1/2 h-full w-1 bg-white"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 bg-white border border-gray-300 rounded-full flex items-center justify-center">
                <span className="block h-3 w-3 bg-[#5e2f1e] rounded-full"></span>
              </div>

              {/* Labels */}
              <span className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-white px-2 py-1 rounded text-gray-700 text-xs">
                Before
              </span>
              <span className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-white px-2 py-1 rounded text-gray-700 text-xs">
                After
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        className="product_section px-4 bg-gray-100 py-12"
        id="#services"
      >
        <div className="max-w-7xl mx-auto px-4" id="prices">
          {/* Tabs */}

          {/* Content */}
          {loading ? (
            <div className="text-center text-gray-500 animate-pulse">
              Loading...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div key={index} className="overflow-hidden group relative">
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={service.serviceImage}
                      alt={service.name}
                      className="w-full h-100 object-cover"
                    />
                    {/* Icons (Hidden initially) */}
                    <ul className="absolute inset-0 flex justify-center items-center space-x-4 opacity-0 group-hover:opacity-100 bg-black bg-opacity-30 transition">
                      <li>
                        <button
                          onClick={handleModalOpen}
                          className="bg-[#6D4032] text-white px-8 py-3 rounded-full hover:bg-[#5A3426] transition"
                        >
                          Book Appointment
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Content */}
                  <div className="p-4 text-center">
                    <h6 className="text-[#5e2f1e] font-semibold mb-2">
                      {service.name}
                    </h6>
                    <div className="text-gray-600">
                      <del className="text-sm mr-2">
                        {getCurrencySymbol(currency)}{service.price + service.price * 0.2}
                      </del>
                      <span className="text-lg font-bold text-gray-800">
                        {getCurrencySymbol(currency)}{service.price}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <section className="relative bg-gradient-to-r from-[#e8d3b8] to-[#e8d3b8] w-full py-10">
        <div className="max-w-7xl  flex flex-col md:flex-row items-center">
          {/* Left side - Product Images */}
          <div className="flex justify-center md:justify-center items-center w-full md:w-1/2 relative">
            <img
              src={details && details.LargeCta.image1}
              alt="Main Product"
              className="w-36 md:w-64 xl:w-72 rounded-full"
            />
          </div>

          {/* Right side - Content */}
          <div className="w-full md:w-1/2 text-center md:text-left px-6 md:px-1">
            <h2 className="text-4xl font-serif text-[#5e2c1d] mb-4">
            {sanitizeContent(details && details.LargeCta.header1)}
              <span className="italic font-semibold"> {" "}
                {userDetails && userDetails.ecosystemName
                  ? userDetails.ecosystemName
                  : ""}{" "}</span>.
            </h2>
            <p className="text-[#5e2c1d] text-lg leading-relaxed mb-6">
            {sanitizeContent(details && details.LargeCta.summary1)}
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <button
                onClick={handleModalOpen}
                className="bg-[#6D4032] text-white px-8 py-3 rounded-full hover:bg-[#5A3426] transition"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Decorative Dots */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 opacity-20">
          <svg
            width="120"
            height="120"
            viewBox="0 0 100 100"
            className="fill-[#5e2c1d]"
          >
            <circle cx="5" cy="5" r="2" />
            <circle cx="20" cy="5" r="2" />
            <circle cx="35" cy="5" r="2" />
          </svg>
        </div>
      </section>

      <section className="testimonial_section bg-white animation-section py-12 ">
        <div className="container mx-auto px-4 ">
          <div className="testimonial justify-center theme-arrow flex items-center">
            <button
              onClick={() => handleArrowClick("left")}
              className="flex-shrink-0 text-xl text-white bg-[#6D4032] rounded-lg me-6 hover:text-gray-700 px-4 py-3"
            >
              ←
            </button>
            <div className="md:flex md:items-center md:space-x-6 w-full">
              <div className="text-center">
                <div className="test_image relative inline-block">
                  <img
                    className="    rounded-full w-40 h-40 object-cover"
                    src={currentTestimonial.image}
                    alt="avatar"
                  />
                </div>
              </div>

              <div className="w-full">
                <div className="comment_box">
                  <p className="comment text-xl font-medium text-gray-700">
                    {sanitizeContent(currentTestimonial.comment)}
                  </p>
                  <div className="rating flex items-center text-center space-x-1 mt-4">
                    {[...Array(5)].map((_, index) => (
                      <i
                        key={index}
                        className={`fa fa-star ${
                          index < 5 ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="rating flex items-center space-x-1 mt-4">
                    <h6 className="mb-0  text-lg font-semibold">
                      {sanitizeContent(currentTestimonial.name)}
                    </h6>
                    <p className="mb-0 pl-4 text-sm text-gray-500">
                      {sanitizeContent(currentTestimonial.role)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => handleArrowClick("right")}
              className="flex-shrink-0 text-xl text-white bg-[#6D4032] rounded-lg ms-6 hover:text-gray-700 px-4 py-3"
            >
              →
            </button>
          </div>
        </div>
      </section>

      <div>
        {/* Image Display Section */}
        <section className="py-0">
          <div className="w-full flex flex-wrap">
            {[
              details ? details.Gallery.image1 : "",
              details ? details.Gallery.image2 : "",
              details ? details.Gallery.image3 : "",
              details ? details.Gallery.image4 : "",
              details ? details.Gallery.image5 : "",
              details ? details.Gallery.image6 : "",
            ].map((image, index) => (
              <div
                key={index}
                className="relative w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/6 group"
              >
                <a href="#">
                  <img
                    src={image}
                    alt={`instagram_image_${index}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <i className="fa fa-instagram text-white text-2xl"></i>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </section>
      </div>
      <WhiteContactForm ecosystemDomain={subdomain} />
      <footer className="relative bg-[#2d1500] text-white px-4">
        {/* Decorative Circles */}
        <ul className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <li className="absolute w-4 h-4 border rounded-full top-10 left-5 border-[#3c2411]"></li>
          <li className="absolute w-4 h-4 border rounded-full bottom-10 right-5 border-[#3c2411]"></li>
          <li className="absolute w-6 h-6 border rounded-full top-1/3 right-1/3 border-[#3c2411]"></li>
        </ul>

        <div className="md:px-32 px-5 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="mb-3">
              <img
                src={details && details.footer.logo}
                alt="Logo"
                className="w-32"
              />
            </div>
            <p className="text-lg">
            {sanitizeContent(details && details.footer.paragraph5)}
            </p>
            {userDetails &&
              userDetails.socialMedia &&
              userDetails.socialMedia.length > 0 && (
                <div className="last-paragraph-no-margin xs:mb-6">
                  <span className="font-primary text-lg font-semibold text-dark-gray">
                    Follow on Social Media
                  </span>
                  <div className="h-px w-4/5 sm:w-full bg-dark-gray mt-2 mb-2"></div>
                  <div className="w-full">
                    <span className="font-primary block">
                      <span className="font-primary font-semibold text-dark-gray">
                        Instagram:
                      </span>{" "}
                      <a
                        href="https://instagram.com/"
                        className="hover:text-medium-gray text-yellow-600"
                      >
                        Instagram Handle
                      </a>
                    </span>
                    <span className="font-primary block">
                      <span className="font-primary font-semibold text-dark-gray">
                        Facebook:
                      </span>{" "}
                      <a
                        href="https://facebook.com/"
                        className="hover:text-medium-gray text-yellow-600"
                      >
                        Facebook Handle
                      </a>
                    </span>
                  </div>
                </div>
              )}
          </div>

          {/* Useful Links */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Useful Links</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="#featured" className="hover:underline">
                  Featured
                </a>
              </li>
              <li>
                <a href="#services" className="hover:underline">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:underline">
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Portfolio */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Portfolio</h5>
            <div className="grid grid-cols-3 gap-2">
  {/* Dynamically render portfolio images */}
  {Array.from({ length: 6 }).map((_, index) => {
    const imageUrl = details?.contactUs?.[`heading${index + 1}`];
    return (
      <div key={index} className="relative">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={`Portfolio image ${index + 1}`}
            className="w-full h-16 object-cover"
          />
        ) : (
          <div className="w-full h-16 bg-gray-200 flex items-center justify-center text-sm text-gray-500">
            No Image Available
          </div>
        )}
      </div>
    );
  })}
</div>

          </div>

          {/* Contact Us */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt /> {userDetails && userDetails.address && userDetails.address}
              </li>
              <li className="flex items-center gap-2">
                <FaPhone /> Call Us: {userDetails && userDetails.phoneNumber && userDetails.phoneNumber}
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center py-4 text-sm border-t border-[#3c2411]">
          <p>
            Copyrights &copy; 2025 <a href="https://dimpified.com"> DIMP</a>.
            All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SecondStylist;
