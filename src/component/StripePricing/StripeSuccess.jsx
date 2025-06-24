
import React, { useState, useEffect } from "react";
import { Text, Heading } from "../Text";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { showToast } from "../ShowToast";
import { setEcosystemDomain } from "../../features/ecosystemDomain";
import { setEcosystemPlan } from "../../features/ecosystemPlan";
import AxiosInterceptor from "../../component/AxiosInterceptor";
import Lottie from "lottie-react";
import LoadingAnimation from "../../assets/affliate-img/LoadingAnimation.json";
import { motion } from "framer-motion";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState(
    "🔍 Verifying your payment... Just a sec! 😊"
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const userDetails = useSelector((state) => state.auth.user || { email: "UNKNOWN EMAIL" });

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

  const loadingMessages = [
    "🔍 Verifying your payment... Just a sec! 😊",
    "🚀 Checking your subscription status... Almost ready! 🎉",
    "🌐 Syncing with our servers... Stay tuned! ⚡",
    "🛠️ Processing your awesome plan... Hang on tight! 🔥",
    "🎯 Finalizing your subscription... You're nearly set! ✨",
  ];

  useEffect(() => {
    const verifySubscription = async () => {
      let attempts = 0;
      const maxAttempts = 5;
      const intervalId = setInterval(async () => {
        attempts += 1;
        setLoadingMessage(loadingMessages[attempts - 1] || "Still verifying... Please wait.");

        const authFetch = AxiosInterceptor(accessToken, refreshToken);
        try {
          const result = await authFetch.get(
            `${import.meta.env.VITE_API_URL}/check-subscription-status/${userDetails.email}`
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
            // Route based on current path
            if (location.pathname === "/creator/dashboard/Subscription") {
              navigate("/creator/dashboard/overview");
            } else {
              navigate("/auth/edit-template");
            }
          }
        } catch (error) {
          if (attempts >= maxAttempts) {
            clearInterval(intervalId);
            showToast("Subscription verification timed out. Please try again.");
            setLoading(false);
            // Route based on current path
            if (location.pathname === "/creator/dashboard/Subscription") {
              navigate("/creator/dashboard/overview");
            } else {
              navigate("/auth/edit-template");
            }
          }
          console.error("Subscription check failed", error);
        }
      }, 10000);
    };

    verifySubscription();
  }, [searchParams, navigate, dispatch, userDetails.email, accessToken, refreshToken, location.pathname]);

  if (loading) return <LoadingPage message={loadingMessage} />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Heading className="text-3xl font-bold text-center mb-8 text-gray-800">
        Subscription Processing
      </Heading>
      <Text className="text-center text-gray-600">
        Your subscription is being verified. You will be redirected shortly.
      </Text>
    </div>
  );
};

export default SuccessPage;