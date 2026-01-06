import { useState, useEffect } from "react";
import Dimp from "../../pages/LandingPages/images/dimp-blue.png";
import Banner from "../../pages/LandingPages/images/base-banner.png";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Link } from "react-router-dom";

const MerchantBannerWithQR = () => {
  const [containerHeight, setContainerHeight] = useState("500px"); // Default height for mobile
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [qrcode, setQrcode] = useState("");
  const [darkColor, setDarkColor] = useState("#500073");
  const [lightColor, setLightColor] = useState("#FFFFFFFF");
  const [logo, setLogo] = useState(null);
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const [inputError, setInputError] = useState(false);

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth >= 1024) {
        setContainerHeight("100vh");
      } else if (window.innerWidth >= 400) {
        setContainerHeight("500px");
      } else {
        setContainerHeight("470px");
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  useEffect(() => {
    const generateQRCode = () => {
      if (!url) {
        setQrcode("");
        return;
      }

      if (url.length > 100) {
        setError("Link or text cannot exceed 100 characters!");
        setQrcode("");
        return;
      }

      setError("");

      QRCode.toDataURL(
        url,
        {
          width: 800,
          margin: 0,
          color: {
            dark: darkColor,
            light: lightColor,
          },
        },
        (err, qrUrl) => {
          if (err) {
            console.error(err);
            return;
          }

          if (logo) {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            const img = new Image();
            img.src = qrUrl;

            img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.drawImage(img, 0, 0);

              const centerX = canvas.width / 2;
              const centerY = canvas.height / 2;
              const radius = 50;

              ctx.fillStyle = "#ffffff";
              ctx.beginPath();
              ctx.arc(centerX, centerY, radius + 4, 0, Math.PI * 2);
              ctx.fill();

              const logoImg = new Image();
              logoImg.src = URL.createObjectURL(logo);

              logoImg.onload = () => {
                ctx.drawImage(
                  logoImg,
                  centerX - radius,
                  centerY - radius,
                  radius * 2,
                  radius * 2
                );
                setQrcode(canvas.toDataURL());
              };
            };
          } else {
            setQrcode(qrUrl);
          }
        }
      );
    };

    generateQRCode();
  }, [url, name, darkColor, lightColor, logo]);

  const handleDownload = () => {
    if (!isFormValid) {
      setInputError(true);
      return;
    }

    setInputError(false);
    const element = document.getElementById("printable-area");

    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(name + " banner.pdf");
      setDownloaded(true);
    });
  };

  const isFormValid = url.trim() && name.trim(); // Check if both fields are filled

  return (
    <>
      <div className="flex flex-col items-center justify-center lg:bg-[#f5f5f5] bg-white font-Urbanist text-black lg:px-0 px-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 w-full lg:mt-16 lg:mb-12 my-10 max-w-7xl mx-auto lg:shadow-lg ">
          <div className="relative lg:p-16 px-4 bg-white rounded-xl">
            <Link to="/merchants">
              <img
                src={Dimp}
                alt="Logo"
                className="h-6 mb-6 rounded-xl w-auto "
              />
            </Link>

            <h1 className="text-3xl mb-4 font-medium tracking-wide">
              Merchant Banner Generator
            </h1>
            <p className="text-gray-400 mb-8">
              Please use a laptop or phone to generate for the best result.
            </p>
            <div className="mb-4">
              <label htmlFor="url" className="block mb-4 text-sm">
                Enter your link or text (100 characters max.)
              </label>
              <input
                type="text"
                placeholder="e.g. https://folabarber.dimpified.com"
                value={url}
                maxLength={100}
                onChange={(evt) => setUrl(evt.target.value)}
                className={`w-full px-6 py-3 bg-[#f5f5f5] text-black border-2 rounded-full 
                  focus:ring-0 focus:outline-none ${
                    inputError ? "border-red-500 focus:ring-red-500" : ""
                  }`}
              />

              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block mb-4 text-sm">
                Enter your business name (100 characters max.)
              </label>
              <input
                type="text"
                placeholder="e.g. Fola Barbing Salon"
                value={name}
                maxLength={100}
                onChange={(evt) => setName(evt.target.value)}
                className={`w-full px-6 py-3 bg-[#f5f5f5] text-black border-2 rounded-full 
                  focus:ring-0 focus:outline-none ${
                    inputError ? "border-red-500 focus:ring-red-500" : ""
                  }`}
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div className="mb-4">
              <label htmlFor="logo" className="block mb-4 text-sm">
                Upload Your Business Logo (Optional)
              </label>
              <div className="relative">
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={(evt) => {
                    setLogo(evt.target.files[0]);
                    setFileName(evt.target.files[0]?.name || "");
                  }}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <button
                  type="button"
                  className="w-full px-6 py-3 bg-[#f5f5f5] text-black rounded-full focus:outline-none focus:ring-2 focus:ring-[#fffffe]"
                >
                  Choose File
                </button>
              </div>
              {fileName && (
                <p className="text-sm text-sec10 mt-2">Logo Name: {fileName}</p>
              )}
              <div className="justify-center items-center flex mt-12">
                <button
                  onClick={handleDownload}
                  disabled={!isFormValid || downloaded}
                  className={`w-full my-6 py-3 text-center bg-[#500073] hover:bg-yellow-500 transition text-white rounded-full font-semibold 
    ${!isFormValid ? "opacity-50 cursor-not-allowed" : ""} 
    ${inputError ? "ring-2 ring-red-500" : ""}`}
                >
                  {downloaded ? "Downloaded" : "Download as PDF"}
                </button>
              </div>
              {downloaded && (
                <p className="text-green-500 text-sm text-center mt-6">
                  Your business booking banner has been downloaded successfully!
                </p>
              )}
            </div>
          </div>

          <div className="lg:px-16 lg:py-14 px-4 bg-white rounded-e-xl">
            <p className="text-center py-4">
              Your Dimpified booking banner will appear below:
            </p>
            <div
              id="printable-area"
              className="bg-cover lg:h-screen h-[500px] relative px-4"
              style={{
                backgroundImage: `url(${Banner})`,
                height: containerHeight,
              }}
            >
              {qrcode && (
                <>
                  <div
                    className="absolute inset-x-0 flex justify-center items-center"
                    style={{ top: "10%" }}
                  >
                    <img
                      src={Dimp}
                      alt="Dimp"
                      className="lg:h-5 h-3 rounded-xl w-auto"
                    />
                  </div>

                  <div
                    className="absolute inset-x-0 flex justify-center items-center"
                    style={{ top: "16%" }}
                  >
                    <h2 className="text-center text-[#500073] lg:text-[2rem] text-[1.4rem] font-bold">
                      We accept online bookings
                    </h2>
                  </div>

                  <div
                    className="absolute inset-x-0 flex justify-center items-center"
                    style={{ top: "30%" }}
                  >
                    <div className="bg-[#500073] pb-4 px-4 rounded-lg">
                      <h2 className="text-center text-white lg:text-[1.5rem] text-[1rem] pb-3 pt-[-1rem]  font-semibold">
                        SCAN HERE
                      </h2>
                      <div className="bg-white p-3 rounded-lg">
                        <img
                          src={qrcode}
                          alt="QR Code"
                          className="h-40  p-1 lg:h-64 rounded-xl w-auto"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="absolute inset-x-0 flex justify-center items-center"
                    style={{ top: "82%" }}
                  >
                    <h2 className="text-[#500073] text-xs lg:text-sm ">
                      or visit:
                    </h2>
                  </div>

                  <div
                    className="absolute inset-x-0 flex justify-center items-center"
                    style={{ top: "86%" }}
                  >
                    <h2 className="text-[#500073] lg:text-xl text-sm lowercase font-semibold">
                      {url}
                    </h2>
                  </div>

                  <div
                    className="absolute inset-x-0 flex justify-center items-center"
                    style={{ top: "95%" }}
                  >
                    <h2 className="text-center lg:text-sm text-xs text-white">
                      Thank you for choosing {name}
                    </h2>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MerchantBannerWithQR;
