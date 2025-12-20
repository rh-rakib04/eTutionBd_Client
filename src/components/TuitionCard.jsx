import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaMoneyBillWave, FaBook } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router";

const TuitionCard = ({ tuition }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative group rounded-3xl overflow-hidden 
      bg-white/10 backdrop-blur-md border border-white/20 
      shadow-lg hover:shadow-2xl transition p-6"
    >
      {/* IMAGE */}
      <div className="relative mb-4">
        <img
          src={tuition.image || "/default-banner.jpg"}
          alt={tuition.title}
          className="h-44 w-full object-cover rounded-2xl border border-white/30"
        />

        {/* CLASS BADGE */}
        <span className="absolute top-4 right-4 px-4 py-1 text-sm font-semibold rounded-full bg-primary text-primary-content shadow">
          {tuition.class}
        </span>

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
      </div>

      {/* CONTENT */}
      <div className="space-y-3 text-white">
        <h3 className="text-xl font-bold">{tuition.title}</h3>

        <div className="flex items-center gap-3 text-sm text-white/80">
          <FaMapMarkerAlt className="text-primary" />
          <span>{tuition.location}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-white/80">
          <FaMoneyBillWave className="text-primary" />
          <span>৳{tuition.salary}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-white/80">
          <FaBook className="text-primary" />
          <span>{tuition.subject}</span>
        </div>

        <div className="border-t border-white/20 pt-4 flex items-center justify-between text-sm text-white/60">
          <p>{tuition.applied} tutor(s) applied</p>
          <p className="text-xs">{tuition.time}</p>
        </div>

        {/* CTA */}
        <Link
          to={`/tuitions/${tuition._id}`}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl 
          bg-primary  font-semibold 
          group-hover:gap-3 transition-all"
        >
          View Details <HiOutlineArrowRight />
        </Link>
      </div>

      {/* GLOW EFFECT */}
      <div
        className="absolute inset-0 rounded-3xl pointer-events-none 
      opacity-0 group-hover:opacity-100 transition 
      bg-gradient-to-r from-primary/10 to-purple-500/10"
      />
    </motion.div>
  );
};

export default TuitionCard;
