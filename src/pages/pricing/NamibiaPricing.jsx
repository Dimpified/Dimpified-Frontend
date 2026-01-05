import React, { useState } from "react";
import NavbarLanding from "../LandingPages/NavbarLanding";
import { FooterWithLinks } from "../LandingPages/FooterWithLinks";
import GradientBG from "../LandingPages/images/gradient-bg.png";
import { useNavigate } from "react-router-dom";

const NamibiaPricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("Monthly");
  const [activeTab, setActiveTab] = useState("core");
  const navigate = useNavigate();

  const pricingPlans = ["Monthly", "Quaterly", "Half-Yearly", "Annually"];

  const subscriptionData = {
    Lite: ["NAD 299", "NAD 269", "NAD 239", "NAD 209"],
    Plus: ["NAD 499", "NAD 449", "NAD 399", "NAD 349"],
    Pro: ["NAD 899", "NAD 809", "NAD 719", "NAD 629"],
    Extra: ["NAD 1,499", "NAD 1,349", "NAD 1,199", "NAD 1,049"],
  };

  const transactionFees = {
    Online: {
      Lite: "4.6% + NAD 4.00",
      Plus: "4.1% + NAD 3.50",
      Pro: "3.6% + NAD 3.00",
      Extra: "3.1% + NAD 2.50",
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
      name: "₦5k ad credits/month",
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
      prices: ["NAD 299", "NAD 499", "NAD 899", "NAD 1,499"],
    },
    {
      name: "Custom Domain (Annual)",
      prices: ["NAD 499", "NAD 499", "NAD 499", "NAD 499"],
    },
    {
      name: "Multi-Language",
      prices: ["NAD 899", "NAD 899", "NAD 899", "NAD 899"],
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
        className="py-24 font-jak px-0 relative bg-cover bg-center"
        style={{ backgroundImage: `url(${GradientBG})` }}
      >
        <div className="flex flex-col h-full py-4 px-4 lg:px-24">
          <div className="flex flex-col md:flex-row items-center h-full">
            <div className="md:w-1/2 px-3 flex flex-col justify-center h-full">
              <h1 className="lg:text-5xl text-[3rem] text-dark font-normal leading-tight my-6">
                <span className="font-bold bg-gradient-to-r from-[#4f2683] via-[#9966cc] to-[#ffa600] text-transparent bg-clip-text">
                  Subscription
                </span>
              </h1>
              <p className="text-lg text-dark leading-relaxed mb-8 w-4/5">
                Choose the perfect plan for your business needs
              </p>
            </div>
          </div>
        </div>
      </section>
     
      {/* Rest of the component remains exactly the same */}
      {/* ... */}
     
      <FooterWithLinks />
    </>
  );
};

export default NamibiaPricing;