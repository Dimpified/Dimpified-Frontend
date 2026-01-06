// pages/auth/FreeOnboardingSetupThree.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckCircle2, Loader2, Plus, Trash2 } from "lucide-react";

import FreeOnboardingLayout from "../FreeOnboardingLayout";
import SubStepWrapper from "./SubStepWrapper";
import { ButtonLongPurple } from "../../../../../component/Buttons";
import dashboardApi from "../../../../../api/DashboardApi";
import { showToast } from "../../../../../component/ShowToast";

const durationOptions = [
  { value: 30, label: "30 Min" },
  { value: 60, label: "60 Min" },
  { value: 90, label: "90 Min" },
  { value: 120, label: "120 Min" },
  { value: 150, label: "150 Min" },
  { value: 180, label: "180 Min" },
];

const FreeOnboardingSetupThree = () => {
  const navigate = useNavigate();


  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  const [services, setServices] = useState([
    { id: 1, name: "", amount: "", duration: 30 },
  ]);

  const [bankDetails, setBankDetails] = useState({
    bankName: "",
    bankCode: "",
    accountNumber: "",
    accountName: "",
    verified: false,
  });

  const [allBanks, setAllBanks] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);

  // Load from sessionStorage on mount
  useEffect(() => {
    const savedServices = sessionStorage.getItem("services");
    const savedBankDetails = sessionStorage.getItem("bankDetails");

    if (savedServices) {
      setServices(JSON.parse(savedServices).services);
    }
    if (savedBankDetails) {
      setBankDetails(JSON.parse(savedBankDetails));
    }
  }, []);

  // Auto-save to sessionStorage on change
  useEffect(() => {
    if (services.some((s) => s.name.trim() || s.amount)) {
      sessionStorage.setItem("services", JSON.stringify({ services }));
    }
  }, [services]);

  useEffect(() => {
    if (bankDetails.accountNumber || bankDetails.bankName) {
      sessionStorage.setItem("bankDetails", JSON.stringify(bankDetails));
    }
  }, [bankDetails]);

  // Fetch all Nigerian banks on mount
  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await dashboardApi.creatorAllBanks({
          accessToken,
          refreshToken,
        });
        setAllBanks(res.data.allBanks.data);
      } catch (err) {
        console.error("Failed to load banks");
      }
    };
    if (accessToken) fetchBanks();
  }, [accessToken, refreshToken]);

  // Auto-verify when 10-digit account number is entered
  useEffect(() => {
    if (bankDetails.accountNumber.length === 10 && bankDetails.bankCode) {
      verifyAccount();
    }
  }, [bankDetails.accountNumber, bankDetails.bankCode]);

  const verifyAccount = async () => {
    if (!bankDetails.bankCode || !bankDetails.accountNumber) return;

    setIsVerifying(true);
    try {
      const res = await dashboardApi.creatorVerifyAccount({
        accessToken,
        refreshToken,
        account: bankDetails.accountNumber,
        bankCode: bankDetails.bankCode,
      });
      const updatedBankDetails = {
        ...bankDetails,
        accountName: res.data.verifyDetails.data.account_name,
        verified: true,
      };
      setBankDetails(updatedBankDetails);
      sessionStorage.setItem("bankDetails", JSON.stringify(updatedBankDetails));
      showToast("Account verified successfully!", "success");
    } catch (err) {
      setBankDetails((prev) => ({ ...prev, accountName: "", verified: false }));
      showToast("Invalid account number or bank", "error");
    } finally {
      setIsVerifying(false);
    }
  };

  const addService = () => {
    if (services.length >= 10) {
      showToast("Maximum 10 services allowed", "error");
      return;
    }
    setServices([
      ...services,
      { id: Date.now(), name: "", amount: "", duration: 30 },
    ]);
  };

  const updateService = (id, field, value) => {
    setServices(
      services.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  const removeService = (id) => {
    if (services.length <= 1) return;
    setServices(services.filter((s) => s.id !== id));
  };

  const isFormValid = () => {
    const hasValidServices =
      services.length >= 1 &&
      services.every((s) => s.name.trim() && s.amount > 0);
    return hasValidServices && bankDetails.verified;
  };

  const handleNext = () => {
    if (!isFormValid()) {
      showToast(
        "Please complete all services and verify your bank account",
        "error"
      );
      return;
    }

    // Verify all previous steps are complete
    const savedBusiness = sessionStorage.getItem("businessIdentity");
    const savedAvailability = sessionStorage.getItem("availability");

    if (!savedBusiness) {
      showToast("Business info missing. Please complete Step 1.", "error");
      navigate("/free/auth/business-identity");
      return;
    }

    if (!savedAvailability) {
      showToast("Availability info missing. Please complete Step 2.", "error");
      navigate("/free/auth/availability");
      return;
    }

    // Save final data to sessionStorage
    sessionStorage.setItem("services", JSON.stringify({ services }));
    sessionStorage.setItem("bankDetails", JSON.stringify(bankDetails));

    showToast("All information saved! Review your details", "success");
    navigate("/free/auth/review");
  };

  return (
    <FreeOnboardingLayout currentStep={3}>
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <SubStepWrapper currentSubStep={3} />

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center sm:text-left">
          Services & Payment
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-10 text-center sm:text-left">
          Add your services and set up payouts
        </p>

        {/* Services */}
        <div className="mb-12">
          <label className="block text-lg font-semibold text-gray-800 mb-5">
            Your Services <span className="text-red-500">*</span>
          </label>

          <div className="space-y-5">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-gray-50 p-5 rounded-2xl"
              >
                <input
                  type="text"
                  placeholder="Service name e.g Hair Cut"
                  value={service.name}
                  onChange={(e) =>
                    updateService(service.id, "name", e.target.value)
                  }
                  className="col-span-1 sm:col-span-5 h-14 px-5 rounded-xl border border-gray-300 focus:border-purple-500 outline-none"
                />

                <div className="relative sm:col-span-3">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-medium">
                    ₦
                  </span>
                  <input
                    type="text"
                    placeholder="5000"
                    value={service.amount}
                    onChange={(e) =>
                      updateService(
                        service.id,
                        "amount",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    className="w-full h-14 pl-12 pr-5 rounded-xl border border-gray-300 focus:border-purple-500 outline-none text-right font-medium"
                  />
                </div>

                <select
                  value={service.duration}
                  onChange={(e) =>
                    updateService(
                      service.id,
                      "duration",
                      Number(e.target.value)
                    )
                  }
                  className="sm:col-span-3 h-14 px-5 rounded-xl border border-gray-300 focus:border-purple-500 outline-none"
                >
                  {durationOptions.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>

                {services.length > 1 && (
                  <button
                    onClick={() => removeService(service.id)}
                    className="sm:col-span-1 p-3 text-red-500 hover:bg-red-50 rounded-xl transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {services.length < 10 && (
            <button
              onClick={addService}
              className="mt-4 text-purple-600 font-medium flex items-center gap-2 hover:underline"
            >
              <Plus className="w-5 h-5" /> Add Another Service
            </button>
          )}
        </div>

        {/* Bank Details */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Payout Account
          </h3>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Bank <span className="text-red-500">*</span>
              </label>
              <select
                value={bankDetails.bankName}
                onChange={(e) => {
                  const bank = allBanks.find((b) => b.name === e.target.value);
                  setBankDetails((prev) => ({
                    ...prev,
                    bankName: e.target.value,
                    bankCode: bank?.code || "",
                    accountName: "",
                    verified: false,
                  }));
                }}
                className="w-full h-14 px-5 rounded-2xl bg-gray-50 border border-gray-300 focus:border-purple-500 outline-none"
              >
                <option value="">Select Bank</option>
                {allBanks.map((bank) => (
                  <option key={bank.code} value={bank.name}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-800 mb-2">
                Account Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                maxLength={10}
                value={bankDetails.accountNumber}
                onChange={(e) =>
                  setBankDetails((prev) => ({
                    ...prev,
                    accountNumber: e.target.value.replace(/\D/g, ""),
                    verified: false,
                    accountName: "",
                  }))
                }
                className="w-full h-14 px-5 rounded-2xl bg-gray-50 border border-gray-300 focus:border-purple-500 outline-none font-mono text-lg"
                placeholder="0123456789"
              />
            </div>

            {bankDetails.verified && (
              <div className="bg-green-50 border border-green-300 rounded-2xl p-5 flex items-center gap-4">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Verified</p>
                  <p className="text-lg font-bold text-green-900">
                    {bankDetails.accountName}
                  </p>
                </div>
              </div>
            )}

            {isVerifying && (
              <p className="text-purple-600 flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" /> Verifying
                account...
              </p>
            )}
          </div>
        </div>

        <ButtonLongPurple
          width="w-full"
          onClick={handleNext}
          disabled={!isFormValid()}
          className="bg-purple-600 h-14 text-lg font-semibold mt-8"
        >
          Next: Review Details
        </ButtonLongPurple>
      </div>
    </FreeOnboardingLayout>
  );
};

export default FreeOnboardingSetupThree;
