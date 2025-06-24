import { useState, useEffect } from "react";
import "./App.css";
import AllRoutes from "./component/AllRoutes";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { initializeGA, logPageView } from "./api/analytics";
import useMetaPixel from "./hooks/useMetaPixel";
import { CountryProvider } from "./pages/pricing/CountryContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {
  useEffect(() => {
    initializeGA();
    logPageView(window.location.pathname + window.location.search);
  }, []);

  useMetaPixel(import.meta.env.VITE_META_PIXEL_ID);

  return (
    <CountryProvider>
      <div>
        <Elements stripe={stripePromise}>
          <AllRoutes />
        </Elements>
      </div>
    </CountryProvider>
  );
}

export default App;
