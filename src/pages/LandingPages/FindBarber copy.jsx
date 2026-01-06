import React, { useEffect, useState } from "react";
import api from "../../api/EcosystemNearMe";
import NavbarLanding from "./NavbarLanding";
import { FooterWithLinks } from "./FooterWithLinks";
import { statesAndLGAs } from "../../data/StateAndLGA";
import { Country } from "country-state-city";
import BookingModal from "../../features/Booking/BookingModal";
import { motion } from "motion/react";
import { Helmet } from "react-helmet";

const FindBarber = ({ subdomain }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
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

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown((prev) => (prev === dropdownName ? null : dropdownName));
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getServiceeDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`
        );
        const allServices = response.data.flatMap((item) => item.services);
        setServices(allServices);
      } catch (error) {
        console.log("not working", error);
      } finally {
        console.log("finish loading");
      }
    };
    getServiceeDetails();
  }, []);

  useEffect(() => {
    const countriesList = Country.getAllCountries();
    setCountries(countriesList);
  }, []);

  const handleCountryChange = (countryCode) => {
    setSelectedCountry(countryCode);
    setOpenDropdown(null);
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setLgas(statesAndLGAs[state] || []);
    setSelectedLGA("");
    setOpenDropdown(null);
  };

  const handleLGAChange = (lga) => {
    setSelectedLGA(lga);
    setOpenDropdown(null);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    setError(null);

    const requestPayload = {
      country: selectedCountry || "NG",
      state: selectedState || "All",
      localGovernment: selectedLGA || "All",
      Category: "Personal Care Services",
      SubCategory: "Barber Shop",
      format: "Onsite",
    };

    console.log("Request Payload:", requestPayload);

    try {
      const data = await api.getEcosystemsNearMe(requestPayload);
      setEcosystems(data.ecosystems || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <Helmet>
        <title>Find a barber near you  </title>
        <meta name="description" content="Find a barber near you with Dimpified " />
        <meta property="og:title" content=" Find a barber near you " />
        <meta
          property="og:description"
          content="Find a barber near you with Dimpified "
        />
      </Helmet>
      <div className="font-sen">
        <NavbarLanding />
        <section
          className="bg-cover bg-center relative text-white"
          style={{
            backgroundImage: `url("https://gfa-tech.com/dimp-template-images/barber/barber-bg3.jpg")`,
          }}
        >
          <div className="bg-gradient-to-r h-full from-[#4f2683]  via-[#9966cc] to-[#ffa600] opacity-85 shadow-lg">
            <div className="px-4 lg:px-32 md:pt-40 md:pb-24 pt-24 pb-20 ">
              <h1 className="md:text-4xl text-3xl tracking-tight font-pry">
                Find a barber near you
              </h1>
            </div>
          </div>
        </section>

        <div className="flex flex-wrap items-center justify-between py-8 px-4 mt-[-3rem] lg:mx-28 rounded-lg bg-white shadow-lg relative">
          <div className="flex flex-wrap gap-2">
            {/* Country Filter */}
            <div className="relative">
              <label className="uppercase text-sm font-bold">
                Search by: {""}
              </label>
              <button
                onClick={() => toggleDropdown("country")}
                className="px-4 py-2 bg-gray-100 text-sm font-medium rounded hover:bg-gray-200"
              >
                {selectedCountry || "Select Country"}{" "}
                <span className="ml-1">▼</span>
              </button>
              {openDropdown === "country" && (
                <div className="absolute z-10 mt-2 w-48 bg-white border rounded shadow">
                  <ul className="text-sm overflow-scroll h-[300px]">
                    {countries.map((country) => (
                      <li
                        key={country.isoCode}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleCountryChange(country.isoCode)}
                      >
                        {country.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("state")}
                className="px-4 py-2 bg-gray-100 text-sm font-medium rounded hover:bg-gray-200"
              >
                {selectedState || "Select State"}{" "}
                <span className="ml-1">▼</span>
              </button>
              {openDropdown === "state" && (
                <div className="absolute z-10 mt-2 w-48 bg-white border rounded shadow">
                  <ul className="text-sm overflow-scroll h-[300px]">
                    {states.map((state) => (
                      <li
                        key={state}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleStateChange(state)}
                      >
                        {state}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown("lga")}
                className="px-4 py-2 bg-gray-100 text-sm font-medium rounded hover:bg-gray-200"
              >
                {selectedLGA || "Local Government"}{" "}
                <span className="ml-1">▼</span>
              </button>
              {openDropdown === "lga" && (
                <div className="absolute z-10 mt-2 w-48 bg-white border rounded shadow">
                  <ul className="text-sm overflow-scroll h-[300px]">
                    {lgas.map((lga) => (
                      <li
                        key={lga}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleLGAChange(lga)}
                      >
                        {lga}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={handleSearch}
            className="bg-primary3 text-white px-6 py-2 rounded hover:bg-sec10"
          >
            Search
          </button>
        </div>
        <div className="p-8 px-4 lg:px-32">
          <h1 className="text-2xl text-black font-bold pb-6">
            Best Barbing services in {selectedState || "Nigeria"}
          </h1>

          {isLoading ? (
            <p>Please wait, we are getting the best options for you...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ecosystems.map((ecosystem) => (
                <div
                  key={ecosystem._id}
                  className=" w-100 text-black rounded-xl overflow-hidden hover:shadow-lg md:h-[480px] relative "
                >
                  <div className="w-100 text-black rounded-xl overflow-hidden ">
                    {/* Image Section */}
                    <div className="relative">
                      {ecosystem.services[0]?.services && (
                        <div key={ecosystem.services[0]._id}>
                          <img
                            src={
                              ecosystem.services[0].services[
                                Math.floor(
                                  Math.random() *
                                    ecosystem.services[0].services.length
                                )
                              ].serviceImage ||
                              "https://gfa-tech.com/dimp-template-images/barber/barber-bg3.jpg"
                            }
                            alt="Random Service"
                            className="w-full h-40 object-cover rounded-xl"
                          />
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center mt-1 p-4">
                      <h2 className="text-lg font-semibold">
                        {ecosystem.ecosystemName}
                      </h2>
                      <div className="flex items-center space-x-2">
                        {ecosystem.ecosystemDomain && (
                          <a
                            href={`https://${ecosystem.ecosystemDomain}.dimpified.com`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <p className="text-sec10 hover:text-primary3 text-sm mt-1 hover:underline hover:underline-offset-4">
                              Visit Store
                            </p>
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="px-4 pb-4">
                      <div className="flex justify-between items-center">
                        <p className="text-gray-700">
                          {ecosystem.ecosystemDescription?.slice(0, 50)}...
                        </p>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-sm mt-4">
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

                        <div className="flex ">
                          <span className="text-lg font-semibold">
                            {" "}
                            {ecosystem.services[0]?.services && (
                              <div key={ecosystem.services[0]._id}>
                                {ecosystem.services[0].services
                                  .sort((a, b) => a.price - b.price)
                                  .map((service, index) =>
                                    index === 0 ? (
                                      <div key={service._id}>
                                        #{service.price}
                                      </div>
                                    ) : null
                                  )}
                              </div>
                            )}
                          </span>{" "}
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
                            // onClick={handleModalOpen}
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
          )}
        </div>

        <FooterWithLinks />
      </div>
    </motion.div>
  );
};

export default FindBarber;
