import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AxiosInterceptor from "../../../component/AxiosInterceptor";
import { showToast } from "../../../component/ShowToast";
import AvatarPlaceholder from "../../../assets/affliate-img/profile-circle.svg";
import Select from "react-select";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import api from "../../../api/Afiliate";
import { LoadingSmall } from "../../../component/LoadingSpinner";
import { Heading, Text } from "../../../component/Text";
import { LongInputWithPlaceholder } from "../../../component/Inputs";
import { ButtonSmallPurple } from "../../../component/Buttons";
// Template sections for interestedCategory dropdown
const templateSections = [
  { id: 0, name: "Select Category" },
  { id: 1, name: "Professional Service" },
  { id: 2, name: "Creative Service" },
  { id: 3, name: "Trade Service" },
  { id: 4, name: "Personal Care Service" },
  { id: 5, name: "Educational Service" },
  { id: 6, name: "Event Service" },
  { id: 7, name: "Technology Service" },
  { id: 8, name: "Government" },
  { id: 9, name: "Corporation" },
  { id: 10, name: "Foundation/NGO's" },
  { id: 11, name: "Religious Bodies" },
];

const ProfilePage = () => {
  const authFetch = AxiosInterceptor();
  const affiliateId = useSelector(
    (state) => state.auth.user?.data?.AffiliateId
  );
  const { accessToken, refreshToken } = useSelector((state) => state.auth);

  // State for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    state: "",
    country: "",
    image: null,
    affiliateId: affiliateId,
    interestedCategory: "",
    localGovernment: "",
    domain: "",
  });

  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.affiliateProfileFetchUserData({
          accessToken,
          refreshToken,
          affiliateId,
        });
        const userData = response.data.affiliateProfile;
        setFormData({
          affiliateId: affiliateId,
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          phoneNumber: userData.phoneNumber || "",
          state: userData.state || "",
          country: userData.country || "",
          image: userData.image || AvatarPlaceholder,
          localGovernment: userData.localGovernment || "",
          domain: userData.domain || "",
          interestedCategory: userData.interestedCategory || "",
        });
      } catch (error) {
        // console.error("Error fetching user details:", error);
        showToast(error.response?.data?.message);
      }
    };
    if (affiliateId) fetchUserData();
  }, [affiliateId]);

  const initialFormData = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    state: "",
    country: "",
    image: null,
    interestedCategory: "",
    localGovernment: "",
    domain: "",
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      console.log(
        "Form Data to Send:",
        Object.fromEntries(formDataToSend.entries())
      );

      const response = await api.affiliateProfileHandleSubmit({
        accessToken,
        refreshToken,
        formDataToSend,
      });

      showToast(response.data.message);
      // setFormData(initialFormData);
    } catch (error) {
      console.error("Error updating profile:", error);
      showToast(error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file)); // Set preview to temporary URL
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // Handle interestedCategory change from Select dropdown
  const handleCategoryChange = (selectedOption) => {
    setFormData({ ...formData, interestedCategory: selectedOption.value });
  };

  // Handle country and state changes
  const handleCountryChange = (country) => {
    setFormData({ ...formData, country });
  };

  const handleStateChange = (state) => {
    setFormData({ ...formData, state });
  };

  return (
    <div className="bg-white shadow-md overflow-hidden">
      <div className="py-10 px-4 sm:px-6 md:px-10">
        <div className="rounded-lg shadow-md">
          <div className="-b p-4">
            <Heading
              level="3"
              className=""
              size="xl"
              color="black"
              weight="font-semibold"
              font="font-body"
              lineHeight="leading-7"
            >
              Profile Details
            </Heading>
            <Text className="text-gray-600">
              Manage your account settings and personal information.
            </Text>
          </div>
          <hr />
          <div className="p-4">
            <form
              onSubmit={handleSubmit}
              encType="multipart/form-data"
              className="grid grid-cols-1 lg:grid-cols-2"
            >
              <div className="flex flex-col sm:flex-row items-center mb-4 lg:mr-4">
                <img
                  src={preview || formData.image || AvatarPlaceholder}
                  className="h-24 w-24 rounded-full outline outline-primary3"
                  alt="User Avatar"
                />
                <div className="mt-4 sm:mt-0 sm:ml-3">
                  <Heading
                    level="4"
                    className=""
                    size="lg"
                    color="black"
                    weight="font-medium"
                    font="font-body"
                    lineHeight="leading-7"
                  >
                    Your avatar
                  </Heading>

                  <LongInputWithPlaceholder
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mt-2 rounded-md p-1 w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <Heading
                    level="1"
                    className=""
                    size="sm"
                    color="black"
                    weight="font-medium"
                    font="font-body"
                    lineHeight="leading-7"
                    htmlFor="firstName"
                  >
                    First Name
                  </Heading>

                  <LongInputWithPlaceholder
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-md p-2 focus:ring focus:ring-primary3"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Heading
                    level="1"
                    className=""
                    size="sm"
                    color="black"
                    weight="font-medium"
                    font="font-body"
                    lineHeight="leading-7"
                    htmlFor="lastName"
                  >
                    Last Name
                  </Heading>
                  <LongInputWithPlaceholder
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-md p-2 focus:ring focus:ring-primary3"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Heading
                    level="1"
                    className=""
                    size="sm"
                    color="black"
                    weight="font-medium"
                    font="font-body"
                    lineHeight="leading-7"
                    htmlFor="phoneNumber"
                  >
                    Phone Number
                  </Heading>

                  <LongInputWithPlaceholder
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="mt-1  w-full  rounded-md p-2 focus:ring focus:ring-primary3"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Heading
                    level="1"
                    className=""
                    size="sm"
                    color="black"
                    weight="font-medium"
                    font="font-body"
                    lineHeight="leading-7"
                    htmlFor="country"
                  >
                    Country
                  </Heading>
                  <CountryDropdown
                    value={formData.country}
                    onChange={(val) => handleCountryChange(val)}
                    classes="mt-1  w-full  rounded-md p-2.5 focus:ring focus:ring-primary3 font-body border"
                  />
                </div>
                <div className="col-span-2 md:col-span-1">
                  <Heading
                    level="1"
                    className=""
                    size="sm"
                    color="black"
                    weight="font-medium"
                    font="font-body"
                    lineHeight="leading-7"
                    htmlFor="state"
                  >
                    State
                  </Heading>

                  <RegionDropdown
                    country={formData.country}
                    value={formData.state}
                    onChange={handleStateChange}
                    classes="mt-1 w-full rounded-md p-2.5 focus:ring focus:ring-primary3 font-body border"
                  />
                </div>

                {/* Interested Category Select */}
                <div className="col-span-2 md:col-span-1">
                  <Heading
                    level="1"
                    className=""
                    size="sm"
                    color="black"
                    weight="font-medium"
                    font="font-body"
                    lineHeight="leading-7"
                    htmlFor="interestedCategory"
                  >
                    Interested Category
                  </Heading>

                  <Select
                    options={templateSections.map((section) => ({
                      value: section.name,
                      label: section.name,
                    }))}
                    onChange={handleCategoryChange}
                    placeholder="Select Category"
                    value={
                      formData.interestedCategory
                        ? {
                            value: formData.interestedCategory,
                            label: formData.interestedCategory,
                          }
                        : { value: "", label: "Select Category" }
                    }
                    className="mt-1 font-body focus:ring focus:ring-primary3"
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <Heading
                    level="1"
                    className=""
                    size="sm"
                    color="black"
                    weight="font-medium"
                    font="font-body"
                    lineHeight="leading-7"
                    htmlFor="localGovernment"
                  >
                    Local Government
                  </Heading>

                  <LongInputWithPlaceholder
                    type="text"
                    name="localGovernment"
                    value={formData.localGovernment}
                    onChange={handleChange}
                    required
                    className="mt-1 border w-full  rounded-md p-2 focus:ring focus:ring-primary3"
                  />
                </div>

                <div className="col-span-2 md:col-span-1">
                  <Heading
                    level="1"
                    className=""
                    size="sm"
                    color="black"
                    weight="font-medium"
                    font="font-body"
                    lineHeight="leading-7"
                    htmlFor="domain"
                  >
                    Domain
                  </Heading>

                  <LongInputWithPlaceholder
                    type="text"
                    name="domain"
                    value={formData.domain}
                    onChange={handleChange}
                    required
                    className="mt-1 border w-full rounded-md p-2 focus:ring focus:ring-primary3"
                  />
                </div>

                <div className="col-span-2 mt-2">
                  <ButtonSmallPurple
                    type="submit"
                    className={`w-full bg-blue-500 text-white font-semibold rounded-md py-2 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={loading}
                  >
                    {loading ? (
                      <Text>
                        <LoadingSmall />
                        Updating...
                      </Text>
                    ) : (
                      <Text>Update Profile</Text>
                    )}
                  </ButtonSmallPurple>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
