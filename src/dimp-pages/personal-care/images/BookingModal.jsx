import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { barber } from "../../data/Services";
const BookingModal = ({ isOpen, handleClose }) => {
  const [step, setStep] = useState(1);
  const [loading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const disablePastDates = ({ date, view }) => {
    // Disable dates before today
    return view === "month" && date < new Date().setHours(0, 0, 0, 0);
  };
  const [timeSlots] = useState([
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
  ]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [updatedTimeSlots, setUpdatedTimeSlots] = useState([]);

  useEffect(() => {
    disablePastTimeSlots();
  }, []);

  const disablePastTimeSlots = () => {
    const currentDate = new Date();
    const newSlots = timeSlots.map((slot) => {
      const slotTime = new Date();
      const [time, period] = slot.time.split(" ");
      let [hour, minute] = time.split(":").map(Number);

      // Convert to 24-hour format
      if (period === "PM" && hour !== 12) hour += 12;
      if (period === "AM" && hour === 12) hour = 0;

      slotTime.setHours(hour, minute, 0, 0);

      // Check if the time slot is in the past
      return {
        ...slot,
        booked: slot.booked || slotTime < currentDate,
      };
    });

    setUpdatedTimeSlots(newSlots);
  };

  const handleTimeSlotSelect = (slot) => {
    if (!slot.booked) setSelectedTimeSlot(slot.time);
  };
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
    service: "",
    location: "",
  });

  const [summary, setSummary] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("Pay on delivery");
  const [services, setServices] = useState([]);
  const [servicePrice, setServicePrice] = useState("");
  const [uniqueID, setUniqueID] = useState("");
  const generateUniqueID = () => {
    const randomID = `REF-${Math.floor(
      1000000000 + Math.random() * 9000000000
    )}`;
    setUniqueID(randomID);
  };

  const handleNextStep = (nextStep) => {
    if (nextStep === 3) {
      generateUniqueID();
    }
    if (nextStep <= 4) setStep(nextStep);
  };

  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 1)); // Ensure it doesn't go below 1
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // If service or location changes, update the price
    if (name === "service" || name === "location") {
      updateServicePrice(
        name === "service" ? value : formData.service,
        name === "location" ? value : formData.location
      );
    }
  };

  const updateServicePrice = (selectedServiceName, selectedLocation) => {
    const selectedService = barber.find(
      (service) => service.name === selectedServiceName
    );

    if (selectedService) {
      let price = selectedService.price;

      // Add 50% if Home Service is selected
      if (selectedLocation === "Home Service") {
        price += price * 0.5;
      }

      setServicePrice(`₦${price.toLocaleString()}`);
    } else {
      setServicePrice("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSummary({ selectedDate, selectedTimeSlot, formData });
    handleNextStep(3);
  };

  const handlePrint = () => {
    window.print();
  };

  const handlePaymentSuccess = () => {
    setPaymentStatus("paid");
    handleNextStep(4);
  };

  const handlePayOnDelivery = () => {
    setPaymentStatus("Pay on delivery");
    handleNextStep(4);
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} className="relative z-10">
      <DialogBackdrop
        className="fixed inset-0 bg-gray-500 bg-opacity-75"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center">
        <DialogPanel className="bg-white font-body rounded-lg p-6 w-screen max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center border-b pb-3">
            <DialogTitle className="text-xl font-semibold">
              Book Appointment
            </DialogTitle>
            <button onClick={handleClose} className="text-xl">
              &times;
            </button>
          </div>

          <div className="py-4 overflow-y-auto">
            {loading && <div className="spinner"></div>}

            {/* Step 1: Select Date and Time */}
            {!loading && step === 1 && (
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-4/12 border rounded-md p-3">
                  <h5 className="text-lg font-semibold">Select Date</h5>
                  <p className="text-gray-500 text-sm mb-4">
                    Kindly click on the preffered date till it selects with
                    purple gradients.
                  </p>
                  <p className="text-gray-500 mb-4">
                    {selectedDate
                      ? selectedDate.toLocaleDateString()
                      : "No date selected"}
                  </p>
                  <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    className="border-none"
                    tileDisabled={disablePastDates} // Disable past dates
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
                    .react-calendar__month-view__weekdays__weekday {
                      color: #2d1c4d;
                    }
                    .react-calendar__tile {
                      color: #2d1c4d;
                    }
                    .react-calendar__tile--active {
                      background: linear-gradient(
                        to bottom,
                        #ff60e6,
                        #a55f95d4
                      ) !important;
                      color: white !important;
                      border-radius: 100%;
                    }
                    .react-calendar__tile a {
                      text-decoration: none !important;
                    }
                  `}</style>
                </div>

                <div className="w-full md:w-8/12">
                  <h5 className="text-lg font-semibold">Select Time</h5>
                  <p className="text-gray-500 mb-4 text-sm">
                    Kindly click on the preffered time till it selects with
                    purple
                  </p>
                  <p className="text-gray-500 mb-4">
                    {selectedTimeSlot
                      ? selectedTimeSlot
                      : "Time has not being selected"}
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {updatedTimeSlots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => handleTimeSlotSelect(slot)}
                        className={`p-2 border rounded-md ${
                          selectedTimeSlot === slot.time
                            ? "bg-primary3 text-white"
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
                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      onClick={() => handleNextStep(2)}
                      className="bg-primary3 text-white p-2 rounded-md"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Enter Your Details */}
            {!loading && step === 2 && (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <h4 className="text-lg">Enter Your Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      required
                      className="border p-2 w-full rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      required
                      className="border p-2 w-full rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      className="border p-2 w-full rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm">Location</label>

                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      required
                      className="border p-2 w-full rounded-md"
                    >
                      <option value="">Select Location</option>
                      <option value="Home Service">Home Service</option>
                      <option value="Shop">Shop</option>
                    </select>
                    <p className="text-yellow-500 mb-4 text-sm">
                      Kindly note selecting that home service automatically
                      incure logistics fee added to the price.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm">Select Service</label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleFormChange}
                      required
                      className="border p-2 w-full rounded-md"
                    >
                      <option value="">Select Service</option>
                      {barber.map((service) => (
                        <option key={service.name} value={service.name}>
                          {service.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm">Service Price</label>
                    <input
                      type="text"
                      value={servicePrice}
                      readOnly
                      className="border p-2 w-full rounded-md bg-gray-100"
                    />
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => handleNextStep(3)}
                    className="ml-4 bg-primary3 text-white p-2 rounded-md"
                  >
                    Next
                  </button>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => handlePrevStep()}
                    className="bg-gray-400 rounded-md p-2 text-gray-50"
                  >
                    Back
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Review Appointment */}
            {!loading && step === 3 && (
              <div className="space-y-4">
                <h4 className="text-lg">Review Appointment</h4>
                <p>
                  <strong>Unique ID:</strong> {uniqueID}
                </p>
                <p>
                  <strong>Date:</strong> {selectedDate?.toLocaleDateString()}
                </p>
                <p>
                  <strong>Time:</strong> {selectedTimeSlot}
                </p>
                <p>
                  <strong>Service:</strong> {formData.service}
                </p>
                <p>
                  <strong>Price:</strong> {servicePrice}
                </p>
                <p>
                  <strong>Full Name:</strong> {formData.fullName}
                </p>
                <p>
                  <strong>Email:</strong> {formData.email}
                </p>
                <p>
                  <strong>Phone:</strong> {formData.phone}
                </p>
                <p>
                  <strong>Location:</strong> {formData.location}
                </p>

                <div className="flex justify-end mt-4">
                  <button
                    type="button"
                    onClick={() => handleNextStep(4)}
                    className="bg-yellow-400 rounded-md p-2 text-gray-50"
                  >
                    Pay on service
                  </button>
                  <button
                    onClick={handlePaymentSuccess}
                    className="ml-4 bg-green-500 text-white p-2 rounded-md"
                  >
                    Proceed to Payment
                  </button>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => handlePrevStep()}
                    className="bg-gray-400 rounded-md p-2 text-gray-50"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Payment */}
            {!loading && step === 4 && (
              <div className="space-y-4 overflow-visible overflow-y-auto">
                <h4 className="text-sm">
                  Kindly screenshot this page or click on the "Print Invoice"
                  button. The Invoice is the prove of payment that will be
                  tendered.
                </h4>

                <div
                  className={`${
                    paymentStatus === "paid" ? "bg-green-100" : "bg-yellow-100"
                  } w-full p-4 rounded-md`}
                >
                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => handlePrevStep()}
                      className="bg-gray-400 rounded-md p-2 text-gray-50"
                    >
                      Back
                    </button>
                  </div>
                  <div className="flex justify-end my-4">
                    <button
                      type="button"
                      onClick={() => handlePrint()}
                      className="bg-primary3 hover:bg-yellow-500 rounded-md p-2 text-gray-50"
                    >
                      Print Invoice
                    </button>
                  </div>
                  {/* Invoice content */}
                  <div class="bg-white rounded-lg shadow-lg px-8 py-10 max-w-xl mx-auto">
                    <div class="font-bold text-xl mb-2">INVOICE</div>
                    <div class="flex items-center justify-between mb-8">
                      <div class="flex items-center">
                        <div
                          className={`${
                            paymentStatus === "paid"
                              ? "text-green-700"
                              : "text-yellow-600"
                          } font-semibold uppercase  p-2 rounded-full  text-lg`}
                        >
                          {paymentStatus}
                        </div>
                      </div>
                      <div class="text-gray-700">
                        <div class="font-bold text-md mb-2">{uniqueID}</div>
                        <div class="text-md font-bold">
                          Date Booked: {selectedDate?.toLocaleDateString()}
                        </div>
                        <div class="text-md font-bold">
                          Time Booked: {selectedTimeSlot}
                        </div>
                      </div>
                    </div>
                    <div class="border-b-2 border-gray-300 pb-8 mb-8">
                      <h2 class="text-2xl font-bold mb-4">Bill To:</h2>
                      <div class="text-gray-700 mb-2">{formData.fullName}</div>
                      <div class="text-gray-700 mb-2">{formData.email}</div>
                      <div class="text-gray-700 mb-2">{formData.phone}</div>
                    </div>
                    <table class="w-full text-left mb-8">
                      <thead>
                        <tr>
                          <th class="text-gray-700 font-bold uppercase py-2">
                            Service
                          </th>
                          <th class="text-gray-700 font-bold uppercase py-2">
                            Location
                          </th>
                          <th class="text-gray-700 font-bold uppercase py-2">
                            Price
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="py-4 text-gray-700">{formData.service}</td>
                          <td class="py-4 text-gray-700">
                            {formData.location}
                          </td>
                          <td class="py-4 text-gray-700">{servicePrice}</td>
                        </tr>
                      </tbody>
                    </table>

                    <div class="flex justify-end mb-8">
                      <div class="text-gray-700 mr-2">Total:</div>
                      <div class="text-gray-700 font-bold text-xl">
                        {servicePrice}
                      </div>
                    </div>
                    <div class="border-t-2 border-gray-300 pt-8 mb-8">
                      <div class="text-gray-700 mb-2">
                        Please Screenshot or print this to serve as the booking
                        evidence.
                      </div>

                      <div class="text-gray-700">Thanks for you patronage.</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default BookingModal;
