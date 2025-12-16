import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";
import { BookOpen, Trash2 } from "lucide-react";
import Swal from "sweetalert2";

const MyApplications = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxios();

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["myApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications/tutor?email=${user.email}`
      );
      return res.data;
    },
  });

  if (loading || isLoading) return <Loading />;

  /* 🟡 Empty State */
  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <BookOpen size={60} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Applications Yet</h2>
        <p className="text-gray-500">You haven’t applied to any tuition yet.</p>
      </div>
    );
  }
  // Update application
  const handleUpdate = async (id) => {
    const { value: salary } = await Swal.fire({
      title: "Update Expected Salary",
      input: "number",
      inputLabel: "New Salary (৳)",
      inputPlaceholder: "Enter amount",
      showCancelButton: true,
    });

    if (salary) {
      try {
        await axiosSecure.patch(`/applications/${id}`, {
          expectedSalary: Number(salary),
        });

        Swal.fire("Updated!", "Application updated successfully", "success");
        refetch();
      } catch (error) {
        Swal.fire("Error!", "Failed to update application", "error");
      }
    }
  };
  // Delete application
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This application will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/applications/${id}`);
        Swal.fire("Deleted!", "Application has been deleted.", "success");
        refetch();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete application", "error");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">My Applications</h2>

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow border">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Tuition</th>
              <th>Location</th>
              <th>Expected Salary</th>
              <th>Status</th>
              <th>Applied On</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app, index) => (
              <tr key={app._id}>
                <td>{index + 1}</td>

                <td>
                  <p className="font-semibold">
                    {app.subject} — Class {app.classLevel}
                  </p>
                </td>

                <td>{app.location}</td>

                <td>৳{app.expectedSalary}</td>

                <td>
                  <span
                    className={`badge ${
                      app.status === "pending"
                        ? "badge-warning"
                        : app.status === "accepted"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>

                <td>{new Date(app.createdAt).toLocaleDateString()}</td>

                <td className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(app._id)}
                    disabled={app.status === "accepted"}
                    className={`btn btn-xs btn-outline ${
                      app.status === "accepted" ? "btn-disabled" : ""
                    }`}
                  >
                    Update
                  </button>

                  <button
                    onClick={() => handleDelete(app._id)}
                    disabled={app.status === "accepted"}
                    className={`btn btn-xs btn-outline text-error ${
                      app.status === "accepted" ? "btn-disabled" : ""
                    }`}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                 
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;
