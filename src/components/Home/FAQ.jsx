import SectionHeader from "../SectionHeader";

const faqs = [
  {
    q: "Is eTuitionBd free for students?",
    a: "Yes, students can post tuition requirements for free.",
  },
  {
    q: "How are tutors verified?",
    a: "All tutors are reviewed and approved by admins.",
  },
  {
    q: "Is payment secure?",
    a: "Yes, Stripe ensures fully secure transactions.",
  },
];

const FAQ = () => {
  return (
    <section className="py-10 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-indigo-500/5 to-purple-500/5"></div>
      <div className="max-w-4xl mx-auto px-4">
        <SectionHeader
          title="  Frequently Asked Questions"
          highlight="Questions"
        />

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="collapse collapse-arrow bg-base-100/80 backdrop-blur-xl
                         border border-base-300 rounded-2xl"
            >
              <input type="checkbox" />
              <div className="collapse-title font-medium">{faq.q}</div>
              <div className="collapse-content text-base-content/70">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
