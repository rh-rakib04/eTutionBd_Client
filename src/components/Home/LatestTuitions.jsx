import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import Loading from "../Loading";
import TuitionCard from "../TuitionCard";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import SectionHeader from "../SectionHeader";

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
  console.log(tuitions.tuitions);
  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-500">{error.message}</p>;

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-indigo-500/5 to-purple-500/5"></div>

      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title=" Latest"
          highlight="Tuitions"
          subtitle="   Explore the newest tuition opportunities posted by students"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tuitions?.tuitions?.slice(0, 6).map((tuition) => (
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
