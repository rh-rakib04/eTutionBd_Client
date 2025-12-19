import { useQuery } from "@tanstack/react-query";
import { FaMoneyBillWave, FaBookOpen, FaUsers } from "react-icons/fa";
import { Link } from "react-router";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../../components/Loading";

const TutorHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  // Fetch tutor payments
  const { data: payments = [], isLoading: loadingPayments } = useQuery({
    queryKey: ["tutorPayments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/tutor?email=${user.email}`);
      return res.data;
    },
  });

  // Fetch ongoing tuitions
  const { data: tuitions = [], isLoading: loadingTuitions } = useQuery({
    queryKey: ["tutorTuitions", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutor/ongoing-tuitions?email=${user.email}`);
      return res.data;
    },
  });

  // Fetch applications
  const { data: applications = [], isLoading: loadingApps } = useQuery({
    queryKey: ["tutorApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications/tutor?email=${user.email}`);
      return res.data;
    },
  });

  if (loadingPayments || loadingTuitions || loadingApps) return <Loading />;

  // Stats
  const totalEarnings = payments.reduce((sum, p) => sum + p.amount, 0);
  const activeTuitions = tuitions.length;
  const pendingApplications = applications.filter((a) => a.status === "pending").length;

  // Recent activity (combine payments + applications)
  const recentActivity = [
    ...payments.slice(0, 3).map((p) => ({
      message: `Payment received: ৳${p.amount} from ${p.studentEmail}`,
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
        <h2 className="text-2xl font-bold">Hello {user?.displayName || "Tutor"} 👋</h2>
        <p className="text-sm">Here’s a quick snapshot of your tutoring journey.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-base-200 p-6 shadow">
          <FaMoneyBillWave className="text-primary text-3xl mb-2" />
          <h3 className="text-secondary">Total Earnings</h3>
          <p className="text-2xl font-bold text-primary">{totalEarnings} BDT</p>
        </div>
        <div className="card bg-base-200 p-6 shadow">
          <FaBookOpen className="text-secondary text-3xl mb-2" />
          <h3 className="text-secondary">Active Tuitions</h3>
          <p className="text-2xl font-bold text-primary">{activeTuitions}</p>
        </div>
        <div className="card bg-base-200 p-6 shadow">
          <FaUsers className="text-primary text-3xl mb-2" />
          <h3 className="text-secondary">Pending Applications</h3>
          <p className="text-2xl font-bold text-primary">{pendingApplications}</p>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-base-200 rounded-xl shadow p-6 mb-8">
        <h3 className="text-lg font-semibold text-secondary mb-4">Recent Activity</h3>
        {recentActivity.length === 0 ? (
          <p className="text-base-content italic">No recent activity yet.</p>
        ) : (
          <ul className="space-y-3">
            {recentActivity.map((item, i) => (
              <li key={i} className="flex justify-between items-center border-b pb-2">
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
        <Link to="/dashboard/revenue-history" className="btn btn-primary">
          Revenue History
        </Link>
        <Link to="/dashboard/my-applications" className="btn btn-secondary">
          My Applications
        </Link>
        <Link to="/dashboard/ongoing-tuitions" className="btn btn-accent">
          Ongoing Tuitions
        </Link>
      </div>
    </div>
  );
};

export default TutorHome;
