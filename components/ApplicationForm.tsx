import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

const ApplicationForm: React.FC = () => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    // Load the GHL form embed script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    // Listen for form submission message from GHL iframe
    const handleMessage = (event: MessageEvent) => {
      // GHL forms send messages on submission
      if (event.data && (event.data.type === 'form:submit' || event.data.formSubmitted)) {
        setStep(2);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return (
    <section id="contact" className="py-32 px-6 text-center">
      <div className="max-w-3xl mx-auto mb-12">
        <div className="inline-block bg-wealth-gold/10 border border-wealth-gold text-wealth-gold px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6">
          Founding Partner Cohort: Open
        </div>
        <h2 className="text-4xl md:text-6xl font-serif mb-8 text-white">
          Scale Your Practice. <br />
          <span className="text-gray-600">Reclaim Your Time.</span>
        </h2>
        <p className="text-gray-400 text-lg mb-4 max-w-xl mx-auto">
          We are selecting 5 Partners to receive our Enterprise-Grade Media Production & Lead Systems at cost, in exchange for a documented case study.
        </p>
        <p className="text-sm text-white/80 mt-4 mb-12 font-medium bg-wealth-charcoal inline-flex items-center gap-2 px-4 py-2 border border-white/10">
          <CheckCircle2 size={16} className="text-wealth-gold"/>
          The 21-Day Launch Guarantee: We build your entire system in 21 days or less, or your setup fee is refunded.
        </p>
      </div>

      <div className="max-w-xl mx-auto relative z-20">
        {step === 1 ? (
          <>
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/s79KnChAtYtbHnUR3DKN"
              style={{width: '100%', height: '1119px', border: 'none', borderRadius: '3px'}}
              id="inline-s79KnChAtYtbHnUR3DKN"
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Highlevel"
              data-height="1119"
              data-layout-iframe-id="inline-s79KnChAtYtbHnUR3DKN"
              data-form-id="s79KnChAtYtbHnUR3DKN"
              title="Highlevel"
            />
            <button
              onClick={() => setStep(2)}
              className="mt-6 text-sm text-gray-500 hover:text-wealth-gold underline transition-colors"
            >
              Already submitted? Click here to schedule
            </button>
          </>
        ) : (
          <div className="animate-fade-in">
            <div className="w-full bg-wealth-black border border-white/10 p-2 min-h-[600px]">
              <iframe
                src="https://api.leadconnectorhq.com/widget/booking/7Do59Uva5qszIlIfg6vb"
                style={{width: '100%', border: 'none', overflow: 'hidden', height: '600px'}}
                scrolling="no"
                id="ghl-calendar-iframe"
                title="Sovereign Calendar"
              />
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">Time zone auto-detected.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplicationForm;
