import React, { useState, useEffect } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { Heading } from "../../component/Text";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { statesAndLGAs } from "../../data/StateAndLGA";
import { LabelImportant } from "../../component/Label";
import { LongInputWithPlaceholder } from "../../component/Inputs";
import { ButtonSmallPurple } from "../../component/Buttons";
import api from "../../api/DashboardApi";
import { useSelector } from "react-redux";
import { showToast } from "../../component/ShowToast";
import { FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  gender: Yup.string().required("Gender is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  state: Yup.string().required("State is required"),
  address: Yup.string().required("Address is required"),
  localGovernment: Yup.string().required("Local Government is required"),
});

const TeamMemberProfile = () => {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/100");
  const [profileImageFile, setProfileImageFile] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const creatorId = useSelector((state) => state.auth.user?.creatorId);
  const userRole = useSelector((state) => state.auth.user?.role);
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const [states, setStates] = useState(Object.keys(statesAndLGAs));
  const [localGovernments, setLocalGovernments] = useState([]);
  const [loading, setLoading] = useState(false);
  const emailValue = watch("email");

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      setProfileImageFile(file);
      await handleProfileImageUpdate(file);
    }
  };

  const handleProfileImageUpdate = async (file) => {
    if (!file || !creatorId) return;
    try {
      const response = await api.creatorUpdateProfileImage({
        accessToken,
        refreshToken,
        creatorId: parseFloat(creatorId),
        userType: userRole,
        image: file,
      });
      if (response.status === 200) {
        showToast(response.data.message, "success");
        fetchProfile();
      } else {
        showToast("Profile image update failed", "error");
      }
    } catch (error) {
      console.error("Failed to update profile image:", error);
      showToast("Failed to update profile image: " + error.message, "error");
    }
  };

  const fetchProfile = async () => {
    if (!accessToken || !refreshToken || !creatorId) return;
    try {
      const response = await api.TeamMemberProfile({
        creatorId,
        accessToken,
        refreshToken,
      });
      const {
        fullName,
        email,
        dateOfBirth,
        gender,
        phoneNumber,
        state,
        localGovernment,
        address,
        image,
      } = response.data.teamProfile;

      setValue("fullName", fullName || "");
      setValue("dateOfBirth", dateOfBirth ? new Date(dateOfBirth).toISOString().split("T")[0] : "");
      setValue("gender", (gender || ""));
      setValue("email", email || "");
      setValue("phoneNumber", phoneNumber || "");
      setValue("address", address || "");

      if (image) setProfileImage(image);

      if (state) {
        setValue("state", state);
        const lgas = statesAndLGAs[state] || [];
        setLocalGovernments(lgas);
        setValue("localGovernment", lgas.includes(localGovernment) ? localGovernment : "");
      }
    } catch (error) {
      console.error("Could not get profile data:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [setValue, accessToken, refreshToken, creatorId]);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setValue("state", selectedState);
    setLocalGovernments(statesAndLGAs[selectedState] || []);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    const teamProfileData = {
      accessToken,
      refreshToken,
      creatorId,
      fullName: data.fullName,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      state: data.state,
      localGovernment: data.localGovernment || "",
      address: data.address,
    };

    try {
      const response = await api.TeamMemberUpdateProfile(teamProfileData );
      if (response.status === 200) {
        setLoading(false);
        showToast(response.data.message, "success");
        fetchProfile();
      } else {
        setLoading(false);
        showToast("Profile update failed", "error");
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">Profile</Heading>
        <img src={EditTemplateImage} alt="" className="w-32 pr-6 right-0 bottom-0 absolute" />
      </div>
      <div className="mt-16 w-full max-w-3xl mx-auto">
        <div className="flex items-center justify-between pb-2 my-10 mx-5 lg:mx-0">
          <h2 className="text-lg font-semibold text-purple-600">Personal Information</h2>
          <span className="flex-1 ml-4 border-b-4 border-purple-400"></span>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center w-full">
          <div className="flex items-center gap-x-4">
            <div className="relative group w-24 h-24">
              <label htmlFor="profileImageUpload" className="cursor-pointer">
                <img src={profileImage} alt="Profile" className="w-24 h-24 bg-slate-400 rounded-full object-cover border border-gray-300" />
                <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 rounded-full transition-opacity duration-300">
                  <FaCamera className="text-white text-lg" />
                </span>
              </label>
              <input type="file" id="profileImageUpload" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-5 lg:mx-0 space-y-10 items-center gap-8 mt-8">
            <div className="grid grid-cols-1 gap-6 w-full max-w-4xl">
              <div>
                <LabelImportant className="text-ter13">Full Name</LabelImportant>
                <LongInputWithPlaceholder {...register("fullName")} placeholder="Your Full Name" className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3" />
                {errors.fullName && <p className="text-ter7">{errors.fullName.message}</p>}
              </div>
              <div>
                <LabelImportant className="text-ter12">Email</LabelImportant>
                <LongInputWithPlaceholder
                  {...register("email")}
                  value={emailValue || ""}
                  placeholder="Your Email"
                  className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3 bg-gray-100"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                <div>
                  <LabelImportant className="text-ter12">Phone Number</LabelImportant>
                  <LongInputWithPlaceholder {...register("phoneNumber")} placeholder="Your Phone Number" className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3" />
                  {errors.phoneNumber && <p className="text-ter7">{errors.phoneNumber.message}</p>}
                </div>
                <div>
                  <LabelImportant className="text-ter12">Gender</LabelImportant>
                  <select {...register("gender")} className="mt-1 w-full border border-sec2 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary3">
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && <p className="text-ter7">{errors.gender.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                <div>
                  <LabelImportant className="text-ter12">Date of Birth</LabelImportant>
                  <LongInputWithPlaceholder type="date" {...register("dateOfBirth")} className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3" />
                  {errors.dateOfBirth && <p className="text-ter7">{errors.dateOfBirth.message}</p>}
                </div>
                <div>
                  <LabelImportant className="text-ter12">State</LabelImportant>
                  <select {...register("state")} onChange={handleStateChange} className="mt-1 w-full border border-sec2 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary3">
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && <p className="text-ter7">{errors.state.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                <div>
                  <LabelImportant className="text-ter12">Local Government</LabelImportant>
                  <select {...register("localGovernment")} className="mt-1 w-full border border-sec2 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary3">
                    <option value="">Select Local Government</option>
                    {localGovernments.map((lga) => (
                      <option key={lga} value={lga}>{lga}</option>
                    ))}
                  </select>
                  {errors.localGovernment && <p className="text-ter7">{errors.localGovernment.message}</p>}
                </div>
                <div>
                  <LabelImportant className="text-ter12">Address</LabelImportant>
                  <LongInputWithPlaceholder {...register("address")} placeholder="Your Address" className="mt-1 w-full border border-sec2 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary3" />
                  {errors.address && <p className="text-ter7">{errors.address.message}</p>}
                </div>
              </div>
            </div>
            <ButtonSmallPurple type="submit" className="mt-8" disabled={loading}>
              {loading ? "Saving Profile" : "Save Profile"}
            </ButtonSmallPurple>
          </div>
        </form>
      </div>
    </CreatorDashboardLayout>
  );
};

export default TeamMemberProfile;
