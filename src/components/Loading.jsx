import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-base-100">
      <motion.div
        className="w-16 h-16 bg-primary"
        animate={{
          rotateX: [0, 180, 180, 0],
          rotateY: [0, 0, 180, 180],
          scale: [1, 1.2, 1, 1],
        }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          borderRadius: "10px",
          transformStyle: "preserve-3d",
        }}
      />

      <motion.h2
        className="mt-6 text-primary font-bold text-xl"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        eTuitionBd
      </motion.h2>
    </div>
  );
}
