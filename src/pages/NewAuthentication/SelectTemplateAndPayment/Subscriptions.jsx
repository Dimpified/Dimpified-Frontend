import React from "react";
import { ButtonSmallWhite } from "../../../component/Buttons";
import { Heading, Text } from "../../../component/Text";
import SubscriptionType from "./Subcription/SubscriptionType";
import { useNavigate } from "react-router-dom";
const Subscriptions = () => {
  const navigate = useNavigate();

  const onBack = () => {
    navigate("/auth/preview-template");
  };
  return (
    <div className="h-screen pb-20">
      <div className="w-full p-4">
        <ButtonSmallWhite
          className="rounded-xl"
          width="w-[100px]"
          padding="2"
          height="15"
          onClick={onBack}
        >
          Back
        </ButtonSmallWhite>
      </div>
      <Heading
        level={2}
        size="3xl"
        weight="600"
        color="[#9768fe]"
        className="justify-center mt-4"
      >
        One more thing...
      </Heading>
      <Heading
        level={3}
        size="3xl"
        weight="600"
        className="text-3xl justify-center  text-[#2d1c4d] mt-10"
      >
        Choose a plan to edit and create your website
      </Heading>
      <Text className="text-gray-500 text-[16px] mt-3 mb-4">
        What subscription plan has features that suits your business needs?
      </Text>
      <SubscriptionType />
    </div>
  );
};

export default Subscriptions;
