// PaymentSuccess.jsx
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxios from "../../../../hooks/useAxios";
import { CheckCircle, XCircle, Loader } from "lucide-react";

const PaymentSuccess = () => {
  const axios = useAxios();

  // Get session_id from URL
  const sessionId = new URLSearchParams(window.location.search).get(
    "session_id"
  );

  // TanStack Query for payment verification
  const { data, isLoading, isError } = useQuery({
    queryKey: ["payment-success", sessionId],
    enabled: !!sessionId,
    queryFn: async () => {
      const res = await axios.patch(
        `/tutor-payment-success?session_id=${sessionId}`
      );
      return res.data;
    },
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100 p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center animate-fadeIn w-full max-w-md">
        {isLoading && (
          <div className="flex flex-col items-center">
            <Loader size={48} className="animate-spin text-primary mb-4" />
            <h1 className="text-xl font-semibold text-gray-700">
              Processing payment...
            </h1>
          </div>
        )}

        {!isLoading && isError && (
          <>
            <XCircle
              size={64}
              className="text-red-500 mx-auto mb-4 animate-pulse"
            />
            <h1 className="text-2xl font-bold mb-4">
              Something went wrong while processing payment.
            </h1>
          </>
        )}

        {!isLoading && !isError && (
          <>
            {data?.success ? (
              <>
                <CheckCircle
                  size={64}
                  className="text-green-500 mx-auto mb-4 animate-bounce"
                />
                <h1 className="text-2xl font-bold mb-4">
                  Payment successful! Tutor approved for "
                  {data.tuitionName || data.subject}"
                </h1>
              </>
            ) : (
              <>
                <XCircle
                  size={64}
                  className="text-red-500 mx-auto mb-4 animate-pulse"
                />
                <h1 className="text-2xl font-bold mb-4">
                  {data?.message || "Payment verification failed."}
                </h1>
              </>
            )}

            <div className="flex flex-col gap-3 mt-6">
              <Link to="/dashboard/payment" className="btn btn-primary w-full">
                View Payment History
              </Link>
              <Link to="/dashboard/home" className="btn btn-secondary w-full">
                Go to Dashboard Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
