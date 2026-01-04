import {
  FaBook,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUserGraduate,
  FaClock,
} from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router";
import { motion } from "framer-motion";

const TuitionCard = ({ tuition }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="relative rounded-2xl 
      bg-white/20 backdrop-blur-lg border border-white/30 
      shadow-lg hover:shadow-2xl transition p-6 flex flex-col"
    >
      {/* TOP BADGES */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="px-4 py-1 rounded-full text-xs font-semibold 
        bg-primary/10 text-primary"
        >
          {tuition.classLevel}
        </span>

        <span className="flex items-center gap-2 text-xs text-base-content/60">
          <FaClock />
          {tuition.duration} hours
        </span>
      </div>

      {/* SUBJECT */}
      <h3 className="text-lg font-bold flex items-center gap-3 mb-4">
        <FaBook className="text-primary text-lg" />
        {tuition.subject}
      </h3>

      {/* INFO */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-primary" />
          {tuition.location}
        </div>

        <div className="flex items-center gap-2">
          <FaMoneyBillWave className="text-primary" />৳ {tuition.salary}
        </div>

        <div className="flex items-center gap-2 col-span-2">
          <FaUserGraduate className="text-primary" />
          {tuition.applied} tutor(s) applied
        </div>
      </div>

      {/* CTA */}
      <Link
        to={`/tuitions/${tuition._id}`}
        className="flex items-center justify-center gap-2
        w-full py-3 rounded-xl font-semibold
        bg-primary text-primary-content
        group-hover:gap-3 transition-all"
      >
        View Details <HiArrowRight />
      </Link>

      {/* GLOW */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none
        opacity-0 group-hover:opacity-100 transition
        bg-gradient-to-r from-primary/10 to-secondary/10"
      />
    </motion.div>
  );
};

export default TuitionCard;
