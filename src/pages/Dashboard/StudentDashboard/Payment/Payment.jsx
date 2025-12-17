import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../../hooks/useAxios";
import useAuth from "../../../../hooks/useAuth";
import Loading from "../../../../components/Loading";

const Payment = () => {
  const axiosSecure = useAxios();
  const { user } = useAuth();

  const {
    data: payments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  if (payments.length === 0)
    return <p className="text-center mt-10">No payment history yet.</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra text-center">
          <thead>
            <tr className="text-accent">
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
              <tr key={p.transactionId}>
                <td>{p.subject || "-"}</td>
                <td>{p.tutorName || "-"}</td>
                <td>৳{p.amount}</td>
                <td>
                  <span
                    className={`badge ${
                      p.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {p.paymentStatus}
                  </span>
                </td>
                <td>{p.transactionId}</td>
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
