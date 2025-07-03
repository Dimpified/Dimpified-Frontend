import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGoogleLogin } from "@react-oauth/google";
import Select from "react-select";
import { ShortInputWithPlaceholder, LongInputWithPlaceholder } from "../../../component/Inputs";
import { ButtonLongPurple } from "../../../component/Buttons";
import Logo from "../../../assets/NewAuthImage/NewLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newCreatorRegister, creatorSignupWithGoogle } from "../../../features/authentication";
import { showToast } from "../../../component/ShowToast";
import countryCodes from "../../../data/countryCodes.json";
import AuthLayout from "../AuthLayout";

// Google SVG logo
const GoogleLogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2"
    aria-hidden="true"
  >
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.20-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.31 1.08-3.71 1.08-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4 20.28 7.68 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.68 1 4 3.72 2.18 7.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38z"
      fill="#EA4335"
    />
  </svg>
);

// Yup validation schema
const schema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  phone: yup
    .string()
    .matches(/^\d{1,14}$/, "Invalid phone number")
    .required("Phone Number is required"),
  countryCode: yup.string().required("Country code is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  agreeTerms: yup
    .boolean()
    .oneOf([true], "You must agree to the terms")
    .required(),
  receiveMarketing: yup.boolean(),
});

const BasicInfo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      countryCode: "+1",
      password: "",
      agreeTerms: false,
      receiveMarketing: true,
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);

  // Watch countryCode for Select component
  const countryCode = watch("countryCode");

  const onSubmit = async (data) => {
    try {
      const resultAction = await dispatch(
        newCreatorRegister({
          email: data.email,
          password: data.password,
          phoneNumber: `${data.countryCode}${data.phone}`,
          firstName: data.firstName,
          lastName: data.lastName,
          acceptTerms: data.agreeTerms,
          acceptMarketing: data.receiveMarketing,
        })
      );

      if (newCreatorRegister.rejected.match(resultAction)) {
        showToast(resultAction.payload?.message || "Registration failed", "error");
      } else if (newCreatorRegister.fulfilled.match(resultAction)) {
        showToast(resultAction.payload.message, "success");
        const step = resultAction.payload.step;
        const routes = {
          1: "/auth/email-verification",
          2: "/auth/business-type",
          3: "/auth/business-info",
          4: "/auth/select-template",
          5: "/auth/edit-template",
          6: "/creator/dashboard-overview",
        };
        navigate(routes[step] || "/auth/email-verification");
      }
    } catch (error) {
      showToast("An unexpected error occurred. Please try again.", "error");
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      const resultAction = await dispatch(
        creatorSignupWithGoogle({ token: tokenResponse.access_token })
      );

      if (creatorSignupWithGoogle.fulfilled.match(resultAction)) {
        showToast("Google login successful! Redirecting...", "success");
        const step = resultAction.payload.step;
        const routes = {
          2: "/auth/business-type",
          3: "/auth/business-info",
          4: "/auth/select-template",
          5: "/auth/edit-template",
          6: "/creator/dashboard-overview",
        };
        navigate(routes[step] || "/auth/business-type");
      } else if (creatorSignupWithGoogle.rejected.match(resultAction)) {
        showToast(resultAction.payload?.message || "Google login failed", "error");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      showToast("An unexpected error occurred during Google login.", "error");
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Google Sign-In Failed:", error);
    showToast("Google Sign-In Failed. Please try again.", "error");
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: handleGoogleFailure,
    flow: "implicit",
    scope: "profile email",
  });

  // Custom styles for react-select
  const customSelectStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "10px",
      borderColor: errors.countryCode ? "#ef4444" : "#d1d5db",
      boxShadow: errors.countryCode ? "0 0 0 1px #ef4444" : "none",
      "&:hover": {
        borderColor: errors.countryCode ? "#ef4444" : "#9979d1",
      },
      padding: "2px",
      backgroundColor: "#fff",
      minHeight: "44px",
    }),
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
      padding: "8px 12px",
      backgroundColor: state.isSelected
        ? "#9979d1"
        : state.isFocused
        ? "#f3e8ff"
        : "#fff",
      color: state.isSelected ? "#fff" : "#000",
    }),
    singleValue: (provided) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "10px",
      marginTop: "4px",
      zIndex: 10,
    }),
  };

  // Format country codes for react-select
  const countryOptions = countryCodes.map((country) => ({
    value: country.phoneCode,
    label: (
      <div className="flex items-center">
        <img
          src={country.url}
          alt={`${country.country} flag`}
          className="w-6 h-4 mr-2 object-cover"
        />
        <span>
          {country.country} ({country.phoneCode})
        </span>
      </div>
    ),
    searchValue: `${country.country} ${country.phoneCode}`.toLowerCase(),
  }));

  return (
    <AuthLayout>
      <div className="w-full p-4">
        <h2 className="text-3xl items-center gap-1 justify-center font-bold flex text-primary2 mt-4">
          <img
            src={Logo}
            alt="Dimpified Logo"
            className="h-6 sm:h-8 w-auto object-contain"
          />
          for Business
        </h2>

        <div className="w-full lg:px-20 justify-center">
          <p className="text-gray-500 text-xl text-center mb-4">
            Create an account to get an online presence, accept bookings, and grow your income.
          </p>
        </div>

        <button
          type="button"
          onClick={loginWithGoogle}
          className="w-full h-12 font-bold font-body rounded border border-gray-300 p-2 flex items-center justify-center mb-4 hover:bg-gray-100 transition duration-200"
          aria-label="Continue with Google"
        >
          <GoogleLogo />
          Continue with Google
        </button>

        <div className="flex gap-3 w-full items-center">
          <hr className="flex-1 bg-[#E5E5E5]" />
          <p className="text-center text-gray-500">Or</p>
          <hr className="flex-1 bg-[#E5E5E5]" />
        </div>

        <p className="text-gray-500 mb-2 mt-4">
          Please fill in your personal details
        </p>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="lg:flex gap-4 space-y-5 lg:space-y-0 mb-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="text-black mb-1 block">
                First Name *
              </label>
              <LongInputWithPlaceholder
                id="firstName"
                placeholder="First Name *"
                {...register("firstName")}
                className="rounded-[10px]"
                aria-invalid={errors.firstName ? "true" : "false"}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm" role="alert">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label htmlFor="lastName" className="text-black mb-1 block">
                Last Name *
              </label>
              <LongInputWithPlaceholder
                id="lastName"
                placeholder="Last Name *"
                {...register("lastName")}
                className="rounded-[10px]"
                aria-invalid={errors.lastName ? "true" : "false"}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm" role="alert">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="text-black mb-1 block">
              Email *
            </label>
            <LongInputWithPlaceholder
              id="email"
              placeholder="Email *"
              type="email"
              {...register("email")}
              className="rounded-[10px]"
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-red-500 text-sm" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="text-black mb-1 block">
              Phone Number *
            </label>
            <div className="flex gap-2">
              <div className="w-1/3 sm:w-48">
                <Select
                  id="countryCode"
                  options={countryOptions}
                  value={countryOptions.find((option) => option.value === countryCode)}
                  onChange={(selected) => setValue("countryCode", selected.value, { shouldValidate: true })}
                  filterOption={(option, input) =>
                    option.data.searchValue.includes(input.toLowerCase())
                  }
                  styles={customSelectStyles}
                  placeholder="Select country"
                  isSearchable
                  className="text-sm"
                  aria-label="Select country code"
                />
                {errors.countryCode && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.countryCode.message}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <LongInputWithPlaceholder
                  id="phone"
                  placeholder="Phone Number *"
                  {...register("phone")}
                  className="rounded-[10px] h-[44px]"
                  aria-invalid={errors.phone ? "true" : "false"}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1" role="alert">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-black mb-1 block">
              Password *
            </label>
            <LongInputWithPlaceholder
              id="password"
              placeholder="Password *"
              type="password"
              {...register("password")}
              className="rounded-[10px]"
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password && (
              <p className="text-red-500 text-sm" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="flex items-start gap-1 cursor-pointer text-[#7b7777]">
              <input
                type="checkbox"
                {...register("agreeTerms")}
                className="mr-2 mt-1"
                aria-label="Agree to terms"
              />
              <span>
                I agree to the{" "}
                <span className="text-[#9979d1]">
                  General Terms of Use, Merchant Terms of Use & General Privacy Policy
                </span>{" "}
                of Dimpified.
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-red-500 text-sm" role="alert">
                {errors.agreeTerms.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="flex items-center text-[#7b7777]">
              <input
                type="checkbox"
                {...register("receiveMarketing")}
                className="mr-2"
                aria-label="Receive marketing communications"
              />
              I like to receive marketing communication and business tips from Dimpified
            </label>
          </div>

          <ButtonLongPurple
            type="submit"
            width="w-full"
            disabled={isSubmitting || isLoading}
            aria-label="Continue"
          >
            {isSubmitting || isLoading ? (
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
                Loading...
              </div>
            ) : (
              "Continue"
            )}
          </ButtonLongPurple>
        </form>

        <p className="text-center text-primary2 mt-4">
          Have a business account?{" "}
          <Link to="/auth/signin" className="text-primary3">
            Sign in as a professional
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default BasicInfo;