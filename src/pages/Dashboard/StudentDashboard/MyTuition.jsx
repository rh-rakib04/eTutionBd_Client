import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Plus } from "lucide-react";
import { Link } from "react-router";

const MyTuition = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxios();

  const { data: tuitions = [], refetch } = useQuery({
    queryKey: ["myTuition", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitions?email=${user.email}`);
      return res.data;
    },
  });
  // loading
  if (loading) return <Loading />;
  // empty
  if (tuitions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <BookOpen size={64} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-6">My Tuitions</h2>
        <h2 className="text-xl font-semibold mb-2">No Tuitions Posted Yet</h2>
        <p className="text-gray-500 mb-4">
          You haven’t posted any tuition requests.
        </p>

        <Link to="/dashboard/post-tuition" className="btn btn-primary">
          <Plus size={18} /> Post a Tuition
        </Link>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Tuitions</h2>

      <div className="space-y-4">
        {tuitions.map((tuition) => (
          <div
            key={tuition._id}
            className="p-4 border rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">
                {tuition.subject} - Class {tuition.classLevel}
              </h3>
              <p className="text-sm text-gray-500">
                {tuition.location} | {tuition.salaryRange}
              </p>
              <p className="text-sm">
                Tutors Applied:
                {/* {tuition.appliedTutors.length} */}
              </p>
            </div>

            <span
              className={`badge ${
                tuition.status === "active" ? "badge-success" : "badge-ghost"
              }`}
            >
              {tuition.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTuition;
