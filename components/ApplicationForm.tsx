import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

const ApplicationForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    industry: '',
    lead_preference: '',
    marketing_budget: '',
    budget_confirmation: '',
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    // Safe check for type and checked property
    const isCheckbox = (e.target as HTMLInputElement).type === 'checkbox';
    const finalValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
        ...prev,
        [name]: finalValue
    }));

    if (name === 'lead_preference') {
      setShowOwnSystemWarning(value === 'Own System');
    }

    if (name === 'marketing_budget') {
      const isLowBudget = value === 'Under $3,000';
      setShowBudgetWarning(isLowBudget);
      if (!isLowBudget) setIsQualified(true);
    }
    
    if (name === 'budget_confirmation') {
      setIsQualified(value === 'Yes');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const webhookUrl = 'https://hooks.zapier.com/hooks/catch/25664223/ufar6c4/';

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors', // Required for Zapier webhooks to work from the browser
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    } catch (error) {
        console.error("Webhook failed", error);
    }
    
    // Move to calendar step regardless of webhook status to keep UX smooth
    setStep(2);
  };

  // Helper for ROI calculation based on budget
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

      <div className="max-w-xl mx-auto relative z-20 text-left">
        {step === 1 ? (
          <form onSubmit={handleSubmit} className="space-y-6 bg-wealth-black/50 p-6 border border-white/5 backdrop-blur-sm">
            
            {/* Industry */}
            <div>
                <label className="block text-xs font-bold letter-spacing-[0.1em] text-gray-400 uppercase mb-2">Select Your Practice Type</label>
                <select 
                    name="industry" 
                    className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none" 
                    required 
                    value={formData.industry}
                    onChange={handleInputChange}
                >
                    <option value="" disabled>Select practice type</option>
                    <option value="Independent RIA">Independent RIA</option>
                    <option value="Wirehouse">Wirehouse / Broker-Dealer</option>
                    <option value="Hybrid RIA">Hybrid RIA</option>
                    <option value="CFP">Financial Planner / CFP</option>
                    <option value="Insurance">Insurance / Annuity Specialist</option>
                    <option value="Family Office">Family Office / Private Wealth</option>
                </select>
            </div>

            {/* Lead Pref */}
            <div>
                 <label className="block text-xs font-bold letter-spacing-[0.1em] text-gray-400 uppercase mb-2">Preference</label>
                 <div className="space-y-3">
                    {['Buy Leads', 'Own System'].map(opt => (
                        <label key={opt} className="block relative cursor-pointer group">
                             <input type="radio" name="lead_preference" value={opt} className="peer sr-only" onChange={handleInputChange} checked={formData.lead_preference === opt} required />
                             <div className="flex items-center p-4 bg-wealth-charcoal border border-white/10 peer-checked:border-wealth-gold peer-checked:bg-wealth-gold/5 transition-all">
                                <div className="w-4 h-4 rounded-full border border-gray-500 mr-4 peer-checked:bg-wealth-gold peer-checked:border-wealth-gold"></div>
                                <div>
                                    <span className="block text-white text-sm font-medium">{opt === 'Buy Leads' ? 'Buy Leads (Turnkey)' : 'Own Lead Generation (In-House)'}</span>
                                    <span className="block text-gray-500 text-xs mt-1">{opt === 'Buy Leads' ? 'I want qualified leads delivered to me.' : 'I want to build my own marketing infrastructure.'}</span>
                                </div>
                             </div>
                        </label>
                    ))}
                 </div>
                 {showOwnSystemWarning && (
                     <div className="mt-3 bg-wealth-charcoal border-l-2 border-wealth-gold p-4 text-xs text-gray-400">
                         <strong className="text-white block mb-1">Operational Reality Check:</strong>
                         Building an internal system requires significant overhead ($100k+/yr). Are you structured for this?
                     </div>
                 )}
            </div>

            {/* Budget */}
            <div>
                 <label className="block text-xs font-bold letter-spacing-[0.1em] text-gray-400 uppercase mb-2">Monthly Growth Budget</label>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                     {['Under $3,000', '$3,000-$7,000', '$7,000-$15,000', '$15,000-$30,000', '$30,000-$50,000', '$50,000+'].map(budget => (
                         <label key={budget} className="block relative cursor-pointer">
                             <input type="radio" name="marketing_budget" value={budget} className="peer sr-only" onChange={handleInputChange} checked={formData.marketing_budget === budget} required />
                             <div className="p-3 bg-wealth-charcoal border border-white/10 peer-checked:border-wealth-gold peer-checked:bg-wealth-gold/5 flex items-center">
                                 <div className="w-3 h-3 rounded-full border border-gray-500 mr-3 peer-checked:bg-wealth-gold peer-checked:border-wealth-gold"></div>
                                 <span className="text-white text-sm">{budget}</span>
                             </div>
                         </label>
                     ))}
                 </div>
                 
                 {roi && (
                     <div className="mt-4 bg-gradient-to-r from-wealth-charcoal to-black border border-white/10 p-4 animate-fade-in">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-wealth-gold">Projected Impact</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Est. New HNW Clients</p>
                                <p className="text-xl text-white font-serif font-medium">{roi.clients} /mo</p>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 mb-1">Potential AUM Growth</p>
                                <p className="text-xl text-white font-serif font-medium">{roi.aum}</p>
                            </div>
                        </div>
                     </div>
                 )}

                 {showBudgetWarning && (
                     <div className="mt-4 bg-red-900/20 border border-red-900/50 p-6 animate-fade-in">
                        <div className="flex gap-3 mb-4">
                            <AlertCircle className="text-red-500 shrink-0" />
                            <p className="text-white text-sm">
                                Our system generally requires a minimum media buy of <span className="text-wealth-gold font-bold">$3,000/mo</span> to generate qualified HNW leads. Is that feasible?
                            </p>
                        </div>
                        <div className="space-y-2">
                             {['Yes', 'No'].map(opt => (
                                <label key={opt} className="block relative cursor-pointer">
                                    <input type="radio" name="budget_confirmation" value={opt} className="peer sr-only" onChange={handleInputChange} checked={formData.budget_confirmation === opt} />
                                    <div className="p-3 bg-black/50 border border-white/10 peer-checked:border-white flex items-center">
                                        <div className="w-3 h-3 rounded-full border border-gray-500 mr-3 peer-checked:bg-white"></div>
                                        <span className="text-white text-sm">{opt === 'Yes' ? 'Yes, I can make it work' : "No, I can't afford it"}</span>
                                    </div>
                                </label>
                             ))}
                        </div>
                     </div>
                 )}
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-2 gap-4">
                <input type="text" name="first_name" placeholder="First Name" className="bg-wealth-charcoal border border-white/10 p-4 text-white focus:border-wealth-gold outline-none w-full" required onChange={handleInputChange} />
                <input type="text" name="last_name" placeholder="Last Name" className="bg-wealth-charcoal border border-white/10 p-4 text-white focus:border-wealth-gold outline-none w-full" required onChange={handleInputChange} />
            </div>
            <input type="email" name="email" placeholder="Work Email" className="bg-wealth-charcoal border border-white/10 p-4 text-white focus:border-wealth-gold outline-none w-full" required onChange={handleInputChange} />
            <input type="tel" name="phone" placeholder="Phone Number" className="bg-wealth-charcoal border border-white/10 p-4 text-white focus:border-wealth-gold outline-none w-full" required onChange={handleInputChange} />
            
            {/* Consent */}
            <div className="flex items-start space-x-3 pt-2">
                <input 
                    type="checkbox" 
                    name="consent" 
                    required 
                    className="mt-1 bg-wealth-charcoal border-white/20"
                    onChange={handleInputChange}
                />
                <p className="text-[10px] text-gray-500 leading-tight">
                    By submitting this form, you consent to receive marketing text messages and emails from Sovereign Wealth Systems at the number provided. Consent is not a condition of purchase. Msg & data rates may apply. Unsubscribe at any time.
                </p>
            </div>

            <button 
                type="submit" 
                disabled={!isQualified}
                className="w-full py-5 text-sm font-semibold tracking-widest uppercase transition-all duration-300 bg-white text-black hover:bg-wealth-gold hover:text-white border border-transparent disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {isQualified ? 'Check Availability' : 'Not Qualified'}
                {isQualified && <ArrowRight size={16} />}
            </button>

          </form>
        ) : (
            <div className="animate-fade-in">
                <div className="w-full bg-wealth-black border border-white/10 p-2 min-h-[600px]">
                     <iframe 
                        src={`https://api.leadconnectorhq.com/widget/booking/7Do59Uva5qszIlIfg6vb?first_name=${formData.first_name}&last_name=${formData.last_name}&email=${formData.email}&phone=${formData.phone}`} 
                        style={{width: '100%', border: 'none', overflow: 'hidden', height: '600px'}} 
                        scrolling="no" 
                        id="ghl-calendar-iframe"
                        title="Sovereign Calendar">
                    </iframe>
                </div>
                <p className="text-center text-xs text-gray-500 mt-4">Time zone auto-detected.</p>
            </div>
        )}
      </div>
    </section>
  );
};

export default ApplicationForm;