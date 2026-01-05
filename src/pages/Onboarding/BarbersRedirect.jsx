import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../pricing/CountryContext";
import Logo from "../LandingPages/images/dimp-blue.png";

const BarbersRedirect = () => {
  const { country } = useCountry();
  const navigate = useNavigate();

  useEffect(() => {
    if (!country) return;

    const routes = {
      US: "/us/barbers/onboarding",
      GB: "/uk/barbers/onboarding",
      CD: "/cd/barbers/onboarding",
      NG: "/ng/barbers/onboarding",
      GH: "/gh/barbers/onboarding",
      LR: "/lr/barbers/onboarding",
      SL: "/sl/barbers/onboarding",
      GM: "/gm/barbers/onboarding",
      ZA: "/za/barbers/onboarding",
      NA: "/na/barbers/onboarding",
      BW: "/bw/barbers/onboarding",
      ZW: "/zw/barbers/onboarding",
      KE: "/ke/barbers/onboarding",
      TZ: "/tz/barbers/onboarding",
      UG: "/ug/barbers/onboarding",
      RW: "/rw/barbers/onboarding",
      ET: "/et/barbers/onboarding",
      IN: "/in/barbers/onboarding",
      SG: "/sg/barbers/onboarding",
      PH: "/ph/barbers/onboarding",
      MY: "/my/barbers/onboarding",

      AT: "/eu/barbers/onboarding",
      BE: "/eu/barbers/onboarding",
      CY: "/eu/barbers/onboarding",
      EE: "/eu/barbers/onboarding",
      FI: "/eu/barbers/onboarding",
      FR: "/eu/barbers/onboarding",
      DE: "/eu/barbers/onboarding",
      GR: "/eu/barbers/onboarding",
      IE: "/eu/barbers/onboarding",
      IT: "/eu/barbers/onboarding",
      LV: "/eu/barbers/onboarding",
      LT: "/eu/barbers/onboarding",
      LU: "/eu/barbers/onboarding",
      MT: "/eu/barbers/onboarding",
      NL: "/eu/barbers/onboarding",
      PT: "/eu/barbers/onboarding",
      SK: "/eu/barbers/onboarding",
      SI: "/eu/barbers/onboarding",
      ES: "/eu/barbers/onboarding",

      default: "/us/barbers/onboarding",
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

export default BarbersRedirect;
