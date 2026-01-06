import React, { useState, useEffect, useCallback } from "react";
import Calendar from "react-calendar";
import { Link } from "react-router-dom";
import "react-calendar/dist/Calendar.css";
import {
  FaCheckCircle,
  FaClock,
  FaUser,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaChevronRight,
  FaCreditCard,
  FaUniversity,
} from "react-icons/fa";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { showToast } from "../../component/ShowToast";
import DimpifiedLogo from "../../pages/LandingPages/images/dimp-blue.png";

const BookingModal = ({
  isOpen,
  handleClose,
  information,
  subdomain,
  serviceCurrency,
  userDetails,
}) => {
  // Dummy business information
  const businessInfo = {
    name: "Elite Beauty Studio",
    description:
      "Professional beauty and wellness services delivered by certified experts. We're committed to making you look and feel your absolute best.",
    contact: {
      phone: "+1 (555) 123-4567",
      email: "hello@elitebeauty.com",
      address: "123 Beauty Street, New York, NY 10001",
    },
  };

  // Dummy services data with prices
  const dummyServices = [
    {
      _id: "1",
      name: "Haircut & Styling",
      shortDescription: "Professional haircut with blow dry and styling",
      category: "Hair",
      price: 65,
      duration: "1 hour",
    },
    {
      _id: "2",
      name: "Hair Coloring",
      shortDescription: "Full hair color with conditioning treatment",
      category: "Hair",
      price: 120,
      duration: "2 hours",
    },
    {
      _id: "3",
      name: "Spa Facial",
      shortDescription: "Relaxing facial with massage and mask",
      category: "Skincare",
      price: 85,
      duration: "1.5 hours",
    },
    {
      _id: "4",
      name: "Manicure & Pedicure",
      shortDescription: "Full hand and foot care with polish",
      category: "Nails",
      price: 55,
      duration: "1 hour",
    },
    {
      _id: "5",
      name: "Makeup Application",
      shortDescription: "Professional makeup for special occasions",
      category: "Makeup",
      price: 75,
      duration: "1 hour",
    },
    {
      _id: "6",
      name: "Massage Therapy",
      shortDescription: "60-minute full body relaxation massage",
      category: "Wellness",
      price: 95,
      duration: "1 hour",
    },
  ];

  // Bank account details
  const bankDetails = {
    accountName: "Elite Beauty Studio LLC",
    bankName: "Chase Bank",
    accountNumber: "**** 4567",
  };

  // Normalize date to ensure consistency
  const normalizeDate = useCallback((date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  }, []);

  const [step, setStep] = useState(1);
  const [eServices, setEServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(normalizeDate(new Date()));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    details: "",
  });

  // Available time slots
  const timeSlots = [
    { time: "08:00 AM", booked: false },
    { time: "09:00 AM", booked: false },
    { time: "10:00 AM", booked: false },
    { time: "11:00 AM", booked: false },
    { time: "12:00 PM", booked: false },
    { time: "01:00 PM", booked: false },
    { time: "02:00 PM", booked: false },
    { time: "03:00 PM", booked: false },
    { time: "04:00 PM", booked: false },
    { time: "05:00 PM", booked: false },
  ];

  const onCloseModal = useCallback(async () => {
    setStep(1);
    setSelectedService(null);
    setSelectedTimeSlot(null);
    setSelectedDate(normalizeDate(new Date()));
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      details: "",
    });
    handleClose();
  }, [handleClose, normalizeDate]);

  // Load dummy services on mount
  useEffect(() => {
    const loadServices = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setEServices(dummyServices);
      setLoading(false);
    };

    if (isOpen) {
      loadServices();
    }
  }, [isOpen]);

  const handleServiceChange = (service) => {
    setSelectedService(service);
  };

  const handleDateChange = useCallback(
    (date) => {
      const normalizedDate = normalizeDate(date);
      setSelectedDate(normalizedDate);
    },
    [normalizeDate]
  );

  const disablePastDates = ({ date, view }) => {
    return view === "month" && date < new Date().setHours(0, 0, 0, 0);
  };

  const handleTimeSlotSelect = (slot) => {
    if (!slot.booked) setSelectedTimeSlot(slot.time);
  };

  const handleNextStep = (nextStep) => {
    if (nextStep <= 5) setStep(nextStep);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      showToast("Booking submitted successfully!", "success");
      handleNextStep(5);
    } catch (error) {
      showToast("Failed to submit booking. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Generate available time slots based on selected date
  useEffect(() => {
    if (step === 2 && selectedDate) {
      setLoading(true);
      const timer = setTimeout(() => {
        const updatedSlots = timeSlots.map((slot) => ({
          ...slot,
          booked: Math.random() < 0.3,
        }));
        setAvailableTimeSlots(updatedSlots);
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [step, selectedDate]);

  // Progress steps configuration
  const progressSteps = [
    { number: 1, label: "Service", icon: FaUser },
    { number: 2, label: "Time", icon: FaClock },
    { number: 3, label: "Details", icon: FaUser },
    { number: 4, label: "Confirm", icon: FaCheckCircle },
    { number: 5, label: "Success", icon: FaCheckCircle },
  ];

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: serviceCurrency || "USD",
    }).format(amount);
  };

  // Powered by logo component
  const PoweredByLogo = () => (
    <div className="flex items-center justify-center space-x-2 text-gray-400 mt-8 pt-6 border-t border-gray-200">
      <span className="text-xs">Powered by</span>
      <div className="flex items-center space-x-3">
        <Link to="/">
          <img src={DimpifiedLogo} alt="Dimpified" className="h-5 w-auto" />
        </Link>
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />
      <div className="fixed inset-0">
        <DialogPanel className="h-full w-full bg-white overflow-hidden">
          {/* Mobile Header */}
          <div className="lg:hidden border-b border-gray-200 bg-white">
            <div className="flex justify-between items-center px-4 py-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">E</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    {businessInfo.name}
                  </h1>
                </div>
              </div>
              <button
                onClick={onCloseModal}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              >
                ×
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row h-full lg:h-[calc(100vh-80px)]">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
                {/* Progressive Line Bar Stepper - Mobile */}
                <div className="lg:hidden mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Step {step} of {progressSteps.length - 0}
                    </span>
                    <span className="text-sm text-gray-500">
                      {step}/{progressSteps.length - 0}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${
                          ((step - 1) / (progressSteps.length - 2)) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Enhanced Progress Bar - Desktop with Connected Lines */}
                <div className="hidden lg:block mb-8">
                  <div className="flex items-center justify-between relative max-w-2xl mx-auto">
                    {progressSteps.slice(0, -1).map((stepItem, index) => {
                      const Icon = stepItem.icon;
                      const isLast = index === progressSteps.length - 2;
                      const isActive = step >= stepItem.number;
                      const isCurrentStep = step === stepItem.number;

                      return (
                        <React.Fragment key={stepItem.number}>
                          <div className="flex flex-col items-center relative z-10">
                            <div
                              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                isCurrentStep
                                  ? "bg-purple-600 border-purple-600 text-white shadow-lg scale-110"
                                  : isActive
                                  ? "bg-purple-100 border-purple-600 text-purple-600"
                                  : "bg-white border-gray-300 text-gray-400"
                              }`}
                            >
                              <Icon
                                className={`${
                                  isCurrentStep ? "text-lg" : "text-base"
                                }`}
                              />
                            </div>
                            <span
                              className={`text-sm mt-2 font-medium transition-all duration-300 ${
                                isCurrentStep
                                  ? "text-purple-600 font-bold"
                                  : isActive
                                  ? "text-purple-600"
                                  : "text-gray-500"
                              }`}
                            >
                              {stepItem.label}
                            </span>
                          </div>
                          {!isLast && (
                            <div className="flex-1 mx-2 relative">
                              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 -z-10"></div>
                              <div
                                className="absolute top-1/2 left-0 h-0.5 bg-purple-600 -translate-y-1/2 -z-10 transition-all duration-500"
                                style={{ width: isActive ? "100%" : "0%" }}
                              ></div>
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>

                {/* Step 1: Service Selection */}
                {step === 1 && (
                  <div className="animate-fade-in">
                    <div className="text-start mb-8 lg:mb-12">
                      <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                        Select a Service
                      </h2>
                      <p className="text-base lg:text-xl text-gray-600 mb-6">
                        {businessInfo.description}
                      </p>
                    </div>

                    {loading ? (
                      <div className="flex justify-center items-center h-48 lg:h-64">
                        <div className="animate-spin rounded-full h-8 w-8 lg:h-12 lg:w-12 border-b-2 border-purple-600"></div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 max-w-4xl mx-auto">
                        {eServices.map((service) => (
                          <div
                            key={service._id}
                            className={`group relative bg-white rounded-xl lg:rounded-2xl border-2 p-4 lg:p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                              selectedService?._id === service._id
                                ? "border-purple-500 shadow-md bg-purple-50"
                                : "border-gray-200 hover:border-purple-300"
                            }`}
                            onClick={() => handleServiceChange(service)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                                  {service.name}
                                </h3>
                                <p className="text-gray-600 text-sm lg:text-base mb-2">
                                  {service.shortDescription}
                                </p>
                                <div className="flex items-center justify-between mt-3">
                                  <span className="text-lg font-bold text-purple-600">
                                    {formatCurrency(service.price)}
                                  </span>
                                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                    {service.duration}
                                  </span>
                                </div>
                              </div>
                              <FaChevronRight
                                className={`text-gray-400 group-hover:text-purple-500 transition-colors duration-200 ${
                                  selectedService?._id === service._id
                                    ? "text-purple-500"
                                    : ""
                                }`}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="text-start mt-8 lg:mt-12">
                      <button
                        onClick={() => handleNextStep(2)}
                        disabled={!selectedService}
                        className={`px-6 lg:px-12 py-3 lg:py-4 rounded-lg lg:rounded-full font-semibold text-base lg:text-lg transition-all duration-300 ${
                          selectedService
                            ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Continue to Date & Time
                      </button>
                    </div>

                    {/* Powered by logo for Step 1 */}
                    <PoweredByLogo />
                  </div>
                )}

                {/* Step 2: Date and Time Selection */}
                {step === 2 && (
                  <div className="animate-fade-in">
                    <div className="text-start mb-8 lg:mb-12">
                      <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                        Select Date & Time
                      </h2>
                      <p className="text-base lg:text-xl text-gray-600">
                        Choose when you'd like to visit us
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 max-w-4xl mx-auto">
                      {/* Calendar Section */}
                      <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <FaCalendarAlt className="text-purple-500 mr-2" />
                          Select Date
                        </h3>
                        <Calendar
                          onChange={handleDateChange}
                          value={selectedDate}
                          className="border-none w-full react-calendar-custom"
                          tileDisabled={disablePastDates}
                          minDetail="month"
                        />
                      </div>

                      {/* Time Slots Section */}
                      <div className="bg-white rounded-xl lg:rounded-2xl p-4 lg:p-6 border border-gray-200">
                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                          <FaClock className="text-purple-500 mr-2" />
                          Available Times
                        </h3>

                        {loading ? (
                          <div className="flex justify-center items-center h-32 lg:h-48">
                            <div className="animate-spin rounded-full h-6 lg:h-8 w-6 lg:w-8 border-b-2 border-purple-600"></div>
                          </div>
                        ) : (
                          <>
                            <p className="text-gray-600 mb-4 text-sm lg:text-base">
                              {selectedDate?.toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })}
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 lg:gap-3">
                              {availableTimeSlots.map((slot, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleTimeSlotSelect(slot)}
                                  disabled={slot.booked}
                                  className={`p-3 lg:p-4 rounded-lg lg:rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                                    selectedTimeSlot === slot.time
                                      ? "bg-purple-600 text-white border-purple-600 shadow-lg"
                                      : slot.booked
                                      ? "bg-gray-100 text-gray-400 cursor-not-allowed border-gray-200"
                                      : "bg-white text-gray-700 border-gray-300 hover:border-purple-400 hover:shadow-md"
                                  }`}
                                >
                                  {slot.time}
                                  {slot.booked && (
                                    <div className="text-xs mt-1 opacity-75">
                                      Unavailable
                                    </div>
                                  )}
                                </button>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 lg:mt-12">
                      <button
                        onClick={() => handlePrevStep()}
                        className="px-6 lg:px-8 py-3 border border-gray-300 text-gray-700 rounded-lg lg:rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 order-2 sm:order-1"
                      >
                        ← Back to Services
                      </button>
                      <button
                        onClick={() => handleNextStep(3)}
                        disabled={!selectedTimeSlot}
                        className={`px-6 lg:px-8 py-3 rounded-lg lg:rounded-full font-semibold transition-all duration-300 order-1 sm:order-2 ${
                          selectedTimeSlot
                            ? "bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Continue to Details →
                      </button>
                    </div>

                    {/* Powered by logo for Step 2 */}
                    <PoweredByLogo />
                  </div>
                )}

                {/* Step 3: Enter Details */}
                {step === 3 && (
                  <div className="animate-fade-in max-w-2xl mx-auto">
                    <div className="text-start mb-8 lg:mb-12">
                      <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                        Your Information
                      </h2>
                      <p className="text-base lg:text-xl text-gray-600">
                        Please provide your details to confirm your booking
                      </p>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleNextStep(4);
                      }}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleFormChange}
                            required
                            className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                            required
                            className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            placeholder="Your phone number"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleFormChange}
                          required
                          className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Additional Notes (Optional)
                        </label>
                        <textarea
                          name="details"
                          value={formData.details}
                          onChange={handleFormChange}
                          rows={4}
                          className="w-full p-3 lg:p-4 border border-gray-300 rounded-lg lg:rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                          placeholder="Any special requirements or notes for our team..."
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
                        <button
                          type="button"
                          onClick={() => handlePrevStep()}
                          className="px-6 lg:px-8 py-3 border border-gray-300 text-gray-700 rounded-lg lg:rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 order-2 sm:order-1"
                        >
                          ← Back to Time
                        </button>
                        <button
                          type="submit"
                          className="px-6 lg:px-12 py-3 lg:py-4 bg-purple-600 text-white rounded-lg lg:rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-3 order-1 sm:order-2"
                        >
                          Continue to Review →
                        </button>
                      </div>
                    </form>

                    {/* Powered by logo for Step 3 */}
                    <PoweredByLogo />
                  </div>
                )}

                {/* Step 4: Confirmation Preview */}
                {step === 4 && (
                  <div className="animate-fade-in max-w-2xl mx-auto">
                    <div className="text-start mb-8 lg:mb-12">
                      <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-3 lg:mb-4">
                        Review Your Booking
                      </h2>
                      <p className="text-base lg:text-xl text-gray-600">
                        Please review your details before confirming
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-gray-200 mb-8">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Appointment Details
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-gray-600">Service</p>
                              <p className="font-medium text-gray-900">
                                {selectedService?.name}
                              </p>
                              <p className="text-sm text-purple-600 font-semibold">
                                {formatCurrency(selectedService?.price)}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">
                                Date & Time
                              </p>
                              <p className="font-medium text-gray-900">
                                {selectedDate?.toLocaleDateString()} at{" "}
                                {selectedTimeSlot}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Your Information
                          </h3>
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm text-gray-600">Full Name</p>
                              <p className="font-medium text-gray-900">
                                {formData.fullName}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Email</p>
                              <p className="font-medium text-gray-900">
                                {formData.email}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Phone</p>
                              <p className="font-medium text-gray-900">
                                {formData.phone}
                              </p>
                            </div>
                            {formData.details && (
                              <div>
                                <p className="text-sm text-gray-600">
                                  Additional Notes
                                </p>
                                <p className="font-medium text-gray-900">
                                  {formData.details}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <button
                        onClick={() => handlePrevStep()}
                        className="px-6 lg:px-8 py-3 border border-gray-300 text-gray-700 rounded-lg lg:rounded-full font-semibold hover:bg-gray-50 transition-all duration-300 order-2 sm:order-1"
                      >
                        ← Edit Details
                      </button>
                      <button
                        onClick={handleSubmitBooking}
                        disabled={loading}
                        className="px-6 lg:px-12 py-3 lg:py-4 bg-purple-600 text-white rounded-lg lg:rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:bg-purple-400 flex items-center justify-center gap-3 order-1 sm:order-2"
                      >
                        {loading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 lg:h-5 lg:w-5 border-b-2 border-white"></div>
                            Processing...
                          </>
                        ) : (
                          "Confirm Booking"
                        )}
                      </button>
                    </div>

                    {/* Powered by logo for Step 4 */}
                    <PoweredByLogo />
                  </div>
                )}

                {/* Step 5: Success */}

                {step === 5 && (
                  <div className="animate-fade-in text-center max-w-2xl mx-auto">
                    <div className="w-16 h-16 lg:w-24 lg:h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 lg:mb-8">
                      <FaCheckCircle className="text-green-500 text-2xl lg:text-4xl" />
                    </div>

                    <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
                      You're All Set!
                    </h2>

                    <p className="text-base lg:text-xl text-gray-600 mb-6 lg:mb-8">
                      Your booking has been confirmed and an email has being sent to you. We can't wait to see you!
                    </p>

                    {/* <div className="bg-gray-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-6 lg:mb-8 border border-gray-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 text-left">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 lg:mb-4">
                            Appointment Details
                          </h4>
                          <div className="space-y-2 lg:space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Service:</span>
                              <span className="font-medium">
                                {selectedService?.name}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Price:</span>
                              <span className="font-medium text-purple-600">
                                {formatCurrency(selectedService?.price)}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Date & Time:
                              </span>
                              <span className="font-medium">
                                {selectedDate?.toLocaleDateString()} at{" "}
                                {selectedTimeSlot}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 lg:mb-4">
                            Your Information
                          </h4>
                          <div className="space-y-2 lg:space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Name:</span>
                              <span>{formData.fullName}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Email:</span>
                              <span>{formData.email}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Phone:</span>
                              <span>{formData.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    {/* Bank Account Details - Added to Success Page */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-6 lg:mb-8 border border-blue-200">
                      <div className="flex items-center justify-center ">
                        <FaUniversity className="text-blue-500 text-xl mr-2" />
                        <h4 className="font-semibold text-blue-800 text-lg">
                          Bank Transfer Details
                        </h4>
                      </div>
                      <div className=" p-3 ">
                        <p className="text-blue-700 text-sm text-center">
                          Kindly make payment using the bank details below:
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-4 lg:gap-6 text-left text-sm">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-blue-700 font-medium">
                              Account Name:
                            </span>
                            <span className="text-blue-900">
                              {bankDetails.accountName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700 font-medium">
                              Bank Name:
                            </span>
                            <span className="text-blue-900">
                              {bankDetails.bankName}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-blue-700 font-medium">
                              Account Number:
                            </span>
                            <span className="text-blue-900">
                              {bankDetails.accountNumber}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-blue-100 rounded-lg border border-blue-200">
                        <p className="text-blue-700 text-xs text-center">
                          Please include your name and preffered service as
                          reference when making the payment and come along with
                          your payment receipt.
                        </p>
                      </div>
                    </div>

                    {/* Payment Confirmation Button */}
                    <div className="bg-green-50 rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-6 lg:mb-8 border border-green-200">
                      <div className="flex items-center justify-center mb-3">
                        <FaCreditCard className="text-green-500 text-xl mr-2" />
                        <h4 className="font-semibold text-green-800 text-lg">
                          Payment Confirmation
                        </h4>
                      </div>
                      <p className="text-green-700 text-sm text-center mb-4">
                        Already made your payment? Click the button below to
                        notify us on WhatsApp.
                      </p>
                      <button
                        onClick={() => {
                          // Replace with the actual merchant's WhatsApp number
                          const merchantWhatsAppNumber = "1234567890"; // Example: +1234567890
                          const message = `Hello! I have made my payment for the booking:\n\nService: ${
                            selectedService?.name
                          }\nAmount: ${formatCurrency(
                            selectedService?.price
                          )}\nDate: ${selectedDate?.toLocaleDateString()}\nTime: ${selectedTimeSlot}\nName: ${
                            formData.fullName
                          }\nPhone: ${formData.phone}`;

                          const whatsappUrl = `https://wa.me/${merchantWhatsAppNumber}?text=${encodeURIComponent(
                            message
                          )}`;
                          window.open(whatsappUrl, "_blank");
                        }}
                        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                      >
                        <FaCheckCircle className="text-white" />I Have Made My
                        Payment
                      </button>
                    </div>

                    {/* Contact Information - Mobile Only on Success Page */}
                    <div className="lg:hidden bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
                      <h5 className="font-semibold text-blue-800 mb-3 flex items-center">
                        <FaPhone className="mr-2" />
                        Contact Information
                      </h5>
                      <div className="space-y-2 text-sm text-blue-700">
                        <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="flex-shrink-0" />
                          <span>{businessInfo.contact.address}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaPhone className="flex-shrink-0" />
                          <span>{businessInfo.contact.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaEnvelope className="flex-shrink-0" />
                          <span>{businessInfo.contact.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg lg:rounded-xl p-4 mb-6 lg:mb-8 border border-blue-200">
                      <h5 className="font-semibold text-blue-800 mb-2">
                        What's Next?
                      </h5>
                      <p className="text-blue-700 text-sm">
                        You'll receive a confirmation email with all the
                        details. We'll send you a reminder before your
                        appointment.
                      </p>
                    </div>

                    <button
                      onClick={onCloseModal}
                      className="px-6 lg:px-12 py-3 lg:py-4 bg-purple-600 text-white rounded-lg lg:rounded-full font-semibold hover:bg-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      Close
                    </button>

                    {/* Powered by logo for Step 5 */}
                    <PoweredByLogo />
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block w-80 bg-gray-50 border-l border-gray-200 p-6 lg:p-8 overflow-y-auto">
              <div className="sticky top-8">
                {/* Business Info */}
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">EB</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {businessInfo.name}
                  </h2>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {businessInfo.description}
                  </p>
                </div>

                {/* Contact Information */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-3">
                      <FaMapMarkerAlt className="text-purple-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">
                        {businessInfo.contact.address}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaPhone className="text-purple-500 flex-shrink-0" />
                      <span className="text-gray-600">
                        {businessInfo.contact.phone}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FaEnvelope className="text-purple-500 flex-shrink-0" />
                      <span className="text-gray-600">
                        {businessInfo.contact.email}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Current Booking Summary */}
                {(step === 2 || step === 3 || step === 4 || step === 5) &&
                  selectedService && (
                    <div className="bg-white rounded-xl p-6 border border-gray-200 mt-6">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        Your Booking
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {selectedService.name}
                          </h4>
                          <p className="text-gray-600 text-sm mt-1">
                            {selectedService.shortDescription}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-lg font-bold text-purple-600">
                              {formatCurrency(selectedService.price)}
                            </span>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                              {selectedService.duration}
                            </span>
                          </div>
                        </div>

                        {(selectedDate || selectedTimeSlot) && (
                          <div className="pt-3 border-t border-gray-200">
                            <div className="space-y-2 text-sm">
                              {selectedDate && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Date:</span>
                                  <span className="font-medium">
                                    {selectedDate.toLocaleDateString()}
                                  </span>
                                </div>
                              )}
                              {selectedTimeSlot && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Time:</span>
                                  <span className="font-medium">
                                    {selectedTimeSlot}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                {/* Powered by logo for Desktop Sidebar */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-2 text-gray-400">
                    <span className="text-xs">Powered by</span>
                    <div className="flex items-center space-x-3">
                      <Link to="/">
                        <img
                          src={DimpifiedLogo}
                          alt="Dimpified"
                          className="h-5 w-auto"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogPanel>
      </div>

      <style jsx>{`
        .react-calendar-custom {
          width: 100%;
          border: none;
          font-family: inherit;
        }
        .react-calendar-custom .react-calendar__tile--active {
          background: #8b5cf6;
          color: white;
          border-radius: 8px;
        }
        .react-calendar-custom .react-calendar__tile:enabled:hover,
        .react-calendar-custom .react-calendar__tile:enabled:focus {
          background: #ede9fe;
          border-radius: 8px;
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Dialog>
  );
};

export default BookingModal;
