import { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_SNOOPI_API_KEY;

const PricingLocation = () => {
  const [country, setCountry] = useState(null);
  const [ip, setIp] = useState(null);

  useEffect(() => {
    const fetchIPAndLocation = async () => {
      try {
        // Check if country code is already in local storage
        const storedCountryCode = localStorage.getItem("countryCode");

        if (storedCountryCode) {
          setCountry(storedCountryCode);
          return; // Exit the function if country code is already stored
        }

        // Step 1: Get the user's IP address
        const ipResponse = await axios.get("https://api64.ipify.org?format=json");
        const userIP = ipResponse.data.ip;
        setIp(userIP);

        // Step 2: Use the IP to get location data from Snoopi.io
        const locationResponse = await axios.get(`https://api.snoopi.io/${userIP}?apikey=${API_KEY}`);
        const countryCode = locationResponse.data.Country?.CountryCode;

        if (countryCode) {
          setCountry(countryCode);
          // Store the country code in local storage
          localStorage.setItem("countryCode", countryCode);
        } else {
          console.error("Country code not found in response");
        }
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchIPAndLocation();
  }, []);

  return { country, ip };
};

export default PricingLocation;