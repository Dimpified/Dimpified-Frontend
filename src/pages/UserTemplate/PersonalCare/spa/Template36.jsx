import React, { useState, useEffect } from "react";
import {
  FaPinterestP,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaCheckCircle,
  FaBars,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { useCountry } from "../../../pricing/CountryContext";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

// App Component
const SixthSpa = ({ details, subdomain, userDetails }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [eServices, setEServices] = useState([]);
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
        setEServices(allServices);
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

  const treatments = [
    {
      title: details && details.Patrners.sectionImage2,
      description: details && details.Patrners.section2header,
      icon: "https://gfa-tech.com/dimp-template-images/spa/feature-icon1.png", // Replace with actual icon
    },
    {
      title: details && details.Patrners.sectionImage3,
      description: details && details.Patrners.section3header,
      icon: "https://gfa-tech.com/dimp-template-images/spa/feature-icon3.png", // Replace with actual icon
    },
    {
      title: details && details.Patrners.sectionImage4,
      description: details && details.Patrners.section4header,
      icon: "https://gfa-tech.com/dimp-template-images/spa/feature-icon2.png", // Replace with actual icon
    },
  ];

  const authors = [
    {
      name: details && details.Reviews.header1,
      title: details && details.Reviews.title1,
      image: details && details.Reviews.image1,
      testimonial: details && details.Reviews.summary1,
    },
    {
      name: details && details.Reviews.header2,
      title: details && details.Reviews.title2,
      image: details && details.Reviews.image2,
      testimonial: details && details.Reviews.summary2,
    },
    {
      name: details && details.Reviews.header3,
      title: details && details.Reviews.title3,
      image: details && details.Reviews.image3,
      testimonial: details && details.Reviews.summary3,
    },
  ];

  const works = [
    {
      category: details && details.Blog.summary1,
      title: details && details.Blog.header1,
      image: details && details.Blog.image1,
    },
    {
      category: details && details.Blog.date2,
      title: details && details.Blog.header2,
      image: details && details.Blog.image2,
    },
    {
      category: details && details.Blog.author2,
      title: details && details.Blog.header3,
      image: details && details.Blog.image3,
    },
    {
      category: details && details.Blog.buttonText2,
      title: details && details.Blog.header4,
      image: details && details.Blog.image4,
    },
  ];

  const filters = ["All Items", "Oil Massage", "Treatment", "Relax"];
  const [activeFilter, setActiveFilter] = useState("All Items");

  const filteredWorks =
    activeFilter === "All Items"
      ? works
      : works.filter((work) => work.category === activeFilter);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  return (
    <div>
      <header className="bg-[#fffaf6] shadow-md relative">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center text-gray-800">
            <img
              src="https://gfa-tech.com/dimp-template-images/spa/about-icon2.png"
              alt="logo"
              className="w-10 h-10 mr-2"
            />{" "}
            <span className="text-lg text-[#E2836A] font-semibold leading-tight">
              {userDetails?.ecosystemName}
            </span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <Link to="#" className="hover:text-[#E2836A]">
              Home
            </Link>
            <a href="#about" className="hover:text-[#E2836A]">
              About
            </a>
            <a href="#services" className="hover:text-[#E2836A]">
              Services
            </a>
            <Link to="#prices" className="hover:text-[#E2836A]">
              Prices
            </Link>
            <a href="#works" className="hover:text-[#E2836A]">
              Portfolio
            </a>
            <a href="#contact" className="hover:text-[#E2836A]">
              Contact
            </a>
          </nav>

          {/* Book Appointment Button */}
          <button
            onClick={handleModalOpen}
            className="hidden md:block bg-[#E2836A] text-white px-5 py-2 rounded-full hover:bg-[#ce7f59] transition"
          >
            Book Appointment ↗
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-white shadow-md w-full transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col space-y-4 p-6">
            <Link to="#" className="hover:text-[#E2836A]">
              Home
            </Link>
            <a href="#about" className="hover:text-[#E2836A]">
              About
            </a>
            <a href="#services" className="hover:text-[#E2836A]">
              Services
            </a>
            <Link to="#prices" className="hover:text-[#E2836A]">
              Prices
            </Link>
            <a href="#works" className="hover:text-[#E2836A]">
              Portfolio
            </a>
            <a href="#contact" className="hover:text-[#E2836A]">
              Contact
            </a>
            <button
              onClick={handleModalOpen}
              className="bg-[#E2836A] text-white px-5 py-2 rounded-full hover:bg-[#ce7f59] transition text-center"
            >
              Book Appointment ↗
            </button>
          </ul>
        </div>
      </header>
      <div
        id="home"
        className="bg-[#fffaf6] font-sans w-full overflow-hidden h-screen  flex items-center"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 w-full relative">
          {/* Left Image with Circle - HIDDEN ON MOBILE */}
          <div className="relative w-full lg:w-1/2 justify-center items-center flex">
            <img
              src={details && details.hero.backgroundImage1}
              alt="Spa woman"
              className="z-10 max-w-[500px]"
            />
            {/* Discount Circle */}
            <div className="absolute top-6 right-6 bg-[#0f172a] text-white rounded-full w-[90px] h-[90px] flex flex-col justify-center items-center text-[10px] font-bold shadow-lg z-20">
              {sanitizeContent(details && details.hero.summary3)}
            </div>
          </div>
          {isModalOpen && (
            <BookingModal
              isOpen={isModalOpen}
              handleClose={handleModalClose}
              information={eServices}
              subdomain={subdomain}
              serviceCurrency={currency}
            />
          )}

          {/* Right Content - ALWAYS VISIBLE */}
          <div className="w-full lg:w-1/2 text-center lg:text-left h-full mt-10 lg:mt-0 relative z-10">
            {/* Top Label */}
            <span className="inline-flex items-center gap-2 bg-white text-[#0f172a] border border-gray-300 px-4 py-2 rounded-full text-xs font-semibold mb-4 shadow-sm">
              <span className="w-2 h-2 bg-[#ff735c] rounded-full"></span>{" "}
              {sanitizeContent(details && details.hero.summary2)}
            </span>
            <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight text-[#0f172a]">
              {sanitizeContent(details && details.hero.title1)}
            </h1>

            <p className="text-sm text-gray-500 my-6 max-w-md mx-auto lg:mx-0">
              {sanitizeContent(details && details.hero.title2)}
            </p>

            <a
              href="#services"
              className="my-12 px-6 py-3 bg-[#ff735c] text-white hover:bg-[#ce7f59] rounded-full text-sm font-semibold"
            >
              {sanitizeContent(details && details.hero.summary1)}
            </a>
          </div>

          {/* Right Side Oval Image - HIDDEN ON MOBILE */}
          <div className="absolute bottom-[-40px] right-6 lg:right-20 bg-white border border-[#ff735c] rounded-[60%] p-2 shadow-md hidden lg:block">
            <div className="relative">
              <img
                src="https://gfa-tech.com/dimp-template-images/spa/hero-thumb-2.png"
                alt="Massage"
                className="rounded-[50%] w-35 h-60 object-cover"
              />
              <img
                src="https://gfa-tech.com/dimp-template-images/spa/teasti-shape-2.png"
                alt="Flower"
                className="absolute bottom-[-10px] left-[-20px] w-12"
              />
            </div>
          </div>
        </div>
      </div>
      <section className="relative w-full bg-white px-4 md:px-12 py-12 md:py-20 overflow-hidden min-h-[600px]">
        {/* Background images */}
        <img
          src="https://gfa-tech.com/dimp-template-images/spa/feature-shape.png"
          alt="Leaf"
          className="absolute bottom-0 left-0 w-28 md:w-40 z-0"
        />
        <img
          src="https://gfa-tech.com/dimp-template-images/spa/about-shape.png"
          alt="Orchid"
          className="absolute bottom-0 right-6 w-24 md:w-36 z-0"
        />
        <div className="absolute bottom-6 right-10 md:right-12 w-10 h-10 rounded-full border-2 border-[#fbd7cf] flex items-center justify-center z-10 bg-white">
          <span className="text-[#f38475] text-xl">&#8593;</span>
        </div>

        {/* Main content */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-start lg:items-center">
          {/* Left Column */}
          <div className="mb-10 lg:mb-0 lg:w-1/3 pr-4">
            <p className="text-[#E2836A] italic font-medium mb-2 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-10 before:h-[1px] before:bg-[#f38475] before:-translate-y-1/2 before:-translate-x-full ml-12">
              {sanitizeContent(details && details.Patrners.sectionImage1)}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#151515] leading-tight">
              {sanitizeContent(details && details.Patrners.section1header)}
            </h2>
          </div>

          {/* Right Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {treatments.map((treatment, index) => (
              <div
                key={index}
                className="bg-[#f9f6f2] p-6 rounded-2xl text-center hover:shadow-lg transition duration-300 min-h-[280px]"
              >
                <img
                  src={treatment.icon}
                  alt={treatment.title}
                  className="mx-auto w-16 h-16 mb-4"
                />
                <h3 className="text-lg font-semibold text-[#151515] mb-2">
                  {treatment.title}
                </h3>
                <p className="text-gray-600 text-sm">{treatment.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div
        id="about"
        className="bg-white w-full overflow-hidden py-12 px-6 md:px-12 lg:px-24 xl:px-32 relative"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
          {/* Left images */}
          <div className="relative flex-1">
            <div className="rounded-full overflow-hidden border-8 border-white w-150 h-150 mx-auto lg:mx-0">
              <img
                src={details && details.aboutUs.image1}
                alt="Massage"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right content */}
          <div className="flex-1 text-center lg:text-left">
            <h4 className="text-[#E2836A] text-lg italic mb-2">
              {sanitizeContent(details && details.aboutUs.title1)}
            </h4>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0D1222] leading-tight mb-4">
              {sanitizeContent(details && details.aboutUs.title2)}
            </h2>
            <p className="text-[#7C7C7C] text-base leading-relaxed mb-8">
              {sanitizeContent(details && details.aboutUs.text1)}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="flex items-start gap-4">
                <img
                  src="https://gfa-tech.com/dimp-template-images/spa/about-icon1.png"
                  alt="Icon"
                  className="w-8 h-8 mt-1"
                />
                <div>
                  <h5 className="font-bold text-[#0D1222] text-lg">
                    {sanitizeContent(details && details.aboutUs.buttonText1)}
                  </h5>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <img
                  src="https://gfa-tech.com/dimp-template-images/spa/about-icon2.png"
                  alt="Icon"
                  className="w-8 h-8 mt-1"
                />
                <div>
                  <h5 className="font-bold text-[#0D1222] text-lg">
                    {sanitizeContent(details && details.aboutUs.text2)}
                  </h5>
                </div>
              </div>
            </div>

            <button
              onClick={handleModalOpen}
              className="mt-8 bg-[#E2836A] hover:bg-[#ce7f59] transition-colors text-white py-3 px-6 rounded-full shadow-md text-sm uppercase"
            >
              {sanitizeContent(details && details.aboutUs.buttonText2)}
            </button>
          </div>
        </div>

        {/* Bottom right scroll-to-top circle */}
        <div className="absolute bottom-6 right-6 bg-white border-2 border-[#E0E0E0] rounded-full p-2 cursor-pointer">
          <img
            src="/path-to-scroll-top-icon.png"
            alt="Scroll Top"
            className="w-5 h-5"
          />
        </div>
      </div>
      <section
        id="services"
        className="relative bg-[#f9f6f1] py-20 px-4 md:px-10 lg:px-20 overflow-hidden text-center"
      >
        {/* Decorative Elements */}
        <img
          src="https://gfa-tech.com/dimp-template-images/spa/about-shape.png"
          alt="Left petals"
          className="absolute top-0 left-0 w-[140px] md:w-[200px] z-0"
        />
        <img
          src="https://gfa-tech.com/dimp-template-images/spa/pricing-shape.png"
          alt="Right flower"
          className="absolute top-10 right-0 w-[120px] md:w-[180px] z-0"
        />

        {/* Heading */}
        <div className="relative z-10">
          <p className="text-[#E2836A] italic text-sm mb-2">Our Services</p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#1c1c1c] leading-snug">
            Experience the Art of Relaxation with <br />
            Our Exclusive Spa Services
          </h2>
        </div>
        <div className="relative flex items-center justify-center mt-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 z-10">
            {/* Item 1 */}
            {eServices.map((service, index) => (
              <div className="flex flex-col items-center">
                <img
                  src={service.serviceImage}
                  alt={service.name}
                  className="w-[250px] h-auto rounded-[60%_40%_60%_40%/40%_60%_40%_60%] object-cover"
                />
                <h3 className="text-2xl font-bold text-[#1c1c1c] mt-6">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-600 mt-2 max-w-xs">
                  {service.shortDescription}
                </p>
                {/* <p className="text-lg font-semibold text-[#1c1c1c] mt-2">
                Duration : 30 Mins
              </p> */}
                <button
                  onClick={handleModalOpen}
                  className="justify-center items-center mt-2 px-6 py-2  bg-gradient-to-r from-orange-400 to-pink-300 text-white rounded-full hover:opacity-90 focus:outline-none"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
        {/* Decorative Flower Right Bottom */}
      </section>
      <section className="bg-[#0c1234] text-white px-6 py-20 md:px-10 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative">
          {/* Left: Text Content */}
          <div>
            <p className="text-[#E2836A]   italic text-lg mb-3">
              {sanitizeContent(details && details.Statistics.section1header)}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-6">
              {sanitizeContent(
                details && details.Statistics.section1paragraphy
              )}
            </h2>
            <hr className="border-[#1f274f] my-6" />

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base font-medium">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="w-5 h-5 text-[#E2836A]  " />
                {sanitizeContent(details && details.Statistics.section1span)}
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="w-5 h-5 text-[#E2836A]  " />
                {sanitizeContent(
                  details && details.Statistics.section2paragraphy
                )}
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="w-5 h-5 text-[#E2836A]  " />
                {sanitizeContent(details && details.Statistics.section1icon)}
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="w-5 h-5 text-[#E2836A]  " />
                {sanitizeContent(details && details.Statistics.section2header)}
              </div>
            </div>

            {/* Button */}
            <div className="mt-8">
              <a
                href="#prices"
                className="bg-[#E2836A] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#bb6d5b] transition inline-flex items-center gap-1"
              >
                {sanitizeContent(details && details.Statistics.section2span)} ↗
              </a>
            </div>
          </div>

          {/* Right: Images */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Main large image */}
            <img
              src={details && details.Statistics.section2icon}
              alt="Facial Treatment"
              className="w-[450px] h-[380px] object-cover rounded-[50px] md:rounded-[90px] z-10"
            />
          </div>
        </div>
      </section>
      <section
        id="works"
        className="bg-[#f8f4ee] py-20 px-4 md:px-8 lg:px-24 text-center"
      >
        {/* Heading */}
        <div className="mb-10">
          <p className="text-[#E2836A] italic mb-2">
            — {sanitizeContent(details && details.Blog.content1)}
          </p>
          <h2 className="text-2xl md:text-4xl font-bold text-[#0c1234] leading-snug">
            {sanitizeContent(details && details.Blog.date1)} <br />
            <span className="block">
              {sanitizeContent(details && details.Blog.author1)}
            </span>
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {filters.map((filter, index) => (
            <button
              key={index}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 border rounded-full text-sm font-medium transition hover:bg-[#E2836A] hover:text-white ${
                filter === activeFilter
                  ? "bg-[#E2836A] text-white"
                  : "border-[#E2836A] text-[#0c1234]"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredWorks.length > 0 ? (
            filteredWorks.map((work, index) => (
              <div
                key={index}
                className="bg-white rounded-[20px] overflow-hidden shadow-sm"
              >
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-[280px] object-cover"
                />
                <div className="py-5 px-4">
                  <p className="text-xs text-[#E2836A] uppercase tracking-wide mb-1">
                    {work.category}
                  </p>
                  <h3 className="text-base font-semibold text-[#0c1234]">
                    {work.title}
                  </h3>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No items available.</p>
          )}
        </div>
      </section>
      <div className="relative bg-white py-16 px-4 md:px-10 lg:px-20">
        {/* Decorative background images */}
        <img
          src="https://gfa-tech.com/dimp-template-images/spa/about-shape.png"
          alt="left decor"
          className="absolute top-0 left-0 w-28 md:w-36 lg:w-44"
        />
        <img
          src="https://gfa-tech.com/dimp-template-images/spa/pricing-shape.png"
          alt="right decor"
          className="absolute top-0 right-0 w-28 md:w-36 lg:w-44"
        />

        {/* Title section */}
        <div className="text-center mb-12">
          <p className="text-[#E2836A] italic text-lg mb-2">Pricing Plans</p>
          <h2 className="text-3xl md:text-4xl font-semibold text-[#0B1F3A]">
            Provide Best and Relaxing Service
          </h2>
          <h3 className="text-3xl md:text-3xl font-semibold text-[#0B1F3A] mt-2">
            With Best Pricing Plans
          </h3>
        </div>

        {/* Cards section */}
        <div id="prices" className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Save More Card */}
          <div className="bg-[#E2836A] text-white p-6 rounded-xl relative overflow-hidden">
            <div>
              <p className="text-sm font-medium mb-1">SAVE MORE</p>
              <h4 className="text-xl font-bold mb-2">With Good Plans</h4>
              <p className="text-sm mb-4">
                Experience a relaxing blend of global techniques with expert
                touch.
              </p>
              <button className="w-9 h-9 rounded-full border border-white flex items-center justify-center text-white text-xl">
                &rarr;
              </button>
            </div>
            <img
              src="https://gfa-tech.com/dimp-template-images/spa/pricing-box-thumb.png"
              alt="spa lady"
              className="absolute bottom-0 right-0 h-[70%] object-cover"
            />
          </div>

          {/* Basic Plan */}
          {eServices.map((service, index) => (
            <div className="bg-[#FAF8F3] p-6 rounded-xl text-center">
              <div className="flex justify-center mb-4">
                <img
                  src="https://gfa-tech.com/dimp-template-images/spa/pricing-box-shape.png"
                  alt="icon"
                  className="w-10 h-10 bg-[#E88D6F] object-cover rounded-[50px]"
                />
              </div>
              <h4 className="text-lg font-semibold mb-2">{service.name}</h4>
              <p className="text-4xl font-bold text-[#0B1F3A] mb-1">
                {getCurrencySymbol(currency)} {service.price}
                <span className="text-base font-normal"> / Session</span>
              </p>
              <hr className="my-4 border-dashed border-t-2 border-gray-300" />
              <ul className="text-sm text-left space-y-2 text-[#0B1F3A]">
                <li className="flex items-center gap-2">
                  <span className="text-[#E88D6F] font-bold">✔</span>
                  {service.shortDescription}
                </li>
              </ul>
              <button
                onClick={handleModalOpen}
                className="mt-6 bg-[#E2836A] text-white px-5 py-2 rounded-full font-medium text-lg"
              >
                Book Now &rarr;
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="relative bg-[#FAF5EF] py-16 px-4 sm:px-6 lg:px-20">
        {/* Background Flowers */}
        <img
          src="https://gfa-tech.com/dimp-template-images/spa/teasti-shape-1.png"
          alt="left flower"
          className="absolute top-0 left-0 w-28 md:w-36 lg:w-44"
        />
        <img
          src="https://gfa-tech.com/dimp-template-images/spa/teasti-shape-2.png"
          alt="right flower"
          className="absolute top-0 right-0 w-20 md:w-28 lg:w-32"
        />

        {/* Section Heading */}
        <div className="text-center mb-14">
          <p className="text-[#E2836A] italic text-lg">
            {sanitizeContent(details && details.Blog.date4)}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#161616]">
            {sanitizeContent(details && details.Blog.author4)}
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-xl shadow-md px-6 pt-6 pb-14 hover:bg-[#E2836A] transition-colors duration-300"
            >
              <p className="text-[#E29891] text-4xl font-bold mb-4 group-hover:text-white ">
                66
              </p>
              <p className="text-gray-600 mb-4 text-sm md:text-base group-hover:text-white">
                {authors[index]?.testimonial}
              </p>
              <div className="flex items-center gap-1 mb-2 ">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-[#E29891]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.287 3.975a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.175 0l-3.388 2.46c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.05 9.402c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.287-3.975z" />
                  </svg>
                ))}
                <span className="ml-1 font-semibold text-gray-800 group-hover:text-white">
                  (4.9)
                </span>
              </div>

              {/* Arrow Box Under Card */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rotate-45 shadow-md"></div>

              {/* Profile */}
              <div className="absolute bottom-[-60px] left-1/2 transform -translate-x-1/2 text-center">
                <img
                  src={authors[index]?.image}
                  alt={authors[index]?.name}
                  className="w-12 h-12 rounded-full mx-auto border-2 border-white"
                />
                <p className="mt-2 text-sm font-bold text-[#161616]">
                  {authors[index]?.name}
                </p>
                <p className="text-xs text-gray-500">{authors[index]?.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full">
        {/* Blog Section */}
        <div id="contact">
          <WhiteContactForm ecosystemDomain={subdomain} />
        </div>

        {/* Newsletter Section */}
        <section className="bg-[#E2836A] px-6 md:px-16 py-16 rounded-md mx-4 md:mx-20 mb-36 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-white text-2xl md:text-3xl font-semibold mb-6">
              {sanitizeContent(details && details.LargeCta.header1)}
            </h2>
            <p className="text-white text-lg mb-8">
              {sanitizeContent(details && details.LargeCta.header2)}
            </p>
            <div className="flex justify-center">
              <button
                onClick={handleModalOpen}
                className="bg-white text-[#E2836A] hover:bg-blue-900 hover:text-white px-8 py-3 rounded-full text-lg font-medium transition duration-300"
              >
                {sanitizeContent(details && details.LargeCta.buttonText1)}
              </button>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-blue-950 text-white pt-40 md:pt-48 pb-10 px-6 md:px-20 relative mt-[-120px] md:mt-[-80px]">
          <img
            src="https://gfa-tech.com/dimp-template-images/spa/footer-shape1.png"
            alt="Decor Left"
            className="absolute top-0 left-0 w-32 md:w-40"
          />
          <img
            src="https://gfa-tech.com/dimp-template-images/spa/footer-shape2.png"
            alt="Decor Right"
            className="absolute top-0 right-0 w-32 md:w-40"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <a href="#home" className="flex items-center text-gray-800">
                <img
                  src="https://gfa-tech.com/dimp-template-images/spa/about-icon2.png"
                  alt="logo"
                  className="w-10 h-10 mr-2"
                />{" "}
                <span className="text-lg text-[#E2836A] font-semibold leading-tight">
                  Spa Haven
                </span>
              </a>
              <p className="mb-4 text-sm">
                {sanitizeContent(details && details.footer.header)}
              </p>
              <p className="text-sm mb-2">+123 (4567) 8800</p>
              <div className="flex gap-3">
                <a href="#" className="hover:text-[#E2836A]">
                  <FaFacebookF />
                </a>
                <a href="#" className=" hover:text-[#E2836A]">
                  <FaPinterestP />
                </a>
                <a href="#" className="hover:text-[#E2836A]">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="hover:text-[#E2836A]">
                  <FaInstagram />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Company</h4>
              <ul className="text-sm space-y-2">
                <li className="hover:text-[#E2836A]">
                  <a href="#about">About Us</a>
                </li>
                <li className="hover:text-[#E2836A]">
                  <a href="#services">Our Services</a>
                </li>
                <li className="hover:text-[#E2836A]">
                  <a href="#prices">Our Prices</a>
                </li>
                <li className="hover:text-[#E2836A]">
                  <a href="#works">Our Works</a>
                </li>
                <li className="hover:text-[#E2836A]">
                  <a href="#contact">Contact Us</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 ">Services</h4>
              <ul className="text-sm space-y-2 ">
                {eServices.map((service, index) => (
                  <li className="hover:text-[#E2836A]">
                    <button onClick={handleModalOpen}>{service.name}</button>{" "}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">
                {" "}
                {sanitizeContent(details && details.footer.title1)}
              </h4>
              <ul className="text-sm space-y-2">
                <li>
                  {sanitizeContent(details && details.contactUs.heading1)}
                </li>
                <li>
                  {sanitizeContent(details && details.contactUs.heading2)}
                </li>
                <li>
                  {sanitizeContent(details && details.contactUs.heading3)}
                </li>
                <li className="text-[#E2836A]">
                  {sanitizeContent(details && details.contactUs.heading4)}
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white mt-10 pt-4 text-xs text-white flex flex-col md:flex-row justify-between">
            <p>
              &copy; {new Date().getFullYear()} Built with{" "}
              <a href="https://dimpified.com" className="hover:text-[#E2836A]">
                Dimpified
              </a>{" "}
              . All Rights Reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};
export default SixthSpa;
