import { motion } from "framer-motion";
import { FaGraduationCap, FaSearch, FaUserCheck } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch />,
    title: "Post Tuition",
    desc: "Students post tuition requirements with subject, class & budget.",
  },
  {
    icon: <FaUserCheck />,
    title: "Apply & Match",
    desc: "Verified tutors apply and students choose the best match.",
  },
  {
    icon: <FaGraduationCap />,
    title: "Learn & Pay",
    desc: "Start learning and pay securely after tutor approval.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">eTuitionBd</span> Works
        </h2>
        <p className="text-base-content/70 max-w-xl mx-auto mb-12">
          Simple, fast and transparent process for students and tutors.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              viewport={{ once: true }}
              className="rounded-2xl p-6 backdrop-blur bg-base-200/50 border border-base-300 hover:shadow-xl transition"
            >
             <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600  flex items-center justify-center text-2xl shadow-md">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mt-4">{item.title}</h3>
              <p className="text-base-content/70 mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
