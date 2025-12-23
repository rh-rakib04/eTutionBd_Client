import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Star, MessageCircle, Calendar, BookOpen } from "lucide-react";
import Loading from "./Loading";
import useAxios from "../hooks/useAxios";
import useAxiosInstance from "../hooks/useAxiosInstance";
import ErrorPage from "./ErrorPage";
import { useState } from "react";
import ReviewForm from "./ReviewForm";

const TutorDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const axios = useAxiosInstance();
  const [showModal, setShowModal] = useState(false);
  const {
    data: tutor,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tutorDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutors/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axios.get(`/reviews/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0";

  if (isLoading) return <Loading />;
  if (isError || !tutor) return <ErrorPage />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto p-6"
    >
      <Link to="/tutors" className="text-sm mb-4 text-gray-500 hover:underline">
        ← Back to Tutors
      </Link>
      {/* ================= Profile Section ================= */}
      <div className="bg-base-200 rounded-2xl shadow p-6 flex flex-col md:flex-row gap-6">
        <img
          src={tutor.photoUrl || "/default-avatar.png"}
          className="w-36 h-36 rounded-full border mx-auto md:mx-0"
          alt="Tutor"
        />

        <div className="flex-1">
          <h2 className="text-3xl font-bold">{tutor.displayName}</h2>
          <p className="text-gray-500">{tutor.subjects}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={
                  i < Math.round(averageRating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
            <span className="font-semibold">{averageRating}</span>
            <span className="text-gray-500">({reviews.length} reviews)</span>
          </div>

          <p className="mt-4 text-gray-600">
            {tutor.bio || "No bio available."}
          </p>

          <div className="mt-5">
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary"
            >
              <MessageCircle size={18} /> Chat with Tutor
            </button>
          </div>
        </div>
      </div>

      {/* ================= Stats Cards ================= */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-base-200 p-5 rounded-xl text-center"
        >
          <h4 className="text-gray-500">Experience</h4>
          <p className="text-2xl font-bold">{tutor.experience}+ Years</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-base-200 p-5 rounded-xl text-center"
        >
          <h4 className="text-gray-500">Qualification</h4>
          <p className="font-semibold">
            {tutor.qualification || "Not provided"}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="bg-base-200 p-5 rounded-xl text-center"
        >
          <h4 className="text-gray-500">Hourly Rate</h4>
          <p className="text-xl font-bold">৳{tutor.hourlyRate || "500"}</p>
        </motion.div>
      </div>

      {/* ================= Subjects & Availability ================= */}
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {/* Subjects */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-base-200 p-6 rounded-xl shadow"
        >
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <BookOpen size={18} /> Subjects
          </h3>
          <div className="flex flex-wrap gap-2">
            {Array.isArray(tutor.subjects) ? (
              tutor.subjects.map((s, i) => (
                <span key={i} className="badge badge-primary badge-outline">
                  {s}
                </span>
              ))
            ) : (
              <span className="badge badge-primary badge-outline">
                {tutor.subjects || "Not listed"}
              </span>
            )}
          </div>
        </motion.div>

        {/* Availability */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-base-200 p-6 rounded-xl shadow"
        >
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <Calendar size={18} /> Availability
          </h3>
          <div className="flex flex-wrap gap-2">
            {tutor.availability?.length > 0 ? (
              tutor.availability.map((day, index) => (
                <span key={index} className="badge badge-outline">
                  {day}
                </span>
              ))
            ) : (
              <p className="text-sm text-gray-400">No availability info</p>
            )}
          </div>
        </motion.div>
      </div>
      {/* ================= Reviews ================= */}
      <motion.div className="mt-6 bg-base-200 rounded-xl p-6 shadow">
        <h3 className="text-xl font-semibold mb-4">⭐ Student Reviews</h3>

        {reviews.length > 0 ? (
          reviews.map((review, i) => (
            <div key={i} className="border-b py-3">
              <p className="font-semibold">
                {review.name} — {review.rating}⭐
              </p>
              <p className="text-gray-600 text-sm">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {/* Review Form */}
        <ReviewForm tutorId={id} onReviewAdded={refetch} />
      </motion.div>

      {/* ================= Modal ================= */}
      <motion.div>
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-primary rounded-xl shadow-lg p-6 max-w-sm w-full text-center">
              <h2 className="text-xl text-accent font-bold mb-3">
                💬 Chat Feature
              </h2>
              <p className="text-secondary mb-4">
                Coming soon... Working in progress 🚀
              </p>
              <button
                className="btn btn-outline btn-accent w-full"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default TutorDetails;
