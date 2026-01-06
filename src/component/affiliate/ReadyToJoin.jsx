import { Link, useNavigate } from "react-router-dom";
import award from "../../assets/affliate-img/affliate.jpg";
import { ButtonSmallPurple } from "../Buttons";
import { Heading, Text } from "../Text";

const ReadyToJoin = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* Image Section */}
      <div className="px-8 py-10 overflow-hidden">
        <div className="relative overflow-hidden">
          <img
            src={award}
            alt="Join Affiliate Program"
            className="w-full h-auto"
          />
          <div
            className="absolute text-white p-4"
            style={{
              top: 0,
              left: 0,
            }}
          >
            <Heading
              level="1"
              className="text-primary3 text-xl xl:text-5xl sm:text-3xl mb-2 xl:mb-4 font-body"
              size=""
              color=""
              weight="font-semibold"
              font="font-body"
              lineHeight="leading-1"
            >
              Ready to Join? <br className="hidden md:block" />
              DIMP&apos;s Sales Partner Program
            </Heading>
            <Text className="text-lg invisible xl:visible xl:text-xl sm:text-base font-sans">
              Take the next step in your entrepreneurial journey and start
              earning with DIMP.
            </Text>
            <ButtonSmallPurple
              onClick={() => navigate("/affiliate/auth?tab=register")}
              className="inline-block bg-primary3 text-white text-lg font-semibold py-3 px-6 mt-0 xl:mt-4 rounded-lg hover:bg-primary4 transition"
            >
              Sign Up Now
            </ButtonSmallPurple>
          </div>
        </div>
      </div>

      {/* Text Section */}
      <div className="px-8 py-5">
        <div>
          <Heading
            level="2"
            className="text-xl md:text-3xl mb-4"
            size=""
            color="primary3"
            weight="font-semibold"
            font="font-body"
            lineHeight="leading-1"
          >
            Why Join Our Sales Partner Program?
          </Heading>

          <Text className="text-lg font-sans">
            Dimpified offers you an incredible opportunity to earn commissions
            by promoting our products and services. Whether you’re a blogger,
            influencer, or just passionate about sharing great tools, our sales
            partner program is perfect for you.
          </Text>
          <Text className="font-semibold mt-4 font-body">Key Benefits:</Text>
          <ul className="list-disc list-inside ml-4 font-sans">
            <li>Earn up to 30% commissions on subscriptions.</li>
            {/* <li>
              Get 5% on every sale you refer to our participating online stores.
            </li> */}
            <li>Free access to marketing materials and support.</li>
            <li>Real-time tracking of your commissions and performance.</li>
          </ul>
          <Text className="text-lg mt-6 font-sans">
            Don&apos;t miss out on this opportunity to monetize your audience
            and grow with DIMP.
          </Text>
          <ButtonSmallPurple
            onClick={() => navigate("/affiliate/auth?tab=register")}
            className="inline-block bg-primary3 text-white text-lg font-semibold py-3 px-6 mt-4 rounded-lg hover:bg-primary4"
          >
            Get Started Now
          </ButtonSmallPurple>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gray-100 py-4 px-8 mb-4">
        <div>
          <Heading
            level="4"
            className="mb-4 text-lg md:text-xl "
            size=""
            color="primary3"
            weight="font-semibold"
            font="font-body"
            lineHeight="leading-1"
          >
            Have Questions?
          </Heading>

          <Text className="mt-2 font-sans">
            For any questions or support, feel free to contact our sales partner
            support team at{" "}
            <Link
              to="mailto:affiliates@dimpified.com"
              className="text-primary3 hover:text-primary4 underline"
            >
              affiliates@dimpified.com
            </Link>
            .
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ReadyToJoin;
