import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const NotFoundPage = () => {
  return (
    <div className="w-full bg-white text-gray-800 flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* 404 Section */}
<section className="flex flex-col items-center justify-center text-center py-24 px-4 bg-white flex-grow">
  <div className="bg-purple-600 text-white px-10 py-16 rounded-lg shadow-md mt-10">
    <h1 className="text-8xl md:text-9xl font-bold mb-4">404</h1>
    <p className="text-purple-100 text-lg mb-6">
      Sorry! <br />The link is broken, try to refresh or go to home
    </p>
    <button className="bg-white text-purple-700 px-6 py-3 rounded-md hover:bg-gray-100 transition">
      Go to Home
    </button>
  </div>
</section>


       {/* Newsletter Section */}
      <section className="bg-purple-700 text-white py-16 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          Get our stories delivered from <br />us to your inbox weekly.
        </h3>
        <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto px-4">
          <input
            type="email"
            placeholder="Your Email"
            className="w-full sm:w-2/3 px-4 py-3 rounded-md text-gray-800 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-purple-700 text-white px-6 py-3 rounded-md hover:text-purple-700 hover:bg-white border border-white"
          >
            Get started
          </button>
        </form>
        <p className="mt-6">
          Get a response tomorrow if you submit by 9pm today. If we received
          after 9pm will get a reponse the <br />
          following day.
        </p>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default NotFoundPage;
