import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useGoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  creatorLogin,
  creatorLoginWithGoogle,
} from "../../../features/authentication";
import { showToast } from "../../../component/ShowToast";
import { setEcosystemDomain } from "../../../features/ecosystemDomain";
import { setEcosystemPlan } from "../../../features/ecosystemPlan";
import { setEcosystemStatus } from "../../../features/ecosystemStatus";
import { LongInputWithPlaceholder } from "../../../component/Inputs";
import { ButtonLongPurple } from "../../../component/Buttons";
import LoginImage from "../../../assets/NewAuthImage/Step134.png";
import Logo from "../../../assets/NewAuthImage/NewLogo.png";

// Google SVG logo
const GoogleLogo = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="mr-2"
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

// Define the Yup validation schema
const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const UserLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, error, user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(
        creatorLogin({
          email: data.email,
          password: data.password,
        })
      );

      if (creatorLogin.rejected.match(resultAction)) {
        const errorPayload = resultAction.payload;
        showToast(errorPayload);
      } else if (creatorLogin.fulfilled.match(resultAction)) {
        showToast(resultAction.payload.message);

        if (resultAction.payload.user.ecosystemDomain) {
          dispatch(setEcosystemDomain(resultAction.payload.user.ecosystemDomain));
        }
        if (resultAction.payload.user.plan) {
          dispatch(setEcosystemPlan(resultAction.payload.user.plan));
        }
        if (resultAction.payload.user.status) {
          dispatch(setEcosystemStatus(resultAction.payload.user.status));
        }
        if (resultAction.payload.user.step === 3) {
          navigate("/new/auth/select-preview-payment");
        } else if (resultAction.payload.user.step === 4) {
          navigate("/new/auth/select-preview-payment");
        } else if (resultAction.payload.user.step === 5) {
          navigate("/creator/dashboard/overview");
        } else {
          navigate("/auth/personal-Information");
        }
      }
    } catch (error) {
      showToast("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      const resultAction = await dispatch(
        creatorLoginWithGoogle({ token: tokenResponse.access_token })
      );

      if (creatorLoginWithGoogle.rejected.match(resultAction)) {
        const errorPayload = resultAction.payload;
        showToast(errorPayload || "Google login failed", "error");
      } else if (creatorLoginWithGoogle.fulfilled.match(resultAction)) {
        showToast(resultAction.payload.message);

        if (resultAction.payload.user.ecosystemDomain) {
          dispatch(setEcosystemDomain(resultAction.payload.user.ecosystemDomain));
        }
        if (resultAction.payload.user.plan) {
          dispatch(setEcosystemPlan(resultAction.payload.user.plan));
        }
        if (resultAction.payload.user.status) {
          dispatch(setEcosystemStatus(resultAction.payload.user.status));
        }
        if (resultAction.payload.user.step === 3) {
          navigate("/new/auth/select-preview-payment");
        } else if (resultAction.payload.user.step === 4) {
          navigate("/new/auth/select-preview-payment");
        } else if (resultAction.payload.user.step === 5) {
          navigate("/creator/dashboard/overview");
        } else {
          navigate("/auth/personal-Information");
        }
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

  return (
    <div className="flex items-center justify-center font-body">
      <div className="w-full mx-4">
        <div className="flex flex-col lg:flex-row justify-center items-center mx-auto overflow-hidden my-20">
          <div className="lg:w-1/2 bg-cover bg-center space-y-3">
            <div className="lg:mx-20 mx-4">
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
                  Welcome Back on Dimpified Business. Log in to get started now
                </p>
              </div>

              <button
                type="button"
                onClick={loginWithGoogle}
                className="w-full h-12 font-bold font-body rounded border border-gray-300 p-2 flex items-center justify-center mb-4 hover:bg-gray-100 transition duration-200"
              >
                <GoogleLogo />
                Continue with Google
              </button>

              <div className="flex gap-3 w-full items-center my-4">
                <hr className="flex-1 bg-[#E5E5E5]" />
                <p className="text-center text-gray-500">Or</p>
                <hr className="flex-1 bg-[#E5E5E5]" />
              </div>

              <p className="text-gray-500 mb-2">Please enter your details</p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <label htmlFor="email" className="text-black mb-1 block">
                    Email *
                  </label>
                  <LongInputWithPlaceholder
                    id="email"
                    placeholder="johndoe@mail.com"
                    {...register("email")}
                    className="rounded-[10px] w-full"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="text-black mb-1 block">
                    Password *
                  </label>
                  <LongInputWithPlaceholder
                    id="password"
                    placeholder="••••••••"
                    type="password"
                    {...register("password")}
                    className="rounded-[10px] w-full"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end items-center mb-6">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <ButtonLongPurple
                  type="submit"
                  width="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
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
                      Logging In...
                    </div>
                  ) : (
                    "Continue"
                  )}
                </ButtonLongPurple>
              </form>

              <p className="text-center text-primary2 mt-4">
                Don't have an account?{" "}
                <Link to="/auth/personal-Information" className="text-primary3">
                  Sign Up here
                </Link>
              </p>
            </div>
          </div>

          <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
            <img
              src={LoginImage}
              alt="login illustration"
              className="w-full max-w-md sm:max-w-lg lg:max-w-xl h-auto object-contain rounded-[20px] sm:rounded-[30px] lg:rounded-[50px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;