import React from "react";
import TutorCard from "../components/TutorCard";

const Tutors = () => {
  const tutor = {
    name: "Rakibul Hossain",
    location: "Dhaka",
    rating: 4.9,
    rate: 500,
    bio: "Experienced CS tutor with strong fundamentals and practical teaching style.",
    subjects: ["Math", "Physics", "ICT"],
    photo: "https://i.pravatar.cc/150",
  };

  return (
    <div>
      <h1>Ours Tutors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <TutorCard tutor={tutor} />
      </div>
    </div>
  );
};

export default Tutors;
