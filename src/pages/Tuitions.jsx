import React from "react";
import TuitionCard from "../components/TuitionCard";
import useAxios from "../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../components/Loading";

const Tuitions = () => {
  const axios = useAxios();

  const {
    data: tuitions = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tuitions"],
    queryFn: async () => {
      const res = await axios.get(`/tuitions?status=approved`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p className="text-red-500">{error.message}</p>;
  }
  return (
    <div className="max-w-7xl mx-auto p-5">
      <h1 className="text-4xl mt-10 text-center md:text-5xl font-extrabold">
        Browse Tuitions
      </h1>
      <p className="text-lg mt-4  text-base-content/70 max-w-2xl text-center mx-auto mb-10">
        Find the perfect tuition for your learning needs
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {tuitions.map((tuition) => (
          <TuitionCard key={tuition._id} tuition={tuition} />
        ))}{" "}
      </div>
    </div>
  );
};

export default Tuitions;
