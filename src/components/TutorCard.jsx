import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { Link } from "react-router";
import useAxios from "../hooks/useAxios";

const TutorCard = ({ tutor }) => {
  const axiosSecure = useAxios();

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", tutor._id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${tutor._id}`);
      return res.data;
    },
    enabled: !!tutor._id,
  });

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative rounded-2xl 
      bg-white/20 backdrop-blur-lg border border-white/30 
      shadow-lg hover:shadow-2xl transition p-6 flex flex-col"
    >
      {/* Tutor Info */}
      <div className="flex items-center gap-4">
        <img
          src={tutor.photoUrl || "/default-avatar.png"}
          alt={tutor.displayName}
          className="w-16 h-16 rounded-full object-cover border border-white/40 shadow-md"
        />
        <div>
          <h3 className="text-lg font-semibold ">{tutor.displayName}</h3>
          <p className="text-sm ">
            {Array.isArray(tutor.subjects) ? tutor.subjects.join(", ") : tutor.subjects}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => {
              const starValue = i + 1;
              if (averageRating >= starValue) {
                return <FaStar key={i} className="text-yellow-400" />;
              } else if (averageRating >= starValue - 0.5) {
                return <FaStarHalfAlt key={i} className="text-yellow-400" />;
              } else {
                return <FaRegStar key={i} className="text-gray-400" />;
              }
            })}
            <span className="font-semibold  ml-1">{averageRating.toFixed(1)}</span>
            <span className="text-gray-300">({reviews.length} reviews)</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="mt-4 space-y-2 text-sm ">
        <div className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-indigo-300" />
          <span>{tutor.location || "Location not provided"}</span>
        </div>
        <p>💼 Experience: <span className="font-medium">{tutor.experience || 0} years</span></p>
        <p>🎓 Qualification: <span className="font-medium">{tutor.qualification || "Not provided"}</span></p>
        <p>💰 Hourly Rate: <span className="font-medium">৳{tutor.hourlyRate || "500"}</span></p>
      </div>

      {/* CTA */}
      <Link
        to={`/tutors/${tutor._id}`}
        className="mt-5 btn btn-primary btn-sm w-full"
      >
        View Profile
      </Link>
    </motion.div>
  );
};

export default TutorCard;
