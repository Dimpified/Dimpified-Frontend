import { useState } from "react";
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaComments } from "react-icons/fa";

export default function FloatingContactButton() {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <div className="fixed bottom-6 right-12 z-50">
      {/* Dropdown options */}
      {showOptions && (
        <div className="mb-4 bg-white rounded-xl shadow-lg p-3 space-y-2 w-56 animate-fade-in">
          <a
            href="tel:+234708916795"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
          >
            <FaPhoneAlt className="text-primary3" />
            Call Us
          </a>
          <a
            href="https://wa.me/2347089167952"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
          >
            <FaWhatsapp className="text-green-600" />
            WhatsApp
          </a>
          <a
            href="mailto:hello@dimpified.com"
            className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 transition"
          >
            <FaEnvelope className="text-blue-500" />
            Send an Email
          </a>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={toggleOptions}
        className="relative animate-ping-twice btn bg-green-400 hover:text-white shadow-lg text-white hover:bg-green-500 p-4 rounded-full flex items-center justify-center w-full md:w-auto transition overflow-visible"
      >
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-60 animate-ping z-[-1]"></span>
        <FaComments className="text-xl" />
      </button>
    </div>
  );
}
