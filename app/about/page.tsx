import Link from "next/link";

export default function About() {
  return (
    <main>
      <section className="relative w-full h-[500px] mt-16 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDv4psbHuVdQy9QK5rihQlxkhFL3JAmYpM7CwSPU0muScCU-agM44XCas1n_ct2AFcj3hnjX6L4KI-yK49GDD3yeVxq49qbe7QHQbkRrCaXZkZRjJ1Pq4Cao7l54yJ-rzSlHbS41Ca_iD9gmzrWUMT4rdKqSxP-jndGup6DQnf_89k8a63W-d8t-BeF7-ZGyjcJ5Hpdde19LkhTszwJCZmj5QCnJIkAmzEfDbyYNUaNejwIvEP3rwaSouCmxZg3qpw1kvjNAY03BME')",
              filter: "brightness(0.6)",
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/80 via-brand-navy/40 to-transparent"></div>
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 w-full text-center md:text-left">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-1.5 bg-brand-orange/90 backdrop-blur-sm text-white text-xs font-bold rounded-full mb-6 tracking-wide uppercase shadow-lg">
              Our Story
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Delivering Joy,
              <br />
              <span className="text-brand-orange-light">
                One Meal at a Time.
              </span>
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-medium max-w-2xl leading-relaxed">
              We are more than a delivery app. We are the bridge between
              Gurugram's vibrant kitchens and your dining table.
            </p>
          </div>
        </div>
      </section>

      <div className="bg-brand-bg-light relative z-20 -mt-16 rounded-t-[2.5rem] pt-16 pb-12 border-t border-white/50 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
        <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-brand-navy/5 hover:shadow-soft transition-shadow duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-9xl text-brand-navy">
                  flag
                </span>
              </div>
              <h3 className="text-2xl font-black text-brand-navy mb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-brand-orange rounded-full"></span>
                Our Mission
              </h3>
              <p className="text-brand-text/80 leading-relaxed text-lg">
                To revolutionize local food delivery by empowering neighborhood
                restaurants and delivering authentic flavors with unmatched
                speed and care. We exist to make every meal a moment of
                connection.
              </p>
            </div>
            <div className="bg-brand-navy p-8 rounded-3xl shadow-sm border border-brand-navy/5 hover:shadow-soft transition-shadow duration-300 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <span className="material-symbols-outlined text-9xl text-white">
                  visibility
                </span>
              </div>
              <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-8 bg-brand-green rounded-full"></span>
                Our Vision
              </h3>
              <p className="text-white/80 leading-relaxed text-lg">
                A world where quality food is accessible to everyone,
                everywhere. We envision a future where USTART is synonymous with
                trust, taste, and the thriving culinary culture of Gurugram.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black text-brand-navy tracking-tight">
              Core Values
            </h3>
            <p className="text-brand-text/60 mt-2 font-medium">
              The principles that drive our engine.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                title: "Speed",
                icon: "bolt",
                color: "text-brand-orange",
                bg: "bg-brand-orange/10",
                desc: "We value your time. Lightning fast delivery is our promise, not just a goal.",
              },
              {
                title: "Integrity",
                icon: "verified",
                color: "text-brand-green",
                bg: "bg-brand-green/10",
                desc: "Honest pricing, transparent tracking, and genuine food quality checks.",
              },
              {
                title: "Partnership",
                icon: "handshake",
                color: "text-brand-red",
                bg: "bg-brand-red/10",
                desc: "We grow when our restaurant partners grow. A symbiotic ecosystem.",
              },
              {
                title: "Community",
                icon: "public",
                color: "text-brand-navy",
                bg: "bg-brand-navy/10",
                desc: "Built in Gurugram, for Gurugram. We support local initiatives.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-brand-bg-cream rounded-2xl p-6 text-center hover:-translate-y-1 transition-transform duration-300 border border-brand-navy/5"
              >
                <div
                  className={`w-14 h-14 mx-auto ${item.bg} rounded-full flex items-center justify-center mb-4 ${item.color}`}
                >
                  <span className="material-symbols-outlined text-3xl">
                    {item.icon}
                  </span>
                </div>
                <h4 className="font-bold text-brand-navy text-lg mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-brand-text/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-20">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-brand-navy/5">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/3">
                <h3 className="text-3xl font-black text-brand-navy tracking-tight mb-4">
                  Our Journey
                </h3>
                <p className="text-brand-text/70 mb-6">
                  From a small garage in Sector 29 to covering the entire city.
                  Here is how we started.
                </p>
                <div className="bg-brand-bg-cream p-4 rounded-xl border-l-4 border-brand-orange">
                  <p className="italic text-brand-navy font-medium">
                    "It started with a simple craving for midnight momos and no
                    way to get them."
                  </p>
                  <p className="text-xs font-bold text-brand-text/50 mt-2 uppercase tracking-wide">
                    — Founder's Note
                  </p>
                </div>
              </div>
              <div className="md:w-2/3 relative">
                <div className="absolute left-4 md:left-8 top-2 bottom-2 w-0.5 bg-brand-navy/10"></div>
                {[
                  {
                    year: "2020",
                    title: "The Idea is Born",
                    color: "bg-brand-navy",
                    desc: "USTART launched its beta version in DLF Cyber City with just 5 restaurant partners.",
                  },
                  {
                    year: "2021",
                    title: "Expanding Horizons",
                    color: "bg-brand-orange",
                    desc: "Reached 10,000 active users and expanded delivery radius to 15km. Introduced 'Healthy Eats'.",
                  },
                  {
                    year: "2023",
                    title: "Gurugram's Favorite",
                    color: "bg-brand-green",
                    desc: "Celebrated 1 Million orders delivered. Partnered with 500+ local businesses.",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="relative pl-12 md:pl-20 mb-10 last:mb-0 group"
                  >
                    <div
                      className={`absolute left-[10px] md:left-[26px] top-1.5 w-4 h-4 rounded-full border-4 border-white ${item.color} shadow-sm z-10`}
                    ></div>
                    <span
                      className={`inline-block px-2 py-1 ${item.color}/10 text-${item.color.replace(
                        "bg-",
                        ""
                      )} rounded text-xs font-bold mb-1`}
                    >
                      {item.year}
                    </span>
                    <h4 className="text-xl font-bold text-brand-navy">
                      {item.title}
                    </h4>
                    <p className="text-brand-text/70 text-sm mt-1">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-20">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-black text-brand-navy tracking-tight">
              Meet the Minds
            </h3>
            <a
              className="text-sm font-bold text-brand-orange hover:text-brand-navy transition-colors flex items-center gap-1 cursor-pointer"
              href="#"
            >
              Join the team{" "}
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                name: "Aarav Sharma",
                role: "Founder & CEO",
                desc: "Foodie at heart, techie by profession.",
                color: "brand-navy",
              },
              {
                name: "Priya Verma",
                role: "Head of Operations",
                desc: "Ensuring your food arrives hot, always.",
                color: "brand-orange",
              },
              {
                name: "Vikram Singh",
                role: "Tech Lead",
                desc: "Building the smoothest app experience.",
                color: "brand-green",
              },
              {
                name: "Neha Gupta",
                role: "Marketing",
                desc: "Spreading the joy of USTART.",
                color: "brand-red",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-2xl shadow-sm border border-brand-navy/5 text-center group"
              >
                <div
                  className={`w-24 h-24 mx-auto rounded-full bg-brand-bg-cream flex items-center justify-center text-3xl font-bold text-brand-navy mb-4 overflow-hidden relative`}
                >
                  <div
                    className={`absolute bottom-0 w-16 h-16 bg-${item.color}/20 rounded-t-full`}
                  ></div>
                  <div
                    className={`absolute top-4 w-10 h-10 bg-${item.color}/20 rounded-full`}
                  ></div>
                </div>
                <h4 className="text-lg font-bold text-brand-navy">
                  {item.name}
                </h4>
                <p className="text-xs text-brand-orange font-bold uppercase tracking-wider mb-2">
                  {item.role}
                </p>
                <p className="text-sm text-brand-text/60">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-16">
          <div className="bg-gradient-to-r from-brand-navy to-[#1a3a63] rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-brand-orange/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2">
                <h3 className="text-3xl font-black mb-4">Beyond Delivery</h3>
                <p className="text-white/80 mb-6 leading-relaxed">
                  We believe in giving back to the soil we serve. USTART is
                  committed to sustainability and community growth.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg">
                      <span className="material-symbols-outlined text-brand-green">
                        recycling
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">
                        Zero Plastic Initiative
                      </h4>
                      <p className="text-sm text-white/60">
                        Encouraging biodegradable packaging for all our partners.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white/10 p-2 rounded-lg">
                      <span className="material-symbols-outlined text-brand-orange">
                        storefront
                      </span>
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">Local First</h4>
                      <p className="text-sm text-white/60">
                        Lower commissions for small, home-grown kitchens.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 w-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-center">
                    <span className="block text-4xl font-black text-brand-orange mb-1">
                      50k+
                    </span>
                    <span className="text-xs uppercase tracking-wider font-bold opacity-70">
                      Trees Planted
                    </span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-center">
                    <span className="block text-4xl font-black text-brand-green mb-1">
                      200+
                    </span>
                    <span className="text-xs uppercase tracking-wider font-bold opacity-70">
                      Home Chefs
                    </span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-center col-span-2">
                    <span className="block text-4xl font-black text-white mb-1">
                      ₹50L
                    </span>
                    <span className="text-xs uppercase tracking-wider font-bold opacity-70">
                      Generated for Local Biz
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-4 md:px-8 mb-8">
          <div className="bg-white border-l-4 border-brand-orange rounded-xl shadow-sm p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h4 className="font-black text-brand-navy text-2xl">
                Ready to taste the difference?
              </h4>
              <p className="text-brand-text/70 mt-1">
                Join thousands of happy customers in Gurugram.
              </p>
            </div>
            <div className="flex gap-4">
              <Link href="/">
                <button className="bg-white border border-brand-navy/10 hover:bg-gray-50 text-brand-navy font-bold px-6 py-3 rounded-lg text-sm transition-colors shadow-sm cursor-pointer">
                  View Restaurants
                </button>
              </Link>
              <Link href="/coming-soon">
                <button className="bg-brand-navy hover:bg-brand-navy/90 text-white font-bold px-6 py-3 rounded-lg text-sm transition-colors shadow-md cursor-pointer">
                  Partner with USTART
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
