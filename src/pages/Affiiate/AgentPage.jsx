import NavbarComponent from "../../component/affiliate/Navbar"; // Make sure the path is correct
import Hero from "../../component/affiliate/Hero";
import ProgramSection from "../../component/affiliate/ProgramSection";
import Footer from "../../component/affiliate/Footer";
import AffiliateDetails from "../../component/affiliate/AffiliateDetails";
import ReadyToJoin from "../../component/affiliate/ReadyToJoin";
import HowToGetStarted from "../../component/affiliate/HowToGetStarted";

const AgentPage = () => {
  return (
    <div className="bg-white overflow-hidden">
      <NavbarComponent />

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <ProgramSection />
        <AffiliateDetails />
        <HowToGetStarted />
        <ReadyToJoin />
      </div>

      <Footer />
    </div>
  );
};

export default AgentPage;
