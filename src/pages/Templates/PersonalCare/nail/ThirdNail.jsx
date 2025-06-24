import React, { useState } from "react";
import { FaBars, FaTimes, FaCube, FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Nail } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";
import { WhiteContactForm } from "../../../../features/ContactForm/ContactForm";

const ThirdNail = () => {
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

  const images = [
    {
      id: 1,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nail1.3.jpg",
      alt: "Nail Art Image 1",
    },
    {
      id: 2,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nail1.4.jpg",
      alt: "Nail Art Image 2",
    },
    {
      id: 3,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails10.jpg",
      alt: "Placeholder",
    },
    {
      id: 4,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails11.jpg",
      alt: "Placeholder",
    },
    {
      id: 5,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nails9.jpg",
      alt: "Placeholder",
    },
    {
      id: 6,
      src: "https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nail1.2.jpg",
      alt: "Placeholder",
    },
  ];
  const testimonials = [
    {
      text: "The service at this nail studio is exceptional! I always leave feeling pampered and beautiful.",
      name: "Jane Doe",
      title: "CEO, Beauty Co.",
      image: "https://gfa-tech.com/dimp-template-images/gym/gym6.18.jpg",
    },
    {
      text: "Amazing nail technicians! The ambiance is relaxing and the results are always perfect.",
      name: "Sarah Smith",
      title: "Founder, Style Hub",
      image:
        "https://gfa-tech.com/dimp-template-images/make-up/fredia-testi2.png",
    },
    {
      text: "I've never felt more confident about my nails. The quality and attention to detail is unmatched.",
      name: "Emily White",
      title: "Creative Director, Luxe",
      image:
        "https://gfa-tech.com/dimp-template-images/make-up/fredia-testi.png",
    },
    {
      text: "Top-notch service every time. Clean, professional, and beautiful results without fail!",
      name: "Rachel Green",
      title: "Blogger, Chic Diaries",
      image:
        "https://gfa-tech.com/dimp-template-images/make-up/fredia-testi3.png",
    },
  ];
  return (
    <div className="font-sans">
      {/* Navbar */}
      <header className="bg-white shadow-sm w-full">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-2xl font-bold text-black">GlamourNails</div>

          <nav className="hidden md:flex space-x-6 text-sm text-gray-800">
            <a href="#home" className="hover:text-black">
              Home
            </a>
            <a href="#about" className="hover:text-black">
              About Us
            </a>
            <a href="#services" className="hover:text-black">
              Our Services
            </a>
            <a href="#gallery" className="hover:text-black">
              Gallery
            </a>
            <a href="#contact" className="hover:text-black">
              Contact Us
            </a>
          </nav>

          <button
            onClick={handleModalOpen}
            className="hidden md:block bg-[#533725] hover:bg-black text-white px-4 py-2 rounded"
          >
            Book an appointment
          </button>

          <div
            className="md:hidden text-2xl text-black cursor-pointer"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white py-4 px-4 space-y-4 text-gray-800 transition-all duration-300">
            <a href="#home" className="hover:text-black">
              Home
            </a>
            <a href="#about" className="hover:text-black">
              About Us
            </a>
            <a href="#services" className="hover:text-black">
              Our Services
            </a>
            <a href="#gallery" className="hover:text-black">
              Gallery
            </a>
            <a href="#contact" className="hover:text-black">
              Contact Us
            </a>
            <button
              onClick={handleModalOpen}
              className="w-full bg-[#533725] hover:bg-black text-white px-4 py-2 rounded"
            >
              Book an appointment
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-white py-12 px-4 md:px-32">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl font-bold mb-4">
              Experience the Art <br />
              of Nail Perfection
            </h1>
            <p className="text-gray-700 mb-6">
              Welcome to our exclusive nail studio, where creativity meets{" "}
              <br />
              elegance. Discover a world of stunning nail designs tailored just{" "}
              <br />
              for you.
            </p>
            <button
              onClick={handleModalOpen}
              className="bg-[#533725] hover:bg-black text-white px-5 py-2 rounded text-sm"
            >
              Book Appointment
            </button>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nail1.1.jpg"
              alt="Nail Studio"
              className="w-full rounded-md shadow-md"
            />
          </div>
          {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )}
        </div>
      </section>

      {/* Mid Section */}
      <section id="about" className="bg-[#FFE5E0] py-20">
        <div className="max-w-2xl mx-auto text-center px-4">
          <p className="text-sm font-semibold text-gray-700">GlamourNails</p>
          <h2 className="text-3xl font-bold my-4">
            Welcome to Your GlamourNails <br />
            Studio Experience
          </h2>
          <p className="text-gray-700 mb-6">
            At our nail studio, we are dedicated to empowering women through
            beauty and self-care. Our mission is to provide exceptional nail
            services that enhance your confidence and style.
          </p>
          <button
            onClick={handleModalOpen}
            className="bg-transparent hover:bg-[#533725] hover:text-white text-[#533725] border border-[#533725] px-5 py-2 rounded text-sm"
          >
            Book an appointment
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-white py-16">
        <div className="px-6 md:px-32">
          <h2 className="text-2xl md:text-4xl font-bold text-center mb-10">
            Explore Our Exceptional Nail Services{" "}
            <br className="hidden md:block" />
            Tailored Just for You
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Nail.map((service, index) => (
              <div
                key={index}
                className="flex-1 rounded-xl border border-gray-100 p-6 h-auto"
              >
                <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {service.shortDescription}
                </p>
                <p className="text-sm text-gray-600">
                  {getFormattedPrice(service.price, countryCode)}
                </p>
                <div className=" mt-4">
                  <button
                    onClick={handleModalOpen}
                    className="text-xs font-bold text-[#533725] hover:text-black uppercase gap-2"
                  >
                    <span className="border-b border-[#9E8A78]">Book Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-[#FFE5E0] py-14 md:px-32">
        <div className="px-6 md:px-12 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <p className="text-sm font-semibold mb-1">Excellence</p>
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Our Nail <br /> Studio?
            </h2>
            <p className="text-gray-700 mb-6">
              Our nail studio is dedicated to providing a luxurious and <br />
              personalized experience for every client. We use only the highest{" "}
              <br />
              quality products to ensure your nails look stunning and last
              longer.
            </p>

            <div className="flex items-center gap-4">
              <button
                onClick={handleModalOpen}
                className="px-4 py-2 bg-transparent border border-black hover:bg-black hover:text-white transition duration-300"
              >
                Book Now
              </button>
              <a href="#gallery">
                {" "}
                <button className="flex items-center gap-2 px-4 py-2 text-black border border-transparent hover:underline">
                  Explore our gallery <FaArrowRight />
                </button>
              </a>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src="https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nail1.2.jpg"
              alt="Client selecting nail color"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Nail Art Gallery */}
      <section id="gallery" className="bg-white py-12">
        <div className=" text-center px-6 sm:px-6 lg:px-32">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Nail Art Gallery
          </h2>
          <p className="mt-2 text-base text-gray-600">
            Explore our stunning nail designs and services.
          </p>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="w-full rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="object-cover w-full h-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-full bg-[#FFE5E0] py-12 px-4 sm:px-6 text-center md:px-32">
        <h2 className="text-3xl font-extrabold text-gray-900">Testimonial</h2>
        <p className="my-4 text-base text-gray-600">
          We handle your nails with care and we have people confirm it
        </p>
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          slidesPerView={3}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1.3,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide
              key={index}
              className="border-2 border-gray-100 mx-4 md:py-12 p-6 h-auto rounded-xl"
            >
              <div className="max-w-3xl mx-auto text-center">
                <div className="text-yellow-300 mb-4 text-xl">★★★★★</div>
                <p className="text-lg font-semibold text-gray-800 mb-8">
                  "{t.text}"
                </p>
                <div className="flex items-center justify-center space-x-4 flex-wrap gap-y-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full bg-gray-200 object-cover"
                  />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">
                      {t.name}
                    </p>
                    <p className="text-sm text-gray-500">{t.title}</p>
                  </div>
                  <span className="border-l border-gray-300 h-6 mx-4 hidden sm:inline-block"></span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <div id="contact">
        <WhiteContactForm />
      </div>
      <section
        className="relative w-full h-[600px] flex items-center bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "url('https://gfa-tech.com/dimp-template-images/make-up/beauty/nails/nail1.5.jpg')",
        }}
      >
        <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0 z-0" />
        <div className="z-10 lg:px-32 px-6 sm:px-10 w-full">
          <div className="max-w-xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Your Perfect Nails Await You
            </h1>
            <p className="text-sm sm:text-base mb-6">
              Transform your look and boost your confidence with our expert nail
              services today!
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleModalOpen}
                className="bg-white text-black hover:text-white font-medium px-5 py-2 rounded shadow hover:bg-[#5b3e2a] transition"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#5b3e2a] text-white py-12 px-6 sm:px-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Newsletter */}
          <div>
            <div className="text-2xl font-cursive mb-4">GlamourNails</div>
            <p className="mb-4 text-sm">
              Transform your look and boost your confidence with our expert nail
              services today!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home">Home Page</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
              <li>
                <a href="#services">Our Services</a>
              </li>
              <li>
                <a href="#gallery">Gallery</a>
              </li>
              <li>
                <a href="#contact">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.facebook.com/yourpage"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook Page
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram Feed
                </a>
              </li>
              <li>
                <a
                  href="https://www.twitter.com/yourhandle"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Twitter Profile
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn Page
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/yourchannel"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube Channel
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Opening Hours</h3>
              <p className="text-sm">Monday - Friday 11:30am - 2:00pm</p>
              <p className="text-sm">Saturday – Monday: 9am – 8pm</p>
              <p className="text-sm">Monday - Friday 5:30am - 11:00pm</p>
              <p className="text-sm">Saturday - Sunday 4:30am - 1:00pm</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-white border-opacity-30 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-300 gap-y-4">
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

export default ThirdNail;
