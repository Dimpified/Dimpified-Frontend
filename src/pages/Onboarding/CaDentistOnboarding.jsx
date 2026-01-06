// import node module libraries
import React, { useEffect, useState } from "react";

import {
  FaArrowRight,
  FaClock,
  FaWallet,
  FaMoneyCheck,
  FaPlay,
  FaCheck,
  FaQuoteLeft,
  FaQuoteRight,
  FaCalendarAlt,
  FaMap,
  FaShare,
  FaLink,
  FaLightbulb,
  FaIdeal,
  FaRegLightbulb,
  FaInfoCircle,
  FaCalendarCheck,
  FaMoneyBill,
  FaBell,
} from "react-icons/fa";
import Modal from "../LandingPages/images/bookingmodal.png";
import {
  BsLayoutTextSidebarReverse,
  BsChatDots,
  BsBank,
  BsMegaphoneFill,
  BsGrid3X2GapFill,
} from "react-icons/bs";

import FloatingContactButton from "../LandingPages/FloatingContact";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { motion } from "motion/react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import NavbarLanding from "../LandingPages/NavbarLanding";
import { FooterWithLinks } from "../LandingPages/FooterWithLinks";

// Import images
import DentistImg from "../LandingPages/images/dentalservices.jpg";
import DentistLeft from "./images/dentalmoney.jpg";
import DentistRight from "./images/dental-customer.jpg";
import DentistMiddle from "./images/dental-image.jpg";

import Payment from "./images/payment-us.jpg";
import Dashboard from "./images/dashboard.jpg";

import Csr from "../LandingPages/images/csr.png";
import Temp from "../LandingPages/images/templates-new.png";
import GlowBG from "../LandingPages/images/glow-bg.svg";

import Mobile from "./images/mobile.png";

import { Link, useNavigate } from "react-router-dom";
import TagManager from "react-gtm-module";
import { FaWebAwesome } from "react-icons/fa6";

const reviews = [
  {
    name: "Dr. Singh, Toronto, ON",
    text: "Since using this software, my bookings have doubled, and I’ve seen a significant increase in returning patients. Managing everything from my phone is a game-changer!",
  },
  {
    name: "Dr. Chen, Vancouver, BC",
    text: "I stopped juggling emails and phone calls. Patients now book online, pay ahead, and get automatic reminders. It’s streamlined my whole practice.",
  },
  {
    name: "Dr. Ali, Calgary, AB",
    text: "Building a booking site was easier than I expected. Patients view my services and schedule appointments online. Business has never been better!",
  },
  {
    name: "Dr. Patel, Ottawa, ON",
    text: "It’s the first platform I’ve used that truly understands clinic workflows. Easy to set up, easy for patients, and powerful for my front desk team.",
  },
  {
    name: "Dr. Okafor, Winnipeg, MB",
    text: "The analytics tools give me clear insight into appointment trends and patient habits. I can tailor my care and improve retention.",
  },
  {
    name: "Dr. Thompson, Halifax, NS",
    text: "I moved most of my administrative tasks online with this platform. Scheduling, payments, and communications are all handled in one place.",
  },
  {
    name: "Dr. Mohammed, Edmonton, AB",
    text: "Sending reminders and managing bookings used to take hours. Now it’s automatic—and my no-shows have dropped significantly.",
  },
  {
    name: "Dr. Brown, Mississauga, ON",
    text: "From appointment scheduling to patient engagement, this software is a complete practice management solution. I highly recommend it.",
  },
  {
    name: "Dr. Leblanc, Montreal, QC",
    text: "The setup was fast, and I love how professional my online booking page looks. It builds trust with new patients right away.",
  },
  {
    name: "Dr. MacDonald, Charlottetown, PEI",
    text: "My patients love the convenience of online booking and text reminders. I love how much admin time it’s saved me.",
  },
  {
    name: "Dr. Hassan, Saskatoon, SK",
    text: "Managing operations from one dashboard has made my clinic more efficient. It’s seamless and truly built with clinicians in mind.",
  },
  {
    name: "Dr. Fraser, Saint John, NB",
    text: "The support team is outstanding! They helped me set everything up, and now I’ve got a polished online presence that keeps bringing in new patients.",
  },
  {
    name: "Dr. Adeyemi, Brampton, ON",
    text: "The built-in marketing tools helped me increase visibility in my community. I’m reaching more patients and filling my calendar faster.",
  },
];

const CaDentistOnboarding = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.className = "bg-gray-50";
  }, []);

  useEffect(() => {
    const tagManagerArgs = {
      gtmId: "GTM-TG6NL9M9", // Replace with your GTM ID
    };

    TagManager.initialize(tagManagerArgs);
  }, []);
  const handleSignUp = () => {
    if (location.pathname === "/dentists") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Dentist Shop");
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
  const [showVideo, setShowVideo] = useState(false);
  const videoId = "dobePyv7kb4"; // YouTube video ID
  const steps = [
    {
      number: "01",
      title: "Choose a Plan",
      description: "Subscribe to a plan that fits your practice size.",
    },
    {
      number: "02",
      title: "Set Up Your Clinic",
      description: "Add your services, working hours, and team members.",
    },
    {
      number: "03",
      title: "Share Your Booking Link",
      description: "Start accepting online bookings & payments instantly.",
    },
    {
      number: "04",
      title: "Grow Your Business",
      description: "Use our tools to retain patients and attract new ones.",
    },
  ];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <Helmet>
        <title>Launch Your Dental Business Online with Dimpified</title>
        <meta
          name="description"
          content="Learn how Dimpified connects service-based professionals in personal care, wellness, and grooming with patients seamlessly through a digital storefront and appointment system."
        />
        <meta property="og:title" content="CaDentistOnboarding Us - My App" />
        <meta
          property="og:description"
          content="Learn how Dimpified connects service-based professionals in personal care, wellness, and grooming with patients seamlessly through a digital storefront and appointment system."
        />
      </Helmet>
      <div className="font-sen">
        <NavbarLanding />

        <section
          style={{ backgroundImage: `url(${GlowBG})` }}
          className="py-16 md:mt-o mt-8 md:py-24 font-jak px-4 relative bg-cover bg-center  text-gray-700"
        >
          <div className="flex flex-col h-full py-4 lg:px-24  mx-auto">
            <div className="flex flex-col md:flex-row items-center h-full">
              <div className="md:w-1/2 flex flex-col justify-center h-full items-center md:items-start text-center md:text-left">
                <div className="bg-teal-700 rounded-full py-2 px-5 mb-5 w-max mx-auto md:mx-0">
                  <span className="font-semibold text-xs uppercase text-white">
                    Everything You Need to Grow, Book & Bill
                  </span>
                </div>

                <h1 className="text-4xl lg:text-7xl text-dark font-normal leading-tight mb-6">
                  Bring Your{" "}
                  <span className="bg-gradient-to-r from-teal-600 to-teal-300 text-transparent bg-clip-text">
                    Dental Practise Online{" "}
                  </span>
                  with Dimpified
                </h1>

                <p className="text-base md:text-lg text-dark leading-relaxed mb-8 max-w-lg">
                  Join hundreds of modern dentists using Dimpified to manage
                  appointments, collect payments, sell services, and grow their
                  practice – without writing a single line of code.
                </p>

                <div className="flex flex-col hidden md:block md:flex-row items-center md:items-start mb-8 w-full max-w-lg">
                  <div className="flex items-center mr-4">
                    <div className="w-5 h-5 bg-teal-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-2">
                      <FaInfoCircle className="text-teal-500 text-xs" />
                    </div>
                    <span className="text-md text-dark">
                      <span className="font-bold">Not free.</span> Dimpified is
                      a subscription-based platform.{" "}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row  gap-4  w-auto justify-center md:justify-start">
                  <Link to="/pricing">
                    <button className="btn hover:bg-teal-400 text-white py-3 px-6 rounded-lg flex items-center justify-center bg-teal-700 transition">
                      <span className="mr-3">See pricing plans</span>
                      <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                <img
                  loading="lazy"
                  src={DentistMiddle}
                  className="rounded-[60%_40%_60%_40%/40%_60%_40%_60%] w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp"
                  alt="Dentist"
                  style={{ animationDelay: "0.75s" }}
                />
              </div>
            </div>
          </div>
        </section>
        <FloatingContactButton />

        <section className="py-6 px-6 md:px-12  md:py-24 lg:px-40 bg-gray-50 text-gray-800 bg-cover bg-center">
          {/* Header */}
          <div className=" mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-jak font-semibold mb-4">
              Built for Busy Dentists Like You
            </h2>
            <p className="md:text-lg text-sm text-gray-600">
              Whether you’re a solo practitioner or run a dental clinic,
              Dimpified gives you all the tools to:
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="bg-teal-100 text-gray-800 rounded-2xl p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold mb-2 font-jak">
                Let patients book appointments online
              </h3>
              <p className="text-gray-800 mb-4 md:text-lg text-sm">
                Let patients book appointments and pay ahead—even when you're
                busy.
              </p>

              <img
                loading="lazy"
                src={Modal}
                alt="User Friendly Dashbaord"
                className="w-full rounded-lg shadow-md "
              />
            </div>
            <div className="bg-teal-100 rounded-2xl p-6">
              <img
                src={Payment}
                alt="Builder Interface"
                className="w-full rounded-lg shadow-md"
              />
              <h3 className="text-lg font-jak font-semibold my-4">
                Accept secure payments
              </h3>
              <p className="text-gray-800 mb-4 md:text-lg text-sm">
                Get a custom link like yourdentalclinic.dimpified.com in
                minutes.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
            <div className="bg-teal-100 rounded-2xl p-6">
              <h3 className="text-xl font-semibold font-jak mb-4">
                Sell dental plans, services, and consultations online
              </h3>
              <p className="text-gray-600 mb-4 md:text-lg text-sm">
                List your services, offer combo packages, and boost earnings
                with upsells.
              </p>
              <img
                src={DentistImg}
                alt="Drag and Drop"
                className="w-96 rounded-lg shadow-md"
              />
            </div>
            <div className="bg-gradient-to-br from-teal-700 to-[#121212] text-white rounded-2xl p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold font-jak mb-2">
                Track revenue & customer activity in real-time
              </h3>
              <p className="text-gray-300 mb-4 md:text-lg text-sm">
                Manage bookings, earnings, and patients—all from your phone.
              </p>

              <img
                loading="lazy"
                src={Dashboard}
                alt="User Friendly Dashbaord"
                className="w-full rounded-lg shadow-md "
              />
            </div>
            <div className="bg-teal-100 text-gray-800 rounded-2xl p-6 flex flex-col justify-between">
              <img
                src={Temp}
                alt="UI Components"
                className="w-full  rounded-lg shadow-md"
              />
              <h3 className="text-lg font-jak font-semibold">
                Look professional with a custom website & booking portal
              </h3>
              <p className="mb-4 md:text-lg text-sm">
                Send automatic reminders and collect glowing reviews to build
                your reputation.
              </p>
            </div>
          </div>
        </section>
        <section className="z-10 ">
          <div className="flex flex-col h-full  py-4 px-4  ">
            <div className="bg-teal-50 rounded-3xl py-10 px-6 lg:py-24">
              <div className="relative h-full">
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  <div className="order-1 lg:order-2 mb-4 md:w-6/12 md:mb-0 md:pl-36 ">
                    <img
                      loading="lazy"
                      src={DentistRight}
                      className=" w-full rounded-[60%_40%_60%_40%/40%_60%_40%_60%] max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp"
                      alt="Booking Management"
                    />
                  </div>
                  <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-24">
                    <span className="font-semibold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-gradient-to-r from-pink-100 to-transparent rounded-full">
                      100% Secure. HIPAA-Aware. Mobile Friendly.
                    </span>
                    <h1 className="font-semibold font-jak md:text-4xl text-2xl  text-dark mb-3">
                      We understand trust is everything in healthcare.
                    </h1>
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      That’s why we’ve built Dimpified with enterprise-grade
                      security and tools designed for modern dentists.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <FaClock className="text-yellow-300" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Set up in 10 minutes or less
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
                          Plans from just $24.99/month
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsChatDots className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          24/7 Customer Support
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <FaWallet className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Works with American banks and wallets
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pb-6 px-6 md:px-12  md:pt-24 lg:px-40  text-gray-800 bg-cover bg-center">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-jak  font-semibold mb-4">
              What You'll Get Instantly After Subscribing
            </h2>
            <p className="text-lg text-gray-600">
              Dimpified isn't built for selling products—it’s built for you, the
              service professional.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 animate-slide">
            {[
              {
                title: "Personalized dental website",
                desc: "Get a professional site instantly—no tech skills needed.",
                img: <FaWebAwesome className="text-4xl text-teal-600" />,
              },
              {
                title: "Online booking calendar",
                desc: "Let patients self-book appointments anytime.",
                img: <FaCalendarCheck className="text-4xl text-yellow-500" />,
              },
              {
                title: "Payment gateway (International cards accepted)",
                desc: "Collect secure payments online, even when you're offline.",
                img: <FaMoneyBill className="text-4xl text-green-500" />,
              },
              {
                title: "Automated reminders for patients",
                desc: "Reduce no-shows with WhatsApp, SMS, and email reminders.",
                img: <FaBell className="text-4xl text-yellow-300" />,
              },
              {
                title: "Business analytics dashboard",
                desc: "Track bookings, revenue, and patient activity in real time.",
                img: <BsGrid3X2GapFill className="text-4xl text-blue-500" />,
              },
              {
                title: "Marketing tools to attract new patients",
                desc: "Promote services with referral links, reviews, and more.",
                img: <BsMegaphoneFill className="text-4xl text-red-500" />,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-box flex items-center gap-6 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="feature-box-icon flex-shrink-0">
                  <LazyLoad height={48} width={48} offset={100}>
                    {feature.img}
                  </LazyLoad>
                </div>
                <div className="feature-box-content text-left">
                  <h3 className="font-semibold text-dark-gray text-lg mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-teal-700 py-20 md:my-20 my-6  text-white text-center">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-5xl font-semibold font-jak mb-12">
              How It Works
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              {steps.map((step, index) => (
                <div key={index} className="relative flex-1">
                  <div className="w-20 h-20 rounded-full bg-white hover:bg-teal-100 text-black flex items-center justify-center mx-auto text-xl font-semibold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-gray-400 max-w-xs mx-auto">
                    {step.description}
                  </p>

                  {/* Line connector */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute right-0 top-10 w-full h-0.5 bg-gray-500 z-[-1] translate-x-[60%]"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-row items-center justify-center gap-1 mt-8 w-full mb-6 md:text-lg text-sm   text-center ">
              {" "}
              <FaLightbulb className="text-sec10 " /> BONCa: We promote you to
              patients in your area!
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-4 overflow-hidden">
          <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
            <div className="flex flex-col lg:flex-row justify-center gap-0">
              <div className="lg:w-6/12 md:w-10/12 py-10 lg:pr-28">
                <span className="font-semibold text-xs uppercase text-dark bg-gray-100 rounded-full py-2 px-5 mb-5 inline-block">
                  Plans & Pricing
                </span>
                <h1 className=" font-semibold font-jak  md:text-4xl text-2xl  mb-3">
                  Pick a Plan to Get Started Today
                </h1>
                <p className="text-md text-dark mb-4 leading-relaxed w-11/12 lg:w-full">
                  No free plan available – but every plan includes full merchant
                  tools.
                </p>
                {/* Feature Box 1 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-teal-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-teal-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Affordable monthly plans
                  </span>
                </div>
                {/* Feature Box 2 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-teal-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-teal-500" />
                  </div>
                  <span className="text-lg text-dark">No hidden fees</span>
                </div>
                {/* Feature Box 3 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-teal-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-teal-500" />
                  </div>
                  <span className="text-lg text-dark">Cancel anytime</span>
                </div>
                <Link to="/pricing">
                  <button className="inline-flex items-center bg-teal-700 hover:bg-teal-500 text-white  py-3 px-5 rounded-full shadow  transition">
                    <span>View Subscription Plans</span>
                  </button>
                </Link>
              </div>
              <div className="md:w-6/12  mb-5 lg:mb-0 lg:px-8 lg:pl-32">
                <div>
                  <img
                    loading="lazy"
                    src={DentistLeft}
                    className="w-full rounded-[60%_40%_60%_40%/40%_60%_40%_60%] w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp
"
                    alt="Customer insights"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className=" lg:px-32  pb-10 bg-cover bg-center">
          <div className="mt-24 bg-teal-100 rounded-3xl md:py-32 md:px-32 py-20 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden  mx-auto">
            <h2 className="text-2xl md:text-4xl font-semibold font-jak  leading-snug mb-4">
              Join Thousands of Dentists Already Onboard
            </h2>
            <p className="mb-8">
              Dentists across Canada & 20+ countries are turning their clinics
              into digital businesses. Don’t be left behind.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-8-xl">
              <Link to="/pricing">
                {" "}
                <button className="btn hover:bg-gradient-to-l from-teal-800 via-teal-600 to-[#f1f1f1] bg-gradient-to-r text-white py-4 px-6 rounded-full flex items-center justify-center w-full md:w-auto transition">
                  <span className="mr-3 text-md">Set Up My Dentist Site</span>
                  <FaArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </section>
        <section className="px-4 py-12 lg:px-12 lg:py-12 bg-gray-50">
          <div className="">
            <div className="flex items-center justify-center text-center mb-6">
              <div className="w-full max-w-2xl">
                <h2 className="alt-font md:text-4xl font-jak font-semibold text-2xl text-dark tracking-tight mb-0">
                  Frequently asked questions
                </h2>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="container mx-auto px-6">
                <div className="space-y-4">
                  <Disclosure className="bg-white p-4">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-semibold text-lg">
                            Is Dimpified free to use?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          No. Dimpified is a paid platform with affordable plans
                          starting at just $24.99/month. There’s no free plan,
                          but every plan includes premium features built
                          specifically for dentists.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure className="bg-white p-4">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-semibold text-lg">
                            What do I need to get started?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Just your phone, a few service details, and your
                          account info to get paid.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure className="bg-white p-4">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-semibold text-lg">
                            Can patients pay online?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Yes! We support Visa and MasterCard. Your patients can
                          pay you even when you’re offline.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure className="bg-white p-4">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-semibold text-lg">
                            Can I manage multiple dental clinics in one account?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Yes! Our higher plans let you add team members and
                          track individual performance.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure className="bg-white p-4">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-semibold text-lg">
                            Why Dimpified instead of Instagram?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Instagram shows your work. Dimpified gets you booked,
                          paid, and reviewed—all in one place.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure className="bg-white p-4">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-semibold text-lg">
                            What if I need help?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          We’ve got your back on WhatsApp, phone, and email. You
                          are guaranteed 24/7 Customer Support
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-teal-500  bg-cover bg-center text-white">
          <div className="mt-24 bg-teal-500 rounded-3xl md:py-32 md:px-32 py-20 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden  mx-auto">
            <h2 className="text-2xl md:text-4xl font-jak  font-semibold leading-snug mb-4">
              Ready to Grow Your Dental Practice?
            </h2>
            <p className="mb-8">
              Start your journey with Dimpified today and never worry about
              missed bookings, unpaid visits, or digital chaos again
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-8-xl">
              <Link to="/pricing">
                {" "}
                <button className="btn bg-teal-100 hover:bg-teal-700 hover:text-white text-black py-4 px-6 rounded-2xl flex items-center justify-center font-semibold w-full md:w-auto transition">
                  <span className="mr-3 text-md">Subscribe Now</span>
                  <FaArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </section>

        <FooterWithLinks />
      </div>
    </motion.div>
  );
};

export default CaDentistOnboarding;
