import React, { useState, useRef, useEffect } from "react";
import {
  FaBars,
  FaPlay,
  FaArrowLeft,
  FaCheck,
  FaArrowRight,
  FaRegStar,
  FaTooth,
  FaChevronDown,
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaChevronUp,
  FaUserMd,
  FaHeartbeat,
  FaSmile,
  FaPhone,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import { dental } from "../../../../data/Services";
import BookingModal from "../../../../features/Booking/BookingModal";
import axios from "axios";
import {
  LoadingMany,
  LoadingSmall,
} from "../../../../component/LoadingSpinner";
import sanitizeHtml from "sanitize-html";
import { useSelector, useDispatch } from "react-redux";
import { EditTemplateLongInput } from "../../../../component/Inputs";
import { updateContent } from "../../../../features/Template/editTemplate";
import { ButtonSmallPurple } from "../../../../component/Buttons";
import { useImageEditor } from "../../../../helper/UploadImage";
import { PERMISSIONS } from "../../../../component/Permission/Creator";

const FirstDentist = ({ userDetails, subdomain }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [openAccordion, setOpenAccordion] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [eServices, setEServices] = useState([]);
  const userPlan = useSelector((state) => state.ecosystemPlan.plan);
  const userPermissions = PERMISSIONS[userPlan] || {};
  const dispatch = useDispatch();
  const details = useSelector(
    (state) => state.editTemplate.editcurrentTemplate
  );

  // service section
  useEffect(() => {
    const getServiceeDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`
        );
        const allServices = response.data.flatMap((item) => item.services);
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

  const {
    fileInputRefs,
    handleEditImageClick,
    handleImageChange,
    loadingImage,
  } = useImageEditor();

  const handleContentChange = (section, field, event, index = null) => {
    const value = event.target.value;
    dispatch(updateContent({ section, field, value, index }));
  };

  const teamMembers = [
    {
      name: details && details.Team.header1,
      role: details && details.Team.summary1,
      image: details && details.Team.image1,
    },
    {
      name: details && details.Team.header2,
      role: details && details.Team.summary2,
      image: details && details.Team.image2,
    },
    {
      name: details && details.Team.header3,
      role: details && details.Team.summary3,
      image: details && details.Team.image3,
    },
    {
      name: details && details.Team.header4,
      role: details && details.Team.summary4,
      image: details && details.Team.image4,
    },
  ];

  const testimonials = [
    {
      id: 1,
      text: details?.Reviews?.header1 || "",
      author: {
        name: details?.Reviews?.title1 || "",
        role: details?.Gallery?.summary1 || "",
        image: details?.Gallery?.image1 || "",
      },
    },
    {
      id: 2,
      text: details?.Reviews?.header2 || "",
      author: {
        name: details?.Reviews?.title2 || "",
        role: details?.Gallery?.summary2 || "",
        image: details?.Gallery?.image2 || "",
      },
    },
    {
      id: 3,
      text: details?.Reviews?.header3 || "",
      author: {
        name: details?.Reviews?.title3 || "",
        role: details?.Gallery?.summary3 || "",
        image: details?.Gallery?.image3 || "",
      },
    },
  ];

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  const featuresLeft = [
    {
      keyTitle: "header1",
      keyDesc: "summary1",
      icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-why-us-1.png",
    },
    {
      keyTitle: "header2",
      keyDesc: "summary2",
      icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-why-us-2.png",
    },
    {
      keyTitle: "header3",
      keyDesc: "summary3",
      icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-why-us-3.png",
    },
  ];

  const featuresRight = [
    {
      keyTitle: "header4",
      keyDesc: "summary4",
      icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-why-us-4.png",
    },
    {
      keyTitle: "date1",
      keyDesc: "author1",
      icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-why-us-5.png",
    },
    {
      keyTitle: "date2",
      keyDesc: "author2",
      icon: "https://gfa-tech.com/dimp-template-images/dentist/icon-why-us-6.png",
    },
  ];

  return (
    <div>
      <header className="bg-blue-50 shadow-md relative">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="flex items-center text-gray-800">
            <div className="relative">
              <img
                src={details && details.navbar.logo}
                alt="logo"
                className="w-10 h-10 mr-2"
              />
              <div
                style={{
                  width: "250px",
                  position: "absolute",
                  top: "0",
                  left: "-50px",
                  zIndex: 1000,
                }}
              >
                <div>
                  {userPlan && userPermissions.canEditImage ? (
                    <ButtonSmallPurple
                      width="50"
                      onClick={() => handleEditImageClick("navbar", "logo")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Logo"}
                    </ButtonSmallPurple>
                  ) : null}
                </div>
                <input
                  type="file"
                  ref={(ref) => (fileInputRefs.current["navbar-logo"] = ref)}
                  onChange={(e) => handleImageChange(e, "navbar", "logo")}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            <span className="text-md text-[#1E84B5] font-semibold leading-tight">
              {userDetails?.ecosystemName} <br />
            </span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600">
              About Us
            </a>
            <a href="#services" className="hover:text-blue-600">
              Services
            </a>
            <a href="#how" className="hover:text-blue-600">
              How we work?
            </a>
          </nav>

          {/* Book Appointment Button */}
          <button
            onClick={handleModalOpen}
            className="hidden md:block bg-[#1E84B5] text-white px-5 py-2 rounded-full hover:bg-[#0F3A51] transition"
          >
            Book Appointment →
          </button>

          {/* {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )} */}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Mobile Menu - No Absolute Positioning */}
        <div
          className={`md:hidden bg-white shadow-md w-full transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col space-y-4 p-6">
            <a href="#" className="hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600">
              About Us
            </a>
            <a href="#services" className="hover:text-blue-600">
              Services
            </a>
            <a href="#how" className="hover:text-blue-600">
              How we work?
            </a>
            <button
              onClick={handleModalOpen}
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-[#0F3A51] transition text-center"
            >
              Book Appointment →
            </button>
          </ul>
        </div>
      </header>
      <section id="#home" className="bg-blue-50 py-16">
        <div className="container mx-auto flex flex-col md:flex-row items-center px-6">
          {/* Left Side Content */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              {sanitizeContent(details && details.hero.title1)}
            </h1>
            <p className="mt-4 text-gray-600">
              {sanitizeContent(details && details.hero.title2)}
            </p>

            <div className="mt-6">
              <button
                onClick={handleModalOpen}
                className="bg-[#1E84B5] text-white px-6 py-3 rounded-full hover:bg-[#0F3A51] transition"
              >
                {sanitizeContent(details && details.hero.buttonText1)} →
              </button>
            </div>

            {/* Google Rating */}
            <div className="mt-6 flex items-center space-x-3 text-gray-700">
              <span className="text-lg">
                {sanitizeContent(details && details.hero.summary1)}
              </span>

              <div className="flex space-x-1">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <span key={index} className="text-yellow-500">
                      ⭐
                    </span>
                  ))}
              </div>
            </div>
          </div>

          {/* Right Side Image */}
          <div className="md:w-1/2 flex justify-center mt-8 md:mt-0 relative">
            {/* Dentist Image */}
            <div className="relative">
              <img
                src={details && details.hero.backgroundImage2}
                alt="Dentist"
                className="w-80 md:w-96"
              />

              <div
                style={{
                  width: "250px",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  zIndex: 1000,
                }}
              >
                <div>
                  {userPlan && userPermissions.canEditImage ? (
                    <ButtonSmallPurple
                      onClick={() =>
                        handleEditImageClick("hero", "backgroundImage2")
                      }
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  ) : null}
                </div>
                <input
                  type="file"
                  ref={(ref) =>
                    (fileInputRefs.current["hero-backgroundImage2"] = ref)
                  }
                  onChange={(e) =>
                    handleImageChange(e, "hero", "backgroundImage2")
                  }
                  style={{ display: "none" }}
                />
              </div>
            </div>

            {/* Doctor's Profile Box */}
            <div className="absolute bottom-4 left-4 bg-white shadow-lg rounded-lg flex items-center p-3">
              <div className="relative">
                <img
                  src={details && details.hero.backgroundImage1}
                  alt="Dr. Clara Lee"
                  className="w-12 h-12 rounded-full"
                />

                <div
                  style={{
                    width: "250px",
                    position: "absolute",
                    top: "0",
                    left: "-50px",
                    zIndex: 1000,
                  }}
                >
                  <div>
                    {userPlan && userPermissions.canEditImage ? (
                      <ButtonSmallPurple
                        width="50"
                        onClick={() =>
                          handleEditImageClick("hero", "backgroundImage1")
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    ) : null}
                  </div>
                  <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current["hero-backgroundImage1"] = ref)
                    }
                    onChange={(e) =>
                      handleImageChange(e, "hero", "backgroundImage1")
                    }
                    style={{ display: "none" }}
                  />
                </div>
              </div>
              <div className="ml-3">
                <h3 className="font-bold text-gray-900">
                  {sanitizeContent(details && details.hero.summary2)}
                </h3>
                <p className="text-gray-600 text-sm">
                  {sanitizeContent(details && details.hero.summary3)}
                </p>
              </div>
            </div>

            {/* Surrounding Icons */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Top-Left Icon */}
              <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4 bg-blue-100 p-3 rounded-full shadow-md">
                <FaTooth className="text-blue-600 text-xl" />
              </div>

              {/* Top-Right Icon */}
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-blue-100 p-3 rounded-full shadow-md">
                <FaUserMd className="text-blue-600 text-xl" />
              </div>

              {/* Bottom-Left Icon */}
              <div className="absolute bottom-0 left-0 transform -translate-x-4 translate-y-4 bg-blue-100 p-3 rounded-full shadow-md">
                <FaHeartbeat className="text-blue-600 text-xl" />
              </div>

              {/* Bottom-Right Icon */}
              <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 bg-blue-100 p-3 rounded-full shadow-md">
                <FaSmile className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mb-16 px-4  lg:px- ">
        <h1>Edit Hero Section</h1>
        <div className="lg:flex gap-4">
          <div className="mt-7 flex-1">
            <h1>Section header 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.title1)}
              onChange={(event) => handleContentChange("hero", "title1", event)}
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7 flex-1">
            <h1>Section header 2</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.title2)}
              onChange={(event) => handleContentChange("hero", "title2", event)}
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
        </div>
        <div className="lg:flex gap-4">
          <div className="mt-7 flex-1">
            <h1>Section header 3</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.summary1)}
              onChange={(event) =>
                handleContentChange("hero", "summary1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7 flex-1">
            <h1>Section header 3</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.summary2)}
              onChange={(event) =>
                handleContentChange("hero", "summary2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7 flex-1">
            <h1>Section header 3</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.summary3)}
              onChange={(event) =>
                handleContentChange("hero", "summary3", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7 flex-1">
            <h1>Section header 4</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.buttonText1)}
              onChange={(event) =>
                handleContentChange("hero", "buttonText1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
        </div>
      </div>

      <section id="about" className="relative bg-white">
        {/* Top CTA Section */}
        <div className="bg-[#0F3A51] text-white py-6 px-8 md:px-12 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-3">
            <FaPhone className="text-xl" />
            <div>
              <h3 className="font-semibold text-lg">
                {sanitizeContent(details && details.LargeCta.header1)}
              </h3>
              <p className="text-sm">Call on : {userDetails?.phoneNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <FaClock className="text-xl" />
            <div>
              <h3 className="font-semibold text-lg">
                {sanitizeContent(details && details.LargeCta.header3)}
              </h3>
              <p className="text-sm">
                {sanitizeContent(details && details.LargeCta.summary1)}
              </p>
            </div>
          </div>
          <button
            onClick={handleModalOpen}
            className="bg-[#1E84B5] hover:bg-[#0F3A51] transition duration-300 flex items-center gap-2 px-5 py-2 rounded-full text-white"
          >
            {sanitizeContent(details && details.LargeCta.buttonText1)}{" "}
            <span className="text-lg">➜</span>
          </button>
        </div>

        <div className="lg:flex gap-5 py-5">
          <EditTemplateLongInput
            value={sanitizeContent(details && details.LargeCta.header1)}
            onChange={(event) =>
              handleContentChange("LargeCta", "header1", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <EditTemplateLongInput
            value={sanitizeContent(details && details.LargeCta.header3)}
            onChange={(event) =>
              handleContentChange("LargeCta", "header3", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <EditTemplateLongInput
            value={sanitizeContent(details && details.LargeCta.summary1)}
            onChange={(event) =>
              handleContentChange("LargeCta", "summary1", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <EditTemplateLongInput
            value={sanitizeContent(details && details.LargeCta.buttonText1)}
            onChange={(event) =>
              handleContentChange("LargeCta", "buttonText1", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>

        {/* About Us Section */}
        <div className="container mx-auto py-16 px-6 md:px-12 flex flex-col lg:flex-row items-center lg:gap-x-16">
          {/* Image Section */}
          <div className="relative lg:w-1/2 mb-10 lg:mb-0 flex flex-col items-center">
            {/* First Image (Large) */}
            <div className="relative w-full">
              <img
                src={details && details.aboutUs.image2}
                alt="Dental Treatment"
                className="w-full rounded-lg shadow-lg"
              />
              <div
                style={{
                  width: "250px",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  zIndex: 1000,
                }}
              >
                {userPlan && userPermissions.canEditImage ? (
                  <ButtonSmallPurple
                    onClick={() => handleEditImageClick("aboutUs", "image2")}
                  >
                    {loadingImage ? <LoadingSmall /> : "Edit Image"}
                  </ButtonSmallPurple>
                ) : null}

                <input
                  type="file"
                  ref={(ref) => (fileInputRefs.current[`aboutUs-image2`] = ref)}
                  onChange={(e) => handleImageChange(e, "aboutUs", "image2")}
                  style={{ display: "none" }}
                />
              </div>
              <div className="absolute top-16 left-8 bg-[#0F3A51] text-white px-4 py-1 rounded-full text-sm">
                {sanitizeContent(details && details.aboutUs.buttonText2)}
              </div>
            </div>
            {/* Second Image (Smaller, Overlapping) */}
            <div className="absolute bottom-[-40px] left-10 w-3/4">
              <div className="relative">
                <img
                  src={details && details.aboutUs.image1}
                  alt="Dental Clinic"
                  className="rounded-lg shadow-lg"
                />

                <div
                  style={{
                    width: "250px",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    zIndex: 1000,
                  }}
                >
                  {userPlan && userPermissions.canEditImage ? (
                    <ButtonSmallPurple
                      onClick={() => handleEditImageClick("aboutUs", "image1")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  ) : null}

                  <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current[`aboutUs-image1`] = ref)
                    }
                    onChange={(e) => handleImageChange(e, "aboutUs", "image1")}
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2">
            <h3 className="text-[#1E84B5] uppercase text-sm font-semibold">
              {sanitizeContent(details && details.aboutUs.title1)}
            </h3>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">
              {sanitizeContent(details && details.aboutUs.title2)}
            </h2>
            <p className="text-gray-600 mt-4">
              {sanitizeContent(details && details.aboutUs.text1)}
            </p>

            {/* Key Points (Prevent Breaking) */}
            <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 min-w-0">
              {details?.aboutUs?.text2
                ?.split("||") // Split by "||"
                .filter((text) => text.trim() !== "") // Remove empty items if any
                .map((text, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-3 whitespace-nowrap flex-shrink-0"
                  >
                    <span className="bg-[#0FA8E3] text-white p-2 rounded-full">
                      <FaCheck />
                    </span>
                    <span className="font-semibold">{text.trim()}</span>
                  </li>
                ))}
            </ul>

            {/* Button */}
            <a
              href="#services"
              className="mt-6 bg-[#1E84B5] hover:bg-[#0F3A51] transition duration-300 flex items-center gap-2 px-6 py-3 rounded-full text-white w-56 font-semibold"
            >
              {sanitizeContent(details && details.aboutUs.buttonText1)}{" "}
              <span className="text-lg">➜</span>
            </a>
          </div>
        </div>
      </section>
      <div className="lg:flex gap-5 mt-5">
        <EditTemplateLongInput
          value={sanitizeContent(details && details.aboutUs.title1)}
          onChange={(event) => handleContentChange("aboutUs", "title1", event)}
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
        <EditTemplateLongInput
          value={sanitizeContent(details && details.aboutUs.title2)}
          onChange={(event) => handleContentChange("aboutUs", "title2", event)}
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </div>
      <div className="lg:flex gap-5 py-5">
        <EditTemplateLongInput
          value={sanitizeContent(details && details.aboutUs.text1)}
          onChange={(event) => handleContentChange("aboutUs", "text1", event)}
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
        <EditTemplateLongInput
          value={sanitizeContent(details && details.aboutUs.buttonText1)}
          onChange={(event) =>
            handleContentChange("aboutUs", "buttonText1", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </div>
      <div className="lg:flex gap-5 py-5">
        <EditTemplateLongInput
          value={sanitizeContent(details && details.aboutUs.buttonText2)}
          onChange={(event) =>
            handleContentChange("aboutUs", "buttonText2", event)
          }
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
        <EditTemplateLongInput
          value={sanitizeContent(details && details.aboutUs.text2)}
          onChange={(event) => handleContentChange("aboutUs", "text2", event)}
          placeholder="Enter your domain..."
          className="custom-input-class"
        />
      </div>

      <section id="services" className="bg-blue-50 py-16 px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <h3 className="text-lg uppercase text-[#1E84B5] tracking-wide">
            Our Services
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            <span className="text-[#1E84B5]">High Quality</span> Services for
            You.
          </h2>
          <p className="text-gray-500 mt-4">
            We are committed to sustainability and eco-friendly initiatives.
          </p>
        </div>

        {/* Services Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto ">
          {eServices.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center transition-all duration-300 hover:bg-[#d7e8f2] hover:text-white"
            >
              <div className="flex justify-center">
                <img
                  src={service.serviceImage}
                  alt={service.name}
                  className="w-12 h-12 "
                />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900 hover:text-white">
                {service.name}
              </h3>
              <p className="mt-2 text-gray-600">{service.shortDescription}</p>
              <button
                onClick={handleModalOpen}
                className="mt-4 inline-flex items-center text-[#1E84B5] font-semibold hover:underline"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-lg">
            We believe in using the latest technology and techniques to ensure
            the best outcomes for our patients.
          </p>
        </div>
      </section>
      <section className="relative bg-white pb-12">
        {/* Background and Main Banner */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="relative bg-gray-800 rounded-lg overflow-hidden">
            <img
              src={details && details.Statistics.section1header}
              alt="Dental Clinic"
              className="w-full h-auto object-cover opacity-70"
            />
            <div
              style={{
                width: "250px",
                position: "absolute",
                top: "0",
                left: "0",
                zIndex: 1000,
              }}
            >
              <div>
                {userPlan && userPermissions.canEditImage ? (
                  <ButtonSmallPurple
                    width="70px"
                    onClick={() =>
                      handleEditImageClick("Statistics", "section1header")
                    }
                  >
                    {loadingImage ? <LoadingSmall /> : "Edit Back Image"}
                  </ButtonSmallPurple>
                ) : null}
              </div>
              <input
                type="file"
                ref={(ref) =>
                  (fileInputRefs.current["Statistics-section1header"] = ref)
                }
                onChange={(e) =>
                  handleImageChange(e, "Statistics", "section1header")
                }
                style={{ display: "none" }}
              />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
              <p className="text-sm uppercase tracking-wide">+ Visit Clinic</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                {sanitizeContent(
                  details && details.Statistics.section1paragraphy
                )}
              </h2>
              {/* Play Video Button */}
              <button
                className="mt-6 flex items-center gap-2 bg-white text-[#1E84B5] px-4 py-2 rounded-full shadow-lg hover:bg-blue-100 transition-all"
                onClick={handleModalOpen}
              >
                {sanitizeContent(details && details.Statistics.section1span)}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:flex gap-4">
          <div className="mt-7 flex-1">
            <h1>Section header 1</h1>
            <EditTemplateLongInput
              value={sanitizeContent(
                details && details.Statistics.section1paragraphy
              )}
              onChange={(event) =>
                handleContentChange("Statistics", "section1paragraphy", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
          <div className="mt-7 flex-1">
            <h1>Section header 2</h1>
            <EditTemplateLongInput
              value={sanitizeContent(
                details && details.Statistics.section1span
              )}
              onChange={(event) =>
                handleContentChange("Statistics", "section1span", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
        </div>

        {/* Video Popup with Large, Wide Video */}
        {showVideo && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="relative bg-white p-6 rounded-lg w-full md:w-3/4 lg:w-2/3 xl:w-1/2">
              <button
                className="absolute top-2 right-3 text-gray-600 hover:text-red-500 text-2xl"
                onClick={() => setShowVideo(false)}
              >
                &times;
              </button>
              <div className="w-full h-[80vh]">
                <iframe
                  className="w-full h-full rounded-lg"
                  src="https://www.youtube.com/embed/Y-x0efG1seA"
                  title="Clinic Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* Counter Section */}
        <div className="max-w-7xl bg-white mx-auto px-6 lg:px-12 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { key: "section1icon", value: details?.Statistics?.section1icon },
            {
              key: "section2header",
              value: details?.Statistics?.section2header,
            },
            {
              key: "section2paragraphy",
              value: details?.Statistics?.section2paragraphy,
            },
            { key: "section2span", value: details?.Statistics?.section2span },
          ].map((item, index) => {
            // Extract number and label
            const match = item.value?.match(/^(\d+[K+]*)\s*(.+)$/);
            const number = match ? match[1] : item.value;
            const label = match ? match[2] : "";

            return (
              <div key={index} className="text-center">
                {/* Number */}
                <h2 className="text-3xl font-bold text-gray-900 text-[#0F3A51]">
                  {number}
                </h2>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-600 mt-1 text-[#0F3A51]">
                  {label}
                </h3>

                {/* Editable input */}
                <EditTemplateLongInput
                  value={item.value}
                  onChange={(event) =>
                    handleContentChange("Statistics", item.key, event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class my-6"
                />
              </div>
            );
          })}
        </div>
      </section>
      <section className="bg-[#E8F4FA] py-16">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[#1E84B5] text-sm font-semibold">
            {sanitizeContent(details && details.Blog.content4)}
          </p>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Blog.content4)}
            onChange={(event) => handleContentChange("Blog", "content4", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-2">
            <span className="text-[#1E84B5]">
              {sanitizeContent(details && details.Blog.author4)}
            </span>
          </h2>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Blog.author4)}
            onChange={(event) => handleContentChange("Blog", "author4", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <p className="text-gray-600 mt-4">
            {sanitizeContent(details && details.Blog.date4)}
          </p>
          <EditTemplateLongInput
            value={sanitizeContent(details && details.Blog.date4)}
            onChange={(event) => handleContentChange("Blog", "date4", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-8">
            {/* Left Features (Icon after content) */}
            <div className="flex flex-col space-y-10 w-full md:w-1/3">
              {featuresLeft.map((feature, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="text-left w-full">
                    {/* Title - Display & Edit Input */}
                    <h3 className="text-lg font-bold text-gray-800">
                      {details?.Blog?.[feature.keyTitle] || ""}
                    </h3>
                    <p className="text-gray-600">
                      {details?.Blog?.[feature.keyDesc] || ""}
                    </p>
                    <EditTemplateLongInput
                      value={details?.Blog?.[feature.keyTitle] || ""}
                      onChange={(event) =>
                        handleContentChange("Blog", feature.keyTitle, event)
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full mt-1"
                    />

                    {/* Description - Display & Edit Input */}
                    <EditTemplateLongInput
                      value={details?.Blog?.[feature.keyDesc] || ""}
                      onChange={(event) =>
                        handleContentChange("Blog", feature.keyDesc, event)
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full mt-1"
                    />
                  </div>

                  <img
                    src={feature.icon}
                    alt={details?.Blog?.[feature.keyTitle] || ""}
                    className="w-10 h-10"
                  />
                </div>
              ))}
            </div>

            {/* Center Image */}
            <div className="w-60 h-60 mx-10 flex items-center justify-center bg-white shadow-lg rounded-full border border-gray-300 relative">
              <img
                src={details && details.Blog.date3}
                alt="Tooth"
                className="w-50 h-60"
              />
              <div
                style={{
                  width: "250px",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  zIndex: 1000,
                }}
              >
                <div>
                  {userPlan && userPermissions.canEditImage ? (
                    <ButtonSmallPurple
                      width="70px"
                      onClick={() => handleEditImageClick("Blog", "date3")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  ) : null}
                </div>
                <input
                  type="file"
                  ref={(ref) => (fileInputRefs.current["Blog-date3"] = ref)}
                  onChange={(e) => handleImageChange(e, "Blog", "date3")}
                  style={{ display: "none" }}
                />
              </div>
            </div>

            {/* Right Features (Icon before content) */}
            <div className="flex flex-col space-y-10 w-full md:w-1/3">
              {featuresRight.map((feature, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <img
                    src={feature.icon}
                    alt={details?.Blog?.[feature.keyTitle] || ""}
                    className="w-10 h-10"
                  />
                  <div className="w-full">
                    {/* Title - Display & Edit Input */}
                    <h3 className="text-lg font-bold text-gray-800">
                      {details?.Blog?.[feature.keyTitle] || ""}
                    </h3>

                    <p className="text-gray-600">
                      {details?.Blog?.[feature.keyDesc] || ""}
                    </p>

                    <EditTemplateLongInput
                      value={details?.Blog?.[feature.keyTitle] || ""}
                      onChange={(event) =>
                        handleContentChange("Blog", feature.keyTitle, event)
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full mt-1"
                    />

                    {/* Description - Display & Edit Input */}
                    <EditTemplateLongInput
                      value={details?.Blog?.[feature.keyDesc] || ""}
                      onChange={(event) =>
                        handleContentChange("Blog", feature.keyDesc, event)
                      }
                      className="border border-gray-300 rounded px-2 py-1 w-full mt-1"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Image Section */}
            <div className="relative">
              <img
                src={details && details.Events.sectionImage4}
                alt="Dental Checkup"
                className="rounded-lg shadow-lg w-full"
              />
              <div
                style={{
                  width: "250px",
                  position: "absolute",
                  top: "0",
                  left: "0",
                  zIndex: 1000,
                }}
              >
                <div>
                  {userPlan && userPermissions.canEditImage ? (
                    <ButtonSmallPurple
                      onClick={() =>
                        handleEditImageClick("Events", "sectionImage4")
                      }
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  ) : null}
                </div>
                <input
                  type="file"
                  ref={(ref) =>
                    (fileInputRefs.current["Events-sectionImage4"] = ref)
                  }
                  onChange={(e) =>
                    handleImageChange(e, "Events", "sectionImage4")
                  }
                  style={{ display: "none" }}
                />
              </div>
            </div>

            {/* Content Section */}
            <div id="how">
              <p className="text-[#1E84B5]  uppercase text-sm font-semibold tracking-wide">
                {sanitizeContent(details && details.Events.heading)}
              </p>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Events.heading)}
                onChange={(event) =>
                  handleContentChange("Events", "heading", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h2 className="text-3xl md:text-4xl font-bold mt-2">
                <span className="text-[#1E84B5] ">
                  {sanitizeContent(details && details.Events.summary)}
                </span>
              </h2>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Events.summary)}
                onChange={(event) =>
                  handleContentChange("Events", "summary", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <p className="mt-4 text-gray-600">
                {sanitizeContent(details && details.Events.section4paragraphy)}
              </p>
              <EditTemplateLongInput
                value={sanitizeContent(
                  details && details.Events.section4paragraphy
                )}
                onChange={(event) =>
                  handleContentChange("Events", "section4paragraphy", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />

              {/* Accordion */}
              <div className="mt-6 space-y-4">
                {/* Item 1 */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleAccordion(1)}
                    className="w-full flex items-center justify-between px-5 py-3 text-lg font-semibold text-gray-800 bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src="https://gfa-tech.com/dimp-template-images/dentist/icon-how-it-work-1.png"
                        alt="Icon 1"
                        className="w-6 h-6"
                      />
                      <span>
                        {sanitizeContent(
                          details && details.Events.section1header
                        )}
                      </span>
                    </div>
                    {openAccordion === 1 ? (
                      <FaChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <FaChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  {openAccordion === 1 && (
                    <div className="p-4 text-gray-600 bg-white">
                      {sanitizeContent(
                        details && details.Events.section1paragraphy
                      )}
                    </div>
                  )}
                </div>
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Events.section1header
                  )}
                  onChange={(event) =>
                    handleContentChange("Events", "section1header", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Events.section1paragraphy
                  )}
                  onChange={(event) =>
                    handleContentChange("Events", "section1paragraphy", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />

                {/* Item 2 */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleAccordion(2)}
                    className="w-full flex items-start justify-start px-5 py-3 text-lg font-semibold text-gray-800 bg-gray-100"
                  >
                    <div className="flex items-start  gap-3">
                      <img
                        src="https://gfa-tech.com/dimp-template-images/dentist/icon-how-it-work-2.png"
                        alt="Icon 2"
                        className="w-6 h-6"
                      />
                      <span>
                        {sanitizeContent(
                          details && details.Events.section2header
                        )}
                      </span>
                    </div>
                    {openAccordion === 2 ? (
                      <FaChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <FaChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  {openAccordion === 2 && (
                    <div className="p-4 text-gray-600 bg-white">
                      {sanitizeContent(
                        details && details.Events.section2paragraphy
                      )}
                    </div>
                  )}
                </div>
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Events.section2header
                  )}
                  onChange={(event) =>
                    handleContentChange("Events", "section2header", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Events.section2paragraphy
                  )}
                  onChange={(event) =>
                    handleContentChange("Events", "section2paragraphy", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />

                {/* Item 3 */}
                <div className="border rounded-lg overflow-hidden shadow-sm">
                  <button
                    onClick={() => toggleAccordion(3)}
                    className="w-full flex items-center justify-between px-5 py-3 text-lg font-semibold text-gray-800 bg-gray-100"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src="https://gfa-tech.com/dimp-template-images/dentist/icon-how-it-work-3.png"
                        alt="Icon 3"
                        className="w-6 h-6"
                      />
                      <span>
                        {sanitizeContent(
                          details && details.Events.section3header
                        )}
                      </span>
                    </div>
                    {openAccordion === 3 ? (
                      <FaChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <FaChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                  {openAccordion === 3 && (
                    <div className="p-4 text-gray-600 bg-white">
                      {sanitizeContent(
                        details && details.Events.section3paragraphy
                      )}
                    </div>
                  )}
                </div>
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Events.section3header
                  )}
                  onChange={(event) =>
                    handleContentChange("Events", "section3header", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Events.section3paragraphy
                  )}
                  onChange={(event) =>
                    handleContentChange("Events", "section3paragraphy", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto text-center px-4">
          <h3 className="uppercase tracking-widest text-[#1E84B5]">
            {sanitizeContent(details && details.contactUs.heading4)}
          </h3>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-[#0F3A51]">
            <span className="text-[#1E84B5]">
              {" "}
              {sanitizeContent(details && details.contactUs.heading6)}{" "}
            </span>
          </h2>
          <p className="text-gray-600 mt-4">
            {sanitizeContent(details && details.contactUs.heading5)}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mt-10">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative group">
                  {/* Image */}
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 object-cover rounded-lg shadow-lg"
                  />
                  {userPlan && userPermissions.canEditImage && (
                    <div className="absolute top-2 left-2">
                      <ButtonSmallPurple
                        width="110"
                        onClick={() =>
                          handleEditImageClick("Team", `image${index + 1}`)
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                    </div>
                  )}
                  <input
                    type="file"
                    ref={(ref) =>
                      (fileInputRefs.current[`Team-image${index + 1}`] = ref)
                    }
                    onChange={(e) =>
                      handleImageChange(e, "Team", `image${index + 1}`)
                    }
                    style={{ display: "none" }}
                  />

                  {/* Social Icons (Only on Image Hover) */}
                  {/* <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    {[
                      { icon: FaFacebookF, link: "#" },
                      { icon: FaYoutube, link: "#" },
                      { icon: FaInstagram, link: "#" },
                      { icon: FaTwitter, link: "#" },
                    ].map(({ icon: Icon, link }, i) => (
                      <a
                        key={i}
                        href={link}
                        className="p-2 rounded-full bg-[#0F3A51] text-white hover:scale-110 transition-transform"
                      >
                        <Icon />
                      </a>
                    ))}
                  </div> */}
                </div>

                {/* Name and Role (No Hover Effect) */}
                <h3 className="mt-3 text-lg font-bold text-[#0F3A51]">
                  {member.name}
                </h3>
                <p className="text-[#1E84B5]">{member.role}</p>
                <EditTemplateLongInput
                  value={sanitizeContent(details?.Team?.[`header${index + 1}`])}
                  onChange={(event) =>
                    handleContentChange("Team", `header${index + 1}`, event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class my-6"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details?.Team?.[`summary${index + 1}`]
                  )}
                  onChange={(event) =>
                    handleContentChange("Team", `summary${index + 1}`, event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class "
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="py-12 px-6 min-h-screen bg-white">
        <div className=" flex flex-col h-full  py-4 px-4 lg:px-32">
          {/* Title Section */}
          <div className="text-center mb-10">
            <p className="text-[#1E84B5] uppercase tracking-widest">
              {sanitizeContent(details && details.contactUs.heading3)}
            </p>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.contactUs.heading3)}
              onChange={(event) =>
                handleContentChange("contactUs", "heading3", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />

            <h2 className="text-3xl font-bold text-[#0F3A51]">
              <span className="text-[#1E84B5]">
                {sanitizeContent(details && details.contactUs.heading2)}
              </span>
            </h2>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.contactUs.heading2)}
              onChange={(event) =>
                handleContentChange("contactUs", "heading2", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
            <p className="text-gray-600 mt-2">
              {sanitizeContent(details && details.contactUs.heading5)}
            </p>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.contactUs.heading5)}
              onChange={(event) =>
                handleContentChange("contactUs", "heading5", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>

          {/* Content Section */}
          <div className="grid md:grid-cols-2 items-center">
            {/* Left - Static Image and Rating Box */}
            <div className="relative">
              <div>
                <img
                  src={details && details.Reviews.image1}
                  alt="Testimonial"
                  className="rounded-lg w-100 shadow-lg"
                />
                {userPlan && userPermissions.canEditImage && (
                  <div className="absolute top-2 left-2">
                    <ButtonSmallPurple
                      width="110"
                      onClick={() => handleEditImageClick("Reviews", "image1")}
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                  </div>
                )}
                <input
                  type="file"
                  ref={(ref) => (fileInputRefs.current["Reviews-image1"] = ref)}
                  onChange={(e) => handleImageChange(e, "Reviews", "image1")}
                  style={{ display: "none" }}
                />
              </div>

              <div className="absolute  text-[#1E84B5] bottom-4 left-4 p-4 rounded-lg shadow-lg w-3/4 bg-opacity-80 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white">4.8/5</h3>
                <p className="text-sm text-white">
                  This rating is given by users after visiting our location
                </p>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm mt-1 text-white">
                  For Excellence Services
                </p>
              </div>
            </div>

            {/* Right - Changing Testimonial Text & Author */}
            <div className="space-y-8">
              {testimonials.map((testimonial, index) => {
                const idx = index + 1; // For keys like header1, title1, etc.

                return (
                  <div
                    key={testimonial.id}
                    className="border p-6 rounded-lg shadow-md bg-white"
                  >
                    {/* Testimonial Text */}
                    <p className="text-[#1E84B5] text-2xl font-bold mb-3">“</p>
                    <p className="text-gray-700 italic">{testimonial.text}</p>

                    {/* Author Section */}
                    <div className="flex items-center mt-4">
                      <div className="relative">
                        <img
                          src={testimonial.author.image}
                          alt={testimonial.author.name}
                          className="w-12 h-12 rounded-full border-2 border-gray-300"
                        />
                        {userPlan && userPermissions.canEditImage && (
                          <div className="absolute top-2 left-2">
                            <ButtonSmallPurple
                              width="110"
                              onClick={() =>
                                fileInputRefs.current[
                                  `Reviews-image${idx}`
                                ]?.click()
                              }
                            >
                              {loadingImage ? <LoadingSmall /> : "Edit Image"}
                            </ButtonSmallPurple>
                          </div>
                        )}
                        <input
                          type="file"
                          ref={(ref) =>
                            (fileInputRefs.current[`Reviews-image${idx}`] = ref)
                          }
                          onChange={(e) =>
                            handleImageChange(e, "Gallery", `image${idx}`)
                          }
                          style={{ display: "none" }}
                        />
                      </div>

                      <div className="ml-4">
                        <h3 className="text-lg font-bold text-gray-800">
                          {testimonial.author.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {testimonial.author.role}
                        </p>
                      </div>
                    </div>

                    {/* Editable Inputs */}
                    <EditTemplateLongInput
                      value={testimonial.text}
                      onChange={(e) =>
                        handleContentChange("Reviews", `header${idx}`, e)
                      }
                      placeholder="Enter review text..."
                      className="custom-input-class mt-4"
                    />

                    <EditTemplateLongInput
                      value={testimonial.author.name}
                      onChange={(e) =>
                        handleContentChange("Reviews", `title${idx}`, e)
                      }
                      placeholder="Enter author name..."
                      className="custom-input-class mt-2"
                    />

                    <EditTemplateLongInput
                      value={testimonial.author.role}
                      onChange={(e) =>
                        handleContentChange("Gallery", `summary${idx}`, e)
                      }
                      placeholder="Enter author role..."
                      className="custom-input-class mt-2"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-[#0F2C3F] text-white py-10">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* About Section */}
            <div>
              <div className="flex items-center space-x-2">
                <a href="#" className="flex items-center text-gray-800">
                  <div className="relative">
                    <img
                      src={details && details.footer.logo}
                      alt="logo"
                      className="w-10 h-10 mr-2"
                    />
                    <div
                      style={{
                        width: "250px",
                        position: "absolute",
                        top: "0",
                        left: "0",
                        zIndex: 1000,
                      }}
                    >
                      {userPlan && userPermissions.canEditImage ? (
                        <ButtonSmallPurple
                          width="50"
                          onClick={() => handleEditImageClick("footer", "logo")}
                        >
                          {loadingImage ? <LoadingSmall /> : "Edit logo"}
                        </ButtonSmallPurple>
                      ) : null}

                      <input
                        type="file"
                        ref={(ref) =>
                          (fileInputRefs.current["footer-logo"] = ref)
                        }
                        onChange={(e) => handleImageChange(e, "footer", "logo")}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>

                  <span className="text-md text-[#1E84B5] font-semibold leading-tight">
                    {userDetails?.ecosystemName} <br />
                  </span>
                </a>
              </div>
              <p className="mt-4 text-gray-300">
                {sanitizeContent(details && details.footer.paragraph1)}
              </p>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.footer.paragraph1)}
                onChange={(event) =>
                  handleContentChange("footer", "paragraph1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-gray-300 hover:text-[#4CAFE0]"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-300 hover:text-[#4CAFE0]"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="text-gray-300 hover:text-[#4CAFE0]"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleModalOpen}
                    className="text-gray-300 hover:text-[#4CAFE0]"
                  >
                    Book Appointment
                  </button>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Social Media</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#4CAFE0]">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#4CAFE0]">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#4CAFE0]">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-[#4CAFE0]">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-300">{userDetails?.email}</p>
              <p className="text-gray-300 mt-2">{userDetails?.phoneNumber}</p>
            </div>
          </div>

          {/* Copyright */}
          <hr className="mt-10 border-t-[1px]" />
          <div className="text-center text-gray-400 text-sm mt-10">
            <p>
              {" "}
              &copy; {new Date().getFullYear()} Built with{" "}
              <a
                href="https://dimpified.com"
                className="text-gray-400 hover:text-white text-sm"
              >
                Dimpified
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FirstDentist;
