import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import {
  FaPhone,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPlay,
  FaCut,
  FaShower,
  FaHandScissors,
  FaSprayCan,
  FaSpa,
  FaHeart,
  FaPhoneAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { barber } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

const testimonials = [
  {
    name: "Emeka Chukwu",
    position: "Entrepreneur",
    testimonial:
      "Since I discovered Ray's Haircut, my look has been on point. Their attention to detail and professionalism are unmatched. I always leave feeling confident and ready to face the day.",
    image:
      "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber3.jpg",
    rating: 5,
  },
  {
    name: "Bola Adewale",
    position: "Student",
    testimonial:
      "Ray's Haircut is hands down the best in Lagos. From the customer service to the sharp fades, they never disappoint. My friends always compliment my haircut!",
    image:
      "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber5.jpg",
    rating: 4.8,
  },
  {
    name: "Ahmed Yusuf",
    position: "Banker",
    testimonial:
      "As someone with a busy schedule, Ray's Haircut' efficiency is a lifesaver. They combine speed with quality, and I always get a clean, professional look for work.",
    image:
      "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber10.jpg",
    rating: 4.9,
  },
];

const images = [
  "https://gfa-tech.com/dimp-template-images/barber/hair.jpg",
  "https://gfa-tech.com/dimp-template-images/barber/dye.jpeg",
  "https://gfa-tech.com/dimp-template-images/barber/plait.jpg",
  "https://gfa-tech.com/dimp-template-images/barber/weaving.jpg",
  "https://gfa-tech.com/dimp-template-images/barber/fade.jpg",
  "https://gfa-tech.com/dimp-template-images/barber/barb.jpg",
];

const services = [
  {
    title: "Hair Cutting",
    icon: <FaCut className="text-yellow-500 text-4xl mb-4" />,
    description:
      "Expert barbers offering classic and modern Nigerian hairstyles.",
  },
  {
    title: "Beard Grooming",
    icon: <FaHandScissors className="text-yellow-500 text-4xl mb-4" />,
    description: "Keep your beard looking sharp with our grooming services.",
  },
  {
    title: "Hair Dye",
    icon: <FaSprayCan className="text-yellow-500 text-4xl mb-4" />,
    description: "Indulge in our stunning hair dye for a fresh look.",
  },
  {
    title: "Body Treatments",
    icon: <FaHeart className="text-yellow-500 text-4xl mb-4" />,
    description: "Affordable body treatments designed for your wellness.",
  },
];

const BarberFourth = ({ userDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
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
    <div className="bg-black font-Urbanist">
      <header className=" shadow">
        <div className="flex flex-col">
          {/* Top Header */}

          {/* Navbar */}
          <div className="md:px-10   flex flex-wrap justify-between text-white items-center py-4">
            <a href="#" className="text-xl font-Raj font-bold text-yellow-500">
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}
            </a>
            <nav className="hidden md:flex space-x-6 uppercase font-bold">
              <a href="#" className=" hover:text-yellow-500">
                Home
              </a>
              <a href="#services" className=" hover:text-yellow-500">
                Services
              </a>
              <a href="#pricing" className=" hover:text-yellow-500">
                Pricing
              </a>
              <a href="#gallery" className=" hover:text-yellow-500">
                Gallery
              </a>
              <a href="#reviews" className=" hover:text-yellow-500">
                Testimonials
              </a>
            </nav>
            <button
              onClick={handleModalOpen}
              className="rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white p-4 hidden md:block"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </header>
      <section
        className="relative bg-cover bg-black bg-center py-32 h-[400px] lg:h-screen"
        style={{
          backgroundImage: `url('https://gfa-tech.com/dimp-template-images/barber/barber-bg3.jpg')`,
        }}
      >
        <div className="container mx-auto flex flex-wrap justify-between items-center text-white">
          <div className="w-full md:w-2/3">
            <h1 className="text-8xl font-Raj font-bold uppercase mb-4">
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}{" "}
              <br /> Haircut
            </h1>
            <p className="mt-4 mb-6 text-lg">
              Experience precision haircuts, professional styling, and premium
              grooming services tailored just for you.
            </p>
            <a
              href="#services"
              className="bg-yellow-500 text-lg font-bold text-white px-6 py-4 rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Explore Our Services
            </a>
          </div>
          {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )}

          <div className="w-full md:w-1/3 flex justify-end">
            <button
              onClick={handleModalOpen}
              className="text-6xl text-yellow-500 rounded-full bg-white p-8 shadow-lg hover:scale-105 transition duration-300"
            >
              <FaCalendarCheck />
            </button>
          </div>
        </div>
      </section>

      <section id="about" className="bg-white border-l border-gray-600 py-16">
        <div className="container mx-auto flex flex-wrap">
          {/* Left Image */}
          <div className="w-full lg:w-1/2">
            <img
              src="https://gfa-tech.com/dimp-template-images/barber/hair.jpg"
              alt="Barber at work"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center p-6">
            <h2 className="text-3xl font-bold font-Raj mb-4 text-gray-900">
              About Us
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              {userDetails && userDetails.ecosystemDescription
                ? userDetails.ecosystemDescription
                : ""}
            </p>

            <div className="grid grid-cols-2 gap-6">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition duration-300"
                >
                  {service.icon}
                  <h4 className="font-bold text-lg mb-2 text-gray-800">
                    {service.title}
                  </h4>
                  <p className="text-gray-500 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 lg:px-24 px-4">
        <div className="flex  flex-wrap items-center">
          {/* Left Image */}
          <div className="flex flex-col w-full md:w-3/12 p-4">
            <img
              src="https://gfa-tech.com/dimp-template-images/barber//barbernew/barber3.jpg"
              alt="Traditional Nigerian Haircut"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
          {/* Center Content */}
          <div className=" flex flex-col w-full md:w-6/12 p-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              WE'RE THE BEST BARBERS <br /> IN LAGOS
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At <span className="font-semibold">Ray's Haircut</span>, we
              celebrate the rich cultural heritage of Nigerian grooming. From
              classic fades to intricate tribal patterns, our skilled barbers
              bring your style to life. Enjoy a comfortab6le, modern salon
              experience infused with the vibrant energy of Lagos.
            </p>
          </div>
          {/* Right Image */}
          <div className=" flex-col w-full md:w-3/12 p-4">
            <img
              src="https://gfa-tech.com/dimp-template-images/barber//barbernew/barber4.jpg"
              alt="Barber in Lagos"
              className="w-full  object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>
      
      {/* <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 items-center bg-yellow-500 py-12 lg:px-80 px-6">
        <h2 className="text-3xl font-Raj font-bold uppercase text-white text-center  ">
          Ready to Get Our Service?{" "}
        </h2>
        <button
          onClick={handleModalOpen}
          className="ms-12 bg-white text-black font-normal text-sm px-6 py-4 rounded-md outline-4 hover:bg-orange-600"
        >
          Book Appointment
        </button>
      </section> */}
      {/* <section id="services" className=" bg-white  py-4 lg:py-24">
        <div className="text-center">
          <h3 className="text-4xl uppercase font-bold mb-4">
            Services We Provide
          </h3>
          <p className="text-gray-600 mb-8">
            Experience top-notch services tailored to your needs with a Nigerian
            touch.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {barber.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-white mt-4 shadow-sm py-6 lg:w-72 w-96 "
            >
              <button onClick={handleModalOpen}>
                <img src={service.serviceImage} className="rounded-lg" />
              </button>
              <button onClick={handleModalOpen}>
                <h4 className="text-xl px-4 font-bold mt-4 items-start">
                  {service.name}
                </h4>
              </button>
              <p className="px-4 text-center">{service.shortDescription}</p>
              <button
                onClick={handleModalOpen}
                className="flex items-center text-yellow-600 hover:text-white  gap-2 rounded-md p-4 bg-yellow-50 mt-12 hover:bg-yellow-500 transition"
              >
                <h1 className="text-lg transition">Book Now</h1>
                <FaCalendarCheck className=" transition" />
              </button>
            </div>
          ))}
        </div>
      </section> */}
      {/* <section id="pricing">
        <div className="flex flex-col items-center bg-yellow-800 py-12 lg:py-32 px-6">
          <h2 className="text-4xl font-Raj uppercase text-white font-bold text-center mb-6">
            Awesome Pricing Plan
          </h2>
          <p className="text-center text-white mb-8">
            Discover affordable, top-notch services inspired by Nigerian
            traditions.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:px-32 ">
            {barber.map((service, index) => (
              <div
                key={index}
                className={`flex items-center p-4 rounded-md ${
                  index % 2 === 0 ? "bg-yellow-50" : "bg-white"
                } shadow`}
              >
                
                {service.serviceImage && (
                  <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-20 h-20 object-cover rounded-full mr-4"
                  />
                )}
                
                <div className="flex-1">
                  <h5 className="text-lg font-semibold text-gray-800">
                    {service.name}
                  </h5>
                  <p className="text-sm text-gray-500">
                    {service.shortDescription}
                  </p>
                </div>
                
                <div className="text-yellow-500 font-bold text-xl">
                  {getFormattedPrice(service.price, countryCode)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
      <section
        id="gallery"
        className="bg-yellow-50 font-Urbanist py-10 px-4 lg:px-16 lg:py-20  overflow-hidden w-full max-w-screen-xl"
      >
        <div className="flex flex-wrap items-end justify-center mb-5 text-center md:text-start">
          <div className="xl:w-7/12 lg:w-5/12 md:w-10/12">
            <h1 className="text-4xl font-Raj font-bold mb-4 uppercase">
              LATEST HAIRCUT STYLES
            </h1>
          </div>
          <div className="xl:w-5/12 lg:w-7/12 md:w-10/12 ">
            {" "}
            <button
              onClick={handleModalOpen}
              className="ms-12 border-2 border-gray-800 text-black font-normal text-sm px-6 py-4 justify-end rounded-md outline-4 hover:bg-orange-400"
            >
              Book Appointment
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          // navigation
          // pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="!pb-12 !w-full"
        >
          {" "}
          {images.map((image, index) => (
            <SwiperSlide>
              <div className="relative bg-white  overflow-hidden h-80">
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg transition-transform hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <section
        id="reviews"
        className="py-16 bg-gray-50 lg:px-16 px-4 w-full max-w-screen-xl"
      >
        <h2 className="text-center text-3xl font-semibold text-gray-800 mb-8">
          What Our Clients Say
        </h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30} // Adjust spacing for better layout
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 }, // Mobile (default)
            768: { slidesPerView: 2 }, // Tablets & Laptops
            1024: { slidesPerView: 2 }, // Desktops
          }}
          className="flex flex-col !pb-12 !w-full"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="flex justify-center items-center"
            >
              <div className="flex flex-col md:flex-row h-[350px] overflow-hidden shadow-2xl">
                {/* Image Section */}
                <div
                  className="w-full md:w-1/2 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${testimonial.image})`,
                  }}
                ></div>

                {/* Content Section */}
                <div className="w-full md:w-1/2 bg-white p-6 flex flex-col justify-center items-start">
                  {/* Rating */}
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill={i < testimonial.rating ? "#f39c12" : "#e0e0e0"}
                        viewBox="0 0 20 20"
                        className="w-5 h-5 mr-1"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.049 2.927a1 1 0 011.902 0l1.645 3.33 3.68.268a1 1 0 01.55 1.806l-2.654 2.247.976 3.992a1 1 0 01-1.486 1.053L10 13.3l-3.527 2.274a1 1 0 01-1.487-1.053l.975-3.993-2.653-2.246a1 1 0 01.55-1.806l3.68-.268L9.05 2.927z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-600 mb-4">
                    {testimonial.testimonial}
                  </p>

                  {/* Name */}
                  <div className="mt-4 flex items-center">
                    <span className="h-px w-8 bg-gray-800 mr-3"></span>
                    <a
                      href="#"
                      className="text-gray-800 hover:text-gray-600 text-sm font-medium"
                    >
                      {testimonial.name}
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <div
        id="team"
        className="font-jak bg-yellow-50 flex flex-col p-4 lg:px-32  lg:py-24 "
      >
        {/* Section Header */}
        <div className="flex justify-center mb-3">
          <div className="text-center">
            <span className="font-semibold tracking-[1px] text-base uppercase text-gray-500 mb-1 block">
              Our Team
            </span>
            <h2 className="font-semibold  text-gray-800 text-3xl">
              Get to know our professionals
            </h2>
          </div>
        </div>

        {/* Team Members */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Team Member 1 */}
          <div className="text-center">
            <div className="relative overflow-hidden mb-8">
              <img
                src="https://gfa-tech.com/dimp-template-images/barber//barbernew/barber12.jpg"
                className="h-100 w-100"
                alt="Bryan Johnson"
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">Maleek</h3>
            <p>Barber</p>
          </div>

          {/* Team Member 2 */}
          <div className="text-center">
            <div className="relative overflow-hidden mb-8">
              <img
                src="https://gfa-tech.com/dimp-template-images/barber//barbernew/barber13.jpg"
                alt="Jeremy Dupont"
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">Shade</h3>
            <p>Hair Stylist</p>
          </div>

          {/* Team Member 3 */}
          <div className="text-center">
            <div className="relative overflow-hidden mb-8">
              <img
                src="https://gfa-tech.com/dimp-template-images/barber//barbernew/barber14.jpg"
                alt="Matthew Taylor"
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">Joseph</h3>
            <p>Fade specialist</p>
          </div>

          {/* Team Member 4 */}
          <div className="text-center">
            <div className="relative overflow-hidden mb-8">
              <img
                src="https://gfa-tech.com/dimp-template-images/barber//barbernew/barber15.jpg"
                alt="Johncy Parker"
              />
            </div>
            <h3 className="font-semibold text-gray-800 text-lg">Bola</h3>
            <p>Braid Specialist</p>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 py-10 px-5 lg:px-64 md:px-20">
        <div className="flex flex-col md:flex-row items-center justify-center text-center">
          {/* Left Section */}
          <div className="flex flex-col lg:me-12 items-center justify-center px-12 mb-10 md:mb-0 md:w-5/12 bg-orange-300 h-[500px] text-center">
            <h2 className="text-3xl font-Raj font-bold uppercase text-white mb-4">
              Come & Get Freshness
            </h2>
            <p className="text-white mb-6">
              Experience professional grooming like never before. Our skilled
              barbers provide you with top-notch haircuts and styles to enhance
              your look. Join us today for a premium grooming experience.
            </p>
            <button
              onClick={handleModalOpen}
              className="border-2 border-white text-white font-bold py-2 px-6 rounded"
            >
              Book Appointment
            </button>
          </div>

          {/* Right Section */}
          <div className="relative md:w-7/12">
            <img
              src="https://gfa-tech.com/dimp-template-images/barber//barbernew/barber12.jpg"
              alt="Barber"
              className="w-full h-[500px]  shadow-lg"
            />
            {/* Play Button */}
          </div>
        </div>
      </div>
      <footer className="pt-10 px-4 font-jak bg-black text-white">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-4/12 mb-8">
              {/* about company */}
              <div className="mb-4">
                <h1 className="text-white capitalize font-Raj font-semibold text-2xl">
                  {userDetails && userDetails.ecosystemName}
                </h1>
                <div className="mt-4">
                  <p>
                    At Ray's Haircut, we celebrate the rich cultural heritage of
                    Nigerian grooming. From classic fades to intricate tribal
                    patterns, our skilled barbers bring your style to life.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-2/12 mb-8">
              <h6 className="mb-2 text-white font-bold">BUSINESS</h6>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="https://gfa-tech.com/company/about/index.html"
                    className="text-white hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/pricing" className="text-white hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://media.getfundedafrica.com/"
                    className="text-white hover:text-white"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://gfa-tech.com/company/team/index.html"
                    className="text-white hover:text-white"
                  >
                    Our Team
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full lg:w-2/12 mb-8">
              <h6 className="mb-2 text-white">Socials</h6>
              <ul className="space-y-2">
                <li>
                  <Link to="#" className="text-white hover:text-white">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-white hover:text-white">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>

            <div className="w-full lg:w-4/12 mb-8">
              {/* contact info */}
              <div className="mb-4">
                <h6 className="mb-2 text-white">GET IN TOUCH</h6>
                <p>{userDetails && userDetails.address}</p>

                <p>
                  Phone:{" "}
                  <span className="text-white font-semibold">
                    {userDetails && userDetails.phoneNumber}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 py-4 mt-6 flex justify-between items-center">
            <span>
              {" "}
              © {new Date().getFullYear()} Dimpified. All Rights Reserved
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BarberFourth;
