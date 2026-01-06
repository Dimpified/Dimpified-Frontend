import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { MapPin, Mail, Phone, X } from "lucide-react";

// ===================== REDUX SETUP =====================

const API_URL = 'https://dimpified-bckend-development.azurewebsites.net/api/v1/create-blog-support';

export const submitSupportMessage = createAsyncThunk(
  'support/submitSupportMessage',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to submit message'
      );
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  success: false,
  submittedData: null,
  message: '',
};

const supportSlice = createSlice({
  name: 'support',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    resetFormState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = '';
      state.submittedData = null;
    },
    clearToast: (state) => {
      state.error = null;
      state.success = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitSupportMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = '';
      })
      .addCase(submitSupportMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.submittedData = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(submitSupportMessage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

const store = configureStore({
  reducer: { support: supportSlice.reducer },
});

export const { clearError, resetFormState, clearToast } = supportSlice.actions;

// ===================== TOAST COMPONENT =====================

const Toast = ({ type, message, onClose }) => {
  const bgColor = type === 'success' ? 'bg-green-100 border-green-400 text-green-700' 
                : type === 'error' ? 'bg-red-100 border-red-400 text-red-700'
                : 'bg-blue-100 border-blue-400 text-blue-700';
  
  const iconColor = type === 'success' ? 'text-green-500' 
                  : type === 'error' ? 'text-red-500'
                  : 'text-blue-500';
  
  const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';

  // Auto-close after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 border-l-4 ${bgColor} p-4 rounded-lg shadow-lg max-w-md animate-slideIn`}>
      <div className="flex items-start">
        <div className={`text-xl font-bold mr-3 ${iconColor}`}>{icon}</div>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
          {type === 'success' && (
            <p className="text-sm mt-1 opacity-80">Your message has been sent successfully!</p>
          )}
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

// Add CSS animation for the toast
const ToastStyles = () => (
  <style>
    {`
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      .animate-slideIn {
        animation: slideIn 0.3s ease-out forwards;
      }
    `}
  </style>
);

const ContactPage = () => {
  const dispatch = useDispatch();
  const { loading, error, success, message, submittedData } = useSelector((state) => state.support);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) dispatch(clearError());
  };

  // SIMPLE SUBMIT - NO VALIDATION
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Just send whatever the user entered (even empty strings)
    const apiData = {
      name: formData.name || '',
      email: formData.email || '',
      message: formData.message || '',
      subject: formData.subject || 'nil',
      phone: formData.phone || ''
    };
    
    dispatch(submitSupportMessage(apiData));
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    dispatch(resetFormState());
  };

  const handleCloseToast = () => {
    dispatch(clearToast());
  };

  return (
    <div className="w-full bg-white text-gray-800">
      <ToastStyles />
      
      {/* Toast Notifications */}
      {success && (
        <Toast 
          type="success" 
          message={message} 
          onClose={handleCloseToast} 
        />
      )}
      
      {error && (
        <Toast 
          type="error" 
          message={error} 
          onClose={handleCloseToast} 
        />
      )}

      <Navbar />

      <section className="text-center py-16 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mt-12 text-gray-900">
          Get in Touch
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Contact us to publish your content and show ads to our <br />website and get a good reach.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-16 mb-10">
        <div className="bg-white shadow-md rounded-xl py-10 px-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
          <div className="bg-purple-700 text-white p-4 rounded-full mb-4"><MapPin size={28} /></div>
          <h3 className="font-semibold text-lg text-gray-900 mb-2">Office</h3>
          <p className="text-gray-500">Victoria Street, London, UK</p>
        </div>
        <div className="bg-white shadow-md rounded-xl py-10 px-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
          <div className="bg-purple-700 text-white p-4 rounded-full mb-4"><Mail size={28} /></div>
          <h3 className="font-semibold text-lg text-gray-900 mb-2">Email</h3>
          <p className="text-gray-500">hello@examplen.com</p>
        </div>
        <div className="bg-white shadow-md rounded-xl py-10 px-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
          <div className="bg-purple-700 text-white p-4 rounded-full mb-4"><Phone size={28} /></div>
          <h3 className="font-semibold text-lg text-gray-900 mb-2">Phone</h3>
          <p className="text-gray-500">1024 3347 3431</p>
        </div>
      </section>

      <section className="w-full">
        <img
          src="https://i.imghippo.com/files/YFS1333DBM.jpg"
          alt="Map"
          className="w-full h-72 md:h-96 object-cover"
          onError={(e) => e.target.src = "https://picsum.photos/1200/400"}
        />
      </section>

      <section className="flex justify-center py-16 bg-gray-50 px-4">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
          {/* Only show loading indicator in form, not errors/success */}
          {loading && (
            <div className="mb-6 p-4 bg-blue-50 text-blue-700 rounded-md">
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-700 mr-2"></div>
                Sending your message...
              </div>
            </div>
          )}

          {/* Success message in form (optional - can be removed if you only want toast) */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md">
              <div className="font-semibold text-lg">✓ Message sent successfully!</div>
              <p className="text-sm mt-1">You can now send another message if needed.</p>
              <button
                type="button"
                onClick={resetForm}
                className="mt-3 text-sm underline hover:text-green-800"
              >
                Send another message
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 disabled:bg-gray-100"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 disabled:bg-gray-100"
                placeholder="Your email"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 disabled:bg-gray-100"
                placeholder="Phone number"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                disabled={loading}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 disabled:bg-gray-100"
                placeholder="Subject"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-sm">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              disabled={loading}
              rows="5"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-700 disabled:bg-gray-100"
              placeholder="Your message"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-purple-700 text-white px-8 py-3 rounded-md transition-colors ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-purple-800'}`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </form>
      </section>

      <section className="bg-purple-700 text-white py-16 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          Get our stories delivered from <br />us to your inbox weekly.
        </h3>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto px-4">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full sm:w-2/3 px-4 py-3 rounded-md text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-purple-700 text-white px-6 py-3 rounded-md hover:text-purple-700 hover:bg-white border border-white"
          >
            Get started
          </button>
        </form>
        <p className="mt-6">
          Get a response tomorrow if you submit by 9pm today. If we received
          after 9pm will get a reponse the <br />
          following day.
        </p>
      </section>

      <Footer />
    </div>
  );
};

const ContactPageWithRedux = () => (
  <Provider store={store}>
    <ContactPage />
  </Provider>
);

export default ContactPageWithRedux;