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
import MakeUpImg from "./images/mk1.jpg";
import MakeUpBooking from "./images/mk2.jpg";
import MakeUpMoney from "./images/hairdresser-money.jpg";
import MakeUpCustomer from "./images/mk3.jpg";
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

const MakeUpLanding = () => {
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
        <title>Dimpified For Makeup Artists </title>
        <meta
          name="description"
          content="You make people look stunning -  get paid upfront for it"
        />
        <meta property="og:title" content=" Dimpified For Hairdressers " />
        <meta
          property="og:description"
          content="You make people look stunning -  get paid upfront for it"
        />
      </Helmet>{" "}
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
                <h1 className="lg:text-[5rem] text-[2.7rem] text-dark font-normal leading-tight mb-6">
                  <span>You make people look stunning - </span> <br />
                  <span className="font-bold bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ff8201] text-transparent bg-clip-text">
                    get paid upfront for it
                  </span>
                </h1>
                <p className="text-lg  text-dark leading-relaxed mb-8 w-4/5">
                  Get a website. Set services and prices. Get booked. Get your
                  money first. Make customers beautiful.
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

                  <Link to="/makeup-near-me">
                    <button className="btn hover:text-white hover:bg-gradient-to-l w-full text-center from-[#4f2683]  via-[#9966cc] to-[#ff8201] border-2 border-primary3 text-primary3 py-4 lg:px-6 px-3 rounded-lg flex items-center justify-center transition">
                      <span className="mr-3">Find a makeup artist near me</span>
                      <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center">
                <img
                  loading="lazy"
                  src={MakeUpImg}
                  className="rounded-3xl w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp"
                  alt="MakeUp"
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
          className="border-b text-dark py-8 lg:py-10 px-4 lg:px-16 bg-cover bg-orange-50"
        >
          <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
            <div className="flex flex-wrap items-end justify-center mb-5 text-center md:text-start">
              <div className="xl:w-6/12 lg:w-6/12 md:w-10/12 mb-4">
                <h3 className="bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ff8201] bg-clip-text text-transparent md:text-4xl text-3xl  font-medium mb-1 tracking-tight">
                  Your time and make-up skills are your greatest assets, be
                  intentional about how you monetize them{" "}
                </h3>
              </div>
              <div className="xl:w-5/12 lg:w-6/12 md:w-10/12 xl:ml-auto">
                <p className="w-11/12 md:w-4/5 mx-auto md:mx-0">
                  You’ve mastered your craft—now let us help you make the best
                  out of your time through bookings. Our software helps
                  customers easily reserve appointment your makeup services, so
                  you can manage bookings and receive payments effortlessly, all
                  from the comfort zone.
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
                      Create your website
                    </span>
                    <p className="mb-2">
                      Establish your online presence with a custom, professional
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
                      Define services and pricing
                    </span>
                    <p className="mb-2">
                      Showcase your makeup services with clear pricing and
                      specify whether you offer home or salon appointments.
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
                      Enable client bookings
                    </span>
                    <p className="mb-2">
                      Allow clients to book appointments directly through your
                      website and receive reminders, eliminating missed
                      opportunities.
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
                      Get paid upfront
                    </span>
                    <p className="mb-2">
                      Ensure your earnings with secure upfront payments, so you
                      can focus on delivering exceptional makeup services.
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
                      Showcase Your Expertise
                    </span>
                    <h1 className="text-3xl lg:text-4xl font-normal tracking-tight text-dark mb-4">
                      Create Your Makeup Website in Minutes
                    </h1>
                    <p className="text-dark text-lg lg:w-4/5 mb-6">
                      <span className="font-normal">Your website</span> is your
                      online studio. Quickly craft a professional site to
                      display your makeup services, portfolio of stunning looks,
                      and glowing customer testimonials.
                    </p>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
                      {/* Feature 1 */}
                      <div className="flex items-start mb-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-yellow-100 shadow-md mr-4">
                          <BsWindow className="text-yellow-500" size={30} />
                        </div>
                        <p className="text-dark font-medium">
                          User-friendly tools and templates for effortless site
                          creation.
                        </p>
                      </div>

                      {/* Feature 2 */}
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 shadow-md mr-4">
                          <BsGrid className="text-blue-500" size={30} />
                        </div>
                        <p className="text-dark font-medium">
                          Highlight your best makeup looks in a stunning
                          portfolio.
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
                          Showcase your services and pricing to simplify
                          bookings.
                        </p>
                      </div>

                      {/* Feature 4 */}
                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 shadow-md mr-4">
                          <BsPeople className="text-green-500" size={30} />
                        </div>
                        <p className="text-dark font-medium">
                          Share customer feedback to build trust with potential
                          clients.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="font-jak z-10">
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="bg-orange-50 rounded-3xl py-10 px-6 lg:py-24">
              <div className="relative h-full">
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  {/* Image Section */}
                  <div className="order-1 lg:order-2 mb-4 lg:w-6/12 lg:mb-0">
                    <img
                      loading="lazy"
                      src={MakeUpBooking}
                      className="lg:w-4/5 w-full rounded-xl"
                      alt="Makeup Booking Management"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-24">
                    <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-gradient-to-r from-pink-100 to-transparent rounded-full">
                      Booking Made Effortless
                    </span>
                    <h1 className="font-normal md:text-4xl text-3xl  text-dark mb-3">
                      Simplify Your Makeup Bookings
                    </h1>
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      Say goodbye to scheduling chaos. Our easy-to-use booking
                      system allows clients to book your makeup services online,
                      make secure payments in advance, and receive instant
                      confirmations. Manage your appointments effortlessly from
                      your dashboard, keeping your schedule flawless and your
                      business thriving.
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
                          Clients can book online, anytime.
                        </span>
                      </div>

                      {/* Feature 2 */}
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsMessenger className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Automatic reminders to prevent missed appointments.
                        </span>
                      </div>

                      {/* Feature 3 */}
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsLayers className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Effortlessly manage your schedule from a central
                          dashboard.
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
                          Customize services and availability to fit your style.
                        </span>
                      </div>
                    </div>

                    {/* Call-to-Action Button */}
                    <button
                      onClick={handleSignUp}
                      className="inline-flex items-center bg-white hover:bg-gray-900 hover:text-white text-dark py-3 px-5 rounded-full shadow transition"
                    >
                      <span>Start Booking Today!</span>
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
                    src={MakeUpCustomer}
                    className="w-full lg:4/5 rounded-xl"
                    alt="Client Insights"
                  />
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-6/12 md:w-10/12 py-10">
                <span className="font-bold text-xs uppercase text-dark bg-gray-100 rounded-full py-2 px-5 mb-5 inline-block">
                  Understand Your Clients
                </span>
                <h1 className="font-normal md:text-4xl text-3xl  mb-3">
                  Get to Know Your Makeup Clients
                </h1>
                <p className="text-md text-dark mb-4 leading-relaxed w-11/12 lg:w-full">
                  Building strong relationships with your clients is the
                  foundation of a thriving makeup business. Use our tools to
                  understand what your clients love, track their preferences,
                  and keep them coming back for more.
                </p>

                {/* Feature Box 1 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-green-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Keep track of client details with an intuitive customer
                    management system.
                  </span>
                </div>

                {/* Feature Box 2 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-green-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Analyze trends and client preferences using an
                    easy-to-navigate dashboard.
                  </span>
                </div>

                {/* Feature Box 3 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-green-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Engage clients with promotions and updates via email and SMS
                    tools.
                  </span>
                </div>

                {/* Feature Box 4 */}
                <div className="flex items-start">
                  <div className="w-11 h-11 bg-green-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-green-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Show appreciation to loyal clients through customizable
                    loyalty programs.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="font-jak z-10">
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="bg-orange-50 rounded-3xl py-10 px-6 lg:py-24">
              <div className="relative h-full">
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  {/* Image Section */}
                  <div className="order-1 lg:order-2 lg:w-5/12 mb-4 lg:mb-0 lg:pr-16">
                    <img
                      loading="lazy"
                      src={MakeUpMoney}
                      className="w-full rounded-xl"
                      alt="Increase Your Makeup Earnings"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-16">
                    <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-orange-50 rounded-full">
                      Boost Your Makeup Business
                    </span>
                    <h1 className="font-normal md:text-4xl text-3xl  text-dark mb-3">
                      Get Paid Before Your Brush Hits the Skin
                    </h1>
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      Maximize your income by offering prepayment options and
                      expanding your makeup services. Clients can book and pay
                      before their appointment, making your earnings more
                      predictable.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Feature 1 */}
                      <div className="flex items-center">
                        <div className="bg-orange-50 p-3 rounded-full flex justify-center items-center">
                          <BsLayers className="text-pink-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Add multiple makeup services like bridal looks,
                          special events, and consultations.
                        </span>
                      </div>

                      {/* Feature 2 */}
                      <div className="flex items-center">
                        <div className="bg-orange-50 p-3 rounded-full flex justify-center items-center">
                          <BsGrid className="text-pink-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Use secure payment systems to guarantee smooth
                          transactions.
                        </span>
                      </div>

                      {/* Feature 3 */}
                      <div className="flex items-center">
                        <div className="bg-orange-50 p-3 rounded-full flex justify-center items-center">
                          <BsBoxSeam className="text-pink-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Offer discounts and packages to attract new clients
                          and retain regulars.
                        </span>
                      </div>

                      {/* Feature 4 */}
                      <div className="flex items-center">
                        <div className="bg-orange-50 p-3 rounded-full flex justify-center items-center">
                          <BsCashStack className="text-pink-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Access your earnings quickly and easily through
                          hassle-free withdrawals.
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={handleSignUp}
                      className="inline-flex items-center hover:bg-white hover:text-pink-500 bg-orange-500 text-white px-6 py-4 rounded-full shadow hover:shadow-lg transition"
                    >
                      <span>Start earning now!</span>
                      <BsArrowRight className="ml-2" />
                    </button>
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
                  Lots of Make-Up Artists use Dimpified for their business.
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
          <div className="bg-[#e926a8] py-12 px-6 lg:py-40 lg:px-20 lg:mx-20 rounded-3xl text-center">
            <div>
              <h2 className="text-4xl font-light text-white tracking-tight mb-4">
                Your make-up business just got way more easier.
              </h2>
              <p className="text-white text-lg mb-6">
                Forget rent. Get a website. Set services and prices. Get booked.
                Get your money first. Delight customers.
              </p>
              <Link to="/pricing">
                <button className="bg-white text-primary hover:bg-orange-50 rounded-lg px-6 py-4 text-lg font-normal">
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
                          Our platform is designed to help professional Make-Up
                          Artists manage their online presence, client
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
                            How does the booking feature benefit my Make-Up
                            Artist business?
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

export default MakeUpLanding;
