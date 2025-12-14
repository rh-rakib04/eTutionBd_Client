import { useQuery } from "@tanstack/react-query";
import TutorCard from "../components/TutorCard";
import Loading from "../components/Loading";
import useAxios from "../hooks/useAxios";

const Tutors = () => {
  const axios = useAxios();

  const {
    data: tutors = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => {
      const res = await axios.get("/tutors");
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
      <h1 className="text-4xl my-10 text-center md:text-5xl font-extrabold">
        Our Tutors
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {tutors.map((tutor) => (
          <TutorCard key={tutor._id} tutor={tutor} />
        ))}
      </div>
    </div>
  );
};

export default Tutors;
