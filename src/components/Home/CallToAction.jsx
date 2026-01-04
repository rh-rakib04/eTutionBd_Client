import React from "react";
import { Link } from "react-router";
import SectionHeader from "../SectionHeader";

const CallToAction = () => {
  return (
    <section className="py-10 ">
      <div className="max-w-5xl mx-auto text-center px-4">
        <SectionHeader
          title="Ready to Find the"
          highlight="Perfect Tutor"
          subtitle="Post your tuition requirement today and get matched with verified tutors."
        />

        <div className="flex justify-center gap-4">
          <Link to="/tuitions" className="btn  bg-linear-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700">
            Find Tuition
          </Link>
          <Link to="/be-a-tutor" className="btn btn-outline btn-primary">
            Become a Tutor
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
