import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCountry } from "../../pages/pricing/CountryContext";
import Logo from "../LandingPages/images/dimp-blue.png";

const PricingRedirect = () => {
  const { country } = useCountry();
  const navigate = useNavigate();

  useEffect(() => {
    if (!country) return;

    const routes = {
      US: "/us/pricing",
      GB: "/uk/pricing",
      CA: "/ca/pricing",
      NG: "/ng/pricing",
      GH: "/gh/pricing",
      LR: "/lr/pricing",
      SL: "/sl/pricing",
      GM: "/gm/pricing",
      ZA: "/za/pricing",
      NA: "/na/pricing",
      BW: "/bw/pricing",
      ZW: "/zw/pricing",
      KE: "/ke/pricing",
      TZ: "/tz/pricing",
      UG: "/ug/pricing",
      RW: "/rw/pricing",
      ET: "/et/pricing",
      IN: "/in/pricing",
      SG: "/sg/pricing",
      PH: "/ph/pricing",
      MY: "/my/pricing",

      AT: "/eu/pricing",
      BE: "/eu/pricing",
      CY: "/eu/pricing",
      EE: "/eu/pricing",
      FI: "/eu/pricing",
      FR: "/eu/pricing",
      DE: "/eu/pricing",
      GR: "/eu/pricing",
      IE: "/eu/pricing",
      IT: "/eu/pricing",
      LV: "/eu/pricing",
      LT: "/eu/pricing",
      LU: "/eu/pricing",
      MT: "/eu/pricing",
      NL: "/eu/pricing",
      PT: "/eu/pricing",
      SK: "/eu/pricing",
      SI: "/eu/pricing",
      ES: "/eu/pricing",

      default: "/ng/pricing",
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

export default PricingRedirect;
