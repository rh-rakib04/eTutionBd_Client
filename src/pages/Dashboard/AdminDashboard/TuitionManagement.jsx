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
        <h2 className="text-3xl font-bold text-primary ">Tuition Management</h2>
        <p className="text-sm ">
          Manage all tuition requests posted by students
        </p>
      </div>

      {/* Glassy Table */}
      <div className="overflow-x-auto rounded-2xl shadow-lg 
        bg-accent/10 backdrop-blur-md border border-primary/20">
        <table className="table w-full ">
          <thead className="bg-accent/10 ">
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
              <tr
                key={t._id}
                className="hover:bg-accent/10 transition border-b border-primary/10"
              >
                <td className="font-semibold">{t.subject}</td>
                <td>{t.classLevel}</td>
                <td>{t.location}</td>
                <td className="text-primary font-bold">৳{t.salary}</td>
                <td>
                  <span
                    className={`badge px-3 py-1 rounded-full text-xs font-semibold ${
                      t.status === "pending"
                        ? "bg-yellow-500/20 text-yellow-300"
                        : t.status === "approved"
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
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
                        className="btn btn-sm bg-green-600 hover:bg-green-700  flex items-center gap-1"
                      >
                        <CheckCircle size={16} /> Approve
                      </button>
                      <button
                        onClick={() => handleReject(t._id)}
                        className="btn btn-sm bg-red-600 hover:bg-red-700  flex items-center gap-1"
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  ) : (
                    <span className="/50 text-sm italic">
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
