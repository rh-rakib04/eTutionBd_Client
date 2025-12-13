import React from "react";
import TuitionCard from "../components/TutionCard";

const Tuitions = () => {
  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-4xl mt-10 text-center md:text-5xl font-extrabold">
        Browse Tuitions
      </h1>
      <p className="text-lg mt-4  text-base-content/70 max-w-2xl text-center mx-auto mb-10">
        Find the perfect tuition for your learning needs
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <TuitionCard
          tuition={{
            image:
              "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d",
            title: "Computer Science – Class 11",
            class: "Class 11",
            location: "Dhaka",
            salary: "৳2500 – ৳3500 / month",
            subject: "Computer Science",
            applied: 7,
            time: "4 days ago",
          }}
        />
      </div>
    </div>
  );
};

export default Tuitions;
