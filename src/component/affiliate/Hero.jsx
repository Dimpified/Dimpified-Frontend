import { Heading, Text } from "../Text";

const Hero = () => {
  return (
    <div className="px-3 md:px-6 pt-8 mt-5">
      <div className="relative overflow-hidden text-center">
        <div className="w-full p-3 py-10 md:py-20">
          <Heading
            level="2"
            className="text-2xl xl:text-4xl"
            size=""
            color="black"
            weight="font-bold"
            font="font-body"
            lineHeight="leading-7"
          >
            Join the Dimpified Affiliate Program!
          </Heading>

          <div className="px-2 md:px-5 mt-3">
            <Text className="text-lg leading-relaxed font-sans">
              At DIMP, we aim to build a community of entrepreneurs and creators
              who grow and succeed together. Our affiliate program lets you earn
              by helping others access our platform powerful tools and services,
              whether promoting subscription plans or referring customers to our
              store.
            </Text>
          </div>
          {/* <div className="mt-4 flex justify-center">
            <a
              href="/affiliate/auth?tab=register"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
            >
              SIGN UP
            </a>
            <a
              href="/affiliate/auth?tab=signIn"
              className="bg-white text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white"
            >
              SIGN IN
            </a>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
