import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  BsPeople,
  BsWindow,
  BsCashStack,
  BsBarChartLine,
  BsShieldCheck,
  BsCardChecklist,
  BsGraphUp,
  BsCheckCircle,
  BsGlobe,
  BsBuilding,
  BsArrowRight,
  BsStarFill,
  BsLayers,
  BsGrid,
  BsBoxSeam,
  BsCalendar2Check,
  BsCashCoin,
  BsBarChart,
  BsCreditCard,
  BsClock,
  BsRocket,
  BsLightning,
  BsAward,
  BsList,
  BsX,
} from "react-icons/bs";
import {
  FaCheck,
  FaArrowRight,
  FaRegHandshake,
  FaChartLine,
  FaUsers,
  FaMobileAlt,
} from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import LazyLoad from "react-lazyload";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

// Import dashboard image from DimpLanding
import Dashboards from "./images/dimp-dashboard.png";
// Import logo and team images (replace with actual imports)
import DimpifiedLogo from "./images/dimp-blue.png";
import DIMPWhiteLogo from "./images/DIMPwhitelogo.png";
import CEOImage from "./images/debo.jpg";
import CTOImage from "./images/samuel.jpg";
import COOImage from "./images/azeez.jpeg";
import CFOImage from "./images/george.jpg";
import Hero from "./images/hero-bg.jpg";

const InvestorLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    country: "",
    investmentAmount: "",
    investorType: "",
    netWorth: "",
  });

  useEffect(() => {
    setIsVisible(true);
    document.body.className = "bg-white";
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(
      "Thank you for your interest! Our investment team will contact you within 24 hours."
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const marketData = [
    {
      metric: "$12.7B",
      label: "African E-commerce Market Size 2024",
      description: "Projected to reach $46B by 2027",
    },
    {
      metric: "72M+",
      label: "African SMEs",
      description: "Majority are service-based businesses",
    },
    {
      metric: "45%",
      label: "Digital Payment Growth",
      description: "Year-over-year growth in Africa",
    },
    {
      metric: "8.2%",
      label: "GDP Contribution",
      description: "From SMEs in Nigeria alone",
    },
  ];

  const tractionMetrics = [
    {
      number: "500,000+",
      label: "Existing Users",
      description: "Across parent company ecosystem",
      icon: <BsPeople size={28} />,
    },
    {
      number: "15,000+",
      label: "Businesses Served",
      description: "Service providers on our platform",
      icon: <BsBuilding size={28} />,
    },
    {
      number: "$2.3M+",
      label: "Annual Processing",
      description: "Payment volume processed",
      icon: <BsCashStack size={28} />,
    },
    {
      number: "89%",
      label: "Retention Rate",
      description: "Month-over-month customer retention",
      icon: <BsGraphUp size={28} />,
    },
  ];

  const competitiveAdvantages = [
    {
      title: "First-Mover Advantage",
      description:
        "First comprehensive platform specifically built for African service businesses with integrated payments, website builder, and booking systems.",
      icon: <BsRocket className="text-[#ff8201]" size={32} />,
    },
    {
      title: "Proven Business Model",
      description:
        "Revenue streams validated through parent company: subscription fees, transaction fees, premium features, and merchant financing.",
      icon: <BsBarChartLine className="text-[#4f2683]" size={32} />,
    },
    {
      title: "Scalable Technology",
      description:
        "Built on modern tech stack with API-first architecture, ready for rapid scaling across multiple African markets.",
      icon: <BsLightning className="text-[#4f2683]" size={32} />,
    },
    {
      title: "Strong Partnerships",
      description:
        "Established relationships with major banks, payment processors, and telecom providers across Nigeria.",
      icon: <FaRegHandshake className="text-[#ff8201]" size={32} />,
    },
  ];

  const financialProjections = [
    { year: "2024", revenue: "$1.2M", users: "75,000", businesses: "25,000" },
    { year: "2025", revenue: "$4.8M", users: "300,000", businesses: "85,000" },
    {
      year: "2026",
      revenue: "$12.5M",
      users: "750,000",
      businesses: "200,000",
    },
    { year: "2027", revenue: "$28.3M", users: "1.5M", businesses: "400,000" },
  ];

  const teamMembers = [
    {
      name: "Adebola Omololu",
      background: "Group CEO and Co-Founder",
      //   expertise: "Product Strategy & Growth",
      image: CEOImage,
    },
    {
      name: "Samuel Makinde",
      background: "CEO, Dimpified",

      image: CTOImage,
    },
    {
      name: "Abdul-Azeez Adeleye",
      background: "Lead, Development & Design",

      image: COOImage,
    },
    {
      name: "George Martins",
      background: "Lead, Product Marketing",

      image: CFOImage,
    },
  ];

  const investmentTerms = [
    { term: "Valuation", value: "$8M pre-money" },
    { term: "Round Size", value: "$500,000" },
    { term: "Security Type", value: "Preferred Equity" },
    { term: "Minimum Investment", value: "$100" },
    { term: "Liquidation Preference", value: "1x" },
    { term: "Board Seat", value: "Available at $100K+" },
  ];

  const reviews = [
    {
      name: "Tech Investor, Lagos",
      text: "The combination of existing traction, clear market need, and experienced team makes this one of the most compelling African tech opportunities I've seen.",
      stars: 5,
      role: "Early Stage Investor",
    },
    {
      name: "Diaspora Investor, London",
      text: "Finally, a platform that understands the unique challenges of African service businesses. The integrated approach is exactly what the market needs.",
      stars: 5,
      role: "Angel Investor",
    },
    {
      name: "VC Partner, San Francisco",
      text: "The metrics speak for themselves. Strong retention, clear monetization strategy, and massive addressable market. This is Africa's next unicorn.",
      stars: 5,
      role: "Venture Capital",
    },
  ];

  const navigationItems = [
    { label: "Market", id: "market" },
    { label: "Traction", id: "traction" },
    { label: "Advantages", id: "advantages" },
    { label: "Team", id: "team" },
    { label: "Investment", id: "investment" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
      className="min-h-screen bg-white font-sen"
    >
      <Helmet>
        <title>
          Invest in Dimpified - Africa's Leading Platform for Service Businesses
          | Equity Offering
        </title>
        <meta
          name="description"
          content="Join our $500K Regulation CF fundraising. Invest from $100 in Africa's Shopify for service businesses. 500K+ existing users, proven revenue model, experienced team."
        />
        <meta
          property="og:title"
          content="Invest in Dimpified - Africa's Shopify for Service Businesses"
        />
        <meta
          property="og:description"
          content="Regulation CF offering. $8M pre-money valuation. Minimum investment $100. Join 500 founding investors in Africa's next unicorn."
        />
      </Helmet>

      {/* Navigation */}
<nav className="fixed w-full bg-white/95 z-[100] border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center space-x-3">
        <Link to="/">
          <img
            src={DimpifiedLogo}
            alt="Dimpified"
            className="h-7 w-auto"
          />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center space-x-8">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className="text-gray-600 hover:text-[#4f2683] font-medium transition-colors duration-200"
          >
            {item.label}
          </button>
        ))}
        <Link
          to="#"
          className="text-gray-600 hover:text-[#4f2683] font-medium transition-colors"
        >
          Investor Deck
        </Link>
        <Link
          to="#"
          className="btn hover:bg-gradient-to-l from-[#4f2683] via-[#9966cc] to-[#ff8201] bg-gradient-to-r from-[#4f2683] via-[#9966cc] to-[#ff8201] text-white py-3 px-6 rounded-lg flex items-center justify-between transition font-semibold"
        >
          <span className="mr-3">Join Priority Access</span>
          <FaArrowRight />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={toggleMobileMenu}
          className="text-gray-600 hover:text-[#4f2683] p-2"
        >
          {isMobileMenuOpen ? <BsX size={24} /> : <BsList size={24} />}
        </button>
      </div>
    </div>
  </div>

  {/* Mobile Navigation Menu */}
  <div
    className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white shadow-xl transform transition-transform duration-300 z-[300] ${
      isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <img src={DimpifiedLogo} alt="Dimpified" className="h-5 w-auto" />
        <button
          onClick={toggleMobileMenu}
          className="text-gray-600 hover:text-[#4f2683] p-2"
        >
          <BsX size={24} />
        </button>
      </div>

      <div className="space-y-6">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className="block w-full text-left text-lg font-medium text-gray-800 hover:text-[#4f2683] transition-colors duration-200 py-2"
          >
            {item.label}
          </button>
        ))}

        <Link
          to="#"
          className="block text-lg font-medium text-gray-800 hover:text-[#4f2683] transition-colors duration-200 py-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Investor Deck
        </Link>

        <Link
          to="#"
          className="btn hover:bg-gradient-to-l from-[#4f2683] via-[#9966cc] to-[#ff8201] bg-gradient-to-r from-[#4f2683] via-[#9966cc] to-[#ff8201] text-white py-3 px-6 rounded-lg flex items-center justify-between transition font-semibold mt-4"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="mr-3">Join Priority Access</span>
          <FaArrowRight />
        </Link>
      </div>
    </div>
  </div>

  {/* Mobile Menu Backdrop (BLUR + DIM) */}
  {isMobileMenuOpen && (
    <div
  className="lg:hidden fixed inset-0 bg-black/40 backdrop-blur-md z-[200]"
  onClick={toggleMobileMenu}
/>
  )}
</nav>

      <section className="pt-32 pb-20 px-6 lg:px-8 bg-white relative">
        {/* Background Image */}
        <div
          className="absolute hidden md:flex inset-0 bg-cover bg-center bg-no-repeat opacity-"
          style={{
            backgroundImage: `url(${Hero})`,
          }}
        ></div>

        {/* Background Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#4f2683_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)] opacity-5"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-[#4f2683] via-[#9966cc] to-[#ff8201] text-white text-sm font-medium mb-8 border border-gray-200 shadow-sm">
                🚀 Regulation CF Fundraising • $500,000 Target
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 mb-6 leading-tight">
                Own a Piece of{" "}
                <span className="font-bold bg-gradient-to-r from-[#4f2683] via-[#9966cc] to-[#ff8201] bg-clip-text text-transparent">
                  Africa's Shopify
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-6 leading-relaxed max-w-2xl">
                We're building the definitive platform for Africa's 72 million
                service businesses. Join our Regulation CF offering and invest
                from <span className="font-bold text-[#ff8201]">$100</span> to
                own equity in Africa's next unicorn.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <BsCheckCircle className="text-green-500 text-xl" />
                  <span className="text-gray-700">$8M pre-money valuation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <BsCheckCircle className="text-green-500 text-xl" />
                  <span className="text-gray-700">
                    500,000+ existing users in ecosystem
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <BsCheckCircle className="text-green-500 text-xl" />
                  <span className="text-gray-700">
                    Proven revenue model with multiple streams
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <BsCheckCircle className="text-green-500 text-xl" />
                  <span className="text-gray-700">
                    Experienced founding team with exit history
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link
                  to="#"
                  className="btn hover:bg-gradient-to-l from-[#4f2683] via-[#9966cc] to-[#ff8201] bg-gradient-to-r from-[#4f2683] via-[#9966cc] to-[#ff8201] text-white py-4 px-8 rounded-lg flex items-center justify-between transition text-lg font-bold shadow-lg hover:shadow-xl w-full sm:w-auto"
                >
                  <span className="mr-3">Secure Investor Spot</span>
                  <FaArrowRight />
                </Link>
                <button className="border-2 border-gray-300 hover:border-[#4f2683] text-gray-700 hover:text-[#4f2683] px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 w-full sm:w-auto">
                  Download Investor Deck
                </button>
              </div>

              <div className="text-gray-500 text-sm">
                ⚠️ Limited to 500 founding investors • Private round closes
                March 31, 2025
              </div>
            </motion.div>

            {/* Floating Dashboard Images */}
            {/* <motion.div
              className="relative h-[500px]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
            
              <motion.div
                className="absolute top-8 left-8 w-80 h-auto bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-10"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <LazyLoad height={200} offset={100}>
                  <img
                    src={Dashboards}
                    alt="Dimpified Analytics Dashboard"
                    className="w-full h-full object-cover"
                  />
                </LazyLoad>
                <div className="absolute inset-0 bg-gradient-to-br from-[#4f2683]/10 to-transparent"></div>
              </motion.div>


              <div className="absolute inset-0 -z-10">
                <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-r from-[#4f2683]/5 to-[#9966cc]/5 rounded-full blur-xl"></div>
                <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-r from-[#ff8201]/5 to-[#9966cc]/5 rounded-full blur-xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#4f2683]/3 to-[#ff8201]/3 rounded-full blur-2xl"></div>
              </div>
            </motion.div> */}
          </div>
        </div>
      </section>

      {/* Investment Summary Section */}
      <section id="investment" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Investment Opportunity
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Join our Regulation CF offering and become a founding investor in
              Africa's next unicorn.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Investment Terms */}
            <motion.div
              className="bg-gray-50 rounded-2xl p-8  border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Investment Terms
              </h3>

              <div className="space-y-4 mb-6">
                {investmentTerms.map((term, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b border-gray-200"
                  >
                    <span className="text-gray-700 font-medium">
                      {term.term}
                    </span>
                    <span className="text-[#4f2683] font-semibold">
                      {term.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <div className="text-gray-600 text-sm mb-2">
                  Fundraising Progress
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div className="bg-gradient-to-r from-[#4f2683] to-[#ff8201] h-3 rounded-full w-1/3"></div>
                </div>
                <div className="text-gray-700 text-sm">
                  $167K raised of $500K target
                </div>
              </div>
            </motion.div>

            {/* Quick Action Card */}
            <motion.div
              className="bg-gradient-to-br from-[#4f2683] via-[#9966cc] to-[#ff8201] rounded-2xl p-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-4">Ready to Invest?</h3>
              <p className="mb-6 opacity-90">
                Start your investment journey with as little as $100 and join
                the movement to digitize Africa's service economy.
              </p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <BsAward className="text-yellow-600" />
                  <span className="text-yellow-800 font-semibold">
                    Founding Investor Benefits
                  </span>
                </div>
                <ul className="text-yellow-700 text-sm space-y-1">
                  <li>• Name on Founding Investors Wall</li>
                  <li>• Digital Ownership Certificate</li>
                  <li>• Priority Access to Future Rounds</li>
                  <li>• Exclusive Investor Updates</li>
                </ul>
              </div>

              <div className="space-y-4">
                <Link
                  to="#"
                  className="block w-full bg-white text-[#4f2683] hover:bg-gray-100 font-bold py-4 px-6 rounded-lg transition-all duration-300 text-center"
                >
                  Begin Investment Process
                </Link>
                <button className="block w-full border-2 border-white text-white hover:bg-white/10 py-4 px-6 rounded-lg font-semibold transition-all duration-300">
                  Schedule Investor Call
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="flex items-center space-x-2 text-sm opacity-80">
                  <BsClock className="inline" />
                  <span>
                    Wefunder requires $50,000 in commitments before public
                    launch
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section id="market" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Massive Market Opportunity
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
              Africa's service economy represents one of the largest untapped
              digital opportunities globally. We're positioned to capture this
              $12.7 billion market growing at 25% annually.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {marketData.map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-6  border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl font-bold text-[#4f2683] mb-2">
                  {item.metric}
                </div>
                <div className="font-semibold text-gray-900 mb-2">
                  {item.label}
                </div>
                <div className="text-gray-600 text-sm">{item.description}</div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-8  border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              The Problem We Solve
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                  Current Challenges for African Service Businesses:
                </h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <BsCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      No dedicated platforms for service business management
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <BsCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span>
                      Limited access to digital payment infrastructure
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <BsCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span>High customer acquisition costs</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <BsCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                    <span>Manual booking and payment processes</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-4 text-lg">
                  Our Solution:
                </h4>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start space-x-3">
                    <BsCheckCircle className="text-[#4f2683] mt-1 flex-shrink-0" />
                    <span>
                      All-in-one platform for service business management
                    </span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <BsCheckCircle className="text-[#4f2683] mt-1 flex-shrink-0" />
                    <span>Integrated payments and booking systems</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <BsCheckCircle className="text-[#4f2683] mt-1 flex-shrink-0" />
                    <span>Customer acquisition and retention tools</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <BsCheckCircle className="text-[#4f2683] mt-1 flex-shrink-0" />
                    <span>Mobile-first approach for African markets</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Traction & Metrics */}
      <section id="traction" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Proven Traction & Metrics
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
              Our parent company ecosystem has already validated the market with
              500,000+ users and strong engagement metrics.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {tractionMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center p-6 transition-all duration-500 hover:scale-105 bg-gray-50 rounded-2xl  border border-gray-200"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#4f2683] to-[#ff8201] rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {metric.icon}
                </div>
                <div className="text-2xl font-bold text-[#4f2683] mb-2">
                  {metric.number}
                </div>
                <div className="font-semibold text-gray-900 mb-2">
                  {metric.label}
                </div>
                <div className="text-gray-600 text-sm">
                  {metric.description}
                </div>
              </motion.div>
            ))}
          </div>



          {/* Financial Projections */}
          <div className="bg-gray-50 rounded-2xl p-8  border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Financial Projections
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[650px]">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="pb-4 font-semibold text-gray-900">Year</th>
                    <th className="pb-4 font-semibold text-gray-900">
                      Projected Revenue
                    </th>
                    <th className="pb-4 font-semibold text-gray-900">
                      Active Users
                    </th>
                    <th className="pb-4 font-semibold text-gray-900">
                      Businesses
                    </th>
                    <th className="pb-4 font-semibold text-gray-900">
                      Growth Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {financialProjections.map((projection, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-4 font-semibold text-gray-900">
                        {projection.year}
                      </td>
                      <td className="py-4 text-[#4f2683] font-bold">
                        {projection.revenue}
                      </td>
                      <td className="py-4 text-gray-700">{projection.users}</td>
                      <td className="py-4 text-gray-700">
                        {projection.businesses}
                      </td>
                      <td className="py-4 text-green-600 font-semibold">
                        {index === 0
                          ? "Launch"
                          : index === 1
                          ? "300%"
                          : index === 2
                          ? "160%"
                          : "126%"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantages */}
      <section
        id="advantages"
        className="py-20 bg-gradient-to-br from-[#4f2683] to-[#9966cc] text-white"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light mb-4">
              Sustainable Competitive Advantages
            </h2>
            <p className="text-xl opacity-90 max-w-4xl leading-relaxed">
              Our unique positioning and technology create significant barriers
              to entry in this rapidly growing market.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {competitiveAdvantages.map((advantage, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    {advantage.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{advantage.title}</h3>
                </div>
                <p className="text-white/80 leading-relaxed">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              Experienced Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl leading-relaxed">
              Our team brings decades of combined experience in technology,
              finance, and African market operations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-20 h-20 bg-gradient-to-r from-[#4f2683] to-[#ff8201] rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {member.background}
                </p>
                <div className="bg-[#4f2683] text-white text-xs px-3 py-1 rounded-full inline-block">
                  {member.expertise}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light text-gray-900 mb-4">
              What Investors Are Saying
            </h2>
          </motion.div>

          <div className="relative">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              speed={1000}
              allowTouchMove={true}
              modules={[Autoplay]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white feature-box rounded-xl px-6 py-6 h-[280px] text-start  border border-gray-200">
                    <div className="flex text-[#ff8201] mb-4">
                      {[...Array(review.stars)].map((_, i) => (
                        <AiFillStar key={i} />
                      ))}
                    </div>
                    <p className="mb-4 leading-6 text-gray-600 italic">
                      "{review.text}"
                    </p>
                    <div>
                      <div className="text-lg text-gray-800 font-semibold">
                        {review.name}
                      </div>
                      <div className="text-gray-500 text-sm">{review.role}</div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Ready to Invest Section with White Background */}
     <section className="py-20 bg-white ">
  <div className="flex justify-center items-center">
    <div
      className="max-w-6xl mx-auto px-6 lg:px-48 text-center bg-cover bg-center rounded-2xl p-12"
      style={{
        backgroundImage: `linear-gradient(rgba(79, 38, 131, 0.9), rgba(153, 102, 204, 0.9)), url(${Dashboards})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center justify-center"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 text-white text-sm font-bold mb-6">
          🎯 Priority Access Phase
        </div>
        <h2 className="text-4xl font-light text-white mb-4">
          Ready to Invest in Africa's Digital Future?
        </h2>
        <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Join the movement to digitize Africa's service economy. Invest in
          a platform that's already proven its market fit and is positioned
          for exponential growth across the continent.
        </p>
        <div className="flex flex-col items-center justify-center sm:flex-row gap-4">
          <Link
            to="#"
            className="bg-white text-[#4f2683] hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center w-full sm:w-auto"
          >
            <span>Begin Investment Process</span>
            <FaArrowRight className="ml-2" />
          </Link>
          <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 w-full sm:w-auto">
            Schedule Investor Call
          </button>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-6">
            <img src={DIMPWhiteLogo} alt="Dimpified" className="h-8 w-auto" />
          </div>
          <p className="text-gray-400 mb-4 max-w-2xl">
            SEC-compliant Regulation CF offering hosted on Wefunder. This is not
            an offer to sell securities. Any offer will be made pursuant to
            Regulation CF.
          </p>
          <p className="text-gray-500 text-sm max-w-2xl">
            This is not financial advice. Investing in startups involves
            substantial risk, including the possible loss of principal. Past
            performance is not indicative of future results. Please consult with
            your financial advisor before making any investment decisions.
          </p>
          <div className="mt-6 pt-6 border-t border-gray-800 text-gray-500 text-sm">
            © 2025 Dimpified Technologies. All rights reserved. |
           <Link to="/privacy-policy" className="hover:text-gray-400 ml-2">
              Privacy Policy
            </Link>{" "}
            |
            <Link to="/terms-of-service" className="hover:text-gray-400 ml-2">
              Terms of Service
            </Link>{" "}
            
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default InvestorLanding;