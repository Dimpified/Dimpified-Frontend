import { Fragment, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AppConfigContext } from "../context/Context";
import LightModeIcon from "../../assets/sun.svg";
import DarkModeIcon from "../../assets/moon.svg";
import useLocalStorage from "../hooks/useLocalStorage";

const DarkLightMode = ({ className }) => {
  const ConfigContext = useContext(AppConfigContext);
  const { storageValue, setStorageValue, getStorageValue } = useLocalStorage(
    "skin",
    ConfigContext?.appStats?.skin ?? "light" // Using optional chaining and nullish coalescing
  );

  useEffect(() => {
    document
      .querySelector("html")
      .setAttribute("data-theme", getStorageValue("skin", "light"));
    ConfigContext?.setAppConfig(storageValue); // Using optional chaining
  }, [storageValue, ConfigContext]);

  const changeColorMode = () => {
    const newSkin = storageValue === "light" ? "dark" : "light";
    setStorageValue(newSkin);
    ConfigContext?.setAppConfig(newSkin); // Using optional chaining
  };

  return (
    <Fragment>
      <Link
        to="#"
        id="flexSwitchCheckDefault"
        onClick={changeColorMode}
        className={`inline-block p-2 bg-gray-100 dark:bg-gray-800 rounded-full shadow-sm ${className}`}
      >
        {/* Hidden input for checkbox */}
        <input
          type="checkbox"
          checked={storageValue === "dark"}
          className="hidden"
        />
        <span className="cursor-pointer">
          <img
            src={storageValue === "dark" ? DarkModeIcon : LightModeIcon}
            alt="Dark/Light Mode Icon"
            className="h-6 w-6"
          />
        </span>
      </Link>
    </Fragment>
  );
};

export default DarkLightMode;
