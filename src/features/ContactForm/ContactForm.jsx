import React, { useState } from "react";
import {
  FiMail,
  FiUser,
  FiPhone,
  FiAlertCircle,
  FiMessageSquare,
} from "react-icons/fi";
import { showToast } from "../../component/ShowToast";
import api from "../../api/Template";

const WhiteContactForm = ({ecosystemDomain}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    reason: "",
    message: "",
    ecosystemDomain
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.fullname = "Full name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email format";
    if (!formData.phoneNumber.match(/^\d{10,15}$/))
      newErrors.phoneNumber = "Phone number must be in digits only";
    if (!formData.reason.trim()) newErrors.reason = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please correct the errors before submitting.", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.userContactForm(formData);

      if (response) {
        showToast("Message sent successfully!", "success");
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          reason: "",
          message: "",
        });
        setErrors({});
      }
    } catch (error) {
      console.error("Error occurred:", error);
      console.error("Error details:", error.response?.data || error.message);
      showToast(error.message || "Failed to send message", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-transparent p-4">
      <div className="bg-transparent px-4 py-6 md:max-w-5xl w-full">
        <h2 className="text-sm text-center text-gray-700 mb-2 uppercase">
          Get in Touch with Us
        </h2>
        <h1 className="text-4xl font-semibold text-center mb-6">
          How can we help you?
        </h1>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {[
            {
              label: "FULL NAME",
              name: "name",
              placeholder: "What’s your full name?",
              icon: <FiUser />,
            },
            {
              label: "EMAIL ADDRESS",
              name: "email",
              placeholder: "Enter your email address",
              icon: <FiMail />,
            },
            {
              label: "PHONE NUMBER",
              name: "phoneNumber",
              placeholder: "Enter your phone number",
              icon: <FiPhone />,
            },
            {
              label: "YOUR SUBJECT",
              name: "reason",
              placeholder: "How can we help you?",
              icon: <FiMessageSquare />,
            },
          ].map((field, index) => (
            <div key={index} className="relative my-3">
              <label className="block font-medium text-sm text-gray-600">
                {field.label}*
              </label>
              <div className="flex items-center ">
                {field.icon}
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full p-3 border-0 border-b text-sm border-gray-600 focus:outline-none focus:ring-2 bg-transparent focus:ring-white ${
                    errors[field.name]
                      ? "focus:border-red-500"
                      : "focus:border-yellow-500"
                  }`}
                />
                {errors[field.name] && (
                  <FiAlertCircle
                    className="text-red-500 cursor-pointer ml-3"
                    title={errors[field.name]}
                  />
                )}
              </div>
            </div>
          ))}

          <div className="col-span-1 md:col-span-2">
            <label className="block font-medium bg-transparent text-sm text-gray-600">
              YOUR MESSAGE*
            </label>
            <textarea
              name="message"
              placeholder="Describe your message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-3 border-0 bg-transparent border-b border-gray-600 focus:outline-none focus:ring-2 focus:ring-white ${
                errors.message
                  ? "focus:border-red-500"
                  : "focus:border-yellow-500"
              } h-32`}
            ></textarea>
            {errors.message && (
              <FiAlertCircle
                className="text-red-500 cursor-pointer ml-2"
                title={errors.message}
              />
            )}
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-between items-center">
            <p className="text-sm text-gray-500 hidden md:block">
              We are committed to protecting your privacy. We will never collect
              information about you without your explicit consent.
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className={`py-3 px-6 bg-gray-500 text-white font-semibold hidden md:block rounded-lg transition 
    ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                    viewBox="0 0 24 24"
                  ></svg>
                  Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </div>

          <div className="block md:hidden justify-between items-center">
            <p className="text-sm text-gray-500 pb-6">
              We are committed to protecting your privacy. We will never collect
              information about you without your explicit consent.
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className={`py-3 px-6 bg-yellow-500 text-white font-semibold block md:hidden rounded-lg transition 
    ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                    viewBox="0 0 24 24"
                  ></svg>
                  Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const BlackContactForm = ({ ecosystemDomain }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    reason: "",
    message: "",
    ecosystemDomain,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.fullname = "Full name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email format";
    if (!formData.phoneNumber.match(/^\d{10,15}$/))
      newErrors.phoneNumber = "Phone number must be in digits only";
    if (!formData.reason.trim()) newErrors.reason = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      showToast("Please correct the errors before submitting.", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.userContactForm(formData);
      if (response) {
        showToast("Message sent successfully!", "success");
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          reason: "",
          message: "",
        });
        setErrors({});
      }
    } catch (error) {
      showToast(error.message || "Failed to send message", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#111111] p-4">
      <div className="bg-[#111111] px-4 py-6 md:max-w-5xl w-full">
        <h2 className="text-sm text-center text-white mb-2 uppercase">
          Get in Touch with Us
        </h2>
        <h1 className="text-4xl font-semibold text-white text-center mb-6">
          How can we help you?
        </h1>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          onSubmit={handleSubmit}
        >
          {[
            {
              label: "FULL NAME",
              name: "name",
              placeholder: "What’s your full name?",
              icon: <FiUser />,
            },
            {
              label: "EMAIL ADDRESS",
              name: "email",
              placeholder: "Enter your email address",
              icon: <FiMail />,
            },
            {
              label: "PHONE NUMBER",
              name: "phoneNumber",
              placeholder: "Enter your phone number",
              icon: <FiPhone />,
            },
            {
              label: "YOUR SUBJECT",
              name: "reason",
              placeholder: "How can we help you?",
              icon: <FiMessageSquare />,
            },
          ].map((field, index) => (
            <div key={index} className="relative my-3">
              <label className="block font-medium text-sm text-white">
                {field.label}*
              </label>
              <div className="flex items-center text-white">
                {field.icon}
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full p-3 border-0 border-b text-sm border-white bg-[#111111] text-white focus:outline-none focus:ring-2 focus:ring-[#111111] ${
                    errors[field.name]
                      ? "focus:border-red-500"
                      : "focus:border-yellow-300"
                  }`}
                />
                {errors[field.name] && (
                  <FiAlertCircle
                    className="text-red-500 cursor-pointer ml-3"
                    title={errors[field.name]}
                  />
                )}
              </div>
            </div>
          ))}

          <div className="col-span-1 md:col-span-2 text-white">
            <label className="block font-medium text-sm text-white">
              YOUR MESSAGE*
            </label>
            <textarea
              name="message"
              placeholder="Describe your message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full p-3 border-0 border-b border-white bg-[#111111] text-white focus:outline-none focus:ring-2 focus:ring-[#111111] ${
                errors.message
                  ? "focus:border-red-500"
                  : "focus:border-yellow-300"
              } h-32`}
            ></textarea>
            {errors.message && (
              <FiAlertCircle
                className="text-red-500 cursor-pointer ml-2"
                title={errors.message}
              />
            )}
          </div>

          <div className="col-span-1 md:col-span-2 flex justify-between items-center">
            <p className="text-sm text-white hidden md:block">
              We are committed to protecting your privacy. We will never collect
              information about you without your explicit consent.
            </p>
            <button
              type="submit"
              disabled={isLoading}
              className={`py-3 px-6 bg-yellow-500 text-white font-semibold rounded-lg transition 
    ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 border-t-2 border-white rounded-full"
                    viewBox="0 0 24 24"
                  ></svg>
                  Sending...
                </div>
              ) : (
                "Send Message"
              )}
            </button>
          </div>

          <div className="block md:hidden justify-between items-center">
            <p className="text-sm pb-6 text-white">
              We are committed to protecting your privacy. We will never collect
              information about you without your explicit consent.
            </p>
            <button
              type="submit"
              className="py-3 px-6 w-full bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-500 transition"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { WhiteContactForm, BlackContactForm };
