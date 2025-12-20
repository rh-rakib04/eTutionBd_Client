import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import { BookOpen, CheckCircle, Flag, SquareCheckBig } from "lucide-react";
import Swal from "sweetalert2";

const OngoingTuition = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const {
    data: tuitions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tutor-ongoing-tuitions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tutor/ongoing-tuitions?email=${user.email}`
      );
      return res.data;
    },
  });

  const handleStatusChange = async (id, status) => {
    Swal.fire({
      title: `Are you sure?`,
      text: `Do you want to mark this tuition as "${status}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, mark as ${status}`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        await axiosSecure.patch(`/tuitions/${id}`, { status });
        refetch();
        Swal.fire("Updated!", `Tuition marked as ${status}.`, "success");
      }
    });
  };

  if (isLoading) return <Loading />;

  if (tuitions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <BookOpen size={60} className="text-secondary mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-primary">
          No Ongoing Tuitions
        </h2>
        <p className="text-base-content">
          You don’t have any active tuition assignments yet.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        My Ongoing Tuitions
      </h2>

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
              <th className="text-center">Actions</th>
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
                  <span
                    className={`badge ${
                      t.status === "assigned"
                        ? "badge-warning"
                        : t.status === "ongoing"
                        ? "badge-success"
                        : t.status === "completed"
                        ? "badge-info"
                        : "badge-ghost"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="text-center">
                  {t.tuitionStatus === "assigned" && (
                    <button
                      onClick={() => handleStatusChange(t.tuitionId, "ongoing")}
                      className="btn btn-sm btn-accent mr-2"
                    >
                      <CheckCircle size={16} /> Start
                    </button>
                  )}
                  {t.tuitionStatus === "ongoing" && (
                    <button
                      onClick={() =>
                        handleStatusChange(t.tuitionId, "completed")
                      }
                      className="btn btn-sm btn-info"
                    >
                      <Flag size={16} /> Complete
                    </button>
                  )}
                  {t.tuitionStatus === "completed" && (
                    <button className="btn btn-sm btn-success">
                      <SquareCheckBig size={16} /> Completed
                    </button>
                  )}
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
