// PaymentSuccess.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAxios from "../../../../hooks/useAxios";

const PaymentSuccess = () => {
  const axios = useAxios();
  const [tuitionName, setTuitionName] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Processing payment...");

  useEffect(() => {
    const processPayment = async () => {
      const sessionId = new URLSearchParams(window.location.search).get(
        "session_id"
      );
      if (!sessionId) {
        setMessage("No session ID found. Payment could not be verified.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.patch(
          `/tutor-payment-success?session_id=${sessionId}`
        );

        if (res.data.success) {
          setTuitionName(res.data.subject); // store tuition name
          setMessage(
            `Payment successful! Tutor approved for "${res.data.subject}"`
          );
          setTimeout(() => navigate("/dashboard/applied-tutors"), 2000);
        } else {
          setMessage(res.data.message || "Payment verification failed.");
        }
      } catch (error) {
        console.error(error);
        setMessage("Something went wrong while processing payment.");
      } finally {
        setLoading(false);
      }
    };

    processPayment();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {!loading && (
        <div className="bg-white p-8 rounded shadow-md text-center">
          <h1 className="text-2xl font-bold mb-4">{message}</h1>
          {tuitionName && (
            <p className="text-lg text-gray-700">Tuition: {subject}</p>
          )}
          <p className="text-gray-600 mt-2">
            Redirecting you to your applied tutors page...
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
