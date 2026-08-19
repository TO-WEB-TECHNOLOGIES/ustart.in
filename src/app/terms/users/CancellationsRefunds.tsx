export default function CancellationsRefunds() {
    return (
        <section id="cancellations-refunds" className="mb-20 scroll-mt-24 group">
            <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0F2441] text-white font-bold text-sm">6</span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F2441]">Cancellations, Refunds & Adjustments</h2>
            </div>

            <div className="prose prose-lg text-gray-600 space-y-8 leading-relaxed text-sm md:text-base">

                {/* 6.1 Order Cancellation by Users */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">6.1 Order Cancellation by Users</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>6.1.1</strong> Cancellation of an order by a User may be permitted or restricted depending on:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>6.1.1.1</strong> The status of the order;</li>
                            <li><strong>6.1.1.2</strong> Whether the order has been accepted by the restaurant;</li>
                            <li><strong>6.1.1.3</strong> Whether food preparation or delivery has commenced;</li>
                            <li><strong>6.1.1.4</strong> The applicable cancellation policy displayed on the Platform at the time of order placement.</li>
                        </ul>
                        <p><strong>6.1.2</strong> Users acknowledge and agree that certain orders, once accepted or prepared, may not be eligible for cancellation.</p>
                        <p><strong>6.1.3</strong> Any cancellation request submitted by the User shall be processed subject to feasibility and the terms displayed on the Platform.</p>
                    </div>
                </div>

                {/* 6.2 Cancellation by the Company */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">6.2 Cancellation by the Company</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>6.2.1</strong> The Company reserves the right, at its sole discretion, to cancel an order at any stage prior to or after acceptance, including but not limited to circumstances involving:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>6.2.1.1</strong> Unavailability of items;</li>
                            <li><strong>6.2.1.2</strong> Restaurant closure or operational constraints;</li>
                            <li><strong>6.2.1.3</strong> Delivery constraints or force majeure events;</li>
                            <li><strong>6.2.1.4</strong> Incorrect pricing or technical errors;</li>
                            <li><strong>6.2.1.5</strong> Suspected fraudulent, abusive, or unlawful activity.</li>
                        </ul>
                        <p><strong>6.2.2</strong> Cancellation by the Company under this clause shall not give rise to any claim for damages or compensation beyond the refund, if any, determined in accordance with the applicable policy.</p>
                    </div>
                </div>

                {/* 6.3 Refund Eligibility */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">6.3 Refund Eligibility</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>6.3.1</strong> Refunds, where applicable, shall be processed strictly in accordance with the Refund &amp; Cancellation Policy displayed on the Platform at the time of order placement.</p>
                        <p><strong>6.3.2</strong> Users acknowledge that refunds are not automatic and shall be subject to verification, eligibility criteria, and applicable conditions.</p>
                        <p><strong>6.3.3</strong> The Company reserves the right to deny refund requests where:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>6.3.3.1</strong> The User provided incorrect or incomplete delivery details;</li>
                            <li><strong>6.3.3.2</strong> The User was unavailable or unreachable at the time of delivery;</li>
                            <li><strong>6.3.3.3</strong> The User refused to accept delivery without a valid reason;</li>
                            <li><strong>6.3.3.4</strong> The issue arose due to User error or misuse of the Platform.</li>
                        </ul>
                    </div>
                </div>

                {/* 6.4 Non-Refundable Situations */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">6.4 Non-Refundable Situations</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>6.4.1</strong> Without prejudice to other provisions, refunds shall not be issued for:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>6.4.1.1</strong> Change of mind by the User after order acceptance;</li>
                            <li><strong>6.4.1.2</strong> Dissatisfaction with taste, personal preference, or subjective expectations;</li>
                            <li><strong>6.4.1.3</strong> Delays caused by factors beyond the reasonable control of the Company or restaurant;</li>
                            <li><strong>6.4.1.4</strong> Minor variations in appearance or presentation of food.</li>
                        </ul>
                    </div>
                </div>

                {/* 6.5 Refund Mode and Timelines */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">6.5 Refund Mode and Timelines</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>6.5.1</strong> Approved refunds shall be processed through the original mode of payment or such other method as determined by the Company.</p>
                        <p><strong>6.5.2</strong> Refund processing timelines may vary depending on:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>6.5.2.1</strong> The payment method used;</li>
                            <li><strong>6.5.2.2</strong> Bank or payment gateway processing timelines.</li>
                        </ul>
                        <p><strong>6.5.3</strong> The Company shall not be liable for delays attributable to banks, payment gateways, or financial institutions.</p>
                    </div>
                </div>

                {/* 6.6 Partial Refunds and Adjustments */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">6.6 Partial Refunds and Adjustments</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>6.6.1</strong> In certain cases, the Company may, at its discretion, offer:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>6.6.1.1</strong> Partial refunds; or</li>
                            <li><strong>6.6.1.2</strong> Promotional credits or adjustments.</li>
                        </ul>
                        <p><strong>6.6.2</strong> Such adjustments shall not constitute an admission of liability and may be subject to usage restrictions or expiry conditions.</p>
                    </div>
                </div>

                {/* 6.7 Chargebacks and Payment Disputes */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">6.7 Chargebacks and Payment Disputes</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>6.7.1</strong> Users agree not to initiate chargebacks or payment disputes without first raising the issue through the Platform’s support mechanisms.</p>
                        <p><strong>6.7.2</strong> Initiation of unjustified chargebacks may result in:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>6.7.2.1</strong> Suspension or termination of the User account;</li>
                            <li><strong>6.7.2.2</strong> Recovery of amounts and associated costs, to the extent permitted by law.</li>
                        </ul>
                    </div>
                </div>

                {/* 6.8 Finality of Decisions */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">6.8 Finality of Decisions</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>6.8.1</strong> Decisions of the Company regarding cancellations, refunds, and adjustments, taken in accordance with the applicable policies, shall be final and binding, subject to applicable law.</p>
                    </div>
                </div>

                {/* 6.9 No Waiver */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">6.9 No Waiver</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>6.9.1</strong> Grant of a refund or adjustment in any instance shall not be construed as a waiver of the Company’s right to deny refunds in future similar circumstances.</p>
                    </div>
                </div>

                {/* 6.10 Statutory Rights */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">6.10 Statutory Rights</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>6.10.1</strong> Nothing contained in these Terms shall affect the User’s non-waivable statutory rights under applicable consumer protection laws.</p>
                    </div>
                </div>

            </div>
        </section>

    );
}
