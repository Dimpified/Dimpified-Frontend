import React, { useState, useEffect } from "react";
import { Text, Heading } from "../../../../component/Text";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../../../component/ShowToast";
import { useSelector } from "react-redux";
import {
  pricingPlans,
  stripeTransactionFees,
  planFeatures,
  packageNames,
  planDescriptions,
  StripePlans,
  planSubTitle,
} from "../../../../data/Pricing";
import api2 from "../../../../api/Template";
import axios from "axios";

// Modal Component for Detailed Comparison (same as above)
const ComparisonModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Compare Plans</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr>
                <th className="p-3 border-b border-gray-200 font-medium text-gray-900">
                  Solutions
                </th>
                <th className="p-3 border-b border-gray-200 font-medium text-gray-900">
                  Features
                </th>
                <th className="p-3 border-b border-gray-200 font-medium text-gray-900 bg-yellow-100">
                  Lite Plan
                </th>
                <th className="p-3 border-b border-gray-200 font-medium text-gray-900 bg-blue-100">
                  Plus Plan
                </th>
                <th className="p-3 border-b border-gray-200 font-medium text-gray-900 bg-green-100">
                  Pro Plan
                </th>
                <th className="p-3 border-b border-gray-200 font-medium text-gray-900 bg-red-100">
                  Extra Plan
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Core Scheduling */}
              <tr>
                <td
                  className="p-3 border-b border-gray-200 font-medium text-gray-900"
                  rowSpan="8"
                >
                  Core Scheduling
                </td>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  Basic online booking
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  Group appointments
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  Recurring appointments
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  VIP Booking Prioritization
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  Calendar Sync
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  Resource Allocation
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  Waitlist
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  AI Scheduling Assistance
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              {/* Email & SMS Reminders */}
              <tr>
                <td
                  className="p-3 border-b border-gray-200 font-medium text-gray-900"
                  rowSpan="2"
                >
                  Email & SMS Reminders
                </td>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  Email & SMS Reminder
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  Staff Accounts
                </td>
                <td className="p-3 border-b border-gray-200 text-center">
                  None
                </td>
                <td className="p-3 border-b border-gray-200 text-center">5</td>
                <td className="p-3 border-b border-gray-200 text-center">
                  Unlimited
                </td>
                <td className="p-3 border-b border-gray-200 text-center">
                  Unlimited
                </td>
              </tr>
              {/* Payment and POS */}
              <tr>
                <td
                  className="p-3 border-b border-gray-200 font-medium text-gray-900"
                  rowSpan="4"
                >
                  Payment and POS
                </td>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  Accept Online Payments
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  POS Automation
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  Automated Invoicing
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  Subscription Billing
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              {/* Offline */}
              <tr>
                <td
                  className="p-3 border-b border-gray-200 font-medium text-gray-900"
                  rowSpan="4"
                >
                  Offline
                </td>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  Manual Invoice Generator
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  Split Payments
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  Tax Automation
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
              <tr>
                <td className="p-3 border-b border-gray-200 text-gray-600">
                  Dynamic Pricing
                </td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✕</td>
                <td className="p-3 border-b border-gray-200 text-center">✔</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
const Card = ({
  plan,
  selectedInterval,
  price,
  stripePriceId,
  isPopular = false,
}) => {
  const userDetails = useSelector(
    (state) => state.auth.user || { email: "UNKNOWN EMAIL" }
  );
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(
    "🔍 Initiating your checkout... Just Quincy a sec! 😊"
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
      className={`bg-[#f9f9f9] rounded-lg overflow-hidden flex flex-col ${
        isPopular
          ? "bg-[#9f68fe]/10 border border-gray-200"
          : "border border-gray-200"
      }`}
    >
      {isPopular && (
        <div className="flex justify-end">
          <div className="bg-[#9f68fe] text-white w-1/2 text-xs py-2 font-semibold text-center rounded-bl-3xl rounded-tr-3xl">
            Recommended
          </div>
        </div>
      )}
       
      <div
        className={`px-6 py-8 flex flex-col flex-grow ${
          isPopular? "py-4" : "border  border-gray-200"
        }`}
      >
        <div className="h-10 items-center">
          <Heading className="text-xl font-semibold text-[#9f68fe]">
            {plan} Plan
          </Heading>
        </div>
        
        <div 
         className={`h-20 items-center border-b-2 ${
          isPopular ? "h-10" : "h-10 border-gray-200"
        }`}
        >
          <Heading className="text-sm font-semibold text-[#7b7777]">
            {planSubTitle[plan]}
          </Heading>
        </div>
        <div className="h-20 items-center">
          <Text className="mt-2 text-sm text-[#7b7777]">
            {planDescriptions[plan]}
          </Text>
        </div>
        <div className="mt-4 border border-[#9f68fe] rounded-xl px-4 py-1">
          <span className="text-3xl font-bold text-[#9f68fe]">
            ${price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">/month</span>
        </div>
        <div className="mt-4 h-20 bg-[#eeeded] px-2 py-3 rounded-xl">
          <Text className="text-sm font-medium text-gray-900">
            Transaction Fees
          </Text>
          <div className="mt-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Online:</span>
              <span>{stripeTransactionFees.Online[plan]}</span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex-grow">
          <Text className="text-sm font-medium text-gray-900 text-underline">Features Plan</Text>
          {plan !== "Lite" && (
            <Text className="mt-2 text-xs text-gray-500">
              Everything in{" "}
              {plan === "Plus"
                ? "Lite"
                : plan === "Pro"
                ? "Lite and Plus"
                : "Lite, Plus and Pro"}{" "}
              plan
            </Text>
          )}
          <ul className="mt-2 space-y-8 text-xs text-gray-600">
            {planFeatures[plan].map((feature, index) => (
              <li key={index} className="flex items-start">
                <span>✔</span>
                <span className="ml-2">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          onClick={handleSignUp}
          disabled={loading}
        >
          {loading ? "Processing" : "Select Plan"}
        </button>
      </div>
    </div>
  );
};

const CardContainer = () => {
  const [selectedInterval, setSelectedInterval] = useState("Monthly");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const intervalMap = {
    Monthly: { interval: "month", interval_count: 1 },
    Quarterly: { interval: "month", interval_count: 3 },
    "Half-Yearly": { interval: "month", interval_count: 6 },
    Annually: { interval: "year", interval_count: 1 },
  };

  return (
    <div className="w-full mx-auto px-4 sm:px-6 py-12">
      {/* Billing Period Selector and Detailed Comparison */}
      <div className="lg:flex justify-between items-center mb-8">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-purple-600 border border-blue-600 py-3 rounded-xl px-6 text-sm font-medium flex items-center"
        >
          <span className="mr-2">≡</span> Detailed Comparison?
        </button>
        <div className="lg:flex lg:space-x-2 space-y-4 lg:space-y-0 mt-4">
          {pricingPlans.map((period) => (
            <label
              key={period}
              className="px-4 py-1 text-sm font-medium rounded-full cursor-pointer flex items-center "
            >
              <input
                type="radio"
                name="pricingInterval"
                value={period}
                checked={selectedInterval === period}
                onChange={() => setSelectedInterval(period)}
                className="mr-2" // Add spacing if needed
              />
              {period}
            </label>
          ))}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {StripePlans.map((plan) => {
          const stripePrice = plan.prices.find(
            (price) =>
              price.interval === intervalMap[selectedInterval].interval &&
              price.interval_count ===
                intervalMap[selectedInterval].interval_count
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

      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CardContainer;
