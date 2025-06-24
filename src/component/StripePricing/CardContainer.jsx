// src/components/Pricing.js
import React, { useState, useEffect } from "react";
import { Text, Heading } from "../Text";
import { useNavigate } from "react-router-dom";
import { showToast } from "../ShowToast";
import { useSelector} from "react-redux";
import {
  pricingPlans,
  stripeTransactionFees,
  planFeatures,
  packageNames,
  planDescriptions,
  StripePlans,
} from "../../data/Pricing";
import api2 from "../../api/Template";
import axios from "axios";

const Card = ({ plan, selectedInterval, price, stripePriceId, isPopular = false }) => {
  const userDetails = useSelector((state) => state.auth.user || { email: "UNKNOWN EMAIL" });
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "🔍 Initiating your checkout... Just a sec! 😊"
  );
  const navigate = useNavigate();
  const [userDetailEco, setUserDetailEco] = useState(null);

  const loadingMessages = [
    "🔍 Initiating your checkout... Just a sec! 😊",
    "🚀 Preparing your subscription... Almost there! 🎉",
    "🌐 Connecting to Stripe... Stay tuned! ⚡",
    "🛠️ Setting up your plan... Hang on tight! 🔥",
    "🎯 Finalizing your checkout... You're nearly set! ✨",
  ];

  const initiateStripeCheckout = async (planName, priceId) => {
    if (!userDetails.email) {
      showToast("Please log in to proceed with payment.");
      return;
    }

    setLoading(true);
    setLoadingMessage(loadingMessages[0]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-stripe-checkout-session`,
        {
          priceId: priceId,
          email: userDetails.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response);

      // Redirect to Stripe Checkout URL
      window.location.href = response.data.session.url;
    } catch (err) {
      showToast(`Failed to initialize checkout: ${err.message}`);
      setLoading(false);
    }
  };

  const getEcosystem = async () => {
    try {
      const response = await api2.getBusinessInfo({
        creatorId: userDetails.creatorId,
        accessToken,
        refreshToken,
      });
      setUserDetailEco(response.data.getEcosystem);
    } catch {
      console.log("Could not get business info");
    }
  };

  useEffect(() => {
    getEcosystem();
  }, [userDetails.creatorId, accessToken, refreshToken]);

  const handleSignUp = () => {
    if (!userDetailEco || !userDetailEco.ecosystemDomain) {
      showToast("Ecosystem details are missing, try again later.");
      return;
    }
    initiateStripeCheckout(plan, stripePriceId);
  };

  if (loading) return <LoadingPage message={loadingMessage} />;

  return (
    <div
      className={`bg-white rounded-lg overflow-hidden flex flex-col ${
        isPopular
          ? "border-2 border-sec10 transform scale-105"
          : "border border-gray-200"
      }`}
    >
      {isPopular && (
        <div className="bg-sec10 text-white py-1 text-center text-sm font-medium">
          MOST POPULAR
        </div>
      )}
      <div className="px-6 py-8 flex flex-col flex-shrink-0">
        <Heading className="text-2xl font-bold text-gray-900 h-[30px]">
          {plan}
        </Heading>
        <Text className="mt-2 text-sm text-gray-600 h-[50px]">
          {packageNames[plan]}
        </Text>
        <Text className="mt-4 text-sm text-gray-500 h-[100px]">
          {planDescriptions[plan]}
        </Text>
        <div className="mt-6 h-[50px]">
          <span className="text-3xl font-extrabold text-gray-900">
            ${price.toFixed(2)}
          </span>
          <span className="text-base font-medium text-gray-500">
            /{selectedInterval.toLowerCase()}
          </span>
        </div>
        <button
          className={`mt-8 w-full h-[50px] ${
            isPopular
              ? "bg-sec10 hover:bg-primary3"
              : "bg-primary3 hover:bg-sec10"
          } border border-transparent rounded-md py-3 px-4 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            isPopular ? "focus:ring-primary3" : "focus:ring-sec10"
          }`}
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? "Processing" : "Sign Up Now"}
        </button>
      </div>
      <div className="border-t border-gray-200 px-6 py-8 bg-gray-50 flex-shrink-0 h-[200px]">
        <Heading as="h4" className="text-sm font-medium text-gray-900">
          Transaction Fees
        </Heading>
        <ul className="mt-4 space-y-3">
          <li className="flex items-start">
            <Text className="text-sm text-gray-600">Online:</Text>
            <Text className="ml-auto text-sm font-medium text-gray-900">
              {stripeTransactionFees.Online[plan]}
            </Text>
          </li>
          {/* <li className="flex items-start">
            <Text className="text-sm text-gray-600">Offline:</Text>
            <Text className="ml-auto text-sm font-medium text-gray-900">
              {stripeTransactionFees.Offline[plan]}
            </Text>
          </li> */}
        </ul>
      </div>
      <div className="border-t border-gray-200 px-6 py-8 flex-grow overflow-y-auto">
        <Heading as="h4" className="text-sm font-medium text-gray-900 mb-4">
          Features
        </Heading>
        {plan !== "Lite" && (
          <div className="pb-4 border-gray-200">
            <Text className="text-sm text-gray-500">
              Everything in{" "}
              {plan === "Plus"
                ? "Lite"
                : plan === "Pro"
                ? "Lite and Plus"
                : "Lite, Plus and Pro"}
            </Text>
          </div>
        )}
        <ul className="space-y-3">
          {planFeatures[plan].map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mr-2 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <Text className="text-[11px] text-gray-600">{feature}</Text>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const CardContainer = () => {
  const [selectedInterval, setSelectedInterval] = useState("Monthly");

  // Map pricingPlans to Stripe intervals
  const intervalMap = {
    Monthly: { interval: "month", interval_count: 1 },
    Quarterly: { interval: "month", interval_count: 3 },
    "Half-Yearly": { interval: "month", interval_count: 6 },
    Annually: { interval: "year", interval_count: 1 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Billing Period Selector */}
      <div className="flex md:justify-end justify-center mb-16">
        <div className="inline-flex rounded-md shadow-sm">
          {pricingPlans.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedInterval(period)}
              className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                selectedInterval === period
                  ? "bg-primary3 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } ${period === pricingPlans[0] ? "rounded-l-md" : ""} ${
                period === pricingPlans[pricingPlans.length - 1]
                  ? "rounded-r-md"
                  : ""
              } border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary3`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12 lg:px-0 px-3">
        {StripePlans.map((plan) => {
          const stripePrice = plan.prices.find(
            (price) =>
              price.interval === intervalMap[selectedInterval].interval &&
              price.interval_count === intervalMap[selectedInterval].interval_count
          );
          const displayPrice = stripePrice?.amount || 0;

          return (
            <Card
              key={plan.name}
              plan={plan.name}
              selectedInterval={selectedInterval}
              price={displayPrice}
              stripePriceId={stripePrice?.id || ""}
              isPopular={plan.name === "Pro"}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardContainer;