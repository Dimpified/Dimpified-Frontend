import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { LongInputWithPlaceholder } from "../../../component/Inputs";
import { ButtonLongPurple, ButtonSmallWhite } from "../../../component/Buttons";
import { Country } from "country-state-city";
import api from "../../../api/verifyDomain";
import { statesAndLGAs } from "../../../data/StateAndLGA";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newCreatorCreateEcosystem } from "../../../features/NewEcosystem";
import { showToast } from "../../../component/ShowToast";

const BusinessInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken, refreshToken, error, isLoading } = useSelector(
    (state) => state.auth
  );
  const creatorId = useSelector(
    (state) => state.auth.user?.creatorId || "UNKNOWN"
  );

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      businessName: "",
      websiteName: "",
      country: "NG",
      state: "",
      localGovernment: "",
    },
  });

  const [isDomainValid, setIsDomainValid] = useState(false);
  const [domainMessage, setDomainMessage] = useState("");
  const [domainErrorMessage, setDomainErrorMessage] = useState("");
  const [domainSuggestions, setDomainSuggestions] = useState([]);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [lgas, setLgas] = useState([]);
  const [hasUserEditedWebsiteName, setHasUserEditedWebsiteName] =
    useState(false);

  // Initialize countries and states
  useEffect(() => {
    const countriesList = Country.getAllCountries();
    setCountries(countriesList);
    setStates(Object.keys(statesAndLGAs));
  }, []);

  // Watch for businessName changes and sync to websiteName
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "businessName" && !hasUserEditedWebsiteName) {
        const sanitized = value.businessName
          ?.toLowerCase()
          .replace(/[^a-z0-9-]/g, ""); // Remove spaces and special characters except hyphens
        if (sanitized) {
          setValue("websiteName", sanitized, { shouldValidate: true });
          validateDomain(sanitized);
        } else {
          setValue("websiteName", "", { shouldValidate: true });
          setIsDomainValid(false);
          setDomainMessage("");
          setDomainErrorMessage("");
          setDomainSuggestions([]);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, hasUserEditedWebsiteName, setValue]);

  // Update LGAs when state changes
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setValue("state", selectedState);
    setLgas(statesAndLGAs[selectedState] || []);
    setValue("localGovernment", "");
  };

  // Validate domain
  const validateDomain = async (domainName) => {
    if (!domainName || !accessToken || !refreshToken) {
      setDomainErrorMessage(
        "Please enter a domain name and ensure you are logged in."
      );
      setIsDomainValid(false);
      setDomainMessage("");
      setDomainSuggestions([]);
      return;
    }

    try {
      const sanitizedDomain = domainName
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "");
      const response = await api.creatorVerifyDomain({
        domainName: sanitizedDomain,
        accessToken,
        refreshToken,
      });

      if (response) {
        const { available, message, suggestions = [] } = response.data;

        if (message === "Domain name is available") {
          setIsDomainValid(true);
          setDomainMessage(message);
          setDomainErrorMessage("");
          setDomainSuggestions([]);
        } else if (message === "Domain name not available") {
          setIsDomainValid(false);
          setDomainErrorMessage(message);
          setDomainMessage("");
          setDomainSuggestions(suggestions);
        }
      }
    } catch (error) {
      setIsDomainValid(false);
      setDomainErrorMessage(
        error.response?.data?.message || "Error checking domain availability."
      );
      setDomainMessage("");
      setDomainSuggestions([]);
    }
  };

  // Handle website name change
  const handleWebsiteNameChange = (e) => {
    const domainValue = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""); // Sanitize input as user types
    setHasUserEditedWebsiteName(true);
    setValue("websiteName", domainValue, { shouldValidate: true });
    validateDomain(domainValue);
  };

  // Handle domain suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setValue("websiteName", suggestion, { shouldValidate: true });
    setHasUserEditedWebsiteName(true);
    validateDomain(suggestion);
  };

  // Form submission
  const onSubmit = async (data) => {
    if (!isDomainValid) {
      showToast("Please select a valid domain name.", "error");
      return;
    }
    if (!creatorId || !accessToken || !refreshToken) {
      showToast("Authentication details are missing.", "error");
      return;
    }

    try {
      await dispatch(
        newCreatorCreateEcosystem({
          creatorId,
          businessName: data.businessName,
          websiteAddress: data.websiteName,
          country: data.country,
          state: data.state,
          localGovernment: data.localGovernment,
          accessToken,
          refreshToken,
        })
      ).unwrap();
      showToast("Business information submitted successfully!", "success");
      navigate("/auth/select-template");
    } catch (error) {
      showToast(error || "Failed to submit business information.", "error");
    }
  };

  const onBack = async() => {
    navigate("/auth/business-type")
  }

  return (
    <div className="flex flex-col h-full p-4">
      <ButtonSmallWhite
        className="rounded-xl mb-6"
        width="w-[100px]"
        padding="2"
        height="10"
        onClick={onBack}
      >
        Back
      </ButtonSmallWhite>
      <h2 className="text-2xl font-bold text-[#2d1c4d] mb-4">
        Enter Your Business and Website Details
      </h2>
      <p className="text-gray-500 mb-4">
        Provide your business information to set up your account and manage
        appointments.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        {/* Business Name */}
        <div className="mb-4">
          <label
            htmlFor="businessName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Business Name*
          </label>
          <LongInputWithPlaceholder
            id="businessName"
            placeholder="Enter your business name"
            {...register("businessName", {
              required: "Business Name is required",
            })}
            className="rounded-[10px]"
            aria-invalid={errors.businessName ? "true" : "false"}
          />
          {errors.businessName && (
            <span className="text-red-500 text-sm" role="alert">
              {errors.businessName.message}
            </span>
          )}
        </div>

        {/* Website Address */}
        <div className="mb-4">
          <label
            htmlFor="websiteName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Preferred Website Address*
          </label>
          <div className="flex items-center w-full">
            <LongInputWithPlaceholder
              id="websiteName"
              placeholder="Enter website address"
              {...register("websiteName", {
                required: "Website Address is required",
                pattern: {
                  value: /^[a-z0-9-]+$/,
                  message:
                    "Website address can only contain lowercase letters, numbers, and hyphens.",
                },
              })}
              onChange={handleWebsiteNameChange}
              className="flex-1 rounded-[10px]"
              aria-invalid={errors.websiteName ? "true" : "false"}
            />
            <span className="ml-2">.dimpified.com</span>
          </div>
          {errors.websiteName && (
            <span className="text-red-500 text-sm" role="alert">
              {errors.websiteName.message}
            </span>
          )}
          {domainErrorMessage && (
            <div
              className="mt-2 p-4 bg-red-600 text-white rounded-md shadow-md"
              role="alert"
            >
              {domainErrorMessage}
            </div>
          )}
          {domainMessage && (
            <div
              className="mt-2 p-4 bg-green-600 text-white rounded-md shadow-md"
              role="alert"
            >
              {domainMessage}
            </div>
          )}
          {domainSuggestions.length > 0 && (
            <ul
              className="mt-2 p-2 border rounded-md"
              aria-label="Domain suggestions"
            >
              {domainSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="py-1 px-2 text-blue-600 hover:bg-blue-100 cursor-pointer"
                  onClick={() => handleSuggestionClick(suggestion)}
                  tabIndex={0}
                  role="option"
                  aria-selected={getValues("websiteName") === suggestion}
                >
                  {suggestion}.dimpified.com
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Country and State */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label
              htmlFor="country"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Country*
            </label>
            <select
              id="country"
              {...register("country", { required: "Country is required" })}
              className="w-full rounded-[10px] p-2 border-[#E5E7EB] placeholder-gray-500 outline-none focus:border-[#2d1c4d]"
              aria-invalid={errors.country ? "true" : "false"}
            >
              <option value="" disabled>
                Select your country
              </option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
            {errors.country && (
              <span className="text-red-500 text-sm" role="alert">
                {errors.country.message}
              </span>
            )}
          </div>
          <div className="flex-1">
            <label
              htmlFor="state"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              State or Residence*
            </label>
            <select
              id="state"
              {...register("state", { required: "State is required" })}
              className="w-full rounded-[10px] p-2 border-[#E5E7EB] placeholder-gray-500 outline-none focus:border-[#2d1c4d]"
              onChange={handleStateChange}
              aria-invalid={errors.state ? "true" : "false"}
            >
              <option value="" disabled>
                Select your state
              </option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            {errors.state && (
              <span className="text-red-500 text-sm" role="alert">
                {errors.state.message}
              </span>
            )}
          </div>
        </div>

        {/* Local Government */}
        <div className="mb-4">
          <label
            htmlFor="localGovernment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Local Government Area*
          </label>
          <select
            id="localGovernment"
            {...register("localGovernment", {
              required: "Local Government is required",
            })}
            className="w-full rounded-[10px] p-2 border-[#E5E7EB] placeholder-gray-500 outline-none focus:border-[#2d1c4d]"
            aria-invalid={errors.localGovernment ? "true" : "false"}
          >
            <option value="" disabled>
              Select your LGA
            </option>
            {lgas.map((lga) => (
              <option key={lga} value={lga}>
                {lga}
              </option>
            ))}
          </select>
          {errors.localGovernment && (
            <span className="text-red-500 text-sm" role="alert">
              {errors.localGovernment.message}
            </span>
          )}
        </div>

        {/* Error from Redux */}
        {error && (
          <div
            className="mb-4 p-4 bg-red-600 text-white rounded-md shadow-md"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="flex w-full gap-4 mt-6">
          <ButtonLongPurple
            type="submit"
            className="w-full"
            disabled={
              isLoading || !isDomainValid || Object.keys(errors).length > 0
            }
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
                </svg>{" "}
                Submitting...
              </div>
            ) : (
              "Continue"
            )}
          </ButtonLongPurple>
        </div>
      </form>
    </div>
  );
};

export default BusinessInfo;
