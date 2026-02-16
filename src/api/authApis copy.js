import axios from "axios";
import { updateAccessToken } from "../features/authentication";

// Define your API endpoints
const API_URL = `${import.meta.env.VITE_API_URL}/creator`;
const PLAIN_API_URL = `${import.meta.env.VITE_API_URL}`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Helper function to update headers
export const setAuthHeader = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Clear auth header
export const clearAuthHeader = () => {
  delete apiClient.defaults.headers.common['Authorization'];
  delete axios.defaults.headers.common['Authorization'];
};

const GoogleSignUp = async ({ token, refcode = null }) => {
  try {
    console.log("Sending Google auth request with payload:", { token, refcode });
    
    const payload = {
      token: token,
    };
    
    if (refcode) {
      payload.refcode = refcode;
    }
    
    const response = await apiClient.post(`${API_URL}/google-auth`, payload, {
      timeout: 15000,
    });
    
    console.log("Google auth response:", response.data);
    return response;
  } catch (error) {
    console.error("Google auth API error:", error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error("Connection timeout. Please try again.");
    } else if (error.response) {
      const errorData = error.response.data;
      console.error("Server error response:", errorData);
      throw new Error(
        errorData?.message || 
        errorData?.error || 
        "Google authentication failed"
      );
    } else if (error.request) {
      console.error("No response received:", error.request);
      throw new Error("Cannot connect to server. Please check your connection.");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Registration API call
const creatorRegister = async ({
  fullName,
  email,
  password,
  phoneNumber,
  gender,
  dateOfBirth,
  role,
  refCode,
  organizationName,
}) => {
  try {
    const response = await apiClient.post(`${API_URL}/signup`, {
      fullName,
      email,
      password,
      phoneNumber,
      gender,
      dateOfBirth,
      role,
      refCode,
      organizationName,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

const newCreatorRegister = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  acceptTerms,
  acceptMarketing,
  refCode,
}) => {
  try {
    const response = await axios.post(`${API_URL}/new/signup`, {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      acceptTerms,
      acceptMarketing,
      refCode,
    });
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || " New Registration failed"
    );
  }
};

const creatorVerifyToken = async ({ email, OTP }) => {
  try {
    const response = await axios.post(`${API_URL}/verify-otp`, {
      email,
      OTP,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

const creatorResendVerifyToken = async ({ email, phoneNumber }) => {
  try {
    const response = await axios.post(`${API_URL}/resend-otp`, {
      email,
      phoneNumber,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

const creatorLogin = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/sign-in`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

//affiliateLogin
const affiliateLogin = async ({ email, password }) => {
  try {
    const response = await axios.post(`${PLAIN_API_URL}/affiliate/login`, {
      email,
      password,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "SignIn failed");
  }
};

const emailLogin = async ({ email }) => {
  try {
    const response = await axios.get(
      `${PLAIN_API_URL}/gfa-creator-login/${email}`,
      {}
    );
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

const creatorForgetPassword = async ({ email }) => {
  try {
    const response = await axios.post(`${API_URL}/forgot/password`, {
      email,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

const creatorResetPassword = async ({ email, password }) => {
  try {
    const response = await axios.patch(`${API_URL}/reset/password`, {
      email,
      password,
    });
    console.log("response for reset", response);
    return response;
  } catch (error) {
    console.log("error for reset", error.response);
    throw new Error(
      error.response?.data?.data?.message || "Password reset failed"
    );
  }
};

const creatorResetPasswordOtp = async ({ email, OTP }) => {
  try {
    const response = await axios.post(`${API_URL}/verify-reset-otp`, {
      email,
      OTP,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Password reset failed");
  }
};

const teamMemberOnboarding = async ({
  email,
  dateOfBirth,
  state,
  localGovernment,
  address,
  password,
  country,
}) => {
  try {
    const response = await axios.post(`${PLAIN_API_URL}/onboard-team-member`, {
      email,
      dateOfBirth,
      state,
      localGovernment,
      address,
      password,
      country,
    });
    return response;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Password reset failed");
  }
};

export const refreshAccessToken = async (refreshToken, dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/refresh-token`, {
      creatorToken: refreshToken,
    });
    const { accessToken } = response.data;

    console.log("this is the new access token", accessToken);

    if (accessToken) {
      console.log("this is here 12");
      dispatch(updateAccessToken(accessToken));
      console.log("this is here 13");
      return accessToken;
    }
  } catch (error) {
    console.error("Failed to refresh token", error);
  }
  return null;
};

const CreatorSelectBusinessType = async ({
  creatorId,
  category,
  subCategory,
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/new/select-business-category`,
      {
        creatorId,
        category,
        subCategory,
      }
    );
    return response;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Select Business Type failed"
    );
  }
};

export const createBusinessIdentity = async (data) => {
  try {
    console.log("=== CREATE BUSINESS IDENTITY DEBUG ===");
    
    // USE ACCESS TOKEN (JWT from backend) - Samuel confirmed this
    let token = data.accessToken || data.token;
    
    // Fallback: Get from localStorage
    if (!token) {
      token = localStorage.getItem('accessToken') || 
              localStorage.getItem('jwtToken');
    }
    
    console.log("Token source:", 
      token === data.accessToken ? "From data payload (accessToken)" :
      token === data.token ? "From data payload (token)" :
      "From localStorage"
    );
    
    console.log("Token type: JWT Access Token (from backend)");
    console.log("Token length:", token?.length);
    console.log("Token (first 50 chars):", token?.substring(0, 50) + "...");
    
    if (!token) {
      console.error("No access token found!");
      console.log("LocalStorage contents:", {
        accessToken: localStorage.getItem('accessToken'),
        jwtToken: localStorage.getItem('jwtToken'),
        googleIdToken: localStorage.getItem('googleIdToken'),
      });
      throw new Error("Authentication token is required. Please login again.");
    }
    
    // Prepare payload - remove token fields since they go in header
    const payload = { ...data };
    delete payload.token;
    delete payload.accessToken;
    delete payload.refreshToken;
    delete payload.googleToken;
    delete payload.googleIdToken;
    delete payload.idToken;
    
    console.log("Payload to send:", JSON.stringify(payload, null, 2));
    console.log("Sending request to:", `${API_URL}/create-business-identity`);
    console.log("Using Authorization header: Bearer", token.substring(0, 50) + "...");
    
    // Send ACCESS TOKEN in Authorization header
    const response = await axios.post(
      `${API_URL}/create-business-identity`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 15000,
      }
    );
    
    console.log("Business identity created successfully:", response.data);
    return response;
    
  } catch (error) {
    console.error("=== BUSINESS IDENTITY ERROR DETAILS ===");
    console.error("Error message:", error.message);
    console.error("Error response data:", error.response?.data);
    console.error("Error status:", error.response?.status);
    console.error("Request headers:", error.config?.headers);
    
    // Check if it's a token issue
    if (error.response?.status === 400) {
      const errorData = error.response.data;
      console.error("400 Error details:", errorData);
      
      // Even though we're using access token, backend might still want Google token
      // This is a backend issue - they should accept access token if that's what they return
      if (errorData?.message?.includes("Google token") || 
          errorData?.message?.includes("token is required")) {
        
        console.log("=== CONFLICT DETECTED ===");
        console.log("Backend says: 'Google token is required'");
        console.log("But Samuel says: Use access token");
        console.log("Token we sent (access token):", {
          length: token?.length,
          start: token?.substring(0, 100),
        });
        
        throw new Error("Authentication issue: Backend expects Google token but we're using access token. Please contact support.");
      } else {
        throw new Error(errorData?.message || "Invalid request. Please check your data.");
      }
    } else if (error.response?.status === 401) {
      throw new Error("Session expired. Please login again.");
    } else if (error.response?.status === 403) {
      throw new Error("Access denied. Please check your permissions.");
    } else if (error.response?.status === 500) {
      throw new Error("Server error. Please try again later.");
    } else if (error.message.includes("Network Error") || error.code === 'ECONNABORTED') {
      throw new Error("Network error. Please check your connection.");
    } else {
      throw new Error(error.message || "Failed to create business identity");
    }
  }
};

export default {
  newCreatorRegister,
  CreatorSelectBusinessType,
  GoogleSignUp,
  setAuthHeader,
  clearAuthHeader,
  apiClient,
  creatorRegister,
  creatorVerifyToken,
  creatorLogin,
  affiliateLogin,
  creatorResendVerifyToken,
  creatorForgetPassword,
  creatorResetPassword,
  emailLogin,
  creatorResetPasswordOtp,
  refreshAccessToken,
  teamMemberOnboarding,
  createBusinessIdentity,
};