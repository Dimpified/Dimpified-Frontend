import React, { useState, useEffect } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { Heading, Text } from "../../component/Text";
import MyCalendar from "../../component/dashboard/overview/calendar";
import Charts from "../../component/dashboard/overview/Chart";
import RecentBookings from "../../component/dashboard/overview/RecentBooking";
import api from "../../api/DashboardApi";
import { useSelector } from "react-redux";
import AllBooking from "../../component/dashboard/booking/AllBooking";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import ToggleSwitch from "../../component/ToggleSwitch";
import { ButtonSmallWhite } from "../../component/Buttons";
import { FaCalendar } from "react-icons/fa";

const Booking = () => {
  const [bookingsByDate, setBookingsByDate] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [monthlyBooking, setMonthlyBooking] = useState(null);
  const [monthlyIncome, setMonthlyIncome] = useState(null);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [errorBookingsByDate, setErrorBookingsByDate] = useState(null);
    const userRole = useSelector((state) => state.auth.user?.role);
    const creatorId = useSelector((state) => state.auth.user?.creatorId);
  const [date, setDate] = useState(
    new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ecosystemDomain = useSelector((state) => state.ecosystemDomain.domain);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  useEffect(() => {
    getMonthlyBooking();
    getMonthlyIncome();
    getBookingActivities();

    if (date) {
      getBookingDetailsByDate(date);
    }
  }, [date]);

  const handleDateChange = (newDate) => {
    // Format the date in "10 Oct 2024" format before passing it
    const formattedDate = new Date(newDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    setDate(formattedDate);
  };

  const getMonthlyBooking = async () => {
    try {
      const response = await api.creatorMonthlyBooking({
        ecosystemDomain,
        creatorId,
        userType: userRole,
        accessToken,
        refreshToken,
        dispatch,
        navigate,
      });
      setMonthlyBooking(response.data);
    } catch (error) {
      console.error("Could not get earnings:", error);
    }
  };

  const getMonthlyIncome = async () => {
    try {
      const response = await api.creatorMonthlyIncome({
        ecosystemDomain,
        accessToken,
        refreshToken,
        navigate,
        dispatch,
      });
      setMonthlyIncome(response.data);
    } catch (error) {
      console.error("Could not get earnings:", error);
    }
  };

  const getBookingActivities = async () => {
    try {
      const response = await api.creatorBookingActivities({
        ecosystemDomain,
        creatorId,
        userType: userRole,
        accessToken,
        refreshToken,
        dispatch,
        navigate,
      });
      setBookingDetails(response.data);
    } catch (error) {
      console.error("Could not get booking activities:", error);
    }
  };

  const getBookingDetailsByDate = async (formattedDate) => {
    setIsBookingLoading(true);
    try {
      const response = await api.creatorBookingDate({
        ecosystemDomain,
        date: formattedDate,
        creatorId,
        userType: userRole,
        accessToken,
        refreshToken,
        navigate,
        dispatch,
      });
      setBookingsByDate(response.data);
      setErrorBookingsByDate(null);
    } catch (error) {
      console.error("Could not get booking details by date:", error);
      setErrorBookingsByDate(
        error?.response?.data?.message || "No bookings found for this date"
      );
    } finally {
      setIsBookingLoading(false);
    }
  };

  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
          Bookings
        </Heading>

        <img
          src={EditTemplateImage}
          alt=""
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>
      <div className="mt-6 mx-4 justify-end flex">
        {/* <div>
          <ButtonSmallWhite
            onClick={() => navigate("/creator/dashboard/booking-time-off")}
            height="11"
            className="flex items-center justify-center gap-3  px-4 py-4 hover:bg-primary3 hover:text-white"
          >
            <FaCalendar /> Block Time Off
          </ButtonSmallWhite>
        </div> */}
        <ToggleSwitch />
      </div>
      <div className="mt-8 lg:flex lg:space-x-5 space-y-5 mx-4">
        <MyCalendar date={date} handleDateChange={handleDateChange} />
        <RecentBookings
          bookingsByDate={bookingsByDate}
          errorBookingsByDate={errorBookingsByDate}
          isBookingLoading={isBookingLoading}
        />
        <Charts monthlyBooking={monthlyBooking} monthlyIncome={monthlyIncome} />
      </div>
      <div className="mt-6 mx-4">
        <AllBooking
          bookingDetails={bookingDetails}
          getBookingActivities={getBookingActivities}
        />
      </div>
    </CreatorDashboardLayout>
  );
};

export default Booking;
