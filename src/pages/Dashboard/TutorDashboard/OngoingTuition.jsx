import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";


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

  if (tuitions.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">No ongoing tuitions yet</p>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">My Ongoing Tuitions</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra text-center">
          <thead>
            <tr className="text-accent">
              <th>Subject</th>
              <th>Class</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Student</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {tuitions.map((t) => (
              <tr key={t.applicationId}>
                <td className="font-semibold">{t.subject}</td>
                <td>{t.classLevel}</td>
                <td>{t.location}</td>
                <td>৳{t.salary}</td>
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
