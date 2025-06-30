import React, { useState, useRef, useEffect } from "react";
import {
  FaInstagram,
  FaStar,
  FaBars,
  FaTimes,
  FaQuoteRight,
  FaFacebookF,
  FaPinterestP,
  FaLinkedinIn,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaTooth,
  FaCalendarCheck,
  FaLocationArrow,
  FaCross,
  FaPlus,
  FaCheckCircle,
  FaThumbsUp,
} from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

import { dental } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import { BsCalendar2CheckFill } from "react-icons/bs";
import { FaCalendarDays, FaMaskFace, FaPlusMinus } from "react-icons/fa6";
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

const FifthDentist = ({ userDetails, subdomain }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [eServices, setEServices] = useState([]);
  const [currency, setCurrency] = useState([]);
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

  const toggleMenu = () => {
    setMobileOpen((prev) => !prev);
  };
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const splitByColon = (value) => {
    const [left, right] = value.split(/:(.+)/);
    return { left, right };
  };

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const doctors = [
    {
      name: details && details.Team.header1,
      specialty: details && details.Team.summary1,
      image: details && details.Team.image1,
      socials: true,
    },
    {
      name: details && details.Team.header2,
      specialty: details && details.Team.summary2,
      image: details && details.Team.image2,
      socials: true,
    },
    {
      name: details && details.Team.header3,
      specialty: details && details.Team.summary3,
      image: details && details.Team.image3,
      socials: true,
    },
    {
      name: details && details.Team.header4,
      specialty: details && details.Team.summary4,
      image: details && details.Team.image4,
      socials: true,
    },
  ];

  const imageUrls = [
    details && details.Gallery.image1,
    details && details.Gallery.image2,
    details && details.Gallery.image3,
    details && details.Gallery.image4,
    details && details.Gallery.image5,
    details && details.Gallery.image6,
  ];

  const testimonials = [
    {
      name: details && details.Reviews.header1,
      role: details && details.Reviews.title1,
      image: details && details.Reviews.image1,
      rating: 5,
      text: details && details.Reviews.summary1,
    },
    {
      name: details && details.Reviews.header2,
      role: details && details.Reviews.title2,
      image: details && details.Reviews.image2,
      rating: 5,
      text: details && details.Reviews.summary2,
    },
  ];

  const processSteps = [
    {
      id: 1,
      title: details && details.Events.section1header,
      description: details && details.Events.section1paragraphy,
      image: details && details.Events.sectionImage1,
    },
    {
      id: 2,
      title: details && details.Events.section2header,
      description: details && details.Events.section2paragraphy,
      image: details && details.Events.sectionImage2,
    },
    {
      id: 3,
      title: details && details.Events.section3header,
      description: details && details.Events.section3paragraphy,
      image: details && details.Events.sectionImage3,
    },
  ];

  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });



  return (
    <div className="font-sans">
      {/* Main Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[#003366] font-bold text-xl">
            <FaTooth className="text-[#2687EF]" />
            <span>{userDetails?.ecosystemName} Dental</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6 text-[#003366] font-semibold uppercase text-sm">
            <a href="#home" className="hover:text-[#2687EF]">
              Home
            </a>
            <a href="#about" className="hover:text-[#2687EF]">
              About Us
            </a>
            <a href="#services" className="hover:text-[#2687EF]">
              Services
            </a>
            <a href="#dentist" className="hover:text-[#2687EF]">
              Dentists
            </a>
            <a href="#gallery" className="hover:text-[#2687EF]">
              Gallery
            </a>
            <a href="#contact" className="hover:text-[#2687EF]">
              Contact
            </a>
          </nav>

          {/* Mobile Icon */}
          <div
            className="md:hidden text-2xl text-[#003366]"
            onClick={toggleMenu}
          >
            {mobileOpen ? <FaTimes /> : <FaBars />}
          </div>

          <button
            onClick={handleModalOpen}
            className="mt-4 hidden md:block bg-[#007bff] hover:bg-[#005fc1] text-white font-bold py-2 px-4 rounded-full text-sm"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white px-4 py-4 flex flex-col gap-4 text-[#003366] font-semibold uppercase text-sm transition-all duration-300">
            <a href="#home" className="hover:text-[#2687EF]">
              Home
            </a>
            <a href="#about" className="hover:text-[#2687EF]">
              About Us
            </a>
            <a href="#services" className="hover:text-[#2687EF]">
              Services
            </a>
            <a href="#dentist" className="hover:text-[#2687EF]">
              Dentists
            </a>
            <a href="#gallery" className="hover:text-[#2687EF]">
              Gallery
            </a>
            <a href="#contact" className="hover:text-[#2687EF]">
              Contact
            </a>
            <button
              onClick={handleModalOpen}
              className="mt-4 bg-[#007bff] hover:bg-[#005fc1] text-white font-bold py-2 px-4 rounded-full text-sm"
            >
              Book Appointment
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-[#003366] text-white pt-24 px-4">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-6 md:space-y-0 pb-16">
            {/* Left Text */}
            <div className="md:w-2/3">
              <p className="uppercase text-xs tracking-wide">
                {sanitizeContent(details && details.hero.title1)}
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mt-2">
                {sanitizeContent(details && details.hero.title2)}
              </h1>
            </div>
            {/* {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
              />
            )} */}

            {/* Right Paragraph */}
            <div className="md:w-1/3 text-sm text-gray-200">
              <p>{sanitizeContent(details && details.hero.summary1)}</p>
            </div>
          </div>

          {/* Image Centered Below Content */}
          <div className="flex justify-center">
            <div className="bg-white p-2 rounded-xl shadow-xl -mb-28 relative">
              <img
                src={details && details.hero.backgroundImage1}
                alt="Dental Team"
                className="w-[90vw] max-w-5xl rounded-xl"
              />
              {userPlan && userPermissions?.canEditImage && (
                <div className="absolute top-4 left-4 z-50">
                  <ButtonSmallPurple
                    onClick={() =>
                      handleEditImageClick("hero", "backgroundImage1")
                    }
                  >
                    {loadingImage ? <LoadingSmall /> : "Edit Image"}
                  </ButtonSmallPurple>

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
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to ensure next section is pushed down */}
      <div className="h-32 md:h-40"></div>
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
          <div className="mt-7 flex-1">
            <h1>Section header 2</h1>
            <EditTemplateLongInput
              value={sanitizeContent(details && details.hero.summary1)}
              onChange={(event) =>
                handleContentChange("hero", "summary1", event)
              }
              placeholder="Enter your domain..."
              className="custom-input-class"
            />
          </div>
        </div>
      </div>
      {/* Main Content */}
      <main className="bg-white">
        {/* Services Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-4 mb-10">
              <div>
                <p className="uppercase text-sm text-[#2687EF] font-medium mb-1">
                  {sanitizeContent(
                    details && details.Statistics.section4header
                  )}
                </p>
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Statistics.section4header
                  )}
                  onChange={(event) =>
                    handleContentChange("Statistics", "section4header", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <h2 className="text-[#003878] text-3xl md:text-4xl font-extrabold">
                  {sanitizeContent(details && details.Statistics.section3icon)}
                </h2>
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Statistics.section3icon
                  )}
                  onChange={(event) =>
                    handleContentChange("Statistics", "section3icon", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
              <a href="#services">
                {" "}
                <button className="bg-[#2687EF] hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm md:text-base">
                  {sanitizeContent(
                    details && details.Statistics.section4paragraphy
                  )}
                </button>
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Statistics.section4paragraphy
                  )}
                  onChange={(event) =>
                    handleContentChange(
                      "Statistics",
                      "section4paragraphy",
                      event
                    )
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <div className="bg-white shadow-md p-6 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">
                      {" "}
                      {sanitizeContent(
                        details && details.Statistics.section1header
                      )}
                    </h3>
                    <span className="text-2xl">
                      <FaCalendarDays
                        className="text-[#2687EF] text-2xl
                  "
                      />
                    </span>
                  </div>
                  <ul className="text-sm text-gray-600 font-medium leading-7">
                    {["section1paragraphy", "section1span", "section1icon"].map(
                      (key) => {
                        const raw = sanitizeContent(details?.Statistics?.[key]);
                        const { left, right } = splitByColon(raw);
                        return (
                          <li key={key}>
                            {left}
                            <span className="float-right">{right}</span>
                          </li>
                        );
                      }
                    )}

                    <li className="text-[#2687EF] mt-2">
                      {sanitizeContent(details?.Statistics?.section2header)}
                    </li>
                  </ul>
                </div>
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Statistics.section1header
                  )}
                  onChange={(event) =>
                    handleContentChange("Statistics", "section1header", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Statistics.section1paragraphy
                  )}
                  onChange={(event) =>
                    handleContentChange(
                      "Statistics",
                      "section1paragraphy",
                      event
                    )
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
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
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Statistics.section1icon
                  )}
                  onChange={(event) =>
                    handleContentChange("Statistics", "section1icon", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Statistics.section2header
                  )}
                  onChange={(event) =>
                    handleContentChange("Statistics", "section2header", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
              <div>
                <div className="bg-white shadow-md p-6 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">
                      {sanitizeContent(details?.Statistics?.section2paragraphy)}
                    </h3>
                    <FaLocationArrow className="text-[#2687EF] text-2xl" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {sanitizeContent(details?.Statistics?.section2span)}
                  </p>
                  <button className="bg-[#2687EF] text-white px-4 py-2 rounded-full text-sm hover:bg-[#2687EF]">
                    {sanitizeContent(details?.Statistics?.section2icon)}
                  </button>
                </div>
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Statistics.section2paragraphy
                  )}
                  onChange={(event) =>
                    handleContentChange(
                      "Statistics",
                      "section2paragraphy",
                      event
                    )
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Statistics.section2span
                  )}
                  onChange={(event) =>
                    handleContentChange("Statistics", "section2span", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Statistics.section2icon
                  )}
                  onChange={(event) =>
                    handleContentChange("Statistics", "section2icon", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
              <div>
                <div className="bg-white shadow-md p-6 rounded-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">
                      {sanitizeContent(
                        details && details.Statistics.section2header
                      )}
                    </h3>
                    <FaMaskFace className="text-[#2687EF] text-4xl" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    {sanitizeContent(
                      details && details.Statistics.section3paragraphy
                    )}
                  </p>
                  <p className="text-[#2687EF] font-bold text-lg">
                    <span>
                      <FaPhoneAlt className="mr-2" />{" "}
                      {sanitizeContent(
                        details && details.Statistics.section3span
                      )}
                    </span>{" "}
                  </p>
                </div>
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Statistics.section2header
                  )}
                  onChange={(event) =>
                    handleContentChange("Statistics", "section2header", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Statistics.section3paragraphy
                  )}
                  onChange={(event) =>
                    handleContentChange(
                      "Statistics",
                      "section3paragraphy",
                      event
                    )
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />

                <EditTemplateLongInput
                  value={sanitizeContent(
                    details && details.Statistics.section3span
                  )}
                  onChange={(event) =>
                    handleContentChange("Statistics", "section3span", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="bg-[#2283f6] text-white py-20 px-4">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 items-center gap-10">
            <div className="relative">
              <img
                src={details && details.aboutUs.image1}
                alt="Dentist with Patient"
                className="rounded-xl w-full shadow-lg"
              />
              <div
                style={{
                  width: "250px",
                  position: "absolute",
                  top: "20px",
                  left: "100px",
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
                  ref={(ref) => (fileInputRefs.current[`aboutUs-image1`] = ref)}
                  onChange={(e) => handleImageChange(e, "aboutUs", "image1")}
                  style={{ display: "none" }}
                />
              </div>
            </div>
            <div>
              <p className="uppercase text-sm font-semibold mb-2">
                About {userDetails?.ecosystemName}
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
                {sanitizeContent(details && details.aboutUs.title2)}
              </h2>
              <p className="text-sm text-white/90 mb-6 max-w-md">
                {sanitizeContent(details && details.aboutUs.text1)}
              </p>
              <div className="flex items-start mb-6 gap-4">
                <FaThumbsUp className="text-white text-4xl" />
                <div>
                  <h3 className="text-lg font-bold mb-1">
                    {sanitizeContent(details && details.aboutUs.buttonText1)}
                  </h3>
                  <p className="text-sm text-white/90">
                    {sanitizeContent(details && details.aboutUs.text2)}
                  </p>
                </div>
              </div>
              <button
                onClick={handleModalOpen}
                className="bg-white text-[#2687EF] px-6 py-2 rounded-full font-semibold text-sm hover:bg-blue-100"
              >
                {sanitizeContent(details && details.aboutUs.buttonText2)}
              </button>
            </div>
          </div>
        </section>
        <div className="lg:flex gap-5 mt-5">
          <EditTemplateLongInput
            value={sanitizeContent(details && details.aboutUs.title2)}
            onChange={(event) =>
              handleContentChange("aboutUs", "title2", event)
            }
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
        <div className="lg:flex gap-5 mt-5">
          <EditTemplateLongInput
            value={sanitizeContent(details && details.aboutUs.text1)}
            onChange={(event) => handleContentChange("aboutUs", "text1", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <EditTemplateLongInput
            value={sanitizeContent(details && details.aboutUs.text2)}
            onChange={(event) => handleContentChange("aboutUs", "text2", event)}
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
          <EditTemplateLongInput
            value={sanitizeContent(details && details.aboutUs.buttonText2)}
            onChange={(event) =>
              handleContentChange("aboutUs", "buttonText2", event)
            }
            placeholder="Enter your domain..."
            className="custom-input-class"
          />
        </div>

        {/* Process Section */}
        <section id="process" className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <p className="uppercase text-xl text-[#2687EF] font-medium">
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
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <h2 className="text-4xl md:text-4xl font-bold text-[#003878] max-w-2xl">
                  {sanitizeContent(details && details.Events.summary)}
                </h2>
              </div>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.Events.summary)}
                onChange={(event) =>
                  handleContentChange("Events", "summary", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {processSteps.map((step, index) => (
                <div>
                  <div
                    ref={ref}
                    className={`transition-all duration-1000 ease-in-out transform ${
                      inView
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-10"
                    } bg-gray-100 rounded-xl overflow-hidden shadow-lg flex flex-col md:flex-row my-6`}
                  >
                    <div className="flex-1 p-6 flex flex-col justify-center text-left">
                      <div className="text-3xl mb-2">{step.icon}</div>
                      <h3 className="text-xl font-semibold text-blue-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {step.description}
                      </p>
                      <button
                        onClick={handleModalOpen}
                        className="bg-[#2687EF] text-white px-4 py-2 rounded-full hover:bg-blue-700 w-max"
                      >
                        Book an appointment
                      </button>
                    </div>
                    <div className="flex-1 relative">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                      {userPlan && userPermissions?.canEditImage && (
                        <div className="absolute top-4 left-4 z-50">
                          <ButtonSmallPurple
                            onClick={() =>
                              fileInputRefs.current[
                                `Events-sectionImage${index + 1}`
                              ]?.click()
                            }
                          >
                            {loadingImage ? <LoadingSmall /> : "Edit Image"}
                          </ButtonSmallPurple>
                          <input
                            type="file"
                            ref={(ref) =>
                              (fileInputRefs.current[
                                `Events-sectionImage${index + 1}`
                              ] = ref)
                            }
                            onChange={(e) =>
                              handleImageChange(
                                e,
                                "Events",
                                `sectionImage${index + 1}`
                              )
                            }
                            style={{ display: "none" }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details?.Events?.[`section${index + 1}header`]
                    )}
                    onChange={(event) =>
                      handleContentChange(
                        "Events",
                        `section${index + 1}header`,
                        event
                      )
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class my-6"
                  />
                  <EditTemplateLongInput
                    value={sanitizeContent(
                      details?.Events?.[`section${index + 1}paragraphy`]
                    )}
                    onChange={(event) =>
                      handleContentChange(
                        "Events",
                        `section${index + 1}paragraphy`,
                        event
                      )
                    }
                    placeholder="Enter your domain..."
                    className="custom-input-class my-6"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dental Services Section */}
        <section className="bg-[#003d7c] text-white py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <div>
                <p className="uppercase text-sm font-medium tracking-wide">
                  Dental Specialties
                </p>
                <h2 className="text-3xl md:text-5xl font-extrabold mt-2">
                  Specialized Dental Care for Nigerians
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {eServices.map((service, index) => (
                <div
                  key={index}
                  className="rounded-lg p-6 h-full transition duration-300 cursor-pointer group ${
                   bg-white text-gray-800 hover:bg-[#2687EF] hover:text-white"
                >
                  <div className="flex flex-col justify-between h-full gap-4">
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold mb-2">
                        {service.name}
                      </h3>
                      <p className="text-sm md:text-base leading-relaxed">
                        {service.shortDescription}
                      </p>
                    </div>
                    <div className="text-4xl opacity-70 group-hover:opacity-100">
                      <img
                        src={service.serviceImage}
                        alt={service.name}
                        className="w-12 h-12 "
                      />
                    </div>

                    <button
                      onClick={handleModalOpen}
                      className="mt-auto inline-block bg-transparent border border-[#2687EF] hover:border-white  hover:text-white bg-[#2687EF] text-white px-4 py-2 rounded-full text-sm w-fit transition"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Portfolio Section */}
        <section id="gallery" className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
              <div>
                <h4 className="text-sm text-[#2687EF] uppercase font-medium">
                  {sanitizeContent(details && details.Gallery.summary1)}
                </h4>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Gallery.summary1)}
                  onChange={(event) =>
                    handleContentChange("Gallery", "summary1", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
                <h2 className="text-3xl md:text-4xl font-bold text-[#003878] mt-2">
                  {sanitizeContent(details && details.Gallery.summary2)}
                </h2>
                <EditTemplateLongInput
                  value={sanitizeContent(details && details.Gallery.summary2)}
                  onChange={(event) =>
                    handleContentChange("Gallery", "summary2", event)
                  }
                  placeholder="Enter your domain..."
                  className="custom-input-class"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="overflow-hidden relative rounded-lg shadow-md h-[280px] md:h-[300px] lg:h-[320px]"
                >
                  <img
                    src={url + "?auto=format&fit=crop&w=800&q=80"}
                    alt={`dental-case-${index}`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />{" "}
                  {userPlan && userPermissions?.canEditImage && (
                    <div className="absolute top-2 left-2">
                      <ButtonSmallPurple
                        onClick={() =>
                          fileInputRefs.current[
                            `Gallery-image${index + 1}`
                          ]?.click()
                        }
                      >
                        {loadingImage ? <LoadingSmall /> : "Edit Image"}
                      </ButtonSmallPurple>
                      <input
                        type="file"
                        ref={(ref) =>
                          (fileInputRefs.current[`Gallery-image${index + 1}`] =
                            ref)
                        }
                        onChange={(e) =>
                          handleImageChange(e, "Gallery", `image${index + 1}`)
                        }
                        style={{ display: "none" }}
                      />
                    </div>
                  )}
                </div>
              ))}{" "}
            </div>
          </div>
        </section>

        {/* Appointment Section */}
        <section id="contact" className="bg-[#f4f9ff] py-16 px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-[#2687EF] uppercase text-xl font-semibold mb-2">
                {sanitizeContent(details && details.contactUs.heading1)}
              </p>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading1)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading1", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#003878] mb-4">
                {sanitizeContent(details && details.contactUs.heading2)}
              </h2>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.contactUs.heading2)}
                onChange={(event) =>
                  handleContentChange("contactUs", "heading2", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class"
              />
              <p className="text-gray-600 mb-6 text-base md:text-lg leading-relaxed">
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
              <div className="overflow-hidden rounded-lg shadow-md relative">
                <img
                  src={details && details.contactUs.heading4}
                  alt="Dental Consultation"
                  className="w-full h-auto object-cover"
                />
                {userPlan && userPermissions?.canEditImage && (
                  <div className="absolute top-4 left-4 z-50">
                    <ButtonSmallPurple
                      onClick={() =>
                        fileInputRefs.current["contactUs-heading4"]?.click()
                      }
                    >
                      {loadingImage ? <LoadingSmall /> : "Edit Image"}
                    </ButtonSmallPurple>
                    <input
                      type="file"
                      ref={(ref) =>
                        (fileInputRefs.current["contactUs-heading4"] = ref)
                      }
                      onChange={(e) =>
                        handleImageChange(e, "contactUs", "heading4")
                      }
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
            </div>

            <WhiteContactForm />
          </div>
        </section>

        {/* Doctors Section */}
        <section id="dentist" className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div>
              <h3 className="text-xl font-medium text-[#2687EF] uppercase mb-2">
                OUR SPECIALISTS
              </h3>
              <h2 className="text-4xl md:text-4xl font-bold text-[#003878] mb-12">
                Meet Our Dental Experts
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
                {doctors.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-white rounded-lg shadow-sm p-4 gap-6"
                  >
                    <div className="relative">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-24 h-24 object-cover rounded-full border-4 border-white shadow-md"
                      />
                      {userPlan && userPermissions?.canEditImage && (
                        <div className="absolute top-4 left-4 z-50">
                          <ButtonSmallPurple
                            onClick={() =>
                              fileInputRefs.current[
                                `Team-image${index + 1}`
                              ]?.click()
                            }
                          >
                            {loadingImage ? <LoadingSmall /> : "Edit Image"}
                          </ButtonSmallPurple>
                          <input
                            type="file"
                            ref={(ref) =>
                              (fileInputRefs.current[`Team-image${index + 1}`] =
                                ref)
                            }
                            onChange={(e) =>
                              handleImageChange(e, "Team", `image${index + 1}`)
                            }
                            style={{ display: "none" }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#003878]">
                        {doc.name}
                      </h3>
                      <EditTemplateLongInput
                        value={sanitizeContent(
                          details?.Team?.[`header${index + 1}`] || ""
                        )}
                        onChange={(event) =>
                          handleContentChange(
                            "Team",
                            `header${index + 1}`,
                            event
                          )
                        }
                        placeholder="Enter testimonial..."
                        className="custom-input-class my-6"
                      />
                      <p className="text-[#2687EF] text-sm mt-1">
                        {doc.specialty}
                      </p>
                      <EditTemplateLongInput
                        value={sanitizeContent(
                          details?.Team?.[`summary${index + 1}`] || ""
                        )}
                        onChange={(event) =>
                          handleContentChange(
                            "Team",
                            `summary${index + 1}`,
                            event
                          )
                        }
                        placeholder="Enter testimonial..."
                        className="custom-input-class my-6"
                      />
                      {doc.socials && (
                        <div className="flex gap-3 mt-3 text-[#003878] ">
                          <a href="#">
                            <FaInstagram className="text-xl hover:text-pink-600" />
                          </a>
                          <a href="#">
                            <FaFacebookF className="text-xl hover:text-[#2687EF]" />
                          </a>
                          <a href="#">
                            <FaLinkedinIn className="text-xl hover:text-blue-700" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-[#f7fafe] py-28 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-16">
              <div>
                <p className="text-[#2687EF] text-xl font-medium uppercase">
                  Testimonials
                </p>
                <h2 className="text-4xl md:text-4xl font-bold text-[#0f2f57]">
                  Testimonial Consistent Health Support
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left - Testimonial */}
              <div className="relative">
                <div className="w-full">
                  {testimonials.map((item, index) => (
                    <div key={index}>
                      <div className="relative space-y-6">
                        <div className="flex space-x-1 text-yellow-500">
                          {Array.from({ length: item.rating }).map((_, i) => (
                            <FaStar key={i} className="text-lg" />
                          ))}
                        </div>

                        {/* Quote Icon */}
                        <FaQuoteRight className="text-[60px] text-blue-200 absolute right-0 top-0" />

                        {/* Testimonial */}
                        <p className="text-gray-600 text-base leading-relaxed pr-16">
                          {item.text}
                        </p>
                        <EditTemplateLongInput
                          value={sanitizeContent(
                            details?.Reviews?.[`summary${index + 1}`] || ""
                          )}
                          onChange={(event) =>
                            handleContentChange(
                              "Reviews",
                              `summary${index + 1}`,
                              event
                            )
                          }
                          placeholder="Enter testimonial..."
                          className="custom-input-class my-6"
                        />

                        {/* Divider */}
                        <hr className="border-gray-300 w-full" />

                        {/* Author Info */}
                        <div className="flex items-center gap-4 ">
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                            />
                            {userPlan && userPermissions?.canEditImage && (
                              <div className="absolute top-2 left-2">
                                <ButtonSmallPurple
                                  onClick={() =>
                                    fileInputRefs.current[
                                      `Reviews-image${index + 1}`
                                    ]?.click()
                                  }
                                >
                                  {loadingImage ? (
                                    <LoadingSmall />
                                  ) : (
                                    "Edit Image"
                                  )}
                                </ButtonSmallPurple>
                                <input
                                  type="file"
                                  ref={(ref) =>
                                    (fileInputRefs.current[
                                      `Reviews-image${index + 1}`
                                    ] = ref)
                                  }
                                  onChange={(e) =>
                                    handleImageChange(
                                      e,
                                      "Reviews",
                                      `image${index + 1}`
                                    )
                                  }
                                  style={{ display: "none" }}
                                />
                              </div>
                            )}
                          </div>

                          <div>
                            <h4 className="text-lg font-semibold text-[#0f2f57]">
                              {item.name}
                            </h4>
                            <EditTemplateLongInput
                              value={sanitizeContent(
                                details?.Reviews?.[`header${index + 1}`] || ""
                              )}
                              onChange={(event) =>
                                handleContentChange(
                                  "Reviews",
                                  `header${index + 1}`,
                                  event
                                )
                              }
                              placeholder="Enter testimonial..."
                              className="custom-input-class my-6"
                            />
                            <p className="text-sm text-[#2687EF] ">
                              {item.role}
                            </p>

                            <EditTemplateLongInput
                              value={sanitizeContent(
                                details?.Reviews?.[`title${index + 1}`] || ""
                              )}
                              onChange={(event) =>
                                handleContentChange(
                                  "Reviews",
                                  `title${index + 1}`,
                                  event
                                )
                              }
                              placeholder="Enter testimonial..."
                              className="custom-input-class my-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Navigation Arrows */}
                <div className="absolute bottom-0 right-0 flex gap-3 mt-6 pr-2">
                  <button
                    ref={prevRef}
                    className="w-10 h-10 bg-[#2687EF] text-white rounded-full flex items-center justify-center text-xl hover:bg-blue-700 transition"
                  >
                    ←
                  </button>
                  <button
                    ref={nextRef}
                    className="w-10 h-10 bg-[#2687EF] text-white rounded-full flex items-center justify-center text-xl hover:bg-blue-700 transition"
                  >
                    →
                  </button>
                </div>
              </div>

              {/* Right - Doctor Image */}
              <div className="flex justify-center">
                <img
                  src="https://gfa-tech.com/dimp-template-images/dentist/dentist5-testimonial-right.png"
                  alt="Doctor Group"
                  className="w-full h-auto max-h-[450px]"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#003366] text-white py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 text-white font-bold text-xl">
                <FaTooth className="text-white" />
                <span>{userDetails?.ecosystemName} Dental</span>
              </div>
              <p className="mb-4 text-sm leading-6">
                {sanitizeContent(details && details.footer.header)}
              </p>
              <EditTemplateLongInput
                value={sanitizeContent(details && details.footer.header)}
                onChange={(event) =>
                  handleContentChange("footer", "header", event)
                }
                placeholder="Enter your domain..."
                className="custom-input-class text-black"
              />
              <div className="flex space-x-4">
                <a href="#">
                  <FaInstagram className="bg-white text-[#003366] p-2 rounded-full w-9 h-9" />
                </a>
                <a href="#">
                  <FaFacebookF className="bg-white text-[#003366] p-2 rounded-full w-9 h-9" />
                </a>
                <a href="#">
                  <FaPinterestP className="bg-white text-[#003366] p-2 rounded-full w-9 h-9" />
                </a>
                <a href="#">
                  <FaLinkedinIn className="bg-white text-[#003366] p-2 rounded-full w-9 h-9" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  {" "}
                  <a href="#about">About Us</a>
                </li>
                <li>
                  {" "}
                  <a href="#services">Our Services</a>
                </li>
                <li>
                  {" "}
                  <a href="#process">Our Process</a>
                </li>
                <li>
                  {" "}
                  <a href="#contact">Contact Us</a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Contact Info</h3>
              <ul className="text-sm space-y-3">
                <li className="flex items-start gap-2">
                  <FaEnvelope className="mt-1" /> Email:{userDetails?.email}
                </li>
                <li className="flex items-start gap-2">
                  <FaMapMarkerAlt className="mt-1" /> Address:{" "}
                  {userDetails?.localgovernment}, {userDetails?.state},{" "}
                  {userDetails?.country}
                </li>
                <li className="flex items-start gap-2">
                  <FaPhoneAlt className="mt-1" /> Phone:{" "}
                  {userDetails?.phoneNumber}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">News Letter</h3>
              <div className="relative mb-4">
                <input
                  type="email"
                  placeholder="Your Email Address"
                  className="w-full px-4 py-3 rounded-full text-[#003366] focus:outline-none"
                />
                <button className="absolute right-3 top-3 text-[#003366]">
                  <FiSend size={20} />
                </button>
              </div>
              <label className="flex items-center text-sm gap-2">
                <input type="checkbox" className="accent-white" />I Agree To All
                Your Terms & Conditions
              </label>
            </div>
          </div>

          <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm">
            Copyright 2025 Dimpified | All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FifthDentist;
