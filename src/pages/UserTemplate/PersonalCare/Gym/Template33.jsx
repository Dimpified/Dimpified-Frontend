import React, { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaBars,
  FaTimes,
  FaArrowRight,
  FaUser,
  FaFacebookF,
  FaTwitter,
  FaCog,
  FaPlay,
  FaInstagram,
  FaWhatsapp,
  FaDumbbell,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { gym } from "../../../../data/Services";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

const Card = ({ title, description, icon }) => (
  <div className="bg-white shadow-md p-6 rounded-lg relative">
    <div className="absolute top-0 right-0 w-0 h-0 border-t-[30px] border-l-[30px] border-t-pink-600 border-l-transparent"></div>
    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
      <span className="text-pink-600 text-2xl">{icon}</span>
      {title}
    </h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

// App Component
const FifthGym = ({ details, subdomain, userDetails }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [eServices, setEServices] = useState([]);
  const [currency, setCurrency] = useState([]);
  const cardData = [
    {
      title: "Cardio",
      description:
        "Boost your endurance and burn calories with heart-pumping cardio workouts tailored for all fitness levels.",
      icon: "🏃",
    },
    {
      title: "Chest",
      description:
        "Strengthen and tone your upper body with expert-led chest routines designed for visible results.",
      icon: "🏋️",
    },
    {
      title: "Muscles",
      description:
        "Build lean muscle mass with structured training plans that focus on form, strength, and progression.",
      icon: "💪",
    },
    {
      title: "Shoulder",
      description:
        "Enhance shoulder strength and stability through targeted workouts that support posture and mobility.",
      icon: "💥",
    },
    {
      title: "Full Body",
      description:
        "Experience total body transformation with dynamic routines that engage every major muscle group.",
      icon: "🏃‍♂️",
    },
  ];

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

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [1, 2, 3].map((i) => ({
    image:
      (details &&
        details?.Reviews?.[`image${i}`]?.replace("not available", "")) ||
      "",
    name: (details && details?.Reviews?.[`header${i}`]) || "",
    role: (details && details?.Reviews?.[`title${i}`]) || "",
    text: (details && details?.Reviews?.[`summary${i}`]) || "",
  }));

  return (
    <div>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white text-pink-600 shadow-md"
            : "bg-transparent text-white"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-24 lg:px-32 py-4">
          {/* Logo */}
          <div className="flex items-center font-bold text-2xl">
            <FaDumbbell /> {userDetails && userDetails.ecosystemName}
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-6 text-sm font-medium">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#facility">Our Facility</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#membership">Membership Plans</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>

          {/* Right Side - Search & Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={handleModalOpen}
              className="bg-pink-600 text-white font-semibold px-4 py-2 rounded-md"
            >
              {sanitizeContent(details && details.navbar.buttonText1)}
            </button>
          </div>

          {/* Mobile Menu Icon */}
          <div
            className="lg:hidden text-2xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`lg:hidden bg-white text-black transition-all duration-300 ${
            menuOpen
              ? "max-h-screen opacity-100"
              : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          <div className="flex flex-col space-y-4 px-6 py-4 text-sm font-medium">
            <a href="#home">Home</a>

            <a href="#about">About</a>

            <a href="#facility">Our Facility</a>

            <a href="#services">Services</a>

            <a href="#membership">Membership Plans</a>

            <a href="#contact">Contact Us</a>

            <div className="flex items-center space-x-2 mt-4">
              <button
                onClick={handleModalOpen}
                className="bg-pink-600 text-white font-semibold px-4 py-2 rounded-md"
              >
                {sanitizeContent(details && details.navbar.buttonText1)}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <section
        id="home"
        className="relative w-full bg-gradient-to-br from-[#ef466f] to-[#fb7388] text-white overflow-hidden pt-32 pb-24"
      >
        {/* BACKGROUND TEXT */}
        <h2 className="absolute text-[160px] lg:text-[260px] font-extrabold text-white opacity-10 tracking-widest z-0 top-16 left-1/2 -translate-x-1/2 pointer-events-none select-none">
          FITNESS
        </h2>
        {isModalOpen && (
          <BookingModal
            isOpen={isModalOpen}
            handleClose={handleModalClose}
            information={eServices}
            subdomain={subdomain}
            serviceCurrency={currency}
          />
        )}

        {/* HERO CONTENT */}
        <div className="relative z-20 px-6 md:px-24 lg:px-32 flex flex-col items-center">
          {/* Layout row */}
          <div className="w-full flex flex-col lg:flex-row items-center justify-between lg:space-x-8">
            {/* KEEP + HR + Subtext (desktop) */}
            <div className="text-center lg:text-left lg:w-1/3 mb-6 lg:mb-0">
              <h1 className="text-[48px] sm:text-[60px] md:text-[80px] font-extrabold uppercase leading-none">
                {sanitizeContent(details && details.hero.title1)}
              </h1>
              <div className="hidden lg:block border-t-4 border-white w-30 mt-4 mb-3" />
              <p className="hidden lg:block text-sm md:text-base leading-relaxed max-w-sm mt-14">
                {sanitizeContent(details && details.hero.summary1)}
              </p>
            </div>

            {/* TRAINING (mobile view) */}
            <div className="block lg:hidden text-center mt-6">
              <h1 className="text-[48px] sm:text-[60px] md:text-[80px] font-extrabold uppercase leading-none">
                {sanitizeContent(details && details.hero.title2)}
              </h1>
              <p className="mt-3 text-sm md:text-base leading-relaxed max-w-md mx-auto">
                {sanitizeContent(details && details.hero.summary1)}
              </p>
            </div>

            {/* Image w/ Thumbnail */}
            <div className="relative lg:w-1/3 flex justify-center items-end mt-8 lg:mt-0">
              <img
                src={details && details.hero.backgroundImage1}
                alt="Main"
                className="max-w-[280px] md:max-w-[440px] w-full relative z-10"
              />
            </div>

            {/* TRAINING (desktop) */}
            <div className="hidden lg:block text-left lg:w-1/3 mt-6 lg:mt-0">
              <h1 className="text-[48px] sm:text-[60px] md:text-[80px] font-extrabold uppercase leading-none">
                {sanitizeContent(details && details.hero.title2)}
              </h1>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="relative z-30 mt-24">
          <div className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-xl w-[90%] max-w-4xl px-8 py-6 flex justify-between items-center text-center">
            {[
              details.hero?.summary3, // e.g., "10 Certified Trainers"
              details.hero?.summary4, // e.g., "20 Years of Experience"
              details.hero?.span1, // e.g., "300+ Fufilled Clients"
            ].map((text, i) => {
              const [number, ...rest] = text?.split(" ") || [];
              const top = rest.slice(0, rest.length - 1).join(" ");
              const bottom = rest[rest.length - 1] || "";

              return (
                <div key={i} className="flex-1">
                  <h2 className="text-4xl font-bold text-[#ef466f]">
                    {number}
                  </h2>
                  <p className="mt-1 text-sm text-black font-medium">{top}</p>
                  <p className="text-sm text-gray-600">{bottom}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section id="about" className="bg-white w-full overflow-hidden mt-14 ">
        <div className="flex flex-col lg:flex-row items-start px-6 md:px-24 lg:px-32 py-12 gap-10 lg:gap-20">
          {/* Image layout wrapper */}
          <div className="relative w-full lg:w-[600px]">
            {/* Big image with left padding to accommodate small image */}
            <div className="pl-[120px]">
              <img
                src={details && details.aboutUs.image1}
                alt="Main Trainer"
                className="w-full h-[500px] object-cover rounded-md"
              />
            </div>

            {/* Small image & badge */}
            <div className="absolute top-0 left-0">
              <div className="relative">
                <img
                  src={details && details.aboutUs.image2}
                  alt="Trainer"
                  className="w-[180px] h-[200px] object-cover rounded-md"
                />
                {/* <div className="absolute -bottom-5 left-0 bg-pink-600 text-white px-6 py-4 text-center rounded shadow-md w-full">
                  <h3 className="text-2xl font-bold">20</h3>
                  <p className="uppercase text-xs font-semibold">
                    Years Experience
                  </p>
                </div> */}
              </div>
            </div>
          </div>

          {/* Text Section */}
          <div className="flex-1">
            <p className="text-sm uppercase text-gray-500 font-medium mb-2">
              {sanitizeContent(details && details.aboutUs.title1)}
            </p>
            <h1 className="text-4xl font-bold text-gray-800 leading-snug">
              <span className="text-pink-600">
                {sanitizeContent(details && details.aboutUs.title2)}
              </span>
            </h1>
            <p className="italic text-lg text-gray-700 mt-2">
              {sanitizeContent(details && details.aboutUs.text1)}
            </p>
            <p className="text-gray-600 mt-4 leading-relaxed">
              {sanitizeContent(details && details.aboutUs.text2)}
            </p>

            <div className="bg-pink-50 mt-6 p-6 grid grid-cols-1 md:grid-cols-2 gap-y-3 text-left">
              <p className="text-pink-600 italic">
                ✓ {details && details.Vision.missionsummary}
              </p>
              <p className="text-pink-600 italic">
                ✓ {details && details.Vision.impactheader}
              </p>
              <p className="text-pink-600 italic">
                ✓ {details && details.Vision.missionheader}
              </p>
              <p className="text-pink-600 italic">
                ✓ {details && details.Vision.visionsummary}
              </p>
              <p className="text-pink-600 italic">
                ✓ {details && details.Vision.impactsummary}
              </p>
              <p className="text-pink-600 italic">
                ✓ {details && details.Vision.visiomheader}
              </p>
            </div>

            <a href="#membership">
              {" "}
              <button className="mt-6 bg-pink-600 text-white px-6 py-3 font-semibold rounded-md shadow-md hover:bg-pink-700 transition">
                {sanitizeContent(details && details.aboutUs.buttonText1)}
              </button>{" "}
            </a>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="bg-white w-full md:px-24 px-6 lg:px-32 py-10 lg:pt-40 relative"
      >
        <div className="lg:absolute lg:top-12 lg:left-32 max-w-xl z-20 mb-10 lg:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Our Services
          </h2>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">
            Virtual & Physical <span className="text-pink-600">Training</span>
          </h1>
          <p className="text-gray-600 mt-4">
            Achieve your fitness goals from <br />
            anywhere with our personalized <br /> virtual training sessions.{" "}
            <br />
            Whether you're looking to tone, <br /> build strength, or stay
            active, our <br /> programs are tailored to fit your lifestyle.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mt-10 relative">
          {/* Left Cards */}
          <div className="flex flex-col space-y-6 w-full lg:w-[25%] mt-16">
            <Card {...cardData[0]} />
            <Card {...cardData[1]} />
          </div>

          {/* Center Image */}
          <div className="w-full lg:w-[35%] flex justify-center relative z-10 h-full">
            <img
              src="https://gfa-tech.com/dimp-template-images/gym/gym5.10.jpg"
              alt="Fitness Trainer"
              className="w-full h-[800px] object-cover"
            />
          </div>

          {/* Right Cards */}
          <div className="flex flex-col space-y-6 w-full lg:w-[25%]">
            <Card {...cardData[2]} />
            <Card {...cardData[3]} />
            <Card {...cardData[4]} />
          </div>
        </div>
      </section>
      <div
        id="membership"
        className="relative bg-cover bg-center  flex items-center justify-between lg:px-32 px-6 md:px-24 text-white"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/gym/gym5.8.jpg')",
        }}
      >
        {/* Blurred Overlay */}
        <section className="flex flex-wrap lg:py-12 py-6 items-center justify-center bg-transparent">
          <h2 className="text-center text-3xl md:text-4xl text-black font-bold mb-6">
            <span className="text-pink-600">Membership Plans</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {eServices.map((service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative p-6 bg-pink-800 bg-opacity-5 backdrop-blur-md rounded-lg shadow-lg transition-all duration-300 border border-white border-opacity-20"
              >
                <div className="">
                  <h3 className="font-bold text-lg text-white">
                    {" "}
                    {service.name}
                  </h3>
                  <p className="text-sm mt-2 text-gray-200">
                    {service.shortDescription}
                  </p>
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={handleModalOpen}
                    className="mt-4 px-4 py-2 bg-pink-600 text-white font-semibold text-sm rounded-md transition-all"
                  >
                    Choose plan
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
      <section
        id="facility"
        className="relative w-full bg-white py-12 px-4 md:px-24 lg:px-32 space-y-10"
      >
        <div className="flex flex-col md:flex-row gap-6 relative z-10">
          <img
            src={details && details.Gallery.image3}
            alt="Workout 1"
            className="w-full md:w-1/2 h-[300px] object-cover rounded-lg"
          />
          <img
            src={details && details.Gallery.image4}
            alt="Workout 2"
            className="w-full md:w-1/2 h-[300px] object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold leading-tight">
              <span className="text-pink-600">
                {sanitizeContent(details && details.Gallery.summary3)}{" "}
              </span>
            </h2>
            <p className="text-gray-600 mt-4">
              {sanitizeContent(details && details.Gallery.summary2)}
            </p>
            <button
              onClick={handleModalOpen}
              className="mt-6 bg-pink-600 hover:bg-pink-700 text-white py-2 px-6 rounded-md font-medium"
            >
              {sanitizeContent(details && details.Gallery.summary1)}
            </button>
          </div>
          <div className="flex w-full lg:w-1/2 gap-4">
            <img
              src={details && details.Gallery.image1}
              alt="Cycling"
              className="w-1/2 h-[300px] object-cover rounded-lg"
            />
            <img
              src={details && details.Gallery.image2}
              alt="Smiling Gym Lady"
              className="w-1/2 h-[300px] object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Progress bar box and image */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-2/3 bg-black text-white p-6 rounded-lg h-[300px] flex flex-col justify-between">
            <div className="mb-4">
              <div className="flex justify-between text-sm">
                <span>
                  {sanitizeContent(
                    details && details.Statistics.section3header
                  )}
                </span>
                <span>
                  {sanitizeContent(details && details.Statistics.section1span)}
                </span>
              </div>
              <div className="bg-gray-700 h-4 rounded mt-2">
                <div
                  className="bg-pink-600 h-4 rounded"
                  style={{
                    width:
                      sanitizeContent(details?.Statistics?.section1span) ||
                      "0%",
                  }}
                ></div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm">
                <span>
                  {sanitizeContent(
                    details && details.Statistics.section2header
                  )}
                </span>
                <span>
                  {sanitizeContent(details && details.Statistics.section2span)}
                </span>
              </div>
              <div className="bg-gray-700 h-4 rounded mt-2">
                <div
                  className="bg-pink-600 h-4 rounded"
                  style={{
                    width:
                      sanitizeContent(details?.Statistics?.section2span) ||
                      "0%",
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span>
                  {sanitizeContent(
                    details && details.Statistics.section3header
                  )}
                </span>
                <span>
                  {sanitizeContent(details && details.Statistics.section3span)}
                </span>
              </div>
              <div className="bg-gray-700 h-4 rounded mt-2">
                <div
                  className="bg-pink-600 h-4 rounded"
                  style={{
                    width:
                      sanitizeContent(details?.Statistics?.section3span) ||
                      "0%",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 relative">
            <img
              src={details && details.Statistics.section1icon}
              alt="Boxing Workout"
              className="w-full h-[300px] object-cover rounded-lg"
            />
          </div>
        </div>
      </section>
      <section className="relative bg-gradient-to-r from-pink-200 to-rose-100 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-10">
            <p className="uppercase text-sm text-gray-500">Testimonial</p>
            <h2 className="text-4xl md:text-5xl font-bold">
              What <span className="text-pink-600">Client</span>{" "}
              <span className="text-gray-900">Say’s</span>
            </h2>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation={{
              prevEl: ".prev-button",
              nextEl: ".next-button",
            }}
            autoplay={{ delay: 5000 }}
            loop={true}
            className="relative"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col md:flex-row items-center justify-center gap-12 px-4 md:px-8">
                  {/* Avatar Image */}
                  <div className="w-[250px] h-[250px] shrink-0 rounded-full border-8 border-white shadow-xl overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Text */}
                  <div className="max-w-2xl text-center md:text-left">
                    <div className="flex justify-center md:justify-start mb-4">
                      {Array(5)
                        .fill()
                        .map((_, i) => (
                          <span key={i} className="text-yellow-400 text-xl">
                            ★
                          </span>
                        ))}
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {testimonial.text}
                    </p>
                    <h3 className="text-xl font-bold text-gray-900">
                      {testimonial.name}
                    </h3>
                    <p className="text-pink-600 font-semibold">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20">
            <div className="prev-button bg-gradient-to-tr from-pink-600 to-rose-500 text-white p-3 rounded-md shadow-md cursor-pointer">
              <FaArrowLeft />
            </div>
          </div>
          <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20">
            <div className="next-button bg-gradient-to-tr from-pink-600 to-rose-500 text-white p-3 rounded-md shadow-md cursor-pointer">
              <FaArrowRight />
            </div>
          </div>
        </div>

        {/* Decorative avatars around the main image */}
        <div className="absolute top-8 left-12 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src="https://gfa-tech.com/dimp-template-images/gym/Gym4.3.jpg"
            alt=""
          />
        </div>
        <div className="absolute top-8 right-12 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src="https://gfa-tech.com/dimp-template-images/gym/Gym4.4.jpg"
            alt=""
          />
        </div>
        <div className="absolute bottom-8 left-16 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src="https://gfa-tech.com/dimp-template-images/gym/Gym4.2.jpg"
            alt=""
          />
        </div>
        <div className="absolute bottom-8 right-16 w-16 h-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
          <img
            src="https://gfa-tech.com/dimp-template-images/gym/Gym4.3.jpg"
            alt=""
          />
        </div>
      </section>
      <div id="contact">
        <WhiteContactForm ecosystemDomain={subdomain} />
      </div>
      <div className="bg-pink-600 text-white py-10 px-4 text-center relative z-10">
        <h2 className="text-3xl font-bold mb-2">
          {sanitizeContent(details && details.LargeCta.header2)}
        </h2>
        <p className="mb-4 text-lg">
          {sanitizeContent(details && details.LargeCta.header1)}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
          <button
            onClick={handleModalOpen}
            className="bg-black hover:bg-pink-500 text-white px-6 py-3 font-semibold rounded-md relative after:absolute after:w-3 after:h-full after:bg-pink-600 after:right-[-8px] after:top-0"
          >
            {sanitizeContent(details && details.LargeCta.buttonText1)}
          </button>
        </div>
      </div>

      <footer className="bg-[#161616] text-white pt-0">
        {/* Newsletter Section */}

        {/* Footer Main Section */}
        <div className="px-4 lg:px-20 pt-20 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
          {/* Logo & Description */}
          <div>
            <div className="text-white flex items-center font-bold text-xl">
              <FaDumbbell /> {userDetails?.ecosystemName}
            </div>
            <p className="text-gray-300 leading-relaxed">
              {sanitizeContent(details && details.footer.title1)}
            </p>
            <div className="mt-4">
              <p className="font-bold mb-2">Our Socials</p>
              <div className="flex gap-4">
                <a href="#" className="bg-pink-600 p-2 rounded">
                  <FaFacebookF />
                </a>
                <a href="#" className="bg-pink-600 p-2 rounded">
                  <FaTwitter />
                </a>
                <a href="#" className="bg-pink-600 p-2 rounded">
                  <FaInstagram />
                </a>
                <a href="#" className="bg-pink-600 p-2 rounded">
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

          {/* Blog Posts */}
          <div>
            <h4 className="text-xl font-bold mb-4 relative after:block after:w-10 after:h-[2px] after:bg-pink-600 after:mt-1">
              Blog Posts
            </h4>
            <div className="mb-6">
              <p className="font-semibold">The Philosophy Of Best Fitness.</p>
              <p className="text-pink-600 text-sm">JUNE 18, 2023</p>
            </div>
            <div>
              <p className="font-semibold">Best 50 Tips For Heavy Fitness.</p>
              <p className="text-pink-600 text-sm">AUGUST 22, 2023</p>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-xl font-bold mb-4 relative after:block after:w-10 after:h-[2px] after:bg-pink-600 after:mt-1">
              Locations
            </h4>
            <p className="font-bold"> {userDetails?.state}</p>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {userDetails?.address}, {userDetails?.state},{" "}
              {userDetails?.country}
            </p>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-xl font-bold mb-4 relative after:block after:w-10 after:h-[2px] after:bg-pink-600 after:mt-1">
              Working Hours
            </h4>
            <p className="mb-1">
              {sanitizeContent(details && details.contactUs.heading5)} <br />
              <span className="text-pink-600 font-semibold">
                {sanitizeContent(details && details.contactUs.heading4)}
              </span>
            </p>
            <p className="mb-1">
              {sanitizeContent(details && details.contactUs.heading3)} <br />
              <span className="text-pink-600 font-semibold">
                {sanitizeContent(details && details.contactUs.heading2)}
              </span>
            </p>
            <p className="mb-1">
              {sanitizeContent(details && details.contactUs.heading1)}
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-10 py-4 text-center text-sm text-gray-400">
          Copyright © 2025 <span className="text-pink-600">Dimpified</span>. All
          rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default FifthGym;
