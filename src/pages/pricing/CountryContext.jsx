import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const API_KEY = import.meta.env.VITE_SNOOPI_API_KEY;

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchIPAndLocation = async () => {
      try {
        const storedCountryCode = localStorage.getItem("countryCode");

        if (storedCountryCode) {
          setCountry(storedCountryCode);
          return;
        }

        const ipResponse = await axios.get("https://api64.ipify.org?format=json");
        const userIP = ipResponse.data.ip;

        const locationResponse = await axios.get(`https://api.snoopi.io/${userIP}?apikey=${API_KEY}`);
        const countryCode = locationResponse.data.Country?.CountryCode;

        if (countryCode) {
          setCountry(countryCode);
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

  return (
    <CountryContext.Provider value={{ country }}>
      {children}
    </CountryContext.Provider>
  );
};

export const useCountry = () => useContext(CountryContext);