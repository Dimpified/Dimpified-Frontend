import React, { useState } from "react";
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
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
const testimonials = [
  {
    id: 1,
    image: "https://gfa-tech.com/dimp-template-images/barber/styling2.jpg",
    name: "Adesuwa O.",
    role: "Client",
    comment: `"Devon transformed my natural hair into a masterpiece! Their attention to detail and care for Afro-textured hair is unmatched. Highly recommend them for anyone looking for a premium haircare experience."`,
  },
  {
    id: 2,
    image: "https://gfa-tech.com/dimp-template-images/barber/styling1.jpg",
    name: "Chidi A.",
    role: "Entrepreneur",
    comment: `"I never thought my hair could look this sleek and manageable! The milk rebonding service at Devon is a game-changer, and their stylists are truly experts in working with diverse hair types."`,
  },
  {
    id: 3,
    image: "https://gfa-tech.com/dimp-template-images/barber/styling4.jpg",
    name: "Funmi T.",
    role: "Model",
    comment: `"From consultation to the final style, the team at Devon delivered beyond my expectations. They understood exactly what I wanted and made me feel confident and beautiful."`,
  },
];

const products = [
  {
    id: 1,
    img: "https://gfa-tech.com/dimp-template-images/barber/styling3.jpg",
    label: "NEW",
    price: 80,
    oldPrice: 100,
  },
  {
    id: 2,
    img: "https://gfa-tech.com/dimp-template-images/barber/styling4.jpg",
    label: "NEW",
    price: 80,
    oldPrice: 100,
  },
  {
    id: 3,
    img: "https://gfa-tech.com/dimp-template-images/barber/styling5.jpg",
    label: "-50%",
    price: 80,
    oldPrice: 100,
  },
  {
    id: 4,
    img: "https://gfa-tech.com/dimp-template-images/barber/styling6.jpg",
    label: "NEW",
    price: 80,
    oldPrice: 100,
  },
  {
    id: 5,
    img: "https://gfa-tech.com/dimp-template-images/barber/styling2.jpg",
    label: "",
    price: 80,
    oldPrice: 100,
  },
  {
    id: 6,
    img: "https://gfa-tech.com/dimp-template-images/barber/styling8.jpg",
    label: "-50%",
    price: 80,
    oldPrice: 100,
  },
  {
    id: 7,
    img: "https://gfa-tech.com/dimp-template-images/barber/styling9.jpg",
    label: "",
    price: 80,
    oldPrice: 100,
  },
];

// App Component
const SecondStylist = ({ userDetails }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - 4 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 4 >= products.length ? 0 : prevIndex + 1
    );
  };
  const [activeTab, setActiveTab] = useState("ALL");

  // Tabs data
  const tabs = ["ALL", "MAKEUP", "MASSAGE", "HAIR", "FACIAL"];

  // Simulate tab refresh effect
  const [loading, setLoading] = useState(false);

  const handleTabClick = (tab) => {
    setLoading(true);
    setTimeout(() => {
      setActiveTab(tab);
      setLoading(false);
    }, 200);
  };

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
                  src="https://gfa-tech.com/dimp-template-images/barber/logo.png"
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
              New
            </h1>
            <h2 className="text-4xl font-Prata md:text-8xl font-bold text-black leading-snug">
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}
              <br /> Hair Salon
            </h2>
            <p className="text-gray-700 text-lg tracking-wide">
              Giving the best treatment to hair
            </p>
            <div className="flex  space-x-4">
              <button
                onClick={handleModalOpen}
                className="bg-[#6D4032] text-white px-8 py-3 rounded-full hover:bg-[#5A3426] transition"
              >
                Book Appointment
              </button>
            </div>
            {/* {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
              />
            )} */}
          </div>

          {/* Right Section */}
          <div className="md:w-1/2 hidden md:block relative">
            <img
              src="https://gfa-tech.com/dimp-template-images/barber/styling-bg.png"
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
                src="https://gfa-tech.com/dimp-template-images/barber/styling3.jpg"
                alt="About Us"
                className="w-full h-auto object-cover"
              />
            </div>
            <h4 className="absolute font-bold -left-12 top-1/2 transform -rotate-90 text-brown-700 text-xl tracking-wider">
              ABOUT US
            </h4>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-6/12 py-6 px-4">
            <div>
              <h2 className="text-4xl font-Prata font-bold text-[#5e3824] mb-4">
                20+ Years Of Experience
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                Trust your look to expert hands on your special day. Explore our
                hairstyling gallery for inspiration.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed mb-10">
                {userDetails && userDetails.ecosystemDescription
                  ? userDetails.ecosystemDescription
                  : ""}
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
          {/* <div className="flex flex-wrap gap-6 justify-center px-4">
            {HairSalon.slice(0, 4).map((service, index) => (
              <div
                key={index}
                className="w-full max-w-[250px]hover:shadow-lg sm:w-[45%] md:w-[30%] lg:w-[20%]"
              >
              
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
                 
                  <div className="absolute inset-0 flex justify-center items-end gap-4 pb-4 opacity-0 hover:opacity-100 transition">
                    <button
                      onClick={handleModalOpen}
                      className="bg-[#6D4032] text-white px-8 py-3 rounded-full hover:bg-[#5A3426] transition"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>

                
                <div className="p-4 text-center">
                  <h6 className="font-semibold text-gray-700">
                    {service.shortDescription}
                  </h6>
                  <h6 className="text-gray-500">
                    <span className="text-red-500 font-bold">
                      {getFormattedPrice(service.price, countryCode)}
                    </span>
                  </h6>
                </div>
              </div>
            ))}
          </div> */}
        </div>
      </section>
      <section className="w-full py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Title Section */}
          <div className="text-center mb-10">
            <h5 className="text-[#b6784f] font-serif italic">Work</h5>
            <h2 className="text-4xl font-Prata font-bold text-[#5e2f1e]">
              Opening Hours
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
                        Hair treatment
                      </p>
                    </td>
                    <td className="p-6 text-center border-b border-[#E9D6BE]">
                      <div className="text-4xl mb-2 text-[#b6784f]">💨</div>
                      <p className="text-[#b6784f] capitalize font-medium">
                        Hair Drying
                      </p>
                    </td>
                    <td className="border-t-0 border-r-0 p-6 text-center border-l border-b border-[#E9D6BE]">
                      <div className="text-4xl mb-2 text-[#b6784f]">✂️</div>
                      <p className="text-[#b6784f] capitalize font-medium">
                        Hair cutting
                      </p>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr>
                    <td className="border-b-0 border-l-0 p-6 text-center border-r border-t border-[#E9D6BE]">
                      <div className="text-4xl mb-2 text-[#b6784f]">💇</div>
                      <p className="text-[#b6784f] capitalize font-medium">
                        Hair Straighter
                      </p>
                    </td>
                    <td className="p-6 text-center border-t border-[#E9D6BE]">
                      <div className="text-4xl mb-2 text-[#b6784f]">💨</div>
                      <p className="text-[#b6784f] capitalize font-medium">
                        Hair Dryer
                      </p>
                    </td>
                    <td className="border-b-0 border-r-0 p-6 text-center border-l border-t border-[#E9D6BE]">
                      <div className="text-4xl mb-2 text-[#b6784f]">🧖</div>
                      <p className="text-[#b6784f] capitalize font-medium">
                        Hair Dyeing
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
                    Working Days
                  </span>
                  <span className="font-semibold text-[#b6784f]">
                    Mon To Sat
                  </span>
                </li>
                <li className="flex justify-between border-b pb-2 border-[#E9D6BE]">
                  <span className="capitalize font-medium text-[#b6784f]">
                    Working Hours
                  </span>
                  <span className="font-semibold text-[#b6784f]">
                    10am To 9pm
                  </span>
                </li>
                <li className="flex justify-between border-b pb-2 border-[#E9D6BE]">
                  <span className="capitalize font-medium text-[#b6784f]">
                    Saturday
                  </span>
                  <span className="font-semibold text-[#b6784f]">
                    10am To 4pm
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="capitalize font-medium text-[#b6784f]">
                    Sunday
                  </span>
                  <span className="font-semibold text-[#b6784f]">Closed</span>
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
              Our Services and Pricing
            </h2>
            <p className="text-gray-700 text-lg leading-loose pb-16">
              At Devon, we specialize in stunning hairstyles that celebrate your
              beauty, from traditional braids and cornrows to flawless weaves,
              wig installations, natural hair care, and vibrant hair coloring.
              Our professional stylists deliver top-notch services in a
              welcoming environment at affordable prices.
            </p>
            {""}
            <a
              href="#prices"
              className="bg-[#5e2f1e] text-white py-3 px-6 mt-16 uppercase font-medium rounded-full"
            >
              View all
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
                src="https://gfa-tech.com/dimp-template-images/barber/styling2.jpg"
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
          {/* {loading ? (
            <div className="text-center text-gray-500 animate-pulse">
              Loading...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {HairSalon.slice(0, 12).map((service, index) => (
                <div key={index} className="overflow-hidden group relative">
             
                  <div className="relative">
                    <img
                      src={service.serviceImage}
                      alt={service.name}
                      className="w-full h-100 object-cover"
                    />
                   
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

                  
                  <div className="p-4 text-center">
                    <h6 className="text-[#5e2f1e] font-semibold mb-2">
                      {service.name}
                    </h6>
                    <div className="text-gray-600">
                      <del className="text-sm mr-2">
                        #{service.price + service.price * 0.2}
                      </del>
                      <span className="text-lg font-bold text-gray-800">
                        {getFormattedPrice(service.price, countryCode)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )} */}
        </div>
      </section>
      <section className="relative bg-gradient-to-r from-[#e8d3b8] to-[#e8d3b8] w-full py-10">
        <div className="max-w-7xl  flex flex-col md:flex-row items-center">
          {/* Left side - Product Images */}
          <div className="flex justify-center md:justify-center items-center w-full md:w-1/2 relative">
            <img
              src="https://gfa-tech.com/dimp-template-images/barber/styling12.jpg"
              alt="Main Product"
              className="w-36 md:w-64 xl:w-72 rounded-full"
            />
          </div>

          {/* Right side - Content */}
          <div className="w-full md:w-1/2 text-center md:text-left px-6 md:px-1">
            <h2 className="text-4xl font-serif text-[#5e2c1d] mb-4">
              Transform Your Look with a Stylish Hair styling & braiding at{" "}
              <span className="italic font-semibold">Devon</span>.
            </h2>
            <p className="text-[#5e2c1d] text-lg leading-relaxed mb-6">
              Elevate your hair game with our expert stylists. Whether you're
              after sleek, smooth locks or a bold new cut, Devon has you
              covered. Experience premium care tailored just for you.
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
                    {currentTestimonial.comment}
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
                      {currentTestimonial.name}
                    </h6>
                    <p className="mb-0 pl-4 text-sm text-gray-500">
                      {currentTestimonial.role}
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
              "https://gfa-tech.com/dimp-template-images/barber/styling1.jpg",
              "https://gfa-tech.com/dimp-template-images/barber/styling2.jpg",
              "https://gfa-tech.com/dimp-template-images/barber/styling3.jpg",
              "https://gfa-tech.com/dimp-template-images/barber/styling4.jpg",
              "https://gfa-tech.com/dimp-template-images/barber/styling5.jpg",
              "https://gfa-tech.com/dimp-template-images/barber/styling6.jpg",
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
                src="https://gfa-tech.com/dimp-template-images/barber/logo.png"
                alt="Logo"
                className="w-32"
              />
            </div>
            <p className="text-lg">
              Trust your look to expert hands on your special day. Explore our
              hairstyling gallery for inspiration.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="text-lg">
                <FaFacebookF />
              </a>
              <a href="#" className="text-lg">
                <FaTwitter />
              </a>
              <a href="#" className="text-lg">
                <FaLinkedinIn />
              </a>
              <a href="#" className="text-lg">
                <FaYoutube />
              </a>
            </div>
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
              <img
                src="https://gfa-tech.com/dimp-template-images/barber/styling10.jpg"
                alt="Portfolio"
                className="w-full h-16 object-cover"
              />
              <img
                src="https://gfa-tech.com/dimp-template-images/barber/styling11.jpg"
                alt="Portfolio"
                className="w-full h-16 object-cover"
              />
              <img
                src="https://gfa-tech.com/dimp-template-images/barber/styling2.jpg"
                alt="Portfolio"
                className="w-full h-16 object-cover"
              />
              <img
                src="https://gfa-tech.com/dimp-template-images/barber/styling9.jpg"
                alt="Portfolio"
                className="w-full h-16 object-cover"
              />
              <img
                src="https://gfa-tech.com/dimp-template-images/barber/styling6.jpg"
                alt="Portfolio"
                className="w-full h-16 object-cover"
              />
              <img
                src="https://gfa-tech.com/dimp-template-images/barber/styling8.jpg"
                alt="Portfolio"
                className="w-full h-16 object-cover"
              />
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h5 className="text-lg font-semibold mb-4">Contact Us</h5>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt />{" "}
                {userDetails && userDetails.address && userDetails.address}
              </li>
              <li className="flex items-center gap-2">
                <FaPhone /> Call Us: 123-456-7898
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
