import React, { useEffect, useState } from "react";
import { FiPlay } from "react-icons/fi";
import { barber } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
const BarberFresh = ({ userDetails }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
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

  const galleryItems = [
    {
      id: 1,
      image:
        "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber6.jpg",
    },
    {
      id: 2,
      image:
        "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber7.jpg",
    },
    {
      id: 3,
      image:
        "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber8.jpg",
    },
    {
      id: 4,
      image:
        "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber9.jpg",
    },
  ];
  const specialists = [
    {
      name: "Tunde",
      designation: "Hair Specialist",
      image:
        "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber12.jpg",
    },
    {
      name: "Shade",
      designation: "Hair Specialist",
      image:
        "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber13.jpg",
    },
    {
      name: "Damola",
      designation: "Hair Specialist",
      image:
        "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber14.jpg",
    },
    {
      name: "Rukky",
      designation: "Hair Specialist",
      image:
        "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber15.jpg",
    },
  ];
  const testimonialsData = [
    {
      id: 1,
      image:
        "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber12.jpg",
      text: "Quis autem vel eum iure repreh enderit quin voluptate velit esse quam nihil molestiae consequa tur veillumqus dolore fugiat quo voluptas pariatuLorem psum",
      name: "Donald A. Guthrie",
      designation: "Senior Manager",
      rating: 4.5,
    },
    {
      id: 2,
      image:
        "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber14.jpg",
      text: "Sed ut perspiciatis unde omnis natus error sit voluac cusantium doloremque laudantium totame rem aperiam eaque quae abillo inventore veritatis et quase",
      name: "Justin D. Thompson",
      designation: "Senior Manager",
      rating: 4.5,
    },
    {
      id: 3,
      image:
        "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber13.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      name: "Alice B. Johnson",
      designation: "Creative Director",
      rating: 5,
    },
    {
      id: 4,
      image:
        "https://gfa-tech.com/dimp-template-images/barber//barbernew/barber11.jpg",
      text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
      name: "Michael T. Parker",
      designation: "CEO",
      rating: 4.8,
    },
  ];
  return (
    <div className="font-jak">
      <header
        className={` top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black bg-opacity-90 text-white shadow-md"
            : "bg-transparent text-black"
        }`}
      >
        <div className="flex-wrap flex justify-between items-center py-4 px-4 lg:px-32">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <a
              href="#"
              className="text-2xl font-Raj font-bold uppercase text-yellow-500"
            >
              {userDetails && userDetails.ecosystemName
                ? userDetails.ecosystemName
                : ""}
            </a>
          </div>

          {/* Desktop Navbar */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6 text-md  font-bold">
              <li>
                <a href="#home" className="hover:text-yellow-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-yellow-500">
                  Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-yellow-500">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-yellow-500">
                  Gallery
                </a>
              </li>

              <li>
                <a href="#team" className="hover:text-yellow-500">
                  Team
                </a>
              </li>
            </ul>
          </nav>

          {/* Appointment Button */}
          <button
            onClick={handleModalOpen}
            className="hidden md:inline-block px-5 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition uppercase font-bold"
          >
            Book an appointment
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Open Menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-black bg-opacity-90 text-white shadow-md md:hidden">
            <ul className="flex flex-col space-y-4 py-4 px-6">
              <li>
                <a href="#home" className="hover:text-yellow-500">
                  Home
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-yellow-500">
                  Services
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-yellow-500">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-yellow-500">
                  Gallery
                </a>
              </li>

              <li>
                <a href="#team" className="hover:text-yellow-500">
                  Team
                </a>
              </li>
            </ul>
            <button
              onClick={handleModalOpen}
              className="hidden md:inline-block px-5 py-2 rounded-md bg-yellow-500 text-white hover:bg-yellow-600 transition uppercase font-bold"
            >
              Book an appointment
            </button>
          </div>
        )}
      </header>
      <section
        id="home"
        className="hero-section bg-cover bg-center lg:h-screen h-[700px] text-white relative"
        style={{
          backgroundImage: `url('https://gfa-tech.com/dimp-template-images/barber/barbernew/barber2.jpg')`,
        }}
      >
        {isModalOpen && (
          <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Content */}
        <div className="flex flex-wrap relative z-10 h-full items-center px-6 lg:px-32">
          <div className="flex flex-col md:flex-row justify-between items-center w-full">
            {/* Text Section */}
            <div className="max-w-lg text-left">
              <h1 className="text-5xl md:text-8xl uppercase font-bold mb-4">
                {userDetails && userDetails.ecosystemName
                  ? userDetails.ecosystemName
                  : ""}{" "}
                Barbing Salon
              </h1>
              <p className="mb-6 leading-relaxed text-lg">
                Step into a world where precision meets style. Whether you need
                a sharp cut, a classic shave, or a premium hair treatment, our
                expert barbers ensure you leave looking and feeling your best.
              </p>
              <button
                onClick={handleModalOpen}
                className="bg-yellow-500 text-white px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition"
              >
                Book an Appointment →
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-32 lg:pb-24 -mt-16 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            {/* Image Section */}
            <div className="w-full xl:w-1/3">
              <div
                className="bg-cover bg-center h-full rounded-md shadow-lg overflow-hidden"
                style={{
                  backgroundImage:
                    "url('https://gfa-tech.com/dimp-template-images/barber//barbernew/barber3.jpg')",
                  minHeight: "400px",
                }}
              ></div>
            </div>

            {/* Services Section */}
            <div className="w-full xl:w-2/3 flex flex-col justify-center bg-white p-8 rounded-md shadow-md">
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-4">
                  Our Premium Services
                </h2>
                <p className="text-gray-700">
                  {userDetails && userDetails.ecosystemDescription
                    ? userDetails.ecosystemDescription
                    : ""}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Service - Hair Cutting */}
                <div className="p-6 border rounded-md bg-white flex items-start">
                  <div className="mr-4">
                    <i className="text-yellow-600 text-3xl flaticon-scissors"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">
                      Precision Haircuts
                    </h4>
                    <p>
                      Our skilled barbers craft haircuts that suit your
                      personality and lifestyle, ensuring a sharp and polished
                      look.
                    </p>
                  </div>
                </div>

                {/* Service - Classic Shavings */}
                <div className="p-6 border rounded-md bg-white flex items-start">
                  <div className="mr-4">
                    <i className="text-yellow-600 text-3xl flaticon-straight-razor"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">Classic Shaves</h4>
                    <p>
                      Experience the luxury of a hot towel shave, leaving your
                      skin smooth, refreshed, and irritation-free.
                    </p>
                  </div>
                </div>

                {/* Service - Hair Dyeing */}
                <div className="p-6 border rounded-md bg-white flex items-start">
                  <div className="mr-4">
                    <i className="text-yellow-600 text-3xl flaticon-beauty-treatment"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">
                      Professional Hair Coloring
                    </h4>
                    <p>
                      From subtle highlights to bold transformations, our expert
                      coloring services help you achieve the perfect shade.
                    </p>
                  </div>
                </div>

                {/* Service - Hair Treatments */}
                <div className="p-6 border rounded-md bg-white flex items-start">
                  <div className="mr-4">
                    <i className="text-yellow-600 text-3xl flaticon-hot-stones"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-2">
                      Scalp & Hair Treatments
                    </h4>
                    <p>
                      Rejuvenate your hair with our deep-conditioning and scalp
                      treatments for a healthier, shinier look.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 lg:px-32 py-16">
        <div className="flex flex-wrap items-center justify-between">
          {/* Left Image */}
          <div className="w-full md:w-1/3 p-4">
            <img
              src="https://gfa-tech.com/dimp-template-images/barber//barbernew/barber4.jpg"
              alt="Barbershop Interior"
              className="w-full rounded-md shadow-lg"
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/3 p-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight">
              Excellence in Grooming & Styling
            </h2>
            <p className="mt-4 text-gray-600 leading-relaxed">
              At our barbershop, precision meets artistry. We specialize in
              premium haircuts, classic shaves, and expert styling that enhance
              your look and confidence. With years of experience and a passion
              for grooming, we ensure every visit is an experience of luxury and
              comfort.
            </p>

            {/* Author */}
            <div className="mt-8 flex flex-col items-center">
              <img
                src="https://gfa-tech.com/dimp-template-images/barber//barbernew/barber5.jpg"
                alt="Barber Owner"
                className="mt-2 object-cover rounded-full w-12 h-12"
              />
              <div className="mt-4">
                <h4 className="text-lg font-semibold">Ridwan Olamilekan</h4>
                <p className="text-gray-500 text-sm">Founder & Lead Barber</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/3 p-4">
            <img
              src="https://gfa-tech.com/dimp-template-images/barber//barbernew/barber5.jpg"
              alt="Professional Barber"
              className="w-full rounded-md shadow-lg"
            />
          </div>
        </div>
      </section>

      <section className="bg-yellow-500 text-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            Ready to get our service?
          </h2>
          <button
            onClick={handleModalOpen}
            className="inline-block mt-4 px-6 py-3 bg-transparent border border-white text-white rounded-md hover:bg-white hover:text-yellow-500 transition"
          >
            Book Appointment Now
          </button>
        </div>
      </section>

      {/* <section
        className="relative z-10 py-16 lg:px-32 px-4 bg-gray-50"
        id="services"
      >
        <div className="flex flex-col">
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-black uppercase">
              Our Services
            </h2>
            <p className="mt-3 text-gray-500">
              Experience top-tier grooming services tailored just for you.{" "}
              <br />
              From classic cuts to modern styles, we've got you covered.
            </p>
          </div>

          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {barber.map((service, index) => (
              <div key={index} className="relative bg-white shadow-lg group">
                <div className="relative overflow-hidden bg-gradient-to-b rounded-md from-black via-transparent to-black">
                  <button onClick={handleModalOpen}>
                    <img
                      src={service.serviceImage}
                      alt={service.name}
                      className="object-cover opacity-80 group-hover:opacity-100 transition-all duration-300"
                    />
                  </button>
                  <div className="absolute bottom-0 left-0 w-full px-6 py-2 bg-gradient-to-r from-black/60 to-[#cb54d1]/60 backdrop-blur-lg border border-white/20 shadow-xl">
                    <button onClick={handleModalOpen}>
                      <h3 className="text-white text-lg font-semibold">
                        {service.name}
                      </h3>
                    </button>
                    <p className="text-white text-xs opacity-80">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
        <div className="absolute top-0 left-0">
          <img
            src="https://gfa-tech.com/dimp-template-images/barber/barbernew/barber22.jpg"
            alt="Decorative Shape"
            className="w-24 h-24"
          />
        </div>
        <div className="absolute bottom-0 right-0">
          <img
            src="https://gfa-tech.com/dimp-template-images/barber/barbernew/barber23.jpg"
            alt="Decorative Shape"
            className="w-24 h-24"
          />
        </div>
      </section> */}

      {/* <section
        className="py-12 bg-gray-100"
        id="pricing"
        style={{
          backgroundImage: `url(https://gfa-tech.com/dimp-template-images/barber/barbernew/barber24.jpg)`,
        }}
      >
        <div className="container mx-auto max-w-6xl bg-white rounded-md shadow-lg">
         =
          <div className="text-center py-8 bg-black text-white">
            <h2 className="text-4xl font-bold uppercase">
              Affordable Pricing Plans
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Premium grooming at unbeatable prices. <br />
              Choose the perfect service that suits your style.
            </p>
          </div>

          =
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </section> */}

      <section id="gallery" className="pt-28 pb-20 bg-[#f9f9f9] px-4 lg:px-24">
        <div className="container mx-auto">
          {/* Section Header */}
          <div className="flex flex-wrap justify-between items-end mb-10">
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
              <h2 className="text-4xl font-bold text-gray-800">
                Latest Photo Gallery
              </h2>
              <p className="mt-2 text-gray-600">
                Explore our finest haircuts, styles, and grooming services.{" "}
                <br />
                Get inspired for your next transformation.
              </p>
            </div>
            <div className="w-full lg:w-auto">
              <a
                href="Gallery.html"
                className="inline-block bg-yellow-500 text-white font-medium py-3 px-6 rounded hover:bg-yellow-600 transition duration-300"
              >
                Explore More Gallery{" "}
                <i className="fas fa-long-arrow-alt-right ml-2"></i>
              </a>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item) => (
              <div
                key={item.id}
                className="relative group overflow-hidden rounded-md shadow-lg bg-white"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-gray-300">{item.description}</p>
                  <a
                    href="Gallery-details.html"
                    className="mt-4 inline-block bg-yellow-500 text-white font-medium py-2 px-4 rounded hover:bg-yellow-600 transition duration-300"
                  >
                    <i className="fas fa-long-arrow-alt-right"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-2 bg-[#faf3eb]" id="contact">
        <div className="container mx-auto px-4 py-12 flex flex-wrap">
          {/* Left Content */}
          <div className="w-full lg:w-1/3 flex justify-center lg:justify-start">
            <div className="bg-[#d8a44d] text-white text-center py-10 px-8 lg:py-16 lg:px-12 shadow-lg">
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-4">
                  Come &<br /> Experience Freshness
                </h2>
                <p className="text-sm">
                  Premium grooming services tailored to your style and comfort.
                </p>
              </div>
              <button
                onClick={handleModalOpen}
                className="inline-block mt-6 text-sm bg-white text-[#d8a44d] border border-white py-2 px-6 rounded-md shadow-md transition hover:bg-transparent hover:text-white"
              >
                Book Appointment
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-2/3 mt-8 lg:mt-0 flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src="https://gfa-tech.com/dimp-template-images/barber/barbernew/barber2.jpg"
                alt="Video"
                className="rounded-md shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      <section id="team" className="pt-16 pb-16 bg-white px-4 lg:px-32">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Meet Our Specialists</h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Our team of experienced professionals is here to bring your vision
            to life.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {specialists.map((specialist, index) => (
            <div key={index} className="flex flex-col items-center space-y-4">
              <img
                src={specialist.image}
                alt={specialist.name}
                className="w-40 h-40 sm:w-72 sm:h-72 rounded-md shadow-lg"
              />
              <div className="text-center">
                <h3 className="text-lg sm:text-xl font-semibold">
                  {specialist.name}
                </h3>
                <p className="text-yellow-500">{specialist.designation}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer
        className="bg-black text-white py-6 bg-cover"
        style={{
          backgroundImage: `url('/assets/images/background/footer.png')`,
        }}
      >
        <div className="container mx-auto px-4 lg:px-32">
          {/* Grid Layout for Better Responsiveness */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-6">
            {/* Logo Section */}
            <div className="flex flex-col items-center sm:items-start">
              <a
                href="#"
                className="text-2xl font-bold uppercase text-yellow-500"
              >
                {userDetails && userDetails.ecosystemName}
              </a>
            </div>

            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-bold mb-4">Quick Links</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="services.html"
                    className="hover:text-yellow-400 transition"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="about.html"
                    className="hover:text-yellow-400 transition"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="Gallery.html"
                    className="hover:text-yellow-400 transition"
                  >
                    Gallery
                  </a>
                </li>
              </ul>
            </div>

            {/* Business Section */}
            <div>
              <h5 className="text-lg font-bold mb-4">Business</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#services"
                    className="hover:text-yellow-400 transition"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-yellow-400 transition"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#team" className="hover:text-yellow-400 transition">
                    Team
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h5 className="text-lg font-bold mb-4">Contact Us</h5>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <i className="far fa-map-marker-alt text-yellow-400 mr-3"></i>
                  <span>{userDetails && userDetails.address}</span>
                </li>
                <li className="flex items-start">
                  <i className="far fa-phone text-yellow-400 mr-3"></i>
                  <a href="tel:+0123456789" className="hover:text-yellow-400">
                    {userDetails && userDetails.phoneNumber}
                  </a>
                </li>
                <li className="flex items-start">
                  <i className="far fa-clock text-yellow-400 mr-3"></i>
                  <span>Sun - Friday, 08 am - 09 pm</span>
                </li>
                <li className="flex items-start">
                  <i className="far fa-envelope text-yellow-400 mr-3"></i>
                  <a
                    href="mailto:support@gmail.com"
                    className="hover:text-yellow-400"
                  >
                    support@gmail.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="text-center border-t border-gray-700 mt-6 pt-4">
            <p>
              © {new Date().getFullYear()}{" "}
              <a href="https://dimpified.com" className="hover:text-yellow-400">
                Dimpified
              </a>
              . All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BarberFresh;
