// import node module libraries
import React, { useEffect, useState } from "react";

import {
  FaArrowRight,
  FaPlay,
  FaCheck,
  FaQuoteLeft,
  FaQuoteRight,
  FaCalendarAlt,
  FaMap,
  FaLink,
  FaLightbulb,
} from "react-icons/fa";
import Modal from "../LandingPages/images/bookingmodal.png";
import { BsBank } from "react-icons/bs";

import FloatingContactButton from "../LandingPages/FloatingContact";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { motion } from "motion/react";
import Dashboard from "./images/dashboard.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import DarkNavbar from "../LandingPages/DarkNavbar";
import { FooterWithLinks } from "../LandingPages/FooterWithLinks";

// Import images
import SpaImg from "./images/makeup-boss.jpg";
import SpaMiddle from "./images/spahero.jpg";

import PricingList from "./images/pricing-list.jpg";

import DimpVid from "../LandingPages/images/dimp-vid.png";

import Temp from "../LandingPages/images/templates-new.png";
import Payment from "./images/payment-us.jpg";
import GlowBG from "../LandingPages/images/glow-bg.svg";

import Booking from "../LandingPages/images/booking.jpg";
import ScreenShot from "../LandingPages/images/templatesnoplay.png";
import { Link, useNavigate } from "react-router-dom";
import TagManager from "react-gtm-module";
import { FaImagePortrait } from "react-icons/fa6";

const reviews = [
  {
    name: "Melissa, Scottsdale, AZ",
    text: "Since using this platform, my spa bookings have doubled—and I’ve noticed a big rise in loyal clients. Managing everything from my phone is a total game-changer!",
  },
  {
    name: "Jason, Day Spa – Atlanta, GA",
    text: "I no longer have to manage DMs and phone calls all day. Clients now book, pay, and get reminders automatically. It’s streamlined everything.",
  },
  {
    name: "Tanya, Miami, FL",
    text: "Setting up my booking site was super simple. Clients can now view our treatments and book instantly. Business is booming!",
  },
  {
    name: "Nicole, Esthetician – Brooklyn, NY",
    text: "Finally, a platform that gets how wellness businesses work. It was quick to set up and makes managing my daily appointments effortless.",
  },
  {
    name: "Jasmine, Houston, TX",
    text: "The insights I get from the reports help me understand client habits and customize our spa services. It's helped us grow fast!",
  },
  {
    name: "Marcus, Wellness Coach – Los Angeles, CA",
    text: "As a wellness coach, this tool helped me shift online and grow my client list threefold. Everything just works together beautifully.",
  },
  {
    name: "Sophie, San Diego, CA",
    text: "I love how easy it is to schedule sessions and send reminders. My clients show up on time, and I get fewer last-minute cancellations.",
  },
  {
    name: "Alicia, Chicago, IL",
    text: "This software completely changed how we run our spa. From managing supplies to engaging with clients—it's an all-in-one solution.",
  },
  {
    name: "Brian, Denver, CO",
    text: "Creating my profile and listing our spa packages was a breeze. Clients book directly through the app now. So much less back-and-forth!",
  },
  {
    name: "Vanessa, Tampa, FL",
    text: "The automatic reminders are a lifesaver. My regulars love the convenience, and my calendar stays full without extra effort.",
  },
  {
    name: "Kyle, Seattle, WA",
    text: "I never thought I’d be able to manage my entire spa operation from one app. It’s seamless, powerful, and has made us more efficient.",
  },
  {
    name: "Grace, Charlotte, NC",
    text: "Customer support was amazing—they helped me get everything set up in no time. Now I’ve got a polished online presence bringing in new clients weekly!",
  },
  {
    name: "Lena, Nashville, TN",
    text: "The built-in marketing tools help me stay top of mind with my spa clients and grow our reach without extra effort or ad spend.",
  },
];

const CaSpaOnboarding = () => {
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
    if (location.pathname === "/barbers") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Spa Shop");
      navigate("/auth/personal-information");
    } else if (location.pathname === "/hairdressers") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Hair Salon");
      navigate("/auth/personal-information");
    } else if (location.pathname === "/makeup") {
      sessionStorage.setItem("Category", "Personal Care Services");
      sessionStorage.setItem("SubCategory", "Spa Artist Services");
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
      title: "Choose a Plan & Create Your Account",
      description: "Sign up and select the right plan for your spa.",
    },
    {
      number: "02",
      title: "Add Your Spa Services",
      description:
        "List everything you offer: massages, facials, body scrubs, etc.",
    },
    {
      number: "03",
      title: "Share Your Booking Link & Get Paid",
      description:
        "Use WhatsApp, Instagram, or Facebook to share your spa’s page. Clients book, pay, and show up",
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
        <title>Launch Your Spa Business Online with Dimpified</title>
        <meta
          name="description"
          content="Learn how Dimpified connects service-based professionals in personal care, wellness, and grooming with clients seamlessly through a digital storefront and appointment system."
        />
        <meta property="og:title" content="Spa Onboarding - Dimpified" />
        <meta
          property="og:description"
          content="Learn how Dimpified connects service-based professionals in personal care, wellness, and grooming with clients seamlessly through a digital storefront and appointment system."
        />
      </Helmet>
      <div className="font-sen">
        <DarkNavbar />

        <section className="py-16 md:mt-o mt-8 md:py-24 font-jak px-4 relative bg-cover bg-center bg-primary4 text-white">
          <div className="flex flex-col h-full py-4 lg:px-24  mx-auto">
            <div className="flex flex-col md:flex-row items-center h-full">
              <div className="md:w-1/2 flex flex-col justify-center h-full items-center md:items-start text-center md:text-left">
                <div className="bg-primary3 rounded-full py-2 px-5 mb-5 w-max mx-auto md:mx-0">
                  <span className="font-semibold text-xs uppercase text-dark">
                    Plans start at just $24.99/month.
                  </span>
                </div>

                <h1 className="text-4xl lg:text-7xl text-dark font-normal leading-tight mb-6">
                  Turn Your{" "}
                  <span className="bg-gradient-to-r from-primary3 to-[#f1f1f1] text-transparent bg-clip-text">
                    Spa Into{" "}
                  </span>
                  a 24/7 Revenue Machine
                </h1>

                <p className="text-base md:text-lg text-dark leading-relaxed mb-8 max-w-lg">
                  Dimpified helps you sell sessions, accept payments, manage
                  bookings, and grow your spa — even while you sleep.
                </p>

                {/* <div className="flex flex-col md:flex-row items-center md:items-start mb-8 w-full max-w-lg">
                  <div className="flex items-center mr-4">
                    <div className="w-5 h-5 bg-purple-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                      <FaCheck className="text-purple-500 text-xs" />
                    </div>
                    <span className="text-lg text-dark">No coding needed</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-purple-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                      <FaCheck className="text-purple-500 text-xs" />
                    </div>
                    <span className="text-lg text-dark">
                      Mobile-first experience
                    </span>
                  </div>
                </div> */}

                <div className="flex flex-col sm:flex-row  gap-4  w-auto justify-center md:justify-start">
                  <Link to="/pricing">
                    <button className="btn hover:bg-purple-700 text-white py-3 px-6 rounded-lg flex items-center justify-center bg-primary3 transition">
                      <span className="mr-3">Start Now</span>
                      <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                <img
                  loading="lazy"
                  src={SpaMiddle}
                  className="rounded-[60%_40%_60%_40%/40%_60%_40%_60%] w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp"
                  alt="Spa"
                  style={{ animationDelay: "0.75s" }}
                />
              </div>
            </div>
          </div>
        </section>
        <FloatingContactButton />

        <section
          className="py-6 px-6 md:px-12  md:py-24 lg:px-40 bg-gray-50 text-gray-800 bg-cover bg-center"
          style={{ backgroundImage: `url(${GlowBG})` }}
        >
          {/* Header */}
          <div className=" mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-jak font-semibold mb-4">
              Everything Your Spa Needs — In One Platform
            </h2>
            <p className="md:text-lg text-sm text-gray-600">
              Running a spa is hard work.
              <br /> Let Dimpified handle the digital side—so you can focus on
              the massages.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="bg-purple-100 rounded-2xl p-6">
              <img
                src={Temp}
                alt="Builder Interface"
                className="w-full rounded-lg shadow-md"
              />
              <h3 className="text-lg font-jak font-semibold my-4">
                Beautiful Service Page
              </h3>
              <p className="text-gray-800 mb-4 md:text-lg text-sm">
                Your own website with your name, pricing, photos, and services.
              </p>
            </div>
            <div className="bg-purple-100 rounded-2xl p-6">
              <h3 className="text-xl font-semibold font-jak mb-4">
                Online Booking Page
              </h3>
              <p className="text-gray-600 mb-4 md:text-lg text-sm">
                Let clients book massages, facials, waxing, and other treatments
                directly online.
              </p>
              <img
                src={Modal}
                alt="Drag and Drop"
                className="w-full rounded-lg shadow-md"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
            <div className="bg-purple-100 text-gray-800 rounded-2xl p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold mb-2 font-jak">
                Smart Appointment Manager
              </h3>
              <p className="text-gray-800 mb-4 md:text-lg text-sm">
                Avoid overbooking and missed appointments. Let Dimpified
                automate your schedule and reminders.
              </p>

              <img
                loading="lazy"
                src={Booking}
                alt="Booking Module on Dashboard"
                className="w-full rounded-lg shadow-md "
              />
            </div>
            <div className="bg-gradient-to-br from-primary4 to-[#121212] text-white rounded-2xl p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold font-jak mb-2">
                Instant Payments
              </h3>
              <p className="text-gray-300 mb-4 md:text-lg text-sm">
                Collect payments securely via bank transfer, debit card, or
                wallet — with deposit and pay-in store options.
              </p>

              <img
                loading="lazy"
                src={Payment}
                alt="Payment Dashbaord"
                className="w-full rounded-lg shadow-md "
              />
            </div>
            <div className="bg-purple-100 text-gray-800 rounded-2xl p-6 flex flex-col justify-between">
              <img
                src={Dashboard}
                className="w-full  rounded-lg shadow-md"
              />
              <h3 className="text-lg font-jak font-semibold">
                Built-in Analytics
              </h3>
              <p className="mb-4 md:text-lg text-sm">
                Know who’s booking, when, and how much you’re making — all at a
                glance.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-primary4 py-20 text-white text-center">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-5xl font-semibold font-jak mb-12">
              Start in 3 Easy Steps
            </h2>
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              {steps.map((step, index) => (
                <div key={index} className="relative flex-1">
                  <div className="w-20 h-20 rounded-full bg-white hover:bg-purple-100 text-black flex items-center justify-center mx-auto text-xl font-semibold mb-4">
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
              <FaLightbulb className="text-sec10 " /> BONUS: We promote you to
              customers in your area!
            </div>
          </div>
        </section>
       

        <section className="bg-gray-50 p-4 md:py-24  overflow-hidden">
          <div className="flex flex-col h-full  py-4 px-4 lg:px-16">
            <div className="flex flex-col lg:flex-row justify-center gap-0">
              <div className="lg:w-3/12 py-10">
                <h2 className="text-2xl md:text-4xl font-semibold mb-4 font-jak ">
                  What Artists{" "}
                  <span className="text-primary3">Are Saying </span>
                </h2>

                <Swiper
                  modules={[Autoplay, Navigation, Pagination]}
                  // pagination={{ clickable: true }}
                  autoplay={{
                    delay: 3000, // 5 seconds between slides
                    disableOnInteraction: false,
                  }}
                  spaceBetween={30}
                  slidesPerView={1}
                  className="w-full max-w-2xl"
                >
                  {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                      <p className="text-md md:text-xl text-dark mb-4 md:text-md leading-relaxed w-11/12 lg:w-full mx-auto">
                        <FaQuoteLeft className="text-2xl text-primary3 " />
                        {review.text}
                        <FaQuoteRight className=" text-2xl text-primary3 " />
                        <br />— <strong>{review.name}</strong>
                      </p>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="md:w-9/12 mb-5 md:mb-0 lg:px-8 ">
                <div>
                  {!showVideo ? (
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={DimpVid}
                        alt="Video thumbnail"
                        className="w-full object-cover h-45 md:h-[32rem]"
                      />

                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={() => setShowVideo(true)}
                          className="relative animate-ping-twice bg-gray-50 hover:text-white shadow-lg text-primary3 hover:bg-red-500 p-4 md:p-6 rounded-full flex items-center justify-center transition overflow-visible w-16 h-16 md:w-20 md:h-20"
                          aria-label="Play video"
                        >
                          <span className="absolute inset-0 rounded-full bg-primary3 opacity-60 animate-ping z-[1]"></span>
                          <FaPlay className="text-2xl md:text-2xl" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="aspect-w-16 aspect-h-9 rounded-xl overflow-hidden">
                      <iframe
                        className="w-full h-48 md:h-[32rem]"
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-4 overflow-hidden">
          <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
            <div className="flex flex-col lg:flex-row justify-center gap-0">
              <div className="lg:w-5/12 md:w-10/12 py-10 lg:pr-28">
                <span className="font-semibold text-xs uppercase text-dark bg-gray-100 rounded-full py-2 px-5 mb-5 inline-block">
                  Plans & Pricing
                </span>
                <h1 className=" font-semibold font-jak  md:text-4xl text-2xl  mb-3">
                  Affordable Plans Made for Spa Owners
                </h1>
                <p className="text-md text-dark mb-4 leading-relaxed w-11/12 lg:w-full">
                  Choose a plan that fits your business. No hidden fees, no
                  stress.
                </p>
                {/* Feature Box 1 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-purple-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-purple-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Affordable monthly plans
                  </span>
                </div>
                {/* Feature Box 2 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-purple-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-purple-500" />
                  </div>
                  <span className="text-lg text-dark">No hidden fees</span>
                </div>
                {/* Feature Box 3 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-purple-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-purple-500" />
                  </div>
                  <span className="text-lg text-dark">No stress</span>
                </div>
                <Link to="/pricing" className="mr-3">
                  <button className="inline-flex items-center bg-primary4 hover:bg-primary3 text-white  py-3 px-5 rounded-full shadow  transition">
                    <span>Compare Full Plans</span>
                  </button>
                </Link>
                <Link to="/pricing">
                  <button className="inline-flex items-center bg-primary4 hover:bg-primary3 text-white  py-3 px-5 rounded-full shadow  transition">
                    <span>Start Now</span>
                  </button>
                </Link>
              </div>
              <div className="md:w-7/12  mb-5 lg:mb-0 lg:px-8 lg:pl-32">
                <div>
                  <img
                    loading="lazy"
                    src={PricingList}
                    className="w-full  rounded-xl"
                    alt="Pricing Snapshot"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="pb-6 px-6 md:px-12  md:pt-24 lg:px-40  text-gray-800 bg-cover bg-center">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-jak  font-semibold mb-4">
              Powerful Tools to Grow Your Hustle
            </h2>
            <p className="text-lg text-gray-600">
              Dimpified isn't built for selling products—it’s built for you, the
              service professional.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-6 animate-slide">
            {/* Feature Items - now in single column with image left, text right */}
            {[
              {
                title: "Shareable Link",
                desc: "Share your booking link on WhatsApp and Instagram",
                img: <FaLink className="text-4xl text-purple-600" />,
              },
              {
                title: "Location Feature",
                desc: "Let customers find your shop with maps",
                img: <FaMap className="text-4xl text-blue-600" />,
              },
              {
                title: "Flexible Availability",
                desc: "Block time when you’re not available",
                img: <FaCalendarAlt className="text-4xl text-yellow-500" />,
              },
              {
                title: "Secure Payments",
                desc: "Secure transactions and daily payouts",
                img: <BsBank className="text-4xl text-blue-500" />,
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

        <section className=" lg:px-32  pb-10 bg-cover bg-center">
          <div className="mt-24 bg-purple-100 rounded-3xl md:py-32 md:px-32 py-20 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden  mx-auto">
            <h2 className="text-2xl md:text-4xl font-semibold font-jak  leading-snug mb-4">
              Your Spa Deserves More Clients — And Less Stress
            </h2>
            <p className="mb-8">
              Start getting booked and paid online with Dimpified. No tech
              headaches. Just steady growth.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-8-xl">
              <Link to="/pricing">
                <button className="btn hover:bg-gradient-to-l from-[#4f2683] via-[#9966cc] to-[#ff8201] bg-gradient-to-r text-white py-4 px-6 rounded-full flex items-center justify-center w-full md:w-auto transition">
                  <span className="mr-3 text-md">
                    Get Started — Choose a Plan
                  </span>
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
                  Frequently Asked Questions
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
                            Do I need to have a website already?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          No. Dimpified gives you a ready-made booking page.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure className="bg-white p-4">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-semibold text-lg">
                            Can I accept American payments?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Yes. We support local transfers, cards, and wallets.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure className="bg-white p-4">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-semibold text-lg">
                            Will it work on my phone?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Yes. You can manage your spa business 100% from your
                          phone via our merchant mobile App.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure className="bg-white p-4">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-semibold text-lg">
                            Is it free to try?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          No. All plans are paid. But it’s affordable — and
                          powerful.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary3  bg-cover bg-center text-white">
          <div className="mt-24 bg-primary3 rounded-3xl md:py-32 md:px-32 py-20 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden  mx-auto">
            <h2 className="text-2xl md:text-4xl font-jak  font-semibold leading-snug mb-4">
              It’s Time to Level Up Your MakeUp Business.
            </h2>
            <p className="mb-8">Go digital. Get discovered. Get paid.</p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-8-xl">
              <Link to="/pricing">
                {" "}
                <button className="btn bg-purple-100 hover:bg-primary4 hover:text-white text-black py-4 px-6 rounded-2xl flex items-center justify-center font-semibold w-full md:w-auto transition">
                  <span className="mr-3 text-md">
                    Choose My Plan & Launch Now
                  </span>
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

export default CaSpaOnboarding;
