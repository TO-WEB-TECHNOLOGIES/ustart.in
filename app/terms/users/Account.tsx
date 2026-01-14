export default function Account() {
    return (
        <section id="account" className="mb-20 scroll-mt-24 group">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#0F2441] text-white font-bold text-sm">3</span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#0F2441]">User Account, Access & Security</h2>
              </div>
              
              <div className="prose prose-lg text-gray-600 space-y-8 leading-relaxed text-sm md:text-base">
                
                {/* 3.1 Mandatory Account Creation */}
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">3.1 Mandatory Account Creation</h3>
                  <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                    <p><strong>3.1.1</strong> Access to ordering services on the Platform shall be available only to Users who have created and maintain an active user account in accordance with the procedures prescribed by the Company.</p>
                    <p><strong>3.1.2</strong> Account registration shall require the submission and verification of such information as may be determined by the Company from time to time, including but not limited to a valid mobile number and/or email address.</p>
                    <p><strong>3.1.3</strong> The Company reserves the right, in its sole discretion, to refuse registration, suspend account creation, or deny access to any person, without assigning any reason, subject to applicable law.</p>
                  </div>
                </div>

                {/* 3.2 Single Account Restriction */}
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">3.2 Single Account Restriction</h3>
                  <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                    <p><strong>3.2.1</strong> A User shall be permitted to maintain only one active account on the Platform, unless otherwise expressly authorized by the Company.</p>
                    <p><strong>3.2.2</strong> Creation or operation of multiple accounts, whether directly or indirectly, for the purpose of availing benefits, promotions, refunds, or otherwise circumventing Platform controls, shall constitute a material breach of these Terms.</p>
                  </div>
                </div>

                {/* 3.3 Account Security and Confidentiality */}
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">3.3 Account Security and Confidentiality</h3>
                  <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                    <p><strong>3.3.1</strong> Users shall be solely responsible for maintaining the confidentiality and security of their account credentials, including login details, passwords, one-time passwords (OTPs), and verification codes.</p>
                    <p><strong>3.3.2</strong> Any access to or use of the Platform through a User account shall be deemed to have been authorized by the registered account holder.</p>
                    <p><strong>3.3.3</strong> The Company shall not be liable for any loss, damage, or liability arising out of or in connection with:</p>
                    <ul className="list-none pl-5 space-y-1 mt-1">
                      <li><strong>3.3.3.1</strong> Disclosure of account credentials by the User;</li>
                      <li><strong>3.3.3.2</strong> Use of the account by any person other than the registered account holder;</li>
                      <li><strong>3.3.3.3</strong> Unauthorized access resulting from User negligence or failure to safeguard account information.</li>
                    </ul>
                  </div>
                </div>

                {/* 3.4 Responsibility of Registered Account Holder */}
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">3.4 Responsibility of Registered Account Holder</h3>
                  <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                    <p><strong>3.4.1</strong> The registered account holder shall be solely and unconditionally responsible for all activities carried out through the account, including but not limited to:</p>
                    <ul className="list-none pl-5 space-y-1 mt-1">
                      <li><strong>3.4.1.1</strong> Placement of orders;</li>
                      <li><strong>3.4.1.2</strong> Payment of charges;</li>
                      <li><strong>3.4.1.3</strong> Communications, instructions, and representations made through the Platform.</li>
                    </ul>
                    <p><strong>3.4.2</strong> The Company shall not be responsible for any disputes arising between the registered account holder and any third party, including minors or family members, who may have accessed or used the account.</p>
                  </div>
                </div>

                {/* 3.5 Unauthorized Access and Reporting */}
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">3.5 Unauthorized Access and Reporting</h3>
                  <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                    <p><strong>3.5.1</strong> The User shall immediately notify the Company upon becoming aware of any unauthorized access to or use of the account.</p>
                    <p><strong>3.5.2</strong> The Company may, upon receipt of such notification, take reasonable measures to secure the account, including suspension or additional verification, at its discretion.</p>
                    <p><strong>3.5.3</strong> The Company shall not be liable for any loss or damage incurred prior to receipt of such notification.</p>
                  </div>
                </div>

                {/* 3.6 Suspension, Restriction, and Termination */}
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">3.6 Suspension, Restriction, and Termination</h3>
                  <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                    <p><strong>3.6.1</strong> The Company reserves the right, at its sole discretion and without prior notice, to suspend, restrict, or terminate a User account, in whole or in part, if:</p>
                    <ul className="list-none pl-5 space-y-1 mt-1">
                      <li><strong>3.6.1.1</strong> The User breaches or violates these Terms;</li>
                      <li><strong>3.6.1.2</strong> Fraudulent, abusive, or suspicious activity is detected;</li>
                      <li><strong>3.6.1.3</strong> False, inaccurate, or misleading information is provided;</li>
                      <li><strong>3.6.1.4</strong> Such action is required to comply with applicable law, court orders, or regulatory directions.</li>
                    </ul>
                    <p><strong>3.6.2</strong> Suspension or termination of an account may result in cancellation of pending orders and forfeiture of promotional benefits or credits, to the extent permitted by law.</p>
                  </div>
                </div>

                {/* 3.7 Effect of Termination */}
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">3.7 Effect of Termination</h3>
                  <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                    <p><strong>3.7.1</strong> Upon termination of a User account, the User’s right to access and use the Platform shall immediately cease.</p>
                    <p><strong>3.7.2</strong> Termination shall not affect:</p>
                    <ul className="list-none pl-5 space-y-1 mt-1">
                      <li><strong>3.7.2.1</strong> Any completed transactions;</li>
                      <li><strong>3.7.2.2</strong> Any outstanding payment obligations;</li>
                      <li><strong>3.7.2.3</strong> Any rights, obligations, or remedies accrued prior to termination.</li>
                    </ul>
                  </div>
                </div>

                {/* 3.8 No Right to Continued Access */}
                <div>
                  <h3 className="text-gray-900 font-bold text-lg mb-2">3.8 No Right to Continued Access</h3>
                  <div className="pl-4 border-l-2 border-gray-100 space-y-3">
                    <p><strong>3.8.1</strong> Access to the Platform is granted on a permissive basis and does not confer any vested or proprietary right upon the User.</p>
                    <p><strong>3.8.2</strong> The Company does not warrant or guarantee uninterrupted, continuous, or permanent access to the Platform.</p>
                  </div>
                </div>

              </div>
            </section>
    );
}
