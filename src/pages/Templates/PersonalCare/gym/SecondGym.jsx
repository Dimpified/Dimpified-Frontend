import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "react-modal-video/css/modal-video.css";
import { FiMenu, FiSearch } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import { Lightbox } from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { motion } from "motion/react";
import { gym } from "../../../../data/Services";
import { useCountry } from "../../../pricing/CountryContext";
import { getFormattedPrice } from "../../../../data/getServicePriceAndCountryCode";
import BookingModal from "../../../../features/Booking/NewBookingModal";

import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaInstagram,
  FaStar,
  FaQuoteRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

// App Component
const SecondGym = ({ userDetails }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleModalOpen = () => {
    setIsModalOpen(true); // Function to open the modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Function to close the modal
  };
  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'US'

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Gender");
  const [activity, setActivity] = useState("Select an activity factor");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();
    if (!height || !weight) return;

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) setStatus("Underweight");
    else if (bmiValue >= 18.5 && bmiValue <= 24.9) setStatus("Healthy");
    else if (bmiValue >= 25 && bmiValue <= 29.9) setStatus("Overweight");
    else setStatus("Obese");
  };

  const [open, setOpen] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };
  const coaches = [
    {
      name: "Chioma",
      fullName: "Chioma Nwosu",
      experience:
        "Certified personal trainer with 10 years of experience in strength training and weight loss coaching. Passionate about helping clients achieve their fitness goals with customized workout plans and proper nutrition guidance.",
      image: "https://gfa-tech.com/dimp-template-images/gym/gym20.jpg",
      socialLinks: {
        facebook: "https://facebook.com/",
        twitter: "https://twitter.com/",
        youtube: "https://youtube.com/",
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Emeka",
      fullName: "Emeka Okafor",
      experience:
        "Former professional athlete with 12 years of experience in fitness coaching. Specializes in high-intensity interval training (HIIT), bodybuilding, and endurance training. Known for his energetic and motivational coaching style.",
      image: "https://gfa-tech.com/dimp-template-images/gym/gym22.jpg",
      socialLinks: {
        facebook: "https://facebook.com/",
        twitter: "https://twitter.com/",
        youtube: "https://youtube.com/",
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Segun",
      fullName: "Segun Adebayo",

      experience:
        "Expert fitness coach with 8 years of experience in functional fitness, aerobics, and women's strength training. Focused on empowering women to build confidence, strength, and endurance through structured programs.",
      image: "https://gfa-tech.com/dimp-template-images/gym/gym23.jpg",
      socialLinks: {
        facebook: "https://facebook.com/",
        twitter: "https://twitter.com/",
        youtube: "https://youtube.com/",
        instagram: "https://instagram.com/",
      },
    },
    {
      name: "Fatima",
      fullName: "Fatima Bello",
      experience:
        "Specialist in athletic performance training with over 9 years of experience. Works with both beginners and elite athletes to improve speed, agility, and overall fitness. Also certified in injury prevention and recovery strategies.",
      image: "https://gfa-tech.com/dimp-template-images/gym/gym21.jpg",
      socialLinks: {
        facebook: "https://facebook.com/",
        twitter: "https://twitter.com/",
        youtube: "https://youtube.com/",
        instagram: "https://instagram.com/",
      },
    },
  ];

  const about = [
    "Want to be healthy and have a perfect body? GYMFIT is the right decision for you! It will create your personal training program and balance your diet so you could get the shape of your dream shortly!",
    "GYMFIT provides the best fitness programs tailored to your needs. Achieve your dream body with expert guidance!",
    "Transform your lifestyle with GYMFIT! Join us and experience the best in fitness and nutrition programs.",
  ];

  const services = [
    {
      title: "FITNESS",
      image: "https://gfa-tech.com/dimp-template-images/gym/gym7.jpg",
    },
    {
      title: "BODYBUILDING",
      image: "https://gfa-tech.com/dimp-template-images/gym/gym4.jpg",
    },
    {
      title: "CROSSFIT",
      image: "https://gfa-tech.com/dimp-template-images/gym/gym5.jpg",
    },
    {
      title: "CARDIO",
      image: "https://gfa-tech.com/dimp-template-images/gym/gym6.jpg",
    },
  ];

  const galleryImages = [
    "https://gfa-tech.com/dimp-template-images/gym/gym8.jpg",
    "https://gfa-tech.com/dimp-template-images/gym/gym9.jpg",
    "https://gfa-tech.com/dimp-template-images/gym/gym10.jpg",
    "https://gfa-tech.com/dimp-template-images/gym/gym11.jpg",
    "https://gfa-tech.com/dimp-template-images/gym/gym12.jpg",
    "https://gfa-tech.com/dimp-template-images/gym/gym13.jpg",
    "https://gfa-tech.com/dimp-template-images/gym/gym14.jpg",
    "https://gfa-tech.com/dimp-template-images/gym/gym15.jpg",
  ];

  const testimonials = [
    {
      id: 1,
      image: "https://gfa-tech.com/dimp-template-images/gym/gym24.jpg",
      text: "Joining this gym has been a game-changer for me! The trainers genuinely care about my progress, and the energy in the classes keeps me motivated. I've lost 10kg in three months, and I feel stronger than ever. The best part? The community here feels like family!",
      name: "Chinedu Okonkwo",
      title: "Entrepreneur",
    },
    {
      id: 2,
      image: "https://gfa-tech.com/dimp-template-images/gym/gym8.jpg",
      text: "I used to struggle with staying consistent, but the personal training sessions here have transformed my mindset. My trainer helped me build a routine that works for my busy schedule, and now I look forward to every session. If you're serious about fitness, this is the place!",
      name: "Yusuf Adewale",
      title: "Banker",
    },
    {
      id: 3,
      image: "https://gfa-tech.com/dimp-template-images/gym/gym10.jpg",
      text: "I never thought I'd enjoy the gym until I joined this one. The facilities are top-notch, the equipment is modern, and the environment is always welcoming. The group classes are my favorite, especially the Afrobeat dance workouts! Fitness has never been this fun.",
      name: "Tolu Adeyemi",
      title: "Software Engineer",
    },
  ];

  const items = ["DUMBBELL ROWS", "MEDICINE BALL", "KETTLEBELL", "JUMP ROPE"];

  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="font-Raj">
      <div>
        {/* Navbar */}
        <nav className=" top-0 left-0 w-full text-white px-6 py-4 flex justify-between items-center bg-black z-50">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-full">
              <img
                src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-icon-01.png"
                alt="Icon"
                className="h-6"
              />
            </div>
            <h1 className="text-2xl font-bold">
              {userDetails && userDetails.ecosystemName}
            </h1>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden text-2xl md:flex space-x-6 font-semibold">
            {[
              "Home",
              "About",
              "Services",
              "Membership",
              "Portfolio",
              "BMI Calculator",
            ].map((item) => (
              <a href={`#${item}`}>
                <li key={item} className="hover:text-red-500 cursor-pointer">
                  {item}
                </li>{" "}
              </a>
            ))}
          </ul>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <BsTelephone className="text-red-500" />
              <span className="hidden md:inline text-2xl">
                +234 80 1234 5678
              </span>
            </div>

            <FiMenu
              className="text-xl cursor-pointer md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            />
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <ul className="absolute text-lg top-16 left-0 w-full bg-black text-white flex flex-col items-center space-y-4 py-4 md:hidden">
              {[
                "Home",
                "About",
                "Services",
                "Membership",
                "Portfolio",
                "BMI Calculator",
              ].map((item) => (
                <a href={`#${item}`}>
                  <li key={item} className="hover:text-red-500 cursor-pointer">
                    {item}
                  </li>{" "}
                </a>
              ))}
            </ul>
          )}
        </nav>

        {/* Hero Slider */}
        <div id="Home" className="relative ">
          {/* Swiper Slider */}
          <Swiper
            modules={[Autoplay, Navigation]}
            loop={true}
            autoplay={{ delay: 4000 }}
            navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
            className="h-screen "
          >
            <SwiperSlide>
              <div
                className="relative md:h-screen h-[80vh] bg-cover bg-center flex items-center"
                style={{
                  backgroundImage:
                    "url('https://gfa-tech.com/dimp-template-images/gym/hero-gym.jpg')",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="container mx-auto px-6 relative z-10 text-white text-center">
                  <h2 className="text-red-500 text-2xl font-semibold">
                    Discover Transformation at{" "}
                    {userDetails && userDetails.ecosystemName}
                  </h2>
                  <h1 className="md:text-7xl text-5xl font-bold mt-2">
                    Elevate Your <br />
                    <span className="text-red-500">Fitness Journey</span>
                  </h1>

                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleModalOpen}
                      className="hover:bg-white hover:text-black font-semibold px-6 py-3 text-xl bg-red-500 text-white transition"
                    >
                      Join Us Now!
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          {isModalOpen && (
            <BookingModal isOpen={isModalOpen} handleClose={handleModalClose} />
          )}
        </div>
      </div>
      <section
        id="About"
        className="px-6 bg-white text-center md:py-10 w-full max-w-screen-xl"
      >
        <div className="max-w-3xl mx-auto">
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className="!pb-12 !w-full"
          >
            {about.map((text, index) => (
              <SwiperSlide key={index}>
                <div className="px-6">
                  <span className="text-3xl">“</span>
                  <p className="text-3xl font-semibold">{text}</p>
                  <span className="text-3xl">”</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section id="Services" className="px-6 py-10 bg-white text-white">
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24 ">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="relative group">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full  object-cover transition-transform transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h4 className="text-xl font-bold">{service.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="Membership"
        className="px-6 bg-black text-white py-16 relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-red-500 uppercase">Our Membership</p>
            <h2 className="text-7xl font-bold">Membership Plans</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {gym.map((service, index) => (
              <div
                key={index}
                className="relative border border-gray-500 p-8 text-center"
              >
                <p className="mb-6 text-gray-600 font-bold uppercase tracking-widest">
                  {service.name}
                </p>

                <p className="mb-2 text-gray-300">{service.shortDescription}</p>

                <div className="text-3xl font-bold">
                  {" "}
                  {getFormattedPrice(service.price, countryCode)}
                </div>
                <button
                  onClick={handleModalOpen}
                  className="mt-6 bg-red-500 hover:bg-red-600 text-white py-2 px-6 font-bold uppercase rounded"
                >
                  Subcribe Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="" className="px-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Counter Block 1 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center h-48 border border-gray-300 rounded-lg shadow-lg"
            >
              <div className="text-4xl font-bold text-black">
                <span className="odometer" data-count="10">
                  10
                </span>
                <span>+</span>
              </div>
              <p className="text-black text-xxl mt-2 font-bold uppercase">
                Years <br /> Experience
              </p>
            </motion.div>

            {/* Counter Block 2 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center h-48 border border-gray-300 rounded-lg shadow-lg"
            >
              <div className="text-4xl font-bold text-black">
                <span className="odometer" data-count="786">
                  786
                </span>
              </div>
              <p className="text-black text-xxl mt-2 font-bold uppercase">
                Happy <br /> Members
              </p>
            </motion.div>

            {/* Counter Block 3 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center h-48 border border-gray-300 rounded-lg shadow-lg"
            >
              <div className="text-4xl font-bold text-black">
                <span className="odometer" data-count="25">
                  25
                </span>
                <span>k</span>
              </div>
              <p className="text-black text-xxl mt-2 font-bold uppercase">
                Calories <br /> Burned
              </p>
            </motion.div>

            {/* Counter Block 4 */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center justify-center h-48 border border-gray-300 rounded-lg shadow-lg"
            >
              <div className="text-4xl font-bold text-black">
                <span className="odometer" data-count="90">
                  90
                </span>
                <span>k</span>
              </div>
              <p className="text-black text-xxl mt-2 font-bold uppercase">
                Hours <br /> Trained
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <section id="Portfolio" className="px-6 py-10 bg-black">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative group cursor-pointer overflow-hidden rounded-lg"
              >
                <img
                  src={image}
                  alt="Gallery"
                  className="w-full h-full object-cover transform transition duration-300 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  onClick={() => openLightbox(index)}
                >
                  <span className="text-white text-4xl">+</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={galleryImages.map((img) => ({ src: img }))}
          index={currentIndex}
        />
      </section>
      <section id="coaches" className="px-6 bg-gray-900 py-12">
        <div className="container mx-auto text-center w-full max-w-screen-xl">
          <div className="mb-8">
            <h3 className="text-xl font-bold uppercase text-red-600">
              Our Team
            </h3>
            <h2 className="text-5xl font-extrabold text-white">Our Coaches</h2>
          </div>

          {/* Swiper Carousel */}
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            speed={5000}
            loop={true}
            slidesPerView={4}
            spaceBetween={20}
            navigation
            className="relative !pb-12 !w-full"
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
          >
            {coaches.map((coach, index) => (
              <SwiperSlide key={index}>
                <div className="relative rounded-lg overflow-hidden shadow-lg">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-96 object-cover"
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="text-center text-white">
                      <h4 className="text-2xl font-bold">{coach.name}</h4>
                      <p className="text-sm mt-2">{coach.experience}</p>
                      <p className="text-xs mt-1">{coach.description}</p>

                      <div className="flex justify-center mt-3 space-x-3">
                        <a
                          href="https://facebook.com/"
                          className="hover:text-red-500"
                        >
                          <i className="fab fa-facebook-f"></i>
                        </a>
                        <a
                          href="https://twitter.com/"
                          className="hover:text-red-500"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a
                          href="https://youtube.com/"
                          className="hover:text-red-500"
                        >
                          <i className="fab fa-youtube"></i>
                        </a>
                        <a
                          href="https://instagram.com/"
                          className="hover:text-red-500"
                        >
                          <i className="fab fa-instagram"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      <section id="BMI Calculator" className="px-6 bg-white py-12  lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-left mb-8">
            <p className="text-red-600 font-semibold">// Body Mass Index</p>
            <h2 className="text-4xl font-bold">What Is Your BMI</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <form className="space-y-4" onSubmit={calculateBMI}>
              <input
                type="number"
                placeholder="185 Cm"
                className="w-full p-3 border rounded-lg"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Weight / kg"
                className="w-full p-3 border rounded-lg"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
              <input
                type="number"
                placeholder="Age"
                className="w-full p-3 border rounded-lg"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <select
                className="w-full p-3 border rounded-lg"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
              <select
                className="w-full p-3 border rounded-lg"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              >
                <option>Select an activity factor</option>
                <option>Factor 01</option>
                <option>Factor 02</option>
              </select>
              <button
                type="submit"
                className="w-32 bg-black text-white font-semibold border border-red-600 py-3 rounded-lg hover:bg-red-600 transition"
              >
                Calculate Now +
              </button>
            </form>

            <div className="border rounded-lg p-6">
              <h3 className="font-bold text-lg mb-4">BMI & Weight Status</h3>
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2">BMI</th>
                    <th className="border border-gray-300 p-2">
                      Weight Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 p-2">Below 18.5</td>
                    <td className="border border-gray-300 p-2">Underweight</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">18.5-24.9</td>
                    <td className="border border-gray-300 p-2">Healthy</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">25.0-29.9</td>
                    <td className="border border-gray-300 p-2">Overweight</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 p-2">
                      30.0 and Above
                    </td>
                    <td className="border border-gray-300 p-2">Obese</td>
                  </tr>
                </tbody>
              </table>
              {bmi && (
                <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                  <p className="text-lg font-bold">Your BMI: {bmi}</p>
                  <p className="text-md">Status: {status}</p>
                </div>
              )}
              <div className="mt-6 text-sm">
                <p>
                  <strong>BMR</strong> - Metabolic Rate
                </p>
                <p>
                  <strong>BMI</strong> - Body Mass Index
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="testimonial-section bg-black bg-center py-16 text-white"
        style={{
          backgroundImage: "url('assets/images/background/testimonial-1.jpg')",
        }}
      >
        <div className="container mx-auto px-4 w-full max-w-screen-xl">
          <div className="text-center mb-12">
            <p className="text-red-500 font-bold text-sm">REVIEWS</p>
            <h2 className="text-4xl font-bold">Happy Members Thoughts</h2>
          </div>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".custom-prev",
              nextEl: ".custom-next",
            }}
            spaceBetween={30}
            slidesPerView={1}
            className="!pb-12 !w-full"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="flex flex-wrap items-center">
                  <div className="w-full md:w-1/4  mb-6 md:mb-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="rounded-full w-32 md:w-48 mx-auto"
                    />
                  </div>
                  <div className="w-full md:w-3/4 ps-10">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, index) => (
                        <FaStar key={index} className="text-yellow-400 mr-1" />
                      ))}
                    </div>
                    <p className="mb-4">{testimonial.text}</p>
                    <p className="font-bold">
                      {testimonial.name}{" "}
                      <span className="text-red-500">
                        - {testimonial.title}
                      </span>
                    </p>
                    <FaQuoteRight className="text-4xl text-red-500 mt-4" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="testimonial-navigation flex justify-center space-x-8 mt-8">
            <button className="custom-prev text-white text-2xl">
              <FaAngleLeft />
            </button>
            <button className="custom-next text-white text-2xl">
              <FaAngleRight />
            </button>
          </div>
        </div>
      </section>
      {/* <NewsSection /> */}
      <section id="" className="relative w-full bg-white">
        {/* Scrolling Text Banner with Swiper */}
        {/* <div className="relative overflow-hidden bg-red-600 py-3">
          <Swiper
            slidesPerView="auto"
            loop={true}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
            }}
            speed={5000}
            modules={[Autoplay]}
            className="flex items-center text-white font-bold text-lg uppercase"
          >
            {items.map((item, index) => (
              <SwiperSlide key={index} className="w-auto px-16 text-4xl">
                <span className="flex items-center">
                  {item} <span className="mx-4">💪</span>
                </span>
              </SwiperSlide>
            ))}
          </Swiper>
        </div> */}

        {/* Discuss Section */}
        <div className="relative flex flex-col items-center justify-center text-center my-10">
          <h1 className="text-[8vw] font-extrabold uppercase tracking-wide text-black stroke-text">
            JOIN US NOW
          </h1>
        </div>
      </section>
      <footer className="bg-black text-white py-10 relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: "url('/assets/images/background/footer-bg.jpg')",
          }}
        ></div>
        <div className="relative container mx-auto px-6 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Logo & Socials */}
            <div>
              <div className="flex items-center space-x-2">
                <div className="bg-white p-2 rounded-full">
                  <img
                    src="https://craftohtml.themezaa.com/images//demo-gym-and-fitness-home-icon-01.png"
                    alt="Icon"
                    className="h-6"
                  />
                </div>
                <h1 className="text-2xl font-bold">GYMFIT</h1>
              </div>
              <p className="mb-4">
                Welcome to Gymfit Fitness! We are here to support and guide you.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com/"
                  className="text-white text-xl hover:text-red-500"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://twitter.com/"
                  className="text-white text-xl hover:text-red-500"
                >
                  <FaTwitter />
                </a>
                <a
                  href="https://youtube.com/"
                  className="text-white text-xl hover:text-red-500"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://instagram.com/"
                  className="text-white text-xl hover:text-red-500"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>
            {/* Our Services */}
            <div>
              <h3 className="text-red-500 text-lg font-bold mb-4">
                // Our Services
              </h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-red-500">
                    Personal Training
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Group Workout
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Muscle Building
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Virtual Gym Training
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-red-500">
                    Body Stretching
                  </a>
                </li>
              </ul>
            </div>
            {/* Links */}
            <div>
              <h3 className="text-red-500 text-lg font-bold mb-4">// Links</h3>
              <ul className="space-y-2">
                {[
                  "Home",
                  "About",
                  "Services",
                  "Membership",
                  "Portfolio",
                  "BMI Calculator",
                ].map((item) => (
                  <a href={`#${item}`}>
                    <li
                      key={item}
                      className="hover:text-red-500 cursor-pointer"
                    >
                      {item}
                    </li>{" "}
                  </a>
                ))}
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h3 className="text-red-500 text-lg font-bold mb-4">
                // CONTACT
              </h3>
              <p className="mb-2">{userDetails && userDetails.address}</p>
              <p>
                Phone:{" "}
                <a
                  href="tel:+12031230606"
                  className="text-white hover:text-red-500"
                >
                  {userDetails && userDetails.phoneNumber}
                </a>
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:info@nostop.com"
                  className="text-white hover:text-red-500"
                >
                  {userDetails && userDetails.address}
                </a>
              </p>
            </div>
          </div>
          {/* Footer Bottom */}
          <div className="text-center mt-8 border-t border-gray-700 pt-4">
            © {new Date().getFullYear()} Bulit with {""}
            <a
              href="https://www.dimpified.com/"
              target="_blank"
              rel="noreferrer"
              class="text-white underline hover:text-white"
            >
              Dimpified.
            </a>{" "}
            All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
};
export default SecondGym;
