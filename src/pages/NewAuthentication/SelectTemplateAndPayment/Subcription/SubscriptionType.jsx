import React, { useEffect, useState } from "react";
import StripeCardContainer from "./StripeCardContainer";
import NairaCardContainer from "./NairaCardContainer";

const SubscriptionType = () => {
  const [countryCode, setCountryCode] = useState(null);

  useEffect(() => {
    // Retrieve countryCode from localStorage
    const storedCountryCode = localStorage.getItem("countryCode");
    setCountryCode(storedCountryCode);
  }, []);

  return (
    <div>
      <NairaCardContainer />
    </div>
  );
};

export default SubscriptionType;
