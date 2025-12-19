import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import useAuth from "../../../hooks/useAuth";

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
    return <p className="text-center mt-10">No applications yet</p>;
  }

  // ✅ Approve Tutor
  const handleApprove = async (app) => {
    Swal.fire({
      title: "Proceed to Payment?",
      text: `Approve tutor by paying ৳${app.expectedSalary}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Pay for Approve",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Create Stripe checkout session
          const res = await axiosSecure.post("/create-tutor-checkout-session", {
            amount: app.expectedSalary,
            tutorName: app.tutorName,
            tutorEmail: app.tutorEmail,
            studentEmail: user.email,
            subject: app.subject,
            applicationId: app._id,
            tuitionId: app.tuitionId,
          });

          // Redirect to Stripe
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

  // ❌ Reject Tutor
  const handleReject = async (id) => {
    await axiosSecure.patch(`/applications/reject/${id}`);
    refetch();
    Swal.fire("Rejected", "Tutor rejected", "success");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Applied Tutors</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra text-center">
          <thead>
            <tr className="text-accent">
              <th>Tuition Name</th>
              <th>Tutor</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Expected Salary</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td className="font-bold text-secondary text-xl">
                  {app.subject}
                </td>
                <td>
                  <span>{app.tutorName}</span>
                </td>

                <td>{app.qualification}</td>
                <td>{app.experience} yrs</td>
                <td>৳{app.expectedSalary}</td>

                <td>
                  <span
                    className={`badge ${
                      app.status === "pending"
                        ? "badge-warning"
                        : app.status === "approved"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {app.status}
                  </span>
                </td>

                <td className="flex gap-2">
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
