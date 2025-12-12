import React from "react";

const About = () => {
  return (
    <div className="bg-base-100">
      {/* HERO SECTION */}
      <section className="py-24 bg-gradient-to-br from-indigo-600/10 to-purple-600/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            About
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              eTuitionBd
            </span>
          </h1>

          <p className="text-lg mt-4 text-base-content/70 max-w-2xl mx-auto">
            Empowering students with the right tutors — anytime, anywhere.
            eTuitionBd is Bangladesh’s modern learning partner.
          </p>
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-base-content/70 leading-relaxed">
              At eTuitionBd, our mission is simple: 
              <span className="font-semibold"> make learning accessible, personalized, and reliable</span>.
              We connect students with verified tutors who can truly guide them
              toward academic success.
            </p>
          </div>

          <div className="bg-base-200 rounded-xl p-6 shadow-md">
            <ul className="space-y-3 text-base-content/80">
              <li>• Personalized tutor matching</li>
              <li>• Safe & transparent communication</li>
              <li>• Verified tutor profiles</li>
              <li>• Smart subject & skill-based filtering</li>
              <li>• Support for parents, students & tutors</li>
            </ul>
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="py-16 bg-base-200/40">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Our Story</h2>
          <p className="mt-4 text-base-content/70 leading-relaxed max-w-3xl mx-auto">
            eTuitionBd was founded with a vision to solve a common problem:
            students struggling to find the right tutor, and tutors finding it
            difficult to reach the right students.  
            <br /><br />
            What started as a small idea has now grown into a
            next-generation tutoring platform designed for Bangladeshi students.
          </p>
        </div>
      </section>

      {/* WHY WE EXIST */}
      <section className="py-16 max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        {[
          {
            title: "Verified & Trusted Tutors",
            text: "Every tutor goes through a verification process for authenticity and safety."
          },
          {
            title: "Smart Learning Tools",
            text: "Profile matching, rating systems, digital payments and more."
          },
          {
            title: "Built for Bangladesh",
            text: "A platform tailored specifically for Bangladeshi students, parents, and teachers."
          }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-base-100 shadow-md rounded-xl">
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-base-content/70 mt-2">{item.text}</p>
          </div>
        ))}
      </section>

      {/* NETWORK SECTION */}
      <section className="py-16 bg-base-200/50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold">Our Community</h2>
          <p className="text-base-content/70 max-w-2xl mx-auto mt-3">
            Join a growing network of learners and educators.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <div className="p-6 bg-base-100 rounded-xl shadow">
              <h3 className="text-3xl font-bold text-indigo-600">10,000+</h3>
              <p className="text-base-content/70">Students</p>
            </div>
            <div className="p-6 bg-base-100 rounded-xl shadow">
              <h3 className="text-3xl font-bold text-purple-600">1,200+</h3>
              <p className="text-base-content/70">Verified Tutors</p>
            </div>
            <div className="p-6 bg-base-100 rounded-xl shadow">
              <h3 className="text-3xl font-bold text-pink-600">50+</h3>
              <p className="text-base-content/70">Districts Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* VISION SECTION */}
      <section className="py-16 max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold">Our Vision</h2>
        <p className="text-base-content/70 mt-4 max-w-2xl mx-auto">
          To become Bangladesh’s most trusted online tutoring platform — where
          every student finds the perfect teacher, and every tutor gets the
          recognition they deserve.
        </p>
      </section>

      {/* CTA */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold">Join eTuitionBd Today</h2>
        <p className="text-base-content/70 mt-2">
          Whether you are a student or a tutor, your journey starts here.
        </p>

        <button className="btn mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg hover:scale-105">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default About;
