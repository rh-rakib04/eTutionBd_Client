import React, { useRef } from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../hooks/useAxios";
import Loading from "./Loading";
import useAuth from "../hooks/useAuth";
import ApplyTutorModal from "../pages/Dashboard/TutorDashboard/ApplyTutorModal";
import useRole from "../hooks/useRole";
import ErrorPage from "./ErrorPage";

const TuitionDetails = () => {
  const { id } = useParams();
  const { role } = useRole();
  const axiosInstance = useAxios();
  const applyModalRef = useRef();
  const { user } = useAuth();

  const {
    data: tuition,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tuitionDetails", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/tuitions/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <ErrorPage />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Back Button */}
      <Link to="/tuitions" className="text-sm text-gray-500 hover:underline">
        ← Back to Tuitions
      </Link>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
        {/* LEFT CONTENT */}
        <div className="lg:col-span-2 space-y-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-lg text-white">
  <img
    src={tuition.image || "https://source.unsplash.com/800x400/?study"}
    alt="Tuition"
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

  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <InfoCard title="Subject" value={tuition.subject} />
    <InfoCard title="Class" value={tuition.classLevel} />
    <InfoCard title="Location" value={tuition.location} />
    <InfoCard title="Budget" value={`৳${tuition.salary}`} />
  </div>

  <div>
    <h2 className="text-xl font-semibold mb-2">About This Tuition</h2>
    <p className="text-white/80 leading-relaxed">{tuition.description}</p>
  </div>

  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
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
    <ul className="list-disc list-inside text-white/70 space-y-1">
      <li>Strong knowledge of {tuition.subject}</li>
      <li>Experience teaching {tuition.classLevel}</li>
      <li>Good communication skills</li>
      <li>Patient and responsible</li>
    </ul>
  </div>
</div>


        {/* RIGHT SIDEBAR */}
        <div className="border rounded-xl p-5 h-fit shadow-sm">
          <p className="text-sm text-gray-500">Budget Range</p>
          <h2 className="text-lg font-bold text-purple-600">
            ৳{tuition.salary}
          </h2>

          <p className="text-sm text-gray-500 mt-4">Applicants</p>
          <p className="font-semibold">12</p>

          <button
            onClick={() =>
              role === "tutor" && applyModalRef.current.showModal()
            }
            disabled={role === "student"} // 🔑 disables for students
            className={`w-full py-2 rounded-lg mt-5 transition 
    ${
      role === "tutor"
        ? "bg-purple-600 hover:bg-purple-700 text-white"
        : "bg-gray-400 text-gray-700 cursor-not-allowed"
    }`}
          >
            Apply As Tutor
          </button>

          <p className="text-xs text-center text-gray-500 mt-3">
            Not a tutor?{" "}
            <Link to="/be-a-tutor" className="text-purple-600 underline">
              Register here
            </Link>
          </p>
        </div>
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

/* Reusable Info Card */
const InfoCard = ({ title, value }) => (
  <div className="border rounded-lg p-3 text-center">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="font-semibold">{value}</p>
  </div>
);

export default TuitionDetails;
