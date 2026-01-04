import { motion } from "framer-motion";

const HoverCard = ({ icon: Icon, title, desc, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group p-6 rounded-2xl bg-base-100/80 backdrop-blur-xl 
                 border border-base-300 hover:border-indigo-500/50
                 hover:shadow-xl hover:shadow-indigo-500/10
                 transition-all"
    >
      {Icon && (
        <div
          className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 
                        flex items-center justify-center mb-4 
                        group-hover:scale-110 transition"
        >
          <Icon className="text-white w-6 h-6" />
        </div>
      )}

      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {desc && <p className="text-sm text-base-content/70">{desc}</p>}
    </motion.div>
  );
};

export default HoverCard;
