import React, { useState } from "react";
import NavbarLanding from "../LandingPages/NavbarLanding";
import { FooterWithLinks } from "../LandingPages/FooterWithLinks";
import GradientBG from "../LandingPages/images/gradient-bg.png";
import { Helmet } from "react-helmet";
const RefundPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Refund Policy - Dimpified </title>
        <meta name="description" content="Dimpified Refund Policy" />
        <meta property="og:title" content="Refund Policy - Dimpified" />
        <meta property="og:description" content="Dimpified Refund Policy " />
      </Helmet>
      <NavbarLanding />

      <section
        className="py-24 font-jak px-0 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${GradientBG})` }}
      >
        <div className="flex flex-col h-full py-4 px-4 lg:px-24">
          <div className="flex flex-col md:flex-row items-center h-full">
            <div className="md:w-1/2 px-3 flex flex-col justify-center h-full">
              <h1 className="lg:text-5xl text-[3rem] text-dark font-normal leading-tight my-6">
                <span className="font-bold bg-gradient-to-r from-[#4f2683] via-[#9966cc] to-[#ffa600] text-transparent bg-clip-text">
                  Refund Policy
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
        <div className="bg-white  rounded-lg overflow-hidden">
          {/* Introduction */}
          <div className="p-6 sm:p-8 border-b border-gray-200">
            <p className="text-gray-700 leading-relaxed">
              At Dimpified, customer satisfaction is our top priority. We offer
              powerful tools and services to help businesses grow. If you are
              not fully satisfied with your subscription or purchase, please
              review our refund policy below.
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
                Subscription Refunds
              </h2>
              <p className="text-gray-700 mb-4">
                Dimpified offers monthly and annual subscription plans. All
                users are encouraged to fully explore our platform during the
                free trial period, where applicable.
              </p>

              <div className="ml-11">
                <h3 className="font-medium text-gray-800 mt-4 mb-2">
                  Monthly Subscriptions:
                </h3>
                <p className="text-gray-700 pl-4 border-l-2 border-gray-300 mb-4">
                  Refunds are not provided for monthly subscriptions once
                  payment is processed. You may cancel anytime to avoid future
                  billing.
                </p>

                <h3 className="font-medium text-gray-800 mt-4 mb-2">
                  Annual Subscriptions:
                </h3>
                <p className="text-gray-700 pl-4 border-l-2 border-gray-300">
                  If you cancel within 14 days of your initial annual purchase,
                  you are eligible for a full refund. After 14 days, no refunds
                  will be issued for annual plans, but your subscription will
                  remain active until the end of the billing cycle.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  2
                </span>
                Add-on Services & One-Time Purchases
              </h2>
              <p className="text-gray-700">
                Payments made for services such as domain purchases, templates,
                digital marketing services, or custom development are
                non-refundable unless otherwise stated in a specific service
                agreement.
              </p>
            </div>

            {/* Section 3 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  3
                </span>
                Refund Request Process
              </h2>
              <p className="text-gray-700 mb-4">
                To request a refund, please email{" "}
                <a
                  href="mailto:hellodimpified.com"
                  className="text-primary3 hover:underline"
                >
                  hello@dimpified.com
                </a>{" "}
                with the following information:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Full Name</li>
                <li>Registered Email Address</li>
                <li>Order ID or Transaction Reference</li>
                <li>Reason for Refund Request</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Our support team will review your request and respond within 5
                business days.
              </p>
            </div>

            {/* Section 4 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  4
                </span>
                Exceptions
              </h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to decline refund requests that:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Violate our Terms of Service</li>
                <li>
                  Stem from issues outside of Dimpified's control (e.g.,
                  third-party service downtime)
                </li>
                <li>
                  Are made more than 14 days after the initial payment (for
                  annual plans)
                </li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  5
                </span>
                Chargebacks
              </h2>
              <p className="text-gray-700">
                If a chargeback is initiated without first contacting us, your
                account may be suspended or terminated pending resolution. We
                encourage open communication to resolve any billing issues
                amicably.
              </p>
            </div>

            {/* Section 6 */}
            <div className="p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="bg-purple-100 text-primary3 rounded-full w-8 h-8 flex items-center justify-center mr-3">
                  6
                </span>
                Modifications
              </h2>
              <p className="text-gray-700">
                Dimpified reserves the right to modify this refund policy at any
                time. Any changes will be posted on this page with an updated
                effective date.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 sm:px-8 py-4 text-center text-gray-500 text-sm">
            <p>
              If you have any questions about our Refund Policy, please contact
              us at{" "}
              <a
                href="mailto:hello@dimpified.com"
                className="text-primary3 hover:underline"
              >
                hello@dimpified.com
              </a>
            </p>
          </div>
        </div>
      </main>

      <FooterWithLinks />
    </>
  );
};

export default RefundPolicy;
