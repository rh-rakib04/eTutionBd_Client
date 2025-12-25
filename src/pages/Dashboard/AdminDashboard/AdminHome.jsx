import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaBookOpen,
  FaMoneyBillWave,
} from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import Loading from "../../../components/Loading";

const AdminHomePage = () => {
  const axiosSecure = useAxios();

  // Queries
  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => (await axiosSecure.get("/users")).data,
  });

  const {
    data: tutors = [],
    isLoading: tutorsLoading,
    isError: tutorsError,
  } = useQuery({
    queryKey: ["tutors"],
    queryFn: async () => (await axiosSecure.get("/tutors")).data,
  });

  const {
    data: tuitions = [],
    isLoading: tuitionsLoading,
    isError: tuitionsError,
  } = useQuery({
    queryKey: ["tuitions"],
    queryFn: async () => (await axiosSecure.get("/tuitions")).data,
  });

  const {
    data: applications = [],
    isLoading: appsLoading,
    isError: appsError,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => (await axiosSecure.get("/applications")).data,
  });

  const {
    data: payments = [],
    isLoading: paymentsLoading,
    isError: paymentsError,
  } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => (await axiosSecure.get("/payments/admin")).data,
  });

  if (
    usersLoading ||
    tutorsLoading ||
    tuitionsLoading ||
    appsLoading ||
    paymentsLoading
  ) {
    return <Loading />;
  }

  if (
    usersError ||
    tutorsError ||
    tuitionsError ||
    appsError ||
    paymentsError
  ) {
    return <div className="text-red-500">Failed to load dashboard data.</div>;
  }

  // Extra analytics
  const totalRevenue = payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  const statusCounts = tuitions?.tuitions?.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <h1 className="text-3xl font-bold text-primary ">Admin Dashboard</h1>
      <p className="text-base-content/70">
        Overview of platform activity and performance
      </p>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-6 gap-6">
        <StatCard icon={<FaUsers />} title="Users" value={users.length} />
        <StatCard
          icon={<FaChalkboardTeacher />}
          title="Tutors"
          value={tutors.length}
        />
        <StatCard
          icon={<FaBookOpen />}
          title="Tuitions"
          value={tuitions.length}
        />
        <StatCard
          icon={<FaBookOpen />}
          title="Applications"
          value={applications.length}
        />
        <StatCard
          icon={<FaMoneyBillWave />}
          title="Payments"
          value={payments.length}
        />
        <StatCard
          icon={<FaMoneyBillWave />}
          title="Revenue"
          value={`৳${totalRevenue}`}
        />
      </div>

      {/* Status Breakdown */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-secondary-content/10 backdrop-blur-md border border-primary/20 rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-xl font-semibold text-primary mb-4">
          Tuition Status Breakdown
        </h2>
        <div className="flex gap-6 ">
          {Object.entries(statusCounts).map(([status, count]) => (
            <div
              key={status}
              className="bg-secondary-content/5 rounded-lg p-4 border border-primary/20 text-center flex-1"
            >
              <h3 className="text-lg font-semibold capitalize">{status}</h3>
              <p className="text-2xl font-bold">{count}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-secondary-content/10 backdrop-blur-md border border-primary/20 rounded-xl p-6 shadow-lg"
      >
        <h2 className="text-xl font-semibold text-primary mb-4">
          Recent Activity
        </h2>
        <div className="grid md:grid-cols-3 gap-6 ">
          <ActivityCard
            title="Latest Tuitions"
            items={tuitions?.tuitions?.slice(0, 5)
              .map((t) => `${t.subject} - ${t.classLevel}`)}
          />
          <ActivityCard
            title="Latest Applications"
            items={applications
              .slice(0, 5)
              .map((a) => `${a.tutorName} applied`)}
          />
          <ActivityCard
            title="Latest Payments"
            items={payments
              .slice(0, 5)
              .map((p) => `৳${p.amount} paid to ${p.tutorName}`)}
          />
        </div>
      </motion.div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-secondary-content/10 backdrop-blur-md border border-primary/20 rounded-xl p-5 shadow-lg text-center text-info"
  >
    <div className="text-3xl mb-2">{icon}</div>
    <h3 className="text-sm text-info/70">{title}</h3>
    <p className="text-xl font-bold">{value}</p>
  </motion.div>
);

const ActivityCard = ({ title, items }) => (
  <div className="bg-secondary-content/5 rounded-lg p-4 border border-primary/20">
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <ul className="space-y-2 text-sm">
      {items.length > 0 ? (
        items.map((item, i) => (
          <li key={i} className="border-b border-primary/10 pb-1">
            {item}
          </li>
        ))
      ) : (
        <li className="text-info/50">No data</li>
      )}
    </ul>
  </div>
);

export default AdminHomePage;
