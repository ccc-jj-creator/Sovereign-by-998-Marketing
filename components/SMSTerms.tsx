import React from 'react';

const SMSTerms: React.FC = () => {
  return (
    <div className="py-32 px-6 max-w-4xl mx-auto min-h-screen text-gray-400">
      <h1 className="text-4xl md:text-5xl font-serif text-white mb-8">SMS Terms and Conditions</h1>
      
      <div className="space-y-6 text-sm leading-relaxed">
        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">Program Overview</h2>
          <p>When you opt-in to our SMS program, you are consenting to receive recurring automated marketing and informational text messages from 998 Marketing LLC (dba Sovereign 998).</p>
          <p className="mt-2">Messages may include strategy-session confirmations, follow-ups, and marketing updates regarding our real estate purchasing services.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">Message Frequency</h2>
          <p>You may receive up to 4 messages per month. Message frequency varies if a conversation ensues.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">Cost and Fees</h2>
          <p><strong>Message and data rates may apply.</strong> Depending on your text plan, you may be charged by your carrier.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">Opt-Out Instructions</h2>
          <p>You can cancel the SMS service at any time. Just text <strong>STOP</strong> to the short code or number you received a message from. After you send the SMS message <strong>STOP</strong> to us, we will send you an SMS message to confirm that you have been unsubscribed. After this, you will no longer receive SMS messages from us. If you want to join again, just sign up as you did the first time and we will start sending SMS messages to you again.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">Help and Support</h2>
          <p>If you are experiencing issues with the messaging program you can reply with the keyword <strong>HELP</strong> for more assistance, or you can get help directly at prebay.inc@gmail.com or call +1 (939) 400-8306.</p>
        </section>
        
        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">Carrier Liability</h2>
          <p>Carriers are not liable for delayed or undelivered messages.</p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-white mt-8 mb-4">Privacy</h2>
          <p>Your privacy is important to us. Your mobile information and consent will not be shared with third parties or affiliates for marketing or promotional purposes. For more information, please read our full <a href="/privacy" className="text-wealth-gold hover:underline">Privacy Policy</a>.</p>
        </section>
      </div>
    </div>
  );
};

export default SMSTerms;
