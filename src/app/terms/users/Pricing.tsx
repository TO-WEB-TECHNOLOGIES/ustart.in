export default function Pricing() {
    return (
        <section id="pricing" className="mb-20 scroll-mt-24 group">
            <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0F2441] text-white font-bold text-sm">5</span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F2441]">Pricing, Fees & Payments</h2>
            </div>

            <div className="prose prose-lg text-gray-600 space-y-8 leading-relaxed text-sm md:text-base">

                {/* 5.1 Determination of Prices */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">5.1 Determination of Prices</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>5.1.1</strong> Prices of food items displayed on the Platform are determined solely by the respective restaurants and are communicated to the Company for display on the Platform.</p>
                        <p><strong>5.1.2</strong> The Company does not control, influence, or guarantee the pricing of food items offered by restaurants and shall not be responsible for any price variations between:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>5.1.2.1</strong> Prices displayed on the Platform; and</li>
                            <li><strong>5.1.2.2</strong> Prices charged by restaurants at their physical premises or through other channels.</li>
                        </ul>
                        <p><strong>5.1.3</strong> Users acknowledge that food prices may vary based on location, availability, demand, time, or restaurant discretion.</p>
                    </div>
                </div>

                {/* 5.2 Components of the Total Payable Amount */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">5.2 Components of the Total Payable Amount</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>5.2.1</strong> The total amount payable by the User for an order may include, without limitation:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>5.2.1.1</strong> The price of food items selected;</li>
                            <li><strong>5.2.1.2</strong> Applicable taxes as mandated under law;</li>
                            <li><strong>5.2.1.3</strong> Packaging charges levied by restaurants;</li>
                            <li><strong>5.2.1.4</strong> Delivery charges, where applicable;</li>
                            <li><strong>5.2.1.5</strong> Platform service fees, convenience fees, or similar charges.</li>
                        </ul>
                        <p><strong>5.2.2</strong> All applicable charges shall be displayed to the User at the checkout stage prior to order confirmation.</p>
                        <p><strong>5.2.3</strong> Display of the final payable amount at checkout shall constitute full disclosure and express consent by the User to pay such amount.</p>
                    </div>
                </div>

                {/* 5.3 Modification of Fees and Charges */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">5.3 Modification of Fees and Charges</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>5.3.1</strong> The Company reserves the right to introduce, modify, revise, or discontinue any fees or charges applicable to the use of the Platform at any time, subject to applicable law.</p>
                        <p><strong>5.3.2</strong> Any such changes shall be applicable only to orders placed after the revised charges are displayed on the Platform.</p>
                    </div>
                </div>

                {/* 5.4 Payment Methods */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">5.4 Payment Methods</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>5.4.1</strong> The Platform may offer one or more payment methods, including but not limited to:</p>
                        <ul className="list-disc pl-5 space-y-1 mt-1">
                            <li>Online payment options (such as cards, UPI, wallets, net banking);</li>
                            <li>Cash on delivery, where made available.</li>
                        </ul>
                        <p><strong>5.4.2</strong> Availability of payment methods may be subject to:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>5.4.2.1</strong> Order value thresholds;</li>
                            <li><strong>5.4.2.2</strong> Location serviceability;</li>
                            <li><strong>5.4.2.3</strong> Risk assessment or internal policies of the Company or payment partners.</li>
                        </ul>
                        <p><strong>5.4.3</strong> The Company reserves the right to enable, disable, or restrict payment methods for any User or order at its discretion.</p>
                    </div>
                </div>

                {/* 5.5 Online Payment Processing */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">5.5 Online Payment Processing</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>5.5.1</strong> Online payments made through the Platform are processed by third-party payment gateways and financial institutions.</p>
                        <p><strong>5.5.2</strong> The Company does not control the operations of such third parties and shall not be liable for:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>5.5.2.1</strong> Payment failures;</li>
                            <li><strong>5.5.2.2</strong> Delays in authorization, settlement, or reversal;</li>
                            <li><strong>5.5.2.3</strong> Errors attributable to banks, card issuers, or payment gateways.</li>
                        </ul>
                        <p><strong>5.5.3</strong> In the event of unsuccessful or incomplete payment confirmation, the Company reserves the right to cancel the corresponding order.</p>
                    </div>
                </div>

                {/* 5.6 Cash on Delivery */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">5.6 Cash on Delivery</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>5.6.1</strong> Where cash on delivery is offered, Users agree to make full payment at the time of delivery.</p>
                        <p><strong>5.6.2</strong> Failure or refusal to make payment upon delivery may result in:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>5.6.2.1</strong> Cancellation of the order;</li>
                            <li><strong>5.6.2.2</strong> Suspension or restriction of the User’s access to cash on delivery or the Platform.</li>
                        </ul>
                    </div>
                </div>

                {/* 5.7 Taxes */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">5.7 Taxes</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>5.7.1</strong> Applicable taxes shall be charged in accordance with prevailing laws and regulations.</p>
                        <p><strong>5.7.2</strong> The Company shall not be responsible for any changes in tax rates or structures imposed by governmental authorities.</p>
                    </div>
                </div>

                {/* 5.8 Promotional Offers, Discounts & Credits */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">5.8 Promotional Offers, Discounts & Credits</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>5.8.1</strong> Promotional offers, discounts, coupons, or credits made available on the Platform are subject to specific terms and conditions.</p>
                        <p><strong>5.8.2</strong> The Company reserves the right to:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>5.8.2.1</strong> Modify or withdraw any promotion at any time;</li>
                            <li><strong>5.8.2.2</strong> Cancel benefits in cases of misuse, fraud, or violation of applicable terms.</li>
                        </ul>
                        <p><strong>5.8.3</strong> Promotional benefits shall have no cash value and shall not be transferable unless expressly stated.</p>
                    </div>
                </div>

                {/* 5.9 Refunds and Adjustments */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">5.9 Refunds and Adjustments</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>5.9.1</strong> Any refunds, chargebacks, or adjustments shall be governed exclusively by the Refund & Cancellation Policy displayed on the Platform.</p>
                        <p><strong>5.9.2</strong> The Company shall not be obligated to provide refunds except as expressly provided under such policy or required by applicable law.</p>
                    </div>
                </div>

                {/* 5.10 No Set-Off or Deduction */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">5.10 No Set-Off or Deduction</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>5.10.1</strong> Users shall not be entitled to withhold, deduct, or set off any amounts payable to the Company or restaurants against any claims or disputes, except as required by law.</p>
                    </div>
                </div>

                {/* 5.11 Electronic Records */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">5.11 Electronic Records</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>5.11.1</strong> All payment-related records, invoices, and transaction confirmations generated through the Platform shall be maintained electronically and shall constitute valid evidence of the transaction.</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
