import React from "react";
import HeroSection from "../components/Home/HeroSection";
import HowItWorks from "../components/Home/HowItWorks";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import LatestTuitions from "../components/Home/LatestTuitions";
import LatestTutors from "../components/Home/LatestTutors";
import Categories from "../components/Home/Categories";
import PlatformStats from "../components/Home/PlatformStats";
import Testimonials from "../components/Home/Testimonials";
import FAQ from "../components/Home/FAQ";
import CallToAction from "../components/Home/CallToAction";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <LatestTuitions />
      <LatestTutors />
      <HowItWorks />
      <WhyChooseUs />
      <Categories />
      <PlatformStats />
      <Testimonials />
      <FAQ />
      <CallToAction />
    </div>
  );
};

export default Home;
