import axios from 'axios';

// Define your API endpoints
const API_URL = `${import.meta.env.VITE_API_URL}`;

const submitBooking = async ({
  provider,
  address,
  bookingType,
  date,
  description,
  ecosystemDomain,
  email,
  location,
  name,
  phone,
  servicePrice,
  service,
  time,
  serviceId,
  serviceCharge,
  creatorId,
  currency
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/create-booking`,
      {
        provider,
        address,
        bookingType,
        date,
        description,
        ecosystemDomain,
        email,
        location,
        name,
        phone,
        servicePrice,
        service,
        time,
        serviceId,
        serviceCharge,
        creatorId,
        currency
      }
    );
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error creating booking"
    );
  }
};

export default {
  submitBooking
};