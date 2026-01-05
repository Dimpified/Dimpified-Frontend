import React, { useEffect, useState } from "react";

import NavbarLanding from "./NavbarLanding";
import { FooterWithLinks } from "./FooterWithLinks";
import FloatingContactButton from "./FloatingContact";

import Select from "react-select";
import { motion } from "motion/react";

const skillCategories = [
  {
    title: "Personal Care Services",
    iconClass: "icon-ca",
    skills: [
      "Hair Salon",
      "Barber Shop",
      "Nail Salon",
      "Massage Therapy",
      "Spa and Wellness Center",
      "Skincare Clinic",
      "Makeup Artist Services",
      "Personal Training and Fitness Coaching",
      "Yoga and Pilates Studio",
      "Weight Loss and Nutrition Counseling",
      "Chiropractic Services",
      "Mental Health Counseling",
      "Tattoo and Piercing Studio",
      "Aromatherapy Services",
      "Dental Hygiene Services",
      "Reflexology Services",
      "Life Coaching",
      "Eyelash Extension Services",
      "Cosmetic Dentistry",
      "Personal Stylist and Image Consulting",
    ],
  },
  {
    title: "Trade Services",
    iconClass: "icon-government",
    skills: [
      "Plumbing Services",
      "Electrical Services",
      "Carpentry Services",
      "Roofing Services",
      "HVAC Services",
      "Landscaping and Lawn Care",
      "Painting Services",
      "Masonry Services",
      "Flooring Installation",
      "Auto Repair",
      "Welding and Metal Fabrication",
      "Appliance Repair",
      "Locksmith Services",
      "Pest Control Services",
      "Waste Management",
      "Moving Services",
      "Handyman Services",
      "Cleaning Services",
    ],
  },
  {
    title: "Creative Services",
    iconClass: "icon-idea",
    skills: [
      "Graphic Design",
      "Fashion Design",
      "Web Design",
      "Branding Services",
      "UX/UI Design",
      "Photography",
      "Videography",
      "Animation & Illustration",
      "SEO Consulting",
      "Copywriting",
      "Content Creation",
      "Social Media Management",
      "Interior Design",
      "Music Production",
      "Voiceover Services",
      "Podcast Production",
    ],
  },
  {
    title: "Event Services",
    iconClass: "icon-fu",
    skills: [
      "Event Planning",
      "Wedding Planning",
      "Catering Services",
      "DJ Services",
      "Live Band Services",
      "Photography Services",
      "Videography Services",
      "Florist Services",
      "Event Rentals",
      "Lighting and Sound Services",
      "Event Coordination",
      "Bartending Services",
      "Security Services",
      "Decoration Services",
    ],
  },
  {
    title: "Educational Services",
    iconClass: "icon-idea",
    skills: [
      "Tutoring",
      "Test Preparation",
      "Language Lessons",
      "Music Lessons",
      "Art Lessons",
      "Dance Lessons",
      "Cooking Classes",
      "Coding Bootcamps",
      "Corporate Training",
      "Public Speaking Coaching",
      "STEM Education",
      "College Admissions Counseling",
      "Career Coaching",
      "Online Courses",
    ],
  },
  {
    title: "Technology Services",
    iconClass: "icon-fu",
    skills: [
      "Software Development",
      "IT Support",
      "Cloud Computing",
      "Data Analytics",
      "Cybersecurity Services",
      "Database Management",
      "Web Development",
      "Mobile App Development",
      "Digital Marketing",
      "Technical Writing",
      "ERP Solutions",
      "AI and Machine Learning",
    ],
  },
];

const services = [
  { value: "barber-shop", label: "Barbers", link: "/barbers" },
  {
    value: "makeup-artist",
    label: "Makeup Artists",
    link: "/makeup-artists",
  },
  {
    value: "hair-salon",
    label: "Hair Stylists / Hair Dressers",
    link: "/hairdressers",
  },
  {
    value: "nail-salon",
    label: "Nail Salon",
    link: "/nails",
  },
  {
    value: "massage-therapy",
    label: "Massage Therapy",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "spa-wellness",
    label: "Spa and Wellness Center",
    link: "/spa",
  },
  {
    value: "skincare-clinic",
    label: "Skincare Clinic",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "personal-training",
    label: "Personal Training and Fitness Coaching",
    link: "/gym",
  },
  {
    value: "yoga-pilates",
    label: "Yoga and Pilates Studio",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "weight-loss",
    label: "Weight Loss and Nutrition Counseling",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "chiropractic-services",
    label: "Chiropractic Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "mental-health",
    label: "Mental Health Counseling",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "tattoo-piercing",
    label: "Tattoo and Piercing Studio",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "aromatherapy",
    label: "Aromatherapy Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "dental-hygiene",
    label: "Dental Hygiene Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "reflexology",
    label: "Reflexology Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "life-coaching",
    label: "Life Coaching",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "eyelash-extension",
    label: "Eyelash Extension Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "cosmetic-dentistry",
    label: "Cosmetic Dentistry",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "personal-stylist",
    label: "Personal Stylist and Image Consulting",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "plumbing-services",
    label: "Plumbing Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "electrical-services",
    label: "Electrical Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "carpentry-services",
    label: "Carpentry Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "roofing-services",
    label: "Roofing Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "hvac-services",
    label: "HVAC Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "landscaping-lawn",
    label: "Landscaping and Lawn Care",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "painting-services",
    label: "Painting Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "masonry-services",
    label: "Masonry Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "flooring-installation",
    label: "Flooring Installation",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "auto-repair",
    label: "Auto Repair",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "welding-fabrication",
    label: "Welding and Metal Fabrication",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "appliance-repair",
    label: "Appliance Repair",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "locksmith-services",
    label: "Locksmith Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "pest-control",
    label: "Pest Control Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "waste-management",
    label: "Waste Management",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "moving-services",
    label: "Moving Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "handyman-services",
    label: "Handyman Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "cleaning-services",
    label: "Cleaning Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },

  {
    value: "graphic-design",
    label: "Graphic Design",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "fashion-design",
    label: "Fashion Design",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "web-design",
    label: "Web Design",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "branding-services",
    label: "Branding Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "ux-ui-design",
    label: "UX/UI Design",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "photography",
    label: "Photography",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "videography",
    label: "Videography",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "animation-illustration",
    label: "Animation & Illustration",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "seo-consulting",
    label: "SEO Consulting",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "copywriting",
    label: "Copywriting",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "content-creation",
    label: "Content Creation",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "social-media-management",
    label: "Social Media Management",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "interior-design",
    label: "Interior Design",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "music-production",
    label: "Music Production",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "voiceover-services",
    label: "Voiceover Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "podcast-production",
    label: "Podcast Production",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },

  // Event Services
  {
    value: "event-planning",
    label: "Event Planning",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "wedding-planning",
    label: "Wedding Planning",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "catering-services",
    label: "Catering Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "dj-services",
    label: "DJ Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "live-band-services",
    label: "Live Band Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "photography-services",
    label: "Photography Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "videography-services",
    label: "Videography Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "florist-services",
    label: "Florist Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "event-rentals",
    label: "Event Rentals",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "lighting-and-sound-services",
    label: "Lighting and Sound Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "event-coordination",
    label: "Event Coordination",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "bartending-services",
    label: "Bartending Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "security-services",
    label: "Security Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "decoration-services",
    label: "Decoration Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },

  // Educational Services
  {
    value: "tutoring",
    label: "Tutoring",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "test-preparation",
    label: "Test Preparation",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "language-lessons",
    label: "Language Lessons",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "music-lessons",
    label: "Music Lessons",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "art-lessons",
    label: "Art Lessons",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "dance-lessons",
    label: "Dance Lessons",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "cooking-classes",
    label: "Cooking Classes",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "coding-bootcamps",
    label: "Coding Bootcamps",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "corporate-training",
    label: "Corporate Training",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "public-speaking-coaching",
    label: "Public Speaking Coaching",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "stem-education",
    label: "STEM Education",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "college-admissions-counseling",
    label: "College Admissions Counseling",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "career-coaching",
    label: "Career Coaching",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "online-courses",
    label: "Online Courses",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },

  // Technology Services
  {
    value: "software-development",
    label: "Software Development",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "it-support",
    label: "IT Support",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "cloud-computing",
    label: "Cloud Computing",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "data-analytics",
    label: "Data Analytics",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "cybersecurity-services",
    label: "Cybersecurity Services",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "database-management",
    label: "Database Management",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "web-development",
    label: "Web Development",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "mobile-app-development",
    label: "Mobile App Development",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "digital-marketing",
    label: "Digital Marketing",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "technical-writing",
    label: "Technical Writing",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "erp-solutions",
    label: "ERP Solutions",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
  {
    value: "ai-and-machine-learning",
    label: "AI and Machine Learning",
    link: "https://forms.office.com/r/Q5hX3zDdji",
  },
];

const ServiceSelector = () => {
  const [selectedService, setSelectedService] = useState(null);

  const handleServiceChange = (selectedOption) => {
    setSelectedService(selectedOption);
  };

  const handleContinue = () => {
    if (selectedService) {
      window.location.href = selectedService.link;
    } else {
      alert("Please select a service before continuing.");
    }
  };

  const [viewMore, setViewMore] = useState(
    Array(skillCategories.length).fill(false)
  );

  const toggleViewMore = (index) => {
    setViewMore((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      {" "}
      <div className="font-sen">
        <NavbarLanding />
        <FloatingContactButton />
        <section
          className="bg-cover bg-center relative text-white"
          style={{
            backgroundImage: `url("https://gfa-tech.com/dimp-template-images/barber/barber-bg2.jpg")`,
          }}
        >
          <div className="bg-gradient-to-r h-full from-[#4f2683]  via-[#9966cc] to-[#ffa600] opacity-85 shadow-lg">
            <div className="px-4 lg:px-32 md:px-24 md:pt-40 md:pb-24 pt-24 pb-20 ">
              <h1 className="md:text-4xl text-3xl tracking-tight font-pry">
                What type of service or skill do you offer?
              </h1>
            </div>
          </div>
        </section>
        <FloatingContactButton />

        <div className="flex flex-wrap items-center justify-between gap-4 py-8 px-6 mt-[-3rem] lg:mx-28 rounded-xl bg-white shadow-lg relative">
          {/* Search Section */}
          <div className="w-full lg:w-8/12">
            <label className="uppercase text-sm font-bold text-gray-600 mb-2 block">
              Search or select services below:
            </label>
            <Select
              options={services}
              onChange={handleServiceChange}
              placeholder="Type to search for or select your service..."
              className="w-full"
              classNamePrefix="react-select"
              styles={{
                control: (base) => ({
                  ...base,
                  borderColor: "#d1d5db", // Tailwind gray-300
                  borderRadius: "0.375rem", // Tailwind rounded-md
                  padding: "0.125rem",
                  boxShadow: "none",
                  "&:hover": {
                    borderColor: "#9ca3af", // Tailwind gray-400
                  },
                }),
                menu: (base) => ({
                  ...base,
                  zIndex: 50,
                }),
              }}
            />
          </div>

          {/* Continue Button */}
          <div className="w-full lg:w-auto flex justify-end">
            <button
              onClick={handleContinue}
              className="bg-primary3 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow hover:bg-sec10 transition-all"
            >
              Continue
            </button>
          </div>
        </div>

        <section className="ts-event-outcome py-12">
          <div className="flex flex-col h-full lg:px-24 px-4">
            <h1 className="text-2xl font-bold mb-4">
              Explore our service categories
            </h1>
            <div className="flex flex-wrap ">
              {skillCategories.map((category, index) => (
                <div
                  key={index}
                  className="w-full md:w-1/2 lg:w-1/4 p-4 transition-all duration-300"
                >
                  <div className="single-intro-text bg-white shadow-lg rounded-lg p-6 mb-6">
                    <i
                      className={`icon ${category.iconClass} mb-4 text-2xl`}
                    ></i>
                    <h6 className="text-lg font-semibold mb-4">
                      {category.title}
                    </h6>
                    {category.skills
                      .slice(0, viewMore[index] ? category.skills.length : 4)
                      .map((skill, i) => (
                        <p key={i} className="text-gray-600">
                          {skill}
                        </p>
                      ))}
                    <button
                      className="mt-4 text-yellow-500 font-bold text-[12px]"
                      onClick={() => toggleViewMore(index)}
                    >
                      {viewMore[index] ? "VIEW LESS" : "VIEW MORE"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <FooterWithLinks />
      </div>
    </motion.div>
  );
};

export default ServiceSelector;
