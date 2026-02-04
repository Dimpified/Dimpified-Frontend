import { Mail } from "lucide-react";
import PaidOnboardingImage from "../../../assets/FreeBooking/FreeAuthImage.png";
import Logo from "../../../assets/NewAuthImage/NewLogo.png";
import { Link as Route } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export default function PaidOnboardingPreSignup() {
  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log("Google login success:", tokenResponse);
      // Handle successful login here
      // You can send the token to your backend for verification
    },
    onError: (error) => {
      console.error("Google login failed:", error);
      // Handle login error here
    },
  });
  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex">
      {/* Purple decorative blob - left */}
      <div className="absolute top-[40%] left-[-50px] w-32 h-32 md:w-48 md:h-48">
        <svg
          className="w-full h-full opacity-80"
          viewBox="0 0 100 196"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-16.9349 12.5146C-11.8105 -4.1717 11.8105 -4.1717 16.9349 12.5146C20.3869 23.7549 33.6304 28.5751 43.4998 22.1835C58.1511 12.6949 76.2459 27.8782 69.4456 43.9546C64.8649 54.784 71.9116 66.9893 83.5805 68.4369C100.903 70.586 105.005 93.8481 89.462 101.792C78.9919 107.144 76.5446 121.023 84.553 129.633C96.4415 142.414 84.631 162.87 67.618 158.965C56.1577 156.334 45.3615 165.393 45.9622 177.136C46.8538 194.569 24.6573 202.648 14.1349 188.72C7.04672 179.339 -7.04674 179.339 -14.1349 188.72C-24.6573 202.648 -46.8538 194.569 -45.9622 177.136C-45.3615 165.393 -56.1577 156.334 -67.618 158.965C-84.631 162.87 -96.4415 142.414 -84.553 129.632C-76.5446 121.023 -78.9919 107.144 -89.462 101.792C-105.005 93.8481 -100.903 70.586 -83.5805 68.4369C-71.9116 66.9893 -64.8649 54.784 -69.4456 43.9546C-76.2459 27.8782 -58.1511 12.6949 -43.4998 22.1835C-33.6304 28.5751 -20.3869 23.7549 -16.9349 12.5146Z"
            fill="#9F68FE"
          />
        </svg>
      </div>

      <div className="absolute top-[-20px] right-2/4 w-24 h-24 md:w-32 md:h-32 transform translate-x-12">
        <svg
          className="w-full h-full opacity-90"
          viewBox="0 0 203 98"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M83.9168 -89.6991C89.1488 -106.736 113.265 -106.736 118.497 -89.6991C122.022 -78.223 135.543 -73.3017 145.619 -79.8274C160.578 -89.5151 179.052 -74.0132 172.11 -57.5995C167.433 -46.543 174.627 -34.0816 186.541 -32.6036C204.227 -30.4095 208.415 -6.65933 192.546 1.45146C181.856 6.91505 179.357 21.0856 187.534 29.8758C199.672 42.925 187.614 63.8105 170.244 59.8233C158.543 57.1375 147.52 66.3866 148.133 78.376C149.044 96.1744 126.382 104.423 115.638 90.2032C108.402 80.6246 94.0125 80.6246 86.7756 90.2032C76.0324 104.423 53.3703 96.1744 54.2806 78.376C54.8939 66.3866 43.8712 57.1375 32.1704 59.8233C14.8005 63.8105 2.74224 42.925 14.8802 29.8758C23.0566 21.0856 20.558 6.91505 9.86825 1.45146C-6.00081 -6.65933 -1.81302 -30.4095 15.8731 -32.6036C27.7868 -34.0816 34.9813 -46.543 30.3045 -57.5995C23.3616 -74.0132 41.836 -89.515 56.7946 -79.8274C66.8711 -73.3017 80.3925 -78.223 83.9168 -89.6991Z"
            fill="#FDC700"
          />
        </svg>
      </div>

      {/* Green decorative blob - bottom right */}
      <div className="absolute bottom-60 right-1/3 w-20 h-24 md:w-24 md:h-32 hidden lg:block">
        <svg
          width="233"
          height="231"
          viewBox="0 0 233 231"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M96.5614 14.7026C102.582 -4.90097 130.332 -4.90097 136.353 14.7026C140.408 27.9079 155.967 33.5708 167.562 26.0617C184.774 14.9144 206.033 32.7521 198.044 51.639C192.662 64.3617 200.941 78.7007 214.65 80.4015C235.001 82.9262 239.819 110.255 221.559 119.588C209.259 125.875 206.384 142.181 215.792 152.296C229.759 167.311 215.884 191.344 195.896 186.756C182.433 183.665 169.749 194.308 170.455 208.104C171.502 228.584 145.425 238.076 133.063 221.713C124.736 210.691 108.178 210.691 99.851 221.713C87.489 238.076 61.412 228.584 62.4595 208.104C63.1652 194.308 50.4815 183.665 37.0177 186.756C17.0304 191.344 3.15508 167.311 17.1221 152.296C26.5305 142.181 23.6554 125.875 11.3549 119.588C-6.90542 110.255 -2.08659 82.9262 18.2645 80.4015C31.9735 78.7007 40.2521 64.3617 34.8705 51.639C26.8815 32.7521 48.1396 14.9144 65.3524 26.0617C76.9472 33.5708 92.506 27.9079 96.5614 14.7026Z"
            fill="#3D8753"
          />
        </svg>
      </div>
      <div className="w-full lg:w-2/3 flex flex-col px-6 sm:px-12 md:px-16 lg:px-20 py-8 relative z-10">
        {/* Logo */}
        <div className="mb-12 lg:mb-16">
         <Route to="/"><img
            src={Logo}
            alt="Dimipified Logo"
            className="h-6  w-auto object-contain"
          />
          </Route>
        </div>

        {/* Main Content - Centered */}
        <div className="flex-1 flex flex-col justify-center max-w-lg mx-auto w-full">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-10">
              Create a Dimpified Business Account.
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Kindly choose a sign-up option
            </p>
          </div>

          {/* Auth Buttons */}
          <div className="space-y-4">
            {/* Google Sign In */}
            {/* <button
              onClick={() => googleLogin()}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 sm:py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 border border-gray-200"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.8 10.2273C19.8 9.51819 19.7364 8.83637 19.6182 8.18182H10.2V12.05H15.6109C15.3764 13.3 14.6582 14.3591 13.5864 15.0682V17.5773H16.8273C18.7091 15.8364 19.8 13.2727 19.8 10.2273Z"
                  fill="#4285F4"
                />
                <path
                  d="M10.2 20C12.9 20 15.1636 19.1045 16.8273 17.5773L13.5864 15.0682C12.6864 15.6682 11.5455 16.0227 10.2 16.0227C7.59545 16.0227 5.38636 14.2636 4.58636 11.9H1.22727V14.4909C2.88182 17.7591 6.24545 20 10.2 20Z"
                  fill="#34A853"
                />
                <path
                  d="M4.58636 11.9C4.38636 11.3 4.27273 10.6591 4.27273 10C4.27273 9.34091 4.38636 8.7 4.58636 8.1V5.50909H1.22727C0.545455 6.85909 0.136364 8.38636 0.136364 10C0.136364 11.6136 0.545455 13.1409 1.22727 14.4909L4.58636 11.9Z"
                  fill="#FBBC05"
                />
                <path
                  d="M10.2 3.97727C11.6636 3.97727 12.9682 4.48182 13.9909 5.44545L16.8818 2.55455C15.1591 0.940909 12.8955 0 10.2 0C6.24545 0 2.88182 2.24091 1.22727 5.50909L4.58636 8.1C5.38636 5.73636 7.59545 3.97727 10.2 3.97727Z"
                  fill="#EA4335"
                />
              </svg>
              <span className="text-sm sm:text-base">Continue with Google</span>
            </button> */}

            {/* Email Sign In - Wrapped with Link */}
            <Route to="/Paid/auth/personal-Information" className="block">
              <button className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium py-3 sm:py-4 px-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 border border-gray-200">
                <Mail className="w-5 h-5" />
                <span className="text-sm sm:text-base">Sign Up with Email</span>
              </button>
            </Route>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-base text-gray-500 text-center">
            This site is protected by reCAPTCHA Google Privacy Policy and Terms
            of Service apply
          </p>
        </div>
      </div>

      {/* Right Image Section - Hidden on mobile and tablet */}
      <div className="hidden lg:block lg:w-1/3 relative">
        <img
          src={PaidOnboardingImage}
          alt="Hair styling professional at work"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
}
