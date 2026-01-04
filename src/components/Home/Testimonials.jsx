import HoverCard from "../HoverCard";
import SectionHeader from "../SectionHeader";

const testimonials = [
  {
    title: "Student (Class 10)",
    desc: "Found a verified tutor within 2 days. Smooth and secure experience.",
  },
  {
    title: "Tutor (Physics)",
    desc: "Easy application process and transparent payment system.",
  },
  {
    title: "Guardian",
    desc: "Admin verification gave us full confidence in choosing tutors.",
  },
];

const Testimonials = () => {
  return (
    <section className="py-10 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-indigo-500/5 to-purple-500/5"></div>
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader
          title="What Our"
          highlight="Users Say"
          subtitle="Real experiences from students, tutors, and guardians."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((item, i) => (
            <HoverCard
              key={i}
              title={item.title}
              desc={item.desc}
              delay={i * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
