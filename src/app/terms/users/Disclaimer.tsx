export default function Disclaimer() {
    return (
<section id="disclaimer" className="mb-20 scroll-mt-24 group">
  <div className="flex items-center gap-3 mb-6">
    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0F2441] text-white font-bold text-sm">13</span>
    <h2 className="text-2xl md:text-3xl font-bold text-[#0F2441]">
      Disclaimers of Warranties
    </h2>
  </div>

  <div className="prose prose-lg text-gray-600 space-y-8 leading-relaxed text-sm md:text-base">

    {/* 13.1 “As Is” and “As Available” Basis of Service */}
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-2">13.1 “As Is” and “As Available” Basis of Service</h3>
      <div className="pl-4 border-l-2 border-gray-100 space-y-3">
        <p>
          <strong>13.1.1</strong> The Platform, and all services, features, content, data, and information made available
          through it, are provided on an “as is,” “as available,” and “with all faults” basis, without warranties of any
          kind, whether express, implied, statutory, or otherwise.
        </p>
        <p>
          <strong>13.1.2</strong> The Company expressly disclaims all warranties, representations, guarantees, and
          conditions, including but not limited to implied warranties of:
        </p>
        <ul className="list-disc pl-6 space-y-1 mt-1">
          <li>Merchantability;</li>
          <li>Fitness for a particular purpose;</li>
          <li>Accuracy;</li>
          <li>Reliability;</li>
          <li>Quality;</li>
          <li>Non-infringement;</li>
          <li>Service continuity.</li>
        </ul>
      </div>
    </div>

    {/* 13.2 No Warranty on Platform Performance */}
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-2">13.2 No Warranty on Platform Performance</h3>
      <div className="pl-4 border-l-2 border-gray-100 space-y-3">
        <p><strong>13.2.1</strong> The Company does not warrant that:</p>
        <ul className="list-none pl-5 space-y-1 mt-1">
          <li><strong>13.2.1.1</strong> The Platform will operate uninterrupted or error-free;</li>
          <li><strong>13.2.1.2</strong> Defects or errors will be corrected;</li>
          <li><strong>13.2.1.3</strong> The Platform or servers are free from viruses, malware, downtime, or harmful components;</li>
          <li><strong>13.2.1.4</strong> Data transmitted through the Platform will be secure or free from interception, corruption, or loss.</li>
        </ul>
      </div>
    </div>

    {/* 13.3 No Warranty on Restaurant Services */}
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-2">13.3 No Warranty on Restaurant Services</h3>
      <div className="pl-4 border-l-2 border-gray-100 space-y-3">
        <p><strong>13.3.1</strong> The Company does not warrant or guarantee:</p>
        <ul className="list-none pl-5 space-y-1 mt-1">
          <li><strong>13.3.1.1</strong> Quality, safety, taste, hygiene, preparation, ingredients, allergen compliance, nutritional value, or suitability of food;</li>
          <li><strong>13.3.1.2</strong> Legality, licensing, statutory compliance, or FSSAI certification of restaurants;</li>
          <li><strong>13.3.1.3</strong> Delivery timelines, performance, or conduct of delivery personnel;</li>
          <li><strong>13.3.1.4</strong> Accuracy of menu information or pricing supplied by restaurants.</li>
        </ul>
        <p><strong>13.3.2</strong> All such obligations rest exclusively with the respective restaurants.</p>
      </div>
    </div>

    {/* 13.4 No Warranty on Content */}
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-2">13.4 No Warranty on Content</h3>
      <div className="pl-4 border-l-2 border-gray-100 space-y-3">
        <p>
          <strong>13.4.1</strong> The Company does not warrant that content displayed, including reviews, ratings, images,
          descriptions, and promotional materials, is accurate, complete, reliable, current, or error-free.
        </p>
        <p><strong>13.4.2</strong> Any reliance placed by Users on such content shall be at their own risk.</p>
      </div>
    </div>

    {/* 13.5 No Advice or Representation */}
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-2">13.5 No Advice or Representation</h3>
      <div className="pl-4 border-l-2 border-gray-100 space-y-3">
        <p><strong>13.5.1</strong> The Platform does not constitute:</p>
        <ul className="list-disc pl-6 space-y-1 mt-1">
          <li>Professional advice;</li>
          <li>Nutritional guidance;</li>
          <li>Medical recommendation;</li>
          <li>Any warranty of suitability for individuals with allergies or dietary restrictions.</li>
        </ul>
        <p><strong>13.5.2</strong> Users are solely responsible for reviewing allergen details and exercising due caution.</p>
      </div>
    </div>

    {/* 13.6 Third-Party Services */}
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-2">13.6 Third-Party Services</h3>
      <div className="pl-4 border-l-2 border-gray-100 space-y-3">
        <p><strong>13.6.1</strong> The Platform may incorporate or facilitate third-party systems, including:</p>
        <ul className="list-disc pl-6 space-y-1 mt-1">
          <li>Payment gateways;</li>
          <li>Mapping and location data;</li>
          <li>SMS/OTP services;</li>
          <li>Logistics systems.</li>
        </ul>
        <p>
          <strong>13.6.2</strong> The Company makes no warranties regarding such third-party systems and assumes no
          liability arising therefrom.
        </p>
      </div>
    </div>

    {/* 13.7 No Creation of Rights */}
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-2">13.7 No Creation of Rights</h3>
      <div className="pl-4 border-l-2 border-gray-100 space-y-3">
        <p><strong>13.7.1</strong> Nothing on the Platform shall be construed as:</p>
        <ul className="list-disc pl-6 space-y-1 mt-1">
          <li>A guarantee of service quality;</li>
          <li>A right to uninterrupted access;</li>
          <li>A contractual undertaking to meet User expectations.</li>
        </ul>
        <p><strong>13.7.2</strong> Users acknowledge that Platform use is voluntary and subject to these limitations.</p>
      </div>
    </div>

    {/* 13.8 Exclusions Permitted by Law */}
    <div>
      <h3 className="text-gray-900 font-bold text-lg mb-2">13.8 Exclusions Permitted by Law</h3>
      <div className="pl-4 border-l-2 border-gray-100 space-y-3">
        <p>
          <strong>13.8.1</strong> To the maximum extent permitted by law, all implied warranties and statutory guarantees
          not expressly set forth herein are excluded.
        </p>
        <p>
          <strong>13.8.2</strong> Nothing herein shall exclude any warranty or right that cannot be legally disclaimed
          under applicable consumer protection law.
        </p>
      </div>
    </div>

  </div>
</section>
    );
}
