export default function DeliveryTimelines() {
    return (
        <section id="delivery-timelines" className="mb-20 scroll-mt-24 group">
            <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0F2441] text-white font-bold text-sm">7</span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F2441]">Delivery, Timelines &amp; User Obligations</h2>
            </div>

            <div className="prose prose-lg text-gray-600 space-y-8 leading-relaxed text-sm md:text-base">

                {/* 7.1 Modes of Delivery */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">7.1 Modes of Delivery</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>7.1.1</strong> Delivery of food orders placed through the Platform may be carried out:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>7.1.1.1</strong> By delivery partners arranged through the Platform; or</li>
                            <li><strong>7.1.1.2</strong> By the restaurant using its own delivery personnel, as determined by availability and operational feasibility.</li>
                        </ul>
                        <p><strong>7.1.2</strong> The Company does not guarantee a particular mode of delivery for any order.</p>
                    </div>
                </div>

                {/* 7.2 Estimated Delivery Timelines */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">7.2 Estimated Delivery Timelines</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>7.2.1</strong> Any delivery time displayed on the Platform is an estimate only and is provided for User convenience.</p>
                        <p><strong>7.2.2</strong> Delivery estimates are subject to change due to factors including, but not limited to:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>7.2.2.1</strong> Restaurant preparation time;</li>
                            <li><strong>7.2.2.2</strong> Traffic conditions;</li>
                            <li><strong>7.2.2.3</strong> Weather conditions;</li>
                            <li><strong>7.2.2.4</strong> Operational constraints;</li>
                            <li><strong>7.2.2.5</strong> Force majeure events.</li>
                        </ul>
                        <p><strong>7.2.3</strong> The Company does not guarantee delivery within the estimated time and shall not be liable for delays beyond its reasonable control.</p>
                    </div>
                </div>

                {/* 7.3 User Availability and Cooperation */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">7.3 User Availability and Cooperation</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>7.3.1</strong> Users agree to:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>7.3.1.1</strong> Be available at the delivery location at the estimated delivery time;</li>
                            <li><strong>7.3.1.2</strong> Remain reachable through the contact details provided;</li>
                            <li><strong>7.3.1.3</strong> Provide reasonable cooperation to facilitate delivery.</li>
                        </ul>
                        <p><strong>7.3.2</strong> Failure by the User to comply with this clause may result in:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>7.3.2.1</strong> Cancellation of the order;</li>
                            <li><strong>7.3.2.2</strong> Non-eligibility for refund or compensation, subject to applicable policy.</li>
                        </ul>
                    </div>
                </div>

                {/* 7.4 Delivery Address Accuracy */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">7.4 Delivery Address Accuracy</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>7.4.1</strong> Users are solely responsible for ensuring the accuracy and completeness of the delivery address and location details provided.</p>
                        <p><strong>7.4.2</strong> The Company shall not be liable for:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>7.4.2.1</strong> Failed or delayed delivery due to incorrect or incomplete address details;</li>
                            <li><strong>7.4.2.2</strong> Additional costs incurred as a result of address errors.</li>
                        </ul>
                    </div>
                </div>

                {/* 7.5 Failed Delivery */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">7.5 Failed Delivery</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>7.5.1</strong> An order may be deemed a failed delivery if:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>7.5.1.1</strong> The User is unavailable or unreachable;</li>
                            <li><strong>7.5.1.2</strong> Delivery is refused without valid reason;</li>
                            <li><strong>7.5.1.3</strong> The delivery location is inaccessible or unsafe.</li>
                        </ul>
                        <p><strong>7.5.2</strong> In cases of failed delivery:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>7.5.2.1</strong> The order may be cancelled; and</li>
                            <li><strong>7.5.2.2</strong> The User may not be eligible for a refund, subject to the Refund &amp; Cancellation Policy.</li>
                        </ul>
                    </div>
                </div>

                {/* 7.6 Delivery Instructions */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">7.6 Delivery Instructions</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>7.6.1</strong> Any special delivery instructions provided by the User shall be for guidance purposes only.</p>
                        <p><strong>7.6.2</strong> The Company does not guarantee compliance with instructions that are:</p>
                        <ul className="list-none pl-5 space-y-1 mt-1">
                            <li><strong>7.6.2.1</strong> Unsafe;</li>
                            <li><strong>7.6.2.2</strong> Unlawful;</li>
                            <li><strong>7.6.2.3</strong> Operationally infeasible.</li>
                        </ul>
                    </div>
                </div>

                {/* 7.7 Contactless and Safe Delivery */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">7.7 Contactless and Safe Delivery</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>7.7.1</strong> Where contactless or doorstep delivery options are offered, such delivery shall be deemed complete upon placement of the order at the designated location.</p>
                        <p><strong>7.7.2</strong> The User assumes responsibility for the order once delivery is marked as completed in accordance with such option.</p>
                    </div>
                </div>

                {/* 7.8 Transfer of Risk */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">7.8 Transfer of Risk</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>7.8.1</strong> Risk in the food order shall pass to the User upon successful delivery at the designated address or location.</p>
                        <p><strong>7.8.2</strong> The Company shall not be liable for loss, damage, or deterioration of food after delivery is completed.</p>
                    </div>
                </div>

                {/* 7.9 No Compensation for Delays */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">7.9 No Compensation for Delays</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>7.9.1</strong> Users acknowledge that delays in delivery do not automatically entitle the User to refunds, compensation, or damages.</p>
                        <p><strong>7.9.2</strong> Any relief provided in relation to delays shall be strictly governed by the applicable Refund &amp; Cancellation Policy.</p>
                    </div>
                </div>

                {/* 7.10 Force Majeure */}
                <div>
                    <h3 className="text-gray-900 font-bold text-lg mb-2">7.10 Force Majeure</h3>
                    <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                        <p><strong>7.10.1</strong> The Company shall not be liable for failure or delay in delivery caused by events beyond its reasonable control, including but not limited to natural disasters, strikes, governmental actions, or public emergencies.</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
