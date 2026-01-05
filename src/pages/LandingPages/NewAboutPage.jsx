import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Logo from "./images/dimp-blue.png";
import Navbar from "../../component/Blog/Navbar";
import Footer from "../../component/Blog/Footer";

// Lucide Icons
import {
  Menu,
  X,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
  Clock,
  Star,
  CheckCircle,
  Zap,
  Target,
  Heart,
  Shield,
  Sparkles,
  ArrowRight,
  MessageSquare,
  CreditCard,
  Smartphone,
  Globe,
  BarChart3,
  HelpCircle,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Play,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="font-sans text-gray-800">
      <Navbar />
      <HeroSection />
      <MissionSection />
      <ValuesSection />
      <UseCasesSection />
      <ImpactStats />
      <TeamSection />
      <FAQSection />
      <Footer />
    </div>
  );
}

const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-6 lg:px-20 bg-gradient-to-b from-white to-[#FBF1FF]">
      <div className="max-w-7xl mx-auto">
        {/* TWO COLUMN LAYOUT */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-left">
            <span className="inline-flex items-center bg-[#F3E8FF] text-[#9810FA] text-sm font-semibold px-6 py-2 rounded-full mb-6">
              About Dimpified
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
              Built to help your <br />
              <span className="bg-gradient-to-r from-[#9810FA] to-purple-600 bg-clip-text text-transparent">
                business grow smarter
              </span>
            </h1>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We built Dimpified with a "WHY", a vision to answer the question
              in the heart of every business owner providing them with
              easy-to-use tools designed to bring them closer to their
              customers.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#9810FA]" />
                <span className="text-gray-700">
                  From solo startups to growing teams
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#9810FA]" />
                <span className="text-gray-700">
                  Tools that expand with your needs
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-[#9810FA]" />
                <span className="text-gray-700">
                  Reliable support in booking & management
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth/personal-information">
                <button className="px-8 py-3.5 bg-gradient-to-r from-[#9810FA] to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link to="/features">
                <button className="px-8 py-3.5 border-2 border-[#9810FA] text-[#9810FA] rounded-full font-semibold hover:bg-[#9810FA] hover:text-white transition-all duration-300">
                  View Features
                </button>
              </Link>
            </div>
          </div>

          {/* Right Column - Video */}
          <div className="relative">
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
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#9810FA]/20 to-pink-500/20 backdrop-blur-sm flex items-center justify-center group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#9810FA] to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-[#F3E8FF] p-2 rounded-lg">
                  <Users className="w-5 h-5 text-[#9810FA]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    10,000+
                  </div>
                  <div className="text-sm text-gray-600">Businesses</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-[#F3E8FF] p-2 rounded-lg">
                  <Star className="w-5 h-5 text-[#9810FA]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">4.9/5</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const MissionSection = () => {
  return (
    <section className="py-20 px-6 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="bg-gradient-to-br from-[#F3E8FF] to-pink-50 rounded-2xl p-8 transform rotate-3">
              <div className="bg-white rounded-xl p-8 shadow-lg transform -rotate-1">
                <div className="flex items-start gap-4 mb-8">
                  <div className="bg-[#F3E8FF] p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-[#9810FA]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      Simplify Operations
                    </h4>
                    <p className="text-gray-600 mt-2">
                      Streamline your entire booking process with automated
                      scheduling
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 mb-8">
                  <div className="bg-[#F3E8FF] p-3 rounded-lg">
                    <DollarSign className="w-6 h-6 text-[#9810FA]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      Get Paid Faster
                    </h4>
                    <p className="text-gray-600 mt-2">
                      Receive payments upfront, eliminate no-shows and late
                      payments
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-[#F3E8FF] p-3 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-[#9810FA]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">
                      Grow Intelligently
                    </h4>
                    <p className="text-gray-600 mt-2">
                      Data-driven insights to scale your business effectively
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[#9810FA] font-semibold text-lg mb-4 flex items-center gap-2">
              <Target className="w-5 h-5" />
              OUR MISSION
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              Empowering service businesses to thrive
            </h3>
            <p className="text-gray-600 text-lg mb-6">
              At Dimpified, we believe every service professional deserves tools
              that work as hard as they do. Our mission is to remove the
              friction from booking and client management, so you can focus on
              what you do best.
            </p>
            <p className="text-gray-600 mb-8">
              Whether you're a solo entrepreneur or managing a growing team,
              Dimpified scales with you. We provide the reliability and support
              you need to build lasting client relationships and grow your
              business sustainably.
            </p>
            {/* <Link to="/about-dimpified">
              <button className="px-8 py-3.5 bg-gradient-to-r from-[#9810FA] to-purple-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300 flex items-center gap-2">
                Read Our Story
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
};

const ValuesSection = () => {
  const values = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer-First",
      description: "Every feature is designed with your success in mind",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Simplicity",
      description: "Complex problems, simple solutions",
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Growth-Oriented",
      description: "Tools that scale with your business",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Innovation",
      description: "Continuously evolving to meet your needs",
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-20 bg-[#FBF1FF]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            The principles that guide everything we build at Dimpified
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow group"
            >
              <div className="inline-flex items-center justify-center bg-[#F3E8FF] p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                <div className="text-[#9810FA]">{value.icon}</div>
              </div>
              <h3 className="font-bold text-gray-900 text-xl mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UseCasesSection = () => {
  const useCases = [
    {
      category: "Beauty & Hair",
      description: "Salons and beauty professionals getting booked 24/7",
      image:
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: ["Online Booking", "Staff Management", "Service Catalog"],
    },
    {
      category: "Fitness & Wellness",
      description: "Trainers and wellness coaches managing clients efficiently",
      image:
        "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: [
        "Class Scheduling",
        "Recurring Bookings",
        "Payment Processing",
      ],
    },
    {
      category: "Professional Services",
      description: "Consultants and freelancers streamlining appointments",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: ["Calendar Sync", "Automated Reminders", "Client Portal"],
    },
    {
      category: "Health & Wellness",
      description: "Therapists and practitioners reducing administrative work",
      image:
        "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: ["Intake Forms", "Secure Payments", "Progress Tracking"],
    },
    {
      category: "Food & Catering",
      description: "Caterers and food businesses managing orders and events",
      image:
        "https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: ["Event Booking", "Menu Management", "Order Tracking"],
    },
    {
      category: "Creative Services",
      description: "Photographers and artists scheduling creative sessions",
      image:
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      features: ["Session Booking", "Portfolio Display", "Contract Management"],
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Perfect For Every African Service Business
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See how Dimpified transforms businesses across Nigeria and Africa
          </p>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{ delay: 3000 }}
          modules={[Autoplay]}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 },
          }}
          className="pb-12"
        >
          {useCases.map((useCase, index) => (
            <SwiperSlide key={index}>
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full group">
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={useCase.image}
                    alt={useCase.category}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                      {useCase.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-gray-900 text-xl">
                      {useCase.category}
                    </h3>
                    <span className="bg-[#F3E8FF] text-[#9810FA] text-xs font-semibold px-3 py-1 rounded-full">
                      Popular
                    </span>
                  </div>

                  <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                    {useCase.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {useCase.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#9810FA] rounded-full flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/auth/personal-information">
                    <button className="w-full py-3 bg-gradient-to-r from-[#9810FA] to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:bg-gradient-to-r group-hover:from-purple-700 group-hover:to-[#3F0994]">
                      Get Started
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                {/* Decorative Element */}
                <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-[#9810FA]/10 to-transparent rounded-full blur-xl -z-10" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Testimonial Banner */}
        <div className="mt-16 bg-gradient-to-r from-[#9810FA] to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">
                Trusted by African Entrepreneurs
              </h3>
              <p className="text-white/90 mb-6">
                "Dimpified helped me grow my salon business by 200% in 6 months.
                Now I focus on my craft while the platform handles my bookings."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80"
                    alt="Aisha"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="font-semibold">Aisha Balogun</div>
                  <div className="text-white/70 text-sm">
                    Salon Owner, Lagos
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-white/80">Reduced No-Shows</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-white/80">
                    Booking Availability
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">₦2.5M+</div>
                  <div className="text-sm text-white/80">Monthly Bookings</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">5,000+</div>
                  <div className="text-sm text-white/80">
                    African Businesses
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ImpactStats = () => {
  const stats = [
    {
      value: "10,000+",
      label: "Businesses Empowered",
      icon: <Users className="w-8 h-8" />,
    },
    {
      value: "95%",
      label: "Reduced No-Shows",
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      value: "24/7",
      label: "Booking Availability",
      icon: <Clock className="w-8 h-8" />,
    },
    {
      value: "4.9/5",
      label: "Customer Rating",
      icon: <Star className="w-8 h-8" />,
    },
  ];

  return (
    <section className="py-20 px-6 lg:px-20 bg-gradient-to-r from-[#9810FA] to-purple-700">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Real Impact, Real Results
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto">
            Join thousands of service professionals who transformed their
            business with Dimpified
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center bg-white/20 p-4 rounded-2xl mb-4">
                <div className="text-white">{stat.icon}</div>
              </div>
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-white/80 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Ready to transform your business?
              </h3>
              <p className="text-white/80">
                Join the Dimpified community today
              </p>
            </div>
            <Link to="/auth/personal-information">
              <button className="px-8 py-3.5 bg-white text-[#9810FA] rounded-full font-bold hover:shadow-2xl transition-all duration-300 whitespace-nowrap flex items-center gap-2">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamSection = () => {
  return (
    <section className="py-20 px-6 lg:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Built by Experts, For Experts
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our team combines deep industry knowledge with technical expertise
            to create solutions that actually work
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-[#F3E8FF] to-pink-50 rounded-2xl p-8">
            <div className="bg-[#F3E8FF] inline-flex p-4 rounded-2xl mb-6">
              <Target className="w-8 h-8 text-[#9810FA]" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-3">
              Industry Experience
            </h3>
            <p className="text-gray-600">
              Founded by professionals who understand the challenges of service
              businesses firsthand
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#F3E8FF] to-pink-50 rounded-2xl p-8">
            <div className="bg-[#F3E8FF] inline-flex p-4 rounded-2xl mb-6">
              <Zap className="w-8 h-8 text-[#9810FA]" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-3">
              Technical Excellence
            </h3>
            <p className="text-gray-600">
              Cutting-edge technology built with scalability and reliability in
              mind
            </p>
          </div>
          <div className="bg-gradient-to-br from-[#F3E8FF] to-pink-50 rounded-2xl p-8">
            <div className="bg-[#F3E8FF] inline-flex p-4 rounded-2xl mb-6">
              <MessageSquare className="w-8 h-8 text-[#9810FA]" />
            </div>
            <h3 className="font-bold text-gray-900 text-xl mb-3">
              Customer Support
            </h3>
            <p className="text-gray-600">
              Dedicated team ready to help you succeed every step of the way
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
      question: "Why should I use Dimpified?",
      answer:
        "Dimpified saves you time by letting customers see your services and book times that suit them. They can pay online, which fills your calendar ahead. Automatic reminders help reduce no-shows, and you don't have to reply to booking requests in messages. This frees you to focus on your work and grow your business.",
    },
    {
      question: "How does Dimpified help me manage bookings more easily?",
      answer:
        "Dimpified gives you a unique booking link your customers use to book and pay in advance. With real-time scheduling, customers see your availability and booked times instantly.",
    },
    {
      question: "How can my customers book my services?",
      answer:
        "Your customers can book your services using your unique booking link, also found as your website URL on your dashboard after signing up.",
    },
    {
      question: "Can I accept online payments through Dimpified?",
      answer:
        "Yes, you can accept online payments in two ways: customers can pay into your bank account or pay through our integrated payment system (Paystack or Stripe).",
    },
    {
      question: "What do I need to get started on Dimpified?",
      answer:
        "You only need a mobile smartphone with a browser app (Chrome, Firefox etc). Setup takes about 10 minutes.",
    },
    {
      question: "Will Dimpified bring me more customers?",
      answer:
        "Dimpified provides you with tools and resources to attract and retain customers more effectively, making it easier for potential clients to discover and book your services.",
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
            Everything you need to know about Dimpified
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                className="w-full flex justify-between items-center p-6 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <div className="flex items-center gap-4">
                  <HelpCircle className="w-5 h-5 text-[#9810FA]" />
                  <span className="font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                </div>
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
            Still have questions? We're here to help!
          </p>
          <Link to="/help">
            <button className="px-8 py-3 border-2 border-[#9810FA] text-[#9810FA] rounded-full font-semibold hover:bg-[#9810FA] hover:text-white transition-all duration-300 flex items-center gap-2 mx-auto">
              <MessageSquare className="w-4 h-4" />
              Contact Support
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
