import axios from "axios";
import AxiosInterceptor from "../component/AxiosInterceptor";
import { showToast } from "../component/ShowToast";

const PLAIN_API_URL = `${import.meta.env.VITE_API_URL}`;

const affiliateRegister = async ({
  userName,
  password,
  email,
  phoneNumber,
  agreement,
}) => {
  try {
    const response = await axios.post(`${PLAIN_API_URL}/affiliate/signup`, {
      userName,
      password,
      email,
      phoneNumber,
      agreement,
    });

    return response;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      console.log(error.response.data.message);
    } else {
      console.log(
        error.message || "An unexpected error occurred. Please try again."
      );
    }
  }
};

const affiliateHandleRegisterResendEmail = async ({ email }) => {
  try {
    // Make API call to resend the email
    const response = await axios.post(
      `${PLAIN_API_URL}/affiliate/resend-email`,
      { email }
    );
    return response;
  } catch (error) {
    console.log(
      error.response?.data?.message ||
        "Failed to resend the verification email."
    );
  }
};

const affiliateResetPassword = async ({ email, resetToken, newPassword }) => {
  try {
    const response = await axios.post(
      `${PLAIN_API_URL}/affiliate/reset-password`,
      {
        email,
        resetToken,
        newPassword,
      }
    );

    return response;
  } catch (error) {
    console.log("error on reset:", error);
  }
};

const affiliateVerifyEmail = async ({ email, verificationToken }) => {
  try {
    const response = await axios.post(
      `${PLAIN_API_URL}/affiliate/verify-email`,
      {
        email,
        verificationToken,
      }
    );
    return response;
  } catch (error) {
    console.log("Error in verifying email:", error);
  }
};

const affiliateHandleShare = async ({ affiliateId }) => {
  // const authFetch = AxiosInterceptor(accessToken, refreshToken);
  const onboardLink = `${window.location.origin}/auth/personal-Information?ref=${affiliateId}`;
  if (navigator.share) {
    navigator
      .share({
        title: "Join as a Creator",
        text: "Join our platform through this link:",
        url: onboardLink,
      })
      .then(() => console.log("Onboard link shared successfully!"))
      .catch(() => showToast("Error sharing the onboard link"));
  } else {
    navigator.clipboard.writeText(onboardLink).then(() => {
      showToast("Onboard link copied to clipboard!");
    });
  }
};

const affiliateFetchDashboardData = async ({
  creatorId,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/affiliate-dashboard-stats/${creatorId}`
    );
    console.log("dashboard data", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};

const affiliateFetchEarningHistory = async ({
  creatorId,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/affiliate-earning-history/${creatorId}`
    );
    console.log("earningHistory", response.data);
    return response;
  } catch (error) {
    console.error("Error fetching earning history:", error);
  }
};

const affiliateFetchTopEcosystems = async ({
  creatorId,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/affiliate-last-four-onboarded-users/${creatorId}`
    );

    return response;
  } catch (error) {
    console.error("Error fetching top ecosystems:", error);
  }
};
const affiliateFetchRecentEcosystems = async ({
  creatorId,
  accessToken,
  refreshToken,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/affiliate-last-four-subscribe-users/${creatorId}`
    );

    return response;
  } catch (error) {
    console.error("Error fetching recent ecosystems:", error);
  }
};

const affiliateGetMyUser = async ({ userId, accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/affiliate-all-onboarded-users/${userId}`
    );

    return response;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

const affiliateFetchStats = async ({
  accessToken,
  refreshToken,
  creatorId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const apiUrl = await authFetch.get(
      `${PLAIN_API_URL}/affiliate-onboarded-users-blocks/${creatorId}`
    );
    const data = apiUrl;
    return data;
  } catch (error) {
    console.error("Error fetching stats:", error);
  }
};

//Payout Earning api's  ......AgentPayouts.jsx
const affiliatePayoutEarning = async ({
  accessToken,
  refreshToken,
  userId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/affiliate-earning/${userId}`
    );

    return response;
  } catch (error) {
    console.error("Error fetching payout earning data:", error);
  }
};

const affiliatePayoutBankData = async ({
  accessToken,
  refreshToken,
  userId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/affiliate/get-my-account/${userId}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching bank data:", error);
  }
};

const affiliatePayoutFetchBanks = async ({ accessToken, refreshToken }) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.get(`${PLAIN_API_URL}/get-all-banks`);
    return response;
  } catch (error) {
    console.error("Error fetching banks:", error);
  }
};

const affiliatePayoutVerifyAccount = async ({
  accessToken,
  refreshToken,
  accountNumber,
  bankCode,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(
      `${import.meta.env.VITE_API_URL}/verify-bank-details`,
      {
        account: accountNumber,
        bankCode: bankCode,
      }
    );

    return response;
  } catch (error) {
    console.error("Error verifying bank details:", error);
  }
};

const affiliatePayoutHandleSave = async ({
  accessToken,
  refreshToken,
  accountName,
  accountNumber,
  bankName,
  currency,
  userId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const saveBankData = await authFetch.post(
      `${import.meta.env.VITE_API_URL}/affiliate/add-my-account`,
      {
        affiliateId: userId,
        accountName,
        accountNumber,
        bankName,
        currency,
      }
    );

    return saveBankData;
  } catch (error) {
    console.error("Error saving bank details:", error);
  }
};

const affiliateHandleEditSave = async ({
  accessToken,
  refreshToken,
  affiliateId,
  accountId,
  accountName,
  bankName,
  accountNumber,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    await authFetch.put(`${PLAIN_API_URL}/affiliate/edit-my-account`, {
      affiliateId,
      accountId,
      accountName,
      bankName,
      accountNumber,
      // currency: editedAccount.currency,
    });
  } catch (error) {
    console.error("Error editing account:", error);
  }
};

const affiliatePayoutHandleWithdraw = async ({
  accessToken,
  refreshToken,
  affiliateId,
  accountId,
  amount,
  currency,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/affiliate-withdrawal-request`,
      {
        affiliateId,
        accountId,
        amount,
        currency,
      }
    );
    return response;
  } catch (error) {
    console.log("Error handling withdraw", error);
  }
};

//payout Withdraw api's ....WithdrawRequest.jsx
const affiliateFetchWithdrawalRequests = async ({
  accessToken,
  refreshToken,
  creatorId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/affiliate-withdrawal-requests/${creatorId}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching withdrawal requests:", error);
  }
};

const affiliateFetchWithdrawalBlock = async ({
  accessToken,
  refreshToken,
  creatorId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/affiliate-total-withdrawals-stats/${creatorId}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching withdrawal requests:", error);
  }
};

//Profile page api's .....ProfilePage.jsx
const affiliateProfileFetchUserData = async ({
  accessToken,
  refreshToken,
  affiliateId,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);

  try {
    const response = await authFetch.get(
      `${PLAIN_API_URL}/get-affiliate-profile/${affiliateId}`
    );
    return response;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
};

const affiliateProfileHandleSubmit = async ({
  accessToken,
  refreshToken,
  formDataToSend,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.put(
      `${PLAIN_API_URL}/affiliate/profile`,
      formDataToSend
    );
    return response;
  } catch (error) {
    console.log("Error fetching user data", error);
  }
};

// onboarding api's ....AgentOnboarding.jsx
const affiliateHandleResendEmail = async ({
  accessToken,
  refreshToken,
  email,
}) => {
  const authFetch = AxiosInterceptor(accessToken, refreshToken);
  try {
    const response = await authFetch.post(
      `${PLAIN_API_URL}/creator/resend-email`,
      { email }
    );
    return response;
  } catch (error) {
    console.log("Failed to resend email:", error.response?.data?.msg);
  }
};

export default {
  affiliateHandleShare,
  affiliateFetchDashboardData,
  affiliateFetchEarningHistory,
  affiliateFetchTopEcosystems,
  affiliateFetchRecentEcosystems,
  affiliateGetMyUser,
  affiliateFetchStats,
  affiliatePayoutEarning,
  affiliatePayoutBankData,
  affiliatePayoutFetchBanks,
  affiliatePayoutVerifyAccount,
  affiliatePayoutHandleSave,
  affiliateHandleEditSave,
  affiliatePayoutHandleWithdraw,
  affiliateFetchWithdrawalRequests,
  affiliateFetchWithdrawalBlock,
  affiliateProfileFetchUserData,
  affiliateProfileHandleSubmit,
  affiliateHandleResendEmail,
  affiliateRegister,
  affiliateHandleRegisterResendEmail,
  affiliateResetPassword,
  affiliateVerifyEmail,
};
