import { NavLink } from "react-router";
import { useTypewriter, Cursor } from "react-simple-typewriter";

const HeroSection = () => {
  const [text] = useTypewriter({
    words: [
      "Personal Tutors",
      "Better Grades",
      "Focused Learning",
      "Smart Education",
    ],
    loop: true,
    delaySpeed: 2000,
  });

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden rounded-b-">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Your Smart Learning Partner for
          <br />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {text}
          </span>
          <Cursor cursorColor="#7c3aed" />
        </h1>

        <p className="mt-6 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Connect with qualified tutors and verified tuition opportunities.
          Learn at your own pace with personalized guidance.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <NavLink
            to="/tuitions"
            className="btn px-8 bg-gradient-to-r from-indigo-500 to-purple-600 text-white border-none hover:scale-105 transition"
          >
            Browse Tuitions →
          </NavLink>

          <NavLink
            to="/tutors"
            className="btn btn-outline px-8 hover:border-indigo-500 hover:text-indigo-600 transition"
          >
            Find Tutors
          </NavLink>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-2xl font-extrabold text-indigo-600">5000+</h3>
            <p className="text-sm text-gray-500">Active Tutors</p>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-indigo-600">10000+</h3>
            <p className="text-sm text-gray-500">Students Helped</p>
          </div>
          <div>
            <h3 className="text-2xl font-extrabold text-indigo-600">2000+</h3>
            <p className="text-sm text-gray-500">Tuitions Posted</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
