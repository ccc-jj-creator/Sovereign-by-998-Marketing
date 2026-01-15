import React from 'react';

const TIDYCAL_URL = 'https://tidycal.com/3lgydj0/30-minute-meeting';

const ApplicationForm: React.FC = () => {
  return (
    <section id="contact" className="py-32 px-6 text-center">
      <div className="max-w-3xl mx-auto mb-12">
        <div className="inline-block bg-wealth-gold/10 border border-wealth-gold text-wealth-gold px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse-slow">
          Founding Partner Cohort: Open
        </div>
        <h2 className="text-4xl md:text-6xl font-serif mb-8 text-white">
          Scale Your Practice. <br />
          <span className="text-gray-600">Reclaim Your Time.</span>
        </h2>
        <p className="text-gray-400 text-lg mb-4 max-w-xl mx-auto">
          We are selecting 5 Partners to receive our Enterprise-Grade Media Production & Lead Systems at cost, in exchange for a documented case study.
        </p>
        <p className="text-gray-500 text-sm mb-8 max-w-lg mx-auto">
          Book a 30-minute strategy session to discover how the Sovereign Client Acquisition System™ can transform your practice.
        </p>
      </div>

      <div className="max-w-2xl mx-auto relative z-20">
        <div className="bg-wealth-black/50 p-8 md:p-12 border border-white/10 backdrop-blur-md shadow-2xl">
          <div className="text-center">
            <div className="text-wealth-gold mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-white mb-4">
              Ready to Build Your Growth Engine?
            </h3>
            <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
              Select a time that works for you. We'll discuss your current situation, growth goals, and determine if the Sovereign System is right for your firm.
            </p>
            <a
              href={TIDYCAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-12 py-5 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-wealth-gold hover:text-white transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              Schedule Your Strategy Session
            </a>
            <p className="text-gray-600 text-xs mt-6 uppercase tracking-widest">
              30 Minutes • No Obligation • High-Value Consultation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;
