import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-1 
                 bg-linear-to-r from-indigo-500 to-purple-600 
                 origin-left z-50"
    />
  );
};

export default ScrollProgress;
