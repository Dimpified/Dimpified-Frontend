import React, { useState } from "react";
import {
  FaArrowRight,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaBars,
  FaTimes,
  FaBrush,
  FaAngleRight,
} from "react-icons/fa";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FaFaceFlushed } from "react-icons/fa6";

import { MakeUp } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";

const imageUrls = [
  "https://gfa-tech.com/dimp-template-images/make-up/img2.jpg",
  "https://gfa-tech.com/dimp-template-images/make-up/img3.jpg",
  "https://gfa-tech.com/dimp-template-images/make-up/img4.jpg",
  "https://gfa-tech.com/dimp-template-images/make-up/img5.jpg",
  "https://gfa-tech.com/dimp-template-images/make-up/img6.jpg",
  "https://gfa-tech.com/dimp-template-images/make-up/img7.jpg",
  "https://gfa-tech.com/dimp-template-images/make-up/img8.jpg",
  "https://gfa-tech.com/dimp-template-images/make-up/img9.jpg",
];

function PrevButton() {
  const swiper = useSwiper();
  return (
    <div className="mt-10 flex justify-center">
      <button
        onClick={() => swiper.slidePrev()}
        className="bg-white border w-10 h-10 shadow-md hover:bg-gray-100 transition flex items-center justify-center"
      >
        ←
      </button>
    </div>
  );
}

const ThirdMakeup = ({ userDetails }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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
    <div className="font-sans text-gray-800">
      <header className="bg-white shadow px-4 py-3 md:px-8 flex justify-between items-center sticky top-0 z-50">
        {/* Logo */}
        <a href="#home" className="flex items-center">
          <FaFaceFlushed className="text-3xl text-yellow-500" />
          <span className="ml-2 font-bold text-xl">{userDetails?.ecosystemName}</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 font-medium">
          <a href="#home" className="hover:text-yellow-500">
            Home
          </a>
          <a href="#about" className="hover:text-yellow-500">
            About Us
          </a>
          <a href="#services" className="hover:text-yellow-500">
            Our Services
          </a>
          <a href="#portfolio" className="hover:text-yellow-500">
            Portfolio
          </a>
          <a href="#testimonials" className="hover:text-yellow-500">
            Testimonials
          </a>
        </nav>

        {/* Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <button
            onClick={handleModalOpen}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition"
          >
            Book Appointment
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? (
              <FaTimes className="text-2xl" />
            ) : (
              <FaBars className="text-2xl" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg px-4 pt-4 pb-6 space-y-4 font-medium">
          <a
            href="#home"
            className="block hover:text-yellow-700 py-2 border-b"
            onClick={toggleMobileMenu}
          >
            Home
          </a>
          <a
            href="#about"
            className="block hover:text-yellow-700 py-2 border-b"
            onClick={toggleMobileMenu}
          >
            About Us
          </a>
          <a
            href="#services"
            className="block hover:text-yellow-700 py-2 border-b"
            onClick={toggleMobileMenu}
          >
            Our Services
          </a>
          <a
            href="#portfolio"
            className="block hover:text-yellow-700 py-2 border-b"
            onClick={toggleMobileMenu}
          >
            Portfolio
          </a>
          <a
            href="#testimonials"
            className="block hover:text-yellow-700 py-2 border-b"
            onClick={toggleMobileMenu}
          >
            Testimonials
          </a>
          <div className="flex space-x-3 pt-4">
            <button
              onClick={handleModalOpen}
              className="bg-yellow-500 text-white px-4 py-2 rounded-md w-full text-center hover:bg-yellow-600"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="home"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty7.jpg')",
        }}
        className="relative h-[60vh] md:h-screen bg-cover bg-center flex justify-center items-center"
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="text-center space-y-6 px-4 relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 text-white">
            {userDetails?.ecosystemName}: Your Premier Makeup Studio in Lagos
          </h1>
          <p className="mb-8 text-lg text-white max-w-2xl mx-auto">
            Experience world-class makeup artistry with a Nigerian touch. Our
            certified makeup artists specialize in traditional and contemporary
            African beauty styles for all occasions.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleModalOpen}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-md transition duration-300"
            >
              Book a Session
            </button>
            <a
              href="#services"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-md hover:bg-white hover:text-gray-800 transition"
            >
              Our Services
            </a>
          </div>
        </div>
        {/* {isModalOpen && (
          <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
        )} */}
      </section>

      {/* About Us Section */}
      <section id="about" className="py-16 px-4 text-center bg-white">
        <p className="text-xl mb-2 text-yellow-600">About {userDetails?.ecosystemName}</p>
        <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
          Redefining African Beauty Standards
        </h2>
        <p className="max-w-2xl mx-auto mb-12 text-gray-600">
          Founded in Lagos, {userDetails?.ecosystemName} combines international techniques with
          deep understanding of Nigerian skin tones and facial features to
          create stunning looks that celebrate our unique beauty.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 max-w-6xl mx-auto">
          {/* Left Side */}
          <div className="space-y-12">
            <div className="flex flex-col items-center md:items-end text-left md:text-right">
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                alt="icon"
                className="w-6 h-6 mb-2"
              />
              <h3 className="font-extrabold text-lg">African Skin Expertise</h3>
              <p className="max-w-xs text-sm text-gray-600">
                Specialized formulations that perfectly match and enhance
                melanin-rich skin tones.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end text-left md:text-right">
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                alt="icon"
                className="w-6 h-6 mb-2"
              />
              <h3 className="font-extrabold text-lg">Traditional & Modern</h3>
              <p className="max-w-xs text-sm text-gray-600">
                From gele styles to contemporary glam, we master all Nigerian
                beauty aesthetics.
              </p>
            </div>
          </div>

          {/* Center Image */}
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto order-first md:order-none">
            <img
              src="https://gfa-tech.com/dimp-template-images/make-up/img10.jpg"
              alt="Makeup application"
              className="rounded-lg w-full h-auto shadow-xl"
            />
          </div>

          {/* Right Side */}
          <div className="space-y-12">
            <div className="flex flex-col items-center md:items-start text-left">
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                alt="icon"
                className="w-6 h-6 mb-2"
              />
              <h3 className="font-extrabold text-lg">Premium Products</h3>
              <p className="max-w-xs text-sm text-gray-600">
                We use only high-quality, skin-friendly products suitable for
                Nigeria's climate.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start text-left">
              <img
                src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
                alt="icon"
                className="w-6 h-6 mb-2"
              />
              <h3 className="font-extrabold text-lg">Cultural Celebration</h3>
              <p className="max-w-xs text-sm text-gray-600">
                Our looks celebrate Nigerian heritage while embracing global
                beauty trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-[#FEF9EF] text-center py-16 px-4">
        <p className="text-xl mb-2 text-yellow-600">Our Offerings</p>
        <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
          Signature Nigerian Makeup Services
        </h2>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {MakeUp.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden text-center p-6 hover:shadow-xl transition"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="w-full h-full rounded-full border-4 border-yellow-500 overflow-hidden">
                  <img
                    src={service.serviceImage}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {service.name}
              </h3>
              <p className="text-gray-600 mb-4">{service.shortDescription}</p>
              <p className="font-bold text-yellow-600 mb-4">
                Starting from {getFormattedPrice(service.price, countryCode)}
              </p>
              <a
                href="#booking"
                className="inline-block bg-yellow-500 text-white font-semibold px-6 py-2 rounded hover:bg-yellow-600 transition"
              >
                BOOK NOW
              </a>
            </div>
          ))}
        </div> */}
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-6xl mx-auto">
          <p className="text-xl mb-2 text-yellow-600">Our Process</p>
          <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
            Experience {userDetails?.ecosystemName} in 3 Easy Steps
          </h2>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start text-left">
          <div className="space-y-10 relative">
            <div className="absolute top-2 left-0 h-[400px] border-l-2 border-yellow-500 transform -translate-x-2 hidden sm:block" />

            <div className="pl-6">
              <h3 className="font-extrabold text-lg text-gray-900 mb-1">
                1. Consultation
              </h3>
              <p className="text-gray-600">
                We discuss your desired look, skin type, and occasion to
                recommend the perfect style and products.
              </p>
            </div>
            <div className="pl-6">
              <h3 className="font-extrabold text-lg text-gray-900 mb-1">
                2. Custom Application
              </h3>
              <p className="text-gray-600">
                Our artists use specialized techniques tailored for Nigerian
                skin tones and facial features.
              </p>
            </div>
            <div className="pl-6">
              <h3 className="font-extrabold text-lg text-gray-900 mb-1">
                3. Final Perfection
              </h3>
              <p className="text-gray-600">
                We ensure your makeup is flawless, long-lasting, and photo-ready
                for any event.
              </p>
            </div>
          </div>
          <div>
            <img
              src="https://gfa-tech.com/dimp-template-images/make-up/makeup-2.jpg"
              alt="Makeup process"
              className="rounded-xl w-full max-w-md mx-auto md:mx-0 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="bg-[#FEF9EF] text-center py-16 px-4">
        <p className="text-xl mb-2 text-yellow-600">Our Gallery</p>
        <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
          Nigerian Beauty Transformations
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
          {imageUrls.map((url, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-md shadow-md hover:shadow-xl transition"
            >
              <img
                src={`${url}?auto=format&fit=crop&w=400&q=80`}
                alt={`Nigerian makeup transformation ${index + 1}`}
                className="w-full h-64 object-cover hover:scale-105 transition duration-500"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-4 text-center bg-white">
        <p className="text-xl mb-2 text-yellow-600">Client Love</p>
        <h2 className="text-2xl md:text-4xl font-extrabold mb-4">
          What Our Clients Say
        </h2>
        <Swiper
          modules={[Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{
            clickable: true,
            bulletClass: "swiper-pagination-bullet custom-bullet",
            bulletActiveClass: "swiper-pagination-bullet-active",
            el: ".custom-pagination",
          }}
          className="max-w-2xl mx-auto"
        >
          <SwiperSlide>
            <h3 className="text-xl font-semibold mb-6 text-yellow-500">
              ★★★★★
            </h3>
            <p className="italic max-w-xl mx-auto text-xl font-extrabold mb-6">
              "NaijaGlam gave me the perfect traditional wedding look that
              honored my culture while looking modern. The makeup lasted all
              through the ceremony!"
            </p>
            <div className="flex justify-center items-center gap-4 mb-8">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/fredia-testi.png"
                alt="client"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold">Amina Abdullahi</p>
                <p className="text-sm text-gray-700">Bride, Lagos</p>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <h3 className="text-xl font-semibold mb-6 text-yellow-500">
              ★★★★★
            </h3>
            <p className="italic max-w-xl mx-auto text-xl font-extrabold mb-6">
              "As a Nollywood actress, I trust NaijaGlam for all my red carpet
              looks. They understand how makeup should look under Nigerian
              lighting conditions."
            </p>
            <div className="flex justify-center items-center gap-4 mb-8">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/fredia-testi2.png"
                alt="client"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-left">
                <p className="font-semibold">Chioma Eze</p>
                <p className="text-sm text-gray-700">Actress, Abuja</p>
              </div>
            </div>
          </SwiperSlide>

          <div className="custom-pagination mt-4 flex justify-center gap-2"></div>
          <PrevButton />
        </Swiper>
      </section>

      {/* Booking CTA Section */}
      <section id="booking" className="bg-yellow-600 py-16 px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
          Ready for Your Glam Transformation?
        </h2>
        <p className="text-white mb-8 max-w-2xl mx-auto">
          Book your appointment at our Lagos studio or inquire about our mobile
          services for weddings and events across Nigeria.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
          <button
            onClick={handleModalOpen}
            className="bg-white text-yellow-600 px-6 py-3 rounded-md font-bold hover:bg-gray-100 transition"
          >
            Book an appointment
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a120b] text-white py-12 px-4 md:px-12">
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {/* Studio Info */}
          <div>
            <div className="flex items-center">
              <FaFaceFlushed className="text-2xl text-yellow-500" />
              <span className="ml-2 font-bold text-xl">NaijaGlam</span>
            </div>
            <p className="my-4 text-gray-300">
              Premier Nigerian makeup studio specializing in traditional and
              contemporary African beauty styles since 2015.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-yellow-500">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-500">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-300 hover:text-yellow-500">
                <FaTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-yellow-500">
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-yellow-500"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-gray-300 hover:text-yellow-500"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-gray-300 hover:text-yellow-500"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="#testimonials"
                  className="text-gray-300 hover:text-yellow-500"
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          {/* <div>
            <h4 className="font-bold text-lg mb-4">Our Services</h4>
            <ul className="space-y-2">
              {MakeUp.slice(0, 5).map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="text-gray-300 hover:text-yellow-500"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact Us</h4>
            <address className="not-italic text-gray-300 space-y-2">
              <p>23 Glam Avenue, Victoria Island</p>
              <p>Lagos, Nigeria</p>
              <p>
                <a href="tel:+2348123456789" className="hover:text-yellow-500">
                  +234 812 345 6789
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@naijaglam.com"
                  className="hover:text-yellow-500"
                >
                  info@naijaglam.com
                </a>
              </p>
              <p>Mon-Sat: 9am - 7pm</p>
            </address>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} NaijaGlam Makeup Studio. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ThirdMakeup;
