import React, { useState, useEffect } from "react";
import { Text, Heading } from "../Text";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { showToast } from "../ShowToast";
import {
  pricingPlans,
  subscriptionPlans,
  transactionFees,
  planFeatures,
  packageNames,
  planDescriptions,
} from "../../data/Pricing";
import api2 from "../../api/Template";
import { setEcosystemDomain } from "../../features/ecosystemDomain";
import { setEcosystemPlan } from "../../features/ecosystemPlan";
import AxiosInterceptor from "../../component/AxiosInterceptor";
import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/affliate-img/LoadingAnimation.json";
import { motion } from "framer-motion";

// Loading Page Component
const LoadingPage = ({ message }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
    className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center bg-white z-[9999] font-body"
  >
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    >
      <Lottie
        animationData={LoadingAnimation}
        loop
        className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-60 xl:h-60 text-primary4"
      />
    </motion.div>
    <motion.h2
      className="mt-4 text-xl font-semibold text-gray-700 text-center px-4"
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    >
      {message}
    </motion.h2>
  </motion.div>
);

// Card Component
const Card = ({ plan, selectedInterval, price, isPopular = false }) => {
  const userDetails = useSelector(
    (state) => state.auth.user || "UNKNOWN EMAIL"
  );
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "🔍 Verifying your payment... Just a sec! 😊"
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userDetailEco, setUserDetailEco] = useState(null);

  const loadingMessages = [
    "🔍 Verifying your payment... Just a sec! 😊",
    "🚀 Checking your subscription status... Almost ready! 🎉",
    "🌐 Syncing with our servers... Stay tuned! ⚡",
    "🛠️ Processing your awesome plan... Hang on tight! 🔥",
    "🎯 Finalizing your subscription... You're nearly set! ✨",
  ];

  const planCode = subscriptionPlans[selectedInterval]?.[plan]?.code;
  console.log(planCode);

  const config = {
    public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
    tx_ref: `tx-${Date.now()}-${userDetails?.creatorId}`,
    amount: price,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: userDetails?.email || "UNKNOWN EMAIL",
      fullName: userDetails?.fullName || "UNKNOWN NAME",
    },
    customizations: {
      title: `${plan} Subscription`,
      description: `${selectedInterval} ${plan} plan subscription`,
    },
    payment_plan: planCode,
  };

  const handleFlutterwavePayment = useFlutterwave(config);

  const initiatePayment = (plan, interval) => {
    console.log("Initiating payment with config:", config);
    handleFlutterwavePayment({
      callback: (paymentResponse) => {
        console.log("Flutterwave payment response:", paymentResponse);
        setLoading(true);
        closePaymentModal();

        let attempts = 0;
        const maxAttempts = 5;
        const intervalId = setInterval(async () => {
          attempts += 1;
          setLoadingMessage(
            loadingMessages[attempts - 1] || "Still verifying... Please wait."
          );

          const authFetch = AxiosInterceptor(accessToken, refreshToken);
          try {
            const result = await authFetch.get(
              `${import.meta.env.VITE_API_URL}/check-subscription-status/${
                userDetails?.email
              }`
            );

            if (
              result.status === 201 &&
              result.data.message === "Subscription verified successfully"
            ) {
              clearInterval(intervalId);
              showToast(result.data.message);
              if (result.data.ecosystemDomain) {
                dispatch(setEcosystemDomain(result.data.ecosystemDomain));
              }
              if (result.data.planType) {
                dispatch(setEcosystemPlan(result.data.planType));
              }
              setLoading(false);
              navigate("/new/auth/edit-template");
            }
          } catch (error) {
            if (attempts >= maxAttempts) {
              clearInterval(intervalId);
              showToast(
                "Subscription verification timed out. Please try again."
              );
              setLoading(false);
              navigate("/creator/dashboard/overview");
            }
            console.error("Subscription check failed", error);
          }
        }, 10000);
      },
      onClose: () => {
        showToast("Transaction canceled.");
      },
    });
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
  }, []);

  const handleSignUp = () => {
    if (!userDetailEco || !userDetailEco.ecosystemDomain) {
      showToast("Ecosystem details are missing, try again later.");
      return;
    }
    initiatePayment(plan, selectedInterval);
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
            ₦{price.toLocaleString()}
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
      {/* <div className="border-t border-gray-200 px-6 py-8 bg-gray-50 flex-shrink-0 h-[200px]">
        <Heading as="h4" className="text-sm font-medium text-gray-900">
          Transaction Fees
        </Heading>
        <ul className="mt-4 space-y-3">
          <li className="flex items-start">
            <Text className="text-sm text-gray-600">Online:</Text>
            <Text className="ml-auto text-sm font-medium text-gray-900">
              {transactionFees.Online[plan]}
            </Text>
          </li>
          <li className="flex items-start">
            <Text className="text-sm text-gray-600">Offline:</Text>
            <Text className="ml-auto text-sm font-medium text-gray-900">
              {transactionFees.Offline[plan]}
            </Text>
          </li>
        </ul>
      </div> */}
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

// CardContainer Component
const CardContainer = () => {
  const [selectedInterval, setSelectedInterval] = useState("Monthly");

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
        {["Lite", "Plus", "Pro", "Extra"].map((plan) => (
          <Card
            key={plan}
            plan={plan}
            selectedInterval={selectedInterval}
            price={subscriptionPlans[selectedInterval][plan]?.amount || 0}
            isPopular={plan === "Pro"}
          />
        ))}
      </div>
    </div>
  );
};

export default CardContainer;
