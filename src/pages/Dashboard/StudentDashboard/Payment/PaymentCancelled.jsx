// PaymentCancelled.jsx
import React from "react";
import { Link } from "react-router";
import { XCircle } from "lucide-react";

const PaymentCancelled = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-100 p-6">
      <div className="bg-white p-10 rounded-xl shadow-lg text-center animate-fadeIn w-full max-w-md">
        {/* Animated Cancel Icon */}
        <XCircle size={64} className="text-red-500 mx-auto mb-4 animate-pulse" />

        <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
        <p className="text-gray-700 mb-6">
          Your payment was not completed. You can try again or return to your dashboard.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link to="/dashboard/payment" className="btn btn-primary w-full">
            View Payment History
          </Link>
          <Link to="/dashboard/home" className="btn btn-secondary w-full">
            Go to Dashboard Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelled;
