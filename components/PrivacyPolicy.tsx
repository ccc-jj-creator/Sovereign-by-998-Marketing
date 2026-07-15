import React from 'react';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="py-32 px-6 max-w-4xl mx-auto min-h-screen text-gray-400">
      <h1 className="text-4xl md:text-5xl font-serif text-white mb-8">Privacy Policy</h1>
      
      <div className="space-y-6 text-sm leading-relaxed">
        <p className="font-bold text-gray-300">Effective Date: [Insert Date]</p>

        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Information We Collect</h2>
          <p>We may collect personal information such as your name, email address, phone number, and any information you provide when filling out forms on our website.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. How We Use Your Information</h2>
          <p>We use the collected information to evaluate your eligibility for our programs, to communicate with you regarding your application, and to provide updates or marketing materials related to our services.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Information Sharing</h2>
          <p className="border-l-4 border-wealth-gold pl-4 bg-white/5 py-3 pr-4 my-4 font-medium text-gray-300">
            Mobile information will not be shared with third parties or affiliates for marketing or promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
          </p>
          <p>Except as stated above, we do not sell, trade, or otherwise transfer to outside parties your personally identifiable information without your consent, except to trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. SMS Communications & Opt-In Data</h2>
          <p>If you have provided your phone number and opted in to receive SMS messages, you can opt out at any time by replying <strong>STOP</strong>. For assistance, reply <strong>HELP</strong>. Please refer to our full <a href="#/sms-terms" className="text-wealth-gold hover:underline">SMS Terms</a> for more details.</p>
          <p className="mt-2">Your mobile information and consent to receive SMS will <strong>never</strong> be shared with third parties or affiliates for marketing or promotional purposes. We respect your privacy and adhere strictly to A2P 10DLC guidelines.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">5. Contact Information</h2>
          <p>If you have any questions regarding this privacy policy, you may contact us using the information below:</p>
          <div className="mt-4 p-4 bg-wealth-charcoal border border-white/10 rounded">
            <p className="font-bold text-white">998 Marketing LLC (dba Sovereign 998)</p>
            <p>1017 Plain Street, Newark, NY 14513, US</p>
            <p>Phone: +19394008306</p>
            <p>Email: prebay.inc@gmail.com</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
