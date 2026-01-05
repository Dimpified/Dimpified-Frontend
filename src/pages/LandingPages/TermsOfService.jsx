import React from "react";

import GradientBG from "../LandingPages/images/gradient-bg.png";
import { Helmet } from "react-helmet";
import Navbar from "../../component/Blog/Navbar";
import Footer from "../../component/Blog/Footer";

const TermsOfService = () => {
  return (
    <>
     <Helmet>
        <title>Terms Of Service - Dimpified </title>
        <meta
          name="description"
          content="Dimpified Terms Of Service"
        />
        <meta property="og:title" content="Terms Of Service - Dimpified" />
        <meta
          property="og:description"
          content="Dimpified Terms Of Service "
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
                  Terms of Service
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
              Welcome to Dimpified! These Terms of Service ("Terms") govern your
              access to and use of our website, software, products, and services
              (collectively, the "Services"). By accessing or using Dimpified,
              you agree to be bound by these Terms.
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
                Account Registration
              </h2>
              <p className="text-gray-700 mb-4">To use Dimpified, you must:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Be at least 18 years old or the age of majority in your
                  jurisdiction
                </li>
                <li>Provide accurate and complete registration information</li>
                <li>Maintain the confidentiality of your login credentials</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You are responsible for all activity that occurs under your
                account.
              </p>
            </div>

            {/* Section 2 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  2
                </span>
                Subscription Plans and Payments
              </h2>
              <p className="text-gray-700 mb-4">
                Dimpified offers various subscription tiers with different
                features. By subscribing:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You authorize us to charge recurring payments</li>
                <li>
                  You agree to the pricing and billing terms presented at
                  checkout
                </li>
                <li>
                  Subscription fees are non-refundable except as outlined in our
                  Refund Policy
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  3
                </span>
                Acceptable Use
              </h2>
              <p className="text-gray-700 mb-2">You agree not to:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>
                  Use Dimpified for unlawful, harmful, or abusive purposes
                </li>
                <li>
                  Interfere with the operation or security of the platform
                </li>
                <li>Violate any applicable laws or third-party rights</li>
              </ul>
              <p className="text-gray-700 mt-4">
                We reserve the right to suspend or terminate accounts that
                violate these Terms.
              </p>
            </div>

            {/* Section 4 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  4
                </span>
                Content Ownership
              </h2>
              <p className="text-gray-700">
                You retain ownership of the content you create and upload.
                However, by using our Services, you grant us a non-exclusive,
                royalty-free license to use, host, and display your content for
                the purpose of operating the Services.
              </p>
            </div>

            {/* Section 5 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  5
                </span>
                Intellectual Property
              </h2>
              <p className="text-gray-700">
                All content and features provided by Dimpified (excluding
                user-generated content) are owned by Dimpified or our licensors
                and are protected by copyright and other laws.
              </p>
            </div>

            {/* Section 6 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  6
                </span>
                Third-Party Services
              </h2>
              <p className="text-gray-700">
                Dimpified may integrate with third-party tools (e.g., payment
                gateways). We are not responsible for the functionality,
                security, or data handling of these third-party services.
              </p>
            </div>

            {/* Section 7 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  7
                </span>
                Termination
              </h2>
              <p className="text-gray-700 mb-4">
                You may cancel your account at any time. Dimpified may suspend
                or terminate your account if:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>You breach these Terms</li>
                <li>We are required by law to do so</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Upon termination, your access to the Services will be revoked.
              </p>
            </div>

            {/* Section 8 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  8
                </span>
                Limitation of Liability
              </h2>
              <p className="text-gray-700">
                To the maximum extent permitted by law, Dimpified shall not be
                liable for any indirect, incidental, or consequential damages,
                or for any loss of profits, data, or use arising out of or
                connected with the Services.
              </p>
            </div>

            {/* Section 9 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  9
                </span>
                Modifications to the Terms
              </h2>
              <p className="text-gray-700">
                We may update these Terms from time to time. We'll notify you of
                any significant changes. Continued use of the Services
                constitutes acceptance of the updated Terms.
              </p>
            </div>

            {/* Section 10 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  10
                </span>
                Governing Law
              </h2>
              <p className="text-gray-700">
                These Terms are governed by the laws of Your Country/State,
                without regard to conflict of law principles.
              </p>
            </div>

            {/* Section 11 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  11
                </span>
                Contact
              </h2>
              <p className="text-gray-700">
                If you have any questions about these Terms, please contact us
                at:
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

export default TermsOfService;
