import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaCheckCircle } from "react-icons/fa";
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

import StripePaymentForm from "./StripePaymentForm";
import { getCurrencySymbol } from "../../helper/getCurrencySymbol";

const BookingModal = ({
  isOpen,
  handleClose,
  information,
  subdomain,
  serviceCurrency,
}) => {
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
  const [eServices, setEServices] = useState([]);
  const [teamMember, setTeamMember] = useState([]);
  const [loading1, setLoading1] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(normalizeDate(new Date()));
  const [companyCharge, setCompanyCharge] = useState(null);
  const [providerCharge, setProviderCharge] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const [summary, setSummary] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const [serviceCharge, setServiceCharge] = useState(0);
  const [planType, setPlanType] = useState(null);
  const [duration, setDuration] = useState(null);
  const [uniqueID, setUniqueID] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [updatedTimeSlots, setUpdatedTimeSlots] = useState([]);
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
  const isClosing = useRef(false);
  const renderCount = useRef(0);

  // Debug re-renders
  useEffect(() => {
    renderCount.current += 1;
    console.log(`BookingModal rendered ${renderCount.current} times`, {
      isOpen,
      paymentState,
      step,
    });
  }, [isOpen, paymentState, step]);

  const calculateServiceCharge = useCallback(
    (price, planType, paymentMethod) => {
      switch (planType) {
        case "Lite":
          return paymentMethod === "Online" ? price * 0.024 + 150 : 450;
        case "Plus":
          return paymentMethod === "Online" ? price * 0.021 + 175 : 400;
        case "Pro":
          return paymentMethod === "Online" ? price * 0.018 + 200 : 350;
        case "Extra":
          return paymentMethod === "Online" ? price * 0.015 + 250 : 250;
        default:
          return 0;
      }
    },
    []
  );

  const onCloseModal = useCallback(async () => {
    if (paymentState.paymentLoading) {
      showToast("Payment is processing. Please wait.", "info");
      console.log("Blocked BookingModal close due to payment processing");
      return;
    }

    if (isClosing.current) {
      console.log("Closure already in progress, skipping...");
      return;
    }
    isClosing.current = true;
    console.log("onCloseModal called");

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
      clientSecret: null,
    });
    setTotalAmount(null);
    setServiceCharge(0);
    setPaymentStatus("");
    setUniqueID("");
    console.log("Calling parent handleClose");
    handleClose();
    isClosing.current = false;
  }, [paymentState.paymentLoading, handleClose]);

  // Service and Team Member Fetching with Cleanup
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getServiceeDetails = async () => {
      try {
        setLoading1(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-all-services/${subdomain}`,
          { signal: controller.signal }
        );
        if (isMounted) {
          const allServices = response.data.flatMap((item) => item.services);
          setEServices(allServices);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching services:", error);
        }
      } finally {
        if (isMounted) setLoading1(false);
      }
    };

    const getTeamMemberByServiceId = async () => {
      if (!selectedService?._id) return;
      try {
        setLoading1(true);
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/team-member-by-service?ecosystemDomain=${subdomain}&serviceId=${
            selectedService._id
          }`,
          { signal: controller.signal }
        );
        if (isMounted) {
          const teamMembers = response.data.teamMembers.flatMap((item) => item);
          setTeamMember(teamMembers);
        }
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching team members:", error);
          showToast("Failed to fetch team members", "error");
        }
      } finally {
        if (isMounted) setLoading1(false);
      }
    };

    getServiceeDetails();
    getTeamMemberByServiceId();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [subdomain, selectedService?._id]);

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

  useEffect(() => {
    console.log("Information:", information);
  }, []);

  const handleDateChange = useCallback(
    (date) => {
      const normalizedDate = normalizeDate(date);
      console.log(
        "Selected date (raw):",
        date,
        "Normalized:",
        normalizedDate.toLocaleDateString(),
        "ISO:",
        normalizedDate.toISOString()
      );
      setSelectedDate((prev) => {
        if (prev?.toISOString() !== normalizedDate.toISOString()) {
          return normalizedDate;
        }
        return prev;
      });
    },
    [normalizeDate]
  );

  const handleSpecialistChange = (specialist) => {
    setSelectedSpecialist(specialist);
  };

  const disablePastDates = ({ date, view }) => {
    return view === "month" && date < new Date().setHours(0, 0, 0, 0);
  };

  const timeSlots = [
    { time: "07:30 AM", booked: false },
    { time: "08:00 AM", booked: false },
    { time: "08:30 AM", booked: false },
    { time: "09:00 AM", booked: false },
    { time: "09:30 AM", booked: false },
    { time: "10:00 AM", booked: false },
    { time: "10:30 AM", booked: false },
    { time: "11:00 AM", booked: false },
    { time: "11:30 AM", booked: false },
    { time: "12:00 PM", booked: false },
    { time: "12:30 PM", booked: false },
    { time: "01:00 PM", booked: false },
    { time: "01:30 PM", booked: false },
    { time: "02:00 PM", booked: false },
    { time: "02:30 PM", booked: false },
    { time: "03:00 PM", booked: false },
    { time: "03:30 PM", booked: false },
    { time: "04:00 PM", booked: false },
    { time: "04:30 PM", booked: false },
    { time: "05:00 PM", booked: false },
    { time: "05:30 PM", booked: false },
    { time: "06:00 PM", booked: false },
    { time: "06:30 PM", booked: false },
    { time: "07:00 PM", booked: false },
    { time: "07:30 PM", booked: false },
    { time: "08:00 PM", booked: false },
    { time: "08:30 PM", booked: false },
    { time: "09:00 PM", booked: false },
    { time: "09:30 PM", booked: false },
    { time: "10:00 PM", booked: false },
  ];

  useEffect(() => {
    disablePastTimeSlots();
  }, []);

  const disablePastTimeSlots = () => {
    const newSlots = timeSlots.map((slot) => ({
      ...slot,
      booked: slot.booked,
    }));
    setUpdatedTimeSlots(newSlots);
  };

  const handleTimeSlotSelect = (slot) => {
    if (!slot.booked) setSelectedTimeSlot(slot.time);
  };

  const handleNextStep = (nextStep) => {
    if (nextStep <= 9) setStep(nextStep);
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
    setSummary({ selectedDate, selectedTimeSlot, formData });
  };

  const handlePrint = () => {
    const printContent = document.querySelector(".printable-modal").outerHTML;
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Receipt</title>
          <style>
            @page { size: A4; margin: 0; }
            body { margin: 0; font-family: Urbanist, sans-serif; }
            .printable-modal { width: 100%; max-width: 100%; padding: 20px; box-sizing: border-box; }
            .printable-modal * { color: black !important; }
            .printable-modal .text-green-700 { background-color: #d4edda !important; color: #155724 !important; }
            .printable-modal .text-yellow-600 { background-color: #fff3cd !important; color: #856404 !important; }
            .printable-modal .bg-green-100 { background-color: #d4edda !important; }
            .printable-modal .bg-yellow-100 { background-color: #fff3cd !important; }
            .printable-modal .border-2, .printable-modal .border-t-2, .printable-modal .border-b-2 { border-color: #000 !important; }
            .printable-modal button { display: none !important; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  const generateTxRef = () => {
    const randomString = Math.random().toString(36).substring(7);
    const timestamp = Date.now();
    return `${timestamp}-${randomString}`;
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handlePay = useCallback(async () => {
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
    if (!planType) {
      showToast(
        "Plan type not received from server. Please try again.",
        "error"
      );
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
    if (isNaN(totalToPay)) {
      showToast("Invalid service price or charge", "error");
      setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
      return;
    }

    setServiceCharge(serviceCharge);
    setTotalAmount(totalToPay.toLocaleString());
    setPaymentStatus("Online");

    const paystackConfig = {
      key: import.meta.env.VITE_Paystack_PUBLIC_TEST_KEY,
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
        description: formData.details,
        location: formData.location,
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
    console.log("Paystack Config:", paystackConfig);

    try {
      const paystack = new PaystackPop();
      const transaction = await new Promise((resolve, reject) => {
        paystack.newTransaction({
          ...paystackConfig,
          onSuccess: (transaction) => {
            console.log("Paystack Success:", transaction);
            resolve(transaction);
          },
          onCancel: () => {
            console.log("Paystack Cancelled");
            showToast("Payment cancelled by user", "info");
            reject(new Error("Payment process was cancelled"));
          },
          onError: (error) => {
            console.error("Paystack Error:", error);
            showToast("Payment initialization failed", "error");
            reject(new Error("Payment initialization failed"));
          },
        });
      });

      setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
      setStep(7);
      let attempts = 0;
      const maxAttempts = 6;

      while (attempts < maxAttempts) {
        attempts++;
        console.log("Verification Attempt:", attempts);

        try {
          const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/verify-booking-status`,
            {
              creatorId: selectedSpecialist?.creatorId,
              ecosystemDomain: subdomain,
              time: selectedTimeSlot,
              date: selectedDate ? selectedDate.toDateString() : "Not selected",
              email: formData.email,
              serviceId: selectedService?._id,
            }
          );

          console.log("Verify booking response:", response);

          if (
            response.status === 201 &&
            response.data.message === "Booking verified successfully"
          ) {
            setUniqueID(
              response.data.bookingDetails?.bookingId || transaction.reference
            );
            setPaymentStatus("paid");
            showToast("Payment Verified Successfully", "success");
            setStep(8);
            return;
          }
        } catch (error) {
          if (
            error.response &&
            error.response.status === 404 &&
            error.response.data.message === "Booking Pending"
          ) {
            showToast(
              "Payment verification pending, checking again...",
              "info"
            );
            if (attempts >= maxAttempts) {
              showToast(
                "Verification timed out. Please try again later.",
                "error"
              );
              setStep(4);
              return;
            }
            await delay(15000);
          } else {
            console.error("Error verifying payment status:", error);
            showToast("Error verifying payment status", "error");
            setStep(4);
            return;
          }
        }
      }
    } catch (error) {
      console.error("Payment Error:", error.message);
      setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
      showToast(
        error.message || "Failed to initialize payment. Please try again.",
        "error"
      );
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

  const handlePayOnDelivery = useCallback(async () => {
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
    if (!planType) {
      showToast(
        "Plan type not received from server. Please try again.",
        "error"
      );
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
      "Pay on delivery"
    );
    const totalToPay = priceToSend + serviceCharge;
    if (isNaN(totalToPay)) {
      showToast("Invalid service price or charge", "error");
      setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
      return;
    }

    setServiceCharge(serviceCharge);
    setTotalAmount(totalToPay.toLocaleString());
    setPaymentStatus("Pay on delivery");

    try {
      const response = await api.submitBooking({
        ecosystemDomain: subdomain,
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        description: formData.details,
        location: formData.location,
        service: selectedService?.name,
        date: selectedDate ? selectedDate.toDateString() : "Not selected",
        time: selectedTimeSlot,
        bookingType: formData.location,
        servicePrice: priceToSend,
        paymentAmount: totalToPay,
        serviceCharge: serviceCharge,
        creatorId: selectedSpecialist?.creatorId,
        serviceId: selectedService?._id,
        timezone: timeZones,
        provider: "cash",
        currency: "NGN",
      });

      setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
      showToast(response.data.message, "success");
      setUniqueID(response.data.booking?.bookingId || "N/A");
      setPaymentStatus("Pay on delivery");
      handleNextStep(8);
    } catch (error) {
      setPaymentState((prev) => ({ ...prev, paymentLoading: false }));
      console.error("Pay on delivery error:", error);
      showToast(
        error.response?.data?.message ||
          "Failed to submit booking. Please try again.",
        "error"
      );
    }
  }, [
    formData,
    selectedService,
    selectedSpecialist,
    selectedTimeSlot,
    selectedDate,
    subdomain,
    planType,
    timeZones,
    calculateServiceCharge,
  ]);

  const handleStripeSubmit = useCallback(
    async (stripe, elements, cardElement) => {
      console.log("handleStripeSubmit called", {
        stripe: !!stripe,
        elements: !!elements,
        clientSecret: paymentState.clientSecret,
      });

      if (!stripe || !elements || !paymentState.clientSecret || !cardElement) {
        showToast("Payment setup incomplete. Please try again.", "error");
        setPaymentState((prev) => ({
          ...prev,
          paymentLoading: false,
          stripeModalOpen: false,
        }));
        return;
      }

      // Timeout to prevent hanging
      const paymentTimeout = setTimeout(() => {
        console.error("Payment processing timeout");
        showToast("Payment processing timed out. Please try again.", "error");
        setPaymentState((prev) => ({
          ...prev,
          paymentLoading: false,
          stripeModalOpen: false,
        }));
        setStep(4);
      }, 60000); // 60 seconds

      try {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          paymentState.clientSecret,
          {
            payment_method: { card: cardElement },
          }
        );

        clearTimeout(paymentTimeout);

        console.log("Stripe Payment Result:", { error, paymentIntent });

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
          return; // Keep modal open for retry
        }

        if (paymentIntent.status === "succeeded") {
          console.log("💰 Payment Successful:", paymentIntent.id);
          setPaymentState((prev) => ({
            ...prev,
            paymentLoading: false,
            stripeModalOpen: false,
          }));
          setStep(7);

          let attempts = 0;
          const maxAttempts = 5;
          const verificationTimeout = setTimeout(() => {
            console.error("Verification timeout reached");
            showToast(
              "Verification timed out. Please try again later.",
              "error"
            );
            setStep(4);
            setPaymentState((prev) => ({
              ...prev,
              paymentLoading: false,
              stripeModalOpen: false,
            }));
          }, 60000);

          while (attempts < maxAttempts) {
            attempts++;
            console.log("Verification Attempt:", attempts);

            try {
              const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/verify-booking-status`,
                {
                  creatorId: selectedSpecialist?.creatorId,
                  ecosystemDomain: subdomain,
                  time: selectedTimeSlot,
                  date: selectedDate ? selectedDate.toDateString() : null,
                  email: formData.email,
                  serviceId: selectedService?._id,
                }
              );

              console.log("Verify Booking Response:", response.data);

              if (
                response.status === 201 &&
                response.data.message === "Booking verified successfully"
              ) {
                clearTimeout(verificationTimeout);
                setUniqueID(
                  response.data.bookingDetails?.bookingId || paymentIntent.id
                );
                setPaymentStatus("Booking successful");
                showToast("Booking completed successfully!", "success");
                setStep(8);
                setPaymentState((prev) => ({
                  ...prev,
                  paymentLoading: false,
                  stripeModalOpen: false,
                }));
                return;
              }
            } catch (error) {
              if (
                error.response &&
                error.response.status === 404 &&
                error.response.data.message === "Booking Pending"
              ) {
                showToast("Booking verification pending, retrying...", "info");
                if (attempts >= maxAttempts) {
                  clearTimeout(verificationTimeout);
                  showToast(
                    "Verification timed out. Please try again later.",
                    "error"
                  );
                  setStep(4);
                  setPaymentState((prev) => ({
                    ...prev,
                    paymentLoading: false,
                    stripeModalOpen: false,
                  }));
                  return;
                }
                await delay(10000);
              } else {
                clearTimeout(verificationTimeout);
                console.error("Verification Error:", error);
                showToast("Error verifying booking.", "error");
                setStep(4);
                setPaymentState((prev) => ({
                  ...prev,
                  paymentLoading: false,
                  stripeModalOpen: false,
                }));
                return;
              }
            }
          }
          clearTimeout(verificationTimeout);
        } else {
          showToast("Payment not completed. Please try again.", "error");
          setPaymentState((prev) => ({
            ...prev,
            paymentLoading: false,
          }));
          setStep(4);
        }
      } catch (error) {
        clearTimeout(paymentTimeout);
        console.error("Payment Error:", error);
        showToast("Failed to process payment.", "error");
        setPaymentState((prev) => ({
          ...prev,
          paymentLoading: false,
        }));
        setStep(4);
      }
    },
    [
      paymentState.clientSecret,
      selectedSpecialist,
      subdomain,
      selectedTimeSlot,
      selectedDate,
      formData.email,
      selectedService,
    ]
  );

  const handlePayWithStripe = useCallback(async () => {
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
    if (!planType) {
      showToast(
        "Plan type not received from server. Please try again.",
        "error"
      );
      return;
    }

    console.log("handlePayWithStripe started");

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
    if (isNaN(totalToPay)) {
      showToast("Invalid service price or charge", "error");
      setPaymentState((prev) => ({
        ...prev,
        paymentLoading: false,
        stripeModalOpen: false,
      }));
      return;
    }

    setServiceCharge(serviceCharge);
    setTotalAmount(totalToPay.toLocaleString());
    setPaymentStatus("Online");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-payment-intent`,
        {
          amount: totalToPay * 100,
          currency: "usd",
          metadata: {
            provider: "stripe",
            ecosystemDomain: subdomain,
            email: formData.email,
            name: formData.fullName,
            phone: formData.phone,
            address: formData.address,
            description: formData.details,
            location: formData.location,
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

      console.log("Payment Intent Response:", response.data);
      const clientSecret =
        response.data.clientSecret?.client_secret || response.data.clientSecret;
      if (!clientSecret) {
        throw new Error("Client secret not received");
      }

      setPaymentState((prev) => ({
        ...prev,
        clientSecret,
        stripeModalOpen: true,
        paymentLoading: false,
      }));
      console.log("Stripe modal opened, clientSecret:", clientSecret);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      showToast(
        "Failed to initialize Stripe payment. Please try again.",
        "error"
      );
      setPaymentState((prev) => ({
        ...prev,
        paymentLoading: false,
        stripeModalOpen: false,
        clientSecret: "",
      }));
      setStep(4);
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

  useEffect(() => {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimeZones(timeZone);
    console.log("Resolved Time Zone:", timeZone);
    return () => {
      console.log("Timezone effect cleanup");
    };
  }, []);

  // Debounce utility with leading edge option
  const debounce = (func, wait, leading = false) => {
    let timeout;
    let isPending = false;

    return (...args) => {
      return new Promise((resolve) => {
        const later = () => {
          timeout = null;
          if (!leading) {
            isPending = false;
            resolve(func(...args));
          }
        };

        const shouldCallNow = leading && !timeout && !isPending;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (shouldCallNow) {
          isPending = true;
          resolve(func(...args));
        }
      });
    };
  };

  const timeToMinutes = useCallback((timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }, []);

  const fetchAvailableTimeSlots = useCallback(
    async (date) => {
      if (!selectedSpecialist?.creatorId || !selectedService?._id || !date) {
        console.log("Missing required data for fetching time slots:", {
          creatorId: selectedSpecialist?.creatorId,
          serviceId: selectedService?._id,
          date: date?.toLocaleDateString(),
        });
        setAvailableTimeSlots(timeSlots);
        showToast("Please select a service and specialist first", "error");
        return;
      }

      // Check if parameters are unchanged
      const paramsKey = JSON.stringify({
        creatorId: selectedSpecialist.creatorId,
        date: date.toISOString(),
        serviceId: selectedService._id,
      });

      if (lastFetchedParams.current === paramsKey) {
        console.log("Parameters unchanged, skipping fetch...");
        return;
      }

      if (fetchLoadingRef.current) {
        console.log("Fetch already in progress, skipping...");
        return;
      }

      fetchLoadingRef.current = true;
      setFetchLoading(true);

      try {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;

        console.log("Fetching time slots for:", {
          creatorId: selectedSpecialist.creatorId,
          formattedDate,
          serviceId: selectedService._id,
          rawDate: date.toString(),
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        });

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get-available-time/${
            selectedSpecialist.creatorId
          }/${formattedDate}/${selectedService._id}/${subdomain}`
        );

        console.log("Time slots response:", response.data);

        const {
          bookedTimes = [],
          duration: apiDuration,
          planType,
        } = response.data;

        // Fallback for duration
        const effectiveDuration =
          apiDuration || selectedService?.duration || 30;

        if (!effectiveDuration || isNaN(effectiveDuration)) {
          showToast(
            "Service duration not available. Please contact support.",
            "error"
          );
          setAvailableTimeSlots(timeSlots);
          return;
        }

        if (!planType || !["Lite", "Plus", "Pro", "Extra"].includes(planType)) {
          showToast("Invalid plan type received from server.", "error");
          setAvailableTimeSlots(timeSlots);
          return;
        }

        // Update state only if necessary
        setDuration((prev) =>
          prev !== effectiveDuration ? effectiveDuration : prev
        );
        setPlanType((prev) => (prev !== planType ? planType : prev));

        if (selectedService?.price) {
          let price = parseFloat(selectedService.price);
          if (formData.location === "Home Service") {
            price += price * 0.5;
          }
          const formattedPrice = price.toLocaleString();
          setServicePrice((prev) =>
            prev !== formattedPrice ? formattedPrice : prev
          );
          setServiceCharge(0);
          setTotalAmount(null);
        }

        const bookedSlots = new Set();
        if (bookedTimes.length > 0) {
          bookedTimes.forEach((bookedTime) => {
            const startMinutes = timeToMinutes(bookedTime);
            const slotInterval = 30;
            const slotsToBlock = Math.ceil(effectiveDuration / slotInterval);

            for (let i = 0; i < slotsToBlock; i++) {
              const slotTime = startMinutes + i * slotInterval;
              const slot = timeSlots.find(
                (s) => timeToMinutes(s.time) === slotTime
              );
              if (slot) {
                bookedSlots.add(slot.time);
              }
            }
          });
        }

        const updatedSlots = timeSlots.map((slot) => ({
          ...slot,
          booked: bookedSlots.has(slot.time),
        }));

        setAvailableTimeSlots(updatedSlots);
        lastFetchedParams.current = paramsKey; // Update last fetched parameters
      } catch (error) {
        console.error("Error fetching available time slots:", error);
        setAvailableTimeSlots(timeSlots);
        showToast(
          "Failed to fetch available time slots. Please try again.",
          "error"
        );
      } finally {
        fetchLoadingRef.current = false;
        setFetchLoading(false);
      }
    },
    [
      selectedSpecialist?.creatorId,
      selectedService?._id,
      selectedService?.duration,
      selectedService?.price,
      formData.location,
      subdomain,
      timeSlots,
      timeToMinutes,
    ]
  );

  // Memoized debounced function
  const debouncedFetchAvailableTimeSlots = useMemo(
    () => debounce(fetchAvailableTimeSlots, 300, true),
    [fetchAvailableTimeSlots]
  );

  // useEffect for fetching time slots
  useEffect(() => {
    if (
      step === 3 &&
      selectedDate &&
      selectedService?._id &&
      selectedSpecialist?.creatorId
    ) {
      const controller = new AbortController();
      console.log("useEffect triggered for fetchAvailableTimeSlots", {
        step,
        date: selectedDate.toLocaleDateString(),
        serviceId: selectedService?._id,
        creatorId: selectedSpecialist?.creatorId,
      });
      debouncedFetchAvailableTimeSlots(selectedDate, controller.signal);
      return () => {
        controller.abort();
        console.log("Time slots fetch effect cleanup");
      };
    }
  }, [
    step,
    selectedDate,
    selectedService?._id,
    selectedSpecialist?.creatorId,
    debouncedFetchAvailableTimeSlots,
  ]);

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-50">
      <DialogBackdrop
        className="fixed inset-0 bg-gray-500 bg-opacity-75"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="md:bg-[#f1f1f1] bg-white font-Urbanist w-full h-full px-6 lg:px-32 md:pb-12 py-2 overflow-y-auto">
          <div className="bg-white rounded-xl md:my-12 my-2 lg:px-12 overflow-y-auto">
            {paymentState.paymentLoading && (
              <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-60">
                <div className="bg-white p-4 rounded-lg flex items-center gap-2">
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
                  <p>Processing payment, please wait...</p>
                </div>
              </div>
            )}

            {/* Step 1: Service Details */}
            {step === 1 && (
              <>
                <div className="flex justify-between items-center pb-3 font-Urbanist md:my-4 my-3">
                  <DialogTitle className="md:text-4xl text-xl font-semibold md:px-6 px-2">
                    <br />
                    Select your preferred service or plan
                  </DialogTitle>
                  <div className="">
                    <button
                      onClick={onCloseModal}
                      className="text-sm font-bold px-2 hover:text-red-500"
                    >
                      X
                    </button>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 font-Urbanist">
                  <div className="md:hidden block w-full md:w-8/12 overflow-y-auto">
                    {loading1 ? (
                      <div className="flex justify-center items-center h-64">
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
                        <span className="ml-2">Loading services...</span>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {eServices.map((service, index) => (
                          <div
                            key={index}
                            className={`relative flex border-2 my-3 rounded-lg cursor-pointer transition-all duration-300 ${
                              selectedService?._id === service._id
                                ? "border-purple-500"
                                : "border-gray-300 hover:border-purple-500"
                            }`}
                            onClick={() => handleServiceChange(service)}
                          >
                            {service?.serviceImage && (
                              <img
                                src={service?.serviceImage}
                                alt={service.name}
                                className="md:w-32 w-24 object-cover rounded-s-lg"
                              />
                            )}
                            <div className="flex-1 p-3 md:p-8">
                              <h4 className="md:text-xl text-md font-semibold mb-1">
                                {service.name}
                              </h4>
                              <div className="flex items-center gap-1 text-gray-400 md:text-md text-xs">
                                <span>{service.shortDescription}</span>
                              </div>
                            </div>
                            <div className="flex flex-col justify-between items-end p-3 md:p-8">
                              <span className="text-lg font-bold text-gray-700">
                                {getCurrencySymbol(serviceCurrency)}
                                {service.price || "N/A"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="md:block hidden md:w-8/12 md:p-6">
                    {loading1 ? (
                      <div className="flex justify-center items-center h-64">
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
                        <span className="ml-2">Loading services...</span>
                      </div>
                    ) : (
                      <div className="grid lg:grid-cols-3 md:grid-cols-3 gap-6">
                        {eServices.map((service, index) => (
                          <div
                            key={index}
                            className={`relative flex flex-col border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                              selectedService?._id === service._id
                                ? "border-purple-500"
                                : "hover:border-purple-500"
                            }`}
                            onClick={() => handleServiceChange(service)}
                          >
                            <div className="w-full text-black rounded-lg overflow-hidden bg-white">
                              <div className="relative">
                                {service.serviceImage && (
                                  <img
                                    src={service.serviceImage}
                                    alt={service.name}
                                    className="w-full h-28 object-cover rounded-t-lg"
                                  />
                                )}
                              </div>
                              <div className="p-4">
                                <h2 className="text-md font-semibold">
                                  {service.name}
                                </h2>
                                <p className="text-gray-700 text-xs">
                                  {service.shortDescription}
                                </p>
                                <div className="flex justify-between items-center mt-1">
                                  <span className="text-md font-semibold">
                                    {getCurrencySymbol(serviceCurrency)}
                                    {service.price || "N/A"}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-full md:w-4/12 md:h-auto overflow-y-auto border md:relative left-0 rounded-xl p-4 md:p-6 my-6 sm:rounded-t-xl">
                    <h5 className="text-lg font-semibold">Booking Summary</h5>
                    <div className="relative flex border-2 my-4 rounded-lg cursor-pointer transition-all duration-300">
                      {selectedService?.serviceImage ? (
                        <img
                          src={selectedService.serviceImage}
                          alt={selectedService.name}
                          className="w-24 object-cover rounded-t-lg sm:rounded-s-lg sm:rounded-t-none"
                        />
                      ) : (
                        <div className="w-20 bg-gray-200 text-center flex items-center justify-center text-gray-500 text-sm rounded-t-lg sm:rounded-s-lg sm">
                          Kindly select service
                        </div>
                      )}
                      <div className="flex-1 p-3">
                        <h4 className="text-xs md:text-lg font-semibold mb-1">
                          {selectedService?.name || "No service selected yet"}
                        </h4>
                        <div className="flex items-center gap-1 text-gray-600 md:text-md text-xs">
                          <p className="">
                            {selectedService?.shortDescription ||
                              "No service selected yet"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end p-3">
                        <span className="text-lg font-bold text-primary3">
                          {getCurrencySymbol(serviceCurrency)}
                          {servicePrice || selectedService?.price || "N/A"}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-center text-sm">
                      Review your selection before you continue.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleNextStep(2)}
                      className={`my-2 px-6 py-3 rounded-lg shadow-md w-full transition-all duration-300 ${
                        selectedService
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Team Details */}
            {!loading1 && step === 2 && (
              <>
                <div className="flex justify-between items-center pb-3 font-Urbanist md:my-4 my-3">
                  <DialogTitle className="md:text-4xl text-xl font-semibold md:px-6 px-2">
                    <button
                      onClick={() => handlePrevStep()}
                      className="text-purple-600 text-sm hover:border-primary3 hover:border hover:p-1 hover:rounded-md transition-all duration-300"
                    >
                      {"< "}Back to services
                    </button>
                    <br />
                    Select the preferred specialist to attend to you
                  </DialogTitle>
                  <div>
                    <button
                      onClick={onCloseModal}
                      className="text-sm font-bold px-2 hover:text-red-500"
                    >
                      X
                    </button>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 font-Urbanist">
                  <div className="md:w-8/12 md:p-6">
                    <div className="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-6">
                      {teamMember.map((specialist, index) => (
                        <label
                          key={index}
                          className={`relative flex flex-col border-2 rounded-lg cursor-pointer transition-all duration-300 ${
                            selectedSpecialist?.fullName === specialist.fullName
                              ? "border-purple-500"
                              : "hover:border-purple-500"
                          }`}
                        >
                          <input
                            type="radio"
                            name="specialist"
                            value={specialist.fullName}
                            checked={
                              selectedSpecialist?.fullName ===
                              specialist.fullName
                            }
                            onChange={() => handleSpecialistChange(specialist)}
                            required
                            className="hidden peer"
                          />
                          <div className="w-full text-black text-center rounded-lg overflow-hidden bg-white">
                            <div className="relative flex justify-center mt-3">
                              {specialist.profilePicture && (
                                <img
                                  src={specialist.profilePicture}
                                  alt={specialist.fullName}
                                  className="w-2/4 h-2/6 rounded-full"
                                />
                              )}
                            </div>
                            <div className="p-4">
                              <h2 className="text-md font-semibold">
                                {specialist.fullName}
                              </h2>
                              <p className="text-gray-700 text-xs">
                                {specialist.phoneNumber}
                              </p>
                              <p className="text-gray-700 text-xs">
                                {specialist.status}
                              </p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="w-full md:w-4/12 md:h-auto overflow-y-auto border md:relative left-0 rounded-xl p-4 md:p-6 my-6 sm:rounded-t-xl">
                    <h5 className="text-lg font-semibold">Booking Summary</h5>
                    <div className="relative flex border-2 my-4 rounded-lg cursor-pointer transition-all duration-300">
                      {selectedService?.serviceImage ? (
                        <img
                          src={selectedService.serviceImage}
                          alt={selectedService.name}
                          className="w-24 object-cover rounded-s-lg"
                        />
                      ) : (
                        <div className="w-24 bg-gray-200 text-center flex items-center justify-center text-gray-500 text-xs rounded-s-lg">
                          No Image
                        </div>
                      )}
                      <div className="flex-1 p-3">
                        <h4 className="text-xs md:text-lg font-semibold mb-1">
                          {selectedService?.name || "No service selected yet"}
                        </h4>
                        <div className="flex items-center gap-1 text-gray-600 md:text-md py-2 text-xs">
                          <p>
                            To be attended to by {""}
                            {selectedSpecialist?.fullName ||
                              "No specialist selected"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end p-3">
                        <span className="text-lg font-bold text-primary3">
                          {getCurrencySymbol(serviceCurrency)}
                          {servicePrice || selectedService?.price || "N/A"}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-500 text-center text-sm">
                      Review your selection before you continue.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleNextStep(3)}
                      className={`my-2 px-6 py-3 rounded-lg shadow-md w-full transition-all duration-300 ${
                        selectedService
                          ? "bg-purple-600 text-white hover:bg-purple-700"
                          : "bg-gray-300 text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Step 3: Date and Time */}
            {!loading1 && step === 3 && (
              <div className="md:px-6">
                <div className="flex justify-between items-center pb-3 font-Urbanist">
                  <DialogTitle className="md:text-4xl text-xl font-semibold md:my-4 my-2 md:pt-2 pt-2 px-2">
                    <button
                      onClick={() => handlePrevStep(2)}
                      className="text-purple-600 text-sm hover:border-primary3 hover:border hover:p-1 hover:rounded-md transition-all duration-300"
                    >
                      {"< "}Back to specialist
                    </button>{" "}
                    <br />
                    Select the available date and time
                  </DialogTitle>
                  <div className="">
                    <button
                      onClick={onCloseModal}
                      className="text-sm font-bold px-2 hover:text-red-500"
                    >
                      X
                    </button>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-12 md:h-full">
                  <div className="w-full md:w-4/12">
                    <p className="text-gray-500 text-md mb-4">
                      Kindly select the preferred and available date.
                    </p>
                    <p className="text-purple-500 mb-4">
                      {selectedDate
                        ? selectedDate.toLocaleDateString()
                        : "No date selected"}
                    </p>
                    <Calendar
                      onChange={handleDateChange}
                      value={selectedDate || new Date()}
                      className="border-none border-2 hover:border-primary3"
                      tileDisabled={disablePastDates}
                      tileClassName={({ date, view }) =>
                        date.getDate() === new Date().getDate() &&
                        view === "month"
                          ? "bg-[#FFC145] text-white rounded-full"
                          : ""
                      }
                      nextLabel={
                        <span className="text-primary3 font-bold">&gt;</span>
                      }
                      prevLabel={
                        <span className="text-primary3 font-bold">&lt;</span>
                      }
                    />
                    <style jsx>{`
                      .react-calendar__navigation button {
                        color: #2d1c4d;
                      }
                      .react-calendar {
                        width: 100%;
                        max-width: 100%;
                        background: white;
                        font-family: Urbanist, sans-serif;
                        line-height: 1.5em;
                      }
                      .react-calendar__month-view__weekdays {
                        text-align: center;
                        text-transform: uppercase;
                        font-weight: bold;
                        font-size: 0.75em;
                      }
                      .react-calendar__month-view__weekdays__weekday {
                        color: #2d1c4d;
                      }
                      .react-calendar__tile {
                        color: #2d1c4d;
                      }
                      .react-calendar__tile--active {
                        background-color: #fff !important;
                        color: #9f68fe !important;
                        border-radius: 30%;
                        border: 2px solid #9f68fe !important;
                        font-size: 1em;
                      }
                      .react-calendar__tile a {
                        text-decoration: none !important;
                      }
                    `}</style>
                  </div>
                  <div className="w-full md:w-8/12">
                    <p className="text-gray-500 mb-4 text-md">
                      Kindly select the preferred available time
                    </p>
                    <p className="text-purple-500 mb-4">
                      {selectedTimeSlot
                        ? selectedTimeSlot
                        : "No Time has not been selected"}
                    </p>
                    {fetchLoading ? (
                      <div className="flex justify-center items-center">
                        <svg
                          className="animate-spin h-5 w-5 mr-2 border-t-2 border-purple-600 rounded-full"
                          viewBox="0 0 24 24"
                        ></svg>
                        <span>Loading time slots...</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-2">
                        {availableTimeSlots.map((slot, index) => (
                          <button
                            key={index}
                            onClick={() => handleTimeSlotSelect(slot)}
                            className={`p-2 border-2 hover:border-primary3 rounded-md ${
                              selectedTimeSlot === slot.time
                                ? "border-primary3 border-2 text-primary3"
                                : "bg-white text-gray-700"
                            } ${
                              slot.booked ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                            disabled={slot.booked}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="w-full md:hidden block bg-white md:rounded-xl rounded-t-2xl p-2 md:p-6 sm:rounded-t-xl transition-all duration-300">
                    <h5 className="text-lg font-semibold text-gray-800">
                      Booking Summary
                    </h5>
                    <div className="relative flex border-2 my-4 rounded-lg cursor-pointer transition-all duration-300">
                      {selectedService?.serviceImage ? (
                        <img
                          src={selectedService.serviceImage}
                          alt={selectedService.name}
                          className="w-24 object-cover rounded-s-lg"
                        />
                      ) : (
                        <div className="w-24 bg-gray-200 text-center flex items-center justify-center text-gray-500 text-xs rounded-s-lg">
                          No Image
                        </div>
                      )}
                      <div className="flex-1 p-3">
                        <h4 className="text-xs md:text-lg font-semibold mb-1">
                          {selectedService?.name || "No service selected yet"}
                        </h4>
                        <div className="flex items-center gap-1 text-gray-600 md:text-md py-2 text-xs">
                          <p>
                            To be attended to by {""}
                            {selectedSpecialist?.fullName ||
                              "No specialist selected"}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600 md:text-md text-xs">
                          <p>
                            Date & Time: {""}
                            {selectedDate?.toLocaleDateString() ||
                              "Not selected"}
                          </p>
                          <p>{selectedTimeSlot || "Not selected"}</p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end p-3">
                        <span className="text-lg font-bold text-primary3">
                          {getCurrencySymbol(serviceCurrency)}
                          {servicePrice || selectedService?.price || "N/A"}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleNextStep(4)}
                      className={`bg-primary3 text-white py-2 w-full px-4 rounded-md ${
                        selectedTimeSlot === null || !planType
                          ? "opacity-70"
                          : "opacity-100"
                      }`}
                      disabled={selectedTimeSlot === null || !planType}
                    >
                      Continue
                    </button>
                  </div>
                </div>
                <div className="w-full hidden md:block bg-white md:rounded-xl rounded-t-2xl p-2 md:p-6 sm:rounded-t-xl transition-all duration-300">
                  <h5 className="text-lg font-semibold text-gray-800">
                    Booking Summary
                  </h5>
                  <div className="relative flex border-2 my-4 rounded-lg cursor-pointer transition-all duration-300">
                    {selectedService?.serviceImage ? (
                      <img
                        src={selectedService.serviceImage}
                        alt={selectedService.name}
                        className="w-24 object-cover rounded-s-lg"
                      />
                    ) : (
                      <div className="w-24 bg-gray-200 text-center flex items-center justify-center text-gray-500 text-xs rounded-s-lg">
                        No Image
                      </div>
                    )}
                    <div className="flex-1 p-3">
                      <h4 className="text-xs md:text-lg font-semibold mb-1">
                        {selectedService?.name ||
                          "No service or plan selected yet"}
                      </h4>
                      <div className="flex items-center gap-1 text-gray-600 md:text-md py-2 text-xs">
                        <p>
                          To be attended to by {""}
                          {selectedSpecialist?.fullName ||
                            "No specialist selected"}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 md:text-md text-xs">
                        <p>
                          Date & Time: {""}
                          {selectedDate?.toLocaleDateString() ||
                            "Time not selected"}{" "}
                          |
                        </p>
                        <p>{selectedTimeSlot || "Date not selected"}</p>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end p-3">
                      <span className="text-lg font-bold text-primary3">
                        {getCurrencySymbol(serviceCurrency)}
                        {servicePrice || selectedService?.price || "N/A"}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleNextStep(4)}
                        className={`bg-primary3 text-white py-2 px-4 rounded-md ${
                          selectedTimeSlot === null || !planType
                            ? "opacity-70"
                            : "opacity-100"
                        }`}
                        disabled={selectedTimeSlot === null || !planType}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Enter Your Details */}
            {!loading1 && step === 4 && (
              <>
                <div className="flex justify-between items-center pb-3 font-Urbanist md:my-4 my-6 md:px-6">
                  <DialogTitle className="md:text-4xl text-2xl font-semibold">
                    <button
                      onClick={() => handlePrevStep()}
                      className="text-purple-600 text-sm hover:border-primary3 hover:border hover:p-1 hover:rounded-md transition-all duration-300"
                    >
                      {"< "}Back to date and time
                    </button>
                    <br />
                    Enter your details
                  </DialogTitle>

                  <div className="">
                    <button
                      onClick={onCloseModal}
                      className="text-sm font-bold px-2 hover:text-red-500"
                    >
                      X
                    </button>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 mb-6 font-Urbanist md:px-6">
                  <div className="w-full md:w-8/12 overflow-y-auto">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                        <div>
                          <label className="block text-lg font-semibold mb-3">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleFormChange}
                            required
                            className="border-1 border-slate-500 p-2 md:w-[90%] w-full rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-lg font-semibold mb-3">
                            Email
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                            className="border-1 border-slate-500 p-2 md:w-[90%] w-full rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-lg font-semibold mb-3">
                            Phone
                          </label>
                          <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                            required
                            className="border-1 border-slate-500 p-2 md:w-[90%] w-full rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-lg font-semibold mb-3">
                            Service Type
                          </label>
                          <select
                            name="location"
                            value={formData.location}
                            onChange={handleFormChange}
                            required
                            className="border-1 border-slate-500 p-2 md:w-[90%] w-full rounded-xl"
                          >
                            <option value="">Select preferred location</option>
                            <option value="Shop">Walk-in/Shop</option>
                            {/* <option value="Home Service">Home Service</option> */}
                          </select>
                          <p className="text-yellow-500 mt-4 text-sm">
                            Kindly note selecting that home service
                            automatically incurs logistics fee added to the
                            price.
                          </p>
                        </div>
                        <div>
                          <label className="block text-lg font-semibold mb-3">
                            Address (For Home service)
                          </label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleFormChange}
                            required
                            className="border-1 border-slate-500 p-2 md:w-[90%] w-full rounded-xl"
                          />
                        </div>
                        <div className="mb-6">
                          <label className="block text-lg font-semibold mb-3">
                            Additional Information (For Home Service)
                          </label>
                          <textarea
                            name="details"
                            value={formData.details}
                            onChange={handleFormChange}
                            required
                            className="border-1 border-slate-500 p-2 md:w-[90%] w-full rounded-xl"
                          ></textarea>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="w-full md:w-4/12 md:border bg-white md:rounded-xl rounded-t-2xl p-2 md:p-6 sm:rounded-t-xl transition-all duration-300">
                    <h5 className="text-lg font-semibold text-gray-800">
                      Booking Summary
                    </h5>
                    <div className="relative flex border-2 my-4 rounded-lg transition-all duration-300">
                      {selectedService?.serviceImage ? (
                        <img
                          src={selectedService.serviceImage}
                          alt={selectedService.name}
                          className="w-24 object-cover rounded-s-lg"
                        />
                      ) : (
                        <div className="w-24 bg-gray-200 text-center flex items-center justify-center text-gray-500 text-xs rounded-s-lg">
                          No Image
                        </div>
                      )}
                      <div className="flex-1 pt-3 pl-3">
                        <h4 className="text-sm md:text-md font-semibold text-gray-900">
                          {selectedService?.name || " No service selected"}
                        </h4>
                        <p className="text-gray-500 text-xs md:text-sm">
                          {selectedDate?.toLocaleDateString() ||
                            "No date selected"}{" "}
                          | {selectedTimeSlot || "No time selected"}
                        </p>
                        <div className="flex items-center gap-1 text-gray-600 md:text-md py-2 text-xs">
                          <p>
                            To be attended to by:{""}
                            {selectedSpecialist?.fullName ||
                              "No specialist selected"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-end p-3">
                        <span className="text-lg font-bold text-primary3">
                          {getCurrencySymbol(serviceCurrency)}
                          {servicePrice || selectedService?.price || "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg text-gray-700 text-sm">
                      <p className="">
                        <strong>Full Name:</strong>{" "}
                        {formData.fullName || "Not provided"}
                      </p>
                      <p className="pt-2">
                        <strong>Email:</strong>{" "}
                        {formData.email || "Not provided"}
                      </p>
                      <p className="pt-2">
                        <strong>Phone:</strong>{" "}
                        {formData.phone || "Not provided"}
                      </p>
                      <p className="pt-2">
                        <strong>Service Type:</strong>{" "}
                        {formData.location || "Not selected"}
                      </p>
                      <p className="pt-2">
                        <strong>Address:</strong>{" "}
                        {formData.address || "Not provided"}
                      </p>
                      <p className="pt-2">
                        <strong>Additional Details:</strong>{" "}
                        {formData.details || "No additional details"}
                      </p>
                    </div>
                    <p className="text-gray-500 text-center text-xs mt-3">
                      Kindly review the provided details before you continue.
                    </p>
                    {planType && servicePrice && (
                      <>
                        <span className="text-sm text-gray-600">
                          Online Service Charge:{" "}
                          {getCurrencySymbol(serviceCurrency)}
                          {calculateServiceCharge(
                            parseFloat(servicePrice.replace(/,/g, "")),
                            planType,
                            "Online"
                          ).toLocaleString()}
                          <br />
                          <span className="text-xs text-gray-500">
                            (Transaction fee for immediate payment to secure
                            your slot)
                          </span>
                        </span>

                        <br />
                        <span className="text-sm text-gray-600 mt-1">
                          Pay at Shop Service Charge:{" "}
                          {getCurrencySymbol(serviceCurrency)}
                          {calculateServiceCharge(
                            parseFloat(servicePrice.replace(/,/g, "")),
                            planType,
                            "Pay on delivery"
                          ).toLocaleString()}
                          <br />
                          <span className="text-xs text-gray-500">
                            (Fixed fee for in-person payment, slot not
                            guaranteed)
                          </span>
                        </span>
                      </>
                    )}
                    <div className="flex flex-col gap-3 mt-4">
                      {/* Render Pay Now button only if currency is NGN */}
                      {serviceCurrency === "NGN" && (
                        <button
                          type="button"
                          onClick={handlePay}
                          disabled={
                            paymentState.paymentLoading || !selectedService
                          }
                          className={`px-6 py-3 rounded-lg shadow-md w-full transition-all duration-300 ${
                            selectedService && !paymentState.paymentLoading
                              ? "bg-purple-600 text-white hover:bg-purple-700"
                              : "bg-gray-300 text-gray-600 cursor-not-allowed"
                          }`}
                        >
                          {paymentState.paymentLoading
                            ? "Processing..."
                            : "Pay Now - recommended"}
                        </button>
                      )}

                      {/* Render Pay with Stripe if not NGN */}
                      {serviceCurrency !== "NGN" && (
                        <button
                          type="button"
                          onClick={handlePayWithStripe}
                          disabled={
                            paymentState.paymentLoading || !selectedService
                          }
                          className={`px-6 py-3 rounded-lg shadow-md w-full transition-all duration-300 ${
                            selectedService && !paymentState.paymentLoading
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-gray-300 text-gray-600 cursor-not-allowed"
                          }`}
                        >
                          {paymentState.paymentLoading
                            ? "Processing..."
                            : "Pay with Stripe"}
                        </button>
                      )}

                      {/* Always show Pay at Shop */}
                      <button
                        type="button"
                        onClick={handlePayOnDelivery}
                        disabled={
                          paymentState.paymentLoading || !selectedService
                        }
                        className={`px-6 py-3 border border-purple-600 text-purple-600 rounded-lg w-full transition-all duration-300 ${
                          selectedService && !paymentState.paymentLoading
                            ? "hover:bg-purple-200"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        {paymentState.paymentLoading
                          ? "Processing..."
                          : "Pay at shop"}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Step 5: Payment Options */}
            {!loading1 && step === 5 && (
              <>
                <div className="flex justify-between items-center pb-3 font-Urbanist md:my-4 my-6 md:p-6">
                  <DialogTitle className="md:text-4xl text-2xl font-semibold">
                    <button
                      onClick={() => handlePrevStep()}
                      className="text-purple-600 text-sm hover:border-primary3 hover:border hover:p-1 hover:rounded-md transition-all duration-300"
                    >
                      {"<"} Back to details
                    </button>
                    <br />
                    Select Payment Method
                  </DialogTitle>
                  <button
                    onClick={onCloseModal}
                    className="text-sm font-bold px-2 hover:text-red-500"
                  >
                    X
                  </button>
                </div>
                <div className="flex flex-col md:flex-row gap-4 font-Urbanist md:p-6">
                  <div className="w-full md:w-8/12">
                    <div className="space-y-4">
                      <button
                        onClick={handlePayWithStripe}
                        disabled={paymentState.paymentLoading}
                        className={`w-full p-4 border-2 rounded-lg text-left ${
                          paymentState.paymentLoading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:border-purple-500"
                        }`}
                      >
                        <h4 className="text-lg font-semibold">
                          Pay with Card (Stripe)
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Secure payment via Stripe. Pay now to confirm your
                          booking.
                        </p>
                      </button>
                      <button
                        onClick={handlePay}
                        disabled={paymentState.paymentLoading}
                        className={`w-full p-4 border-2 rounded-lg text-left ${
                          paymentState.paymentLoading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:border-purple-500"
                        }`}
                      >
                        <h4 className="text-lg font-semibold">
                          Pay with Paystack
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Pay securely using Paystack for instant confirmation.
                        </p>
                      </button>
                      <button
                        onClick={handlePayOnDelivery}
                        disabled={paymentState.paymentLoading}
                        className={`w-full p-4 border-2 rounded-lg text-left ${
                          paymentState.paymentLoading
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:border-purple-500"
                        }`}
                      >
                        <h4 className="text-lg font-semibold">
                          Pay on Delivery
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Pay in cash when the service is delivered.
                        </p>
                      </button>
                    </div>
                  </div>
                  <div className="w-full md:w-4/12 md:h-auto overflow-y-auto border rounded-xl p-4 md:p-6 my-6">
                    <h5 className="text-lg font-semibold">Booking Summary</h5>
                    <div className="relative flex border-2 my-4 rounded-lg">
                      {selectedService?.serviceImage ? (
                        <img
                          src={selectedService.serviceImage}
                          alt={selectedService.name}
                          className="w-24 object-cover rounded-s-lg"
                        />
                      ) : (
                        <div className="w-24 bg-gray-200 text-center flex items-center justify-center text-gray-500 text-xs rounded-s-lg">
                          No Image
                        </div>
                      )}
                      <div className="flex-1 p-3">
                        <h4 className="text-sm md:text-lg font-semibold mb-1">
                          {selectedService?.name || "No service selected"}
                        </h4>
                        <p className="text-gray-600 text-xs md:text-sm">
                          {selectedDate?.toLocaleDateString() ||
                            "No date selected"}{" "}
                          | {selectedTimeSlot || "No time selected"}
                        </p>
                        <div className="flex items-center gap-1 text-gray-600 md:text-md py-2 text-xs">
                          <p>
                            To be attended to by{" "}
                            {selectedSpecialist?.fullName ||
                              "No specialist selected"}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end p-3">
                        <span className="text-lg font-bold text-primary3">
                          {getCurrencySymbol(serviceCurrency)}
                          {servicePrice || selectedService?.price || "N/A"}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg text-gray-700 text-sm">
                      <p>
                        <strong>Full Name:</strong>{" "}
                        {formData.fullName || "Not provided"}
                      </p>
                      <p className="pt-2">
                        <strong>Email:</strong>{" "}
                        {formData.email || "Not provided"}
                      </p>
                      <p className="pt-2">
                        <strong>Phone:</strong>{" "}
                        {formData.phone || "Not provided"}
                      </p>
                      <p className="pt-2">
                        <strong>Service Type:</strong>{" "}
                        {formData.location || "Not selected"}
                      </p>
                      <p className="pt-2">
                        <strong>Address:</strong>{" "}
                        {formData.address || "Not provided"}
                      </p>
                      <p className="pt-2">
                        <strong>Additional Details:</strong>{" "}
                        {formData.details || "No additional details"}
                      </p>
                    </div>
                    <p className="text-gray-500 text-center text-sm mt-3">
                      Review your payment selection before proceeding.
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Step 7: Payment Verification */}
            {!loading1 && step === 7 && (
              <div className="flex flex-col items-center justify-center h-full md:p-6">
                <div className="bg-white rounded-lg p-6 text-center">
                  <svg
                    className="animate-spin h-8 w-8 text-purple-600 mx-auto mb-4"
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
                  <h3 className="text-2xl font-semibold mb-2">
                    Verifying Payment
                  </h3>
                  <p className="text-gray-600">
                    Please wait while we verify your payment. This may take a
                    few moments.
                  </p>
                </div>
              </div>
            )}

            {/* Step 8: Success */}
            {!loading1 && step === 8 && (
              <div className="printable-modal md:p-6">
                <div className="flex justify-between items-center pb-3 font-Urbanist md:my-4 my-6">
                  <DialogTitle className="md:text-4xl text-2xl font-semibold">
                    Booking Confirmation
                  </DialogTitle>
                  <button
                    onClick={onCloseModal}
                    className="text-sm font-bold px-2 hover:text-red-500"
                  >
                    X
                  </button>
                </div>
                <div className="flex flex-col items-center justify-center">
                  <FaCheckCircle className="text-green-500 text-6xl mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">
                    Booking Confirmed!
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    Your booking has been successfully confirmed. Below are the
                    details of your booking.
                  </p>
                  <div className="w-full bg-gray-100 p-6 rounded-lg text-gray-700 text-sm">
                    <p>
                      <strong>Booking ID:</strong> {uniqueID || "N/A"}
                    </p>
                    <p className="pt-2">
                      <strong>Service:</strong>{" "}
                      {selectedService?.name || "Not selected"}
                    </p>
                    <p className="pt-2">
                      <strong>Specialist:</strong>{" "}
                      {selectedSpecialist?.fullName || "Not selected"}
                    </p>
                    <p className="pt-2">
                      <strong>Date & Time:</strong>{" "}
                      {selectedDate?.toLocaleDateString() || "Not selected"} |{" "}
                      {selectedTimeSlot || "Not selected"}
                    </p>
                    <p className="pt-2">
                      <strong>Full Name:</strong>{" "}
                      {formData.fullName || "Not provided"}
                    </p>
                    <p className="pt-2">
                      <strong>Email:</strong> {formData.email || "Not provided"}
                    </p>
                    <p className="pt-2">
                      <strong>Phone:</strong> {formData.phone || "Not provided"}
                    </p>
                    <p className="pt-2">
                      <strong>Service Type:</strong>{" "}
                      {formData.location || "Not selected"}
                    </p>
                    <p className="pt-2">
                      <strong>Address:</strong>{" "}
                      {formData.address || "Not provided"}
                    </p>
                    <p className="pt-2">
                      <strong>Additional Details:</strong>{" "}
                      {formData.details || "No additional details"}
                    </p>
                    <p className="pt-2">
                      <strong>Service Price:</strong>{" "}
                      {getCurrencySymbol(serviceCurrency)}
                      {servicePrice || selectedService?.price || "N/A"}
                    </p>
                    <p className="pt-2">
                      <strong>Service Charge:</strong>{" "}
                      {getCurrencySymbol(serviceCurrency)}
                      {serviceCharge.toLocaleString()}
                    </p>
                    <p className="pt-2">
                      <strong>Total Amount:</strong>{" "}
                      {getCurrencySymbol(serviceCurrency)}
                      {totalAmount || "N/A"}
                    </p>
                    <p className="pt-2">
                      <strong>Payment Status:</strong>{" "}
                      {paymentStatus || "Pending"}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={handlePrint}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Print Receipt
                    </button>
                    <button
                      onClick={onCloseModal}
                      className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-200"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
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
              totalAmount={totalAmount} // Pass raw totalAmount without formatting
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
