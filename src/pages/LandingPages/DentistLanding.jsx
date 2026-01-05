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
import TagManager from "react-gtm-module";

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

// Import imagess
import DentalImg from "./images/dental-image.jpg";
import DentalBooking from "./images/dentalbooking.jpg";

import DentalMoney from "./images/dentalmoney.jpg";
import DentalCustomer from "./images/dental-customer.jpg";
import Schedule from "./images/schedule.svg";
import VerifySVG from "./images/verify.svg";
import Payment from "./images/paymentSVG.svg";
import GlowBG from "./images/glow-bg.svg";
import GradientBG from "./images/gradient-bg.png";
import ScreenShot from "./images/templatesnoplay.png";
import { Link, useNavigate } from "react-router-dom";

const DentistLanding = () => {
  const reviews = [
    {
      name: "Dr. Adebayo, Lagos",
      text: "This platform has transformed my dental practice! Patients can easily book appointments online, and my schedule is now perfectly organized. My revenue has increased by 40%!",
    },
    {
      name: "Dr. Chika, Abuja",
      text: "Setting up my dental clinic website was effortless. Now patients can view my services, book consultations instantly, and even pay for treatments in advance. My practice has never been busier!",
    },
    {
      name: "Dr. Ibrahim, Kano",
      text: "The patient management system is revolutionary! I now have complete visibility of treatment histories and can provide better continuity of care. This platform is essential for modern dental practices!",
    },
  ];

  const navigate = useNavigate();
  useEffect(() => {
    document.body.className = "bg-white";
  }, []);
  useEffect(() => {
    // Inject the GA4 gtag script
    const scriptTag = document.createElement("script");
    scriptTag.setAttribute("async", "");
    scriptTag.src = "https://www.googletagmanager.com/gtag/js?id=G-J7G4T2CBPJ";
    document.head.appendChild(scriptTag);

    const inlineScript = document.createElement("script");
    inlineScript.innerHTML = `
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-J7G4T2CBPJ');
     `;
    document.head.appendChild(inlineScript);

    // Cleanup: remove scripts when component unmounts
    return () => {
      document.head.removeChild(scriptTag);
      document.head.removeChild(inlineScript);
    };
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
        <title>Dimpified For Dental Clinics & Dentists</title>
        <meta
          name="description"
          content="Modern dental practice management with online bookings, payments, and patient records"
        />
        <meta
          property="og:title"
          content="Dimpified For Dental Clinics & Dentists"
        />
        <meta
          property="og:description"
          content="Modern dental practice management with online bookings, payments, and patient records"
        />
      </Helmet>

      <div className="font-jak">
        <NavbarLanding />
        <FloatingContactButton />

        {/* Hero Section */}
        <section
          className="py-24 font-jak px-0 relative bg-cover bg-center"
          style={{ backgroundImage: `url(${GlowBG})` }}
        >
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="flex flex-col md:flex-row items-center h-full">
              <div className="md:w-1/2 px-3 flex flex-col justify-center h-full">
                <h1 className="lg:text-pXXL text-[2.5rem] text-dark font-normal leading-tight mb-6">
                  <span>Modern dental practice</span> <br />
                  <span className="font-bold bg-gradient-to-r from-[#2a004e]  via-teal-700  via-blue-500 to-teal-400 text-transparent bg-clip-text">
                    management made simple
                  </span>
                </h1>
                <p className="text-lg text-dark leading-relaxed mb-8 w-4/5">
                  Get a professional website. Set up online bookings. Manage
                  patient records. Get paid in advance. Focus on dental care.
                </p>
                <div className="flex flex-col md:flex-row gap-4">
                  <Link to="/pricing">
                    <button className="btn hover:bg-gradient-to-l from-[#2a004e]  via-teal-700  via-blue-500 to-teal-400  bg-gradient-to-r from-[#2a004e]  via-teal-700  via-blue-500 to-teal-400  text-white py-4 lg:px-6 px-3 rounded-lg flex items-center justify-center hover:bg-white transition">
                      <span className="mr-3">Get Started Now</span>
                      <FaArrowRight />
                    </button>
                  </Link>
                  <Link to="/dentists-near-me">
                    <button className="btn hover:text-white hover:bg-gradient-to-l w-full text-center from-[#2a004e]  via-teal-700  via-blue-500 to-teal-400  border-2 border-teal-700 text-teal-700 py-4 lg:px-6 px-3 rounded-lg flex items-center justify-center transition">
                      <span className="mr-3">Find a dentist near me</span>
                      <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 mt-10 md:mt-0 relative flex justify-center">
                <img
                  loading="lazy"
                  src={DentalImg}
                  className="rounded-3xl w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp"
                  alt="Dental Clinic"
                  style={{ animationDelay: "0.75s" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-b text-dark py-8 lg:py-10 px-4 lg:px-16 bg-cover bg-blue-50">
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="flex flex-wrap items-end justify-center mb-5 text-center md:text-start">
              <div className="xl:w-6/12 lg:w-6/12 md:w-10/12 mb-4">
                <h3 className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 bg-clip-text text-transparent md:text-4xl text-3xl font-medium mb-1 tracking-tight">
                  Your dental expertise deserves streamlined practice management
                </h3>
              </div>
              <div className="xl:w-5/12 lg:w-6/12 md:w-10/12 xl:ml-auto">
                <p className="w-11/12 md:w-4/5 mx-auto md:mx-0">
                  You provide exceptional dental care—let us handle your
                  practice management. Our software helps dentists establish
                  online presence, manage appointments efficiently, and receive
                  payments securely, so you can focus on patient care.
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
                      Professional dental website
                    </span>
                    <p className="mb-2">
                      Create a modern website showcasing your services,
                      qualifications, and patient testimonials.
                    </p>
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
                      Treatment menus and pricing
                    </span>
                    <p className="mb-2">
                      List services like consultations, cleanings, fillings, and
                      cosmetic dentistry with transparent pricing.
                    </p>
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
                      Online appointment scheduling
                    </span>
                    <p className="mb-2">
                      Patients book visits 24/7 while you maintain complete
                      control over your schedule.
                    </p>
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
                      Secure payment processing
                    </span>
                    <p className="mb-2">
                      Collect payments upfront to reduce cancellations and
                      improve cash flow.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Website Builder Section */}
        <section className="bg-white font-jak overflow-hidden">
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="flex flex-col lg:flex-row justify-center gap-0">
              <div className="relative h-full">
                <div className="flex flex-col lg:flex-row items-center justify-center h-full lg:h-auto">
                  <div className="lg:w-6/12 mb-5 lg:mb-0 lg:px-8 lg:py-10">
                    <img
                      loading="lazy"
                      src={ScreenShot}
                      className="w-full"
                      alt="Dental Website Template"
                    />
                  </div>

                  <div className="lg:w-6/12 md:w-10/12 py-10 px-8">
                    <span className="text-md font-bold uppercase px-6 py-1 mb-5 inline-flex text-dark bg-gray-100 rounded-full">
                      Elevate Your Dental Practice
                    </span>
                    <h1 className="text-3xl lg:text-4xl font-normal tracking-tight text-dark mb-4">
                      Create Your Dental Website in Minutes
                    </h1>
                    <p className="text-dark text-lg lg:w-4/5 mb-6">
                      <span className="font-normal">
                        Your professional website
                      </span>{" "}
                      is your digital office. Easily design an authoritative
                      site to showcase your dental services, qualifications, and
                      patient success stories.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
                      <div className="flex items-start mb-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-blue-100 shadow-md mr-4">
                          <BsWindow className="text-blue-500" size={30} />
                        </div>
                        <p className="text-dark font-medium">
                          Professional templates designed specifically for
                          dental practices.
                        </p>
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-teal-100 shadow-md mr-4">
                          <BsGrid className="text-teal-500" size={30} />
                        </div>
                        <p className="text-dark font-medium">
                          Showcase your dental services with before/after
                          galleries.
                        </p>
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-purple-100 shadow-md mr-4">
                          <BsCardChecklist
                            className="text-purple-500"
                            size={30}
                          />
                        </div>
                        <p className="text-dark font-medium">
                          Display your treatment options and pricing clearly.
                        </p>
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="w-16 h-16 flex items-center justify-center rounded-full bg-green-100 shadow-md mr-4">
                          <BsPeople className="text-green-500" size={30} />
                        </div>
                        <p className="text-dark font-medium">
                          Feature patient testimonials to build trust and
                          credibility.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Appointment Management Section */}
        <section className="font-jak z-10">
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="bg-blue-50 rounded-3xl py-10 px-6 lg:py-24">
              <div className="relative h-full">
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  <div className="order-1 lg:order-2 mb-4 lg:w-6/12 lg:mb-0">
                    <img
                      loading="lazy"
                      src={DentalBooking}
                      className="rounded-[60%_40%_60%_40%/40%_60%_40%_60%] w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp
"
                      alt="Dental Appointment Management"
                    />
                  </div>

                  <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-24">
                    <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-gradient-to-r from-blue-100 to-transparent rounded-full">
                      Streamlined Dental Scheduling
                    </span>
                    <h1 className="font-normal md:text-4xl text-3xl text-dark mb-3">
                      Simplify Your Appointment Management
                    </h1>
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      Eliminate scheduling headaches. Our intuitive booking
                      system allows patients to book appointments online,
                      complete health questionnaires in advance, and receive
                      automated reminders. Manage your schedule efficiently with
                      our practitioner dashboard.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsCalendar2Check
                            className="text-blue-500"
                            size={30}
                          />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Patients can book appointments 24/7 from any device.
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsMessenger className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Automated SMS/email reminders reduce no-shows.
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsLayers className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Centralized dashboard for all appointment management.
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsLayoutTextSidebarReverse
                            className="text-blue-500"
                            size={30}
                          />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Customize appointment types and durations.
                        </span>
                      </div>
                    </div>

                    <Link to="/pricing">
                      <button className="inline-flex items-center bg-white hover:bg-blue-900 hover:text-white text-dark py-3 px-5 rounded-full shadow transition">
                        <span>Start Managing Appointments</span>
                        <BsArrowRight className="ml-2" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Patient Management Section */}
        <section className="bg-white p-4 font-jak overflow-hidden">
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="flex flex-col lg:flex-row justify-center gap-0">
              <div className="lg:w-6/12 mb-5 lg:mb-0 lg:px-8 lg:pr-28">
                <div>
                  <img
                    loading="lazy"
                    src={DentalCustomer}
                    className="w-full lg:4/5 rounded-xl"
                    alt="Dental Patient Management"
                  />
                </div>
              </div>

              <div className="lg:w-6/12 md:w-10/12 py-10">
                <span className="font-bold text-xs uppercase text-dark bg-gray-100 rounded-full py-2 px-5 mb-5 inline-block">
                  Comprehensive Patient Records
                </span>
                <h1 className="font-normal md:text-4xl text-3xl mb-3">
                  Enhance Patient Care with Digital Records
                </h1>
                <p className="text-md text-dark mb-4 leading-relaxed w-11/12 lg:w-full">
                  Build lasting relationships with your patients. Maintain
                  complete treatment histories, track dental health progress,
                  and access important medical information to provide
                  personalized care.
                </p>

                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-blue-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-blue-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Secure digital patient records with treatment histories.
                  </span>
                </div>

                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-blue-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-blue-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Medical history forms completed online before appointments.
                  </span>
                </div>

                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-blue-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-blue-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Treatment plan tracking with progress notes.
                  </span>
                </div>

                <div className="flex items-start">
                  <div className="w-11 h-11 bg-blue-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-blue-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Recall system for regular checkups and follow-ups.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment Section */}
        <section className="font-jak z-10">
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="bg-teal-50 rounded-3xl py-10 px-6 lg:py-24">
              <div className="relative h-full">
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  <div className="order-1 lg:order-2 lg:w-5/12 mb-4 lg:mb-0 lg:pr-16">
                    <img
                      loading="lazy"
                      src={DentalMoney}
                      className="w-full rounded-xl"
                      alt="Dental Practice Payments"
                    />
                  </div>

                  <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-16">
                    <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-teal-50 rounded-full">
                      Financial Management
                    </span>
                    <h1 className="font-normal md:text-4xl text-3xl text-dark mb-3">
                      Get Paid Securely and On Time
                    </h1>
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      Ensure steady cash flow with our integrated payment
                      system. Patients can pay deposits or full treatment fees
                      in advance. Accept all major payment methods while we
                      handle the secure processing so you can focus on
                      dentistry.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <div className="bg-teal-50 p-3 rounded-full flex justify-center items-center">
                          <BsLayers className="text-teal-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Accept deposits to secure appointments.
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-teal-50 p-3 rounded-full flex justify-center items-center">
                          <BsGrid className="text-teal-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Process payments securely via multiple methods.
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-teal-50 p-3 rounded-full flex justify-center items-center">
                          <BsBoxSeam className="text-teal-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Create treatment plans with payment options.
                        </span>
                      </div>

                      <div className="flex items-center">
                        <div className="bg-teal-50 p-3 rounded-full flex justify-center items-center">
                          <BsCashStack className="text-teal-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Withdraw earnings quickly to your bank account.
                        </span>
                      </div>
                    </div>

                    <Link to="/pricing">
                      <button className="inline-flex items-center hover:bg-white hover:text-teal-500 bg-teal-600 text-white px-6 py-4 rounded-full shadow hover:shadow-lg transition">
                        <span>Start Accepting Payments</span>
                        <BsArrowRight className="ml-2" />
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="font-jak bg-gradient-to-t from-gray-100 to-transparent p-4 py-12">
          <div className="flex flex-col h-full py-4 px-4 lg:px-24">
            <div className="flex items-center justify-center text-center mb-6">
              <div className="xl:w-10/12">
                <h2 className="font-alt md:text-4xl text-3xl font-normal text-gray-800 tracking-tight mb-0">
                  Dentists across Nigeria trust Dimpified for their practice
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

        {/* CTA Section */}
        <section className="font-jak mx-4 lg:mx-16 my-4 lg:mt-20">
          <div className="bg-teal-600 py-12 px-6 lg:py-40 lg:px-20 lg:mx-20 rounded-3xl text-center">
            <div>
              <h2 className="text-4xl font-light text-white tracking-tight mb-4">
                Modernize your dental practice today
              </h2>
              <p className="text-white text-lg mb-6">
                Get a professional website. Manage appointments seamlessly.
                Secure payments in advance. Deliver exceptional patient care.
              </p>
              <Link to="/pricing">
                {" "}
                <button
                  onClick={handleSignUp}
                  className="bg-white text-blue-600 hover:bg-blue-50 rounded-lg px-6 py-4 text-lg font-normal"
                >
                  Get Started Now
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="font-jak px-4 py-12 lg:px-12 lg:py-18 bg-white">
          <div className="">
            <div className="flex items-center justify-center text-center mb-6">
              <div className="w-full max-w-2xl">
                <h2 className="alt-font md:text-4xl text-3xl font-light text-dark tracking-tight mb-0">
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
                            How does this help my dental practice?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Our platform helps dental practices modernize their
                          operations with online booking, digital patient
                          records, and secure payments. This reduces
                          administrative work, decreases no-shows, and improves
                          patient experience while increasing your revenue.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            Can patients complete medical history forms online?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Yes, patients can complete all necessary medical
                          history and consent forms online before their
                          appointment. This saves time during visits and ensures
                          you have complete information upfront.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            What payment methods can I accept?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Our platform supports all major payment methods
                          including credit/debit cards, bank transfers, and
                          mobile money. We integrate with Flutterwave and
                          Paystack for secure processing.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            How does the patient record system work?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Our digital patient records allow you to store
                          treatment histories, notes, x-rays (as attachments),
                          and treatment plans. All data is securely stored and
                          accessible only to your practice. Patients can also
                          access their own records through a secure portal.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            Is there support for multiple dentists in a
                            practice?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Yes, our platform supports multi-dentist practices
                          with individual calendars, patient assignments, and
                          performance tracking. You can manage assistants and
                          hygienists as well with appropriate access levels.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            How do I get started?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Simply sign up for free, choose your plan, and follow
                          our guided setup process. We'll help you import
                          existing patient data, set up your services, and train
                          your staff. Most practices are fully operational
                          within 48 hours.
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

export default DentistLanding;
