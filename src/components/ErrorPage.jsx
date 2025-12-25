import React from "react";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

const ErrorPage = () => {
  const errorMessage = "Something went wrong. Please try again or contact support.";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-indigo-200/5 to-purple-500/5 p-6">
      <motion.div
        className="bg-white p-10 rounded-xl shadow-lg text-center w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ rotate: -20, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <XCircle
            size={80}
            className="text-red-500 mx-auto mb-6 animate-pulse"
          />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-3xl font-bold text-red-600 mb-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Oops! Something Went Wrong
        </motion.h1>

        {/* Message */}
        <motion.p
          className="text-gray-700 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          The page you’re looking for doesn’t exist or an unexpected error occurred.
        </motion.p>

        {/* Error Details */}
        <motion.div
          className="bg-red-50 border border-red-200 rounded-lg p-4 text-left text-sm text-red-700 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <strong>Error Details:</strong>
          <pre className="whitespace-pre-wrap mt-2">{errorMessage}</pre>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <a href="/" className="btn btn-primary w-full">
            Go Back Home
          </a>
          <a href="/dashboard" className="btn btn-secondary w-full">
            Go to Dashboard
          </a>
          <a
            href={`mailto:support@etutionbd.com?subject=Error Report&body=${encodeURIComponent(errorMessage)}`}
            className="btn btn-outline w-full"
          >
            Report This Issue
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
