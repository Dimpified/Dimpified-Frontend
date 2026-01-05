import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../pricing/CountryContext";
import Logo from "../LandingPages/images/dimp-blue.png";

const SpaRedirect = () => {
  const { country } = useCountry();
  const navigate = useNavigate();

  useEffect(() => {
    if (!country) return;

    const routes = {
      US: "/us/spa/onboarding",
      GB: "/uk/spa/onboarding",
      CD: "/cd/spa/onboarding",
      NG: "/ng/spa/onboarding",
      GH: "/gh/spa/onboarding",
      LR: "/lr/spa/onboarding",
      SL: "/sl/spa/onboarding",
      GM: "/gm/spa/onboarding",
      ZA: "/za/spa/onboarding",
      NA: "/na/spa/onboarding",
      BW: "/bw/spa/onboarding",
      ZW: "/zw/spa/onboarding",
      KE: "/ke/spa/onboarding",
      TZ: "/tz/spa/onboarding",
      UG: "/ug/spa/onboarding",
      RW: "/rw/spa/onboarding",
      ET: "/et/spa/onboarding",
      IN: "/in/spa/onboarding",
      SG: "/sg/spa/onboarding",
      PH: "/ph/spa/onboarding",
      MY: "/my/spa/onboarding",

      AT: "/eu/spa/onboarding",
      BE: "/eu/spa/onboarding",
      CY: "/eu/spa/onboarding",
      EE: "/eu/spa/onboarding",
      FI: "/eu/spa/onboarding",
      FR: "/eu/spa/onboarding",
      DE: "/eu/spa/onboarding",
      GR: "/eu/spa/onboarding",
      IE: "/eu/spa/onboarding",
      IT: "/eu/spa/onboarding",
      LV: "/eu/spa/onboarding",
      LT: "/eu/spa/onboarding",
      LU: "/eu/spa/onboarding",
      MT: "/eu/spa/onboarding",
      NL: "/eu/spa/onboarding",
      PT: "/eu/spa/onboarding",
      SK: "/eu/spa/onboarding",
      SI: "/eu/spa/onboarding",
      ES: "/eu/spa/onboarding",

      default: "/us/spa/onboarding",
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

export default SpaRedirect;
