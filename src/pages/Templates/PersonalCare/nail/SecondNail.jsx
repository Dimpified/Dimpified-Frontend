import React, { useState } from "react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Nail } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";

// App Component
const SecondNail = ({ userDetails }) => {
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
        "From bridal nail fixes to everyday glam, their expertise is unmatched. They enhanced my natural beauty while making me feel confident and elegant. The products they used were top-notch!",
    },
    {
      imgSrc:
        "https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty6.jpg",
      name: "Chiamaka Eze",
      rating: "★★★★★",
      content:
        "The best nail fixing experience I’ve ever had! My skin looked radiant, and the nails stayed beautiful for a very long time. Their technique is flawless, and they truly understand different skin tones.",
    },
    {
      imgSrc:
        "https://gfa-tech.com/dimp-template-images/make-up/beauty/beauty5.jpg",
      name: "Yemi Adewale",
      rating: "★★★★★",
      content:
        "Their nail services have completely changed the way I feel about myself. Whether it’s for a photoshoot or a special event, they always deliver perfection. I wouldn't trust anyone else with my face!",
    },
  ];

  const galleryImages = [
    {
      id: 1,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails5.jpg",
      alt: "gallery-image",
    },
    {
      id: 2,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.jpg",
      alt: "gallery-image",
    },
    {
      id: 3,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails7.jpg",
      alt: "gallery-image",
    },
    {
      id: 4,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails8.jpg",
      alt: "gallery-image",
    },
    {
      id: 5,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails9.jpg",
      alt: "gallery-image",
    },
    {
      id: 6,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails10.jpg",
      alt: "gallery-image",
    },
  ];
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="font-Urbanist">
      <>
        {/* Transparent Navbar */}
        <header className="top-0 left-0 w-full z-10 text-white bg-black">
          <div className=" flex-wrap   px-4 py-6 flex justify-between items-center">
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
            backgroundImage:
              "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails1.jpg')",
          }}
        >
          <div className="text-center space-y-6 px-4">
            <h1 className="text-4xl md:text-8xl text-white font-bold">
              Make your nails look stunning
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
                Discover the Art of Professional Nail care
              </h2>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Step into a world of elegance and sophistication with our
                professional nail care services. From subtle everyday looks to
                glamorous transformations, our expert artists use premium
                products to enhance your natural beauty. Whether it’s for a
                wedding, a special event, or a personal makeover, we ensure
                every detail is tailored to your style, leaving you radiant and
                confident.
              </p>
            </div>

            {/* Image Block */}
            <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center">
              <img
                className="w-96 shadow-md rounded-full"
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails3.jpg"
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
              Where Beauty Meets Perfection
            </h2>
            <p className="text-slate-100  text-base leading-relaxed">
              Experience the magic of professional nail artistry. Whether it's a
              bridal look, red carpet glam, or a flawless everyday glow, our
              expert touch enhances your natural beauty. Using premium products
              and personalized techniques, we create timeless looks that radiate
              confidence and elegance.
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
                title: "Nail Care",
                description:
                  "Keep your nails strong and healthy with expert trimming, shaping, and cuticle care for a flawless finish.",
                icon: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails3.jpg",
              },
              {
                title: "Nail Art",
                description:
                  "Express your style with custom nail designs, intricate patterns, and vibrant colors for any occasion.",
                icon: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails8.jpg",
              },
              {
                title: "Add-Ons",
                description:
                  "Enhance your nails with luxurious extras like rhinestones, glitter, or specialty finishes for a unique touch.",
                icon: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails10.jpg",
              },
              {
                title: "Treatments",
                description:
                  "Pamper your hands and nails with nourishing treatments, including hydrating masks and strengthening formulas.",
                icon: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails1.jpg",
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
            {/* <ul className="space-y-4">
              {Nail.slice(0, Math.ceil(Nail.length / 2)).map(
                (service, index) => (
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
                      {getFormattedPrice(service.price, countryCode)}
                    </span>
                  </li>
                )
              )}
            </ul> */}

            {/* Right Column */}
            {/* <ul className="space-y-4">
              {Nail.slice(Math.ceil(Nail.length / 2)).map((service, index) => (
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
                    {getFormattedPrice(service.price, countryCode)}
                  </span>
                </li>
              ))}
            </ul> */}
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
        <div className="flex flex-wrap lg:px-32 px-4 justify-center items-center px-4">
          {/* Section Title */}
          <div className="text-center mb-12">
            <span className="text-slate-50 uppercase text-sm tracking-wide ">
              Be a more perfect
            </span>
            <h2 className="text-6xl text-pink-200 font-bold relative -top-6 opacity-10">
              A Whole New You
            </h2>
            <h2 className="text-4xl font-semibold text-slate-50 relative -top-16">
              Redefine Your Beauty
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
              src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails12.jpg"
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
              Elevate Your Beauty with Expert nail services
            </h2>

            {/* Accordion */}
            <div className="mt-6">
              {[
                {
                  title: "Certified nail Artists",
                  content:
                    "Our highly trained professionals specialize in creating flawless, customized looks for every occasion.",
                },
                {
                  title: "Premium nail Products",
                  content:
                    "We use high-end, skin-friendly cosmetics to enhance your natural glow while ensuring long-lasting perfection.",
                },
                {
                  title: "Seamless Online Booking",
                  content:
                    "Book your nail session effortlessly and get the VIP beauty experience at your convenience.",
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
            <span className="text-sm uppercase text-slate-50 font-medium">
              Booking Schedule
            </span>
            <h2 className="text-3xl font-bold mt-2">
              Available Appointment Hours
            </h2>
            <p className="mt-4 text-gray-600">
              Whether you need a natural daytime glow or a bold evening
              transformation, our expert nail services are available at your
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

      <section className="about-section py-12 bg-pink-600">
        <div className="flex flex-wrap lg:px-32 px-4 justify-center items-center">
          {/* Section Title */}
          <div className="text-center mb-12">
            <span className="text-gray-400 uppercase tracking-wide text-sm">
              It’s Your Time to Glow
            </span>
            <h2 className="text-4xl font-bold text-slate-50 relative">
              <span className="absolute top-8 left-0 transform -translate-x-1/2 -translate-y-1/2 opacity-10 text-8xl">
                Get Ready to Slay
              </span>
              Transform Your Look with Professional Nail Services
            </h2>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Image */}
            <div className="flex justify-center">
              <img
                className="shadow-md object-cover h-auto w-full max-w-xs rounded-xl"
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails9.jpg"
                alt="nail Tools"
              />
            </div>

            {/* Text + Image */}
            <div className="bg-pink-500 p-6 rounded-lg">
              <h4 className="text-lg font-bold mb-4 text-white">
                Because You Deserve the Best
              </h4>
              <p className="text-white mb-6">
                Our professional nail artists bring out your natural beauty with
                expert techniques and high-quality products.
              </p>
              <img
                className="shadow-md object-cover h-auto w-full rounded-xl max-w-xs"
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails10.jpg"
                alt="nail Application"
              />
            </div>

            {/* Right Image */}
            <div className="flex justify-center">
              <img
                className="shadow-md object-cover h-auto w-full max-w-xs rounded-xl"
                src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails11.jpg"
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
        <div className="flex flex-wrap  md:px-20 px-4 w-full max-w-screen-xl">
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
            className="!pb-12 !w-full"
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
            backgroundImage:
              "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails6.jpg')",
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
            <h3 className="text-3xl mt-4">Quick Nail Fixing</h3>
            <button
              onClick={handleModalOpen}
              className="mt-8 inline-block rounded-lg bg-transparent border hover:bg-pink-600 border-white hover:border-pink-600 px-6 py-3 text-3xl text-white font-bold  hover:text-white transition"
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
