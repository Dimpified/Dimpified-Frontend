import React from "react";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { Heading, Text } from "../../component/Text";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import TeamList from "../../component/dashboard/Team/TeamList";

const Teams = () => {
  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
          Team Members
        </Heading>

        <img
          src={EditTemplateImage}
          alt="Edit template"
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>
      <TeamList />
    </CreatorDashboardLayout>
  );
};

export default Teams;
