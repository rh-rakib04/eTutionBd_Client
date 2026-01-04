import { motion } from "framer-motion";

const SectionHeader = ({ title, highlight, subtitle, center = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}
      className={`${center ? "text-center" : ""} mb-14`}
    >
      <h2 className="text-3xl md:text-4xl font-bold leading-tight">
        {title}{" "}
        {highlight && (
          <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p className="mt-4 max-w-2xl mx-auto text-base-content/70">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
