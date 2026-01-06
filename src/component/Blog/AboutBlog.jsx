import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AboutBlogPage = () => {
return ( <div className="font-sans text-gray-800">
{/* Navbar */} <Navbar />
  {/* Hero Section */}
  <section className="text-center py-16 px-4 md:px-10 mt-8">
    <p className="text-xl md:text-lg font-semibold mb-4 mt-6 ">ABOUT US</p>
    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
      Creative Blog Writing and <br />Publishing Site
    </h2>
    <p className="max-w-2xl mx-auto text-gray-600 leading-relaxed">
     Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.
    </p>

    <div className="mt-10">
      <img
        src="https://i.imghippo.com/files/KOT6753zBo.jpg"
        alt="Team working"
        className="w-full h-[500px] md:w-3/4 mx-auto rounded-xl shadow-md"
      />
    </div>
  </section>

  {/* How We Work Section */}
  <section className="container mx-auto px-4 md:px-10 py-16">
    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
      I will show you how <br />our team works
    </h3>
    <p className="text-gray-600 mb-12 max-w-3xl">
Bring to the table win-win market strategies to ensure perfect articles. 
    </p>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Step 1 */}
      <div className="bg-purple-600 text-white p-6 rounded-xl shadow-md">
        <h4 className="text-5xl font-bold mb-3">01</h4>
        <h5 className="text-xl font-semibold mb-2">Brainstorming</h5>
        <p className="text-sm leading-relaxed mb-4">
          We begin by generating creative ideas that align with our readers' interests and the latest trends.
        </p>
        <button className=" text-white font-semibold px-4 py-2 rounded-md underline transition-all">
          Learn More
        </button>
      </div>

      {/* Step 2 */}
      <div className="bg-gray-100 p-6 rounded-xl shadow-md text-gray-800">
        <h4 className="text-5xl font-bold text-gray-300 mb-3">02</h4>
        <h5 className="text-purple-600 text-xl font-semibold mb-2">Analyzing</h5>
        <p className="text-sm leading-relaxed">
          Our experts analyze data, audience behavior, and engagement metrics to refine our content direction.
        </p>
      </div>

      {/* Step 3 */}
      <div className="bg-gray-100 p-6 rounded-xl shadow-md text-gray-800">
        <h4 className="text-5xl font-bold text-gray-300 mb-3">03</h4>
        <h5 className="text-purple-600 text-xl font-semibold mb-2">News Publishing</h5>
        <p className="text-sm leading-relaxed">
          Once everything is ready, we publish and share across platforms, ensuring maximum visibility and impact.
        </p>
      </div>
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

export default AboutBlogPage;
