import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

const ForbiddenPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-red-50 p-6">
      <motion.div
        className="bg-white p-10 rounded-xl shadow-lg text-center w-full max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated Icon */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Lock
            size={80}
            className="text-red-500 mx-auto mb-6 animate-bounce"
          />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className="text-3xl font-bold text-red-600 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          403 - Forbidden
        </motion.h1>

        {/* Message */}
        <motion.p
          className="text-gray-700 mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          You don’t have permission to access this page. Please check your
          account or contact support.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link to="/" className="btn btn-primary w-full">
            Go Back Home
          </Link>
          <Link to="/dashboard/home" className="btn btn-secondary w-full">
            Go to Dashboard
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForbiddenPage;
