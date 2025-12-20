import React from "react";
import HeroSection from "../components/Home/HeroSection";
import HowItWorks from "../components/Home/HowItWorks";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import LatestTuitions from "../components/Home/LatestTuitions";
import LatestTutors from "../components/Home/LatestTutors";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <LatestTuitions />
      <LatestTutors />
      <HowItWorks />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
