import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LazyLoad from "react-lazyload";
import Dashboards from "./images/dimp-dashboard.png";
import {
  Calendar,
  Bell,
  CheckCircle,
  Clock,
  DollarSign,
  Shield,
  TrendingUp,
  Globe,
  Link as LinkIcon,
  Image,
  Search,
  Users,
  Smartphone,
  BarChart3,
  Zap,
  ArrowRight,
  Mail,
  Check,
  Smartphone as Phone,
  Lock,
  CreditCard,
  Target,
  Star,
  Palette,
  FileText,
  MapPin,
  Settings,
  Eye,
  Calendar as CalendarClock,
  UserCheck,
  BadgeCheck,
  LayoutDashboard,
  Play,
} from "lucide-react";
import Logo from "./images/dimp-blue.png";
import Navbar from "../../component/Blog/Navbar";
import Footer from "../../component/Blog/Footer";

export default function FeaturesPage() {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <HeroSection />
      <CustomerExperience />
      <BusinessTools />
      <MarketingTools />
      <GrowthSection />
      <FAQSection />
      <Footer />
    </div>
  );
}


const HeroSection = () => {
  return (
    <section className="pt-32 pb-16 px-6 lg:px-20 bg-gradient-to-b from-white via-[#FBF1FF] to-white">
      <div className="max-w-7xl mx-auto">
        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-left">
            <span className="inline-flex items-center bg-gradient-to-r from-[#F3E8FF] to-purple-100 text-[#9810FA] text-sm font-semibold px-6 py-2 rounded-full mb-6 shadow-sm">
              <Zap className="w-4 h-4 mr-2" />
              DIMPIFIED FEATURES
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Everything you need
              <br />
              <span className="bg-gradient-to-r from-[#9810FA] via-purple-600 to-pink-500 bg-clip-text text-transparent animate-gradient">
                to grow your service business
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-lg">
              From booking to payments to marketing, Dimpified gives you all the
              tools to streamline operations, delight customers, and scale your
              business effortlessly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/auth/landing">
                <button className="px-8 py-3.5 bg-gradient-to-r from-[#9810FA] to-purple-600 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-purple-200 transition-all duration-300 flex items-center gap-2 group">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <Link to="#features-demo">
                <button className="px-8 py-3.5 border-2 border-[#9810FA] text-[#9810FA] rounded-full font-semibold hover:bg-[#9810FA] hover:text-white transition-all duration-300 flex items-center gap-2">
                  <Play className="w-4 h-4" />
                  Watch Demo
                </button>
              </Link>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Check className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">No setup fees</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Check className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">24/7 support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Check className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-sm text-gray-700">14-day free trial</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-pink-100 p-2 rounded-lg">
                  <Check className="w-4 h-4 text-pink-600" />
                </div>
                <span className="text-sm text-gray-700">Cancel anytime</span>
              </div>
            </div>
          </div>

          {/* Right Column - Interactive Dashboard Preview */}
          <div className="relative">
            {/* Dashboard Container */}
            <div className="">
              <img
                loading="lazy"
                src={Dashboards}
                className="w-full rounded-xl"
                alt="Expand Your Sales Streams"
              />{" "}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-[#F3E8FF] p-2 rounded-lg">
                  <Users className="w-5 h-5 text-[#9810FA]" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">95%</div>
                  <div className="text-sm text-gray-600">Less No-Shows</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-[#F3E8FF] p-2 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-[#9810FA]" />
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">24/7</div>
                  <div className="text-sm text-gray-600">Bookings</div>
                </div>
              </div>
            </div>

           
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-center">
          <div className="text-gray-600">
            Trusted by businesses across Africa
          </div>
          <div className="flex items-center gap-2">
            {[
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&q=80",
              "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&q=80",
              //   "https://images.unsplash.com/photo-1598974357801-cbca100e5d10?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&q=80",
              "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&q=80",
            ].map((src, i) => (
              <div key={i} className="relative" style={{ zIndex: 4 - i }}>
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#9810FA] to-purple-600 rounded-full blur opacity-0 hover:opacity-30 transition-opacity"></div>
                <img
                  src={src}
                  className="w-10 h-10 rounded-full border-2 border-white shadow-lg"
                  alt="Business Owner"
                />
              </div>
            ))}
            <div className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-r from-[#F3E8FF] to-pink-100 flex items-center justify-center shadow-lg">
              <span className="text-gray-700 text-sm font-bold">+</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CustomerExperience = () => {
  const features = [
    {
      icon: <LinkIcon className="w-8 h-8" />,
      title: "Online Booking",
      description:
        "No more back-and-forth with your clients. One link. Easy bookings. Instant payments.",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "SMS & Email Reminders",
      description:
        "Your customers get automated reminders about appointments booked.",
      gradient: "from-green-500 to-emerald-400",
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Appointment Confirmation",
      description:
        "Your customers receive email and SMS confirmation on every booking.",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Real-time Availability",
      description:
        "Customers see your real-time schedule and book available slots instantly.",
      gradient: "from-orange-500 to-yellow-400",
    },
  ];

  return (
    <section id="customer-experience" className="py-20 px-6 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How We Care for Your Customers' Experience
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Provide a seamless booking experience that keeps customers coming
            back
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div
                className={`inline-flex items-center justify-center bg-gradient-to-br ${feature.gradient} p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[#9810FA]/5 to-purple-600/5 rounded-2xl p-8 border border-purple-100">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Seamless Customer Journey
              </h3>
              <p className="text-gray-600 mb-6">
                From discovery to booking to service delivery, we ensure every
                touchpoint is optimized for customer satisfaction and
                convenience.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#9810FA] rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    Instant booking confirmation
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#9810FA] rounded-full"></div>
                  <span className="text-sm text-gray-700">
                    Automated follow-ups
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="https://i.imghippo.com/files/Bpp2023yc.jpg"
                alt="Customer Experience"
                className="rounded-xl "
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const BusinessTools = () => {
  const bookingFeatures = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Manage Bookings",
      description: "See all your booking details in one place.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Manage Your Availability",
      description: "Set your business hours for each day of the week.",
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: "SMS & Email Reminders",
      description: "You also get automatic reminders for client appointments.",
    },
    {
      icon: <CalendarClock className="w-6 h-6" />,
      title: "Date Blocking",
      description: "Block bookings on specific dates.",
    },
  ];

  const paymentFeatures = [
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: "Upfront Payment",
      description: "Your customers pay when they are booking your service",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Direct Bank Transfer",
      description:
        "Receive payments for bookings in your preferred bank account.",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Track Payments",
      description: "See payments for bookings in one place.",
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Multiple Payment Options",
      description: "Clients can pay via card, transfer, USSD, bank, and more.",
    },
  ];

  return (
    <section id="business-tools" className="py-20 px-6 lg:px-20 bg-[#FBF1FF]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How We Care For You and Your Business
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powerful tools to streamline your operations and boost efficiency
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Booking Management */}
          <div className="bg-white rounded-2xl p-8 ">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Booking Management
                </h3>
                <p className="text-gray-600">
                  Complete control over your schedule
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {bookingFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-blue-600">{feature.icon}</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Management */}
          <div className="bg-white rounded-2xl p-8 ">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-gradient-to-r from-green-500 to-emerald-400 p-3 rounded-xl">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Payment Processing
                </h3>
                <p className="text-gray-600">
                  Secure and flexible payment solutions
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {paymentFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-green-600">{feature.icon}</div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Business Tools */}
        <div className="mt-12 bg-white rounded-2xl p-8 ">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="bg-purple-50 p-3 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Team Management
                </h4>
                <p className="text-gray-600 text-sm">
                  Add team members so customers can choose who handles their
                  service.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-orange-50 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Service Management
                </h4>
                <p className="text-gray-600 text-sm">
                  Add unlimited services and update them easily.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-cyan-50 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-cyan-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Business Information
                </h4>
                <p className="text-gray-600 text-sm">
                  Set and update contact info, location, and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MarketingTools = () => {
  const marketingFeatures = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Professional Website",
      description:
        "Customize your web page that lets customers see your services and book anytime.",
      color: "blue",
    },
    {
      icon: <LinkIcon className="w-6 h-6" />,
      title: "Custom Booking Link",
      description:
        "One link does it all—your website URL also works as your booking link.",
      color: "purple",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Branding",
      description:
        "Add your business logo and customize colors to match your brand.",
      color: "pink",
    },
    {
      icon: <Image className="w-6 h-6" />,
      title: "Service Photos",
      description:
        "Add recent photos to showcase your services and attract customers.",
      color: "green",
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: "SEO Optimization",
      description:
        "Be found by customers searching for your services on Google.",
      color: "orange",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Insights & Analytics",
      description:
        "Make smart business choices with clear business stats and insights.",
      color: "indigo",
    },
  ];

  return (
    <section id="marketing-tools" className="py-20 px-6 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How We Help Market Your Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Attract more customers and grow your brand with powerful marketing
            tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {marketingFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div
                className={`inline-flex items-center justify-center bg-${feature.color}-50 p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform`}
              >
                <div className={`text-${feature.color}-600`}>
                  {feature.icon}
                </div>
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Marketing Showcase */}
        <div className="mt-16 bg-gradient-to-r from-[#9810FA] to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-4">
                All Your Marketing in One Place
              </h3>
              <p className="text-white/90 mb-6">
                From your booking page to analytics, we provide everything you
                need to market your services effectively without the complexity.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Mobile-optimized booking pages</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Social media integration</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5" />
                  <span>Customer review management</span>
                </div>
              </div>
            </div>
            <div className="relative ">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/Bi6yNbGc750?autoplay=1&mute=1&controls=0&loop=1&playlist=Bi6yNbGc750&playsinline=1&modestbranding=1&showinfo=0"
                    title="Dimpified Mission"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Play Button Overlay */}
                {/* <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#9810FA]/20 to-pink-500/20 backdrop-blur-sm flex items-center justify-center group cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#9810FA] to-pink-500 flex items-center justify-center  group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="absolute -top-4 -left-4 bg-white text-gray-900 px-4 py-2 rounded-lg ">
                <div className="text-sm font-semibold">Live Preview</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GrowthSection = () => {
  return (
    <section className="py-20 px-6 lg:px-20 bg-gradient-to-r from-[#9810FA] to-purple-700">
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-white mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Grow Your Business One Booking at a Time
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Join thousands of service professionals who are already simplifying
            their operations and growing their business with Dimpified.
          </p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center bg-[#F3E8FF] p-4 rounded-2xl mb-4">
                <Zap className="w-8 h-8 text-[#9810FA]" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-2">
                Get Started in Minutes
              </h3>
              <p className="text-gray-600">
                Set up your account and start accepting bookings today
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center bg-[#F3E8FF] p-4 rounded-2xl mb-4">
                <TrendingUp className="w-8 h-8 text-[#9810FA]" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-2">
                Scale with Confidence
              </h3>
              <p className="text-gray-600">
                Tools that grow with your business, from solo to team
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center bg-[#F3E8FF] p-4 rounded-2xl mb-4">
                <Star className="w-8 h-8 text-[#9810FA]" />
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-2">
                Exceptional Support
              </h3>
              <p className="text-gray-600">
                Dedicated help whenever you need it
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <Link to="/auth/landing">
              <button className="px-10 py-4 bg-gradient-to-r from-[#9810FA] to-purple-600 text-white rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2">
                Sign Up Free for 14 Days
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <p className="text-gray-600 mt-4 text-sm">
              No credit card required. Cancel anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How quickly can I start using Dimpified?",
      answer:
        "You can set up your account and start accepting bookings in under 10 minutes. No technical skills required.",
    },
    {
      question: "Can I customize my booking page?",
      answer:
        "Yes! You can add your logo, brand colors, service photos, and customize all content to match your brand identity.",
    },
    {
      question: "Is there a mobile app?",
      answer:
        "Dimpified works perfectly on any mobile browser. You can also add it to your home screen for app-like convenience.",
    },
    {
      question: "How secure are customer payments?",
      answer:
        "All payments are processed through PCI-compliant payment gateways with bank-level security and encryption.",
    },
    {
      question: "Can I integrate with my calendar?",
      answer:
        "Yes! Dimpified syncs with Google Calendar to prevent double bookings and keep your schedule up-to-date.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 px-6 lg:px-20 bg-[#FBF1FF]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600">
            Everything you need to know about Dimpified features
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden  hover:shadow-md transition-shadow"
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <span
                  className={`text-[#9810FA] text-xl font-bold transition-transform duration-300 ${
                    activeIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              {activeIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Still have questions about our features?
          </p>
          <Link to="/help">
            <button className="px-8 py-3 border-2 border-[#9810FA] text-[#9810FA] rounded-full font-semibold hover:bg-[#9810FA] hover:text-white transition-all duration-300">
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};


