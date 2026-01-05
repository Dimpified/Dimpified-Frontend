import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../pricing/CountryContext";
import Logo from "../LandingPages/images/dimp-blue.png";

const DentistRedirect = () => {
  const { country } = useCountry();
  const navigate = useNavigate();

  useEffect(() => {
    if (!country) return;

    const routes = {
      US: "/us/dentist/onboarding",
      GB: "/uk/dentist/onboarding",
      CD: "/cd/dentist/onboarding",
      NG: "/ng/dentist/onboarding",
      GH: "/gh/dentist/onboarding",
      LR: "/lr/dentist/onboarding",
      SL: "/sl/dentist/onboarding",
      GM: "/gm/dentist/onboarding",
      ZA: "/za/dentist/onboarding",
      NA: "/na/dentist/onboarding",
      BW: "/bw/dentist/onboarding",
      ZW: "/zw/dentist/onboarding",
      KE: "/ke/dentist/onboarding",
      TZ: "/tz/dentist/onboarding",
      UG: "/ug/dentist/onboarding",
      RW: "/rw/dentist/onboarding",
      ET: "/et/dentist/onboarding",
      IN: "/in/dentist/onboarding",
      SG: "/sg/dentist/onboarding",
      PH: "/ph/dentist/onboarding",
      MY: "/my/dentist/onboarding",

      AT: "/eu/dentist/onboarding",
      BE: "/eu/dentist/onboarding",
      CY: "/eu/dentist/onboarding",
      EE: "/eu/dentist/onboarding",
      FI: "/eu/dentist/onboarding",
      FR: "/eu/dentist/onboarding",
      DE: "/eu/dentist/onboarding",
      GR: "/eu/dentist/onboarding",
      IE: "/eu/dentist/onboarding",
      IT: "/eu/dentist/onboarding",
      LV: "/eu/dentist/onboarding",
      LT: "/eu/dentist/onboarding",
      LU: "/eu/dentist/onboarding",
      MT: "/eu/dentist/onboarding",
      NL: "/eu/dentist/onboarding",
      PT: "/eu/dentist/onboarding",
      SK: "/eu/dentist/onboarding",
      SI: "/eu/dentist/onboarding",
      ES: "/eu/dentist/onboarding",

      default: "/us/dentist/onboarding",
    };

    const redirectRoute = routes[country] || routes.default;
    navigate(redirectRoute);
  }, [country, navigate]);

  return (
    <div
      id="logo-spinner"
      className="fixed inset-0 flex items-center justify-center z-50 bg-white"
    >
      {/* Logo or icon to animate */}
      <div className="animate-pulse h-24 w-24" id="logo-animation">
        <img src={Logo} alt="Logo" className="w-96 h-auto" />
      </div>
    </div>
  );
};

export default DentistRedirect;
