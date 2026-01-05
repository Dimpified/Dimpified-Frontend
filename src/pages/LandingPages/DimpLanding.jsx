// import node module libraries
import React, { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import { useCountry } from "../../pages/pricing/CountryContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import FloatingContactButton from "./FloatingContact";
import { Helmet } from "react-helmet";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Typewriter } from "react-simple-typewriter";
import Barber from "./images/hairdresser.png";
import Hairdresser from "./images/hairstylist.png";
import Gym from "./images/weightlift.png";
import Makeup from "./images/makeup-artist.png";
import Spa from "./images/massage-therapist.png";
import Dentist from "./images/dentist.png";
import Website from "./images/website-builder.png";
import Template from "./images/template.png";
import Invoice from "./images/invoice.png";
import Wallet from "./images/wallet.png";
import Payment from "./images/online-payment.png";
import Support from "./images/online-chat.png";
import Dashboards from "./images/dimp-dashboard.png";

import Booking from "./images/schedule.png";
import Dashboard from "./images/dashboard.png";
import Booked from "./images/dimp-booked.jpg";
import Deposit from "./images/dimp-deposit.jpg";
import NailTemp from "./images/nail-template.jpg";
import NailTemp2 from "./images/nail-temp.png";
import BarberTemp from "./images/barber-template.jpg";
import HairTemp from "./images/hair-temp.jpg";
import MakeupTemp from "./images/makeup-template.jpg";
import DentalTemp from "./images/dental-template.png";

import { Link } from "react-router-dom";
import {
  BsGrid,
  BsCalendar2Check,
  BsArrowRight,
  BsLayers,
  BsBoxSeam,
  BsCashStack,
  BsCashCoin,
  BsBarChart,
  BsCreditCard,
} from "react-icons/bs";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaBell,
  FaEnvelopeOpenText,
  FaWhatsapp,
} from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";

import NavbarLanding from "./NavbarLanding";
import { FooterWithLinks } from "./FooterWithLinks";
import { motion } from "motion/react";

const reviews = [
  {
    name: "Chinedu, Port Harcourt",
    text: "Since using this software, my bookings have doubled, and I’ve seen a significant increase in repeat customers. The ability to manage everything from my phone is a game-changer!",
  },
  {
    name: "Ade, Abuja",
    text: "Building a website was so easy. Now, clients can see my work and book appointments online. My business has never been better!",
  },
  {
    name: "Femi, Lagos",
    text: "The insights I get from the analytics tools have helped me understand my customers better and tailor my services to their needs. Highly recommended!",
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

const featuresData = [
  {
    title: "Barber",

    icon: Barber,
    link: "/barbers",
    bg: "bg-white",
  },
  {
    title: "Hairdressers",

    icon: Hairdresser,
    link: "/hairdressers",

    text: "text-yellow-600",
  },

  {
    title: "Make-Up Artist",
    // count: "SOON",
    icon: Makeup,
    link: "/makeup",
    // bg: "bg-yellow-100",
    text: "text-yellow-600",
  },

  {
    title: "Spa Centres",

    icon: Spa,
    link: "/spa",

    text: "text-yellow-600",
  },
  {
    title: "Gyms",

    icon: Gym,
    link: "/gym",

    text: "text-yellow-600",
  },
  {
    title: "Dentist",

    icon: Dentist,
    link: "/dentist",

    text: "text-yellow-600",
  },
  {
    title: "View All",

    icon: "https://craftohtml.themezaa.com/images/demo-real-estate-icon-shop.svg",
    link: "/usecases",
    bg: "bg-white",
  },
];
const servicesData = [
  {
    title: "Get a website",
    description:
      "Choose your preffered domain name and select your preffered website template.",
    icon: "https://craftohtml.themezaa.com/images/demo-beauty-salon-icon-02.png",
    bg: "bg-yellow-100",
  },

  {
    title: "Add your services and prices ",
    description:
      "Have the flexibility to add your services and  set their custom prices",
    icon: "https://craftohtml.themezaa.com/images/demo-beauty-salon-icon-04.png",
    bg: "bg-purple-100",
  },
  {
    title: "Attract more client and customers",
    description:
      "Attract new customers, retain and move existing customers online",
    icon: "https://craftohtml.themezaa.com/images/demo-beauty-salon-icon-05.png",
    bg: "bg-blue-100",
  },
  {
    title: "10x your business sales",
    description:
      "Get bookings, increase sales and get paid through our fast payment gateways",
    icon: "https://craftohtml.themezaa.com/images/demo-beauty-salon-icon-03.png",
    bg: "bg-green-100",
  },
];

const DimpLanding = () => {
  const { country } = useCountry();
  useEffect(() => {
    document.body.className = "bg-white";
  }, []);
  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
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
        <title>
          #1 Business Software For Service-Based Business and Merchants{" "}
        </title>
        <meta
          name="description"
          content=" Dimpified provides the platform and tools to move your
                  business online and increase your revenue"
        />
        <meta
          property="og:title"
          content=" #1 Business Software For Service-Based Business and Merchants "
        />
        <meta
          property="og:description"
          content=" Dimpified provides the platform and tools to move your
                  business online and increase your revenue"
        />
      </Helmet>{" "}
      <div className="font-sen">
        <NavbarLanding />
        <FloatingContactButton />

        <section
          className="md:pt-40 pt-32 pb-12 font-jak px-0 relative bg-cover bg-center"
          // style={{ backgroundImage: `url(${GlowBG})` }}
        >
          <div className="flex flex-col h-full py-4 lg:py-8 px-6 lg:px-32 md:px-24">
            {/* Heading and Description */}
            <div className="flex justify-center mb-4">
              <div className="w-full md:w-10/12 text-center">
                <h1 className="text-3xl lg:text-[2.5rem] sm:text-[36px] font-bold mb-3 text-primary">
                  <span className="text-dark">#1 Business Software For</span>{" "}
                  <span className="font-bold bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ff8201] text-transparent bg-clip-text">
                    {" "}
                    <Typewriter
                      words={[
                        "Barbers",
                        "Hair Dressers",
                        "Make-Up Artist",
                        "Nail Techs",
                        "Gym Owners",
                        "Spa Centres",
                        "Dentists",
                      ]}
                      loop
                      cursor
                      cursorStyle="|"
                      typeSpeed={60}
                      deleteSpeed={50}
                      delaySpeed={1000}
                    />
                  </span>
                </h1>
                <p className="mb-4 text-lg sm:text-base text-dark">
                  Dimpified provides the platform and tools to move your
                  business online and increase your revenue
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex justify-center md:flex-row sm:flex-col  gap-4">
              <Link
                to="/auth/personal-information"
                className="btn hover:bg-gradient-to-l from-[#4f2683]  via-[#9966cc] to-[#ff8201]    bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ff8201]  text-white py-4 lg:px-6 px-4 rounded-lg flex items-center justify-between hover:bg-white transition"
              >
                <span className="mr-3">Get Started Now</span>
                <FaArrowRight />
              </Link>
            </div>

            {/* Image Card */}
            <div className="flex justify-center item-center mt-12">
              <div className="w-full sm:w-11/12">
                <div className="rounded-xl bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ff8201] p-3">
                  <LazyLoad height={200} offset={100}>
                    {" "}
                    <img
                      loading="lazy"
                      src={Dashboards}
                      alt="User Friendly Dashbaord"
                      className="rounded-lg h-full w-full mx-auto shadow-md "
                    />
                  </LazyLoad>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className=" border-t border-b border-gray-300 bg-white">
          <div className="flex flex-col lg:px-32 md:px-24">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-0">
              {/* Header Item */}
              <div className="col-span-1 flex items-center justify-center md:justify-start text-center md:text-left border-r border-b border-gray-300 py-10">
                <span className="text-lg font-semibold text-gray-800">
                  Explore <br />
                  <span className="text-[#ff8201] font-bold relative">
                    Featured
                    <span className="bg-[#ff8201] h-1 w-full block opacity-50 absolute bottom-0"></span>
                  </span>{" "}
                  <br />
                  Use Cases
                </span>
              </div>

              {/* Feature Items */}
              {featuresData.map((feature, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center justify-center py-10 border-r border-b border-gray-300 ${
                    index === featuresData.length - 1
                      ? "border-r-0 border-b "
                      : ""
                  }`}
                >
                  <div className="relative mb-4">
                    <div
                      className={` absolute top-[-20px] ${feature.bg} ${feature.text} left-2 $ text-xs font-semibold px-2 py-1 rounded `}
                    >
                      {feature.count}
                    </div>
                    <Link to={feature.link}>
                      <LazyLoad height={200} offset={100}>
                        {" "}
                        <img
                          loading="lazy"
                          src={feature.icon}
                          alt={feature.title}
                          className="w-10 h-10"
                        />
                      </LazyLoad>
                    </Link>
                  </div>
                  <Link
                    to={feature.link}
                    className="text-sm font-semibold text-gray-800 uppercase hover:text-[#ff8201]"
                  >
                    {feature.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="down-section"
          className=" m-4 lg:mt-12 lg:mx-16 rounded-3xl py-10 px-6 lg:py-24 font-sen text-dark  lg:px-32 md:px-24 bg-gray-50"
        >
          <div className="flex flex-col h-full  ">
            <div className="flex flex-wrap items-end justify-center mb-5 text-center md:text-start">
              <div className="xl:w-5/12 lg:w-5/12 md:w-10/12">
                <h3 className="bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ffa600] bg-clip-text text-transparent  md:text-4xl text-3xl  font-medium mb-1 tracking-tighter">
                  Your business should not be limited to physical shops
                </h3>
              </div>
              <div className="xl:w-7/12 lg:w-7/12 md:w-10/12 ">
                {" "}
                <p className="text-sm ">
                  In today’s fast-paced world, your business should not be
                  restricted to physical stores or shops. Our software solution
                  enables you to set up your business online and earn from the
                  comfort of your home.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-end sm:justify-center mb-5 mt-5 text-center md:text-start">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
                {servicesData.map((service, index) => (
                  <div
                    key={index}
                    className={`feature-box rounded-md px-6 py-6 text-start ${service.bg}`}
                  >
                    {/* <div className="feature-box-icon mb-4 flex justify-center md:justify-start">
                    <img loading="lazy" 
                      src={service.icon}
                      alt={service.title}
                      className="w-[55px] mb-4"
                    />
                  </div> */}
                    <div className="feature-box-content pt-4 ">
                      <span className="block text-lg font-semibold text-gray-800 mb-2">
                        {service.title}
                      </span>
                      <p className="text-gray-600">{service.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="pt-12" id="features">
          <div className="flex flex-col h-full py-6 px-3 lg:px-32 md:px-24">
            {/* Header Row */}
            <div className="flex flex-col lg:flex-row items-center mb-6 sm:mb-12 text-center lg:text-start animate-fade">
              <div className="lg:w-5/12 xl:w-5/12 mb-8 lg:mb-0">
                <h2 className="font-semibold text-dark-gray text-3xl lg:text-3xl tracking-tight">
                  Everything you need to transform your business - and more!
                </h2>
              </div>
              <div className="lg:w-7/12 lg:ps-10">
                <span className="text-base text-dark-gray block mb-1">
                  Discover new tools to empower your business .
                </span>
                <p className="text-base lg:w-11/12 xl:w-full md:w-4/5 mx-auto sm:w-full">
                  Boost your website’s flexibility with these powerful,
                  easy-to-use features – all available for free.
                </p>
              </div>
            </div>

            {/* Feature Boxes Row */}
            <div className="grid grid-cols-2 xl:grid-cols-4 lg:grid-cols-4 gap-8 mb-12 justify-center animate-slide">
              {/* Feature Items */}
              {[
                {
                  title: "Website Builder",
                  desc: "Build with ease",
                  img: Website,
                },
                {
                  title: "Custom Templates",
                  desc: "Unique designs",
                  img: Template,
                },
                {
                  title: "User Dashboard",
                  desc: "Personalized experience",
                  img: Dashboard,
                },
                {
                  title: "Booking Modules",
                  desc: "Customizable options",
                  img: Booking,
                },
                {
                  title: "Invoices",
                  desc: "Easy management",
                  img: Invoice,
                },
                {
                  title: "Online Wallets",
                  desc: "Seamless payments",
                  img: Wallet,
                },
                {
                  title: "Payment Gateways",
                  desc: "Secure transactions",
                  img: Payment,
                },

                {
                  title: "Online Support",
                  desc: "24/7 Customer Support",
                  img: Support,
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="feature-box text-center mb-12 md:mb-8"
                >
                  <div className="feature-box-icon mb-4 flex justify-center items-center">
                    <LazyLoad height={200} offset={100}>
                      {" "}
                      <img
                        loading="lazy"
                        src={feature.img}
                        alt={feature.title}
                        className="mb-4 h-12 w-12"
                      />
                    </LazyLoad>
                  </div>
                  <div className="feature-box-content">
                    <span className="font-semibold text-dark-gray text-lg block mb-2">
                      {feature.title}
                    </span>
                    <p className="text-sm bg-gray-100 py-1 px-4 rounded-full">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Row */}
          </div>
        </section>

        <section className="lg:pt-10 lg:pb-16">
          <div className="flex flex-col h-full  px-6 lg:px-32 md:px-24">
            <div className="flex flex-col xl:flex-row  mb-4 text-center xl:text-left">
              <div className="relative text-center xl:text-left">
                <h2 className="text-3xl font-bold text-dark-gray leading-snug">
                  Build a high-converting website for your business
                  <p className="text-sm font-normal leading-7 mt-3">
                    A unique collection of{" "}
                    <span className="font-semibold">
                      over 100+ pre-made templates to
                    </span>{" "}
                    choose from that makes setting up a beautiful site easy and
                    fast.
                  </p>
                </h2>
              </div>
            </div>
          </div>

          <div className="container-fluid mx-auto">
            <div className="relative">
              <Swiper
                slidesPerView={1}
                spaceBetween={25}
                centeredSlides={true}
                speed={4000}
                loop={true}
                allowTouchMove={true}
                modules={[Autoplay]}
                autoplay={{ delay: 1 }}
                breakpoints={{
                  1200: { slidesPerView: 4 },
                  992: { slidesPerView: 3 },
                  768: { slidesPerView: 2 },
                  575: { slidesPerView: 2 },
                }}
                className="marquee-slide"
              >
                <SwiperSlide>
                  <LazyLoad height={200} offset={100}>
                    {" "}
                    <img
                      loading="lazy"
                      className="w-full"
                      src={DentalTemp}
                      alt=""
                    />
                  </LazyLoad>
                </SwiperSlide>
                <SwiperSlide>
                  <LazyLoad height={200} offset={100}>
                    {" "}
                    <img
                      loading="lazy"
                      className="w-full"
                      src={HairTemp}
                      alt=""
                    />
                  </LazyLoad>
                </SwiperSlide>
                <SwiperSlide>
                  <LazyLoad height={200} offset={100}>
                    {" "}
                    <img
                      loading="lazy"
                      className="w-full"
                      src={NailTemp2}
                      alt=""
                    />
                  </LazyLoad>
                </SwiperSlide>
                <SwiperSlide>
                  <LazyLoad height={200} offset={100}>
                    <img
                      loading="lazy"
                      className="w-full"
                      src={BarberTemp}
                      alt=""
                    />
                  </LazyLoad>
                </SwiperSlide>
                <SwiperSlide>
                  <LazyLoad height={200} offset={100}>
                    {" "}
                    <img
                      loading="lazy"
                      className="w-full"
                      src={MakeupTemp}
                      alt=""
                    />
                  </LazyLoad>
                </SwiperSlide>
                <SwiperSlide>
                  <LazyLoad height={200} offset={100}>
                    {" "}
                    <img
                      loading="lazy"
                      className="w-full"
                      src={NailTemp}
                      alt=""
                    />{" "}
                  </LazyLoad>
                </SwiperSlide>

                {/* <SwiperSlide>
                  <LazyLoad height={200} offset={100}>
                    {" "}
                    <img
                      loading="lazy"
                      className="w-full"
                      src="https://gfa-tech.com/dimp-images/barber-template.jpg"
                      alt=""
                    />{" "}
                  </LazyLoad>
                </SwiperSlide>
                <SwiperSlide>
                  <LazyLoad height={200} offset={100}>
                    {" "}
                    <img
                      loading="lazy"
                      className="w-full"
                      src="https://gfa-tech.com/dimp-images/hair-template.jpg"
                      alt=""
                    />
                  </LazyLoad>
                </SwiperSlide>
                <SwiperSlide>
                  <LazyLoad height={200} offset={100}>
                    {" "}
                    <img
                      loading="lazy"
                      className="w-full"
                      src="https://gfa-tech.com/dimp-images/catering-template.jpg"
                      alt=""
                    />{" "}
                  </LazyLoad>
                </SwiperSlide>
                <SwiperSlide>
                  <LazyLoad height={200} offset={100}>
                    {" "}
                    <img
                      loading="lazy"
                      className="w-full"
                      src="https://gfa-tech.com/dimp-images/makeup-template.jpg"
                      alt=""
                    />
                  </LazyLoad>
                </SwiperSlide> */}
              </Swiper>
            </div>
          </div>
        </section>

        <section className="font-jak z-10 ">
          <div className="flex flex-col h-full  py-4 px-6 lg:px-24 ">
            <div className="bg-purple-50 rounded-3xl py-10 px-6 lg:py-24">
              <div className="relative h-full">
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  <div className="order-1 lg:order-2 lg:w-5/12 mb-4 lg:mb-0 lg:pr-16">
                    <LazyLoad height={200} offset={100}>
                      <img
                        loading="lazy"
                        src={Dashboards}
                        className="w-full rounded-xl"
                        alt="Expand Your Sales Streams"
                      />{" "}
                    </LazyLoad>
                  </div>
                  <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-16">
                    <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-pink-100 rounded-full">
                      Manage your business
                    </span>
                    <h1 className="font-normal  md:text-4xl text-3xl  text-dark mb-3">
                      Get a customized and user friendly dashboard
                    </h1>
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      Manage all aspect of your business using a well detailed,
                      easy-to-navigate dashboard.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsLayers className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Integrated service section for listing numerous
                          services.
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsGrid className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Customize and edit your website to your satisfaction
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsBoxSeam className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Upgrade your plan to enjoy premium features and tools
                        </span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsCashStack className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Easily withdraw your earnings and get paid to your
                          provided account details
                        </span>
                      </div>
                    </div>
                    <Link
                      to="/auth/personal-information"
                      target="_blank"
                      className="inline-flex items-center hover:bg-white hover:text-gray-900 bg-gray-900 text-white px-6 py-4 rounded-full shadow hover:shadow-lg transition"
                    >
                      <span>Start earning now!</span>
                      <BsArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="font-jak z-10">
          <div className="flex flex-col h-full py-4 px-6 lg:px-20">
            <div className="bg-white rounded-3xl py-10  lg:py-16">
              <div className="relative h-full">
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  <div className="order-1 lg:order-1 lg:w-5/12 mb-4 lg:mb-0 lg:pr-16">
                    <LazyLoad height={200} offset={100}>
                      {" "}
                      <img
                        loading="lazy"
                        src={Booked}
                        className="w-full rounded-xl flex justify-center items-center  "
                        alt="Online Booking and Invoicing"
                      />
                    </LazyLoad>
                  </div>
                  <div className="order-2 lg:order-2 xl:ml-4 lg:w-6/12 lg:px-16">
                    <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-gray-100 rounded-full">
                      Streamline Your Bookings
                    </span>
                    <h1 className="font-normal  md:text-4xl text-3xl  text-dark mb-3">
                      Simplified Booking, Invoicing, and Notifications
                    </h1>
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      Enhance your client experience with easy online booking,
                      automated invoicing, and real-time notifications for both
                      clients and business owners.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Feature 1: Online Booking */}
                      <div className="flex items-center">
                        <div className="bg-green-50 p-3 rounded-full flex justify-center items-center">
                          <FaCalendarAlt className="text-green-400" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Easy online booking system for clients with real-time
                          availability.
                        </span>
                      </div>
                      {/* Feature 2: Invoicing */}
                      <div className="flex items-center">
                        <div className="bg-blue-50 p-3 rounded-full flex justify-center items-center">
                          <FaFileInvoiceDollar
                            className="text-blue-400"
                            size={30}
                          />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Generate and send invoices automatically after
                          bookings.
                        </span>
                      </div>
                      {/* Feature 3: Client Notifications */}
                      <div className="flex items-center">
                        <div className="bg-yellow-50 p-3 rounded-full flex justify-center items-center">
                          <FaBell className="text-yellow-400" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Instant notifications to clients for booking
                          confirmations and reminders.
                        </span>
                      </div>
                      {/* Feature 4: Business Owner Alerts */}
                      <div className="flex items-center">
                        <div className="bg-red-50 p-3 rounded-full flex justify-center items-center">
                          <FaEnvelopeOpenText
                            className="text-red-400"
                            size={30}
                          />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Alerts for business owners with booking updates and
                          client messages.
                        </span>
                      </div>
                    </div>
                    <Link
                      to="/auth/personal-information"
                      target="_blank"
                      className="inline-flex items-center hover:bg-white hover:text-gray-900 bg-gray-900 text-white px-6 py-4 rounded-full shadow hover:shadow-lg transition"
                    >
                      <span>Start getting bookings!</span>
                      <BsArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="font-jak z-10">
          <div className="flex flex-col h-full py-4 px-6 lg:px-24">
            <div className="bg-gray-100 rounded-3xl py-10 px-6 lg:py-24">
              <div className="relative h-full">
                <div className="flex flex-col lg:flex-row items-center justify-center h-full">
                  <div className="order-1 lg:order-2 lg:w-5/12 mb-4 lg:mb-0 lg:pr-16">
                    <LazyLoad height={200} offset={100}>
                      {" "}
                      <img
                        loading="lazy"
                        src={Deposit}
                        className="w-full rounded-xl "
                        alt="Secure Payments and Boost Sales"
                      />{" "}
                    </LazyLoad>
                  </div>
                  <div className="order-2 lg:order-1 xl:ml-4 lg:w-6/12 lg:px-16">
                    <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-yellow-50 rounded-full">
                      Secure your revenue
                    </span>
                    <h1 className="font-normal  md:text-4xl text-3xl  text-dark mb-3">
                      Get Paid Upfront and Increase Your Sales
                    </h1>
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      Improve your cash flow and reduce no-shows by requiring
                      payment before service. Our platform offers powerful tools
                      to boost your sales and streamline your payment process.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Feature 1 */}
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsCreditCard className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Accept upfront payments seamlessly with integrated
                          payment options.
                        </span>
                      </div>
                      {/* Feature 2 */}
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsCalendar2Check className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Automated booking confirmations to minimize
                          cancellations.
                        </span>
                      </div>
                      {/* Feature 3 */}
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsCashCoin className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Upsell services and products during the booking
                          process.
                        </span>
                      </div>
                      {/* Feature 4 */}
                      <div className="flex items-center">
                        <div className="bg-gray-200 p-3 rounded-full flex justify-center items-center">
                          <BsBarChart className="text-dark" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          Track sales performance with real-time analytics.
                        </span>
                      </div>
                    </div>
                    <Link
                      to="/auth/personal-information"
                      target="_blank"
                      className="inline-flex items-center hover:bg-white hover:text-gray-900 bg-gray-900 text-white px-6 py-4 rounded-full shadow hover:shadow-lg transition"
                    >
                      <span>Start Increasing Your Sales</span>
                      <BsArrowRight className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="font-jak bg-gradient-to-t bg-[#7d26e9] lg:py-20">
          <div className="flex flex-col h-full  py-4 px-6 lg:px-24">
            <div className="flex items-center justify-center text-center mb-6">
              <div className="xl:w-10/12">
                <h2 className="font-alt md: md:text-4xl text-3xl  text-3xl font-normal text-white tracking-tight mb-0">
                  Lots of business entrepreneurs use Dimpified for their
                  business.
                </h2>
              </div>
            </div>

            <div className="relative">
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                speed={1000}
                allowTouchMove={true}
                modules={[Autoplay]}
                autoplay={{ delay: 1000, disableOnInteraction: false }}
                breakpoints={{
                  1200: { slidesPerView: 4 },
                  992: { slidesPerView: 3 },
                  768: { slidesPerView: 1 },
                  575: { slidesPerView: 1 },
                }}
              >
                {reviews.map((review, index) => (
                  <SwiperSlide>
                    <div className="grid grid-cols-1  gap-6">
                      {" "}
                      <div
                        key={index}
                        className="bg-white feature-box rounded-lg px-6 py-6  sm:h-[200px] lg:h-[250px] text-start shadow"
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
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </section>
        <section className="font-jak px-4 py-12 lg:px-12 lg:py-18 bg-white">
          <div className="">
            <div className="flex items-center justify-center text-center mb-6">
              <div className="w-full max-w-2xl">
                <h2 className="alt-font text-5xl font-light text-dark tracking-tight mb-0">
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
                          Our platform is designed to help businesses manage
                          their online presence, client interactions, and
                          business growth efficiently. It integrates tools for
                          website building, booking module, payment management,
                          and more, all in one place.
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
                            How does the booking feature benefit my business
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
        <section className="font-jak mx-4 lg:mx-24  lg:my-20 my-6">
          <div className="bg-[#7d26e9] py-12 px-6 lg:py-40 lg:px-20 lg:mx-10 rounded-3xl text-center">
            <div>
              <h2 className=" md:text-4xl text-3xl  font-light text-white tracking-tight mb-4">
                Your business just levelled up!.
              </h2>
              <p className="text-white text-lg mb-6">
                Get a website. Add services. Increase sales. Delight customers.
              </p>
              <Link
                to="/auth/personal-information"
                className="bg-white text-primary hover:bg-purple-100 rounded-lg px-6 py-4 text-lg font-normal"
              >
                Get Started Now
              </Link>
            </div>
          </div>
        </section>

        <FooterWithLinks />
      </div>
    </motion.div>
  );
};

export default DimpLanding;
