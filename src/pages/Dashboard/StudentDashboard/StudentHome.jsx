import { useQuery } from "@tanstack/react-query";
import { FaMoneyBillWave, FaBookOpen, FaClipboardList } from "react-icons/fa";
import { Link } from "react-router";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";

const StudentDashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  // Fetch student payments
  const { data: payments = [], isLoading: loadingPayments } = useQuery({
    queryKey: ["studentPayments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  // Fetch student applications
  const { data: applications = [], isLoading: loadingApps } = useQuery({
    queryKey: ["studentApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/applications/student?email=${user.email}`
      );
      return res.data;
    },
  });

  // Fetch student ongoing tuitions
  const { data: tuitions = [], isLoading: loadingTuitions } = useQuery({
    queryKey: ["studentTuitions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/tuitions?status=approved&email=${user.email}&role=student`
      );
      return res.data;
    },
  });

  if (loadingPayments || loadingApps || loadingTuitions) return <Loading />;

  // Stats
  const totalSpent = payments.reduce((sum, p) => sum + p.amount, 0);
  const activeTuitions = tuitions.length;
  const applicationsSent = applications.length;

  // Recent activity (combine payments + applications)
  const recentActivity = [
    ...payments.slice(0, 3).map((p) => ({
      message: `Paid ৳${p.amount} to ${p.tutorName}`,
      date: p.paidAt,
    })),
    ...applications.slice(0, 3).map((a) => ({
      message: `Applied for ${a.subject} — Class ${a.classLevel}`,
      date: a.createdAt,
    })),
  ].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="p-6">
      {/* Welcome Banner */}
      <div className="bg-primary text-primary-content rounded-xl p-6 mb-8 shadow">
        <h2 className="text-2xl font-bold">
          Hello {user?.displayName || "Student"} 👋
        </h2>
        <p className="text-sm">
          Here’s a quick snapshot of your learning journey.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-200 p-6 shadow">
          <FaMoneyBillWave className="text-primary text-3xl mb-2" />
          <h3 className="text-secondary">Total Spent</h3>
          <p className="text-2xl font-bold text-primary">{totalSpent} BDT</p>
        </div>
        <div className="card bg-base-200 p-6 shadow">
          <FaBookOpen className="text-secondary text-3xl mb-2" />
          <h3 className="text-secondary">Active Tuitions</h3>
          <p className="text-2xl font-bold text-primary">{activeTuitions}</p>
        </div>
        <div className="card bg-base-200 p-6 shadow">
          <FaClipboardList className="text-primary text-3xl mb-2" />
          <h3 className="text-secondary">Applications Sent</h3>
          <p className="text-2xl font-bold text-primary">{applicationsSent}</p>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-base-200 rounded-xl shadow p-6 mb-8">
        <h3 className="text-lg font-semibold text-secondary mb-4">
          Recent Activity
        </h3>
        {recentActivity.length === 0 ? (
          <p className="text-base-content italic">No recent activity yet.</p>
        ) : (
          <ul className="space-y-3">
            {recentActivity.map((item, i) => (
              <li
                key={i}
                className="flex justify-between items-center border-b pb-2"
              >
                <span>{item.message}</span>
                <span className="text-sm text-primary">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/dashboard/payments" className="btn btn-primary">
          Payment History
        </Link>
        <Link to="/dashboard/my-application" className="btn btn-secondary">
          My Applications
        </Link>
        <Link to="/dashboard/ongoing-tuition" className="btn btn-accent">
          Ongoing Tuitions
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboardHome;
