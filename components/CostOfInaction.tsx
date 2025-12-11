import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

const CostOfInaction: React.FC = () => {
  const [currentAum, setCurrentAum] = useState<string>('50');
  const [goalAum, setGoalAum] = useState<string>('100');
  const [fee, setFee] = useState<string>('1.0');
  const [gap, setGap] = useState<number>(0);

  useEffect(() => {
    const c = parseFloat(currentAum) || 0;
    const g = parseFloat(goalAum) || 0;
    const f = parseFloat(fee) || 0;
    
    // Calculate Annual Revenue Gap
    // (Goal - Current) * (Fee / 100) * 1,000,000
    const calculatedGap = Math.max(0, (g - c) * 1000000 * (f / 100));
    setGap(calculatedGap);
  }, [currentAum, goalAum, fee]);

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
                        <Calculator className="text-wealth-gold w-5 h-5" />
                        <span className="text-xs font-bold tracking-[0.2em] text-wealth-gold uppercase">
                            Revenue Capacity Model
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
                        The Cost of <br/> <span className="text-gray-500">Stagnation.</span>
                    </h2>
                    <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                        In the wealth management industry, flat growth is not neutral—it is a compounding loss. 
                        Calculate the annual recurring revenue (ARR) capacity currently unrealized in your practice.
                    </p>
                    
                    <div className="p-6 bg-wealth-charcoal border border-white/10 space-y-6">
                        <div>
                            <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Current AUM ($ Millions)</label>
                            <input 
                                type="number" 
                                value={currentAum} 
                                onChange={(e) => setCurrentAum(e.target.value)}
                                className="w-full bg-wealth-black border border-white/10 p-4 text-white focus:border-wealth-gold outline-none font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Goal AUM ($ Millions)</label>
                            <input 
                                type="number" 
                                value={goalAum} 
                                onChange={(e) => setGoalAum(e.target.value)}
                                className="w-full bg-wealth-black border border-white/10 p-4 text-white focus:border-wealth-gold outline-none font-mono"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Avg. Advisory Fee (%)</label>
                            <input 
                                type="number" 
                                step="0.1"
                                value={fee} 
                                onChange={(e) => setFee(e.target.value)}
                                className="w-full bg-wealth-black border border-white/10 p-4 text-white focus:border-wealth-gold outline-none font-mono"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-wealth-charcoal border border-white/10 p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
                    <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase mb-4">Unrealized Annual Revenue</h3>
                    <div className="text-5xl md:text-7xl font-serif text-white mb-2 tracking-tighter">
                        {formatCurrency(gap)}
                    </div>
                    <p className="text-xs text-wealth-gold uppercase tracking-widest mb-8">Recurrent Annual Capacity</p>
                    
                    <div className="w-full h-[1px] bg-white/10 mb-8"></div>
                    
                    <div className="grid grid-cols-2 w-full gap-4 text-left">
                        <div>
                            <p className="text-xs text-gray-500 mb-1">Monthly Opportunity Cost</p>
                            <p className="text-xl text-white font-serif">{formatCurrency(gap / 12)}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 mb-1">5-Year Valuation Impact (3x)</p>
                            <p className="text-xl text-white font-serif">{formatCurrency(gap * 3)}</p>
                        </div>
                    </div>
                    
                    <p className="text-[10px] text-gray-600 mt-8 italic max-w-sm">
                        *Figures are mathematical models based on your inputs and standard fee structures. 
                        They represent potential revenue capacity, not guaranteed returns.
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
};

export default CostOfInaction;