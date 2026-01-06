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
import { motion } from "motion/react";

// Import images
import HairdresserImg from "./images/hairdresser-image.jpg";
import HairdresserBooking from "./images/hairdresser-booking.jpg";
import HairdresserMoney from "./images/hairdresser-money.jpg";
import HairdresserCustomer from "./images/hairdresser-customer.jpg";
import Schedule from "./images/schedule.svg";
import VerifySVG from "./images/verify.svg";
import Payment from "./images/paymentSVG.svg";
import GlowBG from "./images/glow-bg.svg";

import ScreenShot from "./images/templatesnoplay.png";
import { Link, useNavigate } from "react-router-dom";
const reviews = [
  {
    name: "Aderonke, Lagos",
    text: "This software has transformed my salon! My bookings have doubled, and I now have more loyal customers coming back. Managing everything from my phone is such a blessing!",
  },
  {
    name: "Muslimat, Abuja",
    text: "Creating a website was so simple. Now, my clients can view my hairstyles and book appointments online. My salon has grown so much since I started using this!",
  },
  {
    name: "Ngozi, Port Harcourt",
    text: "The analytics tools have helped me understand what my clients love. I’ve been able to offer the right services, and it’s boosted my business. This is a must-have for every hairdresser!",
  },
];

const HairDresserLanding = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.className = "bg-white";
  }, []);
  const handleSignUp = () => {
    if (location.pathname === "/barbers") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Barber Shop");
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
        <title>Dimpified For Hairdressers </title>
        <meta
          name="description"
          content="Hairdressing isn't local and you can prove it"
        />
        <meta property="og:title" content=" Dimpified For Hairdressers " />
        <meta
          property="og:description"
          content="Hairdressing isn't local and you can prove it"
        />
      </Helmet>
      <div className="font-jak">
        <NavbarLanding />
        <FloatingContactButton />
        <section
          className="py-24 font-jak px-0 relative bg-cover bg-center"
          style={{ backgroundImage: `url(${GlowBG})` }}
        >
          <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
            <div className="flex flex-col md:flex-row items-center h-full">
              <div className="md:w-1/2 px-3 flex flex-col justify-center h-full">
                <h1 className="lg:text-pXXXL text-[3rem] text-dark font-normal leading-tight mb-6">
                  <span>Hairdressing isn't local - </span> <br />
                  <span className="font-bold bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ff8201] text-transparent bg-clip-text">
                    and you can prove it
                  </span>
                </h1>
                <p className="text-lg  text-dark leading-relaxed mb-8 w-4/5">
                  Forget rent. Get a website. Set services and prices. Get
                  booked. Get your money first. Delight customers.
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <Link to="/pricing">
                    <button
                      target="_blank"
                      className="btn w-full  hover:bg-gradient-to-l from-[#4f2683]  via-[#9966cc] to-[#ff8201] bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ff8201] text-white py-4 lg:px-6 px-3 rounded-lg flex items-center justify-center hover:bg-white transition"
                    >
                      <span className="mr-3">Get Started Now</span>
                      <FaArrowRight />
                    </button>
                  </Link>

                  <Link to="/hairdressers-near-me">
                    <button className="btn hover:text-white hover:bg-gradient-to-l w-full text-center from-[#4f2683]  via-[#9966cc] to-[#ff8201] border-2 border-primary3 text-primary3 py-4 lg:px-6 px-3 rounded-lg flex items-center justify-center transition">
                      <span className="mr-3">Find a hairdresser near me</span>
                      <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center">
                <img
                  loading="lazy"
                  src={HairdresserImg}
                  className="rounded-3xl w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp"
                  alt="Hairdresser"
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
          // style={{ backgroundImage: `url(${GradientBG})` }}
          className="border-b text-dark py-8 lg:py-10 px-4 lg:px-16 bg-cover bg-pink-50"
        >
          <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
            <div className="flex flex-wrap items-end justify-center mb-5 text-center md:text-start">
              <div className="xl:w-6/12 lg:w-6/12 md:w-10/12 mb-4">
                <h3 className="bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ff8201] bg-clip-text text-transparent md:text-4xl text-3xl  font-medium mb-1 tracking-tight">
                  You don't really have to struggle to get a shop before you
                  offer your services and earn.
                </h3>
              </div>
              <div className="xl:w-5/12 lg:w-6/12 md:w-10/12 xl:ml-auto">
                <p className="w-11/12 md:w-4/5 mx-auto md:mx-0">
                  You already got the skills, you don't need to worry about
                  rent. Our software solutions enable you to get customers book
                  your hair dressing services and you receive orders and
                  payments from the comfort of your home.
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
                      Build a professional online presence with a custom
                      website.
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
                      Set services and prices
                    </span>
                    <p className="mb-2">
                      List your hairdressing services with clear pricing. Also
                      specify if you offer home services or at your salon
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
                      Customers book via your website
                    </span>
                    <p className="mb-2">
                      Let your clients book appointments directly on your site
                      and receive reminders, ensuring no missed opportunities.
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
                      Get your money before offering services
                    </span>
                    <p className="mb-2">
                      Secure your earnings with upfront payments. Our reliable
                      payment system ensures you get your money they you can
                      focus on delivering top-notch hair services.
                    </p>
                    <span className="block w-16 h-0.5 bg-gray-800"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white font-jak overflow-hidden">
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="flex flex-col lg:flex-row justify-center gap-0">
              <div className="relative h-full">
                {/* Background Image */}
                <div className="absolute right-0 top-0 hidden lg:block -z-[1]">
                  <img
                    loading="lazy"
                    src="images/crafto-landing-page-bg-03.png"
                    alt=""
                  />
                </div>

                {/* Content Wrapper */}
                <div className="flex flex-col lg:flex-row items-center justify-center h-full lg:h-auto">
                  {/* Left Image */}
                  <div className="lg:w-6/12 mb-5 lg:mb-0 lg:px-8 lg:py-10">
                    <img
                      loading="lazy"
                      src={ScreenShot}
                      className="w-full"
                      alt="Website Screenshot"
                    />
                  </div>

                  {/* Right Content */}
                  <div className="lg:w-6/12 md:w-10/12 py-10 px-8">
                    <span className="text-md font-bold uppercase px-6 py-1 mb-5 inline-flex text-dark bg-gray-100 rounded-full">
                      Show off your skills
                    </span>
                    <h1 className="text-3xl lg:text-4xl font-normal tracking-tight text-dark mb-4">
                      Build Your Hairdressing Website in Minutes
                    </h1>
                    <p className="text-dark text-lg lg:w-4/5 mb-6">
                      <span className="font-normal">Your website</span> is like
                      your online salon. Easily create a professional website to
                      show your hairdressing services, best styles, and happy
                      customer reviews.
                    </p>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
                      {/* Feature 1 */}
                      <div className="flex items-start mb-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100 shadow-md mr-4">
                          <BsWindow className="text-yellow-500" size={30} />
                        </div>
                        <p className="text-dark font-medium">
                          Simple tools and templates to create your site easily.
                        </p>
                      </div>

                      {/* Feature 2 */}
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 shadow-md mr-4">
                          <BsGrid className="text-blue-500" size={30} />
                        </div>
                        <p className="text-dark font-medium">
                          A portfolio section to display your best hairstyles.
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
                          Add your services and prices to make booking easy.
                        </p>
                      </div>

                      {/* Feature 4 */}
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 shadow-md mr-4">
                          <BsPeople className="text-green-500" size={30} />
                        </div>
                        <p className="text-dark font-medium">
                          Share customer reviews to build trust with new
                          clients.
                        </p>
                      </div>
                    </div>

                    {/* Optional Button */}
                    {/* Uncomment if you want a button */}
                    {/* <a
          href="/auth/personal-information"
          target="_blank"
          className="inline-block px-8 py-3 mt-6 text-white bg-blue-500 hover:bg-blue-600 rounded-full text-lg"
        >
          Start Your Website Now
        </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="font-jak z-10">
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="bg-pink-50 rounded-3xl py-10 px-6 lg:py-24">
              <div className="relative h-full">
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  {/* Image Section */}
                  <div className="order-1 lg:order-2 mb-4 lg:w-6/12 lg:mb-0">
                    <img
                      loading="lazy"
                      src={HairdresserBooking}
                      className="lg:w-4/5 w-full rounded-xl"
                      alt="Booking Management"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-24">
                    <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-gradient-to-r from-pink-100 to-transparent rounded-full">
                      Booking made easy
                    </span>
                    <h1 className="font-normal md:text-4xl text-3xl  text-dark mb-3">
                      Manage Your Bookings Effortlessly
                    </h1>
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      No more worrying about double bookings or missed
                      appointments. Our simple booking system lets your clients
                      book online, pay in advance, and receive confirmations.
                      You can easily manage your schedule from your dashboard
                      and keep your chair full every day.
                    </p>

                    {/* Feature Grid */}
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
                          Let clients book online, anytime.
                        </span>
                      </div>

                      {/* Feature 2 */}
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsMessenger className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Automatic reminders to reduce no-shows.
                        </span>
                      </div>

                      {/* Feature 3 */}
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsLayers className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Manage your schedule easily from your dashboard.
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
                          Customize your services and time slots.
                        </span>
                      </div>
                    </div>

                    {/* Call-to-Action Button */}
                    <button
                      onClick={handleSignUp}
                      className="inline-flex items-center bg-white hover:bg-gray-900 hover:text-white text-dark py-3 px-5 rounded-full shadow transition"
                    >
                      <span>Get booked today!</span>
                      <BsArrowRight className="ml-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white p-4 font-jak overflow-hidden">
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="flex flex-col lg:flex-row justify-center gap-0">
              {/* Image Section */}
              <div className="lg:w-6/12 mb-5 lg:mb-0 lg:px-8 lg:pr-28">
                <div>
                  <img
                    loading="lazy"
                    src={HairdresserCustomer}
                    className="w-full lg:4/5 rounded-xl"
                    alt="Customer insights"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-6/12 md:w-10/12 py-10">
                <span className="font-bold text-xs uppercase text-dark bg-gray-100 rounded-full py-2 px-5 mb-5 inline-block">
                  Know your customers
                </span>
                <h1 className="font-normal md:text-4xl text-3xl  mb-3">
                  Get to Know Your Clients Better
                </h1>
                <p className="text-md text-dark mb-4 leading-relaxed w-11/12 lg:w-full">
                  Understanding your clients is the key to growing your
                  hairdressing business. Our tools help you learn what your
                  clients love, track their preferences, and keep them coming
                  back.
                </p>

                {/* Feature Box 1 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-green-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Store client details with an easy-to-use customer management
                    system.
                  </span>
                </div>

                {/* Feature Box 2 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-green-500" />
                  </div>
                  <span className="text-lg text-dark">
                    See trends and client preferences with a simple dashboard.
                  </span>
                </div>

                {/* Feature Box 3 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-green-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Send promotions and updates with email and SMS tools.
                  </span>
                </div>

                {/* Feature Box 4 */}
                <div className="flex items-start">
                  <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-green-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Reward loyal clients with easy-to-set-up loyalty programs.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="font-jak z-10">
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="bg-gray-100 rounded-3xl py-10 px-6 lg:py-24">
              <div className="relative h-full">
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  {/* Image Section */}
                  <div className="order-1 lg:order-2 lg:w-5/12 mb-4 lg:mb-0 lg:pr-16">
                    <img
                      loading="lazy"
                      src={HairdresserMoney}
                      className="w-full rounded-xl"
                      alt="Expand Your Sales Streams"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-16">
                    <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-pink-100 rounded-full">
                      Expand Your Sales
                    </span>
                    <h1 className="font-normal md:text-4xl text-3xl  text-dark mb-3">
                      Get Paid Before Your Client Even Arrives
                    </h1>
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      Boost your income by offering more services and letting
                      clients pay upfront before visiting your salon.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Feature 1 */}
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsLayers className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Add multiple hair and beauty services to your
                          platform.
                        </span>
                      </div>

                      {/* Feature 2 */}
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsGrid className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Use secure payment systems for smooth transactions.
                        </span>
                      </div>

                      {/* Feature 3 */}
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsBoxSeam className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Offer discounts and deals to attract more clients.
                        </span>
                      </div>

                      {/* Feature 4 */}
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsCashStack className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Quick and easy withdrawals for your earnings.
                        </span>
                      </div>
                    </div>

                    <Link to="/pricing">
                      {" "}
                      <button className="inline-flex items-center hover:bg-white hover:text-gray-900 bg-gray-900 text-white px-6 py-4 rounded-full shadow hover:shadow-lg transition">
                        <span>Start earning now!</span>
                        <BsArrowRight className="ml-2" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="font-jak bg-gradient-to-t from-gray-100 to-transparent p-4 py-12">
          <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
            <div className="flex items-center justify-center text-center mb-6">
              <div className="xl:w-10/12">
                <h2 className="font-alt  md:text-4xl text-3xl  font-normal text-gray-800 tracking-tight mb-0">
                  Lots of Hairdressers use Dimpified for their business.
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
          <div className="bg-primary3 py-12 px-6 lg:py-40 lg:px-20 lg:mx-20 rounded-3xl text-center">
            <div>
              <h2 className="text-4xl font-light text-white tracking-tight mb-4">
                Your Hairdressing business just got way more easier.
              </h2>
              <p className="text-white text-lg mb-6">
                Forget rent. Get a website. Set services and prices. Get booked.
                Get your money first. Delight customers.
              </p>
              <button
                onClick={handleSignUp}
                className="bg-white text-primary hover:bg-purple-100 rounded-lg px-6 py-4 text-lg font-normal"
              >
                Get Started Now
              </button>
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
                          Our platform is designed to help professional
                          Hairdressers manage their online presence, client
                          interactions, and business growth efficiently. It
                          integrates tools for website building, a booking
                          module, payment management, and more, all in one
                          place.
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
                            website?
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
                            How does the booking feature benefit my
                            Hairdressershop?
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

export default HairDresserLanding;
