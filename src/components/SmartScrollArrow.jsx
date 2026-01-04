import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HiArrowDown, HiArrowUp } from "react-icons/hi";

const SmartScrollArrow = () => {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.body.scrollHeight;
      setAtBottom(scrollTop + windowHeight >= fullHeight - 20); // near bottom
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50 w-12 h-12 
        rounded-full bg-primary text-primary-content 
        flex items-center justify-center shadow-lg"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    >
      {atBottom ? (
        <HiArrowUp className="text-2xl" />
      ) : (
        <HiArrowDown className="text-2xl" />
      )}
    </motion.div>
  );
};

export default SmartScrollArrow;
