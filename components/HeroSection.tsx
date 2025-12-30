export default function HeroSection() {
  return (
    <section className="relative w-full h-[600px] mt-16 flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDv4psbHuVdQy9QK5rihQlxkhFL3JAmYpM7CwSPU0muScCU-agM44XCas1n_ct2AFcj3hnjX6L4KI-yK49GDD3yeVxq49qbe7QHQbkRrCaXZkZRjJ1Pq4Cao7l54yJ-rzSlHbS41Ca_iD9gmzrWUMT4rdKqSxP-jndGup6DQnf_89k8a63W-d8t-BeF7-ZGyjcJ5Hpdde19LkhTszwJCZmj5QCnJIkAmzEfDbyYNUaNejwIvEP3rwaSouCmxZg3qpw1kvjNAY03BME')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/50 to-transparent"></div>
      </div>
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-8 w-full">
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1 bg-brand-orange text-white text-xs font-bold rounded-full mb-4 tracking-wide uppercase">
            Gurugram Exclusive
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight leading-[0.95]">
            Gurugram's <br />
            <span className="text-brand-orange">Flavors,</span> Delivered.
          </h2>
          <p className="text-xl text-white/90 font-medium mb-8 max-w-lg leading-relaxed border-l-4 border-brand-orange pl-4">
            Taste the Soul of Gurugram with USTART. <br />
            From Cyber Hub to Sector 56.
          </p>
        </div>
      </div>
    </section>
  );
}
