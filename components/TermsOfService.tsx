import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="py-32 px-6 max-w-4xl mx-auto min-h-screen text-gray-400">
      <h1 className="text-4xl md:text-5xl font-serif text-white mb-8">Terms of Service</h1>
      
      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">2. SMS Program Terms</h2>
          <p>Sovereign 998 / 998 Marketing LLC sends SMS and MMS messages to individuals who have opted in to receive communications from us.</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><strong>Message Types:</strong> You may receive strategy-session confirmations, follow-ups, and marketing updates related to our real estate purchasing services.</li>
            <li><strong>Message Frequency:</strong> Up to 4 messages per month. Message frequency varies if a conversation ensues.</li>
            <li><strong>Pricing:</strong> Message and data rates may apply.</li>
            <li><strong>Opt-Out:</strong> Reply <strong>STOP</strong> to opt out at any time. This will end communications unless you opt back in.</li>
            <li><strong>Help:</strong> Reply <strong>HELP</strong> for assistance or customer support.</li>
            <li><strong>Carrier Liability:</strong> Carriers are not liable for delayed or undelivered messages.</li>
            <li><strong>Consent:</strong> Consent to receive text messages is not a condition of any purchase or service.</li>
          </ul>
          <p className="mt-4">For more information on how we handle your data, please review our <a href="/privacy" className="text-wealth-gold hover:underline">Privacy Policy</a>.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">3. Use of Services & Property Transactions</h2>
          <p>You agree to use our services only for lawful purposes and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the website. Our services include evaluating, making offers on, and purchasing real estate properties directly from homeowners. Any offers made are subject to final contract signing and due diligence.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">4. Contact Information</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
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

export default TermsOfService;
