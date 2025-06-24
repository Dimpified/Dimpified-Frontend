import React, { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { initializeGA, logPageView } from "../api/analytics";
import Logo from "../assets/NewAuthImage/NewLogo.png";
import { CountryProvider } from "../pages/pricing/CountryContext";

const MakeupTemplate = lazy(() =>
  import("../pages/Templates/PersonalCare/makeup/MakeupTemplate")
);
const ThirdMakeup = lazy(() =>
  import("../pages/Templates/PersonalCare/makeup/ThirdMakeup")
);
const FourthMakeup = lazy(() =>
  import("../pages/Templates/PersonalCare/makeup/FourthMakeup")
);
const FifthMakeup = lazy(() =>
  import("../pages/Templates/PersonalCare/makeup/FifthMakeup")
);
const BarberMordern = lazy(() =>
  import("../pages/Templates/PersonalCare/Barber/BarberModern")
);

const BarberGents = lazy(() =>
  import("../pages/Templates/PersonalCare/Barber/BarberGents")
);
const WeddingTemplate = lazy(() =>
  import("../pages/Templates/Event-Services/Wedding")
);
const BarberPosh = lazy(() =>
  import("../pages/Templates/PersonalCare/Barber/BarberPosh")
);
const BarberFourth = lazy(() =>
  import("../pages/Templates/PersonalCare/Barber/BarberFourth")
);
const BlankTemplate = lazy(() =>
  import("../pages/Templates/Blank-Template/BlankTemplate")
);
const BarberFresh = lazy(() =>
  import("../pages/Templates/PersonalCare/Barber/BarberFresh")
);
const Barber2 = lazy(() =>
  import("../pages/Templates/PersonalCare/Barber/Barber2")
);
const HairstylistTemplate = lazy(() =>
  import("../pages/Templates/HairstylistTemplate")
);
const SecondStylist = lazy(() =>
  import("../pages/Templates/PersonalCare/Hairstylist/SecondStylist")
);
const SecondMakeup = lazy(() =>
  import("../pages/Templates/PersonalCare/makeup/SecondMakeup")
);
const FourthStylist = lazy(() =>
  import("../pages/Templates/PersonalCare/Hairstylist/FourthStylist")
);
const ThirdStylist = lazy(() =>
  import("../pages/Templates/PersonalCare/Hairstylist/ThirdStylist")
);

// NAIL IMPORTS
const FirstNail = lazy(() =>
  import("../pages/Templates/PersonalCare/nail/NailsTemplate")
);

const SecondNail = lazy(() =>
  import("../pages/Templates/PersonalCare/nail/SecondNail")
);
const ThirdNail = lazy(() =>
  import("../pages/Templates/PersonalCare/nail/ThirdNail")
);
const FourthNail = lazy(() =>
  import("../pages/Templates/PersonalCare/nail/FourthNail")
);
const FifthNail = lazy(() =>
  import("../pages/Templates/PersonalCare/nail/FifthNail")
);
const SixthNail = lazy(() =>
  import("../pages/Templates/PersonalCare/nail/SixthNail")
);

// GYM IMPORTS
const GymTemplate = lazy(() =>
  import("../pages/Templates/PersonalCare/gym/GymTemplate")
);
const SecondGym = lazy(() =>
  import("../pages/Templates/PersonalCare/gym/SecondGym")
);
const ThirdGym = lazy(() =>
  import("../pages/Templates/PersonalCare/gym/ThirdGym")
);

const FourthGym = lazy(() =>
  import("../pages/Templates/PersonalCare/gym/FourthGym")
);
const FifthGym = lazy(() =>
  import("../pages/Templates/PersonalCare/gym/FifthGym")
);
const SixthGym = lazy(() =>
  import("../pages/Templates/PersonalCare/gym/SixthGym")
);
const SeventhGym = lazy(() =>
  import("../pages/Templates/PersonalCare/gym/SeventhGym")
);

const FirstSpa = lazy(() =>
  import("../pages/Templates/PersonalCare/spa/FirstSpa")
);
const SecondSpa = lazy(() =>
  import("../pages/Templates/PersonalCare/spa/SecondSpa")
);
const ThirdSpa = lazy(() =>
  import("../pages/Templates/PersonalCare/spa/ThirdSpa")
);
const FourthSpa = lazy(() =>
  import("../pages/Templates/PersonalCare/spa/FourthSpa")
);
const FifthSpa = lazy(() =>
  import("../pages/Templates/PersonalCare/spa/FifthSpa")
);
const SixthSpa = lazy(() =>
  import("../pages/Templates/PersonalCare/spa/SixthSpa")
);
const SeventhSpa = lazy(() =>
  import("../pages/Templates/PersonalCare/spa/SeventhSpa")
);

const FirstDentist = lazy(() =>
  import("../pages/Templates/PersonalCare/dental/FirstDentist")
);
const SecondDentist = lazy(() =>
  import("../pages/Templates/PersonalCare/dental/SecondDentist")
);
const ThirdDentist = lazy(() =>
  import("../pages/Templates/PersonalCare/dental/ThirdDentist")
);
const FourthDentist = lazy(() =>
  import("../pages/Templates/PersonalCare/dental/FourthDentist")
);
const FifthDentist = lazy(() =>
  import("../pages/Templates/PersonalCare/dental/FifthDentist")
);
// import HairstylistTemplate from "../pages/Templates/HairstylistTemplate";

import UserLogin from "../pages/Authentication/RegisterUser/UserLogin";

// TEAM MEMBER AUTH
import TeamUserSignUp from "../pages/Authentication/TeamAuthentication/TeamUserSignUp";

import Overview from "../pages/CreatorDashBoard/Overview";
import AgentPage from "../pages/Affiiate/AgentPage";
import AgentPageAuthForm from "../pages/Affiiate/Authentication/AgentPageAuthForm";
import EmailVerify from "../pages/Affiiate/Authentication/VerifyEmail";
import AffiliateResetPassword from "../pages/Affiiate/Authentication/ResetPassword";
import RegistrationSuccess from "../pages/Affiiate/Authentication/RegistrationSuccess";
import AffliateDashboardIndex from "../pages/Affiiate/Dashboard/AgentDashboardIndex";
import AffiliateOverview from "../pages/Affiiate/Dashboard/AgentOverview";
import AffiliateMyUser from "../pages/Affiiate/Dashboard/AgentMyUser";
import AffiliateContractPage from "../pages/Affiiate/Dashboard/AgentContractPage";
import AffiliateWithdrawPayment from "../pages/Affiiate/Dashboard/WithdrawRequest";
import AffiliateOnboarding from "../pages/Affiiate/Dashboard/AgentOnboarding";

import ProfilePage from "../pages/Affiiate/Dashboard/ProfilePage";
import LoginModal from "./Modal/LoginModal";
import ForgotPassword from "../pages/Authentication/RegisterUser/ForgetPassword";
import ResetPassword from "../pages/Authentication/RegisterUser/NewPassword";
import EmailSignIn from "../pages/Authentication/RegisterUser/EmailLogin";

import VerifyPasswordCode from "../pages/Authentication/RegisterUser/VerifyPasswordCode";
import Payments from "../pages/CreatorDashBoard/Payments";
import Booking from "../pages/CreatorDashBoard/Booking";
import EditTemplate from "../pages/CreatorDashBoard/EditTemplate";
import EditService from "../pages/CreatorDashBoard/EditService";

import getSubdomain from "../helper/getSubdomain";
import MainTemplate from "../pages/UserTemplate/MainTemplate";
import CreateNewService from "./dashboard/editService/CreateNewService";
import CreatedServices from "./dashboard/editService/CreatedService";
import VideoGallery from "../pages/CreatorDashBoard/Watchdemo";
import CreatorProfile from "../pages/CreatorDashBoard/CreatorProfile";
import HelpCenter from "../pages/CreatorDashBoard/HelpCenter";
import UpdateSubscription from "../pages/CreatorDashBoard/UpgradeSubcription";
import Notification from "../pages/CreatorDashBoard/Notification";
import { ProtectedRoute } from "./ProtectedRoute";
import ManageCustomer from "../pages/CreatorDashBoard/ManageCustomer";
import Teams from "../pages/CreatorDashBoard/Teams";
import SupportTicket from "../pages/CreatorDashBoard/SupportTicket";
import BlockTime from "./dashboard/booking/BlockTimeOff/BlockTime";
import TeamMemberProfile from "../pages/CreatorDashBoard/TeamMemberProfile";
import Google from "../pages/Google/Google";
import SuccessPage from "./StripePricing/StripeSuccess";

//New Auth Import
import BasicInfo from "../pages/NewAuthentication/PersonalInfo/BasicInfo";
import EmailVerification from "../pages/NewAuthentication/PersonalInfo/EmailVerification";
import BusinessType from "../pages/NewAuthentication/PersonalInfo/BusinessType";
import BusinessInfo from "../pages/NewAuthentication/PersonalInfo/BusinessInfo";
import SelectTemplate from "../pages/NewAuthentication/SelectTemplateAndPayment/SelectTemplate";
import PreviewTemplate from "../pages/NewAuthentication/SelectTemplateAndPayment/PreviewTemplate";
import Subscriptions from "../pages/NewAuthentication/SelectTemplateAndPayment/Subscriptions";
import OnboardEditTemplate from "../pages/NewAuthentication/EditTemplate/OnboardEditTemplate";
import OnboardingPreviewTemplate from "../pages/NewAuthentication/EditTemplate/OnboardingPreviewTemplate";
import AuthLayout from "../pages/NewAuthentication/AuthLayout";

const TrackPageView = () => {
  const location = useLocation();

  useEffect(() => {
    logPageView(location.pathname + location.search);
  }, [location]);

  return null;
};

const AllRoutes = () => {
  const ecosystemDomain = getSubdomain();
  useEffect(() => {
    initializeGA();
  }, []);

  useEffect(() => {
    // Optional: Add logic to remove the loading animation after a delay
    const timer = setTimeout(() => {
      const logoSpinner = document.getElementById("logo-spinner");
      if (logoSpinner) {
        logoSpinner.style.display = "none";
      }
    }, 3000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <TrackPageView />
      <CountryProvider>
        <Suspense
          fallback={
            <div
              id="logo-spinner"
              className="fixed inset-0 flex items-center justify-center z-50 bg-white"
            >
              {/* Logo or icon to animate */}
              <div className="animate-pulse h-24 w-24" id="logo-animation">
                <img src={Logo} alt="Logo" className="w-96 h-auto" />
              </div>
            </div>
          }
        >
          <Routes>
            {ecosystemDomain ? (
              <Route
                path="/"
                element={<MainTemplate subdomain={ecosystemDomain} />}
              />
            ) : (
              <Route path="/" element={<UserLogin />} />
            )}

            <Route path="/" element={<UserLogin />} />
            <Route
              path="/auth/signUp/Team-Member/:email"
              element={<TeamUserSignUp />}
            />
            <Route path="/googleb978a18bdb7000d2.html" element={<Google />} />
            <Route path="/login" element={<LoginModal />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/creator/reset-password/:email"
              element={<ResetPassword />}
            />
            <Route path="/creator/Email-Signin" element={<EmailSignIn />} />
            <Route
              path="/creator/PasswordCode-Verification/:email"
              element={<VerifyPasswordCode />}
            />

            <Route path="/auth" element={<AuthLayout />}>
              {/* Personal Info Flow (steps 1-4) */}
              <Route path="personal-Information" element={<BasicInfo />} />
              <Route
                path="email-verification"
                element={<EmailVerification />}
              />
              <Route path="business-type" element={<BusinessType />} />
              <Route path="business-info" element={<BusinessInfo />} />

              {/* Template Selection Flow */}
              <Route path="select-template" element={<SelectTemplate />} />
              <Route path="preview-template" element={<PreviewTemplate />} />
              <Route path="subscriptions" element={<Subscriptions />} />

              {/* Template Editing Flow */}
              <Route path="edit-template" element={<OnboardEditTemplate />} />
              <Route
                path="preview-edited"
                element={<OnboardingPreviewTemplate />}
              />
            </Route>

            <Route path="/login" element={<LoginModal />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/creator/reset-password/:email"
              element={<ResetPassword />}
            />
            <Route
              path="/check-subscription-status/:email"
              element={<SuccessPage />}
            />
            <Route path="/creator/Email-Signin" element={<EmailSignIn />} />
            <Route
              path="/creator/PasswordCode-Verification/:email"
              element={<VerifyPasswordCode />}
            />
            {/* CREATOR DASHBOARD */}
            <Route element={<ProtectedRoute />}>
              <Route
                path="/creator/dashboard/overview"
                element={<Overview />}
              />
              <Route
                path="/creator/dashboard/payments"
                element={<Payments />}
              />
              <Route path="/creator/dashboard/booking" element={<Booking />} />
              <Route
                path="/creator/dashboard/booking-time-off"
                element={<BlockTime />}
              />
              <Route
                path="/creator/dashboard/manage-customer"
                element={<ManageCustomer />}
              />
              <Route path="/creator/dashboard/teams" element={<Teams />} />
              <Route
                path="/creator/dashboard/support-ticket"
                element={<SupportTicket />}
              />
              <Route
                path="/creator/dashboard/edit-template"
                element={<EditTemplate />}
              />
              <Route
                path="/creator/dashboard/edit-service"
                element={<EditService />}
              />
              <Route
                path="/creator/dashboard/create-service"
                element={<CreateNewService />}
              />
              <Route
                path="/creator/dashboard/created-service"
                element={<CreatedServices />}
              />
              <Route
                path="/creator/dashboard/watch-demo"
                element={<VideoGallery />}
              />
              <Route
                path="/creator/dashboard/notification"
                element={<Notification />}
              />
              <Route
                path="/creator/dashboard/profile"
                element={<CreatorProfile />}
              />
              <Route
                path="/creator/dashboard/Team-profile"
                element={<TeamMemberProfile />}
              />
              <Route
                path="/creator/dashboard/help-center"
                element={<HelpCenter />}
              />
              <Route
                path="/creator/dashboard/Subscription"
                element={<UpdateSubscription />}
              />
            </Route>
            {/* PERSONAL CARE TEMPLATES */}
            <Route
              path="/templates/barber-mordern"
              element={<BarberMordern />}
            />
            <Route path="/templates/barbergent" element={<BarberGents />} />
            <Route path="/templates/barbertwo" element={<Barber2 />} />
            <Route
              path="/templates/barberposh-template"
              element={<BarberPosh />}
            />
            <Route path="/templates/barberfour" element={<BarberFourth />} />
            <Route path="/templates/barberfresh" element={<BarberFresh />} />
            {/* MAKEUP TEMPLATE */}
            <Route
              path="/templates/makeup-template"
              element={<MakeupTemplate />}
            />
            <Route path="/templates/thirdmakeup" element={<ThirdMakeup />} />
            <Route path="/templates/fourthmakeup" element={<FourthMakeup />} />
            <Route path="/templates/fifthmakeup" element={<FifthMakeup />} />
            <Route path="/templates/secondmakeup" element={<SecondMakeup />} />
            {/* WEDDING TEMPLATE */}
            <Route
              path="/templates/wedding-template"
              element={<WeddingTemplate />}
            />
            <Route path="/templates/blank" element={<BlankTemplate />} />
            {/* HAIRSTYLIST TEMPLATE  */}
            <Route
              path="/templates/hair-template"
              element={<HairstylistTemplate />}
            />
            <Route
              path="/templates/secondstylist"
              element={<SecondStylist />}
            />
            <Route path="/templates/thirdstylist" element={<ThirdStylist />} />
            <Route
              path="/templates/fourthstylist"
              element={<FourthStylist />}
            />
            {/* Nail Templates */}
            <Route path="/templates/firstnail" element={<FirstNail />} />
            <Route path="/templates/secondnail" element={<SecondNail />} />
            <Route path="/templates/thirdnail" element={<ThirdNail />} />
            <Route path="/templates/fourthnail" element={<FourthNail />} />
            <Route path="/templates/fifthnail" element={<FifthNail />} />
            <Route path="/templates/sixthnail" element={<SixthNail />} />
            {/* GYM TEMPLATE */}
            <Route path="/templates/firstgym" element={<GymTemplate />} />
            <Route path="/templates/secondgym" element={<SecondGym />} />
            <Route path="/templates/thirdgym" element={<ThirdGym />} />
            <Route path="/templates/fourthgym" element={<FourthGym />} />
            <Route path="/templates/fifthgym" element={<FifthGym />} />
            <Route path="/templates/sixthgym" element={<SixthGym />} />
            <Route path="/templates/seventhgym" element={<SeventhGym />} />
            {/* SPA TEMPLATE */}
            <Route path="/templates/firstspa" element={<FirstSpa />} />
            <Route path="/templates/sixthspa" element={<SixthSpa />} />
            <Route path="/templates/secondspa" element={<SecondSpa />} />
            <Route path="/templates/thirdspa" element={<ThirdSpa />} />
            <Route path="/templates/thirdspa" element={<ThirdSpa />} />
            <Route path="/templates/fourthspa" element={<FourthSpa />} />
            <Route path="/templates/fifthspa" element={<FifthSpa />} />
            {/* DENTIST TEMPLATES */}
            <Route path="/templates/firstdentist" element={<FirstDentist />} />
            <Route
              path="/templates/seconddentist"
              element={<SecondDentist />}
            />
            <Route path="/templates/thirddentist" element={<ThirdDentist />} />
            <Route
              path="/templates/fourthdentist"
              element={<FourthDentist />}
            />
            <Route path="/templates/fifthdentist" element={<FifthDentist />} />
            {/* AGENT/AFFLIATE PAGE */}
            <Route path="/affiliate/auth" element={<AgentPageAuthForm />} />
            <Route path="/affiliate" element={<AgentPage />} />
            <Route path="/affiliate/verify-email" element={<EmailVerify />} />
            <Route
              path="/affiliate/reset-password"
              element={<AffiliateResetPassword />}
            />
            <Route
              path="/registration-success"
              element={<RegistrationSuccess />}
            />
            <Route element={<AffliateDashboardIndex />}>
              {/* Affiliate Dashboard */}
              <Route
                path="/affiliate/dashboard/overview"
                element={<AffiliateOverview />}
              />
              <Route
                path="/affiliate/dashboard/my-user"
                element={<AffiliateMyUser />}
              />
              <Route
                path="/affiliate/dashboard/earning"
                element={<AffiliateContractPage />}
              />
              <Route
                path="/affiliate/dashboard/Withdraw"
                element={<AffiliateWithdrawPayment />}
              />
              <Route
                path="/affiliate/dashboard/onboard"
                element={<AffiliateOnboarding />}
              />
              <Route
                path="/affiliate/dashboard/profile"
                element={<ProfilePage />}
              />
            </Route>
          </Routes>
        </Suspense>
      </CountryProvider>
    </>
  );
};

export default AllRoutes;
