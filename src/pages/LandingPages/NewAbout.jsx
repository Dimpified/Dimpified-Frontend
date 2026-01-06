import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiX } from "react-icons/hi";

export default function About() {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <HeroSection />
      <FaqSection />
      <Footer />
    </div>
  );
}
{
  /* HEADER */
}
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToElement = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  return (
    <>
      <div className="w-full bg-white fixed top-0 left-0 z-50 shadow">
        <nav className="w-full py-4 flex items-center justify-between px-6 lg:px-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.png" className="h-6" alt="Logo" />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-10 text-gray-700 font-medium">
            <li>
              <span
                onClick={() => scrollToElement("features")}
                className="hover:text-[#9810FA] cursor-pointer"
              >
                Features
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="hover:text-[#9810FA]">Marketplace</span>
              <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-[#9810FA] rounded-full border border-purple-200">
                Coming Soon
              </span>
            </li>
            <li>
              <span
                onClick={() => scrollToElement("pricing")}
                className="hover:text-[#9810FA] cursor-pointer"
              >
                Pricing
              </span>
            </li>
            <li>
              <span
                onClick={() => scrollToElement("templates")}
                className="hover:text-[#9810FA] cursor-pointer"
              >
                Templates
              </span>
            </li>
          </ul>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/auth/login">
              <button className="text-gray-600 hover:text-[#9810FA] font-medium">
                Log in
              </button>
            </Link>

            <Link to="/auth/personal-information">
              <button className="px-6 py-2.5 bg-gradient-to-r from-[#9810FA] to-purple-600 text-white rounded-full font-semibold hover:shadow-lg">
                Get Started Now
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-3xl text-gray-700"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <HiX className="w-6 h-6 text-[#9810FA]" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-[#9810FA]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white z-50 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:hidden shadow-2xl`}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <Link to="/" onClick={() => setIsOpen(false)}>
            <img src="/logo.png" className="h-6" alt="Logo" />
          </Link>
          <button onClick={toggleMenu}>
            <HiX className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <ul className="flex flex-col gap-6 text-gray-700 font-medium">
            <li>
              <span
                onClick={() => scrollToElement("features")}
                className="block py-2 hover:text-[#9810FA]"
              >
                Features
              </span>
            </li>

            <li className="flex items-center justify-between">
              <span className="hover:text-[#9810FA]">Marketplace</span>
              <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-[#9810FA] rounded-full border">
                Coming Soon
              </span>
            </li>

            <li>
              <span
                onClick={() => scrollToElement("pricing")}
                className="block py-2 hover:text-[#9810FA]"
              >
                Pricing
              </span>
            </li>

            <li>
              <span
                onClick={() => scrollToElement("templates")}
                className="block py-2 hover:text-[#9810FA]"
              >
                Templates
              </span>
            </li>
          </ul>

          {/* Buttons */}
          <div className="my-8 border-t border-gray-100" />

          <div className="flex flex-col gap-4">
            <Link to="/auth/login" onClick={() => setIsOpen(false)}>
              <button className="w-full py-3 border-2 border-[#9810FA] text-[#9810FA] rounded-full">
                Log in
              </button>
            </Link>

            <Link
              to="/auth/personal-information"
              onClick={() => setIsOpen(false)}
            >
              <button className="w-full py-3 bg-gradient-to-r from-[#9810FA] to-purple-600 text-white rounded-full">
                Get Started Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Dark Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </>
  );
};
{
  /* HERO */
}
const HeroSection = () => (
  <section className="px-6 md:px-16 lg:px-32 py-16 mt-20">
    <div className="flex flex-col lg:flex-row items-center gap-12">
      {/* Text Content */}
      <div className="lg:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About Us</h2>

        <p className="text-[#9810FA] font-semibold mb-3">
          Mission: What Dimpified is about
        </p>

        <p className="text-gray-700 leading-relaxed mb-6">
          We built Dimpified with a "WHY", a vision to answer the question in
          the heart of every business owner providing them with easy-to-use
          tools designed to bring them closer to their customers. From solo
          startups to growing teams, Dimpified's tools expand with your needs,
          providing reliable support in booking, client management, and
          marketing to help your business thrive.
        </p>

        <button className="bg-[#9810FA] text-white px-6 py-3 rounded-full flex items-center gap-2 w-fit hover:bg-purple-700 transition">
          Get Started
          <span className="text-xl">→</span>
        </button>
      </div>

      {/* Image */}
      <div className="lg:w-1/2 flex justify-center lg:justify-end">
        <img
          src="https://i.imghippo.com/files/sHLb7278RGM.png"
          alt="About Visual"
          className=" md:w-80 md:h-72 rounded-3xl object-cover shadow-lg"
        />
      </div>
    </div>
  </section>
);
{
  /* FAQ */
}
const FaqSection = () => (
  <section className="px-6 md:px-16 lg:px-32 py-16 mt-20">
    <h3 className="text-3xl md:text-4xl font-bold mb-10">
      Frequently asked questions
    </h3>

    <div className="space-y-4">
      {/* FAQ 1 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <details className="group p-4 cursor-pointer">
          <summary className="font-semibold flex justify-between items-center">
            Why should I use Dimpified?
            <span className="text-xl group-open:rotate-180 transition">⌃</span>
          </summary>
          <p className="text-gray-600 mt-3">
            Dimpified saves you time by letting customers see your services and
            book times that suit them. They can pay online, which fills your
            calendar <br />
            ahead. Automatic reminders help reduce no-shows, and you don’t have
            to reply to booking requests in messages. This frees you to focus on{" "}
            <br />
            your work and grow your business. 
          </p>
        </details>
      </div>

      {/* FAQ 2 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <details className="group p-4 cursor-pointer">
          <summary className="font-semibold flex justify-between items-center">
            How does Dimpified help me manage bookings more easily?
            <span className="text-xl group-open:rotate-180 transition">⌃</span>
          </summary>
          <p className="text-gray-600 mt-3">
            Dimpified gives you a unique booking link your customers use to book
            and pay in advance. With real-time scheduling, customers see your{" "}
            <br />
            availability and booked times instantly. 
          </p>
        </details>
      </div>

      {/* FAQ 3 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <details className="group p-4 cursor-pointer">
          <summary className="font-semibold flex justify-between items-center">
            How can my customers book my services?
            <span className="text-xl group-open:rotate-180 transition">⌃</span>
          </summary>
          <p className="text-gray-600 mt-3">
            Your customers can book your services using a unique booking link,
            also found as your website URL on your dashboard after signing up. 
          </p>
        </details>
      </div>

      {/* FAQ 4 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <details className="group p-4 cursor-pointer">
          <summary className="font-semibold flex justify-between items-center">
            Can I accept online payments through Dimpified?
            <span className="text-xl group-open:rotate-180 transition">⌃</span>
          </summary>
          <p className="text-gray-600 mt-3">
            Yes, You can accept online payment in two ways; customer can pay
            into your bank account or pay through our online payment 
          </p>
        </details>
      </div>

      {/* FAQ 5 */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <details className="group p-4 cursor-pointer">
          <summary className="font-semibold flex justify-between items-center">
            What do I need to get started?
            <span className="text-xl group-open:rotate-180 transition">⌃</span>
          </summary>
          <p className="text-gray-600 mt-3">
            You only need a mobile smartphone with a browser app (Chrome,
            Firefox etc) 
          </p>
        </details>
      </div>
    </div>
  </section>
);
{
  /* FOOTER */
}
const Footer = () => {
  return (
    <footer className="bg-black text-white px-6 md:px-16 lg:px-32 py-16 mt-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <div>
          <img
            src="https://i.imghippo.com/files/EI2275rJE.png"
            className="h-6"
          />

          <p className="text-sm text-gray-300 mt-3">
            The No. 1 booking solution for service businesses.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Product</h3>
          <ul className="space-y-2 text-gray-300 mt-3">
            <li>
              <a href="#features" className="hover:text-purple-500">
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-purple-500">
                Pricing
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-purple-500">
                Testimonials
              </a>
            </li>
            <li>
              Integrations{" "}
              <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full border">
                Coming Soon
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Company</h3>
          <ul className="space-y-2 text-gray-300 mt-3">
            <li>
              <a href="/about" className="hover:text-purple-500">
                About Dimpified
              </a>
            </li>
            <li>
              Blog{" "}
              <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full border">
                Coming Soon
              </span>
            </li>
            <li>
              Academy{" "}
              <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full border">
                Coming Soon
              </span>
            </li>
            <li>
              <a href="/help" className="hover:text-purple-500">
                Help Centre
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg">Support</h3>
          <ul className="space-y-2 text-gray-300 mt-3">
            <li>
              Help Center{" "}
              <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full border">
                Coming Soon
              </span>
            </li>
            <li>
              Documentation{" "}
              <span className="text-[10px] px-2 py-0.5 bg-purple-100 text-purple-600 rounded-full border">
                Coming Soon
              </span>
            </li>
            <li>
              <a href="/privacy-policy" className="hover:text-purple-500">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/terms-of-service" className="hover:text-purple-500">
                Terms of service
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="mt-10 border-gray-700 opacity-50" />

      <div className="mt-8 flex flex-col md:flex-row items-center justify-between text-gray-500">
        <div className="text-sm">
          © {new Date().getFullYear()} Dimpified. All rights reserved.
        </div>

        <div className="flex items-center gap-5 mt-4 md:mt-0">
          <i className="fab fa-facebook-f text-gray-400 hover:text-white"></i>
          <i className="fab fa-x-twitter text-gray-400 hover:text-white"></i>
          <i className="fab fa-instagram text-gray-400 hover:text-white"></i>
          <i className="fab fa-linkedin text-gray-400 hover:text-white"></i>
        </div>
      </div>
    </footer>
  );
};
