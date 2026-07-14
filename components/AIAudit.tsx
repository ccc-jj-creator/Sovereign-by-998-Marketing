import React from 'react';

const AIAudit: React.FC = () => {
  return (
    <section id="audit" className="py-24 bg-wealth-charcoal relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/40 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Text Side */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <svg className="text-wealth-gold w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 21h4"/><path d="M17 3h4"/></svg>
              <span className="text-xs font-bold tracking-[0.2em] text-wealth-gold uppercase">
                Acquisition Models
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
              More than just a <span className="italic text-gray-500">cash offer.</span>
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Every seller's situation is unique. While we buy houses for cash, we also specialize in creative financing structures that can put more money in your pocket over time, or provide immediate relief from burdensome mortgages.
            </p>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-wealth-gold mt-2 flex-shrink-0"></div>
                 <p className="text-sm text-gray-300"><strong className="text-white">Inherited Properties:</strong> Sell quickly without dealing with probate delays or repairs.</p>
              </li>
              <li className="flex items-start gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-wealth-gold mt-2 flex-shrink-0"></div>
                 <p className="text-sm text-gray-300"><strong className="text-white">Tired Landlords:</strong> Cash out of your rental portfolio or become the bank and collect passive income.</p>
              </li>
              <li className="flex items-start gap-3">
                 <div className="w-1.5 h-1.5 rounded-full bg-wealth-gold mt-2 flex-shrink-0"></div>
                 <p className="text-sm text-gray-300"><strong className="text-white">Pre-Foreclosure:</strong> We can take over your payments and save your credit.</p>
              </li>
            </ul>
          </div>

          {/* Cards Side */}
          <div className="space-y-6">
            
            <div className="bg-wealth-black border border-white/5 p-8 group hover:border-wealth-gold/50 transition-colors">
              <h3 className="text-xl font-serif text-white mb-2">1. All-Cash Offer</h3>
              <p className="text-sm text-gray-400 mb-4">The fastest way to sell. We wire cash directly to the title company. Close in as little as 7 days or pick your exact move-out date.</p>
              <div className="text-xs font-bold tracking-widest text-wealth-gold uppercase">Best For: Speed & Convenience</div>
            </div>

            <div className="bg-wealth-black border border-white/5 p-8 group hover:border-wealth-gold/50 transition-colors">
              <h3 className="text-xl font-serif text-white mb-2">2. Seller Financing</h3>
              <p className="text-sm text-gray-400 mb-4">Be the bank. We pay you monthly installments with interest. You get a higher purchase price and passive income without the headaches of being a landlord.</p>
              <div className="text-xs font-bold tracking-widest text-wealth-gold uppercase">Best For: Maximizing Value & Income</div>
            </div>

            <div className="bg-wealth-black border border-white/5 p-8 group hover:border-wealth-gold/50 transition-colors">
              <h3 className="text-xl font-serif text-white mb-2">3. Subject-To (Take Over Payments)</h3>
              <p className="text-sm text-gray-400 mb-4">We buy the property "subject to" your existing mortgage. We start making your monthly payments, bringing the loan current if needed, allowing you to walk away free and clear.</p>
              <div className="text-xs font-bold tracking-widest text-wealth-gold uppercase">Best For: Relief & Preserving Credit</div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AIAudit;