import { useQuery } from "@tanstack/react-query";
import { CheckCircle, XCircle } from "lucide-react";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";

const TuitionManagement = () => {
  const axiosSecure = useAxios();

  const {
    data: tuitions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tuitions"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tuitions");
      return res.data;
    },
  });

  // Approve tuition
  const handleApprove = async (id) => {
    await axiosSecure.patch(`/tuitions/${id}`, { status: "approved" });
    refetch();
  };

  // Reject tuition
  const handleReject = async (id) => {
    await axiosSecure.patch(`/tuitions/${id}`, { status: "rejected" });
    refetch();
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Tuition Management</h2>
        <p className="text-sm text-gray-500">
          Manage all tuition requests posted by students
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Subject</th>
              <th>Class</th>
              <th>Location</th>
              <th>Budget</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tuitions.map((t) => (
              <tr key={t._id} className="hover:bg-base-200 transition">
                <td className="font-semibold">{t.subject}</td>
                <td>{t.classLevel}</td>
                <td>{t.location}</td>
                <td className="text-primary font-bold">TK {t.salary}</td>
                <td>
                  <span
                    className={`badge ${
                      t.status === "pending"
                        ? "badge-warning"
                        : t.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td className="text-center">
                  {t.status === "pending" ? (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleApprove(t._id)}
                        className="btn btn-sm btn-success"
                      >
                        <CheckCircle size={16} /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(t._id)}
                        className="btn btn-sm btn-error"
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-gray-400 text-sm italic">
                      No actions available
                    </span>
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

export default TuitionManagement;
