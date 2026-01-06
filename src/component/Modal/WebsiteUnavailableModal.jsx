import React, { useState } from 'react';

const WebsiteUnavailableModal = ({ senderEmail }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [showMailForm, setShowMailForm] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleContactSupport = () => {
    setShowMailForm(true);
  };

  const handleSendMail = () => {
    // Simulate sending email (replace with actual email service API call)
    console.log('Sending email:', {
      from: senderEmail,
      to: 'support@example.com',
      subject,
      message,
    });
    setShowMailForm(false);
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      {!showMailForm ? (
        <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-2xl">
          <div className="text-center">
            <svg
              className="w-16 h-16 text-yellow-500 mx-auto"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <h2 className="text-xl font-semibold text-purple-900 mt-4">This Website Is Currently Unavailable</h2>
            <p className="mt-2 text-gray-600 text-sm">
              The owner’s subscription has expired. Please check back later or reach out directly if you have their contact.
            </p>
            <button
              className="mt-6 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              onClick={handleContactSupport}
            >
              Contact Support
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
          <h2 className="text-xl font-semibold text-purple-900 text-center mb-4">Contact Support</h2>
          <div className="space-y-4">
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full p-2 border rounded-md"
            />
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Your message..."
              className="w-full p-2 border rounded-md h-32"
            />
            <div className="flex justify-between">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                onClick={() => setShowMailForm(false)}
              >
                Back
              </button>
              <button
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                onClick={handleSendMail}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebsiteUnavailableModal;