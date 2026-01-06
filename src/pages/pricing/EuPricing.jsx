import React, { useState } from "react";
import NavbarLanding from "../LandingPages/NavbarLanding";
import { FooterWithLinks } from "../LandingPages/FooterWithLinks";
import GradientBG from "../LandingPages/images/gradient-bg.png";
import { useNavigate } from "react-router-dom";

const EuPricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [activeTab, setActiveTab] = useState("core");
  const navigate = useNavigate();

  const pricingPlans = ["Monthly", "Quaterly", "Half-Yearly", "Annually"];

  const subscriptionData = {
    Lite: ["€ 19.99", "€ 17.99", "€ 15.99", "€ 13.99"],
    Plus: ["€ 34.99", "€ 31.49", "€ 27.99", "€ 24.49"],
    Pro: ["€ 59.99", "€ 53.99", "€ 47.99", "€ 41.99"],
    Extra: ["€ 99.99", "€ 89.99", "€ 79.99", "€ 69.99"],
  };

  const transactionFees = {
    Online: {
      Lite: "3.8% + €0.45",
      Plus: "3.4% + €0.40",
      Pro: "2.9% + €0.35",
      Extra: "2.8% + €0.25",
    },
  };
 const planFeatures = {
    Lite: [
      "Basic online booking",
      "Calendar sync",
      "Email/SMS reminders",
      "Basic customer database",
      // "Basic email templates",
      "Email support",
      "Google Calendar integration"
    ],
    Plus: [
      "Group appointments",
      "Recurring appointments",
      // "Resource allocation",
      // "Waitlists",
      "5 staff accounts",
      
      "Promotions",
      // "Gift cards",
      "Priority email + chat + Whatsapp support",
      // "QuickBooks Online integration",
      // "Zapier integration"
    ],
    Pro: [
      "VIP booking prioritization",
      "AI scheduling assistant",
      "Unlimited staff accounts",
      "Multi-location support",
      "Advanced analytics",
      "Membership programs",
      // "Loyalty programs",
      "Dedicated account manager",
      // "Xero integration",
      // "API access",
      "Automated invoicing",
      // "Tax automation"
    ],
    Extra: [
      "Full CRM + segmentation",
      "Custom workflow automation",
      // "₦5k ad credits/month",
      "24/7 priority support + onboarding",
      "Premium integrations (Mailchimp, Meta Ads, Google Ads)",
      "Subscription billing",
      "Dynamic pricing",
      "Inventory management",
      "Low-stock alerts"
    ],
  };

  const coreFeatures = [
    {
      category: "Core Scheduling",
      items: [
        {
          name: "Basic online booking",
          plans: { Lite: true, Plus: true, Pro: true, Extra: true },
        },
        {
          name: "Group appointments",
          plans: { Lite: false, Plus: true, Pro: true, Extra: true },
        },
        {
          name: "Recurring appointments",
          plans: { Lite: false, Plus: true, Pro: true, Extra: true },
        },
        {
          name: "VIP booking prioritization",
          plans: { Lite: false, Plus: false, Pro: true, Extra: true },
        },
        {
          name: "Calendar sync",
          plans: { Lite: true, Plus: true, Pro: true, Extra: true },
        },
        // {
        //   name: "Resource allocation",
        //   plans: { Lite: false, Plus: true, Pro: true, Extra: true },
        // },
        // {
        //   name: "Waitlists",
        //   plans: { Lite: false, Plus: true, Pro: true, Extra: true },
        // },
        {
          name: "AI scheduling assistant",
          plans: { Lite: false, Plus: false, Pro: true, Extra: true },
        },
        {
          name: "Email/SMS reminders",
          plans: { Lite: true, Plus: true, Pro: true, Extra: true },
        },
        {
          name: "Staff accounts",
          plans: {
            Lite: "None",
            Plus: "5",
            Pro: "Unlimited",
            Extra: "Unlimited",
          },
        },
      ],
    },
  ];

  const paymentFeatures = [
    {
      category: "Payments & POS",
      items: [
        {
          name: "Online",
          subitems: [
            "Accept online payments",
            "POS integration",
            "Automated invoicing",
            "Subscription billing",
          ],
          plans: {
            Lite: [true, false, false, false],
            Plus: [true, true, false, false],
            Pro: [true, true, true, false],
            Extra: [true, true, true, true],
          },
        },
        {
          name: "Offline",
          subitems: [
            "Manual invoice generator",
            "Split payments",
            "Tax automation",
            "Dynamic pricing",
          ],
          plans: {
            Lite: [true, false, false, false],
            Plus: [true, true, false, false],
            Pro: [true, true, true, false],
            Extra: [true, true, true, true],
          },
        },
      ],
    },
  ];

  const businessTools = [
    {
      name: "Basic customer database",
      plans: { Lite: true, Plus: true, Pro: true, Extra: true },
    },
    {
      name: "Inventory management",
      plans: { Lite: false, Plus: true, Pro: true, Extra: true },
    },
    {
      name: "Multi-location support",
      plans: { Lite: false, Plus: false, Pro: true, Extra: true },
    },
    {
      name: "Custom workflow automation",
      plans: { Lite: false, Plus: false, Pro: false, Extra: true },
    },
    {
      name: "Low-stock alerts",
      plans: { Lite: false, Plus: true, Pro: true, Extra: true },
    },
    {
      name: "Advanced analytics",
      plans: { Lite: false, Plus: false, Pro: true, Extra: true },
    },
  ];

  const marketingFeatures = [
    {
      name: "Basic email templates",
      plans: { Lite: true, Plus: true, Pro: true, Extra: true },
    },
    {
      name: "Review generation",
      plans: { Lite: false, Plus: true, Pro: true, Extra: true },
    },
    {
      name: "Membership programs",
      plans: { Lite: false, Plus: false, Pro: true, Extra: true },
    },
    {
      name: "Full CRM + segmentation",
      plans: { Lite: false, Plus: false, Pro: false, Extra: true },
    },
    {
      name: "Promotions",
      plans: { Lite: false, Plus: true, Pro: true, Extra: true },
    },
    {
      name: "Gift cards",
      plans: { Lite: false, Plus: true, Pro: true, Extra: true },
    },
    {
      name: "Loyalty programs",
      plans: { Lite: false, Plus: false, Pro: true, Extra: true },
    },
    {
      name: "€100 ad credits/month",
      plans: { Lite: false, Plus: false, Pro: false, Extra: true },
    },
  ];

  const integrations = [
    {
      name: "Google Calendar",
      plans: { Lite: true, Plus: true, Pro: true, Extra: true },
    },
    {
      name: "QuickBooks Online",
      plans: { Lite: false, Plus: true, Pro: true, Extra: true },
    },
    {
      name: "Xero",
      plans: { Lite: false, Plus: false, Pro: true, Extra: true },
    },
    {
      name: "Premium: Mailchimp, Meta Ads, Google Ads",
      plans: { Lite: false, Plus: false, Pro: false, Extra: true },
    },
    {
      name: "Zapier",
      plans: { Lite: false, Plus: true, Pro: true, Extra: true },
    },
    {
      name: "API access",
      plans: { Lite: false, Plus: false, Pro: true, Extra: true },
    },
  ];

  const supportOptions = [
    {
      name: "Email support",
      plans: { Lite: true, Plus: true, Pro: true, Extra: true },
    },
    {
      name: "Priority email + chat + Whatsapp",
      plans: { Lite: false, Plus: true, Pro: true, Extra: true },
    },
    {
      name: "Dedicated account manager",
      plans: { Lite: false, Plus: false, Pro: true, Extra: true },
    },
    {
      name: "24/7 priority + onboarding",
      plans: { Lite: false, Plus: false, Pro: false, Extra: true },
    },
  ];

  const addOns = [
    {
      name: "AI Analytics Pack",
      prices: ["€ 19.99", "€ 34.99", "€ 59.99", "€ 99.99"],
    },
    {
      name: "Custom Domain (Annual)",
      prices: ["€ 34.99", "€ 34.99", "€ 34.99", "€ 34.99"],
    },
    {
      name: "Multi-Language",
      prices: ["€ 59.99", "€ 59.99", "€ 59.99", "€ 59.99"],
    },
  ];

  const loanOptions = [
    {
      name: "Loan Offer",
      values: ["Up to €500", "Up to €1,500", "Up to €5,000", "Up to €25,000"],
    },
    {
      name: "Minimum Monthly Volume",
      values: ["€1,500+", "€2,500+", "€5,000+", "€15,000+"],
    },
    {
      name: "Interest Rate",
      values: ["7% Monthly", "5% Monthly", "4% Monthly", "3% Monthly"],
    },
    {
      name: "Repayment Terms",
      values: ["2 months", "2 months", "2 months", "2 months"],
    },
    {
      name: "Flexible Repayments",
      values: [
        "Fixed monthly amount or percentage of daily transactions",
        "Fixed monthly amount or percentage of daily transactions",
        "Fixed monthly amount or percentage of daily transactions",
        "Fixed monthly amount or percentage of daily transactions",
      ],
    },
    {
      name: "Minimum Time on Platform",
      values: ["3 months", "4 months", "5 months", "6 months"],
    },
  ];

  const planDescriptions = {
    Lite: "Ideal for freelancers/solo merchants who need scheduling and a web presence.",
    Plus: "Best for small merchants with physical stores and teams.",
    Pro: "Tailored for businesses needing advanced payments and financial control.",
    Extra: "For growth-focused merchants who want CRM and marketing automation.",
  };

  const packageNames = {
    Lite: "eCommerce & Scheduling Package",
    Plus: "Store Management & Team Management Package",
    Pro: "Payments & Financial Management Package",
    Extra: "Marketing & Customer Management Package",
  };

  const renderCheckmark = (hasFeature) => {
    return hasFeature ? (
      <svg
        className="w-5 h-5 text-green-500"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ) : (
      <svg
        className="w-5 h-5 text-gray-400"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    );
  };

  return (
    <>
      <NavbarLanding />
      
      <section
        className="py-24 font-jak px-0 relative bg-cover  bg-center"
        style={{ backgroundImage: `url(${GradientBG})` }}
      >
        <div className="flex flex-col h-full  py-4 px-4 lg:px-24">
          <div className="flex flex-col md:flex-row items-center h-full">
            <div className="md:w-1/2 px-3 flex flex-col justify-center h-full">
              <h1 className="lg:text-5xl text-[3rem] text-dark font-normal leading-tight my-6">
                <span className="font-bold bg-gradient-to-r from-[#4f2683]  via-[#9966cc] to-[#ffa600] text-transparent bg-clip-text">
                  Subscription
                </span>
              </h1>
              <p className="text-lg  text-dark leading-relaxed mb-8 w-4/5">
                Choose the perfect plan for your business needs
              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Plan selector */}
        <div className="flex md:justify-end justify-center mb-16">
          <div className="inline-flex rounded-md ">
            {pricingPlans.map((plan) => (
              <button
                key={plan}
                onClick={() => setSelectedPlan(plan)}
                className={`px-4 py-2 text-sm font-medium ${
                  selectedPlan === plan
                    ? "bg-primary3 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } ${plan === pricingPlans[0] ? "rounded-t-lg" : ""} ${
                  plan === pricingPlans[pricingPlans.length - 1]
                    ? "rounded-r-lg"
                    : ""
                } border border-gray-300`}
              >
                {plan}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12 lg:px-0 px-3">
          {["Lite", "Plus", "Pro", "Extra"].map((plan) => {
            const planIndex = pricingPlans.indexOf(selectedPlan);
            return (
              <div
                key={plan}
                className={`bg-white rounded-lg  overflow-hidden ${
                  plan === "Pro"
                    ? "border-2 border-sec10 transform scale-105"
                    : "border border-gray-200"
                }`}
              >
                {plan === "Pro" && (
                  <div className="bg-sec10 text-white text-center py-1 text-sm font-medium">
                    MOST POPULAR
                  </div>
                )}
                <div className="px-6 py-8">
                  <h3 className="text-2xl font-bold text-gray-900">{plan}</h3>
                  <p className="mt-2 text-sm text-gray-600">
                    {packageNames[plan]}
                  </p>
                  <p className="mt-4 text-sm text-gray-500">
                    {planDescriptions[plan]}
                  </p>
                  <div className="mt-6">
                    <span className="text-4xl font-extrabold text-gray-900">
                      {subscriptionData[plan][planIndex]}
                    </span>
                    <span className="text-base font-medium text-gray-500">
                      /month
                    </span>
                  </div>
                  <button
                    className={`mt-8 w-full ${
                      plan === "Pro"
                        ? "bg-sec10 hover:bg-primary3"
                        : "bg-primary3 hover:bg-sec10"
                    } border border-transparent rounded-md py-3 px-4 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      plan === "Pro"
                        ? "focus:ring-primary3"
                        : "focus:ring-sec10"
                    }`}
                    onClick={() => navigate("/auth/personal-information")}
                  >
                    Sign Up Now
                  </button>
                </div>
                <div className="border-t border-gray-200 px-6 py-8 bg-gray-50">
                  <h4 className="text-sm font-medium text-gray-900">
                    Transaction Fees
                  </h4>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-start">
                      <span className="text-sm text-gray-600">Online:</span>
                      <span className="ml-auto text-sm font-medium text-gray-900">
                        {transactionFees.Online[plan]}
                      </span>
                    </li>
                    
                  </ul>
                </div>
                <div className="border-t border-gray-200 px-6 py-8">
                  <h4 className="text-sm font-medium text-gray-900 mb-4">
                    Features
                  </h4>
                  {plan !== "Lite" && (
                    <div className="pb-4 border-gray-200">
                      <h4 className="text-sm text-gray-500">
                        Everything in{" "}
                        {plan === "Plus"
                          ? "Lite"
                          : plan === "Pro"
                          ? "Lite and Plus"
                          : "Lite, Plus and Pro"}{" "}
                        plan and:
                      </h4>
                    </div>
                  )}
                  <ul className="space-y-3">
                    {planFeatures[plan].map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg
                          className="h-5 w-5 text-green-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Feature tabs */}
        <div className="mb-8">
          <h4 className="text-lg font-semibold py-4">Compare Plans and Features</h4>
          <div className="relative">
            {/* Horizontal scroll container for mobile */}
            <div className="overflow-x-auto scrollbar-hide">
              <nav className="flex space-x-8 border-b border-gray-200">
                {[
                  { id: "core", name: "Core Features" },
                  { id: "business", name: "Business Tools" },
                  { id: "marketing", name: "Marketing" },
                  { id: "integrations", name: "Integrations" },
                  { id: "support", name: "Support" },
                  { id: "addons", name: "Add-Ons" },
                  // { id: "loans", name: "Automated Loans" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-indigo-500 text-primary3"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {/* Shorter labels on small screens if needed */}
                    <span className="hidden sm:inline">{tab.name}</span>
                    <span className="sm:hidden">
                      {tab.name} {/* Show just first word on mobile */}
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Optional fade effect on sides for mobile */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-white"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-6 bg-gradient-to-l from-white"></div>
          </div>
        </div>

        {/* Feature tables */}
        <div className="bg-white  overflow-hidden sm:rounded-lg mb-12">
          {activeTab === "core" && (
            <div>
              {coreFeatures.map((section) => (
                <div
                  key={section.category}
                  className="border-b border-gray-200"
                >
                  <h3 className="px-6 py-4 bg-gray-50 text-lg font-medium text-gray-900">
                    {section.category}
                  </h3>
                  <div className="px-6 py-4">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Feature
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Lite
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Plus
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Pro
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Extra
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {section.items.map((item, idx) => (
                            <tr key={idx}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/3">
                                {item.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                {typeof item.plans.Lite === "boolean"
                                  ? renderCheckmark(item.plans.Lite)
                                  : item.plans.Lite}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                {typeof item.plans.Plus === "boolean"
                                  ? renderCheckmark(item.plans.Plus)
                                  : item.plans.Plus}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                {typeof item.plans.Pro === "boolean"
                                  ? renderCheckmark(item.plans.Pro)
                                  : item.plans.Pro}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-center">
                                {typeof item.plans.Extra === "boolean"
                                  ? renderCheckmark(item.plans.Extra)
                                  : item.plans.Extra}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
              {paymentFeatures.map((section) => (
                <div
                  key={section.category}
                  className="border-b border-gray-200"
                >
                  <h3 className="px-6 py-4 bg-gray-50 text-lg font-medium text-gray-900">
                    {section.category}
                  </h3>
                  <div className="px-6 py-4">
                    {section.items.map((item, idx) => (
                      <div key={idx} className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">
                          {item.name}
                        </h4>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Feature
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Lite
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Plus
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Pro
                                </th>
                                <th
                                  scope="col"
                                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                  Extra
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {item.subitems.map((subitem, subidx) => (
                                <tr key={subidx}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/3">
                                    {subitem}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {renderCheckmark(item.plans.Lite[subidx])}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {renderCheckmark(item.plans.Plus[subidx])}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {renderCheckmark(item.plans.Pro[subidx])}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-center">
                                    {renderCheckmark(item.plans.Extra[subidx])}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "business" && (
            <div className="border-b border-gray-200">
              <h3 className="px-6 py-4 bg-gray-50 text-lg font-medium text-gray-900">
                Business Tools
              </h3>
              <div className="px-6 py-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Feature
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Lite
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Plus
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Pro
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Extra
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {businessTools.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/3">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Lite)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Plus)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Pro)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Extra)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "marketing" && (
            <div className="border-b border-gray-200">
              <h3 className="px-6 py-4 bg-gray-50 text-lg font-medium text-gray-900">
                Marketing & Growth
              </h3>
              <div className="px-6 py-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Feature
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Lite
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Plus
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Pro
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Extra
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {marketingFeatures.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/3">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Lite)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Plus)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Pro)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Extra)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "integrations" && (
            <div className="border-b border-gray-200">
              <h3 className="px-6 py-4 bg-gray-50 text-lg font-medium text-gray-900">
                Integrations
              </h3>
              <div className="px-6 py-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Feature
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Lite
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Plus
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Pro
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Extra
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {integrations.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/3">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Lite)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Plus)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Pro)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Extra)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "support" && (
            <div className="border-b border-gray-200">
              <h3 className="px-6 py-4 bg-gray-50 text-lg font-medium text-gray-900">
                Support
              </h3>
              <div className="px-6 py-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Feature
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Lite
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Plus
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Pro
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Extra
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {supportOptions.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 w-1/3">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Lite)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Plus)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Pro)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-center">
                            {renderCheckmark(item.plans.Extra)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "addons" && (
            <div className="border-b border-gray-200">
              <h3 className="px-6 py-4 bg-gray-50 text-lg font-medium text-gray-900">
                Optional Add-Ons
              </h3>
              <div className="px-6 py-4">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Add-On
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Lite
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Plus
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Pro
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Extra
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {addOns.map((item, idx) => (
                        <tr key={idx}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {item.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {item.prices[0]}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {item.prices[1]}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {item.prices[2]}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                            {item.prices[3]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>* Offline features require additional hardware</p>
        </div>
      </div>
    
      <FooterWithLinks />
    </>
  );
};

export default EuPricing;