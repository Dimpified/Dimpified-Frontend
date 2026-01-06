import React, { useEffect, useState } from "react";
import api from "../../api/EcosystemNearMe";
import NavbarLanding from "./NavbarLanding";
import { CustomerFooter } from "./FooterWithLinks";
import { statesAndLGAs } from "../../data/StateAndLGA";
import { Country } from "country-state-city";
import BookingModal from "../../features/Booking/BookingModal";
import LazyLoad from "react-lazyload";
import { motion } from "framer-motion";

const FindNail = ({ subdomain }) => {
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
  const [ecosystemsPerPage] = useState(20);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getServiceDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`
        );
        const allServices = response.data.flatMap(
          (item) => ecosystems.services
        );
        setServices(allServices);
      } catch (error) {
        console.log("not working", error);
      } finally {
        console.log("finish loading");
      }
    };
    getServiceDetails();
  }, []);

  useEffect(() => {
    const countriesList = Country.getAllCountries();
    setCountries(countriesList);
    fetchRandomNail();
  }, []);

  const fetchRandomNail = async () => {
    setIsLoading(true);
    try {
      const data = await api.getEcosystemsNearMe({
        country: selectedCountry || "NG",
        state: selectedState || "All",
        localGovernment: selectedLGA || "All",
        Category: "Personal Care Services",
        SubCategory: "Nail Salon",
        format: "Onsite",
      });
      const randomNail = data.ecosystems.sort(() => 0.5 - Math.random());
      setEcosystems(randomNail);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setLgas(statesAndLGAs[e.target.value] || []);
    setSelectedLGA("");
  };

  const handleLGAChange = (e) => {
    setSelectedLGA(e.target.value);
  };

  const handleSearch = async () => {
    if (!selectedCountry || !selectedState || !selectedLGA) {
      setNotification(
        "Please select the Country, State, and Local Government."
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    setNotification("");

    const requestPayload = {
      country: selectedCountry || "NG",
      state: selectedState || "All",
      localGovernment: selectedLGA || "All",
      Category: "Personal Care Services",
      SubCategory: "Nail Salon",
      format: "Onsite",
    };

    try {
      const data = await api.getEcosystemsNearMe(requestPayload);
      if (data.ecosystems.length === 0) {
        setNotification(
          "No Nail Artist found in this Local Government. Showing Nail  in the State."
        );
        const stateData = await api.getEcosystemsNearMe({
          ...requestPayload,
          localGovernment: selectedLGA || null,
        });
        if (stateData.ecosystems.length === 0) {
          setNotification(
            "No Nail Artist found in this State. Showing Nail  in the Country."
          );
          const countryData = await api.getEcosystemsNearMe({
            ...requestPayload,
            state: selectedState || null,
            localGovernment: selectedLGA || null,
          });
          if (countryData.ecosystems.length === 0) {
            setNotification("No Nail Artist found in this Country.");
            setEcosystems([]);
          } else {
            setEcosystems(countryData.ecosystems);
          }
        } else {
          setEcosystems(stateData.ecosystems);
        }
      } else {
        setEcosystems(data.ecosystems);
      }
    } catch (err) {
      setError(err.message);
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <div className="font-sen">
        <NavbarLanding />
        <section
          className="bg-cover bg-center relative text-white"
          style={{
            backgroundImage: `url("https://gfa-tech.com/dimp-template-images/barber/barber-bg3.jpg")`,
          }}
        >
          <div className="bg-gradient-to-r h-full from-[#4f2683]  via-[#9966cc] to-[#ffa600] opacity-85 shadow-lg">
            <div className="px-4 lg:px-32 md:px-24 md:pt-40 md:pb-24 pt-24 pb-20 ">
              <h1 className="md:text-4xl text-3xl tracking-tight font-pry">
                Find a Nail Artist near you
              </h1>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between py-8 px-4 mt-[-3rem] lg:mx-28 rounded-lg bg-white shadow-lg relative">
          <div className="flex flex-wrap gap-2 w-full lg:w-auto">
            {/* Country Filter */}
            <div>
              <label className="block text-sm font-bold">Country</label>
              <select
                value={selectedCountry}
                onChange={handleCountryChange}
                className="px-4 py-2 bg-gray-100 text-sm font-medium rounded hover:bg-gray-200"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country.isoCode} value={country.isoCode}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>

            {/* State Filter */}
            <div>
              <label className="block text-sm font-bold">State</label>
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="px-4 py-2 bg-gray-100 text-sm font-medium rounded hover:bg-gray-200"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            {/* LGA Filter */}
            <div>
              <label className="block text-sm font-bold">
                Local Government
              </label>
              <select
                value={selectedLGA}
                onChange={handleLGAChange}
                className="px-4 py-2 bg-gray-100 text-sm font-medium rounded hover:bg-gray-200"
              >
                <option value="">Select nearest LGA</option>
                {lgas.map((lga) => (
                  <option key={lga} value={lga}>
                    {lga}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="bg-primary3 text-white px-6 py-2 md:mt-o mt-3 rounded hover:bg-sec10"
          >
            Search
          </button>
        </div>
        <div className="p-8 px-4 lg:px-32 md:px-24">
          <h1 className="text-2xl text-black font-bold pb-6">
            {notification ? (
              <p className="text-yellow-600">{notification}</p>
            ) : (
              <>
                Recommended nail services{" "}
                {selectedLGA ? `near ${selectedLGA}` : ""}
              </>
            )}
          </h1>

          {isLoading ? (
            <ul className="max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400">
              <li className="flex items-center text-yellow-400">
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="w-12 h-12 me-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
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
                Please wait, we are getting the best recommendations for you...
              </li>
            </ul>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentEcosystems.map((ecosystem) => (
                  <div
                    key={ecosystem._id}
                    className="w-100 text-black rounded-xl overflow-hidden hover:shadow-lg md:h-[480px] relative"
                  >
                    <div className="w-100 text-black rounded-xl overflow-hidden">
                      {/* Image Section */}
                      <div className="relative">
                        {ecosystem.services[0]?.services && (
                          <div key={ecosystem.services[0]._id}>
                            {ecosystem.ecosystemDomain && (
                              <a
                                href={`https://${ecosystem.ecosystemDomain}.dimpified.com`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <LazyLoad height={200} offset={100}>
                                  {" "}
                                  <motion.img
                                    loading="lazy"
                                    src={
                                      ecosystem.services[0].services[
                                        Math.floor(
                                          Math.random() *
                                            ecosystem.services[0].services
                                              .length
                                        )
                                      ].serviceImage ||
                                      "https://gfa-tech.com/dimp-template-images/barber/barber-bg3.jpg"
                                    }
                                    alt="Random Service"
                                    className="w-full h-40 object-cover rounded-xl"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                  />{" "}
                                </LazyLoad>
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-1 p-4">
                        <h2 className="text-lg font-semibold">
                          {ecosystem.ecosystemDomain && (
                            <a
                              href={`https://${ecosystem.ecosystemDomain}.dimpified.com`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {ecosystem.ecosystemName}
                            </a>
                          )}
                        </h2>
                      </div>

                      <div className="px-4 pb-2">
                        <div className="flex justify-between items-center">
                          <p className="text-gray-700">
                            {ecosystem.ecosystemDescription?.slice(0, 50)}...
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="text-sm mt-2">
                            <p>{ecosystem.address?.slice(0, 50)}</p>
                            <p className="flex items-center mt-2">
                              🏠 Home Service/Shop
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">
                            <p>Prices starts at:</p>
                          </div>

                          <div className="flex">
                            <span className="text-lg font-semibold">
                              {ecosystem.services[0]?.services &&
                                (() => {
                                  const sortedServices = [
                                    ...ecosystem.services[0].services,
                                  ].sort((a, b) => a.price - b.price);
                                  return sortedServices.length > 0 ? (
                                    <div key={sortedServices[0]._id}>
                                      #{sortedServices[0].price}
                                    </div>
                                  ) : null;
                                })()}
                            </span>
                          </div>
                        </div>

                        {isModalOpen && (
                          <BookingModal
                            isOpen={isModalOpen}
                            handleClose={handleModalClose}
                            information={services}
                            subdomain={subdomain}
                          />
                        )}

                        <div className="md:absolute md:top-[390px] md:left-1/2 md:transform md:-translate-x-1/2 md:w-64 w-full text-center">
                          <div className="flex justify-center items-center mt-6">
                            <a
                              href={`https://${ecosystem.ecosystemDomain}.dimpified.com`}
                              target="_blank"
                              className="bg-primary3 hover:bg-sec10 text-white text-lg px-4 py-3 w-full rounded-xl"
                            >
                              Book Appointment
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8">
                {Array.from(
                  { length: Math.ceil(ecosystems.length / ecosystemsPerPage) },
                  (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`mx-1 px-4 py-2 rounded ${
                        currentPage === i + 1
                          ? "bg-primary3 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                    >
                      {i + 1}
                    </button>
                  )
                )}
              </div>
            </>
          )}
        </div>

        <CustomerFooter />
      </div>
    </motion.div>
  );
};

export default FindNail;
