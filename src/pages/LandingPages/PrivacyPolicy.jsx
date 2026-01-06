import React from "react";

import GradientBG from "../LandingPages/images/gradient-bg.png";
import { Helmet } from "react-helmet";
import Navbar from "../../component/Blog/Navbar";
import Footer from "../../component/Blog/Footer";
const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Dimpified </title>
        <meta
          name="description"
          content="Dimpified Privacy Policy"
        />
        <meta property="og:title" content="Privacy Policy - Dimpified" />
        <meta
          property="og:description"
          content="Dimpified Privacy Policy "
        />
      </Helmet>
      <Navbar />

      <section
        className="py-24 font-jak px-0 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${GradientBG})` }}
      >
        <div className="flex flex-col h-full py-4 px-4 lg:px-24">
          <div className="flex flex-col md:flex-row items-center h-full">
            <div className="md:w-1/2 px-3 flex flex-col justify-center h-full">
              <h1 className="lg:text-5xl text-[3rem] text-dark font-normal leading-tight my-6">
                <span className="font-bold bg-gradient-to-r from-[#4f2683] via-[#9966cc] to-[#ffa600] text-transparent bg-clip-text">
                  Privacy Policy
                </span>
              </h1>
              <p className="text-lg text-dark leading-relaxed mb-8 w-4/5">
                Effective Date: 1st of January, 2025{" "}
              </p>
            </div>
          </div>
        </div>
      </section>

      <main className="md:px-24 mx-auto px-4 py-8 sm:py-12">
        <div className="bg-white rounded-lg overflow-hidden">
          {/* Introduction */}
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              Dimpified respects your privacy. This Privacy Policy explains how
              we collect, use, and protect your information.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="divide-y divide-gray-200">
            {/* Section 1 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  1
                </span>
                Information We Collect
              </h2>

              <div className="ml-11">
                <h3 className="font-medium text-gray-800 mt-4 mb-2">
                  a. Information You Provide:
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Name, email address, phone number</li>
                  <li>Business information</li>
                  <li>
                    Payment details (handled securely via third-party
                    processors)
                  </li>
                </ul>

                <h3 className="font-medium text-gray-800 mt-4 mb-2">
                  b. Automatically Collected Data:
                </h3>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>IP address, browser type, and device information</li>
                  <li>Usage data (pages visited, time on site, etc.)</li>
                </ul>

                <h3 className="font-medium text-gray-800 mt-4 mb-2">
                  c. Cookies and Tracking Technologies:
                </h3>
                <p className="text-gray-700 pl-4 border-l-2 border-gray-300">
                  We use cookies to enhance your experience and analyze traffic.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  2
                </span>
                How We Use Your Information
              </h2>
              <p className="text-gray-700 mb-2">We use your information to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Provide and improve our Services</li>
                <li>Process transactions</li>
                <li>Communicate with you</li>
                <li>Enforce our Terms of Service</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  3
                </span>
                How We Share Your Information
              </h2>
              <p className="text-gray-700 mb-2">
                We do not sell your personal data. We may share your data with:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Trusted service providers (e.g., cloud hosting, payment
                  processors)
                </li>
                <li>Law enforcement if required by law</li>
                <li>Business partners with your consent</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  4
                </span>
                Your Choices and Rights
              </h2>
              <p className="text-gray-700 mb-2">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Access, correct, or delete your personal information</li>
                <li>Object to or restrict certain processing</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="text-gray-700 mt-4">
                To exercise these rights, email{" "}
                <a
                  href="mailto:hello@dimpified.com"
                  className="text-primary3 hover:underline"
                >
                  hello@dimpified.com
                </a>
                .
              </p>
            </div>

            {/* Section 5 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  5
                </span>
                Data Retention
              </h2>
              <p className="text-gray-700">
                We retain your data as long as necessary to provide our Services
                and comply with legal obligations.
              </p>
            </div>

            {/* Section 6 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  6
                </span>
                Data Security
              </h2>
              <p className="text-gray-700">
                We implement industry-standard security measures to protect your
                data, but no method of transmission over the Internet is 100%
                secure.
              </p>
            </div>

            {/* Section 7 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  7
                </span>
                Children's Privacy
              </h2>
              <p className="text-gray-700">
                Our Services are not intended for individuals under 13. We do
                not knowingly collect data from children.
              </p>
            </div>

            {/* Section 8 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  8
                </span>
                International Transfers
              </h2>
              <p className="text-gray-700">
                If you are located outside Nigeria, your data may be processed
                in Nigeria or other countries where our servers or service
                providers are located.
              </p>
            </div>

            {/* Section 9 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  9
                </span>
                Changes to This Policy
              </h2>
              <p className="text-gray-700">
                We may update this Privacy Policy. We will notify you of
                material changes and update the "Effective Date."
              </p>
            </div>

            {/* Section 10 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  10
                </span>
                Contact
              </h2>
              <p className="text-gray-700">
                If you have any questions or concerns, please contact:
              </p>
              <p className="text-gray-700 mt-2">
                <a
                  href="mailto:hello@dimpified.com"
                  className="text-primary3 hover:underline"
                >
                  hello@dimpified.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
