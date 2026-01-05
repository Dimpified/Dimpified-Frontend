// import node module libraries
import React, { useEffect, useState } from "react";

import {
  FaArrowRight,
  FaCheckCircle,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaComments,
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
  FaBox,
} from "react-icons/fa";
import Modal from "../LandingPages/images/bookingmodal.png";
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
  BsPeopleFill,
  BsChatDots,
  BsBank,
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
import MakeupImg from "./images/makeup-boss.jpg";
import MakeupMiddle from "./images/makeup-customer.jpg";

import MakeupLeft from "./images/makeup-image.jpg";

import DimpVid from "../LandingPages/images/dimp-vid.png";

import Csr from "../LandingPages/images/editwebsite.jpg";
import Temp from "../LandingPages/images/templates-new.png";
import Payment from "./images/payment-us.jpg";
import GlowBG from "../LandingPages/images/glow-bg.svg";

import { Link, useNavigate } from "react-router-dom";
import TagManager from "react-gtm-module";
import { FaImagePortrait } from "react-icons/fa6";

const reviews = [
  {
    name: "Jasmine, Los Angeles, CA",
    text: "Since using this platform, my bookings have doubled, and I’ve seen a big jump in returning clients. Managing everything from my phone is a total game-changer!",
  },
  {
    name: "Brianna, Makeup Artist – Atlanta, GA",
    text: "I no longer have to juggle DMs on Instagram. Clients now book, pay, and get reminders automatically. It’s made my workflow so much smoother.",
  },
  {
    name: "Olivia, Brooklyn, NY",
    text: "Building my site was super easy. Now new clients can view my portfolio and book online anytime. My business is growing fast!",
  },
  {
    name: "Carmen, Makeup Artist – Miami, FL",
    text: "This is the first tool I’ve used that truly understands service businesses. It was easy to set up and makes my daily work effortless.",
  },
  {
    name: "Alyssa, Houston, TX",
    text: "The insights I get from the analytics help me understand client trends and offer better services. It’s made a real difference!",
  },
  {
    name: "Rachel, Beauty Coach – Chicago, IL",
    text: "As a beauty coach, this platform helped me move online and triple my client base. Everything just works!",
  },
  {
    name: "Taylor, San Diego, CA",
    text: "I love how simple it is to schedule clients and send automated reminders. It’s saved me hours and reduced missed appointments!",
  },
  {
    name: "Danielle, Phoenix, AZ",
    text: "From inventory tracking to managing my client list, this software has changed how I run my makeup studio. I’m never going back!",
  },
  {
    name: "Megan, Charlotte, NC",
    text: "Setting up my profile and listing my services was easy. I now get booked straight from the app—no more back-and-forth messages.",
  },
  {
    name: "Vanessa, Denver, CO",
    text: "Automated reminders have been a lifesaver. My clients love the convenience, and my schedule stays full!",
  },
  {
    name: "Nicole, Seattle, WA",
    text: "I didn’t think I could manage my whole business from one app, but this tool makes it possible. It’s efficient, sleek, and saves me so much time.",
  },
  {
    name: "Sierra, Orlando, FL",
    text: "The customer support is incredible! They walked me through setup and now I’ve got a professional online presence that attracts new bookings weekly.",
  },
  {
    name: "Madison, Nashville, TN",
    text: "The built-in marketing tools have helped me stay top of mind with my clients and grow my reach without needing to hire someone else.",
  },
];

const USMakeupOnboarding = () => {
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
      sessionStorage.setItem("SubCategory", "Makeup Shop");
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
        <title>Launch Your Makeup Business Online with Dimpified</title>
        <meta
          name="description"
          content="Learn how Dimpified connects service-based professionals in personal care, wellness, and grooming with clients seamlessly through a digital storefront and appointment system."
        />
        <meta property="og:title" content="Makeup Onboarding - Dimpified" />
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
                    Get Booked. Get Paid. Get Noticed.
                  </span>
                </div>

                <h1 className="text-4xl lg:text-7xl text-dark font-normal leading-tight mb-6">
                  Turn Your{" "}
                  <span className="bg-gradient-to-r from-primary3 to-[#f1f1f1] text-transparent bg-clip-text">
                    Beauty Skills{" "}
                  </span>
                  Into a Thriving Business
                </h1>

                <p className="text-base md:text-lg text-dark leading-relaxed mb-8 max-w-lg">
                  Join thousands of makeup artists who use Dimpified to sell
                  their services, showcase their work, and run their business
                  like a pro.
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
                      <span className="mr-3">Get Started Now</span>
                      <FaArrowRight />
                    </button>
                  </Link>
                </div>
              </div>

              <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
                <img
                  loading="lazy"
                  src={MakeupMiddle}
                  className="rounded-[60%_40%_60%_40%/40%_60%_40%_60%] w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp"
                  alt="Makeup"
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
              Why Makeup Artists Choose Dimpified
            </h2>
            <p className="md:text-lg text-sm text-gray-600">
              Running a make-up business is hard work.
              <br /> Let Dimpified handle the digital side—so you can focus on
              the glam.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            <div className="bg-purple-100 rounded-2xl p-6">
              <h3 className="text-xl font-semibold font-jak mb-4">
                Built Just for You
              </h3>
              <p className="text-gray-600 mb-4 md:text-lg text-sm">
                Dimpified isn't a generic website builder — it's made for
                service-based pros like makeup artists. Whether you’re freelance
                or salon-based, we help you sell your packages, schedule
                appointments, and get paid — all in one place.
              </p>
              <img
                src={MakeupImg}
                alt="Drag and Drop"
                className="w-full rounded-lg shadow-md"
              />
            </div>

            <div className="bg-purple-100 rounded-2xl p-6">
              <img
                src={Temp}
                alt="Builder Interface"
                className="w-full rounded-lg shadow-md"
              />
              <h3 className="text-lg font-jak font-semibold my-4">
                Showcase Your Portfolio Beautifully
              </h3>
              <p className="text-gray-800 mb-4 md:text-lg text-sm">
                Upload stunning photos of your work to a clean, elegant
                storefront that reflects your brand and draws in new clients.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 ">
            <div className="bg-purple-100 text-gray-800 rounded-2xl p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold mb-2 font-jak">
                Let Clients Book You in Minutes
              </h3>
              <p className="text-gray-800 mb-4 md:text-lg text-sm">
                No more DMs and back-and-forth. Clients can check your
                availability, pick a package, and book you instantly — even
                while you sleep.
              </p>

              <img
                loading="lazy"
                src={Modal}
                alt="User Friendly Dashbaord"
                className="w-full rounded-lg shadow-md "
              />
            </div>
            <div className="bg-gradient-to-br from-primary4 to-[#121212] text-white rounded-2xl p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold font-jak mb-2">
                Get Paid Online, Instantly
              </h3>
              <p className="text-gray-300 mb-4 md:text-lg text-sm">
                Secure payments via card, bank transfer, or USSD. You focus on
                glam — we handle the money.{" "}
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
                src={Csr}
                alt="UI Components"
                className="w-full  rounded-lg shadow-md"
              />
              <h3 className="text-lg font-jak font-semibold">
                Launch in 10 Minutes — No Tech Skills Needed
              </h3>
              <p className="mb-4 md:text-lg text-sm">
                If you can post on Instagram, you can build your Dimpified site.
                It’s that easy.
              </p>
            </div>
          </div>
        </section>
        <section className="pb-6 px-6 md:px-12  md:pt-24 lg:px-40  text-gray-800 bg-cover bg-center">
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-jak  font-semibold mb-4">
              What You’ll Get
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
                title: "Free .dimpified.com link ",
                desc: "Share your booking link on WhatsApp and Instagram",
                img: <FaLink className="text-4xl text-purple-600" />,
              },
              {
                title: "Image Gallery ",
                desc: "for your looks",
                img: <FaImagePortrait className="text-4xl text-blue-600" />,
              },
              {
                title: "Custom Service Packages ",
                desc: "with flexible pricing",
                img: <FaBox className="text-4xl text-yellow-500" />,
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
        {/* <section className="z-10 ">
          <div className="flex flex-col h-full  py-4 px-4  ">
            <div className="bg-purple-50 rounded-3xl py-10 px-6 lg:py-24">
              <div className="relative h-full">
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  <div className="order-1 lg:order-2 mb-4 md:w-6/12 md:mb-0 md:pl-36 ">
                    <img
                      loading="lazy"
                      src={MakeupRight}
                      className="rounded-[60%_40%_60%_40%/40%_60%_40%_60%] w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp
"
                      alt="Booking Management"
                    />
                  </div>
                  <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-24">
                    <span className="font-semibold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-gradient-to-r from-pink-100 to-transparent rounded-full">
                      EASY STRESS-FREE PROCESS
                    </span>
                    <h1 className="font-semibold font-jak md:text-4xl text-2xl  text-dark mb-3">
                      What You’ll Get
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
                          Your Own Booking Website (No coding needed)
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
                          Custom Service Packages with flexible pricing
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsChatDots className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Image Gallery for your looks
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <FaWallet className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                        Client Management Dashboard
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}

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
                  Start from $19.99/month
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
                    src={MakeupLeft}
                    className="rounded-[60%_40%_60%_40%/40%_60%_40%_60%] w-full max-w-lg h-auto hover:scale-105 transition-transform duration-500 animate-fadeInUp
"
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
              Ready to Glow Up Your Business?
            </h2>
            <p className="mb-8">
              Create Your Make-Up Booking Page Now <br />
              100% Secure | 🚀 Go Live in Minutes | ❤️ Loved by 5,000+ Makeup
              Artists
            </p>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-8-xl">
              <Link to="/pricing">
                <button className="btn hover:bg-gradient-to-l from-[#4f2683] via-[#9966cc] to-[#ff8201] bg-gradient-to-r text-white py-4 px-6 rounded-full flex items-center justify-center w-full md:w-auto transition">
                  <span className="mr-3 text-md">Set Up My Makeup Site</span>
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
                          No, Dimpified is a premium platform starting at
                          $19.99/month. Your business deserves more than “free.”
                          We offer powerful features to help you earn more.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure className="bg-white p-4">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-semibold text-lg">
                            Do I need a laptop to set it up?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Nope! You can create and manage your Dimpified page
                          entirely from your phone.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure className="bg-white p-4">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-semibold text-lg">
                            Can I get paid directly into my bank account?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Yes! We support card payments, bank transfers, and
                          even USSD — all settled into your account.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure className="bg-white p-4">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-semibold text-lg">
                            Can I use it for my salon team?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Absolutely. You can list services from multiple
                          artists and let clients choose who they want to book.
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>

                  <Disclosure className="bg-white p-4">
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-semibold text-lg">
                            Can I upgrade or cancel anytime?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Yes. Upgrade to access more features or cancel at any
                          time — no long contracts.
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

export default USMakeupOnboarding;
