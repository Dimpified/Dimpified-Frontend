import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { showToast } from "../../component/ShowToast";

const StripePaymentForm = ({
  stripeModalOpen,
  onClose,
  submitHandler,
  paymentLoading,
  clientSecret,
  totalAmount,
  selectedService,
  selectedSpecialist,
  selectedDate,
  selectedTimeSlot,
  formData,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isCardElementReady, setIsCardElementReady] = useState(false);
  const formRef = useRef(null);
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    console.log(`StripePaymentForm rendered ${renderCount.current} times`, {
      stripeModalOpen,
      paymentLoading,
      clientSecret,
      stripeReady: !!stripe,
      elementsReady: !!elements,
    });
    return () => {
      console.log("StripePaymentForm unmounted");
    };
  }, [stripeModalOpen, paymentLoading, clientSecret, stripe, elements]);

  const handleCardElementReady = useCallback(() => {
    console.log("CardElement is ready");
    setIsCardElementReady(true);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("Form submit triggered");

      if (!stripe || !elements || !clientSecret) {
        console.error("Stripe not initialized", { stripe, elements, clientSecret });
        showToast("Payment system not ready. Please try again.", "error");
        return;
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        console.error("Card element not found");
        showToast("Card details not complete. Please check your input.", "error");
        return;
      }

      await submitHandler(stripe, elements, cardElement);
    },
    [stripe, elements, clientSecret, submitHandler]
  );

  const handleClose = useCallback(() => {
    if (paymentLoading) {
      showToast("Payment is processing. Please wait.", "info");
      return;
    }
    console.log("Closing StripePaymentForm");
    onClose();
  }, [paymentLoading, onClose]);

  if (!stripeModalOpen) return null;

  return (
    <Dialog open={stripeModalOpen} onClose={handleClose} className="relative z-[70]">
      <DialogBackdrop className="fixed inset-0 bg-gray-800 bg-opacity-80" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
          <DialogTitle className="text-lg font-semibold mb-4">
            Complete Payment
          </DialogTitle>
          <div className="mb-4 bg-gray-100 p-4 rounded-lg text-sm text-gray-700">
            <h4 className="font-semibold mb-2">Payment Summary</h4>
            <p>
              <strong>Service:</strong> {selectedService?.name || "N/A"}
            </p>
            <p>
              <strong>Specialist:</strong> {selectedSpecialist?.fullName || "N/A"}
            </p>
            <p>
              <strong>Date & Time:</strong>{" "}
              {selectedDate?.toLocaleDateString() || "N/A"} | {selectedTimeSlot || "N/A"}
            </p>
            <p>
              <strong>Location:</strong> {formData?.location || "N/A"}
            </p>
            <p>
              <strong>Total Amount:</strong> ${totalAmount || "0.00"} USD
            </p>
          </div>
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="border p-3 rounded mb-4">
              <CardElement
                onReady={handleCardElementReady}
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": { color: "#aab7c4" },
                    },
                    invalid: { color: "#9e2146" },
                  },
                }}
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={paymentLoading}
                className={`px-4 py-2 border border-gray-300 rounded-md text-gray-700 ${
                  paymentLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!stripe || !elements || !isCardElementReady || paymentLoading}
                className={`px-4 py-2 rounded-md ${
                  !stripe || !elements || !isCardElementReady || paymentLoading
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {paymentLoading ? "Processing..." : "Pay Now"}
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default React.memo(StripePaymentForm);