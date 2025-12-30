export default function Collections() {
  const collections = [
    {
      title: "Cyber Hub Hits",
      icon: "lunch_dining",
      color: "text-brand-orange",
    },
    {
      title: "Spicy Street",
      icon: "local_fire_department",
      color: "text-brand-red",
    },
    {
      title: "Healthy Options",
      icon: "eco",
      color: "text-brand-green",
    },
    {
      title: "Sweet Tooth",
      icon: "cake",
      color: "text-purple-500",
    },
    {
      title: "Work Cafes",
      icon: "coffee",
      color: "text-brand-grey",
    },
    {
      title: "Sector 29 Eats",
      icon: "ramen_dining",
      color: "text-blue-500",
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-black text-brand-navy tracking-tight">
          Explore Gurugram
        </h3>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
        {collections.map((item, index) => (
          <div
            key={index}
            className="group bg-brand-bg-cream hover:bg-brand-navy transition-colors rounded-xl p-4 flex flex-col items-center justify-center text-center cursor-pointer h-32 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-bl-full -mr-2 -mt-2"></div>
            <span
              className={`material-symbols-outlined text-3xl mb-2 ${item.color} group-hover:text-white transition-colors`}
            >
              {item.icon}
            </span>
            <span className="font-bold text-sm text-brand-text group-hover:text-white transition-colors">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
