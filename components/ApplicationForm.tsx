import React, { useState } from 'react';

const ApplicationForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Property Details
    property_address: '',
    property_condition: '',
    timeline: '',

    // Step 2: Motivation
    reason: '',
    occupancy: '',
    
    // Step 3: Identity
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isCheckbox = (e.target as HTMLInputElement).type === 'checkbox';
    const finalValue = isCheckbox ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({
        ...prev,
        [name]: finalValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const webhookUrl = 'https://hooks.zapier.com/hooks/catch/25664223/ufar6c4/';
    
    const payload = {
        ...formData,
        submitted_at: new Date().toISOString(),
        source: 'Sovereign Real Estate - Web App',
        status: 'Lead'
    };

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
    } catch (error) {
        console.error("Webhook failed", error);
    }
    
    setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true); // Move to Calendar
    }, 2000);
  };

  return (
    <section id="apply" className="py-32 px-6 text-center">
      <div className="max-w-3xl mx-auto mb-12">
        <div className="inline-block bg-wealth-gold/10 border border-wealth-gold text-wealth-gold px-4 py-1 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse-slow">
          Direct Buyer • No Middlemen
        </div>
        <h2 className="text-4xl md:text-6xl font-serif mb-8 text-white">
          Get Your Cash Offer. <br />
          <span className="text-gray-600">Close On Your Timeline.</span>
        </h2>
        <p className="text-gray-400 text-lg mb-4 max-w-xl mx-auto">
          Submit your property details below to see what we can pay for your house in cash, as-is.
        </p>
      </div>

      <div className="max-w-2xl mx-auto relative z-20 text-left">
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="bg-wealth-black/50 p-6 md:p-10 border border-white/10 backdrop-blur-md shadow-2xl relative">
            
            <div className="space-y-6 animate-fade-in">
                {/* --- PROPERTY DETAILS --- */}
                    <div>
                        <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Property Address</label>
                        <input 
                            type="text"
                            name="property_address"
                            value={formData.property_address}
                            onChange={handleInputChange}
                            className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none rounded-none transition-colors"
                            required
                            placeholder="123 Main St, City, ST 12345"
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Property Condition</label>
                            <select 
                                name="property_condition" 
                                className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none appearance-none rounded-none transition-colors" 
                                required 
                                value={formData.property_condition}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Select Condition</option>
                                <option value="Excellent">Excellent (Move-in Ready)</option>
                                <option value="Good">Good (Minor Updates Needed)</option>
                                <option value="Fair">Fair (Needs Repairs)</option>
                                <option value="Poor">Poor (Major Rehab Needed)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Timeline to Sell</label>
                            <select 
                                name="timeline" 
                                className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none appearance-none rounded-none transition-colors" 
                                required 
                                value={formData.timeline}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Select Timeline</option>
                                <option value="ASAP">ASAP (Less than 30 days)</option>
                                <option value="1-3 Months">1 to 3 Months</option>
                                <option value="3-6 Months">3 to 6 Months</option>
                                <option value="Just Browsing">Just seeing what it's worth</option>
                            </select>
                        </div>
                    </div>

                {/* --- MOTIVATION --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
                        <div>
                            <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Reason for Selling</label>
                            <select 
                                name="reason" 
                                className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none appearance-none rounded-none transition-colors" 
                                required 
                                value={formData.reason}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Select Reason</option>
                                <option value="Job Relocation">Job Relocation</option>
                                <option value="Inheritance / Probate">Inheritance / Probate</option>
                                <option value="Tired of Tenants">Tired of Tenants</option>
                                <option value="Need Cash Quickly">Need Cash Quickly</option>
                                <option value="Pre-Foreclosure">Pre-Foreclosure</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Occupancy</label>
                            <select 
                                name="occupancy" 
                                className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none appearance-none rounded-none transition-colors" 
                                required 
                                value={formData.occupancy}
                                onChange={handleInputChange}
                            >
                                <option value="" disabled>Select Occupancy</option>
                                <option value="Vacant">Vacant</option>
                                <option value="Owner Occupied">Owner Occupied</option>
                                <option value="Tenant Occupied">Tenant Occupied</option>
                            </select>
                        </div>
                    </div>

                {/* --- IDENTITY --- */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-white/10">
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
                        <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Email Address</label>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none rounded-none transition-colors"
                            required
                            placeholder="john@example.com"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-bold tracking-[0.1em] text-gray-400 uppercase mb-2">Phone (Optional)</label>
                        <input 
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-wealth-charcoal border border-white/10 text-white p-4 focus:border-wealth-gold outline-none rounded-none transition-colors"
                            placeholder="(555) 123-4567"
                        />
                    </div>

                    <div className="flex items-start space-x-3 pt-2">
                        <input type="checkbox" id="consent" name="consent" onChange={handleInputChange} checked={formData.consent} className="mt-1 bg-wealth-charcoal border-white/20 accent-wealth-gold" />
                        <label htmlFor="consent" className="text-[10px] text-gray-400 leading-tight cursor-pointer">
                            By checking this box, I agree to receive recurring automated SMS messages from 998 Marketing LLC (dba Sovereign 998). Message frequency: up to 4 messages per month. Message &amp; data rates may apply. Reply STOP to opt out. Reply HELP for assistance. View our <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-wealth-gold hover:underline">Privacy Policy</a> and <a href="/sms-terms" target="_blank" rel="noopener noreferrer" className="text-wealth-gold hover:underline">SMS Terms</a>.
                        </label>
                    </div>

                    <div className="pt-6">
                        <button 
                            type="submit"
                            disabled={!formData.property_address || !formData.property_condition || !formData.timeline || !formData.reason || !formData.occupancy || !formData.first_name || !formData.last_name || !formData.email || isSubmitting}
                            className="px-8 py-4 bg-white text-black text-sm font-bold tracking-[0.2em] uppercase hover:bg-wealth-gold hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full flex justify-center items-center gap-2"
                        >
                            {isSubmitting ? 'Submitting...' : 'Get Cash Offer'}
                        </button>
                    </div>
                </div>
          </form>
        ) : (
            /* --- SUCCESS / CALENDAR --- */
            <div className="bg-wealth-black border border-white/10 p-4 animate-fade-in min-h-[600px] flex flex-col">
                <div className="text-center py-6 border-b border-white/10">
                    <div className="text-wealth-gold mb-2">
                        <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-2">Property Details Received</h3>
                    <p className="text-gray-400 text-sm">Select a time for a quick phone consultation to discuss your offer.</p>
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