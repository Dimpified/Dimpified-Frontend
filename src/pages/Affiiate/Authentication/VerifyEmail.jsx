import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../../../src/assets/DIMP logo colored.png";
import { LoadingSmall } from "../../../component/LoadingSpinner";
import api from "../../../api/Afiliate";
import { Heading, Text } from "../../../component/Text";
import { ButtonForTabs, ButtonSmallPurple } from "../../../component/Buttons";
const EmailVerify = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extracting the email and token from the URL
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const token = queryParams.get("token");

  const [verificationStatus, setVerificationStatus] = useState(null); // null, 'success', 'failure'
  const [loading, setLoading] = useState(true); // Loading state for verification request
  const [showModal, setShowModal] = useState(true); // Modal visibility

  // Verify email when component mounts
  useEffect(() => {
    if (email && token) {
      verifyEmail();
    } else {
      setVerificationStatus("failure");
      setLoading(false);
    }
  }, [email, token]);

  const verifyEmail = async () => {
    try {
      const response = await api.affiliateVerifyEmail({
        email: email,
        verificationToken: token,
      });
      if (response.status === 200) {
        setVerificationStatus("success");
      } else {
        setVerificationStatus("failure");
      }
    } catch (error) {
      setVerificationStatus("failure");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/affiliate/auth?tab=signIn");
  };

  return (
    <div>
      {/* Modal for displaying verification result */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
            <div className="flex justify-between items-center p-5 border-b">
              <Heading
                level="3"
                className="text-lg font-semibold text-center w-full font-body"
                size=""
                color="black"
                weight="font-medium"
                font="font-body"
                lineHeight="leading-1"
                htmlFor="bankSelect"
              >
                {loading
                  ? "Verifying Email..."
                  : verificationStatus === "success"
                  ? "Email Verified"
                  : "Verification Failed"}
              </Heading>
              <ButtonForTabs
                className="text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
                label={<>&times;</>}
              />
            </div>
            <div className="p-6 text-center">
              {loading ? (
                <div className="flex justify-center">
                  <LoadingSmall />
                </div>
              ) : verificationStatus === "success" ? (
                <>
                  <Text>Your email {email} has been successfully verified.</Text>
                  <img src={Logo} alt="Success" className="w-20 my-4 mx-auto" />
                </>
              ) : (
                <>
                  <Text>Failed to verify your email. Please try again later.</Text>
                  <img src={Logo} alt="Failure" className="w-20 my-4 mx-auto" />
                </>
              )}
            </div>
            <div className="flex justify-center p-4 border-t">
              <ButtonSmallPurple
                className="bg-primary3 hover:bg-primary4 text-white px-4 py-2 rounded"
                onClick={handleCloseModal}
                width=""
              >
                {verificationStatus === "success"
                  ? "Proceed to Login"
                  : "Close"}
              </ButtonSmallPurple>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailVerify;
