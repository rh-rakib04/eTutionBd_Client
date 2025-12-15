import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaMoneyBillWave, FaBook } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router";

const TuitionCard = ({ tuition }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="relative group rounded-3xl overflow-hidden bg-base-100 shadow-md hover:shadow-xl border border-base-200"
    >
      {/* IMAGE */}
      <div className="relative">
        <img
          src={tuition.image}
          alt={tuition.title}
          className="h-44 w-full object-cover"
        />

        {/* CLASS BADGE */}
        <span className="absolute top-4 right-4 px-4 py-1 text-sm font-semibold rounded-full bg-primary text-primary-content shadow">
          {tuition.class}
        </span>

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-3">
        <h3 className="text-xl font-bold">{tuition.title}</h3>

        <div className="flex items-center gap-3 text-sm text-base-content/70">
          <FaMapMarkerAlt className="text-primary" />
          <span>{tuition.location}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-base-content/70">
          <FaMoneyBillWave className="text-primary" />
          <span>{tuition.salary}</span>
        </div>

        <div className="flex items-center gap-3 text-sm text-base-content/70">
          <FaBook className="text-primary" />
          <span>{tuition.subject}</span>
        </div>

        <div className="border-t pt-4 flex items-center justify-between">
          <p className="text-sm text-base-content/60">
            {tuition.applied} tutor(s) applied
          </p>

          <p className="text-xs text-base-content/50">{tuition.time}</p>
        </div>

        {/* CTA */}
        <Link
          to={`/tuitions/${tuition._id}`}
          className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-content font-semibold group-hover:gap-3 transition-all"
        >
          View Details <HiOutlineArrowRight />
        </Link>
      </div>

      {/* GLOW EFFECT */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-linear-to-r from-primary/10 to-purple-500/10" />
    </motion.div>
  );
};

export default TuitionCard;
