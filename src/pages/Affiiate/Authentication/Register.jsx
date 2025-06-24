import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { showToast } from "../../../component/ShowToast";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LabelImportant } from "../../../component/Label";
import { ButtonLongPurple } from "../../../component/Buttons";
import { LoadingSmall } from "../../../component/LoadingSpinner";
import api from "../../../api/Afiliate";
import { Heading, Text } from "../../../component/Text";
import { LongInputWithPlaceholder } from "../../../component/Inputs";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate(); // To navigate to the success page

  // Use the useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.affiliateRegister({
        userName: data.username,
        password: data.password,
        email: data.email,
        phoneNumber: data.phoneNumber,
      });

      if (response.status === 201) {
        showToast(response.data.message);
        navigate("/registration-success", { state: { email: data.email } });
      }
    } catch (error) {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-4 p-4 bg-white shadow-md rounded">
      <Heading
        level="2"
        className="text-2xl font-semibold mb-4 font-body"
        size=""
        color="black"
        weight="font-medium"
        font="font-body"
        lineHeight="leading-1"
        htmlFor="bankSelect"
      >
        Create an Account
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <LabelImportant htmlFor="username">Username</LabelImportant>
          <LongInputWithPlaceholder
            type="text"
            {...register("username", { required: "Username is required" })}
            placeholder="Enter your username"
            className={`w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-500 ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.username && (
            <Text className="text-red-500 text-sm">
              {errors.username.message}
            </Text>
          )}
        </div>
        <div className="mb-4">
          <LabelImportant htmlFor="phoneNumber">Phone Number</LabelImportant>
          <LongInputWithPlaceholder
            type="number"
            {...register("phoneNumber", {
              required: "Phone Number is required",
            })}
            placeholder="Enter your phoneNumber"
            className={`w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-500 ${
              errors.phoneNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.phoneNumber && (
            <Text className="text-red-500 text-sm">
              {errors.phoneNumber.message}
            </Text>
          )}
        </div>

        <div className="mb-4">
          <LabelImportant htmlFor="email">Email</LabelImportant>
          <LongInputWithPlaceholder
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Enter your email"
            className={`w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-500 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm">{errors.email.message}</Text>
          )}
        </div>

        <div className="mb-4">
          <LabelImportant htmlFor="password">Password</LabelImportant>
          <div className="relative">
            <LongInputWithPlaceholder
              type={showNewPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className={`w-full border rounded p-2 focus:outline-none focus:ring focus:ring-blue-500 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <span
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <ButtonLongPurple
          type="submit"
          className="w-full bg-primary3 text-white py-2 rounded hover:bg-primary4 transition duration-300"
        >
          {loading ? (
            <Text className="flex ml-2 items-center justify-center">
              {" "}
              <LoadingSmall /> Registering...
            </Text>
          ) : (
            "Register"
          )}
        </ButtonLongPurple>
      </form>
    </div>
  );
};

export default Register;
