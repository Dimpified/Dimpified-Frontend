import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCheckCircle, FaCopy, FaWhatsapp } from "react-icons/fa";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import api from "../../api/applicationFeature";
import { showToast } from "../../component/ShowToast";
import axios from "axios";
import PaystackPop from "@paystack/inline-js";
import { getCurrencySymbol } from "../../helper/getCurrencySymbol";
import StripePaymentForm from "./StripePaymentForm";

const BookingModal = ({
  isOpen,
  handleClose,
  information,
  subdomain,
  serviceCurrency,
}) => {
  const currency = serviceCurrency?.[0] || "NGN";
  const lastFetchedParams = useRef(null);
  const fetchLoadingRef = useRef(false);

  // Normalize date to ensure consistency
  const normalizeDate = useCallback((date) => {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  }, []);

  const [paymentState, setPaymentState] = useState({
    paymentLoading: false,
    stripeModalOpen: false,
    clientSecret: "",
  });

  const [step, setStep] = useState(1);
  const [eServices, setEServices] = useState([
    {
      _id: "1",
      name: "Dental Checkup",
      price: "5000",
      shortDescription: "Complete dental examination and cleaning",
      serviceImage:
        "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400",
      duration: 60,
    },
    {
      _id: "2",
      name: "Teeth Whitening",
      price: "15000",
      shortDescription: "Professional teeth whitening treatment",
      serviceImage:
        "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400",
      duration: 90,
    },
    {
      _id: "3",
      name: "Dental Filling",
      price: "8000",
      shortDescription: "Cavity treatment and filling",
      serviceImage:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400",
      duration: 45,
    },
  ]);
  const [teamMember, setTeamMember] = useState([
    {
      _id: "1",
      fullName: "Dr. Sarah Johnson",
      phoneNumber: "+2348012345678",
      status: "Senior Dentist",
      profilePicture:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300",
      creatorId: "doc123",
    },
    {
      _id: "2",
      fullName: "Dr. Michael Chen",
      phoneNumber: "+2348098765432",
      status: "Orthodontist",
      profilePicture:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300",
      creatorId: "doc456",
    },
  ]);
  const [loading1, setLoading1] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(normalizeDate(new Date()));
  const [totalAmount, setTotalAmount] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceCharge, setServiceCharge] = useState(0);
  const [duration, setDuration] = useState(null);
  const [uniqueID, setUniqueID] = useState("BK" + Date.now());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSpecialist, setSelectedSpecialist] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
    service: "",
    location: "",
    details: "",
  });
  const [timeZones, setTimeZones] = useState("");
  const [planType, setPlanType] = useState("Pro"); // Default plan type
  const isClosing = useRef(false);

  // Merchant account details with dummy data
  const [merchantDetails] = useState({
    accountNumber: "0123456789",
    accountName: "Smile Dental Clinic Ltd",
    bankName: "GTBank Plc",
    whatsappNumber: "2349064766113",
  });

  const onCloseModal = useCallback(async () => {
    if (paymentState.paymentLoading) {
      showToast("Payment is processing. Please wait.", "info");
      return;
    }

    if (isClosing.current) {
      return;
    }
    isClosing.current = true;

    await new Promise((resolve) => setTimeout(resolve, 100));

    setStep(1);
    setSelectedService(null);
    setSelectedSpecialist(null);
    setSelectedTimeSlot(null);
    setSelectedDate(normalizeDate(new Date()));
    setFormData({
      fullName: "",
      address: "",
      phone: "",
      email: "",
      service: "",
      location: "",
      details: "",
    });
    setPaymentState({
      paymentLoading: false,
      stripeModalOpen: false,
      clientSecret: "",
    });
    setTotalAmount(null);
    setServiceCharge(0);
    setPaymentStatus("");
    setUniqueID("BK" + Date.now());
    handleClose();
    isClosing.current = false;
  }, [paymentState.paymentLoading, handleClose]);

  // Calculate service charge function
  const calculateServiceCharge = useCallback(
    (price, planType, paymentMethod) => {
      switch (planType) {
        case "Lite":
          return paymentMethod === "Online" ? price * 0.024 + 150 : 0;
        case "Plus":
          return paymentMethod === "Online" ? price * 0.021 + 175 : 0;
        case "Pro":
          return paymentMethod === "Online" ? price * 0.018 + 200 : 0;
        case "Extra":
          return paymentMethod === "Online" ? price * 0.015 + 250 : 0;
        default:
          return 0;
      }
    },
    []
  );

  // Dummy time slots
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
  ];

  useEffect(() => {
    setAvailableTimeSlots(timeSlots);
  }, []);

  const handleServiceChange = (service) => {
    setSelectedService(service);
    let price = parseFloat(service.price);
    if (formData.location === "Home Service") {
      price += price * 0.5;
    }
    setServicePrice(price.toLocaleString());
    setServiceCharge(0);
    setTotalAmount(null);
    setDuration(service.duration || 30);
  };

  const handleDateChange = useCallback(
    (date) => {
      const normalizedDate = normalizeDate(date);
      setSelectedDate(normalizedDate);
    },
    [normalizeDate]
  );

  const handleSpecialistChange = (specialist) => {
    setSelectedSpecialist(specialist);
  };

  const disablePastDates = ({ date, view }) => {
    return view === "month" && date < new Date().setHours(0, 0, 0, 0);
  };

  const handleTimeSlotSelect = (slot) => {
    if (!slot.booked) setSelectedTimeSlot(slot.time);
  };

  const handleNextStep = (nextStep) => {
    if (nextStep <= 7) setStep(nextStep);
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
    if (name === "location" && selectedService?.price) {
      let price = parseFloat(selectedService.price);
      if (value === "Home Service") {
        price += price * 0.5;
      }
      setServicePrice(price.toLocaleString());
      setServiceCharge(0);
      setTotalAmount(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Function to copy account details
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`${type} copied to clipboard!`, "success");
    });
  };

  // Generate transaction reference
  const generateTxRef = () => {
    const randomString = Math.random().toString(36).substring(7);
    const timestamp = Date.now();
    return `${timestamp}-${randomString}`;
  };

  // Delay utility
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // Handle Paystack payment
  const handlePaystackPayment = useCallback(async () => {
    if (!formData.email || !formData.fullName || !formData.phone) {
      showToast(
        "Please fill in all required fields (email, name, phone)",
        "error"
      );
      return;
    }
    if (
      !selectedService?._id ||
      !selectedService?.name ||
      !selectedService?.price
    ) {
      showToast("Please select a service", "error");
      return;
    }
    if (!selectedSpecialist?.creatorId) {
      showToast("Please select a specialist", "error");
      return;
    }
    if (!selectedTimeSlot) {
      showToast("Please select a time slot", "error");
      return;
    }

    setPaymentState((prev) => ({ ...prev, paymentLoading: true }));

    let priceToSend = parseFloat(selectedService.price);
    if (formData.location === "Home Service") {
      priceToSend += priceToSend * 0.5;
    }

    const serviceCharge = calculateServiceCharge(
      priceToSend,
      planType,
      "Online"
    );
    const totalToPay = priceToSend + serviceCharge;

    setServiceCharge(serviceCharge);
    setTotalAmount(totalToPay.toLocaleString());
    setPaymentStatus("Online");

    const paystackConfig = {
      key: import.meta.env.VITE_Paystack_PUBLIC_KEY,
      email: formData.email,
      amount: Math.round(totalToPay * 100),
      currency: "NGN",
      ref: generateTxRef(),
      metadata: {
        provider: "paystack",
        ecosystemDomain: subdomain,
        email: formData.email,
        name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        description: formData.details || "Nil",
        location: formData.location || "Shop",
        service: selectedService?.name,
        date: selectedDate ? selectedDate.toDateString() : "Not selected",
        time: selectedTimeSlot,
        bookingType: formData.location,
        servicePrice: priceToSend,
        serviceCharge: serviceCharge,
        creatorId: selectedSpecialist?.creatorId,
        serviceId: selectedService?._id,
      },
    };

    try {
      const paystack = new PaystackPop();
      paystack.newTransaction({
        ...paystackConfig,
        onSuccess: (transaction) => {
          console.log("Paystack Success:", transaction);
          setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
          setUniqueID(transaction.reference);
          setPaymentStatus("paid");
          showToast("Payment successful!", "success");
          handleNextStep(7);
        },
        onCancel: () => {
          console.log("Paystack Cancelled");
          setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
          showToast("Payment cancelled by user", "info");
        },
        onError: (error) => {
          console.error("Paystack Error:", error);
          setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
          showToast("Payment failed. Please try again.", "error");
        },
      });
    } catch (error) {
      console.error("Paystack Payment Error:", error);
      setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
      showToast("Payment initialization failed", "error");
    }
  }, [
    formData,
    selectedService,
    selectedSpecialist,
    selectedTimeSlot,
    selectedDate,
    subdomain,
    planType,
    calculateServiceCharge,
  ]);

  // Handle Stripe payment
  const handleStripePayment = useCallback(async () => {
    if (!formData.email || !formData.fullName || !formData.phone) {
      showToast(
        "Please fill in all required fields (email, name, phone)",
        "error"
      );
      return;
    }
    if (
      !selectedService?._id ||
      !selectedService?.name ||
      !selectedService?.price
    ) {
      showToast("Please select a service", "error");
      return;
    }
    if (!selectedSpecialist?.creatorId) {
      showToast("Please select a specialist", "error");
      return;
    }
    if (!selectedTimeSlot) {
      showToast("Please select a time slot", "error");
      return;
    }

    setPaymentState((prev) => ({ ...prev, paymentLoading: true }));

    let priceToSend = parseFloat(selectedService.price);
    if (formData.location === "Home Service") {
      priceToSend += priceToSend * 0.5;
    }

    const serviceCharge = calculateServiceCharge(
      priceToSend,
      planType,
      "Online"
    );
    const totalToPay = priceToSend + serviceCharge;

    setServiceCharge(serviceCharge);
    setTotalAmount(totalToPay.toLocaleString());
    setPaymentStatus("Online");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-payment-intent`,
        {
          amount: totalToPay * 100,
          currency: currency.toLowerCase() === "ngn" ? "ngn" : "usd",
          metadata: {
            provider: "stripe",
            ecosystemDomain: subdomain,
            email: formData.email,
            name: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            description: formData.details || "Nil",
            location: formData.location || "Shop",
            service: selectedService?.name,
            date: selectedDate ? selectedDate.toDateString() : "Not selected",
            time: selectedTimeSlot,
            bookingType: formData.location,
            servicePrice: priceToSend,
            serviceCharge: serviceCharge,
            creatorId: selectedSpecialist?.creatorId,
            serviceId: selectedService?._id,
          },
        }
      );

      const clientSecret =
        response.data.clientSecret?.client_secret || response.data.clientSecret;

      if (clientSecret) {
        setPaymentState((prev) => ({
          ...prev,
          clientSecret,
          stripeModalOpen: true,
          paymentLoading: false,
        }));
      } else {
        throw new Error("Client secret not received");
      }
    } catch (error) {
      console.error("Error creating Stripe payment intent:", error);
      setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
      showToast("Failed to initialize Stripe payment", "error");
    }
  }, [
    formData,
    selectedService,
    selectedSpecialist,
    selectedTimeSlot,
    selectedDate,
    subdomain,
    planType,
    currency,
    calculateServiceCharge,
  ]);

  // Handle Stripe form submission
  const handleStripeSubmit = useCallback(
    async (stripe, elements, cardElement) => {
      if (!stripe || !elements || !paymentState.clientSecret || !cardElement) {
        showToast("Payment setup incomplete. Please try again.", "error");
        return;
      }

      setPaymentState((prev) => ({ ...prev, paymentLoading: true }));

      try {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          paymentState.clientSecret,
          {
            payment_method: { card: cardElement },
          }
        );

        if (error) {
          showToast(
            error.code === "card_declined"
              ? "Your card was declined. Please try another card."
              : error.message || "Payment failed.",
            "error"
          );
          setPaymentState((prev) => ({
            ...prev,
            paymentLoading: false,
          }));
          return;
        }

        if (paymentIntent.status === "succeeded") {
          setPaymentState((prev) => ({
            ...prev,
            paymentLoading: false,
            stripeModalOpen: false,
          }));
          setUniqueID(paymentIntent.id);
          setPaymentStatus("paid");
          showToast("Payment successful!", "success");
          handleNextStep(7);
        }
      } catch (error) {
        console.error("Stripe payment error:", error);
        setPaymentState((prev) => ({
          ...prev,
          paymentLoading: false,
        }));
        showToast("Payment processing failed", "error");
      }
    },
    [paymentState.clientSecret]
  );

  // Handle Pay directly to merchant
  const handlePayToMerchant = useCallback(async () => {
    if (!formData.email || !formData.fullName || !formData.phone) {
      showToast(
        "Please fill in all required fields (email, name, phone)",
        "error"
      );
      return;
    }
    if (
      !selectedService?._id ||
      !selectedService?.name ||
      !selectedService?.price
    ) {
      showToast("Please select a service", "error");
      return;
    }
    if (!selectedSpecialist?.creatorId) {
      showToast("Please select a specialist", "error");
      return;
    }
    if (!selectedTimeSlot) {
      showToast("Please select a time slot", "error");
      return;
    }

    setPaymentState((prev) => ({ ...prev, paymentLoading: true }));

    let priceToSend = parseFloat(selectedService.price);
    if (formData.location === "Home Service") {
      priceToSend += priceToSend * 0.5;
    }

    setServiceCharge(0);
    setTotalAmount(priceToSend.toLocaleString());
    setPaymentStatus("Pay directly to merchant");

    // Simulate API call
    setTimeout(() => {
      setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
      showToast(
        "Booking submitted successfully. Please complete payment to the merchant.",
        "success"
      );
      setUniqueID("BK" + Math.random().toString(36).substr(2, 9).toUpperCase());
      setPaymentStatus("Pay directly to merchant");
      handleNextStep(6);
    }, 1500);
  }, [
    formData,
    selectedService,
    selectedSpecialist,
    selectedTimeSlot,
    selectedDate,
  ]);

  // Function to handle "I've made the transfer" button
  const handleTransferMade = useCallback(() => {
    handleNextStep(7);
  }, []);

  // Function to send payment receipt to merchant via WhatsApp
  const sendReceiptToMerchant = useCallback(() => {
    const bookingDetails = `
*You have a new booking!!*
    
*Good day. Please Find Attached My Payment Receipt and Details for Booking Confirmation*

 *Booking Details:*
• Booking ID: ${uniqueID}
• Service: ${selectedService?.name}
• Specialist: ${selectedSpecialist?.fullName}
• Date: ${selectedDate?.toLocaleDateString()}
• Time: ${selectedTimeSlot}
• Amount: ${getCurrencySymbol(currency)}${totalAmount}

 *Customer Information:*
• Name: ${formData.fullName}
• Email: ${formData.email}
• Phone: ${formData.phone}
• Address: ${formData.address || "Not provided"}

 *Payment Method:* Bank Transfer

I have made the payment transfer as instructed. Please confirm receipt and verify my booking.

Thank you!
    `.trim();

    const whatsappUrl = `https://wa.me/${
      merchantDetails.whatsappNumber
    }?text=${encodeURIComponent(bookingDetails)}`;

    window.open(whatsappUrl, "_blank");
  }, [
    uniqueID,
    selectedService,
    selectedSpecialist,
    selectedDate,
    selectedTimeSlot,
    formData,
    currency,
    totalAmount,
    merchantDetails,
  ]);

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZones(timeZone);
  }, []);

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="md:bg-[#f1f1f1] bg-white font-Urbanist w-full h-full  lg:px-32 md:pb-12 py-2 overflow-y-auto">
          <div className="bg-white rounded-xl md:my-12 my-2 lg:px-12 overflow-y-auto">
            {paymentState.paymentLoading && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-60">
                <div className="bg-white p-6 rounded-lg flex items-center gap-3 shadow-lg">
                  <svg
                    className="animate-spin h-8 w-8 text-purple-600"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <p className="text-lg">Processing booking, please wait...</p>
                </div>
              </div>
            )}

            {/* Step 1: Service Details */}
            {step === 1 && (
              <>
                <div className="flex justify-between items-center p-4 border-b">
                  <DialogTitle className="md:text-3xl text-xl font-bold text-gray-900">
                    <button
                      onClick={onCloseModal}
                      className="text-purple-600 hover:text-purple-700 text-sm font-semibold mb-2 inline-flex items-center gap-1"
                    >
                      ← Back to Home
                    </button>
                    <br />
                    Confirm your preffered service
                  </DialogTitle>
                  <button
                    onClick={onCloseModal}
                    className="text-gray-500 hover:text-red-500 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                  >
                    ×
                  </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 p-6">
                  <div className="lg:w-8/12">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {eServices.map((service, index) => (
                        <div
                          key={index}
                          className={`border-2 rounded-xl cursor-pointer transition-all duration-300 hover:shadow-lg ${
                            selectedService?._id === service._id
                              ? "border-purple-500 border-3 shadow-md"
                              : "border-gray-200"
                          }`}
                          onClick={() => handleServiceChange(service)}
                        >
                          <div className="bg-white rounded-xl overflow-hidden">
                            <img
                              src={service.serviceImage}
                              alt={service.name}
                              className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                              <h3 className="font-semibold text-lg mb-2">
                                {service.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-3">
                                {service.shortDescription}
                              </p>
                              <div className="flex justify-between items-center">
                                <span className="text-2xl font-bold text-purple-600">
                                  {getCurrencySymbol(currency)}
                                  {service.price}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {service.duration} mins
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:w-4/12">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-6">
                      <h4 className="text-xl font-semibold mb-4">
                        Booking Summary
                      </h4>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 bg-white rounded-lg border">
                          {selectedService?.serviceImage ? (
                            <img
                              src={selectedService.serviceImage}
                              alt={selectedService.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-gray-500 text-xs text-center">
                                Select Service
                              </span>
                            </div>
                          )}
                          <div className="flex-1">
                            <h5 className="font-semibold">
                              {selectedService?.name || "No service selected"}
                            </h5>
                            <p className="text-gray-600 text-sm">
                              {selectedService?.shortDescription ||
                                "Choose a service to continue"}
                            </p>
                            {selectedService && (
                              <p className="text-purple-600 font-bold text-lg">
                                {getCurrencySymbol(currency)}
                                {servicePrice}
                              </p>
                            )}
                          </div>
                        </div>

                        <button
                          onClick={() => handleNextStep(2)}
                          disabled={!selectedService}
                          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                            selectedService
                              ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          Continue to Specialist
                        </button>

                        <p className="text-gray-500 text-sm text-center">
                          Select a service to proceed with your booking
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Team Details */}
            {step === 2 && (
              <>
                <div className="flex justify-between items-center p-6 border-b">
                  <DialogTitle className="md:text-3xl text-xl font-bold text-gray-900">
                    <button
                      onClick={handlePrevStep}
                      className="text-purple-600 hover:text-purple-700 text-sm font-semibold mb-2 inline-flex items-center gap-1"
                    >
                      ← Back to Services
                    </button>
                    <br />
                    Choose Your Specialist
                  </DialogTitle>
                  <button
                    onClick={onCloseModal}
                    className="text-gray-500 hover:text-red-500 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                  >
                    ×
                  </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-6 p-6">
                  <div className="lg:w-8/12">
                    <div className="grid md:grid-cols-2 gap-6">
                      {teamMember.map((specialist, index) => (
                        <div
                          key={index}
                          className={`border-2 rounded-xl cursor-pointer transition-all duration-300 p-4 ${
                            selectedSpecialist?._id === specialist._id
                              ? "border-purple-500 bg-purple-50"
                              : "border-gray-200 hover:border-purple-300"
                          }`}
                          onClick={() => handleSpecialistChange(specialist)}
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={specialist.profilePicture}
                              alt={specialist.fullName}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">
                                {specialist.fullName}
                              </h4>
                              <p className="text-gray-600 text-sm">
                                {specialist.status}
                              </p>
                              <p className="text-gray-500 text-sm">
                                {specialist.phoneNumber}
                              </p>
                            </div>
                            {selectedSpecialist?._id === specialist._id && (
                              <div className="text-purple-600">
                                <FaCheckCircle size={20} />
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:w-4/12">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-6">
                      <h4 className="text-xl font-semibold mb-4">
                        Booking Summary
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border">
                          <div className="flex items-center gap-3 mb-3">
                            <img
                              src={selectedService?.serviceImage}
                              alt={selectedService?.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <h5 className="font-semibold">
                                {selectedService?.name}
                              </h5>
                              <p className="text-purple-600 font-bold">
                                {getCurrencySymbol(currency)}
                                {servicePrice}
                              </p>
                            </div>
                          </div>

                          <div className="border-t pt-3">
                            <p className="text-sm text-gray-600">
                              Specialist:{" "}
                              <span className="font-semibold">
                                {selectedSpecialist?.fullName || "Not selected"}
                              </span>
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleNextStep(3)}
                          disabled={!selectedSpecialist}
                          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                            selectedSpecialist
                              ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          Continue to Date & Time
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Date and Time */}
            {step === 3 && (
              <>
                <div className="flex justify-between items-center p-6 border-b">
                  <DialogTitle className="md:text-3xl text-xl font-bold text-gray-900">
                    <button
                      onClick={handlePrevStep}
                      className="text-purple-600 hover:text-purple-700 text-sm font-semibold mb-2 inline-flex items-center gap-1"
                    >
                      ← Back to Specialist
                    </button>
                    <br />
                    Select Date & Time
                  </DialogTitle>
                  <button
                    onClick={onCloseModal}
                    className="text-gray-500 hover:text-red-500 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                  >
                    ×
                  </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 p-6">
                  <div className="lg:w-7/12">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold text-lg mb-4">
                          Select Date
                        </h4>
                        <Calendar
                          onChange={handleDateChange}
                          value={selectedDate}
                          className="border-none rounded-xl shadow-sm p-4 bg-white"
                          tileDisabled={disablePastDates}
                          nextLabel={
                            <span className="text-purple-600 font-bold">›</span>
                          }
                          prevLabel={
                            <span className="text-purple-600 font-bold">‹</span>
                          }
                        />
                      </div>

                      <div>
                        <h4 className="font-semibold text-lg mb-4">
                          Available Times
                        </h4>
                        <div className="grid grid-cols-2 gap-3">
                          {availableTimeSlots.map((slot, index) => (
                            <button
                              key={index}
                              onClick={() => handleTimeSlotSelect(slot)}
                              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                                selectedTimeSlot === slot.time
                                  ? "border-purple-500 bg-purple-50 text-purple-700 font-semibold"
                                  : "border-gray-200 hover:border-purple-300"
                              } ${
                                slot.booked
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              disabled={slot.booked}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-5/12">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <h4 className="text-xl font-semibold mb-4">
                        Booking Summary
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border space-y-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={selectedService?.serviceImage}
                              alt={selectedService?.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <h5 className="font-semibold">
                                {selectedService?.name}
                              </h5>
                              <p className="text-purple-600 font-bold">
                                {getCurrencySymbol(currency)}
                                {servicePrice}
                              </p>
                            </div>
                          </div>

                          <div className="border-t pt-3 space-y-2">
                            <p className="text-sm">
                              <span className="text-gray-600">Specialist:</span>{" "}
                              <span className="font-semibold">
                                {selectedSpecialist?.fullName}
                              </span>
                            </p>
                            <p className="text-sm">
                              <span className="text-gray-600">Date:</span>{" "}
                              <span className="font-semibold">
                                {selectedDate?.toLocaleDateString("en-US", {
                                  weekday: "short",
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </p>
                            <p className="text-sm">
                              <span className="text-gray-600">Time:</span>{" "}
                              <span className="font-semibold">
                                {selectedTimeSlot || "Not selected"}
                              </span>
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleNextStep(4)}
                          disabled={!selectedTimeSlot}
                          className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                            selectedTimeSlot
                              ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                        >
                          Continue to Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Step 4: Enter Your Details */}
            {step === 4 && (
              <>
                <div className="flex justify-between items-center p-6 border-b">
                  <DialogTitle className="md:text-3xl text-xl font-bold text-gray-900">
                    <button
                      onClick={handlePrevStep}
                      className="text-purple-600 hover:text-purple-700 text-sm font-semibold mb-2 inline-flex items-center gap-1"
                    >
                      ← Back to Date & Time
                    </button>
                    <br />
                    Your Information
                  </DialogTitle>
                  <button
                    onClick={onCloseModal}
                    className="text-gray-500 hover:text-red-500 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                  >
                    ×
                  </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 p-6">
                  <div className="lg:w-7/12">
                    <form className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleFormChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter your email"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Enter your phone number"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">
                            Service Type *
                          </label>
                          <select
                            name="location"
                            value={formData.location}
                            onChange={handleFormChange}
                            required
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          >
                            <option value="">Select location</option>
                            <option value="Shop">Business location</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Address
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleFormChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Enter your address (required for home service)"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2">
                          Additional Notes
                        </label>
                        <textarea
                          name="details"
                          value={formData.details}
                          onChange={handleFormChange}
                          rows="4"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          placeholder="Any additional information or special requirements..."
                        />
                      </div>
                    </form>
                  </div>

                  <div className="lg:w-5/12">
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 sticky top-6">
                      <h4 className="text-xl font-semibold mb-4">
                        Booking Summary
                      </h4>
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border space-y-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={selectedService?.serviceImage}
                              alt={selectedService?.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div>
                              <h5 className="font-semibold">
                                {selectedService?.name}
                              </h5>
                              <p className="text-purple-600 font-bold">
                                {getCurrencySymbol(currency)}
                                {servicePrice}
                              </p>
                            </div>
                          </div>

                          <div className="border-t pt-3 space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Specialist:</span>
                              <span className="font-semibold">
                                {selectedSpecialist?.fullName}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Date & Time:
                              </span>
                              <span className="font-semibold text-right">
                                {selectedDate?.toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                                , {selectedTimeSlot}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Service Type:
                              </span>
                              <span className="font-semibold">
                                {formData.location || "Not selected"}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          {/* Pay directly to merchant */}
                          <button
                            onClick={handlePayToMerchant}
                            disabled={
                              !formData.fullName ||
                              !formData.email ||
                              !formData.phone ||
                              !formData.location ||
                              paymentState.paymentLoading
                            }
                            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                              formData.fullName &&
                              formData.email &&
                              formData.phone &&
                              formData.location &&
                              !paymentState.paymentLoading
                                ? "bg-purple-600 text-white hover:bg-purple-700 shadow-md"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                          >
                            {paymentState.paymentLoading ? (
                              <>
                                <svg
                                  className="animate-spin h-5 w-5 text-white"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  />
                                </svg>
                                Processing...
                              </>
                            ) : (
                              "Pay Directly to Merchant"
                            )}
                          </button>
                          {/* Pay with Stripe */}
                          {currency !== "NGN" && (
                            <button
                              onClick={handleStripePayment}
                              disabled={
                                !formData.fullName ||
                                !formData.email ||
                                !formData.phone ||
                                !formData.location ||
                                paymentState.paymentLoading
                              }
                              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                                formData.fullName &&
                                formData.email &&
                                formData.phone &&
                                formData.location &&
                                !paymentState.paymentLoading
                                  ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              {paymentState.paymentLoading ? (
                                <>
                                  <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    />
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                  </svg>
                                  Processing...
                                </>
                              ) : (
                                <>Pay with Stripe</>
                              )}
                            </button>
                          )}

                          {/* Pay with Paystack */}
                          {currency === "NGN" && (
                            <button
                              onClick={handlePaystackPayment}
                              disabled={
                                !formData.fullName ||
                                !formData.email ||
                                !formData.phone ||
                                !formData.location ||
                                paymentState.paymentLoading
                              }
                              className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                                formData.fullName &&
                                formData.email &&
                                formData.phone &&
                                formData.location &&
                                !paymentState.paymentLoading
                                  ? "border border-purple-600 text-purple-600 hover:bg-purple-700 hover:text-white shadow-md"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              {paymentState.paymentLoading ? (
                                <>
                                  <svg
                                    className="animate-spin h-5 w-5 text-white"
                                    viewBox="0 0 24 24"
                                  >
                                    <circle
                                      className="opacity-25"
                                      cx="12"
                                      cy="12"
                                      r="10"
                                      stroke="currentColor"
                                      strokeWidth="4"
                                    />
                                    <path
                                      className="opacity-75"
                                      fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    />
                                  </svg>
                                  Processing...
                                </>
                              ) : (
                                <>Pay online</>
                              )}
                            </button>
                          )}
                        </div>

                        <p className="text-gray-500 text-sm text-center">
                          Complete your details to proceed with payment
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Step 6: Merchant Payment Details */}
            {step === 6 && (
              <>
                <div className="flex justify-between items-center p-6 border-b">
                  <DialogTitle className="md:text-3xl text-xl font-bold text-gray-900">
                    Complete Your Payment
                  </DialogTitle>
                  <button
                    onClick={onCloseModal}
                    className="text-gray-500 hover:text-red-500 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                  >
                    ×
                  </button>
                </div>

                <div className="p-8">
                  <div className="max-w-2xl mx-auto">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-yellow-800 mb-2">
                          Transfer Directly to Merchant
                        </h3>
                        <p className="text-yellow-700">
                          Please transfer the exact amount to the account
                          details below
                        </p>
                      </div>

                      <div className="bg-white rounded-lg border border-yellow-300 p-6 space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <span className="font-semibold text-gray-700">
                              Account Number
                            </span>
                            <p className="text-2xl font-mono font-bold text-gray-900">
                              {merchantDetails.accountNumber}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                merchantDetails.accountNumber,
                                "Account number"
                              )
                            }
                            className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            <FaCopy size={18} />
                          </button>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <span className="font-semibold text-gray-700">
                              Account Name
                            </span>
                            <p className="text-xl font-bold text-gray-900">
                              {merchantDetails.accountName}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                merchantDetails.accountName,
                                "Account name"
                              )
                            }
                            className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            <FaCopy size={18} />
                          </button>
                        </div>

                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div>
                            <span className="font-semibold text-gray-700">
                              Bank Name
                            </span>
                            <p className="text-xl font-bold text-gray-900">
                              {merchantDetails.bankName}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                merchantDetails.bankName,
                                "Bank name"
                              )
                            }
                            className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          >
                            <FaCopy size={18} />
                          </button>
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                            <span className="font-semibold text-green-800 text-lg">
                              Amount to Pay
                            </span>
                            <span className="text-2xl font-bold text-green-600">
                              {getCurrencySymbol(currency)}
                              {totalAmount}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">📸</span>
                          <div>
                            <p className="text-blue-800 font-semibold">
                              Screenshot your receipt after payment
                            </p>
                            <p className="text-blue-700 text-sm">
                              You will need it for confirmation in the next step
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={handleTransferMade}
                      className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
                    >
                      I've Made the Transfer
                    </button>

                    <p className="text-gray-500 text-center mt-4 text-sm">
                      Click above after you have completed the bank transfer
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Step 7: Success Page with Receipt Upload */}
            {step === 7 && (
              <>
                <div className="flex justify-between items-center p-6 border-b">
                  <DialogTitle className="md:text-3xl text-xl font-bold text-gray-900">
                    Booking Submitted!
                  </DialogTitle>
                  <button
                    onClick={onCloseModal}
                    className="text-gray-500 hover:text-red-500 text-xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                  >
                    ×
                  </button>
                </div>

                <div className="p-8">
                  <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FaCheckCircle className="text-green-500 text-4xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {paymentStatus === "paid"
                          ? "Payment Successful!"
                          : "Booking Submitted Successfully!"}
                      </h3>
                      <p className="text-gray-600 text-lg">
                        {paymentStatus === "paid"
                          ? "Your payment has been processed successfully."
                          : "Your booking details have been received"}
                      </p>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 mb-6 border border-gray-200">
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                          {paymentStatus === "paid"
                            ? "✅ Payment Verified"
                            : "⚠️ Payment Verification Required"}
                        </h4>
                        <p className="text-gray-700">
                          {paymentStatus === "paid"
                            ? "Your payment has been verified and your booking is confirmed."
                            : "Your booking can only be verified when the merchant confirms your payment"}
                        </p>
                      </div>

                      <div className="bg-white rounded-lg p-4 border space-y-3">
                        <div className="flex justify-between">
                          <span className="font-semibold">Booking ID:</span>
                          <span className="font-mono text-purple-600">
                            {uniqueID}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Service:</span>
                          <span>{selectedService?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Amount Paid:</span>
                          <span className="font-bold text-green-600">
                            {getCurrencySymbol(currency)}
                            {totalAmount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Date & Time:</span>
                          <span>
                            {selectedDate?.toLocaleDateString()},{" "}
                            {selectedTimeSlot}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-semibold">Payment Status:</span>
                          <span
                            className={`font-semibold ${
                              paymentStatus === "paid"
                                ? "text-green-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {paymentStatus === "paid" ? "Paid" : "Pending"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {paymentStatus !== "paid" && (
                        <button
                          onClick={sendReceiptToMerchant}
                          className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
                        >
                          <FaWhatsapp size={24} />
                          Send Payment Receipt to Merchant via WhatsApp
                        </button>
                      )}

                      {paymentStatus !== "paid" && (
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                          <p className="text-blue-800 text-sm text-center">
                            Click above to send your payment receipt directly to
                            the merchant on WhatsApp for faster verification
                          </p>
                        </div>
                      )}

                      <button
                        onClick={onCloseModal}
                        className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-semibold"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Stripe Payment Modal */}
          {paymentState.stripeModalOpen && (
            <StripePaymentForm
              stripeModalOpen={paymentState.stripeModalOpen}
              onClose={() =>
                setPaymentState((prev) => ({
                  ...prev,
                  stripeModalOpen: false,
                  paymentLoading: false,
                }))
              }
              submitHandler={handleStripeSubmit}
              paymentLoading={paymentState.paymentLoading}
              clientSecret={paymentState.clientSecret}
              totalAmount={totalAmount}
              selectedService={selectedService}
              selectedSpecialist={selectedSpecialist}
              selectedDate={selectedDate}
              selectedTimeSlot={selectedTimeSlot}
              formData={formData}
            />
          )}
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BookingModal;
