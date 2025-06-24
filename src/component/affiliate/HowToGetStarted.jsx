import { useNavigate } from "react-router-dom";
import { ButtonSmallPurple } from "../Buttons";
import { Heading, Text } from "../Text";

const HowToGetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="px-8">
      {/* Header Section */}
      <div className="mt-4 text-center">
        <Heading
          level="3"
          className="mb-3 text-2xl md:text-4xl"
          size=""
          color="black"
          weight="font-bold"
          font="font-body"
          lineHeight="leading-1"
        >
          How to Get Started
        </Heading>
        <Text className="font-medium mt-2 font-sans">
          Follow these simple steps to join DIMP&apos;s Affiliate Program and
          start earning commissions.
        </Text>
      </div>

      {/* Steps Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-100 p-6 text-center rounded-lg shadow-md">
          <Heading
            level="4"
            className="mb-4 text-lg md:text-2xl"
            size=""
            color="black"
            weight="font-semibold"
            font="font-body"
            lineHeight="leading-1"
          >
            1. Sign Up
          </Heading>

          <Text className="text-gray-700 font-sans">
            Joining is quick and easy! Simply fill out the affiliate
            registration form and choose your preferred affiliate tier.
          </Text>
          <ButtonSmallPurple
            onClick={() => navigate("/affiliate/auth?tab=register")}
            className="inline-block mt-4 px-6 py-2 bg-primary3 text-white text-sm font-medium rounded hover:bg-primary4"
            width="24px"
          >
            SIGN UP
          </ButtonSmallPurple>
        </div>

        <div className="bg-gray-100 p-6 text-center rounded-lg shadow-md">
          <Heading
            level="4"
            className="mb-4 text-lg md:text-2xl"
            size=""
            color="black"
            weight="font-semibold"
            font="font-body"
            lineHeight="leading-1"
          >
            2. Get Your ID & Link
          </Heading>

          <Text className="text-gray-700 font-sans">
            Once approved, you&apos;ll receive a unique affiliate ID and a
            tracking link to monitor your referrals and commissions.
          </Text>
        </div>

        <div className="bg-gray-100 p-6 text-center rounded-lg shadow-md">
          <Heading
            level="4"
            className="mb-4 text-lg md:text-2xl"
            size=""
            color="black"
            weight="font-semibold"
            font="font-body"
            lineHeight="leading-1"
          >
            3. Start Promoting
          </Heading>

          <Text className="text-gray-700 font-sans">
            Share your unique affiliate link on social media, your website, or
            with service providers to start promoting.
          </Text>
        </div>

        <div className="bg-gray-100 p-6 text-center rounded-lg shadow-md">
          <Heading
            level="4"
            className="mb-4 text-lg md:text-2xl"
            size=""
            color="black"
            weight="font-semibold"
            font="font-body"
            lineHeight="leading-1"
          >
            4. Earn Commissions
          </Heading>

          <Text className="text-gray-700 font-sans">
            Earn commissions as your referrals sign up for subscriptions or make
            purchases through our online store.
          </Text>
        </div>
      </div>

      {/* Call to Action */}
      {/* <div className="mt-10 text-center">
        <button className="px-6 py-3 bg-green-500 text-white text-lg font-medium rounded hover:bg-green-600">
          Get Started Today
        </button>
      </div> */}
    </div>
  );
};

export default HowToGetStarted;
