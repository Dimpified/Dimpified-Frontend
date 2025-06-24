import React, { useState, useEffect } from "react";

const WeddingTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timelineData = [
    {
      year: "2018",
      title: "First time we met",
      description: "Lorem ipsum consectetur adipiscing elit eiusmod.",
    },
    {
      year: "2019",
      title: "Our first date",
      description: "Lorem ipsum consectetur adipiscing elit eiusmod.",
    },
    {
      year: "2020",
      title: "Our marriage proposal",
      description: "Lorem ipsum consectetur adipiscing elit eiusmod.",
    },
    {
      year: "2023",
      title: "Our engagement",
      description: "Lorem ipsum consectetur adipiscing elit eiusmod.",
    },
  ];

  const galleryImages = [
    "https://craftohtml.themezaa.com/images/demo-wedding-invitation-gallery-img-01.jpg",
    "https://craftohtml.themezaa.com/images/demo-wedding-invitation-gallery-img-02.jpg",
    "https://craftohtml.themezaa.com/images/demo-wedding-invitation-gallery-img-03.jpg",
    "https://craftohtml.themezaa.com/images/demo-wedding-invitation-gallery-img-04.jpg",
    "https://craftohtml.themezaa.com/images/demo-wedding-invitation-gallery-img-05.jpg",
    "https://craftohtml.themezaa.com/images/demo-wedding-invitation-gallery-img-06.jpg",
  ];

  const targetDate = new Date("2025-08-01T12:00:00");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  useEffect(() => {
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);
  const teamMembers = [
    {
      name: "Stefano Smith",
      role: "Groomsman",
      img: "https://craftohtml.themezaa.com/images/demo-wedding-team-01.png",
    },
    {
      name: "Evan Thomson",
      role: "Groomsman",
      img: "https://craftohtml.themezaa.com/images/demo-wedding-team-02.png",
    },
    {
      name: "Bryan Johnson",
      role: "Groomsman",
      img: "https://craftohtml.themezaa.com/images/demo-wedding-team-03.png",
    },
    {
      name: "Pablo Dante",
      role: "Groomsman",
      img: "https://craftohtml.themezaa.com/images/demo-wedding-team-04.png",
    },
    {
      name: "Didier Hendrix",
      role: "Bridesmaid",
      img: "https://craftohtml.themezaa.com/images/demo-wedding-team-05.png",
    },
    {
      name: "Samantha Jones",
      role: "Bridesmaid",
      img: "https://craftohtml.themezaa.com/images/demo-wedding-team-06.png",
    },
    {
      name: "Nick Hempherson",
      role: "Bridesmaid",
      img: "https://craftohtml.themezaa.com/images/demo-wedding-team-07.png",
    },
    {
      name: "Jonathan James",
      role: "Bridesmaid",
      img: "https://craftohtml.themezaa.com/images/demo-wedding-team-08.png",
    },
  ];
  const events = [
    {
      date: "24",
      month: "March",
      title: "The reception",
      icon: "line-icon-Plates",
      address: "175 Broadway, Brooklyn, New York 11244, USA",
      time: "12:00 am to 03:00 pm",
      img: "https://craftohtml.themezaa.com/images/demo-wedding-invitation-sliding-box-img-01.jpg",
    },
    {
      date: "24",
      month: "March",
      title: "The ceremony",
      icon: "line-icon-Birthday-Cake",
      address: "175 Broadway, Brooklyn, New York 11244, USA",
      time: "03:00 pm to 05:00 pm",
      img: "https://craftohtml.themezaa.com/images/demo-wedding-invitation-sliding-box-img-02.jpg",
    },
    {
      date: "25",
      month: "March",
      title: "The afterparty",
      icon: "line-icon-Martini-Glass",
      address: "175 Broadway, Brooklyn, New York 11244, USA",
      time: "05:00 pm to 10:30 pm",
      img: "https://craftohtml.themezaa.com/images/demo-wedding-invitation-sliding-box-img-03.jpg",
    },
  ];
  return (
    <div className="font-sen">
      <div
        className="min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://craftohtml.themezaa.com/images/demo-wedding-invitation-banner-bg.jpg')",
        }}
      >
        {/* Navbar */}
        <nav className="bg-transparent  py-4 lg:px-32 px-4">
          <div className="container mx-auto flex justify-between items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center space-x-8 uppercase text-sm font-semibold">
              <a href="#couple" className="hover:text-purple-500">
                Couple
              </a>
              <a href="#timeline" className="hover:text-purple-500">
                Timeline
              </a>
              <a href="#gallery" className="hover:text-purple-500">
                Gallery
              </a>
            </div>

            {/* Logo / Branding */}
            <a href="/" className="text-2xl font-bold uppercase text-gray-800">
              TO-DE
            </a>

            {/* More Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center space-x-8 uppercase text-sm font-semibold">
              <a href="#people" className="hover:text-purple-500">
                People
              </a>
              <a href="#when" className="hover:text-purple-500">
                When & Where
              </a>
              <a
                href="#rsvp"
                className="bg-purple-500 text-white py-1 px-4 rounded-md hover:bg-purple-600 transition"
              >
                RSVP
              </a>
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-purple-500 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden flex flex-col items-center mt-4 space-y-4 text-sm font-semibold uppercase">
              <a href="#couple" className="hover:text-purple-500">
                Couple
              </a>
              <a href="#timeline" className="hover:text-purple-500">
                Timeline
              </a>
              <a href="#gallery" className="hover:text-purple-500">
                Gallery
              </a>
              <a href="#people" className="hover:text-purple-500">
                People
              </a>
              <a href="#when" className="hover:text-purple-500">
                When & Where
              </a>
              <a
                href="#rsvp"
                className="bg-purple-500 text-white py-1 px-4 rounded-md hover:bg-purple-600 transition"
              >
                RSVP
              </a>
            </div>
          )}
        </nav>
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center h-[600px] md:h-[700px]">
          <div
            className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] lg:w-[700px] lg:h-[700px] rounded-full bg-center bg-no-repeat shadow-lg"
            style={{
              backgroundImage:
                "url('https://craftohtml.themezaa.com/images/demo-wedding-invitation-banner.png')",
            }}
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center space-y-5">
              <div className="text-center text-white">
                <h1 className="text-5xl font-Bebas md:text-5xl lg:text-8xl tracking-wider font-bold uppercase">
                  <span className="font-bold bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ffa600] text-transparent bg-clip-text">
                    Temitope
                  </span>
                  <div className="text-sm font-normal my-2">- and -</div>
                  <span className="font-bold bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ffa600] text-transparent bg-clip-text">
                    Adebowale
                  </span>
                </h1>

                <div className="flex items-center justify-center space-x-4 text-lg mt-5 text-gray-700">
                  <div>December</div>
                  <span className="block w-[1px] h-5 bg-gray-700"></span>
                  <div className="text-4xl font-bold">20</div>
                  <span className="block w-[1px] h-5 bg-gray-700"></span>
                  <div>2024</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section id="couple" className="relative bg-gray-100 py-10">
        {/* Background Image */}
        <div
          className="absolute left-0 top-[-50px] lg:top-[-25px] w-full h-[100px] bg-no-repeat bg-left-top"
          style={{
            backgroundImage:
              "url('https://craftohtml.themezaa.com/images/demo-wedding-invitation-banner-effect.png')",
          }}
        ></div>

        <div className="flex flex-col h-full lg:px-32 px-4 relative">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-6xl font-Bebas tracking-wide uppercase text-gray-800">
              We're getting married!
            </h1>
          </div>

          {/* Bride and Groom Section */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-20">
            {/* Bride Info */}
            <div className="text-center md:w-1/4">
              <span className="text-purple-600 text-lg uppercase">
                The Bride
              </span>
              <h3 className="text-2xl font-semibold uppercase text-gray-800 mb-3">
                Temitope Kehinde
              </h3>
              <p className="mb-4 text-gray-600">
                Lorem ipsum consectetur adipiscing elit eiusmod tempor
                incididunt labore dolore magna minim veniam exercitation.
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook-f text-gray-800 hover:text-purple-600"></i>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram text-gray-800 hover:text-purple-600"></i>
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-twitter text-gray-800 hover:text-purple-600"></i>
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="md:w-1/2">
              <img
                src="https://craftohtml.themezaa.com/images/demo-wedding-invitation-img-01.png"
                alt="Bride and Groom"
                className="w-full max-w-md mx-auto"
              />
            </div>

            {/* Groom Info */}
            <div className="text-center md:w-1/4">
              <span className="text-purple-600 text-lg uppercase">
                The Groom
              </span>
              <h3 className="text-2xl font-semibold uppercase text-gray-800 mb-3">
                Adebowale Morakinyo
              </h3>
              <p className="mb-4 text-gray-600">
                Lorem ipsum consectetur adipiscing elit eiusmod tempor
                incididunt labore dolore magna minim veniam exercitation.
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-facebook-f text-gray-800 hover:text-purple-600"></i>
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-instagram text-gray-800 hover:text-purple-600"></i>
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fa-brands fa-twitter text-gray-800 hover:text-purple-600"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-10">
        <div className="flex flex-col h-full lg:px-32 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 ">
            {timelineData.map((item, index) => (
              <div key={index} className="flex flex-col px-4">
                <div className="relative w-full">
                  <div className="absolute w-full bg-gray-300 h-px top-1/2"></div>
                  <div className="relative flex items-center justify-center bg-purple-600 w-6 h-6 rounded-full">
                    <span className="block w-2 h-2 bg-white rounded-full"></span>
                  </div>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="text-7xl font-bold text-gray-400 text-outline">
                  {item.year}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="gallery" className="bg-gray-100 py-10">
        <div className="flex flex-col h-full lg:px-32 px-4">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-purple-500 text-lg font-semibold uppercase border-r pr-4 mr-4">
              Photo gallery
            </span>
            <h2 className="text-2xl font-bold uppercase text-gray-800">
              Captured Moments
            </h2>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg shadow-lg"
              >
                {/* Image */}
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i className="bi bi-camera text-white text-3xl"></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section
        className="bg-gray-100 py-16 text-center relative bg-cover h-screen"
        style={{
          backgroundImage:
            "url('https://craftohtml.themezaa.com/images/demo-wedding-invitation-img-03.jpg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="text-3xl font-bold uppercase mb-8 text-gray-800">
          Start Celebration
        </h2>
        <div className="flex justify-center space-x-10 text-purple-500">
          <div>
            <div className="text-5xl font-bold">{timeLeft.days}</div>
            <div className="text-lg">Days</div>
          </div>
          <div>
            <div className="text-5xl font-bold">{timeLeft.hours}</div>
            <div className="text-lg">Hours</div>
          </div>
          <div>
            <div className="text-5xl font-bold">{timeLeft.minutes}</div>
            <div className="text-lg">Minutes</div>
          </div>
          <div>
            <div className="text-5xl font-bold">{timeLeft.seconds}</div>
            <div className="text-lg">Seconds</div>
          </div>
        </div>
      </section>
      <section id="people" className="bg-gray-100 pt-8">
        <div className="flex flex-col h-full lg:px-32 px-4 text-center">
          <div className="mb-10">
            <span className="inline-block text-primary text-lg font-semibold border-r-2 pr-4 mr-4 uppercase">
              Best friends
            </span>
            <h2 className="inline-block text-2xl font-light uppercase">
              Groomsman & Bridesmaid
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.img}
                  alt={member.name}
                  className="mb-4 w-full h-auto"
                />
                <span className="block text-lg font-semibold text-gray-800">
                  {member.name}
                </span>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="when" className="bg-gray-100 lg:py-32">
        <div className="flex flex-col">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="inline-block text-primary text-lg font-semibold border-r-1 pr-4 mr-4 uppercase">
              Time and place
            </span>
            <h2 className="inline-block text-2xl font-light uppercase">
              When and where
            </h2>
          </div>

          {/* Event Cards */}
          <div className="flex flex-wrap justify-center gap-6">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white shadow-md w-96 flex overflow-hidden rounded-md"
              >
                {/* Left: Image + Date */}
                <div className="relative w-1/2">
                  <img
                    src={event.img}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 left-4 bg-gray-800 text-white px-3 py-1 text-center rounded-md">
                    <span className="block text-2xl font-bold">
                      {event.date}
                    </span>
                    <span className="block text-sm uppercase">
                      {event.month}
                    </span>
                  </div>
                </div>

                {/* Right: Event Details */}
                <div className="w-1/2 p-4">
                  <i
                    className={`mb-2 text-3xl text-gray-700 ${event.icon}`}
                    aria-hidden="true"
                  ></i>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">{event.address}</p>
                  <div className="flex items-center text-sm text-gray-600 border-t pt-2">
                    <i className="feather icon-feather-clock mr-2"></i>
                    <span>{event.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="rsvp" className="bg-gray-100 py-10">
        <div className="flex flex-col h-full lg:px-32 px-4 px-4">
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <form
                action="email-templates/contact-form.php"
                method="post"
                className="relative p-6"
              >
                {/* Heading */}
                <div className="text-center mb-6">
                  <h2 className="text-4xl font-semibold text-gray-800">
                    Are you attending?
                  </h2>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Enter your name*
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <i className="bi bi-emoji-smile"></i>
                      </span>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="What's your good name?"
                        required
                        className="pl-10 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your email address*
                    </label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email address"
                        required
                        className="pl-10 w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label
                      htmlFor="guests"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Number of guests
                    </label>
                    <select
                      id="guests"
                      name="guests"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                    >
                      <option value="One">One</option>
                      <option value="Two">Two</option>
                      <option value="Three">Three</option>
                      <option value="Four">Four</option>
                      <option value="Five">Five</option>
                    </select>
                  </div>

                  {/* Attendance */}
                  <div>
                    <label
                      htmlFor="attendance"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Will you attend?
                    </label>
                    <select
                      id="attendance"
                      name="select"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                    >
                      <option value="">All</option>
                      <option value="The reception">The reception</option>
                      <option value="The ceremony">The ceremony</option>
                      <option value="The afterparty">The afterparty</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div className="col-span-1 md:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Your message
                    </label>
                    <textarea
                      id="message"
                      name="comment"
                      placeholder="Describe your message"
                      rows="4"
                      className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                    ></textarea>
                  </div>
                </div>

                {/* Privacy Notice & Submit Button */}
                <div className="mt-6 flex flex-col md:flex-row items-center justify-between">
                  <p className="text-sm text-gray-600 mb-4 md:mb-0 md:w-2/3">
                    We are committed to protecting your privacy. We will never
                    collect information about you without your explicit consent.
                  </p>
                  <button
                    type="submit"
                    className="bg-gray-800 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition"
                  >
                    Send message
                  </button>
                </div>

                {/* Form Results */}
                <div className="form-results mt-6 hidden"></div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WeddingTemplate;
