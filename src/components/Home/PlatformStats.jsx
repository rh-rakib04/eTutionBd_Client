import { motion } from "framer-motion";
import SectionHeader from "../SectionHeader";

const stats = [
  { label: "Active Tuitions", value: "1200+" },
  { label: "Verified Tutors", value: "850+" },
  { label: "Successful Matches", value: "3400+" },
  { label: "Total Earnings", value: "৳25L+" },
];

const PlatformStats = () => {
  return (
    <section className="py-10 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-indigo-500/5 to-purple-500/5"></div>
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="Platform Impact"
          highlight="In Numbers"
          subtitle="Our growing community and successful matches across Bangladesh."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group p-6 rounded-2xl bg-base-100/80 backdrop-blur-xl
                         border border-base-300 hover:border-indigo-500/50
                         hover:shadow-xl hover:shadow-indigo-500/10
                         transition-all text-center"
            >
              <h3 className="text-3xl font-bold text-primary">{item.value}</h3>
              <p className="mt-2 font-medium">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PlatformStats;
