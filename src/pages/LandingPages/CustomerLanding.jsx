import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useCountry } from "../../pages/pricing/CountryContext";
import api from "../../api/EcosystemNearMe";
import CustomerNavbar from "./CustomerNavbar";
import { CustomerFooter } from "./FooterWithLinks";
import { statesAndLGAs } from "../../data/StateAndLGA";
import { Country } from "country-state-city";
import LazyLoad from "react-lazyload";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GlowBG from "./images/glow-bg.svg";
import GradientBG from "./images/gradient-bg.png";
import TrendingBG from "./images/trending-bg.webp";
import ReviewBG from "./images/review-bg.jpg";
import App1 from "./images/booking-app.png";
import App2 from "./images/app-overview.png";
import Dashboard from "./images/dimp-dashboard.png";
import Spa from "./images/spahero.jpg";
import Gym from "./images/gym-hero.jpg";
import Dental from "./images/dental-image.jpg";
import Barber from "./images/barber-img.jpg";
import Amaka from "./images/amaka.jpg";
import Tunde from "./images/tunde.jpg";
import Chuku from "./images/chuku.jpg";
import Fatima from "./images/fatima.jpg";

import Select from "react-select";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import FeaturedBarbersAndHair from "./FeaturedBarbersAndHair";
import FeaturedMakeupAndSpa from "./FeaturedMakeupAndSpa";
import {
  FaGooglePlay,
  FaAppStore,
  FaStar,
  FaApple,
  FaStarHalfAlt,
} from "react-icons/fa";

const images = [
  "https://gfa-tech.com/dimp-template-images/barber/barber-bg2.jpg",
  "https://gfa-tech.com/dimp-template-images/barber/barber-bg3.jpg",
];

const category = [
  {
    value: "barber-shop",
    image: Barber,
    label: "Barber Shop",
    link: "/barbers-near-me",
  },
  {
    value: "makeup-artist",
    image: "https://dimpified.com/assets/mk1-RdeoyQ65.jpg",
    label: "Makeup Artists",
    link: "/makeup-near-me",
  },
  {
    value: "hair-salon",
    image: "https://dimpified.com/assets/hairdresser-image-Drh53u0T.jpg",
    label: "Hair Salon",
    link: "/hairdressers-near-me",
  },
  {
    value: "nail-salon",
    image: "https://dimpified.com/assets/nt1-C_kwxQ0b.jpg",
    label: "Nail Salon",
    link: "/nailtechs-near-me",
  },
  {
    value: "Spa and wellness centre",
    image: Spa,
    label: "Spa Centre",
    link: "/spa-near-me",
  },
  {
    value: "gym-centres",
    image: Gym,
    label: "Gym Centres",
    link: "/gym-near-me",
  },
  {
    value: "Dental Clinics",
    image: Dental,
    label: "Dental Clinics",
    link: "/dentist-near-me",
  },
];
const testimonials = [
  {
    name: "Chukwuemeka Okafor",
    role: "Entrepreneur",
    img: Chuku,
    review:
      "Finding a good barber in Lagos used to be stressful. With Dimpified, I just book online, and my barber is ready when I arrive. No more waiting!",
    rating: 4.5,
    
  },
  {
    name: "Fatima Bello",
    role: "Banker",
    img: Fatima,
    review:
      "Dimpified saved me during my wedding prep! I booked my makeup artist, hairstylist, and nail tech all in one place. So convenient!",
    rating: 5.0,
   
  },
  {
    name: "Tunde Adebayo",
    role: "Fitness Enthusiast",
    img: Tunde,
    review:
      "I love that I can book gym sessions and personal trainers on Dimpified. No more excuses—it's easy to find and schedule top-rated trainers near me.",
    rating: 5.0,
   
  },
  {
    name: "Amaka Ozo",
    role: "Event Planner",
    img: Amaka,
    review:
      "My go-to for last-minute glam! Whether it's makeup, hair, or nails, I find the best professionals on Dimpified without stress.",
    rating: 4.8,
    
  },
];

const TestimonialCarousel = () => {
  return (
    <div
      className="rounded-xl mx-3 lg:mx-32 lg:py-12 py-10 md:px-12 px-3"
      style={{
        backgroundImage: `url(${ReviewBG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col lg:px-12 px-3 md:flex-row items-center md:justify-between gap-10">
        {/* Left Section */}
        <div className="md:w-1/3 text-white text-left">
          <span className="bg-white/10 backdrop-blur-md text-xs uppercase px-3 py-1 rounded-full">
            Reviews
          </span>
          <h2 className="font-Marcellus text-2xl md:text-4xl font-bold mt-4">
            Join thousands enjoying hassle-free bookings on Dimpified.
          </h2>
          <div className="md:block hidden">
            <div className="flex justify-start gap-3 mt-6">
              <button className="swiper-button-prev-custom hover:text-sec10 w-12 h-12 flex items-center justify-center border border-gray-500 rounded-full text-white text-lg">
                ←
              </button>
              <button className="swiper-button-next-custom hover:text-sec10 w-12 h-12 flex items-center justify-center border border-gray-500 rounded-full text-white  text-lg">
                →
              </button>
            </div>
          </div>
        </div>

        {/* Right Section: Swiper Carousel */}
        <div className="md:w-2/3 w-full">
          <Swiper
            modules={[Navigation, Autoplay]}
            autoplay={{ delay: 3000 }}
            spaceBetween={16}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            slidesPerView={1.2}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 1.2 },
              1024: { slidesPerView: 2.2 },
            }}
            className="mt-6"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg h-[300px] text-white shadow-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.img}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <h3 className="font-bold">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-300">{testimonial.review}</p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center text-yellow-400">
                      {Array.from({
                        length: Math.floor(testimonial.rating),
                      }).map((_, i) => (
                        <FaStar key={i} />
                      ))}
                      {testimonial.rating % 1 !== 0 && <FaStarHalfAlt />}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

const CustomerLanding = ({ subdomain }) => {
  const { country } = useCountry();
  const [translateY, setTranslateY] = useState(0);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption);
  };

  const handleContinue = () => {
    if (selectedCategory) {
      window.location.href = selectedCategory.link;
    } else {
      alert("Please select a service before continuing.");
    }
  };

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState(Object.keys(statesAndLGAs));
  const [lgas, setLgas] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("NG");
  const [selectedState, setSelectedState] = useState("");
  const [selectedLGA, setSelectedLGA] = useState("");
  const [ecosystems, setEcosystems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [services, setServices] = useState([]);
  const [notification, setNotification] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [ecosystemsPerPage] = useState(24);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);

  // Fetch services
  useEffect(() => {
    const getServiceDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`
        );
        const allServices = response.data.flatMap(
          (item) => item.services || []
        );
        setServices(allServices);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    getServiceDetails();
  }, [subdomain]);

  // Fetch countries and random Merchants on mount
  useEffect(() => {
    const countriesList = Country.getAllCountries();
    setCountries(countriesList);
    fetchRandomMerchants();
  }, []);

  // Fetch random Merchants
  const fetchRandomMerchants = async () => {
    setIsLoading(true);
    try {
      const data = await api.getEcosystemsNearMe({
        country: selectedCountry || "NG",
        state: selectedState || "All",
        localGovernment: selectedLGA || "All",
        Category: "Personal Care Services",
        SubCategory: [
          "Barber Shop",
          "Hair Salon",
          "Nail Salon",
          "Makeup Artist Services",
          "Spa and Wellness Center",
          "Personal Training and Fitness Coaching",
          "Dental Hygiene Services",
        ], // Array of subcategories
        format: "Onsite",
      });
      const randomMerchants =
        data.ecosystems?.sort(() => 0.5 - Math.random()) || [];
      setEcosystems(randomMerchants);
    } catch (err) {
      setError(err.message || "Failed to fetch Merchants.");
    } finally {
      setIsLoading(false);
    }
  };

  // Pagination logic
  const indexOfLastEcosystem = currentPage * ecosystemsPerPage;
  const indexOfFirstEcosystem = indexOfLastEcosystem - ecosystemsPerPage;
  const currentEcosystems = ecosystems.slice(
    indexOfFirstEcosystem,
    indexOfLastEcosystem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Memoize image URLs
  const memoizedImages = useMemo(() => {
    return currentEcosystems.map((ecosystem) => {
      const services = ecosystem.services?.[0]?.services || [];
      const randomService =
        services[Math.floor(Math.random() * services.length)];
      return (
        randomService?.serviceImage ||
        "https://gfa-tech.com/dimp-template-images/barber/barber-bg3.jpg"
      );
    });
  }, [currentEcosystems]);

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="font-sen">
        <CustomerNavbar />
        <section className="relative h-auto lg:h-full text-black overflow-hidden">
          {/* Background Image Transition */}
          <div className="absolute inset-0 w-full h-full">
            {images.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                  index === currentImage
                    ? "opacity-100 scale-105"
                    : "opacity-0 scale-100"
                }`}
                style={{ backgroundImage: `url(${GlowBG})` }}
              ></div>
            ))}
          </div>

          {/* Content */}
          <div className="relative z-10 mx-1 lg:mx-48 md:mx-32 pt-36 md:pt-48 pb-12 ">
            <h1 className="font-Marcellus md:text-[4rem] md:px-0 sm:px-6 px-1 text-[1.8rem] tracking-normal font-semibold text-dark md:text-start text-center leading-none mb-6 md:w-10/12 w-full ">
              <span>Book Personal Care </span> <br />
              <span className="bg-gradient-to-r from-[#4f2683] via-[#9966cc] to-[#ffa600] text-transparent bg-clip-text">
                and Wellness Services
              </span>
              
            </h1>
            <p className=" md:px-0 sm:px-6 px-1  tracking-normal font-normal text-dark md:text-start text-center leading-none mb-6 md:w-8/12 w-full ">
              <span className="text-gray-700">
                Conveniently schedule appointments, show up and be prioritized
                without waiting in line!
              </span>
            </p>
          </div>

          {/* Search Interface */}
          <div className="relative z-40 flex flex-wrap items-center justify-between mx-4 lg:mx-48 md:mx-32 shadow-lg text-black rounded-lg p-[2px] bg-gradient-to-r from-[#4f2683] via-[#9966cc] to-[#ff8201]">
            <div className="bg-white dark:bg-gray-900 rounded-lg w-full p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="w-full lg:w-9/12 relative">
                <Select
                  options={category}
                  onChange={handleCategoryChange}
                  placeholder="What kind of service do you want to book?"
                  className="w-full md:text-[1rem] leading-relaxed text-xs"
                  classNamePrefix="react-select"
                  menuPlacement="auto"
                  menuPosition="fixed"
                  styles={{
                    control: (base) => ({
                      ...base,
                      borderColor: "#d1d5db",
                      borderRadius: "0.375rem",
                      padding: "0.125rem",
                      boxShadow: "none",
                      "&:hover": {
                        borderColor: "#9ca3af",
                      },
                    }),
                    menu: (base) => ({
                      ...base,
                      position: "absolute",
                      zIndex: 9999,
                    }),
                  }}
                />
              </div>

              <div className="w-full lg:w-2/12 flex lg:justify-end justify-center lg:mt-0 mt-4">
                <button
                  onClick={handleContinue}
                  className="bg-primary3 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow hover:bg-sec10 transition-all w-full lg:w-auto"
                >
                  Search Dimpified
                </button>
              </div>
            </div>
          </div>

          <div className="relative z-30 bg-transparent lg:mb-10 mb-2 mt-6 dark:bg-gray-900 w-auto pt-6 px-4 flex flex-wrap items-center md:justify-center justify-start pointer-events-auto">
            <span className="uppercase text-xs font-semibold text-sec10">
              Suggested services:
            </span>

            <div className="flex flex-wrap gap-1">
              {category.map((category, index) => (
                <div key={index} className="flex justify-center items-center">
                  {category.link.startsWith("http") ? (
                    <a
                      href={category.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-gray-300 px-4 py-1 mx-1 my-1 transition-all duration-300 hover:border-sec10"
                    >
                      <span className="text-xs font-semibold">
                        {category.label}
                      </span>
                    </a>
                  ) : (
                    <Link to={category.link}>
                      <button className="rounded-full border border-gray-300 px-4 py-1 mx-1 my-1 transition-all duration-300 hover:border-sec10 hover:text-sec10">
                        <span className="text-xs font-semibold">
                          {category.label}
                        </span>
                      </button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Filters */}

        {/* Results */}
        <div className="p-8 px-5 lg:px-32  md:px-16">
          <div
            className="absolute right-0 p-0 w-auto text-end"
            style={{
              transform: `translateY(${translateY}px)`,
              marginTop: "-415.2px",
            }}
          >
            <img
              src={TrendingBG}
              className="w-80 opacity-20"
              alt=""
            />
          </div>
          <h1 className="md:text-2xl text-xl text-black font-bold pb-6">
            Trending
          </h1>

          {isLoading ? (
            <div className="flex justify-center items-center">
              <li className="flex items-center text-yellow-400">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-6 h-6 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
                Loading recommendations, please wait...
              </li>
            </div>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <div className="relative ">
              {/* Navigation Buttons */}
              <button className="md:block hidden swiper-button-prev-custom absolute left-[-1.5rem] top-1/2 transform -translate-y-1/2 z-10 bg-sec10 text-white px-4 py-2 rounded-full shadow-lg hover:bg-yellow-500 transition">
                ❮
              </button>
              <button className="md:block hidden swiper-button-next-custom absolute right-[-1.5rem] top-1/2 transform -translate-y-1/2 z-10 bg-sec10 text-white  px-4 py-2  rounded-full shadow-lg hover:bg-yellow-500 transition">
                ❯
              </button>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1.45}
                breakpoints={{
                  640: { slidesPerView: 1.9 },
                  800: { slidesPerView: 2.4 },
                  1024: { slidesPerView: 4.2 },
                }}
                autoplay={{
                  delay: 3000, // Adjust delay as needed (3000ms = 3s)
                  disableOnInteraction: false, // Keeps autoplay running even when user interacts
                }}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                className="pb-10"
              >
                {currentEcosystems
                  .filter(
                    (ecosystem) => ecosystem.services?.[0]?.services?.length > 0
                  ) // Filter out ecosystems without services
                  .map((ecosystem, index) => (
                    <SwiperSlide key={ecosystem._id}>
                      <a
                        href={`https://${ecosystem.ecosystemDomain}.dimpified.com`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-full text-black rounded-xl overflow-hidden border-2  h-[365px] hover:border-primary3 relative">
                          {/* Image Section */}
                          <div className="relative">
                            <img
                              src={memoizedImages[index]}
                              alt="Random Service"
                              className="w-full md:h-40 h-32 object-cover relative rounded-xl"
                            />
                          </div>
                          <span className="bg-white/10 backdrop-blur-md text-xs px-2 py-1 rounded-full text-white absolute right-1 top-1 shadow-lg">
                            {ecosystem.mainObjective}
                          </span>

                          {/* Details Section */}
                          <div className="p-4">
                            <h2 className="text-lg font-semibold">
                              {ecosystem.ecosystemName.length > 20
                                ? `${ecosystem.ecosystemName.slice(0, 20)}...`
                                : ecosystem.ecosystemName}
                            </h2>
                            <p className="text-sm  mt-2">
                              {ecosystem.localgovernment} {ecosystem.state}{" "}
                              State
                            </p>
                            <p className="text-sm flex items-center py-2">
                              Home Service/Shop
                            </p>
                            <div className="flex flex-wrap gap-2 pb-2">
                              {ecosystem.services[0]?.services
                                ?.slice(0, 2)
                                .map((service, idx) => (
                                  <div
                                    key={idx}
                                    className="rounded-full border px-4 py-1 text-xs font-semibold"
                                  >
                                    {service?.name || "Service"}
                                  </div>
                                ))}
                              {ecosystem.services[0]?.services?.length > 2 && (
                                <div className="rounded-full border px-4 py-1 text-xs font-semibold">
                                  + more
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </a>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          )}
        </div>
        <div className="flex flex-col lg:px-32 md:px-24 px-5 py-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Search by Service Type
          </h2>
          <p className="text-gray-600 mb-6">
            Quickly browse through our database for bespoke services
          </p>
          <div className="relative ">
            {/* Navigation Buttons */}
            {/* <button className="md:block hidden swiper-button-prev-custom absolute left-[-1.5rem] top-1/2 transform -translate-y-1/2 z-10 bg-sec10 text-white px-4 py-2 rounded-full shadow-lg hover:bg-yellow-500 transition">
              ❮
            </button>
            <button className="md:block hidden swiper-button-next-custom absolute right-[-1.5rem] top-1/2 transform -translate-y-1/2 z-10 bg-sec10 text-white  px-4 py-2  rounded-full shadow-lg hover:bg-yellow-500 transition">
              ❯
            </button> */}
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={20}
              slidesPerView={1.45}
              breakpoints={{
                640: { slidesPerView: 1.9 },
                800: { slidesPerView: 2.4 },
                1024: { slidesPerView: 4.2 },
              }}
              autoplay={{
                delay: 3000, // Adjust delay as needed (3000ms = 3s)
                disableOnInteraction: false, // Keeps autoplay running even when user interacts
              }}
              navigation={{
                nextEl: ".swiper-button-next-custom",
                prevEl: ".swiper-button-prev-custom",
              }}
              className="pb-10"
            >
              {category.map((category, index) => (
                <SwiperSlide key={index} className="cursor-pointer">
                  <Link to={category.link}>
                    <img
                      src={category.image}
                      alt={category.label}
                      className="w-full h-40 object-cover rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-500 animate-fadeInUp"
                    />
                    <p className="text-center mt-2 text-lg font-semibold">
                      {category.label}
                    </p>
                  </Link>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <FeaturedBarbersAndHair />
        <FeaturedMakeupAndSpa />

        <section className="flex flex-wrap md:flex-row items-center justify-center px-6 lg:px-32 md:py-20 pb-16 bg-white">
          {/* Left: Mobile Mockups */}
          <div className="flex gap-5 lg:w-1/2 text-left mb-6">
            <img
              src={App1}
              alt="App Mockup 2"
              className="mt-10 md:h-[28rem] h-72 drop-shadow-lg rounded-xl"
            />
            <img
              src={App2}
              alt="App Mockup 1"
              className="md:h-[32rem] h-96 border-2 border-gray-100  drop-shadow-lg rounded-xl"
            />
          </div>

          {/* Right: Download Section */}
          <div className="lg:w-1/2 text-left">
            <span className="font-bold text-sm py-2 px-5 mb-3 w-36 uppercase text-dark bg-yellow-100 rounded-full flex items-center">
              Coming soon
            </span>

            <h1 className="font-normal font-Marcellus md:text-6xl text-3xl text-dark mb-3">
              Look out for the Dimpified App
            </h1>
            <p className="text-lg text-gray-600 mt-4">
              Instantly book personal and wellness services from the convenience
              of your space or register your business as a service provider to
              acceept bookings and multiply your revenue
            </p>

            {/* Store Buttons */}
            <div className="mt-6 flex flex-col md:flex-row gap-4">
              <a
                href="#"
                className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition"
              >
                <FaApple className="text-2xl mr-3" />
                <div>
                  <p className="text-xs text-gray-500">To be available on</p>
                  <p className="font-semibold text-gray-900">App Store</p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition"
              >
                <FaGooglePlay className="text-2xl mr-3" />
                <div>
                  <p className="text-xs text-gray-500">To be available on</p>
                  <p className="font-semibold text-gray-900">Play Store</p>
                </div>
              </a>
            </div>
          </div>
        </section>
        <TestimonialCarousel />

        <section className="font-sen z-10">
          <div className="flex flex-col h-full py-4 px-5 lg:px-16">
            <div className="bg-white rounded-3xl py-10  lg:py-16">
              <div className="relative h-full">
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  <div className="order-2 lg:order-2 lg:w-7/12 mb-4 md:mt-0 mt-12 lg:mb-0 lg:pr-16">
                    <div className="rounded-xl bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ff8201] p-1">
                      <LazyLoad height={200} offset={100}>
                        {" "}
                        <img
                          loading="lazy"
                          src={Dashboard}
                          alt="User Friendly Dashbaord"
                          className="rounded-lg h-full mx-auto shadow-md "
                        />
                      </LazyLoad>
                    </div>
                  </div>
                  <div className="order-1 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-16 mb-6">
                    <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-gray-100 rounded-full">
                      For Businesses
                    </span>
                    <h1 className="font-normal font-Marcellus md:text-6xl text-3xl  text-dark mb-3">
                      Dimpified For Businesses
                    </h1>
                    <p className="text-lg text-dark mb-4 leading-relaxed">
                      In today’s fast-paced world, your business should not be
                      restricted to physical stores or shops. Our software
                      solution enables you to set up your business online,
                      recieve bookings and earn from the comfort of your space
                      before the client arrives.
                    </p>

                    <Link
                      to="/merchants"
                      target="_blank"
                      className="inline-flex items-center hover:bg-sec10 h bg-gray-900 text-white px-6 py-3 rounded-full shadow hover:shadow-lg transition"
                    >
                      <span>Get started now</span>
                    </Link>
                    <p className="hidden">Your country code is : {country}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <CustomerFooter />
      </div>
    </motion.div>
  );
};

export default CustomerLanding;
