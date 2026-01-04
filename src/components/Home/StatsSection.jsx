import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaBookOpen,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import SectionHeader from "../SectionHeader";

const stats = [
  {
    label: "Students Registered",
    value: 5200,
    icon: FaUserGraduate,
  },
  {
    label: "Verified Tutors",
    value: 1800,
    icon: FaChalkboardTeacher,
  },
  {
    label: "Tuition Jobs Posted",
    value: 3400,
    icon: FaBookOpen,
  },
  {
    label: "Successful Payments",
    value: 2100,
    icon: FaMoneyCheckAlt,
  },
];

const StatsSection = () => {
  return (
    <section className="py-20 bg-base-200/40">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <SectionHeader
          title="Our Growth in "
          highlight="Numbers"
          subtitle="Real platform activity reflecting trust and success."
        />

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl p-6 text-center
                bg-base-100 border border-base-300"
              >
                <div
                  className="w-14 h-14 mx-auto mb-4 rounded-xl
                bg-primary/10 text-primary
                flex items-center justify-center"
                >
                  <Icon className="text-2xl" />
                </div>

                <h3 className="text-3xl font-bold text-primary">
                  <CountUp end={item.value} duration={2} separator="," />+
                </h3>

                <p className="mt-2 text-sm text-base-content/70">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
