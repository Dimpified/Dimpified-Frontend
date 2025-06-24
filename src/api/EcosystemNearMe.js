import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}`;

const getEcosystemsNearMe = async ({
  country,
  state,
  localGovernment,
  Category,
  SubCategory,
  format,
  subdomain,
  services,
}) => {
  try {
    const response = await axios.post(`${API_URL}/ecosysystem-near-me`, {
      country,
      state,
      localGovernment,
      Category,
      SubCategory,
      format,
      subdomain,
      services,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Could not fetch services near you"
    );
  }
};

export default {
  getEcosystemsNearMe,
};
