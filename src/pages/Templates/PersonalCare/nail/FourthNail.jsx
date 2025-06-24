import React, { useState } from "react";
import { FaBars, FaTimes, FaPhone, FaQuoteLeft } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Nail } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";

const testimonials = [
  {
    text: "I was honestly blown away! My nails stayed intact for almost a month — no chips, no lifting. Definitely my go-to spot in Lagos!",
    author: "RACHEL A.",
  },
  {
    text: "Very neat work, and they’re so patient with designs. You’ll feel pampered like a queen. Highly recommend!",
    author: "WENDY T.",
  },
  {
    text: "Their attention to detail is unmatched. From the way they clean up your cuticles to how they shape your nails — perfection!",
    author: "GRACE L.",
  },
  {
    text: "Peaceful environment, gentle touch, and their polish selection is top-notch. It felt like a mini vacation!",
    author: "MICHELLE B.",
  },
  {
    text: "I've done my nails in many places around Abuja, but this one stands out. Clean, classy, and affordable!",
    author: "TINA K.",
  },
  {
    text: "My gel nails lasted over 3 weeks — and I do a lot of house chores. These ladies know their craft!",
    author: "LISA M.",
  },
  {
    text: "From the warm welcome to the perfect finish, everything was just 10/10. My nails have never looked this good.",
    author: "JANE C.",
  },
  {
    text: "They take hygiene seriously, which is a big deal for me. Plus, they’re super friendly and professional.",
    author: "ANITA O.",
  },
];

const FourthNail = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="font-sans">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        {/* Mobile Top Bar */}
        <div className="wsmobileheader flex justify-between items-center p-4 md:hidden">
          <span className="smllogo">
            <a href="#home">
              <h2 className="font-bold uppercase text-3xl">NAILCARE</h2>
            </a>
            <p className="text-center text-xs">The premier nail studio</p>
          </span>
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="text-2xl text-black" />
              ) : (
                <FaBars className="text-2xl text-black" />
              )}
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:block">
          <div className="wsmainwp">
            <nav className="wsmenu">
              <ul className="wsmenu-list flex items-center justify-center py-4">
                <li className="px-6 py-2">
                  <a href="#about" className="uppercase text-black">
                    About
                  </a>
                </li>

                <li className="px-6 py-2">
                  <a
                    href="#services"
                    className="hover:text-[#FD1C79] text-black uppercase"
                  >
                    Our Services
                  </a>
                </li>
                <li className="px-6 py-2">
                  <a href="#home">
                    <h2 className="font-bold uppercase text-3xl">NAILCARE</h2>
                  </a>
                  <p className="text-center text-xs">The premier nail studio</p>
                </li>
                <li className="px-6 py-2">
                  <a
                    href="#gallery"
                    className="hover:text-[#FD1C79] uppercase text-black"
                  >
                    Gallery
                  </a>
                </li>

                <li className="px-6 py-2">
                  <a
                    href="#contact"
                    className="hover:text-[#FD1C79] uppercase text-black"
                  >
                    Contacts
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Nav Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-black px-6 py-4 mt-24">
          <nav className="flex flex-col gap-4">
            <a href="#home" className="hover:text-[#FD1C79] uppercase">
              Home
            </a>
            <a href="#about" className="hover:text-[#FD1C79] uppercase">
              About
            </a>

            <a href="#about" className="hover:text-[#FD1C79] uppercase">
              Our Services
            </a>
            <a href="#gallery" className="hover:text-[#FD1C79] uppercase">
              Gallery
            </a>
            <a href="#contact" className="hover:text-[#FD1C79] uppercase">
              Contact Us
            </a>
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section
        id="home"
        className="hero-section relative  h-[70vh] md:pt-[96px] md:h-screen"
      >
        {isModalOpen && (
          <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
        )}
        <div className="slider relative h-full w-full overflow-hidden">
          <ul className="slides h-full w-full">
            <li id="slide-1" className="absolute inset-0">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nailshero6.0.jpg"
                alt="slide-background"
                className="w-full h-full object-cover blur-sm"
              />
              <div className="caption absolute inset-0 flex items-center justify-center text-center">
                <div className="container px-6">
                  <div className="row justify-center">
                    <div className="col col-md-10 col-lg-9 max-w-4xl">
                      <div className="caption-txt text-white">
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 uppercase">
                          Welcome To <br />
                          Nail Care Studio
                        </h2>
                        <button
                          onClick={handleModalOpen}
                          className="inline-block bg-[#FD1C79] hover:bg-rose-600 text-white px-8 py-3 text-lg font-medium transition duration-300"
                        >
                          Reserve a spot
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center text-center -mx-4">
            {/* Service Box 1 */}
            <div className="w-full md:w-1/3 px-6 mb-8">
              <div className="p-8 hover:shadow-lg transition duration-300">
                <div className="text-5xl mb-6 text-black">💅</div>
                <h5 className="text-xl font-bold mb-4">Nail Care</h5>
                <p className="mb-6">
                  Professional nail care services to keep your hands and feet
                  looking their best and feeling healthy.
                </p>
                <a
                  href="#services"
                  className="text-[#FD1C79] hover:text-[#FD1C79] hover:underline uppercase font-medium"
                >
                  Explore Services
                </a>
              </div>
            </div>

            {/* Service Box 2 */}
            <div className="w-full md:w-1/3 px-6 mb-8">
              <div className="p-8 hover:shadow-lg transition duration-300">
                <div className="text-5xl mb-6 text-black">🎨</div>
                <h5 className="text-xl font-bold mb-4">Nail Art</h5>
                <p className="mb-6">
                  Creative and intricate nail art designs from our talented
                  artists to express your unique style.
                </p>
                <a
                  href="#services"
                  className="text-[#FD1C79] hover:text-[#FD1C79] hover:underline uppercase font-medium"
                >
                  Explore Pricing
                </a>
              </div>
            </div>

            {/* Service Box 3 */}
            <div className="w-full md:w-1/3 px-6 mb-8">
              <div className="p-8 hover:shadow-lg transition duration-300">
                <div className="text-5xl mb-6 text-black">✨</div>
                <h5 className="text-xl font-bold mb-4">Add-Ons</h5>
                <p className="mb-6">
                  Enhance your experience with our luxurious add-ons like
                  paraffin treatments and extended massages.
                </p>
                <a
                  href="#about"
                  className="text-[#FD1C79] hover:text-[#FD1C79] hover:underline uppercase font-medium"
                >
                  Find Out More
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section 3 */}
      <section id="about" className="py-20">
        <div className="flex flex-col h-full  py-4 px-6 lg:px-24">
          <div className="row flex flex-col md:flex-row items-center">
            {/* Text Block */}
            <div className="col-md-7 col-lg-6 md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <div className="txt-block">
                <div className="section-id text-gray-500 uppercase font-semibold mb-2">
                  Get Your Shine On
                </div>
                <h3 className="text-3xl font-bold mb-6">Skilled Nail Art</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Our talented nail artists combine creativity with precision to
                  deliver stunning designs that reflect your unique style and
                  personality.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className=" mr-2">✓</span>
                    <p className="text-gray-600">
                      Each design is carefully crafted with attention to detail
                      and the highest quality products for long-lasting wear.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className=" mr-2">✓</span>
                    <p className="text-gray-600">
                      We stay up-to-date with the latest trends and techniques
                      to offer you the most fashionable nail art options.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Image Block */}
            <div className="col-md-5 col-lg-6 md:w-1/2">
              <div className="img-block">
                <img
                  src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.1.jpg"
                  alt="about-image"
                  className="w-auto h-[500px] rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section 10 */}
      <section id="about-10" className="py-20 bg-gray-50">
        <div className="flex flex-col  py-4 px-6 lg:px-24">
          <div className="row flex flex-col md:flex-row items-center">
            {/* Image Block */}
            <div className="col-md-5 col-lg-6 md:w-1/2 mb-10 md:mb-0">
              <div className="about-10-img">
                <img
                  src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.2.jpg"
                  alt="about-image"
                  className="w-auto h-[500px] rounded-lg shadow-lg"
                />
              </div>
            </div>

            {/* Text Block */}
            <div className="col-md-7 col-lg-6 md:w-1/2 md:pl-10">
              <div className="about-10-txt">
                <h5 className="text-xl font-semibold  mb-4">
                  Reveal Colourful You
                </h5>
                <p className="text-lg text-gray-600 mb-6">
                  Express your vibrant personality through our wide range of
                  colors and designs that complement your style and mood.
                </p>
                <h5 className="text-xl font-semibold  mb-4">
                  A Personal Touch
                </h5>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className=" mr-2">✓</span>
                    <p className="text-gray-600">
                      Our artists take time to understand your preferences and
                      create custom designs tailored just for you.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className=" mr-2">✓</span>
                    <p className="text-gray-600">
                      We use only premium quality products that are gentle on
                      your nails while delivering stunning results.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section 4 */}
      <section id="about-4" className="py-20">
        <div className="flex flex-col h-full  py-4 px-6 lg:px-24">
          <div className="row flex flex-col md:flex-row items-center">
            {/* Text Block */}
            <div className="col-md-6 md:w-1/2 mb-10 md:mb-0">
              <div className="txt-block">
                <span className="section-id text-black uppercase mb-2">
                  Fresh, Shiny, Bright
                </span>
                <h3 className="text-5xl font-semibold">
                  Make your day shine <br /> with your shiny nails
                </h3>
              </div>
            </div>

            {/* Image Block */}
            <div className="col-md-6 md:w-1/2">
              <div className="img-block">
                <img
                  src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.14.png"
                  alt="about-image"
                  className="w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="services"
        className="py-20 bg-white bg-cover bg-center"
        style={{ backgroundImage: "url('/images/bg-pattern.jpg')" }}
      >
        <div className="flex flex-col h-full  py-4 px-6 lg:px-24">
          <div className="pricing-6-wrapper">
            <div className="row grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pricing Table 1 */}
              <div className="col-lg-6">
                <div className="pricing-6-table p-8 rounded-lg ">
                  <span className="section-id text-gray-500 uppercase font-semibold mb-2">
                    Nails & Cocktails
                  </span>
                  <h5 className="text-2xl font-semibold mb-6 mt-5">
                    Hands & Feet
                  </h5>
                  <ul className="space-y-6">
                    {Nail.slice(0, 4).map((service, index) => (
                      <li key={index} className="pricing-6-item">
                        <div className="detail-price flex justify-between items-center border-b border-gray-200 pb-2">
                          <h5 className="text-lg font-medium">
                            {service.name}
                          </h5>
                          <span className="text-lg font-semibold">
                            {getFormattedPrice(service.price, countryCode)}
                          </span>
                        </div>
                        <div className="price-txt mt-1">
                          <p className="text-sm text-gray-500">
                            <em>{service.shortDescription}</em>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Pricing Table 2 */}
              <div className="col-lg-6 bg-white">
                <div className="pricing-6-table p-8 rounded-lg ">
                  <span className="section-id uppercase text-gray-500 font-semibold mb-2 ">
                    Paint Packages
                  </span>
                  <h5 className="text-2xl font-semibold mb-6 mt-5">
                    Add-On Services
                  </h5>
                  <ul className="space-y-6">
                    {Nail.slice(4, 8).map((service, index) => (
                      <li key={index} className="pricing-6-item">
                        <div className="detail-price flex justify-between items-center border-b border-gray-200 pb-2">
                          <h5 className="text-lg font-medium">
                            {service.name}
                          </h5>
                          <span className="text-lg font-semibold">
                            {getFormattedPrice(service.price, countryCode)}
                          </span>
                        </div>
                        <div className="price-txt mt-1">
                          <p className="text-sm text-gray-500">
                            <em>{service.shortDescription}</em>
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {/* Button */}
          <div className="row mt-12 text-center">
            <div className="col">
              <div className="more-btn">
                <p className="tra-link">
                  <button
                    onClick={handleModalOpen}
                    className="text-black hover:text-rose-500 uppercase underline font-semibold"
                  >
                    Sold Yet? Book an appointment now!
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section 9 */}
      <section id="about-9" className="py-20 bg-gray-50">
        <div className="flex flex-col h-full  py-4 px-6 lg:px-24">
          <div className="row flex flex-col md:flex-row items-center">
            {/* Text Block */}
            <div className="col-md-6 col-lg-5 order-last md:order-first md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <div className="about-9-txt">
                <span className="section-id text-gray-500 uppercase font-semibold mb-2">
                  Get Your Shine On
                </span>
                <h3 className="text-3xl font-bold mb-6">Shining Feminine</h3>
                <p className="text-lg text-gray-600 mb-6">
                  Our salon provides a luxurious experience where every detail
                  is designed to make you feel pampered and beautiful.
                </p>
                <h5 className="text-xl font-semibold  mb-4">
                  Elegance in Every Stroke
                </h5>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className=" mr-2">✓</span>
                    <p className="text-gray-600">
                      Our nail technicians are trained in the latest techniques
                      to ensure flawless application and long-lasting results.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <span className=" mr-2">✓</span>
                    <p className="text-gray-600">
                      We use premium quality products that nourish your nails
                      while providing stunning color and shine.
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* Image Block */}
            <div className="col-md-6 col-lg-7 order-first md:order-last md:w-1/2">
              <div className="about-9-img">
                <img
                  src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.5.jpg"
                  alt="about-image"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews-1" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-12">
            <span className="text-gray-400 tracking-widest uppercase text-xl font-semibold">
              Testimonials
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mt-2">
              What People Are Saying
            </h2>
          </div>

          {/* Swiper Testimonials */}
          <Swiper
            modules={[Pagination]}
            pagination={{ clickable: true }}
            spaceBetween={30}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 1 },
              1024: { slidesPerView: 3 },
            }}
          >
            {testimonials.map((item, idx) => (
              <SwiperSlide key={idx}>
                <div className="p-8 text-center">
                  <div className="text-6xl text-gray-400 mb-6">
                    <FaQuoteLeft />
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed mb-4">
                    “{item.text}”
                  </p>
                  <p className="font-semibold text-gray-800 uppercase tracking-wider">
                    — {item.author}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20">
        <div className="flex flex-col h-full  py-4 px-6 lg:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.3.jpg"
                alt="gallery-image"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <p className="uppercase text-sm">Art, Care</p>
                  <h5 className="text-lg font-semibold">Nail Art Design</h5>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.4.jpg"
                alt="gallery-image"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <p className="uppercase text-sm">Hands, Treatment</p>
                  <h5 className="text-lg font-semibold">Callus Treatment</h5>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.6.jpg"
                alt="gallery-image"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <p className="uppercase text-sm">Hands, Care</p>
                  <h5 className="text-lg font-semibold">Polish Change</h5>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.7.jpg"
                alt="gallery-image"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <p className="uppercase text-sm">Hands, Care</p>
                  <h5 className="text-lg font-semibold">Classic Manicure</h5>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.8.jpg"
                alt="gallery-image"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <p className="uppercase text-sm">Hands, Treatment</p>
                  <h5 className="text-lg font-semibold">Spa Pedicure</h5>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.9.jpg"
                alt="gallery-image"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <p className="uppercase text-sm">Hands, Treatment</p>
                  <h5 className="text-lg font-semibold">Gel Manicure</h5>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.10.jpg"
                alt="gallery-image"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <p className="uppercase text-sm">Hands, Treatment</p>
                  <h5 className="text-lg font-semibold">Express Manicure</h5>
                </div>
              </div>
            </div>

            <div className="relative group overflow-hidden rounded-lg">
              <img
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.11.jpg"
                alt="gallery-image"
                className="w-full h-auto transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                  <p className="uppercase text-sm">Hands, Treatment</p>
                  <h5 className="text-lg font-semibold">Paraffin Manicure</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section 5 - Working Hours */}
      <section id="about-5" className="py-20">
        <div className="flex flex-col h-full  py-4 px-6 lg:px-24">
          <div className="row flex flex-col md:flex-row items-center">
            {/* Text Block */}
            <div className="col-md-6 order-last md:order-first md:w-1/2 mb-10 md:mb-0">
              <div className="txt-block">
                <span className="section-id text-gray-500 uppercase font-semibold mb-2">
                  Time Schedule
                </span>
                <h3 className="text-3xl font-bold mb-6 mt-4">Working Hours</h3>
                <p className="text-lg text-gray-600">
                  We're open six days a week to accommodate your busy schedule.
                  Our flexible hours make it easy to book an appointment that
                  works for you, whether it's after work or on the weekend.
                </p>
              </div>
            </div>

            {/* Table */}
            <div className="col-md-6 order-first md:order-last md:w-1/2">
              <div className="txt-table w-full">
                <table className="w-full">
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="py-3 font-medium">Mon – Wed</td>
                      <td className="text-center">-</td>
                      <td className="text-right font-bold">
                        10:00 AM - 9:00 PM
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Thursday</td>
                      <td className="text-center">-</td>
                      <td className="text-right font-bold">
                        10:00 AM - 7:30 PM
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Friday</td>
                      <td className="text-center">-</td>
                      <td className="text-right font-bold">
                        10:00 AM - 9:00 PM
                      </td>
                    </tr>
                    <tr>
                      <td className="py-3 font-medium">Sat - Sun</td>
                      <td className="text-center">-</td>
                      <td className="text-right font-bold">
                        10:00 AM - 5:00 PM
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="promo-4" className="w-full overflow-hidden py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Promo Box 1 */}
          <div
            className="relative w-full bg-cover bg-center h-[550px] flex items-center justify-start px-10"
            style={{
              backgroundImage:
                "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.16.jpg')",
            }}
          >
            <div className=" p-10 rounded-md text-start max-w-md">
              <span className="block text-sm text-gray-700 uppercase mb-2 font-medium tracking-widest">
                A Brush of Perfection
              </span>
              <h3 className="text-2xl italic text-gray-800 mb-2">
                Follow & Share
              </h3>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                @nail_care
              </h2>
              <a
                href="#gallery"
                className="inline-block bg-[#FD1C79] hover:bg-rose-600 text-white px-6 py-3 transition duration-300 text-sm font-semibold"
              >
                VIEW OUR GALLERY
              </a>
            </div>
          </div>

          {/* Promo Box 2 */}
          <div
            className="relative w-full bg-cover bg-center h-[600px] flex items-center justify-start px-10"
            style={{
              backgroundImage:
                "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.17.jpg')",
            }}
          >
            <div className=" p-10 rounded-md text-start max-w-md">
              <span className="block text-sm uppercase text-white/80 font-semibold mb-2 tracking-wider">
                Make It Happen
              </span>
              <h2 className="text-6xl font-bold text-white leading-tight mb-6">
                Reserve your spot <br />
                Now
              </h2>
              <button
                onClick={handleModalOpen}
                className="inline-block border-2 uppercase border-white text-white hover:bg-white hover:text-[#FD1C79] px-6 py-3 transition duration-300 text-sm font-semibold"
              >
                Click here to book now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Section 2 */}
      <section id="promo-2" className="py-20">
        <div className="flex flex-col h-full  py-4 px-6 lg:px-24">
          {/* Section Title */}
          <div className="row text-center mb-12">
            <div className="col-lg-10 col-xl-8 mx-auto">
              <div className="section-title">
                <span className="section-id text-gray-500 uppercase font-semibold mb-2">
                  Nails And Beyond…
                </span>
                <h2 className="text-3xl font-bold mt-3">
                  Nails For Every Budget
                </h2>
              </div>
            </div>
          </div>

          <div className="row grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {/* Promo Box 1 */}
            <div className="col">
              <a href="pricing.html" className="block">
                <div id="pb-2-1" className="promo-box group">
                  <div className="promo-box-txt mb-6">
                    <p className="uppercase text-sm tracking-wider text-gray-500 mb-2">
                      From 09.11.21 To 23.11.21
                    </p>
                    <h5 className="text-lg font-semibold">
                      30% OFF on Classic Manicure & Pedicure
                    </h5>
                  </div>
                  <div className="promo-box-img overflow-hidden rounded-lg">
                    <div className="hover-overlay relative overflow-hidden">
                      <img
                        className="w-full h-auto object-cover transition duration-500 group-hover:scale-105"
                        src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.12.jpg"
                        alt="promo-image"
                      />
                      <div className="item-overlay absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Promo Box 2 */}
            <div className="col">
              <a href="pricing.html" className="block">
                <div id="pb-2-2" className="promo-box group">
                  <div className="hover-overlay relative overflow-hidden rounded-lg">
                    <img
                      className="w-full h-[420px] object-cover transition duration-500 group-hover:scale-105"
                      src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.13.jpg"
                      alt="promo-image"
                    />
                    <div className="item-overlay absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
                  </div>
                </div>
              </a>
            </div>

            {/* Promo Box 3 */}
            <div className="col">
              <a href="pricing.html" className="block">
                <div id="pb-2-3" className="promo-box group">
                  <div className="promo-box-img overflow-hidden rounded-lg mb-6">
                    <div className="hover-overlay relative overflow-hidden">
                      <img
                        className="w-full h-auto object-cover transition duration-500 group-hover:scale-105"
                        src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.14.jpg"
                        alt="promo-image"
                      />
                      <div className="item-overlay absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition duration-300"></div>
                    </div>
                  </div>
                  <div className="promo-box-txt">
                    <p className="uppercase text-sm tracking-wider text-gray-500 mb-2">
                      All Autumn Long!
                    </p>
                    <h5 className="text-xl font-semibold">
                      Prices Reduced On Spa Procedures UP TO 30%
                    </h5>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <div id="brands-1" className="py-12 bg-white">
        <div className="flex flex-col h-full  py-4 px-6 lg:px-24">
          <div className="row">
            <div className="col brands-1-wrapper">
              <div className="owl-carousel brands-1-carousel flex items-center justify-center space-x-12">
                {/* Brand Logo 1 */}
                <div className="brand-logo">
                  <img
                    className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/brand-5.1.png"
                    alt="brand-logo"
                  />
                </div>
                {/* Brand Logo 2 */}
                <div className="brand-logo">
                  <img
                    className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/brand-5.2.png"
                    alt="brand-logo"
                  />
                </div>
                {/* Brand Logo 3 */}
                <div className="brand-logo">
                  <img
                    className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/brand-5.3.png"
                    alt="brand-logo"
                  />
                </div>
                {/* Brand Logo 4 */}
                <div className="brand-logo">
                  <img
                    className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/brand-5.4.png"
                    alt="brand-logo"
                  />
                </div>
                {/* Brand Logo 5 */}
                <div className="brand-logo">
                  <img
                    className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/brand-5.5.png"
                    alt="brand-logo"
                  />
                </div>
                {/* Brand Logo 6 */}
                <div className="brand-logo">
                  <img
                    className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/brand-5.6.png"
                    alt="brand-logo"
                  />
                </div>
                {/* Brand Logo 7 */}
                <div className="brand-logo">
                  <img
                    className="h-20 w-auto object-contain opacity-80 hover:opacity-100 transition duration-300"
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/brand-5.1.png"
                    alt="brand-logo"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Banner 3 */}
      <section
        id="banner-3"
        className="py-32 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.15.jpg')",
        }}
      >
        <div className="flex flex-col h-full  py-4 px-6 lg:px-24">
          <div className="row">
            <div className="col-md-7 col-lg-6 mx-auto">
              <div className="banner-3-txt text-start text-black">
                <h5 className="text-xl mb-4 ">
                  We want to make every girl <br />
                  pretty, happy, and loved!
                </h5>
                <h2 className="text-6xl font-bold mb-2">20% OFF</h2>
                <h4 className="text-2xl mb-6">on Manicure + Gel Polish</h4>
                <button
                  onClick={handleModalOpen}
                  className="btn inline-block bg-[#FD1C79] hover:bg-rose-600 text-white px-8 py-3 text-lg font-medium transition duration-300"
                >
                  Book Online
                </button>
                <p className="mt-5 text-sm opacity-80">* All Autumn Long!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="contact">
        <WhiteContactForm />
      </section>

      {/* Banner 1 */}
      <section
        id="banner-1"
        className="py-32 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.19.jpg')",
        }}
      >
        <div className="container mx-auto px-6">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="banner-1-txt text-center font-bold text-white">
                <h5 className="text-xl mb-4">Book Your Visit Online</h5>
                <h3 className="text-6xl mb-2">SAVE UP TO</h3>
                <h2 className="text-6xl font-bold mb-6">30% OFF</h2>
                <button
                  onClick={handleModalOpen}
                  className="btn inline-block bg-[#FD1C79] hover:bg-rose-600 text-white px-8 py-3 text-lg font-medium transition duration-300"
                >
                  Booking Online
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Newsletter */}
            <div className="lg:col-span-1">
              <h5 className="text-xl font-semibold mb-4">Working Hours</h5>
              <form className="flex flex-col ">
                {/* Input (you can add an input & button if needed) */}
                <p className="text-2xl font-bold text-[#FD1C79]"></p>
                <p className="">Mon–Fri: 10AM – 9PM</p>
                <p className="mb-1">Saturday: 10AM – 7PM</p>
                <p>Sunday: 10PM – 7PM</p>
              </form>
            </div>

            {/* Navigation Links */}
            <div>
              <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#home" className="hover:text-[#FD1C79] transition">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-[#FD1C79] transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#services"
                    className="hover:text-[#FD1C79] transition"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#gallery"
                    className="hover:text-[#FD1C79] transition"
                  >
                    Gallery
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-[#FD1C79] transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h5 className="text-xl font-semibold mb-4">Get in Touch</h5>
              <p className="mb-3">Oniru, Lagos</p>
              <p className="mb-3">
                <a
                  href="mailto:hello@lanottestudio.com"
                  className="font-semibold hover:text-[#FD1C79] transition"
                >
                  hello@lanottestudio.com
                </a>
              </p>
            </div>

            {/* Social Media */}
            <div>
              <h5 className="text-xl font-semibold mb-4">Follow Us</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FD1C79] transition"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FD1C79] transition"
                  >
                    Twitter
                  </a>
                </li>
                <li>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FD1C79] transition"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#FD1C79] transition"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
            <p>
              <span>
                Copyright &copy; 2025 Built with{" "}
                <a className="hover:text-primary3" href="https://dimpified.com">
                  Dimpified
                </a>
              </span>{" "}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FourthNail;
