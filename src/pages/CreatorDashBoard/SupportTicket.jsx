import React, { useState } from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { Heading, Text } from "../../component/Text";
import SupportDashboard from "../../component/dashboard/supportTicket/SupportTicket";
import TicketDetails from "../../component/dashboard/supportTicket/TicketDetails";

const SupportTicket = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);

  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <div>
          <Heading className="font-semibold text-[26px] text-primary4">
            Support Ticket
          </Heading>
          <Text>
            {" "}
            Keep Track of your customer support message from your website{" "}
          </Text>
        </div>
        <img
          src={EditTemplateImage}
          alt="Edit template"
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>

      {/* Conditionally render SupportDashboard or TicketDetails */}
      {selectedTicket ? (
        <TicketDetails
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
        />
      ) : (
        <SupportDashboard onViewTicket={setSelectedTicket} />
      )}
    </CreatorDashboardLayout>
  );
};

export default SupportTicket;
