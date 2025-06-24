import React, { useState, useEffect } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Nail } from "../../../../data/Services";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import axios from "axios";
import sanitizeHtml from "sanitize-html";
import { BlackContactForm } from "../../../../features/ContactForm/ContactForm";
import { getCurrencySymbol } from "../../../../helper/getCurrencySymbol";

// App Component
const SecondNail = ({ details, subdomain, userDetails }) => {
  const [activeAccordion, setActiveAccordion] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [services, setServices] = useState([]);
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
        setServices(allServices);
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
  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const testimonials = [
    {
      imgSrc: details && details.Reviews.image1,
      name: details && details.Reviews.header1,
      rating: details && details.Reviews.title1,
      content: details && details.Reviews.summary1,
    },
    {
      imgSrc: details && details.Reviews.image2,
      name: details && details.Reviews.header2,
      rating: details && details.Reviews.title2,
      content: details && details.Reviews.summary2,
    },
    {
      imgSrc: details && details.Reviews.image3,
      name: details && details.Reviews.header3,
      rating: details && details.Reviews.title3,
      content: details && details.Reviews.summary3,
    },
    {
      imgSrc: details && details.contactUs.heading1,
      name: details && details.contactUs.heading2,
      rating: details && details.contactUs.heading3,
      content: details && details.contactUs.heading4,
    },
  ];

  const galleryImages = [
    {
      id: 1,
      src: details && details.Gallery.image1,
      alt: "gallery-image",
    },
    {
      id: 2,
      src: details && details.Gallery.image2,
      alt: "gallery-image",
    },
    {
      id: 3,
      src: details && details.Gallery.image3,
      alt: "gallery-image",
    },
    {
      id: 4,
      src: details && details.Gallery.image4,
      alt: "gallery-image",
    },
    {
      id: 5,
      src: details && details.Gallery.image5,
      alt: "gallery-image",
    },
    {
      id: 6,
      src: details && details.Gallery.image6,
      alt: "gallery-image",
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="font-Urbanist">
      <>
        {/* Transparent Navbar */}
        <header className="absolute top-0 left-0 w-full z-10 text-white">
          <div className=" flex-wrap lg:px-32  px-4 py-6 flex justify-between items-center">
            <div className="text-3xl font-bold">
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}
            </div>
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
                className="px-4 py-2 border border-white rounded-lg    hover:border-pink-600 text-white  hover:bg-pink-600  transition font-bold"
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
                className="block px-4 py-2 border border-white    hover:border-pink-600 text-white  hover:bg-pink-600  text-center transition"
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
            backgroundImage: `url(${details && details.hero.backgroundImage1})`,
          }}
        >
          <div className="text-center space-y-6 px-4">
            <h1 className="text-4xl md:text-8xl text-white font-bold">
              {sanitizeContent(details && details.hero.title1)}
            </h1>
            <h1 className="text-4xl md:text-6xl text-white font-bold">
              with{" "}
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}
            </h1>
            <div className="mt-8">
              {" "}
              {/* Wrapper div to control spacing */}
              <button
                onClick={handleModalOpen}
                className="px-6 py-3 border rounded-lg border-white hover:border-pink-600 text-white  hover:bg-pink-600  transition uppercase"
              >
                {sanitizeContent(details && details.hero.buttonText1)}
              </button>
            </div>
            {isModalOpen && (
              <BookingModal
                isOpen={isModalOpen}
                handleClose={handleModalClose}
                information={services}
                subdomain={subdomain}
                serviceCurrency={currency}
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
                {sanitizeContent(details && details.aboutUs.title1)}
              </span>
              <h2 className="text-3xl font-bold mt-4 text-gray-900 leading-snug">
                {sanitizeContent(details && details.aboutUs.title2)}
              </h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
                {sanitizeContent(details && details.aboutUs.text1)}
              </p>
            </div>

            {/* Image Block */}
            <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center">
              <img
                className="w-96 shadow-md rounded-full"
                src={details && details.aboutUs.image1}
                alt="Professional nail Session"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="w-full bg-pink-600 py-8 lg:py-20 ">
        {/* Header Section */}
        <section id="services" className="text-center ">
          <div className="container mx-auto lg:px-32 px-4 justify-center items-center">
            <h2 className="text-4xl font-semibold text-white mb-4">
              {sanitizeContent(details && details.Events.heading)}
            </h2>
            <p className="text-slate-100  text-base leading-relaxed">
              {sanitizeContent(details && details.Events.summary)}
            </p>
          </div>
        </section>

        {/* Services Section */}
        <div className="pt-20 max-w-6xl mx-auto px-4">
          {/* Image Section */}

          {/* Service Section */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            {[
              {
                title: details && details.Events.section1header,
                description: details && details.Events.section1paragraphy,
                icon: details && details.Events.sectionImage1,
              },
              {
                title: details && details.Events.section2header,
                description: details && details.Events.section2paragraphy,
                icon: details && details.Events.sectionImage2,
              },
              {
                title: details && details.Events.section3header,
                description: details && details.Events.section3paragraphy,
                icon: details && details.Events.sectionImage3,
              },
              {
                title: details && details.Events.section4header,
                description: details && details.Events.section4paragraphy,
                icon: details && details.Events.sectionImage4,
              },
            ].map((service, index) => (
              <div key={index} className="space-y-4">
                <img
                  src={service.icon}
                  alt={service.title}
                  className="mx-auto w-36 h-36 rounded-full"
                />
                <h3 className="font-semibold text-lg text-slate-50">
                  {service.title}
                </h3>
                <p className="text-slate-50 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div id="pricing" className="py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="text-center mb-10">
            <span className="text-slate-50 uppercase tracking-wide text-sm">
              Focus On Beauty
            </span>
            <h2 className="text-gray-800 text-4xl font-semibold mt-2">
              Popular services
            </h2>
            <h3 className="text-lg text-gray-600 mt-4">Enhance Your Beauty</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <ul className="space-y-4">
              {services
                .slice(0, Math.ceil(services.length / 2))
                .map((service, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-gray-300 pb-4"
                  >
                    <div>
                      <h4 className="text-lg font-medium">{service.name}</h4>
                      <p className="text-sm text-slate-50">
                        {service.shortDescription}
                      </p>
                    </div>
                    <span className="text-xl font-semibold text-gray-800">
                      {getCurrencySymbol(currency)}{service.price}
                    </span>
                  </li>
                ))}
            </ul>

            {/* Right Column */}
            <ul className="space-y-4">
              {services
                .slice(Math.ceil(services.length / 2))
                .map((service, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b border-gray-300 pb-4"
                  >
                    <div>
                      <h4 className="text-lg font-medium">{service.name}</h4>
                      <p className="text-sm text-slate-50">
                        {service.shortDescription}
                      </p>
                    </div>
                    <span className="text-xl font-semibold text-gray-800">
                      {getCurrencySymbol(currency)}{service.price}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          {/* Button */}
          <div className="text-center mt-10">
            <button
              onClick={handleModalOpen}
              className="inline-block bg-transparent border-2 border-pink-600 text-pink-600 py-2 px-6 rounded-lg hover:bg-pink-600 hover:text-white transition-all"
            >
              Book Now!
            </button>
          </div>
        </div>
      </div>
      <section id="gallery" className="py-16 bg-pink-600">
        <div className="flex flex-wrap lg:px-32 justify-center items-center px-4">
          {/* Section Title */}
          <div className="text-center mb-12">
            <span className="text-slate-50 uppercase text-sm tracking-wide ">
              {sanitizeContent(details && details.Gallery.summary1)}
            </span>
            <h2 className="text-6xl text-pink-200 font-bold relative -top-6 opacity-10">
              {sanitizeContent(details && details.Gallery.summary3)}
            </h2>
            <h2 className="text-4xl font-semibold text-slate-50 relative -top-16">
              {sanitizeContent(details && details.Gallery.summary2)}
            </h2>
          </div>

          {/* Gallery Images */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="col-span-2 md:col-span-2">
              <img
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
            <div className="col-span-5">
              <img
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
            <div className="col-span-3 space-y-4">
              <img
                src={galleryImages[2].src}
                alt={galleryImages[2].alt}
                className="w-full h-auto object-cover rounded-xl"
              />
              <img
                src={galleryImages[3].src}
                alt={galleryImages[3].alt}
                className="w-full h-auto object-cover rounded-xl"
              />
            </div>
            <div className="col-span-2 space-y-4">
              <img
                src={galleryImages[4].src}
                alt={galleryImages[4].alt}
                className="w-full h-auto object-cover rounded-xl"
              />
              <img
                src={galleryImages[5].src}
                alt={galleryImages[5].alt}
                className="w-full h-auto object-cover rounded-xl"
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
              src={details && details.Blog.image1}
              alt="Glamorous Nail Look"
              className="w-96 shadow-lg rounded-full"
            />
          </div>

          {/* Text and Accordion */}
          <div className="w-full lg:w-1/2">
            <span className="text-sm uppercase text-slate-50 font-medium">
              Time to Shine
            </span>
            <h2 className="text-3xl font-bold mt-2">
              {sanitizeContent(details && details.Blog.header1)}
            </h2>

            {/* Accordion */}
            <div className="mt-6">
              {[
                {
                  title: details && details.Blog.content1,
                  content: details && details.Blog.summary1,
                },
                {
                  title: details && details.Blog.content2,
                  content: details && details.Blog.summary2,
                },
                {
                  title: details && details.Blog.content3,
                  content: details && details.Blog.summary3,
                },
              ].map((item, index) => (
                <div key={index} className="border-b border-gray-200">
                  <button
                    className="w-full flex justify-between items-center py-3 text-left font-medium text-gray-700 focus:outline-none"
                    onClick={() => toggleAccordion(index)}
                  >
                    {sanitizeContent(item.title)}
                    <span>{activeAccordion === index ? "-" : "+"}</span>
                  </button>
                  {activeAccordion === index && (
                    <div className="py-2 text-gray-600">
                      {" "}
                      {sanitizeContent(item.content)}
                    </div>
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
            <span className="text-sm uppercase text-slate-50 font-medium">
              Booking Schedule
            </span>
            <h2 className="text-3xl font-bold mt-2">
              {sanitizeContent(details && details.Blog.date3)}
            </h2>
            <p className="mt-4 text-gray-600">
              {sanitizeContent(details && details.Blog.author3)}
            </p>
          </div>

          {/* Table */}
          <div className="w-full lg:w-1/2">
            <table className="w-full text-left border-collapse">
              <tbody>
                {[
                  {
                    day: details && details.Blog.buttonText3,
                    time: details && details.Blog.date4,
                  },
                  {
                    day: details && details.Blog.image4,
                    time: details && details.Blog.author4,
                  },
                  {
                    day: details && details.Blog.header4,
                    time: details && details.Blog.content4,
                  },
                  {
                    day: details && details.Blog.summary4,
                    time: details && details.Blog.buttonText4,
                  },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className={index % 2 === 0 ? "bg-gray-50" : ""}
                  >
                    <td className="py-3 px-4 border-b border-gray-200">
                      {sanitizeContent(row.day)}
                    </td>
                    <td className="py-3 px-4 border-b border-gray-200 text-right">
                      {sanitizeContent(row.time)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <section className="about-section py-12 bg-pink-600">
        <div className="flex flex-wrap lg:px-32 px-4 justify-center items-center">
          {/* Section Title */}
          <div className="text-center mb-12">
            <span className="text-gray-400 uppercase tracking-wide text-sm">
              {sanitizeContent(details && details.Patrners.section2header)}
            </span>
            <h2 className="text-4xl font-bold text-slate-50 relative">
              <span className="absolute top-8 left-0 transform -translate-x-1/2 -translate-y-1/2 opacity-10 text-8xl">
                {sanitizeContent(details && details.Patrners.section1header)}
              </span>
              {sanitizeContent(details && details.Patrners.section3header)}
            </h2>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Image */}
            <div className="flex justify-center">
              <img
                className="shadow-md object-cover h-auto w-full max-w-xs rounded-xl"
                src={details && details.Patrners.sectionImage1}
                alt="nail Tools"
              />
            </div>

            {/* Text + Image */}
            <div className="bg-pink-500 p-6 rounded-lg">
              <h4 className="text-lg font-bold mb-4 text-white">
                {sanitizeContent(details && details.Patrners.section4header)}
              </h4>
              <p className="text-white mb-6">
                {sanitizeContent(details && details.Patrners.buttonText1)}
              </p>
              <img
                className="shadow-md object-cover h-auto w-full rounded-xl max-w-xs"
                src={details && details.Patrners.sectionImage2}
                alt="nail Application"
              />
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <img
                className="shadow-md object-cover h-auto w-full max-w-xs rounded-xl"
                src={details && details.Patrners.sectionImage3}
                alt="nail Products"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        {/* Section Title */}
        <div className="text-center mb-10">
          <p className="uppercase text-slate-50 tracking-widest text-sm">
            Client Testimonials
          </p>
          <h2 className="text-2xl font-bold">What Our Clients Say</h2>
        </div>

        {/* Swiper Carousel */}
        <div className="flex flex-wrap md:px-32 px-4">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000, // Auto-swipes every 3 seconds
              disableOnInteraction: false, // Keeps autoplay even when interacting
            }}
            breakpoints={{
              1200: { slidesPerView: 3 },
              992: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              575: { slidesPerView: 2 },
            }}
            className="!pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index} className="grid grid-cols-1 ">
                <div className="bg-white p-6  border-2 relative">
                  {/* Quote Icon */}
                  <span className="absolute text-gray-200 text-6xl top-4 right-6">
                    &#8220;
                  </span>
                  {/* Testimonial Content */}
                  <div className="flex flex-col items-center text-center">
                    <img
                      src={testimonial.imgSrc}
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover mb-4"
                    />
                    <h3 className="text-lg font-bold">{testimonial.name}</h3>
                    <div className="text-pink-600 text-lg mb-2">
                      {testimonial.rating}
                    </div>
                    <p className="text-slate-700 leading-relaxed">
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
            backgroundImage: `url(${details && details.LargeCta.image1})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="px-4">
            <h2 className="text-4xl font-bold">
              <span className="block text-3xl font-bold uppercase mb-4">
                {details && details.LargeCta.header1}
              </span>
              <span className="text-yellow-400">
                {" "}
                {details && details.LargeCta.header2}
              </span>
            </h2>
            <h3 className="text-3xl mt-4">
              {" "}
              {details && details.LargeCta.header3}
            </h3>
            <button
              onClick={handleModalOpen}
              className="mt-8 inline-block rounded-lg bg-transparent border hover:bg-pink-600 border-white hover:border-pink-600 px-6 py-3 text-3xl text-white font-bold  hover:text-white transition"
            >
              Book an Appointment
            </button>
          </div>
        </section>
      </div>
<BlackContactForm ecosystemDomain={subdomain} />
      <footer className="bg-gray-100 py-8">
        <div className="flex flex-wrap lg:px-32 justify-center items-center px-4">
          {/* Footer Content */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            {/* Footer Contacts */}
            <div className="flex-1">
              {details?.footer?.header && (
                <h5 className="text-lg font-bold mb-4">
                  {details.footer.header}
                </h5>
              )}
              {userDetails?.address && <p>{userDetails.address}</p>}

              {userDetails?.phoneNumber && (
                <p className="mt-2">
                  <a
                    href={`tel:${userDetails.phoneNumber}`}
                    className="text-gray-700 hover:text-black"
                  >
                    {details?.footer?.title2 && `${details.footer.title2}: `}
                    {userDetails.phoneNumber}
                  </a>
                </p>
              )}

              {userDetails?.email && (
                <p>
                  <a
                    href={`mailto:${userDetails.email}`}
                    className="text-gray-700 hover:text-black"
                  >
                    {userDetails.email}
                  </a>
                </p>
              )}
            </div>

            {/* Footer Info */}
            <div className="flex-1">
              <h5 className="text-lg font-bold mb-4">
                {details && details.footer.title4}
              </h5>
              <p>
                
                <span className="font-bold">
                  {" "}
                  {details && details.footer.paragraph3}
                </span>
              </p>
              <p>
                
                <span className="font-bold">
                  {" "}
                  {details && details.footer.paragraph4}
                </span>
              </p>
              <p>
               
                <span className="font-bold">
                  {" "}
                  {details && details.footer.paragraph5}
                </span>
              </p>
            </div>

            {/* Newsletter */}
            <div className="flex-1">
              <p className="mb-4">{details && details.footer.paragraph6}</p>

              <button
                onClick={handleModalOpen}
                className="w-full p-2 bg-pink-600 b hover:border-pink-600 hover:bg-white hover:text-pink-600 text-white font-bold rounded-md"
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
export default SecondNail;
