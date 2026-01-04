import HoverCard from "../HoverCard";
import SectionHeader from "../SectionHeader";

const categories = [
  "Math",
  "Physics",
  "Chemistry",
  "English",
  "ICT",
  "Biology",
  "Bangla",
  "Higher Math",
];

const Categories = () => {
  return (
    <section className="py-10 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-indigo-500/5 to-purple-500/5"></div>
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="Popular Tuition " highlight="Categories" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <HoverCard key={i} title={cat} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
