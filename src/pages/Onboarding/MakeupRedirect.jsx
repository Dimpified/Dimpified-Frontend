import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../pricing/CountryContext";
import Logo from "../LandingPages/images/dimp-blue.png";

const MakeupRedirect = () => {
  const { country } = useCountry();
  const navigate = useNavigate();

  useEffect(() => {
    if (!country) return;

    const routes = {
      US: "/us/makeup/onboarding",
      GB: "/uk/makeup/onboarding",
      CD: "/cd/makeup/onboarding",
      NG: "/ng/makeup/onboarding",
      GH: "/gh/makeup/onboarding",
      LR: "/lr/makeup/onboarding",
      SL: "/sl/makeup/onboarding",
      GM: "/gm/makeup/onboarding",
      ZA: "/za/makeup/onboarding",
      NA: "/na/makeup/onboarding",
      BW: "/bw/makeup/onboarding",
      ZW: "/zw/makeup/onboarding",
      KE: "/ke/makeup/onboarding",
      TZ: "/tz/makeup/onboarding",
      UG: "/ug/makeup/onboarding",
      RW: "/rw/makeup/onboarding",
      ET: "/et/makeup/onboarding",
      IN: "/in/makeup/onboarding",
      SG: "/sg/makeup/onboarding",
      PH: "/ph/makeup/onboarding",
      MY: "/my/makeup/onboarding",

      AT: "/eu/makeup/onboarding",
      BE: "/eu/makeup/onboarding",
      CY: "/eu/makeup/onboarding",
      EE: "/eu/makeup/onboarding",
      FI: "/eu/makeup/onboarding",
      FR: "/eu/makeup/onboarding",
      DE: "/eu/makeup/onboarding",
      GR: "/eu/makeup/onboarding",
      IE: "/eu/makeup/onboarding",
      IT: "/eu/makeup/onboarding",
      LV: "/eu/makeup/onboarding",
      LT: "/eu/makeup/onboarding",
      LU: "/eu/makeup/onboarding",
      MT: "/eu/makeup/onboarding",
      NL: "/eu/makeup/onboarding",
      PT: "/eu/makeup/onboarding",
      SK: "/eu/makeup/onboarding",
      SI: "/eu/makeup/onboarding",
      ES: "/eu/makeup/onboarding",

      default: "/us/makeup/onboarding",
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


export default MakeupRedirect;
