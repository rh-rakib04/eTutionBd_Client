import React, { useRef } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

import useAxios from "../hooks/useAxios";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "./Loading";
import ErrorPage from "./ErrorPage";
import ApplyTutorModal from "../pages/Dashboard/TutorDashboard/ApplyTutorModal";

// InfoCard for uniform stats display
const InfoCard = ({ title, value }) => (
  <motion.div
    className="border rounded-lg p-4 text-center bg-base-100/60 backdrop-blur-md shadow hover:shadow-lg transition"
    whileHover={{ scale: 1.05 }}
  >
    <p className="text-sm text-gray-400">{title}</p>
    <p className="font-semibold text-lg">{value}</p>
  </motion.div>
);

const TuitionDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { role } = useRole();
  const axiosInstance = useAxios();
  const applyModalRef = useRef();

  const { data: tuition, isLoading, isError } = useQuery({
    queryKey: ["tuitionDetails", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/tuitions/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <Link to="/tuitions" className="text-sm text-gray-500 hover:underline">
        ← Back to Tuitions
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 space-y-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg"
        >
          <img
            src={tuition.image || "https://source.unsplash.com/800x400/?study"}
            alt={tuition.subject}
            className="w-full h-64 object-cover rounded-xl border border-white/30"
          />

          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {tuition.subject} – {tuition.classLevel}
            </h1>
            <span className="bg-green-500/20 text-green-300 text-sm px-3 py-1 rounded-full">
              {tuition.status}
            </span>
          </div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            <InfoCard title="Subject" value={tuition.subject} />
            <InfoCard title="Class" value={tuition.classLevel} />
            <InfoCard title="Location" value={tuition.location} />
            <InfoCard title="Budget" value={`৳${tuition.salary}`} />
          </motion.div>

          <div>
            <h2 className="text-xl font-semibold mb-2">About This Tuition</h2>
            <p className="leading-relaxed">{tuition.description}</p>
          </div>

          <div className="bg-gradient-to-r from-purple-400 to-indigo-400 rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
            <div>
              <p className="text-sm opacity-80">Schedule</p>
              <p className="font-semibold">{tuition.daysPerWeek} days / week</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Duration</p>
              <p className="font-semibold">{tuition.duration} hours / class</p>
            </div>
            <div>
              <p className="text-sm opacity-80">Start Date</p>
              <p className="font-semibold">
                {new Date(tuition.createdAt).toDateString()}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Requirements</h2>
            <ul className="list-disc list-inside space-y-1 ">
              <li>Strong knowledge of {tuition.subject}</li>
              <li>Experience teaching {tuition.classLevel}</li>
              <li>Good communication skills</li>
              <li>Patient and responsible</li>
            </ul>
          </div>
        </motion.div>

        {/* RIGHT SIDEBAR */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="border rounded-xl p-5 h-fit shadow-sm space-y-4"
        >
          <div>
            <p className="text-sm text-gray-500">Budget Range</p>
            <h2 className="text-lg font-bold text-purple-600">৳{tuition.salary}</h2>
          </div>

          <div>
            <p className="text-sm text-gray-500">Applicants</p>
            <p className="font-semibold">{tuition.applied || 0}</p>
          </div>

          {role === "tutor" ? (
            tuition.status === "assigned" ? (
              <button
                disabled
                className="w-full p-2 rounded-lg mt-5 bg-green-600 text-white cursor-not-allowed"
              >
                Tuition Assigned
              </button>
            ) : (
              <button
                onClick={() => applyModalRef.current.showModal()}
                className="w-full p-2 rounded-lg mt-5 bg-purple-600 hover:bg-purple-700 text-white transition"
              >
                Apply As Tutor
              </button>
            )
          ) : (
            <button
              disabled
              className="w-full p-2 rounded-lg mt-5 bg-gray-400 text-gray-700 cursor-not-allowed"
            >
              Apply As Tutor
            </button>
          )}

          <p className="text-xs text-center text-gray-400 mt-3">
            Not a tutor?{" "}
            <Link to="/be-a-tutor" className="text-purple-600 underline">
              Register here
            </Link>
          </p>
        </motion.div>
      </div>

      {user && (
        <ApplyTutorModal
          modalRef={applyModalRef}
          tuition={tuition}
          axiosSecure={axiosInstance}
          user={user}
        />
      )}
    </div>
  );
};

export default TuitionDetails;
