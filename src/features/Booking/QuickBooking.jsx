import React from "react";
import { PaystackButton } from "react-paystack";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

const BookingModal = ({ isOpen, onClose, selectedService }) => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
  });

  const [status, setStatus] = React.useState("initial"); // 'initial', 'success', 'pending', 'failure'

  const publicKey = import.meta.env.VITE_Paystack_PUBLIC_KEY;

  if (!isOpen || !selectedService) return null;

  const isFormValid = form.name && form.email && form.phone;

  const handleSuccess = () => {
    // Simulate pending or success (optional logic could be added to check backend)
    setStatus("success");
  };

  const handleFailure = () => {
    setStatus("failure");
  };

  const componentProps = {
    email: form.email,
    amount: selectedService?.price * 100,
    metadata: {
      name: form.name,
      phone: form.phone,
      service: selectedService?.title,
      img: selectedService?.imageUrl,
    },
    publicKey,
    text: "Confirm & Pay",
    onSuccess: handleSuccess,
    onClose: handleFailure,
  };

  const resetModal = () => {
    setStatus("initial");
    setForm({ name: "", email: "", phone: "" });
    onClose();
  };

  const renderStatusIcon = () => {
    switch (status) {
      case "success":
        return <FaCheckCircle className="text-5xl text-green-500" />;
      case "failure":
        return <FaTimesCircle className="text-5xl text-red-500" />;
      case "pending":
        return <FaClock className="text-5xl text-yellow-500" />;
    }
  };

  const renderStatusMessage = () => {
    switch (status) {
      case "success":
        return {
          title: "Payment Successful!",
          message: `You have successfully booked the ${selectedService.title} service.`,
          highlight: "Screenshot and show this to the service provider.",
          color: "text-green-600",
        };
      case "failure":
        return {
          title: "Payment Failed!",
          message: `We couldn’t process your payment for ${selectedService.title}.`,
          highlight: "Try again or use a different method.",
          color: "text-red-600",
        };
      case "pending":
        return {
          title: "Payment Pending!",
          message: `Your booking for ${selectedService.title} is in progress.`,
          highlight: "You’ll get an email once confirmed.",
          color: "text-yellow-600",
        };
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 px-3 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 font-Urbanist max-h-[90vh] overflow-y-auto">
        {status !== "initial" ? (
          <div>
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-2xl font-semibold text-center w-full">
                {renderStatusMessage().title}
              </h3>
            </div>

            <div className="flex flex-col justify-center items-center">
              {renderStatusIcon()}
              <p
                className={`${
                  renderStatusMessage().color
                } text-center text-lg mt-4`}
              >
                {renderStatusMessage().message}
              </p>
              <p className="text-sm text-gray-600 text-center mt-2">
                {renderStatusMessage().highlight}
              </p>

              <div className="bg-gray-100 mt-6 p-4 rounded-xl text-sm text-gray-700 w-full">
                <p>
                  <strong>Full Name:</strong> {form.name}
                </p>
                <p className="pt-2">
                  <strong>Email:</strong> {form.email}
                </p>
                <p className="pt-2">
                  <strong>Phone:</strong> {form.phone}
                </p>
                <p className="pt-2">
                  <strong>Service:</strong> {selectedService.title}
                </p>
                <p className="pt-2">
                  <strong>Price:</strong> ₦{selectedService.price}
                </p>
              </div>

              <div className="mt-6 space-y-3 w-full flex flex-col items-center">
                {/* {status === "success" && (
                  <button
                    className="w-full py-2 border border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white rounded-lg transition"
                    onClick={() => alert("Viewing invoice...")}
                  >
                    View Invoice
                  </button>
                )} */}
                <button
                  className="w-full py-2 border border-gray-400 text-gray-700 hover:bg-gray-100 rounded-lg transition"
                  onClick={resetModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <h5 className="text-lg font-semibold text-gray-800">
              Please enter your details
            </h5>
            <input
              type="text"
              placeholder="Full Name"
              className="border-[1.4px] p-2 w-full rounded-xl"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="border-[1.4px] p-2 w-full rounded-xl"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              className="border-[1.4px] p-2 w-full rounded-xl"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <p className="text-gray-500 text-center text-sm mt-3">
              Kindly review the provided details before you continue.
            </p>
            <div className="relative flex border-2 my-4 rounded-lg">
              <img
                src={selectedService.imageUrl}
                alt={selectedService.title}
                className="w-auto h-20 object-cover rounded-l-lg"
              />
              <div className="flex-1 p-3">
                <h4 className="text-sm md:text-md font-semibold mb-1">
                  {selectedService.title}
                </h4>
                <p className="text-xs text-gray-600">
                  {selectedService.description}
                </p>
              </div>
              <div className="flex items-center p-3">
                <span className="text-md font-bold text-gray-800">
                  ₦{selectedService.price}
                </span>
              </div>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg text-gray-700 text-sm">
              <p>
                <strong>Full Name:</strong> {form.name || "Not provided"}
              </p>
              <p className="pt-2">
                <strong>Email:</strong> {form.email || "Not provided"}
              </p>
              <p className="pt-2">
                <strong>Phone:</strong> {form.phone || "Not provided"}
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4">
              <PaystackButton
                {...componentProps}
                className={`transition py-3 px-6 rounded-full w-full md:w-auto text-white ${
                  isFormValid
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!isFormValid}
              />
              <button
                onClick={resetModal}
                className="hover:text-white hover:bg-red-600 border-2 border-red-600 text-red-600 py-3 px-6 rounded-full w-full md:w-auto transition"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
