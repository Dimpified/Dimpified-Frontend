import { GiPlatform } from "react-icons/gi";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { Heading, Text } from "../Text";

const AffiliateDetails = () => {
  return (
    <div className="px-8 overflow-hidden">
      <div className="mt-8 py-6 bg-white overflow-hidden">
        <div className="text-center">
          <Heading
            level="3"
            className="text-3xl md:text-4xl"
            size=""
            color="black"
            weight="font-semibold"
            font="font-body"
            lineHeight="leading-1"
          >
            Sales Partner Programs
          </Heading>
          <Text className="font-medium mt-2 font-sans">
            Discover our independent sales partner (ISP) programs and start
            earning commissions.
          </Text>
        </div>

        <div className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Platform Subscription Affiliates Card */}
          <div className="border p-6 text-center bg-white shadow-md rounded-lg">
            <div
              className="flex justify-center items-center mx-auto bg-primary3 rounded-full mb-4"
              style={{ width: "60px", height: "60px" }}
            >
              <GiPlatform className="w-20 h-20 text-white p-2" />
            </div>
            <Heading
              level="4"
              className="mb-4 text-lg md:text-3xl"
              size=""
              color="black"
              weight="font-semibold"
              font="font-body"
              lineHeight="leading-1"
            >
              Platform Subscription Sales Partner
            </Heading>

            <Text className="text-gray-700 font-sans text-justify md:text-center">
              Earn 30% commission by helping others get started on Dimpified by
              promoting our subscription plans. With every subscription sale you
              make, you&apos;ll earn a 15% commission. It&apos;s that simple!
              Whether your audience consists of small business owners,
              freelancers, or creative professionals, you&apos;ll be providing
              them with valuable tools while earning great commissions.
            </Text>
            <Text className="text-gray-700 font-semibold mt-4 font-body">
              How It Works:
            </Text>
            <ul className="list-disc list-inside text-left text-gray-700 font-sans">
              <li>
                Promote DIMP&apos;s subscription plans in-person or through your
                unique sales partner link.
              </li>
              <li>
                When someone subscribes to our platform based on citing your
                Sales Partner ID during sign-up or through your link, you earn
                15% of the subscription fee.
              </li>
            </ul>
          </div>

          {/* Online Store Referral Affiliates Card */}
          {/* <div className="border p-6 text-center bg-white shadow-md rounded-lg">
            <div
              className="flex justify-center items-center mx-auto bg-primary3 rounded-full mb-4"
              style={{ width: "60px", height: "60px" }}
            >
              <HiOutlineStatusOnline className="w-20 h-20 text-white p-2" />
            </div>
            <Heading
              level="3"
              className="mb-4 text-lg md:text-3xl"
              size=""
              color="black"
              weight="font-semibold"
              font="font-body"
              lineHeight="leading-1"
            >
              Online Store Referral Affiliates
            </Heading>

            <Text className="text-gray-700 font-sans text-justify md:text-center">
              Earn up to 5% commission by referring your audience to
              participating online stores. If you have an audience that loves
              online shopping or needs specific services, this is a great way to
              monetize your content.
            </Text>
            <Text className="text-gray-700 font-semibold mt-4 font-body">
              How It Works:
            </Text>
            <ul className="list-disc list-inside text-left text-gray-700 font-sans">
              <li>
                Share your unique referral link for participating online stores.
              </li>
              <li>
                When someone makes a purchase through your link, you earn 5% of
                the transaction value.
              </li>
              <li>Watch your earnings grow with every successful referral!</li>
            </ul>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AffiliateDetails;
