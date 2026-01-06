import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { affiliateLogin } from "../../../features/authentication";
import { showToast } from "../../../component/ShowToast";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../src/assets/DIMP logo colored.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { LabelImportant } from "../../../component/Label";
import { ButtonForTabs, ButtonSmallPurple } from "../../../component/Buttons";
import { LoadingSmall } from "../../../component/LoadingSpinner";
import { Heading, Text } from "../../../component/Text";
import { LongInputWithPlaceholder } from "../../../component/Inputs";

const SignIn = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  // const { user } = useSelector((state) => state.authentication);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
  };

  const handleBackToSignInClick = () => {
    setIsForgotPassword(false);
  };

  const onSignInSubmit = async (data) => {
    setLoading(true);
    try {
      const resultAction = await dispatch(
        affiliateLogin({
          email: data.email,
          password: data.password,
        })
      );

      if (affiliateLogin.rejected.match(resultAction)) {
        const errorPayload = resultAction.payload;
        showToast(errorPayload);
      } else if (affiliateLogin.fulfilled.match(resultAction)) {
        showToast(resultAction.payload.message);
        navigate("/affiliate/dashboard/overview");
      }
    } catch (error) {
      showToast("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const onForgotPasswordSubmit = async (data) => {
    console.log("Forgot Password:", data);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/affiliate/forgot-password`,
        data
      );
      if (response.status === 200) {
        showToast(response.data.message);
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("Error during password reset:", error.response);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showToast(error.response.data.message);
      } else {
        showToast(
          error.message || "An unexpected error occurred. Please try again."
        );
      }
    }
  };

  return (
    <div className="p-4 shadow-md rounded">
      {!isForgotPassword ? (
        <form onSubmit={handleSubmit(onSignInSubmit)} className="mt-4">
          <Heading
            level="3"
            className="text-2xl font-semibold font-body"
            size=""
            color="black"
            weight="font-medium"
            font="font-body"
            lineHeight="leading-1"
            htmlFor="bankSelect"
          >
            Sign in to your Partner account
          </Heading>

          <div className="mb-4 mt-3">
            <LabelImportant htmlFor="forEmail">Email</LabelImportant>
            <LongInputWithPlaceholder
              type="email"
              id="formEmail"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <Text className="text-red-500">{errors.email.message}</Text>
            )}
          </div>

          <div className="mb-4">
            <LabelImportant htmlFor="formPassword">Password</LabelImportant>
            <div className="flex items-center">
              <LongInputWithPlaceholder
                type={showNewPassword ? "text" : "password"}
                id="formPassword"
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
                className="w-full p-2 border rounded"
              />
              <span
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="cursor-pointer ml-2"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            {errors.password && (
              <Text className="text-red-500">{errors.password.message}</Text>
            )}
          </div>

          <ButtonSmallPurple
            type="submit"
            className={`bg-primary3 text-white font-semibold py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-primary4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            width="20px"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center">
                <LoadingSmall className="me-2" />
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </ButtonSmallPurple>

          <p className="mt-3">
            <ButtonForTabs
              type="button"
              className="text-primary3 hover:underline"
              onClick={handleForgotPasswordClick}
              label="Forgot Password"
            />
          </p>
        </form>
      ) : (
        <form onSubmit={handleSubmit(onForgotPasswordSubmit)} className="mt-4">
          <Heading
            level="2"
            className="text-xl font-semibold mb-2"
            size=""
            color="black"
            weight="font-medium"
            font="font-body"
            lineHeight="leading-1"
            htmlFor="bankSelect"
          >
            Reset Password
          </Heading>
          <div className="mb-4">
            <LabelImportant htmlFor="formResetEmail" className="block mb-1">
              Email Address
            </LabelImportant>
            <LongInputWithPlaceholder
              type="email"
              id="formResetEmail"
              {...register("email", { required: "Email is required" })}
              placeholder="Enter your email"
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <Text className="text-red-500">{errors.email.message}</Text>
            )}
          </div>

          <ButtonSmallPurple
            type="submit"
            className=" text-white font-semibold py-2 px-4 rounded mr-3"
            width=""
          >
            Send Reset Link
          </ButtonSmallPurple>

          <ButtonForTabs
            type="button"
            className="text-primary3 hover:underline"
            onClick={handleBackToSignInClick}
            label="Back to Sign In"
          />
        </form>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 flex bg-black bg-opacity-60 items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg w-80">
            <div className="flex justify-between items-center mb-4">
              <Text className="text-lg font-semibold">Reset link Sent</Text>
              <ButtonForTabs
                className="text-gray-500"
                onClick={() => setShowSuccessModal(false)}
                label={<>&times;</>}
              />
            </div>
            <div className="flex justify-center mb-3">
              <img src={Logo} alt="Logo" className="w-20 mb-2" />
            </div>
            <Text className="text-center">
              Check your email to access your Reset link.
            </Text>
            <div className="flex justify-center mt-4">
              <ButtonSmallPurple
                className=" text-white font-semibold py-2 px-4 rounded"
                onClick={() => setShowSuccessModal(false)}
                width=""
              >
                Close
              </ButtonSmallPurple>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
