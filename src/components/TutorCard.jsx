import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";

const TutorCard = ({ tutor }) => {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="relative rounded-2xl bg-base-100 p-6 shadow-md 
      hover:shadow-xl transition overflow-hidden group"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary blur-xl opacity-20"></div>
      </div>

      {/* Tutor Info */}
      <div className="relative z-10 flex gap-4 items-center">
        {/* Avatar */}
        <div className="p-[2px] rounded-full bg-gradient-to-r from-primary to-secondary">
          <img
            src={tutor.photo}
            alt={tutor.name}
            className="w-16 h-16 rounded-full object-cover bg-base-100"
          />
        </div>

        {/* Name */}
        <div>
          <h3 className="text-lg font-semibold">{tutor.name}</h3>
          <p className="text-sm text-base-content/70">{tutor.subject}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 text-sm mt-1">
            <FaStar className="text-yellow-400" />
            <span>{tutor.rating}</span>
            <span className="text-base-content/50">({tutor.reviews}+)</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="relative z-10 mt-4 space-y-2 text-sm text-base-content/70">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-primary" />
          <span>{tutor.location}</span>
        </div>

        <p>
          💼 Experience: <span className="font-medium">{tutor.experience}</span>
        </p>
      </div>

      {/* Subjects */}
      <div className="relative z-10 flex flex-wrap gap-2 mt-4">
        {tutor.subjects?.map((subject, i) => (
          <span
            key={i}
            className="px-3 py-1 rounded-full text-xs bg-primary/10 text-primary"
          >
            {subject}
          </span>
        ))}
      </div>

      {/* CTA */}
      <button className="relative z-10 btn btn-primary btn-sm w-full mt-5">
        View Profile
      </button>
    </motion.div>
  );
};

export default TutorCard;
