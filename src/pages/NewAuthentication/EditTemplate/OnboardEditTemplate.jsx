import React, { useState, useEffect } from "react";
import {
  ButtonSmallPurple,
  ButtonSmallWhite,
} from "../../../component/Buttons";
import { Heading, Text } from "../../../component/Text";
import EditTemplate10 from "../../EditTemplate/PersonalCare/Barbers/EditTemplate10";
import EditTemplate14 from "../../EditTemplate/PersonalCare/Barbers/EditTemplate14";
import EditTemplate11 from "../../EditTemplate/EditTemplate11";
import EditTemplate12 from "../../EditTemplate/PersonalCare/MakeUp/EditTemplate12";
import EditTemplate15 from "../../EditTemplate/Blank-Template/EditBlankTemplate";
import EditTemplate16 from "../../EditTemplate/PersonalCare/HairStylist/EditTemplate16";
import EditTemplate17 from "../../EditTemplate/PersonalCare/MakeUp/EditTemplate17";
import EditTemplate18 from "../../EditTemplate/PersonalCare/HairStylist/EditTemplate18";
import EditTemplate19 from "../../EditTemplate/PersonalCare/Nail/EditTemplate19";
import EditTemplate13 from "../../../pages/EditTemplate/EditTemplate13";
import EditTemplate20 from "../../EditTemplate/PersonalCare/Nail/EditTemplate20";
import EditTemplate21 from "../../EditTemplate/PersonalCare/Barbers/EditTemplate21";
import EditTemplate22 from "../../EditTemplate/PersonalCare/Barbers/EditTemplate22";
import EditTemplate23 from "../../EditTemplate/PersonalCare/Gym/EditTemplate23";
import EditTemplate24 from "../../EditTemplate/PersonalCare/Gym/EditTemplate24";
import EditTemplate25 from "../../EditTemplate/PersonalCare/spa/EditTemplate25";
import EditTemplate26 from "../../EditTemplate/PersonalCare/dental/EditTemplate26";
import EditTemplate27 from "../../EditTemplate/PersonalCare/Gym/EditTemplate27";
import EditTemplate28 from "../../EditTemplate/PersonalCare/spa/EditTemplate28";
import EditTemplate29 from "../../EditTemplate/PersonalCare/spa/EditTemplate29";
import EditTemplate30 from "../../EditTemplate/PersonalCare/dental/EditTemplate30";
import EditTemplate31 from "../../EditTemplate/PersonalCare/spa/EditTemplate31";
import EditTemplate32 from "../../EditTemplate/PersonalCare/Gym/EditTemplate32";
import EditTemplate33 from "../../EditTemplate/PersonalCare/Gym/EditTemplate33";
import EditTemplate34 from "../../EditTemplate/PersonalCare/dental/EditTemplate34";
import EditTemplate35 from "../../EditTemplate/PersonalCare/dental/EditTemplate35";
import EditTemplate36 from "../../EditTemplate/PersonalCare/spa/EditTemplate36";
import EditTemplate37 from "../../EditTemplate/PersonalCare/dental/EditTemplate37";
import { setTemplate } from "../../../features/Template/editTemplate";
import { useSelector, useDispatch } from "react-redux";
import api from "../../../api/Template";
import { showToast } from "../../../component/ShowToast";
import { AlertDanger } from "../../../component/Alert";
import { LoadingMany, LoadingSmall } from "../../../component/LoadingSpinner";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { editProfileAutoLogin } from "../../../features/authentication";
import { setEcosystemDomain } from "../../../features/ecosystemDomain";
import { setEcosystemPlan } from "../../../features/ecosystemPlan";
import { setEcosystemStatus } from "../../../features/ecosystemStatus";
import { useNavigate } from "react-router-dom";

const OnboardEditTemplate = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cloading, setCLoading] = useState(false); // cloading for initial data fetch
  const [templateId, setTemplateId] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const navigate = useNavigate();

  const details = useSelector(
    (state) => state.editTemplate.editcurrentTemplate
  );
  const { accessToken, refreshToken } = useSelector((state) => state.auth);
  const userPlan = useSelector((state) => state.ecosystemPlan.plan);
  const userDomain = useSelector((state) => state.ecosystemDomain.domain);

  // function to auto mobile users so as to edit there site
  useEffect(() => {
    if (email) {
      const onSubmit = async () => {
        try {
          // Dispatch the login action
          const resultAction = await dispatch(
            editProfileAutoLogin({
              email,
              token,
            })
          );
          console.log("this is result", resultAction);

          if (editProfileAutoLogin.rejected.match(resultAction)) {
            // Login failed, access the payload from the rejected action
            const errorPayload = resultAction.payload;
            showToast(errorPayload);
          } else if (editProfileAutoLogin.fulfilled.match(resultAction)) {
            // Login was successful
            showToast(resultAction.payload.message);

            if (resultAction.payload.user.ecosystemDomain) {
              dispatch(
                setEcosystemDomain(resultAction.payload.user.ecosystemDomain)
              );
            }
            if (resultAction.payload.user.plan) {
              dispatch(setEcosystemPlan(resultAction.payload.user.plan));
            }
            if (resultAction.payload.user.status) {
              dispatch(setEcosystemStatus(resultAction.payload.user.status));
            }
          }
        } catch (error) {
          showToast("An unexpected error occurred. Please try again.");
        }
      };

      onSubmit();
    }
  }, [email]);
  useEffect(() => {
    if (userDomain) {
      const fetchTemplateDetails = async () => {
        setCLoading(true);
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/getTemplate/${userDomain}`
          );
          const { templateDetails } = response.data;
          const { aboutUsDetails } = response.data;
          dispatch(setTemplate(templateDetails));
          setTemplateId(parseInt(templateDetails.templateId, 10));
          setUserDetails(aboutUsDetails);
          sessionStorage.setItem("ecoLogo", templateDetails.navbar.logo);
          sessionStorage.setItem("brand", templateDetails.navbar.brand);
        } catch (error) {
          console.error("Error fetching template details:", error);
        } finally {
          setCLoading(false);
        }
      };
      fetchTemplateDetails();
    }
  }, [userDomain, dispatch]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.editTemplate({
        ecosystemDomain: userDomain,
        navbar: details.navbar,
        hero: details.hero,
        aboutUs: details.aboutUs,
        Vision: details.Vision,
        Statistics: details.Statistics,
        Patrners: details.Patrners,
        Events: details.Events,
        Gallery: details.Gallery,
        LargeCta: details.LargeCta,
        Team: details.Team,
        Blog: details.Blog,
        Reviews: details.Reviews,
        contactUs: details.contactUs,
        faq: details.faq,
        faqStyles: details.faqStyles,
        footer: details.footer,
        accessToken,
        refreshToken,
      });
      showToast("Template Updated Successfully", "success");
      navigate("/auth/preview-edited")
    } catch (error) {
      showToast("Error Updating Template", "error");
    } finally {
      setLoading(false);
    }
  };

  const renderTemplate = () => {
    switch (templateId) {
      case 10:
        return (
          <EditTemplate10
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 11:
        return (
          <EditTemplate11
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 12:
        return (
          <EditTemplate12
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 13:
        return (
          <EditTemplate13
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 14:
        return (
          <EditTemplate14
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 15:
        return (
          <EditTemplate15
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 16:
        return (
          <EditTemplate16
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 17:
        return (
          <EditTemplate17
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 18:
        return (
          <EditTemplate18
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 19:
        return (
          <EditTemplate19
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 20:
        return (
          <EditTemplate20
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 21:
        return (
          <EditTemplate21
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 22:
        return (
          <EditTemplate22
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 23:
        return (
          <EditTemplate23
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 24:
        return (
          <EditTemplate24
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 25:
        return (
          <EditTemplate25
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 26:
        return (
          <EditTemplate26
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 27:
        return (
          <EditTemplate27
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 28:
        return (
          <EditTemplate28
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 29:
        return (
          <EditTemplate29
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 30:
        return (
          <EditTemplate30
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 31:
        return (
          <EditTemplate31
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 32:
        return (
          <EditTemplate32
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 33:
        return (
          <EditTemplate33
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 34:
        return (
          <EditTemplate34
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 35:
        return (
          <EditTemplate35
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 36:
        return (
          <EditTemplate36
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      case 37:
        return (
          <EditTemplate37
            subdomain={userDomain}
            userDetails={userDetails}
            setLoading={setLoading}
          />
        );
      default:
        return <div>Template not available</div>;
    }
  };

  return (
    <div>
      

      <Heading
        level={3}
        size="3xl"
        weight="600"
        className=" justify-center  text-[#2d1c4d] mt-10"
      >
        Edit your Website
      </Heading>
      <Text className="text-gray-500 text-[16px] mt-3 mb-4">
        Click on the blue button to edit the images and the text to edit the
        sections they are attached to{" "}
      </Text>

      {/* <div className="space-x-4 mt-6 px-4 md:px-0 ">
        {userPlan === "Lite" && (
          <AlertDanger
            title="Template Edit Plan Access"
            message={`You are currently on the ${userPlan} Plan, which prevents you from changing the logo or images. To gain access, upgrade to a Pro or Extra plan.`}
          />
        )}
      </div> */}

      <div className="mt-5">
        {cloading ? (
          <LoadingMany />
        ) : (
          <div className="">{renderTemplate()}</div>
        )}
      </div>
       <div className="mx-auto items-center mt-10 flex justify-center">
      <ButtonSmallPurple
        width="80px"
        disabled={loading || cloading}
        padding="1"
        onClick={handleSubmit}
        className="text-sm lg:text-lg"
      >
        {loading ? "Saving Changes" : "Save Changes and Preview"}
      </ButtonSmallPurple>
      </div>
    </div>
  );
};

export default OnboardEditTemplate;
