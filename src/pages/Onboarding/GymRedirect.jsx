import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../pricing/CountryContext";
import Logo from "../LandingPages/images/dimp-blue.png";

const GymRedirect = () => {
  const { country } = useCountry();
  const navigate = useNavigate();

  useEffect(() => {
    if (!country) return;

    const routes = {
      US: "/us/gym/onboarding",
      GB: "/uk/gym/onboarding",
      CD: "/cd/gym/onboarding",
      NG: "/ng/gym/onboarding",
      GH: "/gh/gym/onboarding",
      LR: "/lr/gym/onboarding",
      SL: "/sl/gym/onboarding",
      GM: "/gm/gym/onboarding",
      ZA: "/za/gym/onboarding",
      NA: "/na/gym/onboarding",
      BW: "/bw/gym/onboarding",
      ZW: "/zw/gym/onboarding",
      KE: "/ke/gym/onboarding",
      TZ: "/tz/gym/onboarding",
      UG: "/ug/gym/onboarding",
      RW: "/rw/gym/onboarding",
      ET: "/et/gym/onboarding",
      IN: "/in/gym/onboarding",
      SG: "/sg/gym/onboarding",
      PH: "/ph/gym/onboarding",
      MY: "/my/gym/onboarding",

      AT: "/eu/gym/onboarding",
      BE: "/eu/gym/onboarding",
      CY: "/eu/gym/onboarding",
      EE: "/eu/gym/onboarding",
      FI: "/eu/gym/onboarding",
      FR: "/eu/gym/onboarding",
      DE: "/eu/gym/onboarding",
      GR: "/eu/gym/onboarding",
      IE: "/eu/gym/onboarding",
      IT: "/eu/gym/onboarding",
      LV: "/eu/gym/onboarding",
      LT: "/eu/gym/onboarding",
      LU: "/eu/gym/onboarding",
      MT: "/eu/gym/onboarding",
      NL: "/eu/gym/onboarding",
      PT: "/eu/gym/onboarding",
      SK: "/eu/gym/onboarding",
      SI: "/eu/gym/onboarding",
      ES: "/eu/gym/onboarding",

      default: "/us/gym/onboarding",
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

export default GymRedirect;
