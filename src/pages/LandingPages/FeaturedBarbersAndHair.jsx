import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import api from "../../api/EcosystemNearMe";
import CustomerNavbar from "./CustomerNavbar";
import { FooterWithLinks } from "./FooterWithLinks";
import { statesAndLGAs } from "../../data/StateAndLGA";
import { Country } from "country-state-city";
import BookingModal from "../../features/Booking/BookingModal";
import LazyLoad from "react-lazyload";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GlowBG from "./images/glow-bg.svg";
import GradientBG from "./images/gradient-bg.png";
import Select from "react-select";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const images = [
  "https://gfa-tech.com/dimp-template-images/barber/barber-bg2.jpg",
  "https://gfa-tech.com/dimp-template-images/barber/barber-bg3.jpg",
];
const category = [
  { value: "barber-shop", label: "Barber Shop", link: "/barbers-near-me" },
  {
    value: "makeup-artist",
    label: "Makeup Artists",
    link: "/makeup-near-me",
  },
  {
    value: "hair-salon",
    label: "Hair Salon",
    link: "/hairdressers-near-me",
  },
  {
    value: "nail-salon",
    label: "Nail Salon",
    link: "/nailtechs-nera-me",
  },
  {
    value: "Spa and wellness centre",
    label: "Spa Centre",
    link: "/spa-near-me",
  },
];
const FeaturedBarbersAndHair = ({ subdomain }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

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
  const [ecosystemsPerPage] = useState(10);
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
        SubCategory: ["Barber Shop", "Hair Salon"],

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
        {/* Filters */}

        {/* Results */}
        <div className="p-8 px-5 lg:px-32 md:px-24 ">
          <h1 className="md:text-2xl text-xl text-black font-bold pb-6">
            Barbers & Hair Stylist
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
              {currentEcosystems.filter(
                (ecosystem) => ecosystem.services?.[0]?.services?.length > 0
              ).length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  No ecosystems with services found.
                </div>
              ) : (
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
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  navigation={{
                    nextEl: ".swiper-button-next-custom",
                    prevEl: ".swiper-button-prev-custom",
                  }}
                  className="pb-10"
                >
                  {currentEcosystems
                    .filter(
                      (ecosystem) =>
                        ecosystem.services?.[0]?.services?.length > 0
                    )
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
                                {ecosystem.services[0]?.services?.length >
                                  2 && (
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
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedBarbersAndHair;
