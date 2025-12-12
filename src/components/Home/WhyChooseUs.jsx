import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, Brain, UserCheck } from "lucide-react";

const features = [
  {
    title: "Verified Tutors",
    desc: "Every tutor is manually reviewed and verified for quality.",
    icon: ShieldCheck,
  },
  {
    title: "Secure Payments",
    desc: "100% safe Stripe-powered transactions with full transparency.",
    icon: CreditCard,
  },
  {
    title: "Smart Matching",
    desc: "AI-inspired matching based on subject, location & budget.",
    icon: Brain,
  },
  {
    title: "Admin Moderation",
    desc: "Admins monitor posts to ensure trusted tuition listings.",
    icon: UserCheck,
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-indigo-500/5 to-purple-500/5"></div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              eTuitionBd
            </span>
          </h2>
          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
            A trusted platform designed to connect students with the right
            tutors — effortlessly.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group p-6 rounded-2xl bg-base-100/80 backdrop-blur-xl border border-base-300 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition">
                  <Icon className="text-white w-6 h-6" />
                </div>

                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-base-content/70">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
