import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";
import {
  User,
  GraduationCap,
  Briefcase,
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const AppliedTutors = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const {
    data: applications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["applied-tutors", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications/student?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <User size={64} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Applications Yet</h2>
        <p className="text-gray-500">
          Tutors haven’t applied to your tuitions yet.
        </p>
      </div>
    );
  }

  // Approve Tutor
  const handleApprove = async (app) => {
    Swal.fire({
      title: "Proceed to Payment?",
      text: `Approve ${app.tutorName} by paying ৳${app.expectedSalary}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Pay & Approve",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.post("/create-tutor-checkout-session", {
            amount: app.expectedSalary,
            tutorName: app.tutorName,
            tutorEmail: app.tutorEmail,
            studentEmail: user.email,
            subject: app.subject,
            applicationId: app._id,
            tuitionId: app.tuitionId,
          });
          window.location.replace(res.data.url);
        } catch (error) {
          console.error(error);
          Swal.fire(
            "Error!",
            "Failed to initiate payment. Try again.",
            "error"
          );
        }
      }
    });
  };

  //  Reject Tutor
  const handleReject = async (id) => {
    await axiosSecure.patch(`/applications/reject/${id}`);
    refetch();
    Swal.fire("Rejected", "Tutor rejected successfully", "success");
  };

  return (
    <div className="bg-base-100 rounded-xl shadow-lg p-6">
      <h2 className="text-3xl font-bold text-primary mb-6">Applied Tutors</h2>

      <div className="overflow-x-auto">
        <table className="table w-full border border-base-300 rounded-lg shadow-sm text-center">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Tuition</th>
              <th>Tutor</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Expected Salary</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="hover:bg-base-100 transition">
                <td className="font-semibold text-secondary">{app.subject}</td>
                <td>{app.tutorName}</td>
                <td>
                  <GraduationCap size={14} className="inline mr-1" />{" "}
                  {app.qualification}
                </td>
                <td>
                  <Briefcase size={14} className="inline mr-1" />{" "}
                  {app.experience} yrs
                </td>
                <td className="text-primary font-bold">
                  ৳ {app.expectedSalary}
                </td>

                <td>
                  <span
                    className={`badge ${
                      app.status === "pending"
                        ? "badge-warning"
                        : app.status === "approved"
                        ? "badge-success"
                        : app.status === "rejected"
                        ? "badge-error"
                        : "badge-ghost"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleApprove(app)}
                    className="btn btn-xs btn-success"
                    disabled={app.status !== "pending"}
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(app._id)}
                    className="btn btn-xs btn-error"
                    disabled={app.status !== "pending"}
                  >
                    Reject
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

export default AppliedTutors;
