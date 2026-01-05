import React, { useState } from "react";
import {
  FaBars,
  FaTooth,
  FaPhoneAlt,
  FaCheck,
  FaMapMarkerAlt,
  FaEnvelope,
  FaChevronLeft,
  FaChevronRight,
  FaFacebookF,
  FaTwitter,
  FaPhone,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { dental } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ContactCard = ({ icon, title, description }) => (
  <div className="inline-flex items-center gap-4">
    <span className="bg-[#1E84B5] p-2 rounded-full">
      <img src={icon} alt={title} className="w-12 h-12" />
    </span>
    <div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const SecondDentist = ({ userDetails }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  // const { country } = useCountry();
  //  // Access country code from context
  // const countryCode = country || "NG";
   // Fallback to 'US'

  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const nextSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex + itemsPerPage >= testimonials.length
        ? 0
        : prevIndex + itemsPerPage
    );
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? testimonials.length - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  const testimonials = [
    {
      id: 1,
      name: "Amara Okonkwo",
      role: "Patient",
      image: "https://gfa-tech.com/dimp-template-images/dentist/dentist-1.jpg",
      quoteIcon:
        "https://gfa-tech.com/dimp-template-images/dentist/icon-quote.png",
      text: "I want to say thank you! The entire process was seamless, and the care I received was exceptional. I am now free from my fear of dental procedures.",
    },
    {
      id: 2,
      name: "Tolu Adebayo",
      role: "Patient",
      image: "https://gfa-tech.com/dimp-template-images/dentist/dentist-1.jpg",
      quoteIcon:
        "https://gfa-tech.com/dimp-template-images/dentist/icon-quote.png",
      text: "The team made me feel so comfortable. The staff was kind and patient, and the results were beyond my expectations. Thank you for the amazing service!",
    },
    {
      id: 3,
      name: "Chinwe Eze",
      role: "Patient",
      image: "https://gfa-tech.com/dimp-template-images/dentist/dentist-3.jpg",
      quoteIcon:
        "https://gfa-tech.com/dimp-template-images/dentist/icon-quote.png",
      text: "Visiting this clinic changed my perception of dental care. The environment was welcoming, and the treatment was top-notch. Highly recommend them!",
    },
    {
      id: 4,
      name: "Kunle Adeyemi",
      role: "Patient",
      image: "https://gfa-tech.com/dimp-template-images/dentist/dentist-2.jpg",
      quoteIcon:
        "https://gfa-tech.com/dimp-template-images/dentist/icon-quote.png",
      text: "The professionalism and warmth at this clinic are unmatched. Every step of the way, I felt cared for. I’m truly grateful for their service.",
    },
    {
      id: 5,
      name: "Zainab Bello",
      role: "Patient",
      image: "https://gfa-tech.com/dimp-template-images/dentist/dentist-4.jpg",
      quoteIcon:
        "https://gfa-tech.com/dimp-template-images/dentist/icon-quote.png",
      text: "From booking the appointment to the post-treatment care, everything was handled perfectly. I couldn’t be happier with the outcome!",
    },
  ];

   const teamMembers = [
    {
      name: "Dr. Emeka Okoro",
      role: "Senior Dentist",
      image: "https://i.imghippo.com/files/Lvu9153Wp.jpg",
    },
    {
      name: "Dr. Funmi Adewale",
      role: "Orthodontist",
      image: "https://i.imghippo.com/files/NNJ9852io.jpg",
    },
    {
      name: "Dr. Tolu Bamidele",
      role: "Pediatric Dentist",
      image: "https://i.imghippo.com/files/kU6460c.jpg",
    },
    {
      name: "Dr. Aminat Rufai",
      role: "Periodontist",
      image: "https://i.imghippo.com/files/xVt8555fhk.jpg",
    },
  ];

   const features = [
    {
      id: 1,
      icon: "https://i.imghippo.com/files/FFnZ8241w.png",
      title: "Personalized Care For Patient",
      description:
        "We understand that each patient is unique, and we listen to concerns.",
    },
    {
      id: 2,
      icon: "https://i.imghippo.com/files/nSHe3154QEQ.png",
      title: "Cutting Edge Technology",
      description:
        "We invest in the latest dental technology to provide top-notch care.",
    },
    {
      id: 3,
      icon: "https://i.imghippo.com/files/TYJ9965rqw.png",
      title: "Family Friendly",
      description: "No matter your age or dental needs, we are here to help.",
    },
  ];

  const stats = [
    { id: 1, number: "20+", label: "Years Of Experience" },
    { id: 2, number: "5M+", label: "Happy Patients" },
    { id: 3, number: "986+", label: "Treatment Completed" },
  ];

  return (
    <div>
      <header className="bg-white shadow-md relative">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center text-gray-800">
            <img
              src="https://i.imghippo.com/files/rCvw1845yLI.png"
              alt="logo"
              className="w-17 h-10 mr-2"
            />
            <span className="text-md text-[#1E84B5] font-semibold leading-tight">
              {userDetails?.ecosystemName} <br />
            </span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <a href="#home" className="hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600">
              About Us
            </a>
            <a href="#services" className="hover:text-blue-600">
              Services
            </a>
            <a href="#how" className="hover:text-blue-600">
              How we work?
            </a>
          </nav>

          {/* Book Appointment Button */}
          <button
            onClick={handleModalOpen}
            className="hidden md:block bg-[#1E84B5] text-white px-5 py-2 rounded-full hover:bg-[#0F3A51] transition"
          >
            Book Appointment →
          </button>

          {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Mobile Menu - No Absolute Positioning */}
        <div
          className={`md:hidden bg-white shadow-md w-full transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col space-y-4 p-6">
            <a href="#home" className="hover:text-blue-600">
              Home
            </a>
            <a href="#about" className="hover:text-blue-600">
              About Us
            </a>
            <a href="#services" className="hover:text-blue-600">
              Services
            </a>
            <a href="#how" className="hover:text-blue-600">
              How we work?
            </a>
            <button
              onClick={handleModalOpen}
              className="bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-[#0F3A51] transition text-center"
            >
              Book Appointment →
            </button>
          </ul>
        </div>
      </header>
      <section
        id="home"
        className="relative bg-cover bg-center md:h-screen h-[70vh] flex items-center justify-center text-white"
        style={{
          backgroundImage:
            "url(https://i.imghippo.com/files/aJQ6779iCs.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        <div className="flex flex-col md:px-32 px-6 text-center justify-center items-center  relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Exceptional dental <br />
            care for every stage <br /> of your journey
          </h1>
          <p className="mb-6 text-lg ">
            We are committed to providing top-notch dental care in a <br />{" "}
            comfortable and friendly environment.
          </p>

          <button
            onClick={handleModalOpen}
            className=" bg-[#1E84B5] hover:bg-[#0d3550] text-white py-3 px-6 rounded-lg transition"
          >
            Book Appointment →
          </button>

          <div className="md:block hidden">
            <div className=" mt-10 grid grid-cols-3 md:grid-cols-3 gap-6 ">
              {[
                {
                  icon: "https://i.imghippo.com/files/sEs3200s.png",
                  text: "Experience Doctor",
                },
                {
                  icon: "https://i.imghippo.com/files/NuJ2384zh.png",
                  text: "Personalized Care",
                },
                {
                  icon: "https://i.imghippo.com/files/NuJ2384zh.png",
                  text: "Flexible Payment Option",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 bg-cover bg-opacity-20 p-4 rounded-lg"
                >
                  <img src={item.icon} alt={item.text} className="h-10" />
                  <p className="text-white font-semibold">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <div className="w-full flex flex-col h-full justify-center items-center  py-4  lg:px-24">
        {/* Top Contact Section */}
        <div className="bg-cover py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ContactCard
            icon="https://i.imghippo.com/files/sEs3200s.png"
            title="Need Dental Services?"
            description="Call on : (+01) 987 828 745"
          />
          <ContactCard
            icon="https://i.imghippo.com/files/NuJ2384zh.png"
            title="Opening Hours"
            description="Mon to Sat 9:00AM to 9:00PM"
          />
          <ContactCard
            icon="https://i.imghippo.com/files/NuJ2384zh.png"
            title="Schedule Appointment"
            description="Mail us : appointment@domain.com"
          />
        </div>
        {/* About Us Section */}
        <div className="flex flex-col  px-6 py-16  md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Image Section */}
            <div className="relative">
              <img
                src="https://i.imghippo.com/files/tLwv1291cEw.jpg"
                alt="Dental Clinic"
                className="w-full rounded-xl shadow-lg"
              />
              <div className="absolute bottom-4 left-4 bg-white bg-opacity-70 p-4 rounded-lg flex items-center gap-3">
                <FaTooth className="text-2xl text-teal-500" />
                <div>
                  <h3 className="text-xl font-bold">875+</h3>
                  <p className="text-sm text-gray-600">Happy Patients</p>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div>
              <h3 className="text-[#1E84B5] text-sm uppercase font-semibold mb-2">
                About Us
              </h3>
              <h2 className="text-4xl font-bold text-gray-800 leading-snug mb-4">
                The evolution of our company and the people who made it possible
              </h2>
              <p className="text-gray-600 mb-6">
                The goal of our clinic is to provide friendly, caring dentistry
                and the highest level of general, cosmetic, and specialist
                dental treatments with dental practice throughout the world.
              </p>

              <div className="flex items-start gap-8">
                {/* Left: Features List */}
                <ul className="space-y-4 flex-1">
                  {[
                    "Experienced Team",
                    "Emergency Dental Services",
                    "State-of-the-Art Technology",
                    "Comprehensive Services",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FaCheck className="text-[#1E84B5]" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Right: 25+ Years Experience */}
                <div className="bg-[#0d3550] text-white p-4 rounded-xl flex items-center gap-3">
                  <FaTooth className="text-3xl" />
                  <div>
                    <h3 className="text-3xl font-bold">25+</h3>
                    <p className="text-sm">Years Of Experience</p>
                  </div>
                </div>
              </div>

              {/* Read More Button */}
              <div className="mt-6">
                <a
                  href="#services"
                  className="bg-[#1E84B5] text-white py-4 px-6 rounded-lg hover:bg-[#0d3550] transition"
                >
                  Explore our services
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div id="how" className="bg-white py-16">
        <div className="flex flex-col md:px-32 px-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Side Content */}
            <div>
              <div className="mb-8">
                <h3 className="text-[#1E84B5] font-semibold text-lg uppercase">
                  Our Process
                </h3>
                <h2 className="text-4xl font-bold text-gray-800 mt-2">
                  A Step by Step Guide to Our Dental Care Process
                </h2>
                <p className="text-gray-600 mt-4">
                  The goal of our clinic is to provide friendly, caring
                  dentistry and the highest level of general, cosmetic, and
                  specialist dental treatments. With dental practices throughout
                  the world.
                </p>
              </div>

              <a
                href="#services"
                className="inline-flex items-center bg-[#1E84B5] text-white font-medium px-6 py-3 hover:bg-[#0d3550] rounded-full [#1E84B5]:bg-blue-800 transition duration-300"
              >
                Get in Touch
                <span className="ml-2">→</span>
              </a>
            </div>

            {/* Right Side Process List */}
            <div className="space-y-8">
              {/* Process Item 1 */}
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <img
                      src="https://i.imghippo.com/files/jUt4766Hw.png"
                      alt="Initial Consultation"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-[#1E84B5] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Initial Consultation
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Your journey begins with an in-depth consultation. We'll
                    listen to your concerns and discuss your goals.
                  </p>
                </div>
              </div>

              {/* Process Item 2 */}
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <img
                      src="https://i.imghippo.com/files/cVc7684e.png"
                      alt="Treatment by Experts"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-[#1E84B5] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Treatment by Experts
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Once the plan is finalized, we'll proceed with your
                    treatment. Our expert team will guide you.
                  </p>
                </div>
              </div>

              {/* Process Item 3 */}
              <div className="flex items-start space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <img
                      src="https://i.imghippo.com/files/FFnZ8241w.png"
                      alt="Follow-Up Care"
                    />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-[#1E84B5] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    Follow-Up Care
                  </h3>
                  <p className="text-gray-600 mt-1">
                    After your treatment, we'll schedule any necessary follow-up
                    appointments to monitor your progress.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-12">
        <div className=" md:px-32 px-6  grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Section - Image with Blurred Feature Overlay */}
          <div className="relative">
            <img
              src="https://i.imghippo.com/files/ROW1339luo.jpg"
              alt="Dental Care"
              className="w-full h-full object-cover rounded-lg"
            />

            <div className="absolute inset-0 flex justify-center items-center">
              <div className="bg-white/20 backdrop-blur-xl rounded-lg p-6 w-[80%]">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className="flex items-center gap-4 p-4 bg-white/60 rounded-lg shadow-lg mb-4"
                  >
                    <img
                      src={feature.icon}
                      alt={feature.title}
                      className="w-10 h-10"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section - Content */}
          <div>
            <h3 className="text-[#1E84B5] font-medium flex items-center gap-2">
              <span role="img" aria-label="tooth">
                🦷
              </span>
              Why Choose Us
            </h3>
            <h2 className="text-3xl font-bold text-[#0d3550] mt-2 leading-snug">
              Exceptional dental <br /> care tailored to your <br /> needs
            </h2>
            <p className="mt-4 text-sm font-bold text-[#0d3550]">
              We take the time to understand your individual needs and goals,
              creating customized treatment plans to help you achieve optimal
              oral health.
            </p>
            <p className="mt-5 text-[#0d3550]">
              We believe that your dental experience should be more than just a
              routine visit. Our goal is to provide comprehensive, personalized
              care in a welcoming environment, where your comfort and well-being
              come first.
            </p>

            {/* Statistics Section */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <div
                  key={stat.id}
                  className={`text-center  ${
                    index !== 0 ? "border-l border-gray-300" : ""
                  }`}
                >
                  <p className="text-[#0d3550] text-sm">{`0${stat.id}`}</p>
                  <h3 className="text-2xl font-bold text-[#0d3550]">
                    {stat.number}
                  </h3>
                  <p className="text-[#0d3550]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="py-16 bg-white w-full">
  <div className="flex flex-col items-center justify-center px-6 md:px-12 w-full">
    {/* Section Header */}
    <div className="text-center mb-12 max-w-3xl">
      <h3 className="text-[#1E84B5] font-semibold text-lg">
        Testimonials
      </h3>
      <h2 className="text-3xl font-bold text-[#0d3550]">
        Listen from our happy patients
      </h2>
      <p className="text-gray-600 mt-2">
        The goal of our clinic is to provide friendly, caring dentistry
        and the highest level of general, cosmetic, and specialist dental
        treatments.
      </p>
    </div>

    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={20}
      slidesPerView={1}
      breakpoints={{
        640: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      pagination={{ clickable: true }}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      className="w-full max-w-7xl"
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <div className="bg-blue-50 p-6 rounded-xl shadow-md w-full transition-transform">
            {/* Quote Icon */}
            <div className="flex justify-center mb-4">
              <img
                src="https://i.imghippo.com/files/FG8021h.png"
                alt="Quote Icon"
                className="w-10 h-10"
              />
            </div>

            {/* Testimonial Text */}
            <p className="text-gray-700 mb-4 text-center">
              {testimonial.text}
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-center mt-6">
              <img
                src="https://i.imghippo.com/files/UFeK7145Vnw.jpg"
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h3 className="text-lg font-bold">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
</div>

      <div className="bg-[#0D3B4F] text-white py-16">
        <div className="flex flex-col md:px-32 px-6 ">
          {/* Top Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <span role="img" aria-label="tooth">
                  🦷
                </span>{" "}
                What We Provide
              </h3>
              <h2 className="text-4xl font-bold leading-tight mt-2">
                Experience comfort, technology, and care at our advanced dental
                facility
              </h2>
              <p className="mt-4 text-lg">
                We believe that a welcoming, state-of-the-art facility is key to
                delivering exceptional dental care. Our practice is designed not
                only to provide cutting-edge treatments but also to create an
                environment where patients feel relaxed and confident in their
                care.
              </p>
            </div>

            {/* Right Image/Video Section */}
            <div className="relative">
              <a
                href="https://www.youtube.com/watch?v=Y-x0efG1seA"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://i.imghippo.com/files/ThmX1669IX.jpg"
                  alt="Dental Facility"
                  className="w-[500px] h-auto rounded-xl shadow-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white p-4 rounded-full shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      className="w-8 h-8 text-gray-700"
                    >
                      <path d="M10.804 8.171L6.69 10.801c-.28.168-.69.008-.69-.325V5.524c0-.333.41-.493.69-.325l4.114 2.63a.393.393 0 010 .674z" />
                    </svg>
                  </button>
                </div>
              </a>
            </div>
          </div>

          {/* Service Information - Uniform Alignment */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                id: "1",
                title: "Comfort & Care",
                description:
                  "We understand that visiting the dentist can sometimes feel intimidating, which is why we've created a space.",
              },
              {
                id: "2",
                title: "Advanced Technology",
                description:
                  "We ensure state-of-the-art technology for precise and effective dental treatments.",
              },
              {
                id: "3",
                title: "Sterilization & Safety",
                description:
                  "We prioritize hygiene and safety to provide a worry-free experience for our patients.",
              },
            ].map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <span className="bg-[#1E84B5] text-white w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold">
                  {item.id}
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white py-16">
        <div className="flex flex-col md:px-32 px-6 ">
          <div className="text-center mb-12">
            <p className="text-[#1E84B5] uppercase font-semibold">Our Team</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0d3550] mt-2">
              Experienced and Caring Dental Team
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              The goal of our clinic is to provide friendly, caring dentistry
              and the highest level of general, cosmetic, and specialist dental
              treatments. With dental practices throughout the world.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="relative overflow-hidden transition-transform transform [#1E84B5]:scale-105"
              >
                <div className="relative group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 object-cover bg-white rounded-xl shadow-lg "
                  />
                </div>

                <div className="text-center mt-5">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white py-16">
        <div className="flex flex-col md:px-32 px-6 ">
          {/* Section Title */}
          <div className="text-center mb-12">
            <p className="text-[#1E84B5] text-sm font-semibold flex justify-center items-center gap-2">
              <span role="img" aria-label="tooth">
                🦷
              </span>{" "}
              Contact Us
            </p>
            <h2 className="text-3xl font-bold text-gray-900">
              Get in touch with us
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              The goal of our clinic is to provide friendly, caring dentistry
              and the highest level of general, cosmetic, and specialist dental
              treatments. With dental practices throughout the world.
            </p>
          </div>

          {/* Contact Info Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Contact Details */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex items-center">
              <div className="bg-[#1E84B5] text-white p-4 rounded-full mr-4">
                <FaPhoneAlt size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Contact Details
                </h3>
                <p className="text-gray-600">+234 80 4354 6778</p>
              </div>
            </div>

            {/* Address */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex items-center">
              <div className="bg-[#1E84B5] text-white p-4 rounded-full mr-4">
                <FaMapMarkerAlt size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                <p className="text-gray-600"> {userDetails?.address} </p>
              </div>
            </div>

            {/* Email Us */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex items-center">
              <div className="bg-[#1E84B5] text-white p-4 rounded-full mr-4">
                <FaEnvelope size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Email Us
                </h3>
                <p className="text-gray-600">info@domain.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-[#0d3b4d] text-white py-10">
        <div className="flex flex-col md:px-32 px-6 ">
          {/* Booking Section */}
          <div className="flex flex-col bg-[#0d3b4d] text-center lg:flex-row items-center justify-between mb-10">
            <h2 className="text-4xl font-bold">
              Your Healthier Smile Awaits - Book Now!
            </h2>
            <button
              onClick={handleModalOpen}
              className="mt-4 lg:mt-0 bg-[#1E84B5] hover:bg-[#0d3550] text-white py-2 px-6 rounded-full flex items-center gap-2 transition duration-300"
            >
              Book Appointment →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <div className="flex items-center mb-4">
                <a href="#" className="flex items-center text-gray-800">
                  <img
                    src="https://i.imghippo.com/files/rCvw1845yLI.png"
                    alt="logo"
                    className="w-15 h-10 mr-2"
                  />
                  <span className="text-md text-[#1E84B5] font-semibold leading-tight">
                    Tooth Palace <br />
                  </span>
                </a>
              </div>
              <p className="text-gray-300">
                The goal of our clinic is to provide friendly, caring dentistry
                and the highest level of general, cosmetic, and specialist
                dental treatments.
              </p>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[#1E84B5]:text-blue-400"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[#1E84B5]:text-blue-400"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[#1E84B5]:text-blue-400"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="[#1E84B5]:text-blue-400"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-blue-400">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-blue-400">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-400">
                    Our Services
                  </a>
                </li>
                <li>
                  <a href="#how" className="hover:text-blue-400">
                    Our Process
                  </a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#services" className="hover:text-blue-400">
                    Dental Care
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-400">
                    Cosmetic Dentistry
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-400">
                    Dental Implants
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-blue-400">
                    Teeth Whitening
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <FaPhone className="text-blue-400" />
                  <p>+234 80 1234 5678</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaEnvelope className="text-blue-400" />
                  <p>info@domain.com</p>
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-blue-400" />
                  <p>4, Iyana Oworo, Lagos</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t border-gray-600 mt-10 pt-6 text-center">
            <p>
              {" "}
              &copy; {new Date().getFullYear()} Built with{" "}
              <a
                href="https://dimpified.com"
                className="text-gray-400 hover:text-white text-sm"
              >
                Dimpified
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SecondDentist;
