import { motion, useScroll } from "framer-motion";
import { HiArrowDown } from "react-icons/hi";

const ScrollIndicator = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 1 }}
      animate={{
        opacity: scrollYProgress.get() > 0.85 ? 0 : 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-12 h-12 rounded-full
        bg-primary text-primary-content
        flex items-center justify-center
        shadow-lg"
      >
        <HiArrowDown className="text-2xl" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;
