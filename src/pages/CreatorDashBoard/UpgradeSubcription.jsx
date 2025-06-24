import React, { useState } from "react";
import SelectTemplateImage from "../../assets/SelectTemplate.svg";
import { Text, Heading } from "../../component/Text";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import SubscriptionType from "../../component/upgradeplan/SubscriptionType";

const UpdateSubscription = () => {


  const handlePriceUpdate = (prices) => {
    setSelectedPrices(prices);
  };

  return (
    <CreatorDashboardLayout>
      <div className="lg:mx-0 mx-4 my-4 lg:my-10">
        <div className="bg-sec1 flex justify-between rounded-xl relative p-6">
          <div className="flex flex-col text-left">
            {/* Heading component */}
            <Heading
              level={2}
              size="2xl"
              weight="font-semibold"
              color="primary4"
            >
              Subscription
            </Heading>

            {/* Text component */}
            <Text color="gray-600" className="text-left text-[12px]">
              Compare and choose your preferred plan to upgrade to
            </Text>
          </div>

          {/* Image based on currentStep */}
          <img
            src={SelectTemplateImage}
            alt="Subscription"
            className="w-28 pr-6 right-0 bottom-0 absolute"
          />
        </div>

        <div className="overflow-x-auto h-screen mt-10">
          <div className="mt-10">
           <SubscriptionType />
          </div>

         
        </div>
      </div>
    </CreatorDashboardLayout>
  );
};

export default UpdateSubscription;
