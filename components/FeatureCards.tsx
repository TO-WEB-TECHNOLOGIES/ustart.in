export default function FeatureCards() {
  const features = [
    {
      title: "Order Online",
      description: "Stay home and order to your doorstep",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD8tMwnJnN7qVT249rWDpyzYgk396AUbxF3GHfdXjm3kYGn2tkOWB5N2fPX6uS2Y6AZ2Z56PFx98hpMnVNa3V5Z61SR9XRA3TaB637JOOvKg0T2hJvVHgzwQ7fYdBbxy-eYWxtBYHZVXGxugW9HR0pYK1YCeTX3pmX6_1mgFKTo57RHIXlbaKXcPvCDS_-4a_yPz9DoDvszbvsaxYyug3JEI6so49oxKlbbuBVULArs43gZvVewb8NcIeCK2qRYZjn-AplOQrWFLec",
    },
    {
      title: "Dining Out",
      description: "View the city's favourite venues",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAl0jJfamoTOwD55EGXL-4gP8n415EVFII1fkYZFEinIYm-PztBjZnvjA_3Op0IfzZeveDbFF2gp2OgS441XOHLsLmNw_zZamvQN9UzM0kmeFW9TgoEQKuWIYKMOi6IHJY19iuC09MPwgY8rUI4kHSXZ9sgwEJaaX1uoqXnx1M4khqKtSbzqzvcmv9cbVQPV5m20geav4GqywoBOpXkn8JiYgCAC1Sigu1TfJTT_PoQAn5H0VZgyQgTFZUkDrQg_GDabo41-pmc0vM",
    },
    {
      title: "Nightlife",
      description: "Explore the city's top nightlife spots",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDctBWjNyZIcfqKHJS8aVpgT859jmLCIJLmI5pr9UXJzJtczQO5lhHGB3ghN9gclH03UHz-gp4Z_1-vLIHaa7H3QeLWrKx1q2mVhcILkx_RGWBmsv3o-ti6pdyLYrfhwyrb20xa8U__Ah4cA0dn-zY_Igl_vd9rrthCSDicLFQx0uOjFJFBwA1viubXVY9uOybmIb2ism1at1gmyL0RMGffBL5XQacET276kA6yrUvwkRlgjfNPje1k7B1aR8ka2j2Npgp238q6RNU",
    },
  ];

  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-3 flex items-center gap-4 shadow-sm hover:shadow-soft border border-gray-100 transition-all cursor-pointer group"
          >
            <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
              <div
                className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                style={{ backgroundImage: `url('${feature.image}')` }}
              ></div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-brand-navy leading-tight">
                {feature.title}
              </h4>
              <p className="text-brand-text/60 text-xs mt-1">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
