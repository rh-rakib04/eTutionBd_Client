import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const ContactPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const faqs = [
    {
      q: "How do I become a tutor?",
      a: "Create a complete profile with qualifications. After approval, you can start receiving tutoring requests.",
    },
    {
      q: "What are your payment methods?",
      a: "We support bKash, Nagad, bank transfer, and secure online payments.",
    },
    {
      q: "How can I report a tutor?",
      a: "Use the 'Report' button inside your dashboard.",
    },
    {
      q: "Is my payment information safe?",
      a: "Yes. We use encrypted systems & PCI-DSS compliant security.",
    },
  ];

  // 🔹 Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      return toast.error("Please fill all required fields!");
    }

    toast.success("Message sent successfully!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="relative min-h-screen bg-base-100 py-20 overflow-hidden">

      {/* 🌊 Animated Waves Background */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <svg
          className="absolute bottom-0 w-full"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#7c3aed"
            d="M0,256L60,229.3C120,203,240,149,360,144C480,139,600,181,720,170.7C840,160,960,96,1080,96C1200,96,1320,160,1380,192L1440,224L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-14"
      >
        <h1 className="text-5xl font-bold text-primary">Get in Touch</h1>
        <p className="mt-2 opacity-80">We’re here to help. Send us a message anytime.</p>
      </motion.div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10 px-5">

        {/* LEFT CARDS */}
        <div className="space-y-6">
          {[
            { icon: FaEnvelope, title: "Email", text: "support@etuitionbd.com" },
            { icon: FaPhone, title: "Phone", text: "+880 123 456 789" },
            { icon: FaMapMarkerAlt, title: "Office", text: "Dhaka, Bangladesh" },
            { icon: FaClock, title: "Response Time", text: "Within 24 Hours" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-base-100 rounded-2xl shadow-md flex gap-4 items-center border border-primary/20"
            >
              <item.icon className="text-primary text-3xl" />
              <div>
                <h3 className="font-semibold text-primary">{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-base-100 p-8 rounded-2xl shadow-lg border border-primary/20"
        >
          <h2 className="text-xl font-semibold text-primary mb-5">Send us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name *"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="input input-bordered w-full"
            />

            <input
              type="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="input input-bordered w-full"
            />

            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="input input-bordered w-full"
            />

            <textarea
              placeholder="Message *"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="textarea textarea-bordered w-full h-32"
            ></textarea>

            <button
              type="submit"
              className="btn bg-primary hover:bg-primary/80 text-white w-full"
            >
              Send Message
            </button>
          </form>
        </motion.div>
      </div>

      {/* FAQ */}
      <div className="max-w-5xl mx-auto mt-20 px-5">
        <h2 className="text-2xl font-bold text-primary mb-6">Frequently Asked Questions</h2>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-base-100 p-5 rounded-xl shadow border border-primary/20 cursor-pointer"
              onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <p className="font-medium">{faq.q}</p>
                <span className="text-primary font-bold">
                  {openFAQ === i ? "-" : "+"}
                </span>
              </div>

              {openFAQ === i && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2 opacity-80"
                >
                  {faq.a}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-20 bg-primary text-white py-16 rounded-3xl text-center mx-5 shadow-xl">
        <h2 className="text-3xl font-bold">Ready to Start Learning?</h2>
        <p className="mt-2 opacity-90">Join thousands of students today.</p>

        <div className="mt-6 flex justify-center gap-5">
          <button className="btn bg-white text-primary border-none px-6">
            Register as Student
          </button>
          <button className="btn bg-white text-primary border-none px-6">
            Register as Tutor
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
