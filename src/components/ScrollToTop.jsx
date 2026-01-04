import { useState, useEffect } from "react";
import { HiArrowUp } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      setVisible(scrollTop > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const container = document.querySelector("html, body");
    window.scrollTo({ top: 0, behavior: "smooth" }); // works for window scroll
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-[9999] w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center shadow-lg hover:scale-110 transition-all"
        >
          <HiArrowUp className="text-2xl" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
