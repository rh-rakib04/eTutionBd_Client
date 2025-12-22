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

  const handleApprove = async (id) => {
    await axiosSecure.patch(`/tuitions/${id}`, { status: "approved" });
    refetch();
  };

  const handleReject = async (id) => {
    await axiosSecure.patch(`/tuitions/${id}`, { status: "rejected" });
    refetch();
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-primary">Tuition Management</h2>
        <p className="text-sm text-base-content/70">
          Manage all tuition requests posted by students
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg bg-base-100 backdrop-blur-md border border-base-300">
        <table className="table w-full">
          <thead className="bg-base-200">
            <tr>
              <th>Subject</th>
              <th>Class</th>
              <th>Location</th>
              <th>Budget</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tuitions.map((t) => (
              <tr key={t._id} className="hover:bg-base-200/50 transition">
                <td className="font-semibold">{t.subject}</td>
                <td>{t.classLevel}</td>
                <td>{t.location}</td>
                <td className="text-primary font-bold">৳{t.salary}</td>
                <td>
                  <span
                    className={`badge ${
                      t.status === "pending"
                        ? "badge-warning"
                        : t.status === "approved"
                        ? "badge-success"
                        : t.status === "assigned"
                        ? "badge-info"
                        : t.status === "ongoing"
                        ? "badge-secondary"
                        : "badge-success"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td>
                  {t.status === "pending" ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleApprove(t._id)}
                        className="px-3 py-1 rounded-md text-white bg-green-600 hover:bg-green-700 text-sm flex items-center gap-1"
                      >
                        <CheckCircle size={14} /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(t._id)}
                        className="px-3 py-1 rounded-md text-white bg-red-600 hover:bg-red-700 text-sm flex items-center gap-1"
                      >
                        <XCircle size={14} /> Reject
                      </button>
                    </div>
                  ) : (
                    <span className="text-xs italic text-gray-400">
                      No action
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
