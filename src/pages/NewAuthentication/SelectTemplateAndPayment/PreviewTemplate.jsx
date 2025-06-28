import React, { useEffect, useState } from "react";
import {
  ButtonSmallPurple,
  ButtonSmallWhite,
} from "../../../component/Buttons";
import { Heading, Text } from "../../../component/Text";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setTemplate } from "../../../features/Template/mainTemplate";
import api from "../../../api/creatorApis";
import api2 from "../../../api/Template";
import { showToast } from "../../../component/ShowToast";
import { LoadingMany } from "../../../component/LoadingSpinner";
import {
  barber,
  HairSalon,
  MakeUp,
  Nail,
  gym,
  spa,
  dental,
} from "../../../data/Services";
import BarberMordern from "../../Templates/PersonalCare/Barber/BarberModern";
import HairstylistTemplate from "../../Templates/HairstylistTemplate";
import ThirdStylist from "../../Templates/PersonalCare/Hairstylist/ThirdStylist";
import SecondStylist from "../../Templates/PersonalCare/Hairstylist/SecondStylist";
import FourthStylist from "../../Templates/PersonalCare/Hairstylist/FourthStylist";
import BarberFourth from "../../Templates/PersonalCare/Barber/BarberFourth";
import BarberFresh from "../../Templates/PersonalCare/Barber/BarberFresh";
import SecondMakeup from "../../Templates/PersonalCare/makeup/SecondMakeup";
import ThirdMakeup from "../../Templates/PersonalCare/makeup/ThirdMakeup";
import Barber2 from "../../Templates/PersonalCare/Barber/Barber2";
import GymTemplate1 from "../../Templates/PersonalCare/gym/GymTemplate";
import GymTemplate2 from "../../Templates/PersonalCare/gym/SecondGym";
import GymTemplate3 from "../../Templates/PersonalCare/gym/ThirdGym";
import GymTemplate4 from "../../Templates/PersonalCare/gym/FourthGym";
import GymTemplate5 from "../../Templates/PersonalCare/gym/FifthGym";
import FirstNail from "../../Templates/PersonalCare/nail/NailsTemplate";
import SecondNail from "../../Templates/PersonalCare/nail/SecondNail";
import BlankTemplate from "../../Templates/Blank-Template/BlankTemplate";
import FirstDentist from "../../Templates/PersonalCare/dental/FirstDentist";
import SecondDentist from "../../Templates/PersonalCare/dental/SecondDentist";
import ThirdDentist from "../../Templates/PersonalCare/dental/ThirdDentist";
import FourthDentist from "../../Templates/PersonalCare/dental/FourthDentist";
import FifthDentist from "../../Templates/PersonalCare/dental/FifthDentist";
import Spa1 from "../../Templates/PersonalCare/spa/FirstSpa";
import Spa2 from "../../Templates/PersonalCare/spa/SecondSpa";
import Spa3 from "../../Templates/PersonalCare/spa/ThirdSpa";
import Spa4 from "../../Templates/PersonalCare/spa/FourthSpa";
import Spa5 from "../../Templates/PersonalCare/spa/FifthSpa";
import MakeupTemplate from "../../Templates/PersonalCare/makeup/MakeupTemplate";
import BarberPosh from "../../Templates/PersonalCare/Barber/BarberPosh";
import { useCountry } from "../../../pages/pricing/CountryContext";
import { getFormattedPrice } from "../../../data/getServicePriceAndCountryCode";

const PreviewTemplate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [templateLoading, setTemplateLoading] = useState(false);
  const [ecosystemLoading, setEcosystemLoading] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [templateId, setTemplateId] = useState(null);

  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const creatorId = useSelector((state) => state.auth.user?.creatorId);
  const content = useSelector((state) => state.mainTemplate.currentTemplate);
  const userStep = useSelector((state) => state.auth?.user?.step);

  const { country } = useCountry(); // Access country code from context
  const countryCode = country || "NG"; // Fallback to 'NG'

  useEffect(() => {
    if (userStep === 5) navigate("/auth/login");
  }, [userStep, navigate]);

  useEffect(() => {
    const getId = Number(sessionStorage.getItem("templateId"));
    if (!getId) {
      showToast("Template ID is missing");
      navigate("/auth/select-template");
      return;
    }
    setTemplateId(getId);
  }, [navigate]);

  useEffect(() => {
    if (templateId) {
      getEcosystem();
      getTemplate(templateId);
    }
  }, [templateId]);

  const getTemplate = async () => {
    setTemplateLoading(true);
    try {
      const response = await api2.getTemplateDetails({ templateId });
      dispatch(setTemplate(response.data));
    } catch (error) {
      console.error("Error getting template:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      showToast("Error getting template information");
    } finally {
      setTemplateLoading(false);
    }
  };

  const onBack = () => navigate("/auth/select-template");

  const getEcosystem = async () => {
    setEcosystemLoading(true);
    try {
      if (!accessToken || !refreshToken) {
        showToast("Authentication tokens are missing");
        return;
      }
      const response = await api2.getBusinessInfo({ creatorId });
      setUserDetails(response.data.getEcosystem);
    } catch (error) {
      console.error("Could not get business info:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    } finally {
      setEcosystemLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!accessToken || !refreshToken) {
      showToast("Authentication tokens are missing");
      navigate("/auth/login");
      return;
    }
    const ecosystemDomain = userDetails?.ecosystemDomain || "not available";
    const payload = {
      accessToken,
      refreshToken,
      creatorId,
      ecosystemDomain,
      templateId,
      navbar: content.navbar,
      hero: content.hero,
      aboutUs: content.aboutUs,
      Vision: content.Vision,
      Statistics: content.Statistics,
      Partners: content.Patrners, 
      Events: content.Events,
      Gallery: content.Gallery,
      LargeCta: content.LargeCta,
      Team: content.Team,
      Blog: content.Blog,
      Reviews: content.Reviews,
      contactUs: content.contactUs,
      faq: content.faq,
      faqStyles: content.faqStyles,
      footer: content.footer,
    };
    try {
      console.log("Submitting template payload:", payload);
      const response = await api2.createTemplate(payload);
      showToast("Business site submitted successfully", "success");
    } catch (error) {
      console.error("Error submitting template:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      showToast("Error submitting template");
    }
  };

  const handleContinue = async () => {
    if (ecosystemLoading || !userDetails) {
      showToast("Business info not loaded yet");
      return;
    }
    if (!accessToken || !refreshToken) {
      showToast("Authentication tokens are missing");
      navigate("/auth/login");
      return;
    }
    setLoading(true);

    const serviceTypes = {
      barber: {
        subCategory: "Barber Shop",
        prefix: "I will",
        header: "give a stylish haircut of your choice",
        description: "Professional barber services for a sharp and modern look",
        templateIds: [10, 13, 14, 15, 21, 22],
      },
      hairSalon: {
        subCategory: "Hair Salon",
        prefix: "I will",
        header: "style your hair to perfection",
        description: "Expert hairstyling and care tailored to your preferences",
        templateIds: [11, 16, 18, 39],
      },
      makeup: {
        subCategory: "Makeup Services",
        prefix: "I will",
        header: "create a stunning makeup look",
        description: "Professional makeup services for any occasion",
        templateIds: [12, 17, 38],
      },
      nail: {
        subCategory: "Nail Salon",
        prefix: "I will",
        header: "provide beautiful nail designs",
        description: "High-quality nail care and artistic designs",
        templateIds: [19, 20],
      },
      gym: {
        subCategory: "Gym Services",
        prefix: "I will",
        header: "help you achieve your fitness goals",
        description: "Personalized fitness training for all levels",
        templateIds: [23, 24, 27, 32, 33],
      },
      spa: {
        subCategory: "Spa Services",
        prefix: "I will",
        header: "offer a relaxing spa experience",
        description: "Luxurious spa treatments for relaxation and rejuvenation",
        templateIds: [25, 28, 29, 31, 36],
      },
      dental: {
        subCategory: "Dental Services",
        prefix: "I will",
        header: "provide expert dental care",
        description: "Comprehensive dental services for a healthy smile",
        templateIds: [26, 30, 34, 35, 37],
      },
    };

    const selectedService = Object.values(serviceTypes).find((service) =>
      service.templateIds.includes(templateId)
    );
    if (!selectedService) {
      showToast("Invalid template ID");
      setLoading(false);
      return;
    }

    const serviceMap = {
      10: barber,
      11: HairSalon,
      12: MakeUp,
      13: barber,
      14: barber,
      15: barber,
      16: HairSalon,
      17: MakeUp,
      18: HairSalon,
      19: Nail,
      20: Nail,
      21: barber,
      22: barber,
      23: gym,
      24: gym,
      25: spa,
      26: dental,
      27: gym,
      28: spa,
      29: spa,
      30: dental,
      31: spa,
      32: gym,
      33: gym,
      34: dental,
      35: dental,
      36: spa,
      37: dental,
      38: MakeUp,
      39: HairSalon
    };

    const selectedServiceData = serviceMap[templateId] || barber;
    const ecosystemDomain = userDetails.ecosystemDomain || "not available";
    const countryCode = localStorage.getItem("countryCode") || "NG";

    // Function to format services with country-specific price and currency
    const formatServices = (services, countryCode) => {
      return services.map((service) => {
        const priceInfo =
          service.price.find((p) => p.countryCode === countryCode) ||
          service.price.find((p) => p.countryCode === "NG");
        return {
          ...service,
          currency: priceInfo.currency,
          price: priceInfo.value,
        };
      });
    };

    try {
      const formattedServices = formatServices(
        selectedServiceData,
        countryCode
      );
      const servicePayload = {
        creatorId,
        ecosystemDomain,
        category: "Personal Care Service",
        subCategory: selectedService.subCategory,
        prefix: selectedService.prefix,
        header: selectedService.header,
        description: selectedService.description,
        format: "Onsite",
        currency: formattedServices[0]?.currency || "NGN",
        services: formattedServices,
        accessToken,
        refreshToken,
        dispatch,
        navigate,
      };
      console.log("Creating service payload:", servicePayload);
      await api.createServices(servicePayload);
      await handleSubmit();
      setLoading(false);
      navigate("/auth/subscriptions");
    } catch (error) {
      setLoading(false);
      console.error("Error creating service:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      showToast("Error creating service");
    }
  };

  const renderTemplate = (templateId) => {
    switch (templateId) {
      case 13:
        return <Barber2 userDetails={userDetails} />;
      case 10:
        return <BarberMordern userDetails={userDetails} />;
      case 11:
        return <HairstylistTemplate userDetails={userDetails} />;
      case 12:
        return <MakeupTemplate userDetails={userDetails} />;
      case 14:
        return <BarberPosh userDetails={userDetails} />;
      case 15:
        return <BlankTemplate userDetails={userDetails} />;
      case 16:
        return <SecondStylist userDetails={userDetails} />;
      case 17:
        return <SecondMakeup userDetails={userDetails} />;
      case 18:
        return <ThirdStylist userDetails={userDetails} />;
      case 19:
        return <FirstNail userDetails={userDetails} />;
      case 20:
        return <SecondNail userDetails={userDetails} />;
      case 21:
        return <BarberFourth userDetails={userDetails} />;
      case 22:
        return <BarberFresh userDetails={userDetails} />;
      case 23:
        return <GymTemplate1 userDetails={userDetails} />;
      case 24:
        return <GymTemplate2 userDetails={userDetails} />;
      case 25:
        return <Spa1 userDetails={userDetails} />;
      case 26:
        return <SecondDentist userDetails={userDetails} />;
      case 27:
        return <GymTemplate3 userDetails={userDetails} />;
      case 28:
        return <Spa3 userDetails={userDetails} />;
      case 29:
        return <Spa2 userDetails={userDetails} />;
      case 30:
        return <FirstDentist userDetails={userDetails} />;
      case 31:
        return <Spa4 userDetails={userDetails} />;
      case 32:
        return <GymTemplate4 userDetails={userDetails} />;
      case 33:
        return <GymTemplate5 userDetails={userDetails} />;
      case 34:
        return <ThirdDentist userDetails={userDetails} />;
      case 35:
        return <FourthDentist userDetails={userDetails} />;
      case 36:
        return <Spa5 userDetails={userDetails} />;
      case 37:
        return <FifthDentist userDetails={userDetails} />;
      case 38:
        return <ThirdMakeup userDetails={userDetails} />;
      case 39:
        return <FourthStylist userDetails={userDetails} />;
      default:
        return <div>Invalid template</div>;
    }
  };

  return (
    <div className="h-screen pb-20">
      <div className="w-full p-4">
        <ButtonSmallWhite
          className="rounded-xl"
          width="w-[100px]"
          padding="2"
          height="15"
          onClick={onBack}
        >
          Back
        </ButtonSmallWhite>
      </div>

      <Heading
        level={3}
        size="3xl"
        weight="600"
        className="justify-center text-[#2d1c4d] mt-10"
      >
        Preview The Selected Template
      </Heading>
      <Text className="text-gray-500 text-[16px] mt-3 mb-4">
        This is how the website will look structurally, text and images to be
        edited in a bit, scroll down to continue
      </Text>

      <div className="w-full">
        {templateLoading ? <LoadingMany /> : renderTemplate(templateId)}
      </div>
      <div className="mx-auto items-center mt-10 flex justify-center">
        <ButtonSmallPurple
          width="w-100px"
          className="mt-2 mb-10 px-4 py-2 bg-primary3 text-white rounded"
          onClick={handleContinue}
          disabled={loading}
        >
          {loading ? "Processing" : "Continue and Choose Plan"}
        </ButtonSmallPurple>
      </div>
    </div>
  );
};

export default PreviewTemplate;
