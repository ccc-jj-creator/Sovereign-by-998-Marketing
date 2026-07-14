import React, { useState, useEffect } from 'react';

const CostOfInaction: React.FC = () => {
  const [homeValue, setHomeValue] = useState<string>('300000');
  const [commission, setCommission] = useState<string>('6');
  const [repairs, setRepairs] = useState<string>('15000');
  const [holdingCosts, setHoldingCosts] = useState<string>('1500');
  const [months, setMonths] = useState<string>('4');
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    const v = parseFloat(homeValue) || 0;
    const c = parseFloat(commission) || 0;
    const r = parseFloat(repairs) || 0;
    const h = parseFloat(holdingCosts) || 0;
    const m = parseFloat(months) || 0;
    
    // Calculate Traditional Selling Costs
    // (Value * Commission / 100) + Repairs + (Holding * Months) + (Value * 0.02 Closing Costs)
    const commissionCost = v * (c / 100);
    const holdingCost = h * m;
    const standardClosing = v * 0.02; // Roughly 2% in traditional closing costs
    const calculatedCost = commissionCost + r + holdingCost + standardClosing;
    setTotalCost(calculatedCost);
  }, [homeValue, commission, repairs, holdingCosts, months]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section className="py-24 bg-wealth-black border-b border-white/5 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-wealth-gold/5 via-wealth-black to-wealth-black pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="flex items-center space-x-2 mb-6">
                        <svg className="text-wealth-gold w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2"/><line x1="8" x2="16" y1="6" y2="6"/><line x1="16" x2="16" y1="14" y2="14"/><line x1="8" x2="8" y1="14" y2="14"/><line x1="12" x2="12" y1="14" y2="14"/><line x1="8" x2="8" y1="10" y2="10"/><line x1="16" x2="16" y1="10" y2="10"/><line x1="12" x2="12" y1="10" y2="10"/><line x1="12" x2="12" y1="18" y2="18"/><line x1="8" x2="8" y1="18" y2="18"/><line x1="16" x2="16" y1="18" y2="18"/></svg>
                        <span className="text-xs font-bold tracking-[0.2em] text-wealth-gold uppercase">
                            Equity Drain Calculator
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                        The True Cost of <br/> <span className="text-gray-500">Listing on the MLS.</span>
                    </h2>
                    <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                        The traditional route isn't just slow—it's incredibly expensive. See how much equity you lose to agents, repairs, and holding costs while waiting for a buyer.
                    </p>
                    
                    <div className="p-6 bg-wealth-charcoal border border-white/10 space-y-6">
                        <div>
                            <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Estimated Home Value ($)</label>
                            <input 
                                type="number" 
                                value={homeValue} 
                                onChange={(e) => setHomeValue(e.target.value)}
                                className="w-full bg-wealth-black border border-white/10 p-4 text-white focus:border-wealth-gold outline-none font-mono"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Agent Fee (%)</label>
                                <input 
                                    type="number" 
                                    value={commission} 
                                    onChange={(e) => setCommission(e.target.value)}
                                    className="w-full bg-wealth-black border border-white/10 p-4 text-white focus:border-wealth-gold outline-none font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Repairs ($)</label>
                                <input 
                                    type="number" 
                                    value={repairs} 
                                    onChange={(e) => setRepairs(e.target.value)}
                                    className="w-full bg-wealth-black border border-white/10 p-4 text-white focus:border-wealth-gold outline-none font-mono"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Mo. Holding Cost ($)</label>
                                <input 
                                    type="number" 
                                    value={holdingCosts} 
                                    onChange={(e) => setHoldingCosts(e.target.value)}
                                    className="w-full bg-wealth-black border border-white/10 p-4 text-white focus:border-wealth-gold outline-none font-mono"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Months on Market</label>
                                <input 
                                    type="number" 
                                    value={months} 
                                    onChange={(e) => setMonths(e.target.value)}
                                    className="w-full bg-wealth-black border border-white/10 p-4 text-white focus:border-wealth-gold outline-none font-mono"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-wealth-charcoal border border-white/10 p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                    <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">Total Cost to Sell Traditionally</h3>
                    <div className="text-5xl md:text-7xl font-serif text-white mb-2 tracking-tighter">
                        {formatCurrency(totalCost)}
                    </div>
                    <p className="text-xs text-red-400 uppercase tracking-widest mb-8">Equity Lost Forever</p>
                    
                    <div className="w-full h-[1px] bg-white/10 mb-8"></div>
                    
                    <div className="grid grid-cols-2 w-full gap-4 text-left">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Our Commission</p>
                            <p className="text-xl text-wealth-gold font-serif">$0</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Repairs Required</p>
                            <p className="text-xl text-wealth-gold font-serif">$0 (As-Is)</p>
                        </div>
                    </div>
                    
                    <p className="text-[10px] text-gray-600 mt-8 italic max-w-sm">
                        *Traditional sale estimates include 2% for closing costs. 
                        With our creative financing and cash options, you skip the MLS fees entirely.
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
};

export default CostOfInaction;