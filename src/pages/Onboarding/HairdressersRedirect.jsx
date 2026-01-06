import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../pricing/CountryContext";
import Logo from "../LandingPages/images/dimp-blue.png";

const hairdressersRedirect = () => {
  const { country } = useCountry();
  const navigate = useNavigate();

  useEffect(() => {
    if (!country) return;

    const routes = {
      US: "/us/hairdressers/onboarding",
      GB: "/uk/hairdressers/onboarding",
      CD: "/cd/hairdressers/onboarding",
      NG: "/ng/hairdressers/onboarding",
      GH: "/gh/hairdressers/onboarding",
      LR: "/lr/hairdressers/onboarding",
      SL: "/sl/hairdressers/onboarding",
      GM: "/gm/hairdressers/onboarding",
      ZA: "/za/hairdressers/onboarding",
      NA: "/na/hairdressers/onboarding",
      BW: "/bw/hairdressers/onboarding",
      ZW: "/zw/hairdressers/onboarding",
      KE: "/ke/hairdressers/onboarding",
      TZ: "/tz/hairdressers/onboarding",
      UG: "/ug/hairdressers/onboarding",
      RW: "/rw/hairdressers/onboarding",
      ET: "/et/hairdressers/onboarding",
      IN: "/in/hairdressers/onboarding",
      SG: "/sg/hairdressers/onboarding",
      PH: "/ph/hairdressers/onboarding",
      MY: "/my/hairdressers/onboarding",

      AT: "/eu/hairdressers/onboarding",
      BE: "/eu/hairdressers/onboarding",
      CY: "/eu/hairdressers/onboarding",
      EE: "/eu/hairdressers/onboarding",
      FI: "/eu/hairdressers/onboarding",
      FR: "/eu/hairdressers/onboarding",
      DE: "/eu/hairdressers/onboarding",
      GR: "/eu/hairdressers/onboarding",
      IE: "/eu/hairdressers/onboarding",
      IT: "/eu/hairdressers/onboarding",
      LV: "/eu/hairdressers/onboarding",
      LT: "/eu/hairdressers/onboarding",
      LU: "/eu/hairdressers/onboarding",
      MT: "/eu/hairdressers/onboarding",
      NL: "/eu/hairdressers/onboarding",
      PT: "/eu/hairdressers/onboarding",
      SK: "/eu/hairdressers/onboarding",
      SI: "/eu/hairdressers/onboarding",
      ES: "/eu/hairdressers/onboarding",

      default: "/us/hairdressers/onboarding",
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

export default hairdressersRedirect;
