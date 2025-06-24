import React, { useState, useEffect, useRef } from "react";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaPaintBrush,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";

import { MakeUp } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { GiPencilBrush, GiWomanElfFace } from "react-icons/gi";
import { IoIosBrush } from "react-icons/io";
import { BsPaletteFill } from "react-icons/bs";
import { IoColorPalette } from "react-icons/io5";
import { FaMaskFace } from "react-icons/fa6";

const FourthMakeup = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const currentYear = new Date().getFullYear();

  const teamMembers = [
    {
      name: "Chioma Adebayo",
      designation: "Lead Makeup Artist",
      image: "https://gfa-tech.com/dimp-template-images/spa/teama.jpg",
      link: "#team",
    },
    {
      name: "Temi Ogunleye",
      designation: "Bridal Specialist",
      image: "https://gfa-tech.com/dimp-template-images/spa/teamb.jpg",
      link: "#team",
    },
    {
      name: "Aisha Mohammed",
      designation: "Editorial Artist",
      image: "https://gfa-tech.com/dimp-template-images/spa/teamc.jpg",
      link: "#team",
    },
    {
      name: "Funke Alade",
      designation: "Skincare Expert",
      image: "https://gfa-tech.com/dimp-template-images/spa/teamb.jpg",
      link: "#team",
    },
  ];

  const testimonials = [
    {
      name: "Nkechi Okoye",
      role: "Bride",
      quote:
        "My bridal makeup was pure magic! I looked like a queen at my traditional wedding. The team made me feel so special.",
      image:
        "https://gfa-tech.com/dimp-template-images/make-up/fredia-testi2.png",
    },
    {
      name: "Amaka Eze",
      role: "Model",
      quote:
        "The editorial makeup for my Ankara shoot was flawless. It lasted through hours of shooting under Lagos heat!",
      image:
        "https://gfa-tech.com/dimp-template-images/make-up/fredia-testi.png",
    },
    {
      name: "Bisi Afolabi",
      role: "Client",
      quote:
        "I got my makeup done for an owambe, and I was the talk of the party! Naija Glam never disappoints.",
      image:
        "https://gfa-tech.com/dimp-template-images/make-up/fredia-testi3.png",
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-black text-white ${
          scrolled ? "md:bg-black" : "md:bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8  py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#DE968D] font-bold text-xl">
            <FaPaintBrush className="text-[#DE968D]" />
            <span>NaijaGlam</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm uppercase tracking-wider">
            {[
              "home",
              "about",
              "services",
              "team",
              "testimonials",

              "contact",
            ].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => scrollToSection(section)}
                className="hover:text-[#DE968D]"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
          </nav>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white text-2xl focus:outline-none"
            >
              <i
                className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}
              ></i>
            </button>
          </div>
          <button
            onClick={handleModalOpen}
            className="hidden md:inline-block bg-[#DE968D] hover:bg-white hover:text-black text-white px-7 py-4 rounded-full text-m font-semibold"
          >
            Book Now
          </button>
        </div>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black text-white text-center py-4">
            {[
              "home",
              "about",
              "services",
              "team",
              "testimonials",

              "contact",
            ].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                onClick={() => scrollToSection(section)}
                className="block py-2 hover:text-[#DE968D]"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            ))}
            <button
              onClick={handleModalOpen}
              className="inline-block mt-3 bg-[#DE968D] hover:bg-white hover:text-black text-white px-5 py-2 rounded-full text-m font-semibold"
            >
              Book Now
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className={`relative transition-all duration-300 ${
          isMobileMenuOpen ? "mt-[290px]" : "mt-0"
        } h-[80vh] md:h-screen`}
      >
        <div
          className="relative h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty7.jpg')",
          }}
        >
          {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )}
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative z-10 h-full flex items-center  text-start px-4 md:px-32">
            <div className="w-full lg:w-1/2  px-6">
              <h5 className="text-[#DE968D] text-sm uppercase mb-4 tracking-wider">
                Welcome to Naija Glam Studio
              </h5>
              <h1 className="text-4xl text-white md:text-6xl font-bold leading-tight mb-6">
                Naija Glam: Unleash Your Inner Queen
              </h1>
              <p className="text-white mb-6 text-base leading-relaxed">
                Experience the magic of professional makeup artistry. Whether
                it's a bridal look, red carpet glam, or a flawless everyday
                glow, our expert touch enhances your natural beauty.
              </p>
              <a
                href="#services"
                className="inline-block bg-[#DE968D] hover:bg-white hover:text-black text-white font-semibold px-6 py-3 rounded-full transition"
              >
                Our Services →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative  bg-white">
        <div className="flex md:flex-col md:px-24 lg:px-32 py-10  px-4 flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 flex justify-center item-center">
            <div className="relative">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/makeup06.jpg"
                alt="main graphic"
                className="relative  w-full rounded-full  max-w-md"
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="mb-6">
              <h6 className="text-[#DE968D] font-semibold text-sm flex  gap-2">
                <i className="solox-icons-two-logo"></i> ABOUT US
              </h6>
              <h3 className="text-3xl lg:text-4xl font-bold mt-2">
                Naija Glam: Nigeria’s Finest Makeup Experts
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Based in Lagos, we bring out your inner beauty with makeup
              inspired by Nigerian culture. From owambe to bridal looks, our
              skilled artists create stunning transformations.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="solox-icons-two-check text-[#DE968D]"></span>{" "}
                  Fast & Easy Booking
                </li>
                <li className="flex items-center gap-2">
                  <span className="solox-icons-two-check text-[#DE968D]"></span>{" "}
                  Affordable Prices
                </li>
                <li className="flex items-center gap-2">
                  <span className="solox-icons-two-check text-[#DE968D]"></span>{" "}
                  Personalized Looks
                </li>
              </ul>
              <div className="flex items-start gap-3">
                <div className="text-[#DE968D] text-2xl">
                  <span className="solox-icons-two-alarm"></span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Opening Hours</h3>
                  <div className="text-gray-600">
                    <p>Monday to Saturday</p>
                    <p className="font-semibold">10:00 AM - 7:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleModalOpen}
              className="inline-block mt-3 bg-[#DE968D] hover:border-[#DE968D] hover:text-black text-white px-5 py-2 rounded-full text-m font-semibold"
            >
              Book Now
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-[#fdf6f0]">
        <div className="flex flex-col md:px-24 lg:px-32   px-4 sm:px-6 ">
          <div className="text-center mb-12">
            <h6 className="text-[#DE968D] text-sm uppercase flex items-center justify-center gap-2">
              <i className="solox-icons-two-logo"></i> OUR SERVICES
            </h6>
            <h3 className="text-3xl md:text-4xl font-bold">
              Tailored Makeup Services for Every Naija Queen
            </h3>
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MakeUp.map((service, index) => (
              <div
                key={index}
                className="rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
              >
                <div className="relative">
                  <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-full h-64  rounded-xl object-cover"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {service.shortDescription}
                  </p>
                  <button
                    onClick={handleModalOpen}
                    className="inline-flex items-center bg-[#DE968D] text-white px-4 py-2 rounded-full font-semibold hover:bg-white hover:text-black hover:border hover:border-[#DE968D] transition"
                  >
                    Book Now{" "}
                    <i className="ml-2 solox-icons-two-up-right-arrow"></i>
                  </button>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="flex flex-col md:px-24 lg:px-32   px-4 sm:px-6 ">
          <div className="text-center mb-12">
            <h6 className="text-[#DE968D] text-sm uppercase flex items-center justify-center gap-2">
              <i className="solox-icons-two-logo"></i> OUR PRICING
            </h6>
            <h3 className="text-3xl md:text-4xl font-bold">
              Affordable Glam for Every Budget
            </h3>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {MakeUp.map((service, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b border-gray-300 pb-6"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 capitalize">
                    {service.name}
                  </h3>
                  <button
                    onClick={handleModalOpen}
                    className="inline-block mt-3 bg-[#DE968D] hover:border-[#DE968D] hover:text-black text-white px-5 py-2 rounded-full text-m font-semibold"
                  >
                    Book Now
                  </button>
                </div>

                <div className="text-lg font-bold text-[#DE968D]">
                  {getFormattedPrice(service.price, countryCode)}
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        id="why-choose-us"
        className="relative bg-[#FFF6F5] py-20 overflow-hidden"
      >
        <div className="relative z-10  md:flex-col md:px-24 lg:px-32   px-4 sm:px-6  grid grid-cols-1 xl:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col  gap-6">
            <img
              src="https://gfa-tech.com/dimp-template-images/make-up/fredia11.jpg"
              alt="Makeup 1"
              className="rounded-lg shadow-lg w-full sm:w-1/2 object-cover"
            />
            <img
              src="https://gfa-tech.com/dimp-template-images/make-up/fredia2.jpg"
              alt="Makeup 2"
              className="rounded-lg shadow-lg w-full sm:w-1/2 object-cover sm:h-[400px] h-auto"
            />
          </div>
          <div>
            <div className="mb-6">
              <h6 className="text-[#DE968D] text-sm font-semibold flex items-center gap-2">
                <span className="inline-block text-lg">
                  <i className="solox-icons-two-logo"></i>
                </span>{" "}
                WHY CHOOSE US
              </h6>
              <h3 className="text-3xl sm:text-4xl font-semibold text-gray-900 mt-2">
                Why Naija Glam Studio?
              </h3>
            </div>
            <h4 className="text-xl font-semibold text-[#DE968D] mb-4">
              Experience the Best in Nigerian Beauty
            </h4>
            <p className="text-gray-600 mb-6">
              We blend global techniques with Nigerian aesthetics to create
              looks that celebrate your heritage. Our team is passionate about
              making you shine.
            </p>
            <div className="space-y-6">
              {[
                {
                  icon: "solox-icons-two-face-massage",
                  title: "Expert Naija Artists",
                  text: "Our team is trained in the latest trends and Nigerian styles.",
                  link: "#team",
                },
                {
                  icon: "solox-icons-two-discount",
                  title: "Affordable & Friendly",
                  text: "Quality glam at prices that won’t break the bank.",
                  link: "#services",
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="bg-[#F9DCD9] text-[#DE968D] rounded-full p-4 text-xl">
                    <i className={item.icon}></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">
                      <a href={item.link}>{item.title}</a>
                    </h4>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="flex flex-col md:px-24 lg:px-32   px-4 sm:px-6 ">
          <div className="mb-10">
            <h6 className="text-sm font-semibold uppercase flex items-center gap-2">
              <span className="text-lg">
                <i className="solox-icons-two-logo"></i>
              </span>{" "}
              OUR TEAM
            </h6>
            <h3 className="text-3xl sm:text-4xl font-bold">
              Meet Our Naija Glam Artists
            </h3>
          </div>
          <div className="relative">
            <Swiper
              modules={[Navigation, Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              speed={700}
              spaceBetween={20}
              breakpoints={{
                0: { slidesPerView: 2.4 },
                768: { slidesPerView: 2.5 },
                992: { slidesPerView: 2.7 },
                1300: { slidesPerView: 3.2 },
                1500: { slidesPerView: 3.3 },
                1700: { slidesPerView: 3.9 },
              }}
            >
              {teamMembers.map((member, index) => (
                <SwiperSlide key={index}>
                  <div className="p-4">
                    <div className="relative group overflow-hidden shadow-md rounded-md">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full object-cover h-full "
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <span className="text-sm text-gray-500">
                        {member.designation}
                      </span>
                      <h3 className="text-lg font-semibold">
                        <a href={member.link}>{member.name}</a>
                      </h3>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section id="contact" className="py-20 bg-cover bg-center bg-[#fdf6f0]">
        <WhiteContactForm />
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/make-up/makeup01.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-50">
          <div className="flex flex-col md:px-24 lg:px-32   px-4 sm:px-6  py-20">
            <div className="flex flex-col lg:flex-row items-start gap-10">
              <div className="w-full ">
                <div className="mb-8">
                  <h6 className="text-m text-[#DE968D] uppercase mb-2 flex items-center">
                    <i className="solox-icons-two-logo mr-2"></i> TESTIMONIALS
                  </h6>
                  <h3 className="text-3xl sm:text-4xl font-bold text-white">
                    What Our Clients Say
                  </h3>
                </div>
                <div className="relative">
                  <button
                    ref={prevRef}
                    className="absolute -left-4 sm:-left-8 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-md hover:bg-[#DE968D] transition-colors"
                  >
                    <FaChevronLeft className="text-gray-800" />
                  </button>
                  <button
                    ref={nextRef}
                    className="absolute -right-4 sm:-right-8 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-md hover:bg-[#DE968D] transition-colors"
                  >
                    <FaChevronRight className="text-gray-800" />
                  </button>
                  <Swiper
                    modules={[Navigation, Autoplay]}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                    }}
                    navigation={{
                      prevEl: prevRef.current,
                      nextEl: nextRef.current,
                    }}
                    spaceBetween={30}
                    slidesPerView={3}
                    loop={true}
                    breakpoints={{
                      0: { slidesPerView: 1.4 },
                      768: { slidesPerView: 1.5 },
                      992: { slidesPerView: 2.4 },
                      1300: { slidesPerView: 3.2 },
                      1500: { slidesPerView: 3.3 },
                      1700: { slidesPerView: 3.9 },
                    }}
                  >
                    {testimonials.map((item, i) => (
                      <SwiperSlide key={i}>
                        <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md text-center">
                          <div className=" mb-4 text-center flex justify-center items-center">
                            {Array(5)
                              .fill(0)
                              .map((_, idx) => (
                                <FaStar
                                  key={idx}
                                  className="text-yellow-500 mr-1"
                                />
                              ))}
                          </div>
                          <p className="text-gray-800 mb-4">{item.quote}</p>
                          <h5 className="text-lg font-semibold text-gray-900">
                            {item.name}
                          </h5>
                          <span className="text-sm text-gray-600">
                            {item.role}
                          </span>
                          <div className="mt- text-center flex justify-center items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section id="gallery" className="py-20 bg-white">
        <div className="flex md:flex-col md:px-24 lg:px-32   px-4 md:px-8 ">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-1">
            {[
              {
                id: 1,
                url: "https://gfa-tech.com/dimp-template-images/make-up/makeup02.jpg",
              },
              {
                id: 2,
                url: "https://gfa-tech.com/dimp-template-images/make-up/makeup03.jpg",
              },
              {
                id: 3,
                url: "https://gfa-tech.com/dimp-template-images/make-up/makeup04.jpg",
              },
              {
                id: 4,
                url: "https://gfa-tech.com/dimp-template-images/make-up/makeup05.jpg",
              },
              {
                id: 5,
                url: "https://gfa-tech.com/dimp-template-images/make-up/makeup06.jpg",
              },
              {
                id: 6,
                url: "https://gfa-tech.com/dimp-template-images/make-up/makeup07.jpg",
              },
            ].map(({ id, url }) => (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden"
                style={{ paddingBottom: "100%" }}
              >
                <img
                  src={url}
                  alt={`Instagram post ${id}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06..."
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#1E1C1C] text-white">
        <div className="relative z-10 py-10 px-4 md:px-8 ">
          <div className="md:flex-col md:px-24 lg:px-32   grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-2 text-[#DE968D] font-bold text-xl">
                <FaPaintBrush className="text-[#DE968D]" />
                <span>NaijaGlam</span>
              </div>
              <p className="mb-6 text-gray-300">
                Naija Glam Studio, based in Lagos, is your go-to for makeup that
                celebrates Nigerian beauty. From owambe to bridal looks, we’ve
                got you covered.
              </p>
              <button
                onClick={handleModalOpen}
                className="inline-flex items-center bg-[#DE968D] text-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-black transition"
              >
                BOOK NOW <i className="ml-2 solox-icons-two-up-right-arrow"></i>
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Our Services</h2>
              <ul className="space-y-2 text-gray-300">
                <li>
                  <a href="#" className="hover:text-[#DE968D]">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#DE968D]">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#DE968D]">
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-[#DE968D]">
                    Gallery
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Opening Time</h2>
              <ul className="space-y-2 text-gray-300">
                <li className="flex justify-between">
                  <span>Mon - Sat</span>
                  <span>10:00am - 7:00pm</span>
                </li>
                <li className="flex justify-between">
                  <span>Sun</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Get In Touch</h2>
              <p className="mb-4 text-gray-300">
                123 Lekki Phase 1, Lagos, Nigeria
              </p>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <i className="solox-icons-two-paper-plane"></i>
                  <a
                    href="mailto:info@naijaglam.com"
                    className="hover:text-[#DE968D]"
                  >
                    info@naijaglam.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <i className="solox-icons-two-phone-call"></i>
                  <a
                    href="tel:+234 123 456 7890"
                    className="hover:text-[#DE968D]"
                  >
                    +234 123 456 7890
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-16 flex justify-center items-center border-t border-gray-600 pt-6">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Built with{" "}
              <a href="https://dimpified.com" className="hover:text-black">
                Dimpified
              </a>{" "}
              . All Rights Reserved.{" "}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FourthMakeup;
