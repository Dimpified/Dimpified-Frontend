// import node module libraries
import React, { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaCheckCircle,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaComments,
  FaPlay,
} from "react-icons/fa";
import Map from "./images/map.jpg";
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
} from "react-icons/bs";

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

import NavbarLanding from "./NavbarLanding";
import { FooterWithLinks } from "./FooterWithLinks";

// Import images
import BarberImg from "./images/barber-booking.jpg";
import HairImg from "./images/mk2.jpg";
import DimpVid from "./images/dimp-vid.png";

import Csr from "./images/csr.png";
import Temp from "./images/templates-new.png";
import GlowBG from "./images/glow-bg.svg";

import GradientBG from "./images/gradient-bg.png";
import ScreenShot from "./images/templatesnoplay.png";
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
const ContactCard = ({ icon, title, description, linkText }) => (
  <div className="bg-[#f4eae4] rounded-lg p-5 flex flex-col items-start gap-2 shadow-sm hover:shadow-md transition">
    <div className="text-3xl">{icon}</div>
    <div className="font-semibold">{title}</div>
    <div className="text-sm text-gray-600">{description}</div>
    <a href="#" className="text-yellow-700 font-medium text-sm hover:underline">
      {linkText}
    </a>
  </div>
);

const About = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.body.className = "bg-white";
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <Helmet>
        <title>
          About Dimpified | Empowering Personal Care & Wellness Providers
        </title>
        <meta
          name="description"
          content="Learn how Dimpified connects service-based professionals in personal care, wellness, and grooming with clients seamlessly through a digital storefront and appointment system."
        />
        <meta property="og:title" content="About Us - My App" />
        <meta
          property="og:description"
          content="Learn how Dimpified connects service-based professionals in personal care, wellness, and grooming with clients seamlessly through a digital storefront and appointment system."
        />
      </Helmet>
      <div className="font-jak">
        <NavbarLanding />

        <section className="bg-white px-4 py-28 md:pt-44 ">
          <div className=" text-center">
            <h2 className="max-w-4xl mx-auto text-center text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Transform Your Service Business {""} <br />
              <span className="font-bold bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ff8201] text-transparent bg-clip-text">
                With Dimpified
              </span>{" "}
            </h2>

            <h2 className="max-w-4xl mx-auto text-center text-md md:text-xl font-bold text-gray-900 mb-6">
              Empower Your Brand. Expand Your Reach. Simplify Your Operations.
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto">
              Dimpified is the all-in-one platform designed for service-based
              professionals worldwide. Whether you're a barber, beautician,
              fitness coach, make-up artist, nail technician or wellness expert,
              Dimpified provides the tools you need to develop your website,
              manage appointments, accept payments, manage your team and grow
              your business online.
            </p>

            <div className="flex flex-col md:flex-row  items-center mx-auto py-12 justify-center gap-4 w-full max-w-xl">
              <Link to="/pricing">
                {" "}
                <button className="btn hover:bg-gradient-to-l from-[#4f2683] via-[#9966cc] to-[#ff8201] bg-gradient-to-r text-white py-4 px-6 rounded-full flex items-center justify-center md:w-auto w-full transition">
                  <span className="mr-3 text-lg">Sign Up Now</span>
                  <FaArrowRight />
                </button>
              </Link>
              <a href="#contact-us">
                <button className="btn hover:bg-gradient-to-l hover:text-white from-[#4f2683] via-[#9966cc] to-[#ff8201] border-2 border-primary3  text-primary3 py-4 px-6 rounded-full flex items-center justify-center md:w-auto w-full transition">
                  <span className=" text-lg">Need help? Reach out to us.</span>
                </button>
              </a>
            </div>

            <div className="relative grid grid-cols-3 gap-4 items-center px-4 md:px-24">
              {/* Left Image with Illustration (1/3) */}
              <div className="relative col-span-1">
                <img
                  src={BarberImg}
                  alt="Office"
                  className="rounded-xl w-full h-48 md:h-[32rem] object-cover "
                />
              </div>

              {/* Right Image with Team and Illustration (2/3) */}
              <div className="relative col-span-2">
                <img
                  src={HairImg}
                  alt="Team working"
                  className="rounded-xl w-full object-cover h-48 md:h-[32rem]"
                />
              </div>
            </div>
          </div>
        </section>
        <FloatingContactButton />
        <div className="mt-6 relative mx-auto pb-12 px-4 md:px-24 w-[90%]">
          <div className="text-center max-w-4xl mx-auto mb-6">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              See Dimpified <span className="text-sec10">in Action!</span>
            </h2>
            <p className="text-lg text-gray-600">
              Want to understand how it works before signing up? Watch this
              short video to see how Dimpified helps entrepreneurs streamline
              bookings, payments, and service delivery.
            </p>
          </div>
          {/* Conditional rendering based on showVideo state */}
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
                  className="relative animate-ping-twice bg-white hover:text-white shadow-lg text-sec10 hover:bg-red-500 p-4 md:p-6 rounded-full flex items-center justify-center transition overflow-visible w-16 h-16 md:w-20 md:h-20"
                  aria-label="Play video"
                >
                  <span className="absolute inset-0 rounded-full bg-sec10 opacity-60 animate-ping z-[1]"></span>
                  <FaPlay className="text-2xl md:text-3xl" />
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
          <div className="max-w-4xl mx-auto">
            <div className="bg-white pt-8 rounded-2xl ">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                What You'll Learn{" "}
                <span className="text-sec10">in the Video</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  "How to launch your storefront in minutes",
                  "Tools that save you time and increase revenue",
                  "Real success stories from barbers, beauticians, and coaches",
                  "Why Dimpified is built just for service providers",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <FaCheckCircle className="w-6 h-6 text-sec10 mt-1 flex-shrink-0" />
                    <p className="text-gray-700 text-lg">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Features */}
        </div>

        <section
          className="pb-6 px-6 md:px-12  md:py-24 lg:px-40 bg-white border-b border-gray-200  text-gray-800 bg-cover bg-center"
          style={{ backgroundImage: `url(${GlowBG})` }}
        >
          {/* Header */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Why should you choose{" "}
              <span className="font-bold bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ff8201] text-transparent bg-clip-text">
                Dimpified?
              </span>
            </h2>
            <p className="text-lg text-gray-600">
              Dimpified isn't built for selling products—it’s built for you, the
              service professional.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6 animate-slide">
            {/* Feature Items - now in single column with image left, text right */}
            {[
              {
                title: "Online Storefront",
                desc: "Create a branded site for your services",
                img: "https://gfa-tech.com/dimp-images/template.png",
              },
              {
                title: "Client Dashboard",
                desc: "Track appointments, history & more",
                img: "https://gfa-tech.com/dimp-images/dashboard.png",
              },
              {
                title: "24/7 Bookings",
                desc: "Clients can book anytime, from any device",
                img: "https://gfa-tech.com/dimp-images/booking.png",
              },
              {
                title: "Online Wallets",
                desc: "Seamless payments",
                img: "https://gfa-tech.com/dimp-images/wallet.png",
              },
              {
                title: "Subscriptions",
                desc: "Offer recurring plans for loyal clients",
                img: "https://gfa-tech.com/dimp-images/payment-gateway.png",
              },
              {
                title: "Automated Reminders",
                desc: "Reduce no-shows effortlessly",
                img: "https://gfa-tech.com/dimp-images/online-chat.png",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="feature-box flex items-center gap-6 p-4 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="feature-box-icon flex-shrink-0">
                  <LazyLoad height={48} width={48} offset={100}>
                    <img
                      loading="lazy"
                      src={feature.img}
                      alt={feature.title}
                      className="h-12 w-12 object-contain"
                    />
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
          <div className="flex flex-row items-center justify-center gap-1  w-full mb-6 md:text-lg text-sm   text-center ">
            {" "}
            Contact us via{" "}
            <a
              href="tel:+2347089167952"
              className="hover:text-primary3 text-sec10 font-semibold transition-colors duration-200"
              aria-label="Call us"
            >
              {" "}
              phone
            </a>{" "}
            <span> or </span>{" "}
            <a
              href="mailto:hello@dimpified.com"
              className="hover:text-primary3 font-semibold text-sec10 transition-colors duration-200"
              aria-label="Email us"
            >
              {" "}
              e-mail{" "}
            </a>{" "}
            <span>
              {" "}
              to better understand how this features will benefit your business
            </span>{" "}
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-7-xl">
            <button
              onClick={handleSignUp}
              className="btn hover:bg-gradient-to-l from-[#4f2683] via-[#9966cc] to-[#ff8201] bg-gradient-to-r text-white py-4 px-6 rounded-full flex items-center justify-center w-full md:w-auto transition"
            >
              <span className="mr-3 text-md">Start Your Storefront</span>
              <FaArrowRight />
            </button>
          </div>

          {/*        
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
            <div className="bg-[#f7f1eb] rounded-2xl p-6">
              <img
                src={Temp}
                alt="Builder Interface"
                className="w-full rounded-lg shadow-md"
              />
              <h3 className="text-lg font-semibold my-4">
                Dimpified gives your business a powerful online presence
              </h3>
              <p className="text-gray-800 mb-4">
                We made it so simple, fast, easy and convenient to get a
                service-based business website. Choose from lots of templates
                built for your niche and voila, you're in.
              </p>
              <Link to="https://forms.office.com/r/7wpJ7i46Xz">
                <button
                  onClick={handleSignUp}
                  className="bg-sec10 hover:bg-black text-white text-sm px-4 py-3 rounded-full mb-4"
                >
                  Get started now
                </button>
              </Link>
            </div>

           
            <div className="bg-gradient-to-br from-primary4 to-[#121212] text-white rounded-2xl p-6 flex flex-col justify-between">
              <h3 className="text-lg font-semibold mb-2">
                Leverage booking, CRM and instant payment features
              </h3>
              <p className="text-gray-300 mb-4">
                Automatically receive bookings. Get instant notifications.
                Manage Customers. And the icing - Get paid even before your
                customer walks in into your shop or office.
              </p>
              <Link to="https://forms.office.com/r/7wpJ7i46Xz">
                <button className="bg-white hover:bg-sec10 hover:text-white text-black text-sm px-4 py-3 rounded-full w-fit mb-4">
                  Start getting bookings
                </button>
              </Link>
              <img
                loading="lazy"
                src="https://gfa-tech.com/dimp-images/dimp-overview.jpg"
                alt="User Friendly Dashbaord"
                className="w-full rounded-lg shadow-md "
              />
            </div>

           
            <div className="bg-[#f7f1eb] text-black rounded-2xl p-6 flex flex-col justify-between">
              <img
                src={Csr}
                alt="UI Components"
                className="w-full  rounded-lg shadow-md"
              />
              <h3 className="text-lg font-semibold">
                Experience the best customer service
              </h3>
              <p className="mb-4">
                You don't have to do it alone. We're with you in every step of
                the way and only a call, email, text away from answering any
                questions you have or fixing any issue you encountered{" "}
              </p>
              <Link to="https://wa.me/2347089167952">
                <button className="bg-sec10 hover:bg-primary3 hover:text-white text-white text-sm px-4 py-3 rounded-full w-fit mb-4">
                  Talk to customer service
                </button>
              </Link>
            </div>

           
            <div className="bg-[#f7f1eb] rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                You focus on your skillset, we help you organize everything
                else.
              </h3>
              <p className="text-gray-600 mb-4">
                Automatically receive bookings, get instant notifications and
                the icing - Get paid even before your customer walks in into
                your shop or office.
              </p>
              <img
                src={BarberImg}
                alt="Drag and Drop"
                className="w-96 rounded-lg shadow-md"
              />
            </div>
          </div> */}
        </section>
        <section id="contact-us" className="z-10 md:pt-16 pt-4">
          <div className="flex flex-col h-full py-4 px-4">
            <div className=" px-6 lg:pb-24">
              <div className="relative h-full ">
                <div className="flex flex-col lg:flex-row items-center justify-center h-full ">
                  {/* Image Section */}
                  <div className="order-1 lg:order-1 mb-4 lg:w-6/12 lg:mb-0">
                    <img
                      loading="lazy"
                      src={Map}
                      className="md:h-96 h-40"
                      alt="Booking Management"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="order-2 lg:order-2 xl:ml-4 lg:w-6/12  lg:px-24">
                    {/* <span className="font-bold text-sm py-2 px-5 mb-3 inline-block uppercase text-dark bg-gradient-to-r from-pink-100 to-transparent rounded-full">
                      Booking made easy
                    </span> */}
                    <h2 className="text-2xl md:text-4xl font-bold mb-4">
                      Global Reach,{" "}
                      <span className="font-bold bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ff8201] text-transparent bg-clip-text">
                        Local Support
                      </span>
                    </h2>
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      Whether you're running a salon in Lagos, a gym in Chicago,
                      a tutoring business in London, or a wellness practice in
                      Buenos Aires—Dimpified is here for you.
                    </p>
                    <p className="text-md text-dark mb-4 leading-relaxed">
                      Our platform supports service businesses in{" "}
                      <span className="font-semibold">
                        Africa, North America, South America, Europe, Asia
                      </span>
                      , and beyond.
                    </p>

                    {/* Feature Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* Feature 1 */}
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <FaEnvelope className="text-green-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          <a
                            href="mailto:hello@dimpified.com"
                            target="_blank"
                            className="hover:underline hover:text-sec10 "
                          >
                            {" "}
                            hello@dimpified.com
                          </a>
                        </span>
                      </div>

                      {/* Feature 2 */}
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <FaPhoneAlt className="text-blue-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          <a
                            href="tel:+2347089167952"
                            target="_blank"
                            className=" hover:underline hover:text-sec10 "
                          >
                            +234 70 8916 7952
                          </a>
                        </span>
                      </div>

                      {/* Feature 3 */}
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsCalendar2Check className="text-sec10" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          <a
                            href="https://forms.office.com/r/7wpJ7i46Xz"
                            target="_blank"
                            className="font-semibold underline text-sec10 hover:text-primary3"
                          >
                            {" "}
                            Schedule a call{" "}
                          </a>{" "}
                          with our Merchant Success Team
                        </span>
                      </div>

                      {/* Feature 4 */}
                      <div className="flex items-center">
                        <div className="bg-white p-3 rounded-full flex justify-center items-center">
                          <BsPeopleFill className="text-yellow-500" size={30} />
                        </div>
                        <span className="ml-3 text-dark text-md leading-relaxed">
                          <a
                            href="https://wa.me/2347089167952"
                            target="_blank"
                            className="hover:underline hover:text-sec10 "
                          >
                            Join Our Global Merchant Community
                          </a>
                        </span>
                      </div>
                    </div>

                    {/* Call-to-Action Button */}
                    {/*   <Link to="/pricing"><button 
                      className="inline-flex items-center bg-white hover:bg-gray-900 hover:text-white text-dark py-3 px-5 rounded-full shadow transition"
                    >
                      <span>Get booked today!</span>
                      <BsArrowRight className="ml-2" />
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 h-full md:py-32 py-16 bg-cover bg-[#f7f1eb] mb-12 text-black bg-center flex items-center justify-center text-center">
          <div>
            <h2 className="max-w-4xl mx-auto text-2xl md:text-4xl font-bold  mb-6">
              Why we built dimpified?
            </h2>
            <p className=" text-base md:text-lg max-w-5xl mx-auto mb-12">
              We created Dimpified because we saw that many barbers,
              hairdressers, makeup artists, nail salons, and dentists were
              missing out by only having a physical shop. We wanted to make it
              easy for you to show your work online, get more customers, and
              even make money from anywhere, even your home.
            </p>
            <p className=" text-base md:text-lg max-w-5xl mx-auto mb-12">
              Dimpified helps you build a simple website to show what you do,
              take bookings, and get paid, all in one easy place. We want to
              give you the power to grow your business without any stress.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-7-xl">
              <Link to="/pricing">
                {" "}
                <button className="btn hover:bg-gradient-to-l from-[#4f2683] via-[#9966cc] to-[#ff8201] bg-gradient-to-r text-white py-4 px-6 rounded-full flex items-center justify-center w-full md:w-auto transition">
                  <span className="mr-3 text-md">Create your online store</span>
                  <FaArrowRight />
                </button>
              </Link>

              <Link
                to="https://wa.me/2347089167952"
                className="w-full md:w-auto"
              >
                <button className="btn hover:text-white hover:bg-gradient-to-l from-[#4f2683] via-[#9966cc] to-[#ff8201] border-2 border-primary3 text-primary3 py-4 px-6 rounded-full flex items-center justify-center w-full md:w-auto transition">
                  <span className="mr-3 text-md">
                    Discuss with our Merchant Success Team
                  </span>
                  <FaArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-6 px-4 sm:px-6 lg:px-48 bg-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              What our merchants are saying...
            </h2>
          </div>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 3,
              },
            }}
          >
            {reviews.map((review, index) => (
              <SwiperSlide key={index}>
                <div className=" border border-gray-200 rounded-xl p-10  shadow-sm hover:shadow-md transition h-72">
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    “{review.text}”
                  </p>
                  <p className="text-sm font-semibold text-orange-400">
                    {review.name}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="bg-white lg:px-32  pb-10 bg-cover bg-center">
          <div className="mt-24 bg-[#f7f1eb] rounded-3xl md:py-32 md:px-32 py-20 px-6 flex flex-col items-center justify-center text-center relative overflow-hidden  mx-auto">
            <h2 className="text-2xl md:text-4xl font-bold leading-snug mb-8">
              Get a feature-packed website that ranks your business among the{" "}
              <span className="font-bold bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ff8201] text-transparent bg-clip-text">
                top 1%{" "}
              </span>{" "}
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-8-xl">
              <Link to="/pricing">
                {" "}
                <button className="btn hover:bg-gradient-to-l from-[#4f2683] via-[#9966cc] to-[#ff8201] bg-gradient-to-r text-white py-4 px-6 rounded-full flex items-center justify-center w-full md:w-auto transition">
                  <span className="mr-3 text-md">Create your online store</span>
                  <FaArrowRight />
                </button>
              </Link>

              <Link
                to="https://wa.me/2347089167952"
                className="w-full md:w-auto"
              >
                <button className="btn hover:text-white hover:bg-gradient-to-l from-[#4f2683] via-[#9966cc] to-[#ff8201] border-2 border-primary3 text-primary3 py-4 px-6 rounded-full flex items-center justify-center w-full md:w-auto transition">
                  <span className="mr-3 text-md">
                    Discuss with our Merchant Success Team
                  </span>
                  <FaArrowRight />
                </button>
              </Link>
            </div>
          </div>
        </section>
        <section className="font-jak px-4 py-12 lg:px-12 lg:py-12 bg-white">
          <div className="">
            <div className="flex items-center justify-center text-center mb-6">
              <div className="w-full max-w-2xl">
                <h2 className="alt-font  md:text-4xl text-3xl  text-dark tracking-tight mb-0">
                  Frequently asked questions
                </h2>
              </div>
            </div>
            <div className="flex justify-center ">
              <div className="container mx-auto px-6">
                <div className="space-y-4">
                  <Disclosure>
                    {({ open }) => (
                      <>
                        <DisclosureButton className="flex justify-between w-full py-4 text-left text-gray-800">
                          <h3 className="font-bold text-lg">
                            Who is Dimpified built for?
                          </h3>
                          <span className="flex items-center">
                            {open ? "-" : "+"}
                          </span>
                        </DisclosureButton>
                        <DisclosurePanel className="text-gray-500 pb-4">
                          Dimpified is built for skill and service-based
                          business. Businesses like barbers, hairdressers, Spa
                          Cnetre, Gyms, Beauty and Make-Up Salons, Dentist e.t.c
                          (not to be confused with businesses that want to sell
                          physical products){" "}
                        </DisclosurePanel>
                      </>
                    )}
                  </Disclosure>
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
                          Our platform is designed to help professional service
                          providers manage their online presence, client
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
                            business website?
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
                            How does the booking feature benefit my service
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
                          free" above, choose the plan that best fits your
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

export default About;
