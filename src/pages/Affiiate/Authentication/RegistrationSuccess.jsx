import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../../component/ShowToast";
import Logo from "../../../../src/assets/DIMP logo colored.png";
import { ButtonForTabs } from "../../../component/Buttons";
import api from "../../../api/Afiliate";
import { Heading, Text } from "../../../component/Text";

const RegistrationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleClose = () => {
    // navigate("/affiliate/auth");
  };

  const handleResendEmail = async () => {
    try {
      // Make API call to resend the email
      const response = await api.affiliateHandleRegisterResendEmail({ email });
      if (response.status === 200) {
        showToast(response.data.message);
      }
    } catch (error) {
      showToast(
        error.response?.data?.message ||
          "Failed to resend the verification email."
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <img src={Logo} alt="Logo" className="w-[100px] mb-4" />
      <Heading
        level="2"
        className="text-2xl font-semibold font-body"
        size=""
        color="black"
        weight="font-medium"
        font="font-body"
        lineHeight="leading-1"
        htmlFor="bankSelect"
      >
        Registration Successful
      </Heading>
      <Text className="mt-2 font-body">
        Check your email <strong>{email}</strong> to verify your account.
      </Text>

      <ButtonForTabs
        onClick={handleResendEmail}
        className="mt-2 text-primary3 underline"
        label="Resend Verification Email"
      />

      {/* Uncomment if you want to add the return to sign in button */}
      {/* <button
        onClick={handleClose}
        className="mt-3 bg-blue-500 text-white font-semibold py-2 px-4 rounded"
      >
        Return to sign in
      </button> */}
    </div>
  );
};

export default RegistrationSuccess;
