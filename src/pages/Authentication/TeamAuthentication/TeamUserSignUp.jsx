import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ButtonLongPurple } from "../../../component/Buttons";
import { LongInputWithPlaceholder } from "../../../component/Inputs";
import { Heading, Text } from "../../../component/Text";
import { statesAndLGAs } from "../../../data/StateAndLGA";
import SignUpImage from "../../../assets/login-image.png";
import Logo from "../../../assets/DIMP logo colored.png";
import { Country } from "country-state-city";
import api from "../../../api/authApis";
import { showToast } from "../../../component/ShowToast";

// Validation schema
const schema = yup.object().shape({
  dateOfBirth: yup.string().required("Date of Birth is required"),
  state: yup.string().required("State is required"),
  localGovernment: yup.string().required("Local Government is required"),
  address: yup.string().required("Address is required"),
  country: yup.string().required("Country is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const TeamSignUp = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [states] = useState(Object.keys(statesAndLGAs));
  const [lgas, setLgas] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (!email) {
      showToast("Email not found in URL", "error");
      navigate("/");
    }

    const countriesList = Country.getAllCountries();
    setCountries(countriesList);

    setValue("country", "NG"); // default to Nigeria
  }, [email, navigate, setValue]);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setLgas(statesAndLGAs[selectedState] || []);
    setValue("localGovernment", "");
  };

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await api.teamMemberOnboarding({
        email,
        fullName: data.fullName,
        dateOfBirth: data.dateOfBirth,
        state: data.state,
        localGovernment: data.localGovernment,
        address: data.address,
        password: data.password,
        country: data.country,
      });

      if (response) {
        showToast("Staff onboarding submitted successfully", "success");
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to onboard team member:", error);
      showToast("Error submitting form", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-body">
      <div className="w-full max-w-6xl mx-4">
        <div className="flex flex-col lg:flex-row bg-white rounded-2xl shadow-lg overflow-hidden my-20">
          {/* LEFT DIV (Image) */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-50 px-10 py-20">
            <img src={SignUpImage} alt="Signup Illustration" className="max-w-full h-auto" />
          </div>

          {/* RIGHT DIV (Sign Up Form) */}
          <div className="w-full lg:w-1/2 p-8">
            <Link to="/">
              <img src={Logo} alt="Logo" className="w-[73px] lg:w-[73px]" />
            </Link>

            <Heading level={3} className="mb-4 mt-7 font-semibold text-primary4" size="3xl">
              Sign Up to Staff Dashboard
            </Heading>
            <Text className="mb-6" color="sec6">
              Fill in your personal information
            </Text>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Date of Birth */}
              <div className="mb-4">
                <label className="block text-gray-700">Date of Birth</label>
                <LongInputWithPlaceholder type="date" {...register("dateOfBirth")} />
                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
              </div>

              {/* Country */}
              <div className="mb-4">
                <label className="block text-gray-700">Country</label>
                <select
                  {...register("country")}
                  onChange={(e) => setValue("country", e.target.value)}
                  className="w-full border rounded p-3"
                >
                  <option value="">--Select--</option>
                  {countries.map((c) => (
                    <option key={c.isoCode} value={c.isoCode}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.country && <p className="text-red-500 text-sm">{errors.country.message}</p>}
              </div>

              {/* State */}
              <div className="mb-4">
                <label className="block text-gray-700">State</label>
                <select {...register("state")} onChange={handleStateChange} className="w-full border rounded p-3">
                  <option value="">--Select--</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
              </div>

              {/* Local Government */}
              <div className="mb-4">
                <label className="block text-gray-700">Local Government</label>
                <select {...register("localGovernment")} className="w-full border rounded p-3">
                  <option value="">--Select--</option>
                  {lgas.map((lga) => (
                    <option key={lga} value={lga}>
                      {lga}
                    </option>
                  ))}
                </select>
                {errors.localGovernment && <p className="text-red-500 text-sm">{errors.localGovernment.message}</p>}
              </div>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <LongInputWithPlaceholder
                  type="text"
                  placeholder="Enter your address"
                  {...register("address")}
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <LongInputWithPlaceholder
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label className="block text-gray-700">Confirm Password</label>
                <LongInputWithPlaceholder
                  type="password"
                  placeholder="••••••••"
                  {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit */}
              <ButtonLongPurple className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Sign Up"}
              </ButtonLongPurple>
            </form>

            <Text className="mt-6 text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/" className="text-purple-600 hover:underline">
                Login
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamSignUp;
