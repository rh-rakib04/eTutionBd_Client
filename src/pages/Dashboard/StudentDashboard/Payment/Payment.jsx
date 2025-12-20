import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading";
import { DollarSign, CheckCircle, Clock } from "lucide-react";

const Payment = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <DollarSign size={64} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">No Payment History</h2>
        <p className="text-gray-500">You haven’t made any payments yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-xl shadow-lg p-6">
      <h2 className="text-3xl font-bold text-primary mb-6">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table w-full border border-base-300 rounded-lg shadow-sm text-center">
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Tuition</th>
              <th>Tutor</th>
              <th>Amount (BDT)</th>
              <th>Status</th>
              <th>Transaction ID</th>
              <th>Paid At</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr
                key={p.transactionId}
                className="hover:bg-base-100 transition"
              >
                <td className="font-semibold text-secondary">
                  {p.tuitionName || "-"}
                </td>
                <td>{p.tutorName || "-"}</td>
                <td className="text-primary font-bold">৳{p.amount}</td>

                {/* ✅ Status inline span */}
                <td>
                  <span
                    className={`badge ${
                      p.paymentStatus === "paid"
                        ? "badge-success"
                        : p.paymentStatus === "pending"
                        ? "badge-warning"
                        : "badge-ghost"
                    }`}
                  >
                    {p.paymentStatus}
                  </span>
                </td>

                <td className="text-xs">{p.transactionId}</td>
                <td>{new Date(p.paidAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payment;
