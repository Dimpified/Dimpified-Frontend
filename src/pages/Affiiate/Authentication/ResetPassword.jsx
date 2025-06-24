import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../../../src/assets/DIMP logo colored.png";
import { showToast } from "../../../component/ShowToast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../../../api/Afiliate";
import { ButtonForTabs, ButtonSmallPurple } from "../../../component/Buttons";
import { LongInputWithPlaceholder } from "../../../component/Inputs";
import { Text } from "../../../component/Text";
import { LabelImportant } from "../../../component/Label";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extracting the email and token from the URL
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get("email");
  const token = queryParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetStatus, setResetStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setResetStatus("passwordMismatch");
      return;
    }

    setLoading(true);
    try {
      const response = await api.affiliateResetPassword({
        email: email,
        resetToken: token,
        newPassword: newPassword,
      });

      if (response.status === 200) {
        setResetStatus("success");
        showToast(response.data.message || "Password Reset successful");
      } else {
        setResetStatus("failure");
        showToast(response.data.message);
      }
    } catch (error) {
      setResetStatus("failure");
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        showToast(error.response.data.message);
      } else {
        showToast(
          error.message || "An unexpected error occurred. Please try again."
        );
      }
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
      {/* Modal for password reset */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6">
            <div className="flex justify-center items-center mb-8">
              <div className="flex items-center">
                <img src={Logo} alt="Logo" className="w-[80px] mb-0 mr-2" />
              </div>
              <Text className="font-bold text-lg">
                {loading
                  ? "Resetting Password..."
                  : resetStatus === "success"
                  ? "Password Reset Successful"
                  : resetStatus === "passwordMismatch"
                  ? "Passwords Do Not Match"
                  : "Reset Password"}
              </Text>
            </div>

            <div className="text-center mt-4">
              {loading ? (
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
                </div>
              ) : resetStatus === "success" ? (
                <>
                  <Text>Your password has been successfully reset.</Text>
                </>
              ) : (
                <>
                  <form>
                    <div className="mb-4">
                      <LabelImportant className="block text-gray-700 text-sm font-bold mb-2">
                        New Password
                      </LabelImportant>
                      <div className="flex items-center">
                        <LongInputWithPlaceholder
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <span
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="ml-2 cursor-pointer"
                        >
                          {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <LabelImportant className="block text-gray-700 text-sm font-bold mb-2">
                        Confirm New Password
                      </LabelImportant>
                      <div className="flex items-center">
                        <LongInputWithPlaceholder
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <span
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="ml-2 cursor-pointer"
                        >
                          {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </span>
                      </div>
                    </div>
                  </form>
                  {resetStatus === "passwordMismatch" && (
                    <Text className="text-red-500">
                      Passwords do not match!
                    </Text>
                  )}
                </>
              )}
            </div>

            <div className="mt-6 flex justify-center">
              {resetStatus === "success" ? (
                <ButtonSmallPurple
                  className="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handleCloseModal}
                  width=""
                >
                  Proceed to Login
                </ButtonSmallPurple>
              ) : (
                <ButtonForTabs
                  className="bg-primary3 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  onClick={handlePasswordReset}
                  disabled={loading}
                  label="Reset Password"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
