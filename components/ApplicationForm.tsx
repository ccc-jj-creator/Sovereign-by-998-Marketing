import React, { useState } from 'react';

interface ApplicationFormProps {
  isModal?: boolean;
  onClose?: () => void;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ isModal = false, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Market Position
    industry: '',
    current_aum: '',
    marketing_budget: '',
    budget_confirmation: '',

    // Step 2: Infrastructure
    team_structure: '',
    custodian: '',
    lead_preference: '',
    
    // Step 3: Identity
    website: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    consent: false
  });

  const [showBudgetWarning, setShowBudgetWarning] = useState(false);
  const [showOwnSystemWarning, setShowOwnSystemWarning] = useState(false);
  const [isQualified, setIsQualified] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isCheckbox = (e.target as HTMLInputElement).type === 'checkbox';
    const finalValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
        ...prev,
        [name]: finalValue
    }));

    // Logic Triggers
    if (name === 'lead_preference') {
      setShowOwnSystemWarning(value === 'Own System');
    }

    if (name === 'marketing_budget') {
      const isLowBudget = value === 'Under $3,000';
      setShowBudgetWarning(isLowBudget);
      // Reset qualification status if they change budget back up
      if (!isLowBudget) setIsQualified(true);
      else setIsQualified(false); // Default to not qualified until they confirm
    }
    
    if (name === 'budget_confirmation') {
      setIsQualified(value === 'Yes');
    }
  };

  const nextStep = () => {
    // Basic validation per step
    if (step === 1) {
        if (!formData.industry || !formData.current_aum || !formData.marketing_budget) return;
        if (showBudgetWarning && !formData.budget_confirmation) return;
        if (!isQualified) return;
    }
    if (step === 2) {
        if (!formData.team_structure || !formData.lead_preference || !formData.custodian) return;
    }
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
      setStep(prev => prev - 1);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const webhookUrl = 'https://hooks.zapier.com/hooks/catch/25664223/ufar6c4/';
    
    // Create a payload that looks impressive in the CRM
    const payload = {
        ...formData,
        submitted_at: new Date().toISOString(),
        source: 'Sovereign Wealth Systems - Web App',
        status: isQualified ? 'Qualified' : 'Disqualified'
    };

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors', // Opaque response
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    } catch (error) {
        console.error("Webhook failed", error);
    }
    
    // Simulate processing time for "Territory Availability Check"
    setTimeout(() => {
        setIsSubmitting(false);
        setStep(4); // Move to Calendar
    }, 2000);
  };

  const getRoi = (budget: string) => {
      switch(budget) {
          case '$3,000-$7,000': return { clients: '1-3', aum: '$1M-$3M+' };
          case '$7,000-$15,000': return { clients: '3-7', aum: '$3M-$7M+' };
          case '$15,000-$30,000': return { clients: '7-14', aum: '$7M-$15M+' };
          case '$30,000-$50,000': return { clients: '15-25', aum: '$15M-$25M+' };
          case '$50,000+': return { clients: '25+', aum: '$25M-$50M+' };
          default: return null;
      }
  }

  const roi = getRoi(formData.marketing_budget);

  // Render Helpers
  const renderProgressBar = () => (
      <div className="flex items-center justify-between mb-8 relative px-4">
          <div className="absolute top-[14px] left-0 w-full h-[1px] bg-white/10 -z-10"></div>
          {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center group">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mb-2 transition-all duration-300 ${step >= s ? 'bg-wealth-gold border-wealth-gold text-black' : 'bg-wealth-black border-gray-700 text-gray-500'}`}>
                      {step > s ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      ) : (
                          <span className="text-xs font-bold">{s}</span>
                      )}
                  </div>
                  <span className={`text-[10px] uppercase tracking-widest font-bold transition-colors ${step >= s ? 'text-wealth-gold' : 'text-gray-600'}`}>
                      {s === 1 ? 'Position' : s === 2 ? 'Infrastructure' : 'Identity'}
                  </span>
              </div>
          ))}
      </div>
  );

  return (
    <section id="contact" className={isModal ? "py-8 px-6 text-center" : "py-32 px-6 text-center"}>
      <div className={isModal ? "max-w-3xl mx-auto mb-6" : "max-w-3xl mx-auto mb-12"}>
        <div className="inline-block bg-wealth-gold/10 border border-wealth-gold text-wealth-gold px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse-slow">
          Founding Partner Cohort: Open
        </div>
        <h2 className={isModal ? "text-3xl md:text-4xl font-serif mb-4 text-white" : "text-4xl md:text-6xl font-serif mb-8 text-white"}>
          Scale Your Practice. <br />
          <span className="text-gray-600">Reclaim Your Time.</span>
        </h2>
        <p className="text-gray-400 text-lg mb-4 max-w-xl mx-auto">
          We are selecting 5 Partners to receive our Enterprise-Grade Media Production & Lead Systems at cost, in exchange for a documented case study.
        </p>
      </div>

      <div className="max-w-2xl mx-auto relative z-20 text-left">
        {step < 4 ? (
          <form onSubmit={handleSubmit} className="bg-wealth-black/50 p-6 md:p-10 border border-white/10 backdrop-blur-md shadow-2xl relative">
            
            {renderProgressBar()}

            {/* --- STEP 1: MARKET POSITION --- */}
            {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Practice Model</label>
                            <select 
                                name="industry" 
                                className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none appearance-none rounded-none transition-colors" 
                                required 
                                value={formData.industry}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Select Type</option>
                                <option value="Independent RIA">Independent RIA</option>
                                <option value="Wirehouse">Wirehouse / Broker-Dealer</option>
                                <option value="Hybrid RIA">Hybrid RIA</option>
                                <option value="Family Office">Family Office</option>
                                <option value="Institutional">Institutional Asset Mgr</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Current AUM</label>
                            <select 
                                name="current_aum" 
                                className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none appearance-none rounded-none transition-colors" 
                                required 
                                value={formData.current_aum}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Select Range</option>
                                <option value="Under $10M">Under $10M</option>
                                <option value="$10M - $50M">$10M - $50M</option>
                                <option value="$50M - $100M">$50M - $100M</option>
                                <option value="$100M - $250M">$100M - $250M</option>
                                <option value="$250M - $500M">$250M - $500M</option>
                                <option value="$500M+">$500M+</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Monthly Growth Capital</label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {['Under $3,000', '$3,000-$7,000', '$7,000-$15,000', '$15,000-$30,000', '$30,000-$50,000', '$50,000+'].map(budget => (
                                <label key={budget} className="block relative cursor-pointer group">
                                    <input type="radio" name="marketing_budget" value={budget} className="peer sr-only" onChange={handleInputChange} checked={formData.marketing_budget === budget} required />
                                    <div className="p-4 bg-wealth-charcoal border border-white/10 peer-checked:border-wealth-gold peer-checked:bg-wealth-gold/5 flex items-center justify-center text-center h-full transition-all hover:border-white/30">
                                        <span className="text-white text-xs font-medium">{budget}</span>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* ROI Panel (High Budget) */}
                    {roi && !showBudgetWarning && (
                     <div className="bg-gradient-to-r from-wealth-charcoal to-black border border-wealth-gold/30 p-4 animate-fade-in relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-wealth-gold/10 blur-xl rounded-full pointer-events-none"></div>
                        <div className="flex justify-between items-center mb-2 relative z-10">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-wealth-gold flex items-center gap-2">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                Projected Impact
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3 relative z-10">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Est. New HNW Clients</p>
                                <p className="text-xl text-white font-serif font-medium">{roi.clients} <span className="text-sm text-gray-500 font-sans">/mo</span></p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Potential AUM Growth</p>
                                <p className="text-xl text-white font-serif font-medium">{roi.aum} <span className="text-sm text-gray-500 font-sans">/yr</span></p>
                            </div>
                        </div>
                     </div>
                    )}

                    {/* Warning Panel (Low Budget) */}
                    {showBudgetWarning && (
                        <div className="bg-red-900/10 border border-red-900/50 p-6 animate-fade-in">
                            <p className="text-white text-sm mb-4 leading-relaxed">
                                <strong className="text-red-400 block mb-2 text-xs uppercase tracking-widest">Capital Requirement Alert</strong>
                                Our Sovereign Client Acquisition System installs institutional-grade infrastructure. This requires a minimum media spend of <span className="text-wealth-gold font-bold">$3,000/mo</span> to generate qualified HNW leads. Is this feasible for your firm?
                            </p>
                            <div className="space-y-2">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="radio" name="budget_confirmation" value="Yes" className="peer sr-only" onChange={handleInputChange} checked={formData.budget_confirmation === 'Yes'} />
                                    <div className="w-4 h-4 border border-gray-500 rounded-full peer-checked:bg-wealth-gold peer-checked:border-wealth-gold"></div>
                                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">Yes, I can allocate the required capital.</span>
                                </label>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="radio" name="budget_confirmation" value="No" className="peer sr-only" onChange={handleInputChange} checked={formData.budget_confirmation === 'No'} />
                                    <div className="w-4 h-4 border border-gray-500 rounded-full peer-checked:bg-red-500 peer-checked:border-red-500"></div>
                                    <span className="text-sm text-gray-400 group-hover:text-white transition-colors">No, this is outside my current budget.</span>
                                </label>
                            </div>
                        </div>
                    )}

                    <div className="pt-4 flex justify-end">
                        <button 
                            type="button"
                            onClick={nextStep}
                            disabled={!formData.industry || !formData.current_aum || !formData.marketing_budget || (showBudgetWarning && !formData.budget_confirmation) || !isQualified}
                            className="px-8 py-3 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-wealth-gold hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* --- STEP 2: INFRASTRUCTURE --- */}
            {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Team Structure</label>
                            <select 
                                name="team_structure" 
                                className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none appearance-none rounded-none transition-colors" 
                                required 
                                value={formData.team_structure}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Select Structure</option>
                                <option value="Solo Advisor">Solo Advisor</option>
                                <option value="Team (2-5)">Team (2-5 Staff)</option>
                                <option value="Enterprise (5+)">Enterprise (5+ Staff)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Primary Custodian</label>
                            <select 
                                name="custodian" 
                                className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none appearance-none rounded-none transition-colors" 
                                required 
                                value={formData.custodian}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Select Custodian</option>
                                <option value="Charles Schwab">Charles Schwab</option>
                                <option value="Fidelity">Fidelity</option>
                                <option value="Pershing">Pershing</option>
                                <option value="LPL Financial">LPL Financial</option>
                                <option value="Raymond James">Raymond James</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Acquisition Preference</label>
                        <div className="space-y-3">
                            <label className="block relative cursor-pointer group">
                                <input type="radio" name="lead_preference" value="Buy Leads" className="peer sr-only" onChange={handleInputChange} checked={formData.lead_preference === 'Buy Leads'} required />
                                <div className="p-4 bg-wealth-charcoal border border-white/10 peer-checked:border-wealth-gold peer-checked:bg-wealth-gold/5 flex items-center transition-all">
                                    <div className="w-3 h-3 rounded-full border border-gray-500 mr-4 peer-checked:bg-wealth-gold peer-checked:border-wealth-gold shrink-0"></div>
                                    <div>
                                        <span className="text-white text-sm font-bold block mb-1">Turnkey (Done-For-You)</span>
                                        <span className="text-gray-500 text-xs">I want qualified appointments delivered to my calendar.</span>
                                    </div>
                                </div>
                            </label>
                            <label className="block relative cursor-pointer group">
                                <input type="radio" name="lead_preference" value="Own System" className="peer sr-only" onChange={handleInputChange} checked={formData.lead_preference === 'Own System'} />
                                <div className="p-4 bg-wealth-charcoal border border-white/10 peer-checked:border-wealth-gold peer-checked:bg-wealth-gold/5 flex items-center transition-all">
                                    <div className="w-3 h-3 rounded-full border border-gray-500 mr-4 peer-checked:bg-wealth-gold peer-checked:border-wealth-gold shrink-0"></div>
                                    <div>
                                        <span className="text-white text-sm font-bold block mb-1">Sovereign (In-House)</span>
                                        <span className="text-gray-500 text-xs">I want to own the marketing infrastructure myself.</span>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {showOwnSystemWarning && (
                        <div className="mt-2 bg-wealth-charcoal border-l-2 border-wealth-gold p-4 transition-all duration-300 animate-fade-in">
                            <div className="flex items-start gap-3">
                                <div className="text-wealth-gold mt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
                                </div>
                                <div className="text-xs text-gray-400 leading-relaxed">
                                    <strong className="text-white block mb-1 uppercase tracking-wider">Operational Reality Check</strong>
                                    Building a sovereign internal system typically requires <span className="text-white font-medium">$120k-$150k/yr</span> in overhead (Media Buyer + Tech Stack + Copywriter). Are you currently structured to handle this operational load?
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-4 flex justify-between">
                         <button 
                            type="button"
                            onClick={prevStep}
                            className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase hover:text-white transition-colors"
                        >
                            Back
                        </button>
                        <button 
                            type="button"
                            onClick={nextStep}
                            disabled={!formData.team_structure || !formData.lead_preference || !formData.custodian}
                            className="px-8 py-3 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-wealth-gold hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* --- STEP 3: IDENTITY --- */}
            {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">First Name</label>
                            <input 
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleInputChange}
                                className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none rounded-none transition-colors"
                                required
                                placeholder="John"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Last Name</label>
                            <input 
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleInputChange}
                                className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none rounded-none transition-colors"
                                required
                                placeholder="Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Work Email</label>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none rounded-none transition-colors"
                            required
                            placeholder="john@firm.com"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Phone</label>
                        <input 
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none rounded-none transition-colors"
                            required
                            placeholder="(555) 123-4567"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Website (Optional)</label>
                        <input 
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none rounded-none transition-colors"
                            placeholder="www.firm.com"
                        />
                    </div>

                    <div className="flex items-start space-x-3 pt-2">
                        <input type="checkbox" name="consent" onChange={handleInputChange} required className="mt-1 bg-wealth-charcoal border-white/20 accent-wealth-gold" />
                        <p className="text-[10px] text-gray-500 leading-tight">
                            I agree to receive communications from Sovereign Wealth Systems. I understand I can unsubscribe at any time.
                        </p>
                    </div>

                    <div className="pt-4 flex justify-between">
                         <button 
                            type="button"
                            onClick={prevStep}
                            className="text-gray-500 text-xs font-bold tracking-[0.2em] uppercase hover:text-white transition-colors"
                        >
                            Back
                        </button>
                        <button 
                            type="submit"
                            disabled={!formData.first_name || !formData.last_name || !formData.email || !formData.phone || !formData.consent || isSubmitting}
                            className="px-8 py-3 bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-wealth-gold hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto flex justify-center items-center gap-2"
                        >
                            {isSubmitting ? 'Verifying Availability...' : 'Check Availability'}
                        </button>
                    </div>
                </div>
            )}
          </form>
        ) : (
            /* --- STEP 4: SUCCESS / CALENDAR --- */
            <div className="bg-wealth-black border border-white/10 p-4 animate-fade-in min-h-[600px] flex flex-col">
                <div className="text-center py-6 border-b border-white/10">
                    <div className="text-wealth-gold mb-2">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-2">Pre-Approval Confirmed</h3>
                    <p className="text-gray-400 text-sm">Select a time for your Strategy Session below.</p>
                </div>
                <div className="flex-grow w-full bg-white/5 relative">
                     <iframe 
                        src="https://api.leadconnectorhq.com/widget/booking/7Do59Uva5qszIlIfg6vb" 
                        style={{width: '100%', height: '100%', border: 'none', minHeight: '500px'}}
                        scrolling="yes"
                        title="Calendar"
                    ></iframe>
                </div>
            </div>
        )}
      </div>
    </section>
  );
};

export default ApplicationForm;