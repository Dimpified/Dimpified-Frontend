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

import Modal from "../LandingPages/images/bookingmodal.png";
import {
  BsLayoutTextSidebarReverse,
  BsChatDots,
  BsBank,
  BsPeople,
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
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import DarkNavbar from "../LandingPages/DarkNavbar";
import { FooterWithLinks } from "../LandingPages/FooterWithLinks";

// Import images
import GymImg from "./images/gymcustomer.jpg";
import GymLeft from "./images/gymmoney.jpg";
import GymRight from "./images/gymbooking.jpg";
import GymMiddle from "./images/gymimage.jpg";

import DimpVid from "../LandingPages/images/dimp-vid.png";

import Csr from "../LandingPages/images/csr.png";
import Temp from "../LandingPages/images/templates-new.png";
import GlowBG from "../LandingPages/images/glow-bg.svg";

import Mobile from "./images/mobile.png";
import Dashboard from "./images/dashboard.jpg";

import { Link, useNavigate } from "react-router-dom";
import TagManager from "react-gtm-module";
import { FaPeopleLine } from "react-icons/fa6";

const reviews = [
  {
    name: "Tyler, Toronto, ON",
    text: "Since using this software, my bookings have doubled, and I’ve seen a big increase in returning members. Managing everything from my phone is a total game-changer!",
  },
  {
    name: "Michelle, Gym Owner – Vancouver, BC",
    text: "No more juggling texts and DMs. Members now book classes, pay online, and get reminders automatically. It's made life easier—for them and for me.",
  },
  {
    name: "Jaspreet, Calgary, AB",
    text: "Setting up our website was super simple. Members can now see our class schedule, register online, and even choose their trainer. It’s boosted our bookings big time.",
  },
  {
    name: "Dave, Fitness Coach – Halifax, NS",
    text: "Finally, a platform built for fitness businesses! Easy to set up, and even easier to run. It's taken the admin work off my plate.",
  },
  {
    name: "Sofia, Ottawa, ON",
    text: "The analytics tools gave me real insight into member behaviour. Now I offer better packages based on actual data. Highly recommended!",
  },
  {
    name: "Noah, Personal Trainer – Edmonton, AB",
    text: "Dimpified helped me move my sessions online and scale up fast. I’m reaching more clients, and managing my calendar has never been smoother.",
  },
  {
    name: "Aisha, Mississauga, ON",
    text: "Booking and reminders are fully automated now. My no-show rate has dropped, and I’m spending way less time chasing confirmations.",
  },
  {
    name: "Lucas, Gym Owner – Winnipeg, MB",
    text: "This software completely changed how I run my gym. From scheduling to payments to member communication—everything runs through one platform.",
  },
  {
    name: "Marie, Montreal, QC",
    text: "Setting up services and pricing was easy. Members now register through the app, and I can focus more on training than admin.",
  },
  {
    name: "Nathan, Saint John, NB",
    text: "The reminders have made a huge difference. Our members love the convenience, and our retention rates have gone up noticeably.",
  },
  {
    name: "Liam, Regina, SK",
    text: "I never thought I could manage my gym operations from one dashboard. It’s seamless, powerful, and has helped me grow my member base faster.",
  },
  {
    name: "Olivia, Brampton, ON",
    text: "The support team is excellent! They got me set up fast and even helped me customize the platform to match my brand. Super professional!",
  },
  {
    name: "Emma, Victoria, BC",
    text: "The built-in marketing tools have helped us reach more locals and keep current members engaged. It’s been a great investment for our gym.",
  },
];

const CaGymOnboarding = () => {
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
    if (location.pathname === "/gyms") {
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
      title: "Sign Up & Choose a gym template",
      description:
        "We’ll guide you through selecting a design tailored for your fitness brand.",
    },
    {
      number: "02",
      title: "Customize with your content",
      description: "Add your logo, pricing, class schedule, and more.",
    },
    {
      number: "03",
      title: "Launch & grow",
      description: "Start accepting bookings and payments within hours.",
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
        <title>Launch Your Gym Online with Dimpified</title>
        <meta
          name="description"
          content="Learn how Dimpified connects service-based professionals in personal care, wellness, and grooming with members seamlessly through a digital storefront and appointment system."
        />
        <meta property="og:title" content="CaGymOnboarding Us - My App" />
        <meta
          property="og:description"
          content="Learn how Dimpified connects service-based professionals in personal care, wellness, and grooming with members seamlessly through a digital storefront and appointment system."
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
                    Launch Your Gym Online With Dimpified
                  </span>
                </div>

                <h1 className="text-4xl lg:text-7xl text-dark font-normal leading-tight mb-6">
                  <span className="bg-gradient-to-r from-primary3 to-[#f1f1f1] text-transparent bg-clip-text">
                    Get More members.{" "}
                  </span>{" "}
                  Simplify Bookings. Scale Effortlessly.
                </h1>

                <p className="text-base md:text-lg text-dark leading-relaxed mb-8 max-w-lg">
                  Trusted by gyms across Canada. Subscription required —
                  starting at $24.99/month.
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
                  src={GymMiddle}
                  className="rounded-[60%_40%_60%_40%/40%_60%_40%_60%] w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp"
                  alt="Gym"
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
              Why Gym Owners Choose Dimpified?
            </h2>
            <p className="md:text-lg text-sm text-gray-600">
              Running a gym facility can be overwhelming.
              <br /> Let Dimpified handle the digital side—so you can focus on
              the the sessions.
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
                All-in-One Gym Website
              </h3>
              <p className="text-gray-800 mb-4 md:text-lg text-sm">
                Create a beautiful, mobile-friendly website where members can
                book classes, pay online, and join memberships — no coding
                needed.{" "}
              </p>
            </div>

            <div className="bg-purple-100 text-gray-800 rounded-2xl p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold mb-2 font-jak">
                Automated Bookings & Payments
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
                Track Members & Revenue
              </h3>
              <p className="text-gray-600 mb-4 md:text-lg text-sm">
                Monitor client activity, send automated reminders, and grow your
                income — all in one dashboard.
              </p>
              <img
                src={Dashboard}
                alt="Dashboard"
                loading="lazy"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="bg-gradient-to-br from-primary4 to-[#121212] text-white rounded-2xl p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold font-jak mb-2">
                Mobile-Friendly Dashboard
              </h3>
              <p className="text-gray-300 mb-4 md:text-lg text-sm">
                Manage bookings, earnings, and members—all from your phone.
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
                loading="lazy"
                alt="UI Components"
                className="w-full  rounded-lg shadow-md"
              />
              <h3 className="text-lg font-jak font-semibold">
                Local Support, Real Results
              </h3>
              <p className="mb-4 md:text-lg text-sm">
                Our team supports you every step of the way — from setup to
                scale-up.
              </p>
            </div>
          </div>
        </section>
        <section className="bg-purple-50 p-4 overflow-hidden">
          <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
            <div className="flex flex-col lg:flex-row justify-center gap-0">
              <div className="lg:w-6/12 md:w-10/12 py-10 lg:pr-28">
                <span className="font-semibold text-xs uppercase text-dark bg-gray-100 rounded-full py-2 px-5 mb-5 inline-block">
                  Who Is This For?
                </span>
                <h1 className=" font-semibold font-jak  md:text-4xl text-2xl  mb-3">
                  Whether you run a:
                </h1>

                {/* Feature Box 1 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-purple-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-purple-500" />
                  </div>
                  <span className="text-lg text-dark">Fitness studio</span>
                </div>
                {/* Feature Box 2 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-purple-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-purple-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Personal training business
                  </span>
                </div>
                {/* Feature Box 3 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-purple-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-purple-500" />
                  </div>
                  <span className="text-lg text-dark">CrossFit box</span>
                </div>
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-purple-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-purple-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Dance or Zumba class
                  </span>
                </div>
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-purple-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-purple-500" />
                  </div>
                  <span className="text-lg text-dark">Martial arts dojo</span>
                </div>
                <p className="text-md text-dark mb-4 leading-relaxed w-11/12 lg:w-full">
                  …Dimpified is built to help you attract and retain members
                  online.
                </p>
                <Link to="/pricing">
                  <button className="inline-flex items-center bg-primary4 hover:bg-primary3 text-white  py-3 px-5 rounded-full shadow  transition">
                    <span>Scale your gym business now!</span>
                  </button>
                </Link>
              </div>
              <div className="md:w-6/12  mb-5 lg:mb-0 lg:px-8 lg:pl-32">
                <div>
                  <img
                    loading="lazy"
                    src={GymImg}
                    className="w-full rounded-[60%_40%_60%_40%/40%_60%_40%_60%] w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp
"
                    alt="Customer insights"
                  />
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
                  {" "}
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

        <section className="bg-gray-50 p-4 overflow-hidden">
          <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
            <div className="flex flex-col lg:flex-row justify-center gap-0">
              <div className="lg:w-6/12 md:w-10/12 py-10 lg:pr-28">
                <span className="font-semibold text-xs uppercase text-dark bg-gray-100 rounded-full py-2 px-5 mb-5 inline-block">
                  What you'll get
                </span>
                <h1 className=" font-semibold font-jak  md:text-4xl text-2xl  mb-3">
                  Built for gyms serious about increasing revenue.
                </h1>
                <p className="text-md text-dark mb-4 leading-relaxed w-11/12 lg:w-full">
                  Dimpified is crafted to cater for you as the gym owner and
                  your member's convenience
                </p>
                {/* Feature Box 1 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-purple-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-purple-500" />
                  </div>
                  <span className="text-lg text-dark">Custom gym website</span>
                </div>
                {/* Feature Box 2 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-purple-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-purple-500" />
                  </div>
                  <span className="text-lg text-dark">Online bookings</span>
                </div>
                {/* Feature Box 3 */}
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-purple-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-purple-500" />
                  </div>
                  <span className="text-lg text-dark">Payment integration</span>
                </div>
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-purple-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-purple-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Automated client reminders
                  </span>
                </div>
                <div className="flex items-start mb-4">
                  <div className="w-11 h-11 bg-purple-100 border border-transparent shadow-lg rounded-full flex justify-center items-center mr-4">
                    <FaCheck className="text-purple-500" />
                  </div>
                  <span className="text-lg text-dark">
                    Branded client portal
                  </span>
                </div>
                <Link to="/pricing">
                  <button className="inline-flex items-center bg-primary4 hover:bg-primary3 text-white  py-3 px-5 rounded-full shadow  transition">
                    <span>Scale your gym business now!</span>
                  </button>
                </Link>
              </div>
              <div className="md:w-6/12  mb-5 lg:mb-0 lg:px-8 lg:pl-32">
                <div>
                  <img
                    loading="lazy"
                    src={GymLeft}
                    className="w-full rounded-[60%_40%_60%_40%/40%_60%_40%_60%] w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp
"
                    alt="Customer insights"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-primary4 py-6 md:py-10 text-white text-center">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-5xl font-semibold font-jak mb-12">
              How It Works
            </h2>
            <div className="flex flex-col md:flex-row justify-bettween items-center gap-10">
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
              <FaLightbulb className="text-sec10 " /> BONCa: We promote you to
              customers in your area!
            </div>
          </div>
        </section>

        <section className=" lg:px-32 px-6  py-10 bg-cover bg-center">
          <div className="md:my-12 my-4 bg-purple-100 rounded-3xl md:py-32 md:px-32 py-10 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden  mx-auto">
            <h2 className="text-2xl md:text-4xl font-semibold font-jak  leading-snug mb-4">
              Ready to Get More Gym members?
            </h2>
            <p className="mb-8">Pick a plan and launch your gym site today.</p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-8-xl">
              <Link to="/pricing">
                {" "}
                <button className="btn hover:bg-gradient-to-l from-[#4f2683] via-[#9966cc] to-[#ff8201] bg-gradient-to-r text-white py-4 px-6 rounded-full flex items-center justify-center w-full md:w-auto transition">
                  <span className="mr-3 text-md">Get Started Now</span>
                  <FaArrowRight />
                </button>
              </Link>
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
                      src={GymRight}
                      className="rounded-[60%_40%_60%_40%/40%_60%_40%_60%] w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp
"
                      alt="Booking Management"
                    />
                  </div>
                  <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-24">
                    <span className="font-semibold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-gradient-to-r from-pink-100 to-transparent rounded-full">
                      Still Thinking
                    </span>
                    <h1 className="font-semibold font-jak md:text-4xl text-2xl  text-dark mb-3">
                      What’s the cost of waiting?
                    </h1>
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      Your next 20–50 members are searching online. If they
                      can’t find your gym — they’ll sign up with someone else.
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
                          We list you on our homepage
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <FaPeopleLine className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Prospective members visit your page
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <FaCalendarAlt
                            className="text-yellow-500"
                            size={30}
                          />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          They book and pay before they come to the gym
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                          specifically for gyms.
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
                            Can I manage multiple gyms in one account?
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
        <section className="bg-primary3  bg-cover bg-center text-white">
          <div className="mt-24 bg-primary3 rounded-3xl md:py-32 md:px-32 py-20 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden  mx-auto">
            <h2 className="text-2xl md:text-4xl font-jak  font-semibold leading-snug mb-4">
              Join Canada’s Digital Fitness Revolution
            </h2>
            <p className="mb-8">
              Your gym deserves more. Let Dimpified help you grow online.
            </p>

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

export default CaGymOnboarding;
