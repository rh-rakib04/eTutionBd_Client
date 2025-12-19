import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import { BookOpen } from "lucide-react";

const OngoingTuition = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const { data: tuitions = [], isLoading } = useQuery({
    queryKey: ["tutor-ongoing-tuitions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tutor/ongoing-tuitions?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  /* 🟡 Empty State */
  if (tuitions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <BookOpen size={60} className="text-secondary mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-primary">No Ongoing Tuitions</h2>
        <p className="text-base-content">You don’t have any active tuition assignments yet.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary">My Ongoing Tuitions</h2>

      <div className="overflow-x-auto bg-base-200 rounded-xl shadow-lg border border-base-300">
        <table className="table w-full text-left">
          <thead className="bg-primary text-primary-content">
            <tr>
              <th>Subject</th>
              <th>Class</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Student</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {tuitions.map((t, i) => (
              <tr
                key={t.applicationId}
                className={i % 2 === 0 ? "bg-base-100" : "bg-base-300"}
              >
                <td className="font-semibold text-secondary">{t.subject}</td>
                <td>{t.classLevel}</td>
                <td>{t.location}</td>
                <td className="text-primary font-semibold">৳{t.salary}</td>
                <td>{t.studentEmail}</td>
                <td>
                  <span className="badge badge-success">Ongoing</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OngoingTuition;
