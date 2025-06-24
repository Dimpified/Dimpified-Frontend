import React from "react";
import CreatorDashboardLayout from "../../layout/Creator/CreatorDashboardLayout";
import EditTemplateImage from "../../assets/EditTemplate.svg";
import { Heading, Text } from "../../component/Text";
import CustomerList from "../../component/dashboard/managecustomer/CustomerList";

const ManageCustomer = () => {
  return (
    <CreatorDashboardLayout>
      <div className="mt-5 relative bg-ter1 lg:w-full p-6 lg:p-10 mx-3 lg:mx-0 rounded-[8px] font-body">
        <Heading className="font-semibold text-[26px] text-primary4">
          Manage Customer
        </Heading>

        <img
          src={EditTemplateImage}
          alt="Edit template"
          className="w-32 pr-6 right-0 bottom-0 absolute"
        />
      </div>

      <CustomerList />
    </CreatorDashboardLayout>
  );
};

export default ManageCustomer;
