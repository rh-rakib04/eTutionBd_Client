import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { FaMoneyBillWave, FaExchangeAlt } from "react-icons/fa";
import useAxios from "../../../hooks/useAxios";
import useAuth from "../../../hooks/useAuth";

const RevenueHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/payments/tutor?email=${user.email}`)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error(err));
  }, [user?.email]);

  const totalEarnings = payments.reduce((sum, p) => sum + p.amount, 0);

  const chartData = payments.map((p) => ({
    date: new Date(p.paidAt).toLocaleDateString(),
    amount: p.amount,
    tuition: p.tuitionName,
  }));

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-primary">
        Tutor Revenue History
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="flex items-center bg-base-200 rounded-lg p-6 shadow">
          <FaMoneyBillWave className="text-primary text-3xl mr-4" />
          <div>
            <h3 className="text-secondary">Total Earnings</h3>
            <p className="text-2xl font-bold text-primary">
              {totalEarnings} BDT
            </p>
          </div>
        </div>
        <div className="flex items-center bg-base-200 rounded-lg p-6 shadow">
          <FaExchangeAlt className="text-secondary text-3xl mr-4" />
          <div>
            <h3 className="text-secondary">Total Transactions</h3>
            <p className="text-2xl font-bold text-primary">
              {payments.length}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      {payments.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {/* Line Chart */}
          <div className="bg-base-200 rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-4 text-secondary">
              Earnings Over Time
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="hsl(var(--p))" // primary color
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-base-200 rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold mb-4 text-secondary">
              Revenue by Tuition
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tuition" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="hsl(var(--s))" /> {/* secondary color */}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <p className="text-center text-secondary italic">
          No revenue records found yet.
        </p>
      )}

      {/* Table */}
      {payments.length > 0 && (
        <div className="bg-base-200 rounded-lg shadow overflow-hidden">
          <table className="table-auto w-full text-left">
            <thead className="bg-primary text-white">
              <tr>
                <th className="px-4 py-2">Tuition</th>
                <th className="px-4 py-2">Student</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr
                  key={p._id}
                  className={i % 2 === 0 ? "bg-base-100" : "bg-base-200"}
                >
                  <td className="px-4 py-2">{p.tuitionName}</td>
                  <td className="px-4 py-2">{p.studentEmail}</td>
                  <td className="px-4 py-2 text-primary font-semibold">
                    {p.amount} BDT
                  </td>
                  <td className="px-4 py-2">
                    {new Date(p.paidAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RevenueHistory;
