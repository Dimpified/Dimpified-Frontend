import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSelector } from "react-redux";
import { ButtonSmallWhite, ButtonLongPurple } from "../../../component/Buttons";
import { showToast } from "../../../component/ShowToast";
import api from "../../../api/authApis";
import { useNavigate } from "react-router-dom";

// Yup validation schema for 6-digit OTP
const schema = yup.object().shape({
  otp: yup
    .string()
    .required("OTP is required")
    .matches(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

const EmailVerification = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendCountdown, setResendCountdown] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const creatorEmail = useSelector(
    (state) => state.auth.user?.email || "UNKNOW"
  );
  const creatorPhoneNumber = useSelector(
    (state) => state.auth.user?.phoneNumber || "UNKNOW"
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });


  // Sync otp array to react-hook-form
  useEffect(() => {
    setValue("otp", otp.join(""));
  }, [otp, setValue]);

  // Countdown timer for resend
  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            setIsResendDisabled(false);
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCountdown]);

  const onBack = async() => {
    navigate("/auth/personal-Information")
  };
  
  // Handle input change
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      return;
    }
    if (!/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
      inputRefs.current[index + 1]?.select();
    }
  };

  // Handle backspace/delete & arrow keys
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      if (otp[index] !== "") {
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
        const prevOtp = [...otp];
        prevOtp[index - 1] = "";
        setOtp(prevOtp);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      e.preventDefault();
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle paste spreading across inputs starting at focused index
  const handlePaste = (e, index) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pastedData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && index + i < 6; i++) {
      newOtp[index + i] = pastedData[i];
    }
    setOtp(newOtp);

    const focusIndex = Math.min(index + pastedData.length - 1, 5);
    inputRefs.current[focusIndex]?.focus();
  };

  // Handle resend code
  const handleResend = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.creatorResendVerifyToken({
        email: creatorEmail,
        phoneNumber: creatorPhoneNumber,
      });
      showToast(response.data.message, "success");
      setIsResendDisabled(true);
      setResendCountdown(60);
    } catch (error) {
      showToast("OTP Resend failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await api.creatorVerifyToken({
        email: creatorEmail,
        OTP: data.otp,
      });
      showToast(response.data.message, "success");
      navigate("/auth/business-type")
    } catch (error) {
      showToast("OTP Verification failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Enter key to submit if OTP complete
  useEffect(() => {
    const handleEnter = (e) => {
      if (e.key === "Enter" && otp.every((digit) => digit !== "")) {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }
    };
    window.addEventListener("keydown", handleEnter);
    return () => window.removeEventListener("keydown", handleEnter);
  }, [otp, handleSubmit]);

  return (
    <div className="flex min-h-screen justify-center">
      <div className="w-full p-6">
        <ButtonSmallWhite
          className="rounded-xl mb-6"
          width="w-[100px]"
          padding="2"
          height="10"
          onClick={onBack}
        >
          Back
        </ButtonSmallWhite>

        <h2 className="text-2xl font-bold text-[#2d1c4d] mb-4 uppercase">
          OTP Verification
        </h2>
        <p className="text-gray-500 mb-6">
          Enter the 6-digit pin sent to your phone number or email
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full gap-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={(e) => handlePaste(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
                className={`w-full h-16 border rounded text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-[#2d1c4d] ${
                  errors.otp ? "border-red-500" : "border-gray-300"
                }`}
              />
            ))}
          </div>

          {/* Hidden input to register OTP value */}
          <input type="hidden" {...register("otp")} />

          {errors.otp && (
            <p className="text-red-500 text-sm mb-4">{errors.otp.message}</p>
          )}

          <div className="flex justify-center items-center mb-6">
            <button
              type="button"
              onClick={handleResend}
              disabled={isResendDisabled || isSubmitting}
              className={`text-[#9966f2] underline font-medium ${
                isResendDisabled || isSubmitting
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:underline"
              }`}
            >
              Resend Code {resendCountdown > 0 && `(${resendCountdown}s)`}
            </button>
          </div>

          <ButtonLongPurple
            type="submit"
            width="w-full"
            disabled={isSubmitting || otp.some((digit) => digit === "")}
            className={`${
              isSubmitting || otp.some((digit) => digit === "")
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                  ></path>
                </svg>
                Verifying...
              </div>
            ) : (
              "Submit"
            )}
          </ButtonLongPurple>
        </form>
      </div>
    </div>
  );
};

export default EmailVerification;
