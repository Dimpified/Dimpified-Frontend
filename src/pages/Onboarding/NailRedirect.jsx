import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../pricing/CountryContext";
import Logo from "../LandingPages/images/dimp-blue.png";

const NailRedirect = () => {
  const { country } = useCountry();
  const navigate = useNavigate();

  useEffect(() => {
    if (!country) return;

    const routes = {
      US: "/us/nails/onboarding",
      GB: "/uk/nails/onboarding",
      CD: "/cd/nails/onboarding",
      NG: "/ng/nails/onboarding",
      GH: "/gh/nails/onboarding",
      LR: "/lr/nails/onboarding",
      SL: "/sl/nails/onboarding",
      GM: "/gm/nails/onboarding",
      ZA: "/za/nails/onboarding",
      NA: "/na/nails/onboarding",
      BW: "/bw/nails/onboarding",
      ZW: "/zw/nails/onboarding",
      KE: "/ke/nails/onboarding",
      TZ: "/tz/nails/onboarding",
      UG: "/ug/nails/onboarding",
      RW: "/rw/nails/onboarding",
      ET: "/et/nails/onboarding",
      IN: "/in/nails/onboarding",
      SG: "/sg/nails/onboarding",
      PH: "/ph/nails/onboarding",
      MY: "/my/nails/onboarding",

      AT: "/eu/nails/onboarding",
      BE: "/eu/nails/onboarding",
      CY: "/eu/nails/onboarding",
      EE: "/eu/nails/onboarding",
      FI: "/eu/nails/onboarding",
      FR: "/eu/nails/onboarding",
      DE: "/eu/nails/onboarding",
      GR: "/eu/nails/onboarding",
      IE: "/eu/nails/onboarding",
      IT: "/eu/nails/onboarding",
      LV: "/eu/nails/onboarding",
      LT: "/eu/nails/onboarding",
      LU: "/eu/nails/onboarding",
      MT: "/eu/nails/onboarding",
      NL: "/eu/nails/onboarding",
      PT: "/eu/nails/onboarding",
      SK: "/eu/nails/onboarding",
      SI: "/eu/nails/onboarding",
      ES: "/eu/nails/onboarding",

      default: "/us/nails/onboarding",
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

export default NailRedirect;
