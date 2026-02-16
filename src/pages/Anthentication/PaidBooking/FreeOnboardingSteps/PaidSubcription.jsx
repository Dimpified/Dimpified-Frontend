// PaidSubscription.tsx
import React, { useState, useEffect } from "react";
import PaidOnboardingLayout from "./PaidOnboardingLayout";
import { Text, Heading } from "../../../../component/Text";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { showToast } from "../../../../component/ShowToast";
import {
  subscriptionPlans,
  paidPlanFeatures,
  paidPlanSubTitle,
  paidPlanDescriptions,
  oneTimePaymentPlan,
} from "../../../../data/Pricing";
import { setEcosystemDomain } from "../../../../features/ecosystemDomain";
import { setEcosystemPlan } from "../../../../features/ecosystemPlan";
import AxiosInterceptor from "../../../../component/AxiosInterceptor";
import Lottie from "lottie-react";
import LoadingAnimation from "../../../../assets/affliate-img/LoadingAnimation.json";
import { motion } from "framer-motion";
import api2 from "../../../../api/Template";

// ----------------------- Loading Component -----------------------
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

// ----------------------- Subscription Modal -----------------------
const SubscriptionModal = ({ isOpen, onClose, onConfirm }) => {
  const [selectedMode, setSelectedMode] = useState(null);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Choose your subscription mode
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>
        <div className="mb-4">
          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="subscriptionMode"
              value="recurring"
              onChange={() => setSelectedMode("recurring")}
              className="mr-2"
            />
            Recurring Subscription (Billed Monthly - Card Payment)
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="subscriptionMode"
              value="oneTime"
              onChange={() => setSelectedMode("oneTime")}
              className="mr-2"
            />
            One-Time Subscription (Minimum of 3 months - Bank Transfer)
          </label>
        </div>
        <button
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={() => onConfirm(selectedMode)}
          disabled={!selectedMode}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

// ----------------------- Card Component -----------------------
const Card = ({ plan, selectedInterval, price, isPopular = false }) => {
  const userDetails = useSelector((state) => state.auth.user || {});
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "🔍 Verifying your payment... Just a sec! 😊"
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userDetailEco, setUserDetailEco] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const referralCode = localStorage.getItem("referralCode");

  const loadingMessages = [
    "🔍 Verifying your payment... Just a sec! 😊",
    "🚀 Checking your subscription status... Almost ready! 🎉",
    "🌐 Syncing with our servers... Stay tuned! ⚡",
    "🛠️ Processing your awesome plan... Hang on tight! 🔥",
    "🎯 Finalizing your subscription... You're nearly set! ✨",
  ];

  const getReferralOneTimeAmount = () => {
    const baseAmount = subscriptionPlans[selectedInterval]?.[plan]?.amount || price;
    const referralDiscounts = { "2R0873": 0.925, "6LS937": 0.85 };
    return Math.round(baseAmount * (referralDiscounts[referralCode] || 1));
  };
  const referralOneTimeAmount = getReferralOneTimeAmount();

  const handleFlutterwavePaymentRecurring = useFlutterwave({
    public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
    tx_ref: `tx-${Date.now()}-${userDetails?.creatorId}`,
    amount: price,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: { email: userDetails?.email, name: userDetails?.fullName },
    customizations: {
      title: `${plan} Subscription`,
      description: `${selectedInterval} ${plan} plan subscription`,
    },
    payment_plan: subscriptionPlans[selectedInterval]?.[plan]?.code,
  });

  const getOneTimeAmount = () => {
    if (selectedInterval === "Monthly")
      return oneTimePaymentPlan["Quarterly"]?.[plan]?.amount || price * 3;
    return oneTimePaymentPlan[selectedInterval]?.[plan]?.amount || price * 3;
  };
  const oneTimeAmount = getOneTimeAmount();
  const handleFlutterwavePaymentOneTime = useFlutterwave({
    public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
    tx_ref: `tx-${Date.now()}-${userDetails?.creatorId}`,
    amount: oneTimeAmount,
    currency: "NGN",
    payment_options: "banktransfer,card,mobilemoney,ussd",
    customer: { email: userDetails?.email, fullName: userDetails?.fullName },
    customizations: {
      title: `${plan} One-Time Subscription`,
      description: `One-time ${plan} plan subscription for ${
        selectedInterval === "Monthly" ? "Quarterly" : selectedInterval
      }`,
    },
  });

  const handleFlutterwavePaymentReferral = useFlutterwave({
    public_key: import.meta.env.VITE_FLW_PUBLIC_KEY,
    tx_ref: `tx-ref-${Date.now()}-${userDetails?.creatorId}`,
    amount: referralOneTimeAmount,
    currency: "NGN",
    payment_options: "card",
    customer: { email: userDetails?.email, fullName: userDetails?.fullName },
    customizations: {
      title: `${plan} Referral One-Time Subscription`,
      description: `One-time ${plan} plan subscription with referral discount`,
    },
    meta: {
      discount: true,
      creatorId: userDetails?.creatorId,
      planType: plan,
      interval: selectedInterval,
      ecosystemDomain: userDetailEco?.ecosystemDomain || "UNKNOWN",
    },
  });

  const initiatePayment = (mode) => {
    const handler =
      mode === "recurring" ? handleFlutterwavePaymentRecurring : handleFlutterwavePaymentOneTime;
    handler({
      callback: (res) => {
        setLoading(true);
        closePaymentModal();
        verifyPayment(res);
      },
      onClose: () => showToast("Transaction canceled."),
    });
  };

  const initiateReferralPayment = () => {
    handleFlutterwavePaymentReferral({
      callback: (res) => {
        setLoading(true);
        closePaymentModal();
        verifyReferralPayment(res);
      },
      onClose: () => showToast("Transaction canceled."),
    });
  };

  const verifyPayment = (paymentResponse) => {
    let attempts = 0;
    const maxAttempts = 5;
    const intervalId = setInterval(async () => {
      attempts++;
      setLoadingMessage(loadingMessages[attempts - 1] || "Verifying...");
      const authFetch = AxiosInterceptor(accessToken, refreshToken);
      try {
        const result = await authFetch.get(
          `${import.meta.env.VITE_API_URL}/check-subscription-status/${userDetails?.email}`
        );
        if (result.status === 201 && result.data.message === "Subscription verified successfully") {
          clearInterval(intervalId);
          showToast(result.data.message);
          if (result.data.ecosystemDomain) dispatch(setEcosystemDomain(result.data.ecosystemDomain));
          if (result.data.planType) dispatch(setEcosystemPlan(result.data.planType));
          setLoading(false);
          navigate("/creator/dashboard/overview");
        }
      } catch (error) {
        if (attempts >= maxAttempts) {
          clearInterval(intervalId);
          showToast("Subscription verification timed out. Please try again.");
          setLoading(false);
          navigate("/auth/subscriptions");
        }
      }
    }, 10000);
  };

  const verifyReferralPayment = (paymentResponse) => {
    let attempts = 0;
    const maxAttempts = 5;
    const intervalId = setInterval(async () => {
      attempts++;
      setLoadingMessage(loadingMessages[attempts - 1] || "Verifying...");
      const authFetch = AxiosInterceptor(accessToken, refreshToken);
      try {
        const result = await authFetch.get(
          `${import.meta.env.VITE_API_URL}/check-subscription-status/${userDetails?.email}`
        );
        if (result.status === 201 && result.data.message === "Subscription verified successfully") {
          clearInterval(intervalId);
          showToast(result.data.message);
          if (result.data.ecosystemDomain) dispatch(setEcosystemDomain(result.data.ecosystemDomain));
          if (result.data.planType) dispatch(setEcosystemPlan(result.data.planType));
          localStorage.removeItem("referralCode");
          setLoading(false);
          navigate("/creator/dashboard/overview");
        }
      } catch (error) {
        if (attempts >= maxAttempts) {
          clearInterval(intervalId);
          showToast("Subscription verification timed out. Please try again.");
          setLoading(false);
          navigate("/auth/subscriptions");
        }
      }
    }, 10000);
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
      console.log("Could not get ecosystem info");
    }
  };

  useEffect(() => {
    getEcosystem();
  }, []);

  const handleSignUp = () => {
    if (!userDetailEco?.ecosystemDomain) return showToast("Ecosystem details missing.");
    referralCode ? initiateReferralPayment() : setIsModalOpen(true);
  };

  if (loading) return <LoadingPage message={loadingMessage} />;

  return (
    <div
      className={`bg-[#f9f9f9] rounded-lg overflow-hidden flex flex-col ${
        isPopular ? "bg-[#9f68fe]/10 border border-gray-200" : "border border-gray-200"
      }`}
    >
      {isPopular && (
        <div className="flex justify-end">
          <div className="bg-[#9f68fe] text-white w-1/2 text-xs py-2 font-semibold text-center rounded-bl-3xl rounded-tr-3xl">
            Recommended
          </div>
        </div>
      )}

      <div className="px-6 py-8 flex flex-col flex-grow">
        <Heading className="text-xl font-semibold text-[#9f68fe]">{plan} Plan</Heading>
        <Heading className="text-sm font-semibold text-[#7b7777]">{paidPlanSubTitle[plan]}</Heading>
        <Text className="mt-2 text-sm text-[#7b7777]">{paidPlanDescriptions[plan]}</Text>
        <div className="mt-4 border border-[#9f68fe] rounded-xl px-4 py-1">
          <span className="text-3xl font-bold text-[#9f68fe]">
            ₦{referralCode ? referralOneTimeAmount.toLocaleString() : price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">/{selectedInterval.toLowerCase()}</span>
        </div>

        <Text className="text-sm font-medium text-gray-900 mt-4">Features</Text>
        <ul className="mt-2 space-y-2 text-xs text-gray-600">
          {paidPlanFeatures[plan].map((feature, idx) => (
            <li key={idx} className="flex items-start">
              <span>✔</span>
              <span className="ml-2">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={handleSignUp}
        >
          Select Plan
        </button>
      </div>

      <SubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(mode) => {
          setIsModalOpen(false);
          initiatePayment(mode);
        }}
      />
    </div>
  );
};

// ----------------------- Paid Subscription Page -----------------------
const PaidSubscription = () => {
  const [selectedInterval, setSelectedInterval] = useState("Monthly");

  return (
    <PaidOnboardingLayout currentStep={5} rightImage={null}>
      <div className="w-full mx-auto px-4 sm:px-6 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex space-x-2">
            {["Monthly", "Annual"].map((period) => (
              <label
                key={period}
                className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer border ${
                  selectedInterval === period
                    ? "bg-purple-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="pricingInterval"
                  value={period}
                  checked={selectedInterval === period}
                  onChange={() => setSelectedInterval(period)}
                  className="hidden"
                />
                {period}
              </label>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {["Plus", "Pro"].map((plan) => (
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
    </PaidOnboardingLayout>
  );
};

export default PaidSubscription;
