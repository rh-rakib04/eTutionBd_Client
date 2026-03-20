import { motion } from "framer-motion";

const FeatureHoverCard = ({ children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="relative rounded-2xl p-[2px]"
    >
      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 rounded-2xl
        bg-gradient-to-r from-indigo-500 to-purple-600
        opacity-0"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card Content */}
      <div
        className="relative rounded-2xl
        bg-base-100/90 backdrop-blur-xl
        border border-base-300
        p-6"
      >
        {children}
      </div>
    </motion.div>
  );
};

export default FeatureHoverCard;
