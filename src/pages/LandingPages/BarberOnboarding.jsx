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
} from "react-icons/fa";
import Modal from "./images/bookingmodal.png";
import { BsLayoutTextSidebarReverse, BsChatDots, BsBank } from "react-icons/bs";

import FloatingContactButton from "./FloatingContact";
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

import DarkNavbar from "./DarkNavbar";
import { FooterWithLinks } from "./FooterWithLinks";

// Import images
import BarberImg from "./images/barberservices.jpg";
import BarberLeft from "./images/barberleft.jpg";
import BarberRight from "./images/barberright.jpg";
import BarberMiddle from "./images/barbermiddle.jpg";
import HairImg from "./images/mk2.jpg";
import DimpVid from "./images/dimp-vid.png";

import Csr from "./images/csr.png";
import Temp from "./images/templates-new.png";
import GlowBG from "./images/glow-bg.svg";

import Mobile from "./images/mobile.png";

import { Link, useNavigate } from "react-router-dom";
import TagManager from "react-gtm-module";

const reviews = [
  {
    name: "Chinedu, Port Harcourt",
    text: "Since using this software, my bookings have doubled, and I’ve seen a significant increase in repeat customers. The ability to manage everything from my phone is a game-changer!",
  },
  {
    name: "Moses, Barber – Kenya",
    text: "I stopped juggling WhatsApp and Instagram messages. Dimpified lets clients book online, pay upfront, and get reminders—automatically.",
  },
  {
    name: "Ade, Abuja",
    text: "Building a website was so easy. Now, clients can see my work and book appointments online. My business has never been better!",
  },
  {
    name: "Keisha, Hair Stylist – Jamaica",
    text: "It’s the first platform I’ve found that understands how service businesses work. Easy to set up and even easier to run.",
  },
  {
    name: "Femi, Lagos",
    text: "The insights I get from the analytics tools have helped me understand my customers better and tailor my services to their needs. Highly recommended!",
  },
  {
    name: "Daniel, Trainer – UK",
    text: "As a fitness coach, Dimpified helped me move my sessions online and triple my client base.",
  },
  {
    name: "Ngozi, Enugu",
    text: "I love how easy it is to schedule appointments and send reminders to my clients. It has saved me so much time and reduced no-shows drastically!",
  },
  {
    name: "Bola, Ibadan",
    text: "This software has transformed how I run my business. From inventory management to customer engagement, it’s a complete solution for me.",
  },
  {
    name: "Tunde, Kano",
    text: "Setting up my profile and services was straightforward. Now I get bookings directly from the app, and I can focus on delivering quality service to my clients.",
  },
  {
    name: "Esther, Benin City",
    text: "The automated reminders have been a lifesaver. My clients appreciate the convenience, and I’ve seen an increase in my appointment retention rates.",
  },
  {
    name: "Ibrahim, Sokoto",
    text: "I never imagined I could manage my business operations from a single platform. It’s seamless, efficient, and has boosted my productivity!",
  },
  {
    name: "Grace, Uyo",
    text: "The support team is amazing! They helped me set up everything quickly, and now I have a professional online presence that attracts new clients every week.",
  },
  {
    name: "Chika, Owerri",
    text: "The marketing tools included in this software have helped me reach more people and keep my existing clients engaged. I’m very happy with the results!",
  },
];

const BarberOnboarding = () => {
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
  const [showVideo, setShowVideo] = useState(false);
  const videoId = "dobePyv7kb4"; // YouTube video ID
  const steps = [
    {
      number: "01",
      title: "Sign Up & Choose a Plan",
      description: "Pick the plan that fits your hustle.",
    },
    {
      number: "02",
      title: "Set Up Your Services",
      description: "Add haircuts, beard trims, combos, and prices.",
    },
    {
      number: "03",
      title: "Share Your Link",
      description:
        "Customers book, pay, and show up. You get alerts instantly.",
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
        <title>Launch Your Barber Business Online with Dimpified</title>
        <meta
          name="description"
          content="Learn how Dimpified connects service-based professionals in personal care, wellness, and grooming with clients seamlessly through a digital storefront and appointment system."
        />
        <meta property="og:title" content="BarberOnboarding Us - My App" />
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
                    Trusted by barbers across Nigeria
                  </span>
                </div>

                <h1 className="text-4xl lg:text-7xl text-dark font-normal leading-tight mb-6">
                  Launch Your{" "}
                  <span className="bg-gradient-to-r from-primary3 to-[#f1f1f1] text-transparent bg-clip-text">
                    Barber Business Online{" "}
                  </span>
                  with Dimpified
                </h1>

                <p className="text-base md:text-lg text-dark leading-relaxed mb-8 max-w-lg">
                  The easiest way for barbers to grow, get booked, and earn more
                  —100% online.
                </p>

                <div className="flex flex-col hidden md:block md:flex-row items-center md:items-start mb-8 w-full max-w-lg">
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
                </div>

                <div className="flex flex-col sm:flex-row  gap-4  w-auto justify-center md:justify-start">
                  <Link to="/pricing">
                    <button className="btn hover:bg-purple-700 text-white py-3 px-6 rounded-lg flex items-center justify-center bg-primary3 transition">
                      <span className="mr-3">Get Started Now</span>
                      <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                <img
                  loading="lazy"
                  src={BarberMiddle}
                  className="rounded-[60%_40%_60%_40%/40%_60%_40%_60%] w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp"
                  alt="Barber"
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
              Why Dimpified for Barbers?
            </h2>
            <p className="md:text-lg text-sm text-gray-600">
              Running a barbershop is hard work.
              <br /> Let Dimpified handle the digital side—so you can focus on
              the cuts.
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
                Your Own Barber Website
              </h3>
              <p className="text-gray-800 mb-4 md:text-lg text-sm">
                Get a custom link like yourbarbershop.dimpified.com in minutes.
              </p>
            </div>

            <div className="bg-purple-100 text-gray-800 rounded-2xl p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold mb-2 font-jak">
                Online Booking & Payments
              </h3>
              <p className="text-gray-800 mb-4 md:text-lg text-sm">
                Let customers book appointments and pay ahead—even when you're
                busy.
              </p>

              <img
                loading="lazy"
                src={Modal}
                alt="User Friendly Dashbaord"
                className="w-full rounded-lg shadow-md "
              />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
            <div className="bg-purple-100 rounded-2xl p-6">
              <h3 className="text-xl font-semibold font-jak mb-4">
                Sell Haircuts, Beard Care, & Extras
              </h3>
              <p className="text-gray-600 mb-4 md:text-lg text-sm">
                List your services, offer combo packages, and boost earnings
                with upsells.
              </p>
              <img
                src={BarberImg}
                alt="Drag and Drop"
                className="w-96 rounded-lg shadow-md"
              />
            </div>
            <div className="bg-gradient-to-br from-primary4 to-[#121212] text-white rounded-2xl p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold font-jak mb-2">
                Mobile-Friendly Dashboard
              </h3>
              <p className="text-gray-300 mb-4 md:text-lg text-sm">
                Manage bookings, earnings, and clients—all from your phone.
              </p>

              <img
                loading="lazy"
                src={Mobile}
                alt="User Friendly Dashbaord"
                className="w-full rounded-lg shadow-md "
              />
            </div>
            <div className="bg-purple-100 text-gray-800 rounded-2xl p-6 flex flex-col justify-between">
              <img
                src={Csr}
                alt="UI Components"
                className="w-full  rounded-lg shadow-md"
              />
              <h3 className="text-lg font-jak font-semibold">
                Customer Reminders & Reviews
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
            <div className="bg-purple-50 rounded-3xl py-10 px-6 lg:py-24">
              <div className="relative h-full">
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  <div className="order-1 lg:order-2 mb-4 md:w-6/12 md:mb-0 md:pl-36 ">
                    <img
                      loading="lazy"
                      src={BarberRight}
                      className="lg:w-4/5 w-full rounded-xl"
                      alt="Booking Management"
                    />
                  </div>
                  <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-24">
                    <span className="font-semibold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-gradient-to-r from-pink-100 to-transparent rounded-full">
                      EASY STRESS-FREE PROCESS
                    </span>
                    <h1 className="font-semibold font-jak md:text-4xl text-2xl  text-dark mb-3">
                      Built for Nigerian Barbers. No Tech Skills Needed
                    </h1>
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      Dimpified is designed with YOU in mind.
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
                          Plans from just ₦4,500/month
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsChatDots className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Support in English & Pidgin
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <FaWallet className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Works with Nigerian banks and wallets
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 p-4 md:py-24  overflow-hidden">
          <div className="flex flex-col h-full  py-4 px-4 lg:px-16">
            <div className="flex flex-col lg:flex-row justify-center gap-0">
              <div className="lg:w-3/12 py-10">
                <h2 className="text-2xl md:text-4xl font-semibold mb-4 font-jak ">
                  See it <span className="text-primary3">in Action!</span>
                </h2>

                <p className="text-md text-dark mb-4 text-xl  leading-relaxed w-11/12 lg:w-full">
                  <FaQuoteLeft className="pr-4 text-4xl text-primary3" /> I
                  launched my barber website in 5 minutes and got my first
                  online booking the same day.”
                  <br /> — Femi Cutz, Abeokuta{" "}
                  <FaQuoteRight className="pl-4 text-4xl text-primary3" />
                </p>
              </div>
              <div className="md:w-9/12 mb-5 md:mb-0 lg:px-8 ">
                <div>
                  {!showVideo ? (
                    // Thumbnail with play button
                    <div className="relative rounded-xl overflow-hidden">
                      <img
                        src={DimpVid}
                        alt="Video thumbnail"
                        className="w-full object-cover h-45 md:h-[32rem]"
                      />

                      {/* Play button positioned absolutely at center of the image */}
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
                    // YouTube embed when play button is clicked
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

        <section className="bg-gray-50 p-4 overflow-hidden">
          <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
            <div className="flex flex-col lg:flex-row justify-center gap-0">
              <div className="lg:w-6/12 md:w-10/12 py-10 lg:pr-28">
                <span className="font-semibold text-xs uppercase text-dark bg-gray-100 rounded-full py-2 px-5 mb-5 inline-block">
                  Plans & Pricing
                </span>
                <h1 className=" font-semibold font-jak  md:text-4xl text-2xl  mb-3">
                  Built for barbers at every level—solo or team.
                </h1>
                <p className="text-md text-dark mb-4 leading-relaxed w-11/12 lg:w-full">
                  Dimpified is crafted to cater for you as an individual and
                  also for your team
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
                  <span className="text-lg text-dark">Cancel anytime</span>
                </div>
                <Link to="/pricing">
                  <button className="inline-flex items-center bg-primary4 hover:bg-primary3 text-white  py-3 px-5 rounded-full shadow  transition">
                    <span>See Pricing Plans</span>
                  </button>
                </Link>
              </div>
              <div className="md:w-6/12  mb-5 lg:mb-0 lg:px-8 lg:pl-32">
                <div>
                  <img
                    loading="lazy"
                    src={BarberLeft}
                    className="w-full lg:4/5  rounded-xl"
                    alt="Customer insights"
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
              Join Thousands of Barbers Already Onboard
            </h2>
            <p className="mb-8">
              Barbers across Nigeria & 20+ countries are turning their chairs
              into digital businesses. Don’t be left behind. Build Your Barber
              Brand the Smart Way Choose your plan and get started in minutes.
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-8-xl">
              <Link to="/pricing">
                {" "}
                <button className="btn hover:bg-gradient-to-l from-[#4f2683] via-[#9966cc] to-[#ff8201] bg-gradient-to-r text-white py-4 px-6 rounded-full flex items-center justify-center w-full md:w-auto transition">
                  <span className="mr-3 text-md">Set Up My Barber Site</span>
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
                          starting at just ₦4,500/month. There’s no free plan,
                          but every plan includes premium features built
                          specifically for barbers.
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
                            Can customers pay online?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Yes! We support Paystack, Flutterwave, and transfers.
                          Your customers can pay you even when you’re offline.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure className="bg-white p-4">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-semibold text-lg">
                            Can I manage multiple barbers in one account?
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
                          We’ve got your back on WhatsApp, phone, and email.
                          Support is available in English, Pidgin, and Yoruba.
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
              It’s Time to Level Up Your Barbing Business.
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

export default BarberOnboarding;
