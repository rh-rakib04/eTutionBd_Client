import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosInstance from "../../hooks/useAxiosInstance";
import Loading from "../Loading";
import TutorCard from "../TutorCard";
import SectionHeader from "../SectionHeader";

const LatestTutors = () => {
  const axios = useAxiosInstance();

  const {
    data: tutors = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["latest-tutors"],
    queryFn: async () => {
      const res = await axios.get("/tutors");
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
        <SectionHeader
          title="Latest"
          highlight="Tutors"
          subtitle=" Meet some of the newest tutors who joined our platform"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.slice(0, 6).map((tutor) => (
            <TutorCard key={tutor._id} tutor={tutor} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/tutors" className="btn btn-outline btn-primary">
            See More Tutors
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestTutors;
