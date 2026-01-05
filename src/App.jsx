import { useState, useEffect, useRef } from "react";
import "./App.css";
import AllRoutes from "./component/AllRoutes";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { initializeGA, logPageView } from "./api/analytics";
import useMetaPixel from "./hooks/useMetaPixel";
import { CountryProvider } from "./pages/pricing/CountryContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import mixpanel from "./analytics/mixpanel";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const REG_STEPS = {
  "/auth/personal-information": {
    key: "account",
    index: 1,
    label: "Account Info",
  },
  "/auth/email-verification": {
    key: "verify_email",
    index: 2,
    label: "Verify Email (OTP)",
  },
  "/auth/business-info": {
    key: "business_info",
    index: 3,
    label: "Business Info",
  },
  "/auth/business-type": {
    key: "business_category",
    index: 4,
    label: "Business Category",
  },
  "/auth/preview-template": {
    key: "template",
    index: 5,
    label: "Template Select/Preview",
  },
  "/auth/subscriptions": { key: "payment", index: 6, label: "Payment" },
};

function useRegistrationRouteTracking() {
  const { pathname } = useLocation();
  const enteredAtRef = useRef(Date.now());

  useEffect(() => {
    const step = REG_STEPS[pathname];
    if (!step) return;

    // time spent on previous step (optional)
    const now = Date.now();
    const prevSpent = now - (enteredAtRef.current || now);
    enteredAtRef.current = now;

    // Track "view" of this step
    mixpanel.track("Registration", {
      action: "view",
      step: step.key,
      step_index: step.index,
      step_label: step.label,
      // prev_step_time_ms: prevSpent, // uncomment if you want time on last step
    });

    // Start full-journey timer when they land on step 1
    if (step.key === "account") {
      mixpanel.time_event("Registration Completed");
    }
  }, [pathname]);
}

function App() {
  useEffect(() => {
    initializeGA();
    logPageView(window.location.pathname + window.location.search);
  }, []);

  useMetaPixel(import.meta.env.VITE_META_PIXEL_ID);

  useRegistrationRouteTracking();

  // (Optional) abandon signal if they close tab mid-flow
  useEffect(() => {
    const onUnload = () => {
      mixpanel.track("Registration", { action: "abandon" });
    };
    window.addEventListener("beforeunload", onUnload);
    return () => window.removeEventListener("beforeunload", onUnload);
  }, []);

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
