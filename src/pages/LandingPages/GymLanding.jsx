// import node module libraries
import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCheck,
  FaGlobe,
  FaCalendarAlt,
  FaUsers,
  FaDollarSign,
  FaPlayCircle,
  FaWhatsapp,
} from "react-icons/fa";
import FloatingContactButton from "./FloatingContact";
import { Helmet } from "react-helmet";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { motion } from "motion/react";

import {
  BsWindow,
  BsGrid,
  BsCardChecklist,
  BsPeople,
  BsCalendar2Check,
  BsMessenger,
  BsLayoutTextSidebarReverse,
  BsArrowRight,
  BsLayers,
  BsBoxSeam,
  BsCashStack,
} from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

import NavbarLanding from "./NavbarLanding";
import { FooterWithLinks } from "./FooterWithLinks";

// Import images
import GymImg from "./images/gym-hero.jpg";
import GymBooking from "./images/gymbooking.jpg";
import GymPayments from "./images/gymmoney.jpg";
import GymMembers from "./images/gymcustomer.jpg";
import Schedule from "./images/schedule.svg";
import VerifySVG from "./images/verify.svg";
import Payment from "./images/paymentSVG.svg";
import GlowBG from "./images/glow-bg.svg";
import GradientBG from "./images/gradient-bg.png";
import Screenshot from "./images/templatesnoplay.png";

import { Link, useNavigate } from "react-router-dom";
const reviews = [
  {
    name: "Tunde Alabi, Ibadan",
    text: "Managing my gym has never been this easy! Members can now book sessions online, and I get real-time updates on attendance. Plus, with automated payments, I don’t have to chase clients for fees anymore—everything runs smoothly!",
  },
  {
    name: "Emeka Okafor, Enugu",
    text: "Before using this platform, I was constantly answering calls about membership plans. Now, my website does all the work—clients can check packages, sign up, and even pay before showing up. It has completely transformed my business!",
  },
  {
    name: "Bola Adeyemi, Benin City",
    text: "The insights from the analytics tool are priceless. I can now see which classes are performing best and identify when members start skipping sessions. This allows me to follow up and keep engagement high, reducing dropouts.",
  },
];

const GymLanding = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.className = "bg-white";
  }, []);

  const handleSignUp = () => {
    if (location.pathname === "/Gyms") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Gym Shop");
      navigate("/auth/personal-information");
    } else if (location.pathname === "/hairdressers") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Hair Salon");
      navigate("/auth/personal-information");
    } else if (location.pathname === "/makeup") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Makeup Artist Services");
      navigate("/auth/personal-information");
    } else if (location.pathname === "/nails") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Nail Salon");
      navigate("/auth/personal-information");
    } else if (location.pathname === "/gym") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem(
        "SubCategory",
        "Personal Training and Fitness Coaching"
      );
      navigate("/auth/personal-information");
    } else {
      sessionStorage.removeItem("Category");
      sessionStorage.removeItem("SubCategory");
      navigate("/auth/personal-information");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <Helmet>
        <title>Dimpified For Gym Centres </title>
        <meta
          name="description"
          content="Organize gym memberships and make your services standout"
        />
        <meta property="og:title" content=" Dimpified For Gym Centres " />
        <meta
          property="og:description"
          content="Organize gym memberships and make your services standout"
        />
      </Helmet>
      <div className="font-jak">
        <NavbarLanding />
        <FloatingContactButton />
        <section
          className="py-24 font-jak px-0 relative bg-cover bg-center"
          style={{ backgroundImage: `url(${GlowBG})` }}
        >
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="flex flex-col md:flex-row items-center h-full">
              <div className="md:w-1/2 px-3 flex flex-col justify-center h-full">
                <h1 className="lg:text-pXXL text-[2.5rem] text-dark font-normal leading-tight mb-6">
                  <span>Organize gym memberships and</span>{" "}
                  <span className="font-bold bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ffa600] text-transparent bg-clip-text">
                    make your services standout
                  </span>
                </h1>
                <p className="text-lg text-dark leading-relaxed mb-8 w-4/5">
                  Get a functional website. Attract more members. Automate
                  memberships and reservations. Significantly boost revenue.
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <Link to="/pricing">
                    <button
                      target="_blank"
                      className="btn w-full  hover:bg-gradient-to-l from-[#4f2683]  via-[#9966cc] to-[#ffa600] bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ffa600] text-white py-4 lg:px-6 px-3 rounded-lg flex items-center justify-center hover:bg-white transition"
                    >
                      <span className="mr-3">Get Started Now</span>
                      <FaArrowRight />
                    </button>
                  </Link>

                  <Link to="/gym-near-me">
                    <button className="btn hover:text-white hover:bg-gradient-to-l w-full text-center from-[#4f2683]  via-[#9966cc] to-[#ffa600] border-2 border-primary3 text-primary3 py-4 lg:px-6 px-3 rounded-lg flex items-center justify-center transition">
                      <span className="mr-3">Find a gym service near me</span>
                      <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center">
                <img
                  loading="lazy"
                  src={GymImg}
                  className="rounded-3xl w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp"
                  alt="Gym Owner"
                  style={{ animationDelay: "0.75s" }}
                />
                <img
                  loading="lazy"
                  src={Schedule}
                  alt="schedule"
                  className="absolute top-1/2 left-[95%] transform -translate-x-1/2 -translate-y-1/2 hidden xl:block pointer-events-none"
                />
                <img
                  loading="lazy"
                  src={VerifySVG}
                  alt="verify"
                  className="absolute top-1/2 left-[10%] transform -translate-x-1/2 -translate-y-1/2 hidden xl:block pointer-events-none"
                />
                <img
                  loading="lazy"
                  src={Payment}
                  alt="payment"
                  className="absolute top-[35%] left-[10%] transform -translate-x-1/2 translate-y-1/2 hidden xl:block pointer-events-none"
                />
              </div>
            </div>
          </div>
        </section>

        <section
          id="down-section"
          style={{ backgroundImage: `url(${GradientBG})` }}
          className="border-b text-dark py-8 lg:py-10 px-4 lg:px-16 bg-cover"
        >
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="flex flex-wrap items-end justify-center mb-5 text-center md:text-start">
              <div className="xl:w-5/12 lg:w-6/12 md:w-10/12 mb-4">
                <h3 className="bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ffa600] bg-clip-text text-transparent  md:text-4xl text-3xl  font-medium mb-1 tracking-tighter">
                  The Future of Gym Management is Digital
                </h3>
              </div>
              <div className="xl:w-5/12 lg:w-6/12 md:w-10/12 xl:ml-auto">
                <p className="w-11/12 md:w-4/5 mx-auto md:mx-0">
                  In today's fast-paced world, members expect more than just a
                  great workout space. Our all-in-one solution helps gym owners
                  stay ahead with tools to build a website, manage bookings,
                  engage members, and increase revenue—all from your phone.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10 relative lg:mt-16">
              {/* Feature Box 1 */}
              <div className="self-start">
                <div className="relative lg:px-8 sm:px-4">
                  <h1 className="absolute top-0 left-0 text-[7rem] text-gray-800 text-outline font-extrabold opacity-20 tracking-tighter">
                    01
                  </h1>
                  <div className="pt-16 sm:pt-10">
                    <span className="block text-xl font-normal mb-2">
                      Get a website
                    </span>
                    <p className="mb-2">
                      Build a professional online presence for your gym.
                    </p>
                    <span className="block w-16 h-0.5 bg-gray-800"></span>
                  </div>
                </div>
              </div>

              {/* Feature Box 2 */}
              <div className="self-end mt-10 lg:mt-0">
                <div className="relative lg:px-8 sm:px-4">
                  <h1 className="absolute top-0 left-0 text-[7rem] text-gray-800 text-outline font-extrabold opacity-20 tracking-tighter">
                    02
                  </h1>
                  <div className="pt-16 sm:pt-10">
                    <span className="block text-xl font-normal mb-2">
                      Online booking system
                    </span>
                    <p className="mb-2">
                      Automate class & session bookings, reducing no-shows.
                    </p>
                    <span className="block w-16 h-0.5 bg-gray-800"></span>
                  </div>
                </div>
              </div>

              {/* Feature Box 3 */}
              <div className="self-start">
                <div className="relative lg:px-8 sm:px-4">
                  <h1 className="absolute top-0 left-0 text-[7rem] text-gray-800 text-outline font-extrabold opacity-20 tracking-tighter">
                    03
                  </h1>
                  <div className="pt-16 sm:pt-10">
                    <span className="block text-xl font-normal mb-2">
                      Get more members
                    </span>
                    <p className="mb-2">
                      Attract & retain members with data-driven marketing.
                    </p>
                    <span className="block w-16 h-0.5 bg-gray-800"></span>
                  </div>
                </div>
              </div>

              {/* Feature Box 4 */}
              <div className="self-end mt-10">
                <div className="relative lg:px-8 sm:px-4">
                  <h1 className="absolute top-0 left-0 text-[7rem] text-gray-800 text-outline font-extrabold opacity-20 tracking-tighter">
                    04
                  </h1>
                  <div className="pt-16 sm:pt-10">
                    <span className="block text-xl font-normal mb-2">
                      Increase revenue
                    </span>
                    <p className="mb-2">
                      Boost gym income with flexible payment gateways.
                    </p>
                    <span className="block w-16 h-0.5 bg-gray-800"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white font-jak overflow-hidden">
          {" "}
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            {" "}
            <div className="flex flex-col lg:flex-row justify-center gap-0">
              {" "}
              <div className="relative h-full">
                {/* Background Image */}
                <div className="absolute right-0 top-0 hidden lg:block -z-[1]">
                  <img
                    loading="lazy"
                    src="images/gym-landing-bg.png"
                    alt="Gym Background"
                  />
                </div>

                {/* Content Wrapper */}
                <div className="flex flex-col lg:flex-row items-center justify-center h-full lg:h-auto">
                  {/* Left Image */}
                  <div className="lg:w-6/12 mb-5 lg:mb-0 lg:px-8 lg:py-10">
                    <img
                      loading="lazy"
                      src={Screenshot}
                      className="w-full"
                      alt="Gym Website Preview"
                    />
                  </div>

                  {/* Right Content */}
                  <div className="lg:w-6/12 md:w-10/12 py-10 px-8">
                    <span className="text-md font-bold uppercase px-6 py-1 mb-5 inline-flex text-dark bg-gray-100 rounded-full">
                      Build Your Digital Gym
                    </span>
                    <h1 className="text-3xl lg:text-4xl font-normal tracking-tight text-dark mb-4">
                      Attract More Members with a Powerful Website
                    </h1>
                    <p className="text-dark text-lg lg:w-4/5 mb-6">
                      <span className="font-normal">Your gym’s website</span> is
                      the first impression potential members get. With our
                      intuitive website builder, you can create a stunning site
                      to showcase your training programs, membership plans, and
                      client success stories.
                    </p>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
                      {/* Feature 1 */}
                      <div className="flex items-start mb-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100 shadow-md mr-4">
                          <BsWindow className="text-yellow-500" size={30} />
                        </div>
                        <p className="text-dark font-medium">
                          No-code website builder with gym-specific templates.
                        </p>
                      </div>

                      {/* Feature 2 */}
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 shadow-md mr-4">
                          <BsGrid className="text-blue-500" size={30} />
                        </div>
                        <p className="text-dark font-medium">
                          Dedicated sections for classes, trainers, and pricing.
                        </p>
                      </div>

                      {/* Feature 3 */}
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-teal-100 shadow-md mr-4">
                          <BsCardChecklist
                            className="text-teal-500"
                            size={30}
                          />
                        </div>
                        <p className="text-dark font-medium">
                          Membership and subscription management.
                        </p>
                      </div>

                      {/* Feature 4 */}
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 shadow-md mr-4">
                          <BsPeople className="text-green-500" size={30} />
                        </div>
                        <p className="text-dark font-medium">
                          Success stories and testimonials to build credibility.
                        </p>
                      </div>
                    </div>

                    {/* Optional Button */}
                    {/* <a
          href="/auth/personal-information"
          target="_blank"
          className="inline-block px-8 py-3 mt-6 text-white bg-blue-500 hover:bg-blue-600 rounded-full text-lg"
        >
          Get Started Today
        </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </section>
        <section className="font-jak z-10">
          {" "}
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            {" "}
            <div className="bg-pink-50 rounded-3xl py-10 px-6 lg:py-24">
              {" "}
              <div className="relative h-full">
                {" "}
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  {/* Left Image */}
                  <div className="order-1 lg:order-2 mb-4 lg:w-6/12 lg:mb-0">
                    <img
                      loading="lazy"
                      src={GymBooking}
                      className="lg:w-4/5 w-full rounded-xl"
                      alt="Gym Booking System"
                    />
                  </div>

                  {/* Right Content */}
                  <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-24">
                    <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-gradient-to-r from-pink-100 to-transparent rounded-full">
                      Stress-Free Scheduling
                    </span>
                    <h1 className="font-normal md:text-4xl text-3xl  text-dark mb-3">
                      Hassle-Free Class & Session Bookings
                    </h1>
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      Never worry about overcrowded classes or missed
                      appointments again! Our automated scheduling system lets
                      your members book classes online, manage memberships, and
                      receive reminders—all from your website.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Feature 1 */}
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsCalendar2Check
                            className="text-green-500"
                            size={30}
                          />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Online booking for personal training & group classes.
                        </span>
                      </div>

                      {/* Feature 2 */}
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsMessenger className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Automated reminders to reduce last-minute
                          cancellations.
                        </span>
                      </div>

                      {/* Feature 3 */}
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsLayers className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Real-time dashboard to manage bookings & availability.
                        </span>
                      </div>

                      {/* Feature 4 */}
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsLayoutTextSidebarReverse
                            className="text-yellow-500"
                            size={30}
                          />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Custom class scheduling and membership tiers.
                        </span>
                      </div>
                    </div>
                    <Link to="/pricing">
                      <button className="inline-flex items-center bg-white hover:bg-gray-900 hover:text-white text-dark py-3 px-5 rounded-full shadow transition">
                        <span>Start Scheduling Today!</span>
                        <BsArrowRight className="ml-2" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </section>
        <section className="bg-white p-4 font-jak overflow-hidden">
          {" "}
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            {" "}
            <div className="flex flex-col lg:flex-row justify-center gap-0">
              {" "}
              <div className="lg:w-6/12 mb-5 lg:mb-0 lg:px-8 lg:pr-28">
                {" "}
                <div>
                  {" "}
                  <img
                    loading="lazy"
                    src={GymMembers}
                    className="w-full lg:4/5 rounded-xl"
                    alt="Member Insights"
                  />{" "}
                </div>{" "}
              </div>{" "}
              <div className="lg:w-6/12 md:w-10/12 py-10">
                {" "}
                <span className="font-bold text-xs uppercase text-dark bg-gray-100 rounded-full py-2 px-5 mb-5 inline-block">
                  {" "}
                  Know Your Members{" "}
                </span>{" "}
                <h1 className="font-normal md:text-4xl text-3xl  mb-3">
                  {" "}
                  Understand and Engage Your Gym Members{" "}
                </h1>{" "}
                <p className="text-md text-dark mb-4 leading-relaxed w-11/12 lg:w-full">
                  {" "}
                  Your gym thrives on strong relationships. Our software gives
                  you deep insights into member habits, preferences, and workout
                  trends, helping you keep them motivated and engaged.{" "}
                </p>
                {/* Feature Box 1 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-green-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Member management system to store client information and
                    track activity.
                  </span>
                </div>
                {/* Feature Box 2 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-green-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Analytics dashboard to track peak hours, popular classes,
                    and member retention.
                  </span>
                </div>
                {/* Feature Box 3 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-green-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Email and SMS marketing tools to promote special offers and
                    events.
                  </span>
                </div>
                {/* Feature Box 4 */}
                <div className="flex items-start">
                  <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-green-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Loyalty programs to reward dedicated members and encourage
                    referrals.
                  </span>
                </div>
              </div>
            </div>
          </div>{" "}
        </section>
        <section className="font-jak z-10">
          {" "}
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            {" "}
            <div className="bg-gray-100 rounded-3xl py-10 px-6 lg:py-24">
              {" "}
              <div className="relative h-full">
                {" "}
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  {" "}
                  <div className="order-1 lg:order-2 lg:w-5/12 mb-4 lg:mb-0 lg:pr-16">
                    {" "}
                    <img
                      loading="lazy"
                      src={GymPayments}
                      className="w-full rounded-xl"
                      alt="Gym Payment Solutions"
                    />{" "}
                  </div>{" "}
                  <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-16">
                    {" "}
                    <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-pink-100 rounded-full">
                      {" "}
                      Expand Your Revenue Streams{" "}
                    </span>{" "}
                    <h1 className="font-normal md:text-4xl text-3xl  text-dark mb-3">
                      {" "}
                      Get Paid Before Members Step into Your Gym{" "}
                    </h1>{" "}
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      {" "}
                      Secure payments upfront and offer premium services online
                      to increase your revenue while reducing missed payments.{" "}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Feature 1 */}
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsLayers className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Integrated system to sell memberships, personal
                          training, and supplements.
                        </span>
                      </div>

                      {/* Feature 2 */}
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsGrid className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Secure payment gateway for hassle-free transactions.
                        </span>
                      </div>

                      {/* Feature 3 */}
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsBoxSeam className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Promotional tools to offer discounts and exclusive
                          deals.
                        </span>
                      </div>

                      {/* Feature 4 */}
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsCashStack className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Fast and seamless payouts directly to your account.
                        </span>
                      </div>
                    </div>
                    <Link to="/pricing">
                      <button className="inline-flex items-center hover:bg-white hover:text-gray-900 bg-gray-900 text-white px-6 py-4 rounded-full shadow hover:shadow-lg transition">
                        <span>Start Earning Today!</span>
                        <BsArrowRight className="ml-2" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </section>
        <section className="font-jak bg-gradient-to-t from-gray-100 to-transparent p-4 py-12">
          <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
            <div className="flex items-center justify-center text-center mb-6">
              <div className="xl:w-10/12">
                <h2 className="font-alt  md:text-4xl text-3xl  font-normal text-gray-800 tracking-tight mb-0">
                  Lots of gym owners use Dimpified for their business.
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="bg-white p-4 md:p-5 sm:p-3 rounded-lg mb-3 shadow"
                >
                  <p className="mb-2 leading-6">{review.text}</p>
                  <div>
                    <span className="text-lg text-gray-800 font-normal">
                      {review.name}
                    </span>
                    <div className="text-yellow-400 flex space-x-1 leading-6 text-xl">
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                      <AiFillStar />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="font-jak mx-4 lg:mx-16 my-4 lg:mt-20">
          <div className="bg-[#7d26e9] py-12 px-6 lg:py-40 lg:px-20 lg:mx-20 rounded-3xl text-center">
            <div>
              <h2 className="text-4xl font-light text-white tracking-tight mb-4">
                Your gym business just got way more easier.
              </h2>
              <p className="text-white text-lg mb-6">
                Get a website. Get booked. Increase sales. Delight customers.
              </p>
              <Link to="/pricing">
                {" "}
                <button className="bg-white text-primary hover:bg-purple-100 rounded-lg px-6 py-4 text-lg font-normal">
                  Get Started Now
                </button>
              </Link>
            </div>
          </div>
        </section>
        {/* <a
      href="#"
      className="fixed right-10 bottom-14 z-50 bg-primary3 font-jak text-white rounded-full py-3 px-6 flex items-center"
    >
      Watch Demo{" "}
      <span className="ml-2">
        <FaPlayCircle size={20} />
      </span>
    </a> */}

        <section className="font-jak px-4 py-12 lg:px-12 lg:py-18 bg-white">
          <div className="">
            <div className="flex items-center justify-center text-center mb-6">
              <div className="w-full max-w-2xl">
                <h2 className="alt-font  md:text-4xl text-3xl  font-light text-dark tracking-tight mb-0">
                  Frequently asked questions
                </h2>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="container mx-auto px-6">
                <div className="space-y-4">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            What is the purpose of your business management
                            platform?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Our platform is designed to help professional Gyms
                          manage their online presence, client interactions, and
                          business growth efficiently. It integrates tools for
                          website building, a booking module, payment
                          management, and more, all in one place.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            How can your platform help me build a professional
                            gym website?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Our intuitive website builder, along with customizable
                          no-code templates, allows you to create a polished and
                          professional website quickly. You can showcase your
                          services, expertise, and achievements to attract
                          potential clients.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            Can I customize the templates to fit my brand?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Yes, our no-code templates are highly customizable.
                          You can tailor the content, layout, and features to
                          match your brand’s identity and specific needs,
                          ensuring a consistent and professional look.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            How does the booking feature benefit my Gym
                            business?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          The booking feature allows your clients to easily
                          schedule appointments online, reducing no-shows and
                          double bookings. It automates appointment management,
                          sends reminders, and helps you maintain a full
                          schedule, which leads to higher efficiency and
                          customer satisfaction.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            What kind of payment methods does your platform
                            support?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Our platform supports a variety of payment methods,
                          including credit/debit cards, Flutterwave, Paystack,
                          and other popular online payment systems. This
                          flexibility ensures a convenient and secure
                          transaction experience for your clients.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            What kind of support do you offer?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          We offer continuous support to our users. Whether you
                          need technical assistance or business advice, our
                          dedicated support team is here to help you succeed and
                          make the most of our platform.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            How can I get started with your platform?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Getting started is easy! Simply click "Get Started for
                          free" below, choose the plan that best fits your
                          needs, and begin exploring the features. Our
                          user-friendly interface and comprehensive onboarding
                          resources will guide you through the setup process.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>
          </div>
        </section>

        <FooterWithLinks />
      </div>
    </motion.div>
  );
};

export default GymLanding;
