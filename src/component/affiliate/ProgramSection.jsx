import { GrMoney } from "react-icons/gr";
import { BsFillLayersFill } from "react-icons/bs";
import { BiGlobe, BiSolidOffer } from "react-icons/bi";
import { MdOutlineTimeline } from "react-icons/md";

const ProgramSection = () => {
  return (
    <div className="px-8 pb-7">
      <div
        className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 justify-around"
        id="programs"
      >
        <div className="mt-6 flex flex-col items-center text-center">
          <div
            className="flex justify-center bg-primary3 rounded-full mb-2"
            style={{ width: "60px", height: "60px" }}
          >
            <GrMoney className="w-full h-auto text-white p-2.5 " />
          </div>
          <div className="font-semibold text-lg font-body">
            Earn Generous Commissions
          </div>
          <div className="font-sans">
            Get rewarded for every sale you make! We offer competitive
            commission rates to ensure your hard work pays off.
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center text-center">
          <div
            className="flex justify-center  bg-primary3 rounded-full mb-2"
            style={{ width: "60px", height: "60px" }}
          >
            <BsFillLayersFill className="w-full h-auto text-white p-2.5" />
          </div>
          <div className="font-semibold text-lg font-body">
            Two Sales Partner Tiers
          </div>
          <div className="font-sans">
            Whether you&apos;re focusing on Dimpified platform subscriptions or
            online store referrals, we have a tailored program for you.
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center text-center">
          <div
            className="flex justify-center  bg-primary3 rounded-full mb-2"
            style={{ width: "60px", height: "60px" }}
          >
            <BiSolidOffer className="w-full h-auto text-white p-2.5" />
          </div>
          <div className="font-semibold text-lg font-body">
            Exclusive Access
          </div>
          <div className="font-sans">
            As a sales partner, you&apos;ll receive access to promotional
            materials, special offers, and support to help you succeed.
          </div>
        </div>
        <div className="md:col-span-3 md:px-20 md:gap-3 flex flex-col md:flex-row justify-center">
          <div className="mt-6 flex flex-col items-center text-center">
            <div
              className="flex justify-center  bg-primary3 rounded-full mb-2"
              style={{ width: "60px", height: "60px" }}
            >
              <MdOutlineTimeline className="w-full h-auto text-white p-2.5" />
            </div>
            <div className="font-semibold text-lg font-body">
              Real-Time Tracking
            </div>
            <div className="font-sans">
              Stay on top of your earnings with our user-friendly dashboard that
              provides real-time data on your referrals and commissions.
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center text-center md:col-start-auto">
            <div
              className="flex justify-center bg-primary3 rounded-full mb-2"
              style={{ width: "60px", height: "60px" }}
            >
              <BiGlobe className="w-full h-auto text-white p-2.5" />
            </div>
            <div className="font-semibold text-lg font-body">
              Be Part of Something Bigger
            </div>
            <div className="font-sans">
              Join a network of passionate individuals who are making a
              difference by empowering businesses and entrepreneurs with
              top-notch digital tools.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramSection;
