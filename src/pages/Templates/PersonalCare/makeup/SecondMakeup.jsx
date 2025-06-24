import React, { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { MakeUp } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
const testimonials = [
  {
    imgSrc:
      "https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty7.jpg",
    name: "Amaka Okafor",
    rating: "★★★★★",
    content:
      "I felt absolutely stunning after my makeover! The team listened to my preferences and created a flawless, natural look that lasted all day. I got so many compliments at my event!",
  },
  {
    imgSrc:
      "https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty8.jpg",
    name: "Funke Balogun",
    rating: "★★★★★",
    content:
      "From bridal makeup to everyday glam, their expertise is unmatched. They enhanced my natural beauty while making me feel confident and elegant. The products they used were top-notch!",
  },
  {
    imgSrc:
      "https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty6.jpg",
    name: "Chiamaka Eze",
    rating: "★★★★★",
    content:
      "The best makeup experience I’ve ever had! My skin looked radiant, and the makeup stayed fresh all day. Their technique is flawless, and they truly understand different skin tones.",
  },
  {
    imgSrc:
      "https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty5.jpg",
    name: "Yemi Adewale",
    rating: "★★★★★",
    content:
      "Their makeup services have completely changed the way I feel about myself. Whether it’s for a photoshoot or a special event, they always deliver perfection. I wouldn't trust anyone else with my face!",
  },
];

// App Component
const SecondMakeup = ({ userDetails }) => {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };
  const galleryImages = [
    {
      id: 1,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty5.jpg",
      alt: "gallery-image",
    },
    {
      id: 2,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty6.jpg",
      alt: "gallery-image",
    },
    {
      id: 3,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty7.jpg",
      alt: "gallery-image",
    },
    {
      id: 4,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty8.jpg",
      alt: "gallery-image",
    },
    {
      id: 5,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty9.jpg",
      alt: "gallery-image",
    },
    {
      id: 6,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty10.jpg",
      alt: "gallery-image",
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="font-Urbanist relative">
      <>
        {/* Transparent Navbar */}
        <header className="absolute top-0 left-0 w-full z-10 text-white">
          <div className="  px-4 py-6 flex justify-between items-center">
            <div className="text-3xl font-bold">REINE STUDIO</div>
            {/* Hamburger Menu for Mobile */}
            <button
              className="md:hidden flex items-center space-x-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="text-sm">Menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#home" className="hover:text-gray-300 font-bold">
                HOME
              </a>
              <a href="#about" className="hover:text-gray-300 font-bold">
                ABOUT
              </a>
              <a href="#services" className="hover:text-gray-300 font-bold">
                SERVICES
              </a>
              <a href="#pricing" className="hover:text-gray-300 font-bold">
                PRICING
              </a>
              <a href="#gallery" className="hover:text-gray-300 font-bold">
                GALLERY
              </a>

              <button
                onClick={handleModalOpen}
                className="px-4 py-2 border border-white  hover:bg-white hover:text-black transition font-bold"
              >
                BOOK APPOINTMENT
              </button>
            </nav>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-black text-white py-4 px-4 space-y-4">
              <a href="#home" className="block hover:text-gray-300">
                Home
              </a>
              <a href="#about" className="block hover:text-gray-300">
                About
              </a>
              <a href="#services" className="block hover:text-gray-300">
                Services
              </a>

              <a href="#pricing" className="block hover:text-gray-300">
                Pricing
              </a>
              <a href="#gallery" className="block hover:text-gray-300">
                Gallery
              </a>
              <button
                onClick={handleModalOpen}
                className="block px-4 py-2 border border-white  hover:bg-white hover:text-black text-center transition"
              >
                Book Appointment
              </button>
            </div>
          )}
        </header>

        {/* Hero Section */}
        <div
          id="home"
          className="relative h-[60vh] md:h-screen bg-cover bg-center flex justify-center items-center"
          style={{
            backgroundImage:
              "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty1.jpg')",
          }}
        >
          <div className="text-center space-y-6 px-4">
            <h1 className="text-2xl md:text-8xl text-white font-bold">
              Unleash your beauty
            </h1>
            <h1 className="text-2xl md:text-6xl text-white font-bold">
              with{" "}
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}{" "}
              Studio
            </h1>
            <div className="mt-8">
              {" "}
              {/* Wrapper div to control spacing */}
              <button
                onClick={handleModalOpen}
                className="px-6 py-3 border border-white text-white  hover:bg-white hover:text-black transition uppercase"
              >
                Book Appointment
              </button>
            </div>
            {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
              />
            )}
          </div>
        </div>
      </>
      <section id="about" className="py-12 bg-white">
        <div className="flex flex-col h-full py-4 px-4 lg:px-32">
          <div className="flex flex-col md:flex-row items-center h-full">
            {/* Text Block */}
            <div className="md:w-1/2 px-3 flex flex-col justify-center h-full">
              <span className="text-sm uppercase tracking-widest text-gray-600">
                Elevate Your Beauty
              </span>
              <h2 className="text-3xl font-bold mt-4 text-gray-900 leading-snug">
                Discover the Art of Professional Makeup
              </h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {userDetails && userDetails.ecosystemDescription
                  ? userDetails.ecosystemDescription
                  : ""}
              </p>
            </div>

            {/* Image Block */}
            <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center">
              <img
                className="w-96 shadow-md"
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty3.jpg"
                alt="Professional Makeup Session"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full">
        {/* Header Section */}
        <section
          id="services"
          className="pt-8 lg:pt-20 text-center bg-[#f7dac0]"
        >
          <div className="container mx-auto lg:px-32 px-4 justify-center items-center">
            <h2 className="text-3xl font-bold text-gray-900 relative -top-4 opacity-10">
              Unleash Your Inner Glow
            </h2>
            <h2 className="text-4xl font-semibold text-gray-800 mb-4">
              Where Beauty Meets Perfection
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Experience the magic of professional makeup artistry. Whether it's
              a bridal look, red carpet glam, or a flawless everyday glow, our
              expert touch enhances your natural beauty. Using premium products
              and personalized techniques, we create timeless looks that radiate
              confidence and elegance.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <div className="py-12 bg-[#f7dac0]">
          <div className="flex flex-col h-full  py-4 px-4 lg:px-32">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
              {/* Service Box */}
              <div className="flex flex-col items-center">
                <div className="mb-3">
                  <img
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty14.jpg"
                    alt="Facials"
                    className="w-60 h-auto rounded-md"
                  />
                </div>
                <p className="text-gray-800 font-medium">Facials</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-3">
                  <img
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty15.jpg"
                    alt="Eyelash"
                    className="w-60 h-auto rounded-md"
                  />
                </div>
                <p className="text-gray-800 font-medium">Eyelash</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-3">
                  <img
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty16.jpg"
                    alt="Eyebrow"
                    className="w-60 h-auto rounded-md"
                  />
                </div>
                <p className="text-gray-800 font-medium">Eyebrow</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-3">
                  <img
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty17.jpg"
                    alt="Waxing"
                    className="w-60 h-auto rounded-md"
                  />
                </div>
                <p className="text-gray-800 font-medium">Waxing</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-3">
                  <img
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty18.jpg"
                    alt="Nails"
                    className="w-60 h-auto rounded-md"
                  />
                </div>
                <p className="text-gray-800 font-medium">Nails</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-3">
                  <img
                    src="https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty19.jpg"
                    alt="Make-Up"
                    className="w-60 h-auto rounded-md"
                  />
                </div>
                <p className="text-gray-800 font-medium">Make-Up</p>
              </div>
            </div>

            {/* View Our Menu Button */}
            <div className="mt-10 text-center">
              <a
                href="#"
                className="inline-block bg-transparent border-2 border-gray-800 text-gray-800 py-2 px-6  hover:bg-gray-800 hover:text-white transition-all"
              >
                Book Appointment
              </a>
            </div>
          </div>
        </div>
      </div>

      <div id="pricing" className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-10">
            <span className="text-gray-500 uppercase tracking-wide text-sm">
              Focus On Beauty
            </span>
            <h2 className="text-gray-800 text-4xl font-semibold mt-2">
              Popular services
            </h2>
            <h3 className="text-lg text-gray-600 mt-4">Enhance Your Beauty</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            {/* <ul className="space-y-4">
              {MakeUp.slice(0, Math.ceil(MakeUp.length / 2)).map(
                (service, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-gray-300 pb-4"
                  >
                    <div>
                      <h4 className="text-lg font-medium">{service.name}</h4>
                      <p className="text-sm text-gray-500">
                        {service.shortDescription}
                      </p>
                    </div>
                    <span className="text-xl font-semibold text-gray-800">
                      {getFormattedPrice(service.price, countryCode)}
                    </span>
                  </li>
                )
              )}
            </ul> */}

            {/* Right Column */}
            {/* <ul className="space-y-4">
              {MakeUp.slice(Math.ceil(MakeUp.length / 2)).map(
                (service, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-gray-300 pb-4"
                  >
                    <div>
                      <h4 className="text-lg font-medium">{service.name}</h4>
                      <p className="text-sm text-gray-500">
                        {service.shortDescription}
                      </p>
                    </div>
                    <span className="text-xl font-semibold text-gray-800">
                      {getFormattedPrice(service.price, countryCode)}
                    </span>
                  </li>
                )
              )}
            </ul> */}
          </div>

          {/* Button */}
          <div className="text-center mt-10">
            <button
              onClick={handleModalOpen}
              className="inline-block bg-transparent border-2 border-gray-800 text-gray-800 py-2 px-6  hover:bg-gray-800 hover:text-white transition-all"
            >
              Book Now!
            </button>
          </div>
        </div>
      </div>
      <section id="gallery" className="py-16 bg-[#f7dac0]">
        <div className="flex flex-wrap lg:px-32 px-4 justify-center items-center px-4">
          {/* Section Title */}
          <div className="text-center mb-12">
            <span className="text-gray-500 uppercase text-sm tracking-wide ">
              Be a more perfect
            </span>
            <h2 className="text-6xl text-gray-200 font-bold relative -top-6 opacity-10">
              A Whole New You
            </h2>
            <h2 className="text-4xl font-semibold text-gray-800 relative -top-16">
              Redefine Your Beauty
            </h2>
          </div>

          {/* Gallery Images */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="col-span-2 md:col-span-2">
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="col-span-5">
              <img
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="col-span-3 space-y-4">
              <img
                src={galleryImages[2].src}
                alt={galleryImages[2].alt}
                className="w-full h-auto object-cover"
              />
              <img
                src={galleryImages[3].src}
                alt={galleryImages[3].alt}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="col-span-2 space-y-4">
              <img
                src={galleryImages[4].src}
                alt={galleryImages[4].alt}
                className="w-full h-auto object-cover"
              />
              <img
                src={galleryImages[5].src}
                alt={galleryImages[5].alt}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-wrap lg:px-32 px-4 lg:py-12 justify-center items-center p-6">
        {/* Section 1: Time to Shine */}
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* Image */}
          <div className="w-full lg:w-1/2">
            <img
              src="https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty12.jpg"
              alt="Glamorous Makeup Look"
              className="w-96 shadow-lg"
            />
          </div>

          {/* Text and Accordion */}
          <div className="w-full lg:w-1/2">
            <span className="text-sm uppercase text-gray-500 font-medium">
              Time to Shine
            </span>
            <h2 className="text-3xl font-bold mt-2">
              Elevate Your Beauty with Expert Makeup
            </h2>

            {/* Accordion */}
            <div className="mt-6">
              {[
                {
                  title: "Certified Makeup Artists",
                  content:
                    "Our highly trained professionals specialize in creating flawless, customized looks for every occasion.",
                },
                {
                  title: "Premium Makeup Products",
                  content:
                    "We use high-end, skin-friendly cosmetics to enhance your natural glow while ensuring long-lasting perfection.",
                },
                {
                  title: "Seamless Online Booking",
                  content:
                    "Book your makeup session effortlessly and get the VIP beauty experience at your convenience.",
                },
              ].map((item, index) => (
                <div key={index} className="border-b border-gray-200">
                  <button
                    className="w-full flex justify-between items-center py-3 text-left font-medium text-gray-700 focus:outline-none"
                    onClick={() => toggleAccordion(index)}
                  >
                    {item.title}
                    <span>{activeAccordion === index ? "-" : "+"}</span>
                  </button>
                  {activeAccordion === index && (
                    <div className="py-2 text-gray-600">{item.content}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section 2: Booking Hours */}
        <div className="mt-12 flex flex-col lg:flex-row items-center gap-8">
          {/* Text */}
          <div className="w-full lg:w-1/2">
            <span className="text-sm uppercase text-gray-500 font-medium">
              Booking Schedule
            </span>
            <h2 className="text-3xl font-bold mt-2">
              Available Appointment Hours
            </h2>
            <p className="mt-4 text-gray-600">
              Whether you need a natural daytime glow or a bold evening
              transformation, our expert makeup services are available at your
              convenience. Secure your spot today!
            </p>
          </div>

          {/* Table */}
          <div className="w-full lg:w-1/2">
            <table className="w-full text-left border-collapse">
              <tbody>
                {[
                  { day: "Mon – Wed", time: "10:00 AM - 9:00 PM" },
                  { day: "Thursday", time: "10:00 AM - 7:30 PM" },
                  { day: "Friday", time: "10:00 AM - 9:00 PM" },
                  { day: "Sat - Sun", time: "10:00 AM - 5:00 PM" },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="py-3 px-4 border-b border-gray-200">
                      {row.day}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 text-right">
                      {row.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <section className="about-section py-12 bg-[#f7dac0]">
        <div className="flex flex-wrap lg:px-32 px-4 justify-center items-center">
          {/* Section Title */}
          <div className="text-center mb-12">
            <span className="text-gray-400 uppercase tracking-wide text-sm">
              It’s Your Time to Glow
            </span>
            <h2 className="text-4xl font-bold text-gray-800 relative">
              <span className="absolute top-8 left-0 transform -translate-x-1/2 -translate-y-1/2 opacity-10 text-8xl">
                Get Ready to Slay
              </span>
              Transform Your Look with Professional Makeup
            </h2>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Image */}
            <div className="flex justify-center">
              <img
                className="shadow-md object-cover h-auto w-full max-w-xs"
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty9.jpg"
                alt="Makeup Tools"
              />
            </div>

            {/* Text + Image */}
            <div className="bg-[#edcdb2] p-6">
              <h4 className="text-lg font-bold mb-4">
                Because You Deserve the Best
              </h4>
              <p className="text-gray-600 mb-6">
                Our professional makeup artists bring out your natural beauty
                with expert techniques and high-quality products.
              </p>
              <img
                className="shadow-md object-cover h-auto w-full max-w-xs"
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty10.jpg"
                alt="Makeup Application"
              />
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <img
                className="shadow-md object-cover h-auto w-full max-w-xs"
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty11.jpg"
                alt="Makeup Products"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        {/* Section Title */}
        <div className="text-center mb-10">
          <p className="uppercase text-gray-500 tracking-widest text-sm">
            Client Testimonials
          </p>
          <h2 className="text-2xl font-bold">What Our Clients Say</h2>
        </div>

        {/* Swiper Carousel */}
        <div className="flex flex-wrap md:px-32 px-4 w-full max-w-screen-xl mx-auto overflow-hidden">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              1200: { slidesPerView: 3 },
              992: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              575: { slidesPerView: 2 },
            }}
            className="!pb-12 w-full"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="grid grid-cols-1">
                <div className="bg-white p-6 border-2 relative">
                  <span className="absolute text-gray-200 text-6xl top-4 right-6">
                    &#8220;
                  </span>
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={testimonial.imgSrc}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <div className="text-yellow-500 text-lg mb-2">
                      {testimonial.rating}
                    </div>
                    <p className="text-gray-500 leading-relaxed">
                      {testimonial.content}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <div>
        {/* Banner Section */}
        <section
          className="py-16 text-center text-white"
          style={{
            backgroundImage:
              "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty6.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="px-4">
            <h2 className="text-4xl font-bold">
              <span className="block text-3xl font-bold uppercase mb-4">
                This Week Only
              </span>
              Get <span className="text-yellow-400">30% OFF</span>
            </h2>
            <h3 className="text-3xl mt-4">Quick Face Makeup</h3>
            <button
              onClick={handleModalOpen}
              className="mt-8 inline-block bg-transparent border border-white px-6 py-3 text-3xl text-white font-bold hover:bg-white hover:text-gray-800 transition"
            >
              Book an Appointment
            </button>
          </div>
        </section>
      </div>

      <footer className="bg-gray-100 py-8">
        <div className="flex flex-wrap lg:px-32 justify-center items-center px-4">
          {/* Footer Content */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            {/* Footer Contacts */}
            <div className="flex-1">
              <h5 className="text-lg font-bold mb-4">Get in Touch</h5>
              <p>{userDetails && userDetails.address && userDetails.address}</p>

              <p className="mt-2">
                <a
                  href="tel:123456789"
                  className="text-gray-700 hover:text-black"
                >
                  phone: +12 9 8765 4321
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@yourdomain.com"
                  className="text-gray-700 hover:text-black"
                >
                  hello@yourdomain.com
                </a>
              </p>
            </div>

            {/* Footer Info */}
            <div className="flex-1">
              <h5 className="text-lg font-bold mb-4">Working Hours</h5>
              <p>
                Mon-Fri: <span className="font-bold">10:00AM - 9:00PM</span>
              </p>
              <p>
                Saturday: <span className="font-bold">10:00AM - 7:00PM</span>
              </p>
              <p>
                Sunday: <span className="font-bold">10:00PM - 7:00PM</span>
              </p>
            </div>

            {/* Newsletter */}
            <div className="flex-1">
              <h5 className="text-lg font-bold mb-4">Secure your spot</h5>
              <p className="mb-4">
                Reserve your spot now before spaces run out!
              </p>

              <button
                onClick={handleModalOpen}
                className="w-full p-2 bg-black text-white font-bold rounded-md hover:bg-gray-700"
              >
                Book an appointment
              </button>
            </div>
          </div>

          {/* Bottom Footer */}
        </div>{" "}
        <div className="mt-10 text-center text-gray-800 text-sm">
          <p>
            <span>
              © {new Date().getFullYear()}{" "}
              <a
                href="https://dimpified.com"
                className="hover:text-amber-600"
                target="_blank"
              >
                Dimpified.
              </a>{" "}
              All Rights Reserved
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};
export default SecondMakeup;
