import React, { useState } from 'react';
import { Sparkles, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { generateHooks, roastPositioning, HookResult, RoastResult } from '../services/geminiService';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const AIAudit: React.FC = () => {
  const [niche, setNiche] = useState('');
  const [goal, setGoal] = useState('');
  const [pitch, setPitch] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [hookResults, setHookResults] = useState<HookResult[] | null>(null);
  const [roastResults, setRoastResults] = useState<RoastResult | null>(null);
  const [error, setError] = useState('');

  // Mock data for the chart based on input (visual sugar)
  const chartData = [
    { name: 'Your Score', value: roastResults ? roastResults.score : 20, color: '#333' },
    { name: 'Sovereign', value: 95, color: '#D4AF37' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!niche || !goal || !pitch) return;
    
    setLoading(true);
    setError('');
    setHookResults(null);
    setRoastResults(null);
    
    try {
      const [hooks, roast] = await Promise.all([
        generateHooks(niche, goal),
        roastPositioning(pitch)
      ]);
      setHookResults(hooks);
      setRoastResults(roast);
    } catch (err) {
      setError('Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="audit" className="py-24 bg-wealth-charcoal relative overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-black/40 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* Input Side */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="text-wealth-gold w-5 h-5" />
              <span className="text-xs font-bold tracking-[0.2em] text-wealth-gold uppercase">
                AI Value Analysis
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">
              Does your offer <span className="italic text-gray-500">resonate</span> with the 1%?
            </h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Most advisors fail because they sound like everyone else. 
              Use our proprietary AI model (powered by Gemini) to audit your niche and generate 
              high-net-worth messaging instantly.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">
                  Target Niche
                </label>
                <input 
                  type="text" 
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="w-full bg-wealth-black border border-white/10 p-4 text-white focus:border-wealth-gold focus:outline-none transition-colors placeholder-gray-700"
                  placeholder="Ex: Tech Founders exiting via IPO"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">
                  AUM Growth Goal
                </label>
                <input 
                  type="text" 
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-wealth-black border border-white/10 p-4 text-white focus:border-wealth-gold focus:outline-none transition-colors placeholder-gray-700"
                  placeholder="Ex: $50M in 12 months"
                  required
                />
              </div>

               <div>
                   <label className="block text-xs font-bold tracking-widest text-gray-500 uppercase mb-2">Current Headline / Value Proposition</label>
                   <textarea 
                      value={pitch}
                      onChange={(e) => setPitch(e.target.value)}
                      className="w-full bg-wealth-black border border-white/10 p-4 text-white focus:border-wealth-gold focus:outline-none transition-colors placeholder-gray-700 min-h-[100px]"
                      placeholder="Ex: We provide comprehensive fiduciary financial planning services to help you reach your goals..."
                      required
                   />
                </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full md:w-auto py-4 px-8 text-sm font-semibold tracking-widest uppercase transition-all duration-300 bg-white text-black hover:bg-wealth-gold hover:text-white border border-transparent flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Generate Authority Hooks'}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>
          </div>

          {/* Results Side */}
          <div className="bg-wealth-black border border-white/5 p-8 min-h-[500px] flex flex-col justify-center relative">
            
            {/* Idle State */}
            {!loading && !hookResults && !roastResults && !error && (
              <div className="text-center text-gray-600">
                <p className="text-sm tracking-widest uppercase">Waiting for input...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center text-red-400 flex flex-col items-center gap-2">
                <AlertCircle />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Combined Results State */}
            {(hookResults || roastResults) && (
              <div className="space-y-6 animate-fade-in w-full">
                
                {/* ROAST SECTION */}
                {roastResults && (
                    <div className="border-b border-white/10 pb-6 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-bold tracking-widest text-white uppercase">Positioning Audit</h3>
                            <div className={`px-3 py-1 text-xs font-bold border ${roastResults.score > 50 ? 'border-green-500 text-green-500' : 'border-red-500 text-red-500'}`}>
                                SCORE: {roastResults.score}/100
                            </div>
                        </div>
                        <p className="text-white text-md font-serif italic border-l-2 border-red-500/50 pl-4 py-2 bg-red-900/10 mb-4">
                            "{roastResults.critique}"
                        </p>
                        <p className="text-xs text-wealth-gold uppercase tracking-widest mb-2">Sovereign Rewrite</p>
                        <p className="text-white text-md font-medium border-l-2 border-wealth-gold pl-4 py-2 bg-wealth-gold/5">
                             "{roastResults.rewrite}"
                        </p>
                    </div>
                )}

                {/* HOOKS SECTION */}
                {hookResults && (
                    <div className="space-y-6">
                         <div className="flex justify-between items-end">
                            <h3 className="text-sm font-bold tracking-widest text-white uppercase">
                                Exclusive Market Angles
                            </h3>
                         </div>
                        {hookResults.map((hook, idx) => (
                            <div key={idx} className="group border-l-2 border-transparent hover:border-wealth-gold pl-4 transition-all duration-300">
                            <h4 className="text-lg text-white font-medium mb-1 group-hover:text-wealth-gold transition-colors">"{hook.headline}"</h4>
                            <p className="text-sm text-gray-400 mb-2">{hook.subheadline}</p>
                            <p className="text-xs text-gray-600 italic">Strategy: {hook.rationale}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="h-40 mt-8 border-t border-white/10 pt-6">
                   <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-4">Luxury Perception Gap</p>
                   <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} layout="vertical" margin={{ left: -20 }}>
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" width={80} tick={{fill: '#666', fontSize: 10}} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#1a1a1a', borderColor: '#333', color: '#fff'}} />
                        <Bar dataKey="value" barSize={12} radius={[0, 4, 4, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Bar>
                      </BarChart>
                   </ResponsiveContainer>
                </div>
              </div>
            )}
            
            {/* Loading Overlay */}
            {loading && (
                <div className="absolute inset-0 bg-wealth-black/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                    <Loader2 className="w-8 h-8 text-wealth-gold animate-spin mb-4" />
                    <p className="text-xs text-wealth-gold uppercase tracking-widest">Running Sovereign Analysis...</p>
                </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIAudit;