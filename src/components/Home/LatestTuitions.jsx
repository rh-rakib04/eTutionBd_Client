import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loading from "../Loading";
import TuitionCard from "../TuitionCard";
import useAxiosInstance from "../../hooks/useAxiosInstance";

const LatestTuitions = () => {
  const axios = useAxiosInstance();

  const {
    data: tuitions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["latest-tuitions"],
    queryFn: async () => {
      const res = await axios.get(`/tuitions?status=approved`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-indigo-500/5 to-purple-500/5"></div>

      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Latest Tuitions
        </h2>
        <p className="text-center text-base-content/70 mb-10">
          Explore the newest tuition opportunities posted by students
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tuitions.slice(0, 6).map((tuition) => (
            <TuitionCard key={tuition._id} tuition={tuition} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/tuitions" className="btn btn-outline btn-primary">
            See More Tuitions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestTuitions;
