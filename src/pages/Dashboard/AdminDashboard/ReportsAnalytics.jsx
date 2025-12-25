import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";
import { Users, BookOpen, DollarSign, Activity } from "lucide-react";

const ReportsAnalytics = () => {
  const axiosSecure = useAxios();

  // Queries
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });

  const { data: tuitions = [], isLoading: tuitionsLoading } = useQuery({
    queryKey: ["tuitions"],
    queryFn: async () => (await axiosSecure.get("/tuitions")).data,
  });

  const { data: payments = [], isLoading: paymentsLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => (await axiosSecure.get("/payments/admin")).data,
  });

  if (usersLoading || tuitionsLoading || paymentsLoading) return <Loading />;

  // Stats
  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
  const totalUsers = users.length;
  const totalTuitions = tuitions.length;
  const completedPayments = payments.filter((p) => p.paymentStatus === "paid").length;

  // Tuition Distribution
  const statusCounts = tuitions?.tuitions?.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});
  const tuitionStatusData = Object.entries(statusCounts).map(([status, count]) => ({
    status,
    count,
  }));

  // Revenue Trend
  const revenueByMonth = payments.reduce((acc, p) => {
    const month = new Date(p.paidAt).toLocaleDateString("en-US", { month: "short" });
    acc[month] = (acc[month] || 0) + p.amount;
    return acc;
  }, {});
  const revenueData = Object.entries(revenueByMonth).map(([month, amount]) => ({
    month,
    amount,
  }));

  // Custom colors
  const COLORS = ["#6366F1", "#F43F5E", "#22C55E", "#FACC15"];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-primary">Reports & Analytics</h1>
      <p className="text-base-content/70">Platform performance overview</p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`৳${totalRevenue}`} icon={<DollarSign />} />
        <StatCard title="Total Users" value={totalUsers} icon={<Users />} />
        <StatCard title="Total Tuitions" value={totalTuitions} icon={<BookOpen />} />
        <StatCard title="Completed Payments" value={completedPayments} icon={<Activity />} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tuition Status Pie */}
        <div className="bg-base-200 rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Tuition Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={tuitionStatusData} dataKey="count" nameKey="status" cx="50%" cy="50%" outerRadius={100}>
                {tuitionStatusData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Trend Bar */}
        <div className="bg-base-200 rounded-xl p-6 shadow">
          <h2 className="text-xl font-semibold mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `৳${value}`} />
              <Legend />
              <Bar dataKey="amount" fill="#6366F1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => (
  <div className="bg-base-200 rounded-xl p-6 shadow flex items-center justify-between">
    <div>
      <p className="text-sm text-base-content/70">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
    <div className="p-3 bg-primary rounded-lg text-white">{icon}</div>
  </div>
);

export default ReportsAnalytics;
